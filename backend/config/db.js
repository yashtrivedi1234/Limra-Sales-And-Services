import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: process.env.MONGODB_DB_NAME,
    });
    console.log(`MongoDB Connected to database: ${process.env.MONGODB_DB_NAME}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;