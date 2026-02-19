import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    firstName: { type: String, required: [true, 'First name is required'] },
    lastName: { type: String, required: [true, 'Last name is required'] },
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
