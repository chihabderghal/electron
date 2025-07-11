import { IpcMainInvokeEvent, ipcMain } from 'electron';
import { DataSource } from 'typeorm';
import { User } from '../../db/entities/User.js';

export function SaveUserHandler(dataSource: DataSource) {
  ipcMain.handle('save-user', async (_event: IpcMainInvokeEvent, user: { name: string; email: string }) => {
    if (!dataSource.isInitialized) {
      return { success: false, error: 'Database not initialized' };
    }

    try {
      const userRepo = dataSource.getRepository(User);
      const newUser = userRepo.create(user);
      await userRepo.save(newUser);
      return { success: true };
    } catch (error) {
      console.error('Error saving user:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  });
}

export function GetUsersHandler(dataSource: DataSource) {
  ipcMain.handle('get-users', async () => {
    if (!dataSource.isInitialized) {
      console.error('Tried to fetch users before DB initialization');
      return [];
    }

    try {
      const userRepo = dataSource.getRepository(User);
      return await userRepo.find();
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  });
}