const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

var serverProcess = null

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function startServer() {
  console.log("Initializing server...");

  var child = require('child_process');

  var executablePath = "";

  if (process.platform == "darwin") {
    executablePath = __dirname + "/server/darwin/64/goci -f " + __dirname + "/server/darwin/64/config.ini";
  } else if (process.platform == "win32") {
    if (process.arch == "x64") {
      executablePath = __dirname + "/server/windows/64/goci -f " + __dirname + "/server/windows/64/config.ini";
    } else if (process.arch == "ia32") {
      executablePath = __dirname + "/server/windows/32/goci -f " + __dirname + "/server/windows/32/config.ini";
    }
  }

  /*
  serverProcess = child.exec(executablePath, function (error, stdout, stderr) {
    console.log('stdout: ', stdout);
    console.log('stderr: ', stderr);

    if (error !== null) {
      console.log('exec error: ', error);
    }
  });
  */

  serverProcess = child.spawn(__dirname + "/server/windows/32/goci", ["-f", __dirname + "/server/windows/32/config.ini"], { detached: false })
  //serverProcess = child.spawn(__dirname + "/server/darwin/64/goci", ["-f", __dirname + "/server/darwin/64/config.ini"], { detached: true })

  console.log("Initialized!");
}

function killServerProcess() {
  if (serverProcess != null) {
    var isWin = /^win/.test(process.platform);
    if (!isWin) {
      serverProcess.kill()
    } else {
      var cp = require('child_process');
      cp.exec('taskkill /PID ' + serverProcess.pid + ' /T /F', function (error, stdout, stderr) { });
    }
  }
}

function createWindow() {
  startServer()

  // Create the browser window.
  var electronScreen = electron.screen
  var size = electronScreen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.webContents.session.clearCache(function () {
    //
  });

  // and load the index.html of the app.
  mainWindow.loadURL(`file://${__dirname}/index.html`)

  // Open the DevTools.
  //mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    killServerProcess()
    app.quit()
  }
})

// After all windows closed
app.on('will-quit', function () {
  killServerProcess()
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
