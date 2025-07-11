import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    saveUser: (user: { name: string, email: string }) => ipcRenderer.invoke('save-user', user),
    getUsers: () => ipcRenderer.invoke('get-users')
});