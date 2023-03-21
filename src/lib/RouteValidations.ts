
import * as Joi from 'joi'
import { createValidator } from 'express-joi-validation'

export const RouteValidator = createValidator({ passError: true })
export class RouteValidatorSchema {
    static createAndSaveUser() {
        const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),

            password: Joi.string()
                .min(6)
                .max(12)
                .required(),

            email: Joi.string()
                .email({ minDomainSegments: 2, }).required()
        })
        return schema;
    }
}