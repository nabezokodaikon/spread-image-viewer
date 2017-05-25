"use strict";

import path from "path";
import fs from "fs";
import log4js from "log4js";

const appDir = path.resolve(".");
const appConfigFile = path.join(appDir, "app-config.json");
const appConfig = JSON.parse(fs.readFileSync(appConfigFile), "utf8");
const logDir = path.join(appDir, "logs");

if (fs.existsSync(logDir)) {
  console.log("log directory exists.");
} else {
  console.log("log directory not exists.");
  fs.mkdirSync(logDir);
}

log4js.configure("app-config.json", { cwd: appDir });
const logger = log4js.getLogger("default");

export function getAppConfig() {
  return appConfig;
}

export function getLogger() {
  return logger;
}
