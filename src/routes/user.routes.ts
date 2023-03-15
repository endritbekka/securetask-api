import { Router, Request, Response } from "express";
import UserController from "../controllers/UserController";
import { RouteExceptionHandler } from "../utils/helpers/RouteExceptionHandler";
import RouteResponse from "../utils/helpers/RouteResponse";

const router = Router();

router.post('/create-and-save', RouteExceptionHandler(async (req: Request, res: Response) => {
    RouteResponse.success(res, await UserController.createAndSave());
}))

export default router;

