import { Document, Types } from "mongoose";

interface Comment extends Document {
  userId: Types.ObjectId;
  postId: Types.ObjectId;
  comment: string;
  //   from: string;
  replies: Reply[];
  likes: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface Reply {
  rid?: Types.ObjectId;
  userId: string;
  comment: string;
  created_At: Date;
  updated_At: Date;
  likes: string[];
}

export { Comment, Reply };
