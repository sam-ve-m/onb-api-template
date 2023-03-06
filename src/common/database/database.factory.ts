import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const mongooseFactory = (configService: ConfigService): MongooseModule => {
  return MongooseModule.forRoot(
    `mongodb://${configService.get('DB_HOST')}:${configService.get('DB_PORT')}/${configService.get('DB_NAME')}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    },
  );
};
