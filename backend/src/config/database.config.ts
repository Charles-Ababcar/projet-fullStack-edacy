import { config } from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { entities } from 'src/tables';


config(); 

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: 3307,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || 'root',
  database: process.env.DB_NAME || 'bd_edacy',
  entities, // 📌 Utilisation des entités centralisées
  synchronize: true, // ⚠️ À désactiver en production
  logging: true,
  
};
