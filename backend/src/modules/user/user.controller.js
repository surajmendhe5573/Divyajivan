import UserService from "./user.service.js";
import { statusCode } from "../../utils/constants/statusCode.js";

export default class UserController {

  constructor() {
    this.userService = UserService;
  }

  getAll = async (req, res, next) => {
    try {
      const users = await this.userService.getAll();
      return res.success("Users fetched successfully", users, statusCode.OK);
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const result = await this.userService.login({ username, password });

    return res.success("Login successful", result, statusCode.OK);
  } catch (err) {
    next(err);
  }
};

}
