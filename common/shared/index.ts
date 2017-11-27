import { SyncOptions } from 'sequelize';
import { SequelizeConfig } from 'sequelize-typescript/lib/types/SequelizeConfig';

export interface Config {
  port?: number;
  secret?: string;
  env?: string;
  fileLog?: string | boolean;
  sequelizeConfig?: SequelizeConfig;
  syncOptions?: SyncOptions;
  fb?: {
    appId: string,
    appSecret: string,
    scope: string,
  };
  uploadPath?: string;
  host?: string;
}
