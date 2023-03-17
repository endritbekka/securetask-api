
import { userSchema } from "../entities/User";
import ServiceProvider from './ServiceProvider'

class User extends ServiceProvider {
    public async createAndSave() {
        const repository = await this.repository(userSchema);
        const id = await repository.createAndSave();
        return id;
    }
}

export default User;