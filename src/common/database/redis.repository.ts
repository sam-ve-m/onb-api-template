import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisRepository {
  private redis: Redis.Redis;

  constructor(@Inject('REDIS_CONFIG') private readonly redisConfig: Redis.RedisOptions) {
    this.redis = new Redis(redisConfig);
  }

  async findAll(keyPattern: string): Promise<any[]> {
    const keys = await this.redis.keys(keyPattern);
    const values = keys.map(async (key) => await this.redis.get(key));
    return Promise.all(values);
  }

  async findById(key: string): Promise<any> {
    return this.redis.get(key);
  }

  async create(key: string, value: any, expiryInSeconds: number = undefined): Promise<void> {
    return expiryInSeconds ? this.redis.set(key, value, 'EX', expiryInSeconds) : this.redis.set(key, value);
  }

  async update(key: string, value: any, expiryInSeconds: number = undefined): Promise<void> {
    return this.create(key, value, expiryInSeconds);
  }

  async delete(key: string): Promise<void> {
    return this.redis.del(key);
  }
}
