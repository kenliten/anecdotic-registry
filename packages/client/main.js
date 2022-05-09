const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const createWindow = () => {
  const windowConfig = {
    width: 1200,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  };

  const win = new BrowserWindow(windowConfig);

  win.loadURL('http://localhost:4200');
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
  if (win === null) createWindow()
});
