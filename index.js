const { app, Tray, Menu, BrowserWindow } = require('electron');
const path = require('path');
const childProcess = require('child_process');

const iconPath = path.join(__dirname, 'icon.png');
const atomIconPath = path.join(__dirname, 'atom.png');
const vscodeIconPath = path.join(__dirname, 'vscode.png');
const iTermIconPath = path.join(__dirname, 'iTerm2.png');
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
    { label: 'Quit',
      accelerator: 'Command+Q',
      selector: 'terminate:',
    }
  ]);
  appIcon.setContextMenu(contextMenu);
});
