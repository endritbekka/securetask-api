import { ErrorResponse } from "../../lib/types";

export class BaseError extends Error implements ErrorResponse {
    public error: boolean = true;
    public name: string = 'securetask-api-error'
    public message: string = 'Server Error';
    public statusCode: number = 400;
    public details: object = {}

    constructor() {
        super()
    }
}

export class InternalServerError extends BaseError {
    name = 'internal-server-error'
    statusCode = 400;
    
    constructor() {
        super();
    }
}

export class RouteNotFoundError extends BaseError {
    name = 'route-not-found-error'
    message = 'This route could not be found.'
    statusCode = 404

    constructor() {
        super();
    }
}