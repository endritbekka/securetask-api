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
    if (!result) {
      throw new AuthLoginError();
    }
    const user: User = this.userService.toRedisJson(result) as unknown as User;
    if (!(await Bcrypt.compare(request.body.password, user.password))) {
      throw new AuthLoginError();
    }

    const access_token = this.userService.generateToken();
    const refresh_token = this.userService.generateToken();

    const session = await this.userService.saveSession({
      user_entity_id: user.entityId,
      access_token,
      refresh_token,
      access_token_exp: this.userService.getAccessTokenExpire(),
      refresh_token_exp: this.userService.getRefreshTokenExpire(),
    });

    return session;
  }
}

export default new UserController();
