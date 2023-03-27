import UserService from "../../services/UserService";
import {
  CreateAndSaveUserRequest,
  CreateUserSession,
  User,
  UserLoginRequest,
  ValidatedRequest,
} from "../../lib/types";
import {
  UserEmailExists,
  AuthLoginError,
  AccessTokenNotExpired,
  InvalidRefreshToken,
  RefreshTokenExpired,
} from "../../utils/exceptions/Exceptions";
import Bcrypt from "../../lib/Bcrypt";
import { Request } from "express";
import GeneralHelper from "../../utils/helpers/General";

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

  public async reGenerateAccessToken(request: Request) {
    const session = request.session;
    if (!this.userService.tokenExpired(session.access_token_exp)) {
      throw new AccessTokenNotExpired();
    }
    if (session.refresh_token !== (request.headers.refresh_token as string)) {
      throw new InvalidRefreshToken();
    }
    if (this.userService.tokenExpired(session.refresh_token_exp)) {
      throw new RefreshTokenExpired();
    }

    session.access_token = this.userService.generateToken();
    session.refresh_token = this.userService.generateToken();
    session.access_token_exp = this.userService.getAccessTokenExpire();
    session.refresh_token_exp = this.userService.getRefreshTokenExpire();

    await this.userService.deleteSessionByEntityId(session.entityId);

    const newSession = GeneralHelper.withoutKeys(session, [
      "entityId",
    ]) as CreateUserSession;

    return await this.userService.saveSession(newSession);
  }

  public async logout(request: Request) {
    await this.userService.deleteSessionByEntityId(request.session.entityId);
    return true;
  }

  public me(request: Request) {
    return request.user;
  }
}

export default new UserController();
