// const { app, BrowserWindow, autoUpdater } = require('electron');
// const path = require('path');

// let mainWindow;

// app.whenReady().then(() => {
//     mainWindow = new BrowserWindow({
//         width: 800,
//         height: 600,
//         webPreferences: {
//             nodeIntegration: true
//         }
//     });

//     mainWindow.loadURL(`file://${path.join(__dirname, 'dist/nombre-de-tu-app/index.html')}`);

//     mainWindow.on('closed', () => {
//         mainWindow = null;
//     });

//     autoUpdater.checkForUpdatesAndNotify();
// });

// app.on('window-all-closed', () => {
//     if (process.platform !== 'darwin') {
//         app.quit();
//     }
// });
