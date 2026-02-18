import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    // TODO: create a mongoose schema for storing user data
    // Add firstName, lastName, email, password and a string array for roles
    // make sure that the email is unique and the password hashed before saving
  },
  {
    timestamps: { createdAt: true, updatedAt: false }
  }
);

const User = model('User', userSchema);

export default User;
