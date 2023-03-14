import { Router, Request, Response, NextFunction } from "express";
import { InternalServerError } from "../utils/exceptions/Exceptions";
import { RouteExceptionHandler } from "../utils/helpers/RouteExceptionHandler";
import RouteResponse from "../utils/helpers/RouteResponse";

const router = Router();

router.get('/', RouteExceptionHandler(async (req: Request, res: Response, next: NextFunction) => {
    RouteResponse.success(res, { running: 1 })
}))

export default router;

