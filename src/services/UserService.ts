import { userSchema } from "../entities/User";
import { CreateAndSaveUser } from "../lib/RouteValidations";
import ServiceProvider from "./ServiceProvider";

class User extends ServiceProvider {
  public async createAndSave(data: CreateAndSaveUser) {
    const repository = await this.repository(userSchema);
    const entity = await repository.createAndSave(data);
    return { id: entity.entityId };
  }

  public async emailExists(email: string): Promise<number> {
    const repository = await this.repository(userSchema);
    return await repository
      .search()
      .where("email")
      .is.equalTo(email)
      .return.count();
  }
}

export default User;
