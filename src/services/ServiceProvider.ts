import { Entity, Repository, Schema } from "redis-om";
import Redis from "./Redis";

abstract class ServiceProvider {
  private redisSchemaRepo: Schema<Entity> | null = null;
  protected redisClient: Redis;

  constructor() {
    this.redisClient = new Redis();
  }

  protected async repository(
    schema: Schema<Entity>
  ): Promise<Repository<Entity>> {
    return await this.redisClient.fetchRepository(schema);
  }
}

export default ServiceProvider;
