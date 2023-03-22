import { Client, Entity, Repository, Schema } from "redis-om";

class CustomRepository<TEntity extends Entity> extends Repository<TEntity> {
  constructor(schema: Schema<TEntity>, client: Client) {
    super(schema, client);
  }

  async getAwsRegionName(): Promise<string> {
    // Your implementation for getting the AWS region name here
    return "us-east-1";
  }

  public readEntities(ids: string[]): Promise<TEntity[]> {
    return this.readEntities(ids);
  }

  public async writeEntity(entity: TEntity): Promise<void> {
    await this.writeEntity(entity);
  }
}

export default CustomRepository;
