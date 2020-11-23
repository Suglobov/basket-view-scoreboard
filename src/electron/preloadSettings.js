import { contextBridge, ipcRenderer } from 'electron';

let viewWebContentsId;
ipcRenderer.invoke('getViewWebContentsId').then((result) => {
    viewWebContentsId = result;
});

ipcRenderer.on('settings', (_event, message) => {
    reciveSettingsStorage.forEach((cb) => cb(message));
});

const reciveSettingsStorage = [];

const electron = {
    sendSettings: (message) => {
        ipcRenderer.sendTo(viewWebContentsId, 'settings', message);
    },
    receiveSettings: (cb) => {
        reciveSettingsStorage.push(cb);
    },
};

contextBridge.exposeInMainWorld('electron', electron);
