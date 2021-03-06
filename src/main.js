"use strict";

// import installExtension, {
  // REACT_DEVELOPER_TOOLS,
  // REDUX_DEVTOOLS
// } from "electron-devtools-installer";
import { app, BrowserWindow } from "electron";
import path from "path";
import url from "url";
import { getLogger } from "./AppConfig"

const log = getLogger();
let win = null;
let isQuit = false;

log.debug("Application start.");

function isMac() {
  return process.platform === "darwin"; 
}

function createWindow() {
  win = new BrowserWindow({ width: 1024, height: 960 });

  // installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    // .then(name => log.debug(`Added Extension: ${name}`))
    // .catch(err => log.error("An error occurred: ", err));
  // win.webContents.openDevTools();

  win.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }));

  win.on("close", (e) => {
    if (isQuit) {
      log.debug("Application quit.");
      return;
    }

    if (!isMac()) {
      return;
    }

    e.preventDefault();
    win.hide();
  });

  win.on("closed", () => {
    win = null;
  });

  app.on("before-quit", () => {
    isQuit = true;
  })

  app.on("activate", () => {
    if (!isMac()) {
      return;
    }

    win.show();
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  app.quit();
});

app.on("active", () => {
  if (win !== null) {
    return;
  }

  createWindow();
});
