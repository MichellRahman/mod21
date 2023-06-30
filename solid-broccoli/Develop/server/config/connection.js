const mongoose = require('mongoose');

async function connectDB () {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks');
        console.log('mongoDB connected!');
    } catch (error) {
        console.log('mongoDB not connected!', error);
    }
} 

module.exports = connectDB;
