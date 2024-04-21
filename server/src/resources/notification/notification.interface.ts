import { Document, Types } from "mongoose";

interface Notification extends Document {
  sender: Types.ObjectId;
  receivers: Types.ObjectId[];
  message: string;
  messageType: string;
  readBy: string[];
  createdAt: Date;
  updatedAt: Date;
}

export { Notification };
