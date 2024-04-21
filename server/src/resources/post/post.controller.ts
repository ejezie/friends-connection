import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./post.validation";
import PostService from "./post.services";
import authenticated from "../../middleware/authenticated.middleware";

class PostController implements Controller {
  public path = "/posts";
  public router = Router();
  private PostService = new PostService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      authenticated,
      validationMiddleware(validate.create),
      this.createPost
    );
    this.router.patch(`${this.path}/like/:id`, authenticated, this.likePost);
    this.router.get(`${this.path}`, authenticated, this.getAllPost);
    this.router.get(
      `${this.path}/user/:userId`,
      authenticated,
      this.getUserPost
    );
    this.router.get(`${this.path}/:id`, authenticated, this.getSinglePost);
  }

  private createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "No logged in user"));
      }
      const user = req.user;
      const { description, image } = req.body;

      const posts = await this.PostService.createPost(user, description, image);

      res
        .status(201)
        .json({ message: "Post Created successfuly", data: posts });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getAllPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }

    const userId = req.user._id;
    const data = await this.PostService.findAll();

    res.status(200).json({ data });
  };

  private getSinglePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const userId = req.user._id;
    const id = req.params.id;
    const data = await this.PostService.findOne(id);

    res.status(200).json({ data });
  };

  private getUserPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const userId = req.params.userId;
    const data = await this.PostService.findUserPost(userId);

    res.status(200).json({ data });
  };

  private likePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }
    const userId = req.user._id;
    const postId = req.params.id;
    const data = await this.PostService.like(userId, postId);

    res.status(200).json({ message: "Post liked successfully", data });
  };
}

export default PostController;
