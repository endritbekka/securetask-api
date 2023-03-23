import * as Joi from "joi";
import { createValidator } from "express-joi-validation";

export const RouteValidator = createValidator({ passError: true });
export class RouteValidatorSchema {
  static createAndSaveUser() {
    return Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().min(6).max(12).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      verified: Joi.boolean().default(false).valid(false),
      two_factor_auth_enabled: Joi.boolean().default(true).valid(true),
    });
  }

  static loginUser() {
    return Joi.object({
      password: Joi.string().min(6).max(12).required(),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
    });
  }
}
