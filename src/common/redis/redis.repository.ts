import { Injectable } from '@nestjs/common';
import { Redis, RedisService } from 'nestjs-redis';

@Injectable()
export class RedisRepository {
  private readonly redisClient: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redisClient = this.redisService.getClient();
  }

  public async getMultipleValues(keys: string[]): Promise<string[]> {
    if (!keys.length) return [];
    return this.redisClient.mget(keys);
  }

  public async getRangeFromSortedSet(key: string, offset = 0, limit = 100): Promise<string[]> {
    return this.redisClient.zrange(key, Number(offset), Number(limit));
  }

  public async getKeysByPattern(pattern: string): Promise<string[]> {
    return this.redisClient.keys(`*${pattern}*`);
  }

  public async getDatabaseSize(): Promise<number> {
    return this.redisClient.dbsize();
  }
}
