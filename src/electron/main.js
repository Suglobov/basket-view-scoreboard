const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');


const basePath = path.join(app.getAppPath());

function createWindows() {
    ipcMain.on('settings', (_event, message) => {
        viewWindow.webContents.send('settings', message);
    });

    const preloadPath = path.join(__dirname, 'preload.js');
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
        pathname: path.join(basePath, '/dist/settings.html'),
    }));
    settingsWindow.webContents.openDevTools();
    // settingsWindow.maximize();

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
        pathname: path.join(basePath, '/dist/index.html'),
    }));
    viewWindow.webContents.openDevTools();
    // viewWindow.maximize();
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
