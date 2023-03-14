import { Entity, Schema } from 'redis-om'
class User extends Entity {}

const schema = new Schema(User, {
    username: { type: 'string' },
    email: {type: 'string'},
    verified: { type: 'boolean' },
}) 

export const userSchema = schema;