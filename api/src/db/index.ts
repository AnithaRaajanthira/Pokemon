// import mongoose from "mongoose";

// try {
//   const mongoURI = process.env.MONGO_URI;
//   if (!mongoURI) throw new Error("No Mongo DB Connection String present");
//   const client = await mongoose.connect(mongoURI, { dbName: "" });
//   console.log(`Connected to MongoDB @ ${client.connection.host} - ${client.connection.name}`);
// } catch (error) {
//   console.log(error);
//   process.exit(1);
// }

import mongoose from "mongoose";

export async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing");

  await mongoose.connect(uri);
  mongoose.connection.on("error", (err) => {
    console.error("Mongo connection error:", err);
  });

  console.log("Database connected");
}
