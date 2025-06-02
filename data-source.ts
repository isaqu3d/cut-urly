import * as dotenv from 'dotenv';
import { Url } from 'src/url/entities/url.entity';
import { DataSource } from 'typeorm';

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
  ssl: {
    rejectUnauthorized: false,
  },
});
