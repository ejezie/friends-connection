import "dotenv/config";
import App from "./app";
import validateEnv from "./utils/validateEnv";
import UserController from "./resources/user/user.controller";
import FriendRequestController from "./resources/friendRequest/friendRequest.controller";
import PostController from "./resources/post/post.controller";
import CommentController from "./resources/comment/comment.controller";
import NotificationController from "./resources/notification/notification.controller";

validateEnv();

const app = new App(
  [
    new UserController(),
    new FriendRequestController(),
    new PostController(),
    new CommentController(),
    new NotificationController(),
  ],
  Number(process.env.PORT)
);

app.listen();
