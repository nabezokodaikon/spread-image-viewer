"use strict";

import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from "electron-devtools-installer";

import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";

let win = null;

function createWindow() {
  win = new BrowserWindow({ width: 1024, height: 960 });

  installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(err => console.log("An error occurred: ", err));

  win.webContents.openDevTools();

  win.loadURL(url.format({
    pathname: path.join(__dirname, "../public/index.html"),
    protocol: "file",
    slashes: true
  }));
  win.on("closed", () => {
    win = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("active", () => {
  if (win === null) {
    createWindow();
  }
});
