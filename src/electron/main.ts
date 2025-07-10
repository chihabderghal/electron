import {app, BrowserWindow, ipcMain} from 'electron';
import path from 'path';
import { isDev } from "./utils.js";
import { getPreloadPath } from "./pathResolver.js";

let mainWindow: BrowserWindow | null = null;

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