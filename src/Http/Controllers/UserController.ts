import UserService from "../../services/UserService";
import { CreateAndSaveUserRequest, UserLoginRequest, ValidatedRequest } from "../../lib/types";
import {
  UserEmailExists,
  AuthLoginError,
} from "../../utils/exceptions/Exceptions";
import Bcrypt from "../../lib/Bcrypt"

class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public async createAndSave(
    request: ValidatedRequest<CreateAndSaveUserRequest>
  ) {
    if (await this.userService.emailExists(request.body.email)) {
      throw new UserEmailExists();
    }
    request.body.password = await Bcrypt.hash(request.body.password);
    return await this.userService.createAndSave(request.body);
  }

  public async login(request: ValidatedRequest<UserLoginRequest>) {
    const result = await this.userService.emailExists(request.body.email)
    if (!result) {
      throw new AuthLoginError();
    }
    return result;
  }
}

export default new UserController();
