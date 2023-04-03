import { Router, Response, Request } from "express";
import UserController from "../Http/Controllers/UserController";
import BaseResponse from "../Http/Responses/BaseResponse";
import {
  CreateAndSaveUserRequest,
  UserForgotPasswordRequest,
  UserLoginRequest,
  UserResetPasswordRequest,
  UserVerifyAccountRequest,
  ValidatedRequest,
} from "../lib/types";
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations";
import AuthMiddleware from "../Http/Middlewares/AuthMiddleware";

const router = Router();

router.post(
  "/create-and-save",
  RouteValidator.body(RouteValidatorSchema.createAndSaveUser()),
  async (
    request: ValidatedRequest<CreateAndSaveUserRequest>,
    response: Response
  ) => {
    BaseResponse(response).success(await UserController.createAndSave(request));
  }
);

router.post(
  "/login",
  RouteValidator.body(RouteValidatorSchema.loginUser()),
  async (request: ValidatedRequest<UserLoginRequest>, response: Response) => {
    BaseResponse(response).success(await UserController.login(request));
  }
);

router.post(
  "/logout",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  [
    AuthMiddleware.validateAccessToken,
    AuthMiddleware.validateAccessTokenExpiration,
  ],
  async (request: Request, response: Response) => {
    BaseResponse(response).success(await UserController.logout(request));
  }
);

router.post(
  "/re-generate-access-token",
  RouteValidator.headers(RouteValidatorSchema.reGenerateAccessToken()),
  AuthMiddleware.validateAccessToken,
  async (request: Request, response: Response) => {
    BaseResponse(response).success(
      await UserController.reGenerateAccessToken(request)
    );
  }
);

router.post(
  "/verify-account",
  RouteValidator.body(RouteValidatorSchema.verifyUserAccount()),
  async (
    request: ValidatedRequest<UserVerifyAccountRequest>,
    response: Response
  ) => {
    BaseResponse(response).success(await UserController.verifyAccount(request));
  }
);

router.post(
  "/forgot-password",
  RouteValidator.body(RouteValidatorSchema.userForgotPassword()),
  async (
    request: ValidatedRequest<UserForgotPasswordRequest>,
    response: Response
  ) => {
    BaseResponse(response).success(
      await UserController.forgotPassword(request)
    );
  }
);

router.post(
  "/reset-password",
  RouteValidator.body(RouteValidatorSchema.resetPassword()),
  async (
    request: ValidatedRequest<UserResetPasswordRequest>,
    response: Response
  ) => {
    BaseResponse(response).success(await UserController.resetPassword(request));
  }
);

router.get(
  "/me",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  [
    AuthMiddleware.validateAccessToken,
    AuthMiddleware.validateAccessTokenExpiration,
    AuthMiddleware.populateUser,
  ],
  async (request: Request, response: Response) => {
    BaseResponse(response).success(UserController.me(request));
  }
);

export default router;
