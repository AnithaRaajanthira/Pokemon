import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: [true, 'name is required'] },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      default: ['user']
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const User = model('User', userSchema);

export default User;
