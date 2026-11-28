// \0rolldown/runtime.js
var e = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports);
// src/shim.js
globalThis.process === void 0 && (globalThis.process = {
	env: {},
	versions: {},
	platform: "browser",
	cwd: () => "/"
});
// node_modules/@meshtastic/core/dist/chunk-DbKvDyjX.js
var t = Object.create, n = Object.defineProperty, r = Object.getOwnPropertyDescriptor, i = Object.getOwnPropertyNames, a = Object.getPrototypeOf, o = Object.prototype.hasOwnProperty, s = (e, t) => function() {
	return t || (0, e[i(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, c = (e) => {
	let t = {};
	for (var r in e) n(t, r, {
		get: e[r],
		enumerable: !0
	});
	return t;
}, l = (e, t, a, s) => {
	if (t && typeof t == "object" || typeof t == "function") for (var c = i(t), l = 0, u = c.length, d; l < u; l++) d = c[l], !o.call(e, d) && d !== a && n(e, d, {
		get: ((e) => t[e]).bind(null, d),
		enumerable: !(s = r(t, d)) || s.enumerable
	});
	return e;
}, u = (e, r, i) => (i = e == null ? {} : t(a(e)), l(r || !e || !e.__esModule ? n(i, "default", {
	value: e,
	enumerable: !0
}) : i, e)), d = (/* @__PURE__ */ e(((e, t) => {
	t.exports = {};
})))(), f = [
	0,
	4129,
	8258,
	12387,
	16516,
	20645,
	24774,
	28903,
	33032,
	37161,
	41290,
	45419,
	49548,
	53677,
	57806,
	61935,
	4657,
	528,
	12915,
	8786,
	21173,
	17044,
	29431,
	25302,
	37689,
	33560,
	45947,
	41818,
	54205,
	50076,
	62463,
	58334,
	9314,
	13379,
	1056,
	5121,
	25830,
	29895,
	17572,
	21637,
	42346,
	46411,
	34088,
	38153,
	58862,
	62927,
	50604,
	54669,
	13907,
	9842,
	5649,
	1584,
	30423,
	26358,
	22165,
	18100,
	46939,
	42874,
	38681,
	34616,
	63455,
	59390,
	55197,
	51132,
	18628,
	22757,
	26758,
	30887,
	2112,
	6241,
	10242,
	14371,
	51660,
	55789,
	59790,
	63919,
	35144,
	39273,
	43274,
	47403,
	23285,
	19156,
	31415,
	27286,
	6769,
	2640,
	14899,
	10770,
	56317,
	52188,
	64447,
	60318,
	39801,
	35672,
	47931,
	43802,
	27814,
	31879,
	19684,
	23749,
	11298,
	15363,
	3168,
	7233,
	60846,
	64911,
	52716,
	56781,
	44330,
	48395,
	36200,
	40265,
	32407,
	28342,
	24277,
	20212,
	15891,
	11826,
	7761,
	3696,
	65439,
	61374,
	57309,
	53244,
	48923,
	44858,
	40793,
	36728,
	37256,
	33193,
	45514,
	41451,
	53516,
	49453,
	61774,
	57711,
	4224,
	161,
	12482,
	8419,
	20484,
	16421,
	28742,
	24679,
	33721,
	37784,
	41979,
	46042,
	49981,
	54044,
	58239,
	62302,
	689,
	4752,
	8947,
	13010,
	16949,
	21012,
	25207,
	29270,
	46570,
	42443,
	38312,
	34185,
	62830,
	58703,
	54572,
	50445,
	13538,
	9411,
	5280,
	1153,
	29798,
	25671,
	21540,
	17413,
	42971,
	47098,
	34713,
	38840,
	59231,
	63358,
	50973,
	55100,
	9939,
	14066,
	1681,
	5808,
	26199,
	30326,
	17941,
	22068,
	55628,
	51565,
	63758,
	59695,
	39368,
	35305,
	47498,
	43435,
	22596,
	18533,
	30726,
	26663,
	6336,
	2273,
	14466,
	10403,
	52093,
	56156,
	60223,
	64286,
	35833,
	39896,
	43963,
	48026,
	19061,
	23124,
	27191,
	31254,
	2801,
	6864,
	10931,
	14994,
	64814,
	60687,
	56684,
	52557,
	48554,
	44427,
	40424,
	36297,
	31782,
	27655,
	23652,
	19525,
	15522,
	11395,
	7392,
	3265,
	61215,
	65342,
	53085,
	57212,
	44955,
	49082,
	36825,
	40952,
	28183,
	32310,
	20053,
	24180,
	11923,
	16050,
	3793,
	7920
];
typeof Int32Array < "u" && (f = new Int32Array(f));
var ee = (e, t) => {
	let n = t === void 0 ? 65535 : ~~t;
	for (let t = 0; t < e.length; t++) n = (f[(n >> 8 ^ e[t]) & 255] ^ n << 8) & 65535;
	return n;
}, te = Object.defineProperty, p = (e) => {
	let t = {};
	for (var n in e) te(t, n, {
		get: e[n],
		enumerable: !0
	});
	return t;
};
function ne(e) {
	let t = !1, n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e.charAt(r);
		switch (i) {
			case "_":
				t = !0;
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				n.push(i), t = !1;
				break;
			default: t && (t = !1, i = i.toUpperCase()), n.push(i);
		}
	}
	return n.join("");
}
var re = /* @__PURE__ */ new Set([
	"constructor",
	"toString",
	"toJSON",
	"valueOf"
]);
function ie(e) {
	return re.has(e) ? e + "$" : e;
}
function ae() {
	let e = 0, t = 0;
	for (let n = 0; n < 28; n += 7) {
		let r = this.buf[this.pos++];
		if (e |= (r & 127) << n, !(r & 128)) return this.assertBounds(), [e, t];
	}
	let n = this.buf[this.pos++];
	if (e |= (n & 15) << 28, t = (n & 112) >> 4, !(n & 128)) return this.assertBounds(), [e, t];
	for (let n = 3; n <= 31; n += 7) {
		let r = this.buf[this.pos++];
		if (t |= (r & 127) << n, !(r & 128)) return this.assertBounds(), [e, t];
	}
	throw Error("invalid varint");
}
function oe(e, t, n) {
	for (let r = 0; r < 28; r += 7) {
		let i = e >>> r, a = !(!(i >>> 7) && t == 0), o = (a ? i | 128 : i) & 255;
		if (n.push(o), !a) return;
	}
	let r = e >>> 28 & 15 | (t & 7) << 4, i = !!(t >> 3);
	if (n.push((i ? r | 128 : r) & 255), i) {
		for (let e = 3; e < 31; e += 7) {
			let r = t >>> e, i = !!(r >>> 7), a = (i ? r | 128 : r) & 255;
			if (n.push(a), !i) return;
		}
		n.push(t >>> 31 & 1);
	}
}
var se = 4294967296;
function ce(e) {
	let t = e[0] === "-";
	t && (e = e.slice(1));
	let n = 1e6, r = 0, i = 0;
	function a(t, a) {
		let o = Number(e.slice(t, a));
		i *= n, r = r * n + o, r >= se && (i += r / se | 0, r %= se);
	}
	return a(-24, -18), a(-18, -12), a(-12, -6), a(-6), t ? pe(r, i) : fe(r, i);
}
function le(e, t) {
	let n = fe(e, t), r = n.hi & 0x80000000;
	r && (n = pe(n.lo, n.hi));
	let i = ue(n.lo, n.hi);
	return r ? "-" + i : i;
}
function ue(e, t) {
	if ({lo: e, hi: t} = de(e, t), t <= 2097151) return String(se * t + e);
	let n = e & 0xffffff, r = (e >>> 24 | t << 8) & 0xffffff, i = t >> 16 & 65535, a = n + r * 6777216 + i * 6710656, o = r + i * 8147497, s = i * 2, c = 1e7;
	return a >= c && (o += Math.floor(a / c), a %= c), o >= c && (s += Math.floor(o / c), o %= c), s.toString() + me(o) + me(a);
}
function de(e, t) {
	return {
		lo: e >>> 0,
		hi: t >>> 0
	};
}
function fe(e, t) {
	return {
		lo: e | 0,
		hi: t | 0
	};
}
function pe(e, t) {
	return t = ~t, e ? e = ~e + 1 : t += 1, fe(e, t);
}
var me = (e) => {
	let t = String(e);
	return "0000000".slice(t.length) + t;
};
function he(e, t) {
	if (e >= 0) {
		for (; e > 127;) t.push(e & 127 | 128), e >>>= 7;
		t.push(e);
	} else {
		for (let n = 0; n < 9; n++) t.push(e & 127 | 128), e >>= 7;
		t.push(1);
	}
}
function ge() {
	let e = this.buf[this.pos++], t = e & 127;
	if (!(e & 128) || (e = this.buf[this.pos++], t |= (e & 127) << 7, !(e & 128)) || (e = this.buf[this.pos++], t |= (e & 127) << 14, !(e & 128)) || (e = this.buf[this.pos++], t |= (e & 127) << 21, !(e & 128))) return this.assertBounds(), t;
	e = this.buf[this.pos++], t |= (e & 15) << 28;
	for (let t = 5; e & 128 && t < 10; t++) e = this.buf[this.pos++];
	if (e & 128) throw Error("invalid varint");
	return this.assertBounds(), t >>> 0;
}
var m = /* @__PURE__ */ _e();
function _e() {
	let e = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
		let t = BigInt("-9223372036854775808"), n = BigInt("9223372036854775807"), r = BigInt("0"), i = BigInt("18446744073709551615");
		return {
			zero: BigInt(0),
			supported: !0,
			parse(e) {
				let r = typeof e == "bigint" ? e : BigInt(e);
				if (r > n || r < t) throw Error(`invalid int64: ${e}`);
				return r;
			},
			uParse(e) {
				let t = typeof e == "bigint" ? e : BigInt(e);
				if (t > i || t < r) throw Error(`invalid uint64: ${e}`);
				return t;
			},
			enc(t) {
				return e.setBigInt64(0, this.parse(t), !0), {
					lo: e.getInt32(0, !0),
					hi: e.getInt32(4, !0)
				};
			},
			uEnc(t) {
				return e.setBigInt64(0, this.uParse(t), !0), {
					lo: e.getInt32(0, !0),
					hi: e.getInt32(4, !0)
				};
			},
			dec(t, n) {
				return e.setInt32(0, t, !0), e.setInt32(4, n, !0), e.getBigInt64(0, !0);
			},
			uDec(t, n) {
				return e.setInt32(0, t, !0), e.setInt32(4, n, !0), e.getBigUint64(0, !0);
			}
		};
	}
	return {
		zero: "0",
		supported: !1,
		parse(e) {
			return typeof e != "string" && (e = e.toString()), ve(e), e;
		},
		uParse(e) {
			return typeof e != "string" && (e = e.toString()), ye(e), e;
		},
		enc(e) {
			return typeof e != "string" && (e = e.toString()), ve(e), ce(e);
		},
		uEnc(e) {
			return typeof e != "string" && (e = e.toString()), ye(e), ce(e);
		},
		dec(e, t) {
			return le(e, t);
		},
		uDec(e, t) {
			return ue(e, t);
		}
	};
}
function ve(e) {
	if (!/^-?[0-9]+$/.test(e)) throw Error("invalid int64: " + e);
}
function ye(e) {
	if (!/^[0-9]+$/.test(e)) throw Error("invalid uint64: " + e);
}
var h;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(h ||= {});
function be(e, t) {
	switch (e) {
		case h.STRING: return "";
		case h.BOOL: return !1;
		case h.DOUBLE:
		case h.FLOAT: return 0;
		case h.INT64:
		case h.UINT64:
		case h.SFIXED64:
		case h.FIXED64:
		case h.SINT64: return t ? "0" : m.zero;
		case h.BYTES: return /* @__PURE__ */ new Uint8Array();
		default: return 0;
	}
}
function xe(e, t) {
	switch (e) {
		case h.BOOL: return t === !1;
		case h.STRING: return t === "";
		case h.BYTES: return t instanceof Uint8Array && !t.byteLength;
		default: return t == 0;
	}
}
var Se = 2, Ce = Symbol.for("reflect unsafe local");
function we(e, t) {
	let n = e[t.localName].case;
	return n === void 0 ? n : t.fields.find((e) => e.localName === n);
}
function Te(e, t) {
	let n = t.localName;
	if (t.oneof) return e[t.oneof.localName].case === n;
	if (t.presence != Se) return e[n] !== void 0 && Object.prototype.hasOwnProperty.call(e, n);
	switch (t.fieldKind) {
		case "list": return e[n].length > 0;
		case "map": return Object.keys(e[n]).length > 0;
		case "scalar": return !xe(t.scalar, e[n]);
		case "enum": return e[n] !== t.enum.values[0].number;
	}
	throw Error("message field with implicit presence");
}
function Ee(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function De(e, t) {
	if (t.oneof) {
		let n = e[t.oneof.localName];
		return n.case === t.localName ? n.value : void 0;
	}
	return e[t.localName];
}
function Oe(e, t, n) {
	t.oneof ? e[t.oneof.localName] = {
		case: t.localName,
		value: n
	} : e[t.localName] = n;
}
function ke(e, t) {
	let n = t.localName;
	if (t.oneof) {
		let r = t.oneof.localName;
		e[r].case === n && (e[r] = { case: void 0 });
	} else if (t.presence != Se) delete e[n];
	else switch (t.fieldKind) {
		case "map":
			e[n] = {};
			break;
		case "list":
			e[n] = [];
			break;
		case "enum":
			e[n] = t.enum.values[0].number;
			break;
		case "scalar": e[n] = be(t.scalar, t.longAsString);
	}
}
function Ae(e) {
	for (let t of e.field) Ee(t, "jsonName") || (t.jsonName = ne(t.name));
	e.nestedType.forEach(Ae);
}
function je(e, t) {
	let n = e.values.find((e) => e.name === t);
	if (!n) throw Error(`cannot parse ${e} default value: ${t}`);
	return n.number;
}
function Me(e, t) {
	switch (e) {
		case h.STRING: return t;
		case h.BYTES: {
			let n = Ne(t);
			if (n === !1) throw Error(`cannot parse ${h[e]} default value: ${t}`);
			return n;
		}
		case h.INT64:
		case h.SFIXED64:
		case h.SINT64: return m.parse(t);
		case h.UINT64:
		case h.FIXED64: return m.uParse(t);
		case h.DOUBLE:
		case h.FLOAT: switch (t) {
			case "inf": return 1e400;
			case "-inf": return -1e400;
			case "nan": return NaN;
			default: return parseFloat(t);
		}
		case h.BOOL: return t === "true";
		case h.INT32:
		case h.UINT32:
		case h.SINT32:
		case h.FIXED32:
		case h.SFIXED32: return parseInt(t, 10);
	}
}
function Ne(e) {
	let t = [], n = {
		tail: e,
		c: "",
		next() {
			return this.tail.length != 0 && (this.c = this.tail[0], this.tail = this.tail.substring(1), !0);
		},
		take(e) {
			if (this.tail.length >= e) {
				let t = this.tail.substring(0, e);
				return this.tail = this.tail.substring(e), t;
			}
			return !1;
		}
	};
	for (; n.next();) if (n.c === "\\") {
		if (n.next()) switch (n.c) {
			case "\\":
				t.push(n.c.charCodeAt(0));
				break;
			case "b":
				t.push(8);
				break;
			case "f":
				t.push(12);
				break;
			case "n":
				t.push(10);
				break;
			case "r":
				t.push(13);
				break;
			case "t":
				t.push(9);
				break;
			case "v":
				t.push(11);
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7": {
				let e = n.c, r = n.take(2);
				if (r === !1) return !1;
				let i = parseInt(e + r, 8);
				if (Number.isNaN(i)) return !1;
				t.push(i);
				break;
			}
			case "x": {
				let e = n.c, r = n.take(2);
				if (r === !1) return !1;
				let i = parseInt(e + r, 16);
				if (Number.isNaN(i)) return !1;
				t.push(i);
				break;
			}
			case "u": {
				let e = n.c, r = n.take(4);
				if (r === !1) return !1;
				let i = parseInt(e + r, 16);
				if (Number.isNaN(i)) return !1;
				let a = /* @__PURE__ */ new Uint8Array(4);
				new DataView(a.buffer).setInt32(0, i, !0), t.push(a[0], a[1], a[2], a[3]);
				break;
			}
			case "U": {
				let e = n.c, r = n.take(8);
				if (r === !1) return !1;
				let i = m.uEnc(e + r), a = /* @__PURE__ */ new Uint8Array(8), o = new DataView(a.buffer);
				o.setInt32(0, i.lo, !0), o.setInt32(4, i.hi, !0), t.push(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
				break;
			}
		}
	} else t.push(n.c.charCodeAt(0));
	return new Uint8Array(t);
}
function* Pe(e) {
	switch (e.kind) {
		case "file":
			for (let t of e.messages) yield t, yield* Pe(t);
			yield* e.enums, yield* e.services, yield* e.extensions;
			break;
		case "message":
			for (let t of e.nestedMessages) yield t, yield* Pe(t);
			yield* e.nestedEnums, yield* e.nestedExtensions;
	}
}
function Fe(...e) {
	let t = Ie();
	if (!e.length) return t;
	if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
		for (let n of e[0].file) tt(n, t);
		return t;
	}
	if ("$typeName" in e[0]) {
		let n = e[0], r = e[1], i = /* @__PURE__ */ new Set();
		function a(e) {
			let n = [];
			for (let a of e.dependency) {
				if (t.getFile(a) != null || i.has(a)) continue;
				let o = r(a);
				if (!o) throw Error(`Unable to resolve ${a}, imported by ${e.name}`);
				"kind" in o ? t.addFile(o, !1, !0) : (i.add(o.name), n.push(o));
			}
			return n.concat(...n.map(a));
		}
		for (let e of [n, ...a(n)].reverse()) tt(e, t);
	} else for (let n of e) for (let e of n.files) t.addFile(e);
	return t;
}
function Ie() {
	let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	return {
		kind: "registry",
		types: e,
		extendees: t,
		[Symbol.iterator]() {
			return e.values();
		},
		get files() {
			return n.values();
		},
		addFile(e, t, r) {
			if (n.set(e.proto.name, e), !t) for (let t of Pe(e)) this.add(t);
			if (r) for (let n of e.dependencies) this.addFile(n, t, r);
		},
		add(n) {
			if (n.kind == "extension") {
				let e = t.get(n.extendee.typeName);
				e || t.set(n.extendee.typeName, e = /* @__PURE__ */ new Map()), e.set(n.number, n);
			}
			e.set(n.typeName, n);
		},
		get(t) {
			return e.get(t);
		},
		getFile(e) {
			return n.get(e);
		},
		getMessage(t) {
			let n = e.get(t);
			return n?.kind == "message" ? n : void 0;
		},
		getEnum(t) {
			let n = e.get(t);
			return n?.kind == "enum" ? n : void 0;
		},
		getExtension(t) {
			let n = e.get(t);
			return n?.kind == "extension" ? n : void 0;
		},
		getExtensionFor(e, n) {
			return t.get(e.typeName)?.get(n);
		},
		getService(t) {
			let n = e.get(t);
			return n?.kind == "service" ? n : void 0;
		}
	};
}
var Le = 998, Re = 999, ze = 9, Be = 10, Ve = 11, He = 12, Ue = 14, We = 3, Ge = 2, Ke = 1, qe = 0, Je = 1, Ye = 2, Xe = 3, Ze = 1, Qe = 2, $e = 1, et = {
	998: {
		fieldPresence: 1,
		enumType: 2,
		repeatedFieldEncoding: 2,
		utf8Validation: 3,
		messageEncoding: 1,
		jsonFormat: 2,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	999: {
		fieldPresence: 2,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1e3: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1
	},
	1001: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 1,
		defaultSymbolVisibility: 2
	}
};
function tt(e, t) {
	let n = {
		kind: "file",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		edition: ut(e),
		name: e.name.replace(/\.proto$/, ""),
		dependencies: dt(e, t),
		enums: [],
		messages: [],
		extensions: [],
		services: [],
		toString() {
			return `file ${e.name}`;
		}
	}, r = /* @__PURE__ */ new Map(), i = {
		get(e) {
			return r.get(e);
		},
		add(e) {
			g(e.proto.options?.mapEntry === !0), r.set(e.typeName, e);
		}
	};
	for (let r of e.enumType) it(r, n, void 0, t);
	for (let r of e.messageType) at(r, n, void 0, t, i);
	for (let r of e.service) ot(r, n, t);
	nt(n, t);
	for (let e of r.values()) rt(e, t, i);
	for (let e of n.messages) rt(e, t, i), nt(e, t);
	t.addFile(n, !0);
}
function nt(e, t) {
	switch (e.kind) {
		case "file":
			for (let n of e.proto.extension) {
				let r = lt(n, e, t);
				e.extensions.push(r), t.add(r);
			}
			break;
		case "message":
			for (let n of e.proto.extension) {
				let r = lt(n, e, t);
				e.nestedExtensions.push(r), t.add(r);
			}
			for (let n of e.nestedMessages) nt(n, t);
	}
}
function rt(e, t, n) {
	let r = e.proto.oneofDecl.map((t) => ct(t, e)), i = /* @__PURE__ */ new Set();
	for (let a of e.proto.field) {
		let o = gt(a, r), s = lt(a, e, t, o, n);
		e.fields.push(s), e.field[s.localName] = s, o === void 0 ? e.members.push(s) : (o.fields.push(s), i.has(o) || (i.add(o), e.members.push(o)));
	}
	for (let t of r.filter((e) => i.has(e))) e.oneofs.push(t);
	for (let r of e.nestedMessages) rt(r, t, n);
}
function it(e, t, n, r) {
	let i = ft(e.name, e.value), a = {
		kind: "enum",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		parent: n,
		open: !0,
		name: e.name,
		typeName: mt(e, n, t),
		value: {},
		values: [],
		sharedPrefix: i,
		toString() {
			return `enum ${this.typeName}`;
		}
	};
	a.open = bt(a), r.add(a);
	for (let t of e.value) {
		let e = t.name;
		a.values.push(a.value[t.number] = {
			kind: "enum_value",
			proto: t,
			deprecated: t.options?.deprecated ?? !1,
			parent: a,
			name: e,
			localName: ie(i == null ? e : e.substring(i.length)),
			number: t.number,
			toString() {
				return `enum value ${a.typeName}.${e}`;
			}
		});
	}
	(n?.nestedEnums ?? t.enums).push(a);
}
function at(e, t, n, r, i) {
	let a = {
		kind: "message",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		parent: n,
		name: e.name,
		typeName: mt(e, n, t),
		fields: [],
		field: {},
		oneofs: [],
		members: [],
		nestedEnums: [],
		nestedMessages: [],
		nestedExtensions: [],
		toString() {
			return `message ${this.typeName}`;
		}
	};
	e.options?.mapEntry === !0 ? i.add(a) : ((n?.nestedMessages ?? t.messages).push(a), r.add(a));
	for (let n of e.enumType) it(n, t, a, r);
	for (let n of e.nestedType) at(n, t, a, r, i);
}
function ot(e, t, n) {
	let r = {
		kind: "service",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		name: e.name,
		typeName: mt(e, void 0, t),
		methods: [],
		method: {},
		toString() {
			return `service ${this.typeName}`;
		}
	};
	t.services.push(r), n.add(r);
	for (let t of e.method) {
		let e = st(t, r, n);
		r.methods.push(e), r.method[e.localName] = e;
	}
}
function st(e, t, n) {
	let r;
	r = e.clientStreaming && e.serverStreaming ? "bidi_streaming" : e.clientStreaming ? "client_streaming" : e.serverStreaming ? "server_streaming" : "unary";
	let i = n.getMessage(ht(e.inputType)), a = n.getMessage(ht(e.outputType));
	g(i, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), g(a, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
	let o = e.name;
	return {
		kind: "rpc",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		parent: t,
		name: o,
		localName: ie(o.length ? ie(o[0].toLowerCase() + o.substring(1)) : o),
		methodKind: r,
		input: i,
		output: a,
		idempotency: e.options?.idempotencyLevel ?? qe,
		toString() {
			return `rpc ${t.typeName}.${o}`;
		}
	};
}
function ct(e, t) {
	return {
		kind: "oneof",
		proto: e,
		deprecated: !1,
		parent: t,
		fields: [],
		name: e.name,
		localName: ie(ne(e.name)),
		toString() {
			return `oneof ${t.typeName}.${this.name}`;
		}
	};
}
function lt(e, t, n, r, i) {
	let a = i === void 0, o = {
		kind: "field",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		name: e.name,
		number: e.number,
		scalar: void 0,
		message: void 0,
		enum: void 0,
		presence: _t(e, r, a, t),
		listKind: void 0,
		mapKind: void 0,
		mapKey: void 0,
		delimitedEncoding: void 0,
		packed: void 0,
		longAsString: !1,
		getDefaultValue: void 0
	};
	if (a) {
		let r = t.kind == "file" ? t : t.file, i = t.kind == "file" ? void 0 : t, a = mt(e, i, r);
		o.kind = "extension", o.file = r, o.parent = i, o.oneof = void 0, o.typeName = a, o.jsonName = `[${a}]`, o.toString = () => `extension ${a}`;
		let s = n.getMessage(ht(e.extendee));
		g(s, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), o.extendee = s;
	} else {
		let n = t;
		g(n.kind == "message"), o.parent = n, o.oneof = r, o.localName = r ? ne(e.name) : ie(ne(e.name)), o.jsonName = e.jsonName, o.toString = () => `field ${n.typeName}.${e.name}`;
	}
	let s = e.label, c = e.type, l = e.options?.jstype;
	if (s === We) {
		let r = c == Ve ? i?.get(ht(e.typeName)) : void 0;
		if (r) {
			o.fieldKind = "map";
			let { key: e, value: t } = yt(r);
			return o.mapKey = e.scalar, o.mapKind = t.fieldKind, o.message = t.message, o.delimitedEncoding = !1, o.enum = t.enum, o.scalar = t.scalar, o;
		}
		switch (o.fieldKind = "list", c) {
			case Ve:
			case Be:
				o.listKind = "message", o.message = n.getMessage(ht(e.typeName)), g(o.message), o.delimitedEncoding = xt(e, t);
				break;
			case Ue:
				o.listKind = "enum", o.enum = n.getEnum(ht(e.typeName)), g(o.enum);
				break;
			default: o.listKind = "scalar", o.scalar = c, o.longAsString = l == Ke;
		}
		return o.packed = vt(e, t), o;
	}
	switch (c) {
		case Ve:
		case Be:
			o.fieldKind = "message", o.message = n.getMessage(ht(e.typeName)), g(o.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), o.delimitedEncoding = xt(e, t), o.getDefaultValue = () => void 0;
			break;
		case Ue: {
			let t = n.getEnum(ht(e.typeName));
			g(t !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), o.fieldKind = "enum", o.enum = n.getEnum(ht(e.typeName)), o.getDefaultValue = () => Ee(e, "defaultValue") ? je(t, e.defaultValue) : void 0;
			break;
		}
		default: o.fieldKind = "scalar", o.scalar = c, o.longAsString = l == Ke, o.getDefaultValue = () => Ee(e, "defaultValue") ? Me(c, e.defaultValue) : void 0;
	}
	return o;
}
function ut(e) {
	switch (e.syntax) {
		case "":
		case "proto2": return Le;
		case "proto3": return Re;
		case "editions":
			if (e.edition in et) return e.edition;
			throw Error(`${e.name}: unsupported edition`);
		default: throw Error(`${e.name}: unsupported syntax "${e.syntax}"`);
	}
}
function dt(e, t) {
	return e.dependency.map((n) => {
		let r = t.getFile(n);
		if (!r) throw Error(`Cannot find ${n}, imported by ${e.name}`);
		return r;
	});
}
function ft(e, t) {
	let n = pt(e) + "_";
	for (let e of t) {
		if (!e.name.toLowerCase().startsWith(n)) return;
		let t = e.name.substring(n.length);
		if (t.length == 0 || /^\d/.test(t)) return;
	}
	return n;
}
function pt(e) {
	return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (e) => "_" + e)).toLowerCase();
}
function mt(e, t, n) {
	let r;
	return r = t ? `${t.typeName}.${e.name}` : n.proto.package.length > 0 ? `${n.proto.package}.${e.name}` : `${e.name}`, r;
}
function ht(e) {
	return e.startsWith(".") ? e.substring(1) : e;
}
function gt(e, t) {
	if (!Ee(e, "oneofIndex") || e.proto3Optional) return;
	let n = t[e.oneofIndex];
	return g(n, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), n;
}
function _t(e, t, n, r) {
	if (e.label == Ge) return Xe;
	if (e.label == We) return Ye;
	if (t || e.proto3Optional || n) return Je;
	let i = St("fieldPresence", {
		proto: e,
		parent: r
	});
	return i == Ye && (e.type == Ve || e.type == Be) ? Je : i;
}
function vt(e, t) {
	if (e.label != We) return !1;
	switch (e.type) {
		case ze:
		case He:
		case Be:
		case Ve: return !1;
	}
	let n = e.options;
	return n && Ee(n, "packed") ? n.packed : Ze == St("repeatedFieldEncoding", {
		proto: e,
		parent: t
	});
}
function yt(e) {
	let t = e.fields.find((e) => e.number === 1), n = e.fields.find((e) => e.number === 2);
	return g(t && t.fieldKind == "scalar" && t.scalar != h.BYTES && t.scalar != h.FLOAT && t.scalar != h.DOUBLE && n && n.fieldKind != "list" && n.fieldKind != "map"), {
		key: t,
		value: n
	};
}
function bt(e) {
	return $e == St("enumType", {
		proto: e.proto,
		parent: e.parent ?? e.file
	});
}
function xt(e, t) {
	return e.type == Be || Qe == St("messageEncoding", {
		proto: e,
		parent: t
	});
}
function St(e, t) {
	let n = t.proto.options?.features;
	if (n) {
		let t = n[e];
		if (t != 0) return t;
	}
	if ("kind" in t) {
		if (t.kind == "message") return St(e, t.parent ?? t.file);
		let n = et[t.edition];
		if (!n) throw Error(`feature default for edition ${t.edition} not found`);
		return n[e];
	}
	return St(e, t.parent);
}
function g(e, t) {
	if (!e) throw Error(t);
}
function Ct(e) {
	let t = wt(e);
	return t.messageType.forEach(Ae), Fe(t, () => void 0).getFile(t.name);
}
function wt(e) {
	return Object.assign(Object.create({
		syntax: "",
		edition: 0
	}), Object.assign(Object.assign({
		$typeName: "google.protobuf.FileDescriptorProto",
		dependency: [],
		publicDependency: [],
		weakDependency: [],
		optionDependency: [],
		service: [],
		extension: []
	}, e), {
		messageType: e.messageType.map(Tt),
		enumType: e.enumType.map(Ot)
	}));
}
function Tt(e) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.DescriptorProto",
		name: e.name,
		field: e.field?.map(Et) ?? [],
		extension: [],
		nestedType: e.nestedType?.map(Tt) ?? [],
		enumType: e.enumType?.map(Ot) ?? [],
		extensionRange: e.extensionRange?.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e)) ?? [],
		oneofDecl: [],
		reservedRange: [],
		reservedName: []
	});
}
function Et(e) {
	return Object.assign(Object.create({
		label: 1,
		typeName: "",
		extendee: "",
		defaultValue: "",
		oneofIndex: 0,
		jsonName: "",
		proto3Optional: !1
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? Dt(e.options) : void 0 }));
}
function Dt(e) {
	return Object.assign(Object.create({
		ctype: 0,
		packed: !1,
		jstype: 0,
		lazy: !1,
		unverifiedLazy: !1,
		deprecated: !1,
		weak: !1,
		debugRedact: !1,
		retention: 0
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), {
		targets: e.targets ?? [],
		editionDefaults: e.editionDefaults?.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e)) ?? [],
		uninterpretedOption: []
	}));
}
function Ot(e) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.EnumDescriptorProto",
		name: e.name,
		reservedName: [],
		reservedRange: [],
		value: e.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
	});
}
function kt(e) {
	let t = Pt(), n = e.length * 3 / 4;
	e[e.length - 2] == "=" ? n -= 2 : e[e.length - 1] == "=" && --n;
	let r = new Uint8Array(n), i = 0, a = 0, o, s = 0;
	for (let n = 0; n < e.length; n++) {
		if (o = t[e.charCodeAt(n)], o === void 0) switch (e[n]) {
			case "=": a = 0;
			case "\n":
			case "\r":
			case "	":
			case " ": continue;
			default: throw Error("invalid base64 string");
		}
		switch (a) {
			case 0:
				s = o, a = 1;
				break;
			case 1:
				r[i++] = s << 2 | (o & 48) >> 4, s = o, a = 2;
				break;
			case 2:
				r[i++] = (s & 15) << 4 | (o & 60) >> 2, s = o, a = 3;
				break;
			case 3: r[i++] = (s & 3) << 6 | o, a = 0;
		}
	}
	if (a == 1) throw Error("invalid base64 string");
	return r.subarray(0, i);
}
var At, jt, Mt;
function Nt(e) {
	return At || (At = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), jt = At.slice(0, -2).concat("-", "_")), e == "url" ? jt : At;
}
function Pt() {
	if (!Mt) {
		Mt = [];
		let e = Nt("std");
		for (let t = 0; t < e.length; t++) Mt[e[t].charCodeAt(0)] = t;
		Mt[45] = e.indexOf("+"), Mt[95] = e.indexOf("/");
	}
	return Mt;
}
function Ft(e, t) {
	return typeof e == "object" && e && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 || t.typeName === e.$typeName : !1;
}
var It = class extends Error {
	constructor(e, t, n = "FieldValueInvalidError") {
		super(t), this.name = n, this.field = () => e;
	}
};
function Lt(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Rt(e, t) {
	if (Lt(e) && Ce in e && "add" in e && "field" in e && typeof e.field == "function") {
		if (t !== void 0) {
			let n = t, r = e.field();
			return n.listKind == r.listKind && n.scalar === r.scalar && n.message?.typeName === r.message?.typeName && n.enum?.typeName === r.enum?.typeName;
		}
		return !0;
	}
	return !1;
}
function zt(e, t) {
	if (Lt(e) && Ce in e && "has" in e && "field" in e && typeof e.field == "function") {
		if (t !== void 0) {
			let n = t, r = e.field();
			return n.mapKey === r.mapKey && n.mapKind == r.mapKind && n.scalar === r.scalar && n.message?.typeName === r.message?.typeName && n.enum?.typeName === r.enum?.typeName;
		}
		return !0;
	}
	return !1;
}
function Bt(e, t) {
	return Lt(e) && Ce in e && "desc" in e && Lt(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
var Vt = Symbol.for("@bufbuild/protobuf/text-encoding");
function Ht() {
	if (globalThis[Vt] == null) {
		let e = new globalThis.TextEncoder(), t = new globalThis.TextDecoder();
		globalThis[Vt] = {
			encodeUtf8(t) {
				return e.encode(t);
			},
			decodeUtf8(e) {
				return t.decode(e);
			},
			checkUtf8(e) {
				try {
					return !0;
				} catch {
					return !1;
				}
			}
		};
	}
	return globalThis[Vt];
}
var _;
(function(e) {
	e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(_ ||= {});
var Ut = 34028234663852886e22, Wt = -34028234663852886e22, Gt = 0xffffffff, Kt = 0x7fffffff, qt = -0x80000000, Jt = class {
	constructor(e = Ht().encodeUtf8) {
		this.encodeUtf8 = e, this.stack = [], this.chunks = [], this.buf = [];
	}
	finish() {
		this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []);
		let e = 0;
		for (let t = 0; t < this.chunks.length; t++) e += this.chunks[t].length;
		let t = new Uint8Array(e), n = 0;
		for (let e = 0; e < this.chunks.length; e++) t.set(this.chunks[e], n), n += this.chunks[e].length;
		return this.chunks = [], t;
	}
	fork() {
		return this.stack.push({
			chunks: this.chunks,
			buf: this.buf
		}), this.chunks = [], this.buf = [], this;
	}
	join() {
		let e = this.finish(), t = this.stack.pop();
		if (!t) throw Error("invalid state, fork stack empty");
		return this.chunks = t.chunks, this.buf = t.buf, this.uint32(e.byteLength), this.raw(e);
	}
	tag(e, t) {
		return this.uint32((e << 3 | t) >>> 0);
	}
	raw(e) {
		return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)), this.buf = []), this.chunks.push(e), this;
	}
	uint32(e) {
		for (Zt(e); e > 127;) this.buf.push(e & 127 | 128), e >>>= 7;
		return this.buf.push(e), this;
	}
	int32(e) {
		return Xt(e), he(e, this.buf), this;
	}
	bool(e) {
		return this.buf.push(+!!e), this;
	}
	bytes(e) {
		return this.uint32(e.byteLength), this.raw(e);
	}
	string(e) {
		let t = this.encodeUtf8(e);
		return this.uint32(t.byteLength), this.raw(t);
	}
	float(e) {
		Qt(e);
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setFloat32(0, e, !0), this.raw(t);
	}
	double(e) {
		let t = /* @__PURE__ */ new Uint8Array(8);
		return new DataView(t.buffer).setFloat64(0, e, !0), this.raw(t);
	}
	fixed32(e) {
		Zt(e);
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e, !0), this.raw(t);
	}
	sfixed32(e) {
		Xt(e);
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setInt32(0, e, !0), this.raw(t);
	}
	sint32(e) {
		return Xt(e), e = (e << 1 ^ e >> 31) >>> 0, he(e, this.buf), this;
	}
	sfixed64(e) {
		let t = /* @__PURE__ */ new Uint8Array(8), n = new DataView(t.buffer), r = m.enc(e);
		return n.setInt32(0, r.lo, !0), n.setInt32(4, r.hi, !0), this.raw(t);
	}
	fixed64(e) {
		let t = /* @__PURE__ */ new Uint8Array(8), n = new DataView(t.buffer), r = m.uEnc(e);
		return n.setInt32(0, r.lo, !0), n.setInt32(4, r.hi, !0), this.raw(t);
	}
	int64(e) {
		let t = m.enc(e);
		return oe(t.lo, t.hi, this.buf), this;
	}
	sint64(e) {
		let t = m.enc(e), n = t.hi >> 31;
		return oe(t.lo << 1 ^ n, (t.hi << 1 | t.lo >>> 31) ^ n, this.buf), this;
	}
	uint64(e) {
		let t = m.uEnc(e);
		return oe(t.lo, t.hi, this.buf), this;
	}
}, Yt = class {
	constructor(e, t = Ht().decodeUtf8) {
		this.decodeUtf8 = t, this.varint64 = ae, this.uint32 = ge, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
	}
	tag() {
		let e = this.uint32(), t = e >>> 3, n = e & 7;
		if (t <= 0 || n < 0 || n > 5) throw Error("illegal tag: field no " + t + " wire type " + n);
		return [t, n];
	}
	skip(e, t) {
		let n = this.pos;
		switch (e) {
			case _.Varint:
				for (; this.buf[this.pos++] & 128;);
				break;
			case _.Bit64: this.pos += 4;
			case _.Bit32:
				this.pos += 4;
				break;
			case _.LengthDelimited:
				let n = this.uint32();
				this.pos += n;
				break;
			case _.StartGroup:
				for (;;) {
					let [e, n] = this.tag();
					if (n === _.EndGroup) {
						if (t !== void 0 && e !== t) throw Error("invalid end group tag");
						break;
					}
					this.skip(n, e);
				}
				break;
			default: throw Error("cant skip wire type " + e);
		}
		return this.assertBounds(), this.buf.subarray(n, this.pos);
	}
	assertBounds() {
		if (this.pos > this.len) throw RangeError("premature EOF");
	}
	int32() {
		return this.uint32() | 0;
	}
	sint32() {
		let e = this.uint32();
		return e >>> 1 ^ -(e & 1);
	}
	int64() {
		return m.dec(...this.varint64());
	}
	uint64() {
		return m.uDec(...this.varint64());
	}
	sint64() {
		let [e, t] = this.varint64(), n = -(e & 1);
		return e = (e >>> 1 | (t & 1) << 31) ^ n, t = t >>> 1 ^ n, m.dec(e, t);
	}
	bool() {
		let [e, t] = this.varint64();
		return e !== 0 || t !== 0;
	}
	fixed32() {
		return this.view.getUint32((this.pos += 4) - 4, !0);
	}
	sfixed32() {
		return this.view.getInt32((this.pos += 4) - 4, !0);
	}
	fixed64() {
		return m.uDec(this.sfixed32(), this.sfixed32());
	}
	sfixed64() {
		return m.dec(this.sfixed32(), this.sfixed32());
	}
	float() {
		return this.view.getFloat32((this.pos += 4) - 4, !0);
	}
	double() {
		return this.view.getFloat64((this.pos += 8) - 8, !0);
	}
	bytes() {
		let e = this.uint32(), t = this.pos;
		return this.pos += e, this.assertBounds(), this.buf.subarray(t, t + e);
	}
	string() {
		return this.decodeUtf8(this.bytes());
	}
};
function Xt(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid int32: " + typeof e);
	if (!Number.isInteger(e) || e > Kt || e < qt) throw Error("invalid int32: " + e);
}
function Zt(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid uint32: " + typeof e);
	if (!Number.isInteger(e) || e > Gt || e < 0) throw Error("invalid uint32: " + e);
}
function Qt(e) {
	if (typeof e == "string") {
		let t = e;
		if (e = Number(e), Number.isNaN(e) && t !== "NaN") throw Error("invalid float32: " + t);
	} else if (typeof e != "number") throw Error("invalid float32: " + typeof e);
	if (Number.isFinite(e) && (e > Ut || e < Wt)) throw Error("invalid float32: " + e);
}
function $t(e, t) {
	let n = e.fieldKind == "list" ? Rt(t, e) : e.fieldKind == "map" ? zt(t, e) : nn(e, t);
	if (n === !0) return;
	let r;
	switch (e.fieldKind) {
		case "list":
			r = `expected ${cn(e)}, got ${on(t)}`;
			break;
		case "map":
			r = `expected ${ln(e)}, got ${on(t)}`;
			break;
		default: r = an(e, t, n);
	}
	return new It(e, r);
}
function en(e, t, n) {
	let r = nn(e, n);
	if (r !== !0) return new It(e, `list item #${t + 1}: ${an(e, n, r)}`);
}
function tn(e, t, n) {
	let r = rn(t, e.mapKey);
	if (r !== !0) return new It(e, `invalid map key: ${an({ scalar: e.mapKey }, t, r)}`);
	let i = nn(e, n);
	if (i !== !0) return new It(e, `map entry ${on(t)}: ${an(e, n, i)}`);
}
function nn(e, t) {
	return e.scalar === void 0 ? e.enum === void 0 ? Bt(t, e.message) : e.enum.open ? Number.isInteger(t) : e.enum.values.some((e) => e.number === t) : rn(t, e.scalar);
}
function rn(e, t) {
	switch (t) {
		case h.DOUBLE: return typeof e == "number";
		case h.FLOAT: return typeof e == "number" ? Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > Ut || e < Wt ? `${e.toFixed()} out of range` : !0 : !1;
		case h.INT32:
		case h.SFIXED32:
		case h.SINT32: return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Kt || e < qt ? `${e.toFixed()} out of range` : !0;
		case h.FIXED32:
		case h.UINT32: return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Gt || e < 0 ? `${e.toFixed()} out of range` : !0;
		case h.BOOL: return typeof e == "boolean";
		case h.STRING: return typeof e == "string" ? Ht().checkUtf8(e) || "invalid UTF8" : !1;
		case h.BYTES: return e instanceof Uint8Array;
		case h.INT64:
		case h.SFIXED64:
		case h.SINT64:
			if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0) try {
				return m.parse(e), !0;
			} catch {
				return `${e} out of range`;
			}
			return !1;
		case h.FIXED64:
		case h.UINT64:
			if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0) try {
				return m.uParse(e), !0;
			} catch {
				return `${e} out of range`;
			}
			return !1;
	}
}
function an(e, t, n) {
	return n = typeof n == "string" ? `: ${n}` : `, got ${on(t)}`, e.scalar === void 0 ? e.enum === void 0 ? `expected ${sn(e.message)}` + n : `expected ${e.enum.toString()}` + n : `expected ${un(e.scalar)}` + n;
}
function on(e) {
	switch (typeof e) {
		case "object": return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Rt(e) ? cn(e.field()) : zt(e) ? ln(e.field()) : Bt(e) ? sn(e.desc) : Ft(e) ? `message ${e.$typeName}` : "object";
		case "string": return e.length > 30 ? "string" : `"${e.split("\"").join("\\\"")}"`;
		case "boolean":
		case "number": return String(e);
		case "bigint": return String(e) + "n";
		default: return typeof e;
	}
}
function sn(e) {
	return `ReflectMessage (${e.typeName})`;
}
function cn(e) {
	switch (e.listKind) {
		case "message": return `ReflectList (${e.message.toString()})`;
		case "enum": return `ReflectList (${e.enum.toString()})`;
		case "scalar": return `ReflectList (${h[e.scalar]})`;
	}
}
function ln(e) {
	switch (e.mapKind) {
		case "message": return `ReflectMap (${h[e.mapKey]}, ${e.message.toString()})`;
		case "enum": return `ReflectMap (${h[e.mapKey]}, ${e.enum.toString()})`;
		case "scalar": return `ReflectMap (${h[e.mapKey]}, ${h[e.scalar]})`;
	}
}
function un(e) {
	switch (e) {
		case h.STRING: return "string";
		case h.BOOL: return "boolean";
		case h.INT64:
		case h.SINT64:
		case h.SFIXED64: return "bigint (int64)";
		case h.UINT64:
		case h.FIXED64: return "bigint (uint64)";
		case h.BYTES: return "Uint8Array";
		case h.DOUBLE: return "number (float64)";
		case h.FLOAT: return "number (float32)";
		case h.FIXED32:
		case h.UINT32: return "number (uint32)";
		case h.INT32:
		case h.SFIXED32:
		case h.SINT32: return "number (int32)";
	}
}
function dn(e) {
	return pn(e.$typeName);
}
function fn(e) {
	let t = e.fields[0];
	return pn(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function pn(e) {
	return e.startsWith("google.protobuf.") && [
		"DoubleValue",
		"FloatValue",
		"Int64Value",
		"UInt64Value",
		"Int32Value",
		"UInt32Value",
		"BoolValue",
		"StringValue",
		"BytesValue"
	].includes(e.substring(16));
}
var mn = 999, hn = 998, gn = 2;
function v(e, t) {
	if (Ft(t, e)) return t;
	let n = En(e);
	return t !== void 0 && _n(e, n, t), n;
}
function _n(e, t, n) {
	for (let r of e.members) {
		let e = n[r.localName];
		if (e == null) continue;
		let i;
		if (r.kind == "oneof") {
			let t = we(n, r);
			if (!t) continue;
			i = t, e = De(n, t);
		} else i = r;
		switch (i.fieldKind) {
			case "message":
				e = xn(i, e);
				break;
			case "scalar":
				e = vn(i, e);
				break;
			case "list":
				e = bn(i, e);
				break;
			case "map": e = yn(i, e);
		}
		Oe(t, i, e);
	}
	return t;
}
function vn(e, t) {
	return e.scalar == h.BYTES ? Sn(t) : t;
}
function yn(e, t) {
	if (Lt(t)) {
		if (e.scalar == h.BYTES) return Cn(t, Sn);
		if (e.mapKind == "message") return Cn(t, (t) => xn(e, t));
	}
	return t;
}
function bn(e, t) {
	if (Array.isArray(t)) {
		if (e.scalar == h.BYTES) return t.map(Sn);
		if (e.listKind == "message") return t.map((t) => xn(e, t));
	}
	return t;
}
function xn(e, t) {
	if (e.fieldKind == "message" && !e.oneof && fn(e.message)) return vn(e.message.fields[0], t);
	if (Lt(t)) {
		if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value") return t;
		if (!Ft(t, e.message)) return v(e.message, t);
	}
	return t;
}
function Sn(e) {
	return Array.isArray(e) ? new Uint8Array(e) : e;
}
function Cn(e, t) {
	let n = {};
	for (let r of Object.entries(e)) n[r[0]] = t(r[1]);
	return n;
}
var wn = Symbol(), Tn = /* @__PURE__ */ new WeakMap();
function En(e) {
	let t;
	if (Dn(e)) {
		let n = Tn.get(e), r, i;
		if (n) ({prototype: r, members: i} = n);
		else {
			r = {}, i = /* @__PURE__ */ new Set();
			for (let t of e.members) t.kind != "oneof" && (t.fieldKind == "scalar" || t.fieldKind == "enum") && t.presence != gn && (i.add(t), r[t.localName] = On(t));
			Tn.set(e, {
				prototype: r,
				members: i
			});
		}
		t = Object.create(r), t.$typeName = e.typeName;
		for (let n of e.members) i.has(n) || (n.kind != "field" || n.fieldKind != "message" && (n.fieldKind != "scalar" && n.fieldKind != "enum" || n.presence == gn)) && (t[n.localName] = On(n));
	} else {
		t = { $typeName: e.typeName };
		for (let n of e.members) (n.kind == "oneof" || n.presence == gn) && (t[n.localName] = On(n));
	}
	return t;
}
function Dn(e) {
	switch (e.file.edition) {
		case mn: return !1;
		case hn: return !0;
		default: return e.fields.some((e) => e.presence != gn && e.fieldKind != "message" && !e.oneof);
	}
}
function On(e) {
	if (e.kind == "oneof") return { case: void 0 };
	if (e.fieldKind == "list") return [];
	if (e.fieldKind == "map") return {};
	if (e.fieldKind == "message") return wn;
	let t = e.getDefaultValue();
	return t === void 0 ? e.fieldKind == "scalar" ? be(e.scalar, e.longAsString) : e.enum.values[0].number : e.fieldKind == "scalar" && e.longAsString ? t.toString() : t;
}
function kn(e, t, n = !0) {
	return new An(e, t, n);
}
var An = class {
	get sortedFields() {
		return this._sortedFields ??= this.desc.fields.concat().sort((e, t) => e.number - t.number);
	}
	constructor(e, t, n = !0) {
		this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = n, this.desc = e, this.message = this[Ce] = t ?? v(e), this.fields = e.fields, this.oneofs = e.oneofs, this.members = e.members;
	}
	findNumber(e) {
		return this._fieldsByNumber ||= new Map(this.desc.fields.map((e) => [e.number, e])), this._fieldsByNumber.get(e);
	}
	oneofCase(e) {
		return jn(this.message, e), we(this.message, e);
	}
	isSet(e) {
		return jn(this.message, e), Te(this.message, e);
	}
	clear(e) {
		jn(this.message, e), ke(this.message, e);
	}
	get(e) {
		jn(this.message, e);
		let t = De(this.message, e);
		switch (e.fieldKind) {
			case "list":
				let n = this.lists.get(e);
				return n && n[Ce] === t || this.lists.set(e, n = new Mn(e, t, this.check)), n;
			case "map":
				let r = this.maps.get(e);
				return r && r[Ce] === t || this.maps.set(e, r = new Nn(e, t, this.check)), r;
			case "message": return Fn(e, t, this.check);
			case "scalar": return t === void 0 ? be(e.scalar, !1) : Hn(e, t);
			case "enum": return t ?? e.enum.values[0].number;
		}
	}
	set(e, t) {
		if (jn(this.message, e), this.check) {
			let n = $t(e, t);
			if (n) throw n;
		}
		let n;
		n = e.fieldKind == "message" ? Pn(e, t) : zt(t) || Rt(t) ? t[Ce] : Un(e, t), Oe(this.message, e, n);
	}
	getUnknown() {
		return this.message.$unknown;
	}
	setUnknown(e) {
		this.message.$unknown = e;
	}
};
function jn(e, t) {
	if (t.parent.typeName !== e.$typeName) throw new It(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
var Mn = class {
	field() {
		return this._field;
	}
	get size() {
		return this._arr.length;
	}
	constructor(e, t, n) {
		this._field = e, this._arr = this[Ce] = t, this.check = n;
	}
	get(e) {
		let t = this._arr[e];
		return t === void 0 ? void 0 : Ln(this._field, t, this.check);
	}
	set(e, t) {
		if (e < 0 || e >= this._arr.length) throw new It(this._field, `list item #${e + 1}: out of range`);
		if (this.check) {
			let n = en(this._field, e, t);
			if (n) throw n;
		}
		this._arr[e] = In(this._field, t);
	}
	add(e) {
		if (this.check) {
			let t = en(this._field, this._arr.length, e);
			if (t) throw t;
		}
		this._arr.push(In(this._field, e));
	}
	clear() {
		this._arr.splice(0, this._arr.length);
	}
	[Symbol.iterator]() {
		return this.values();
	}
	keys() {
		return this._arr.keys();
	}
	*values() {
		for (let e of this._arr) yield Ln(this._field, e, this.check);
	}
	*entries() {
		for (let e = 0; e < this._arr.length; e++) yield [e, Ln(this._field, this._arr[e], this.check)];
	}
}, Nn = class {
	constructor(e, t, n = !0) {
		this.obj = this[Ce] = t ?? {}, this.check = n, this._field = e;
	}
	field() {
		return this._field;
	}
	set(e, t) {
		if (this.check) {
			let n = tn(this._field, e, t);
			if (n) throw n;
		}
		return this.obj[Bn(e)] = Rn(this._field, t), this;
	}
	delete(e) {
		let t = Bn(e), n = Object.prototype.hasOwnProperty.call(this.obj, t);
		return n && delete this.obj[t], n;
	}
	clear() {
		for (let e of Object.keys(this.obj)) delete this.obj[e];
	}
	get(e) {
		let t = this.obj[Bn(e)];
		return t !== void 0 && (t = zn(this._field, t, this.check)), t;
	}
	has(e) {
		return Object.prototype.hasOwnProperty.call(this.obj, Bn(e));
	}
	*keys() {
		for (let e of Object.keys(this.obj)) yield Vn(e, this._field.mapKey);
	}
	*entries() {
		for (let e of Object.entries(this.obj)) yield [Vn(e[0], this._field.mapKey), zn(this._field, e[1], this.check)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return Object.keys(this.obj).length;
	}
	*values() {
		for (let e of Object.values(this.obj)) yield zn(this._field, e, this.check);
	}
	forEach(e, t) {
		for (let n of this.entries()) e.call(t, n[1], n[0], this);
	}
};
function Pn(e, t) {
	return Bt(t) ? dn(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Gn(t.message) : t.message : t;
}
function Fn(e, t, n) {
	return t !== void 0 && (fn(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
		$typeName: e.message.typeName,
		value: Hn(e.message.fields[0], t)
	} : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && Lt(t) && (t = Wn(t))), new An(e.message, t, n);
}
function In(e, t) {
	return e.listKind == "message" ? Pn(e, t) : Un(e, t);
}
function Ln(e, t, n) {
	return e.listKind == "message" ? Fn(e, t, n) : Hn(e, t);
}
function Rn(e, t) {
	return e.mapKind == "message" ? Pn(e, t) : Un(e, t);
}
function zn(e, t, n) {
	return e.mapKind == "message" ? Fn(e, t, n) : t;
}
function Bn(e) {
	return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function Vn(e, t) {
	switch (t) {
		case h.STRING: return e;
		case h.INT32:
		case h.FIXED32:
		case h.UINT32:
		case h.SFIXED32:
		case h.SINT32: {
			let t = Number.parseInt(e);
			if (Number.isFinite(t)) return t;
			break;
		}
		case h.BOOL:
			switch (e) {
				case "true": return !0;
				case "false": return !1;
			}
			break;
		case h.UINT64:
		case h.FIXED64:
			try {
				return m.uParse(e);
			} catch {}
			break;
		default: try {
			return m.parse(e);
		} catch {}
	}
	return e;
}
function Hn(e, t) {
	switch (e.scalar) {
		case h.INT64:
		case h.SFIXED64:
		case h.SINT64:
			"longAsString" in e && e.longAsString && typeof t == "string" && (t = m.parse(t));
			break;
		case h.FIXED64:
		case h.UINT64: "longAsString" in e && e.longAsString && typeof t == "string" && (t = m.uParse(t));
	}
	return t;
}
function Un(e, t) {
	switch (e.scalar) {
		case h.INT64:
		case h.SFIXED64:
		case h.SINT64:
			"longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = m.parse(t));
			break;
		case h.FIXED64:
		case h.UINT64: "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = m.uParse(t));
	}
	return t;
}
function Wn(e) {
	let t = {
		$typeName: "google.protobuf.Struct",
		fields: {}
	};
	if (Lt(e)) for (let [n, r] of Object.entries(e)) t.fields[n] = qn(r);
	return t;
}
function Gn(e) {
	let t = {};
	for (let [n, r] of Object.entries(e.fields)) t[n] = Kn(r);
	return t;
}
function Kn(e) {
	switch (e.kind.case) {
		case "structValue": return Gn(e.kind.value);
		case "listValue": return e.kind.value.values.map(Kn);
		case "nullValue":
		case void 0: return null;
		default: return e.kind.value;
	}
}
function qn(e) {
	let t = {
		$typeName: "google.protobuf.Value",
		kind: { case: void 0 }
	};
	switch (typeof e) {
		case "number":
			t.kind = {
				case: "numberValue",
				value: e
			};
			break;
		case "string":
			t.kind = {
				case: "stringValue",
				value: e
			};
			break;
		case "boolean":
			t.kind = {
				case: "boolValue",
				value: e
			};
			break;
		case "object": if (e === null) t.kind = {
			case: "nullValue",
			value: 0
		};
		else if (Array.isArray(e)) {
			let n = {
				$typeName: "google.protobuf.ListValue",
				values: []
			};
			if (Array.isArray(e)) for (let t of e) n.values.push(qn(t));
			t.kind = {
				case: "listValue",
				value: n
			};
		} else t.kind = {
			case: "structValue",
			value: Wn(e)
		};
	}
	return t;
}
var Jn = 3, Yn = { writeUnknownFields: !0 };
function Xn(e) {
	return e ? Object.assign(Object.assign({}, Yn), e) : Yn;
}
function y(e, t, n) {
	return Zn(new Jt(), Xn(n), kn(e, t)).finish();
}
function Zn(e, t, n) {
	for (let r of n.sortedFields) if (n.isSet(r)) Qn(e, t, n, r);
	else if (r.presence == Jn) throw Error(`cannot encode ${r} to binary: required field not set`);
	if (t.writeUnknownFields) for (let { no: t, wireType: r, data: i } of n.getUnknown() ?? []) e.tag(t, r).raw(i);
	return e;
}
function Qn(e, t, n, r) {
	switch (r.fieldKind) {
		case "scalar":
		case "enum":
			$n(e, n.desc.typeName, r.name, r.scalar ?? h.INT32, r.number, n.get(r));
			break;
		case "list":
			tr(e, t, r, n.get(r));
			break;
		case "message":
			er(e, t, r, n.get(r));
			break;
		case "map": for (let [i, a] of n.get(r)) nr(e, t, r, i, a);
	}
}
function $n(e, t, n, r, i, a) {
	rr(e.tag(i, ir(r)), t, n, r, a);
}
function er(e, t, n, r) {
	n.delimitedEncoding ? Zn(e.tag(n.number, _.StartGroup), t, r).tag(n.number, _.EndGroup) : Zn(e.tag(n.number, _.LengthDelimited).fork(), t, r).join();
}
function tr(e, t, n, r) {
	if (n.listKind == "message") {
		for (let i of r) er(e, t, n, i);
		return;
	}
	let i = n.scalar ?? h.INT32;
	if (n.packed) {
		if (!r.size) return;
		e.tag(n.number, _.LengthDelimited).fork();
		for (let t of r) rr(e, n.parent.typeName, n.name, i, t);
		e.join();
	} else for (let t of r) $n(e, n.parent.typeName, n.name, i, n.number, t);
}
function nr(e, t, n, r, i) {
	switch (e.tag(n.number, _.LengthDelimited).fork(), $n(e, n.parent.typeName, n.name, n.mapKey, 1, r), n.mapKind) {
		case "scalar":
		case "enum":
			$n(e, n.parent.typeName, n.name, n.scalar ?? h.INT32, 2, i);
			break;
		case "message": Zn(e.tag(2, _.LengthDelimited).fork(), t, i).join();
	}
	e.join();
}
function rr(e, t, n, r, i) {
	try {
		switch (r) {
			case h.STRING:
				e.string(i);
				break;
			case h.BOOL:
				e.bool(i);
				break;
			case h.DOUBLE:
				e.double(i);
				break;
			case h.FLOAT:
				e.float(i);
				break;
			case h.INT32:
				e.int32(i);
				break;
			case h.INT64:
				e.int64(i);
				break;
			case h.UINT64:
				e.uint64(i);
				break;
			case h.FIXED64:
				e.fixed64(i);
				break;
			case h.BYTES:
				e.bytes(i);
				break;
			case h.FIXED32:
				e.fixed32(i);
				break;
			case h.SFIXED32:
				e.sfixed32(i);
				break;
			case h.SFIXED64:
				e.sfixed64(i);
				break;
			case h.SINT64:
				e.sint64(i);
				break;
			case h.UINT32:
				e.uint32(i);
				break;
			case h.SINT32: e.sint32(i);
		}
	} catch (e) {
		throw e instanceof Error ? Error(`cannot encode field ${t}.${n} to binary: ${e.message}`) : e;
	}
}
function ir(e) {
	switch (e) {
		case h.BYTES:
		case h.STRING: return _.LengthDelimited;
		case h.DOUBLE:
		case h.FIXED64:
		case h.SFIXED64: return _.Bit64;
		case h.FIXED32:
		case h.SFIXED32:
		case h.FLOAT: return _.Bit32;
		default: return _.Varint;
	}
}
function ar(e, t, ...n) {
	return n.reduce((e, t) => e.nestedMessages[t], e.messages[t]);
}
var or = /* @__PURE__ */ ar(/* @__PURE__ */ Ct({
	name: "google/protobuf/descriptor.proto",
	package: "google.protobuf",
	messageType: [
		{
			name: "FileDescriptorSet",
			field: [{
				name: "file",
				number: 1,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.FileDescriptorProto"
			}],
			extensionRange: [{
				start: 536e6,
				end: 536000001
			}]
		},
		{
			name: "FileDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "package",
					number: 2,
					type: 9,
					label: 1
				},
				{
					name: "dependency",
					number: 3,
					type: 9,
					label: 3
				},
				{
					name: "public_dependency",
					number: 10,
					type: 5,
					label: 3
				},
				{
					name: "weak_dependency",
					number: 11,
					type: 5,
					label: 3
				},
				{
					name: "option_dependency",
					number: 15,
					type: 9,
					label: 3
				},
				{
					name: "message_type",
					number: 4,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto"
				},
				{
					name: "enum_type",
					number: 5,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumDescriptorProto"
				},
				{
					name: "service",
					number: 6,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.ServiceDescriptorProto"
				},
				{
					name: "extension",
					number: 7,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldDescriptorProto"
				},
				{
					name: "options",
					number: 8,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FileOptions"
				},
				{
					name: "source_code_info",
					number: 9,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.SourceCodeInfo"
				},
				{
					name: "syntax",
					number: 12,
					type: 9,
					label: 1
				},
				{
					name: "edition",
					number: 14,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				}
			]
		},
		{
			name: "DescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "field",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldDescriptorProto"
				},
				{
					name: "extension",
					number: 6,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldDescriptorProto"
				},
				{
					name: "nested_type",
					number: 3,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto"
				},
				{
					name: "enum_type",
					number: 4,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumDescriptorProto"
				},
				{
					name: "extension_range",
					number: 5,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto.ExtensionRange"
				},
				{
					name: "oneof_decl",
					number: 8,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.OneofDescriptorProto"
				},
				{
					name: "options",
					number: 7,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.MessageOptions"
				},
				{
					name: "reserved_range",
					number: 9,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto.ReservedRange"
				},
				{
					name: "reserved_name",
					number: 10,
					type: 9,
					label: 3
				},
				{
					name: "visibility",
					number: 11,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.SymbolVisibility"
				}
			],
			nestedType: [{
				name: "ExtensionRange",
				field: [
					{
						name: "start",
						number: 1,
						type: 5,
						label: 1
					},
					{
						name: "end",
						number: 2,
						type: 5,
						label: 1
					},
					{
						name: "options",
						number: 3,
						type: 11,
						label: 1,
						typeName: ".google.protobuf.ExtensionRangeOptions"
					}
				]
			}, {
				name: "ReservedRange",
				field: [{
					name: "start",
					number: 1,
					type: 5,
					label: 1
				}, {
					name: "end",
					number: 2,
					type: 5,
					label: 1
				}]
			}]
		},
		{
			name: "ExtensionRangeOptions",
			field: [
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				},
				{
					name: "declaration",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.ExtensionRangeOptions.Declaration",
					options: { retention: 2 }
				},
				{
					name: "features",
					number: 50,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "verification",
					number: 3,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState",
					defaultValue: "UNVERIFIED",
					options: { retention: 2 }
				}
			],
			nestedType: [{
				name: "Declaration",
				field: [
					{
						name: "number",
						number: 1,
						type: 5,
						label: 1
					},
					{
						name: "full_name",
						number: 2,
						type: 9,
						label: 1
					},
					{
						name: "type",
						number: 3,
						type: 9,
						label: 1
					},
					{
						name: "reserved",
						number: 5,
						type: 8,
						label: 1
					},
					{
						name: "repeated",
						number: 6,
						type: 8,
						label: 1
					}
				]
			}],
			enumType: [{
				name: "VerificationState",
				value: [{
					name: "DECLARATION",
					number: 0
				}, {
					name: "UNVERIFIED",
					number: 1
				}]
			}],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "FieldDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "number",
					number: 3,
					type: 5,
					label: 1
				},
				{
					name: "label",
					number: 4,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldDescriptorProto.Label"
				},
				{
					name: "type",
					number: 5,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldDescriptorProto.Type"
				},
				{
					name: "type_name",
					number: 6,
					type: 9,
					label: 1
				},
				{
					name: "extendee",
					number: 2,
					type: 9,
					label: 1
				},
				{
					name: "default_value",
					number: 7,
					type: 9,
					label: 1
				},
				{
					name: "oneof_index",
					number: 9,
					type: 5,
					label: 1
				},
				{
					name: "json_name",
					number: 10,
					type: 9,
					label: 1
				},
				{
					name: "options",
					number: 8,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FieldOptions"
				},
				{
					name: "proto3_optional",
					number: 17,
					type: 8,
					label: 1
				}
			],
			enumType: [{
				name: "Type",
				value: [
					{
						name: "TYPE_DOUBLE",
						number: 1
					},
					{
						name: "TYPE_FLOAT",
						number: 2
					},
					{
						name: "TYPE_INT64",
						number: 3
					},
					{
						name: "TYPE_UINT64",
						number: 4
					},
					{
						name: "TYPE_INT32",
						number: 5
					},
					{
						name: "TYPE_FIXED64",
						number: 6
					},
					{
						name: "TYPE_FIXED32",
						number: 7
					},
					{
						name: "TYPE_BOOL",
						number: 8
					},
					{
						name: "TYPE_STRING",
						number: 9
					},
					{
						name: "TYPE_GROUP",
						number: 10
					},
					{
						name: "TYPE_MESSAGE",
						number: 11
					},
					{
						name: "TYPE_BYTES",
						number: 12
					},
					{
						name: "TYPE_UINT32",
						number: 13
					},
					{
						name: "TYPE_ENUM",
						number: 14
					},
					{
						name: "TYPE_SFIXED32",
						number: 15
					},
					{
						name: "TYPE_SFIXED64",
						number: 16
					},
					{
						name: "TYPE_SINT32",
						number: 17
					},
					{
						name: "TYPE_SINT64",
						number: 18
					}
				]
			}, {
				name: "Label",
				value: [
					{
						name: "LABEL_OPTIONAL",
						number: 1
					},
					{
						name: "LABEL_REPEATED",
						number: 3
					},
					{
						name: "LABEL_REQUIRED",
						number: 2
					}
				]
			}]
		},
		{
			name: "OneofDescriptorProto",
			field: [{
				name: "name",
				number: 1,
				type: 9,
				label: 1
			}, {
				name: "options",
				number: 2,
				type: 11,
				label: 1,
				typeName: ".google.protobuf.OneofOptions"
			}]
		},
		{
			name: "EnumDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "value",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumValueDescriptorProto"
				},
				{
					name: "options",
					number: 3,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.EnumOptions"
				},
				{
					name: "reserved_range",
					number: 4,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange"
				},
				{
					name: "reserved_name",
					number: 5,
					type: 9,
					label: 3
				},
				{
					name: "visibility",
					number: 6,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.SymbolVisibility"
				}
			],
			nestedType: [{
				name: "EnumReservedRange",
				field: [{
					name: "start",
					number: 1,
					type: 5,
					label: 1
				}, {
					name: "end",
					number: 2,
					type: 5,
					label: 1
				}]
			}]
		},
		{
			name: "EnumValueDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "number",
					number: 2,
					type: 5,
					label: 1
				},
				{
					name: "options",
					number: 3,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.EnumValueOptions"
				}
			]
		},
		{
			name: "ServiceDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "method",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.MethodDescriptorProto"
				},
				{
					name: "options",
					number: 3,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.ServiceOptions"
				}
			]
		},
		{
			name: "MethodDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "input_type",
					number: 2,
					type: 9,
					label: 1
				},
				{
					name: "output_type",
					number: 3,
					type: 9,
					label: 1
				},
				{
					name: "options",
					number: 4,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.MethodOptions"
				},
				{
					name: "client_streaming",
					number: 5,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "server_streaming",
					number: 6,
					type: 8,
					label: 1,
					defaultValue: "false"
				}
			]
		},
		{
			name: "FileOptions",
			field: [
				{
					name: "java_package",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "java_outer_classname",
					number: 8,
					type: 9,
					label: 1
				},
				{
					name: "java_multiple_files",
					number: 10,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "java_generate_equals_and_hash",
					number: 20,
					type: 8,
					label: 1,
					options: { deprecated: !0 }
				},
				{
					name: "java_string_check_utf8",
					number: 27,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "optimize_for",
					number: 9,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FileOptions.OptimizeMode",
					defaultValue: "SPEED"
				},
				{
					name: "go_package",
					number: 11,
					type: 9,
					label: 1
				},
				{
					name: "cc_generic_services",
					number: 16,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "java_generic_services",
					number: 17,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "py_generic_services",
					number: 18,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated",
					number: 23,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "cc_enable_arenas",
					number: 31,
					type: 8,
					label: 1,
					defaultValue: "true"
				},
				{
					name: "objc_class_prefix",
					number: 36,
					type: 9,
					label: 1
				},
				{
					name: "csharp_namespace",
					number: 37,
					type: 9,
					label: 1
				},
				{
					name: "swift_prefix",
					number: 39,
					type: 9,
					label: 1
				},
				{
					name: "php_class_prefix",
					number: 40,
					type: 9,
					label: 1
				},
				{
					name: "php_namespace",
					number: 41,
					type: 9,
					label: 1
				},
				{
					name: "php_metadata_namespace",
					number: 44,
					type: 9,
					label: 1
				},
				{
					name: "ruby_package",
					number: 45,
					type: 9,
					label: 1
				},
				{
					name: "features",
					number: 50,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			enumType: [{
				name: "OptimizeMode",
				value: [
					{
						name: "SPEED",
						number: 1
					},
					{
						name: "CODE_SIZE",
						number: 2
					},
					{
						name: "LITE_RUNTIME",
						number: 3
					}
				]
			}],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "MessageOptions",
			field: [
				{
					name: "message_set_wire_format",
					number: 1,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "no_standard_descriptor_accessor",
					number: 2,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "map_entry",
					number: 7,
					type: 8,
					label: 1
				},
				{
					name: "deprecated_legacy_json_field_conflicts",
					number: 11,
					type: 8,
					label: 1,
					options: { deprecated: !0 }
				},
				{
					name: "features",
					number: 12,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "FieldOptions",
			field: [
				{
					name: "ctype",
					number: 1,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.CType",
					defaultValue: "STRING"
				},
				{
					name: "packed",
					number: 2,
					type: 8,
					label: 1
				},
				{
					name: "jstype",
					number: 6,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.JSType",
					defaultValue: "JS_NORMAL"
				},
				{
					name: "lazy",
					number: 5,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "unverified_lazy",
					number: 15,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "weak",
					number: 10,
					type: 8,
					label: 1,
					defaultValue: "false",
					options: { deprecated: !0 }
				},
				{
					name: "debug_redact",
					number: 16,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "retention",
					number: 17,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.OptionRetention"
				},
				{
					name: "targets",
					number: 19,
					type: 14,
					label: 3,
					typeName: ".google.protobuf.FieldOptions.OptionTargetType"
				},
				{
					name: "edition_defaults",
					number: 20,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldOptions.EditionDefault"
				},
				{
					name: "features",
					number: 21,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "feature_support",
					number: 22,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			nestedType: [{
				name: "EditionDefault",
				field: [{
					name: "edition",
					number: 3,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				}, {
					name: "value",
					number: 2,
					type: 9,
					label: 1
				}]
			}, {
				name: "FeatureSupport",
				field: [
					{
						name: "edition_introduced",
						number: 1,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					},
					{
						name: "edition_deprecated",
						number: 2,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					},
					{
						name: "deprecation_warning",
						number: 3,
						type: 9,
						label: 1
					},
					{
						name: "edition_removed",
						number: 4,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					}
				]
			}],
			enumType: [
				{
					name: "CType",
					value: [
						{
							name: "STRING",
							number: 0
						},
						{
							name: "CORD",
							number: 1
						},
						{
							name: "STRING_PIECE",
							number: 2
						}
					]
				},
				{
					name: "JSType",
					value: [
						{
							name: "JS_NORMAL",
							number: 0
						},
						{
							name: "JS_STRING",
							number: 1
						},
						{
							name: "JS_NUMBER",
							number: 2
						}
					]
				},
				{
					name: "OptionRetention",
					value: [
						{
							name: "RETENTION_UNKNOWN",
							number: 0
						},
						{
							name: "RETENTION_RUNTIME",
							number: 1
						},
						{
							name: "RETENTION_SOURCE",
							number: 2
						}
					]
				},
				{
					name: "OptionTargetType",
					value: [
						{
							name: "TARGET_TYPE_UNKNOWN",
							number: 0
						},
						{
							name: "TARGET_TYPE_FILE",
							number: 1
						},
						{
							name: "TARGET_TYPE_EXTENSION_RANGE",
							number: 2
						},
						{
							name: "TARGET_TYPE_MESSAGE",
							number: 3
						},
						{
							name: "TARGET_TYPE_FIELD",
							number: 4
						},
						{
							name: "TARGET_TYPE_ONEOF",
							number: 5
						},
						{
							name: "TARGET_TYPE_ENUM",
							number: 6
						},
						{
							name: "TARGET_TYPE_ENUM_ENTRY",
							number: 7
						},
						{
							name: "TARGET_TYPE_SERVICE",
							number: 8
						},
						{
							name: "TARGET_TYPE_METHOD",
							number: 9
						}
					]
				}
			],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "OneofOptions",
			field: [{
				name: "features",
				number: 1,
				type: 11,
				label: 1,
				typeName: ".google.protobuf.FeatureSet"
			}, {
				name: "uninterpreted_option",
				number: 999,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.UninterpretedOption"
			}],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "EnumOptions",
			field: [
				{
					name: "allow_alias",
					number: 2,
					type: 8,
					label: 1
				},
				{
					name: "deprecated",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated_legacy_json_field_conflicts",
					number: 6,
					type: 8,
					label: 1,
					options: { deprecated: !0 }
				},
				{
					name: "features",
					number: 7,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "EnumValueOptions",
			field: [
				{
					name: "deprecated",
					number: 1,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "features",
					number: 2,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "debug_redact",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "feature_support",
					number: 4,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "ServiceOptions",
			field: [
				{
					name: "features",
					number: 34,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "deprecated",
					number: 33,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "MethodOptions",
			field: [
				{
					name: "deprecated",
					number: 33,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "idempotency_level",
					number: 34,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.MethodOptions.IdempotencyLevel",
					defaultValue: "IDEMPOTENCY_UNKNOWN"
				},
				{
					name: "features",
					number: 35,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			enumType: [{
				name: "IdempotencyLevel",
				value: [
					{
						name: "IDEMPOTENCY_UNKNOWN",
						number: 0
					},
					{
						name: "NO_SIDE_EFFECTS",
						number: 1
					},
					{
						name: "IDEMPOTENT",
						number: 2
					}
				]
			}],
			extensionRange: [{
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "UninterpretedOption",
			field: [
				{
					name: "name",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption.NamePart"
				},
				{
					name: "identifier_value",
					number: 3,
					type: 9,
					label: 1
				},
				{
					name: "positive_int_value",
					number: 4,
					type: 4,
					label: 1
				},
				{
					name: "negative_int_value",
					number: 5,
					type: 3,
					label: 1
				},
				{
					name: "double_value",
					number: 6,
					type: 1,
					label: 1
				},
				{
					name: "string_value",
					number: 7,
					type: 12,
					label: 1
				},
				{
					name: "aggregate_value",
					number: 8,
					type: 9,
					label: 1
				}
			],
			nestedType: [{
				name: "NamePart",
				field: [{
					name: "name_part",
					number: 1,
					type: 9,
					label: 2
				}, {
					name: "is_extension",
					number: 2,
					type: 8,
					label: 2
				}]
			}]
		},
		{
			name: "FeatureSet",
			field: [
				{
					name: "field_presence",
					number: 1,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.FieldPresence",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [
							{
								value: "EXPLICIT",
								edition: 900
							},
							{
								value: "IMPLICIT",
								edition: 999
							},
							{
								value: "EXPLICIT",
								edition: 1e3
							}
						]
					}
				},
				{
					name: "enum_type",
					number: 2,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.EnumType",
					options: {
						retention: 1,
						targets: [6, 1],
						editionDefaults: [{
							value: "CLOSED",
							edition: 900
						}, {
							value: "OPEN",
							edition: 999
						}]
					}
				},
				{
					name: "repeated_field_encoding",
					number: 3,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [{
							value: "EXPANDED",
							edition: 900
						}, {
							value: "PACKED",
							edition: 999
						}]
					}
				},
				{
					name: "utf8_validation",
					number: 4,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.Utf8Validation",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [{
							value: "NONE",
							edition: 900
						}, {
							value: "VERIFY",
							edition: 999
						}]
					}
				},
				{
					name: "message_encoding",
					number: 5,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.MessageEncoding",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [{
							value: "LENGTH_PREFIXED",
							edition: 900
						}]
					}
				},
				{
					name: "json_format",
					number: 6,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.JsonFormat",
					options: {
						retention: 1,
						targets: [
							3,
							6,
							1
						],
						editionDefaults: [{
							value: "LEGACY_BEST_EFFORT",
							edition: 900
						}, {
							value: "ALLOW",
							edition: 999
						}]
					}
				},
				{
					name: "enforce_naming_style",
					number: 7,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle",
					options: {
						retention: 2,
						targets: [
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9
						],
						editionDefaults: [{
							value: "STYLE_LEGACY",
							edition: 900
						}, {
							value: "STYLE2024",
							edition: 1001
						}]
					}
				},
				{
					name: "default_symbol_visibility",
					number: 8,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility",
					options: {
						retention: 2,
						targets: [1],
						editionDefaults: [{
							value: "EXPORT_ALL",
							edition: 900
						}, {
							value: "EXPORT_TOP_LEVEL",
							edition: 1001
						}]
					}
				}
			],
			nestedType: [{
				name: "VisibilityFeature",
				enumType: [{
					name: "DefaultSymbolVisibility",
					value: [
						{
							name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN",
							number: 0
						},
						{
							name: "EXPORT_ALL",
							number: 1
						},
						{
							name: "EXPORT_TOP_LEVEL",
							number: 2
						},
						{
							name: "LOCAL_ALL",
							number: 3
						},
						{
							name: "STRICT",
							number: 4
						}
					]
				}]
			}],
			enumType: [
				{
					name: "FieldPresence",
					value: [
						{
							name: "FIELD_PRESENCE_UNKNOWN",
							number: 0
						},
						{
							name: "EXPLICIT",
							number: 1
						},
						{
							name: "IMPLICIT",
							number: 2
						},
						{
							name: "LEGACY_REQUIRED",
							number: 3
						}
					]
				},
				{
					name: "EnumType",
					value: [
						{
							name: "ENUM_TYPE_UNKNOWN",
							number: 0
						},
						{
							name: "OPEN",
							number: 1
						},
						{
							name: "CLOSED",
							number: 2
						}
					]
				},
				{
					name: "RepeatedFieldEncoding",
					value: [
						{
							name: "REPEATED_FIELD_ENCODING_UNKNOWN",
							number: 0
						},
						{
							name: "PACKED",
							number: 1
						},
						{
							name: "EXPANDED",
							number: 2
						}
					]
				},
				{
					name: "Utf8Validation",
					value: [
						{
							name: "UTF8_VALIDATION_UNKNOWN",
							number: 0
						},
						{
							name: "VERIFY",
							number: 2
						},
						{
							name: "NONE",
							number: 3
						}
					]
				},
				{
					name: "MessageEncoding",
					value: [
						{
							name: "MESSAGE_ENCODING_UNKNOWN",
							number: 0
						},
						{
							name: "LENGTH_PREFIXED",
							number: 1
						},
						{
							name: "DELIMITED",
							number: 2
						}
					]
				},
				{
					name: "JsonFormat",
					value: [
						{
							name: "JSON_FORMAT_UNKNOWN",
							number: 0
						},
						{
							name: "ALLOW",
							number: 1
						},
						{
							name: "LEGACY_BEST_EFFORT",
							number: 2
						}
					]
				},
				{
					name: "EnforceNamingStyle",
					value: [
						{
							name: "ENFORCE_NAMING_STYLE_UNKNOWN",
							number: 0
						},
						{
							name: "STYLE2024",
							number: 1
						},
						{
							name: "STYLE_LEGACY",
							number: 2
						}
					]
				}
			],
			extensionRange: [
				{
					start: 1e3,
					end: 9995
				},
				{
					start: 9995,
					end: 1e4
				},
				{
					start: 1e4,
					end: 10001
				}
			]
		},
		{
			name: "FeatureSetDefaults",
			field: [
				{
					name: "defaults",
					number: 1,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault"
				},
				{
					name: "minimum_edition",
					number: 4,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				},
				{
					name: "maximum_edition",
					number: 5,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				}
			],
			nestedType: [{
				name: "FeatureSetEditionDefault",
				field: [
					{
						name: "edition",
						number: 3,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					},
					{
						name: "overridable_features",
						number: 4,
						type: 11,
						label: 1,
						typeName: ".google.protobuf.FeatureSet"
					},
					{
						name: "fixed_features",
						number: 5,
						type: 11,
						label: 1,
						typeName: ".google.protobuf.FeatureSet"
					}
				]
			}]
		},
		{
			name: "SourceCodeInfo",
			field: [{
				name: "location",
				number: 1,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.SourceCodeInfo.Location"
			}],
			nestedType: [{
				name: "Location",
				field: [
					{
						name: "path",
						number: 1,
						type: 5,
						label: 3,
						options: { packed: !0 }
					},
					{
						name: "span",
						number: 2,
						type: 5,
						label: 3,
						options: { packed: !0 }
					},
					{
						name: "leading_comments",
						number: 3,
						type: 9,
						label: 1
					},
					{
						name: "trailing_comments",
						number: 4,
						type: 9,
						label: 1
					},
					{
						name: "leading_detached_comments",
						number: 6,
						type: 9,
						label: 3
					}
				]
			}],
			extensionRange: [{
				start: 536e6,
				end: 536000001
			}]
		},
		{
			name: "GeneratedCodeInfo",
			field: [{
				name: "annotation",
				number: 1,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.GeneratedCodeInfo.Annotation"
			}],
			nestedType: [{
				name: "Annotation",
				field: [
					{
						name: "path",
						number: 1,
						type: 5,
						label: 3,
						options: { packed: !0 }
					},
					{
						name: "source_file",
						number: 2,
						type: 9,
						label: 1
					},
					{
						name: "begin",
						number: 3,
						type: 5,
						label: 1
					},
					{
						name: "end",
						number: 4,
						type: 5,
						label: 1
					},
					{
						name: "semantic",
						number: 5,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic"
					}
				],
				enumType: [{
					name: "Semantic",
					value: [
						{
							name: "NONE",
							number: 0
						},
						{
							name: "SET",
							number: 1
						},
						{
							name: "ALIAS",
							number: 2
						}
					]
				}]
			}]
		}
	],
	enumType: [{
		name: "Edition",
		value: [
			{
				name: "EDITION_UNKNOWN",
				number: 0
			},
			{
				name: "EDITION_LEGACY",
				number: 900
			},
			{
				name: "EDITION_PROTO2",
				number: 998
			},
			{
				name: "EDITION_PROTO3",
				number: 999
			},
			{
				name: "EDITION_2023",
				number: 1e3
			},
			{
				name: "EDITION_2024",
				number: 1001
			},
			{
				name: "EDITION_1_TEST_ONLY",
				number: 1
			},
			{
				name: "EDITION_2_TEST_ONLY",
				number: 2
			},
			{
				name: "EDITION_99997_TEST_ONLY",
				number: 99997
			},
			{
				name: "EDITION_99998_TEST_ONLY",
				number: 99998
			},
			{
				name: "EDITION_99999_TEST_ONLY",
				number: 99999
			},
			{
				name: "EDITION_MAX",
				number: 0x7fffffff
			}
		]
	}, {
		name: "SymbolVisibility",
		value: [
			{
				name: "VISIBILITY_UNSET",
				number: 0
			},
			{
				name: "VISIBILITY_LOCAL",
				number: 1
			},
			{
				name: "VISIBILITY_EXPORT",
				number: 2
			}
		]
	}]
}), 1), sr;
(function(e) {
	e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(sr ||= {});
var cr;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(cr ||= {});
var lr;
(function(e) {
	e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(lr ||= {});
var ur;
(function(e) {
	e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(ur ||= {});
var dr;
(function(e) {
	e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(dr ||= {});
var fr;
(function(e) {
	e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(fr ||= {});
var pr;
(function(e) {
	e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(pr ||= {});
var mr;
(function(e) {
	e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(mr ||= {});
var hr;
(function(e) {
	e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(hr ||= {});
var gr;
(function(e) {
	e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(gr ||= {});
var _r;
(function(e) {
	e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(_r ||= {});
var vr;
(function(e) {
	e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(vr ||= {});
var yr;
(function(e) {
	e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(yr ||= {});
var br;
(function(e) {
	e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(br ||= {});
var xr;
(function(e) {
	e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(xr ||= {});
var Sr;
(function(e) {
	e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(Sr ||= {});
var Cr;
(function(e) {
	e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(Cr ||= {});
var wr;
(function(e) {
	e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(wr ||= {});
var Tr;
(function(e) {
	e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 0x7fffffff] = "EDITION_MAX";
})(Tr ||= {});
var Er;
(function(e) {
	e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(Er ||= {});
function b(e, t, ...n) {
	if (n.length == 0) return e.enums[t];
	let r = n.pop();
	return n.reduce((e, t) => e.nestedMessages[t], e.messages[t]).nestedEnums[r];
}
var Dr = { readUnknownFields: !0 };
function Or(e) {
	return e ? Object.assign(Object.assign({}, Dr), e) : Dr;
}
function x(e, t, n) {
	let r = kn(e, void 0, !1);
	return kr(r, new Yt(t), Or(n), !1, t.byteLength), r.message;
}
function kr(e, t, n, r, i) {
	let a = r ? t.len : t.pos + i, o, s, c = e.getUnknown() ?? [];
	for (; t.pos < a && ([o, s] = t.tag(), !(r && s == _.EndGroup));) {
		let r = e.findNumber(o);
		if (r) Ar(e, t, r, s, n);
		else {
			let e = t.skip(s, o);
			n.readUnknownFields && c.push({
				no: o,
				wireType: s,
				data: e
			});
		}
	}
	if (r && (s != _.EndGroup || o !== i)) throw Error("invalid end group tag");
	c.length > 0 && e.setUnknown(c);
}
function Ar(e, t, n, r, i) {
	switch (n.fieldKind) {
		case "scalar":
			e.set(n, Pr(t, n.scalar));
			break;
		case "enum":
			let a = Pr(t, h.INT32);
			if (n.enum.open) e.set(n, a);
			else if (n.enum.values.some((e) => e.number === a)) e.set(n, a);
			else if (i.readUnknownFields) {
				let t = [];
				he(a, t);
				let i = e.getUnknown() ?? [];
				i.push({
					no: n.number,
					wireType: r,
					data: new Uint8Array(t)
				}), e.setUnknown(i);
			}
			break;
		case "message":
			e.set(n, Nr(t, i, n, e.get(n)));
			break;
		case "list":
			Mr(t, r, e.get(n), i);
			break;
		case "map": jr(t, e.get(n), i);
	}
}
function jr(e, t, n) {
	let r = t.field(), i, a, o = e.uint32(), s = e.pos + o;
	for (; e.pos < s;) {
		let [t] = e.tag();
		switch (t) {
			case 1:
				i = Pr(e, r.mapKey);
				break;
			case 2: switch (r.mapKind) {
				case "scalar":
					a = Pr(e, r.scalar);
					break;
				case "enum":
					a = e.int32();
					break;
				case "message": a = Nr(e, n, r);
			}
		}
	}
	if (i === void 0 && (i = be(r.mapKey, !1)), a === void 0) switch (r.mapKind) {
		case "scalar":
			a = be(r.scalar, !1);
			break;
		case "enum":
			a = r.enum.values[0].number;
			break;
		case "message": a = kn(r.message, void 0, !1);
	}
	t.set(i, a);
}
function Mr(e, t, n, r) {
	let i = n.field();
	if (i.listKind === "message") {
		n.add(Nr(e, r, i));
		return;
	}
	let a = i.scalar ?? h.INT32;
	if (t != _.LengthDelimited || a == h.STRING || a == h.BYTES) {
		n.add(Pr(e, a));
		return;
	}
	let o = e.uint32() + e.pos;
	for (; e.pos < o;) n.add(Pr(e, a));
}
function Nr(e, t, n, r) {
	let i = n.delimitedEncoding, a = r ?? kn(n.message, void 0, !1);
	return kr(a, e, t, i, i ? n.number : e.uint32()), a;
}
function Pr(e, t) {
	switch (t) {
		case h.STRING: return e.string();
		case h.BOOL: return e.bool();
		case h.DOUBLE: return e.double();
		case h.FLOAT: return e.float();
		case h.INT32: return e.int32();
		case h.INT64: return e.int64();
		case h.UINT64: return e.uint64();
		case h.FIXED64: return e.fixed64();
		case h.BYTES: return e.bytes();
		case h.FIXED32: return e.fixed32();
		case h.SFIXED32: return e.sfixed32();
		case h.SFIXED64: return e.sfixed64();
		case h.SINT64: return e.sint64();
		case h.UINT32: return e.uint32();
		case h.SINT32: return e.sint32();
	}
}
function S(e, t) {
	let n = x(or, kt(e));
	return n.messageType.forEach(Ae), n.dependency = t?.map((e) => e.proto.name) ?? [], Fe(n, (e) => t?.find((t) => t.proto.name === e)).getFile(n.name);
}
function C(e, t, ...n) {
	return n.reduce((e, t) => e.nestedMessages[t], e.messages[t]);
}
var Fr = c({
	ATAK: () => Yo,
	Admin: () => j,
	AppOnly: () => Ko,
	CannedMessages: () => ss,
	Channel: () => Ir,
	ClientOnly: () => ms,
	Config: () => Wr,
	ConnectionStatus: () => Mi,
	LocalOnly: () => us,
	Mesh: () => k,
	ModuleConfig: () => Bi,
	Mqtt: () => _s,
	PaxCount: () => xs,
	Portnums: () => E,
	PowerMon: () => ws,
	RemoteHardware: () => Ms,
	Rtttl: () => Ls,
	StoreForward: () => Bs,
	Telemetry: () => va,
	Xmodem: () => O
}), Ir = p({
	ChannelSchema: () => Br,
	ChannelSettingsSchema: () => Rr,
	Channel_Role: () => Vr,
	Channel_RoleSchema: () => Hr,
	ModuleSettingsSchema: () => zr,
	file_channel: () => Lr
}), Lr = /* @__PURE__ */ S("Cg1jaGFubmVsLnByb3RvEgptZXNodGFzdGljIrgBCg9DaGFubmVsU2V0dGluZ3MSFwoLY2hhbm5lbF9udW0YASABKA1CAhgBEgsKA3BzaxgCIAEoDBIMCgRuYW1lGAMgASgJEgoKAmlkGAQgASgHEhYKDnVwbGlua19lbmFibGVkGAUgASgIEhgKEGRvd25saW5rX2VuYWJsZWQYBiABKAgSMwoPbW9kdWxlX3NldHRpbmdzGAcgASgLMhoubWVzaHRhc3RpYy5Nb2R1bGVTZXR0aW5ncyJFCg5Nb2R1bGVTZXR0aW5ncxIaChJwb3NpdGlvbl9wcmVjaXNpb24YASABKA0SFwoPaXNfY2xpZW50X211dGVkGAIgASgIIqEBCgdDaGFubmVsEg0KBWluZGV4GAEgASgFEi0KCHNldHRpbmdzGAIgASgLMhsubWVzaHRhc3RpYy5DaGFubmVsU2V0dGluZ3MSJgoEcm9sZRgDIAEoDjIYLm1lc2h0YXN0aWMuQ2hhbm5lbC5Sb2xlIjAKBFJvbGUSDAoIRElTQUJMRUQQABILCgdQUklNQVJZEAESDQoJU0VDT05EQVJZEAJCYgoTY29tLmdlZWtzdmlsbGUubWVzaEINQ2hhbm5lbFByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM"), Rr = /* @__PURE__ */ C(Lr, 0), zr = /* @__PURE__ */ C(Lr, 1), Br = /* @__PURE__ */ C(Lr, 2), Vr = /* @__PURE__ */ function(e) {
	return e[e.DISABLED = 0] = "DISABLED", e[e.PRIMARY = 1] = "PRIMARY", e[e.SECONDARY = 2] = "SECONDARY", e;
}({}), Hr = /* @__PURE__ */ b(Lr, 2, 0), Ur = /* @__PURE__ */ S("Cg9kZXZpY2VfdWkucHJvdG8SCm1lc2h0YXN0aWMivgMKDkRldmljZVVJQ29uZmlnEg8KB3ZlcnNpb24YASABKA0SGQoRc2NyZWVuX2JyaWdodG5lc3MYAiABKA0SFgoOc2NyZWVuX3RpbWVvdXQYAyABKA0SEwoLc2NyZWVuX2xvY2sYBCABKAgSFQoNc2V0dGluZ3NfbG9jaxgFIAEoCBIQCghwaW5fY29kZRgGIAEoDRIgCgV0aGVtZRgHIAEoDjIRLm1lc2h0YXN0aWMuVGhlbWUSFQoNYWxlcnRfZW5hYmxlZBgIIAEoCBIWCg5iYW5uZXJfZW5hYmxlZBgJIAEoCBIUCgxyaW5nX3RvbmVfaWQYCiABKA0SJgoIbGFuZ3VhZ2UYCyABKA4yFC5tZXNodGFzdGljLkxhbmd1YWdlEisKC25vZGVfZmlsdGVyGAwgASgLMhYubWVzaHRhc3RpYy5Ob2RlRmlsdGVyEjEKDm5vZGVfaGlnaGxpZ2h0GA0gASgLMhkubWVzaHRhc3RpYy5Ob2RlSGlnaGxpZ2h0EhgKEGNhbGlicmF0aW9uX2RhdGEYDiABKAwSIQoIbWFwX2RhdGEYDyABKAsyDy5tZXNodGFzdGljLk1hcCKnAQoKTm9kZUZpbHRlchIWCg51bmtub3duX3N3aXRjaBgBIAEoCBIWCg5vZmZsaW5lX3N3aXRjaBgCIAEoCBIZChFwdWJsaWNfa2V5X3N3aXRjaBgDIAEoCBIRCglob3BzX2F3YXkYBCABKAUSFwoPcG9zaXRpb25fc3dpdGNoGAUgASgIEhEKCW5vZGVfbmFtZRgGIAEoCRIPCgdjaGFubmVsGAcgASgFIn4KDU5vZGVIaWdobGlnaHQSEwoLY2hhdF9zd2l0Y2gYASABKAgSFwoPcG9zaXRpb25fc3dpdGNoGAIgASgIEhgKEHRlbGVtZXRyeV9zd2l0Y2gYAyABKAgSEgoKaWFxX3N3aXRjaBgEIAEoCBIRCglub2RlX25hbWUYBSABKAkiPQoIR2VvUG9pbnQSDAoEem9vbRgBIAEoBRIQCghsYXRpdHVkZRgCIAEoBRIRCglsb25naXR1ZGUYAyABKAUiTAoDTWFwEiIKBGhvbWUYASABKAsyFC5tZXNodGFzdGljLkdlb1BvaW50Eg0KBXN0eWxlGAIgASgJEhIKCmZvbGxvd19ncHMYAyABKAgqJQoFVGhlbWUSCAoEREFSSxAAEgkKBUxJR0hUEAESBwoDUkVEEAIqqQIKCExhbmd1YWdlEgsKB0VOR0xJU0gQABIKCgZGUkVOQ0gQARIKCgZHRVJNQU4QAhILCgdJVEFMSUFOEAMSDgoKUE9SVFVHVUVTRRAEEgsKB1NQQU5JU0gQBRILCgdTV0VESVNIEAYSCwoHRklOTklTSBAHEgoKBlBPTElTSBAIEgsKB1RVUktJU0gQCRILCgdTRVJCSUFOEAoSCwoHUlVTU0lBThALEgkKBURVVENIEAwSCQoFR1JFRUsQDRINCglOT1JXRUdJQU4QDhINCglTTE9WRU5JQU4QDxINCglVS1JBSU5JQU4QEBINCglCVUxHQVJJQU4QERIWChJTSU1QTElGSUVEX0NISU5FU0UQHhIXChNUUkFESVRJT05BTF9DSElORVNFEB9CYwoTY29tLmdlZWtzdmlsbGUubWVzaEIORGV2aWNlVUlQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), Wr = p({
	ConfigSchema: () => Gr,
	Config_BluetoothConfigSchema: () => Di,
	Config_BluetoothConfig_PairingMode: () => Oi,
	Config_BluetoothConfig_PairingModeSchema: () => ki,
	Config_DeviceConfigSchema: () => Kr,
	Config_DeviceConfig_BuzzerMode: () => Zr,
	Config_DeviceConfig_BuzzerModeSchema: () => Qr,
	Config_DeviceConfig_RebroadcastMode: () => Yr,
	Config_DeviceConfig_RebroadcastModeSchema: () => Xr,
	Config_DeviceConfig_Role: () => qr,
	Config_DeviceConfig_RoleSchema: () => Jr,
	Config_DisplayConfigSchema: () => di,
	Config_DisplayConfig_CompassOrientation: () => bi,
	Config_DisplayConfig_CompassOrientationSchema: () => xi,
	Config_DisplayConfig_DisplayMode: () => vi,
	Config_DisplayConfig_DisplayModeSchema: () => yi,
	Config_DisplayConfig_DisplayUnits: () => mi,
	Config_DisplayConfig_DisplayUnitsSchema: () => hi,
	Config_DisplayConfig_GpsCoordinateFormat: () => fi,
	Config_DisplayConfig_GpsCoordinateFormatSchema: () => pi,
	Config_DisplayConfig_OledType: () => gi,
	Config_DisplayConfig_OledTypeSchema: () => _i,
	Config_LoRaConfigSchema: () => Si,
	Config_LoRaConfig_ModemPreset: () => Ti,
	Config_LoRaConfig_ModemPresetSchema: () => Ei,
	Config_LoRaConfig_RegionCode: () => Ci,
	Config_LoRaConfig_RegionCodeSchema: () => wi,
	Config_NetworkConfigSchema: () => ai,
	Config_NetworkConfig_AddressMode: () => si,
	Config_NetworkConfig_AddressModeSchema: () => ci,
	Config_NetworkConfig_IpV4ConfigSchema: () => oi,
	Config_NetworkConfig_ProtocolFlags: () => li,
	Config_NetworkConfig_ProtocolFlagsSchema: () => ui,
	Config_PositionConfigSchema: () => $r,
	Config_PositionConfig_GpsMode: () => ni,
	Config_PositionConfig_GpsModeSchema: () => ri,
	Config_PositionConfig_PositionFlags: () => ei,
	Config_PositionConfig_PositionFlagsSchema: () => ti,
	Config_PowerConfigSchema: () => ii,
	Config_SecurityConfigSchema: () => Ai,
	Config_SessionkeyConfigSchema: () => ji,
	file_config: () => w
}), w = /* @__PURE__ */ S("Cgxjb25maWcucHJvdG8SCm1lc2h0YXN0aWMipigKBkNvbmZpZxIxCgZkZXZpY2UYASABKAsyHy5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWdIABI1Cghwb3NpdGlvbhgCIAEoCzIhLm1lc2h0YXN0aWMuQ29uZmlnLlBvc2l0aW9uQ29uZmlnSAASLwoFcG93ZXIYAyABKAsyHi5tZXNodGFzdGljLkNvbmZpZy5Qb3dlckNvbmZpZ0gAEjMKB25ldHdvcmsYBCABKAsyIC5tZXNodGFzdGljLkNvbmZpZy5OZXR3b3JrQ29uZmlnSAASMwoHZGlzcGxheRgFIAEoCzIgLm1lc2h0YXN0aWMuQ29uZmlnLkRpc3BsYXlDb25maWdIABItCgRsb3JhGAYgASgLMh0ubWVzaHRhc3RpYy5Db25maWcuTG9SYUNvbmZpZ0gAEjcKCWJsdWV0b290aBgHIAEoCzIiLm1lc2h0YXN0aWMuQ29uZmlnLkJsdWV0b290aENvbmZpZ0gAEjUKCHNlY3VyaXR5GAggASgLMiEubWVzaHRhc3RpYy5Db25maWcuU2VjdXJpdHlDb25maWdIABI5CgpzZXNzaW9ua2V5GAkgASgLMiMubWVzaHRhc3RpYy5Db25maWcuU2Vzc2lvbmtleUNvbmZpZ0gAEi8KCWRldmljZV91aRgKIAEoCzIaLm1lc2h0YXN0aWMuRGV2aWNlVUlDb25maWdIABrMBgoMRGV2aWNlQ29uZmlnEjIKBHJvbGUYASABKA4yJC5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWcuUm9sZRIaCg5zZXJpYWxfZW5hYmxlZBgCIAEoCEICGAESEwoLYnV0dG9uX2dwaW8YBCABKA0SEwoLYnV6emVyX2dwaW8YBSABKA0SSQoQcmVicm9hZGNhc3RfbW9kZRgGIAEoDjIvLm1lc2h0YXN0aWMuQ29uZmlnLkRldmljZUNvbmZpZy5SZWJyb2FkY2FzdE1vZGUSIAoYbm9kZV9pbmZvX2Jyb2FkY2FzdF9zZWNzGAcgASgNEiIKGmRvdWJsZV90YXBfYXNfYnV0dG9uX3ByZXNzGAggASgIEhYKCmlzX21hbmFnZWQYCSABKAhCAhgBEhwKFGRpc2FibGVfdHJpcGxlX2NsaWNrGAogASgIEg0KBXR6ZGVmGAsgASgJEh4KFmxlZF9oZWFydGJlYXRfZGlzYWJsZWQYDCABKAgSPwoLYnV6emVyX21vZGUYDSABKA4yKi5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWcuQnV6emVyTW9kZSK/AQoEUm9sZRIKCgZDTElFTlQQABIPCgtDTElFTlRfTVVURRABEgoKBlJPVVRFUhACEhUKDVJPVVRFUl9DTElFTlQQAxoCCAESDAoIUkVQRUFURVIQBBILCgdUUkFDS0VSEAUSCgoGU0VOU09SEAYSBwoDVEFLEAcSEQoNQ0xJRU5UX0hJRERFThAIEhIKDkxPU1RfQU5EX0ZPVU5EEAkSDwoLVEFLX1RSQUNLRVIQChIPCgtST1VURVJfTEFURRALInMKD1JlYnJvYWRjYXN0TW9kZRIHCgNBTEwQABIVChFBTExfU0tJUF9ERUNPRElORxABEg4KCkxPQ0FMX09OTFkQAhIOCgpLTk9XTl9PTkxZEAMSCAoETk9ORRAEEhYKEkNPUkVfUE9SVE5VTVNfT05MWRAFIlQKCkJ1enplck1vZGUSDwoLQUxMX0VOQUJMRUQQABIMCghESVNBQkxFRBABEhYKEk5PVElGSUNBVElPTlNfT05MWRACEg8KC1NZU1RFTV9PTkxZEAMakQUKDlBvc2l0aW9uQ29uZmlnEh8KF3Bvc2l0aW9uX2Jyb2FkY2FzdF9zZWNzGAEgASgNEigKIHBvc2l0aW9uX2Jyb2FkY2FzdF9zbWFydF9lbmFibGVkGAIgASgIEhYKDmZpeGVkX3Bvc2l0aW9uGAMgASgIEhcKC2dwc19lbmFibGVkGAQgASgIQgIYARIbChNncHNfdXBkYXRlX2ludGVydmFsGAUgASgNEhwKEGdwc19hdHRlbXB0X3RpbWUYBiABKA1CAhgBEhYKDnBvc2l0aW9uX2ZsYWdzGAcgASgNEg8KB3J4X2dwaW8YCCABKA0SDwoHdHhfZ3BpbxgJIAEoDRIoCiBicm9hZGNhc3Rfc21hcnRfbWluaW11bV9kaXN0YW5jZRgKIAEoDRItCiVicm9hZGNhc3Rfc21hcnRfbWluaW11bV9pbnRlcnZhbF9zZWNzGAsgASgNEhMKC2dwc19lbl9ncGlvGAwgASgNEjsKCGdwc19tb2RlGA0gASgOMikubWVzaHRhc3RpYy5Db25maWcuUG9zaXRpb25Db25maWcuR3BzTW9kZSKrAQoNUG9zaXRpb25GbGFncxIJCgVVTlNFVBAAEgwKCEFMVElUVURFEAESEAoMQUxUSVRVREVfTVNMEAISFgoSR0VPSURBTF9TRVBBUkFUSU9OEAQSBwoDRE9QEAgSCQoFSFZET1AQEBINCglTQVRJTlZJRVcQIBIKCgZTRVFfTk8QQBIOCglUSU1FU1RBTVAQgAESDAoHSEVBRElORxCAAhIKCgVTUEVFRBCABCI1CgdHcHNNb2RlEgwKCERJU0FCTEVEEAASCwoHRU5BQkxFRBABEg8KC05PVF9QUkVTRU5UEAIahAIKC1Bvd2VyQ29uZmlnEhcKD2lzX3Bvd2VyX3NhdmluZxgBIAEoCBImCh5vbl9iYXR0ZXJ5X3NodXRkb3duX2FmdGVyX3NlY3MYAiABKA0SHwoXYWRjX211bHRpcGxpZXJfb3ZlcnJpZGUYAyABKAISGwoTd2FpdF9ibHVldG9vdGhfc2VjcxgEIAEoDRIQCghzZHNfc2VjcxgGIAEoDRIPCgdsc19zZWNzGAcgASgNEhUKDW1pbl93YWtlX3NlY3MYCCABKA0SIgoaZGV2aWNlX2JhdHRlcnlfaW5hX2FkZHJlc3MYCSABKA0SGAoQcG93ZXJtb25fZW5hYmxlcxggIAEoBBrlAwoNTmV0d29ya0NvbmZpZxIUCgx3aWZpX2VuYWJsZWQYASABKAgSEQoJd2lmaV9zc2lkGAMgASgJEhAKCHdpZmlfcHNrGAQgASgJEhIKCm50cF9zZXJ2ZXIYBSABKAkSEwoLZXRoX2VuYWJsZWQYBiABKAgSQgoMYWRkcmVzc19tb2RlGAcgASgOMiwubWVzaHRhc3RpYy5Db25maWcuTmV0d29ya0NvbmZpZy5BZGRyZXNzTW9kZRJACgtpcHY0X2NvbmZpZxgIIAEoCzIrLm1lc2h0YXN0aWMuQ29uZmlnLk5ldHdvcmtDb25maWcuSXBWNENvbmZpZxIWCg5yc3lzbG9nX3NlcnZlchgJIAEoCRIZChFlbmFibGVkX3Byb3RvY29scxgKIAEoDRIUCgxpcHY2X2VuYWJsZWQYCyABKAgaRgoKSXBWNENvbmZpZxIKCgJpcBgBIAEoBxIPCgdnYXRld2F5GAIgASgHEg4KBnN1Ym5ldBgDIAEoBxILCgNkbnMYBCABKAciIwoLQWRkcmVzc01vZGUSCAoEREhDUBAAEgoKBlNUQVRJQxABIjQKDVByb3RvY29sRmxhZ3MSEAoMTk9fQlJPQURDQVNUEAASEQoNVURQX0JST0FEQ0FTVBABGvwHCg1EaXNwbGF5Q29uZmlnEhYKDnNjcmVlbl9vbl9zZWNzGAEgASgNEkgKCmdwc19mb3JtYXQYAiABKA4yNC5tZXNodGFzdGljLkNvbmZpZy5EaXNwbGF5Q29uZmlnLkdwc0Nvb3JkaW5hdGVGb3JtYXQSIQoZYXV0b19zY3JlZW5fY2Fyb3VzZWxfc2VjcxgDIAEoDRIZChFjb21wYXNzX25vcnRoX3RvcBgEIAEoCBITCgtmbGlwX3NjcmVlbhgFIAEoCBI8CgV1bml0cxgGIAEoDjItLm1lc2h0YXN0aWMuQ29uZmlnLkRpc3BsYXlDb25maWcuRGlzcGxheVVuaXRzEjcKBG9sZWQYByABKA4yKS5tZXNodGFzdGljLkNvbmZpZy5EaXNwbGF5Q29uZmlnLk9sZWRUeXBlEkEKC2Rpc3BsYXltb2RlGAggASgOMiwubWVzaHRhc3RpYy5Db25maWcuRGlzcGxheUNvbmZpZy5EaXNwbGF5TW9kZRIUCgxoZWFkaW5nX2JvbGQYCSABKAgSHQoVd2FrZV9vbl90YXBfb3JfbW90aW9uGAogASgIElAKE2NvbXBhc3Nfb3JpZW50YXRpb24YCyABKA4yMy5tZXNodGFzdGljLkNvbmZpZy5EaXNwbGF5Q29uZmlnLkNvbXBhc3NPcmllbnRhdGlvbhIVCg11c2VfMTJoX2Nsb2NrGAwgASgIIk0KE0dwc0Nvb3JkaW5hdGVGb3JtYXQSBwoDREVDEAASBwoDRE1TEAESBwoDVVRNEAISCAoETUdSUxADEgcKA09MQxAEEggKBE9TR1IQBSIoCgxEaXNwbGF5VW5pdHMSCgoGTUVUUklDEAASDAoISU1QRVJJQUwQASJlCghPbGVkVHlwZRINCglPTEVEX0FVVE8QABIQCgxPTEVEX1NTRDEzMDYQARIPCgtPTEVEX1NIMTEwNhACEg8KC09MRURfU0gxMTA3EAMSFgoST0xFRF9TSDExMDdfMTI4XzY0EAQiQQoLRGlzcGxheU1vZGUSCwoHREVGQVVMVBAAEgwKCFRXT0NPTE9SEAESDAoISU5WRVJURUQQAhIJCgVDT0xPUhADIroBChJDb21wYXNzT3JpZW50YXRpb24SDQoJREVHUkVFU18wEAASDgoKREVHUkVFU185MBABEg8KC0RFR1JFRVNfMTgwEAISDwoLREVHUkVFU18yNzAQAxIWChJERUdSRUVTXzBfSU5WRVJURUQQBBIXChNERUdSRUVTXzkwX0lOVkVSVEVEEAUSGAoUREVHUkVFU18xODBfSU5WRVJURUQQBhIYChRERUdSRUVTXzI3MF9JTlZFUlRFRBAHGqoHCgpMb1JhQ29uZmlnEhIKCnVzZV9wcmVzZXQYASABKAgSPwoMbW9kZW1fcHJlc2V0GAIgASgOMikubWVzaHRhc3RpYy5Db25maWcuTG9SYUNvbmZpZy5Nb2RlbVByZXNldBIRCgliYW5kd2lkdGgYAyABKA0SFQoNc3ByZWFkX2ZhY3RvchgEIAEoDRITCgtjb2RpbmdfcmF0ZRgFIAEoDRIYChBmcmVxdWVuY3lfb2Zmc2V0GAYgASgCEjgKBnJlZ2lvbhgHIAEoDjIoLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWcuUmVnaW9uQ29kZRIRCglob3BfbGltaXQYCCABKA0SEgoKdHhfZW5hYmxlZBgJIAEoCBIQCgh0eF9wb3dlchgKIAEoBRITCgtjaGFubmVsX251bRgLIAEoDRIbChNvdmVycmlkZV9kdXR5X2N5Y2xlGAwgASgIEh4KFnN4MTI2eF9yeF9ib29zdGVkX2dhaW4YDSABKAgSGgoSb3ZlcnJpZGVfZnJlcXVlbmN5GA4gASgCEhcKD3BhX2Zhbl9kaXNhYmxlZBgPIAEoCBIXCg9pZ25vcmVfaW5jb21pbmcYZyADKA0SEwoLaWdub3JlX21xdHQYaCABKAgSGQoRY29uZmlnX29rX3RvX21xdHQYaSABKAgi/gEKClJlZ2lvbkNvZGUSCQoFVU5TRVQQABIGCgJVUxABEgoKBkVVXzQzMxACEgoKBkVVXzg2OBADEgYKAkNOEAQSBgoCSlAQBRIHCgNBTloQBhIGCgJLUhAHEgYKAlRXEAgSBgoCUlUQCRIGCgJJThAKEgoKBk5aXzg2NRALEgYKAlRIEAwSCwoHTE9SQV8yNBANEgoKBlVBXzQzMxAOEgoKBlVBXzg2OBAPEgoKBk1ZXzQzMxAQEgoKBk1ZXzkxORAREgoKBlNHXzkyMxASEgoKBlBIXzQzMxATEgoKBlBIXzg2OBAUEgoKBlBIXzkxNRAVEgsKB0FOWl80MzMQFiKpAQoLTW9kZW1QcmVzZXQSDQoJTE9OR19GQVNUEAASDQoJTE9OR19TTE9XEAESFgoOVkVSWV9MT05HX1NMT1cQAhoCCAESDwoLTUVESVVNX1NMT1cQAxIPCgtNRURJVU1fRkFTVBAEEg4KClNIT1JUX1NMT1cQBRIOCgpTSE9SVF9GQVNUEAYSEQoNTE9OR19NT0RFUkFURRAHEg8KC1NIT1JUX1RVUkJPEAgarQEKD0JsdWV0b290aENvbmZpZxIPCgdlbmFibGVkGAEgASgIEjwKBG1vZGUYAiABKA4yLi5tZXNodGFzdGljLkNvbmZpZy5CbHVldG9vdGhDb25maWcuUGFpcmluZ01vZGUSEQoJZml4ZWRfcGluGAMgASgNIjgKC1BhaXJpbmdNb2RlEg4KClJBTkRPTV9QSU4QABINCglGSVhFRF9QSU4QARIKCgZOT19QSU4QAhq2AQoOU2VjdXJpdHlDb25maWcSEgoKcHVibGljX2tleRgBIAEoDBITCgtwcml2YXRlX2tleRgCIAEoDBIRCglhZG1pbl9rZXkYAyADKAwSEgoKaXNfbWFuYWdlZBgEIAEoCBIWCg5zZXJpYWxfZW5hYmxlZBgFIAEoCBIdChVkZWJ1Z19sb2dfYXBpX2VuYWJsZWQYBiABKAgSHQoVYWRtaW5fY2hhbm5lbF9lbmFibGVkGAggASgIGhIKEFNlc3Npb25rZXlDb25maWdCEQoPcGF5bG9hZF92YXJpYW50QmEKE2NvbS5nZWVrc3ZpbGxlLm1lc2hCDENvbmZpZ1Byb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [Ur]), Gr = /* @__PURE__ */ C(w, 0), Kr = /* @__PURE__ */ C(w, 0, 0), qr = /* @__PURE__ */ function(e) {
	return e[e.CLIENT = 0] = "CLIENT", e[e.CLIENT_MUTE = 1] = "CLIENT_MUTE", e[e.ROUTER = 2] = "ROUTER", e[e.ROUTER_CLIENT = 3] = "ROUTER_CLIENT", e[e.REPEATER = 4] = "REPEATER", e[e.TRACKER = 5] = "TRACKER", e[e.SENSOR = 6] = "SENSOR", e[e.TAK = 7] = "TAK", e[e.CLIENT_HIDDEN = 8] = "CLIENT_HIDDEN", e[e.LOST_AND_FOUND = 9] = "LOST_AND_FOUND", e[e.TAK_TRACKER = 10] = "TAK_TRACKER", e[e.ROUTER_LATE = 11] = "ROUTER_LATE", e;
}({}), Jr = /* @__PURE__ */ b(w, 0, 0, 0), Yr = /* @__PURE__ */ function(e) {
	return e[e.ALL = 0] = "ALL", e[e.ALL_SKIP_DECODING = 1] = "ALL_SKIP_DECODING", e[e.LOCAL_ONLY = 2] = "LOCAL_ONLY", e[e.KNOWN_ONLY = 3] = "KNOWN_ONLY", e[e.NONE = 4] = "NONE", e[e.CORE_PORTNUMS_ONLY = 5] = "CORE_PORTNUMS_ONLY", e;
}({}), Xr = /* @__PURE__ */ b(w, 0, 0, 1), Zr = /* @__PURE__ */ function(e) {
	return e[e.ALL_ENABLED = 0] = "ALL_ENABLED", e[e.DISABLED = 1] = "DISABLED", e[e.NOTIFICATIONS_ONLY = 2] = "NOTIFICATIONS_ONLY", e[e.SYSTEM_ONLY = 3] = "SYSTEM_ONLY", e;
}({}), Qr = /* @__PURE__ */ b(w, 0, 0, 2), $r = /* @__PURE__ */ C(w, 0, 1), ei = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.ALTITUDE = 1] = "ALTITUDE", e[e.ALTITUDE_MSL = 2] = "ALTITUDE_MSL", e[e.GEOIDAL_SEPARATION = 4] = "GEOIDAL_SEPARATION", e[e.DOP = 8] = "DOP", e[e.HVDOP = 16] = "HVDOP", e[e.SATINVIEW = 32] = "SATINVIEW", e[e.SEQ_NO = 64] = "SEQ_NO", e[e.TIMESTAMP = 128] = "TIMESTAMP", e[e.HEADING = 256] = "HEADING", e[e.SPEED = 512] = "SPEED", e;
}({}), ti = /* @__PURE__ */ b(w, 0, 1, 0), ni = /* @__PURE__ */ function(e) {
	return e[e.DISABLED = 0] = "DISABLED", e[e.ENABLED = 1] = "ENABLED", e[e.NOT_PRESENT = 2] = "NOT_PRESENT", e;
}({}), ri = /* @__PURE__ */ b(w, 0, 1, 1), ii = /* @__PURE__ */ C(w, 0, 2), ai = /* @__PURE__ */ C(w, 0, 3), oi = /* @__PURE__ */ C(w, 0, 3, 0), si = /* @__PURE__ */ function(e) {
	return e[e.DHCP = 0] = "DHCP", e[e.STATIC = 1] = "STATIC", e;
}({}), ci = /* @__PURE__ */ b(w, 0, 3, 0), li = /* @__PURE__ */ function(e) {
	return e[e.NO_BROADCAST = 0] = "NO_BROADCAST", e[e.UDP_BROADCAST = 1] = "UDP_BROADCAST", e;
}({}), ui = /* @__PURE__ */ b(w, 0, 3, 1), di = /* @__PURE__ */ C(w, 0, 4), fi = /* @__PURE__ */ function(e) {
	return e[e.DEC = 0] = "DEC", e[e.DMS = 1] = "DMS", e[e.UTM = 2] = "UTM", e[e.MGRS = 3] = "MGRS", e[e.OLC = 4] = "OLC", e[e.OSGR = 5] = "OSGR", e;
}({}), pi = /* @__PURE__ */ b(w, 0, 4, 0), mi = /* @__PURE__ */ function(e) {
	return e[e.METRIC = 0] = "METRIC", e[e.IMPERIAL = 1] = "IMPERIAL", e;
}({}), hi = /* @__PURE__ */ b(w, 0, 4, 1), gi = /* @__PURE__ */ function(e) {
	return e[e.OLED_AUTO = 0] = "OLED_AUTO", e[e.OLED_SSD1306 = 1] = "OLED_SSD1306", e[e.OLED_SH1106 = 2] = "OLED_SH1106", e[e.OLED_SH1107 = 3] = "OLED_SH1107", e[e.OLED_SH1107_128_64 = 4] = "OLED_SH1107_128_64", e;
}({}), _i = /* @__PURE__ */ b(w, 0, 4, 2), vi = /* @__PURE__ */ function(e) {
	return e[e.DEFAULT = 0] = "DEFAULT", e[e.TWOCOLOR = 1] = "TWOCOLOR", e[e.INVERTED = 2] = "INVERTED", e[e.COLOR = 3] = "COLOR", e;
}({}), yi = /* @__PURE__ */ b(w, 0, 4, 3), bi = /* @__PURE__ */ function(e) {
	return e[e.DEGREES_0 = 0] = "DEGREES_0", e[e.DEGREES_90 = 1] = "DEGREES_90", e[e.DEGREES_180 = 2] = "DEGREES_180", e[e.DEGREES_270 = 3] = "DEGREES_270", e[e.DEGREES_0_INVERTED = 4] = "DEGREES_0_INVERTED", e[e.DEGREES_90_INVERTED = 5] = "DEGREES_90_INVERTED", e[e.DEGREES_180_INVERTED = 6] = "DEGREES_180_INVERTED", e[e.DEGREES_270_INVERTED = 7] = "DEGREES_270_INVERTED", e;
}({}), xi = /* @__PURE__ */ b(w, 0, 4, 4), Si = /* @__PURE__ */ C(w, 0, 5), Ci = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.US = 1] = "US", e[e.EU_433 = 2] = "EU_433", e[e.EU_868 = 3] = "EU_868", e[e.CN = 4] = "CN", e[e.JP = 5] = "JP", e[e.ANZ = 6] = "ANZ", e[e.KR = 7] = "KR", e[e.TW = 8] = "TW", e[e.RU = 9] = "RU", e[e.IN = 10] = "IN", e[e.NZ_865 = 11] = "NZ_865", e[e.TH = 12] = "TH", e[e.LORA_24 = 13] = "LORA_24", e[e.UA_433 = 14] = "UA_433", e[e.UA_868 = 15] = "UA_868", e[e.MY_433 = 16] = "MY_433", e[e.MY_919 = 17] = "MY_919", e[e.SG_923 = 18] = "SG_923", e[e.PH_433 = 19] = "PH_433", e[e.PH_868 = 20] = "PH_868", e[e.PH_915 = 21] = "PH_915", e[e.ANZ_433 = 22] = "ANZ_433", e;
}({}), wi = /* @__PURE__ */ b(w, 0, 5, 0), Ti = /* @__PURE__ */ function(e) {
	return e[e.LONG_FAST = 0] = "LONG_FAST", e[e.LONG_SLOW = 1] = "LONG_SLOW", e[e.VERY_LONG_SLOW = 2] = "VERY_LONG_SLOW", e[e.MEDIUM_SLOW = 3] = "MEDIUM_SLOW", e[e.MEDIUM_FAST = 4] = "MEDIUM_FAST", e[e.SHORT_SLOW = 5] = "SHORT_SLOW", e[e.SHORT_FAST = 6] = "SHORT_FAST", e[e.LONG_MODERATE = 7] = "LONG_MODERATE", e[e.SHORT_TURBO = 8] = "SHORT_TURBO", e;
}({}), Ei = /* @__PURE__ */ b(w, 0, 5, 1), Di = /* @__PURE__ */ C(w, 0, 6), Oi = /* @__PURE__ */ function(e) {
	return e[e.RANDOM_PIN = 0] = "RANDOM_PIN", e[e.FIXED_PIN = 1] = "FIXED_PIN", e[e.NO_PIN = 2] = "NO_PIN", e;
}({}), ki = /* @__PURE__ */ b(w, 0, 6, 0), Ai = /* @__PURE__ */ C(w, 0, 7), ji = /* @__PURE__ */ C(w, 0, 8), Mi = p({
	BluetoothConnectionStatusSchema: () => Ri,
	DeviceConnectionStatusSchema: () => Pi,
	EthernetConnectionStatusSchema: () => Ii,
	NetworkConnectionStatusSchema: () => Li,
	SerialConnectionStatusSchema: () => zi,
	WifiConnectionStatusSchema: () => Fi,
	file_connection_status: () => Ni
}), Ni = /* @__PURE__ */ S("Chdjb25uZWN0aW9uX3N0YXR1cy5wcm90bxIKbWVzaHRhc3RpYyKxAgoWRGV2aWNlQ29ubmVjdGlvblN0YXR1cxIzCgR3aWZpGAEgASgLMiAubWVzaHRhc3RpYy5XaWZpQ29ubmVjdGlvblN0YXR1c0gAiAEBEjsKCGV0aGVybmV0GAIgASgLMiQubWVzaHRhc3RpYy5FdGhlcm5ldENvbm5lY3Rpb25TdGF0dXNIAYgBARI9CglibHVldG9vdGgYAyABKAsyJS5tZXNodGFzdGljLkJsdWV0b290aENvbm5lY3Rpb25TdGF0dXNIAogBARI3CgZzZXJpYWwYBCABKAsyIi5tZXNodGFzdGljLlNlcmlhbENvbm5lY3Rpb25TdGF0dXNIA4gBAUIHCgVfd2lmaUILCglfZXRoZXJuZXRCDAoKX2JsdWV0b290aEIJCgdfc2VyaWFsImcKFFdpZmlDb25uZWN0aW9uU3RhdHVzEjMKBnN0YXR1cxgBIAEoCzIjLm1lc2h0YXN0aWMuTmV0d29ya0Nvbm5lY3Rpb25TdGF0dXMSDAoEc3NpZBgCIAEoCRIMCgRyc3NpGAMgASgFIk8KGEV0aGVybmV0Q29ubmVjdGlvblN0YXR1cxIzCgZzdGF0dXMYASABKAsyIy5tZXNodGFzdGljLk5ldHdvcmtDb25uZWN0aW9uU3RhdHVzInsKF05ldHdvcmtDb25uZWN0aW9uU3RhdHVzEhIKCmlwX2FkZHJlc3MYASABKAcSFAoMaXNfY29ubmVjdGVkGAIgASgIEhkKEWlzX21xdHRfY29ubmVjdGVkGAMgASgIEhsKE2lzX3N5c2xvZ19jb25uZWN0ZWQYBCABKAgiTAoZQmx1ZXRvb3RoQ29ubmVjdGlvblN0YXR1cxILCgNwaW4YASABKA0SDAoEcnNzaRgCIAEoBRIUCgxpc19jb25uZWN0ZWQYAyABKAgiPAoWU2VyaWFsQ29ubmVjdGlvblN0YXR1cxIMCgRiYXVkGAEgASgNEhQKDGlzX2Nvbm5lY3RlZBgCIAEoCEJlChNjb20uZ2Vla3N2aWxsZS5tZXNoQhBDb25uU3RhdHVzUHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Pi = /* @__PURE__ */ C(Ni, 0), Fi = /* @__PURE__ */ C(Ni, 1), Ii = /* @__PURE__ */ C(Ni, 2), Li = /* @__PURE__ */ C(Ni, 3), Ri = /* @__PURE__ */ C(Ni, 4), zi = /* @__PURE__ */ C(Ni, 5), Bi = p({
	ModuleConfigSchema: () => Vi,
	ModuleConfig_AmbientLightingConfigSchema: () => da,
	ModuleConfig_AudioConfigSchema: () => Yi,
	ModuleConfig_AudioConfig_Audio_Baud: () => Xi,
	ModuleConfig_AudioConfig_Audio_BaudSchema: () => Zi,
	ModuleConfig_CannedMessageConfigSchema: () => ca,
	ModuleConfig_CannedMessageConfig_InputEventChar: () => la,
	ModuleConfig_CannedMessageConfig_InputEventCharSchema: () => ua,
	ModuleConfig_DetectionSensorConfigSchema: () => Ki,
	ModuleConfig_DetectionSensorConfig_TriggerType: () => qi,
	ModuleConfig_DetectionSensorConfig_TriggerTypeSchema: () => Ji,
	ModuleConfig_ExternalNotificationConfigSchema: () => ia,
	ModuleConfig_MQTTConfigSchema: () => Hi,
	ModuleConfig_MapReportSettingsSchema: () => Ui,
	ModuleConfig_NeighborInfoConfigSchema: () => Gi,
	ModuleConfig_PaxcounterConfigSchema: () => Qi,
	ModuleConfig_RangeTestConfigSchema: () => oa,
	ModuleConfig_RemoteHardwareConfigSchema: () => Wi,
	ModuleConfig_SerialConfigSchema: () => $i,
	ModuleConfig_SerialConfig_Serial_Baud: () => ea,
	ModuleConfig_SerialConfig_Serial_BaudSchema: () => ta,
	ModuleConfig_SerialConfig_Serial_Mode: () => na,
	ModuleConfig_SerialConfig_Serial_ModeSchema: () => ra,
	ModuleConfig_StoreForwardConfigSchema: () => aa,
	ModuleConfig_TelemetryConfigSchema: () => sa,
	RemoteHardwarePinSchema: () => fa,
	RemoteHardwarePinType: () => pa,
	RemoteHardwarePinTypeSchema: () => ma,
	file_module_config: () => T
}), T = /* @__PURE__ */ S("ChNtb2R1bGVfY29uZmlnLnByb3RvEgptZXNodGFzdGljIuMlCgxNb2R1bGVDb25maWcSMwoEbXF0dBgBIAEoCzIjLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk1RVFRDb25maWdIABI3CgZzZXJpYWwYAiABKAsyJS5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TZXJpYWxDb25maWdIABJUChVleHRlcm5hbF9ub3RpZmljYXRpb24YAyABKAsyMy5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5FeHRlcm5hbE5vdGlmaWNhdGlvbkNvbmZpZ0gAEkQKDXN0b3JlX2ZvcndhcmQYBCABKAsyKy5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TdG9yZUZvcndhcmRDb25maWdIABI+CgpyYW5nZV90ZXN0GAUgASgLMigubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuUmFuZ2VUZXN0Q29uZmlnSAASPQoJdGVsZW1ldHJ5GAYgASgLMigubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuVGVsZW1ldHJ5Q29uZmlnSAASRgoOY2FubmVkX21lc3NhZ2UYByABKAsyLC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5DYW5uZWRNZXNzYWdlQ29uZmlnSAASNQoFYXVkaW8YCCABKAsyJC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5BdWRpb0NvbmZpZ0gAEkgKD3JlbW90ZV9oYXJkd2FyZRgJIAEoCzItLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlJlbW90ZUhhcmR3YXJlQ29uZmlnSAASRAoNbmVpZ2hib3JfaW5mbxgKIAEoCzIrLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk5laWdoYm9ySW5mb0NvbmZpZ0gAEkoKEGFtYmllbnRfbGlnaHRpbmcYCyABKAsyLi5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5BbWJpZW50TGlnaHRpbmdDb25maWdIABJKChBkZXRlY3Rpb25fc2Vuc29yGAwgASgLMi4ubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuRGV0ZWN0aW9uU2Vuc29yQ29uZmlnSAASPwoKcGF4Y291bnRlchgNIAEoCzIpLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlBheGNvdW50ZXJDb25maWdIABqwAgoKTVFUVENvbmZpZxIPCgdlbmFibGVkGAEgASgIEg8KB2FkZHJlc3MYAiABKAkSEAoIdXNlcm5hbWUYAyABKAkSEAoIcGFzc3dvcmQYBCABKAkSGgoSZW5jcnlwdGlvbl9lbmFibGVkGAUgASgIEhQKDGpzb25fZW5hYmxlZBgGIAEoCBITCgt0bHNfZW5hYmxlZBgHIAEoCBIMCgRyb290GAggASgJEh8KF3Byb3h5X3RvX2NsaWVudF9lbmFibGVkGAkgASgIEh0KFW1hcF9yZXBvcnRpbmdfZW5hYmxlZBgKIAEoCBJHChNtYXBfcmVwb3J0X3NldHRpbmdzGAsgASgLMioubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuTWFwUmVwb3J0U2V0dGluZ3MabgoRTWFwUmVwb3J0U2V0dGluZ3MSHQoVcHVibGlzaF9pbnRlcnZhbF9zZWNzGAEgASgNEhoKEnBvc2l0aW9uX3ByZWNpc2lvbhgCIAEoDRIeChZzaG91bGRfcmVwb3J0X2xvY2F0aW9uGAMgASgIGoIBChRSZW1vdGVIYXJkd2FyZUNvbmZpZxIPCgdlbmFibGVkGAEgASgIEiIKGmFsbG93X3VuZGVmaW5lZF9waW5fYWNjZXNzGAIgASgIEjUKDmF2YWlsYWJsZV9waW5zGAMgAygLMh0ubWVzaHRhc3RpYy5SZW1vdGVIYXJkd2FyZVBpbhpaChJOZWlnaGJvckluZm9Db25maWcSDwoHZW5hYmxlZBgBIAEoCBIXCg91cGRhdGVfaW50ZXJ2YWwYAiABKA0SGgoSdHJhbnNtaXRfb3Zlcl9sb3JhGAMgASgIGpcDChVEZXRlY3Rpb25TZW5zb3JDb25maWcSDwoHZW5hYmxlZBgBIAEoCBIeChZtaW5pbXVtX2Jyb2FkY2FzdF9zZWNzGAIgASgNEhwKFHN0YXRlX2Jyb2FkY2FzdF9zZWNzGAMgASgNEhEKCXNlbmRfYmVsbBgEIAEoCBIMCgRuYW1lGAUgASgJEhMKC21vbml0b3JfcGluGAYgASgNEloKFmRldGVjdGlvbl90cmlnZ2VyX3R5cGUYByABKA4yOi5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5EZXRlY3Rpb25TZW5zb3JDb25maWcuVHJpZ2dlclR5cGUSEgoKdXNlX3B1bGx1cBgIIAEoCCKIAQoLVHJpZ2dlclR5cGUSDQoJTE9HSUNfTE9XEAASDgoKTE9HSUNfSElHSBABEhAKDEZBTExJTkdfRURHRRACEg8KC1JJU0lOR19FREdFEAMSGgoWRUlUSEVSX0VER0VfQUNUSVZFX0xPVxAEEhsKF0VJVEhFUl9FREdFX0FDVElWRV9ISUdIEAUa5AIKC0F1ZGlvQ29uZmlnEhYKDmNvZGVjMl9lbmFibGVkGAEgASgIEg8KB3B0dF9waW4YAiABKA0SQAoHYml0cmF0ZRgDIAEoDjIvLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkF1ZGlvQ29uZmlnLkF1ZGlvX0JhdWQSDgoGaTJzX3dzGAQgASgNEg4KBmkyc19zZBgFIAEoDRIPCgdpMnNfZGluGAYgASgNEg8KB2kyc19zY2sYByABKA0ipwEKCkF1ZGlvX0JhdWQSEgoOQ09ERUMyX0RFRkFVTFQQABIPCgtDT0RFQzJfMzIwMBABEg8KC0NPREVDMl8yNDAwEAISDwoLQ09ERUMyXzE2MDAQAxIPCgtDT0RFQzJfMTQwMBAEEg8KC0NPREVDMl8xMzAwEAUSDwoLQ09ERUMyXzEyMDAQBhIOCgpDT0RFQzJfNzAwEAcSDwoLQ09ERUMyXzcwMEIQCBp2ChBQYXhjb3VudGVyQ29uZmlnEg8KB2VuYWJsZWQYASABKAgSIgoacGF4Y291bnRlcl91cGRhdGVfaW50ZXJ2YWwYAiABKA0SFgoOd2lmaV90aHJlc2hvbGQYAyABKAUSFQoNYmxlX3RocmVzaG9sZBgEIAEoBRr9BAoMU2VyaWFsQ29uZmlnEg8KB2VuYWJsZWQYASABKAgSDAoEZWNobxgCIAEoCBILCgNyeGQYAyABKA0SCwoDdHhkGAQgASgNEj8KBGJhdWQYBSABKA4yMS5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TZXJpYWxDb25maWcuU2VyaWFsX0JhdWQSDwoHdGltZW91dBgGIAEoDRI/CgRtb2RlGAcgASgOMjEubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuU2VyaWFsQ29uZmlnLlNlcmlhbF9Nb2RlEiQKHG92ZXJyaWRlX2NvbnNvbGVfc2VyaWFsX3BvcnQYCCABKAgiigIKC1NlcmlhbF9CYXVkEhAKDEJBVURfREVGQVVMVBAAEgwKCEJBVURfMTEwEAESDAoIQkFVRF8zMDAQAhIMCghCQVVEXzYwMBADEg0KCUJBVURfMTIwMBAEEg0KCUJBVURfMjQwMBAFEg0KCUJBVURfNDgwMBAGEg0KCUJBVURfOTYwMBAHEg4KCkJBVURfMTkyMDAQCBIOCgpCQVVEXzM4NDAwEAkSDgoKQkFVRF81NzYwMBAKEg8KC0JBVURfMTE1MjAwEAsSDwoLQkFVRF8yMzA0MDAQDBIPCgtCQVVEXzQ2MDgwMBANEg8KC0JBVURfNTc2MDAwEA4SDwoLQkFVRF85MjE2MDAQDyJuCgtTZXJpYWxfTW9kZRILCgdERUZBVUxUEAASCgoGU0lNUExFEAESCQoFUFJPVE8QAhILCgdURVhUTVNHEAMSCAoETk1FQRAEEgsKB0NBTFRPUE8QBRIICgRXUzg1EAYSDQoJVkVfRElSRUNUEAca6QIKGkV4dGVybmFsTm90aWZpY2F0aW9uQ29uZmlnEg8KB2VuYWJsZWQYASABKAgSEQoJb3V0cHV0X21zGAIgASgNEg4KBm91dHB1dBgDIAEoDRIUCgxvdXRwdXRfdmlicmEYCCABKA0SFQoNb3V0cHV0X2J1enplchgJIAEoDRIOCgZhY3RpdmUYBCABKAgSFQoNYWxlcnRfbWVzc2FnZRgFIAEoCBIbChNhbGVydF9tZXNzYWdlX3ZpYnJhGAogASgIEhwKFGFsZXJ0X21lc3NhZ2VfYnV6emVyGAsgASgIEhIKCmFsZXJ0X2JlbGwYBiABKAgSGAoQYWxlcnRfYmVsbF92aWJyYRgMIAEoCBIZChFhbGVydF9iZWxsX2J1enplchgNIAEoCBIPCgd1c2VfcHdtGAcgASgIEhMKC25hZ190aW1lb3V0GA4gASgNEhkKEXVzZV9pMnNfYXNfYnV6emVyGA8gASgIGpcBChJTdG9yZUZvcndhcmRDb25maWcSDwoHZW5hYmxlZBgBIAEoCBIRCgloZWFydGJlYXQYAiABKAgSDwoHcmVjb3JkcxgDIAEoDRIaChJoaXN0b3J5X3JldHVybl9tYXgYBCABKA0SHQoVaGlzdG9yeV9yZXR1cm5fd2luZG93GAUgASgNEhEKCWlzX3NlcnZlchgGIAEoCBpACg9SYW5nZVRlc3RDb25maWcSDwoHZW5hYmxlZBgBIAEoCBIOCgZzZW5kZXIYAiABKA0SDAoEc2F2ZRgDIAEoCBrJAwoPVGVsZW1ldHJ5Q29uZmlnEh4KFmRldmljZV91cGRhdGVfaW50ZXJ2YWwYASABKA0SIwobZW52aXJvbm1lbnRfdXBkYXRlX2ludGVydmFsGAIgASgNEicKH2Vudmlyb25tZW50X21lYXN1cmVtZW50X2VuYWJsZWQYAyABKAgSIgoaZW52aXJvbm1lbnRfc2NyZWVuX2VuYWJsZWQYBCABKAgSJgoeZW52aXJvbm1lbnRfZGlzcGxheV9mYWhyZW5oZWl0GAUgASgIEhsKE2Fpcl9xdWFsaXR5X2VuYWJsZWQYBiABKAgSHAoUYWlyX3F1YWxpdHlfaW50ZXJ2YWwYByABKA0SIQoZcG93ZXJfbWVhc3VyZW1lbnRfZW5hYmxlZBgIIAEoCBIdChVwb3dlcl91cGRhdGVfaW50ZXJ2YWwYCSABKA0SHAoUcG93ZXJfc2NyZWVuX2VuYWJsZWQYCiABKAgSIgoaaGVhbHRoX21lYXN1cmVtZW50X2VuYWJsZWQYCyABKAgSHgoWaGVhbHRoX3VwZGF0ZV9pbnRlcnZhbBgMIAEoDRIdChVoZWFsdGhfc2NyZWVuX2VuYWJsZWQYDSABKAga1gQKE0Nhbm5lZE1lc3NhZ2VDb25maWcSFwoPcm90YXJ5MV9lbmFibGVkGAEgASgIEhkKEWlucHV0YnJva2VyX3Bpbl9hGAIgASgNEhkKEWlucHV0YnJva2VyX3Bpbl9iGAMgASgNEh0KFWlucHV0YnJva2VyX3Bpbl9wcmVzcxgEIAEoDRJZChRpbnB1dGJyb2tlcl9ldmVudF9jdxgFIAEoDjI7Lm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkNhbm5lZE1lc3NhZ2VDb25maWcuSW5wdXRFdmVudENoYXISWgoVaW5wdXRicm9rZXJfZXZlbnRfY2N3GAYgASgOMjsubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuQ2FubmVkTWVzc2FnZUNvbmZpZy5JbnB1dEV2ZW50Q2hhchJcChdpbnB1dGJyb2tlcl9ldmVudF9wcmVzcxgHIAEoDjI7Lm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkNhbm5lZE1lc3NhZ2VDb25maWcuSW5wdXRFdmVudENoYXISFwoPdXBkb3duMV9lbmFibGVkGAggASgIEg8KB2VuYWJsZWQYCSABKAgSGgoSYWxsb3dfaW5wdXRfc291cmNlGAogASgJEhEKCXNlbmRfYmVsbBgLIAEoCCJjCg5JbnB1dEV2ZW50Q2hhchIICgROT05FEAASBgoCVVAQERIICgRET1dOEBISCAoETEVGVBATEgkKBVJJR0hUEBQSCgoGU0VMRUNUEAoSCAoEQkFDSxAbEgoKBkNBTkNFTBAYGmUKFUFtYmllbnRMaWdodGluZ0NvbmZpZxIRCglsZWRfc3RhdGUYASABKAgSDwoHY3VycmVudBgCIAEoDRILCgNyZWQYAyABKA0SDQoFZ3JlZW4YBCABKA0SDAoEYmx1ZRgFIAEoDUIRCg9wYXlsb2FkX3ZhcmlhbnQiZAoRUmVtb3RlSGFyZHdhcmVQaW4SEAoIZ3Bpb19waW4YASABKA0SDAoEbmFtZRgCIAEoCRIvCgR0eXBlGAMgASgOMiEubWVzaHRhc3RpYy5SZW1vdGVIYXJkd2FyZVBpblR5cGUqSQoVUmVtb3RlSGFyZHdhcmVQaW5UeXBlEgsKB1VOS05PV04QABIQCgxESUdJVEFMX1JFQUQQARIRCg1ESUdJVEFMX1dSSVRFEAJCZwoTY29tLmdlZWtzdmlsbGUubWVzaEISTW9kdWxlQ29uZmlnUHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Vi = /* @__PURE__ */ C(T, 0), Hi = /* @__PURE__ */ C(T, 0, 0), Ui = /* @__PURE__ */ C(T, 0, 1), Wi = /* @__PURE__ */ C(T, 0, 2), Gi = /* @__PURE__ */ C(T, 0, 3), Ki = /* @__PURE__ */ C(T, 0, 4), qi = /* @__PURE__ */ function(e) {
	return e[e.LOGIC_LOW = 0] = "LOGIC_LOW", e[e.LOGIC_HIGH = 1] = "LOGIC_HIGH", e[e.FALLING_EDGE = 2] = "FALLING_EDGE", e[e.RISING_EDGE = 3] = "RISING_EDGE", e[e.EITHER_EDGE_ACTIVE_LOW = 4] = "EITHER_EDGE_ACTIVE_LOW", e[e.EITHER_EDGE_ACTIVE_HIGH = 5] = "EITHER_EDGE_ACTIVE_HIGH", e;
}({}), Ji = /* @__PURE__ */ b(T, 0, 4, 0), Yi = /* @__PURE__ */ C(T, 0, 5), Xi = /* @__PURE__ */ function(e) {
	return e[e.CODEC2_DEFAULT = 0] = "CODEC2_DEFAULT", e[e.CODEC2_3200 = 1] = "CODEC2_3200", e[e.CODEC2_2400 = 2] = "CODEC2_2400", e[e.CODEC2_1600 = 3] = "CODEC2_1600", e[e.CODEC2_1400 = 4] = "CODEC2_1400", e[e.CODEC2_1300 = 5] = "CODEC2_1300", e[e.CODEC2_1200 = 6] = "CODEC2_1200", e[e.CODEC2_700 = 7] = "CODEC2_700", e[e.CODEC2_700B = 8] = "CODEC2_700B", e;
}({}), Zi = /* @__PURE__ */ b(T, 0, 5, 0), Qi = /* @__PURE__ */ C(T, 0, 6), $i = /* @__PURE__ */ C(T, 0, 7), ea = /* @__PURE__ */ function(e) {
	return e[e.BAUD_DEFAULT = 0] = "BAUD_DEFAULT", e[e.BAUD_110 = 1] = "BAUD_110", e[e.BAUD_300 = 2] = "BAUD_300", e[e.BAUD_600 = 3] = "BAUD_600", e[e.BAUD_1200 = 4] = "BAUD_1200", e[e.BAUD_2400 = 5] = "BAUD_2400", e[e.BAUD_4800 = 6] = "BAUD_4800", e[e.BAUD_9600 = 7] = "BAUD_9600", e[e.BAUD_19200 = 8] = "BAUD_19200", e[e.BAUD_38400 = 9] = "BAUD_38400", e[e.BAUD_57600 = 10] = "BAUD_57600", e[e.BAUD_115200 = 11] = "BAUD_115200", e[e.BAUD_230400 = 12] = "BAUD_230400", e[e.BAUD_460800 = 13] = "BAUD_460800", e[e.BAUD_576000 = 14] = "BAUD_576000", e[e.BAUD_921600 = 15] = "BAUD_921600", e;
}({}), ta = /* @__PURE__ */ b(T, 0, 7, 0), na = /* @__PURE__ */ function(e) {
	return e[e.DEFAULT = 0] = "DEFAULT", e[e.SIMPLE = 1] = "SIMPLE", e[e.PROTO = 2] = "PROTO", e[e.TEXTMSG = 3] = "TEXTMSG", e[e.NMEA = 4] = "NMEA", e[e.CALTOPO = 5] = "CALTOPO", e[e.WS85 = 6] = "WS85", e[e.VE_DIRECT = 7] = "VE_DIRECT", e;
}({}), ra = /* @__PURE__ */ b(T, 0, 7, 1), ia = /* @__PURE__ */ C(T, 0, 8), aa = /* @__PURE__ */ C(T, 0, 9), oa = /* @__PURE__ */ C(T, 0, 10), sa = /* @__PURE__ */ C(T, 0, 11), ca = /* @__PURE__ */ C(T, 0, 12), la = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.UP = 17] = "UP", e[e.DOWN = 18] = "DOWN", e[e.LEFT = 19] = "LEFT", e[e.RIGHT = 20] = "RIGHT", e[e.SELECT = 10] = "SELECT", e[e.BACK = 27] = "BACK", e[e.CANCEL = 24] = "CANCEL", e;
}({}), ua = /* @__PURE__ */ b(T, 0, 12, 0), da = /* @__PURE__ */ C(T, 0, 13), fa = /* @__PURE__ */ C(T, 1), pa = /* @__PURE__ */ function(e) {
	return e[e.UNKNOWN = 0] = "UNKNOWN", e[e.DIGITAL_READ = 1] = "DIGITAL_READ", e[e.DIGITAL_WRITE = 2] = "DIGITAL_WRITE", e;
}({}), ma = /* @__PURE__ */ b(T, 0), E = p({
	PortNum: () => ga,
	PortNumSchema: () => _a,
	file_portnums: () => ha
}), ha = /* @__PURE__ */ S("Cg5wb3J0bnVtcy5wcm90bxIKbWVzaHRhc3RpYyrlBAoHUG9ydE51bRIPCgtVTktOT1dOX0FQUBAAEhQKEFRFWFRfTUVTU0FHRV9BUFAQARIXChNSRU1PVEVfSEFSRFdBUkVfQVBQEAISEAoMUE9TSVRJT05fQVBQEAMSEAoMTk9ERUlORk9fQVBQEAQSDwoLUk9VVElOR19BUFAQBRINCglBRE1JTl9BUFAQBhIfChtURVhUX01FU1NBR0VfQ09NUFJFU1NFRF9BUFAQBxIQCgxXQVlQT0lOVF9BUFAQCBINCglBVURJT19BUFAQCRIYChRERVRFQ1RJT05fU0VOU09SX0FQUBAKEg0KCUFMRVJUX0FQUBALEhgKFEtFWV9WRVJJRklDQVRJT05fQVBQEAwSDQoJUkVQTFlfQVBQECASEQoNSVBfVFVOTkVMX0FQUBAhEhIKDlBBWENPVU5URVJfQVBQECISDgoKU0VSSUFMX0FQUBBAEhUKEVNUT1JFX0ZPUldBUkRfQVBQEEESEgoOUkFOR0VfVEVTVF9BUFAQQhIRCg1URUxFTUVUUllfQVBQEEMSCwoHWlBTX0FQUBBEEhEKDVNJTVVMQVRPUl9BUFAQRRISCg5UUkFDRVJPVVRFX0FQUBBGEhQKEE5FSUdIQk9SSU5GT19BUFAQRxIPCgtBVEFLX1BMVUdJThBIEhIKDk1BUF9SRVBPUlRfQVBQEEkSEwoPUE9XRVJTVFJFU1NfQVBQEEoSGAoUUkVUSUNVTFVNX1RVTk5FTF9BUFAQTBIQCgtQUklWQVRFX0FQUBCAAhITCg5BVEFLX0ZPUldBUkRFUhCBAhIICgNNQVgQ/wNCXQoTY29tLmdlZWtzdmlsbGUubWVzaEIIUG9ydG51bXNaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), ga = /* @__PURE__ */ function(e) {
	return e[e.UNKNOWN_APP = 0] = "UNKNOWN_APP", e[e.TEXT_MESSAGE_APP = 1] = "TEXT_MESSAGE_APP", e[e.REMOTE_HARDWARE_APP = 2] = "REMOTE_HARDWARE_APP", e[e.POSITION_APP = 3] = "POSITION_APP", e[e.NODEINFO_APP = 4] = "NODEINFO_APP", e[e.ROUTING_APP = 5] = "ROUTING_APP", e[e.ADMIN_APP = 6] = "ADMIN_APP", e[e.TEXT_MESSAGE_COMPRESSED_APP = 7] = "TEXT_MESSAGE_COMPRESSED_APP", e[e.WAYPOINT_APP = 8] = "WAYPOINT_APP", e[e.AUDIO_APP = 9] = "AUDIO_APP", e[e.DETECTION_SENSOR_APP = 10] = "DETECTION_SENSOR_APP", e[e.ALERT_APP = 11] = "ALERT_APP", e[e.KEY_VERIFICATION_APP = 12] = "KEY_VERIFICATION_APP", e[e.REPLY_APP = 32] = "REPLY_APP", e[e.IP_TUNNEL_APP = 33] = "IP_TUNNEL_APP", e[e.PAXCOUNTER_APP = 34] = "PAXCOUNTER_APP", e[e.SERIAL_APP = 64] = "SERIAL_APP", e[e.STORE_FORWARD_APP = 65] = "STORE_FORWARD_APP", e[e.RANGE_TEST_APP = 66] = "RANGE_TEST_APP", e[e.TELEMETRY_APP = 67] = "TELEMETRY_APP", e[e.ZPS_APP = 68] = "ZPS_APP", e[e.SIMULATOR_APP = 69] = "SIMULATOR_APP", e[e.TRACEROUTE_APP = 70] = "TRACEROUTE_APP", e[e.NEIGHBORINFO_APP = 71] = "NEIGHBORINFO_APP", e[e.ATAK_PLUGIN = 72] = "ATAK_PLUGIN", e[e.MAP_REPORT_APP = 73] = "MAP_REPORT_APP", e[e.POWERSTRESS_APP = 74] = "POWERSTRESS_APP", e[e.RETICULUM_TUNNEL_APP = 76] = "RETICULUM_TUNNEL_APP", e[e.PRIVATE_APP = 256] = "PRIVATE_APP", e[e.ATAK_FORWARDER = 257] = "ATAK_FORWARDER", e[e.MAX = 511] = "MAX", e;
}({}), _a = /* @__PURE__ */ b(ha, 0), va = p({
	AirQualityMetricsSchema: () => Sa,
	DeviceMetricsSchema: () => ya,
	EnvironmentMetricsSchema: () => ba,
	HealthMetricsSchema: () => wa,
	HostMetricsSchema: () => Ta,
	LocalStatsSchema: () => Ca,
	Nau7802ConfigSchema: () => Da,
	PowerMetricsSchema: () => xa,
	TelemetrySchema: () => Ea,
	TelemetrySensorType: () => Oa,
	TelemetrySensorTypeSchema: () => ka,
	file_telemetry: () => D
}), D = /* @__PURE__ */ S("Cg90ZWxlbWV0cnkucHJvdG8SCm1lc2h0YXN0aWMi8wEKDURldmljZU1ldHJpY3MSGgoNYmF0dGVyeV9sZXZlbBgBIAEoDUgAiAEBEhQKB3ZvbHRhZ2UYAiABKAJIAYgBARIgChNjaGFubmVsX3V0aWxpemF0aW9uGAMgASgCSAKIAQESGAoLYWlyX3V0aWxfdHgYBCABKAJIA4gBARIbCg51cHRpbWVfc2Vjb25kcxgFIAEoDUgEiAEBQhAKDl9iYXR0ZXJ5X2xldmVsQgoKCF92b2x0YWdlQhYKFF9jaGFubmVsX3V0aWxpemF0aW9uQg4KDF9haXJfdXRpbF90eEIRCg9fdXB0aW1lX3NlY29uZHMiggcKEkVudmlyb25tZW50TWV0cmljcxIYCgt0ZW1wZXJhdHVyZRgBIAEoAkgAiAEBEh4KEXJlbGF0aXZlX2h1bWlkaXR5GAIgASgCSAGIAQESIAoTYmFyb21ldHJpY19wcmVzc3VyZRgDIAEoAkgCiAEBEhsKDmdhc19yZXNpc3RhbmNlGAQgASgCSAOIAQESFAoHdm9sdGFnZRgFIAEoAkgEiAEBEhQKB2N1cnJlbnQYBiABKAJIBYgBARIQCgNpYXEYByABKA1IBogBARIVCghkaXN0YW5jZRgIIAEoAkgHiAEBEhAKA2x1eBgJIAEoAkgIiAEBEhYKCXdoaXRlX2x1eBgKIAEoAkgJiAEBEhMKBmlyX2x1eBgLIAEoAkgKiAEBEhMKBnV2X2x1eBgMIAEoAkgLiAEBEhsKDndpbmRfZGlyZWN0aW9uGA0gASgNSAyIAQESFwoKd2luZF9zcGVlZBgOIAEoAkgNiAEBEhMKBndlaWdodBgPIAEoAkgOiAEBEhYKCXdpbmRfZ3VzdBgQIAEoAkgPiAEBEhYKCXdpbmRfbHVsbBgRIAEoAkgQiAEBEhYKCXJhZGlhdGlvbhgSIAEoAkgRiAEBEhgKC3JhaW5mYWxsXzFoGBMgASgCSBKIAQESGQoMcmFpbmZhbGxfMjRoGBQgASgCSBOIAQESGgoNc29pbF9tb2lzdHVyZRgVIAEoDUgUiAEBEh0KEHNvaWxfdGVtcGVyYXR1cmUYFiABKAJIFYgBAUIOCgxfdGVtcGVyYXR1cmVCFAoSX3JlbGF0aXZlX2h1bWlkaXR5QhYKFF9iYXJvbWV0cmljX3ByZXNzdXJlQhEKD19nYXNfcmVzaXN0YW5jZUIKCghfdm9sdGFnZUIKCghfY3VycmVudEIGCgRfaWFxQgsKCV9kaXN0YW5jZUIGCgRfbHV4QgwKCl93aGl0ZV9sdXhCCQoHX2lyX2x1eEIJCgdfdXZfbHV4QhEKD193aW5kX2RpcmVjdGlvbkINCgtfd2luZF9zcGVlZEIJCgdfd2VpZ2h0QgwKCl93aW5kX2d1c3RCDAoKX3dpbmRfbHVsbEIMCgpfcmFkaWF0aW9uQg4KDF9yYWluZmFsbF8xaEIPCg1fcmFpbmZhbGxfMjRoQhAKDl9zb2lsX21vaXN0dXJlQhMKEV9zb2lsX3RlbXBlcmF0dXJlIooCCgxQb3dlck1ldHJpY3MSGAoLY2gxX3ZvbHRhZ2UYASABKAJIAIgBARIYCgtjaDFfY3VycmVudBgCIAEoAkgBiAEBEhgKC2NoMl92b2x0YWdlGAMgASgCSAKIAQESGAoLY2gyX2N1cnJlbnQYBCABKAJIA4gBARIYCgtjaDNfdm9sdGFnZRgFIAEoAkgEiAEBEhgKC2NoM19jdXJyZW50GAYgASgCSAWIAQFCDgoMX2NoMV92b2x0YWdlQg4KDF9jaDFfY3VycmVudEIOCgxfY2gyX3ZvbHRhZ2VCDgoMX2NoMl9jdXJyZW50Qg4KDF9jaDNfdm9sdGFnZUIOCgxfY2gzX2N1cnJlbnQihQUKEUFpclF1YWxpdHlNZXRyaWNzEhoKDXBtMTBfc3RhbmRhcmQYASABKA1IAIgBARIaCg1wbTI1X3N0YW5kYXJkGAIgASgNSAGIAQESGwoOcG0xMDBfc3RhbmRhcmQYAyABKA1IAogBARIfChJwbTEwX2Vudmlyb25tZW50YWwYBCABKA1IA4gBARIfChJwbTI1X2Vudmlyb25tZW50YWwYBSABKA1IBIgBARIgChNwbTEwMF9lbnZpcm9ubWVudGFsGAYgASgNSAWIAQESGwoOcGFydGljbGVzXzAzdW0YByABKA1IBogBARIbCg5wYXJ0aWNsZXNfMDV1bRgIIAEoDUgHiAEBEhsKDnBhcnRpY2xlc18xMHVtGAkgASgNSAiIAQESGwoOcGFydGljbGVzXzI1dW0YCiABKA1ICYgBARIbCg5wYXJ0aWNsZXNfNTB1bRgLIAEoDUgKiAEBEhwKD3BhcnRpY2xlc18xMDB1bRgMIAEoDUgLiAEBEhAKA2NvMhgNIAEoDUgMiAEBQhAKDl9wbTEwX3N0YW5kYXJkQhAKDl9wbTI1X3N0YW5kYXJkQhEKD19wbTEwMF9zdGFuZGFyZEIVChNfcG0xMF9lbnZpcm9ubWVudGFsQhUKE19wbTI1X2Vudmlyb25tZW50YWxCFgoUX3BtMTAwX2Vudmlyb25tZW50YWxCEQoPX3BhcnRpY2xlc18wM3VtQhEKD19wYXJ0aWNsZXNfMDV1bUIRCg9fcGFydGljbGVzXzEwdW1CEQoPX3BhcnRpY2xlc18yNXVtQhEKD19wYXJ0aWNsZXNfNTB1bUISChBfcGFydGljbGVzXzEwMHVtQgYKBF9jbzIi0gIKCkxvY2FsU3RhdHMSFgoOdXB0aW1lX3NlY29uZHMYASABKA0SGwoTY2hhbm5lbF91dGlsaXphdGlvbhgCIAEoAhITCgthaXJfdXRpbF90eBgDIAEoAhIWCg5udW1fcGFja2V0c190eBgEIAEoDRIWCg5udW1fcGFja2V0c19yeBgFIAEoDRIaChJudW1fcGFja2V0c19yeF9iYWQYBiABKA0SGAoQbnVtX29ubGluZV9ub2RlcxgHIAEoDRIXCg9udW1fdG90YWxfbm9kZXMYCCABKA0SEwoLbnVtX3J4X2R1cGUYCSABKA0SFAoMbnVtX3R4X3JlbGF5GAogASgNEh0KFW51bV90eF9yZWxheV9jYW5jZWxlZBgLIAEoDRIYChBoZWFwX3RvdGFsX2J5dGVzGAwgASgNEhcKD2hlYXBfZnJlZV9ieXRlcxgNIAEoDSJ7Cg1IZWFsdGhNZXRyaWNzEhYKCWhlYXJ0X2JwbRgBIAEoDUgAiAEBEhEKBHNwTzIYAiABKA1IAYgBARIYCgt0ZW1wZXJhdHVyZRgDIAEoAkgCiAEBQgwKCl9oZWFydF9icG1CBwoFX3NwTzJCDgoMX3RlbXBlcmF0dXJlIpECCgtIb3N0TWV0cmljcxIWCg51cHRpbWVfc2Vjb25kcxgBIAEoDRIVCg1mcmVlbWVtX2J5dGVzGAIgASgEEhcKD2Rpc2tmcmVlMV9ieXRlcxgDIAEoBBIcCg9kaXNrZnJlZTJfYnl0ZXMYBCABKARIAIgBARIcCg9kaXNrZnJlZTNfYnl0ZXMYBSABKARIAYgBARINCgVsb2FkMRgGIAEoDRINCgVsb2FkNRgHIAEoDRIOCgZsb2FkMTUYCCABKA0SGAoLdXNlcl9zdHJpbmcYCSABKAlIAogBAUISChBfZGlza2ZyZWUyX2J5dGVzQhIKEF9kaXNrZnJlZTNfYnl0ZXNCDgoMX3VzZXJfc3RyaW5nIp4DCglUZWxlbWV0cnkSDAoEdGltZRgBIAEoBxIzCg5kZXZpY2VfbWV0cmljcxgCIAEoCzIZLm1lc2h0YXN0aWMuRGV2aWNlTWV0cmljc0gAEj0KE2Vudmlyb25tZW50X21ldHJpY3MYAyABKAsyHi5tZXNodGFzdGljLkVudmlyb25tZW50TWV0cmljc0gAEjwKE2Fpcl9xdWFsaXR5X21ldHJpY3MYBCABKAsyHS5tZXNodGFzdGljLkFpclF1YWxpdHlNZXRyaWNzSAASMQoNcG93ZXJfbWV0cmljcxgFIAEoCzIYLm1lc2h0YXN0aWMuUG93ZXJNZXRyaWNzSAASLQoLbG9jYWxfc3RhdHMYBiABKAsyFi5tZXNodGFzdGljLkxvY2FsU3RhdHNIABIzCg5oZWFsdGhfbWV0cmljcxgHIAEoCzIZLm1lc2h0YXN0aWMuSGVhbHRoTWV0cmljc0gAEi8KDGhvc3RfbWV0cmljcxgIIAEoCzIXLm1lc2h0YXN0aWMuSG9zdE1ldHJpY3NIAEIJCgd2YXJpYW50Ij4KDU5hdTc4MDJDb25maWcSEgoKemVyb09mZnNldBgBIAEoBRIZChFjYWxpYnJhdGlvbkZhY3RvchgCIAEoAiqsBAoTVGVsZW1ldHJ5U2Vuc29yVHlwZRIQCgxTRU5TT1JfVU5TRVQQABIKCgZCTUUyODAQARIKCgZCTUU2ODAQAhILCgdNQ1A5ODA4EAMSCgoGSU5BMjYwEAQSCgoGSU5BMjE5EAUSCgoGQk1QMjgwEAYSCQoFU0hUQzMQBxIJCgVMUFMyMhAIEgsKB1FNQzYzMTAQCRILCgdRTUk4NjU4EAoSDAoIUU1DNTg4M0wQCxIJCgVTSFQzMRAMEgwKCFBNU0EwMDNJEA0SCwoHSU5BMzIyMRAOEgoKBkJNUDA4NRAPEgwKCFJDV0w5NjIwEBASCQoFU0hUNFgQERIMCghWRU1MNzcwMBASEgwKCE1MWDkwNjMyEBMSCwoHT1BUMzAwMRAUEgwKCExUUjM5MFVWEBUSDgoKVFNMMjU5MTFGThAWEgkKBUFIVDEwEBcSEAoMREZST0JPVF9MQVJLEBgSCwoHTkFVNzgwMhAZEgoKBkJNUDNYWBAaEgwKCElDTTIwOTQ4EBsSDAoITUFYMTcwNDgQHBIRCg1DVVNUT01fU0VOU09SEB0SDAoITUFYMzAxMDIQHhIMCghNTFg5MDYxNBAfEgkKBVNDRDRYECASCwoHUkFEU0VOUxAhEgoKBklOQTIyNhAiEhAKDERGUk9CT1RfUkFJThAjEgoKBkRQUzMxMBAkEgwKCFJBSzEyMDM1ECUSDAoITUFYMTcyNjEQJhILCgdQQ1QyMDc1ECdCZAoTY29tLmdlZWtzdmlsbGUubWVzaEIPVGVsZW1ldHJ5UHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), ya = /* @__PURE__ */ C(D, 0), ba = /* @__PURE__ */ C(D, 1), xa = /* @__PURE__ */ C(D, 2), Sa = /* @__PURE__ */ C(D, 3), Ca = /* @__PURE__ */ C(D, 4), wa = /* @__PURE__ */ C(D, 5), Ta = /* @__PURE__ */ C(D, 6), Ea = /* @__PURE__ */ C(D, 7), Da = /* @__PURE__ */ C(D, 8), Oa = /* @__PURE__ */ function(e) {
	return e[e.SENSOR_UNSET = 0] = "SENSOR_UNSET", e[e.BME280 = 1] = "BME280", e[e.BME680 = 2] = "BME680", e[e.MCP9808 = 3] = "MCP9808", e[e.INA260 = 4] = "INA260", e[e.INA219 = 5] = "INA219", e[e.BMP280 = 6] = "BMP280", e[e.SHTC3 = 7] = "SHTC3", e[e.LPS22 = 8] = "LPS22", e[e.QMC6310 = 9] = "QMC6310", e[e.QMI8658 = 10] = "QMI8658", e[e.QMC5883L = 11] = "QMC5883L", e[e.SHT31 = 12] = "SHT31", e[e.PMSA003I = 13] = "PMSA003I", e[e.INA3221 = 14] = "INA3221", e[e.BMP085 = 15] = "BMP085", e[e.RCWL9620 = 16] = "RCWL9620", e[e.SHT4X = 17] = "SHT4X", e[e.VEML7700 = 18] = "VEML7700", e[e.MLX90632 = 19] = "MLX90632", e[e.OPT3001 = 20] = "OPT3001", e[e.LTR390UV = 21] = "LTR390UV", e[e.TSL25911FN = 22] = "TSL25911FN", e[e.AHT10 = 23] = "AHT10", e[e.DFROBOT_LARK = 24] = "DFROBOT_LARK", e[e.NAU7802 = 25] = "NAU7802", e[e.BMP3XX = 26] = "BMP3XX", e[e.ICM20948 = 27] = "ICM20948", e[e.MAX17048 = 28] = "MAX17048", e[e.CUSTOM_SENSOR = 29] = "CUSTOM_SENSOR", e[e.MAX30102 = 30] = "MAX30102", e[e.MLX90614 = 31] = "MLX90614", e[e.SCD4X = 32] = "SCD4X", e[e.RADSENS = 33] = "RADSENS", e[e.INA226 = 34] = "INA226", e[e.DFROBOT_RAIN = 35] = "DFROBOT_RAIN", e[e.DPS310 = 36] = "DPS310", e[e.RAK12035 = 37] = "RAK12035", e[e.MAX17261 = 38] = "MAX17261", e[e.PCT2075 = 39] = "PCT2075", e;
}({}), ka = /* @__PURE__ */ b(D, 0), O = p({
	XModemSchema: () => ja,
	XModem_Control: () => Ma,
	XModem_ControlSchema: () => Na,
	file_xmodem: () => Aa
}), Aa = /* @__PURE__ */ S("Cgx4bW9kZW0ucHJvdG8SCm1lc2h0YXN0aWMitgEKBlhNb2RlbRIrCgdjb250cm9sGAEgASgOMhoubWVzaHRhc3RpYy5YTW9kZW0uQ29udHJvbBILCgNzZXEYAiABKA0SDQoFY3JjMTYYAyABKA0SDgoGYnVmZmVyGAQgASgMIlMKB0NvbnRyb2wSBwoDTlVMEAASBwoDU09IEAESBwoDU1RYEAISBwoDRU9UEAQSBwoDQUNLEAYSBwoDTkFLEBUSBwoDQ0FOEBgSCQoFQ1RSTFoQGkJhChNjb20uZ2Vla3N2aWxsZS5tZXNoQgxYbW9kZW1Qcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), ja = /* @__PURE__ */ C(Aa, 0), Ma = /* @__PURE__ */ function(e) {
	return e[e.NUL = 0] = "NUL", e[e.SOH = 1] = "SOH", e[e.STX = 2] = "STX", e[e.EOT = 4] = "EOT", e[e.ACK = 6] = "ACK", e[e.NAK = 21] = "NAK", e[e.CAN = 24] = "CAN", e[e.CTRLZ = 26] = "CTRLZ", e;
}({}), Na = /* @__PURE__ */ b(Aa, 0, 0), k = p({
	ChunkedPayloadResponseSchema: () => Co,
	ChunkedPayloadSchema: () => xo,
	ClientNotificationSchema: () => oo,
	CompressedSchema: () => ho,
	Constants: () => Eo,
	ConstantsSchema: () => Do,
	CriticalErrorCode: () => Oo,
	CriticalErrorCodeSchema: () => ko,
	DataSchema: () => Wa,
	DeviceMetadataSchema: () => vo,
	DuplicatedPublicKeySchema: () => uo,
	ExcludedModules: () => Ao,
	ExcludedModulesSchema: () => jo,
	FileInfoSchema: () => po,
	FromRadioSchema: () => ao,
	HardwareModel: () => wo,
	HardwareModelSchema: () => To,
	HeartbeatSchema: () => yo,
	KeyVerificationFinalSchema: () => lo,
	KeyVerificationNumberInformSchema: () => so,
	KeyVerificationNumberRequestSchema: () => co,
	KeyVerificationSchema: () => Ga,
	LogRecordSchema: () => to,
	LogRecord_Level: () => no,
	LogRecord_LevelSchema: () => ro,
	LowEntropyKeySchema: () => fo,
	MeshPacketSchema: () => Ja,
	MeshPacket_Delayed: () => Za,
	MeshPacket_DelayedSchema: () => Qa,
	MeshPacket_Priority: () => Ya,
	MeshPacket_PrioritySchema: () => Xa,
	MqttClientProxyMessageSchema: () => qa,
	MyNodeInfoSchema: () => eo,
	NeighborInfoSchema: () => go,
	NeighborSchema: () => _o,
	NodeInfoSchema: () => $a,
	NodeRemoteHardwarePinSchema: () => bo,
	PositionSchema: () => Pa,
	Position_AltSource: () => La,
	Position_AltSourceSchema: () => Ra,
	Position_LocSource: () => Fa,
	Position_LocSourceSchema: () => Ia,
	QueueStatusSchema: () => io,
	RouteDiscoverySchema: () => Ba,
	RoutingSchema: () => Va,
	Routing_Error: () => Ha,
	Routing_ErrorSchema: () => Ua,
	ToRadioSchema: () => mo,
	UserSchema: () => za,
	WaypointSchema: () => Ka,
	file_mesh: () => A,
	resend_chunksSchema: () => So
}), A = /* @__PURE__ */ S("CgptZXNoLnByb3RvEgptZXNodGFzdGljIocHCghQb3NpdGlvbhIXCgpsYXRpdHVkZV9pGAEgASgPSACIAQESGAoLbG9uZ2l0dWRlX2kYAiABKA9IAYgBARIVCghhbHRpdHVkZRgDIAEoBUgCiAEBEgwKBHRpbWUYBCABKAcSNwoPbG9jYXRpb25fc291cmNlGAUgASgOMh4ubWVzaHRhc3RpYy5Qb3NpdGlvbi5Mb2NTb3VyY2USNwoPYWx0aXR1ZGVfc291cmNlGAYgASgOMh4ubWVzaHRhc3RpYy5Qb3NpdGlvbi5BbHRTb3VyY2USEQoJdGltZXN0YW1wGAcgASgHEh8KF3RpbWVzdGFtcF9taWxsaXNfYWRqdXN0GAggASgFEhkKDGFsdGl0dWRlX2hhZRgJIAEoEUgDiAEBEigKG2FsdGl0dWRlX2dlb2lkYWxfc2VwYXJhdGlvbhgKIAEoEUgEiAEBEgwKBFBET1AYCyABKA0SDAoESERPUBgMIAEoDRIMCgRWRE9QGA0gASgNEhQKDGdwc19hY2N1cmFjeRgOIAEoDRIZCgxncm91bmRfc3BlZWQYDyABKA1IBYgBARIZCgxncm91bmRfdHJhY2sYECABKA1IBogBARITCgtmaXhfcXVhbGl0eRgRIAEoDRIQCghmaXhfdHlwZRgSIAEoDRIUCgxzYXRzX2luX3ZpZXcYEyABKA0SEQoJc2Vuc29yX2lkGBQgASgNEhMKC25leHRfdXBkYXRlGBUgASgNEhIKCnNlcV9udW1iZXIYFiABKA0SFgoOcHJlY2lzaW9uX2JpdHMYFyABKA0iTgoJTG9jU291cmNlEg0KCUxPQ19VTlNFVBAAEg4KCkxPQ19NQU5VQUwQARIQCgxMT0NfSU5URVJOQUwQAhIQCgxMT0NfRVhURVJOQUwQAyJiCglBbHRTb3VyY2USDQoJQUxUX1VOU0VUEAASDgoKQUxUX01BTlVBTBABEhAKDEFMVF9JTlRFUk5BTBACEhAKDEFMVF9FWFRFUk5BTBADEhIKDkFMVF9CQVJPTUVUUklDEARCDQoLX2xhdGl0dWRlX2lCDgoMX2xvbmdpdHVkZV9pQgsKCV9hbHRpdHVkZUIPCg1fYWx0aXR1ZGVfaGFlQh4KHF9hbHRpdHVkZV9nZW9pZGFsX3NlcGFyYXRpb25CDwoNX2dyb3VuZF9zcGVlZEIPCg1fZ3JvdW5kX3RyYWNrIooCCgRVc2VyEgoKAmlkGAEgASgJEhEKCWxvbmdfbmFtZRgCIAEoCRISCgpzaG9ydF9uYW1lGAMgASgJEhMKB21hY2FkZHIYBCABKAxCAhgBEisKCGh3X21vZGVsGAUgASgOMhkubWVzaHRhc3RpYy5IYXJkd2FyZU1vZGVsEhMKC2lzX2xpY2Vuc2VkGAYgASgIEjIKBHJvbGUYByABKA4yJC5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWcuUm9sZRISCgpwdWJsaWNfa2V5GAggASgMEhwKD2lzX3VubWVzc2FnYWJsZRgJIAEoCEgAiAEBQhIKEF9pc191bm1lc3NhZ2FibGUiWgoOUm91dGVEaXNjb3ZlcnkSDQoFcm91dGUYASADKAcSEwoLc25yX3Rvd2FyZHMYAiADKAUSEgoKcm91dGVfYmFjaxgDIAMoBxIQCghzbnJfYmFjaxgEIAMoBSLiAwoHUm91dGluZxIzCg1yb3V0ZV9yZXF1ZXN0GAEgASgLMhoubWVzaHRhc3RpYy5Sb3V0ZURpc2NvdmVyeUgAEjEKC3JvdXRlX3JlcGx5GAIgASgLMhoubWVzaHRhc3RpYy5Sb3V0ZURpc2NvdmVyeUgAEjEKDGVycm9yX3JlYXNvbhgDIAEoDjIZLm1lc2h0YXN0aWMuUm91dGluZy5FcnJvckgAIrACCgVFcnJvchIICgROT05FEAASDAoITk9fUk9VVEUQARILCgdHT1RfTkFLEAISCwoHVElNRU9VVBADEhAKDE5PX0lOVEVSRkFDRRAEEhIKDk1BWF9SRVRSQU5TTUlUEAUSDgoKTk9fQ0hBTk5FTBAGEg0KCVRPT19MQVJHRRAHEg8KC05PX1JFU1BPTlNFEAgSFAoQRFVUWV9DWUNMRV9MSU1JVBAJEg8KC0JBRF9SRVFVRVNUECASEgoOTk9UX0FVVEhPUklaRUQQIRIOCgpQS0lfRkFJTEVEECISFgoSUEtJX1VOS05PV05fUFVCS0VZECMSGQoVQURNSU5fQkFEX1NFU1NJT05fS0VZECQSIQodQURNSU5fUFVCTElDX0tFWV9VTkFVVEhPUklaRUQQJUIJCgd2YXJpYW50IssBCgREYXRhEiQKB3BvcnRudW0YASABKA4yEy5tZXNodGFzdGljLlBvcnROdW0SDwoHcGF5bG9hZBgCIAEoDBIVCg13YW50X3Jlc3BvbnNlGAMgASgIEgwKBGRlc3QYBCABKAcSDgoGc291cmNlGAUgASgHEhIKCnJlcXVlc3RfaWQYBiABKAcSEAoIcmVwbHlfaWQYByABKAcSDQoFZW1vamkYCCABKAcSFQoIYml0ZmllbGQYCSABKA1IAIgBAUILCglfYml0ZmllbGQiPgoPS2V5VmVyaWZpY2F0aW9uEg0KBW5vbmNlGAEgASgEEg0KBWhhc2gxGAIgASgMEg0KBWhhc2gyGAMgASgMIrwBCghXYXlwb2ludBIKCgJpZBgBIAEoDRIXCgpsYXRpdHVkZV9pGAIgASgPSACIAQESGAoLbG9uZ2l0dWRlX2kYAyABKA9IAYgBARIOCgZleHBpcmUYBCABKA0SEQoJbG9ja2VkX3RvGAUgASgNEgwKBG5hbWUYBiABKAkSEwoLZGVzY3JpcHRpb24YByABKAkSDAoEaWNvbhgIIAEoB0INCgtfbGF0aXR1ZGVfaUIOCgxfbG9uZ2l0dWRlX2kibAoWTXF0dENsaWVudFByb3h5TWVzc2FnZRINCgV0b3BpYxgBIAEoCRIOCgRkYXRhGAIgASgMSAASDgoEdGV4dBgDIAEoCUgAEhAKCHJldGFpbmVkGAQgASgIQhEKD3BheWxvYWRfdmFyaWFudCKbBQoKTWVzaFBhY2tldBIMCgRmcm9tGAEgASgHEgoKAnRvGAIgASgHEg8KB2NoYW5uZWwYAyABKA0SIwoHZGVjb2RlZBgEIAEoCzIQLm1lc2h0YXN0aWMuRGF0YUgAEhMKCWVuY3J5cHRlZBgFIAEoDEgAEgoKAmlkGAYgASgHEg8KB3J4X3RpbWUYByABKAcSDgoGcnhfc25yGAggASgCEhEKCWhvcF9saW1pdBgJIAEoDRIQCgh3YW50X2FjaxgKIAEoCBIxCghwcmlvcml0eRgLIAEoDjIfLm1lc2h0YXN0aWMuTWVzaFBhY2tldC5Qcmlvcml0eRIPCgdyeF9yc3NpGAwgASgFEjMKB2RlbGF5ZWQYDSABKA4yHi5tZXNodGFzdGljLk1lc2hQYWNrZXQuRGVsYXllZEICGAESEAoIdmlhX21xdHQYDiABKAgSEQoJaG9wX3N0YXJ0GA8gASgNEhIKCnB1YmxpY19rZXkYECABKAwSFQoNcGtpX2VuY3J5cHRlZBgRIAEoCBIQCghuZXh0X2hvcBgSIAEoDRISCgpyZWxheV9ub2RlGBMgASgNEhAKCHR4X2FmdGVyGBQgASgNIn4KCFByaW9yaXR5EgkKBVVOU0VUEAASBwoDTUlOEAESDgoKQkFDS0dST1VORBAKEgsKB0RFRkFVTFQQQBIMCghSRUxJQUJMRRBGEgwKCFJFU1BPTlNFEFASCAoESElHSBBkEgkKBUFMRVJUEG4SBwoDQUNLEHgSBwoDTUFYEH8iQgoHRGVsYXllZBIMCghOT19ERUxBWRAAEhUKEURFTEFZRURfQlJPQURDQVNUEAESEgoOREVMQVlFRF9ESVJFQ1QQAkIRCg9wYXlsb2FkX3ZhcmlhbnQixwIKCE5vZGVJbmZvEgsKA251bRgBIAEoDRIeCgR1c2VyGAIgASgLMhAubWVzaHRhc3RpYy5Vc2VyEiYKCHBvc2l0aW9uGAMgASgLMhQubWVzaHRhc3RpYy5Qb3NpdGlvbhILCgNzbnIYBCABKAISEgoKbGFzdF9oZWFyZBgFIAEoBxIxCg5kZXZpY2VfbWV0cmljcxgGIAEoCzIZLm1lc2h0YXN0aWMuRGV2aWNlTWV0cmljcxIPCgdjaGFubmVsGAcgASgNEhAKCHZpYV9tcXR0GAggASgIEhYKCWhvcHNfYXdheRgJIAEoDUgAiAEBEhMKC2lzX2Zhdm9yaXRlGAogASgIEhIKCmlzX2lnbm9yZWQYCyABKAgSIAoYaXNfa2V5X21hbnVhbGx5X3ZlcmlmaWVkGAwgASgIQgwKCl9ob3BzX2F3YXkidAoKTXlOb2RlSW5mbxITCgtteV9ub2RlX251bRgBIAEoDRIUCgxyZWJvb3RfY291bnQYCCABKA0SFwoPbWluX2FwcF92ZXJzaW9uGAsgASgNEhEKCWRldmljZV9pZBgMIAEoDBIPCgdwaW9fZW52GA0gASgJIsABCglMb2dSZWNvcmQSDwoHbWVzc2FnZRgBIAEoCRIMCgR0aW1lGAIgASgHEg4KBnNvdXJjZRgDIAEoCRIqCgVsZXZlbBgEIAEoDjIbLm1lc2h0YXN0aWMuTG9nUmVjb3JkLkxldmVsIlgKBUxldmVsEgkKBVVOU0VUEAASDAoIQ1JJVElDQUwQMhIJCgVFUlJPUhAoEgsKB1dBUk5JTkcQHhIICgRJTkZPEBQSCQoFREVCVUcQChIJCgVUUkFDRRAFIlAKC1F1ZXVlU3RhdHVzEgsKA3JlcxgBIAEoBRIMCgRmcmVlGAIgASgNEg4KBm1heGxlbhgDIAEoDRIWCg5tZXNoX3BhY2tldF9pZBgEIAEoDSL5BQoJRnJvbVJhZGlvEgoKAmlkGAEgASgNEigKBnBhY2tldBgCIAEoCzIWLm1lc2h0YXN0aWMuTWVzaFBhY2tldEgAEikKB215X2luZm8YAyABKAsyFi5tZXNodGFzdGljLk15Tm9kZUluZm9IABIpCglub2RlX2luZm8YBCABKAsyFC5tZXNodGFzdGljLk5vZGVJbmZvSAASJAoGY29uZmlnGAUgASgLMhIubWVzaHRhc3RpYy5Db25maWdIABIrCgpsb2dfcmVjb3JkGAYgASgLMhUubWVzaHRhc3RpYy5Mb2dSZWNvcmRIABIcChJjb25maWdfY29tcGxldGVfaWQYByABKA1IABISCghyZWJvb3RlZBgIIAEoCEgAEjAKDG1vZHVsZUNvbmZpZxgJIAEoCzIYLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnSAASJgoHY2hhbm5lbBgKIAEoCzITLm1lc2h0YXN0aWMuQ2hhbm5lbEgAEi4KC3F1ZXVlU3RhdHVzGAsgASgLMhcubWVzaHRhc3RpYy5RdWV1ZVN0YXR1c0gAEioKDHhtb2RlbVBhY2tldBgMIAEoCzISLm1lc2h0YXN0aWMuWE1vZGVtSAASLgoIbWV0YWRhdGEYDSABKAsyGi5tZXNodGFzdGljLkRldmljZU1ldGFkYXRhSAASRAoWbXF0dENsaWVudFByb3h5TWVzc2FnZRgOIAEoCzIiLm1lc2h0YXN0aWMuTXF0dENsaWVudFByb3h5TWVzc2FnZUgAEigKCGZpbGVJbmZvGA8gASgLMhQubWVzaHRhc3RpYy5GaWxlSW5mb0gAEjwKEmNsaWVudE5vdGlmaWNhdGlvbhgQIAEoCzIeLm1lc2h0YXN0aWMuQ2xpZW50Tm90aWZpY2F0aW9uSAASNAoOZGV2aWNldWlDb25maWcYESABKAsyGi5tZXNodGFzdGljLkRldmljZVVJQ29uZmlnSABCEQoPcGF5bG9hZF92YXJpYW50IvoDChJDbGllbnROb3RpZmljYXRpb24SFQoIcmVwbHlfaWQYASABKA1IAYgBARIMCgR0aW1lGAIgASgHEioKBWxldmVsGAMgASgOMhsubWVzaHRhc3RpYy5Mb2dSZWNvcmQuTGV2ZWwSDwoHbWVzc2FnZRgEIAEoCRJRCh5rZXlfdmVyaWZpY2F0aW9uX251bWJlcl9pbmZvcm0YCyABKAsyJy5tZXNodGFzdGljLktleVZlcmlmaWNhdGlvbk51bWJlckluZm9ybUgAElMKH2tleV92ZXJpZmljYXRpb25fbnVtYmVyX3JlcXVlc3QYDCABKAsyKC5tZXNodGFzdGljLktleVZlcmlmaWNhdGlvbk51bWJlclJlcXVlc3RIABJCChZrZXlfdmVyaWZpY2F0aW9uX2ZpbmFsGA0gASgLMiAubWVzaHRhc3RpYy5LZXlWZXJpZmljYXRpb25GaW5hbEgAEkAKFWR1cGxpY2F0ZWRfcHVibGljX2tleRgOIAEoCzIfLm1lc2h0YXN0aWMuRHVwbGljYXRlZFB1YmxpY0tleUgAEjQKD2xvd19lbnRyb3B5X2tleRgPIAEoCzIZLm1lc2h0YXN0aWMuTG93RW50cm9weUtleUgAQhEKD3BheWxvYWRfdmFyaWFudEILCglfcmVwbHlfaWQiXgobS2V5VmVyaWZpY2F0aW9uTnVtYmVySW5mb3JtEg0KBW5vbmNlGAEgASgEEhcKD3JlbW90ZV9sb25nbmFtZRgCIAEoCRIXCg9zZWN1cml0eV9udW1iZXIYAyABKA0iRgocS2V5VmVyaWZpY2F0aW9uTnVtYmVyUmVxdWVzdBINCgVub25jZRgBIAEoBBIXCg9yZW1vdGVfbG9uZ25hbWUYAiABKAkicQoUS2V5VmVyaWZpY2F0aW9uRmluYWwSDQoFbm9uY2UYASABKAQSFwoPcmVtb3RlX2xvbmduYW1lGAIgASgJEhAKCGlzU2VuZGVyGAMgASgIEh8KF3ZlcmlmaWNhdGlvbl9jaGFyYWN0ZXJzGAQgASgJIhUKE0R1cGxpY2F0ZWRQdWJsaWNLZXkiDwoNTG93RW50cm9weUtleSIxCghGaWxlSW5mbxIRCglmaWxlX25hbWUYASABKAkSEgoKc2l6ZV9ieXRlcxgCIAEoDSKUAgoHVG9SYWRpbxIoCgZwYWNrZXQYASABKAsyFi5tZXNodGFzdGljLk1lc2hQYWNrZXRIABIYCg53YW50X2NvbmZpZ19pZBgDIAEoDUgAEhQKCmRpc2Nvbm5lY3QYBCABKAhIABIqCgx4bW9kZW1QYWNrZXQYBSABKAsyEi5tZXNodGFzdGljLlhNb2RlbUgAEkQKFm1xdHRDbGllbnRQcm94eU1lc3NhZ2UYBiABKAsyIi5tZXNodGFzdGljLk1xdHRDbGllbnRQcm94eU1lc3NhZ2VIABIqCgloZWFydGJlYXQYByABKAsyFS5tZXNodGFzdGljLkhlYXJ0YmVhdEgAQhEKD3BheWxvYWRfdmFyaWFudCJACgpDb21wcmVzc2VkEiQKB3BvcnRudW0YASABKA4yEy5tZXNodGFzdGljLlBvcnROdW0SDAoEZGF0YRgCIAEoDCKHAQoMTmVpZ2hib3JJbmZvEg8KB25vZGVfaWQYASABKA0SFwoPbGFzdF9zZW50X2J5X2lkGAIgASgNEiQKHG5vZGVfYnJvYWRjYXN0X2ludGVydmFsX3NlY3MYAyABKA0SJwoJbmVpZ2hib3JzGAQgAygLMhQubWVzaHRhc3RpYy5OZWlnaGJvciJkCghOZWlnaGJvchIPCgdub2RlX2lkGAEgASgNEgsKA3NuchgCIAEoAhIUCgxsYXN0X3J4X3RpbWUYAyABKAcSJAocbm9kZV9icm9hZGNhc3RfaW50ZXJ2YWxfc2VjcxgEIAEoDSLXAgoORGV2aWNlTWV0YWRhdGESGAoQZmlybXdhcmVfdmVyc2lvbhgBIAEoCRIcChRkZXZpY2Vfc3RhdGVfdmVyc2lvbhgCIAEoDRITCgtjYW5TaHV0ZG93bhgDIAEoCBIPCgdoYXNXaWZpGAQgASgIEhQKDGhhc0JsdWV0b290aBgFIAEoCBITCgtoYXNFdGhlcm5ldBgGIAEoCBIyCgRyb2xlGAcgASgOMiQubWVzaHRhc3RpYy5Db25maWcuRGV2aWNlQ29uZmlnLlJvbGUSFgoOcG9zaXRpb25fZmxhZ3MYCCABKA0SKwoIaHdfbW9kZWwYCSABKA4yGS5tZXNodGFzdGljLkhhcmR3YXJlTW9kZWwSGQoRaGFzUmVtb3RlSGFyZHdhcmUYCiABKAgSDgoGaGFzUEtDGAsgASgIEhgKEGV4Y2x1ZGVkX21vZHVsZXMYDCABKA0iCwoJSGVhcnRiZWF0IlUKFU5vZGVSZW1vdGVIYXJkd2FyZVBpbhIQCghub2RlX251bRgBIAEoDRIqCgNwaW4YAiABKAsyHS5tZXNodGFzdGljLlJlbW90ZUhhcmR3YXJlUGluImUKDkNodW5rZWRQYXlsb2FkEhIKCnBheWxvYWRfaWQYASABKA0SEwoLY2h1bmtfY291bnQYAiABKA0SEwoLY2h1bmtfaW5kZXgYAyABKA0SFQoNcGF5bG9hZF9jaHVuaxgEIAEoDCIfCg1yZXNlbmRfY2h1bmtzEg4KBmNodW5rcxgBIAMoDSKqAQoWQ2h1bmtlZFBheWxvYWRSZXNwb25zZRISCgpwYXlsb2FkX2lkGAEgASgNEhoKEHJlcXVlc3RfdHJhbnNmZXIYAiABKAhIABIZCg9hY2NlcHRfdHJhbnNmZXIYAyABKAhIABIyCg1yZXNlbmRfY2h1bmtzGAQgASgLMhkubWVzaHRhc3RpYy5yZXNlbmRfY2h1bmtzSABCEQoPcGF5bG9hZF92YXJpYW50KvcPCg1IYXJkd2FyZU1vZGVsEgkKBVVOU0VUEAASDAoIVExPUkFfVjIQARIMCghUTE9SQV9WMRACEhIKDlRMT1JBX1YyXzFfMVA2EAMSCQoFVEJFQU0QBBIPCgtIRUxURUNfVjJfMBAFEg4KClRCRUFNX1YwUDcQBhIKCgZUX0VDSE8QBxIQCgxUTE9SQV9WMV8xUDMQCBILCgdSQUs0NjMxEAkSDwoLSEVMVEVDX1YyXzEQChINCglIRUxURUNfVjEQCxIYChRMSUxZR09fVEJFQU1fUzNfQ09SRRAMEgwKCFJBSzExMjAwEA0SCwoHTkFOT19HMRAOEhIKDlRMT1JBX1YyXzFfMVA4EA8SDwoLVExPUkFfVDNfUzMQEBIUChBOQU5PX0cxX0VYUExPUkVSEBESEQoNTkFOT19HMl9VTFRSQRASEg0KCUxPUkFfVFlQRRATEgsKB1dJUEhPTkUQFBIOCgpXSU9fV00xMTEwEBUSCwoHUkFLMjU2MBAWEhMKD0hFTFRFQ19IUlVfMzYwMRAXEhoKFkhFTFRFQ19XSVJFTEVTU19CUklER0UQGBIOCgpTVEFUSU9OX0cxEBkSDAoIUkFLMTEzMTAQGhIUChBTRU5TRUxPUkFfUlAyMDQwEBsSEAoMU0VOU0VMT1JBX1MzEBwSDQoJQ0FOQVJZT05FEB0SDwoLUlAyMDQwX0xPUkEQHhIOCgpTVEFUSU9OX0cyEB8SEQoNTE9SQV9SRUxBWV9WMRAgEg4KCk5SRjUyODQwREsQIRIHCgNQUFIQIhIPCgtHRU5JRUJMT0NLUxAjEhEKDU5SRjUyX1VOS05PV04QJBINCglQT1JURFVJTk8QJRIPCgtBTkRST0lEX1NJTRAmEgoKBkRJWV9WMRAnEhUKEU5SRjUyODQwX1BDQTEwMDU5ECgSCgoGRFJfREVWECkSCwoHTTVTVEFDSxAqEg0KCUhFTFRFQ19WMxArEhEKDUhFTFRFQ19XU0xfVjMQLBITCg9CRVRBRlBWXzI0MDBfVFgQLRIXChNCRVRBRlBWXzkwMF9OQU5PX1RYEC4SDAoIUlBJX1BJQ08QLxIbChdIRUxURUNfV0lSRUxFU1NfVFJBQ0tFUhAwEhkKFUhFTFRFQ19XSVJFTEVTU19QQVBFUhAxEgoKBlRfREVDSxAyEg4KClRfV0FUQ0hfUzMQMxIRCg1QSUNPTVBVVEVSX1MzEDQSDwoLSEVMVEVDX0hUNjIQNRISCg5FQllURV9FU1AzMl9TMxA2EhEKDUVTUDMyX1MzX1BJQ08QNxINCglDSEFUVEVSXzIQOBIeChpIRUxURUNfV0lSRUxFU1NfUEFQRVJfVjFfMBA5EiAKHEhFTFRFQ19XSVJFTEVTU19UUkFDS0VSX1YxXzAQOhILCgdVTlBIT05FEDsSDAoIVERfTE9SQUMQPBITCg9DREVCWVRFX0VPUkFfUzMQPRIPCgtUV0NfTUVTSF9WNBA+EhYKEk5SRjUyX1BST01JQ1JPX0RJWRA/Eh8KG1JBRElPTUFTVEVSXzkwMF9CQU5ESVRfTkFOTxBAEhwKGEhFTFRFQ19DQVBTVUxFX1NFTlNPUl9WMxBBEh0KGUhFTFRFQ19WSVNJT05fTUFTVEVSX1QxOTAQQhIdChlIRUxURUNfVklTSU9OX01BU1RFUl9FMjEzEEMSHQoZSEVMVEVDX1ZJU0lPTl9NQVNURVJfRTI5MBBEEhkKFUhFTFRFQ19NRVNIX05PREVfVDExNBBFEhYKElNFTlNFQ0FQX0lORElDQVRPUhBGEhMKD1RSQUNLRVJfVDEwMDBfRRBHEgsKB1JBSzMxNzIQSBIKCgZXSU9fRTUQSRIaChZSQURJT01BU1RFUl85MDBfQkFORElUEEoSEwoPTUUyNUxTMDFfNFkxMFREEEsSGAoUUlAyMDQwX0ZFQVRIRVJfUkZNOTUQTBIVChFNNVNUQUNLX0NPUkVCQVNJQxBNEhEKDU01U1RBQ0tfQ09SRTIQThINCglSUElfUElDTzIQTxISCg5NNVNUQUNLX0NPUkVTMxBQEhEKDVNFRUVEX1hJQU9fUzMQURILCgdNUzI0U0YxEFISDAoIVExPUkFfQzYQUxIPCgtXSVNNRVNIX1RBUBBUEg0KCVJPVVRBU1RJQxBVEgwKCE1FU0hfVEFCEFYSDAoITUVTSExJTksQVxISCg5YSUFPX05SRjUyX0tJVBBYEhAKDFRISU5LTk9ERV9NMRBZEhAKDFRISU5LTk9ERV9NMhBaEg8KC1RfRVRIX0VMSVRFEFsSFQoRSEVMVEVDX1NFTlNPUl9IVUIQXBIaChZSRVNFUlZFRF9GUklFRF9DSElDS0VOEF0SFgoSSEVMVEVDX01FU0hfUE9DS0VUEF4SFAoQU0VFRURfU09MQVJfTk9ERRBfEhgKFE5PTUFEU1RBUl9NRVRFT1JfUFJPEGASDQoJQ1JPV1BBTkVMEGESCwoHTElOS18zMhBiEhgKFFNFRUVEX1dJT19UUkFDS0VSX0wxEGMSHQoZU0VFRURfV0lPX1RSQUNLRVJfTDFfRUlOSxBkEhQKEFFXQU5UWl9USU5ZX0FSTVMQZRIOCgpUX0RFQ0tfUFJPEGYSEAoMVF9MT1JBX1BBR0VSEGcSHQoZR0FUNTYyX01FU0hfVFJJQUxfVFJBQ0tFUhBoEg8KClBSSVZBVEVfSFcQ/wEqLAoJQ29uc3RhbnRzEggKBFpFUk8QABIVChBEQVRBX1BBWUxPQURfTEVOEOkBKrQCChFDcml0aWNhbEVycm9yQ29kZRIICgROT05FEAASDwoLVFhfV0FUQ0hET0cQARIUChBTTEVFUF9FTlRFUl9XQUlUEAISDAoITk9fUkFESU8QAxIPCgtVTlNQRUNJRklFRBAEEhUKEVVCTE9YX1VOSVRfRkFJTEVEEAUSDQoJTk9fQVhQMTkyEAYSGQoVSU5WQUxJRF9SQURJT19TRVRUSU5HEAcSEwoPVFJBTlNNSVRfRkFJTEVEEAgSDAoIQlJPV05PVVQQCRISCg5TWDEyNjJfRkFJTFVSRRAKEhEKDVJBRElPX1NQSV9CVUcQCxIgChxGTEFTSF9DT1JSVVBUSU9OX1JFQ09WRVJBQkxFEAwSIgoeRkxBU0hfQ09SUlVQVElPTl9VTlJFQ09WRVJBQkxFEA0qgAMKD0V4Y2x1ZGVkTW9kdWxlcxIRCg1FWENMVURFRF9OT05FEAASDwoLTVFUVF9DT05GSUcQARIRCg1TRVJJQUxfQ09ORklHEAISEwoPRVhUTk9USUZfQ09ORklHEAQSFwoTU1RPUkVGT1JXQVJEX0NPTkZJRxAIEhQKEFJBTkdFVEVTVF9DT05GSUcQEBIUChBURUxFTUVUUllfQ09ORklHECASFAoQQ0FOTkVETVNHX0NPTkZJRxBAEhEKDEFVRElPX0NPTkZJRxCAARIaChVSRU1PVEVIQVJEV0FSRV9DT05GSUcQgAISGAoTTkVJR0hCT1JJTkZPX0NPTkZJRxCABBIbChZBTUJJRU5UTElHSFRJTkdfQ09ORklHEIAIEhsKFkRFVEVDVElPTlNFTlNPUl9DT05GSUcQgBASFgoRUEFYQ09VTlRFUl9DT05GSUcQgCASFQoQQkxVRVRPT1RIX0NPTkZJRxCAQBIUCg5ORVRXT1JLX0NPTkZJRxCAgAFCXwoTY29tLmdlZWtzdmlsbGUubWVzaEIKTWVzaFByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [
	Lr,
	w,
	T,
	ha,
	D,
	Aa,
	Ur
]), Pa = /* @__PURE__ */ C(A, 0), Fa = /* @__PURE__ */ function(e) {
	return e[e.LOC_UNSET = 0] = "LOC_UNSET", e[e.LOC_MANUAL = 1] = "LOC_MANUAL", e[e.LOC_INTERNAL = 2] = "LOC_INTERNAL", e[e.LOC_EXTERNAL = 3] = "LOC_EXTERNAL", e;
}({}), Ia = /* @__PURE__ */ b(A, 0, 0), La = /* @__PURE__ */ function(e) {
	return e[e.ALT_UNSET = 0] = "ALT_UNSET", e[e.ALT_MANUAL = 1] = "ALT_MANUAL", e[e.ALT_INTERNAL = 2] = "ALT_INTERNAL", e[e.ALT_EXTERNAL = 3] = "ALT_EXTERNAL", e[e.ALT_BAROMETRIC = 4] = "ALT_BAROMETRIC", e;
}({}), Ra = /* @__PURE__ */ b(A, 0, 1), za = /* @__PURE__ */ C(A, 1), Ba = /* @__PURE__ */ C(A, 2), Va = /* @__PURE__ */ C(A, 3), Ha = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.NO_ROUTE = 1] = "NO_ROUTE", e[e.GOT_NAK = 2] = "GOT_NAK", e[e.TIMEOUT = 3] = "TIMEOUT", e[e.NO_INTERFACE = 4] = "NO_INTERFACE", e[e.MAX_RETRANSMIT = 5] = "MAX_RETRANSMIT", e[e.NO_CHANNEL = 6] = "NO_CHANNEL", e[e.TOO_LARGE = 7] = "TOO_LARGE", e[e.NO_RESPONSE = 8] = "NO_RESPONSE", e[e.DUTY_CYCLE_LIMIT = 9] = "DUTY_CYCLE_LIMIT", e[e.BAD_REQUEST = 32] = "BAD_REQUEST", e[e.NOT_AUTHORIZED = 33] = "NOT_AUTHORIZED", e[e.PKI_FAILED = 34] = "PKI_FAILED", e[e.PKI_UNKNOWN_PUBKEY = 35] = "PKI_UNKNOWN_PUBKEY", e[e.ADMIN_BAD_SESSION_KEY = 36] = "ADMIN_BAD_SESSION_KEY", e[e.ADMIN_PUBLIC_KEY_UNAUTHORIZED = 37] = "ADMIN_PUBLIC_KEY_UNAUTHORIZED", e;
}({}), Ua = /* @__PURE__ */ b(A, 3, 0), Wa = /* @__PURE__ */ C(A, 4), Ga = /* @__PURE__ */ C(A, 5), Ka = /* @__PURE__ */ C(A, 6), qa = /* @__PURE__ */ C(A, 7), Ja = /* @__PURE__ */ C(A, 8), Ya = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.MIN = 1] = "MIN", e[e.BACKGROUND = 10] = "BACKGROUND", e[e.DEFAULT = 64] = "DEFAULT", e[e.RELIABLE = 70] = "RELIABLE", e[e.RESPONSE = 80] = "RESPONSE", e[e.HIGH = 100] = "HIGH", e[e.ALERT = 110] = "ALERT", e[e.ACK = 120] = "ACK", e[e.MAX = 127] = "MAX", e;
}({}), Xa = /* @__PURE__ */ b(A, 8, 0), Za = /* @__PURE__ */ function(e) {
	return e[e.NO_DELAY = 0] = "NO_DELAY", e[e.DELAYED_BROADCAST = 1] = "DELAYED_BROADCAST", e[e.DELAYED_DIRECT = 2] = "DELAYED_DIRECT", e;
}({}), Qa = /* @__PURE__ */ b(A, 8, 1), $a = /* @__PURE__ */ C(A, 9), eo = /* @__PURE__ */ C(A, 10), to = /* @__PURE__ */ C(A, 11), no = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.CRITICAL = 50] = "CRITICAL", e[e.ERROR = 40] = "ERROR", e[e.WARNING = 30] = "WARNING", e[e.INFO = 20] = "INFO", e[e.DEBUG = 10] = "DEBUG", e[e.TRACE = 5] = "TRACE", e;
}({}), ro = /* @__PURE__ */ b(A, 11, 0), io = /* @__PURE__ */ C(A, 12), ao = /* @__PURE__ */ C(A, 13), oo = /* @__PURE__ */ C(A, 14), so = /* @__PURE__ */ C(A, 15), co = /* @__PURE__ */ C(A, 16), lo = /* @__PURE__ */ C(A, 17), uo = /* @__PURE__ */ C(A, 18), fo = /* @__PURE__ */ C(A, 19), po = /* @__PURE__ */ C(A, 20), mo = /* @__PURE__ */ C(A, 21), ho = /* @__PURE__ */ C(A, 22), go = /* @__PURE__ */ C(A, 23), _o = /* @__PURE__ */ C(A, 24), vo = /* @__PURE__ */ C(A, 25), yo = /* @__PURE__ */ C(A, 26), bo = /* @__PURE__ */ C(A, 27), xo = /* @__PURE__ */ C(A, 28), So = /* @__PURE__ */ C(A, 29), Co = /* @__PURE__ */ C(A, 30), wo = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.TLORA_V2 = 1] = "TLORA_V2", e[e.TLORA_V1 = 2] = "TLORA_V1", e[e.TLORA_V2_1_1P6 = 3] = "TLORA_V2_1_1P6", e[e.TBEAM = 4] = "TBEAM", e[e.HELTEC_V2_0 = 5] = "HELTEC_V2_0", e[e.TBEAM_V0P7 = 6] = "TBEAM_V0P7", e[e.T_ECHO = 7] = "T_ECHO", e[e.TLORA_V1_1P3 = 8] = "TLORA_V1_1P3", e[e.RAK4631 = 9] = "RAK4631", e[e.HELTEC_V2_1 = 10] = "HELTEC_V2_1", e[e.HELTEC_V1 = 11] = "HELTEC_V1", e[e.LILYGO_TBEAM_S3_CORE = 12] = "LILYGO_TBEAM_S3_CORE", e[e.RAK11200 = 13] = "RAK11200", e[e.NANO_G1 = 14] = "NANO_G1", e[e.TLORA_V2_1_1P8 = 15] = "TLORA_V2_1_1P8", e[e.TLORA_T3_S3 = 16] = "TLORA_T3_S3", e[e.NANO_G1_EXPLORER = 17] = "NANO_G1_EXPLORER", e[e.NANO_G2_ULTRA = 18] = "NANO_G2_ULTRA", e[e.LORA_TYPE = 19] = "LORA_TYPE", e[e.WIPHONE = 20] = "WIPHONE", e[e.WIO_WM1110 = 21] = "WIO_WM1110", e[e.RAK2560 = 22] = "RAK2560", e[e.HELTEC_HRU_3601 = 23] = "HELTEC_HRU_3601", e[e.HELTEC_WIRELESS_BRIDGE = 24] = "HELTEC_WIRELESS_BRIDGE", e[e.STATION_G1 = 25] = "STATION_G1", e[e.RAK11310 = 26] = "RAK11310", e[e.SENSELORA_RP2040 = 27] = "SENSELORA_RP2040", e[e.SENSELORA_S3 = 28] = "SENSELORA_S3", e[e.CANARYONE = 29] = "CANARYONE", e[e.RP2040_LORA = 30] = "RP2040_LORA", e[e.STATION_G2 = 31] = "STATION_G2", e[e.LORA_RELAY_V1 = 32] = "LORA_RELAY_V1", e[e.NRF52840DK = 33] = "NRF52840DK", e[e.PPR = 34] = "PPR", e[e.GENIEBLOCKS = 35] = "GENIEBLOCKS", e[e.NRF52_UNKNOWN = 36] = "NRF52_UNKNOWN", e[e.PORTDUINO = 37] = "PORTDUINO", e[e.ANDROID_SIM = 38] = "ANDROID_SIM", e[e.DIY_V1 = 39] = "DIY_V1", e[e.NRF52840_PCA10059 = 40] = "NRF52840_PCA10059", e[e.DR_DEV = 41] = "DR_DEV", e[e.M5STACK = 42] = "M5STACK", e[e.HELTEC_V3 = 43] = "HELTEC_V3", e[e.HELTEC_WSL_V3 = 44] = "HELTEC_WSL_V3", e[e.BETAFPV_2400_TX = 45] = "BETAFPV_2400_TX", e[e.BETAFPV_900_NANO_TX = 46] = "BETAFPV_900_NANO_TX", e[e.RPI_PICO = 47] = "RPI_PICO", e[e.HELTEC_WIRELESS_TRACKER = 48] = "HELTEC_WIRELESS_TRACKER", e[e.HELTEC_WIRELESS_PAPER = 49] = "HELTEC_WIRELESS_PAPER", e[e.T_DECK = 50] = "T_DECK", e[e.T_WATCH_S3 = 51] = "T_WATCH_S3", e[e.PICOMPUTER_S3 = 52] = "PICOMPUTER_S3", e[e.HELTEC_HT62 = 53] = "HELTEC_HT62", e[e.EBYTE_ESP32_S3 = 54] = "EBYTE_ESP32_S3", e[e.ESP32_S3_PICO = 55] = "ESP32_S3_PICO", e[e.CHATTER_2 = 56] = "CHATTER_2", e[e.HELTEC_WIRELESS_PAPER_V1_0 = 57] = "HELTEC_WIRELESS_PAPER_V1_0", e[e.HELTEC_WIRELESS_TRACKER_V1_0 = 58] = "HELTEC_WIRELESS_TRACKER_V1_0", e[e.UNPHONE = 59] = "UNPHONE", e[e.TD_LORAC = 60] = "TD_LORAC", e[e.CDEBYTE_EORA_S3 = 61] = "CDEBYTE_EORA_S3", e[e.TWC_MESH_V4 = 62] = "TWC_MESH_V4", e[e.NRF52_PROMICRO_DIY = 63] = "NRF52_PROMICRO_DIY", e[e.RADIOMASTER_900_BANDIT_NANO = 64] = "RADIOMASTER_900_BANDIT_NANO", e[e.HELTEC_CAPSULE_SENSOR_V3 = 65] = "HELTEC_CAPSULE_SENSOR_V3", e[e.HELTEC_VISION_MASTER_T190 = 66] = "HELTEC_VISION_MASTER_T190", e[e.HELTEC_VISION_MASTER_E213 = 67] = "HELTEC_VISION_MASTER_E213", e[e.HELTEC_VISION_MASTER_E290 = 68] = "HELTEC_VISION_MASTER_E290", e[e.HELTEC_MESH_NODE_T114 = 69] = "HELTEC_MESH_NODE_T114", e[e.SENSECAP_INDICATOR = 70] = "SENSECAP_INDICATOR", e[e.TRACKER_T1000_E = 71] = "TRACKER_T1000_E", e[e.RAK3172 = 72] = "RAK3172", e[e.WIO_E5 = 73] = "WIO_E5", e[e.RADIOMASTER_900_BANDIT = 74] = "RADIOMASTER_900_BANDIT", e[e.ME25LS01_4Y10TD = 75] = "ME25LS01_4Y10TD", e[e.RP2040_FEATHER_RFM95 = 76] = "RP2040_FEATHER_RFM95", e[e.M5STACK_COREBASIC = 77] = "M5STACK_COREBASIC", e[e.M5STACK_CORE2 = 78] = "M5STACK_CORE2", e[e.RPI_PICO2 = 79] = "RPI_PICO2", e[e.M5STACK_CORES3 = 80] = "M5STACK_CORES3", e[e.SEEED_XIAO_S3 = 81] = "SEEED_XIAO_S3", e[e.MS24SF1 = 82] = "MS24SF1", e[e.TLORA_C6 = 83] = "TLORA_C6", e[e.WISMESH_TAP = 84] = "WISMESH_TAP", e[e.ROUTASTIC = 85] = "ROUTASTIC", e[e.MESH_TAB = 86] = "MESH_TAB", e[e.MESHLINK = 87] = "MESHLINK", e[e.XIAO_NRF52_KIT = 88] = "XIAO_NRF52_KIT", e[e.THINKNODE_M1 = 89] = "THINKNODE_M1", e[e.THINKNODE_M2 = 90] = "THINKNODE_M2", e[e.T_ETH_ELITE = 91] = "T_ETH_ELITE", e[e.HELTEC_SENSOR_HUB = 92] = "HELTEC_SENSOR_HUB", e[e.RESERVED_FRIED_CHICKEN = 93] = "RESERVED_FRIED_CHICKEN", e[e.HELTEC_MESH_POCKET = 94] = "HELTEC_MESH_POCKET", e[e.SEEED_SOLAR_NODE = 95] = "SEEED_SOLAR_NODE", e[e.NOMADSTAR_METEOR_PRO = 96] = "NOMADSTAR_METEOR_PRO", e[e.CROWPANEL = 97] = "CROWPANEL", e[e.LINK_32 = 98] = "LINK_32", e[e.SEEED_WIO_TRACKER_L1 = 99] = "SEEED_WIO_TRACKER_L1", e[e.SEEED_WIO_TRACKER_L1_EINK = 100] = "SEEED_WIO_TRACKER_L1_EINK", e[e.QWANTZ_TINY_ARMS = 101] = "QWANTZ_TINY_ARMS", e[e.T_DECK_PRO = 102] = "T_DECK_PRO", e[e.T_LORA_PAGER = 103] = "T_LORA_PAGER", e[e.GAT562_MESH_TRIAL_TRACKER = 104] = "GAT562_MESH_TRIAL_TRACKER", e[e.PRIVATE_HW = 255] = "PRIVATE_HW", e;
}({}), To = /* @__PURE__ */ b(A, 0), Eo = /* @__PURE__ */ function(e) {
	return e[e.ZERO = 0] = "ZERO", e[e.DATA_PAYLOAD_LEN = 233] = "DATA_PAYLOAD_LEN", e;
}({}), Do = /* @__PURE__ */ b(A, 1), Oo = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.TX_WATCHDOG = 1] = "TX_WATCHDOG", e[e.SLEEP_ENTER_WAIT = 2] = "SLEEP_ENTER_WAIT", e[e.NO_RADIO = 3] = "NO_RADIO", e[e.UNSPECIFIED = 4] = "UNSPECIFIED", e[e.UBLOX_UNIT_FAILED = 5] = "UBLOX_UNIT_FAILED", e[e.NO_AXP192 = 6] = "NO_AXP192", e[e.INVALID_RADIO_SETTING = 7] = "INVALID_RADIO_SETTING", e[e.TRANSMIT_FAILED = 8] = "TRANSMIT_FAILED", e[e.BROWNOUT = 9] = "BROWNOUT", e[e.SX1262_FAILURE = 10] = "SX1262_FAILURE", e[e.RADIO_SPI_BUG = 11] = "RADIO_SPI_BUG", e[e.FLASH_CORRUPTION_RECOVERABLE = 12] = "FLASH_CORRUPTION_RECOVERABLE", e[e.FLASH_CORRUPTION_UNRECOVERABLE = 13] = "FLASH_CORRUPTION_UNRECOVERABLE", e;
}({}), ko = /* @__PURE__ */ b(A, 2), Ao = /* @__PURE__ */ function(e) {
	return e[e.EXCLUDED_NONE = 0] = "EXCLUDED_NONE", e[e.MQTT_CONFIG = 1] = "MQTT_CONFIG", e[e.SERIAL_CONFIG = 2] = "SERIAL_CONFIG", e[e.EXTNOTIF_CONFIG = 4] = "EXTNOTIF_CONFIG", e[e.STOREFORWARD_CONFIG = 8] = "STOREFORWARD_CONFIG", e[e.RANGETEST_CONFIG = 16] = "RANGETEST_CONFIG", e[e.TELEMETRY_CONFIG = 32] = "TELEMETRY_CONFIG", e[e.CANNEDMSG_CONFIG = 64] = "CANNEDMSG_CONFIG", e[e.AUDIO_CONFIG = 128] = "AUDIO_CONFIG", e[e.REMOTEHARDWARE_CONFIG = 256] = "REMOTEHARDWARE_CONFIG", e[e.NEIGHBORINFO_CONFIG = 512] = "NEIGHBORINFO_CONFIG", e[e.AMBIENTLIGHTING_CONFIG = 1024] = "AMBIENTLIGHTING_CONFIG", e[e.DETECTIONSENSOR_CONFIG = 2048] = "DETECTIONSENSOR_CONFIG", e[e.PAXCOUNTER_CONFIG = 4096] = "PAXCOUNTER_CONFIG", e[e.BLUETOOTH_CONFIG = 8192] = "BLUETOOTH_CONFIG", e[e.NETWORK_CONFIG = 16384] = "NETWORK_CONFIG", e;
}({}), jo = /* @__PURE__ */ b(A, 3), j = p({
	AdminMessageSchema: () => Mo,
	AdminMessage_BackupLocation: () => Ro,
	AdminMessage_BackupLocationSchema: () => zo,
	AdminMessage_ConfigType: () => Po,
	AdminMessage_ConfigTypeSchema: () => Fo,
	AdminMessage_InputEventSchema: () => No,
	AdminMessage_ModuleConfigType: () => Io,
	AdminMessage_ModuleConfigTypeSchema: () => Lo,
	HamParametersSchema: () => Bo,
	KeyVerificationAdminSchema: () => Uo,
	KeyVerificationAdmin_MessageType: () => Wo,
	KeyVerificationAdmin_MessageTypeSchema: () => Go,
	NodeRemoteHardwarePinsResponseSchema: () => Vo,
	SharedContactSchema: () => Ho,
	file_admin: () => M
}), M = /* @__PURE__ */ S("CgthZG1pbi5wcm90bxIKbWVzaHRhc3RpYyLWGAoMQWRtaW5NZXNzYWdlEhcKD3Nlc3Npb25fcGFzc2tleRhlIAEoDBIdChNnZXRfY2hhbm5lbF9yZXF1ZXN0GAEgASgNSAASMwoUZ2V0X2NoYW5uZWxfcmVzcG9uc2UYAiABKAsyEy5tZXNodGFzdGljLkNoYW5uZWxIABIbChFnZXRfb3duZXJfcmVxdWVzdBgDIAEoCEgAEi4KEmdldF9vd25lcl9yZXNwb25zZRgEIAEoCzIQLm1lc2h0YXN0aWMuVXNlckgAEkEKEmdldF9jb25maWdfcmVxdWVzdBgFIAEoDjIjLm1lc2h0YXN0aWMuQWRtaW5NZXNzYWdlLkNvbmZpZ1R5cGVIABIxChNnZXRfY29uZmlnX3Jlc3BvbnNlGAYgASgLMhIubWVzaHRhc3RpYy5Db25maWdIABJOChlnZXRfbW9kdWxlX2NvbmZpZ19yZXF1ZXN0GAcgASgOMikubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuTW9kdWxlQ29uZmlnVHlwZUgAEj4KGmdldF9tb2R1bGVfY29uZmlnX3Jlc3BvbnNlGAggASgLMhgubWVzaHRhc3RpYy5Nb2R1bGVDb25maWdIABI0CipnZXRfY2FubmVkX21lc3NhZ2VfbW9kdWxlX21lc3NhZ2VzX3JlcXVlc3QYCiABKAhIABI1CitnZXRfY2FubmVkX21lc3NhZ2VfbW9kdWxlX21lc3NhZ2VzX3Jlc3BvbnNlGAsgASgJSAASJQobZ2V0X2RldmljZV9tZXRhZGF0YV9yZXF1ZXN0GAwgASgISAASQgocZ2V0X2RldmljZV9tZXRhZGF0YV9yZXNwb25zZRgNIAEoCzIaLm1lc2h0YXN0aWMuRGV2aWNlTWV0YWRhdGFIABIeChRnZXRfcmluZ3RvbmVfcmVxdWVzdBgOIAEoCEgAEh8KFWdldF9yaW5ndG9uZV9yZXNwb25zZRgPIAEoCUgAEi4KJGdldF9kZXZpY2VfY29ubmVjdGlvbl9zdGF0dXNfcmVxdWVzdBgQIAEoCEgAElMKJWdldF9kZXZpY2VfY29ubmVjdGlvbl9zdGF0dXNfcmVzcG9uc2UYESABKAsyIi5tZXNodGFzdGljLkRldmljZUNvbm5lY3Rpb25TdGF0dXNIABIxCgxzZXRfaGFtX21vZGUYEiABKAsyGS5tZXNodGFzdGljLkhhbVBhcmFtZXRlcnNIABIvCiVnZXRfbm9kZV9yZW1vdGVfaGFyZHdhcmVfcGluc19yZXF1ZXN0GBMgASgISAASXAomZ2V0X25vZGVfcmVtb3RlX2hhcmR3YXJlX3BpbnNfcmVzcG9uc2UYFCABKAsyKi5tZXNodGFzdGljLk5vZGVSZW1vdGVIYXJkd2FyZVBpbnNSZXNwb25zZUgAEiAKFmVudGVyX2RmdV9tb2RlX3JlcXVlc3QYFSABKAhIABIdChNkZWxldGVfZmlsZV9yZXF1ZXN0GBYgASgJSAASEwoJc2V0X3NjYWxlGBcgASgNSAASRQoSYmFja3VwX3ByZWZlcmVuY2VzGBggASgOMicubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuQmFja3VwTG9jYXRpb25IABJGChNyZXN0b3JlX3ByZWZlcmVuY2VzGBkgASgOMicubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuQmFja3VwTG9jYXRpb25IABJMChlyZW1vdmVfYmFja3VwX3ByZWZlcmVuY2VzGBogASgOMicubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuQmFja3VwTG9jYXRpb25IABI/ChBzZW5kX2lucHV0X2V2ZW50GBsgASgLMiMubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuSW5wdXRFdmVudEgAEiUKCXNldF9vd25lchggIAEoCzIQLm1lc2h0YXN0aWMuVXNlckgAEioKC3NldF9jaGFubmVsGCEgASgLMhMubWVzaHRhc3RpYy5DaGFubmVsSAASKAoKc2V0X2NvbmZpZxgiIAEoCzISLm1lc2h0YXN0aWMuQ29uZmlnSAASNQoRc2V0X21vZHVsZV9jb25maWcYIyABKAsyGC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZ0gAEiwKInNldF9jYW5uZWRfbWVzc2FnZV9tb2R1bGVfbWVzc2FnZXMYJCABKAlIABIeChRzZXRfcmluZ3RvbmVfbWVzc2FnZRglIAEoCUgAEhsKEXJlbW92ZV9ieV9ub2RlbnVtGCYgASgNSAASGwoRc2V0X2Zhdm9yaXRlX25vZGUYJyABKA1IABIeChRyZW1vdmVfZmF2b3JpdGVfbm9kZRgoIAEoDUgAEjIKEnNldF9maXhlZF9wb3NpdGlvbhgpIAEoCzIULm1lc2h0YXN0aWMuUG9zaXRpb25IABIfChVyZW1vdmVfZml4ZWRfcG9zaXRpb24YKiABKAhIABIXCg1zZXRfdGltZV9vbmx5GCsgASgHSAASHwoVZ2V0X3VpX2NvbmZpZ19yZXF1ZXN0GCwgASgISAASPAoWZ2V0X3VpX2NvbmZpZ19yZXNwb25zZRgtIAEoCzIaLm1lc2h0YXN0aWMuRGV2aWNlVUlDb25maWdIABI1Cg9zdG9yZV91aV9jb25maWcYLiABKAsyGi5tZXNodGFzdGljLkRldmljZVVJQ29uZmlnSAASGgoQc2V0X2lnbm9yZWRfbm9kZRgvIAEoDUgAEh0KE3JlbW92ZV9pZ25vcmVkX25vZGUYMCABKA1IABIdChNiZWdpbl9lZGl0X3NldHRpbmdzGEAgASgISAASHgoUY29tbWl0X2VkaXRfc2V0dGluZ3MYQSABKAhIABIwCgthZGRfY29udGFjdBhCIAEoCzIZLm1lc2h0YXN0aWMuU2hhcmVkQ29udGFjdEgAEjwKEGtleV92ZXJpZmljYXRpb24YQyABKAsyIC5tZXNodGFzdGljLktleVZlcmlmaWNhdGlvbkFkbWluSAASHgoUZmFjdG9yeV9yZXNldF9kZXZpY2UYXiABKAVIABIcChJyZWJvb3Rfb3RhX3NlY29uZHMYXyABKAVIABIYCg5leGl0X3NpbXVsYXRvchhgIAEoCEgAEhgKDnJlYm9vdF9zZWNvbmRzGGEgASgFSAASGgoQc2h1dGRvd25fc2Vjb25kcxhiIAEoBUgAEh4KFGZhY3RvcnlfcmVzZXRfY29uZmlnGGMgASgFSAASFgoMbm9kZWRiX3Jlc2V0GGQgASgFSAAaUwoKSW5wdXRFdmVudBISCgpldmVudF9jb2RlGAEgASgNEg8KB2tiX2NoYXIYAiABKA0SDwoHdG91Y2hfeBgDIAEoDRIPCgd0b3VjaF95GAQgASgNItYBCgpDb25maWdUeXBlEhEKDURFVklDRV9DT05GSUcQABITCg9QT1NJVElPTl9DT05GSUcQARIQCgxQT1dFUl9DT05GSUcQAhISCg5ORVRXT1JLX0NPTkZJRxADEhIKDkRJU1BMQVlfQ09ORklHEAQSDwoLTE9SQV9DT05GSUcQBRIUChBCTFVFVE9PVEhfQ09ORklHEAYSEwoPU0VDVVJJVFlfQ09ORklHEAcSFQoRU0VTU0lPTktFWV9DT05GSUcQCBITCg9ERVZJQ0VVSV9DT05GSUcQCSK7AgoQTW9kdWxlQ29uZmlnVHlwZRIPCgtNUVRUX0NPTkZJRxAAEhEKDVNFUklBTF9DT05GSUcQARITCg9FWFROT1RJRl9DT05GSUcQAhIXChNTVE9SRUZPUldBUkRfQ09ORklHEAMSFAoQUkFOR0VURVNUX0NPTkZJRxAEEhQKEFRFTEVNRVRSWV9DT05GSUcQBRIUChBDQU5ORURNU0dfQ09ORklHEAYSEAoMQVVESU9fQ09ORklHEAcSGQoVUkVNT1RFSEFSRFdBUkVfQ09ORklHEAgSFwoTTkVJR0hCT1JJTkZPX0NPTkZJRxAJEhoKFkFNQklFTlRMSUdIVElOR19DT05GSUcQChIaChZERVRFQ1RJT05TRU5TT1JfQ09ORklHEAsSFQoRUEFYQ09VTlRFUl9DT05GSUcQDCIjCg5CYWNrdXBMb2NhdGlvbhIJCgVGTEFTSBAAEgYKAlNEEAFCEQoPcGF5bG9hZF92YXJpYW50IlsKDUhhbVBhcmFtZXRlcnMSEQoJY2FsbF9zaWduGAEgASgJEhAKCHR4X3Bvd2VyGAIgASgFEhEKCWZyZXF1ZW5jeRgDIAEoAhISCgpzaG9ydF9uYW1lGAQgASgJImYKHk5vZGVSZW1vdGVIYXJkd2FyZVBpbnNSZXNwb25zZRJEChlub2RlX3JlbW90ZV9oYXJkd2FyZV9waW5zGAEgAygLMiEubWVzaHRhc3RpYy5Ob2RlUmVtb3RlSGFyZHdhcmVQaW4iWAoNU2hhcmVkQ29udGFjdBIQCghub2RlX251bRgBIAEoDRIeCgR1c2VyGAIgASgLMhAubWVzaHRhc3RpYy5Vc2VyEhUKDXNob3VsZF9pZ25vcmUYAyABKAginAIKFEtleVZlcmlmaWNhdGlvbkFkbWluEkIKDG1lc3NhZ2VfdHlwZRgBIAEoDjIsLm1lc2h0YXN0aWMuS2V5VmVyaWZpY2F0aW9uQWRtaW4uTWVzc2FnZVR5cGUSFgoOcmVtb3RlX25vZGVudW0YAiABKA0SDQoFbm9uY2UYAyABKAQSHAoPc2VjdXJpdHlfbnVtYmVyGAQgASgNSACIAQEiZwoLTWVzc2FnZVR5cGUSGQoVSU5JVElBVEVfVkVSSUZJQ0FUSU9OEAASGwoXUFJPVklERV9TRUNVUklUWV9OVU1CRVIQARINCglET19WRVJJRlkQAhIRCg1ET19OT1RfVkVSSUZZEANCEgoQX3NlY3VyaXR5X251bWJlckJgChNjb20uZ2Vla3N2aWxsZS5tZXNoQgtBZG1pblByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [
	Lr,
	w,
	Ni,
	A,
	T,
	Ur
]), Mo = /* @__PURE__ */ C(M, 0), No = /* @__PURE__ */ C(M, 0, 0), Po = /* @__PURE__ */ function(e) {
	return e[e.DEVICE_CONFIG = 0] = "DEVICE_CONFIG", e[e.POSITION_CONFIG = 1] = "POSITION_CONFIG", e[e.POWER_CONFIG = 2] = "POWER_CONFIG", e[e.NETWORK_CONFIG = 3] = "NETWORK_CONFIG", e[e.DISPLAY_CONFIG = 4] = "DISPLAY_CONFIG", e[e.LORA_CONFIG = 5] = "LORA_CONFIG", e[e.BLUETOOTH_CONFIG = 6] = "BLUETOOTH_CONFIG", e[e.SECURITY_CONFIG = 7] = "SECURITY_CONFIG", e[e.SESSIONKEY_CONFIG = 8] = "SESSIONKEY_CONFIG", e[e.DEVICEUI_CONFIG = 9] = "DEVICEUI_CONFIG", e;
}({}), Fo = /* @__PURE__ */ b(M, 0, 0), Io = /* @__PURE__ */ function(e) {
	return e[e.MQTT_CONFIG = 0] = "MQTT_CONFIG", e[e.SERIAL_CONFIG = 1] = "SERIAL_CONFIG", e[e.EXTNOTIF_CONFIG = 2] = "EXTNOTIF_CONFIG", e[e.STOREFORWARD_CONFIG = 3] = "STOREFORWARD_CONFIG", e[e.RANGETEST_CONFIG = 4] = "RANGETEST_CONFIG", e[e.TELEMETRY_CONFIG = 5] = "TELEMETRY_CONFIG", e[e.CANNEDMSG_CONFIG = 6] = "CANNEDMSG_CONFIG", e[e.AUDIO_CONFIG = 7] = "AUDIO_CONFIG", e[e.REMOTEHARDWARE_CONFIG = 8] = "REMOTEHARDWARE_CONFIG", e[e.NEIGHBORINFO_CONFIG = 9] = "NEIGHBORINFO_CONFIG", e[e.AMBIENTLIGHTING_CONFIG = 10] = "AMBIENTLIGHTING_CONFIG", e[e.DETECTIONSENSOR_CONFIG = 11] = "DETECTIONSENSOR_CONFIG", e[e.PAXCOUNTER_CONFIG = 12] = "PAXCOUNTER_CONFIG", e;
}({}), Lo = /* @__PURE__ */ b(M, 0, 1), Ro = /* @__PURE__ */ function(e) {
	return e[e.FLASH = 0] = "FLASH", e[e.SD = 1] = "SD", e;
}({}), zo = /* @__PURE__ */ b(M, 0, 2), Bo = /* @__PURE__ */ C(M, 1), Vo = /* @__PURE__ */ C(M, 2), Ho = /* @__PURE__ */ C(M, 3), Uo = /* @__PURE__ */ C(M, 4), Wo = /* @__PURE__ */ function(e) {
	return e[e.INITIATE_VERIFICATION = 0] = "INITIATE_VERIFICATION", e[e.PROVIDE_SECURITY_NUMBER = 1] = "PROVIDE_SECURITY_NUMBER", e[e.DO_VERIFY = 2] = "DO_VERIFY", e[e.DO_NOT_VERIFY = 3] = "DO_NOT_VERIFY", e;
}({}), Go = /* @__PURE__ */ b(M, 4, 0), Ko = p({
	ChannelSetSchema: () => Jo,
	file_apponly: () => qo
}), qo = /* @__PURE__ */ S("Cg1hcHBvbmx5LnByb3RvEgptZXNodGFzdGljIm8KCkNoYW5uZWxTZXQSLQoIc2V0dGluZ3MYASADKAsyGy5tZXNodGFzdGljLkNoYW5uZWxTZXR0aW5ncxIyCgtsb3JhX2NvbmZpZxgCIAEoCzIdLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWdCYgoTY29tLmdlZWtzdmlsbGUubWVzaEINQXBwT25seVByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [Lr, w]), Jo = /* @__PURE__ */ C(qo, 0), Yo = p({
	ContactSchema: () => ts,
	GeoChatSchema: () => Qo,
	GroupSchema: () => $o,
	MemberRole: () => as,
	MemberRoleSchema: () => os,
	PLISchema: () => ns,
	StatusSchema: () => es,
	TAKPacketSchema: () => Zo,
	Team: () => rs,
	TeamSchema: () => is,
	file_atak: () => Xo
}), Xo = /* @__PURE__ */ S("CgphdGFrLnByb3RvEgptZXNodGFzdGljIvgBCglUQUtQYWNrZXQSFQoNaXNfY29tcHJlc3NlZBgBIAEoCBIkCgdjb250YWN0GAIgASgLMhMubWVzaHRhc3RpYy5Db250YWN0EiAKBWdyb3VwGAMgASgLMhEubWVzaHRhc3RpYy5Hcm91cBIiCgZzdGF0dXMYBCABKAsyEi5tZXNodGFzdGljLlN0YXR1cxIeCgNwbGkYBSABKAsyDy5tZXNodGFzdGljLlBMSUgAEiMKBGNoYXQYBiABKAsyEy5tZXNodGFzdGljLkdlb0NoYXRIABIQCgZkZXRhaWwYByABKAxIAEIRCg9wYXlsb2FkX3ZhcmlhbnQiXAoHR2VvQ2hhdBIPCgdtZXNzYWdlGAEgASgJEg8KAnRvGAIgASgJSACIAQESGAoLdG9fY2FsbHNpZ24YAyABKAlIAYgBAUIFCgNfdG9CDgoMX3RvX2NhbGxzaWduIk0KBUdyb3VwEiQKBHJvbGUYASABKA4yFi5tZXNodGFzdGljLk1lbWJlclJvbGUSHgoEdGVhbRgCIAEoDjIQLm1lc2h0YXN0aWMuVGVhbSIZCgZTdGF0dXMSDwoHYmF0dGVyeRgBIAEoDSI0CgdDb250YWN0EhAKCGNhbGxzaWduGAEgASgJEhcKD2RldmljZV9jYWxsc2lnbhgCIAEoCSJfCgNQTEkSEgoKbGF0aXR1ZGVfaRgBIAEoDxITCgtsb25naXR1ZGVfaRgCIAEoDxIQCghhbHRpdHVkZRgDIAEoBRINCgVzcGVlZBgEIAEoDRIOCgZjb3Vyc2UYBSABKA0qwAEKBFRlYW0SFAoQVW5zcGVjaWZlZF9Db2xvchAAEgkKBVdoaXRlEAESCgoGWWVsbG93EAISCgoGT3JhbmdlEAMSCwoHTWFnZW50YRAEEgcKA1JlZBAFEgoKBk1hcm9vbhAGEgoKBlB1cnBsZRAHEg0KCURhcmtfQmx1ZRAIEggKBEJsdWUQCRIICgRDeWFuEAoSCAoEVGVhbBALEgkKBUdyZWVuEAwSDgoKRGFya19HcmVlbhANEgkKBUJyb3duEA4qfwoKTWVtYmVyUm9sZRIOCgpVbnNwZWNpZmVkEAASDgoKVGVhbU1lbWJlchABEgwKCFRlYW1MZWFkEAISBgoCSFEQAxIKCgZTbmlwZXIQBBIJCgVNZWRpYxAFEhMKD0ZvcndhcmRPYnNlcnZlchAGEgcKA1JUTxAHEgYKAks5EAhCXwoTY29tLmdlZWtzdmlsbGUubWVzaEIKQVRBS1Byb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM"), Zo = /* @__PURE__ */ C(Xo, 0), Qo = /* @__PURE__ */ C(Xo, 1), $o = /* @__PURE__ */ C(Xo, 2), es = /* @__PURE__ */ C(Xo, 3), ts = /* @__PURE__ */ C(Xo, 4), ns = /* @__PURE__ */ C(Xo, 5), rs = /* @__PURE__ */ function(e) {
	return e[e.Unspecifed_Color = 0] = "Unspecifed_Color", e[e.White = 1] = "White", e[e.Yellow = 2] = "Yellow", e[e.Orange = 3] = "Orange", e[e.Magenta = 4] = "Magenta", e[e.Red = 5] = "Red", e[e.Maroon = 6] = "Maroon", e[e.Purple = 7] = "Purple", e[e.Dark_Blue = 8] = "Dark_Blue", e[e.Blue = 9] = "Blue", e[e.Cyan = 10] = "Cyan", e[e.Teal = 11] = "Teal", e[e.Green = 12] = "Green", e[e.Dark_Green = 13] = "Dark_Green", e[e.Brown = 14] = "Brown", e;
}({}), is = /* @__PURE__ */ b(Xo, 0), as = /* @__PURE__ */ function(e) {
	return e[e.Unspecifed = 0] = "Unspecifed", e[e.TeamMember = 1] = "TeamMember", e[e.TeamLead = 2] = "TeamLead", e[e.HQ = 3] = "HQ", e[e.Sniper = 4] = "Sniper", e[e.Medic = 5] = "Medic", e[e.ForwardObserver = 6] = "ForwardObserver", e[e.RTO = 7] = "RTO", e[e.K9 = 8] = "K9", e;
}({}), os = /* @__PURE__ */ b(Xo, 1), ss = p({
	CannedMessageModuleConfigSchema: () => ls,
	file_cannedmessages: () => cs
}), cs = /* @__PURE__ */ S("ChRjYW5uZWRtZXNzYWdlcy5wcm90bxIKbWVzaHRhc3RpYyItChlDYW5uZWRNZXNzYWdlTW9kdWxlQ29uZmlnEhAKCG1lc3NhZ2VzGAEgASgJQm4KE2NvbS5nZWVrc3ZpbGxlLm1lc2hCGUNhbm5lZE1lc3NhZ2VDb25maWdQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), ls = /* @__PURE__ */ C(cs, 0), us = p({
	LocalConfigSchema: () => fs,
	LocalModuleConfigSchema: () => ps,
	file_localonly: () => ds
}), ds = /* @__PURE__ */ S("Cg9sb2NhbG9ubHkucHJvdG8SCm1lc2h0YXN0aWMisgMKC0xvY2FsQ29uZmlnEi8KBmRldmljZRgBIAEoCzIfLm1lc2h0YXN0aWMuQ29uZmlnLkRldmljZUNvbmZpZxIzCghwb3NpdGlvbhgCIAEoCzIhLm1lc2h0YXN0aWMuQ29uZmlnLlBvc2l0aW9uQ29uZmlnEi0KBXBvd2VyGAMgASgLMh4ubWVzaHRhc3RpYy5Db25maWcuUG93ZXJDb25maWcSMQoHbmV0d29yaxgEIAEoCzIgLm1lc2h0YXN0aWMuQ29uZmlnLk5ldHdvcmtDb25maWcSMQoHZGlzcGxheRgFIAEoCzIgLm1lc2h0YXN0aWMuQ29uZmlnLkRpc3BsYXlDb25maWcSKwoEbG9yYRgGIAEoCzIdLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWcSNQoJYmx1ZXRvb3RoGAcgASgLMiIubWVzaHRhc3RpYy5Db25maWcuQmx1ZXRvb3RoQ29uZmlnEg8KB3ZlcnNpb24YCCABKA0SMwoIc2VjdXJpdHkYCSABKAsyIS5tZXNodGFzdGljLkNvbmZpZy5TZWN1cml0eUNvbmZpZyL7BgoRTG9jYWxNb2R1bGVDb25maWcSMQoEbXF0dBgBIAEoCzIjLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk1RVFRDb25maWcSNQoGc2VyaWFsGAIgASgLMiUubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuU2VyaWFsQ29uZmlnElIKFWV4dGVybmFsX25vdGlmaWNhdGlvbhgDIAEoCzIzLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkV4dGVybmFsTm90aWZpY2F0aW9uQ29uZmlnEkIKDXN0b3JlX2ZvcndhcmQYBCABKAsyKy5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TdG9yZUZvcndhcmRDb25maWcSPAoKcmFuZ2VfdGVzdBgFIAEoCzIoLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlJhbmdlVGVzdENvbmZpZxI7Cgl0ZWxlbWV0cnkYBiABKAsyKC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5UZWxlbWV0cnlDb25maWcSRAoOY2FubmVkX21lc3NhZ2UYByABKAsyLC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5DYW5uZWRNZXNzYWdlQ29uZmlnEjMKBWF1ZGlvGAkgASgLMiQubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuQXVkaW9Db25maWcSRgoPcmVtb3RlX2hhcmR3YXJlGAogASgLMi0ubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuUmVtb3RlSGFyZHdhcmVDb25maWcSQgoNbmVpZ2hib3JfaW5mbxgLIAEoCzIrLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk5laWdoYm9ySW5mb0NvbmZpZxJIChBhbWJpZW50X2xpZ2h0aW5nGAwgASgLMi4ubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuQW1iaWVudExpZ2h0aW5nQ29uZmlnEkgKEGRldGVjdGlvbl9zZW5zb3IYDSABKAsyLi5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5EZXRlY3Rpb25TZW5zb3JDb25maWcSPQoKcGF4Y291bnRlchgOIAEoCzIpLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlBheGNvdW50ZXJDb25maWcSDwoHdmVyc2lvbhgIIAEoDUJkChNjb20uZ2Vla3N2aWxsZS5tZXNoQg9Mb2NhbE9ubHlQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z", [w, T]), fs = /* @__PURE__ */ C(ds, 0), ps = /* @__PURE__ */ C(ds, 1), ms = p({
	DeviceProfileSchema: () => gs,
	file_clientonly: () => hs
}), hs = /* @__PURE__ */ S("ChBjbGllbnRvbmx5LnByb3RvEgptZXNodGFzdGljIqkDCg1EZXZpY2VQcm9maWxlEhYKCWxvbmdfbmFtZRgBIAEoCUgAiAEBEhcKCnNob3J0X25hbWUYAiABKAlIAYgBARIYCgtjaGFubmVsX3VybBgDIAEoCUgCiAEBEiwKBmNvbmZpZxgEIAEoCzIXLm1lc2h0YXN0aWMuTG9jYWxDb25maWdIA4gBARI5Cg1tb2R1bGVfY29uZmlnGAUgASgLMh0ubWVzaHRhc3RpYy5Mb2NhbE1vZHVsZUNvbmZpZ0gEiAEBEjEKDmZpeGVkX3Bvc2l0aW9uGAYgASgLMhQubWVzaHRhc3RpYy5Qb3NpdGlvbkgFiAEBEhUKCHJpbmd0b25lGAcgASgJSAaIAQESHAoPY2FubmVkX21lc3NhZ2VzGAggASgJSAeIAQFCDAoKX2xvbmdfbmFtZUINCgtfc2hvcnRfbmFtZUIOCgxfY2hhbm5lbF91cmxCCQoHX2NvbmZpZ0IQCg5fbW9kdWxlX2NvbmZpZ0IRCg9fZml4ZWRfcG9zaXRpb25CCwoJX3Jpbmd0b25lQhIKEF9jYW5uZWRfbWVzc2FnZXNCZQoTY29tLmdlZWtzdmlsbGUubWVzaEIQQ2xpZW50T25seVByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [ds, A]), gs = /* @__PURE__ */ C(hs, 0), _s = p({
	MapReportSchema: () => bs,
	ServiceEnvelopeSchema: () => ys,
	file_mqtt: () => vs
}), vs = /* @__PURE__ */ S("CgptcXR0LnByb3RvEgptZXNodGFzdGljImEKD1NlcnZpY2VFbnZlbG9wZRImCgZwYWNrZXQYASABKAsyFi5tZXNodGFzdGljLk1lc2hQYWNrZXQSEgoKY2hhbm5lbF9pZBgCIAEoCRISCgpnYXRld2F5X2lkGAMgASgJIt8DCglNYXBSZXBvcnQSEQoJbG9uZ19uYW1lGAEgASgJEhIKCnNob3J0X25hbWUYAiABKAkSMgoEcm9sZRgDIAEoDjIkLm1lc2h0YXN0aWMuQ29uZmlnLkRldmljZUNvbmZpZy5Sb2xlEisKCGh3X21vZGVsGAQgASgOMhkubWVzaHRhc3RpYy5IYXJkd2FyZU1vZGVsEhgKEGZpcm13YXJlX3ZlcnNpb24YBSABKAkSOAoGcmVnaW9uGAYgASgOMigubWVzaHRhc3RpYy5Db25maWcuTG9SYUNvbmZpZy5SZWdpb25Db2RlEj8KDG1vZGVtX3ByZXNldBgHIAEoDjIpLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWcuTW9kZW1QcmVzZXQSGwoTaGFzX2RlZmF1bHRfY2hhbm5lbBgIIAEoCBISCgpsYXRpdHVkZV9pGAkgASgPEhMKC2xvbmdpdHVkZV9pGAogASgPEhAKCGFsdGl0dWRlGAsgASgFEhoKEnBvc2l0aW9uX3ByZWNpc2lvbhgMIAEoDRIeChZudW1fb25saW5lX2xvY2FsX25vZGVzGA0gASgNEiEKGWhhc19vcHRlZF9yZXBvcnRfbG9jYXRpb24YDiABKAhCXwoTY29tLmdlZWtzdmlsbGUubWVzaEIKTVFUVFByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [w, A]), ys = /* @__PURE__ */ C(vs, 0), bs = /* @__PURE__ */ C(vs, 1), xs = p({
	PaxcountSchema: () => Cs,
	file_paxcount: () => Ss
}), Ss = /* @__PURE__ */ S("Cg5wYXhjb3VudC5wcm90bxIKbWVzaHRhc3RpYyI1CghQYXhjb3VudBIMCgR3aWZpGAEgASgNEgsKA2JsZRgCIAEoDRIOCgZ1cHRpbWUYAyABKA1CYwoTY29tLmdlZWtzdmlsbGUubWVzaEIOUGF4Y291bnRQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), Cs = /* @__PURE__ */ C(Ss, 0), ws = p({
	PowerMonSchema: () => Es,
	PowerMon_State: () => Ds,
	PowerMon_StateSchema: () => Os,
	PowerStressMessageSchema: () => ks,
	PowerStressMessage_Opcode: () => As,
	PowerStressMessage_OpcodeSchema: () => js,
	file_powermon: () => Ts
}), Ts = /* @__PURE__ */ S("Cg5wb3dlcm1vbi5wcm90bxIKbWVzaHRhc3RpYyLgAQoIUG93ZXJNb24i0wEKBVN0YXRlEggKBE5vbmUQABIRCg1DUFVfRGVlcFNsZWVwEAESEgoOQ1BVX0xpZ2h0U2xlZXAQAhIMCghWZXh0MV9PbhAEEg0KCUxvcmFfUlhPbhAIEg0KCUxvcmFfVFhPbhAQEhEKDUxvcmFfUlhBY3RpdmUQIBIJCgVCVF9PbhBAEgsKBkxFRF9PbhCAARIOCglTY3JlZW5fT24QgAISEwoOU2NyZWVuX0RyYXdpbmcQgAQSDAoHV2lmaV9PbhCACBIPCgpHUFNfQWN0aXZlEIAQIv8CChJQb3dlclN0cmVzc01lc3NhZ2USMgoDY21kGAEgASgOMiUubWVzaHRhc3RpYy5Qb3dlclN0cmVzc01lc3NhZ2UuT3Bjb2RlEhMKC251bV9zZWNvbmRzGAIgASgCIp8CCgZPcGNvZGUSCQoFVU5TRVQQABIOCgpQUklOVF9JTkZPEAESDwoLRk9SQ0VfUVVJRVQQAhINCglFTkRfUVVJRVQQAxINCglTQ1JFRU5fT04QEBIOCgpTQ1JFRU5fT0ZGEBESDAoIQ1BVX0lETEUQIBIRCg1DUFVfREVFUFNMRUVQECESDgoKQ1BVX0ZVTExPThAiEgoKBkxFRF9PThAwEgsKB0xFRF9PRkYQMRIMCghMT1JBX09GRhBAEgsKB0xPUkFfVFgQQRILCgdMT1JBX1JYEEISCgoGQlRfT0ZGEFASCQoFQlRfT04QURIMCghXSUZJX09GRhBgEgsKB1dJRklfT04QYRILCgdHUFNfT0ZGEHASCgoGR1BTX09OEHFCYwoTY29tLmdlZWtzdmlsbGUubWVzaEIOUG93ZXJNb25Qcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), Es = /* @__PURE__ */ C(Ts, 0), Ds = /* @__PURE__ */ function(e) {
	return e[e.None = 0] = "None", e[e.CPU_DeepSleep = 1] = "CPU_DeepSleep", e[e.CPU_LightSleep = 2] = "CPU_LightSleep", e[e.Vext1_On = 4] = "Vext1_On", e[e.Lora_RXOn = 8] = "Lora_RXOn", e[e.Lora_TXOn = 16] = "Lora_TXOn", e[e.Lora_RXActive = 32] = "Lora_RXActive", e[e.BT_On = 64] = "BT_On", e[e.LED_On = 128] = "LED_On", e[e.Screen_On = 256] = "Screen_On", e[e.Screen_Drawing = 512] = "Screen_Drawing", e[e.Wifi_On = 1024] = "Wifi_On", e[e.GPS_Active = 2048] = "GPS_Active", e;
}({}), Os = /* @__PURE__ */ b(Ts, 0, 0), ks = /* @__PURE__ */ C(Ts, 1), As = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.PRINT_INFO = 1] = "PRINT_INFO", e[e.FORCE_QUIET = 2] = "FORCE_QUIET", e[e.END_QUIET = 3] = "END_QUIET", e[e.SCREEN_ON = 16] = "SCREEN_ON", e[e.SCREEN_OFF = 17] = "SCREEN_OFF", e[e.CPU_IDLE = 32] = "CPU_IDLE", e[e.CPU_DEEPSLEEP = 33] = "CPU_DEEPSLEEP", e[e.CPU_FULLON = 34] = "CPU_FULLON", e[e.LED_ON = 48] = "LED_ON", e[e.LED_OFF = 49] = "LED_OFF", e[e.LORA_OFF = 64] = "LORA_OFF", e[e.LORA_TX = 65] = "LORA_TX", e[e.LORA_RX = 66] = "LORA_RX", e[e.BT_OFF = 80] = "BT_OFF", e[e.BT_ON = 81] = "BT_ON", e[e.WIFI_OFF = 96] = "WIFI_OFF", e[e.WIFI_ON = 97] = "WIFI_ON", e[e.GPS_OFF = 112] = "GPS_OFF", e[e.GPS_ON = 113] = "GPS_ON", e;
}({}), js = /* @__PURE__ */ b(Ts, 1, 0), Ms = p({
	HardwareMessageSchema: () => Ps,
	HardwareMessage_Type: () => Fs,
	HardwareMessage_TypeSchema: () => Is,
	file_remote_hardware: () => Ns
}), Ns = /* @__PURE__ */ S("ChVyZW1vdGVfaGFyZHdhcmUucHJvdG8SCm1lc2h0YXN0aWMi1gEKD0hhcmR3YXJlTWVzc2FnZRIuCgR0eXBlGAEgASgOMiAubWVzaHRhc3RpYy5IYXJkd2FyZU1lc3NhZ2UuVHlwZRIRCglncGlvX21hc2sYAiABKAQSEgoKZ3Bpb192YWx1ZRgDIAEoBCJsCgRUeXBlEgkKBVVOU0VUEAASDwoLV1JJVEVfR1BJT1MQARIPCgtXQVRDSF9HUElPUxACEhEKDUdQSU9TX0NIQU5HRUQQAxIOCgpSRUFEX0dQSU9TEAQSFAoQUkVBRF9HUElPU19SRVBMWRAFQmMKE2NvbS5nZWVrc3ZpbGxlLm1lc2hCDlJlbW90ZUhhcmR3YXJlWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Ps = /* @__PURE__ */ C(Ns, 0), Fs = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.WRITE_GPIOS = 1] = "WRITE_GPIOS", e[e.WATCH_GPIOS = 2] = "WATCH_GPIOS", e[e.GPIOS_CHANGED = 3] = "GPIOS_CHANGED", e[e.READ_GPIOS = 4] = "READ_GPIOS", e[e.READ_GPIOS_REPLY = 5] = "READ_GPIOS_REPLY", e;
}({}), Is = /* @__PURE__ */ b(Ns, 0, 0), Ls = p({
	RTTTLConfigSchema: () => zs,
	file_rtttl: () => Rs
}), Rs = /* @__PURE__ */ S("CgtydHR0bC5wcm90bxIKbWVzaHRhc3RpYyIfCgtSVFRUTENvbmZpZxIQCghyaW5ndG9uZRgBIAEoCUJmChNjb20uZ2Vla3N2aWxsZS5tZXNoQhFSVFRUTENvbmZpZ1Byb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM"), zs = /* @__PURE__ */ C(Rs, 0), Bs = p({
	StoreAndForwardSchema: () => Hs,
	StoreAndForward_HeartbeatSchema: () => Gs,
	StoreAndForward_HistorySchema: () => Ws,
	StoreAndForward_RequestResponse: () => Ks,
	StoreAndForward_RequestResponseSchema: () => qs,
	StoreAndForward_StatisticsSchema: () => Us,
	file_storeforward: () => Vs
}), Vs = /* @__PURE__ */ S("ChJzdG9yZWZvcndhcmQucHJvdG8SCm1lc2h0YXN0aWMinAcKD1N0b3JlQW5kRm9yd2FyZBI3CgJychgBIAEoDjIrLm1lc2h0YXN0aWMuU3RvcmVBbmRGb3J3YXJkLlJlcXVlc3RSZXNwb25zZRI3CgVzdGF0cxgCIAEoCzImLm1lc2h0YXN0aWMuU3RvcmVBbmRGb3J3YXJkLlN0YXRpc3RpY3NIABI2CgdoaXN0b3J5GAMgASgLMiMubWVzaHRhc3RpYy5TdG9yZUFuZEZvcndhcmQuSGlzdG9yeUgAEjoKCWhlYXJ0YmVhdBgEIAEoCzIlLm1lc2h0YXN0aWMuU3RvcmVBbmRGb3J3YXJkLkhlYXJ0YmVhdEgAEg4KBHRleHQYBSABKAxIABrNAQoKU3RhdGlzdGljcxIWCg5tZXNzYWdlc190b3RhbBgBIAEoDRIWCg5tZXNzYWdlc19zYXZlZBgCIAEoDRIUCgxtZXNzYWdlc19tYXgYAyABKA0SDwoHdXBfdGltZRgEIAEoDRIQCghyZXF1ZXN0cxgFIAEoDRIYChByZXF1ZXN0c19oaXN0b3J5GAYgASgNEhEKCWhlYXJ0YmVhdBgHIAEoCBISCgpyZXR1cm5fbWF4GAggASgNEhUKDXJldHVybl93aW5kb3cYCSABKA0aSQoHSGlzdG9yeRIYChBoaXN0b3J5X21lc3NhZ2VzGAEgASgNEg4KBndpbmRvdxgCIAEoDRIUCgxsYXN0X3JlcXVlc3QYAyABKA0aLgoJSGVhcnRiZWF0Eg4KBnBlcmlvZBgBIAEoDRIRCglzZWNvbmRhcnkYAiABKA0ivAIKD1JlcXVlc3RSZXNwb25zZRIJCgVVTlNFVBAAEhAKDFJPVVRFUl9FUlJPUhABEhQKEFJPVVRFUl9IRUFSVEJFQVQQAhIPCgtST1VURVJfUElORxADEg8KC1JPVVRFUl9QT05HEAQSDwoLUk9VVEVSX0JVU1kQBRISCg5ST1VURVJfSElTVE9SWRAGEhAKDFJPVVRFUl9TVEFUUxAHEhYKElJPVVRFUl9URVhUX0RJUkVDVBAIEhkKFVJPVVRFUl9URVhUX0JST0FEQ0FTVBAJEhAKDENMSUVOVF9FUlJPUhBAEhIKDkNMSUVOVF9ISVNUT1JZEEESEAoMQ0xJRU5UX1NUQVRTEEISDwoLQ0xJRU5UX1BJTkcQQxIPCgtDTElFTlRfUE9ORxBEEhAKDENMSUVOVF9BQk9SVBBqQgkKB3ZhcmlhbnRCagoTY29tLmdlZWtzdmlsbGUubWVzaEIVU3RvcmVBbmRGb3J3YXJkUHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Hs = /* @__PURE__ */ C(Vs, 0), Us = /* @__PURE__ */ C(Vs, 0, 0), Ws = /* @__PURE__ */ C(Vs, 0, 1), Gs = /* @__PURE__ */ C(Vs, 0, 2), Ks = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.ROUTER_ERROR = 1] = "ROUTER_ERROR", e[e.ROUTER_HEARTBEAT = 2] = "ROUTER_HEARTBEAT", e[e.ROUTER_PING = 3] = "ROUTER_PING", e[e.ROUTER_PONG = 4] = "ROUTER_PONG", e[e.ROUTER_BUSY = 5] = "ROUTER_BUSY", e[e.ROUTER_HISTORY = 6] = "ROUTER_HISTORY", e[e.ROUTER_STATS = 7] = "ROUTER_STATS", e[e.ROUTER_TEXT_DIRECT = 8] = "ROUTER_TEXT_DIRECT", e[e.ROUTER_TEXT_BROADCAST = 9] = "ROUTER_TEXT_BROADCAST", e[e.CLIENT_ERROR = 64] = "CLIENT_ERROR", e[e.CLIENT_HISTORY = 65] = "CLIENT_HISTORY", e[e.CLIENT_STATS = 66] = "CLIENT_STATS", e[e.CLIENT_PING = 67] = "CLIENT_PING", e[e.CLIENT_PONG = 68] = "CLIENT_PONG", e[e.CLIENT_ABORT = 106] = "CLIENT_ABORT", e;
}({}), qs = /* @__PURE__ */ b(Vs, 0, 0), Js = {
	broadcastNum: 0xffffffff,
	minFwVer: 2.2
}, Ys = {
	reset: [0, 0],
	bold: [1, 22],
	dim: [2, 22],
	italic: [3, 23],
	underline: [4, 24],
	overline: [53, 55],
	inverse: [7, 27],
	hidden: [8, 28],
	strikethrough: [9, 29],
	black: [30, 39],
	red: [31, 39],
	green: [32, 39],
	yellow: [33, 39],
	blue: [34, 39],
	magenta: [35, 39],
	cyan: [36, 39],
	white: [37, 39],
	blackBright: [90, 39],
	redBright: [91, 39],
	greenBright: [92, 39],
	yellowBright: [93, 39],
	blueBright: [94, 39],
	magentaBright: [95, 39],
	cyanBright: [96, 39],
	whiteBright: [97, 39],
	bgBlack: [40, 49],
	bgRed: [41, 49],
	bgGreen: [42, 49],
	bgYellow: [43, 49],
	bgBlue: [44, 49],
	bgMagenta: [45, 49],
	bgCyan: [46, 49],
	bgWhite: [47, 49],
	bgBlackBright: [100, 49],
	bgRedBright: [101, 49],
	bgGreenBright: [102, 49],
	bgYellowBright: [103, 49],
	bgBlueBright: [104, 49],
	bgMagentaBright: [105, 49],
	bgCyanBright: [106, 49],
	bgWhiteBright: [107, 49]
};
function Xs(e, t, n, r = !1) {
	let i = String(t), a = (e, t) => `\u001b[${t[0]}m${e}\u001b[${t[1]}m`, o = (e, t) => t != null && typeof t == "string" ? a(e, Ys[t]) : t != null && Array.isArray(t) ? t.reduce((e, t) => o(e, t), e) : t != null && t[e.trim()] != null ? o(e, t[e.trim()]) : t != null && t["*"] != null ? o(e, t["*"]) : e;
	return i.replace(/{{(.+?)}}/g, (t, i) => {
		let s = n[i] == null ? r ? "" : t : String(n[i]);
		return e.stylePrettyLogs ? o(s, e?.prettyLogStyles?.[i] ?? null) + a("", Ys.reset) : s;
	});
}
function N(e, t = 2, n = 0) {
	return e != null && isNaN(e) ? "" : (e = e == null ? e : e + n, t === 2 ? e == null ? "--" : e < 10 ? "0" + e : e.toString() : e == null ? "---" : e < 10 ? "00" + e : e < 100 ? "0" + e : e.toString());
}
function Zs(e) {
	return {
		href: e.href,
		protocol: e.protocol,
		username: e.username,
		password: e.password,
		host: e.host,
		hostname: e.hostname,
		port: e.port,
		pathname: e.pathname,
		search: e.search,
		searchParams: [...e.searchParams].map(([e, t]) => ({
			key: e,
			value: t
		})),
		hash: e.hash,
		origin: e.origin
	};
}
var Qs = {
	getCallerStackFrame: tc,
	getErrorTrace: nc,
	getMeta: ec,
	transportJSON: cc,
	transportFormatted: sc,
	isBuffer: lc,
	isError: ic,
	prettyFormatLogObj: ac,
	prettyFormatErrorObj: oc
}, $s = {
	runtime: "Nodejs",
	runtimeVersion: process?.version,
	hostname: d.hostname ? (0, d.hostname)() : void 0
};
function ec(e, t, n, r, i, a) {
	return Object.assign({}, $s, {
		name: i,
		parentNames: a,
		date: /* @__PURE__ */ new Date(),
		logLevelId: e,
		logLevelName: t,
		path: r ? void 0 : tc(n)
	});
}
function tc(e, t = Error()) {
	return rc(t?.stack?.split("\n")?.filter((e) => e.includes("    at "))?.[e]);
}
function nc(e) {
	return e?.stack?.split("\n")?.reduce((e, t) => (t.includes("    at ") && e.push(rc(t)), e), []);
}
function rc(e) {
	let t = {
		fullFilePath: void 0,
		fileName: void 0,
		fileNameWithLine: void 0,
		fileColumn: void 0,
		fileLine: void 0,
		filePath: void 0,
		filePathWithLine: void 0,
		method: void 0
	};
	if (e != null && e.includes("    at ")) {
		e = e.replace(/^\s+at\s+/gm, "");
		let n = e.split(" ("), r = e?.slice(-1) === ")" ? e?.match(/\(([^)]+)\)/)?.[1] : e, i = r?.includes(":") ? r?.replace("file://", "")?.replace(process.cwd(), "")?.split(":") : void 0, a = i?.pop(), o = i?.pop(), s = i?.pop(), c = (0, d.normalize)(`${s}:${o}`), l = s?.split("/")?.pop(), u = `${l}:${o}`;
		s != null && s.length > 0 && (t.fullFilePath = r, t.fileName = l, t.fileNameWithLine = u, t.fileColumn = a, t.fileLine = o, t.filePath = s, t.filePathWithLine = c, t.method = n?.[1] == null ? void 0 : n?.[0]);
	}
	return t;
}
function ic(e) {
	return d.types?.isNativeError == null ? e instanceof Error : d.types.isNativeError(e);
}
function ac(e, t) {
	return e.reduce((e, n) => (ic(n) ? e.errors.push(oc(n, t)) : e.args.push(n), e), {
		args: [],
		errors: []
	});
}
function oc(e, t) {
	let n = nc(e).map((e) => Xs(t, t.prettyErrorStackTemplate, { ...e }, !0)), r = {
		errorName: ` ${e.name} `,
		errorMessage: Object.getOwnPropertyNames(e).reduce((t, n) => (n !== "stack" && t.push(e[n]), t), []).join(", "),
		errorStack: n.join("\n")
	};
	return Xs(t, t.prettyErrorTemplate, r);
}
function sc(e, t, n, r) {
	let i = (n.length > 0 && t.length > 0 ? "\n" : "") + n.join("\n");
	r.prettyInspectOptions.colors = r.stylePrettyLogs, console.log(e + (0, d.formatWithOptions)(r.prettyInspectOptions, ...t) + i);
}
function cc(e) {
	console.log(t(e));
	function t(e) {
		let t = /* @__PURE__ */ new Set();
		return JSON.stringify(e, (e, n) => {
			if (typeof n == "object" && n) {
				if (t.has(n)) return "[Circular]";
				t.add(n);
			}
			return typeof n == "bigint" ? `${n}` : n === void 0 ? "[undefined]" : n;
		});
	}
}
function lc(e) {
	return Buffer.isBuffer(e);
}
var uc = class {
	constructor(e, t, n = 4) {
		this.logObj = t, this.stackDepthLevel = n, this.runtime = Qs, this.settings = {
			type: e?.type ?? "pretty",
			name: e?.name,
			parentNames: e?.parentNames,
			minLevel: e?.minLevel ?? 0,
			argumentsArrayName: e?.argumentsArrayName,
			hideLogPositionForProduction: e?.hideLogPositionForProduction ?? !1,
			prettyLogTemplate: e?.prettyLogTemplate ?? "{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}	{{logLevelName}}	{{filePathWithLine}}{{nameWithDelimiterPrefix}}	",
			prettyErrorTemplate: e?.prettyErrorTemplate ?? "\n{{errorName}} {{errorMessage}}\nerror stack:\n{{errorStack}}",
			prettyErrorStackTemplate: e?.prettyErrorStackTemplate ?? "  • {{fileName}}	{{method}}\n	{{filePathWithLine}}",
			prettyErrorParentNamesSeparator: e?.prettyErrorParentNamesSeparator ?? ":",
			prettyErrorLoggerNameDelimiter: e?.prettyErrorLoggerNameDelimiter ?? "	",
			stylePrettyLogs: e?.stylePrettyLogs ?? !0,
			prettyLogTimeZone: e?.prettyLogTimeZone ?? "UTC",
			prettyLogStyles: e?.prettyLogStyles ?? {
				logLevelName: {
					"*": [
						"bold",
						"black",
						"bgWhiteBright",
						"dim"
					],
					SILLY: ["bold", "white"],
					TRACE: ["bold", "whiteBright"],
					DEBUG: ["bold", "green"],
					INFO: ["bold", "blue"],
					WARN: ["bold", "yellow"],
					ERROR: ["bold", "red"],
					FATAL: ["bold", "redBright"]
				},
				dateIsoStr: "white",
				filePathWithLine: "white",
				name: ["white", "bold"],
				nameWithDelimiterPrefix: ["white", "bold"],
				nameWithDelimiterSuffix: ["white", "bold"],
				errorName: [
					"bold",
					"bgRedBright",
					"whiteBright"
				],
				fileName: ["yellow"],
				fileNameWithLine: "white"
			},
			prettyInspectOptions: e?.prettyInspectOptions ?? {
				colors: !0,
				compact: !1,
				depth: 1e400
			},
			metaProperty: e?.metaProperty ?? "_meta",
			maskPlaceholder: e?.maskPlaceholder ?? "[***]",
			maskValuesOfKeys: e?.maskValuesOfKeys ?? ["password"],
			maskValuesOfKeysCaseInsensitive: e?.maskValuesOfKeysCaseInsensitive ?? !1,
			maskValuesRegEx: e?.maskValuesRegEx,
			prefix: [...e?.prefix ?? []],
			attachedTransports: [...e?.attachedTransports ?? []],
			overwrite: {
				mask: e?.overwrite?.mask,
				toLogObj: e?.overwrite?.toLogObj,
				addMeta: e?.overwrite?.addMeta,
				addPlaceholders: e?.overwrite?.addPlaceholders,
				formatMeta: e?.overwrite?.formatMeta,
				formatLogObj: e?.overwrite?.formatLogObj,
				transportFormatted: e?.overwrite?.transportFormatted,
				transportJSON: e?.overwrite?.transportJSON
			}
		};
	}
	log(e, t, ...n) {
		if (e < this.settings.minLevel) return;
		let r = [...this.settings.prefix, ...n], i = this.settings.overwrite?.mask == null ? this.settings.maskValuesOfKeys != null && this.settings.maskValuesOfKeys.length > 0 ? this._mask(r) : r : this.settings.overwrite?.mask(r), a = this.logObj == null ? void 0 : this._recursiveCloneAndExecuteFunctions(this.logObj), o = this.settings.overwrite?.toLogObj == null ? this._toLogObj(i, a) : this.settings.overwrite?.toLogObj(i, a), s = this.settings.overwrite?.addMeta == null ? this._addMetaToLogObj(o, e, t) : this.settings.overwrite?.addMeta(o, e, t), c, l;
		return this.settings.overwrite?.formatMeta != null && (c = this.settings.overwrite?.formatMeta(s?.[this.settings.metaProperty])), this.settings.overwrite?.formatLogObj != null && (l = this.settings.overwrite?.formatLogObj(i, this.settings)), this.settings.type === "pretty" && (c ??= this._prettyFormatLogObjMeta(s?.[this.settings.metaProperty]), l ??= this.runtime.prettyFormatLogObj(i, this.settings)), c != null && l != null ? this.settings.overwrite?.transportFormatted == null ? this.runtime.transportFormatted(c, l.args, l.errors, this.settings) : this.settings.overwrite?.transportFormatted(c, l.args, l.errors, this.settings) : this.settings.overwrite?.transportJSON == null ? this.settings.type !== "hidden" && this.runtime.transportJSON(s) : this.settings.overwrite?.transportJSON(s), this.settings.attachedTransports != null && this.settings.attachedTransports.length > 0 && this.settings.attachedTransports.forEach((e) => {
			e(s);
		}), s;
	}
	attachTransport(e) {
		this.settings.attachedTransports.push(e);
	}
	getSubLogger(e, t) {
		let n = {
			...this.settings,
			...e,
			parentNames: this.settings?.parentNames != null && this.settings?.name != null ? [...this.settings.parentNames, this.settings.name] : this.settings?.name == null ? void 0 : [this.settings.name],
			prefix: [...this.settings.prefix, ...e?.prefix ?? []]
		};
		return new this.constructor(n, t ?? this.logObj, this.stackDepthLevel);
	}
	_mask(e) {
		let t = this.settings.maskValuesOfKeysCaseInsensitive === !0 ? this.settings.maskValuesOfKeys.map((e) => e.toLowerCase()) : this.settings.maskValuesOfKeys;
		return e?.map((e) => this._recursiveCloneAndMaskValuesOfKeys(e, t));
	}
	_recursiveCloneAndMaskValuesOfKeys(e, t, n = []) {
		if (n.includes(e)) return { ...e };
		if (typeof e == "object" && e && n.push(e), this.runtime.isError(e) || this.runtime.isBuffer(e)) return e;
		if (e instanceof Map) return new Map(e);
		if (e instanceof Set) return new Set(e);
		if (Array.isArray(e)) return e.map((e) => this._recursiveCloneAndMaskValuesOfKeys(e, t, n));
		if (e instanceof Date) return new Date(e.getTime());
		if (e instanceof URL) return Zs(e);
		if (typeof e == "object" && e) {
			let r = this.runtime.isError(e) ? this._cloneError(e) : Object.create(Object.getPrototypeOf(e));
			return Object.getOwnPropertyNames(e).reduce((r, i) => (r[i] = t.includes(this.settings?.maskValuesOfKeysCaseInsensitive === !0 ? i.toLowerCase() : i) ? this.settings.maskPlaceholder : (() => {
				try {
					return this._recursiveCloneAndMaskValuesOfKeys(e[i], t, n);
				} catch {
					return null;
				}
			})(), r), r);
		}
		if (typeof e == "string") {
			let t = e;
			for (let e of this.settings?.maskValuesRegEx || []) t = t.replace(e, this.settings?.maskPlaceholder || "");
			return t;
		}
		return e;
	}
	_recursiveCloneAndExecuteFunctions(e, t = []) {
		return this.isObjectOrArray(e) && t.includes(e) ? this.shallowCopy(e) : (this.isObjectOrArray(e) && t.push(e), Array.isArray(e) ? e.map((e) => this._recursiveCloneAndExecuteFunctions(e, t)) : e instanceof Date ? new Date(e.getTime()) : this.isObject(e) ? Object.getOwnPropertyNames(e).reduce((n, r) => {
			let i = Object.getOwnPropertyDescriptor(e, r);
			if (i) {
				Object.defineProperty(n, r, i);
				let a = e[r];
				n[r] = typeof a == "function" ? a() : this._recursiveCloneAndExecuteFunctions(a, t);
			}
			return n;
		}, Object.create(Object.getPrototypeOf(e))) : e);
	}
	isObjectOrArray(e) {
		return typeof e == "object" && !!e;
	}
	isObject(e) {
		return typeof e == "object" && !Array.isArray(e) && e !== null;
	}
	shallowCopy(e) {
		return Array.isArray(e) ? [...e] : { ...e };
	}
	_toLogObj(e, t = {}) {
		return e = e?.map((e) => this.runtime.isError(e) ? this._toErrorObject(e) : e), t = this.settings.argumentsArrayName == null ? e.length === 1 && !Array.isArray(e[0]) && this.runtime.isBuffer(e[0]) !== !0 && !(e[0] instanceof Date) ? typeof e[0] == "object" && e[0] != null ? {
			...e[0],
			...t
		} : {
			0: e[0],
			...t
		} : {
			...t,
			...e
		} : {
			...t,
			[this.settings.argumentsArrayName]: e
		}, t;
	}
	_cloneError(e) {
		let t = new e.constructor();
		return Object.getOwnPropertyNames(e).forEach((n) => {
			t[n] = e[n];
		}), t;
	}
	_toErrorObject(e) {
		return {
			nativeError: e,
			name: e.name ?? "Error",
			message: e.message,
			stack: this.runtime.getErrorTrace(e)
		};
	}
	_addMetaToLogObj(e, t, n) {
		return {
			...e,
			[this.settings.metaProperty]: this.runtime.getMeta(t, n, this.stackDepthLevel, this.settings.hideLogPositionForProduction, this.settings.name, this.settings.parentNames)
		};
	}
	_prettyFormatLogObjMeta(e) {
		if (e == null) return "";
		let t = this.settings.prettyLogTemplate, n = {};
		t.includes("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}") ? t = t.replace("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}", "{{dateIsoStr}}") : this.settings.prettyLogTimeZone === "UTC" ? (n.yyyy = e?.date?.getUTCFullYear() ?? "----", n.mm = N(e?.date?.getUTCMonth(), 2, 1), n.dd = N(e?.date?.getUTCDate(), 2), n.hh = N(e?.date?.getUTCHours(), 2), n.MM = N(e?.date?.getUTCMinutes(), 2), n.ss = N(e?.date?.getUTCSeconds(), 2), n.ms = N(e?.date?.getUTCMilliseconds(), 3)) : (n.yyyy = e?.date?.getFullYear() ?? "----", n.mm = N(e?.date?.getMonth(), 2, 1), n.dd = N(e?.date?.getDate(), 2), n.hh = N(e?.date?.getHours(), 2), n.MM = N(e?.date?.getMinutes(), 2), n.ss = N(e?.date?.getSeconds(), 2), n.ms = N(e?.date?.getMilliseconds(), 3));
		let r = this.settings.prettyLogTimeZone === "UTC" ? e?.date : /* @__PURE__ */ new Date(e?.date?.getTime() - e?.date?.getTimezoneOffset() * 6e4);
		n.rawIsoStr = r?.toISOString(), n.dateIsoStr = r?.toISOString().replace("T", " ").replace("Z", ""), n.logLevelName = e?.logLevelName, n.fileNameWithLine = e?.path?.fileNameWithLine ?? "", n.filePathWithLine = e?.path?.filePathWithLine ?? "", n.fullFilePath = e?.path?.fullFilePath ?? "";
		let i = this.settings.parentNames?.join(this.settings.prettyErrorParentNamesSeparator);
		return i = i != null && e?.name != null ? i + this.settings.prettyErrorParentNamesSeparator : void 0, n.name = e?.name != null || i != null ? (i ?? "") + e?.name ?? "" : "", n.nameWithDelimiterPrefix = n.name.length > 0 ? this.settings.prettyErrorLoggerNameDelimiter + n.name : "", n.nameWithDelimiterSuffix = n.name.length > 0 ? n.name + this.settings.prettyErrorLoggerNameDelimiter : "", this.settings.overwrite?.addPlaceholders != null && this.settings.overwrite?.addPlaceholders(e, n), Xs(this.settings, t, n);
	}
}, dc = class extends uc {
	constructor(e, t) {
		let n = typeof window < "u" && typeof document < "u", r = n ? window.chrome !== void 0 && window.CSS !== void 0 && window.CSS.supports("color", "green") : !1, i = n ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent) : !1;
		e ||= {}, e.stylePrettyLogs = e.stylePrettyLogs && n && !r ? !1 : e.stylePrettyLogs, super(e, t, i ? 4 : 5);
	}
	log(e, t, ...n) {
		return super.log(e, t, ...n);
	}
	silly(...e) {
		return super.log(0, "SILLY", ...e);
	}
	trace(...e) {
		return super.log(1, "TRACE", ...e);
	}
	debug(...e) {
		return super.log(2, "DEBUG", ...e);
	}
	info(...e) {
		return super.log(3, "INFO", ...e);
	}
	warn(...e) {
		return super.log(4, "WARN", ...e);
	}
	error(...e) {
		return super.log(5, "ERROR", ...e);
	}
	fatal(...e) {
		return super.log(6, "FATAL", ...e);
	}
	getSubLogger(e, t) {
		return super.getSubLogger(e, t);
	}
}, P = c({
	ChannelNumber: () => mc,
	DeviceStatusEnum: () => fc,
	Emitter: () => F,
	EmitterScope: () => pc
}), fc = /* @__PURE__ */ function(e) {
	return e[e.DeviceRestarting = 1] = "DeviceRestarting", e[e.DeviceDisconnected = 2] = "DeviceDisconnected", e[e.DeviceConnecting = 3] = "DeviceConnecting", e[e.DeviceReconnecting = 4] = "DeviceReconnecting", e[e.DeviceConnected = 5] = "DeviceConnected", e[e.DeviceConfiguring = 6] = "DeviceConfiguring", e[e.DeviceConfigured = 7] = "DeviceConfigured", e;
}({}), pc = /* @__PURE__ */ function(e) {
	return e[e.MeshDevice = 1] = "MeshDevice", e[e.SerialConnection = 2] = "SerialConnection", e[e.NodeSerialConnection = 3] = "NodeSerialConnection", e[e.BleConnection = 4] = "BleConnection", e[e.HttpConnection = 5] = "HttpConnection", e;
}({}), F = /* @__PURE__ */ function(e) {
	return e[e.Constructor = 0] = "Constructor", e[e.SendText = 1] = "SendText", e[e.SendWaypoint = 2] = "SendWaypoint", e[e.SendPacket = 3] = "SendPacket", e[e.SendRaw = 4] = "SendRaw", e[e.SetConfig = 5] = "SetConfig", e[e.SetModuleConfig = 6] = "SetModuleConfig", e[e.ConfirmSetConfig = 7] = "ConfirmSetConfig", e[e.SetOwner = 8] = "SetOwner", e[e.SetChannel = 9] = "SetChannel", e[e.ConfirmSetChannel = 10] = "ConfirmSetChannel", e[e.ClearChannel = 11] = "ClearChannel", e[e.GetChannel = 12] = "GetChannel", e[e.GetAllChannels = 13] = "GetAllChannels", e[e.GetConfig = 14] = "GetConfig", e[e.GetModuleConfig = 15] = "GetModuleConfig", e[e.GetOwner = 16] = "GetOwner", e[e.Configure = 17] = "Configure", e[e.HandleFromRadio = 18] = "HandleFromRadio", e[e.HandleMeshPacket = 19] = "HandleMeshPacket", e[e.Connect = 20] = "Connect", e[e.Ping = 21] = "Ping", e[e.ReadFromRadio = 22] = "ReadFromRadio", e[e.WriteToRadio = 23] = "WriteToRadio", e[e.SetDebugMode = 24] = "SetDebugMode", e[e.GetMetadata = 25] = "GetMetadata", e[e.ResetNodes = 26] = "ResetNodes", e[e.Shutdown = 27] = "Shutdown", e[e.Reboot = 28] = "Reboot", e[e.RebootOta = 29] = "RebootOta", e[e.FactoryReset = 30] = "FactoryReset", e[e.EnterDfuMode = 31] = "EnterDfuMode", e[e.RemoveNodeByNum = 32] = "RemoveNodeByNum", e[e.SetCannedMessages = 33] = "SetCannedMessages", e[e.Disconnect = 34] = "Disconnect", e[e.ConnectionStatus = 35] = "ConnectionStatus", e;
}({}), mc = /* @__PURE__ */ function(e) {
	return e[e.Primary = 0] = "Primary", e[e.Channel1 = 1] = "Channel1", e[e.Channel2 = 2] = "Channel2", e[e.Channel3 = 3] = "Channel3", e[e.Channel4 = 4] = "Channel4", e[e.Channel5 = 5] = "Channel5", e[e.Channel6 = 6] = "Channel6", e[e.Admin = 7] = "Admin", e;
}({}), hc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/DispatcherWrapper.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DispatcherWrapper = class {
		constructor(e) {
			this._subscribe = (t) => e.subscribe(t), this._unsubscribe = (t) => e.unsubscribe(t), this._one = (t) => e.one(t), this._has = (t) => e.has(t), this._clear = () => e.clear(), this._count = () => e.count, this._onSubscriptionChange = () => e.onSubscriptionChange;
		}
		get onSubscriptionChange() {
			return this._onSubscriptionChange();
		}
		get count() {
			return this._count();
		}
		subscribe(e) {
			return this._subscribe(e);
		}
		sub(e) {
			return this.subscribe(e);
		}
		unsubscribe(e) {
			this._unsubscribe(e);
		}
		unsub(e) {
			this.unsubscribe(e);
		}
		one(e) {
			return this._one(e);
		}
		has(e) {
			return this._has(e);
		}
		clear() {
			this._clear();
		}
	};
}) }), gc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/events/Subscription.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.Subscription = class {
		constructor(e, t) {
			this.handler = e, this.isOnce = t, this.isExecuted = !1;
		}
		execute(e, t, n) {
			if (!this.isOnce || !this.isExecuted) {
				this.isExecuted = !0;
				var r = this.handler;
				e ? setTimeout(() => {
					r.apply(t, n);
				}, 1) : r.apply(t, n);
			}
		}
	};
}) }), _c = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/management/EventManagement.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.EventManagement = class {
		constructor(e) {
			this.unsub = e, this.propagationStopped = !1;
		}
		stopPropagation() {
			this.propagationStopped = !0;
		}
	};
}) }), vc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/DispatcherBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = hc(), n = gc(), r = _c();
	var i = class {
		constructor() {
			this._subscriptions = [];
		}
		get count() {
			return this._subscriptions.length;
		}
		get onSubscriptionChange() {
			return this._onSubscriptionChange ??= new a(), this._onSubscriptionChange.asEvent();
		}
		subscribe(e) {
			return e && (this._subscriptions.push(this.createSubscription(e, !1)), this.triggerSubscriptionChange()), () => {
				this.unsubscribe(e);
			};
		}
		sub(e) {
			return this.subscribe(e);
		}
		one(e) {
			return e && (this._subscriptions.push(this.createSubscription(e, !0)), this.triggerSubscriptionChange()), () => {
				this.unsubscribe(e);
			};
		}
		has(e) {
			return e ? this._subscriptions.some((t) => t.handler == e) : !1;
		}
		unsubscribe(e) {
			if (!e) return;
			let t = !1;
			for (let n = 0; n < this._subscriptions.length; n++) if (this._subscriptions[n].handler == e) {
				this._subscriptions.splice(n, 1), t = !0;
				break;
			}
			t && this.triggerSubscriptionChange();
		}
		unsub(e) {
			this.unsubscribe(e);
		}
		_dispatch(e, t, n) {
			for (let i of [...this._subscriptions]) {
				let a = new r.EventManagement(() => this.unsub(i.handler)), o = Array.prototype.slice.call(n);
				if (o.push(a), i.execute(e, t, o), this.cleanup(i), !e && a.propagationStopped) return { propagationStopped: !0 };
			}
			return e ? null : { propagationStopped: !1 };
		}
		createSubscription(e, t) {
			return new n.Subscription(e, t);
		}
		cleanup(e) {
			let t = !1;
			if (e.isOnce && e.isExecuted) {
				let n = this._subscriptions.indexOf(e);
				n > -1 && (this._subscriptions.splice(n, 1), t = !0);
			}
			t && this.triggerSubscriptionChange();
		}
		asEvent() {
			return this._wrap ??= new t.DispatcherWrapper(this), this._wrap;
		}
		clear() {
			this._subscriptions.length != 0 && (this._subscriptions.splice(0, this._subscriptions.length), this.triggerSubscriptionChange());
		}
		triggerSubscriptionChange() {
			this._onSubscriptionChange != null && this._onSubscriptionChange.dispatch(this.count);
		}
	};
	e.DispatcherBase = i;
	var a = class extends i {
		dispatch(e) {
			this._dispatch(!1, this, arguments);
		}
	};
	e.SubscriptionChangeEventDispatcher = a;
}) }), yc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/DispatchError.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DispatchError = class extends Error {
		constructor(e) {
			super(e);
		}
	};
}) }), bc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/EventListBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.EventListBase = class {
		constructor() {
			this._events = {};
		}
		get(e) {
			let t = this._events[e];
			return t || (t = this.createDispatcher(), this._events[e] = t, t);
		}
		remove(e) {
			delete this._events[e];
		}
	};
}) }), xc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/handling/HandlingBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.HandlingBase = class {
		constructor(e) {
			this.events = e;
		}
		one(e, t) {
			this.events.get(e).one(t);
		}
		has(e, t) {
			return this.events.get(e).has(t);
		}
		subscribe(e, t) {
			this.events.get(e).subscribe(t);
		}
		sub(e, t) {
			this.subscribe(e, t);
		}
		unsubscribe(e, t) {
			this.events.get(e).unsubscribe(t);
		}
		unsub(e, t) {
			this.unsubscribe(e, t);
		}
	};
}) }), Sc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/events/PromiseSubscription.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.PromiseSubscription = class {
		constructor(e, t) {
			this.handler = e, this.isOnce = t, this.isExecuted = !1;
		}
		async execute(e, t, n) {
			if (!this.isOnce || !this.isExecuted) {
				this.isExecuted = !0;
				var r = this.handler;
				if (e) {
					setTimeout(() => {
						r.apply(t, n);
					}, 1);
					return;
				}
				await r.apply(t, n);
			}
		}
	};
}) }), Cc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/PromiseDispatcherBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = Sc(), n = _c(), r = vc(), i = yc();
	e.PromiseDispatcherBase = class extends r.DispatcherBase {
		_dispatch(e, t, n) {
			throw new i.DispatchError("_dispatch not supported. Use _dispatchAsPromise.");
		}
		createSubscription(e, n) {
			return new t.PromiseSubscription(e, n);
		}
		async _dispatchAsPromise(e, t, r) {
			for (let i of [...this._subscriptions]) {
				let a = new n.EventManagement(() => this.unsub(i.handler)), o = Array.prototype.slice.call(r);
				if (o.push(a), await i.execute(e, t, o), this.cleanup(i), !e && a.propagationStopped) return { propagationStopped: !0 };
			}
			return e ? null : { propagationStopped: !1 };
		}
	};
}) }), wc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/index.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SubscriptionChangeEventDispatcher = e.HandlingBase = e.PromiseDispatcherBase = e.PromiseSubscription = e.DispatchError = e.EventManagement = e.EventListBase = e.DispatcherWrapper = e.DispatcherBase = e.Subscription = void 0;
	let t = vc();
	Object.defineProperty(e, "DispatcherBase", {
		enumerable: !0,
		get: function() {
			return t.DispatcherBase;
		}
	}), Object.defineProperty(e, "SubscriptionChangeEventDispatcher", {
		enumerable: !0,
		get: function() {
			return t.SubscriptionChangeEventDispatcher;
		}
	});
	let n = yc();
	Object.defineProperty(e, "DispatchError", {
		enumerable: !0,
		get: function() {
			return n.DispatchError;
		}
	});
	let r = hc();
	Object.defineProperty(e, "DispatcherWrapper", {
		enumerable: !0,
		get: function() {
			return r.DispatcherWrapper;
		}
	});
	let i = bc();
	Object.defineProperty(e, "EventListBase", {
		enumerable: !0,
		get: function() {
			return i.EventListBase;
		}
	});
	let a = _c();
	Object.defineProperty(e, "EventManagement", {
		enumerable: !0,
		get: function() {
			return a.EventManagement;
		}
	});
	let o = xc();
	Object.defineProperty(e, "HandlingBase", {
		enumerable: !0,
		get: function() {
			return o.HandlingBase;
		}
	});
	let s = Cc();
	Object.defineProperty(e, "PromiseDispatcherBase", {
		enumerable: !0,
		get: function() {
			return s.PromiseDispatcherBase;
		}
	});
	let c = Sc();
	Object.defineProperty(e, "PromiseSubscription", {
		enumerable: !0,
		get: function() {
			return c.PromiseSubscription;
		}
	});
	let l = gc();
	Object.defineProperty(e, "Subscription", {
		enumerable: !0,
		get: function() {
			return l.Subscription;
		}
	});
}) }), Tc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/SimpleEventDispatcher.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = wc();
	e.SimpleEventDispatcher = class extends t.DispatcherBase {
		constructor() {
			super();
		}
		dispatch(e) {
			let n = this._dispatch(!1, this, arguments);
			if (n == null) throw new t.DispatchError("Got `null` back from dispatch.");
			return n;
		}
		dispatchAsync(e) {
			this._dispatch(!0, this, arguments);
		}
		asEvent() {
			return super.asEvent();
		}
	};
}) }), Ec = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/SimpleEventList.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = wc(), n = Tc();
	e.SimpleEventList = class extends t.EventListBase {
		constructor() {
			super();
		}
		createDispatcher() {
			return new n.SimpleEventDispatcher();
		}
	};
}) }), Dc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/SimpleEventHandlingBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = wc(), n = Ec();
	e.SimpleEventHandlingBase = class extends t.HandlingBase {
		constructor() {
			super(new n.SimpleEventList());
		}
	};
}) }), Oc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/NonUniformSimpleEventList.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = Tc();
	e.NonUniformSimpleEventList = class {
		constructor() {
			this._events = {};
		}
		get(e) {
			if (this._events[e]) return this._events[e];
			let t = this.createDispatcher();
			return this._events[e] = t, t;
		}
		remove(e) {
			delete this._events[e];
		}
		createDispatcher() {
			return new t.SimpleEventDispatcher();
		}
	};
}) }), kc = /* @__PURE__ */ s({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/index.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.NonUniformSimpleEventList = e.SimpleEventList = e.SimpleEventHandlingBase = e.SimpleEventDispatcher = void 0;
	let t = Tc();
	Object.defineProperty(e, "SimpleEventDispatcher", {
		enumerable: !0,
		get: function() {
			return t.SimpleEventDispatcher;
		}
	});
	let n = Dc();
	Object.defineProperty(e, "SimpleEventHandlingBase", {
		enumerable: !0,
		get: function() {
			return n.SimpleEventHandlingBase;
		}
	});
	let r = Oc();
	Object.defineProperty(e, "NonUniformSimpleEventList", {
		enumerable: !0,
		get: function() {
			return r.NonUniformSimpleEventList;
		}
	});
	let i = Ec();
	Object.defineProperty(e, "SimpleEventList", {
		enumerable: !0,
		get: function() {
			return i.SimpleEventList;
		}
	});
}) }), I = /* @__PURE__ */ u(kc(), 1), Ac = class {
	constructor() {
		this.onLogEvent = new I.SimpleEventDispatcher(), this.onFromRadio = new I.SimpleEventDispatcher(), this.onMeshPacket = new I.SimpleEventDispatcher(), this.onMyNodeInfo = new I.SimpleEventDispatcher(), this.onNodeInfoPacket = new I.SimpleEventDispatcher(), this.onChannelPacket = new I.SimpleEventDispatcher(), this.onConfigPacket = new I.SimpleEventDispatcher(), this.onModuleConfigPacket = new I.SimpleEventDispatcher(), this.onAtakPacket = new I.SimpleEventDispatcher(), this.onMessagePacket = new I.SimpleEventDispatcher(), this.onRemoteHardwarePacket = new I.SimpleEventDispatcher(), this.onPositionPacket = new I.SimpleEventDispatcher(), this.onUserPacket = new I.SimpleEventDispatcher(), this.onRoutingPacket = new I.SimpleEventDispatcher(), this.onDeviceMetadataPacket = new I.SimpleEventDispatcher(), this.onCannedMessageModulePacket = new I.SimpleEventDispatcher(), this.onWaypointPacket = new I.SimpleEventDispatcher(), this.onAudioPacket = new I.SimpleEventDispatcher(), this.onDetectionSensorPacket = new I.SimpleEventDispatcher(), this.onPingPacket = new I.SimpleEventDispatcher(), this.onIpTunnelPacket = new I.SimpleEventDispatcher(), this.onPaxcounterPacket = new I.SimpleEventDispatcher(), this.onSerialPacket = new I.SimpleEventDispatcher(), this.onStoreForwardPacket = new I.SimpleEventDispatcher(), this.onRangeTestPacket = new I.SimpleEventDispatcher(), this.onTelemetryPacket = new I.SimpleEventDispatcher(), this.onZpsPacket = new I.SimpleEventDispatcher(), this.onSimulatorPacket = new I.SimpleEventDispatcher(), this.onTraceRoutePacket = new I.SimpleEventDispatcher(), this.onNeighborInfoPacket = new I.SimpleEventDispatcher(), this.onAtakPluginPacket = new I.SimpleEventDispatcher(), this.onMapReportPacket = new I.SimpleEventDispatcher(), this.onPrivatePacket = new I.SimpleEventDispatcher(), this.onAtakForwarderPacket = new I.SimpleEventDispatcher(), this.onClientNotificationPacket = new I.SimpleEventDispatcher(), this.onDeviceStatus = new I.SimpleEventDispatcher(), this.onLogRecord = new I.SimpleEventDispatcher(), this.onMeshHeartbeat = new I.SimpleEventDispatcher(), this.onDeviceDebugLog = new I.SimpleEventDispatcher(), this.onPendingSettingsChange = new I.SimpleEventDispatcher(), this.onQueueStatus = new I.SimpleEventDispatcher();
	}
}, jc = /* @__PURE__ */ u(kc(), 1), Mc = class {
	constructor() {
		this.queue = [], this.lock = !1, this.ackNotifier = new jc.SimpleEventDispatcher(), this.errorNotifier = new jc.SimpleEventDispatcher(), this.timeout = 6e4;
	}
	getState() {
		return this.queue;
	}
	clear() {
		this.queue = [];
	}
	push(e) {
		let t = {
			...e,
			sent: !1,
			added: /* @__PURE__ */ new Date(),
			promise: new Promise((t, n) => {
				this.ackNotifier.subscribe((n) => {
					e.id === n && (this.remove(e.id), t(n));
				}), this.errorNotifier.subscribe((t) => {
					e.id === t.id && (this.remove(e.id), n(t));
				}), setTimeout(() => {
					if (this.queue.findIndex((t) => t.id === e.id) !== -1) {
						this.remove(e.id);
						let r = x(k.ToRadioSchema, e.data);
						if (r.payloadVariant.case === "heartbeat" || r.payloadVariant.case === "wantConfigId") {
							t(e.id);
							return;
						}
						console.warn(`Packet ${e.id} of type ${r.payloadVariant.case} timed out`), n({
							id: e.id,
							error: k.Routing_Error.TIMEOUT
						});
					}
				}, this.timeout);
			})
		};
		this.queue.push(t);
	}
	remove(e) {
		this.lock ? setTimeout(() => this.remove(e), 100) : this.queue = this.queue.filter((t) => t.id !== e);
	}
	processAck(e) {
		this.ackNotifier.dispatch(e);
	}
	processError(e) {
		console.error(`Error received for packet ${e.id}: ${k.Routing_Error[e.error]}`), this.errorNotifier.dispatch(e);
	}
	wait(e) {
		let t = this.queue.find((t) => t.id === e);
		if (!t) throw Error("Packet does not exist");
		return t.promise;
	}
	async processQueue(e) {
		if (this.lock) return;
		this.lock = !0;
		let t = e.getWriter();
		try {
			for (; this.queue.filter((e) => !e.sent).length > 0;) {
				let e = this.queue.filter((e) => !e.sent)[0];
				if (e) {
					await new Promise((e) => setTimeout(e, 200));
					try {
						await t.write(e.data), e.sent = !0;
					} catch (n) {
						if (n?.code === "ECONNRESET" || n?.code === "ERR_INVALID_STATE") throw t.releaseLock(), this.lock = !1, n;
						console.error(`Error sending packet ${e.id}`, n);
					}
				}
			}
		} finally {
			t.releaseLock(), this.lock = !1;
		}
	}
}, Nc = () => {
	let e = new Uint8Array([]), t = new TextDecoder();
	return new TransformStream({ transform(n, r) {
		e = new Uint8Array([...e, ...n]);
		let i = !1;
		for (; e.length !== 0 && !i;) {
			let n = e.findIndex((e) => e === 148);
			if (e[n + 1] === 195) {
				e.subarray(0, n).length && (r.enqueue({
					type: "debug",
					data: t.decode(e.subarray(0, n))
				}), e = e.subarray(n));
				let a = e[2], o = e[3];
				if (a !== void 0 && o !== void 0 && e.length >= 4 + (a << 8) + o) {
					let t = e.subarray(4, 4 + (a << 8) + o), n = t.findIndex((e) => e === 148);
					n !== -1 && t[n + 1] === 195 ? (console.warn(`⚠️ Malformed packet found, discarding: ${e.subarray(0, n - 1).toString()}`), e = e.subarray(n)) : (e = e.subarray(3 + (a << 8) + o + 1), r.enqueue({
						type: "packet",
						data: t
					}));
				} else i = !0;
			} else i = !0;
		}
	} });
}, Pc = () => new TransformStream({ transform(e, t) {
	let n = e.length, r = new Uint8Array([
		148,
		195,
		n >> 8 & 255,
		n & 255
	]);
	t.enqueue(new Uint8Array([...r, ...e]));
} }), Fc = class {
	constructor(e) {
		this.sendRaw = e, this.rxBuffer = [], this.txBuffer = [], this.textEncoder = new TextEncoder(), this.counter = 0;
	}
	async downloadFile(e) {
		return await this.sendCommand(O.XModem_Control.STX, this.textEncoder.encode(e), 0);
	}
	async uploadFile(e, t) {
		for (let e = 0; e < t.length; e += 128) this.txBuffer.push(t.slice(e, e + 128));
		return await this.sendCommand(O.XModem_Control.SOH, this.textEncoder.encode(e), 0);
	}
	async sendCommand(e, t, n, r) {
		let i = v(k.ToRadioSchema, { payloadVariant: {
			case: "xmodemPacket",
			value: {
				buffer: t,
				control: e,
				seq: n,
				crc16: r
			}
		} });
		return await this.sendRaw(y(k.ToRadioSchema, i));
	}
	async handlePacket(e) {
		switch (await new Promise((e) => setTimeout(e, 100)), e.control) {
			case O.XModem_Control.NUL: break;
			case O.XModem_Control.SOH: return this.counter = e.seq, this.validateCrc16(e) ? (this.rxBuffer[this.counter] = e.buffer, this.sendCommand(O.XModem_Control.ACK)) : await this.sendCommand(O.XModem_Control.NAK, void 0, e.seq);
			case O.XModem_Control.STX:
			case O.XModem_Control.EOT: break;
			case O.XModem_Control.ACK:
				if (this.counter++, this.txBuffer[this.counter - 1]) return this.sendCommand(O.XModem_Control.SOH, this.txBuffer[this.counter - 1], this.counter, ee(this.txBuffer[this.counter - 1] ?? /* @__PURE__ */ new Uint8Array()));
				if (this.counter === this.txBuffer.length + 1) return this.sendCommand(O.XModem_Control.EOT);
				this.clear();
				break;
			case O.XModem_Control.NAK: return this.sendCommand(O.XModem_Control.SOH, this.txBuffer[this.counter], this.counter, ee(this.txBuffer[this.counter - 1] ?? /* @__PURE__ */ new Uint8Array()));
			case O.XModem_Control.CAN:
				this.clear();
				break;
			case O.XModem_Control.CTRLZ:
		}
		return Promise.resolve(0);
	}
	validateCrc16(e) {
		return ee(e.buffer) === e.crc16;
	}
	clear() {
		this.counter = 0, this.rxBuffer = [], this.txBuffer = [];
	}
}, Ic = c({
	EventSystem: () => Ac,
	Queue: () => Mc,
	Xmodem: () => Fc,
	fromDeviceStream: () => Nc,
	toDeviceStream: () => Pc
}), Lc = (e) => new WritableStream({ write(t) {
	switch (t.type) {
		case "status": {
			let { status: n, reason: r } = t.data;
			e.updateDeviceStatus(n), e.log.info(F[F.ConnectionStatus], `🔗 ${fc[n]} ${r ? `(${r})` : ""}`);
			break;
		}
		case "debug": break;
		case "packet": {
			let n;
			try {
				n = x(k.FromRadioSchema, t.data);
			} catch (t) {
				e.log.error(F[F.HandleFromRadio], "⚠️  Received undecodable packet", t);
				break;
			}
			switch (e.events.onFromRadio.dispatch(n), n.payloadVariant.case) {
				case "packet":
					try {
						e.handleMeshPacket(n.payloadVariant.value);
					} catch (t) {
						e.log.error(F[F.HandleFromRadio], "⚠️  Unable to handle mesh packet", t);
					}
					break;
				case "myInfo":
					e.events.onMyNodeInfo.dispatch(n.payloadVariant.value), e.log.info(F[F.HandleFromRadio], "📱 Received Node info for this device");
					break;
				case "nodeInfo":
					e.log.info(F[F.HandleFromRadio], `📱 Received Node Info packet for node: ${n.payloadVariant.value.num}`), e.events.onNodeInfoPacket.dispatch(n.payloadVariant.value), n.payloadVariant.value.position && e.events.onPositionPacket.dispatch({
						id: n.id,
						rxTime: /* @__PURE__ */ new Date(),
						from: n.payloadVariant.value.num,
						to: n.payloadVariant.value.num,
						type: "direct",
						channel: mc.Primary,
						data: n.payloadVariant.value.position
					}), n.payloadVariant.value.user && e.events.onUserPacket.dispatch({
						id: n.id,
						rxTime: /* @__PURE__ */ new Date(),
						from: n.payloadVariant.value.num,
						to: n.payloadVariant.value.num,
						type: "direct",
						channel: mc.Primary,
						data: n.payloadVariant.value.user
					});
					break;
				case "config":
					n.payloadVariant.value.payloadVariant.case ? e.log.trace(F[F.HandleFromRadio], `💾 Received Config packet of variant: ${n.payloadVariant.value.payloadVariant.case}`) : e.log.warn(F[F.HandleFromRadio], "⚠️ Received Config packet of variant: UNK"), e.events.onConfigPacket.dispatch(n.payloadVariant.value);
					break;
				case "logRecord":
					e.log.trace(F[F.HandleFromRadio], "Received onLogRecord"), e.events.onLogRecord.dispatch(n.payloadVariant.value);
					break;
				case "configCompleteId":
					n.payloadVariant.value !== e.configId && e.log.error(F[F.HandleFromRadio], `❌ Invalid config id received from device, expected ${e.configId} but received ${n.payloadVariant.value}`), e.log.info(F[F.HandleFromRadio], `⚙️ Valid config id received from device: ${e.configId}`), e.updateDeviceStatus(fc.DeviceConfigured);
					break;
				case "rebooted":
					e.configure().catch(() => {});
					break;
				case "moduleConfig":
					n.payloadVariant.value.payloadVariant.case ? e.log.trace(F[F.HandleFromRadio], `💾 Received Module Config packet of variant: ${n.payloadVariant.value.payloadVariant.case}`) : e.log.warn(F[F.HandleFromRadio], "⚠️ Received Module Config packet of variant: UNK"), e.events.onModuleConfigPacket.dispatch(n.payloadVariant.value);
					break;
				case "channel":
					e.log.trace(F[F.HandleFromRadio], `🔐 Received Channel: ${n.payloadVariant.value.index}`), e.events.onChannelPacket.dispatch(n.payloadVariant.value);
					break;
				case "queueStatus":
					e.log.trace(F[F.HandleFromRadio], `🚧 Received Queue Status: ${n.payloadVariant.value}`), e.events.onQueueStatus.dispatch(n.payloadVariant.value);
					break;
				case "xmodemPacket":
					e.xModem.handlePacket(n.payloadVariant.value);
					break;
				case "metadata":
					Number.parseFloat(n.payloadVariant.value.firmwareVersion) < Js.minFwVer && e.log.fatal(F[F.HandleFromRadio], `Device firmware outdated. Min supported: ${Js.minFwVer} got : ${n.payloadVariant.value.firmwareVersion}`), e.log.debug(F[F.GetMetadata], "🏷️ Received metadata packet"), e.events.onDeviceMetadataPacket.dispatch({
						id: n.id,
						rxTime: /* @__PURE__ */ new Date(),
						from: 0,
						to: 0,
						type: "direct",
						channel: mc.Primary,
						data: n.payloadVariant.value
					});
					break;
				case "mqttClientProxyMessage": break;
				case "clientNotification":
					e.log.trace(F[F.HandleFromRadio], `📣 Received ClientNotification: ${n.payloadVariant.value.message}`), e.events.onClientNotificationPacket.dispatch(n.payloadVariant.value);
					break;
				default: e.log.warn(F[F.HandleFromRadio], `⚠️ Unhandled payload variant: ${n.payloadVariant.case}`);
			}
		}
	}
} }), Rc = class {
	constructor(e, t) {
		this.log = new dc({
			name: "iMeshDevice",
			prettyLogTemplate: "{{hh}}:{{MM}}:{{ss}}:{{ms}}	{{logLevelName}}	[{{name}}]	"
		}), this.transport = e, this.deviceStatus = fc.DeviceDisconnected, this.isConfigured = !1, this.pendingSettingsChanges = !1, this.myNodeInfo = v(k.MyNodeInfoSchema), this.configId = t ?? this.generateRandId(), this.queue = new Mc(), this.events = new Ac(), this.xModem = new Fc(this.sendRaw.bind(this)), this.events.onDeviceStatus.subscribe((e) => {
			this.deviceStatus = e, e === fc.DeviceConfigured ? this.isConfigured = !0 : e === fc.DeviceConfiguring ? this.isConfigured = !1 : e === fc.DeviceDisconnected && (this._heartbeatIntervalId !== void 0 && clearInterval(this._heartbeatIntervalId), this.complete());
		}), this.events.onMyNodeInfo.subscribe((e) => {
			this.myNodeInfo = e;
		}), this.events.onPendingSettingsChange.subscribe((e) => {
			this.pendingSettingsChanges = e;
		}), this.transport.fromDevice.pipeTo(Lc(this));
	}
	async sendText(e, t, n, r, i, a) {
		this.log.debug(F[F.SendText], `📤 Sending message to ${t ?? "broadcast"} on channel ${r?.toString() ?? 0}`);
		let o = new TextEncoder();
		return await this.sendPacket(o.encode(e), E.PortNum.TEXT_MESSAGE_APP, t ?? "broadcast", r, n, !1, !0, i, a);
	}
	sendWaypoint(e, t, n) {
		return this.log.debug(F[F.SendWaypoint], `📤 Sending waypoint to ${t} on channel ${n?.toString() ?? 0}`), e.id = this.generateRandId(), this.sendPacket(y(k.WaypointSchema, e), E.PortNum.WAYPOINT_APP, t, n, !0, !1);
	}
	async sendPacket(e, t, n, r = mc.Primary, i = !0, a = !0, o = !1, s, c) {
		this.log.trace(F[F.SendPacket], `📤 Sending ${E.PortNum[t]} to ${n}`);
		let l = v(k.MeshPacketSchema, {
			payloadVariant: {
				case: "decoded",
				value: {
					payload: e,
					portnum: t,
					wantResponse: a,
					emoji: c,
					replyId: s,
					dest: 0,
					requestId: 0,
					source: 0
				}
			},
			from: this.myNodeInfo.myNodeNum,
			to: n === "broadcast" ? Js.broadcastNum : n === "self" ? this.myNodeInfo.myNodeNum : n,
			id: this.generateRandId(),
			wantAck: i,
			channel: r
		}), u = v(k.ToRadioSchema, { payloadVariant: {
			case: "packet",
			value: l
		} });
		return o && (l.rxTime = Math.trunc(Date.now() / 1e3), this.handleMeshPacket(l)), await this.sendRaw(y(k.ToRadioSchema, u), l.id);
	}
	async sendRaw(e, t = this.generateRandId()) {
		if (e.length > 512) throw Error("Message longer than 512 bytes, it will not be sent!");
		return this.queue.push({
			id: t,
			data: e
		}), await this.queue.processQueue(this.transport.toDevice), this.queue.wait(t);
	}
	async setConfig(e) {
		this.log.debug(F[F.SetConfig], `⚙️ Setting config, Variant: ${e.payloadVariant.case ?? "Unknown"}`), this.pendingSettingsChanges || await this.beginEditSettings();
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "setConfig",
			value: e
		} });
		return this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async setModuleConfig(e) {
		this.log.debug(F[F.SetModuleConfig], "⚙️ Setting module config");
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "setModuleConfig",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async setCannedMessages(e) {
		this.log.debug(F[F.SetCannedMessages], "⚙️ Setting CannedMessages");
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "setCannedMessageModuleMessages",
			value: e.messages
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async setOwner(e) {
		this.log.debug(F[F.SetOwner], "👤 Setting owner");
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "setOwner",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async setChannel(e) {
		this.log.debug(F[F.SetChannel], `📻 Setting Channel: ${e.index}`);
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "setChannel",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async enterDfuMode() {
		this.log.debug(F[F.EnterDfuMode], "🔌 Entering DFU mode");
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "enterDfuModeRequest",
			value: !0
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self");
	}
	async setPosition(e) {
		return await this.sendPacket(y(k.PositionSchema, e), E.PortNum.POSITION_APP, "self");
	}
	async setFixedPosition(e, t) {
		let n = v(j.AdminMessageSchema, { payloadVariant: {
			case: "setFixedPosition",
			value: v(k.PositionSchema, {
				latitudeI: Math.floor(e / 1e-7),
				longitudeI: Math.floor(t / 1e-7)
			})
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, n), E.PortNum.ADMIN_APP, "self", 0, !0, !1);
	}
	async removeFixedPosition() {
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "removeFixedPosition",
			value: !0
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self", 0, !0, !1);
	}
	async getChannel(e) {
		this.log.debug(F[F.GetChannel], `📻 Requesting Channel: ${e}`);
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "getChannelRequest",
			value: e + 1
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async getConfig(e) {
		this.log.debug(F[F.GetConfig], "⚙️ Requesting config");
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "getConfigRequest",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async getModuleConfig(e) {
		this.log.debug(F[F.GetModuleConfig], "⚙️ Requesting module config");
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "getModuleConfigRequest",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async getOwner() {
		this.log.debug(F[F.GetOwner], "👤 Requesting owner");
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "getOwnerRequest",
			value: !0
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self");
	}
	async getMetadata(e) {
		this.log.debug(F[F.GetMetadata], `🏷️ Requesting metadata from ${e}`);
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "getDeviceMetadataRequest",
			value: !0
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, e, mc.Admin);
	}
	async clearChannel(e) {
		this.log.debug(F[F.ClearChannel], `📻 Clearing Channel ${e}`);
		let t = v(Ir.ChannelSchema, {
			index: e,
			role: Ir.Channel_Role.DISABLED
		}), n = v(j.AdminMessageSchema, { payloadVariant: {
			case: "setChannel",
			value: t
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, n), E.PortNum.ADMIN_APP, "self");
	}
	async beginEditSettings() {
		this.events.onPendingSettingsChange.dispatch(!0);
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "beginEditSettings",
			value: !0
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self");
	}
	async commitEditSettings() {
		this.events.onPendingSettingsChange.dispatch(!1);
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "commitEditSettings",
			value: !0
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self");
	}
	async resetNodes() {
		this.log.debug(F[F.ResetNodes], "📻 Resetting NodeDB");
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "nodedbReset",
			value: 1
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self");
	}
	async removeNodeByNum(e) {
		this.log.debug(F[F.RemoveNodeByNum], `📻 Removing Node ${e} from NodeDB`);
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "removeByNodenum",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async shutdown(e) {
		this.log.debug(F[F.Shutdown], `🔌 Shutting down ${e > 2 ? "now" : `in ${e} seconds`}`);
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "shutdownSeconds",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async reboot(e) {
		this.log.debug(F[F.Reboot], `🔌 Rebooting node ${e === 0 ? "now" : `in ${e} seconds`}`);
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "rebootSeconds",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async rebootOta(e) {
		this.log.debug(F[F.RebootOta], `🔌 Rebooting into OTA mode ${e === 0 ? "now" : `in ${e} seconds`}`);
		let t = v(j.AdminMessageSchema, { payloadVariant: {
			case: "rebootOtaSeconds",
			value: e
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, t), E.PortNum.ADMIN_APP, "self");
	}
	async factoryResetDevice() {
		this.log.debug(F[F.FactoryReset], "♻️ Factory resetting device");
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "factoryResetDevice",
			value: 1
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self");
	}
	async factoryResetConfig() {
		this.log.debug(F[F.FactoryReset], "♻️ Factory resetting config");
		let e = v(j.AdminMessageSchema, { payloadVariant: {
			case: "factoryResetConfig",
			value: 1
		} });
		return await this.sendPacket(y(j.AdminMessageSchema, e), E.PortNum.ADMIN_APP, "self");
	}
	configure() {
		this.log.debug(F[F.Configure], "⚙️ Requesting device configuration"), this.updateDeviceStatus(fc.DeviceConfiguring);
		let e = v(k.ToRadioSchema, { payloadVariant: {
			case: "wantConfigId",
			value: this.configId
		} });
		return this.sendRaw(y(k.ToRadioSchema, e)).catch((e) => {
			throw this.deviceStatus === fc.DeviceDisconnected ? Error("Device connection lost") : e;
		});
	}
	heartbeat() {
		this.log.debug(F[F.Ping], "❤️ Send heartbeat ping to radio");
		let e = v(k.ToRadioSchema, { payloadVariant: {
			case: "heartbeat",
			value: {}
		} });
		return this.sendRaw(y(k.ToRadioSchema, e));
	}
	setHeartbeatInterval(e) {
		this._heartbeatIntervalId !== void 0 && clearInterval(this._heartbeatIntervalId), this._heartbeatIntervalId = setInterval(() => {
			this.heartbeat().catch((e) => {
				this.log.error(F[F.Ping], `⚠️ Unable to send heartbeat: ${e.message}`);
			});
		}, e);
	}
	async traceRoute(e) {
		let t = v(k.RouteDiscoverySchema, { route: [] });
		return await this.sendPacket(y(k.RouteDiscoverySchema, t), E.PortNum.TRACEROUTE_APP, e);
	}
	async requestPosition(e) {
		return await this.sendPacket(/* @__PURE__ */ new Uint8Array(), E.PortNum.POSITION_APP, e);
	}
	updateDeviceStatus(e) {
		e !== this.deviceStatus && this.events.onDeviceStatus.dispatch(e);
	}
	generateRandId() {
		let e = crypto.getRandomValues(/* @__PURE__ */ new Uint32Array(1));
		if (!e[0]) throw Error("Cannot generate CSPRN");
		return Math.floor(e[0] * 2 ** -32 * 1e9);
	}
	complete() {
		this.queue.clear();
	}
	async disconnect() {
		this.log.debug(F[F.Disconnect], "🔌 Disconnecting from device"), this._heartbeatIntervalId !== void 0 && clearInterval(this._heartbeatIntervalId), this.complete(), await this.transport.toDevice.close(), await this.transport.disconnect();
	}
	handleMeshPacket(e) {
		switch (this.events.onMeshPacket.dispatch(e), e.from !== this.myNodeInfo.myNodeNum && this.events.onMeshHeartbeat.dispatch(/* @__PURE__ */ new Date()), e.payloadVariant.case) {
			case "decoded":
				this.handleDecodedPacket(e.payloadVariant.value, e);
				break;
			case "encrypted":
				this.log.debug(F[F.HandleMeshPacket], "🔐 Device received encrypted data packet, ignoring.");
				break;
			default: throw Error(`Unhandled case ${e.payloadVariant.case}`);
		}
	}
	handleDecodedPacket(e, t) {
		let n, r, i = {
			id: t.id,
			rxTime: /* @__PURE__ */ new Date(t.rxTime * 1e3),
			type: t.to === Js.broadcastNum ? "broadcast" : "direct",
			from: t.from,
			to: t.to,
			channel: t.channel
		};
		switch (this.log.trace(F[F.HandleMeshPacket], `📦 Received ${E.PortNum[e.portnum]} packet`), e.portnum) {
			case E.PortNum.TEXT_MESSAGE_APP:
				this.events.onMessagePacket.dispatch({
					...i,
					data: new TextDecoder().decode(e.payload)
				});
				break;
			case E.PortNum.REMOTE_HARDWARE_APP:
				this.events.onRemoteHardwarePacket.dispatch({
					...i,
					data: x(Ms.HardwareMessageSchema, e.payload)
				});
				break;
			case E.PortNum.POSITION_APP:
				this.events.onPositionPacket.dispatch({
					...i,
					data: x(k.PositionSchema, e.payload)
				});
				break;
			case E.PortNum.NODEINFO_APP:
				this.events.onUserPacket.dispatch({
					...i,
					data: x(k.UserSchema, e.payload)
				});
				break;
			case E.PortNum.ROUTING_APP:
				switch (r = x(k.RoutingSchema, e.payload), this.events.onRoutingPacket.dispatch({
					...i,
					data: r
				}), r.variant.case) {
					case "errorReason":
						r.variant.value === k.Routing_Error.NONE ? this.queue.processAck(e.requestId) : this.queue.processError({
							id: e.requestId,
							error: r.variant.value
						});
						break;
					case "routeReply":
					case "routeRequest": break;
					default: throw Error(`Unhandled case ${r.variant.case}`);
				}
				break;
			case E.PortNum.ADMIN_APP:
				switch (n = x(j.AdminMessageSchema, e.payload), n.payloadVariant.case) {
					case "getChannelResponse":
						this.events.onChannelPacket.dispatch(n.payloadVariant.value);
						break;
					case "getOwnerResponse":
						this.events.onUserPacket.dispatch({
							...i,
							data: n.payloadVariant.value
						});
						break;
					case "getConfigResponse":
						this.events.onConfigPacket.dispatch(n.payloadVariant.value);
						break;
					case "getModuleConfigResponse":
						this.events.onModuleConfigPacket.dispatch(n.payloadVariant.value);
						break;
					case "getDeviceMetadataResponse":
						this.log.debug(F[F.GetMetadata], `🏷️ Received metadata packet from ${e.source}`), this.events.onDeviceMetadataPacket.dispatch({
							...i,
							data: n.payloadVariant.value
						});
						break;
					case "getCannedMessageModuleMessagesResponse":
						this.log.debug(F[F.GetMetadata], "🥫 Received CannedMessage Module Messages response packet"), this.events.onCannedMessageModulePacket.dispatch({
							...i,
							data: n.payloadVariant.value
						});
						break;
					default: this.log.error(F[F.HandleMeshPacket], `⚠️ Received unhandled AdminMessage, type ${n.payloadVariant.case ?? "undefined"}`, e.payload);
				}
				break;
			case E.PortNum.WAYPOINT_APP:
				this.events.onWaypointPacket.dispatch({
					...i,
					data: x(k.WaypointSchema, e.payload)
				});
				break;
			case E.PortNum.AUDIO_APP:
				this.events.onAudioPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.DETECTION_SENSOR_APP:
				this.events.onDetectionSensorPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.REPLY_APP:
				this.events.onPingPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.IP_TUNNEL_APP:
				this.events.onIpTunnelPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.PAXCOUNTER_APP:
				this.events.onPaxcounterPacket.dispatch({
					...i,
					data: x(xs.PaxcountSchema, e.payload)
				});
				break;
			case E.PortNum.SERIAL_APP:
				this.events.onSerialPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.STORE_FORWARD_APP:
				this.events.onStoreForwardPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.RANGE_TEST_APP:
				this.events.onRangeTestPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.TELEMETRY_APP:
				this.events.onTelemetryPacket.dispatch({
					...i,
					data: x(va.TelemetrySchema, e.payload)
				});
				break;
			case E.PortNum.ZPS_APP:
				this.events.onZpsPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.SIMULATOR_APP:
				this.events.onSimulatorPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.TRACEROUTE_APP:
				this.events.onTraceRoutePacket.dispatch({
					...i,
					data: x(k.RouteDiscoverySchema, e.payload)
				});
				break;
			case E.PortNum.NEIGHBORINFO_APP:
				this.events.onNeighborInfoPacket.dispatch({
					...i,
					data: x(k.NeighborInfoSchema, e.payload)
				});
				break;
			case E.PortNum.ATAK_PLUGIN:
				this.events.onAtakPluginPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.MAP_REPORT_APP:
				this.events.onMapReportPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.PRIVATE_APP:
				this.events.onPrivatePacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case E.PortNum.ATAK_FORWARDER:
				this.events.onAtakForwarderPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			default: throw Error(`Unhandled case ${e.portnum}`);
		}
	}
}, zc = class e {
	static async create(t) {
		let n = await navigator.serial.requestPort();
		return await n.open({ baudRate: t || 115200 }), new e(n);
	}
	static async createFromPort(t, n) {
		return t.readable && t.writable || await t.open({ baudRate: n || 115200 }), new e(t);
	}
	constructor(e) {
		if (this.pipePromise = null, this.lastStatus = P.DeviceStatusEnum.DeviceDisconnected, this.closingByUser = !1, !e.readable || !e.writable) throw Error("Stream not accessible");
		this.connection = e, this.portReadable = e.readable, this.abortController = new AbortController();
		let t = this.abortController, n = Ic.toDeviceStream();
		this.pipePromise = n.readable.pipeTo(e.writable, { signal: this.abortController.signal }).catch((e) => {
			t.signal.aborted || (console.error("Error piping data to serial port:", e), this.connection.close().catch(() => {}), this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "write-error"));
		}), this._toDevice = n.writable, this._fromDevice = new ReadableStream({ start: async (e) => {
			this.fromDeviceController = e, this.emitStatus(P.DeviceStatusEnum.DeviceConnecting);
			let t = this.portReadable.pipeThrough(Ic.fromDeviceStream()), n = t.getReader(), r = (e) => {
				let { port: t } = e;
				t && t === this.connection && this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "serial-disconnected");
			};
			navigator.serial.addEventListener("disconnect", r), this.emitStatus(P.DeviceStatusEnum.DeviceConnected);
			try {
				for (;;) {
					let { value: t, done: r } = await n.read();
					if (r) break;
					e.enqueue(t);
				}
				e.close();
			} catch (n) {
				this.closingByUser || this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "read-error"), e.error(n instanceof Error ? n : Error(String(n)));
				try {
					await t.cancel();
				} catch {}
			} finally {
				n.releaseLock(), navigator.serial.removeEventListener("disconnect", r);
			}
		} });
	}
	get toDevice() {
		return this._toDevice;
	}
	get fromDevice() {
		return this._fromDevice;
	}
	emitStatus(e, t) {
		e !== this.lastStatus && (this.lastStatus = e, this.fromDeviceController?.enqueue({
			type: "status",
			data: {
				status: e,
				reason: t
			}
		}));
	}
	async disconnect() {
		try {
			if (this.closingByUser = !0, this.abortController.abort(), this.pipePromise && await this.pipePromise, this._fromDevice?.locked) try {
				await this._fromDevice.cancel();
			} catch {}
			await this.connection.close();
		} catch (e) {
			console.warn("Could not cleanly disconnect serial port:", e);
		} finally {
			this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "user"), this.closingByUser = !1;
		}
	}
	async reconnect() {
		this.emitStatus(P.DeviceStatusEnum.DeviceConnecting, "reconnect");
		try {
			if (!this.connection.readable || !this.connection.writable) throw Error("Stream not accessible");
			this.portReadable = this.connection.readable, this.abortController = new AbortController();
			let e = this.abortController;
			this.pipePromise = Ic.toDeviceStream().readable.pipeTo(this.connection.writable, { signal: this.abortController.signal }).catch((t) => {
				e.signal.aborted || (console.error("Error piping data to serial port (reconnect):", t), this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "write-error"));
			}), this.emitStatus(P.DeviceStatusEnum.DeviceConnected, "reconnected");
		} catch (e) {
			throw this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "reconnect-failed"), e;
		}
	}
};
// node_modules/@meshtastic/transport-web-bluetooth/dist/mod.js
function Bc(e) {
	return e.buffer instanceof ArrayBuffer && e.byteOffset === 0 && e.byteLength === e.buffer.byteLength ? e.buffer : e.slice().buffer;
}
var Vc = class e {
	static {
		this.ToRadioUuid = "f75c76d2-129e-4dad-a1dd-7866124401e7";
	}
	static {
		this.FromRadioUuid = "2c55e69e-4993-11ed-b878-0242ac120002";
	}
	static {
		this.FromNumUuid = "ed9da18c-a800-4f66-a670-aa7547e34453";
	}
	static {
		this.ServiceUuid = "6ba1b218-15a8-461f-9fa8-5dcae273eafd";
	}
	static async create() {
		let t = await navigator.bluetooth.requestDevice({ filters: [{ services: [e.ServiceUuid] }] });
		return await e.prepareConnection(t);
	}
	static async createFromDevice(t) {
		return await e.prepareConnection(t);
	}
	static async prepareConnection(t) {
		let n = await t.gatt?.connect();
		if (!n) throw Error("Failed to connect to GATT server");
		let r = await n.getPrimaryService(e.ServiceUuid), i = await r.getCharacteristic(e.ToRadioUuid), a = await r.getCharacteristic(e.FromRadioUuid), o = await r.getCharacteristic(e.FromNumUuid);
		if (!i || !a || !o) throw Error("Failed to find required characteristics");
		return new e(i, a, o, n);
	}
	constructor(e, t, n, r) {
		this.lastStatus = P.DeviceStatusEnum.DeviceDisconnected, this.closingByUser = !1, this.reading = !1, this.onGattDisconnected = () => {
			this.closingByUser || this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "gatt-disconnected");
		}, this.onFromNumChanged = () => {
			this.readFromRadio();
		}, this.toRadioCharacteristic = e, this.fromRadioCharacteristic = t, this.fromNumCharacteristic = n, this.gattServer = r, this._fromDevice = new ReadableStream({ start: async (e) => {
			this.fromDeviceController = e, this.emitStatus(P.DeviceStatusEnum.DeviceConnecting), this.gattServer.device.addEventListener("gattserverdisconnected", this.onGattDisconnected);
			try {
				await this.fromNumCharacteristic.startNotifications(), this.fromNumCharacteristic.addEventListener("characteristicvaluechanged", this.onFromNumChanged), this.emitStatus(P.DeviceStatusEnum.DeviceConnected), this.readFromRadio();
			} catch {
				this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "notify-failed"), this.gattServer.device.removeEventListener("gattserverdisconnected", this.onGattDisconnected);
			}
		} }), this._toDevice = new WritableStream({ write: async (e) => {
			try {
				let t = Bc(e);
				await this.toRadioCharacteristic.writeValue(t), this.readFromRadio();
			} catch (e) {
				throw this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "write-error"), e;
			}
		} });
	}
	get toDevice() {
		return this._toDevice;
	}
	get fromDevice() {
		return this._fromDevice;
	}
	disconnect() {
		try {
			this.closingByUser = !0, this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "user");
			try {
				this.fromNumCharacteristic.stopNotifications?.();
			} catch {}
			this.fromNumCharacteristic.removeEventListener("characteristicvaluechanged", this.onFromNumChanged), this.gattServer.device.removeEventListener("gattserverdisconnected", this.onGattDisconnected), this.gattServer.disconnect();
		} finally {
			this.closingByUser = !1;
		}
		return Promise.resolve();
	}
	async readFromRadio() {
		if (!this.reading) {
			this.reading = !0;
			try {
				let e = !0;
				for (; e && this.fromRadioCharacteristic;) {
					let t = await this.fromRadioCharacteristic.readValue();
					t.byteLength === 0 ? e = !1 : this.enqueue({
						type: "packet",
						data: new Uint8Array(t.buffer)
					});
				}
			} catch (e) {
				throw this.closingByUser || this.emitStatus(P.DeviceStatusEnum.DeviceDisconnected, "read-error"), e;
			} finally {
				this.reading = !1;
			}
		}
	}
	emitStatus(e, t) {
		e !== this.lastStatus && (this.lastStatus = e, this.fromDeviceController?.enqueue({
			type: "status",
			data: {
				status: e,
				reason: t
			}
		}));
	}
	enqueue(e) {
		this.fromDeviceController?.enqueue(e);
	}
};
// node_modules/@bufbuild/protobuf/dist/esm/is-message.js
function Hc(e, t) {
	return typeof e == "object" && e && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 || t.typeName === e.$typeName : !1;
}
// node_modules/@bufbuild/protobuf/dist/esm/descriptors.js
var L;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(L ||= {});
// node_modules/@bufbuild/protobuf/dist/esm/wire/varint.js
function Uc() {
	let e = this.buf, t = this.pos, n = 0, r = 0;
	for (let i = 0; i < 28; i += 7) {
		let a = e[t++];
		if (n |= (a & 127) << i, !(a & 128)) {
			this.pos = t, this.assertBounds(), this.varint64Lo = n, this.varint64Hi = r;
			return;
		}
	}
	let i = e[t++];
	if (n |= (i & 15) << 28, r = (i & 112) >> 4, !(i & 128)) this.pos = t, this.assertBounds(), this.varint64Lo = n, this.varint64Hi = r;
	else {
		for (let i = 3; i <= 31; i += 7) {
			let a = e[t++];
			if (r |= (a & 127) << i, !(a & 128)) {
				this.pos = t, this.assertBounds(), this.varint64Lo = n, this.varint64Hi = r;
				return;
			}
		}
		throw Error("invalid varint");
	}
}
var Wc = 4294967296;
function Gc(e) {
	let t = e[0] === "-";
	t && (e = e.slice(1));
	let n = 1e6, r = 0, i = 0;
	function a(t, a) {
		let o = Number(e.slice(t, a));
		i *= n, r = r * n + o, r >= Wc && (i += r / Wc | 0, r %= Wc);
	}
	return a(-24, -18), a(-18, -12), a(-12, -6), a(-6), t ? Xc(r, i) : Yc(r, i);
}
function Kc(e, t) {
	let n = Yc(e, t), r = n.hi & 0x80000000;
	r && (n = Xc(n.lo, n.hi));
	let i = qc(n.lo, n.hi);
	return r ? "-" + i : i;
}
function qc(e, t) {
	if ({lo: e, hi: t} = Jc(e, t), t <= 2097151) return String(Wc * t + e);
	let n = e & 0xffffff, r = (e >>> 24 | t << 8) & 0xffffff, i = t >> 16 & 65535, a = n + r * 6777216 + i * 6710656, o = r + i * 8147497, s = i * 2, c = 1e7;
	return a >= c && (o += Math.floor(a / c), a %= c), o >= c && (s += Math.floor(o / c), o %= c), s.toString() + Zc(o) + Zc(a);
}
function Jc(e, t) {
	return {
		lo: e >>> 0,
		hi: t >>> 0
	};
}
function Yc(e, t) {
	return {
		lo: e | 0,
		hi: t | 0
	};
}
function Xc(e, t) {
	return t = ~t, e ? e = ~e + 1 : t += 1, Yc(e, t);
}
var Zc = (e) => {
	let t = String(e);
	return "0000000".slice(t.length) + t;
};
function Qc(e, t) {
	if (e >>> 0 < 128) t.push(e);
	else if (e >= 0) {
		for (; e > 127;) t.push(e & 127 | 128), e >>>= 7;
		t.push(e);
	} else {
		for (let n = 0; n < 9; n++) t.push(e & 127 | 128), e >>= 7;
		t.push(1);
	}
}
function $c() {
	let e = this.buf[this.pos++];
	if (!(e & 128)) return this.assertBounds(), e;
	let t = e & 127;
	if (e = this.buf[this.pos++], t |= (e & 127) << 7, !(e & 128) || (e = this.buf[this.pos++], t |= (e & 127) << 14, !(e & 128)) || (e = this.buf[this.pos++], t |= (e & 127) << 21, !(e & 128))) return this.assertBounds(), t;
	e = this.buf[this.pos++], t |= (e & 15) << 28;
	for (let t = 5; e & 128 && t < 10; t++) e = this.buf[this.pos++];
	if (e & 128) throw Error("invalid varint");
	return this.assertBounds(), t >>> 0;
}
// node_modules/@bufbuild/protobuf/dist/esm/proto-int64.js
var R = /*@__PURE__*/ el();
function el() {
	let e = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	if (typeof BigInt == "function" && typeof e.getBigInt64 == "function" && typeof e.getBigUint64 == "function" && typeof e.setBigInt64 == "function" && typeof e.setBigUint64 == "function" && (globalThis.Deno || globalThis.Bun || typeof process != "object" || typeof process.env != "object" || process.env.BUF_BIGINT_DISABLE !== "1")) {
		let t = BigInt("-9223372036854775808"), n = BigInt("9223372036854775807"), r = BigInt("0"), i = BigInt("18446744073709551615");
		return {
			zero: BigInt(0),
			supported: !0,
			parse(e) {
				let r = typeof e == "bigint" ? e : BigInt(e);
				if (r > n || r < t) throw Error(`invalid int64: ${e}`);
				return r;
			},
			uParse(e) {
				let t = typeof e == "bigint" ? e : BigInt(e);
				if (t > i || t < r) throw Error(`invalid uint64: ${e}`);
				return t;
			},
			enc(t) {
				return e.setBigInt64(0, this.parse(t), !0), {
					lo: e.getInt32(0, !0),
					hi: e.getInt32(4, !0)
				};
			},
			uEnc(t) {
				return e.setBigInt64(0, this.uParse(t), !0), {
					lo: e.getInt32(0, !0),
					hi: e.getInt32(4, !0)
				};
			},
			dec(t, n) {
				return e.setInt32(0, t, !0), e.setInt32(4, n, !0), e.getBigInt64(0, !0);
			},
			uDec(t, n) {
				return e.setInt32(0, t, !0), e.setInt32(4, n, !0), e.getBigUint64(0, !0);
			}
		};
	}
	return {
		zero: "0",
		supported: !1,
		parse(e) {
			return typeof e != "string" && (e = e.toString()), tl(e), e;
		},
		uParse(e) {
			return typeof e != "string" && (e = e.toString()), nl(e), e;
		},
		enc(e) {
			return typeof e != "string" && (e = e.toString()), tl(e), Gc(e);
		},
		uEnc(e) {
			return typeof e != "string" && (e = e.toString()), nl(e), Gc(e);
		},
		dec(e, t) {
			return Kc(e, t);
		},
		uDec(e, t) {
			return qc(e, t);
		}
	};
}
function tl(e) {
	if (!/^-?[0-9]+$/.test(e)) throw Error("invalid int64: " + e);
}
function nl(e) {
	if (!/^[0-9]+$/.test(e)) throw Error("invalid uint64: " + e);
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/scalar.js
function rl(e, t) {
	switch (e) {
		case L.STRING: return "";
		case L.BOOL: return !1;
		case L.DOUBLE:
		case L.FLOAT: return 0;
		case L.INT64:
		case L.UINT64:
		case L.SFIXED64:
		case L.FIXED64:
		case L.SINT64: return t ? "0" : R.zero;
		case L.BYTES: return /* @__PURE__ */ new Uint8Array();
		default: return 0;
	}
}
function il(e, t) {
	switch (e) {
		case L.BOOL: return t === !1;
		case L.STRING: return t === "";
		case L.BYTES: return t instanceof Uint8Array && !t.byteLength;
		case L.DOUBLE:
		case L.FLOAT: return Object.is(t, 0);
		default: return t == 0;
	}
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/unsafe.js
var al = 2, z = Symbol.for("reflect unsafe local");
function ol(e, t) {
	let n = e[t.localName].case;
	return n === void 0 ? n : t.fields.find((e) => e.localName === n);
}
function sl(e, t) {
	let n = t.localName;
	if (t.oneof) return e[t.oneof.localName].case === n;
	if (t.presence != al) return e[n] !== void 0 && Object.prototype.hasOwnProperty.call(e, n);
	switch (t.fieldKind) {
		case "list": return e[n].length > 0;
		case "map": return Object.keys(e[n]).length > 0;
		case "scalar": return !il(t.scalar, e[n]);
		case "enum": return e[n] !== t.enum.values[0].number;
	}
	throw Error("message field with implicit presence");
}
function cl(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function ll(e, t) {
	if (t.oneof) {
		let n = e[t.oneof.localName];
		return n.case === t.localName ? n.value : void 0;
	}
	return e[t.localName];
}
function ul(e, t, n) {
	t.oneof ? e[t.oneof.localName] = {
		case: t.localName,
		value: n
	} : e[t.localName] = n;
}
function B(e, t, n) {
	t === "__proto__" ? Object.defineProperty(e, "__proto__", {
		value: n,
		writable: !0,
		enumerable: !0,
		configurable: !0
	}) : e[t] = n;
}
function dl(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t) ? e[t] : void 0;
}
function fl(e, t) {
	let n = t.localName;
	if (t.oneof) {
		let r = t.oneof.localName;
		e[r].case === n && (e[r] = { case: void 0 });
	} else if (t.presence != al) delete e[n];
	else switch (t.fieldKind) {
		case "map":
			e[n] = {};
			break;
		case "list":
			e[n] = [];
			break;
		case "enum":
			e[n] = t.enum.values[0].number;
			break;
		case "scalar": e[n] = rl(t.scalar, t.longAsString);
	}
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/guard.js
function pl(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function ml(e, t) {
	if (pl(e) && z in e && "add" in e && "field" in e && typeof e.field == "function") {
		if (t !== void 0) {
			let n = t, r = e.field();
			return n.listKind == r.listKind && n.scalar === r.scalar && n.message?.typeName === r.message?.typeName && n.enum?.typeName === r.enum?.typeName;
		}
		return !0;
	}
	return !1;
}
function hl(e, t) {
	if (pl(e) && z in e && "has" in e && "field" in e && typeof e.field == "function") {
		if (t !== void 0) {
			let n = t, r = e.field();
			return n.mapKey === r.mapKey && n.mapKind == r.mapKind && n.scalar === r.scalar && n.message?.typeName === r.message?.typeName && n.enum?.typeName === r.enum?.typeName;
		}
		return !0;
	}
	return !1;
}
function gl(e, t) {
	return pl(e) && z in e && "desc" in e && pl(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
// node_modules/@bufbuild/protobuf/dist/esm/wkt/wrappers.js
function _l(e) {
	return xl(e.$typeName);
}
function vl(e) {
	let t = e.fields[0];
	return xl(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function yl(e) {
	switch (e.typeName) {
		case "google.protobuf.Any":
		case "google.protobuf.Timestamp":
		case "google.protobuf.Duration":
		case "google.protobuf.FieldMask":
		case "google.protobuf.Struct":
		case "google.protobuf.Value":
		case "google.protobuf.ListValue": return !0;
		default: return vl(e);
	}
}
var bl = /*@__PURE__*/ new Set([
	"google.protobuf.DoubleValue",
	"google.protobuf.FloatValue",
	"google.protobuf.Int64Value",
	"google.protobuf.UInt64Value",
	"google.protobuf.Int32Value",
	"google.protobuf.UInt32Value",
	"google.protobuf.BoolValue",
	"google.protobuf.StringValue",
	"google.protobuf.BytesValue"
]);
function xl(e) {
	return bl.has(e);
}
// node_modules/@bufbuild/protobuf/dist/esm/create.js
var Sl = 999, Cl = 998, wl = 2;
function V(e, t) {
	return Hc(t, e) ? t : El(e)(t);
}
var Tl = /* @__PURE__ */ new WeakMap();
function El(e) {
	let t = Tl.get(e);
	return t === void 0 && (t = jl(e), Tl.set(e, t)), t;
}
var Dl = 0, Ol = 1, kl = 2, Al = 3;
function jl(e) {
	let t = e.typeName, { properties: n, prototype: r } = Ml(e);
	return (e) => {
		let i;
		r === void 0 ? i = { $typeName: t } : (i = Object.create(r), i.$typeName = t);
		for (let t = 0; t < n.length; t++) {
			let r = n[t], a = r.name, o = e?.[a];
			switch (r.kind) {
				case Dl:
					o == null ? r.constant !== void 0 && (i[a] = r.constant) : i[a] = r.convert === void 0 ? o : r.convert(o);
					break;
				case Ol:
					i[a] = r.convert !== void 0 && Array.isArray(o) ? o.map(r.convert) : o ?? [];
					break;
				case kl:
					if (r.convert === void 0 || !pl(o)) i[a] = o ?? {};
					else {
						let e = {}, t = Object.keys(o);
						for (let n = 0; n < t.length; n++) B(e, t[n], r.convert(o[t[n]]));
						i[a] = e;
					}
					break;
				case Al: {
					let e = o;
					if (e?.case != null) {
						let t = r.convert.get(e.case);
						if (t !== void 0) {
							i[a] = {
								case: e.case,
								value: t(e.value)
							};
							break;
						}
					}
					i[a] = { case: void 0 };
					break;
				}
			}
		}
		return i;
	};
}
function Ml(e) {
	let t = [], n = {}, r = Il(e);
	for (let i of e.members) {
		let e = i.localName;
		if (i.kind == "oneof") t.push({
			name: e,
			kind: Al,
			constant: void 0,
			convert: Nl(i)
		});
		else switch (i.fieldKind) {
			case "message":
				t.push({
					name: e,
					kind: Dl,
					constant: void 0,
					convert: Pl(i)
				});
				break;
			case "list":
				t.push({
					name: e,
					kind: Ol,
					constant: void 0,
					convert: i.listKind == "message" ? Pl(i) ?? ((e) => e) : i.scalar == L.BYTES ? Fl : void 0
				});
				break;
			case "map":
				t.push({
					name: e,
					kind: kl,
					constant: void 0,
					convert: i.mapKind == "message" ? Pl(i) ?? ((e) => e) : i.scalar == L.BYTES ? Fl : void 0
				});
				break;
			default: {
				let a = Ll(i);
				t.push({
					name: e,
					kind: Dl,
					constant: i.presence == wl ? a : void 0,
					convert: i.fieldKind == "scalar" && i.scalar == L.BYTES ? Fl : void 0
				}), r && (n[e] = a);
				break;
			}
		}
	}
	return {
		properties: t,
		prototype: r ? n : void 0
	};
}
function Nl(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.fields) {
		let e;
		n.fieldKind == "message" ? e = Pl(n) : n.fieldKind == "scalar" && n.scalar == L.BYTES && (e = Fl), t.set(n.localName, e ?? ((e) => e));
	}
	return t;
}
function Pl(e) {
	if (e.fieldKind == "message" && !e.oneof && vl(e.message)) return e.message.fields[0].scalar == L.BYTES ? Fl : void 0;
	if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value") return;
	let t = e.message, n;
	return (e) => !pl(e) || Hc(e, t) ? e : (n ??= El(t), n(e));
}
function Fl(e) {
	return Array.isArray(e) ? new Uint8Array(e) : e;
}
function Il(e) {
	switch (e.file.edition) {
		case Sl: return !1;
		case Cl: return !0;
		default: return e.fields.some((e) => e.presence != wl && e.fieldKind != "message" && !e.oneof);
	}
}
function Ll(e) {
	let t = e.getDefaultValue();
	return t === void 0 ? e.fieldKind == "scalar" ? rl(e.scalar, e.longAsString) : e.enum.values[0].number : e.fieldKind == "scalar" && e.longAsString ? t.toString() : t;
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/error.js
var Rl = [
	"FieldValueInvalidError",
	"FieldListRangeError",
	"ForeignFieldError"
], H = class extends Error {
	constructor(e, t, n = "FieldValueInvalidError") {
		super(t), this.name = n, this.field = () => e;
	}
};
function zl(e) {
	return e instanceof Error && Rl.includes(e.name) && "field" in e && typeof e.field == "function";
}
// node_modules/@bufbuild/protobuf/dist/esm/wire/text-encoding.js
var Bl;
function Vl(e) {
	Bl = Object.assign(Object.assign({}, e), { encodeUtf8Into: e.encodeUtf8Into ?? Ul(e.encodeUtf8.bind(e)) });
}
function Hl() {
	if (!Bl) {
		let e = globalThis;
		if (!e.TextEncoder || !e.TextDecoder) throw Error("encoding API missing: install TextEncoder and TextDecoder on globalThis");
		let t = new e.TextEncoder(), n = new e.TextDecoder("utf-8", { ignoreBOM: !0 }), r, i = {
			encodeUtf8(e) {
				return t.encode(e);
			},
			decodeUtf8(t, i) {
				return i ? (r ||= new e.TextDecoder("utf-8", {
					fatal: !0,
					ignoreBOM: !0
				}), r.decode(t)) : n.decode(t);
			},
			checkUtf8(e) {
				try {
					return encodeURIComponent(e), !0;
				} catch {
					return !1;
				}
			}
		};
		t.encodeInto && (i.encodeUtf8Into = t.encodeInto.bind(t));
		let a = String.prototype.isWellFormed;
		a && (i.checkUtf8 = (e) => a.call(e)), Vl(i);
	}
	return Bl;
}
function Ul(e) {
	return (t, n) => {
		let r = e(t);
		return n.set(r), { written: r.byteLength };
	};
}
// node_modules/@bufbuild/protobuf/dist/esm/wire/binary-encoding.js
var U;
(function(e) {
	e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(U ||= {});
var Wl = class {
	constructor(e) {
		this.stackPos = [], this.encodeUtf8Into = e ? Ul(e) : Hl().encodeUtf8Into, this.buffer = ql, this.viewCache = Jl, this.pos = 0;
	}
	ensureCapacity(e) {
		let t = this.pos + e;
		if (t > this.buffer.length) {
			let e = this.buffer.length || Gl;
			for (; e < t;) e *= 2;
			let n = new Uint8Array(e);
			this.pos > 0 && n.set(this.buffer), this.buffer = n;
		}
	}
	view() {
		let e = this.buffer, t = this.viewCache;
		if (t.byteLength === e.byteLength) return t;
		let n = new DataView(e.buffer);
		return this.viewCache = n, n;
	}
	finish() {
		let e = this.buffer.slice(0, this.pos);
		return this.pos = 0, this.stackPos = [], e;
	}
	fork() {
		return this.stackPos.push(this.pos), this.ensureCapacity(Kl), this.buffer[this.pos++] = 0, this;
	}
	join() {
		let e = this.stackPos.pop();
		if (e === void 0) throw Error("invalid state, fork stack empty");
		let t = this.pos - e - Kl, n = Xl(t);
		return n > Kl && (this.ensureCapacity(n - Kl), this.buffer.copyWithin(e + n, e + Kl, this.pos)), this.pos = e, this.uint32(t), this.pos += t, this;
	}
	tag(e, t) {
		return this.uint32((e << 3 | t) >>> 0);
	}
	raw(e) {
		return this.ensureCapacity(e.length), this.buffer.set(e, this.pos), this.pos += e.length, this;
	}
	uint32(e) {
		if ($l(e), this.ensureCapacity(5), e < 128) return this.buffer[this.pos++] = e, this;
		for (; e > 127;) this.buffer[this.pos++] = e & 127 | 128, e >>>= 7;
		return this.buffer[this.pos++] = e, this;
	}
	int32(e) {
		if (Ql(e), e >= 0) return this.uint32(e);
		this.ensureCapacity(10);
		for (let t = 0; t < 9; t++) this.buffer[this.pos++] = e & 127 | 128, e >>= 7;
		return this.buffer[this.pos++] = 1, this;
	}
	bool(e) {
		return this.ensureCapacity(1), this.buffer[this.pos++] = +!!e, this;
	}
	bytes(e) {
		return this.uint32(e.byteLength), this.raw(e);
	}
	string(e) {
		typeof e != "string" && (e = String(e));
		let t = e.length;
		if (t <= Yl) {
			this.ensureCapacity(t + 1);
			let n = this.buffer, r = this.pos;
			n[r++] = t;
			let i = 0;
			for (; i < t; i++) {
				let t = e.charCodeAt(i);
				if (t > 127) break;
				n[r++] = t;
			}
			if (i == t) return this.pos = r, this;
		}
		this.ensureCapacity(t * 3 + 5);
		let n = Xl(t), r = this.buffer, i = this.pos, { written: a } = this.encodeUtf8Into(e, r.subarray(i + n)), o = Xl(a);
		return o != n && r.copyWithin(i + o, i + n, i + n + a), this.uint32(a), this.pos += a, this;
	}
	float(e) {
		return eu(e), this.ensureCapacity(4), this.view().setFloat32(this.pos, e, !0), this.pos += 4, this;
	}
	double(e) {
		return this.ensureCapacity(8), this.view().setFloat64(this.pos, e, !0), this.pos += 8, this;
	}
	fixed32(e) {
		return $l(e), this.ensureCapacity(4), this.view().setUint32(this.pos, e, !0), this.pos += 4, this;
	}
	sfixed32(e) {
		return Ql(e), this.ensureCapacity(4), this.view().setInt32(this.pos, e, !0), this.pos += 4, this;
	}
	sint32(e) {
		return Ql(e), this.uint32((e << 1 ^ e >> 31) >>> 0);
	}
	sfixed64(e) {
		let t = R.enc(e);
		this.ensureCapacity(8);
		let n = this.view();
		return n.setInt32(this.pos, t.lo, !0), n.setInt32(this.pos + 4, t.hi, !0), this.pos += 8, this;
	}
	fixed64(e) {
		let t = R.uEnc(e);
		this.ensureCapacity(8);
		let n = this.view();
		return n.setInt32(this.pos, t.lo, !0), n.setInt32(this.pos + 4, t.hi, !0), this.pos += 8, this;
	}
	int64(e) {
		let t = R.enc(e);
		return this.writeVarint64(t.lo, t.hi);
	}
	sint64(e) {
		let t = R.enc(e), n = t.hi >> 31, r = t.lo << 1 ^ n, i = (t.hi << 1 | t.lo >>> 31) ^ n;
		return this.writeVarint64(r, i);
	}
	uint64(e) {
		let t = R.uEnc(e);
		return this.writeVarint64(t.lo, t.hi);
	}
	writeVarint64(e, t) {
		this.ensureCapacity(10);
		let n = this.buffer, r = this.pos;
		for (let i = 0; i < 28; i += 7) {
			let a = e >>> i, o = !(!(a >>> 7) && t == 0);
			if (n[r++] = (o ? a | 128 : a) & 255, !o) return this.pos = r, this;
		}
		let i = e >>> 28 & 15 | (t & 7) << 4, a = !!(t >> 3);
		if (n[r++] = (a ? i | 128 : i) & 255, !a) return this.pos = r, this;
		for (let e = 3; e < 31; e += 7) {
			let i = t >>> e, a = !!(i >>> 7);
			if (n[r++] = (a ? i | 128 : i) & 255, !a) return this.pos = r, this;
		}
		return n[r++] = t >>> 31 & 1, this.pos = r, this;
	}
}, Gl = 128, Kl = 1, ql = /* @__PURE__ */ new Uint8Array(), Jl = new DataView(ql.buffer), Yl = 32;
function Xl(e) {
	return e < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5;
}
var Zl = class {
	constructor(e, t = Hl().decodeUtf8) {
		this.decodeUtf8 = t, this.varint64Lo = 0, this.varint64Hi = 0, this.varint64 = Uc, this.uint32 = $c, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
	}
	tag() {
		let e = this.pos, t = this.uint32(), n = this.pos - e;
		if (n > 5 || n == 5 && this.buf[this.pos - 1] > 15) throw Error("illegal tag: varint overflows uint32");
		let r = t >>> 3, i = t & 7;
		if (r <= 0 || i > 5) throw Error("illegal tag: field no " + r + " wire type " + i);
		return [r, i];
	}
	skip(e, t, n = 100) {
		let r = this.pos;
		switch (e) {
			case U.Varint:
				for (; this.buf[this.pos++] & 128;);
				break;
			case U.Bit64: this.pos += 4;
			case U.Bit32:
				this.pos += 4;
				break;
			case U.LengthDelimited:
				let r = this.uint32();
				this.pos += r;
				break;
			case U.StartGroup:
				if (n <= 0) throw Error("maximum recursion depth reached");
				for (;;) {
					let [e, r] = this.tag();
					if (r === U.EndGroup) {
						if (t !== void 0 && e !== t) throw Error("invalid end group tag");
						break;
					}
					this.skip(r, e, n - 1);
				}
				break;
			default: throw Error("cant skip wire type " + e);
		}
		return this.assertBounds(), this.buf.subarray(r, this.pos);
	}
	assertBounds() {
		if (this.pos > this.len) throw RangeError("premature EOF");
	}
	int32() {
		return this.uint32() | 0;
	}
	sint32() {
		let e = this.uint32();
		return e >>> 1 ^ -(e & 1);
	}
	int64() {
		return this.varint64(), R.dec(this.varint64Lo, this.varint64Hi);
	}
	uint64() {
		return this.varint64(), R.uDec(this.varint64Lo, this.varint64Hi);
	}
	sint64() {
		this.varint64();
		let e = this.varint64Lo, t = this.varint64Hi, n = -(e & 1);
		return e = (e >>> 1 | (t & 1) << 31) ^ n, t = t >>> 1 ^ n, R.dec(e, t);
	}
	bool() {
		let e = this.buf[this.pos];
		return e < 128 ? (this.pos++, e !== 0) : (this.varint64(), this.varint64Lo !== 0 || this.varint64Hi !== 0);
	}
	fixed32() {
		return this.view.getUint32((this.pos += 4) - 4, !0);
	}
	sfixed32() {
		return this.view.getInt32((this.pos += 4) - 4, !0);
	}
	fixed64() {
		return R.uDec(this.sfixed32(), this.sfixed32());
	}
	sfixed64() {
		return R.dec(this.sfixed32(), this.sfixed32());
	}
	float() {
		return this.view.getFloat32((this.pos += 4) - 4, !0);
	}
	double() {
		return this.view.getFloat64((this.pos += 8) - 8, !0);
	}
	bytes() {
		let e = this.uint32(), t = this.pos;
		return this.pos += e, this.assertBounds(), this.buf.subarray(t, t + e);
	}
	string(e) {
		let t = this.uint32(), n = this.pos;
		this.pos += t, this.assertBounds();
		let r = this.buf;
		if (t <= Yl) {
			let i = Array(t);
			for (let a = 0; a < t; a++) {
				let t = r[n + a];
				if (t > 127) return this.decodeUtf8(r.subarray(n, this.pos), e);
				i[a] = t;
			}
			return String.fromCharCode.apply(String, i);
		}
		return this.decodeUtf8(r.subarray(n, this.pos), e);
	}
};
function Ql(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid int32: " + typeof e);
	if (!Number.isInteger(e) || e > 0x7fffffff || e < -0x80000000) throw Error("invalid int32: " + e);
}
function $l(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid uint32: " + typeof e);
	if (!Number.isInteger(e) || e > 0xffffffff || e < 0) throw Error("invalid uint32: " + e);
}
function eu(e) {
	if (typeof e == "string") {
		let t = e;
		if (e = Number(e), Number.isNaN(e) && t !== "NaN") throw Error("invalid float32: " + t);
	} else if (typeof e != "number") throw Error("invalid float32: " + typeof e);
	if (!Number.isFinite(Math.fround(e)) && Number.isFinite(e)) throw Error("invalid float32: " + e);
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect-check.js
function tu(e, t) {
	let n = e.fieldKind == "list" ? ml(t, e) : e.fieldKind == "map" ? hl(t, e) : iu(e, t);
	if (n === !0) return;
	let r;
	switch (e.fieldKind) {
		case "list":
			r = `expected ${su(e)}, got ${G(t)}`;
			break;
		case "map":
			r = `expected ${cu(e)}, got ${G(t)}`;
			break;
		default: r = W(e, t, n);
	}
	return new H(e, r);
}
function nu(e, t, n) {
	let r = iu(e, n);
	if (r !== !0) return new H(e, `list item #${t + 1}: ${W(e, n, r)}`);
}
function ru(e, t, n) {
	let r = au(e.mapKey)(t);
	if (r !== !0) return new H(e, `invalid map key: ${W({ scalar: e.mapKey }, t, r)}`);
	let i = iu(e, n);
	if (i !== !0) return new H(e, `map entry ${G(t)}: ${W(e, n, i)}`);
}
function iu(e, t) {
	return e.scalar === void 0 ? e.enum === void 0 ? gl(t, e.message) : e.enum.open ? au(L.INT32)(t) : e.enum.values.some((e) => e.number === t) : au(e.scalar)(t);
}
function au(e) {
	switch (e) {
		case L.DOUBLE: return (e) => typeof e == "number";
		case L.FLOAT: return (e) => typeof e == "number" ? !Number.isFinite(Math.fround(e)) && Number.isFinite(e) ? `${e.toFixed()} out of range` : !0 : !1;
		case L.INT32:
		case L.SFIXED32:
		case L.SINT32: return (e) => typeof e != "number" || !Number.isInteger(e) ? !1 : e > 0x7fffffff || e < -0x80000000 ? `${e.toFixed()} out of range` : !0;
		case L.FIXED32:
		case L.UINT32: return (e) => typeof e != "number" || !Number.isInteger(e) ? !1 : e > 0xffffffff || e < 0 ? `${e.toFixed()} out of range` : !0;
		case L.BOOL: return (e) => typeof e == "boolean";
		case L.STRING: return (e) => typeof e == "string" ? Hl().checkUtf8(e) || "invalid UTF8" : !1;
		case L.BYTES: return (e) => e instanceof Uint8Array;
		case L.INT64:
		case L.SFIXED64:
		case L.SINT64: return (e) => {
			if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0) try {
				return R.parse(e), !0;
			} catch {
				return `${e} out of range`;
			}
			return !1;
		};
		case L.FIXED64:
		case L.UINT64: return (e) => {
			if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0) try {
				return R.uParse(e), !0;
			} catch {
				return `${e} out of range`;
			}
			return !1;
		};
	}
}
function W(e, t, n) {
	return n = typeof n == "string" ? `: ${n}` : `, got ${G(t)}`, e.scalar === void 0 ? e.enum === void 0 ? `expected ${ou(e.message)}` + n : `expected ${e.enum.toString()}` + n : `expected ${lu(e.scalar)}` + n;
}
function G(e) {
	switch (typeof e) {
		case "object": return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : ml(e) ? su(e.field()) : hl(e) ? cu(e.field()) : gl(e) ? ou(e.desc) : Hc(e) ? `message ${e.$typeName}` : "object";
		case "string": return e.length > 30 ? "string" : `"${e.split("\"").join("\\\"")}"`;
		case "boolean":
		case "number": return String(e);
		case "bigint": return String(e) + "n";
		default: return typeof e;
	}
}
function ou(e) {
	return `ReflectMessage (${e.typeName})`;
}
function su(e) {
	switch (e.listKind) {
		case "message": return `ReflectList (${e.message.toString()})`;
		case "enum": return `ReflectList (${e.enum.toString()})`;
		case "scalar": return `ReflectList (${L[e.scalar]})`;
	}
}
function cu(e) {
	switch (e.mapKind) {
		case "message": return `ReflectMap (${L[e.mapKey]}, ${e.message.toString()})`;
		case "enum": return `ReflectMap (${L[e.mapKey]}, ${e.enum.toString()})`;
		case "scalar": return `ReflectMap (${L[e.mapKey]}, ${L[e.scalar]})`;
	}
}
function lu(e) {
	switch (e) {
		case L.STRING: return "string";
		case L.BOOL: return "boolean";
		case L.INT64:
		case L.SINT64:
		case L.SFIXED64: return "bigint (int64)";
		case L.UINT64:
		case L.FIXED64: return "bigint (uint64)";
		case L.BYTES: return "Uint8Array";
		case L.DOUBLE: return "number (float64)";
		case L.FLOAT: return "number (float32)";
		case L.FIXED32:
		case L.UINT32: return "number (uint32)";
		case L.INT32:
		case L.SFIXED32:
		case L.SINT32: return "number (int32)";
	}
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/message.js
var uu = 0;
function du(e) {
	if (fu(e)) return {
		toMessage: (e) => pu(e),
		toLocal: (e) => mu(e)
	};
	if (e.fieldKind == "message" && !e.oneof && vl(e.message)) {
		let t = e.message, n = t.fields[0].localName;
		return {
			toMessage: (e) => {
				let r = V(t);
				return e !== void 0 && (r[n] = e), r;
			},
			toLocal: (e) => e[n]
		};
	}
	let t = e.message;
	return {
		toMessage: (e) => e === void 0 ? V(t) : e,
		toLocal: (e) => e
	};
}
function fu(e) {
	return e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value";
}
function pu(e) {
	let t = {
		$typeName: "google.protobuf.Struct",
		fields: {}
	};
	if (pl(e)) for (let n of Object.keys(e)) B(t.fields, n, gu(e[n]));
	return t;
}
function mu(e) {
	let t = {};
	for (let n of Object.keys(e.fields)) B(t, n, hu(e.fields[n]));
	return t;
}
function hu(e) {
	switch (e.kind.case) {
		case "structValue": return mu(e.kind.value);
		case "listValue": return e.kind.value.values.map(hu);
		case "nullValue":
		case void 0: return null;
		default: return e.kind.value;
	}
}
function gu(e) {
	let t = {
		$typeName: "google.protobuf.Value",
		kind: { case: void 0 }
	};
	switch (typeof e) {
		case "number":
			t.kind = {
				case: "numberValue",
				value: e
			};
			break;
		case "string":
			t.kind = {
				case: "stringValue",
				value: e
			};
			break;
		case "boolean":
			t.kind = {
				case: "boolValue",
				value: e
			};
			break;
		case "object": if (e === null) t.kind = {
			case: "nullValue",
			value: uu
		};
		else if (Array.isArray(e)) {
			let n = {
				$typeName: "google.protobuf.ListValue",
				values: []
			};
			if (Array.isArray(e)) for (let t of e) n.values.push(gu(t));
			t.kind = {
				case: "listValue",
				value: n
			};
		} else t.kind = {
			case: "structValue",
			value: pu(e)
		};
	}
	return t;
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/reflect.js
function _u(e, t, n = !0) {
	return new yu(e, t, n);
}
var vu = /* @__PURE__ */ new WeakMap(), yu = class {
	get sortedFields() {
		let e = vu.get(this.desc);
		if (e) return e;
		let t = this.desc.fields.concat().sort((e, t) => e.number - t.number);
		return vu.set(this.desc, t), t;
	}
	constructor(e, t, n = !0) {
		this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = n, this.desc = e, this.message = this[z] = t ?? V(e), this.fields = e.fields, this.oneofs = e.oneofs, this.members = e.members;
	}
	findNumber(e) {
		return this._fieldsByNumber ||= new Map(this.desc.fields.map((e) => [e.number, e])), this._fieldsByNumber.get(e);
	}
	oneofCase(e) {
		return bu(this.message, e), ol(this.message, e);
	}
	isSet(e) {
		return bu(this.message, e), sl(this.message, e);
	}
	clear(e) {
		bu(this.message, e), fl(this.message, e);
	}
	get(e) {
		bu(this.message, e);
		let t = ll(this.message, e);
		switch (e.fieldKind) {
			case "list":
				let n = this.lists.get(e);
				return n && n[z] === t || this.lists.set(e, n = new xu(e, t, this.check)), n;
			case "map":
				let r = this.maps.get(e);
				return r && r[z] === t || this.maps.set(e, r = new Su(e, t, this.check)), r;
			case "message": return wu(e, t, this.check);
			case "scalar": return t === void 0 ? rl(e.scalar, !1) : ju(e, t);
			case "enum": return t ?? e.enum.values[0].number;
		}
	}
	set(e, t) {
		if (bu(this.message, e), this.check) {
			let n = tu(e, t);
			if (n) throw n;
		}
		let n;
		n = e.fieldKind == "message" ? Cu(e, t) : hl(t) || ml(t) ? t[z] : Mu(e, t), ul(this.message, e, n);
	}
	getUnknown() {
		return this.message.$unknown;
	}
	setUnknown(e) {
		this.message.$unknown = e;
	}
};
function bu(e, t) {
	if (t.parent.typeName !== e.$typeName) throw new H(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
var xu = class {
	field() {
		return this._field;
	}
	get size() {
		return this._arr.length;
	}
	constructor(e, t, n) {
		this._field = e, this._arr = this[z] = t, this.check = n;
	}
	get(e) {
		let t = this._arr[e];
		return t === void 0 ? void 0 : Eu(this._field, t, this.check);
	}
	set(e, t) {
		if (e < 0 || e >= this._arr.length) throw new H(this._field, `list item #${e + 1}: out of range`);
		if (this.check) {
			let n = nu(this._field, e, t);
			if (n) throw n;
		}
		this._arr[e] = Tu(this._field, t);
	}
	add(e) {
		if (this.check) {
			let t = nu(this._field, this._arr.length, e);
			if (t) throw t;
		}
		this._arr.push(Tu(this._field, e));
	}
	clear() {
		this._arr.splice(0, this._arr.length);
	}
	[Symbol.iterator]() {
		return this.values();
	}
	keys() {
		return this._arr.keys();
	}
	*values() {
		for (let e of this._arr) yield Eu(this._field, e, this.check);
	}
	*entries() {
		for (let e = 0; e < this._arr.length; e++) yield [e, Eu(this._field, this._arr[e], this.check)];
	}
}, Su = class {
	constructor(e, t, n = !0) {
		this.obj = this[z] = t ?? {}, this.check = n, this._field = e;
	}
	field() {
		return this._field;
	}
	set(e, t) {
		if (this.check) {
			let n = ru(this._field, e, t);
			if (n) throw n;
		}
		return B(this.obj, ku(e), Du(this._field, t)), this;
	}
	delete(e) {
		let t = ku(e), n = Object.prototype.hasOwnProperty.call(this.obj, t);
		return n && delete this.obj[t], n;
	}
	clear() {
		for (let e of Object.keys(this.obj)) delete this.obj[e];
	}
	get(e) {
		let t = dl(this.obj, ku(e));
		return t !== void 0 && (t = Ou(this._field, t, this.check)), t;
	}
	has(e) {
		return Object.prototype.hasOwnProperty.call(this.obj, ku(e));
	}
	*keys() {
		for (let e of Object.keys(this.obj)) yield Au(e, this._field.mapKey);
	}
	*entries() {
		for (let e of Object.entries(this.obj)) yield [Au(e[0], this._field.mapKey), Ou(this._field, e[1], this.check)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return Object.keys(this.obj).length;
	}
	*values() {
		for (let e of Object.values(this.obj)) yield Ou(this._field, e, this.check);
	}
	forEach(e, t) {
		for (let n of this.entries()) e.call(t, n[1], n[0], this);
	}
};
function Cu(e, t) {
	return gl(t) ? _l(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? mu(t.message) : t.message : t;
}
function wu(e, t, n) {
	return t !== void 0 && (vl(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
		$typeName: e.message.typeName,
		value: ju(e.message.fields[0], t)
	} : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && pl(t) && (t = pu(t))), new yu(e.message, t, n);
}
function Tu(e, t) {
	return e.listKind == "message" ? Cu(e, t) : Mu(e, t);
}
function Eu(e, t, n) {
	return e.listKind == "message" ? wu(e, t, n) : ju(e, t);
}
function Du(e, t) {
	return e.mapKind == "message" ? Cu(e, t) : Mu(e, t);
}
function Ou(e, t, n) {
	return e.mapKind == "message" ? wu(e, t, n) : t;
}
function ku(e) {
	return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function Au(e, t) {
	switch (t) {
		case L.STRING: return e;
		case L.INT32:
		case L.FIXED32:
		case L.UINT32:
		case L.SFIXED32:
		case L.SINT32: {
			let t = Number.parseInt(e);
			if (Number.isFinite(t)) return t;
			break;
		}
		case L.BOOL:
			switch (e) {
				case "true": return !0;
				case "false": return !1;
			}
			break;
		case L.UINT64:
		case L.FIXED64:
			try {
				return R.uParse(e);
			} catch {}
			break;
		default: try {
			return R.parse(e);
		} catch {}
	}
	return e;
}
function ju(e, t) {
	switch (e.scalar) {
		case L.INT64:
		case L.SFIXED64:
		case L.SINT64:
			"longAsString" in e && e.longAsString && typeof t == "string" && (t = R.parse(t));
			break;
		case L.FIXED64:
		case L.UINT64: "longAsString" in e && e.longAsString && typeof t == "string" && (t = R.uParse(t));
	}
	return t;
}
function Mu(e, t) {
	switch (e.scalar) {
		case L.INT64:
		case L.SFIXED64:
		case L.SINT64:
			"longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = R.parse(t));
			break;
		case L.FIXED64:
		case L.UINT64: "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = R.uParse(t));
	}
	return t;
}
// node_modules/@bufbuild/protobuf/dist/esm/clone.js
function Nu(e, t) {
	return Pu(_u(e, t)).message;
}
function Pu(e) {
	let t = _u(e.desc);
	for (let n of e.fields) if (e.isSet(n)) switch (n.fieldKind) {
		case "list":
			let r = t.get(n);
			for (let t of e.get(n)) r.add(Fu(n, t));
			break;
		case "map":
			let i = t.get(n);
			for (let t of e.get(n).entries()) i.set(t[0], Fu(n, t[1]));
			break;
		default: t.set(n, Fu(n, e.get(n)));
	}
	let n = e.getUnknown();
	return n && n.length > 0 && t.setUnknown([...n]), t;
}
function Fu(e, t) {
	return e.message !== void 0 && gl(t) ? Pu(t) : e.scalar == L.BYTES && t instanceof Uint8Array ? t.slice() : t;
}
// node_modules/@bufbuild/protobuf/dist/esm/wire/base64-encoding.js
var Iu = Uint8Array.prototype.setFromBase64;
function Lu(e) {
	let t = e.length, n = t - (t + 3 >> 2);
	!(t & 3) && e[t - 1] == "=" && (n -= e[t - 2] == "=" ? 2 : 1);
	let r = new Uint8Array(n), i = -1;
	if (Iu) try {
		let n = Iu.call(r, e);
		n.read == t && (i = n.written);
	} catch {}
	return i < 0 && (i = Ru(r, e)), i == n ? r : r.subarray(0, i);
}
function Ru(e, t) {
	let n = Ku(), r = 0, i = 0, a, o = 0;
	for (let s = 0; s < t.length; s++) {
		if (a = n[t.charCodeAt(s)], a === void 0) switch (t[s]) {
			case "=": i = 0;
			case "\n":
			case "\r":
			case "	":
			case " ": continue;
			default: throw Error("invalid base64 string");
		}
		switch (i) {
			case 0:
				o = a, i = 1;
				break;
			case 1:
				e[r++] = o << 2 | (a & 48) >> 4, o = a, i = 2;
				break;
			case 2:
				e[r++] = (o & 15) << 4 | (a & 60) >> 2, o = a, i = 3;
				break;
			case 3: e[r++] = (o & 3) << 6 | a, i = 0;
		}
	}
	if (i == 1) throw Error("invalid base64 string");
	return r;
}
var zu = Uint8Array.prototype.toBase64, Bu = {
	std: {
		alphabet: "base64",
		omitPadding: !1
	},
	std_raw: {
		alphabet: "base64",
		omitPadding: !0
	},
	url: {
		alphabet: "base64url",
		omitPadding: !0
	}
};
function Vu(e, t = "std") {
	if (zu) return zu.call(e, Bu[t]);
	let n = Gu(t), r = t == "std", i = "", a = 0, o, s = 0;
	for (let t = 0; t < e.length; t++) switch (o = e[t], a) {
		case 0:
			i += n[o >> 2], s = (o & 3) << 4, a = 1;
			break;
		case 1:
			i += n[s | o >> 4], s = (o & 15) << 2, a = 2;
			break;
		case 2: i += n[s | o >> 6], i += n[o & 63], a = 0;
	}
	return a && (i += n[s], r && (i += "=", a == 1 && (i += "="))), i;
}
var Hu, Uu, Wu;
function Gu(e) {
	return Hu || (Hu = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), Uu = Hu.slice(0, -2).concat("-", "_")), e == "url" ? Uu : Hu;
}
function Ku() {
	if (!Wu) {
		Wu = [];
		let e = Gu("std");
		for (let t = 0; t < e.length; t++) Wu[e[t].charCodeAt(0)] = t;
		Wu[45] = e.indexOf("+"), Wu[95] = e.indexOf("/");
	}
	return Wu;
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/names.js
function qu(e) {
	let t = !1, n = [];
	for (let r = 0; r < e.length; r++) {
		let i = e.charAt(r);
		switch (i) {
			case "_":
				t = !0;
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				n.push(i), t = !1;
				break;
			default: t && (t = !1, i = i.toUpperCase()), n.push(i);
		}
	}
	return n.join("");
}
function Ju(e) {
	return e.replace(/[A-Z]/g, (e) => "_" + e.toLowerCase());
}
var Yu = /* @__PURE__ */ new Set([
	"constructor",
	"toString",
	"toJSON",
	"valueOf"
]);
function Xu(e) {
	return Yu.has(e) ? e + "$" : e;
}
// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/restore-json-names.js
function Zu(e) {
	for (let t of e.field) cl(t, "jsonName") || (t.jsonName = qu(t.name));
	e.nestedType.forEach(Zu);
}
// node_modules/@bufbuild/protobuf/dist/esm/wire/text-format.js
function Qu(e, t) {
	let n = e.values.find((e) => e.name === t);
	if (!n) throw Error(`cannot parse ${e} default value: ${t}`);
	return n.number;
}
function $u(e, t) {
	switch (e) {
		case L.STRING: return t;
		case L.BYTES: {
			let n = ed(t);
			if (n === !1) throw Error(`cannot parse ${L[e]} default value: ${t}`);
			return n;
		}
		case L.INT64:
		case L.SFIXED64:
		case L.SINT64: return R.parse(t);
		case L.UINT64:
		case L.FIXED64: return R.uParse(t);
		case L.DOUBLE:
		case L.FLOAT: switch (t) {
			case "inf": return 1e400;
			case "-inf": return -1e400;
			case "nan": return NaN;
			default: return parseFloat(t);
		}
		case L.BOOL: return t === "true";
		case L.INT32:
		case L.UINT32:
		case L.SINT32:
		case L.FIXED32:
		case L.SFIXED32: return parseInt(t, 10);
	}
}
function ed(e) {
	let t = [], n = {
		tail: e,
		c: "",
		next() {
			return this.tail.length != 0 && (this.c = this.tail[0], this.tail = this.tail.substring(1), !0);
		},
		take(e) {
			if (this.tail.length >= e) {
				let t = this.tail.substring(0, e);
				return this.tail = this.tail.substring(e), t;
			}
			return !1;
		}
	};
	for (; n.next();) if (n.c === "\\") {
		if (n.next()) switch (n.c) {
			case "\\":
				t.push(n.c.charCodeAt(0));
				break;
			case "b":
				t.push(8);
				break;
			case "f":
				t.push(12);
				break;
			case "n":
				t.push(10);
				break;
			case "r":
				t.push(13);
				break;
			case "t":
				t.push(9);
				break;
			case "v":
				t.push(11);
				break;
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7": {
				let e = n.c, r = n.take(2);
				if (r === !1) return !1;
				let i = parseInt(e + r, 8);
				if (Number.isNaN(i)) return !1;
				t.push(i);
				break;
			}
			case "x": {
				let e = n.c, r = n.take(2);
				if (r === !1) return !1;
				let i = parseInt(e + r, 16);
				if (Number.isNaN(i)) return !1;
				t.push(i);
				break;
			}
			case "u": {
				let e = n.c, r = n.take(4);
				if (r === !1) return !1;
				let i = parseInt(e + r, 16);
				if (Number.isNaN(i)) return !1;
				let a = /* @__PURE__ */ new Uint8Array(4);
				new DataView(a.buffer).setInt32(0, i, !0), t.push(a[0], a[1], a[2], a[3]);
				break;
			}
			case "U": {
				let e = n.c, r = n.take(8);
				if (r === !1) return !1;
				let i = R.uEnc(e + r), a = /* @__PURE__ */ new Uint8Array(8), o = new DataView(a.buffer);
				o.setInt32(0, i.lo, !0), o.setInt32(4, i.hi, !0), t.push(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
				break;
			}
		}
	} else t.push(n.c.charCodeAt(0));
	return new Uint8Array(t);
}
// node_modules/@bufbuild/protobuf/dist/esm/reflect/nested-types.js
function* td(e) {
	switch (e.kind) {
		case "file":
			for (let t of e.messages) yield t, yield* td(t);
			yield* e.enums, yield* e.services, yield* e.extensions;
			break;
		case "message":
			for (let t of e.nestedMessages) yield t, yield* td(t);
			yield* e.nestedEnums, yield* e.nestedExtensions;
	}
}
// node_modules/@bufbuild/protobuf/dist/esm/registry.js
function nd(e, t) {
	return rd([e, t]);
}
function rd(e, t) {
	let n = id();
	if (!e.length) return n;
	if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
		for (let r of e[0].file) t?.(r), Ed(r, n);
		return n;
	}
	if ("$typeName" in e[0]) {
		let r = e[0], i = e[1], a = /* @__PURE__ */ new Set();
		function o(e) {
			let t = [];
			for (let r of e.dependency) {
				if (n.getFile(r) != null || a.has(r)) continue;
				let o = i(r);
				if (!o) throw Error(`Unable to resolve ${r}, imported by ${e.name}`);
				"kind" in o ? n.addFile(o, !1, !0) : (a.add(o.name), t.push(o));
			}
			return t.concat(...t.map(o));
		}
		for (let e of [r, ...o(r)].reverse()) t?.(e), Ed(e, n);
	} else for (let t of e) for (let e of t.files) n.addFile(e);
	return n;
}
function id() {
	let e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map();
	return {
		kind: "registry",
		types: e,
		extendees: t,
		[Symbol.iterator]() {
			return e.values();
		},
		get files() {
			return n.values();
		},
		addFile(e, t, r) {
			if (n.set(e.proto.name, e), !t) for (let t of td(e)) this.add(t);
			if (r) for (let n of e.dependencies) this.addFile(n, t, r);
		},
		add(n) {
			if (n.kind == "extension") {
				let e = t.get(n.extendee.typeName);
				e || t.set(n.extendee.typeName, e = /* @__PURE__ */ new Map()), e.set(n.number, n);
			}
			e.set(n.typeName, n);
		},
		get(t) {
			return e.get(t);
		},
		getFile(e) {
			return n.get(e);
		},
		getMessage(t) {
			let n = e.get(t);
			return n?.kind == "message" ? n : void 0;
		},
		getEnum(t) {
			let n = e.get(t);
			return n?.kind == "enum" ? n : void 0;
		},
		getExtension(t) {
			let n = e.get(t);
			return n?.kind == "extension" ? n : void 0;
		},
		getExtensionFor(e, n) {
			return t.get(e.typeName)?.get(n);
		},
		getService(t) {
			let n = e.get(t);
			return n?.kind == "service" ? n : void 0;
		}
	};
}
var ad = 998, od = 999, sd = 9999, cd = 9, ld = 10, ud = 11, dd = 12, fd = 14, pd = 3, md = 2, hd = 1, gd = 0, _d = 1, vd = 2, yd = 3, bd = 1, xd = 2, Sd = 1, Cd = 2, wd = 1002, Td = {
	998: {
		fieldPresence: 1,
		enumType: 2,
		repeatedFieldEncoding: 2,
		utf8Validation: 3,
		messageEncoding: 1,
		jsonFormat: 2,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1,
		enforceProtoLimits: 1
	},
	999: {
		fieldPresence: 2,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1,
		enforceProtoLimits: 1
	},
	1e3: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 2,
		defaultSymbolVisibility: 1,
		enforceProtoLimits: 1
	},
	1001: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 1,
		defaultSymbolVisibility: 2,
		enforceProtoLimits: 1
	},
	1002: {
		fieldPresence: 1,
		enumType: 1,
		repeatedFieldEncoding: 1,
		utf8Validation: 2,
		messageEncoding: 1,
		jsonFormat: 1,
		enforceNamingStyle: 3,
		defaultSymbolVisibility: 4,
		enforceProtoLimits: 2
	}
};
function Ed(e, t) {
	let n = {
		kind: "file",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		edition: Fd(e),
		name: e.name.replace(/\.proto$/, ""),
		dependencies: Id(e, t),
		enums: [],
		messages: [],
		extensions: [],
		services: [],
		toString() {
			return `file ${e.name}`;
		}
	}, r = /* @__PURE__ */ new Map(), i = {
		get(e) {
			return r.get(e);
		},
		add(e) {
			K(e.proto.options?.mapEntry === !0), r.set(e.typeName, e);
		}
	};
	for (let r of e.enumType) kd(r, n, void 0, t);
	for (let r of e.messageType) Ad(r, n, void 0, t, i);
	for (let r of e.service) jd(r, n, t);
	Dd(n, t);
	for (let e of r.values()) Od(e, t, i);
	for (let e of n.messages) Od(e, t, i), Dd(e, t);
	t.addFile(n, !0);
}
function Dd(e, t) {
	switch (e.kind) {
		case "file":
			for (let n of e.proto.extension) {
				let r = Pd(n, e, t);
				e.extensions.push(r), t.add(r);
			}
			break;
		case "message":
			for (let n of e.proto.extension) {
				let r = Pd(n, e, t);
				e.nestedExtensions.push(r), t.add(r);
			}
			for (let n of e.nestedMessages) Dd(n, t);
	}
}
function Od(e, t, n) {
	let r = e.proto.oneofDecl.map((t) => Nd(t, e)), i = /* @__PURE__ */ new Set();
	for (let a of e.proto.field) {
		let o = Hd(a, r), s = Pd(a, e, t, o, n);
		e.fields.push(s), e.field[s.localName] = s, o === void 0 ? e.members.push(s) : (o.fields.push(s), i.has(o) || (i.add(o), e.members.push(o)));
	}
	for (let t of r.filter((e) => i.has(e))) e.oneofs.push(t);
	for (let r of e.nestedMessages) Od(r, t, n);
}
function kd(e, t, n, r) {
	var i, a;
	let o = Ld(e.name, e.value), s = {
		kind: "enum",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		parent: n,
		open: !0,
		name: e.name,
		typeName: Bd(e, n, t),
		value: {},
		values: [],
		sharedPrefix: o,
		toString() {
			return `enum ${this.typeName}`;
		}
	};
	s.open = Kd(s), r.add(s);
	for (let t of e.value) {
		let e = t.name, n = {
			kind: "enum_value",
			proto: t,
			deprecated: t.options?.deprecated ?? !1,
			parent: s,
			name: e,
			localName: Xu(o == null ? e : e.substring(o.length)),
			number: t.number,
			jsonName: Rd(t) ?? e,
			toString() {
				return `enum value ${s.typeName}.${e}`;
			}
		};
		s.values.push(n), (i = s.value)[a = t.number] ?? (i[a] = n);
	}
	(n?.nestedEnums ?? t.enums).push(s);
}
function Ad(e, t, n, r, i) {
	let a = {
		kind: "message",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		parent: n,
		name: e.name,
		typeName: Bd(e, n, t),
		fields: [],
		field: {},
		oneofs: [],
		members: [],
		nestedEnums: [],
		nestedMessages: [],
		nestedExtensions: [],
		toString() {
			return `message ${this.typeName}`;
		}
	};
	e.options?.mapEntry === !0 ? i.add(a) : ((n?.nestedMessages ?? t.messages).push(a), r.add(a));
	for (let n of e.enumType) kd(n, t, a, r);
	for (let n of e.nestedType) Ad(n, t, a, r, i);
}
function jd(e, t, n) {
	let r = {
		kind: "service",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		name: e.name,
		typeName: Bd(e, void 0, t),
		methods: [],
		method: {},
		toString() {
			return `service ${this.typeName}`;
		}
	};
	t.services.push(r), n.add(r);
	for (let t of e.method) {
		let e = Md(t, r, n);
		r.methods.push(e), r.method[e.localName] = e;
	}
}
function Md(e, t, n) {
	let r;
	r = e.clientStreaming && e.serverStreaming ? "bidi_streaming" : e.clientStreaming ? "client_streaming" : e.serverStreaming ? "server_streaming" : "unary";
	let i = n.getMessage(Vd(e.inputType)), a = n.getMessage(Vd(e.outputType));
	K(i, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), K(a, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
	let o = e.name;
	return {
		kind: "rpc",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		parent: t,
		name: o,
		localName: Xu(o.length ? Xu(o[0].toLowerCase() + o.substring(1)) : o),
		methodKind: r,
		input: i,
		output: a,
		idempotency: e.options?.idempotencyLevel ?? gd,
		toString() {
			return `rpc ${t.typeName}.${o}`;
		}
	};
}
function Nd(e, t) {
	return {
		kind: "oneof",
		proto: e,
		deprecated: !1,
		parent: t,
		fields: [],
		name: e.name,
		localName: Xu(qu(e.name)),
		toString() {
			return `oneof ${t.typeName}.${this.name}`;
		}
	};
}
function Pd(e, t, n, r, i) {
	let a = i === void 0, o = {
		kind: "field",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		name: e.name,
		number: e.number,
		scalar: void 0,
		message: void 0,
		enum: void 0,
		presence: Ud(e, r, a, t),
		utf8Validation: Jd(e, t),
		listKind: void 0,
		mapKind: void 0,
		mapKey: void 0,
		delimitedEncoding: void 0,
		packed: void 0,
		longAsString: !1,
		getDefaultValue: void 0
	}, s;
	if (a) {
		let r = t.kind == "file" ? t : t.file, i = t.kind == "file" ? void 0 : t, a = Bd(e, i, r);
		o.kind = "extension", o.file = r, o.parent = i, o.oneof = void 0, o.typeName = a, o.jsonName = `[${a}]`, s = () => `extension ${a}`;
		let c = n.getMessage(Vd(e.extendee));
		K(c, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), o.extendee = c;
	} else {
		let n = t;
		K(n.kind == "message"), o.parent = n, o.oneof = r, o.localName = r ? qu(e.name) : Xu(qu(e.name)), o.jsonName = e.jsonName, s = () => `field ${n.typeName}.${e.name}`;
	}
	Object.defineProperty(o, "toString", {
		value: s,
		writable: !0,
		enumerable: !0,
		configurable: !0
	});
	let c = e.label, l = e.type, u = e.options?.jstype;
	if (c === pd) {
		let r = l == ud ? i?.get(Vd(e.typeName)) : void 0;
		if (r) {
			o.fieldKind = "map";
			let { key: e, value: t } = Gd(r);
			return o.mapKey = e.scalar, o.mapKind = t.fieldKind, o.message = t.message, o.delimitedEncoding = !1, o.enum = t.enum, o.scalar = t.scalar, o;
		}
		switch (o.fieldKind = "list", l) {
			case ud:
			case ld:
				o.listKind = "message", o.message = n.getMessage(Vd(e.typeName)), K(o.message), o.delimitedEncoding = qd(e, t);
				break;
			case fd:
				o.listKind = "enum", o.enum = n.getEnum(Vd(e.typeName)), K(o.enum);
				break;
			default: o.listKind = "scalar", o.scalar = l, o.longAsString = u == hd;
		}
		return o.packed = Wd(e, t), o;
	}
	switch (l) {
		case ud:
		case ld:
			o.fieldKind = "message", o.message = n.getMessage(Vd(e.typeName)), K(o.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), o.delimitedEncoding = qd(e, t), o.getDefaultValue = () => void 0;
			break;
		case fd: {
			let t = n.getEnum(Vd(e.typeName));
			K(t !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), o.fieldKind = "enum", o.enum = n.getEnum(Vd(e.typeName)), o.getDefaultValue = () => cl(e, "defaultValue") ? Qu(t, e.defaultValue) : void 0;
			break;
		}
		default: o.fieldKind = "scalar", o.scalar = l, o.longAsString = u == hd, o.getDefaultValue = () => cl(e, "defaultValue") ? $u(l, e.defaultValue) : void 0;
	}
	return o;
}
function Fd(e) {
	switch (e.syntax) {
		case "":
		case "proto2": return ad;
		case "proto3": return od;
		case "editions":
			if (e.edition === sd) return wd;
			if (e.edition in Td) return e.edition;
			throw Error(`${e.name}: unsupported edition`);
		default: throw Error(`${e.name}: unsupported syntax "${e.syntax}"`);
	}
}
function Id(e, t) {
	return e.dependency.map((n) => {
		let r = t.getFile(n);
		if (!r) throw Error(`Cannot find ${n}, imported by ${e.name}`);
		return r;
	});
}
function Ld(e, t) {
	let n = zd(e) + "_";
	for (let e of t) {
		if (!e.name.toLowerCase().startsWith(n)) return;
		let t = e.name.substring(n.length);
		if (t.length == 0 || /^\d/.test(t)) return;
	}
	return n;
}
function Rd(e) {
	let t;
	for (let n of e.options?.$unknown ?? []) {
		if (n.no !== 998 || n.wireType !== U.LengthDelimited) continue;
		let e = new Zl(new Zl(n.data).bytes());
		for (; e.pos < e.len;) {
			let [n, r] = e.tag();
			n === 1 && r === U.LengthDelimited ? t = e.string() : e.skip(r, n);
		}
	}
	return t;
}
function zd(e) {
	return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (e) => "_" + e)).toLowerCase();
}
function Bd(e, t, n) {
	let r;
	return r = t ? `${t.typeName}.${e.name}` : n.proto.package.length > 0 ? `${n.proto.package}.${e.name}` : `${e.name}`, r;
}
function Vd(e) {
	return e.startsWith(".") ? e.substring(1) : e;
}
function Hd(e, t) {
	if (!cl(e, "oneofIndex") || e.proto3Optional) return;
	let n = t[e.oneofIndex];
	return K(n, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), n;
}
function Ud(e, t, n, r) {
	if (e.label == md) return yd;
	if (e.label == pd) return vd;
	if (t || e.proto3Optional || n) return _d;
	let i = Yd("fieldPresence", {
		proto: e,
		parent: r
	});
	return i == vd && (e.type == ud || e.type == ld) ? _d : i;
}
function Wd(e, t) {
	if (e.label != pd) return !1;
	switch (e.type) {
		case cd:
		case dd:
		case ld:
		case ud: return !1;
	}
	let n = e.options;
	return n && cl(n, "packed") ? n.packed : bd == Yd("repeatedFieldEncoding", {
		proto: e,
		parent: t
	});
}
function Gd(e) {
	let t = e.fields.find((e) => e.number === 1), n = e.fields.find((e) => e.number === 2);
	return K(t && t.fieldKind == "scalar" && t.scalar != L.BYTES && t.scalar != L.FLOAT && t.scalar != L.DOUBLE && n && n.fieldKind != "list" && n.fieldKind != "map"), {
		key: t,
		value: n
	};
}
function Kd(e) {
	return Sd == Yd("enumType", {
		proto: e.proto,
		parent: e.parent ?? e.file
	});
}
function qd(e, t) {
	return e.type == ld || xd == Yd("messageEncoding", {
		proto: e,
		parent: t
	});
}
function Jd(e, t) {
	return Cd == Yd("utf8Validation", {
		proto: e,
		parent: t
	});
}
function Yd(e, t) {
	let n = t.proto.options?.features;
	if (n) {
		let t = n[e];
		if (t != 0) return t;
	}
	if ("kind" in t) {
		if (t.kind == "message") return Yd(e, t.parent ?? t.file);
		let n = Td[t.edition];
		if (!n) throw Error(`feature default for edition ${t.edition} not found`);
		return n[e];
	}
	return Yd(e, t.parent);
}
function K(e, t) {
	if (!e) throw Error(t);
}
// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/boot.js
function Xd(e) {
	let t = Zd(e);
	return t.messageType.forEach(Zu), nd(t, () => void 0).getFile(t.name);
}
function Zd(e) {
	return Object.assign(Object.create({
		syntax: "",
		edition: 0
	}), Object.assign(Object.assign({
		$typeName: "google.protobuf.FileDescriptorProto",
		dependency: [],
		publicDependency: [],
		weakDependency: [],
		optionDependency: [],
		service: [],
		extension: []
	}, e), {
		messageType: e.messageType.map(Qd),
		enumType: e.enumType.map(tf)
	}));
}
function Qd(e) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.DescriptorProto",
		name: e.name,
		field: e.field?.map($d) ?? [],
		extension: [],
		nestedType: e.nestedType?.map(Qd) ?? [],
		enumType: e.enumType?.map(tf) ?? [],
		extensionRange: e.extensionRange?.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e)) ?? [],
		oneofDecl: [],
		reservedRange: [],
		reservedName: []
	});
}
function $d(e) {
	return Object.assign(Object.create({
		label: 1,
		typeName: "",
		extendee: "",
		defaultValue: "",
		oneofIndex: 0,
		jsonName: "",
		proto3Optional: !1
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? ef(e.options) : void 0 }));
}
function ef(e) {
	return Object.assign(Object.create({
		ctype: 0,
		packed: !1,
		jstype: 0,
		lazy: !1,
		unverifiedLazy: !1,
		deprecated: !1,
		weak: !1,
		debugRedact: !1,
		retention: 0
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldOptions" }, e), {
		targets: e.targets ?? [],
		editionDefaults: e.editionDefaults?.map((e) => Object.assign({ $typeName: "google.protobuf.FieldOptions.EditionDefault" }, e)) ?? [],
		uninterpretedOption: []
	}));
}
function tf(e) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.EnumDescriptorProto",
		name: e.name,
		reservedName: [],
		reservedRange: [],
		value: e.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
	});
}
// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/message.js
function nf(e, t, ...n) {
	return n.reduce((e, t) => e.nestedMessages[t], e.messages[t]);
}
var rf = /*@__PURE__*/ nf(/* @__PURE__ */ Xd({
	name: "google/protobuf/descriptor.proto",
	package: "google.protobuf",
	messageType: [
		{
			name: "FileDescriptorSet",
			field: [{
				name: "file",
				number: 1,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.FileDescriptorProto"
			}],
			extensionRange: [{
				start: 536e6,
				end: 536000001
			}]
		},
		{
			name: "FileDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "package",
					number: 2,
					type: 9,
					label: 1
				},
				{
					name: "dependency",
					number: 3,
					type: 9,
					label: 3
				},
				{
					name: "public_dependency",
					number: 10,
					type: 5,
					label: 3
				},
				{
					name: "weak_dependency",
					number: 11,
					type: 5,
					label: 3
				},
				{
					name: "option_dependency",
					number: 15,
					type: 9,
					label: 3
				},
				{
					name: "message_type",
					number: 4,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto"
				},
				{
					name: "enum_type",
					number: 5,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumDescriptorProto"
				},
				{
					name: "service",
					number: 6,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.ServiceDescriptorProto"
				},
				{
					name: "extension",
					number: 7,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldDescriptorProto"
				},
				{
					name: "options",
					number: 8,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FileOptions"
				},
				{
					name: "source_code_info",
					number: 9,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.SourceCodeInfo"
				},
				{
					name: "syntax",
					number: 12,
					type: 9,
					label: 1
				},
				{
					name: "edition",
					number: 14,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				}
			]
		},
		{
			name: "DescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "field",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldDescriptorProto"
				},
				{
					name: "extension",
					number: 6,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldDescriptorProto"
				},
				{
					name: "nested_type",
					number: 3,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto"
				},
				{
					name: "enum_type",
					number: 4,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumDescriptorProto"
				},
				{
					name: "extension_range",
					number: 5,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto.ExtensionRange"
				},
				{
					name: "oneof_decl",
					number: 8,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.OneofDescriptorProto"
				},
				{
					name: "options",
					number: 7,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.MessageOptions"
				},
				{
					name: "reserved_range",
					number: 9,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.DescriptorProto.ReservedRange"
				},
				{
					name: "reserved_name",
					number: 10,
					type: 9,
					label: 3
				},
				{
					name: "visibility",
					number: 11,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.SymbolVisibility"
				}
			],
			nestedType: [{
				name: "ExtensionRange",
				field: [
					{
						name: "start",
						number: 1,
						type: 5,
						label: 1
					},
					{
						name: "end",
						number: 2,
						type: 5,
						label: 1
					},
					{
						name: "options",
						number: 3,
						type: 11,
						label: 1,
						typeName: ".google.protobuf.ExtensionRangeOptions"
					}
				]
			}, {
				name: "ReservedRange",
				field: [{
					name: "start",
					number: 1,
					type: 5,
					label: 1
				}, {
					name: "end",
					number: 2,
					type: 5,
					label: 1
				}]
			}]
		},
		{
			name: "ExtensionRangeOptions",
			field: [
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				},
				{
					name: "declaration",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.ExtensionRangeOptions.Declaration",
					options: { retention: 2 }
				},
				{
					name: "features",
					number: 50,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "verification",
					number: 3,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.ExtensionRangeOptions.VerificationState",
					defaultValue: "UNVERIFIED",
					options: { retention: 2 }
				}
			],
			nestedType: [{
				name: "Declaration",
				field: [
					{
						name: "number",
						number: 1,
						type: 5,
						label: 1
					},
					{
						name: "full_name",
						number: 2,
						type: 9,
						label: 1
					},
					{
						name: "type",
						number: 3,
						type: 9,
						label: 1
					},
					{
						name: "reserved",
						number: 5,
						type: 8,
						label: 1
					},
					{
						name: "repeated",
						number: 6,
						type: 8,
						label: 1
					}
				]
			}],
			enumType: [{
				name: "VerificationState",
				value: [{
					name: "DECLARATION",
					number: 0
				}, {
					name: "UNVERIFIED",
					number: 1
				}]
			}],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "FieldDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "number",
					number: 3,
					type: 5,
					label: 1
				},
				{
					name: "label",
					number: 4,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldDescriptorProto.Label"
				},
				{
					name: "type",
					number: 5,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldDescriptorProto.Type"
				},
				{
					name: "type_name",
					number: 6,
					type: 9,
					label: 1
				},
				{
					name: "extendee",
					number: 2,
					type: 9,
					label: 1
				},
				{
					name: "default_value",
					number: 7,
					type: 9,
					label: 1
				},
				{
					name: "oneof_index",
					number: 9,
					type: 5,
					label: 1
				},
				{
					name: "json_name",
					number: 10,
					type: 9,
					label: 1
				},
				{
					name: "options",
					number: 8,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FieldOptions"
				},
				{
					name: "proto3_optional",
					number: 17,
					type: 8,
					label: 1
				}
			],
			enumType: [{
				name: "Type",
				value: [
					{
						name: "TYPE_DOUBLE",
						number: 1
					},
					{
						name: "TYPE_FLOAT",
						number: 2
					},
					{
						name: "TYPE_INT64",
						number: 3
					},
					{
						name: "TYPE_UINT64",
						number: 4
					},
					{
						name: "TYPE_INT32",
						number: 5
					},
					{
						name: "TYPE_FIXED64",
						number: 6
					},
					{
						name: "TYPE_FIXED32",
						number: 7
					},
					{
						name: "TYPE_BOOL",
						number: 8
					},
					{
						name: "TYPE_STRING",
						number: 9
					},
					{
						name: "TYPE_GROUP",
						number: 10
					},
					{
						name: "TYPE_MESSAGE",
						number: 11
					},
					{
						name: "TYPE_BYTES",
						number: 12
					},
					{
						name: "TYPE_UINT32",
						number: 13
					},
					{
						name: "TYPE_ENUM",
						number: 14
					},
					{
						name: "TYPE_SFIXED32",
						number: 15
					},
					{
						name: "TYPE_SFIXED64",
						number: 16
					},
					{
						name: "TYPE_SINT32",
						number: 17
					},
					{
						name: "TYPE_SINT64",
						number: 18
					}
				]
			}, {
				name: "Label",
				value: [
					{
						name: "LABEL_OPTIONAL",
						number: 1
					},
					{
						name: "LABEL_REPEATED",
						number: 3
					},
					{
						name: "LABEL_REQUIRED",
						number: 2
					}
				]
			}]
		},
		{
			name: "OneofDescriptorProto",
			field: [{
				name: "name",
				number: 1,
				type: 9,
				label: 1
			}, {
				name: "options",
				number: 2,
				type: 11,
				label: 1,
				typeName: ".google.protobuf.OneofOptions"
			}]
		},
		{
			name: "EnumDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "value",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumValueDescriptorProto"
				},
				{
					name: "options",
					number: 3,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.EnumOptions"
				},
				{
					name: "reserved_range",
					number: 4,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.EnumDescriptorProto.EnumReservedRange"
				},
				{
					name: "reserved_name",
					number: 5,
					type: 9,
					label: 3
				},
				{
					name: "visibility",
					number: 6,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.SymbolVisibility"
				}
			],
			nestedType: [{
				name: "EnumReservedRange",
				field: [{
					name: "start",
					number: 1,
					type: 5,
					label: 1
				}, {
					name: "end",
					number: 2,
					type: 5,
					label: 1
				}]
			}]
		},
		{
			name: "EnumValueDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "number",
					number: 2,
					type: 5,
					label: 1
				},
				{
					name: "options",
					number: 3,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.EnumValueOptions"
				}
			]
		},
		{
			name: "ServiceDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "method",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.MethodDescriptorProto"
				},
				{
					name: "options",
					number: 3,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.ServiceOptions"
				}
			]
		},
		{
			name: "MethodDescriptorProto",
			field: [
				{
					name: "name",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "input_type",
					number: 2,
					type: 9,
					label: 1
				},
				{
					name: "output_type",
					number: 3,
					type: 9,
					label: 1
				},
				{
					name: "options",
					number: 4,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.MethodOptions"
				},
				{
					name: "client_streaming",
					number: 5,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "server_streaming",
					number: 6,
					type: 8,
					label: 1,
					defaultValue: "false"
				}
			]
		},
		{
			name: "FileOptions",
			field: [
				{
					name: "java_package",
					number: 1,
					type: 9,
					label: 1
				},
				{
					name: "java_outer_classname",
					number: 8,
					type: 9,
					label: 1
				},
				{
					name: "java_multiple_files",
					number: 10,
					type: 8,
					label: 1,
					defaultValue: "false",
					options: {}
				},
				{
					name: "java_generate_equals_and_hash",
					number: 20,
					type: 8,
					label: 1,
					options: { deprecated: !0 }
				},
				{
					name: "java_string_check_utf8",
					number: 27,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "optimize_for",
					number: 9,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FileOptions.OptimizeMode",
					defaultValue: "SPEED"
				},
				{
					name: "go_package",
					number: 11,
					type: 9,
					label: 1
				},
				{
					name: "cc_generic_services",
					number: 16,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "java_generic_services",
					number: 17,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "py_generic_services",
					number: 18,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated",
					number: 23,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "cc_enable_arenas",
					number: 31,
					type: 8,
					label: 1,
					defaultValue: "true",
					options: {}
				},
				{
					name: "objc_class_prefix",
					number: 36,
					type: 9,
					label: 1
				},
				{
					name: "csharp_namespace",
					number: 37,
					type: 9,
					label: 1
				},
				{
					name: "swift_prefix",
					number: 39,
					type: 9,
					label: 1
				},
				{
					name: "php_class_prefix",
					number: 40,
					type: 9,
					label: 1
				},
				{
					name: "php_namespace",
					number: 41,
					type: 9,
					label: 1
				},
				{
					name: "php_metadata_namespace",
					number: 44,
					type: 9,
					label: 1
				},
				{
					name: "ruby_package",
					number: 45,
					type: 9,
					label: 1
				},
				{
					name: "features",
					number: 50,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			enumType: [{
				name: "OptimizeMode",
				value: [
					{
						name: "SPEED",
						number: 1
					},
					{
						name: "CODE_SIZE",
						number: 2
					},
					{
						name: "LITE_RUNTIME",
						number: 3
					}
				]
			}],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "MessageOptions",
			field: [
				{
					name: "message_set_wire_format",
					number: 1,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "no_standard_descriptor_accessor",
					number: 2,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "map_entry",
					number: 7,
					type: 8,
					label: 1
				},
				{
					name: "deprecated_legacy_json_field_conflicts",
					number: 11,
					type: 8,
					label: 1,
					options: { deprecated: !0 }
				},
				{
					name: "features",
					number: 12,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "FieldOptions",
			field: [
				{
					name: "ctype",
					number: 1,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.CType",
					defaultValue: "STRING"
				},
				{
					name: "packed",
					number: 2,
					type: 8,
					label: 1
				},
				{
					name: "jstype",
					number: 6,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.JSType",
					defaultValue: "JS_NORMAL"
				},
				{
					name: "lazy",
					number: 5,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "unverified_lazy",
					number: 15,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "weak",
					number: 10,
					type: 8,
					label: 1,
					defaultValue: "false",
					options: { deprecated: !0 }
				},
				{
					name: "debug_redact",
					number: 16,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "retention",
					number: 17,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.OptionRetention"
				},
				{
					name: "targets",
					number: 19,
					type: 14,
					label: 3,
					typeName: ".google.protobuf.FieldOptions.OptionTargetType"
				},
				{
					name: "edition_defaults",
					number: 20,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FieldOptions.EditionDefault"
				},
				{
					name: "features",
					number: 21,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "feature_support",
					number: 22,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			nestedType: [{
				name: "EditionDefault",
				field: [{
					name: "edition",
					number: 3,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				}, {
					name: "value",
					number: 2,
					type: 9,
					label: 1
				}]
			}, {
				name: "FeatureSupport",
				field: [
					{
						name: "edition_introduced",
						number: 1,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					},
					{
						name: "edition_deprecated",
						number: 2,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					},
					{
						name: "deprecation_warning",
						number: 3,
						type: 9,
						label: 1
					},
					{
						name: "edition_removed",
						number: 4,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					},
					{
						name: "removal_error",
						number: 5,
						type: 9,
						label: 1
					}
				]
			}],
			enumType: [
				{
					name: "CType",
					value: [
						{
							name: "STRING",
							number: 0
						},
						{
							name: "CORD",
							number: 1
						},
						{
							name: "STRING_PIECE",
							number: 2
						}
					]
				},
				{
					name: "JSType",
					value: [
						{
							name: "JS_NORMAL",
							number: 0
						},
						{
							name: "JS_STRING",
							number: 1
						},
						{
							name: "JS_NUMBER",
							number: 2
						}
					]
				},
				{
					name: "OptionRetention",
					value: [
						{
							name: "RETENTION_UNKNOWN",
							number: 0
						},
						{
							name: "RETENTION_RUNTIME",
							number: 1
						},
						{
							name: "RETENTION_SOURCE",
							number: 2
						}
					]
				},
				{
					name: "OptionTargetType",
					value: [
						{
							name: "TARGET_TYPE_UNKNOWN",
							number: 0
						},
						{
							name: "TARGET_TYPE_FILE",
							number: 1
						},
						{
							name: "TARGET_TYPE_EXTENSION_RANGE",
							number: 2
						},
						{
							name: "TARGET_TYPE_MESSAGE",
							number: 3
						},
						{
							name: "TARGET_TYPE_FIELD",
							number: 4
						},
						{
							name: "TARGET_TYPE_ONEOF",
							number: 5
						},
						{
							name: "TARGET_TYPE_ENUM",
							number: 6
						},
						{
							name: "TARGET_TYPE_ENUM_ENTRY",
							number: 7
						},
						{
							name: "TARGET_TYPE_SERVICE",
							number: 8
						},
						{
							name: "TARGET_TYPE_METHOD",
							number: 9
						}
					]
				}
			],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "OneofOptions",
			field: [{
				name: "features",
				number: 1,
				type: 11,
				label: 1,
				typeName: ".google.protobuf.FeatureSet"
			}, {
				name: "uninterpreted_option",
				number: 999,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.UninterpretedOption"
			}],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "EnumOptions",
			field: [
				{
					name: "allow_alias",
					number: 2,
					type: 8,
					label: 1
				},
				{
					name: "deprecated",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "deprecated_legacy_json_field_conflicts",
					number: 6,
					type: 8,
					label: 1,
					options: { deprecated: !0 }
				},
				{
					name: "features",
					number: 7,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "EnumValueOptions",
			field: [
				{
					name: "deprecated",
					number: 1,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "features",
					number: 2,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "debug_redact",
					number: 3,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "feature_support",
					number: 4,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FieldOptions.FeatureSupport"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "ServiceOptions",
			field: [
				{
					name: "features",
					number: 34,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "deprecated",
					number: 33,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "MethodOptions",
			field: [
				{
					name: "deprecated",
					number: 33,
					type: 8,
					label: 1,
					defaultValue: "false"
				},
				{
					name: "idempotency_level",
					number: 34,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.MethodOptions.IdempotencyLevel",
					defaultValue: "IDEMPOTENCY_UNKNOWN"
				},
				{
					name: "features",
					number: 35,
					type: 11,
					label: 1,
					typeName: ".google.protobuf.FeatureSet"
				},
				{
					name: "uninterpreted_option",
					number: 999,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption"
				}
			],
			enumType: [{
				name: "IdempotencyLevel",
				value: [
					{
						name: "IDEMPOTENCY_UNKNOWN",
						number: 0
					},
					{
						name: "NO_SIDE_EFFECTS",
						number: 1
					},
					{
						name: "IDEMPOTENT",
						number: 2
					}
				]
			}],
			extensionRange: [{
				start: 990,
				end: 999
			}, {
				start: 1e3,
				end: 536870912
			}]
		},
		{
			name: "UninterpretedOption",
			field: [
				{
					name: "name",
					number: 2,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.UninterpretedOption.NamePart"
				},
				{
					name: "identifier_value",
					number: 3,
					type: 9,
					label: 1
				},
				{
					name: "positive_int_value",
					number: 4,
					type: 4,
					label: 1
				},
				{
					name: "negative_int_value",
					number: 5,
					type: 3,
					label: 1
				},
				{
					name: "double_value",
					number: 6,
					type: 1,
					label: 1
				},
				{
					name: "string_value",
					number: 7,
					type: 12,
					label: 1
				},
				{
					name: "aggregate_value",
					number: 8,
					type: 9,
					label: 1
				}
			],
			nestedType: [{
				name: "NamePart",
				field: [{
					name: "name_part",
					number: 1,
					type: 9,
					label: 2
				}, {
					name: "is_extension",
					number: 2,
					type: 8,
					label: 2
				}]
			}]
		},
		{
			name: "FeatureSet",
			field: [
				{
					name: "field_presence",
					number: 1,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.FieldPresence",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [
							{
								value: "EXPLICIT",
								edition: 900
							},
							{
								value: "IMPLICIT",
								edition: 999
							},
							{
								value: "EXPLICIT",
								edition: 1e3
							}
						]
					}
				},
				{
					name: "enum_type",
					number: 2,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.EnumType",
					options: {
						retention: 1,
						targets: [6, 1],
						editionDefaults: [{
							value: "CLOSED",
							edition: 900
						}, {
							value: "OPEN",
							edition: 999
						}]
					}
				},
				{
					name: "repeated_field_encoding",
					number: 3,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.RepeatedFieldEncoding",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [{
							value: "EXPANDED",
							edition: 900
						}, {
							value: "PACKED",
							edition: 999
						}]
					}
				},
				{
					name: "utf8_validation",
					number: 4,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.Utf8Validation",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [{
							value: "NONE",
							edition: 900
						}, {
							value: "VERIFY",
							edition: 999
						}]
					}
				},
				{
					name: "message_encoding",
					number: 5,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.MessageEncoding",
					options: {
						retention: 1,
						targets: [4, 1],
						editionDefaults: [{
							value: "LENGTH_PREFIXED",
							edition: 900
						}]
					}
				},
				{
					name: "json_format",
					number: 6,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.JsonFormat",
					options: {
						retention: 1,
						targets: [
							3,
							6,
							1
						],
						editionDefaults: [{
							value: "LEGACY_BEST_EFFORT",
							edition: 900
						}, {
							value: "ALLOW",
							edition: 999
						}]
					}
				},
				{
					name: "enforce_naming_style",
					number: 7,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.EnforceNamingStyle",
					options: {
						retention: 2,
						targets: [
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8,
							9
						],
						editionDefaults: [
							{
								value: "STYLE_LEGACY",
								edition: 900
							},
							{
								value: "STYLE2024",
								edition: 1001
							},
							{
								value: "STYLE2026",
								edition: 1002
							}
						]
					}
				},
				{
					name: "default_symbol_visibility",
					number: 8,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.VisibilityFeature.DefaultSymbolVisibility",
					options: {
						retention: 2,
						targets: [1],
						editionDefaults: [
							{
								value: "EXPORT_ALL",
								edition: 900
							},
							{
								value: "EXPORT_TOP_LEVEL",
								edition: 1001
							},
							{
								value: "STRICT",
								edition: 1002
							}
						]
					}
				},
				{
					name: "enforce_proto_limits",
					number: 9,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.FeatureSet.ProtoLimitsFeature.EnforceProtoLimits",
					options: {
						retention: 2,
						targets: [
							6,
							3,
							4,
							5
						],
						editionDefaults: [{
							value: "LEGACY_NO_EXPLICIT_LIMITS",
							edition: 900
						}, {
							value: "PROTO_LIMITS2026",
							edition: 1002
						}]
					}
				}
			],
			nestedType: [{
				name: "VisibilityFeature",
				enumType: [{
					name: "DefaultSymbolVisibility",
					value: [
						{
							name: "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN",
							number: 0
						},
						{
							name: "EXPORT_ALL",
							number: 1
						},
						{
							name: "EXPORT_TOP_LEVEL",
							number: 2
						},
						{
							name: "LOCAL_ALL",
							number: 3
						},
						{
							name: "STRICT",
							number: 4
						}
					]
				}]
			}, {
				name: "ProtoLimitsFeature",
				enumType: [{
					name: "EnforceProtoLimits",
					value: [
						{
							name: "PROTO_LIMITS_UNKNOWN",
							number: 0
						},
						{
							name: "LEGACY_NO_EXPLICIT_LIMITS",
							number: 1
						},
						{
							name: "PROTO_LIMITS2026",
							number: 2
						}
					]
				}]
			}],
			enumType: [
				{
					name: "FieldPresence",
					value: [
						{
							name: "FIELD_PRESENCE_UNKNOWN",
							number: 0
						},
						{
							name: "EXPLICIT",
							number: 1
						},
						{
							name: "IMPLICIT",
							number: 2
						},
						{
							name: "LEGACY_REQUIRED",
							number: 3
						}
					]
				},
				{
					name: "EnumType",
					value: [
						{
							name: "ENUM_TYPE_UNKNOWN",
							number: 0
						},
						{
							name: "OPEN",
							number: 1
						},
						{
							name: "CLOSED",
							number: 2
						}
					]
				},
				{
					name: "RepeatedFieldEncoding",
					value: [
						{
							name: "REPEATED_FIELD_ENCODING_UNKNOWN",
							number: 0
						},
						{
							name: "PACKED",
							number: 1
						},
						{
							name: "EXPANDED",
							number: 2
						}
					]
				},
				{
					name: "Utf8Validation",
					value: [
						{
							name: "UTF8_VALIDATION_UNKNOWN",
							number: 0
						},
						{
							name: "VERIFY",
							number: 2
						},
						{
							name: "NONE",
							number: 3
						}
					]
				},
				{
					name: "MessageEncoding",
					value: [
						{
							name: "MESSAGE_ENCODING_UNKNOWN",
							number: 0
						},
						{
							name: "LENGTH_PREFIXED",
							number: 1
						},
						{
							name: "DELIMITED",
							number: 2
						}
					]
				},
				{
					name: "JsonFormat",
					value: [
						{
							name: "JSON_FORMAT_UNKNOWN",
							number: 0
						},
						{
							name: "ALLOW",
							number: 1
						},
						{
							name: "LEGACY_BEST_EFFORT",
							number: 2
						}
					]
				},
				{
					name: "EnforceNamingStyle",
					value: [
						{
							name: "ENFORCE_NAMING_STYLE_UNKNOWN",
							number: 0
						},
						{
							name: "STYLE2024",
							number: 1
						},
						{
							name: "STYLE_LEGACY",
							number: 2
						},
						{
							name: "STYLE2026",
							number: 3
						}
					]
				}
			],
			extensionRange: [
				{
					start: 1e3,
					end: 9995
				},
				{
					start: 9995,
					end: 1e4
				},
				{
					start: 1e4,
					end: 10001
				}
			]
		},
		{
			name: "FeatureSetDefaults",
			field: [
				{
					name: "defaults",
					number: 1,
					type: 11,
					label: 3,
					typeName: ".google.protobuf.FeatureSetDefaults.FeatureSetEditionDefault"
				},
				{
					name: "minimum_edition",
					number: 4,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				},
				{
					name: "maximum_edition",
					number: 5,
					type: 14,
					label: 1,
					typeName: ".google.protobuf.Edition"
				}
			],
			nestedType: [{
				name: "FeatureSetEditionDefault",
				field: [
					{
						name: "edition",
						number: 3,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.Edition"
					},
					{
						name: "overridable_features",
						number: 4,
						type: 11,
						label: 1,
						typeName: ".google.protobuf.FeatureSet"
					},
					{
						name: "fixed_features",
						number: 5,
						type: 11,
						label: 1,
						typeName: ".google.protobuf.FeatureSet"
					}
				]
			}]
		},
		{
			name: "SourceCodeInfo",
			field: [{
				name: "location",
				number: 1,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.SourceCodeInfo.Location"
			}],
			nestedType: [{
				name: "Location",
				field: [
					{
						name: "path",
						number: 1,
						type: 5,
						label: 3,
						options: { packed: !0 }
					},
					{
						name: "span",
						number: 2,
						type: 5,
						label: 3,
						options: { packed: !0 }
					},
					{
						name: "leading_comments",
						number: 3,
						type: 9,
						label: 1
					},
					{
						name: "trailing_comments",
						number: 4,
						type: 9,
						label: 1
					},
					{
						name: "leading_detached_comments",
						number: 6,
						type: 9,
						label: 3
					}
				]
			}],
			extensionRange: [{
				start: 536e6,
				end: 536000001
			}]
		},
		{
			name: "GeneratedCodeInfo",
			field: [{
				name: "annotation",
				number: 1,
				type: 11,
				label: 3,
				typeName: ".google.protobuf.GeneratedCodeInfo.Annotation"
			}],
			nestedType: [{
				name: "Annotation",
				field: [
					{
						name: "path",
						number: 1,
						type: 5,
						label: 3,
						options: { packed: !0 }
					},
					{
						name: "source_file",
						number: 2,
						type: 9,
						label: 1
					},
					{
						name: "begin",
						number: 3,
						type: 5,
						label: 1
					},
					{
						name: "end",
						number: 4,
						type: 5,
						label: 1
					},
					{
						name: "semantic",
						number: 5,
						type: 14,
						label: 1,
						typeName: ".google.protobuf.GeneratedCodeInfo.Annotation.Semantic"
					}
				],
				enumType: [{
					name: "Semantic",
					value: [
						{
							name: "NONE",
							number: 0
						},
						{
							name: "SET",
							number: 1
						},
						{
							name: "ALIAS",
							number: 2
						}
					]
				}]
			}]
		}
	],
	enumType: [{
		name: "Edition",
		value: [
			{
				name: "EDITION_UNKNOWN",
				number: 0
			},
			{
				name: "EDITION_LEGACY",
				number: 900
			},
			{
				name: "EDITION_PROTO2",
				number: 998
			},
			{
				name: "EDITION_PROTO3",
				number: 999
			},
			{
				name: "EDITION_2023",
				number: 1e3
			},
			{
				name: "EDITION_2024",
				number: 1001
			},
			{
				name: "EDITION_2026",
				number: 1002
			},
			{
				name: "EDITION_UNSTABLE",
				number: 9999
			},
			{
				name: "EDITION_1_TEST_ONLY",
				number: 1
			},
			{
				name: "EDITION_2_TEST_ONLY",
				number: 2
			},
			{
				name: "EDITION_99997_TEST_ONLY",
				number: 99997
			},
			{
				name: "EDITION_99998_TEST_ONLY",
				number: 99998
			},
			{
				name: "EDITION_99999_TEST_ONLY",
				number: 99999
			},
			{
				name: "EDITION_MAX",
				number: 0x7fffffff
			}
		]
	}, {
		name: "SymbolVisibility",
		value: [
			{
				name: "VISIBILITY_UNSET",
				number: 0
			},
			{
				name: "VISIBILITY_LOCAL",
				number: 1
			},
			{
				name: "VISIBILITY_EXPORT",
				number: 2
			}
		]
	}]
}), 1), af;
(function(e) {
	e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(af ||= {});
var of;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(of ||= {});
var sf;
(function(e) {
	e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(sf ||= {});
var cf;
(function(e) {
	e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(cf ||= {});
var lf;
(function(e) {
	e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(lf ||= {});
var uf;
(function(e) {
	e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(uf ||= {});
var df;
(function(e) {
	e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(df ||= {});
var ff;
(function(e) {
	e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(ff ||= {});
var pf;
(function(e) {
	e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(pf ||= {});
var mf;
(function(e) {
	e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(mf ||= {});
var hf;
(function(e) {
	e[e.PROTO_LIMITS_UNKNOWN = 0] = "PROTO_LIMITS_UNKNOWN", e[e.LEGACY_NO_EXPLICIT_LIMITS = 1] = "LEGACY_NO_EXPLICIT_LIMITS", e[e.PROTO_LIMITS2026 = 2] = "PROTO_LIMITS2026";
})(hf ||= {});
var gf;
(function(e) {
	e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(gf ||= {});
var _f;
(function(e) {
	e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(_f ||= {});
var vf;
(function(e) {
	e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(vf ||= {});
var yf;
(function(e) {
	e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(yf ||= {});
var bf;
(function(e) {
	e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(bf ||= {});
var xf;
(function(e) {
	e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(xf ||= {});
var Sf;
(function(e) {
	e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY", e[e.STYLE2026 = 3] = "STYLE2026";
})(Sf ||= {});
var Cf;
(function(e) {
	e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(Cf ||= {});
var wf;
(function(e) {
	e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_2026 = 1002] = "EDITION_2026", e[e.EDITION_UNSTABLE = 9999] = "EDITION_UNSTABLE", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 0x7fffffff] = "EDITION_MAX";
})(wf ||= {});
var Tf;
(function(e) {
	e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(Tf ||= {});
// node_modules/@bufbuild/protobuf/dist/esm/from-binary.js
function Ef(e) {
	return Object.assign(Object.assign({
		readUnknownFields: !0,
		recursionLimit: 100
	}, e), { depth: 0 });
}
function Df(e, t, n) {
	let r = V(e);
	return kf(e).read(r, new Zl(t), Ef(n), t.byteLength), r;
}
var Of = /* @__PURE__ */ new WeakMap();
function kf(e) {
	let t = Of.get(e);
	return t === void 0 && (t = Af(e)), t;
}
function Af(e) {
	let t = String(e), n = /* @__PURE__ */ new Map(), r = {
		read: jf(t, n),
		readGroup: Mf(t, n)
	};
	Of.set(e, r);
	for (let t of e.fields) n.set(t.number, Pf(t));
	return r;
}
function jf(e, t) {
	return (n, r, i, a) => {
		if (++i.depth > i.recursionLimit) throw Error(`cannot decode ${e} from binary: maximum recursion depth of ${i.recursionLimit} reached`);
		let o = r.pos + a, s = n.$unknown ?? [];
		for (; r.pos < o;) {
			let [e, a] = r.tag(), o = t.get(e);
			if (o === void 0) {
				let t = r.skip(a, e, i.recursionLimit - i.depth);
				i.readUnknownFields && s.push({
					no: e,
					wireType: a,
					data: t
				});
			} else o(n, r, i, a);
		}
		s.length > 0 && (n.$unknown = s), i.depth--;
	};
}
function Mf(e, t) {
	return (n, r, i, a) => {
		if (++i.depth > i.recursionLimit) throw Error(`cannot decode ${e} from binary: maximum recursion depth of ${i.recursionLimit} reached`);
		let o, s, c = n.$unknown ?? [];
		for (; r.pos < r.len && ([o, s] = r.tag(), s != U.EndGroup);) {
			let e = t.get(o);
			if (e === void 0) {
				let e = r.skip(s, o, i.recursionLimit - i.depth);
				i.readUnknownFields && c.push({
					no: o,
					wireType: s,
					data: e
				});
			} else e(n, r, i, s);
		}
		if (s != U.EndGroup || o !== a) throw Error("invalid end group tag");
		c.length > 0 && (n.$unknown = c), i.depth--;
	};
}
function Nf(e, t, n, r, i) {
	Pf(n)(e[z], t, i, r);
}
function Pf(e) {
	switch (e.fieldKind) {
		case "scalar": return Ff(e);
		case "enum": return If(e);
		case "message": return Lf(e);
		case "list": return zf(e);
		case "map": return Bf(e);
	}
}
function Ff(e) {
	let t = Vf(e.scalar, e.utf8Validation, e.longAsString), n = e.localName;
	if (e.oneof) {
		let r = e.oneof.localName;
		return (e, i) => {
			e[r] = {
				case: n,
				value: t(i)
			};
		};
	}
	return (e, r) => {
		e[n] = t(r);
	};
}
function If(e) {
	let t = e.localName, n = e.oneof?.localName;
	if (e.enum.open) return n === void 0 ? (e, n) => {
		e[t] = n.int32();
	} : (e, r) => {
		e[n] = {
			case: t,
			value: r.int32()
		};
	};
	let r = e.enum.values, i = e.number;
	return (e, a, o, s) => {
		let c = a.int32();
		if (r.some((e) => e.number === c)) n === void 0 ? e[t] = c : e[n] = {
			case: t,
			value: c
		};
		else if (o.readUnknownFields) {
			let t = [];
			Qc(c, t);
			let n = e.$unknown ?? [];
			n.push({
				no: i,
				wireType: s,
				data: new Uint8Array(t)
			}), e.$unknown = n;
		}
	};
}
function Lf(e) {
	let t = e.localName, { toMessage: n, toLocal: r } = du(e), i = Rf(e);
	if (e.oneof) {
		let a = e.oneof.localName;
		return (e, o, s) => {
			let c = e[a], l = n(c.case === t ? c.value : void 0);
			i(l, o, s), e[a] = {
				case: t,
				value: r(l)
			};
		};
	}
	return (e, a, o) => {
		let s = n(e[t]);
		i(s, a, o), e[t] = r(s);
	};
}
function Rf(e) {
	let t = kf(e.message);
	if (e.delimitedEncoding) {
		let n = e.number;
		return (e, r, i) => t.readGroup(e, r, i, n);
	}
	return (e, n, r) => t.read(e, n, r, n.uint32());
}
function zf(e) {
	let t = e.localName;
	if (e.listKind == "message") {
		let { toMessage: n, toLocal: r } = du(e), i = Rf(e);
		return (e, a, o) => {
			let s = n(void 0);
			i(s, a, o), e[t].push(r(s));
		};
	}
	let n = e.listKind == "enum" ? L.INT32 : e.scalar, r = e.listKind == "scalar" && e.longAsString, i = Vf(n, e.utf8Validation, r), a = n != L.STRING && n != L.BYTES;
	return (e, n, r, o) => {
		let s = e[t];
		if (o == U.LengthDelimited && a) {
			let e = n.uint32() + n.pos;
			for (; n.pos < e;) s.push(i(n));
		} else s.push(i(n));
	};
}
function Bf(e) {
	let t = e.localName, n = Vf(e.mapKey, e.utf8Validation, !1), r = rl(e.mapKey, !1), i, a;
	switch (e.mapKind) {
		case "scalar": {
			let t = e.scalar, n = Vf(t, e.utf8Validation, !1);
			if (i = (e) => n(e), t == L.BYTES) a = () => /* @__PURE__ */ new Uint8Array();
			else {
				let e = rl(t, !1);
				a = () => e;
			}
			break;
		}
		case "enum": {
			let t = e.enum.values[0].number;
			i = (e) => e.int32(), a = () => t;
			break;
		}
		case "message": {
			let { toMessage: t, toLocal: n } = du(e), r = kf(e.message).read;
			i = (e, i, a) => {
				let o = t(a);
				return r(o, e, i, e.uint32()), n(o);
			}, a = () => n(t(void 0));
			break;
		}
	}
	return (e, o, s) => {
		let c = e[t], l, u, d = o.uint32(), f = o.pos + d;
		for (; o.pos < f;) {
			let [e, t] = o.tag();
			switch (e) {
				case 1:
					l = n(o);
					break;
				case 2:
					u = i(o, s, u);
					break;
				default: o.skip(t, e, s.recursionLimit - s.depth);
			}
		}
		l === void 0 && (l = r), u === void 0 && (u = a()), B(c, l, u);
	};
}
function Vf(e, t, n) {
	switch (e) {
		case L.STRING: return (e) => e.string(t);
		case L.BOOL: return (e) => e.bool();
		case L.DOUBLE: return (e) => e.double();
		case L.FLOAT: return (e) => e.float();
		case L.INT32: return (e) => e.int32();
		case L.INT64: return n ? (e) => String(e.int64()) : (e) => e.int64();
		case L.UINT64: return n ? (e) => String(e.uint64()) : (e) => e.uint64();
		case L.FIXED64: return n ? (e) => String(e.fixed64()) : (e) => e.fixed64();
		case L.BYTES: return (e) => e.bytes();
		case L.FIXED32: return (e) => e.fixed32();
		case L.SFIXED32: return (e) => e.sfixed32();
		case L.SFIXED64: return n ? (e) => String(e.sfixed64()) : (e) => e.sfixed64();
		case L.SINT64: return n ? (e) => String(e.sint64()) : (e) => e.sint64();
		case L.UINT32: return (e) => e.uint32();
		case L.SINT32: return (e) => e.sint32();
	}
}
// node_modules/@bufbuild/protobuf/dist/esm/codegenv2/file.js
function Hf(e, t) {
	let n = Df(rf, Lu(e));
	return n.messageType.forEach(Zu), n.dependency = t?.map((e) => e.proto.name) ?? [], nd(n, (e) => t?.find((t) => t.proto.name === e)).getFile(n.name);
}
var Uf = /*@__PURE__*/ nf(/* @__PURE__ */ Hf("Chlnb29nbGUvcHJvdG9idWYvYW55LnByb3RvEg9nb29nbGUucHJvdG9idWYiJgoDQW55EhAKCHR5cGVfdXJsGAEgASgJEg0KBXZhbHVlGAIgASgMQnYKE2NvbS5nb29nbGUucHJvdG9idWZCCEFueVByb3RvUAFaLGdvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL2FueXBiogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), 0), Wf = 2, Gf = 3, Kf = { writeUnknownFields: !0 };
function qf(e) {
	return e ? Object.assign(Object.assign({}, Kf), e) : Kf;
}
function Jf(e, t, n) {
	let r = new Wl();
	return Xf(e)(r, qf(n), t), r.finish();
}
var Yf = /* @__PURE__ */ new WeakMap();
function Xf(e) {
	let t = Yf.get(e);
	return t === void 0 && (t = Zf(e)), t;
}
function Zf(e) {
	let t = e.typeName, n = e.fields.concat().sort((e, t) => e.number - t.number), r = n[0], i = [], a = (e, n, a) => {
		if (a.$typeName !== t && r !== void 0) throw new H(r, `cannot use ${r} with message ${a.$typeName}`, "ForeignFieldError");
		for (let t = 0; t < i.length; t++) i[t](e, n, a);
		let o = a.$unknown;
		if (o !== void 0 && n.writeUnknownFields) for (let t = 0; t < o.length; t++) {
			let { no: n, wireType: r, data: i } = o[t];
			e.tag(n, r).raw(i);
		}
	};
	Yf.set(e, a);
	for (let e of n) i.push(Qf(e));
	return a;
}
function Qf(e) {
	switch (e.fieldKind) {
		case "message":
		case "scalar":
		case "enum": return $f(e);
		case "list": return tp(e);
		case "map": return np(e);
	}
}
function $f(e) {
	let t = ep(e), n = e.localName;
	if (e.oneof) {
		let r = e.oneof.localName;
		return (e, i, a) => {
			let o = a[r];
			o.case === n && t(e, i, o.value);
		};
	}
	if (e.presence != Wf) {
		let r = e.presence == Gf ? `cannot encode ${e} to binary: required field not set` : void 0;
		return (e, i, a) => {
			let o = a[n];
			if (o !== void 0 && Object.prototype.hasOwnProperty.call(a, n)) t(e, i, o);
			else if (r !== void 0) throw Error(r);
		};
	}
	if (e.fieldKind == "enum") {
		let r = e.enum.values[0].number;
		return (e, i, a) => {
			let o = a[n];
			o !== r && t(e, i, o);
		};
	}
	switch (e.scalar) {
		case L.BOOL: return (e, r, i) => {
			let a = i[n];
			a !== !1 && t(e, r, a);
		};
		case L.STRING: return (e, r, i) => {
			let a = i[n];
			a !== "" && t(e, r, a);
		};
		case L.BYTES: return (e, r, i) => {
			let a = i[n];
			(!(a instanceof Uint8Array) || a.byteLength > 0) && t(e, r, a);
		};
		case L.DOUBLE:
		case L.FLOAT: return (e, r, i) => {
			let a = i[n];
			Object.is(a, 0) || t(e, r, a);
		};
		default: return (e, r, i) => {
			let a = i[n];
			a != 0 && t(e, r, a);
		};
	}
}
function ep(e) {
	switch (e.fieldKind) {
		case "message": {
			let { toMessage: t } = du(e), n = cp(e);
			return (e, r, i) => {
				n(e, r, t(i));
			};
		}
		case "scalar":
		case "enum": {
			let t = e.fieldKind == "enum" ? L.INT32 : e.scalar, n = e.number, r = lp(t), i = ap(t, e.parent.typeName, e.name);
			return (e, t, a) => {
				e.tag(n, r), i(e, a);
			};
		}
	}
}
function tp(e) {
	let t = e.localName, n = e.number;
	switch (e.listKind) {
		case "message": {
			let { toMessage: n } = du(e), r = cp(e);
			return (e, i, a) => {
				let o = a[t];
				for (let t = 0; t < o.length; t++) r(e, i, n(o[t]));
			};
		}
		case "scalar":
		case "enum": {
			let r = e.listKind == "enum" ? L.INT32 : e.scalar, i = ap(r, e.parent.typeName, e.name);
			if (e.packed) return (e, r, a) => {
				let o = a[t];
				if (o.length != 0) {
					e.tag(n, U.LengthDelimited).fork();
					for (let t = 0; t < o.length; t++) i(e, o[t]);
					e.join();
				}
			};
			let a = lp(r);
			return (e, r, o) => {
				let s = o[t];
				for (let t = 0; t < s.length; t++) e.tag(n, a), i(e, s[t]);
			};
		}
	}
}
function np(e) {
	let t = e.localName, n = e.number, r = rp(e);
	if (e.mapKind == "message") {
		let { toMessage: i } = du(e), a = Xf(e.message);
		return (e, o, s) => {
			let c = s[t], l = Object.keys(c);
			for (let t = 0; t < l.length; t++) {
				let s = l[t];
				e.tag(n, U.LengthDelimited).fork(), r(e, s), e.tag(2, U.LengthDelimited).fork(), a(e, o, i(c[s])), e.join(), e.join();
			}
		};
	}
	let i = e.mapKind == "enum" ? L.INT32 : e.scalar, a = lp(i), o = ap(i, e.parent.typeName, e.name);
	return (e, i, s) => {
		let c = s[t], l = Object.keys(c);
		for (let t = 0; t < l.length; t++) {
			let i = l[t];
			e.tag(n, U.LengthDelimited).fork(), r(e, i), e.tag(2, a), o(e, c[i]), e.join();
		}
	};
}
function rp(e) {
	let t = lp(e.mapKey), n = ap(e.mapKey, e.parent.typeName, e.name), r = ip(e.mapKey);
	return (e, i) => {
		e.tag(1, t), n(e, r(i));
	};
}
function ip(e) {
	switch (e) {
		case L.STRING: return (e) => e;
		case L.BOOL: return (e) => e === "true" || e !== "false" && e;
		case L.UINT64:
		case L.FIXED64: return (e) => {
			try {
				return R.uParse(e);
			} catch {
				return e;
			}
		};
		case L.INT64:
		case L.SFIXED64:
		case L.SINT64: return (e) => {
			try {
				return R.parse(e);
			} catch {
				return e;
			}
		};
		default: return (e) => {
			let t = Number.parseInt(e);
			return Number.isFinite(t) ? t : e;
		};
	}
}
function ap(e, t, n) {
	let r = op(e);
	return (e, i) => {
		try {
			r(e, i);
		} catch (e) {
			throw e instanceof Error ? Error(`cannot encode field ${t}.${n} to binary: ${e.message}`) : e;
		}
	};
}
function op(e) {
	switch (e) {
		case L.STRING: return (e, t) => e.string(t);
		case L.BOOL: return (e, t) => e.bool(t);
		case L.DOUBLE: return (e, t) => e.double(t);
		case L.FLOAT: return (e, t) => e.float(t);
		case L.INT32: return (e, t) => e.int32(t);
		case L.INT64: return (e, t) => e.int64(t);
		case L.UINT64: return (e, t) => e.uint64(t);
		case L.FIXED64: return (e, t) => e.fixed64(t);
		case L.BYTES: return (e, t) => e.bytes(t);
		case L.FIXED32: return (e, t) => e.fixed32(t);
		case L.SFIXED32: return (e, t) => e.sfixed32(t);
		case L.SFIXED64: return (e, t) => e.sfixed64(t);
		case L.SINT64: return (e, t) => e.sint64(t);
		case L.UINT32: return (e, t) => e.uint32(t);
		case L.SINT32: return (e, t) => e.sint32(t);
	}
}
function sp(e, t, n, r) {
	Qf(r)(e, t, n[z]);
}
function cp(e) {
	let t = e.number, n = Xf(e.message);
	return e.delimitedEncoding ? (e, r, i) => {
		e.tag(t, U.StartGroup), n(e, r, i), e.tag(t, U.EndGroup);
	} : (e, r, i) => {
		e.tag(t, U.LengthDelimited).fork(), n(e, r, i), e.join();
	};
}
function lp(e) {
	switch (e) {
		case L.BYTES:
		case L.STRING: return U.LengthDelimited;
		case L.DOUBLE:
		case L.FIXED64:
		case L.SFIXED64: return U.Bit64;
		case L.FIXED32:
		case L.SFIXED32:
		case L.FLOAT: return U.Bit32;
		default: return U.Varint;
	}
}
// node_modules/@bufbuild/protobuf/dist/esm/wkt/any.js
function up(e, t, n) {
	let r = !1;
	return n || (n = V(Uf), r = !0), n.value = Jf(e, t), n.typeUrl = pp(t.$typeName), r ? n : void 0;
}
function dp(e, t) {
	return e.typeUrl !== "" && (typeof t == "string" ? t : t.typeName) === mp(e.typeUrl);
}
function fp(e, t) {
	if (e.typeUrl === "") return;
	let n = t.kind == "message" ? t : t.getMessage(mp(e.typeUrl));
	if (n && dp(e, n)) return Df(n, e.value);
}
function pp(e) {
	return `type.googleapis.com/${e}`;
}
function mp(e) {
	let t = e.lastIndexOf("/"), n = t >= 0 ? e.substring(t + 1) : e;
	if (!n.length) throw Error(`invalid type url: ${e}`);
	return n;
}
// node_modules/@bufbuild/protobuf/dist/esm/wkt/google/protobuf/struct_pb.js
var hp = /*@__PURE__*/ Hf("Chxnb29nbGUvcHJvdG9idWYvc3RydWN0LnByb3RvEg9nb29nbGUucHJvdG9idWYihAEKBlN0cnVjdBIzCgZmaWVsZHMYASADKAsyIy5nb29nbGUucHJvdG9idWYuU3RydWN0LkZpZWxkc0VudHJ5GkUKC0ZpZWxkc0VudHJ5EgsKA2tleRgBIAEoCRIlCgV2YWx1ZRgCIAEoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZToCOAEi6gEKBVZhbHVlEjAKCm51bGxfdmFsdWUYASABKA4yGi5nb29nbGUucHJvdG9idWYuTnVsbFZhbHVlSAASFgoMbnVtYmVyX3ZhbHVlGAIgASgBSAASFgoMc3RyaW5nX3ZhbHVlGAMgASgJSAASFAoKYm9vbF92YWx1ZRgEIAEoCEgAEi8KDHN0cnVjdF92YWx1ZRgFIAEoCzIXLmdvb2dsZS5wcm90b2J1Zi5TdHJ1Y3RIABIwCgpsaXN0X3ZhbHVlGAYgASgLMhouZ29vZ2xlLnByb3RvYnVmLkxpc3RWYWx1ZUgAQgYKBGtpbmQiMwoJTGlzdFZhbHVlEiYKBnZhbHVlcxgBIAMoCzIWLmdvb2dsZS5wcm90b2J1Zi5WYWx1ZSobCglOdWxsVmFsdWUSDgoKTlVMTF9WQUxVRRAAQn8KE2NvbS5nb29nbGUucHJvdG9idWZCC1N0cnVjdFByb3RvUAFaL2dvb2dsZS5nb2xhbmcub3JnL3Byb3RvYnVmL3R5cGVzL2tub3duL3N0cnVjdHBi+AEBogIDR1BCqgIeR29vZ2xlLlByb3RvYnVmLldlbGxLbm93blR5cGVzYgZwcm90bzM"), gp = /*@__PURE__*/ nf(hp, 0), _p = /*@__PURE__*/ nf(hp, 1), vp = /*@__PURE__*/ nf(hp, 2), yp;
(function(e) {
	e[e.NULL_VALUE = 0] = "NULL_VALUE";
})(yp ||= {});
// node_modules/@bufbuild/protobuf/dist/esm/extensions.js
function bp(e, t, n) {
	wp(t, e);
	let r = Sp(e.$unknown, t), [i, a, o] = Cp(t), s = Ef(n);
	for (let e of r) Nf(i, new Zl(e.data), a, e.wireType, s);
	return o();
}
function xp(e, t, n) {
	wp(t, e);
	let r = (e.$unknown ?? []).filter((e) => e.no !== t.number), [i, a] = Cp(t, n), o = new Wl();
	sp(o, { writeUnknownFields: !0 }, i, a);
	let s = new Zl(o.finish());
	for (; s.pos < s.len;) {
		let [e, t] = s.tag(), n = s.skip(t, e);
		r.push({
			no: e,
			wireType: t,
			data: n
		});
	}
	e.$unknown = r;
}
function Sp(e, t) {
	if (e === void 0) return [];
	if (t.fieldKind === "enum" || t.fieldKind === "scalar") {
		for (let n = e.length - 1; n >= 0; --n) if (e[n].no == t.number) return [e[n]];
		return [];
	}
	return e.filter((e) => e.no === t.number);
}
function Cp(e, t) {
	let n = e.typeName, r = Object.assign(Object.assign({}, e), {
		kind: "field",
		parent: e.extendee,
		localName: n
	}), i = Object.assign(Object.assign({}, e.extendee), {
		fields: [r],
		members: [r],
		oneofs: []
	}), a = V(i, t === void 0 ? void 0 : { [n]: t });
	return [
		_u(i, a),
		r,
		() => {
			let t = a[n];
			if (t === void 0) {
				let t = e.message;
				return vl(t) ? rl(t.fields[0].scalar, t.fields[0].longAsString) : V(t);
			}
			return t;
		}
	];
}
function wp(e, t) {
	if (e.extendee.typeName != t.$typeName) throw Error(`extension ${e.typeName} can only be applied to message ${e.extendee.typeName}`);
}
// node_modules/@bufbuild/protobuf/dist/esm/wkt/json.js
var Tp = /*@__PURE__*/ Date.parse("0001-01-01T00:00:00Z"), Ep = /*@__PURE__*/ Date.parse("9999-12-31T23:59:59Z"), Dp = 3, Op = 2, kp = {
	alwaysEmitImplicit: !1,
	enumAsInteger: !1,
	useProtoFieldName: !1
};
function Ap(e) {
	return e ? Object.assign(Object.assign({}, kp), e) : kp;
}
function jp(e, t, n) {
	return Np(e)(Ap(n), t);
}
var Mp = /* @__PURE__ */ new WeakMap();
function Np(e) {
	let t = Mp.get(e);
	return t === void 0 && (t = Pp(e)), t;
}
function Pp(e) {
	let t = e.typeName, n = Ip(e);
	if (n !== void 0) {
		let r = e.fields[0], i = (e, i) => {
			if (i.$typeName !== t && r !== void 0) throw new H(r, `cannot use ${r} with message ${i.$typeName}`, "ForeignFieldError");
			return n(e, i);
		};
		return Mp.set(e, i), i;
	}
	let r = e.fields.concat().sort((e, t) => e.number - t.number), i = r[0], a = [], o = (n, r) => {
		if (r.$typeName !== t && i !== void 0) throw new H(i, `cannot use ${i} with message ${r.$typeName}`, "ForeignFieldError");
		let o = {};
		for (let e = 0; e < a.length; e++) a[e](n, r, o);
		return n.registry && Xp(o, n, n.registry, r, e), o;
	};
	Mp.set(e, o);
	for (let e of r) {
		let t = Lp(e);
		a.push(e.jsonName === "__proto__" || e.name === "__proto__" ? Fp(t) : t);
	}
	return o;
}
function Fp(e) {
	return (t, n, r) => {
		let i = Object.create(null);
		e(t, n, i);
		for (let e of Object.keys(i)) B(r, e, i[e]);
	};
}
function Ip(e) {
	if (e.typeName.startsWith("google.protobuf.")) switch (e.typeName) {
		case "google.protobuf.Any": return (e, t) => Zp(t, e);
		case "google.protobuf.Timestamp": return (e, t) => rm(t);
		case "google.protobuf.Duration": return (e, t) => Qp(t);
		case "google.protobuf.FieldMask": return (e, t) => $p(t);
		case "google.protobuf.Struct": return (e, t) => em(t);
		case "google.protobuf.Value": return (e, t) => tm(t);
		case "google.protobuf.ListValue": return (e, t) => nm(t);
		default:
			if (vl(e)) {
				let t = e.fields[0], n = t.localName, r = rl(t.scalar, !1), i = Jp(t);
				return (e, t) => {
					let a = t[n];
					return i(e, a === void 0 ? r : a);
				};
			}
			return;
	}
}
function Lp(e) {
	switch (e.fieldKind) {
		case "scalar":
		case "enum":
		case "message": return Rp(e);
		case "list":
		case "map": {
			let t = e.fieldKind == "list" ? Hp(e) : Wp(e), n = e.name, r = e.jsonName, i = e.localName;
			return (e, a, o) => {
				let s = t(e, a[i]);
				s !== void 0 && (o[e.useProtoFieldName ? n : r] = s);
			};
		}
	}
}
function Rp(e) {
	let t = Bp(e), n = e.name, r = e.jsonName, i = e.localName;
	if (e.oneof) {
		let a = e.oneof.localName;
		return (e, o, s) => {
			let c = o[a];
			c.case === i && (s[e.useProtoFieldName ? n : r] = t(e, c.value));
		};
	}
	if (e.presence != Op) {
		let a = e.presence == Dp ? `cannot encode ${e} to JSON: required field not set` : void 0;
		return (e, o, s) => {
			let c = o[i];
			if (c !== void 0 && Object.prototype.hasOwnProperty.call(o, i)) s[e.useProtoFieldName ? n : r] = t(e, c);
			else if (a !== void 0) throw Error(a);
		};
	}
	if (e.fieldKind == "enum") {
		let a = e.enum.values[0].number;
		return (e, o, s) => {
			let c = o[i];
			(c !== a || e.alwaysEmitImplicit) && (s[e.useProtoFieldName ? n : r] = t(e, c));
		};
	}
	switch (e.scalar) {
		case L.BOOL: return (e, a, o) => {
			let s = a[i];
			(s !== !1 || e.alwaysEmitImplicit) && (o[e.useProtoFieldName ? n : r] = t(e, s));
		};
		case L.STRING: return (e, a, o) => {
			let s = a[i];
			(s !== "" || e.alwaysEmitImplicit) && (o[e.useProtoFieldName ? n : r] = t(e, s));
		};
		case L.BYTES: return (e, a, o) => {
			let s = a[i];
			(!(s instanceof Uint8Array) || s.byteLength > 0 || e.alwaysEmitImplicit) && (o[e.useProtoFieldName ? n : r] = t(e, s));
		};
		case L.DOUBLE:
		case L.FLOAT: return (e, a, o) => {
			let s = a[i];
			(!Object.is(s, 0) || e.alwaysEmitImplicit) && (o[e.useProtoFieldName ? n : r] = t(e, s));
		};
		default: return (e, a, o) => {
			let s = a[i];
			(s != 0 || e.alwaysEmitImplicit) && (o[e.useProtoFieldName ? n : r] = t(e, s));
		};
	}
}
function zp(e) {
	switch (e.fieldKind) {
		case "scalar":
		case "enum":
		case "message": return Bp(e);
		case "list": return Hp(e);
		case "map": return Wp(e);
	}
}
function Bp(e) {
	switch (e.fieldKind) {
		case "scalar": return Jp(e);
		case "enum": return Kp(e);
		case "message": return Vp(e);
	}
}
function Vp(e) {
	let { toMessage: t } = du(e), n = Np(e.message);
	return (e, r) => n(e, t(r));
}
function Hp(e) {
	let t = Up(e);
	return (e, n) => {
		let r = n;
		if (r.length == 0 && !e.alwaysEmitImplicit) return;
		let i = [];
		for (let n = 0; n < r.length; n++) i.push(t(e, r[n]));
		return i;
	};
}
function Up(e) {
	switch (e.listKind) {
		case "scalar": return Jp(e);
		case "enum": return Kp(e);
		case "message": return Vp(e);
	}
}
function Wp(e) {
	let t = Gp(e);
	return (e, n) => {
		let r = n, i = Object.keys(r);
		if (i.length == 0 && !e.alwaysEmitImplicit) return;
		let a = {};
		for (let n = 0; n < i.length; n++) {
			let o = i[n];
			B(a, o, t(e, r[o]));
		}
		return a;
	};
}
function Gp(e) {
	switch (e.mapKind) {
		case "scalar": return Jp(e);
		case "enum": return Kp(e);
		case "message": return Vp(e);
	}
}
function Kp(e) {
	let t = e.enum;
	return t.typeName == "google.protobuf.NullValue" ? (e, n) => {
		if (typeof n != "number") throw qp(t, n);
		return null;
	} : (e, n) => {
		if (typeof n != "number") throw qp(t, n);
		return e.enumAsInteger ? n : t.value[n]?.jsonName ?? n;
	};
}
function qp(e, t) {
	return /* @__PURE__ */ Error(`cannot encode ${e} to JSON: expected number, got ${G(t)}`);
}
function Jp(e) {
	switch (e.scalar) {
		case L.INT32:
		case L.SFIXED32:
		case L.SINT32:
		case L.FIXED32:
		case L.UINT32: return (t, n) => {
			if (typeof n != "number") throw Yp(e, n);
			return n;
		};
		case L.FLOAT:
		case L.DOUBLE: return (t, n) => {
			if (typeof n != "number") throw Yp(e, n);
			return Number.isNaN(n) ? "NaN" : n === 1e400 ? "Infinity" : n === -1e400 ? "-Infinity" : n;
		};
		case L.STRING: return (t, n) => {
			if (typeof n != "string") throw Yp(e, n);
			return n;
		};
		case L.BOOL: return (t, n) => {
			if (typeof n != "boolean") throw Yp(e, n);
			return n;
		};
		case L.UINT64:
		case L.FIXED64:
		case L.INT64:
		case L.SFIXED64:
		case L.SINT64: return (t, n) => {
			if (typeof n == "bigint" || typeof n == "string" || typeof n == "number" && Number.isInteger(n)) return n.toString();
			throw Yp(e, n);
		};
		case L.BYTES: return (t, n) => {
			if (n instanceof Uint8Array) return Vu(n);
			throw Yp(e, n);
		};
	}
}
function Yp(e, t) {
	return /* @__PURE__ */ Error(`cannot encode ${e} to JSON: ${tu(e, t)?.message}`);
}
function Xp(e, t, n, r, i) {
	let a = r.$unknown;
	if (a === void 0) return;
	let o = /* @__PURE__ */ new Set();
	for (let s = 0; s < a.length; s++) {
		let { no: c } = a[s];
		if (!o.has(c)) {
			o.add(c);
			let a = n.getExtensionFor(i, c);
			if (!a) continue;
			let [s, l] = Cp(a, bp(r, a)), u = s[z], d = zp(l)(t, u[l.localName]);
			d !== void 0 && (e[a.jsonName] = d);
		}
	}
}
function Zp(e, t) {
	if (e.typeUrl === "") return {};
	let { registry: n } = t, r, i;
	if (n && (r = fp(e, n), r && (i = n.getMessage(r.$typeName))), !i || !r) throw Error(`cannot encode message ${e.$typeName} to JSON: "${e.typeUrl}" is not in the type registry`);
	let a = yl(i) ? { value: Np(i)(t, r) } : Np(i)(t, r);
	return a["@type"] = e.typeUrl, a;
}
function Qp(e) {
	let t = Number(e.seconds), n = e.nanos;
	if (t > 315576e6 || t < -315576e6) throw Error(`cannot encode message ${e.$typeName} to JSON: value out of range`);
	if (t > 0 && n < 0 || t < 0 && n > 0) throw Error(`cannot encode message ${e.$typeName} to JSON: nanos sign must match seconds sign`);
	let r = e.seconds.toString();
	if (n !== 0) {
		let e = Math.abs(n).toString();
		e = "0".repeat(9 - e.length) + e, e.substring(3) === "000000" ? e = e.substring(0, 3) : e.substring(6) === "000" && (e = e.substring(0, 6)), r += "." + e, n < 0 && t == 0 && (r = "-" + r);
	}
	return r + "s";
}
function $p(e) {
	return e.paths.map((t) => {
		if (Ju(qu(t)) !== t) throw Error(`cannot encode message ${e.$typeName} to JSON: lowerCamelCase of path name "${t}" is irreversible`);
		return qu(t);
	}).join(",");
}
function em(e) {
	let t = {}, n = Object.keys(e.fields);
	for (let r = 0; r < n.length; r++) {
		let i = n[r];
		B(t, i, tm(e.fields[i]));
	}
	return t;
}
function tm(e) {
	switch (e.kind.case) {
		case "nullValue": return null;
		case "numberValue":
			if (!Number.isFinite(e.kind.value)) throw Error(`${e.$typeName} cannot be NaN or Infinity`);
			return e.kind.value;
		case "boolValue":
		case "stringValue": return e.kind.value;
		case "structValue": return em(e.kind.value);
		case "listValue": return nm(e.kind.value);
		default: throw Error(`${e.$typeName} must have a value`);
	}
}
function nm(e) {
	return e.values.map(tm);
}
function rm(e) {
	let t = Number(e.seconds) * 1e3;
	if (t < Tp || t > Ep) throw Error(`cannot encode message ${e.$typeName} to JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
	if (e.nanos < 0) throw Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be negative`);
	if (e.nanos > 999999999) throw Error(`cannot encode message ${e.$typeName} to JSON: nanos must not be greater than 999999999`);
	let n = "Z";
	if (e.nanos > 0) {
		let t = (e.nanos + 1e9).toString().substring(1);
		n = t.substring(3) === "000000" ? "." + t.substring(0, 3) + "Z" : t.substring(6) === "000" ? "." + t.substring(0, 6) + "Z" : "." + t + "Z";
	}
	return new Date(t).toISOString().replace(".000Z", n);
}
// node_modules/@bufbuild/protobuf/dist/esm/from-json.js
var im = 2;
function am(e) {
	return Object.assign(Object.assign({
		ignoreUnknownFields: !1,
		recursionLimit: 100
	}, e), { depth: 0 });
}
function om(e, t, n) {
	let r = V(e);
	return sm(e, r, t, n), r;
}
function sm(e, t, n, r) {
	try {
		lm(e)(t, n, am(r));
	} catch (e) {
		throw zl(e) ? Error(`cannot decode ${e.field()} from JSON: ${e.message}`, { cause: e }) : e;
	}
}
var cm = /* @__PURE__ */ new WeakMap();
function lm(e) {
	let t = cm.get(e);
	return t === void 0 && (t = um(e)), t;
}
function um(e) {
	let t = String(e), n = dm(e);
	if (n !== void 0) {
		let r = (e, r, i) => {
			if (++i.depth > i.recursionLimit) throw Error(`cannot decode ${t} from JSON: maximum recursion depth of ${i.recursionLimit} reached`);
			n(e, r, i), i.depth--;
		};
		return cm.set(e, r), r;
	}
	let r = e.typeName, i = /* @__PURE__ */ new Map(), a = (e, n, a) => {
		if (++a.depth > a.recursionLimit) throw Error(`cannot decode ${t} from JSON: maximum recursion depth of ${a.recursionLimit} reached`);
		if (n == null || Array.isArray(n) || typeof n != "object") throw Error(`cannot decode ${t} from JSON: ${G(n)}`);
		let o = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Set(), c = Object.keys(n);
		for (let l = 0; l < c.length; l++) {
			let u = c[l], d = n[u], f = i.get(u);
			if (f !== void 0) {
				let t = f.field;
				if (s.has(t)) throw new H(t, "set multiple times");
				if (s.add(t), f.oneofScalarNullSkip && d === null) continue;
				if (f.oneof) {
					let e = o.get(f.oneof);
					if (e !== void 0) throw new H(f.oneof, `oneof set multiple times by ${e.name} and ${t.name}`);
					o.set(f.oneof, t);
				}
				f.read(e, d, a);
			} else {
				let n = u.startsWith("[") && u.endsWith("]") ? a.registry?.getExtension(u.substring(1, u.length - 1)) : void 0;
				if (n?.extendee.typeName == r) {
					let [t, r, i] = Cp(n);
					fm(r)(t[z], d, a), xp(e, n, i());
				}
				if (n === void 0 && !a.ignoreUnknownFields) throw Error(`cannot decode ${t} from JSON: key "${u}" is unknown`);
			}
		}
		a.depth--;
	};
	cm.set(e, a);
	for (let t of e.fields) {
		let e = {
			read: fm(t),
			field: t,
			oneof: t.oneof,
			oneofScalarNullSkip: t.oneof !== void 0 && t.fieldKind == "scalar"
		};
		i.set(t.name, e).set(t.jsonName, e);
	}
	return a;
}
function dm(e) {
	if (e.typeName.startsWith("google.protobuf.")) switch (e.typeName) {
		case "google.protobuf.Any": return (e, t, n) => Om(e, t, n);
		case "google.protobuf.Timestamp": return (e, t) => km(e, t);
		case "google.protobuf.Duration": return (e, t) => Am(e, t);
		case "google.protobuf.FieldMask": return (e, t) => jm(e, t);
		case "google.protobuf.Struct": return (e, t, n) => Mm(e, t, n);
		case "google.protobuf.Value": return (e, t, n) => Nm(e, t, n);
		case "google.protobuf.ListValue": return (e, t, n) => Pm(e, t, n);
		default:
			if (vl(e)) {
				let t = e.fields[0], n = t.localName, r = t.scalar, i = t.longAsString, a = Cm(t);
				return (e, t) => {
					t === null ? e[n] = rl(r, i) : e[n] = a(t);
				};
			}
			return;
	}
}
function fm(e) {
	switch (e.fieldKind) {
		case "scalar": return pm(e);
		case "enum": return hm(e);
		case "message": return gm(e);
		case "list": return _m(e);
		case "map": return ym(e);
	}
}
function pm(e) {
	let t = Cm(e), n = e.localName;
	if (e.oneof) {
		let r = e.oneof.localName;
		return (e, i) => {
			e[r] = {
				case: n,
				value: t(i)
			};
		};
	}
	let r = mm(e);
	return (e, i) => {
		i === null ? r(e) : e[n] = t(i);
	};
}
function mm(e) {
	let t = e.localName;
	if (e.presence != im) return (e) => {
		delete e[t];
	};
	if (e.fieldKind == "enum") {
		let n = e.enum.values[0].number;
		return (e) => {
			e[t] = n;
		};
	}
	let n = e.scalar, r = e.longAsString;
	return (e) => {
		e[t] = rl(n, r);
	};
}
function hm(e) {
	let t = xm(e.enum), n = Sm(e.enum), r = e.localName, i = e.enum.typeName != "google.protobuf.NullValue";
	if (e.oneof) {
		let a = e.oneof.localName;
		return (o, s, c) => {
			if (s === null && i) {
				o[a].case === r && (o[a] = { case: void 0 });
				return;
			}
			let l = t(s, c.ignoreUnknownFields);
			if (l === bm) return;
			let u = n(l);
			if (u !== !0) throw new H(e, W(e, l, u));
			o[a] = {
				case: r,
				value: l
			};
		};
	}
	let a = mm(e);
	return (o, s, c) => {
		if (s === null && i) {
			a(o);
			return;
		}
		let l = t(s, c.ignoreUnknownFields);
		if (l === bm) return;
		let u = n(l);
		if (u !== !0) throw new H(e, W(e, l, u));
		o[r] = l;
	};
}
function gm(e) {
	let t = e.localName, { toMessage: n, toLocal: r } = du(e), i = lm(e.message), a = e.message.typeName != "google.protobuf.Value";
	if (e.oneof) {
		let o = e.oneof.localName;
		return (e, s, c) => {
			let l = e[o];
			if (s === null && a) {
				l.case === t && (e[o] = { case: void 0 });
				return;
			}
			let u = n(l.case === t ? l.value : void 0);
			i(u, s, c), e[o] = {
				case: t,
				value: r(u)
			};
		};
	}
	return (e, o, s) => {
		if (o === null && a) {
			delete e[t];
			return;
		}
		let c = n(e[t]);
		i(c, o, s), e[t] = r(c);
	};
}
function _m(e) {
	let t = e.localName, n = vm(e);
	return (r, i, a) => {
		if (i === null) return;
		if (!Array.isArray(i)) throw new H(e, "expected Array, got " + G(i));
		let o = r[t];
		for (let e = 0; e < i.length; e++) {
			let t = n(i[e], a, o.length);
			t !== bm && o.push(t);
		}
	};
}
function vm(e) {
	switch (e.listKind) {
		case "scalar": {
			let t = wm(e), n = au(e.scalar), r = Tm(e);
			return (i, a, o) => {
				if (i === null) throw new H(e, "list item must not be null");
				let s = t(i), c = n(s);
				if (c !== !0) throw new H(e, `list item #${o + 1}: ${W(e, s, c)}`);
				return r(s);
			};
		}
		case "enum": {
			let t = xm(e.enum), n = Sm(e.enum), r = e.enum.typeName != "google.protobuf.NullValue";
			return (i, a, o) => {
				if (i === null && r) throw new H(e, "list item must not be null");
				let s = t(i, a.ignoreUnknownFields);
				if (s === bm) return s;
				let c = n(s);
				if (c !== !0) throw new H(e, `list item #${o + 1}: ${W(e, s, c)}`);
				return s;
			};
		}
		case "message": {
			let { toMessage: t, toLocal: n } = du(e), r = lm(e.message), i = e.message.typeName != "google.protobuf.Value";
			return (a, o) => {
				if (a === null && i) throw new H(e, "list item must not be null");
				let s = t(void 0);
				return r(s, a, o), n(s);
			};
		}
	}
}
function ym(e) {
	let t = e.localName, n = e.mapKey, r = Em(n), i = au(n), a, o, s = (e) => e, c = !0;
	switch (e.mapKind) {
		case "scalar":
			a = wm(e), o = au(e.scalar), s = Tm(e);
			break;
		case "enum": {
			let t = xm(e.enum);
			a = (e, n) => t(e, n.ignoreUnknownFields), o = Sm(e.enum), c = e.enum.typeName != "google.protobuf.NullValue";
			break;
		}
		case "message": {
			let { toMessage: t, toLocal: n } = du(e), r = lm(e.message);
			c = e.message.typeName != "google.protobuf.Value", a = (e, i) => {
				let a = t(void 0);
				return r(a, e, i), n(a);
			};
			break;
		}
	}
	return (l, u, d) => {
		if (u === null) return;
		if (typeof u != "object" || Array.isArray(u)) throw new H(e, "expected object, got " + G(u));
		let f = l[t], ee = /* @__PURE__ */ new Set(), te = Object.keys(u);
		for (let t = 0; t < te.length; t++) {
			let l = te[t], p = u[l], ne = r(l);
			if (ee.has(ne)) throw new H(e, `duplicate map key "${l}"`);
			if (ee.add(ne), p === null && c) throw new H(e, "map value must not be null");
			let re = a(p, d);
			if (re === bm) continue;
			let ie = i(ne);
			if (ie !== !0) throw new H(e, `invalid map key: ${W({ scalar: n }, ne, ie)}`);
			if (o !== void 0) {
				let t = o(re);
				if (t !== !0) throw new H(e, `map entry ${G(ne)}: ${W(e, re, t)}`);
			}
			B(f, ne, s(re));
		}
	};
}
var bm = Symbol();
function xm(e) {
	let t = e.values[0].number, n = /* @__PURE__ */ new Map();
	for (let t of e.values) n.set(t.jsonName, t.number);
	for (let t of e.values) n.set(t.name, t.number);
	return (r, i) => {
		if (r === null) return t;
		switch (typeof r) {
			case "number":
				if (Number.isInteger(r)) return r;
				break;
			case "string": {
				let e = n.get(r);
				if (e !== void 0) return e;
				if (i) return bm;
				break;
			}
		}
		throw Error(`cannot decode ${e} from JSON: ${G(r)}`);
	};
}
function Sm(e) {
	if (e.open) return au(L.INT32);
	let t = e.values;
	return (e) => t.some((t) => t.number === e);
}
function Cm(e) {
	let t = wm(e), n = au(e.scalar), r = Tm(e);
	return (i) => {
		let a = t(i), o = n(a);
		if (o !== !0) throw new H(e, W(e, a, o));
		return r(a);
	};
}
function wm(e) {
	switch (e.scalar) {
		case L.DOUBLE:
		case L.FLOAT: return (t) => {
			if (t === "NaN") return NaN;
			if (t === "Infinity") return 1e400;
			if (t === "-Infinity") return -1e400;
			if (typeof t == "number") {
				if (Number.isNaN(t)) throw new H(e, "unexpected NaN number");
				if (!Number.isFinite(t)) throw new H(e, "unexpected infinite number");
				return t;
			}
			if (typeof t == "string") {
				if (t === "" || t.trim().length !== t.length) return t;
				let e = Number(t);
				return Number.isFinite(e) ? e : t;
			}
			return t;
		};
		case L.INT32:
		case L.FIXED32:
		case L.SFIXED32:
		case L.SINT32:
		case L.UINT32: return Dm;
		case L.BYTES: return (t) => {
			if (typeof t == "string") {
				if (t === "") return /* @__PURE__ */ new Uint8Array();
				try {
					return Lu(t);
				} catch (t) {
					throw new H(e, t instanceof Error ? t.message : String(t));
				}
			}
			return t;
		};
		default: return (e) => e;
	}
}
function Tm(e) {
	let t = e.fieldKind !== "map" && e.longAsString;
	switch (e.scalar) {
		case L.INT64:
		case L.SFIXED64:
		case L.SINT64: return t ? (e) => String(e) : (e) => typeof e == "string" || typeof e == "number" ? R.parse(e) : e;
		case L.FIXED64:
		case L.UINT64: return t ? (e) => String(e) : (e) => typeof e == "string" || typeof e == "number" ? R.uParse(e) : e;
		default: return (e) => e;
	}
}
function Em(e) {
	switch (e) {
		case L.BOOL: return (e) => {
			switch (e) {
				case "true": return !0;
				case "false": return !1;
			}
			return e;
		};
		case L.INT32:
		case L.FIXED32:
		case L.UINT32:
		case L.SFIXED32:
		case L.SINT32: return Dm;
		case L.INT64:
		case L.SINT64:
		case L.SFIXED64:
		case L.UINT64:
		case L.FIXED64: return (e) => /^-?0+$/.test(e) ? "0" : e.replace(/^(-?)0+(?=\d)/, "$1");
		default: return (e) => e;
	}
}
function Dm(e) {
	if (typeof e == "string") {
		if (e === "" || e.trim().length !== e.length) return e;
		let t = Number(e);
		return Number.isNaN(t) ? e : t;
	}
	return e;
}
function Om(e, t, n) {
	if (t === null || Array.isArray(t) || typeof t != "object") throw Error(`cannot decode message ${e.$typeName} from JSON: expected object but got ${G(t)}`);
	if (Object.keys(t).length == 0) return;
	let r = t["@type"];
	if (typeof r != "string" || r == "") throw Error(`cannot decode message ${e.$typeName} from JSON: "@type" is empty`);
	let i = r.includes("/") ? r.substring(r.lastIndexOf("/") + 1) : r;
	if (!i.length) throw Error(`cannot decode message ${e.$typeName} from JSON: "@type" is invalid`);
	let a = n.registry?.getMessage(i);
	if (!a) throw Error(`cannot decode message ${e.$typeName} from JSON: ${r} is not in the type registry`);
	let o = V(a);
	if (yl(a) && Object.prototype.hasOwnProperty.call(t, "value")) lm(a)(o, t.value, n);
	else {
		let e = {};
		for (let n of Object.keys(t)) n !== "@type" && B(e, n, t[n]);
		lm(a)(o, e, n);
	}
	up(a, o, e);
}
function km(e, t) {
	if (typeof t != "string") throw Error(`cannot decode message ${e.$typeName} from JSON: ${G(t)}`);
	let n = t.match(/^([0-9]{4})-([0-9]{2})-([0-9]{2})T([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]{1,9}))?(?:Z|([+-][0-9][0-9]:[0-9][0-9]))$/);
	if (!n) throw Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
	let r = Date.parse(n[1] + "-" + n[2] + "-" + n[3] + "T" + n[4] + ":" + n[5] + ":" + n[6] + (n[8] ? n[8] : "Z"));
	if (Number.isNaN(r)) throw Error(`cannot decode message ${e.$typeName} from JSON: invalid RFC 3339 string`);
	if (r < Tp || r > Ep) throw Error(`cannot decode message ${e.$typeName} from JSON: must be from 0001-01-01T00:00:00Z to 9999-12-31T23:59:59Z inclusive`);
	e.seconds = R.parse(r / 1e3), e.nanos = 0, n[7] && (e.nanos = parseInt("1" + n[7] + "0".repeat(9 - n[7].length)) - 1e9);
}
function Am(e, t) {
	if (typeof t != "string") throw Error(`cannot decode message ${e.$typeName} from JSON: ${G(t)}`);
	let n = t.match(/^(-?[0-9]+)(?:\.([0-9]+))?s/);
	if (n === null) throw Error(`cannot decode message ${e.$typeName} from JSON: ${G(t)}`);
	let r = Number(n[1]);
	if (r > 315576e6 || r < -315576e6) throw Error(`cannot decode message ${e.$typeName} from JSON: ${G(t)}`);
	if (e.seconds = R.parse(r), typeof n[2] != "string") return;
	let i = n[2] + "0".repeat(9 - n[2].length);
	e.nanos = parseInt(i), (r < 0 || Object.is(r, -0)) && (e.nanos = -e.nanos);
}
function jm(e, t) {
	if (typeof t != "string") throw Error(`cannot decode message ${e.$typeName} from JSON: ${G(t)}`);
	t !== "" && (e.paths = t.split(",").map((t) => {
		if (t.includes("_")) throw Error(`cannot decode message ${e.$typeName} from JSON: path names must be lowerCamelCase`);
		return Ju(t);
	}));
}
function Mm(e, t, n) {
	if (typeof t != "object" || !t || Array.isArray(t)) throw Error(`cannot decode message ${e.$typeName} from JSON ${G(t)}`);
	let r = Object.keys(t);
	for (let i = 0; i < r.length; i++) {
		let a = r[i], o = V(_p);
		Nm(o, t[a], n), B(e.fields, a, o);
	}
}
function Nm(e, t, n) {
	if (++n.depth > n.recursionLimit) throw Error(`cannot decode ${e.$typeName} from JSON: maximum recursion depth of ${n.recursionLimit} reached`);
	switch (typeof t) {
		case "number":
			e.kind = {
				case: "numberValue",
				value: t
			};
			break;
		case "string":
			e.kind = {
				case: "stringValue",
				value: t
			};
			break;
		case "boolean":
			e.kind = {
				case: "boolValue",
				value: t
			};
			break;
		case "object":
			if (t === null) e.kind = {
				case: "nullValue",
				value: yp.NULL_VALUE
			};
			else if (Array.isArray(t)) {
				let r = V(vp);
				Pm(r, t, n), e.kind = {
					case: "listValue",
					value: r
				};
			} else {
				let r = V(gp);
				Mm(r, t, n), e.kind = {
					case: "structValue",
					value: r
				};
			}
			break;
		default: throw Error(`cannot decode message ${e.$typeName} from JSON ${G(t)}`);
	}
	return n.depth--, e;
}
function Pm(e, t, n) {
	if (!Array.isArray(t)) throw Error(`cannot decode message ${e.$typeName} from JSON ${G(t)}`);
	for (let r = 0; r < t.length; r++) {
		let i = V(_p);
		Nm(i, t[r], n), e.values.push(i);
	}
}
// src/labels.js
var Fm = {
	device: "Gerät",
	position: "Position & GPS",
	power: "Energie",
	network: "WLAN & Netzwerk",
	display: "Anzeige",
	lora: "Funk (LoRa)",
	bluetooth: "Bluetooth",
	security: "Sicherheit",
	mqtt: "MQTT-Brücke",
	serial: "Serielle Schnittstelle",
	externalNotification: "Buzzer & LEDs",
	storeForward: "Speichern & Weiterleiten",
	rangeTest: "Reichweitentest",
	telemetry: "Telemetrie & Sensoren",
	cannedMessage: "Schnellnachrichten (Modul)",
	audio: "Audio",
	remoteHardware: "Fern-Hardware",
	neighborInfo: "Nachbar-Info",
	ambientLighting: "Umgebungslicht",
	detectionSensor: "Erkennungssensor",
	paxcounter: "Personenzähler",
	statusmessage: "Statusnachricht",
	trafficManagement: "Verkehrssteuerung",
	tak: "TAK",
	meshBeacon: "Mesh-Bake"
}, Im = {
	role: "Rolle",
	rebroadcastMode: "Weiterleiten",
	nodeInfoBroadcastSecs: "Knoten-Info senden alle (s)",
	doubleTapAsButtonPress: "Doppeltippen = Tastendruck",
	isManaged: "Verwaltet (nur Admin)",
	disableTripleClick: "Dreifachklick aus",
	tzdef: "Zeitzone (POSIX)",
	ledHeartbeatDisabled: "LED-Herzschlag aus",
	buzzerMode: "Buzzer-Modus",
	buttonGpio: "Tasten-GPIO",
	buzzerGpio: "Buzzer-GPIO",
	positionBroadcastSecs: "Position senden alle (s)",
	positionBroadcastSmartEnabled: "Intelligente Position",
	fixedPosition: "Feste Position",
	gpsUpdateInterval: "GPS-Abfrage alle (s)",
	positionFlags: "Positions-Felder",
	broadcastSmartMinimumDistance: "Intelligent: min. Abstand (m)",
	broadcastSmartMinimumIntervalSecs: "Intelligent: min. Intervall (s)",
	gpsMode: "GPS",
	gpsEnabled: "GPS an",
	isPowerSaving: "Stromsparmodus",
	onBatteryShutdownAfterSecs: "Auf Akku ausschalten nach (s)",
	adcMultiplierOverride: "ADC-Faktor",
	waitBluetoothSecs: "Bluetooth warten (s)",
	sdsSecs: "Tiefschlaf nach (s)",
	lsSecs: "Leichtschlaf (s)",
	minWakeSecs: "Mindest-Wachzeit (s)",
	deviceBatteryInaAddress: "INA-Adresse",
	wifiEnabled: "WLAN an",
	wifiSsid: "WLAN-Name (SSID)",
	wifiPsk: "WLAN-Passwort",
	ntpServer: "NTP-Server",
	ethEnabled: "Ethernet an",
	addressMode: "Adressmodus",
	ipv4Config: "IPv4",
	rsyslogServer: "Syslog-Server",
	screenOnSecs: "Bildschirm an (s)",
	autoScreenCarouselSecs: "Seitenwechsel automatisch (s)",
	flipScreen: "Bild drehen",
	units: "Einheiten",
	displaymode: "Anzeigemodus",
	headingBold: "Überschriften fett",
	wakeOnTapOrMotion: "Aufwecken bei Bewegung",
	use12hClock: "12-Stunden-Uhr",
	usePreset: "Voreinstellung nutzen",
	modemPreset: "Voreinstellung",
	bandwidth: "Bandbreite (kHz)",
	spreadFactor: "Spreading Factor",
	codingRate: "Coding Rate",
	frequencyOffset: "Frequenz-Versatz",
	region: "Region",
	hopLimit: "Max. Sprünge (Hops)",
	txEnabled: "Senden an",
	txPower: "Sendeleistung (dBm)",
	channelNum: "Frequenz-Slot",
	overrideDutyCycle: "Duty-Cycle ignorieren",
	sx126xRxBoostedGain: "RX-Verstärkung (SX126x)",
	overrideFrequency: "Frequenz überschreiben (MHz)",
	ignoreIncoming: "Ignorierte Knoten",
	ignoreMqtt: "MQTT-Pakete ignorieren",
	configOkToMqtt: "Erlaube MQTT-Weiterleitung",
	enabled: "Aktiv",
	mode: "Modus",
	fixedPin: "Fester PIN",
	publicKey: "Öffentlicher Schlüssel",
	privateKey: "Privater Schlüssel",
	adminKey: "Admin-Schlüssel",
	serialEnabled: "Serielle Konsole",
	debugLogApiEnabled: "Debug-Log über API",
	adminChannelEnabled: "Admin-Kanal (alt)",
	address: "Adresse",
	username: "Benutzer",
	password: "Passwort",
	encryptionEnabled: "Verschlüsselt",
	jsonEnabled: "JSON",
	tlsEnabled: "TLS",
	root: "Topic-Wurzel",
	proxyToClientEnabled: "Über App weiterleiten",
	mapReportingEnabled: "Kartenmeldung",
	mapReportSettings: "Kartenmeldung",
	name: "Name",
	psk: "Schlüssel (PSK, Base64)",
	uplinkEnabled: "Senden zu MQTT",
	downlinkEnabled: "Empfangen von MQTT",
	moduleSettings: "Modul-Einstellungen",
	positionPrecision: "Positionsgenauigkeit",
	isMuted: "Stumm",
	longName: "Langer Name",
	shortName: "Kurzname (4 Zeichen)",
	isLicensed: "Amateurfunk-Lizenz (unverschlüsselt)",
	isUnmessagable: "Nicht anschreibbar",
	rxGpio: "RX-GPIO",
	txGpio: "TX-GPIO",
	gpsEnGpio: "GPS-Enable-GPIO",
	powermonEnables: "Strommessung (Bitmaske)",
	ip: "IP-Adresse",
	gateway: "Gateway",
	subnet: "Subnetzmaske",
	dns: "DNS-Server",
	enabledProtocols: "Protokolle (Bitmaske)",
	ipv6Enabled: "IPv6 an",
	gpsFormat: "Koordinaten-Format",
	compassNorthTop: "Kompass: Norden oben",
	oled: "OLED-Typ",
	compassOrientation: "Kompass-Ausrichtung",
	paFanDisabled: "PA-Lüfter aus",
	version: "Version",
	screenBrightness: "Helligkeit",
	screenTimeout: "Bildschirm-Zeitlimit",
	screenLock: "Bildschirmsperre",
	settingsLock: "Einstellungen sperren",
	pinCode: "PIN-Code",
	theme: "Farbschema",
	alertEnabled: "Hinweise an",
	bannerEnabled: "Banner an",
	ringToneId: "Klingelton",
	language: "Sprache",
	nodeFilter: "Knotenfilter",
	unknownSwitch: "Unbekannte ausblenden",
	offlineSwitch: "Offline ausblenden",
	publicKeySwitch: "Nur mit Schlüssel",
	hopsAway: "Max. Sprünge entfernt",
	positionSwitch: "Nur mit Position",
	nodeName: "Knotenname",
	channel: "Kanal",
	nodeHighlight: "Knoten hervorheben",
	chatSwitch: "Chat",
	telemetrySwitch: "Telemetrie",
	iaqSwitch: "Luftqualität",
	calibrationData: "Kalibrierdaten",
	mapData: "Kartendaten",
	home: "Startpunkt",
	zoom: "Zoom",
	latitude: "Breitengrad",
	longitude: "Längengrad",
	style: "Stil",
	followGps: "GPS folgen",
	publishIntervalSecs: "Sendeintervall (s)",
	shouldReportLocation: "Position melden",
	echo: "Echo",
	rxd: "RX-Pin",
	txd: "TX-Pin",
	baud: "Baudrate",
	timeout: "Zeitlimit",
	overrideConsoleSerialPort: "Konsolen-Port übernehmen",
	outputMs: "Ausgabedauer (ms)",
	output: "Ausgang-GPIO",
	outputVibra: "Vibrations-GPIO",
	outputBuzzer: "Buzzer-GPIO",
	active: "Aktiv high",
	alertMessage: "Bei Nachricht",
	alertMessageVibra: "Bei Nachricht: Vibration",
	alertMessageBuzzer: "Bei Nachricht: Buzzer",
	alertBell: "Bei Glocke",
	alertBellVibra: "Bei Glocke: Vibration",
	alertBellBuzzer: "Bei Glocke: Buzzer",
	usePwm: "PWM-Buzzer",
	nagTimeout: "Wiederholen für (s)",
	useI2sAsBuzzer: "I2S als Buzzer",
	heartbeat: "Herzschlag",
	records: "Einträge",
	historyReturnMax: "Verlauf: max. Einträge",
	historyReturnWindow: "Verlauf: Zeitfenster (min)",
	isServer: "Ist Server",
	sender: "Sendeintervall (s)",
	save: "Ergebnisse speichern",
	deviceUpdateInterval: "Geräte-Telemetrie alle (s)",
	environmentUpdateInterval: "Umwelt-Telemetrie alle (s)",
	environmentMeasurementEnabled: "Umweltsensoren messen",
	environmentScreenEnabled: "Umweltwerte anzeigen",
	environmentDisplayFahrenheit: "Fahrenheit",
	airQualityEnabled: "Luftqualität messen",
	airQualityInterval: "Luftqualität alle (s)",
	powerMeasurementEnabled: "Strom messen",
	powerUpdateInterval: "Strom alle (s)",
	powerScreenEnabled: "Stromwerte anzeigen",
	healthMeasurementEnabled: "Gesundheitswerte messen",
	healthUpdateInterval: "Gesundheitswerte alle (s)",
	healthScreenEnabled: "Gesundheitswerte anzeigen",
	rotary1Enabled: "Drehgeber an",
	inputbrokerPinA: "Drehgeber Pin A",
	inputbrokerPinB: "Drehgeber Pin B",
	inputbrokerPinPress: "Drehgeber Taster-Pin",
	inputbrokerEventCw: "Ereignis rechts",
	inputbrokerEventCcw: "Ereignis links",
	inputbrokerEventPress: "Ereignis Druck",
	updown1Enabled: "Auf/Ab-Tasten an",
	allowInputSource: "Eingabequelle",
	sendBell: "Glocke senden",
	codec2Enabled: "Codec2 an",
	pttPin: "PTT-Pin",
	bitrate: "Bitrate",
	i2sWs: "I2S WS",
	i2sSd: "I2S SD",
	i2sDin: "I2S DIN",
	i2sSck: "I2S SCK",
	allowUndefinedPinAccess: "Undefinierte Pins erlauben",
	availablePins: "Verfügbare Pins",
	updateInterval: "Intervall (s)",
	transmitOverLora: "Über LoRa senden",
	ledState: "LED an",
	current: "Stromstärke",
	red: "Rot",
	green: "Grün",
	blue: "Blau",
	minimumBroadcastSecs: "Min. Sendeabstand (s)",
	stateBroadcastSecs: "Status senden alle (s)",
	monitorPin: "Überwachter Pin",
	detectionTriggerType: "Auslöser",
	usePullup: "Pull-up an",
	paxcounterUpdateInterval: "Intervall (s)",
	wifiThreshold: "WLAN-Schwelle (dBm)",
	bleThreshold: "BLE-Schwelle (dBm)",
	index: "Index",
	settings: "Kanal-Einstellungen",
	id: "ID",
	isClientMuted: "Stumm (Client)",
	hwModel: "Hardware"
};
function Lm(e) {
	if (Im[e]) return Im[e];
	let t = e.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/_/g, " ");
	return t.charAt(0).toUpperCase() + t.slice(1);
}
function Rm(e) {
	if (zm[e.name]) return zm[e.name];
	if (/\d/.test(e.name) || /^[A-Z]{2,3}$/.test(e.name)) return e.name.replace(/^BAUD_/, "").replace(/_/g, " ");
	let t = e.name.replace(/_/g, " ").toLowerCase();
	return t.charAt(0).toUpperCase() + t.slice(1);
}
var zm = {
	CLIENT: "Teilnehmer (Standard)",
	CLIENT_MUTE: "Teilnehmer stumm (leitet nicht weiter)",
	ROUTER: "Router",
	ROUTER_CLIENT: "Router + Teilnehmer",
	REPEATER: "Verstärker (Repeater)",
	TRACKER: "Tracker",
	SENSOR: "Sensor",
	TAK: "TAK",
	CLIENT_HIDDEN: "Teilnehmer versteckt",
	LOST_AND_FOUND: "Verloren & Gefunden",
	TAK_TRACKER: "TAK-Tracker",
	ROUTER_LATE: "Router (verzögert)",
	ALL: "Alle",
	ALL_SKIP_DECODING: "Alle, ohne Entschlüsseln",
	LOCAL_ONLY: "Nur lokale Kanäle",
	KNOWN_ONLY: "Nur bekannte Knoten",
	NONE: "Keine",
	CORE_PORTNUMS_ONLY: "Nur Kernpakete",
	ALL_ENABLED: "Alles an",
	DISABLED: "Aus",
	NOTIFICATIONS_ONLY: "Nur Benachrichtigungen",
	SYSTEM_ONLY: "Nur Systemtöne",
	ENABLED: "An",
	NOT_PRESENT: "Nicht vorhanden",
	DHCP: "DHCP (automatisch)",
	STATIC: "Statisch",
	DEC: "Dezimalgrad",
	DMS: "Grad/Minuten/Sekunden",
	UTM: "UTM",
	MGRS: "MGRS",
	OLC: "Plus Code",
	OSGR: "OSGR",
	METRIC: "Metrisch",
	IMPERIAL: "Imperial",
	OLED_AUTO: "Automatisch",
	DEFAULT: "Standard",
	TWOCOLOR: "Zweifarbig",
	INVERTED: "Invertiert",
	COLOR: "Farbig",
	DEGREES_0: "0°",
	DEGREES_90: "90°",
	DEGREES_180: "180°",
	DEGREES_270: "270°",
	DEGREES_0_INVERTED: "0° gespiegelt",
	DEGREES_90_INVERTED: "90° gespiegelt",
	DEGREES_180_INVERTED: "180° gespiegelt",
	DEGREES_270_INVERTED: "270° gespiegelt",
	LONG_FAST: "Weit / schnell (Standard)",
	LONG_SLOW: "Weit / langsam",
	VERY_LONG_SLOW: "Sehr weit / langsam",
	MEDIUM_SLOW: "Mittel / langsam",
	MEDIUM_FAST: "Mittel / schnell",
	SHORT_SLOW: "Kurz / langsam",
	SHORT_FAST: "Kurz / schnell",
	LONG_MODERATE: "Weit / mittel",
	SHORT_TURBO: "Kurz / Turbo",
	UNSET: "Nicht gesetzt",
	RANDOM_PIN: "Zufalls-PIN (auf dem Display)",
	FIXED_PIN: "Fester PIN",
	NO_PIN: "Ohne PIN",
	DARK: "Dunkel",
	LIGHT: "Hell",
	RED: "Rot",
	ENGLISH: "Englisch",
	FRENCH: "Französisch",
	GERMAN: "Deutsch",
	ITALIAN: "Italienisch",
	PORTUGUESE: "Portugiesisch",
	SPANISH: "Spanisch",
	SWEDISH: "Schwedisch",
	FINNISH: "Finnisch",
	POLISH: "Polnisch",
	TURKISH: "Türkisch",
	SERBIAN: "Serbisch",
	RUSSIAN: "Russisch",
	DUTCH: "Niederländisch",
	GREEK: "Griechisch",
	NORWEGIAN: "Norwegisch",
	SLOVENIAN: "Slowenisch",
	UKRAINIAN: "Ukrainisch",
	BULGARIAN: "Bulgarisch",
	SIMPLIFIED_CHINESE: "Chinesisch (vereinfacht)",
	TRADITIONAL_CHINESE: "Chinesisch (traditionell)",
	BAUD_DEFAULT: "Standard",
	SIMPLE: "Einfach",
	PROTO: "Protobuf",
	TEXTMSG: "Textnachrichten",
	NMEA: "NMEA",
	CALTOPO: "CalTopo",
	WS85: "WS85",
	VE_DIRECT: "VE.Direct",
	UP: "Hoch",
	DOWN: "Runter",
	LEFT: "Links",
	RIGHT: "Rechts",
	SELECT: "Auswahl",
	BACK: "Zurück",
	CANCEL: "Abbrechen",
	CODEC2_DEFAULT: "Standard",
	LOGIC_LOW: "Pegel LOW",
	LOGIC_HIGH: "Pegel HIGH",
	FALLING_EDGE: "Fallende Flanke",
	RISING_EDGE: "Steigende Flanke",
	EITHER_EDGE_ACTIVE_LOW: "Beide Flanken (aktiv LOW)",
	EITHER_EDGE_ACTIVE_HIGH: "Beide Flanken (aktiv HIGH)",
	PRIMARY: "Primär",
	SECONDARY: "Sekundär"
}, Bm = /* @__PURE__ */ new Set([
	L.INT64,
	L.UINT64,
	L.FIXED64,
	L.SFIXED64,
	L.SINT64
]), Vm = /* @__PURE__ */ new Set([L.FLOAT, L.DOUBLE]), Hm = /psk|password|privateKey/i, q = (e, t = {}, ...n) => {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t)) e === "class" ? r.className = n : e.startsWith("on") ? r.addEventListener(e.slice(2), n) : n != null && r.setAttribute(e, n);
	for (let e of n) e != null && r.append(e);
	return r;
};
function Um(e) {
	let t = "";
	for (let n of e ?? []) t += String.fromCharCode(n);
	return btoa(t);
}
function Wm(e) {
	let t = atob(e.trim());
	return Uint8Array.from(t, (e) => e.charCodeAt(0));
}
function Gm(e, t, n, r) {
	let i = "tk-" + Math.random().toString(36).slice(2), a;
	return t === L.BOOL ? (a = q("input", {
		type: "checkbox",
		id: i,
		class: "form-check-input",
		role: "switch"
	}), a.checked = !!n(), a.addEventListener("change", () => r(a.checked))) : t === L.STRING ? (a = q("input", {
		type: Hm.test(e.localName) ? "password" : "text",
		id: i,
		class: "form-control form-control-sm"
	}), a.value = n() ?? "", a.addEventListener("input", () => r(a.value))) : t === L.BYTES ? (a = q("input", {
		type: Hm.test(e.localName) ? "password" : "text",
		id: i,
		class: "form-control form-control-sm",
		placeholder: "Schlüssel (Base64)"
	}), a.value = Um(n()), a.addEventListener("change", () => {
		try {
			r(Wm(a.value)), a.classList.remove("is-invalid");
		} catch {
			a.classList.add("is-invalid");
		}
	})) : (a = q("input", {
		type: "number",
		id: i,
		class: "form-control form-control-sm",
		step: Vm.has(t) ? "any" : "1"
	}), a.value = String(n() ?? 0), a.addEventListener("input", () => {
		a.value !== "" && (Bm.has(t) ? r(BigInt(a.value)) : r(Vm.has(t) ? parseFloat(a.value) : parseInt(a.value, 10)));
	})), {
		input: a,
		id: i
	};
}
function Km(e, t, n) {
	let r = "tk-" + Math.random().toString(36).slice(2), i = q("select", {
		id: r,
		class: "form-select form-select-sm"
	});
	for (let t of e.values) {
		let e = q("option", { value: String(t.number) }, Rm(t));
		i.append(e);
	}
	return i.value = String(t() ?? 0), i.addEventListener("change", () => n(parseInt(i.value, 10))), {
		input: i,
		id: r
	};
}
function qm(e, t, n, r) {
	return t.type === "checkbox" ? q("div", { class: "form-check form-switch mb-2" }, t, q("label", {
		class: "form-check-label",
		for: n
	}, e)) : q("div", { class: "mb-2" }, q("label", {
		class: "form-label small mb-1",
		for: n
	}, e), t, r ? q("div", { class: "form-text" }, r) : null);
}
function J(e, ...t) {
	return q("fieldset", { class: "border rounded p-3 h-100" }, q("legend", { class: "float-none w-auto px-1 fs-6 fw-bold" }, e), ...t);
}
function Jm(e, t, n = {}) {
	let r = q("div");
	for (let i of e.fields) {
		if (i.deprecated || n.skip?.includes(i.localName)) continue;
		let e = Lm(i.localName), a = () => t[i.localName], o = (e) => {
			t[i.localName] = e, n.onChange?.();
		};
		if (!i.oneof) switch (i.fieldKind) {
			case "scalar": {
				let t = n.custom?.[i.localName], { input: s, id: c } = t ? t(a, o) : Gm(i, i.scalar, a, o);
				r.append(qm(e, s, c));
				break;
			}
			case "enum": {
				let { input: t, id: n } = Km(i.enum, a, o);
				r.append(qm(e, t, n));
				break;
			}
			case "message": {
				t[i.localName] || (t[i.localName] = V(i.message));
				let a = q("fieldset", { class: "border rounded p-2 mb-2" }, q("legend", { class: "float-none w-auto px-1 fs-6 fw-bold" }, e));
				a.append(Jm(i.message, t[i.localName], n)), r.append(a);
				break;
			}
			case "list": {
				if (i.listKind === "message") break;
				let t = "tk-" + Math.random().toString(36).slice(2), n = q("textarea", {
					id: t,
					rows: "2",
					class: "form-control form-control-sm",
					placeholder: "ein Wert pro Zeile"
				});
				n.value = (a() ?? []).map((e) => i.scalar === L.BYTES ? Um(e) : String(e)).join("\n"), n.addEventListener("change", () => {
					let e = n.value.split("\n").map((e) => e.trim()).filter(Boolean), t;
					t = i.listKind === "enum" ? e.map((e) => parseInt(e, 10)) : i.scalar === L.BYTES ? e.map(Wm) : i.scalar === L.STRING ? e : Bm.has(i.scalar) ? e.map((e) => BigInt(e)) : e.map(Number), o(t);
				}), r.append(qm(e, n, t, "ein Wert pro Zeile"));
				break;
			}
		}
	}
	return r;
}
function Ym(e) {
	if (e?.de) return e.message;
	let t = e?.name ?? "", n = String(e?.message ?? e ?? "");
	return t === "NotFoundError" || /No port selected|User cancelled/i.test(n) ? "Kein Gerät ausgewählt." : t === "SecurityError" ? "Der Browser hat den Zugriff verweigert. Seite über https öffnen und erneut versuchen." : t === "NetworkError" || /Failed to open serial port|already open/i.test(n) ? "Der USB-Anschluss ist belegt. Andere Programme oder Browser-Tabs mit dem Gerät schließen und neu verbinden." : t === "InvalidStateError" ? "Die Verbindung ist schon offen. Erst trennen, dann neu verbinden." : /timeout|timed out/i.test(n) ? "Zeitüberschreitung: Das Gerät antwortet nicht. Kabel prüfen und neu verbinden." : /Bluetooth|GATT/i.test(n) ? "Bluetooth-Verbindung fehlgeschlagen. Gerät in der Nähe? Bluetooth am Gerät an?" : /Failed to connect|Couldn't sync|Invalid head of packet|Failed to read/i.test(n) ? "Keine Verbindung zum Bootloader. Kabel neu stecken; falls nötig die Taste beim Einstecken gedrückt halten." : "Unerwarteter Fehler (" + n + ").";
}
// src/main.js
var Y = Fr, Xm = 7, X = {
	device: null,
	status: "getrennt",
	myNodeNum: 0,
	metadata: null,
	config: {},
	moduleConfig: {},
	channels: [],
	nodes: /* @__PURE__ */ new Map(),
	waypoints: /* @__PURE__ */ new Map(),
	wifiNets: null,
	wifiScanning: !1,
	kira: null,
	kiraStats: null,
	kiraPending: null,
	page: "device",
	dirty: !1
}, Zm;
async function Qm(e) {
	try {
		eh("verbinde …");
		let t = new Rc(e === "serial" ? await zc.create(115200) : await Vc.create());
		X.device = t, X.config = {}, X.moduleConfig = {}, X.channels = [], X.nodes.clear(), X.kira = null, X.kiraStats = null, X.kiraStatsAsked = !1, X.wifiNets = null, t.events.onDeviceStatus.subscribe((e) => {
			e === Xm ? (eh("verbunden"), hh("get")) : e === 2 ? eh("getrennt") : e === 6 && eh("lese Einstellungen …");
		}), t.events.onMyNodeInfo.subscribe((e) => X.myNodeNum = e.myNodeNum), t.events.onDeviceMetadataPacket.subscribe((e) => {
			X.metadata = e.data, $();
		}), t.events.onConfigPacket.subscribe((e) => {
			e.payloadVariant.case && (X.config[e.payloadVariant.case] = e.payloadVariant.value), nh();
		}), t.events.onModuleConfigPacket.subscribe((e) => {
			e.payloadVariant.case && (X.moduleConfig[e.payloadVariant.case] = e.payloadVariant.value), nh();
		}), t.events.onChannelPacket.subscribe((e) => {
			X.channels[e.index] = e, nh();
		}), t.events.onNodeInfoPacket.subscribe((e) => {
			X.nodes.set(e.num, e), nh();
		}), t.events.onMeshPacket.subscribe(mh), t.events.onWaypointPacket.subscribe((e) => {
			X.waypoints.set(e.data.id, {
				...e.data,
				from: e.from
			}), nh();
		}), await t.configure(), eh("verbunden");
	} catch (e) {
		console.error(e), eh("Fehler: " + Ym(e));
	}
}
async function $m() {
	try {
		await X.device?.disconnect();
	} catch {}
	X.device = null, eh("getrennt");
}
function eh(e) {
	X.status = e, $();
}
var th;
function nh() {
	clearTimeout(th), th = setTimeout($, 150);
}
async function rh(e) {
	let t = X.device;
	if (t) try {
		await t.beginEditSettings?.(), await e(t), await t.commitEditSettings(), Q("Gespeichert. Das Gerät startet ggf. neu."), X.dirty = !1;
	} catch (e) {
		console.error(e), Q("Fehler beim Speichern: " + Ym(e), !0);
	}
}
var ih = (e) => rh((t) => t.setConfig(V(Y.Config.ConfigSchema, { payloadVariant: {
	case: e,
	value: X.config[e]
} }))), ah = (e) => rh((t) => t.setModuleConfig(V(Y.ModuleConfig.ModuleConfigSchema, { payloadVariant: {
	case: e,
	value: X.moduleConfig[e]
} })));
function oh() {
	let e = {
		thinkkira: 1,
		created: (/* @__PURE__ */ new Date()).toISOString(),
		config: {},
		moduleConfig: {},
		channels: [],
		owner: null
	};
	for (let [t, n] of Object.entries(X.config)) e.config[t] = jp(Y.Config.ConfigSchema, V(Y.Config.ConfigSchema, { payloadVariant: {
		case: t,
		value: n
	} }));
	for (let [t, n] of Object.entries(X.moduleConfig)) e.moduleConfig[t] = jp(Y.ModuleConfig.ModuleConfigSchema, V(Y.ModuleConfig.ModuleConfigSchema, { payloadVariant: {
		case: t,
		value: n
	} }));
	for (let t of X.channels) t && e.channels.push(jp(Y.Channel.ChannelSchema, t));
	let t = X.nodes.get(X.myNodeNum);
	return t?.user && (e.owner = jp(Y.Mesh.UserSchema, t.user)), e;
}
function sh() {
	let e = new Blob([JSON.stringify(oh(), null, 2)], { type: "application/json" });
	q("a", {
		href: URL.createObjectURL(e),
		download: `thinkkira-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`
	}).click();
}
async function ch(e) {
	let t = JSON.parse(await e.text());
	if (!t.config) return Q("Keine gültige Sicherung", !0);
	await rh(async (e) => {
		for (let n of Object.values(t.config)) await e.setConfig(om(Y.Config.ConfigSchema, n));
		for (let n of Object.values(t.moduleConfig ?? {})) await e.setModuleConfig(om(Y.ModuleConfig.ModuleConfigSchema, n));
		for (let n of t.channels ?? []) await e.setChannel(om(Y.Channel.ChannelSchema, n));
		t.owner && await e.setOwner(om(Y.Mesh.UserSchema, t.owner));
	});
}
function lh(e) {
	return [...new DOMParser().parseFromString(e, "application/xml").querySelectorAll("wpt")].map((e) => ({
		lat: parseFloat(e.getAttribute("lat")),
		lon: parseFloat(e.getAttribute("lon")),
		name: e.querySelector("name")?.textContent ?? "WP",
		description: e.querySelector("desc")?.textContent ?? ""
	}));
}
function uh(e) {
	let t = (e) => String(e).replace(/[<>&"]/g, (e) => ({
		"<": "&lt;",
		">": "&gt;",
		"&": "&amp;",
		"\"": "&quot;"
	})[e]);
	return `<?xml version="1.0" encoding="UTF-8"?>\n<gpx version="1.1" creator="ThinkKira" xmlns="http://www.topografix.com/GPX/1/1">\n${e.map((e) => `  <wpt lat="${(e.latitudeI * 1e-7).toFixed(7)}" lon="${(e.longitudeI * 1e-7).toFixed(7)}"><name>${t(e.name)}</name><desc>${t(e.description ?? "")}</desc></wpt>`).join("\n")}\n</gpx>\n`;
}
async function dh(e) {
	let t = V(Y.Mesh.WaypointSchema, {
		id: Math.floor(Math.random() * 0x7fffffff),
		name: e.name.slice(0, 29),
		description: (e.description ?? "").slice(0, 99),
		latitudeI: Math.round(e.lat * 1e7),
		longitudeI: Math.round(e.lon * 1e7),
		expire: 0,
		lockedTo: 0
	});
	await X.device.sendWaypoint(t, "broadcast", 0), X.waypoints.set(t.id, {
		...t,
		from: X.myNodeNum
	});
}
var fh = 287, ph;
function mh(e) {
	let t = e?.payloadVariant?.case === "decoded" ? e.payloadVariant.value : null;
	if (!t || t.portnum !== fh) return;
	let [n, r, i, ...a] = new TextDecoder().decode(t.payload).split("|");
	if (n === "m") {
		X.kira = {
			mode: r,
			version: i
		}, nh();
		return;
	}
	if (n === "s" && r !== "end") {
		let e = [
			r,
			i,
			...a
		].map((e) => parseInt(e, 10));
		X.kiraPending = {
			counters: {
				rxGood: e[0],
				rxBad: e[1],
				tx: e[2],
				relay: e[3],
				pings: e[4],
				pongs: e[5]
			},
			heard: [],
			range: []
		};
		return;
	}
	if (n === "h" && X.kiraPending) {
		X.kiraPending.heard.push({
			from: r,
			rssi: +i,
			snr: +a[0],
			ago: +a[1]
		});
		return;
	}
	if (n === "r") {
		let e = {
			seq: +r,
			from: i,
			rssiThem: +a[0],
			snrThem: +a[1],
			rssiUs: +a[2],
			snrUs: +a[3],
			ago: +a[4]
		};
		X.kiraPending ? X.kiraPending.range.push(e) : (X.kiraStats ??= {
			counters: null,
			heard: [],
			range: []
		}, X.kiraStats.range.unshift(e), $(), Q("Antwort von " + gh(i) + ": " + e.rssiUs + " dBm"));
		return;
	}
	if (n === "s" && r === "end") {
		X.kiraStats = X.kiraPending, X.kiraPending = null, $();
		return;
	}
	if (n === "err") {
		Q("Gerät meldet: " + r, !0);
		return;
	}
	if (n !== "w") return;
	if (r === "end") {
		clearTimeout(ph), X.wifiScanning = !1, X.wifiNets.sort((e, t) => t.rssi - e.rssi), $(), i === "-1" ? Q("Diese Firmware kann keine WLAN-Suche.", !0) : Q(X.wifiNets.length ? X.wifiNets.length + " WLAN-Netze gefunden. Bitte unten auswählen." : "Keine WLAN-Netze gefunden.");
		return;
	}
	let o = a.join("|");
	X.wifiNets && !X.wifiNets.some((e) => e.ssid === o) && X.wifiNets.push({
		ssid: o,
		rssi: parseInt(r, 10),
		open: i === "1"
	});
}
async function hh(e) {
	if (!X.device) return !1;
	try {
		return await X.device.sendPacket(new TextEncoder().encode(e), fh, "self", 0, !1, !1), !0;
	} catch (e) {
		return console.error(e), !1;
	}
}
function gh(e) {
	let t = X.nodes.get(parseInt(e, 16));
	return t?.user?.shortName || t?.user?.longName || "!" + e;
}
async function _h() {
	if (X.device && !X.wifiScanning) {
		X.wifiScanning = !0, X.wifiNets = [], $();
		try {
			await X.device.sendPacket(new TextEncoder().encode("wifiscan"), fh, "self", 0, !1, !1);
		} catch (e) {
			console.error(e);
		}
		clearTimeout(ph), ph = setTimeout(() => {
			X.wifiScanning && (X.wifiScanning = !1, $(), Q("Das Gerät antwortet nicht auf die WLAN-Suche. Bitte zuerst die neueste ThinkKira-Firmware über den Loader aufspielen.", !0));
		}, 12e3);
	}
}
function vh(e, t) {
	let n = "tk-ssid", r = "__manuell__", i = e() ?? "", a = X.wifiNets ?? [], o = q("select", {
		id: n,
		class: "form-select form-select-sm"
	});
	o.append(q("option", { value: "" }, a.length ? "– Netz auswählen –" : "– erst „Netze suchen“ klicken –"));
	for (let e of a) {
		let t = e.rssi >= -60 ? "sehr gut" : e.rssi >= -70 ? "gut" : e.rssi >= -80 ? "mäßig" : "schwach";
		o.append(q("option", { value: e.ssid }, e.ssid + " (" + t + ", " + e.rssi + " dBm" + (e.open ? ", offen" : "") + ")"));
	}
	i && !a.some((e) => e.ssid === i) && o.append(q("option", { value: i }, i + " (gespeichert)")), o.append(q("option", { value: r }, "Anderes Netz (manuell eingeben) …")), o.value = i;
	let s = q("input", {
		type: "text",
		class: "form-control form-control-sm mt-2 d-none",
		placeholder: "WLAN-Name eingeben",
		maxlength: "32"
	});
	s.addEventListener("input", () => t(s.value)), o.addEventListener("change", () => {
		let e = o.value === r;
		s.classList.toggle("d-none", !e), e ? (s.value = "", s.focus()) : t(o.value);
	});
	let c = q("button", {
		type: "button",
		class: "btn btn-sm btn-outline-secondary",
		onclick: _h
	}, X.wifiScanning ? q("span", { class: "spinner-border spinner-border-sm me-1" }) : yh("fa-search"), X.wifiScanning ? "Suche …" : "Netze suchen");
	return (X.wifiScanning || !X.device) && (c.disabled = !0), {
		input: q("div", {}, q("div", { class: "input-group input-group-sm" }, o, c), s),
		id: n
	};
}
var yh = (e) => q("i", { class: "fas " + e + " me-1" }), Z = (e, t, n = "primary", r) => q("button", {
	type: "button",
	class: "btn btn-sm btn-" + n + " me-2 mt-2",
	onclick: t
}, r ? yh(r) : null, e), bh = (...e) => q("div", { class: "row g-3 mb-3" }, ...e.filter(Boolean).map((e) => q("div", { class: "col-lg-6" }, e))), xh = (e) => q("div", { class: "form-text mb-2" }, e), Sh = [
	{
		id: "device",
		title: "Gerät",
		ic: "fa-microchip"
	},
	{
		id: "channels",
		title: "Kanäle",
		ic: "fa-comments"
	},
	{
		id: "cfg:lora",
		title: "Funk",
		ic: "fa-broadcast-tower"
	},
	{
		id: "cfg:position",
		title: "GPS",
		ic: "fa-map-marker-alt"
	},
	{
		id: "cfg:power",
		title: "Energie",
		ic: "fa-battery-three-quarters"
	},
	{
		id: "cfg:network",
		title: "WLAN",
		ic: "fa-wifi"
	},
	{
		id: "cfg:bluetooth",
		title: "Bluetooth",
		ic: "fa-mobile-alt"
	},
	{
		id: "cfg:display",
		title: "Anzeige",
		ic: "fa-tv"
	},
	{
		id: "cfg:security",
		title: "Sicherheit",
		ic: "fa-lock"
	},
	{
		id: "modules",
		title: "Module",
		ic: "fa-puzzle-piece"
	},
	{
		id: "waypoints",
		title: "Wegpunkte",
		ic: "fa-flag"
	},
	{
		id: "canned",
		title: "Schnellantworten",
		ic: "fa-reply"
	},
	{
		id: "thinkkira",
		title: "ThinkKira",
		ic: "fa-star"
	},
	{
		id: "system",
		title: "System",
		ic: "fa-cog"
	}
];
function Ch() {
	let e = X.metadata, t = X.nodes.get(X.myNodeNum), n = (e, t) => q("div", { class: "col-6 col-md-3" }, q("div", { class: "small text-muted" }, e), q("div", { class: "fw-bold" }, t));
	return q("div", { class: "row g-2 mb-3" }, n("Name", t?.user?.longName ?? "–"), n("Knoten-Nr.", X.myNodeNum ? "!" + X.myNodeNum.toString(16).padStart(8, "0") : "–"), n("Firmware", e?.firmwareVersion ?? "–"), n("Knoten bekannt", String(X.nodes.size)));
}
function wh() {
	let e = X.nodes.get(X.myNodeNum), t = null;
	if (e?.user) {
		let n = Nu(Y.Mesh.UserSchema, e.user);
		t = J("Name", Jm(Y.Mesh.UserSchema, n, { skip: [
			"id",
			"macaddr",
			"hwModel",
			"publicKey",
			"role"
		] }), Z("Name speichern", () => rh((e) => e.setOwner(n)), "primary", "fa-save"));
	}
	let n = X.config.device ? J("Geräte-Einstellungen", Jm(Y.Config.Config_DeviceConfigSchema, X.config.device), Z("Speichern", () => ih("device"), "primary", "fa-save")) : null;
	return bh(t, n);
}
function Th(e) {
	let t = X.config[e];
	if (!t) return q("div", { class: "alert alert-warning" }, "Noch nicht vom Gerät geladen.");
	let n = Y.Config.ConfigSchema.fields.find((t) => t.localName === e).message;
	return bh(J(Fm[e] ?? e, e === "lora" ? xh("Für Deutschland: Region EU_868. Der eigene ThinkKira-Funkmodus kommt mit Firmware-Phase 2.") : null, e === "network" ? xh("„Netze suchen“ lässt das Gerät die WLAN-Netze in der Nähe suchen (dauert ein paar Sekunden).") : null, Jm(n, t, e === "network" ? { custom: { wifiSsid: vh } } : {}), Z("Speichern", () => ih(e), "primary", "fa-save")));
}
function Eh() {
	let e = [];
	for (let t = 0; t < 8; t++) {
		let n = X.channels[t];
		n && e.push(J(`Kanal ${t}${t === 0 ? " (primär)" : ""}`, Jm(Y.Channel.ChannelSchema, n, { skip: ["index"] }), Z(`Kanal ${t} speichern`, () => rh((e) => e.setChannel(n)), "primary", "fa-save")));
	}
	return bh(...e);
}
function Dh() {
	let e = [];
	for (let t of Y.ModuleConfig.ModuleConfigSchema.fields) {
		let n = X.moduleConfig[t.localName];
		n && e.push(J(Fm[t.localName] ?? t.localName, Jm(t.message, n), Z("Speichern", () => ah(t.localName), "primary", "fa-save")));
	}
	return bh(...e);
}
function Oh() {
	let e = q("input", {
		type: "text",
		class: "form-control form-control-sm",
		placeholder: "Name",
		maxlength: "29"
	}), t = q("input", {
		type: "number",
		class: "form-control form-control-sm",
		step: "any",
		placeholder: "Breite, z. B. 52.3906"
	}), n = q("input", {
		type: "number",
		class: "form-control form-control-sm",
		step: "any",
		placeholder: "Länge, z. B. 13.0645"
	}), r = q("input", {
		type: "file",
		class: "form-control form-control-sm",
		accept: ".gpx,application/gpx+xml"
	});
	r.addEventListener("change", async () => {
		let e = lh(await r.files[0].text());
		for (let t of e) await dh(t);
		Q(`${e.length} Wegpunkte gesendet`), $();
	});
	let i = q("ul", { class: "list-group list-group-flush" });
	for (let e of X.waypoints.values()) i.append(q("li", { class: "list-group-item px-0" }, `${e.name} – ${(e.latitudeI * 1e-7).toFixed(5)}, ${(e.longitudeI * 1e-7).toFixed(5)}`));
	return X.waypoints.size || i.append(q("li", { class: "list-group-item px-0 text-muted" }, "Noch keine Wegpunkte in dieser Sitzung.")), bh(J("Wegpunkt senden", xh("Wird als Meshtastic-Wegpunkt an alle gesendet. Liste und Navigation im Gerät kommen mit Firmware-Phase 4."), q("div", { class: "mb-2" }, q("label", { class: "form-label small mb-1" }, "Name"), e), q("div", { class: "row g-2" }, q("div", { class: "col-6" }, t), q("div", { class: "col-6" }, n)), Z("Wegpunkt senden", async () => {
		if (!e.value || !t.value || !n.value) return Q("Name, Breite und Länge ausfüllen", !0);
		await dh({
			name: e.value,
			lat: parseFloat(t.value),
			lon: parseFloat(n.value)
		}), Q("Wegpunkt gesendet"), $();
	}, "primary", "fa-paper-plane")), J("GPX", q("div", { class: "mb-2" }, q("label", { class: "form-label small mb-1" }, "GPX-Datei importieren und senden"), r), Z("GPX exportieren", () => {
		let e = new Blob([uh([...X.waypoints.values()])], { type: "application/gpx+xml" });
		q("a", {
			href: URL.createObjectURL(e),
			download: "thinkkira-wegpunkte.gpx"
		}).click();
	}, "outline-secondary", "fa-file-export"), q("div", { class: "mt-3 small fw-bold" }, "Bekannte Wegpunkte"), i));
}
function kh() {
	let e = q("textarea", {
		rows: "6",
		class: "form-control form-control-sm",
		placeholder: "Eine Nachricht pro Zeile, z. B.\nOK\nBin unterwegs\nBrauche Hilfe"
	});
	return bh(J("Schnellantworten", xh("Erscheinen auf dem Gerät unter Nachrichten → Antworten. Eine Nachricht pro Zeile."), e, Z("Speichern", () => rh((t) => t.setCannedMessages(V(Y.CannedMessages.CannedMessageModuleConfigSchema, { messages: e.value.split("\n").map((e) => e.trim()).filter(Boolean).join("|") }))), "primary", "fa-save")));
}
function Ah() {
	let e = X.kira, t;
	if (!e) t = J("Funkmodus", q("div", { class: "alert alert-warning mb-0" }, "Keine Antwort vom ThinkKira-Modul. Bitte die neueste ThinkKira-Firmware über den Loader aufspielen."));
	else {
		let n = q("select", {
			id: "tk-mode",
			class: "form-select form-select-sm"
		});
		n.append(q("option", { value: "meshtastic" }, "Meshtastic (Standard, kompatibel mit allen Meshtastic-Geräten)")), n.append(q("option", { value: "kira" }, "Kira-Funk (eigenes Netz, nur ThinkKira-Geräte)")), n.value = e.mode, t = J("Funkmodus", q("div", { class: "mb-2" }, q("label", {
			class: "form-label small mb-1",
			for: "tk-mode"
		}, "Modus"), n), xh("Kira-Funk nutzt ein eigenes Sync-Word: Die Geräte hören nur noch andere ThinkKira-Geräte im Kira-Funk, nicht mehr das Meshtastic-Netz. Kanäle und Verschlüsselung bleiben gleich. Beim Wechsel startet das Gerät neu."), Z("Modus speichern", async () => {
			if (n.value === e.mode) return Q("Der Modus ist schon eingestellt.");
			await hh("mode|" + n.value) && Q("Gespeichert. Das Gerät startet neu – danach bitte neu verbinden.");
		}, "primary", "fa-save"), q("div", { class: "small text-muted mt-2" }, "ThinkKira " + e.version));
	}
	let n = X.kiraStats, r = [];
	if (n?.counters) {
		let e = n.counters, t = (e, t) => q("div", { class: "col-6 col-md-4" }, q("div", { class: "small text-muted" }, e), q("div", { class: "fw-bold" }, String(t)));
		r.push(q("div", { class: "row g-2 mb-3" }, t("Empfangen", e.rxGood), t("Empfangsfehler", e.rxBad), t("Gesendet", e.tx), t("Weitergeleitet", e.relay), t("Pings", e.pings), t("Antworten", e.pongs)));
	}
	n?.heard?.length && (r.push(q("div", { class: "fw-bold small mb-1" }, "Zuletzt gehört")), r.push(jh([
		"Knoten",
		"RSSI",
		"SNR",
		"vor"
	], n.heard.map((e) => [
		gh(e.from),
		e.rssi + " dBm",
		e.snr.toFixed(1) + " dB",
		e.ago + " s"
	])))), n || r.push(xh("Noch keine Werte geladen."));
	let i = J("Funk-Statistik", ...r, Z("Aktualisieren", () => hh("stats"), "outline-secondary", "fa-sync")), a = [xh("Sendet einen Ping an alle direkt erreichbaren ThinkKira-Geräte (ohne Weiterleitung). Jede Antwort zeigt, wie gut beide Seiten sich hören.")];
	n?.range?.length && a.push(jh([
		"#",
		"Gerät",
		"dort gehört",
		"hier gehört"
	], n.range.map((e) => [
		String(e.seq),
		gh(e.from),
		e.rssiThem + " dBm / " + e.snrThem.toFixed(1) + " dB",
		e.rssiUs + " dBm / " + e.snrUs.toFixed(1) + " dB"
	])));
	let o = J("Reichweitentest", ...a, Z("Ping senden", async () => {
		await hh("ping") && Q("Ping gesendet. Antworten erscheinen hier.");
	}, "primary", "fa-satellite-dish")), s = [
		["Seiten ein/aus, Licht, Buzzer, LEDs", 3],
		["Tastenbelegung", 3],
		["Kompass, Ankunftsradius, Track", 4],
		["Offline-Karte hochladen", 4],
		["WLAN-Weboberfläche, Update aus GitHub-Release", 5],
		["Energieprofile (Wandern / Basis / Maximal sparen)", 6],
		["SOS-Einstellungen", 7],
		["Wecker & Erinnerungen", 7]
	], c = q("ul", { class: "list-group list-group-flush" });
	for (let [e, t] of s) c.append(q("li", { class: "list-group-item px-0 d-flex justify-content-between align-items-center gap-2" }, e, q("span", { class: "badge text-bg-secondary" }, `ab Phase ${t}`)));
	return X.device && e && !n && !X.kiraStatsAsked && (X.kiraStatsAsked = !0, setTimeout(() => hh("stats"), 0)), q("div", {}, bh(t, i), bh(o, J("Kommt noch", c)));
}
function jh(e, t) {
	return q("div", { class: "table-responsive" }, q("table", { class: "table table-sm table-striped mb-2" }, q("thead", {}, q("tr", {}, ...e.map((e) => q("th", {}, e)))), q("tbody", {}, ...t.map((e) => q("tr", {}, ...e.map((e) => q("td", {}, e)))))));
}
function Mh() {
	let e = q("input", {
		type: "file",
		class: "form-control form-control-sm",
		accept: "application/json,.json"
	});
	return e.addEventListener("change", () => ch(e.files[0])), bh(J("Sicherung", xh("Alle Einstellungen, Kanäle und den Namen als Datei sichern oder zurückspielen."), Z("Alle Einstellungen sichern", sh, "primary", "fa-download"), q("div", { class: "mt-3" }, q("label", { class: "form-label small mb-1" }, "Sicherung wiederherstellen"), e)), J("Gerät", Z("Neustart", () => X.device?.reboot(2), "outline-secondary", "fa-redo"), Z("Werkseinstellungen", () => {
		confirm("Alle Einstellungen auf Werkseinstellungen zurücksetzen?") && X.device?.factoryResetConfig();
	}, "outline-danger", "fa-exclamation-triangle")));
}
function Nh() {
	let e = X.page;
	return e === "device" ? wh() : e === "channels" ? Eh() : e.startsWith("cfg:") ? Th(e.slice(4)) : e === "modules" ? Dh() : e === "waypoints" ? Oh() : e === "canned" ? kh() : e === "thinkkira" ? Ah() : Mh();
}
var Ph;
function Q(e, t = !1) {
	let n = Zm.querySelector(".tk-msg");
	n && (n.replaceChildren(q("div", { class: "alert py-2 mb-3 " + (t ? "alert-danger" : "alert-success") }, e)), clearTimeout(Ph), Ph = setTimeout(() => n.replaceChildren(), 5e3));
}
function $() {
	if (!Zm) return;
	let e = !!X.device, t = "serial" in navigator, n = "bluetooth" in navigator, r = X.status === "verbunden", i = [q("div", { class: "d-flex flex-wrap gap-2 align-items-center mb-3" }, e ? null : q("button", {
		type: "button",
		class: "btn btn-primary",
		disabled: t ? null : "",
		onclick: () => Qm("serial")
	}, yh("fa-plug"), "Per USB verbinden"), e ? null : q("button", {
		type: "button",
		class: "btn btn-primary",
		disabled: n ? null : "",
		onclick: () => Qm("ble")
	}, yh("fa-plug"), "Per Bluetooth verbinden"), e ? q("button", {
		type: "button",
		class: "btn btn-outline-secondary",
		onclick: $m
	}, yh("fa-times"), "Trennen") : null, q("span", { class: "badge " + (r ? "text-bg-success" : "text-bg-secondary") }, e ? X.status : X.status === "getrennt" ? "nicht verbunden" : X.status)), Zm.querySelector(".tk-msg") ?? q("div", { class: "tk-msg" })];
	if (!t && !n && i.push(q("div", { class: "alert alert-warning" }, "Dein Browser kann nicht auf USB oder Bluetooth zugreifen. Bitte Chrome oder Edge am Computer verwenden.")), !e) i.push(q("p", { class: "text-muted" }, "Gerät per USB-Kabel oder Bluetooth verbinden. Danach lassen sich alle Einstellungen ändern."));
	else {
		i.push(Ch());
		let e = q("ul", { class: "nav nav-pills flex-wrap gap-1 mb-3" });
		for (let t of Sh) e.append(q("li", { class: "nav-item" }, q("button", {
			type: "button",
			class: "nav-link py-1 px-2" + (X.page === t.id ? " active" : ""),
			onclick: () => {
				X.page = t.id, $();
			}
		}, yh(t.ic), t.title)));
		i.push(e, Nh());
	}
	Zm.replaceChildren(...i.filter(Boolean));
}
function Fh(e = "#tk-config") {
	Zm = typeof e == "string" ? document.querySelector(e) : e, Zm && $();
}
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => Fh()) : Fh());
export { Fh as mount };
