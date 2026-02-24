import mongoose from "mongoose";

try {
  // Connect
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) throw new Error("No Mongo DB Connection String present");
  const client = await mongoose.connect(mongoURI, { dbName: "pokemon" });
  console.log(`Connected to MongoDB @ ${client.connection.host} - ${client.connection.name}`);
} catch (error) {
  // Log error and end Node process if it fails
  console.error("MongoDB connection error:", error);
  process.exit(1);
}
