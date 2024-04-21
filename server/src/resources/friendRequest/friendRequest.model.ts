import mongoose, { Schema } from "mongoose";
import { FriendRequest } from "./friendRequest.interface";

const requestSchema = new mongoose.Schema(
  {
    requestTo: { type: Schema.Types.ObjectId, ref: "User" },
    requestFrom: { type: Schema.Types.ObjectId, ref: "User" },
    requestStatus: { type: String, default: "Pending" },
  },
  { timestamps: true }
);

const FriendRequestModel = mongoose.model<FriendRequest>(
  "FriendRequest",
  requestSchema
);

export default FriendRequestModel;
