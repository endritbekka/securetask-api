
import { Client, Entity, Repository, Schema } from 'redis-om'
import Constants from '../utils/Constants'

class Redis {
    private client: Client;
    
    constructor() {
        this.client = new Client();
    }

    public async connect(): Promise<void> {
        if (!this.client.isOpen()) {
            await this.client.open(Constants.redis.url);
        }
    }

    public async disconnect(): Promise<void> {
        await this.client.close();
    }

    public fetchRepository(schema: Schema<Entity>): Repository<Entity>{
        return this.client.fetchRepository(schema)
    }
}

export default Redis;