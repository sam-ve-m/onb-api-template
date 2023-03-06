import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class BaseRepository<T> {
  constructor(@Inject('MODEL_TOKEN') private readonly model: Model<T>) {}

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async findById(id: string): Promise<T> {
    return this.model.findById(id);
  }

  async create(user: T): Promise<T> {
    return this.model.create(user);
  }

  async update(id: string, user: T): Promise<T> {
    return this.model.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string): Promise<T> {
    return this.model.findByIdAndRemove(id);
  }
}
