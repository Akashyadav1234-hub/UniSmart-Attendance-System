const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['Super Admin', 'Faculty'], default: 'Faculty' },
  academicYear: { type: String }, // specific to Faculty
  assignedBatch: { type: String }, // specific to Faculty
  otp: { type: String },
  otpExpires: { type: Date }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
