import UserService from "../../services/UserService";
import {
  CreateAndSaveUserRequest,
  User,
  UserLoginRequest,
  ValidatedRequest,
} from "../../lib/types";
import {
  UserEmailExists,
  AuthLoginError,
} from "../../utils/exceptions/Exceptions";
import Bcrypt from "../../lib/Bcrypt";
import Jwt from "../../lib/Jwt";
import General from "../../utils/helpers/General";
import Constants from "../../utils/Constants";

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
    const result = await this.userService.emailExists(request.body.email);
    console.log("result:", { ...result });
    if (!result) {
      throw new AuthLoginError();
    }
    const user: User = result as unknown as User;
    if (!(await Bcrypt.compare(request.body.password, user.password))) {
      throw new AuthLoginError();
    }

    const accessToken = this.userService.generateAccessToken(user);
    const refreshToken = this.userService.generateRefreshToken();

    return { accessToken, refreshToken };
  }
}

export default new UserController();
