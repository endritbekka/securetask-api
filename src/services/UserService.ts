import { Entity } from "redis-om";
import { userSchema } from "../entities/User";
import { CreateAndSaveUser, CreateUserSession } from "../lib/types";
import { userSessionSchema } from "../entities/UserSession";
import ServiceProvider from "./ServiceProvider";
import crypto from "crypto";

class User extends ServiceProvider {
  public async createAndSave(data: CreateAndSaveUser) {
    const repository = await this.repository(userSchema);
    const entity = await repository.createAndSave(data);
    return entity.entityId;
  }

  public async emailExists(email: string): Promise<Entity | null> {
    const repository = await this.repository(userSchema);
    return await repository
      .search()
      .where("email")
      .is.equalTo(email)
      .return.first();
  }

  public generateToken() {
    return crypto.randomBytes(30).toString("hex");
  }

  public getAccessTokenExpire() {
    const currentTime = new Date().getTime();
    const fiveMinutesLater = new Date(currentTime + 5 * 60 * 1000).getTime();
    return fiveMinutesLater;
  }

  public getRefreshTokenExpire() {
    const currentTime = new Date().getTime();
    const twoDaysLater = new Date(
      currentTime + 2 * 24 * 60 * 60 * 1000
    ).getTime();
    return twoDaysLater;
  }

  public tokenExpired(exp: number) {
    return new Date().getTime() >= exp;
  }

  public async findByEntityId(entityId: string) {
    const repository = await this.repository(userSchema);
    return await repository.fetch(entityId);
  }

  public async deleteSessionByEntityId(entityId: string) {
    const repository = await this.repository(userSessionSchema);
    return await repository.remove(entityId);
  }

  public async findSession(key: string, token: string) {
    const repository = await this.repository(userSessionSchema);
    return await repository
      .search()
      .where(key)
      .is.equalTo(token)
      .return.first();
  }

  public async saveSession(user_entity_id: string) {
    const repository = await this.repository(userSessionSchema);
    return await repository.createAndSave({
      user_entity_id: user_entity_id,
      access_token: this.generateToken(),
      refresh_token: this.generateToken(),
      access_token_exp: this.getAccessTokenExpire(),
      refresh_token_exp: this.getRefreshTokenExpire(),
    });
  }
}

export default User;
