import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { mongooseFactory } from './database.factory';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: mongooseFactory,
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
