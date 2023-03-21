import { Router, Request, Response } from "express";
import UserController from "../Http/Controllers/UserController";
import BaseResponse from "../Http/Responses/BaseResponse";
import { RouteValidator, RouteValidatorSchema } from "../lib/RouteValidations";

const router = Router();

router.post('/create-and-save', RouteValidator.body(RouteValidatorSchema.createAndSaveUser()), async (request: Request, response: Response) => {
    BaseResponse(response).success(await UserController.createAndSave(request))
})

export default router;