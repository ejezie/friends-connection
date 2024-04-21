import UserModel from "../user/user.model";
import FriendRequestModel from "./friendRequest.model";
import { FriendRequest } from "./friendRequest.interface";
import NotificationService from "../notification/notification.services";
import User from "../user/user.interface";

class FriendRequestService {
  private friendRequest = FriendRequestModel;
  private NotificationService = new NotificationService();

  /**
   * send a request
   */
  public async create(
    user: User,
    requestTo: string
  ): Promise<FriendRequest | Error> {
    try {
      const requestExist = await this.friendRequest.findOne({
        $or: [
          {
            requestFrom: user._id,
            requestTo,
          },
          { requestFrom: requestTo, requestTo: user._id },
        ],
      });

      if (requestExist) {
        throw new Error("Friend Request already exist");
      }

      const newRes = await this.friendRequest.create({
        requestTo,
        requestFrom: user._id,
      });

      // notify friends
      const notify =
        await this.NotificationService.createNotificationToSingleUser(
          user._id,
          requestTo,
          `${user.name} has sent you a friend request`,
          "Friend Request"
        );

      return newRes;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Get all request
   */
  public async findAll(userId: string): Promise<FriendRequest[] | Error> {
    try {
      const request = await this.friendRequest
        .find({
          requestTo: userId,
          requestStatus: "Pending",
        })
        .populate({
          path: "requestFrom",
          select: "name username email",
        })
        .sort({
          createdAt: -1,
        });

      return request;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Accept Request
   */
  public async accept(
    rid: string,
    userr: User,
    status: string
  ): Promise<FriendRequest | Error> {
    try {
      const requestExist = await this.friendRequest.findById(rid);

      if (!requestExist) {
        throw new Error("No Friend Request Found.");
      }

      const newRes = await this.friendRequest.findByIdAndUpdate(
        { _id: rid },
        { requestStatus: status }
      );
      if (!newRes) {
        throw new Error("No Friend Request Found.");
      }

      if (status === "Accepted") {
        const user = await UserModel.findById(userr._id);
        if (user) {
          user.friends?.push(newRes?.requestFrom!);

          await user.save();
        }

        const friend = await UserModel.findById(newRes?.requestFrom);
        if (friend) {
          friend.friends?.push(newRes?.requestTo!);

          await friend.save();
        }
      }
      // notify friends
      const notify =
        await this.NotificationService.createNotificationToSingleUser(
          userr._id,
          newRes?.requestFrom.toString(),
          `${userr.name} has ${status} your friend request`,
          "Friend Request"
        );

      return newRes;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default FriendRequestService;
