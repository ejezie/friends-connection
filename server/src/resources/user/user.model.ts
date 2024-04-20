import mongoose, { Schema } from "mongoose";
import User from "./user.interface";

//schema
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, " Name is Required!"],
      unique: true,
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
    },
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const UserModel = mongoose.model<User>("User", userSchema);

export default UserModel;
