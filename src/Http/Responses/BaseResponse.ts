

import { Response } from 'express'
import { BaseError } from '../../utils/exceptions/Exceptions';
import { UnknownError } from '../../utils/helpers/RouteExceptionHandler';

class BaseResponse {
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    public success(body: object) {
        this.response.status(200).json({
            error: false,
            message: body
        })
    }
    
    public error(err: unknown) {
        const errOccurred = err instanceof BaseError ? err : UnknownError(err)
        this.response.status(errOccurred.statusCode).json(errOccurred)
    }
}

export default BaseResponse