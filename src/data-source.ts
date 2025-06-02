import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { Url } from './url/entities/url.entity';

dotenv.config();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Url],
  migrations: ['dist/migrations/*.js'],
  synchronize: false,
});
