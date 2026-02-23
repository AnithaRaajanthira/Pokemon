import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is missing");

  await mongoose.connect(uri);
  mongoose.connection.on("error", (err) => {
    console.error("Mongo connection error:", err);
  });

  console.log("Database connected");
}
