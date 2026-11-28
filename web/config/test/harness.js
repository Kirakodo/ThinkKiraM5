import "../src/shim.js";
import "./mock-device.js";
import "../src/main.js";
import { readRuntimeInfo } from "../src/deviceinfo.js";
import { fakePort } from "./mock-device.js";
window.__runtimeInfo = () => readRuntimeInfo(fakePort, () => {}, 0);
