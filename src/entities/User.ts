import { Entity, Schema } from "redis-om";
import Redis from "../services/Redis";

export class UserEntity extends Entity {}

const schema = new Schema(UserEntity, {
  username: { type: "string" },
  password: { type: "string" },
  email: { type: "string" },
  verified: { type: "boolean" },
  two_factor_auth_enabled: { type: "boolean" },
});

async function createIndex() {
  const repository = await new Redis().fetchRepository(schema);
  await repository.createIndex();
}

createIndex();

export const userSchema = schema;
