import { model, Schema } from "mongoose";

const scoreSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  score: {
    type: Number,
    required: [true, "Score is required"],
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: [true, "Date is required"],
    trim: true,
  },
});

export default model("Scores", scoreSchema);
