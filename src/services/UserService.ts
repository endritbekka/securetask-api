
import { Entity, EntityData, Repository } from "redis-om";
import { userSchema } from "../entities/User";
import Redis from "./Redis";


class User {
    private client: Redis;
    private userRepo: Repository<Entity>;
    
    constructor() {
        this.client = new Redis();
        this.userRepo = this.client.fetchRepository(userSchema)
    }

    public async createAndSave() {
        await this.client.connect();
        const id = await this.userRepo.createAndSave()
        return id;
    }
}

export default User;