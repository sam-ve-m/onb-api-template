import { UserRepository } from './user.repository';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './user.schema';
import { UserService } from './user.service';
import { IUser } from './user.interface';

@Module({
  imports: [MongooseModule.forFeature([{ name: IUser.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UsersModule {}
