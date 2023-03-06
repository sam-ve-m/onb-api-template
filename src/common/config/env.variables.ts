import { IsEnum, IsNumber, IsString } from 'class-validator';

export enum NodeEnv {
  Local = 'local',
  Development = 'dev',
  Homologation = 'hml',
  Production = 'prd',
}

export class EnvironmentVariables {
  @IsEnum(NodeEnv)
  NODE_ENV: NodeEnv;

  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsString()
  DB_NAME: string;
}
