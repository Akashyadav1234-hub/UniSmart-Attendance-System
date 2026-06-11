const express = require('express');
const multer = require('multer');
const { createFaculty, bulkUploadStudents } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create-faculty', protect, adminOnly, createFaculty);
router.post('/upload-students', protect, adminOnly, upload.single('file'), bulkUploadStudents);

module.exports = router;
