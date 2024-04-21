import { Document, Types } from "mongoose";

interface Post extends Document {
  userId: Types.ObjectId;
  description: string;
  image?: string;
  likes: string[];
  comments: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export { Post };
