import NotificationModel from "./notification.model";
import { Notification } from "./notification.interface";

class NotificationService {
  private notification = NotificationModel;

  /**
   * send notification to multiple users
   */
  public async createNotification(
    sender: string,
    receivers: string[],
    message: string,
    messageType: string
  ): Promise<Notification | Error> {
    try {
      const newNotification = await this.notification.create({
        sender,
        receivers,
        message,
        messageType,
      });

      return newNotification;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * send notification to single user
   */
  public async createNotificationToSingleUser(
    sender: string,
    receiver: string,
    message: string,
    messageType: string
  ): Promise<Notification | Error> {
    try {
      const newNotification = await this.notification.create({
        sender,
        receivers: [receiver],
        message,
        messageType,
      });

      return newNotification;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * get all notification
   */
  public async findAll(userId: string): Promise<Notification[] | Error> {
    try {
      const notifications = await this.notification
        .find({ receivers: userId })
        .populate({
          path: "sender",
          select: "name username email",
        })
        .sort({
          createdAt: -1,
        });

      return notifications;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * mark Notification as read
   */
  public async markAsRead(
    userId: string,
    notificationId: string
  ): Promise<Notification | Error> {
    try {
      const notification = await this.notification.findOne({
        _id: notificationId,
        receivers: userId,
      });

      if (!notification) {
        throw new Error("Notification not found or user is not a receiver");
      }

      // Update the readBy array to include the user ID if not already present
      if (!notification.readBy.includes(userId)) {
        notification.readBy.push(userId);
        await notification.save();
      }
      return notification;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default NotificationService;
