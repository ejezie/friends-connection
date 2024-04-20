import UserModel from "./user.model";
import token from "../../utils/token";
import User, { RegistrationResult } from "./user.interface";

class UserService {
  private user = UserModel;

  /**
   * Register a new user
   */
  public async register(
    name: string,
    identifier: string
  ): Promise<RegistrationResult | Error> {
    try {
      const user = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (user) {
        throw new Error("User already exist");
      }

      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);

      let userData: any = {
        name,
      };

      if (isEmail) {
        userData.email = identifier;
      } else {
        userData.username = identifier;
      }

      const newUser = await this.user.create(userData);

      const accessToken = token.createToken(newUser);

      return { newUser, accessToken };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Attempt to login a user
   */
  public async login(identifier: string): Promise<RegistrationResult | Error> {
    try {
      const user = await UserModel.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (!user) {
        throw new Error(
          "Unable to find user with that email address or username"
        );
      }
      const accessToken = token.createToken(user);

      return { newUser: user, accessToken };
    } catch (error) {
      throw new Error("Unable to login user");
    }
  }

  /**
   * Get all users
   */
  public async findAll(): Promise<User[] | Error> {
    try {
      const users = await UserModel.find({});

      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Get single user
   */
  public async findOne(id: string): Promise<User | Error> {
    try {
      const user = await UserModel.findById(id).populate("friends");

      if (!user) {
        throw new Error("User not found");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  /**
   * Get multiple users
   */
  public async findMultipleNotFriends(userId: string): Promise<User[] | Error> {
    try {
      // Find the user by ID to access their friends array
      const user = await UserModel.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      // Retrieve users whose _id is not in the user's friends array
      const usersNotFriends = await UserModel.find({
        _id: { $nin: user.friends },
      });

      return usersNotFriends;
    } catch (error) {
      throw new Error("Unable to find users");
    }
  }
}

export default UserService;
