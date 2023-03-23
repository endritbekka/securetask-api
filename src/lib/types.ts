import { ContainerTypes, ValidatedRequestSchema } from "express-joi-validation";
import { EntityData } from "redis-om";

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

export interface User {
  entityId: string;
  username: string;
  password: string;
  email: string;
  verified: boolean;
  two_factor_auth_enabled: boolean;
}

export interface CreateAndSaveUser extends EntityData, Omit<User, 'entityId'> {}

export interface CreateAndSaveUserRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: CreateAndSaveUser;
}

export interface UserLogin extends EntityData {
  email: string;
  password: string;
}
export interface UserLoginRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: UserLogin;
}