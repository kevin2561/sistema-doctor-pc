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


// Configuración del autoUpdater
function setupUpdater() {
  autoUpdater.autoDownload = true; // Descargar automáticamente la actualización
  autoUpdater.autoInstallOnAppQuit = true; // Instalar automáticamente al cerrar la app

  // Evento: Buscando actualizaciones
  autoUpdater.on('checking-for-update', () => {
    console.log('Buscando actualizaciones...');
  });

  // Evento: Actualización disponible
  autoUpdater.on('update-available', (info) => {
    console.log(`Nueva versión disponible: ${info.version}`);
    dialog.showMessageBox({
      type: 'info',
      title: 'Actualización disponible',
      message: `Se ha encontrado una nueva versión (${info.version}). La aplicación se actualizará automáticamente.`,
      buttons: ['OK'],
    });
  });

  // Evento: No hay actualizaciones disponibles
  autoUpdater.on('update-not-available', () => {
    console.log('No hay actualizaciones disponibles.');
  });

  // Evento: Progreso de la descarga
  autoUpdater.on('download-progress', (progress) => {
    console.log(`Progreso de descarga: ${progress.percent.toFixed(2)}%`);
  });

  // Evento: Actualización descargada
  autoUpdater.on('update-downloaded', () => {
    console.log('Actualización descargada. Reiniciando...');
    dialog.showMessageBox({
      type: 'info',
      title: 'Actualización lista',
      message: 'La actualización se ha descargado. La aplicación se reiniciará para instalar la actualización.',
      buttons: ['Reiniciar ahora'],
    }).then(() => {
      autoUpdater.quitAndInstall(); // Reiniciar e instalar la actualización
    });
  });

  // Evento: Error en la actualización
  autoUpdater.on('error', (err) => {
    console.error('Error en la actualización:', err);
    dialog.showMessageBox({
      type: 'error',
      title: 'Error en la actualización',
      message: `Ocurrió un error durante la actualización: ${err.message}`,
      buttons: ['OK'],
    });
  });

  // Buscar actualizaciones al iniciar
  autoUpdater.checkForUpdatesAndNotify();
}

// Iniciar la aplicación
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Cerrar la aplicación
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});