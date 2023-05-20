import { Injectable, Inject } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisRepository {
  private redis: Redis.Redis;

  constructor(@Inject('REDIS_CONFIG') private readonly redisConfig: Redis.RedisOptions) {
    this.redis = new Redis(redisConfig);
  }

  async getKeys(keyPattern: string): Promise<string[]> {
    return this.redis.keys(keyPattern);
  }

  async get(key: string): Promise<any> {
    return this.redis.get(key);
  }

  async set(key: string, value: any, expiryInSeconds: number = undefined): Promise<void> {
    return expiryInSeconds ? this.redis.set(key, value, 'EX', expiryInSeconds) : this.redis.set(key, value);
  }

  async delete(key: string): Promise<void> {
    return this.redis.del(key);
  }

  async findAll(keyPattern: string): Promise<any[]> {
    const keys = await this.getKeys(keyPattern);
    return Promise.all(keys.map((key) => this.get(key)));
  }

  async create(key: string, value: any, expiryInSeconds: number = undefined): Promise<void> {
    return this.set(key, value, expiryInSeconds);
  }

  async update(key: string, value: any, expiryInSeconds: number = undefined): Promise<void> {
    return this.set(key, value, expiryInSeconds);
  }
}
