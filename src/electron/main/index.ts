import 'reflect-metadata';
import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { AppDataSource } from '../db/data-source.js';
import { User } from '../db/entities/User.js';
import { registerIpcHandlers } from '../ipc/registerIpcHandlers.js';

let mainWindow: BrowserWindow | null = null;

function isDev(): boolean {
  return process.env.NODE_ENV === 'development';
}

async function initDatabase() {
  try {
    await AppDataSource.initialize();
    console.log('✅ Data Source initialized successfully.');
  } catch (err) {
    console.error('❌ Failed to initialize Data Source:', err);
    app.quit();
  }
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(app.getAppPath(), isDev() ? '.' : '..', 'dist-electron/preload/preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
    },
  });

  if (isDev()) {
    mainWindow.loadURL('http://localhost:5123');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), 'dist-react/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// App Lifecycle Events
app.whenReady().then(async () => {
  await initDatabase();
  registerIpcHandlers(AppDataSource);
  createMainWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createMainWindow();
  }
});
