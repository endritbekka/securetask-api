import { Router } from "express";
import UserController from "../Http/Controllers/UserController";
import BaseRequest from "../Http/Requests/BaseRequest";
import UserRequest from "../Http/Requests/UserRequest";
import BaseResponse from "../Http/Responses/BaseResponse";
import { RouteExceptionHandler } from "../utils/helpers/RouteExceptionHandler";

const router = Router();

router.post('/create-and-save', RouteExceptionHandler(async (req: BaseRequest, res: BaseResponse) => {
    // res.success(await UserController.createAndSave(req, res))
}))

export default router;

