import mongoose, { Schema } from "mongoose";
import { Comment } from "./comment.interface";

const commentSchema = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    postId: { type: Schema.Types.ObjectId, ref: "Posts" },
    comment: { type: String, required: true },
    // from: { type: String, required: true },
    replies: [
      {
        rid: { type: mongoose.Schema.Types.ObjectId },
        userId: { type: Schema.Types.ObjectId, ref: "User" },
        // from: { type: String },
        // replyAt: { type: String },
        comment: { type: String },
        created_At: { type: Date, default: Date.now() },
        updated_At: { type: Date, default: Date.now() },
        likes: [{ type: String }],
      },
    ],
    likes: [{ type: String }],
  },
  { timestamps: true }
);

const CommentModel = mongoose.model<Comment>("Comment", commentSchema);

export default CommentModel;
