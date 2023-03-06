import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BaseRepository } from '../../common/database/database.repository';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './user.interface';

@Injectable()
export class UserRepository extends BaseRepository<IUser> {
  constructor(@InjectModel('User') userModel: Model<IUser>) {
    super(userModel);
  }
}
