const { app, Tray, Menu, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');

const iconPath = path.join(__dirname, 'icons/icon.png');
const atomIconPath = path.join(__dirname, 'icons/atom.png');
const vscodeIconPath = path.join(__dirname, 'icons/vscode.png');
const iTermIconPath = path.join(__dirname, 'icons/iTerm2.png');
const chromeIconPath = path.join(__dirname, 'icons/chrome.png');
const firefoxIconPath = path.join(__dirname, 'icons/firefox.png');

let appIcon = null;
let win = null;

app.on('ready', function(){
  win = new BrowserWindow({show: false});
  appIcon = new Tray(iconPath);
  var contextMenu = Menu.buildFromTemplate([
    {
      label: 'atom',
      icon: atomIconPath,
      accelerator: 'Command+A',
      click: function() {
          childProcess.exec('atom').unref();
      }
    },
    {
      label: 'VSCode',
      icon: vscodeIconPath,
      accelerator: 'Command+V',
      click: function() {
          childProcess.exec('VSCODE_CWD="$PWD" open -n -b "com.microsoft.VSCode" --args $* ;').unref();
      }
    },
    {
      label: 'iTerm',
      icon: iTermIconPath,
      accelerator: 'Command+I',
      click: function() {
          childProcess.exec('open -a iterm').unref();
      }
    },
    {
      label: 'Chrome',
      icon: chromeIconPath,
      accelerator: 'Command+C',
      click: function() {
          childProcess.exec('open -a "Google Chrome"').unref();
      }
    },
    {
      label: 'Firefox',
      icon: firefoxIconPath,
      accelerator: 'Command+F',
      click: function() {
          childProcess.exec('open -a firefox').unref();
      }
    },
    { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);
  appIcon.setContextMenu(contextMenu);
});
