

import { Response } from 'express'
import { BaseError, JoiError, RouteNotFoundError } from '../../utils/exceptions/Exceptions';
import { UnknownError } from '../../utils/helpers/RouteExceptionHandler';
import { ExpressJoiError } from 'express-joi-validation'
class BaseResponse {
    private response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    private handleError(err: unknown){
        const errOccurred = err instanceof BaseError ? err : UnknownError(err)
        this.response.status(errOccurred.statusCode).json(errOccurred)
    }

    public success(body: object) {
        this.response.status(200).json({
            error: false,
            message: body
        })
    }
    
    public error(err: unknown) {
       try {
            if ((err as ExpressJoiError)?.error?.isJoi) throw new JoiError((err as ExpressJoiError))
            this.handleError(err)
        } catch (err: unknown){
            this.handleError(err)
        }
    }

    public routeNotFound() {
        try {
            throw new RouteNotFoundError()
        } catch (err:unknown){
            this.handleError(err)
        }
    }
}

export default (response: Response) => new BaseResponse(response)
