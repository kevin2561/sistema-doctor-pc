const { app, BrowserWindow, dialog, globalShortcut } = require('electron');
const { autoUpdater } = require('electron-updater');
const path = require('path');

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    // fullscreen: false,
    // maximizable: true,
    // resizable: true,
    // autoHideMenuBar: true,
    icon: path.join(__dirname, 'logo.ico'), // O el path a tu .ico o .png

    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      // spellcheck: true,
      // partition: "persist:loginSession"
    }
  });

  // mainWindow.setMenu(null);
  mainWindow.webContents.openDevTools();

  globalShortcut.register('Ctrl+Shift+I', () => {
    mainWindow.webContents.openDevTools();
  });


  mainWindow.webContents.session.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
  );

  const indexPath = path.join(__dirname, 'dist/doctorpc-stock/browser/index.html');
  mainWindow.loadFile(indexPath);

  // 🔹 Verifica si está en producción antes de ejecutar el actualizador
  if (app.isPackaged) {
    setupUpdater();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// 🔥 Configuración de electron-updater
function setupUpdater() {
  autoUpdater.autoDownload = true; // Se descarga automáticamente
  autoUpdater.autoInstallOnAppQuit = true; // Se instala al cerrar la app

  autoUpdater.on('checking-for-update', () => {
    console.log('Buscando actualizaciones...');
  });

  autoUpdater.on('update-available', (info) => {
    console.log(`Nueva versión disponible: ${info.version}`);
    dialog.showMessageBox({
      type: 'info',
      title: 'Actualización disponible',
      message: `Nueva versión disponible: ${info.version}. Se descargará automáticamente.`,
      buttons: ['OK']
    });
  });

  autoUpdater.on('update-not-available', () => {
    console.log('No hay actualizaciones disponibles.');
  });

  autoUpdater.on('download-progress', (progress) => {
    console.log(`Progreso de descarga: ${progress.percent.toFixed(2)}%`);
  });

  autoUpdater.on('update-downloaded', () => {
    dialog.showMessageBox({
      type: 'info',
      title: 'Actualización lista',
      message: 'La actualización se descargó. Se instalará al reiniciar la aplicación.',
      buttons: ['Reiniciar ahora', 'Después']
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on('error', (err) => {
    console.error('Error en la actualización:', err);
  });

  // 🔥 Buscar actualizaciones al iniciar
  autoUpdater.checkForUpdatesAndNotify();
}
