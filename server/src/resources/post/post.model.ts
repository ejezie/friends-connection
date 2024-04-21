import mongoose, { Schema } from "mongoose";
import { Post } from "./post.interface";

//schema
const postSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: true },
    image: { type: String },
    likes: [{ type: String }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

const PostModel = mongoose.model<Post>("Posts", postSchema);

export default PostModel;
