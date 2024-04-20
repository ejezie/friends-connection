import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./user.validation";
import UserService from "./user.services";
import authenticated from "../../middleware/authenticated.middleware";

class UserController implements Controller {
  public path = "/users";
  public router = Router();
  private UserService = new UserService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(validate.register),
      this.register
    );
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(validate.login),
      this.login
    );
    this.router.get(`${this.path}`, this.getAllUser);
    this.router.get(`${this.path}/me`, authenticated, this.getMe);
    this.router.get(
      `${this.path}/not_friends`,
      authenticated,
      this.getMultipleUser
    );
    this.router.get(`${this.path}/:id`, this.getSingleUser);
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { name, identifier } = req.body;

      const token = await this.UserService.register(name, identifier);

      res.status(201).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { identifier } = req.body;

      const token = await this.UserService.login(identifier);

      res.status(200).json({ token });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAllUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    // if (!req.user) {
    //   return next(new HttpException(404, "No logged in user"));
    // }
    const user = await this.UserService.findAll();

    res.status(200).json({ user });
  };

  private getSingleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const id = req.params.id;
    const user = await this.UserService.findOne(id);

    res.status(200).json({ user });
  };

  private getMultipleUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const id = req.user._id;
    const user = await this.UserService.findMultipleNotFriends(id);

    res.status(200).json({ user });
  };

  private getMe = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const id = req.user._id;
    const user = await this.UserService.findOne(id);

    res.status(200).json({ user });
  };
}

export default UserController;
