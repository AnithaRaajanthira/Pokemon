import mongoose from 'mongoose';
import { MONGO_URI, DB_NAME } from '#config';

try {
  const client = await mongoose.connect(MONGO_URI, { dbName: DB_NAME });
  console.log('✅ Connected to MongoDB: ' + client.connection.name);
} catch (err) {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
}
