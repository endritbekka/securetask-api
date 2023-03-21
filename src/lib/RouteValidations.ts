import * as Joi from "joi";
import {
  createValidator,
  ContainerTypes,
  ValidatedRequestSchema,
} from "express-joi-validation";

export interface CreateAndSaveUserRequest extends ValidatedRequestSchema {
  [ContainerTypes.Body]: {
    username: string;
    password: string;
    email: string;
  };
}

export const RouteValidator = createValidator({ passError: true });
export class RouteValidatorSchema {
  static createAndSaveUser() {
    const schema = Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),

      password: Joi.string().min(6).max(12).required(),

      email: Joi.string().email({ minDomainSegments: 2 }).required(),
    });
    return schema;
  }
}
