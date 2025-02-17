const mongoose = require('mongoose');

exports.connectDB = async () => {
try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(`MongoDB Connection Successfull : ${conn.connection.host}`);
    
} catch (error) {
    console.log("error connecting to MongoDB", error.message);
    process.exit(1);
    
}
}