const Attendance = require('../models/Attendance');
const Student = require('../models/Student');
const exceljs = require('exceljs');

const saveAttendance = async (req, res) => {
  const { date, records } = req.body;
  try {
    const existingRecord = await Attendance.findOne({ date, facultyId: req.user._id });

    if (existingRecord) {
      existingRecord.records = records;
      await existingRecord.save();
      return res.status(200).json({ message: 'Attendance updated successfully' });
    } else {
      const attendance = await Attendance.create({
        date,
        facultyId: req.user._id,
        records
      });
      return res.status(201).json({ message: 'Attendance saved successfully', attendance });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const generateReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const students = await Student.find({ batch: req.user.assignedBatch });

    let dateFilter = { facultyId: req.user._id };
    if (startDate && endDate) {
      dateFilter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }
    const attendances = await Attendance.find(dateFilter);

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet('Weekly Attendance');

    worksheet.columns = [
      { header: 'Student Name', key: 'name', width: 25 },
      { header: 'Roll Number', key: 'rollNumber', width: 15 },
      { header: 'Dates Present', key: 'datesPresent', width: 30 },
      { header: 'Total Days', key: 'totalDays', width: 15 },
      { header: 'Percentage', key: 'percentage', width: 15 }
    ];

    const studentMap = {};
    students.forEach(student => {
      studentMap[student._id.toString()] = {
        name: student.name,
        rollNumber: student.rollNumber,
        datesPresent: [],
        presentDays: 0
      };
    });

    const uniqueDates = new Set(attendances.map(att => new Date(att.date).toDateString()));
    let totalWorkingDays = uniqueDates.size;

    if (totalWorkingDays > 6) totalWorkingDays = 6;

    attendances.forEach(att => {
      const dateStr = new Date(att.date).toLocaleDateString();
      att.records.forEach(rec => {
        const sid = rec.studentId.toString();
        if (studentMap[sid] && rec.status === 'Present') {
          studentMap[sid].presentDays++;
          studentMap[sid].datesPresent.push(dateStr);
        }
      });
    });

    Object.values(studentMap).forEach(s => {
      const percentage = totalWorkingDays > 0 ? ((s.presentDays / totalWorkingDays) * 100).toFixed(2) : '0.00';
      worksheet.addRow({
        name: s.name,
        rollNumber: s.rollNumber,
        datesPresent: s.datesPresent.join(', '),
        totalDays: totalWorkingDays,
        percentage: `${percentage}%`
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="Weekly_Attendance_Report.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error generating report' });
  }
};

const getFacultyStudents = async (req, res) => {
  try {
    const { date } = req.query;
    const students = await Student.find({ batch: req.user.assignedBatch });

    let existingAttendance = [];
    if (date) {
      const att = await Attendance.findOne({ date, facultyId: req.user._id });
      if (att) existingAttendance = att.records;
    }

    const roster = students.map(student => {
      const record = existingAttendance.find(r => r.studentId.toString() === student._id.toString());
      return {
        id: student._id,
        name: student.name,
        rollNumber: student.rollNumber,
        batch: student.batch,
        status: record ? record.status : 'Absent', // The magic fix we did earlier!
        initials: student.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
      };
    });

    res.status(200).json(roster);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching roster' });
  }
};

module.exports = { saveAttendance, generateReport, getFacultyStudents };