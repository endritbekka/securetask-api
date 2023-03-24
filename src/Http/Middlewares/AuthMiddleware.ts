import { NextFunction, Request, Response } from "express";
import { User, UserSession } from "../../lib/types";
import UserService from "../../services/UserService";
import {
  AccessTokenExpired,
  InvalidAccessToken,
} from "../../utils/exceptions/Exceptions";
import GeneralHelper from "../../utils/helpers/General";

class AuthMiddleware {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public validateAccessToken = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const access_token = request.headers.access_token as string;
    const result = await this.userService.findSession(
      "access_token",
      access_token
    );
    if (!result) {
      throw new InvalidAccessToken();
    }
    const session: UserSession = this.userService.toRedisJson(
      result
    ) as unknown as UserSession;

    if (this.userService.tokenExpired(session.access_token_exp)) {
      throw new AccessTokenExpired();
    }
    request.session = session;
    next();
  };

  public populateUser = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const entity = await this.userService.findByEntityId(
      request.session.user_entity_id
    );
    const user: Partial<User> = GeneralHelper.withoutKeys(
      this.userService.toRedisJson(entity) as unknown as User,
      ["password"]
    );

    request.user = user;
    next();
  };
}

export default new AuthMiddleware();
