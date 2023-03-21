export { ValidatedRequest } from "express-joi-validation";
export interface RequestBody {
  [key: string]: any;
}

export interface RequestParams {
  [key: string]: string;
}

export type ErrorResponse = {
  error: boolean;
  name: string;
  message: string;
  statusCode: number;
  details: object;
};
