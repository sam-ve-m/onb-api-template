import { Module } from '@nestjs/common';
import { RedisModule as RedisModuleNest } from 'nestjs-redis';
import { SecretService } from '../aws/secret-manager/secret.service';

@Module({
    imports: [
        RedisModuleNest.forRootAsync({
            useFactory: async (secreatService: SecretService) => {
                const connection = await secreatService.getSecret();
                return {
                    url: connection.dbRedisHost,
                };
            },
            inject: [SecretService],
        }),
    ],
    providers: [],
})
export class RedisModule {}
