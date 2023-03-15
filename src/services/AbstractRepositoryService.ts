import { Entity, Repository, Schema } from "redis-om";
import Redis from "./Redis";

abstract class RepositoryService {
    protected client: Redis;

    constructor() {
        this.client = new Redis();
    }

    protected async repository(schema: Schema<Entity>): Promise<Repository<Entity>> {
        await this.client.connect();
        const repo = this.client.fetchRepository(schema);
        await this.client.disconnect();
        return repo;
    }
}

export default RepositoryService;