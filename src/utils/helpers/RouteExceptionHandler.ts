import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../lib/types";

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
            await cb(req, res, next)
        } catch (error: unknown) {
            next(error)
        }
    }
}