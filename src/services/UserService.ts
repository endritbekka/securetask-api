
import { Entity, EntityData, Repository, Schema } from "redis-om";
import { userSchema } from "../entities/User";
import RepositoryService from "./AbstractRepositoryService";
import Redis from "./Redis";


class User extends RepositoryService {

    // private async repository(): Promise<Repository<Entity>> {
    //     await this.client.connect();
    //     return this.client.fetchRepository(userSchema)        
    // }

    public async createAndSave() {
        const repository = await this.repository(userSchema)
        // const id = await repository.createAndSave();
        // return id;
    }
}

export default User;