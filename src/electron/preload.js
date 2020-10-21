const { contextBridge, ipcRenderer } = require('electron');

ipcRenderer.on('settings', (_event, message) => {
    reciveSettingsStorage.forEach((cb) => cb(message));
});

const reciveSettingsStorage = [];

const electron = {
    sendSettings: (message) => {
        ipcRenderer.send('settings', message);
    },
    receiveSettings: (cb) => {
        reciveSettingsStorage.push(cb);
    },
};

contextBridge.exposeInMainWorld('electron', electron);
