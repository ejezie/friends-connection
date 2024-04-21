import PostModel from "../post/post.model";
import CommentModel from "./comment.model";
import { Comment, Reply } from "./comment.interface";

class CommentService {
  private comment = CommentModel;

  /**
   * create a comment
   */
  public async createComment(
    userId: string,
    postId: string,
    comment: string
  ): Promise<Comment | Error> {
    try {
      const newComment = await this.comment.create({
        userId,
        postId,
        comment,
      });

      //updating the post with the comments id
      const post = await PostModel.findById(postId);
      if (post) {
        post.comments.push(newComment._id);

        const updatedPost = await PostModel.findByIdAndUpdate(postId, post, {
          new: true,
        });
      }

      return newComment;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * reply a comment
   */
  public async replyComment(
    userId: string,
    commentId: string,
    comment: string
  ): Promise<Comment | Error> {
    try {
      const commentInfo = await this.comment.findById(commentId);
      if (commentInfo) {
        commentInfo.replies.push({
          userId,
          comment,
          created_At: new Date(),
          updated_At: new Date(),
          likes: [],
        });

        commentInfo.save();
      }
      if (!commentInfo) {
        throw new Error("no comment available");
      }

      return commentInfo;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * get post comment
   */
  public async findAll(postId: string): Promise<Comment[] | Error> {
    try {
      const postComments = await this.comment
        .find({ postId })
        .populate({
          path: "userId",
          select: "name username email",
        })
        .populate({
          path: "replies.userId",
          select: "name username email",
        })
        .sort({
          createdAt: -1,
        });

      return postComments;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default CommentService;
