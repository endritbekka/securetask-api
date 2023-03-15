import { Router, Request, Response } from "express";
import { RouteExceptionHandler } from "../utils/helpers/RouteExceptionHandler";
import RouteResponse from "../utils/helpers/RouteResponse";

const router = Router();

router.post('/create-and-save', RouteExceptionHandler(async (req: Request, res: Response) => {
    RouteResponse.success(res, { running: 1 })
}))

export default router;

