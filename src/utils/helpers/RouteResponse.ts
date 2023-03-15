import { Response } from "express";
import { BaseError } from "../exceptions/Exceptions";
import { UnknownError } from "./RouteExceptionHandler";

class RouteResponse {
    public success(res: Response, body: any) {
        res.status(200).json({
            error: false,
            message: body
        })
    }
    public error(err: unknown, res: Response) {
        const errOccurred = err instanceof BaseError ? err : UnknownError(err)
        res.status(errOccurred.statusCode).json(errOccurred)
    }
}

export default new RouteResponse();