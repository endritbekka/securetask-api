import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../lib/types";
import { BaseRequestClass } from "../../Http/Requests/BaseRequest";
import BaseResponse from "../../Http/Responses/BaseResponse";

export function UnknownError(err: unknown): ErrorResponse {
    return {
        error: true,
        name: 'unknown-error',
        message: 'Unknown error occurred',
        statusCode: 500,
        details: {
            message: (err as Error)?.message || null 
        }
    }
}

export function RouteExceptionHandler(cb: Function) {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await cb(new BaseRequestClass(req), BaseResponse(res), next)
        } catch (error: unknown) {
            next(error)
        }
    }
}