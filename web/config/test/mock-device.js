// Testhilfe: simuliert ein ThinkNode M5 mit ThinkKira-Firmware über ein falsches navigator.serial.
// Nur für Browser-Tests (vite build -c vite.test.config.js), wird nicht ausgeliefert.
import { create, toBinary, fromBinary } from "@bufbuild/protobuf";
import { Protobuf } from "@meshtastic/core";

const P = Protobuf;
const MY = 0x1234abcd;
const log = (window.__mockLog = []);

function frame(msg) {
  const b = toBinary(P.Mesh.FromRadioSchema, create(P.Mesh.FromRadioSchema, msg));
  return new Uint8Array([0x94, 0xc3, b.length >> 8, b.length & 0xff, ...b]);
}

function kiraPacket(text) {
  return frame({
    payloadVariant: {
      case: "packet",
      value: create(P.Mesh.MeshPacketSchema, {
        from: MY,
        to: MY,
        payloadVariant: { case: "decoded", value: { portnum: 287, payload: new TextEncoder().encode(text) } },
      }),
    },
  });
}

function configFrames(id) {
  const C = P.Config;
  return [
    frame({ payloadVariant: { case: "myInfo", value: { myNodeNum: MY } } }),
    frame({ payloadVariant: { case: "nodeInfo", value: { num: MY, user: { longName: "Sven M5", shortName: "SV5", hwModel: 107 } } } }),
    frame({ payloadVariant: { case: "metadata", value: { firmwareVersion: "2.8.3.test", hwModel: 107, hasWifi: true, hasBluetooth: true } } }),
    frame({ payloadVariant: { case: "config", value: create(C.ConfigSchema, { payloadVariant: { case: "device", value: { role: 0 } } }) } }),
    frame({ payloadVariant: { case: "config", value: create(C.ConfigSchema, { payloadVariant: { case: "lora", value: { region: 3, modemPreset: 0 } } }) } }),
    frame({ payloadVariant: { case: "config", value: create(C.ConfigSchema, { payloadVariant: { case: "network", value: { wifiSsid: "Altes-Netz" } } }) } }),
    frame({ payloadVariant: { case: "channel", value: { index: 0, role: 1, settings: { name: "" } } } }),
    frame({ payloadVariant: { case: "configCompleteId", value: id } }),
  ];
}

class FakePort {
  constructor() {
    this.readable = null;
    this.writable = null;
  }
  async open() {
    this.readable = new ReadableStream({ start: (c) => (this.ctrl = c) });
    let buf = [];
    this.writable = new WritableStream({
      write: (chunk) => {
        buf.push(...chunk);
        while (buf.length >= 4) {
          const i = buf.findIndex((x, k) => x === 0x94 && buf[k + 1] === 0xc3);
          if (i < 0) return void (buf = []);
          if (i > 0) buf = buf.slice(i);
          const len = (buf[2] << 8) | buf[3];
          if (buf.length < 4 + len) return;
          this.handle(new Uint8Array(buf.slice(4, 4 + len)));
          buf = buf.slice(4 + len);
        }
      },
    });
  }
  send(bytes) {
    setTimeout(() => this.ctrl.enqueue(bytes), 5);
  }
  handle(bytes) {
    const m = fromBinary(P.Mesh.ToRadioSchema, bytes);
    const v = m.payloadVariant;
    log.push(v.case);
    if (v.case === "wantConfigId") configFrames(v.value).forEach((f) => this.send(f));
    if (v.case === "packet" && v.value.payloadVariant.case === "decoded" && v.value.payloadVariant.value.portnum === 287) {
      const cmd = new TextDecoder().decode(v.value.payloadVariant.value.payload);
      log.push("kira:" + cmd);
      if (cmd.startsWith("ui|")) {
        const f = cmd.split("|");
        this.ui = "u|" + f[1] + "|" + f[2] + "|" + f[3] + "|" + f.slice(4).join("|");
      }
      this.wps ??= [{ name: "Haus", lat: 523906000, lon: 130645000 }];
      const f = cmd.split("|");
      if (f[0] === "wpa") this.wps.push({ name: f[1], lat: +f[2], lon: +f[3] });
      if (f[0] === "wpr") this.wps[+f[1]].name = f[2];
      if (f[0] === "wpd") this.wps.splice(+f[1], 1);
      if (f[0] === "wpg") this.target = this.wps[+f[1]].name;
      const wpl = () => [...this.wps.map((w, i) => `p|${i}|${w.name}|${w.lat}|${w.lon}|0`), `p|end|${this.wps.length}|20|${this.target ?? ""}`];
      if (["wpa", "wpr", "wpd", "wpg", "wps", "wpl"].includes(f[0])) {
        wpl().forEach((t) => this.send(kiraPacket(t)));
        return;
      }
      if (f[0] === "mapb") {
        this.mapBytes = 0;
        this.mapTotal = +f[1];
        this.mapUp = true;
        this.send(kiraPacket("k|ready"));
        return;
      }
      if (f[0] === "mapd") {
        if (cmd.length > 233) throw new Error("Paket zu groß: " + cmd.length);
        if (Math.random() < (globalThis.__dropRate ?? 0)) return; // auf dem Weg verloren
        if (+f[1] === this.mapBytes) this.mapBytes += atob(f[2]).length;
        this.send(kiraPacket("k|a|" + this.mapBytes));
        return;
      }
      if (f[0] === "mapq") {
        this.send(kiraPacket(`k|a|${this.mapBytes ?? 0}|${this.mapTotal ?? 0}|${this.mapUp ? 1 : 0}|30|5|0|0`));
        return;
      }
      if (f[0] === "mape") {
        if (this.mapBytes === this.mapTotal) {
          this.map = this.mapBytes;
          this.mapUp = false;
          if (Math.random() < (globalThis.__okDropRate ?? 0)) return; // Antwort verloren
          this.send(kiraPacket("k|ok|" + this.mapBytes));
        } else this.send(kiraPacket("err|Karte: unvollständig"));
        return;
      }
      if (f[0] === "mapi") {
        this.send(kiraPacket(this.map ? `k|info|${this.map}|2|522600000|129500000|524500000|133200000` : "k|none"));
        return;
      }
      if (cmd === "tb") this.tipsUp = "";
      if (cmd.startsWith("tl|")) {
        if (new TextEncoder().encode(cmd).length > 233) throw new Error("Paket zu groß: " + cmd.length);
        this.tipsUp += cmd.slice(3);
      }
      if (cmd === "te") {
        this.tips = this.tipsUp;
        this.send(kiraPacket("T|ok|" + (this.tips.match(/^T/gm) ?? []).length));
        return;
      }
      if (cmd === "tg") {
        if (this.tips) this.send(kiraPacket("T|" + this.tips));
        this.send(kiraPacket("T|end"));
        return;
      }
      if (cmd === "mb") this.menuUp = "";
      if (cmd.startsWith("ml|")) this.menuUp += cmd.slice(3);
      if (cmd === "me") this.menu = this.menuUp;
      const replies = {
        mg: ["M|" + (this.menu ?? "P5\nIsys.info|Info\n"), "M|end"],
        me: ["M|ok"],
        trk: ["t|523906000,130645000,1764300000\n523910000,130650000,1764300010\n", "t|end|2"],
        ui: [this.ui ?? "u|012345|63|cbgsknm|OK;Ja;Nein;Bin unterwegs"],
        wifiscan: ["w|-55|0|Heimnetz", "w|-78|1|Cafe Gast", "w|end|2"],
        get: ["m|meshtastic|0.5.0", "W|1|1|192.168.178.40", "B|Watchdog (Task)|5400|180"],
        info: ["i|0.2.1|v2|4096|4096|2244|2368|120|8|0|180|87|4012|1", "f|1024"],
        stats: ["s|12|1|5|2|1|1", "h|0a0b0c0d|-91|5.5|12", "r|1|0a0b0c0d|-95|4.0|-93|5.0|30", "s|end"],
        ping: ["r|2|0a0b0c0d|-96|3.5|-94|4.5|0"],
      }[cmd.startsWith("ui|") ? "ui" : cmd];
      (replies ?? []).forEach((t) => this.send(kiraPacket(t)));
    }
  }
  async close() {
    this.readable = this.writable = null;
  }
  getInfo() {
    return {};
  }
}

export const fakePort = new FakePort();

// WLAN: Gerät unter https://192.168.178.40 (HTTP-API /api/v1/toradio und /api/v1/fromradio)
const httpPort = new FakePort();
const httpOut = [];
httpPort.send = (bytes) => httpOut.push(bytes.slice(4)); // ohne Seriell-Rahmen
const realFetch = window.fetch.bind(window);
window.fetch = async (url, opt = {}) => {
  const m = String(url).match(/^https:\/\/192\.168\.178\.40(\/.*)$/);
  if (!m) {
    if (/^https:\/\/\d+\.\d+\.\d+\.\d+/.test(String(url))) throw new TypeError("Failed to fetch");
    return realFetch(url, opt);
  }
  await new Promise((r) => setTimeout(r, 15));
  if (m[1].startsWith("/api/v1/toradio")) {
    if (opt.method === "PUT") httpPort.handle(new Uint8Array(opt.body));
    return new Response(null, { status: opt.method === "OPTIONS" ? 204 : 200 });
  }
  if (m[1].startsWith("/api/v1/fromradio")) return new Response(httpOut.shift() ?? new Uint8Array(0), { status: 200 });
  return new Response("", { status: 404 });
};
Object.defineProperty(navigator, "serial", {
  value: { requestPort: async () => fakePort, getPorts: async () => [fakePort], addEventListener() {}, removeEventListener() {} },
});
