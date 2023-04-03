import UserService from "../../services/UserService";
import {
  CreateAndSaveUserRequest,
  CreateUserSession,
  User,
  UserForgotPasswordRequest,
  UserLoginRequest,
  UserResetPasswordJWTPayload,
  UserResetPasswordRequest,
  UserVerifyAccountJWTPayload,
  UserVerifyAccountRequest,
  ValidatedRequest,
} from "../../lib/types";
import {
  UserEmailExists,
  AuthLoginError,
  AccessTokenNotExpired,
  InvalidRefreshToken,
  RefreshTokenExpired,
  UserResetPasswordError,
  UserDoesNotExistError,
  UserAccountAlreadyVerified,
} from "../../utils/exceptions/Exceptions";
import Bcrypt from "../../lib/Bcrypt";
import { Request } from "express";
import GeneralHelper from "../../utils/helpers/General";
import Constants from "../../utils/Constants";
import Jwt from "../../lib/Jwt";

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

    const session = await this.userService.saveSession(user.entityId);
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

    const newSession = await this.userService.saveSession(
      session.user_entity_id
    );

    await this.userService.deleteSessionByEntityId(session.entityId);
    return newSession;
  }

  public async logout(request: Request) {
    await this.userService.deleteSessionByEntityId(request.session.entityId);
    return true;
  }

  public me(request: Request) {
    return request.user;
  }

  public async verifyAccount(
    request: ValidatedRequest<UserVerifyAccountRequest>
  ) {
    // const decoded = Jwt.verify(
    //   request.body.token,
    //   Constants.jwt.mail_key
    // ) as UserVerifyAccountJWTPayload;

    // const user = await this.userService.findById(decoded.user_id);
    // if (!user || user?.verified) {
    //   throw new UserAccountAlreadyVerified();
    // }

    // await this.userService.findByIdAndUpdate(user._id, { verified: true });
    // return decoded.user_id;
    return true;
  }

  public async forgotPassword(
    request: ValidatedRequest<UserForgotPasswordRequest>
  ) {
    // const user = await this.userService.findOne({ email: request.body.email });
    // if (user) {
    //   this.userService.sendForgotPasswordEmail(user);
    // }
    return true;
  }

  public async resetPassword(
    request: ValidatedRequest<UserResetPasswordRequest>
  ) {
    // const decoded = Jwt.verify(
    //   request.body.token,
    //   Constants.jwt.mail_key
    // ) as UserResetPasswordJWTPayload;

    // const user = await this.userService.findById(decoded.user_id);
    // if (!user) {
    //   throw new UserDoesNotExistError();
    // }

    // const matchedOldPassword = await Bcrypt.compare(
    //   request.body.password,
    //   user.password
    // );
    // if (matchedOldPassword) {
    //   throw new UserResetPasswordError();
    // }
    // const newPassword = await Bcrypt.hash(request.body.password);
    // await this.userService.findByIdAndUpdate(user._id, {
    //   password: newPassword,
    // });
    return true;
  }
}

export default new UserController();
