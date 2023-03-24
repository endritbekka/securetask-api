import { Router, Response, Request } from "express";
import UserController from "../Http/Controllers/UserController";
import BaseResponse from "../Http/Responses/BaseResponse";
import {
  CreateAndSaveUserRequest,
  UserLoginRequest,
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
  AuthMiddleware.validateAccessToken,
  async (request: Request, response: Response) => {
    BaseResponse(response).success(await UserController.logout(request));
  }
);

router.get(
  "/me",
  RouteValidator.headers(RouteValidatorSchema.currentUser()),
  [AuthMiddleware.validateAccessToken, AuthMiddleware.populateUser],
  async (request: Request, response: Response) => {
    BaseResponse(response).success(UserController.me(request));
  }
);

export default router;
