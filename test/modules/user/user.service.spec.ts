import { UserService } from './../../../src/modules/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { User } from '../../../src/modules/user/user.model';

describe('UserService', () => {
  let service: UserService;
  const userModel = {
    create: jest.fn(),
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        UserService,
        {
          provide: getModelToken(User.name),
          useValue: userModel,
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      name: 'fake_name',
      password: 'fake_password',
      email: 'fake@example.com',
    };
    userModel.create.mockReturnValue(user);

    const createdUser = await service.create(user);

    expect(createdUser.name).toBe('fake_name');
    expect(createdUser.password).toBe('fake_password');
    expect(createdUser.email).toBe('fake@example.com');
  });

  it('should find all users', async () => {
    const user = {
      name: 'fake_name',
      password: 'fake_password',
      email: 'fake@example.com',
    };
    userModel.find.mockReturnValue([user]);

    const users = await service.findAll();

    expect(users).toHaveLength(1);
    expect(users[0].name).toBe('fake_name');
    expect(users[0].password).toBe('fake_password');
    expect(users[0].email).toBe('fake@example.com');
  });
});
