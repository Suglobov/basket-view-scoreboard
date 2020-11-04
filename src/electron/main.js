import path from 'path';
import url from 'url';
import { app, BrowserWindow, ipcMain } from 'electron';

const basePath = path.join(app.getAppPath());
const preloadPath = path.join(basePath, 'dist/electron/preload.js');
const viewHtmlPath = path.join(basePath, '/dist/index.html');
const settingsHtmlPath = path.join(basePath, '/dist/settings.html');

function createWindows() {
    ipcMain.on('settings', (_event, message) => {
        viewWindow.webContents.send('settings', message);
    });

    const viewWindow = new BrowserWindow({
        webPreferences: {
            enableRemoteModule: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: preloadPath,
        },
        autoHideMenuBar: true,
    });
    viewWindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: viewHtmlPath,
    }));
    // viewWindow.webContents.openDevTools();
    // viewWindow.maximize();

    const settingsWindow = new BrowserWindow({
        webPreferences: {
            enableRemoteModule: true,
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: preloadPath,
        },
    });
    settingsWindow.loadURL(url.format({
        protocol: 'file',
        slashes: true,
        pathname: settingsHtmlPath,
    }));
    // settingsWindow.webContents.openDevTools();
    // settingsWindow.maximize();
}

app.whenReady().then(() => {
    createWindows();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
