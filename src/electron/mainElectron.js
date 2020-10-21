// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const path = require('path');
const ipc = require('electron').ipcMain;
// console.log(window);
let settingsWindow;
ipc.on('reply', (event, message) => {
    // console.log(event, message);
    settingsWindow.webContents.send('messageFromMain', `This is the message from the second window: ${message}`);
});

function createWindow() {
    // Create the browser window.
    settingsWindow = new BrowserWindow({
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
            preload: path.join(app.getAppPath(), 'preloadElectron.js'),
        },
    });
    settingsWindow.loadURL(path.join(__dirname, '/dist/settings.html'));
    settingsWindow.webContents.openDevTools();
    settingsWindow.maximize();



    // const viewWindow = new BrowserWindow({    });
    // viewWindow.loadURL(path.join(__dirname, '/dist/index.html'));
    // viewWindow.webContents.openDevTools();
    // viewWindow.maximize();
}

app.whenReady().then(() => {
    createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});
