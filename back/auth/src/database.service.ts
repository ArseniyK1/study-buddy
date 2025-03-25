import { Injectable } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

// Интерфейс для конфигурации БД
export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  schema?: string; // Опционально
  synchronize?: boolean; // Опционально (для разработки)
}

@Injectable()
export class DatabaseService {
  private dataSource: DataSource;

  // Подключение к БД с объектом конфигурации
  async connect(config: DatabaseConfig) {
    const options: DataSourceOptions = {
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      schema: config.schema || 'public', // Дефолтная схема
      entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Путь к сущностям
      synchronize: config.synchronize || false, // Автоматические миграции (осторожно!)
      logging: true, // Логирование запросов
    };

    this.dataSource = new DataSource(options);
    await this.dataSource.initialize();
    console.log('Database connected successfully!');
  }

  // Выполнение SQL-запроса
  async query(sql: string, params?: any[]) {
    return this.dataSource.query(sql, params);
  }

  // Отключение от БД
  async disconnect() {
    await this.dataSource?.destroy(); // Опциональная проверка на существование
    console.log('Database disconnected');
  }
}
