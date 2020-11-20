import { contextBridge, ipcRenderer, desktopCapturer } from 'electron';

let viewWebContentsId;
ipcRenderer.invoke('getViewWebContentsId').then((result) => {
    viewWebContentsId = result;
});

ipcRenderer.on('settings', (_event, message) => {
    reciveSettingsStorage.forEach((cb) => cb(message));
});

const reciveSettingsStorage = [];

const sourceForCapturePromise = desktopCapturer.getSources({ types: ['window'] });

const electron = {
    sendSettings: (message) => {
        ipcRenderer.sendTo(viewWebContentsId, 'settings', message);
    },
    receiveSettings: (cb) => {
        reciveSettingsStorage.push(cb);
    },
    sourceForCapturePromise,
};
contextBridge.exposeInMainWorld('electron', electron);
