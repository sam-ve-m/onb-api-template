// users.service.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from '../../../src/modules/user/user.service';
import { User } from '../../../src/modules/user/user.model';
import { UserSchema } from '../../../src/modules/user/user.schema';

describe('UserService', () => {
  let service: UserService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          useFactory: async (configService: ConfigService) => ({
            uri: `mongodb://${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get(
              'DB_NAME',
            )}`,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          }),
          inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const createdUser = await service.create({
      name: 'fake_name',
      password: 'fake_password',
      email: 'fake@example.com',
    });

    expect(createdUser).toHaveProperty('id');
    expect(createdUser.name).toBe('fake_name');
    expect(createdUser.password).toBe('fake_password');
    expect(createdUser.email).toBe('fake@example.com');
  });

  it('should find all users', async () => {
    const users = await service.findAll();

    expect(users).toHaveLength(1);
  });
});
