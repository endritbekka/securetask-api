import { Router, Request, Response } from "express";
import { ValidatedRequest } from "express-joi-validation";
import UserController from "../Http/Controllers/UserController";
import BaseResponse from "../Http/Responses/BaseResponse";
import {
  CreateAndSaveUserRequest,
  RouteValidator,
  RouteValidatorSchema,
} from "../lib/RouteValidations";

const router = Router();

router.post(
  "/create-and-save",
  RouteValidator.body(RouteValidatorSchema.createAndSaveUser()),
  async (
    request: ValidatedRequest<CreateAndSaveUserRequest>,
    response: Response
  ) => {
    // BaseResponse(response).success(await UserController.createAndSave(request))
  }
);

export default router;
