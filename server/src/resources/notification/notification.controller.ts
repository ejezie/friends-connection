import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import NotificationService from "./notification.services";
import authenticated from "../../middleware/authenticated.middleware";

class NotificationController implements Controller {
  public path = "/notifications";
  public router = Router();
  private NotificationService = new NotificationService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.patch(`${this.path}/:id`, authenticated, this.markAsRead);
    this.router.get(`${this.path}`, authenticated, this.getAllNotification);
  }

  private getAllNotification = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }

    const userId = req.user._id;
    const data = await this.NotificationService.findAll(userId);

    res.status(200).json({ data });
  };

  private markAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const userId = req.user._id;
    const notificationId = req.params.id;
    const data = await this.NotificationService.markAsRead(
      userId,
      notificationId
    );

    res.status(200).json({ message: "Notification marked as read", data });
  };
}

export default NotificationController;
