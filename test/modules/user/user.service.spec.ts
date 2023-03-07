import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../../../src/modules/user/user.model';
import { UserService } from '../../../src/modules/user/user.service';
import { UserRepository } from '../../../src/modules/user/user.repository';

describe('UserService', () => {
  let service: UserService;
  let userModel: Model<User>;

  const mockUser: User = {
    _id: '605d27edf44ab71f8c2d3773',
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: '123456',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: {
            find: jest.fn(),
            findById: jest.fn(),
            create: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userModel = module.get<Model<User>>(getModelToken(User.name));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(userModel, 'find').mockResolvedValueOnce([mockUser]);

      const users = await service.findAll();

      expect(users).toEqual([mockUser]);
      expect(userModel.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('findById', () => {
    it('should return a user by ID', async () => {
      jest.spyOn(userModel, 'findById').mockResolvedValueOnce(mockUser);

      const user = await service.findById(mockUser._id);

      expect(user).toEqual(mockUser);
      expect(userModel.findById).toHaveBeenCalledTimes(1);
      expect(userModel.findById).toHaveBeenCalledWith(mockUser._id);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: User = {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        password: 'abcdef',
      };
      const createdUser = await service.create(newUser);

      expect(createdUser).toBeUndefined();
      expect(userModel.create).toHaveBeenCalledTimes(1);
      expect(userModel.create).toHaveBeenCalledWith(newUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      jest.spyOn(userModel, 'findByIdAndUpdate').mockResolvedValueOnce(mockUser);

      const updatedUser = {
        _id: mockUser._id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '654321',
      };
      const result = await service.update(mockUser._id, updatedUser);

      expect(result).toEqual(mockUser);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(userModel.findByIdAndUpdate).toHaveBeenCalledWith(mockUser._id, updatedUser, { new: true });
    });
  });

  describe('delete', () => {
    it('should delete an existing user', async () => {
      jest.spyOn(userModel, 'findByIdAndRemove').mockResolvedValueOnce(mockUser);

      const result = await service.delete(mockUser._id);

      expect(result).toEqual(mockUser);
      expect(userModel.findByIdAndRemove).toHaveBeenCalledTimes(1);
      expect(userModel.findByIdAndRemove).toHaveBeenCalledWith(mockUser._id);
    });
  });
});
