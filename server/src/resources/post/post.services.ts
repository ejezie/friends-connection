import PostModel from "./post.model";
import { Post } from "./post.interface";
import { v2 as cloudinary } from "cloudinary";
import NotificationService from "../notification/notification.services";
import User from "../user/user.interface";

class PostService {
  private post = PostModel;
  private NotificationService = new NotificationService();

  /**
   * create a post
   */
  public async createPost(
    user: User,
    description: string,
    image?: string
  ): Promise<Post | Error> {
    const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;
    cloudinary.config({
      cloud_name: CLOUDINARY_NAME,
      api_key: CLOUDINARY_KEY,
      api_secret: CLOUDINARY_SECRET,
    });
    try {
      console.log("hhh");
      const currentDate = new Date();
      const numericRepresentation = currentDate.getTime().toString();
      let imageUrl = "";

      if (image) {
        const uploadResult = await cloudinary.uploader.upload(image, {
          public_id: numericRepresentation,
          folder: "social_media",
        });
        imageUrl = uploadResult.secure_url;
      }

      const newPost = await this.post.create({
        userId: user._id,
        description,
        image: imageUrl,
      });

      // notify friends
      if (user.friends) {
        const friendIds: string[] = user.friends.map((friendId) =>
          friendId.toString()
        );
        const notify = await this.NotificationService.createNotification(
          user._id,
          friendIds,
          `${user.name} has updated a status you need to see`,
          "Post"
        );
      }

      return newPost;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * get all post
   */
  public async findAll(): Promise<Post[] | Error> {
    try {
      const posts = await this.post
        .find({})
        .populate({
          path: "userId",
          select: "name username email",
        })
        .populate({
          path: "comments",
        })
        .sort({
          createdAt: -1,
        });

      return posts;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Get single post
   */
  public async findOne(id: string): Promise<Post | Error> {
    try {
      const post = await this.post
        .findById(id)
        .populate({
          path: "userId",
          select: "name username email",
        })
        .populate({
          path: "comments",
        });

      if (!post) {
        throw new Error("Post not found");
      }

      return post;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Get user post
   */
  public async findUserPost(id: string): Promise<Post[] | Error> {
    try {
      const post = await this.post
        .find({ userId: id })
        .populate({
          path: "userId",
          select: "name username email",
        })
        .populate({
          path: "comments",
        });

      return post;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * like post
   */
  public async like(userId: string, postId: string): Promise<Post | Error> {
    try {
      const post = await this.post.findById(postId);
      if (post) {
        const index = post.likes.findIndex((pid) => pid === String(userId));

        if (index === -1) {
          post.likes.push(userId);
        } else {
          post.likes = post.likes.filter((pid) => pid !== String(userId));
        }

        const newPost = await this.post.findByIdAndUpdate(postId, post, {
          new: true,
        });
      }
      if (!post) {
        throw new Error("no post found");
      }
      return post;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default PostService;
