import 'reflect-metadata';
import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { isDev } from "./utils.js";
import { getPreloadPath } from "./pathResolver.js";
import { AppDataSource } from './db/data-source.js';
import { User } from './db/entities/User.js';

let mainWindow: BrowserWindow | null = null;

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!");
}).catch((err) => {
    console.error("Error during Data Source initialization", err);
});

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: getPreloadPath(),
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        },
    });

    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// IPC Handlers
ipcMain.handle('save-user', async (event, user: { name: string, email: string }) => {
    if (!AppDataSource.isInitialized) {
        return {success: false, error: "Database not initialized"};
    }

    try {
        const userRepository = AppDataSource.getRepository(User);
        const newUser = new User();
        newUser.name = user.name;
        newUser.email = user.email;
        await userRepository.save(newUser);
        return {success: true};
    } catch (error) {
        console.error('Error saving user:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
});

ipcMain.handle('get-users', async () => {
    if (!AppDataSource.isInitialized) {
        console.error("Database not initialized when fetching users");
        return [];
    }

    try {
        const userRepository = AppDataSource.getRepository(User);
        return await userRepository.find();
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
});


app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});