import { Router, Request, Response, NextFunction } from "express";
import Controller from "../../utils/interfaces/controller.interface";
import HttpException from "../../utils/exceptions/http.exception";
import validationMiddleware from "../../middleware/validation.middleware";
import validate from "./comment.validation";
import CommentService from "./comment.services";
import authenticated from "../../middleware/authenticated.middleware";

class CommentController implements Controller {
  public path = "/comment";
  public router = Router();
  private CommentService = new CommentService();

  constructor() {
    this.initialiseRoutes();
  }

  private initialiseRoutes(): void {
    this.router.post(
      `${this.path}/create`,
      authenticated,
      validationMiddleware(validate.create),
      this.createComment
    );
    this.router.patch(
      `${this.path}/reply`,
      authenticated,
      validationMiddleware(validate.reply),
      this.replyComment
    );
    this.router.get(`${this.path}/:id`, authenticated, this.getPostComment);
  }

  private createComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "No logged in user"));
      }
      const userId = req.user._id;
      const { comment, postId } = req.body;

      const comments = await this.CommentService.createComment(
        userId,
        postId,
        comment
      );

      res
        .status(201)
        .json({ message: "comment Created successfuly", data: comments });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private replyComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      if (!req.user) {
        return next(new HttpException(404, "No logged in user"));
      }
      const userId = req.user._id;
      const { comment, commentId } = req.body;

      const reply = await this.CommentService.replyComment(
        userId,
        commentId,
        comment
      );

      res
        .status(201)
        .json({ message: "reply Created successfuly", data: reply });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getPostComment = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    if (!req.user) {
      return next(new HttpException(404, "No logged in user"));
    }

    const postId = req.params.id;
    const data = await this.CommentService.findAll(postId);

    res.status(200).json({ data });
  };

  //   private likePost = async (
  //     req: Request,
  //     res: Response,
  //     next: NextFunction
  //   ): Promise<Response | void> => {
  //     if (!req.user) {
  //       return next(new HttpException(404, "No logged in user"));
  //     }
  //     const userId = req.user._id;
  //     const postId = req.params.id;
  //     const data = await this.PostService.like(userId, postId);

  //     res.status(200).json({ message: "Post liked successfully", data });
  //   };
}

export default CommentController;
