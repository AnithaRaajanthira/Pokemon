// import mongoose from "mongoose";

// export async function connectDb() {
//   const uri = process.env.MONGO_URI;
//   if (!uri) throw new Error("MONGO_URI is missing");

//   await mongoose.connect(uri);
//   mongoose.connection.on("error", (err) => {
//     console.error("Mongo connection error:", err);
//   });

//   console.log("Database connected");
// }
import mongoose from "mongoose";

try {
  // Connect
  await mongoose.connect(process.env.MONGO_URI!, {
    dbName: "pokemon", // Replace with your actual database name
  });
  console.log("\x1b[35mMongoDB connected via Mongoose\x1b[0m");
} catch (error) {
  // Log error and end Node process if it fails
  console.error("MongoDB connection error:", error);
  process.exit(1);
}
