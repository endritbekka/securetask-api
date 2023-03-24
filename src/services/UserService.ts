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

  public async saveSession(session: CreateUserSession) {
    const repository = await this.repository(userSessionSchema);
    return await repository.createAndSave(session);
  }
}

export default User;
