import mongoose, { Schema } from "mongoose";
import { Notification } from "./notification.interface";

//schema
const notificationSchema = new mongoose.Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receivers: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    message: { type: String, required: true },
    messageType: { type: String, required: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const NotificationModel = mongoose.model<Notification>(
  "Notification",
  notificationSchema
);

export default NotificationModel;
