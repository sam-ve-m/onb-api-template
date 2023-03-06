import { Injectable } from '@nestjs/common';
import { IUser } from './user.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async findById(id: string): Promise<IUser> {
    return this.userRepository.findById(id);
  }

  async create(user: IUser): Promise<IUser> {
    return this.userRepository.create(user);
  }

  async update(id: string, user: IUser): Promise<IUser> {
    return this.userRepository.update(id, user);
  }

  async delete(id: string): Promise<IUser> {
    return this.userRepository.delete(id);
  }
}
