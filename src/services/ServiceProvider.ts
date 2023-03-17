import { Entity, Repository, Schema } from "redis-om";
import Redis from "./Redis";

abstract class ServiceProvider {
    protected redisClient: Redis;

    constructor() {
        this.redisClient = new Redis();
    }

    protected async repository(schema: Schema<Entity>): Promise<Repository<Entity>> {
        await this.redisClient.connect();
        const repo = this.redisClient.fetchRepository(schema);
        await this.redisClient.disconnect();
        return repo;
    }
}

export default ServiceProvider;