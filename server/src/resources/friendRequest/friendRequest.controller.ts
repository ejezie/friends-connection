import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./friendRequest.validation";
import FriendRequestService from "./friendRequest.services";
import authenticated from "../../middleware/authenticated.middleware";

class FriendRequestController implements Controller {
  public path = "/friend_request";
  public router = Router();
  private FriendRequestService = new FriendRequestService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/send`,
      authenticated,
      validationMiddleware(validate.sendRequest),
      this.sendRequest
    );
    this.router.patch(
      `${this.path}/accept`,
      authenticated,
      validationMiddleware(validate.acceptRequest),
      this.acceptRequest
    );
    this.router.get(`${this.path}`, authenticated, this.getAllRequest);
  }

  private sendRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "No logged in user"));
      }
      const user = req.user;
      const { requestTo } = req.body;

      const fReq = await this.FriendRequestService.create(user, requestTo);

      res
        .status(201)
        .json({ message: "Friend request sent successfuly", data: fReq });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAllRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const userId = req.user._id;
    const data = await this.FriendRequestService.findAll(userId);

    res.status(200).json({ data });
  };

  private acceptRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const userr = req.user;
    const { rid, status } = req.body;
    const fReq = await this.FriendRequestService.accept(rid, userr, status);

    res.status(200).json({ message: "Friend Request " + status, data: fReq });
  };
}

export default FriendRequestController;
