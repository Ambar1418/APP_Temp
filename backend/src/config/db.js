const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI;
    if (connUri) {
      await mongoose.connect(connUri);
      console.log(`[MongoDB] Connected to provided URI`);
    } else {
      console.log(`[MongoDB] No MONGODB_URI provided. Starting MongoMemoryServer...`);
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`[MongoDB] Connected to MongoMemoryServer at ${mongoUri}`);
    }
  } catch (err) {
    console.warn(`[MongoDB] Standard connection failed (${err.message}). Falling back to MongoMemoryServer...`);
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`[MongoDB] Connected to fallback MongoMemoryServer at ${mongoUri}`);
    } catch (fallbackErr) {
      console.error(`[MongoDB] Fatal DB connection error:`, fallbackErr);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
