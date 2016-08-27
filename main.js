const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

var serverProcess = null;
let mainWindow;

function startServer() {
  console.log("Initializing server...");

  var child = require('child_process');

  var executablePath = "";
  var executableParams = [];

  if (process.platform == "darwin") {
    executablePath = __dirname + "/server/darwin/64/goci";
    executableParams = ["-f", __dirname + "/server/darwin/64/config.ini"];
  } else if (process.platform == "win32") {
    if (process.arch == "x64") {
      executablePath = __dirname + "/server/windows/64/goci";
      executableParams = ["-f", __dirname + "/server/windows/64/config.ini"];
    } else if (process.arch == "ia32") {
      executablePath = __dirname + "/server/windows/32/goci";
      executableParams = ["-f", __dirname + "/server/windows/32/config.ini"];
    }
  } else {
    console.log("OS not supported, check 'main.js' file");
    throw new Error("OS not supported, check 'main.js' file");
  }

  serverProcess = child.spawn(executablePath, executableParams, { detached: false });

  console.log("Initialized!");
}

function killServerProcess() {
  if (serverProcess != null) {
    var isWin = /^win/.test(process.platform);

    if (!isWin) {
      serverProcess.kill();
    } else {
      var cp = require('child_process');
      cp.exec('taskkill /PID ' + serverProcess.pid + ' /T /F', function (error, stdout, stderr) { });
    }
  }
}

function createWindow() {
  startServer();

  // create the browser window.
  var electronScreen = electron.screen;
  var size = electronScreen.getPrimaryDisplay().workAreaSize;

  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  });

  mainWindow.webContents.session.clearCache(function () {
    //
  });

  // load main URL
  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // open the dev tools.
  //mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    killServerProcess();
    app.quit();
  }
});

app.on('will-quit', function () {
  killServerProcess();
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});