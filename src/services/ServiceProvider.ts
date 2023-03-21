import { Entity, Repository, Schema } from "redis-om";
import Redis from "./Redis";

abstract class ServiceProvider {
  protected redisClient: Redis;

  constructor() {
    this.redisClient = new Redis();
  }

  protected async repository(
    schema: Schema<Entity>
  ): Promise<Repository<Entity>> {
    const repo = await this.redisClient.fetchRepository(schema);
    return repo;
  }
}

export default ServiceProvider;
