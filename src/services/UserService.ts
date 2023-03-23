import { RedisJsonData } from "redis-om";
import { userSchema } from "../entities/User";
import Jwt from "../lib/Jwt";
import { CreateAndSaveUser, User as UserI } from "../lib/types";
import ServiceProvider from "./ServiceProvider";
import Constants from "../utils/Constants";
import crypto from "crypto";
import GeneralHelper from "../utils/helpers/General";

class User extends ServiceProvider {
  public async createAndSave(data: CreateAndSaveUser) {
    const repository = await this.repository(userSchema);
    const entity = await repository.createAndSave(data);
    return entity.entityId;
  }

  public async emailExists(email: string): Promise<RedisJsonData | undefined> {
    const repository = await this.repository(userSchema);
    const result = await repository
      .search()
      .where("email")
      .is.equalTo(email)
      .return.first();
    return result?.toRedisJson();
  }

  public generateAccessToken(user: Partial<UserI>) {
    return Jwt.sign({
      payload: GeneralHelper.withoutKeys(user, ['password']),
      secretOrPrivateKey: Constants.jwt.auth_key,
    });
  }

  public generateRefreshToken() {
    return crypto.randomBytes(24).toString("hex");
  }

  // Experimental method. Not being used by now.
  private async find<T extends Record<string, any>>(conditions: T) {
    const repository = await this.repository(userSchema);
    const test = repository.search();

    for (const condition in conditions) {
      test.where(condition).is.equalTo(conditions[condition]);
    }
    return await test.return.first();
  }
}

export default User;
