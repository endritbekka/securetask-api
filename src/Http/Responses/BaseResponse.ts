import { Response } from "express";
import {
  BaseError,
  InternalServerError,
  JoiError,
  RouteNotFoundError,
} from "../../utils/exceptions/Exceptions";
import { ExpressJoiError } from "express-joi-validation";
class BaseResponse {
  private response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  private handleError(err: unknown) {
    const errOccurred =
      err instanceof BaseError ? err : new InternalServerError();
    this.response.status(errOccurred.statusCode).json(errOccurred);
  }

  public success(body: object | string | number | boolean | null) {
    this.response.status(200).json({
      error: false,
      message: body,
    });
  }

  public error(err: unknown) {
    if ((err as ExpressJoiError)?.error?.isJoi) {
      err = new JoiError(err as ExpressJoiError);
    }
    this.handleError(err);
  }

  public routeNotFound() {
    this.handleError(new RouteNotFoundError());
  }
}

export default (response: Response) => new BaseResponse(response);
