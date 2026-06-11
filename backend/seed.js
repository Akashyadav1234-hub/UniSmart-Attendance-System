require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    await connectDB();
    const existingAdmin = await User.findOne({ email: 'akya9778@gmail.com' });
    if (existingAdmin) {
      console.log('Admin already exists.');
    } else {
      const admin = new User({
        name: 'Super Admin',
        email: 'akya9778@gmail.com',
        role: 'Super Admin'
      });
      await admin.save();
      console.log('Super Admin successfully seeded!');
    }
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
