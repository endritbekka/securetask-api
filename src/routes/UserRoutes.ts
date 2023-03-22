import { Router, Response } from "express";
import UserController from "../Http/Controllers/UserController";
import BaseResponse from "../Http/Responses/BaseResponse";
import {
  CreateAndSaveUserRequest,
  UserLoginRequest,
  ValidatedRequest,
} from "../lib/types";
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations";

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

export default router;
