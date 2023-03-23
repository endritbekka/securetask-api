import { Entity } from "redis-om";
import { userSchema } from "../entities/User";
import { CreateAndSaveUser, User as UserI } from "../lib/types";
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

  // public generateAccessToken(user: Partial<UserI>) {
  //   return Jwt.sign({
  //     payload: GeneralHelper.withoutKeys(user, ['password']),
  //     secretOrPrivateKey: Constants.jwt.auth_key,
  //   });
  // }
}

export default User;
