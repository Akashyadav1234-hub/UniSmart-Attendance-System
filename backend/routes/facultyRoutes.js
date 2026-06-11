const express = require('express');
const { saveAttendance, generateReport, getFacultyStudents } = require('../controllers/facultyController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/students', protect, getFacultyStudents);
router.post('/attendance', protect, saveAttendance);
router.get('/export', protect, generateReport);

module.exports = router;
