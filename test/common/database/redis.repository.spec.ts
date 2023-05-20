import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from 'nestjs-redis';
import { RedisRepository } from '../../../src/common/redis/redis.repository';

describe('RedisRepository', () => {
  let repository: RedisRepository;
  let redisService: RedisService;
  let redisClient: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RedisRepository,
        {
          provide: RedisService,
          useValue: {
            getClient: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<RedisRepository>(RedisRepository);
    redisService = module.get<RedisService>(RedisService);
    redisClient = {
      mget: jest.fn().mockResolvedValue([]),
      zrange: jest.fn().mockResolvedValue([]),
      keys: jest.fn().mockResolvedValue([]),
      dbsize: jest.fn().mockResolvedValue(0),
    };

    jest.spyOn(redisService, 'getClient').mockReturnValue(redisClient);
  });

  it('should return an array of values for given keys', async () => {
    const keys = ['key1', 'key2'];
    await repository.getMultipleValues(keys);
    expect(redisClient.mget).toHaveBeenCalledWith(...keys);
  });

  it('should return a range of values for a sorted set key', async () => {
    const key = 'key';
    await repository.getRangeFromSortedSet(key);
    expect(redisClient.zrange).toHaveBeenCalledWith(key, 0, 100);
  });

  it('should return keys matching a pattern', async () => {
    const pattern = 'pattern';
    await repository.getKeysByPattern(pattern);
    expect(redisClient.keys).toHaveBeenCalledWith(`*${pattern}*`);
  });

  it('should return the database size', async () => {
    await repository.getDatabaseSize();
    expect(redisClient.dbsize).toHaveBeenCalled();
  });
});
