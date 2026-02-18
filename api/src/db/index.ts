import mongoose from "mongoose";

try {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) throw new Error("No Mongo DB Connection String present");
  const client = await mongoose.connect(mongoURI, { dbName: "" });
  console.log(`Connected to MongoDB @ ${client.connection.host} - ${client.connection.name}`);
} catch (error) {
  console.log(error);
  process.exit(1);
}
