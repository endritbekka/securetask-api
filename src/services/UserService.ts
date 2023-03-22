import { Entity } from "redis-om";
import { UserEntity, userSchema } from "../entities/User";
import { CreateAndSaveUser, UserLogin } from "../lib/types";
import ServiceProvider from "./ServiceProvider";

class User extends ServiceProvider {
  public async createAndSave(data: CreateAndSaveUser) {
    const repository = await this.repository(userSchema);
    const entity = await repository.createAndSave(data);
    return { id: entity.entityId };
  }

  public async emailExists(email: string): Promise<UserEntity| null> {
    const repository = await this.repository(userSchema);
    return await repository
      .search()
      .where("email")
      .is.equalTo(email)
      .return.first()
  }

  public async attemptLoginQuery(data: UserLogin) {
    const repository = await this.repository(userSchema);
    return await repository
      .search()
      .where("email")
      .is
      .equalTo(data.email)
      .where('password')
      .is
      .equalTo(data.password)
      .return.first();
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
