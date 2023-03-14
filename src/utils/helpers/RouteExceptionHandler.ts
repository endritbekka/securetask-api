import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../lib/types";
import { BaseError } from "../exceptions/Exceptions";

function unknownError(err: unknown): ErrorResponse {
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
            console.log('error:', error)
            if (error instanceof BaseError) {
                return res.status(error.statusCode).json(error)
            }
            const unknownErr = unknownError(error)
            res.status(unknownErr.statusCode).json(unknownErr)
        }
    }
}