import "../src/shim.js";
import "./mock-device.js";
// Designer-Seite (Element #tk-designer) oder Konfigurator
if (document.getElementById("tk-designer")) import("../src/designer-main.js");
else import("../src/main.js");
import { readRuntimeInfo } from "../src/deviceinfo.js";
import { fakePort } from "./mock-device.js";
window.__runtimeInfo = () => readRuntimeInfo(fakePort, () => {}, 0);
