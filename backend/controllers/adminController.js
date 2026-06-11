const { addEntryToNotion } = require('../notionSync');
const User = require('../models/User');
const Student = require('../models/Student');
const exceljs = require('exceljs');

const createFaculty = async (req, res) => {
  const { fullName, email, academicYear, assignedBatch } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name: fullName,
      email,
      role: 'Faculty',
      academicYear,
      assignedBatch
    });

    res.status(201).json({ message: 'Faculty created successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const bulkUploadStudents = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an excel or csv file' });
    }

    const workbook = new exceljs.Workbook();
    if (req.file.originalname.endsWith('.csv')) {
      await workbook.csv.load(req.file.buffer);
    } else {
      await workbook.xlsx.load(req.file.buffer);
    }

    const worksheet = workbook.getWorksheet(1);
    const studentsToInsert = [];

    // Map column names to index dynamically
    const colMap = {};
    let isHeader = true;

    worksheet.eachRow((row, rowNumber) => {
      const rowValues = row.values; // 1-indexed

      if (isHeader) {
        row.eachCell((cell, colNumber) => {
          const val = cell.value ? cell.value.toString().replace(/\s/g, '').toLowerCase() : '';
          colMap[val] = colNumber;
        });
        isHeader = false;
        return;
      }

      // Read mapped columns safely using standardized keys
      const name = rowValues[colMap['studentname']];
      const rollNumber = rowValues[colMap['rollnumber']];
      let email = rowValues[colMap['email']];
      const batch = rowValues[colMap['batch']];

      // ExcelJS hyperlinked cells are parsed as objects. Flatten them to plain strings.
      if (email && typeof email === 'object') {
        if (email.hyperlink) {
          email = email.hyperlink.replace('mailto:', '').trim();
        } else if (email.text) {
          email = email.text.toString().trim();
        }
      }

      if (name && rollNumber && email && batch) {
        studentsToInsert.push({ name, rollNumber, email, batch });
      }
    });

    if (studentsToInsert.length === 0) {
      return res.status(400).json({ message: 'No valid student data found in file.' });
    }

    const finalDataToInsert = studentsToInsert.map(row => ({
      name: row.name || row['Student Name'],
      rollNumber: row.rollNumber || row['Roll Number'],
      email: typeof row.email === 'object' ? (row.email.text || row.email.hyperlink.replace('mailto:', '')) : row.email,
      batch: row.batch || row['Batch']
    }));

    console.log("EXACT DATA SENT TO MONGOOSE:", finalDataToInsert);

    let insertedCount = 0;
    let duplicateCount = 0;

    try {
      const result = await Student.insertMany(finalDataToInsert, { ordered: false });
      // Trigger the Notion automated log
      const timestamp = new Date().toLocaleString();
      const batchName = finalDataToInsert[0]?.batch || "Unknown Batch";
      const studentCount = finalDataToInsert.length;

      await addEntryToNotion(
        "✅ Automated Deployment Log",
        `Admin System Update (${timestamp}): Successfully ingested and mapped ${studentCount} new student records to batch ${batchName} into the MongoDB cluster.`
      );

      insertedCount = result.length;
    } catch (err) {
      if (err.code === 11000) {
        insertedCount = err.insertedDocs ? err.insertedDocs.length : 0;
        duplicateCount = finalDataToInsert.length - insertedCount;
      } else {
        throw err;
      }
    }

    if (duplicateCount > 0) {
      res.status(200).json({ message: `${insertedCount} students uploaded successfully. ${duplicateCount} were skipped due to duplicate roll numbers or emails.` });
    } else {
      res.status(200).json({ message: `${insertedCount} students uploaded successfully` });
    }
  } catch (error) {
    console.error('Bulk Upload Error:', error);
    res.status(500).json({ message: 'Error processing file' });
  }
};

module.exports = { createFaculty, bulkUploadStudents };
