import { Document, Types } from "mongoose";

enum RequestStatus {
  Pending = "Pending",
  Accepted = "Accepted",
  Rejected = "Rejected",
}

interface FriendRequest extends Document {
  requestTo: Types.ObjectId;
  requestFrom: Types.ObjectId;
  requestStatus: RequestStatus;
  createdAt: Date;
  updatedAt: Date;
}

export { FriendRequest };
