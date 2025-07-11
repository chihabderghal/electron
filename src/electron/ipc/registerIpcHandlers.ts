import { DataSource } from 'typeorm';
import { GetUsersHandler, SaveUserHandler } from './handlers/userHandler.js';

export function registerIpcHandlers(dataSource: DataSource) {
    SaveUserHandler(dataSource);
    GetUsersHandler(dataSource);
}
