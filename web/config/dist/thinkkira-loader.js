// \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t, n) => () => {
	if (n) throw n[0];
	try {
		return e && (t = e(e = 0)), t;
	} catch (e) {
		throw n = [e], e;
	}
}, s = (e, t) => () => (t || (e((t = { exports: {} }).exports, t, t.exports), e = null), t.exports), c = (e, n) => {
	let r = Object.setPrototypeOf({}, null);
	for (var i in e) t(r, i, {
		get: e[i],
		enumerable: !0
	});
	return n & 1 || t(r, Symbol.toStringTag, { value: "Module" }), n & 2 ? r : Object.preventExtensions(r);
}, l = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (let c of r(i)) !a.call(e, c) && c !== o && (s = n(i, c), t(e, c, {
		get: s && s.get && !s.configurable ? s.get : () => i[c],
		enumerable: !s || s.enumerable
	}));
	return e;
}, u = (n, r, o) => (o = n == null ? {} : e(i(n)), l(r || !n || !n.__esModule || !a.call(n, "default") ? t(o, "default", {
	value: n,
	enumerable: !0
}) : o, n));
globalThis.process === void 0 && (globalThis.process = {
	env: {},
	versions: {},
	platform: "browser",
	cwd: () => "/"
}), globalThis.Buffer === void 0 && (globalThis.Buffer = { isBuffer: () => !1 });
// node_modules/esptool-js/lib/types/error.js
var d = class extends Error {
	constructor(e) {
		super(e), this.name = new.target.name, Object.setPrototypeOf(this, new.target.prototype);
	}
}, f = class extends d {
	constructor(e = "unsupported command error") {
		super(e);
	}
}, p = class extends d {
	constructor(e) {
		super(`Unexpected chip ID value ${e}. Failed to autodetect chip type.`);
	}
}, m = class extends d {
	constructor(e) {
		super(`Unexpected CHIP magic value 0x${e.toString(16)}. Failed to autodetect chip type.`);
	}
}, h = class extends d {
	constructor(e = "Security info command does not contain chip ID. This is expected for ESP32-S2 which doesn't support chip ID in security info.") {
		super(e);
	}
}, g = 4, _ = 0, v = 1, y = 2;
function b(e) {
	let t = e.length;
	for (; --t >= 0;) e[t] = 0;
}
var x = 29, S = 256, C = 286, w = 30, T = 19, E = 573, D = 15, ee = 16, te = 7, ne = 256, re = 16, ie = 17, ae = 18, oe = new Uint8Array([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	1,
	1,
	1,
	1,
	2,
	2,
	2,
	2,
	3,
	3,
	3,
	3,
	4,
	4,
	4,
	4,
	5,
	5,
	5,
	5,
	0
]), se = new Uint8Array([
	0,
	0,
	0,
	0,
	1,
	1,
	2,
	2,
	3,
	3,
	4,
	4,
	5,
	5,
	6,
	6,
	7,
	7,
	8,
	8,
	9,
	9,
	10,
	10,
	11,
	11,
	12,
	12,
	13,
	13
]), ce = new Uint8Array([
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	2,
	3,
	7
]), le = new Uint8Array([
	16,
	17,
	18,
	0,
	8,
	7,
	9,
	6,
	10,
	5,
	11,
	4,
	12,
	3,
	13,
	2,
	14,
	1,
	15
]), ue = 512, de = Array(576);
b(de);
var fe = Array(60);
b(fe);
var pe = Array(ue);
b(pe);
var me = Array(256);
b(me);
var he = Array(x);
b(he);
var ge = Array(w);
b(ge);
function _e(e, t, n, r, i) {
	this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
}
var ve, ye, be;
function xe(e, t) {
	this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
}
var Se = (e) => e < 256 ? pe[e] : pe[256 + (e >>> 7)], Ce = (e, t) => {
	e.pending_buf[e.pending++] = t & 255, e.pending_buf[e.pending++] = t >>> 8 & 255;
}, we = (e, t, n) => {
	e.bi_valid > ee - n ? (e.bi_buf |= t << e.bi_valid & 65535, Ce(e, e.bi_buf), e.bi_buf = t >> ee - e.bi_valid, e.bi_valid += n - ee) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
}, Te = (e, t, n) => {
	we(e, n[t * 2], n[t * 2 + 1]);
}, Ee = (e, t) => {
	let n = 0;
	do
		n |= e & 1, e >>>= 1, n <<= 1;
	while (--t > 0);
	return n >>> 1;
}, De = (e) => {
	e.bi_valid === 16 ? (Ce(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}, Oe = (e, t) => {
	let n = t.dyn_tree, r = t.max_code, i = t.stat_desc.static_tree, a = t.stat_desc.has_stree, o = t.stat_desc.extra_bits, s = t.stat_desc.extra_base, c = t.stat_desc.max_length, l, u, d, f, p, m, h = 0;
	for (f = 0; f <= D; f++) e.bl_count[f] = 0;
	for (n[e.heap[e.heap_max] * 2 + 1] = 0, l = e.heap_max + 1; l < E; l++) u = e.heap[l], f = n[n[u * 2 + 1] * 2 + 1] + 1, f > c && (f = c, h++), n[u * 2 + 1] = f, u > r || (e.bl_count[f]++, p = 0, u >= s && (p = o[u - s]), m = n[u * 2], e.opt_len += m * (f + p), a && (e.static_len += m * (i[u * 2 + 1] + p)));
	if (h !== 0) {
		do {
			for (f = c - 1; e.bl_count[f] === 0;) f--;
			e.bl_count[f]--, e.bl_count[f + 1] += 2, e.bl_count[c]--, h -= 2;
		} while (h > 0);
		for (f = c; f !== 0; f--) for (u = e.bl_count[f]; u !== 0;) d = e.heap[--l], d > r || (n[d * 2 + 1] !== f && (e.opt_len += (f - n[d * 2 + 1]) * n[d * 2], n[d * 2 + 1] = f), u--);
	}
}, ke = (e, t, n) => {
	let r = Array(16), i = 0, a, o;
	for (a = 1; a <= D; a++) i = i + n[a - 1] << 1, r[a] = i;
	for (o = 0; o <= t; o++) {
		let t = e[o * 2 + 1];
		t !== 0 && (e[o * 2] = Ee(r[t]++, t));
	}
}, Ae = () => {
	let e, t, n, r, i, a = Array(16);
	for (n = 0, r = 0; r < 28; r++) for (he[r] = n, e = 0; e < 1 << oe[r]; e++) me[n++] = r;
	for (me[n - 1] = r, i = 0, r = 0; r < 16; r++) for (ge[r] = i, e = 0; e < 1 << se[r]; e++) pe[i++] = r;
	for (i >>= 7; r < w; r++) for (ge[r] = i << 7, e = 0; e < 1 << se[r] - 7; e++) pe[256 + i++] = r;
	for (t = 0; t <= D; t++) a[t] = 0;
	for (e = 0; e <= 143;) de[e * 2 + 1] = 8, e++, a[8]++;
	for (; e <= 255;) de[e * 2 + 1] = 9, e++, a[9]++;
	for (; e <= 279;) de[e * 2 + 1] = 7, e++, a[7]++;
	for (; e <= 287;) de[e * 2 + 1] = 8, e++, a[8]++;
	for (ke(de, 287, a), e = 0; e < w; e++) fe[e * 2 + 1] = 5, fe[e * 2] = Ee(e, 5);
	ve = new _e(de, oe, 257, C, D), ye = new _e(fe, se, 0, w, D), be = new _e([], ce, 0, T, te);
}, je = (e) => {
	let t = 0;
	for (; t < C; t++) e.dyn_ltree[t * 2] = 0;
	for (t = 0; t < w; t++) e.dyn_dtree[t * 2] = 0;
	for (t = 0; t < T; t++) e.bl_tree[t * 2] = 0;
	e.dyn_ltree[ne * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
}, Me = (e) => {
	e.bi_valid > 8 ? Ce(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}, Ne = (e, t, n, r) => {
	let i = t * 2, a = n * 2;
	return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
}, Pe = (e, t, n) => {
	let r = e.heap[n], i = n << 1;
	for (; i <= e.heap_len && (i < e.heap_len && Ne(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !Ne(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
	e.heap[n] = r;
}, Fe = (e, t, n) => {
	let r, i, a = 0, o, s;
	if (e.sym_next !== 0) do
		r = e.pending_buf[e.sym_buf + a++] & 255, r += (e.pending_buf[e.sym_buf + a++] & 255) << 8, i = e.pending_buf[e.sym_buf + a++], r === 0 ? Te(e, i, t) : (o = me[i], Te(e, o + S + 1, t), s = oe[o], s !== 0 && (i -= he[o], we(e, i, s)), r--, o = Se(r), Te(e, o, n), s = se[o], s !== 0 && (r -= ge[o], we(e, r, s)));
	while (a < e.sym_next);
	Te(e, ne, t);
}, Ie = (e, t) => {
	let n = t.dyn_tree, r = t.stat_desc.static_tree, i = t.stat_desc.has_stree, a = t.stat_desc.elems, o, s, c = -1, l;
	for (e.heap_len = 0, e.heap_max = E, o = 0; o < a; o++) n[o * 2] === 0 ? n[o * 2 + 1] = 0 : (e.heap[++e.heap_len] = c = o, e.depth[o] = 0);
	for (; e.heap_len < 2;) l = e.heap[++e.heap_len] = c < 2 ? ++c : 0, n[l * 2] = 1, e.depth[l] = 0, e.opt_len--, i && (e.static_len -= r[l * 2 + 1]);
	for (t.max_code = c, o = e.heap_len >> 1; o >= 1; o--) Pe(e, n, o);
	l = a;
	do
		o = e.heap[1], e.heap[1] = e.heap[e.heap_len--], Pe(e, n, 1), s = e.heap[1], e.heap[--e.heap_max] = o, e.heap[--e.heap_max] = s, n[l * 2] = n[o * 2] + n[s * 2], e.depth[l] = (e.depth[o] >= e.depth[s] ? e.depth[o] : e.depth[s]) + 1, n[o * 2 + 1] = n[s * 2 + 1] = l, e.heap[1] = l++, Pe(e, n, 1);
	while (e.heap_len >= 2);
	e.heap[--e.heap_max] = e.heap[1], Oe(e, t), ke(n, c, e.bl_count);
}, Le = (e, t, n) => {
	let r, i = -1, a, o = t[1], s = 0, c = 7, l = 4;
	for (o === 0 && (c = 138, l = 3), t[(n + 1) * 2 + 1] = 65535, r = 0; r <= n; r++) a = o, o = t[(r + 1) * 2 + 1], ++s < c && a === o || (s < l ? e.bl_tree[a * 2] += s : a === 0 ? s <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++ : (a !== i && e.bl_tree[a * 2]++, e.bl_tree[32]++), s = 0, i = a, o === 0 ? (c = 138, l = 3) : a === o ? (c = 6, l = 3) : (c = 7, l = 4));
}, Re = (e, t, n) => {
	let r, i = -1, a, o = t[1], s = 0, c = 7, l = 4;
	for (o === 0 && (c = 138, l = 3), r = 0; r <= n; r++) if (a = o, o = t[(r + 1) * 2 + 1], !(++s < c && a === o)) {
		if (s < l) do
			Te(e, a, e.bl_tree);
		while (--s !== 0);
		else a === 0 ? s <= 10 ? (Te(e, ie, e.bl_tree), we(e, s - 3, 3)) : (Te(e, ae, e.bl_tree), we(e, s - 11, 7)) : (a !== i && (Te(e, a, e.bl_tree), s--), Te(e, re, e.bl_tree), we(e, s - 3, 2));
		s = 0, i = a, o === 0 ? (c = 138, l = 3) : a === o ? (c = 6, l = 3) : (c = 7, l = 4);
	}
}, ze = (e) => {
	let t;
	for (Le(e, e.dyn_ltree, e.l_desc.max_code), Le(e, e.dyn_dtree, e.d_desc.max_code), Ie(e, e.bl_desc), t = 18; t >= 3 && e.bl_tree[le[t] * 2 + 1] === 0; t--);
	return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
}, Be = (e, t, n, r) => {
	let i;
	for (we(e, t - 257, 5), we(e, n - 1, 5), we(e, r - 4, 4), i = 0; i < r; i++) we(e, e.bl_tree[le[i] * 2 + 1], 3);
	Re(e, e.dyn_ltree, t - 1), Re(e, e.dyn_dtree, n - 1);
}, Ve = (e) => {
	let t = 0xf3ffc07f, n = 0;
	for (; n <= 31; n++, t >>>= 1) if (t & 1 && e.dyn_ltree[n * 2] !== 0) return _;
	if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0) return v;
	for (n = 32; n < S; n++) if (e.dyn_ltree[n * 2] !== 0) return v;
	return _;
}, He = !1, Ue = (e) => {
	He ||= (Ae(), !0), e.l_desc = new xe(e.dyn_ltree, ve), e.d_desc = new xe(e.dyn_dtree, ye), e.bl_desc = new xe(e.bl_tree, be), e.bi_buf = 0, e.bi_valid = 0, je(e);
}, We = (e, t, n, r) => {
	we(e, +!!r, 3), Me(e), Ce(e, n), Ce(e, ~n), n && e.pending_buf.set(e.window.subarray(t, t + n), e.pending), e.pending += n;
}, Ge = {
	_tr_init: Ue,
	_tr_stored_block: We,
	_tr_flush_block: (e, t, n, r) => {
		let i, a, o = 0;
		e.level > 0 ? (e.strm.data_type === y && (e.strm.data_type = Ve(e)), Ie(e, e.l_desc), Ie(e, e.d_desc), o = ze(e), i = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = n + 5, n + 4 <= i && t !== -1 ? We(e, t, n, r) : e.strategy === g || a === i ? (we(e, 2 + +!!r, 3), Fe(e, de, fe)) : (we(e, 4 + +!!r, 3), Be(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1), Fe(e, e.dyn_ltree, e.dyn_dtree)), je(e), r && Me(e);
	},
	_tr_tally: (e, t, n) => (e.pending_buf[e.sym_buf + e.sym_next++] = t, e.pending_buf[e.sym_buf + e.sym_next++] = t >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = n, t === 0 ? e.dyn_ltree[n * 2]++ : (e.matches++, t--, e.dyn_ltree[(me[n] + S + 1) * 2]++, e.dyn_dtree[Se(t) * 2]++), e.sym_next === e.sym_end),
	_tr_align: (e) => {
		we(e, 2, 3), Te(e, ne, de), De(e);
	}
}, Ke = (e, t, n, r) => {
	let i = e & 65535, a = e >>> 16 & 65535, o = 0;
	for (; n !== 0;) {
		o = n > 2e3 ? 2e3 : n, n -= o;
		do
			i = i + t[r++] | 0, a = a + i | 0;
		while (--o);
		i %= 65521, a %= 65521;
	}
	return i | a << 16;
}, qe = new Uint32Array((() => {
	let e, t = [];
	for (var n = 0; n < 256; n++) {
		e = n;
		for (var r = 0; r < 8; r++) e = e & 1 ? 0xedb88320 ^ e >>> 1 : e >>> 1;
		t[n] = e;
	}
	return t;
})()), O = (e, t, n, r) => {
	let i = qe, a = r + n;
	e ^= -1;
	for (let n = r; n < a; n++) e = e >>> 8 ^ i[(e ^ t[n]) & 255];
	return e ^ -1;
}, Je = {
	2: "need dictionary",
	1: "stream end",
	0: "",
	"-1": "file error",
	"-2": "stream error",
	"-3": "data error",
	"-4": "insufficient memory",
	"-5": "buffer error",
	"-6": "incompatible version"
}, Ye = {
	Z_NO_FLUSH: 0,
	Z_PARTIAL_FLUSH: 1,
	Z_SYNC_FLUSH: 2,
	Z_FULL_FLUSH: 3,
	Z_FINISH: 4,
	Z_BLOCK: 5,
	Z_TREES: 6,
	Z_OK: 0,
	Z_STREAM_END: 1,
	Z_NEED_DICT: 2,
	Z_ERRNO: -1,
	Z_STREAM_ERROR: -2,
	Z_DATA_ERROR: -3,
	Z_MEM_ERROR: -4,
	Z_BUF_ERROR: -5,
	Z_NO_COMPRESSION: 0,
	Z_BEST_SPEED: 1,
	Z_BEST_COMPRESSION: 9,
	Z_DEFAULT_COMPRESSION: -1,
	Z_FILTERED: 1,
	Z_HUFFMAN_ONLY: 2,
	Z_RLE: 3,
	Z_FIXED: 4,
	Z_DEFAULT_STRATEGY: 0,
	Z_BINARY: 0,
	Z_TEXT: 1,
	Z_UNKNOWN: 2,
	Z_DEFLATED: 8
}, { _tr_init: Xe, _tr_stored_block: Ze, _tr_flush_block: Qe, _tr_tally: $e, _tr_align: et } = Ge, { Z_NO_FLUSH: tt, Z_PARTIAL_FLUSH: nt, Z_FULL_FLUSH: rt, Z_FINISH: it, Z_BLOCK: at, Z_OK: k, Z_STREAM_END: ot, Z_STREAM_ERROR: st, Z_DATA_ERROR: ct, Z_BUF_ERROR: lt, Z_DEFAULT_COMPRESSION: ut, Z_FILTERED: dt, Z_HUFFMAN_ONLY: ft, Z_RLE: pt, Z_FIXED: mt, Z_DEFAULT_STRATEGY: ht, Z_UNKNOWN: gt, Z_DEFLATED: _t } = Ye, vt = 9, yt = 15, bt = 8, xt = 573, A = 3, St = 258, Ct = 262, wt = 32, Tt = 42, Et = 57, Dt = 69, Ot = 73, kt = 91, At = 103, jt = 113, Mt = 666, Nt = 1, Pt = 2, Ft = 3, It = 4, Lt = 3, Rt = (e, t) => (e.msg = Je[t], t), zt = (e) => e * 2 - (e > 4 ? 9 : 0), Bt = (e) => {
	let t = e.length;
	for (; --t >= 0;) e[t] = 0;
}, Vt = (e) => {
	let t, n, r, i = e.w_size;
	t = e.hash_size, r = t;
	do
		n = e.head[--r], e.head[r] = n >= i ? n - i : 0;
	while (--t);
	t = i, r = t;
	do
		n = e.prev[--r], e.prev[r] = n >= i ? n - i : 0;
	while (--t);
}, Ht = (e, t, n) => (t << e.hash_shift ^ n) & e.hash_mask, Ut = (e, t) => {
	let n;
	if (e.legacy_hash) n = e.ins_h = Ht(e, e.ins_h, e.window[t + A - 1]);
	else {
		let r = e.window, i = r[t] | r[t + 1] << 8 | r[t + 2] << 16 | r[t + 3] << 24;
		n = e.ins_h = Math.imul(i, 66521) + 66521 >>> 16 & e.hash_mask;
	}
	let r = e.prev[t & e.w_mask] = e.head[n];
	return e.head[n] = t, r;
}, Wt = (e) => {
	let t = e.state, n = t.pending;
	n > e.avail_out && (n = e.avail_out), n !== 0 && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + n), e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
}, Gt = (e, t) => {
	Qe(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, Wt(e.strm);
}, j = (e, t) => {
	e.pending_buf[e.pending++] = t;
}, Kt = (e, t) => {
	e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = t & 255;
}, qt = (e, t, n, r) => {
	let i = e.avail_in;
	return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, t.set(e.input.subarray(e.next_in, e.next_in + i), n), e.state.wrap === 1 ? e.adler = Ke(e.adler, t, i, n) : e.state.wrap === 2 && (e.adler = O(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i);
}, Jt = (e, t) => {
	let n = e.max_chain_length, r = e.strstart, i, a, o = e.prev_length, s = e.nice_match, c = e.strstart > e.w_size - Ct ? e.strstart - (e.w_size - Ct) : 0, l = e.window, u = e.w_mask, d = e.prev, f = e.strstart + St, p = l[r + o - 1], m = l[r + o];
	e.prev_length >= e.good_match && (n >>= 2), s > e.lookahead && (s = e.lookahead);
	do
		if (i = t, l[i + o] === m && l[i + o - 1] === p && l[i] === l[r] && l[++i] === l[r + 1]) {
			r += 2, i++;
			do;
			while (l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && r < f);
			if (a = St - (f - r), r = f - St, a > o) {
				if (e.match_start = t, o = a, a >= s) break;
				p = l[r + o - 1], m = l[r + o];
			}
		}
	while ((t = d[t & u]) > c && --n !== 0);
	return o <= e.lookahead ? o : e.lookahead;
}, Yt = (e) => {
	let t = e.w_size, n, r, i;
	do {
		if (r = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - Ct) && (e.window.set(e.window.subarray(t, t + t - r), 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, e.insert > e.strstart && (e.insert = e.strstart), Vt(e), r += t), e.strm.avail_in === 0) break;
		if (n = qt(e.strm, e.window, e.strstart + e.lookahead, r), e.lookahead += n, !e.legacy_hash) {
			if (e.lookahead + e.insert > A) for (i = e.strstart - e.insert; e.insert && (Ut(e, i), i++, e.insert--, !(e.lookahead + e.insert <= A)););
		} else if (e.lookahead + e.insert >= A) for (i = e.strstart - e.insert, e.ins_h = e.window[i], e.ins_h = Ht(e, e.ins_h, e.window[i + 1]); e.insert && (Ut(e, i), i++, e.insert--, !(e.lookahead + e.insert < A)););
	} while (e.lookahead < Ct && e.strm.avail_in !== 0);
}, Xt = (e, t) => {
	let n = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, r, i, a, o = 0, s = e.strm.avail_in;
	do {
		if (r = 65535, a = e.bi_valid + 42 >> 3, e.strm.avail_out < a || (a = e.strm.avail_out - a, i = e.strstart - e.block_start, r > i + e.strm.avail_in && (r = i + e.strm.avail_in), r > a && (r = a), r < n && (r === 0 && t !== it || t === tt || r !== i + e.strm.avail_in))) break;
		o = +(t === it && r === i + e.strm.avail_in), Ze(e, 0, 0, o), e.pending_buf[e.pending - 4] = r, e.pending_buf[e.pending - 3] = r >> 8, e.pending_buf[e.pending - 2] = ~r, e.pending_buf[e.pending - 1] = ~r >> 8, Wt(e.strm), i && (i > r && (i = r), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + i), e.strm.next_out), e.strm.next_out += i, e.strm.avail_out -= i, e.strm.total_out += i, e.block_start += i, r -= i), r && (qt(e.strm, e.strm.output, e.strm.next_out, r), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r);
	} while (o === 0);
	return s -= e.strm.avail_in, s && (s >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= s && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - s, e.strm.next_in), e.strstart), e.strstart += s, e.insert += s > e.w_size - e.insert ? e.w_size - e.insert : s), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), o ? It : t !== tt && t !== it && e.strm.avail_in === 0 && e.strstart === e.block_start ? Pt : (a = e.window_size - e.strstart, e.strm.avail_in > a && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, a += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), a > e.strm.avail_in && (a = e.strm.avail_in), a && (qt(e.strm, e.window, e.strstart, a), e.strstart += a, e.insert += a > e.w_size - e.insert ? e.w_size - e.insert : a), e.high_water < e.strstart && (e.high_water = e.strstart), a = e.bi_valid + 42 >> 3, a = e.pending_buf_size - a > 65535 ? 65535 : e.pending_buf_size - a, n = a > e.w_size ? e.w_size : a, i = e.strstart - e.block_start, (i >= n || (i || t === it) && t !== tt && e.strm.avail_in === 0 && i <= a) && (r = i > a ? a : i, o = +(t === it && e.strm.avail_in === 0 && r === i), Ze(e, e.block_start, r, o), e.block_start += r, Wt(e.strm)), o ? Ft : Nt);
}, Zt = (e, t) => {
	let n, r;
	for (;;) {
		if (e.lookahead < Ct) {
			if (Yt(e), e.lookahead < Ct && t === tt) return Nt;
			if (e.lookahead === 0) break;
		}
		if (n = 0, e.lookahead >= A && (n = Ut(e, e.strstart)), n !== 0 && e.strstart - n <= e.w_size - Ct && (e.match_length = Jt(e, n)), e.match_length >= A) {
			if (r = $e(e, e.strstart - e.match_start, e.match_length - A), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= A) {
				e.match_length--;
				do
					e.strstart++, n = Ut(e, e.strstart);
				while (--e.match_length !== 0);
				e.strstart++;
			} else e.strstart += e.match_length, e.match_length = 0, e.legacy_hash && (e.ins_h = e.window[e.strstart], e.ins_h = Ht(e, e.ins_h, e.window[e.strstart + 1]));
		} else r = $e(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
		if (r && (Gt(e, !1), e.strm.avail_out === 0)) return Nt;
	}
	return e.insert = e.strstart < 2 ? e.strstart : 2, t === it ? (Gt(e, !0), e.strm.avail_out === 0 ? Ft : It) : e.sym_next && (Gt(e, !1), e.strm.avail_out === 0) ? Nt : Pt;
}, Qt = (e, t) => {
	let n, r, i;
	for (;;) {
		if (e.lookahead < Ct) {
			if (Yt(e), e.lookahead < Ct && t === tt) return Nt;
			if (e.lookahead === 0) break;
		}
		if (n = 0, e.lookahead >= A && (n = Ut(e, e.strstart)), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - Ct && (e.match_length = Jt(e, n), e.match_length <= 5 && (e.strategy === dt || e.match_length === A && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= A && e.match_length <= e.prev_length) {
			i = e.strstart + e.lookahead - A, r = $e(e, e.strstart - 1 - e.prev_match, e.prev_length - A), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
			do
				++e.strstart <= i && (n = Ut(e, e.strstart));
			while (--e.prev_length !== 0);
			if (e.match_available = 0, e.match_length = 2, e.strstart++, r && (Gt(e, !1), e.strm.avail_out === 0)) return Nt;
		} else if (e.match_available) {
			if (r = $e(e, 0, e.window[e.strstart - 1]), r && Gt(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return Nt;
		} else e.match_available = 1, e.strstart++, e.lookahead--;
	}
	return e.match_available &&= (r = $e(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < 2 ? e.strstart : 2, t === it ? (Gt(e, !0), e.strm.avail_out === 0 ? Ft : It) : e.sym_next && (Gt(e, !1), e.strm.avail_out === 0) ? Nt : Pt;
}, $t = (e, t) => {
	let n, r, i, a, o = e.window;
	for (;;) {
		if (e.lookahead <= St) {
			if (Yt(e), e.lookahead <= St && t === tt) return Nt;
			if (e.lookahead === 0) break;
		}
		if (e.match_length = 0, e.lookahead >= A && e.strstart > 0 && (i = e.strstart - 1, r = o[i], r === o[++i] && r === o[++i] && r === o[++i])) {
			a = e.strstart + St;
			do;
			while (r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && i < a);
			e.match_length = St - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
		}
		if (e.match_length >= A ? (n = $e(e, 1, e.match_length - A), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = $e(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (Gt(e, !1), e.strm.avail_out === 0)) return Nt;
	}
	return e.insert = 0, t === it ? (Gt(e, !0), e.strm.avail_out === 0 ? Ft : It) : e.sym_next && (Gt(e, !1), e.strm.avail_out === 0) ? Nt : Pt;
}, en = (e, t) => {
	let n;
	for (;;) {
		if (e.lookahead === 0 && (Yt(e), e.lookahead === 0)) {
			if (t === tt) return Nt;
			break;
		}
		if (e.match_length = 0, n = $e(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (Gt(e, !1), e.strm.avail_out === 0)) return Nt;
	}
	return e.insert = 0, t === it ? (Gt(e, !0), e.strm.avail_out === 0 ? Ft : It) : e.sym_next && (Gt(e, !1), e.strm.avail_out === 0) ? Nt : Pt;
};
function tn(e, t, n, r, i) {
	this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
}
var nn = [
	new tn(0, 0, 0, 0, Xt),
	new tn(4, 4, 8, 4, Zt),
	new tn(4, 5, 16, 8, Zt),
	new tn(4, 6, 32, 32, Zt),
	new tn(4, 4, 16, 16, Qt),
	new tn(8, 16, 32, 32, Qt),
	new tn(8, 16, 128, 128, Qt),
	new tn(8, 32, 128, 256, Qt),
	new tn(32, 128, 258, 1024, Qt),
	new tn(32, 258, 258, 4096, Qt)
], rn = (e) => {
	e.window_size = 2 * e.w_size, Bt(e.head), e.max_lazy_match = nn[e.level].max_lazy, e.good_match = nn[e.level].good_length, e.nice_match = nn[e.level].nice_length, e.max_chain_length = nn[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = 2, e.match_available = 0, e.ins_h = 0;
};
function an() {
	this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = _t, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(xt * 2), this.dyn_dtree = /* @__PURE__ */ new Uint16Array(122), this.bl_tree = /* @__PURE__ */ new Uint16Array(78), Bt(this.dyn_ltree), Bt(this.dyn_dtree), Bt(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = /* @__PURE__ */ new Uint16Array(16), this.heap = /* @__PURE__ */ new Uint16Array(573), Bt(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = /* @__PURE__ */ new Uint16Array(573), Bt(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
var on = (e) => {
	if (!e) return 1;
	let t = e.state;
	return +(!t || t.strm !== e || t.status !== Tt && t.status !== Et && t.status !== Dt && t.status !== Ot && t.status !== kt && t.status !== At && t.status !== jt && t.status !== Mt);
}, sn = (e) => {
	if (on(e)) return Rt(e, st);
	e.total_in = e.total_out = 0, e.data_type = gt;
	let t = e.state;
	return t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap === 2 ? Et : t.wrap ? Tt : jt, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = -2, Xe(t), k;
}, cn = (e) => {
	let t = sn(e);
	return t === k && rn(e.state), t;
}, ln = (e, t) => on(e) || e.state.wrap !== 2 ? st : (e.state.gzhead = t, k), un = (e, t, n, r, i, a, o) => {
	if (!e) return st;
	let s = 1;
	if (t === ut && (t = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), i < 1 || i > vt || n !== _t || r < 8 || r > 15 || t < 0 || t > 9 || a < 0 || a > mt || r === 8 && s !== 1) return Rt(e, st);
	r === 8 && (r = 9);
	let c = new an();
	return e.state = c, c.strm = e, c.status = Tt, c.wrap = s, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.legacy_hash = +!!o, c.hash_bits = i + 7, !c.legacy_hash && c.hash_bits < 15 && (c.hash_bits = 15), c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + A - 1) / A), c.window = new Uint8Array(c.w_size * 2), c.head = new Uint16Array(c.hash_size), c.prev = new Uint16Array(c.w_size), c.lit_bufsize = 1 << i + 6, c.pending_buf_size = c.lit_bufsize * 4, c.pending_buf = new Uint8Array(c.pending_buf_size), c.sym_buf = c.lit_bufsize, c.sym_end = (c.lit_bufsize - 1) * 3, c.level = t, c.strategy = a, c.method = n, cn(e);
}, dn = {
	deflateInit: (e, t) => un(e, t, _t, yt, bt, ht),
	deflateInit2: un,
	deflateReset: cn,
	deflateResetKeep: sn,
	deflateSetHeader: ln,
	deflate: (e, t) => {
		if (on(e) || t > at || t < 0) return e ? Rt(e, st) : st;
		let n = e.state;
		if (!e.output || e.avail_in !== 0 && !e.input || n.status === Mt && t !== it) return Rt(e, e.avail_out === 0 ? lt : st);
		let r = n.last_flush;
		if (n.last_flush = t, n.pending !== 0) {
			if (Wt(e), e.avail_out === 0) return n.last_flush = -1, k;
		} else if (e.avail_in === 0 && zt(t) <= zt(r) && t !== it) return Rt(e, lt);
		if (n.status === Mt && e.avail_in !== 0) return Rt(e, lt);
		if (n.status === Tt && n.wrap === 0 && (n.status = jt), n.status === Tt) {
			let t = _t + (n.w_bits - 8 << 4) << 8, r = -1;
			if (r = n.strategy >= ft || n.level < 2 ? 0 : n.level < 6 ? 1 : n.level === 6 ? 2 : 3, t |= r << 6, n.strstart !== 0 && (t |= wt), t += 31 - t % 31, Kt(n, t), n.strstart !== 0 && (Kt(n, e.adler >>> 16), Kt(n, e.adler & 65535)), e.adler = 1, n.status = jt, Wt(e), n.pending !== 0) return n.last_flush = -1, k;
		}
		if (n.status === Et) {
			if (e.adler = 0, j(n, 31), j(n, 139), j(n, 8), n.gzhead) j(n, +!!n.gzhead.text + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), j(n, n.gzhead.time & 255), j(n, n.gzhead.time >> 8 & 255), j(n, n.gzhead.time >> 16 & 255), j(n, n.gzhead.time >> 24 & 255), j(n, n.level === 9 ? 2 : n.strategy >= ft || n.level < 2 ? 4 : 0), j(n, n.gzhead.os & 255), n.gzhead.extra && n.gzhead.extra.length && (j(n, n.gzhead.extra.length & 255), j(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = O(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = Dt;
			else if (j(n, 0), j(n, 0), j(n, 0), j(n, 0), j(n, 0), j(n, n.level === 9 ? 2 : n.strategy >= ft || n.level < 2 ? 4 : 0), j(n, Lt), n.status = jt, Wt(e), n.pending !== 0) return n.last_flush = -1, k;
		}
		if (n.status === Dt) {
			if (n.gzhead.extra) {
				let t = n.pending, r = (n.gzhead.extra.length & 65535) - n.gzindex;
				for (; n.pending + r > n.pending_buf_size;) {
					let i = n.pending_buf_size - n.pending;
					if (n.pending_buf.set(n.gzhead.extra.subarray(n.gzindex, n.gzindex + i), n.pending), n.pending = n.pending_buf_size, n.gzhead.hcrc && n.pending > t && (e.adler = O(e.adler, n.pending_buf, n.pending - t, t)), n.gzindex += i, Wt(e), n.pending !== 0) return n.last_flush = -1, k;
					t = 0, r -= i;
				}
				let i = new Uint8Array(n.gzhead.extra);
				n.pending_buf.set(i.subarray(n.gzindex, n.gzindex + r), n.pending), n.pending += r, n.gzhead.hcrc && n.pending > t && (e.adler = O(e.adler, n.pending_buf, n.pending - t, t)), n.gzindex = 0;
			}
			n.status = Ot;
		}
		if (n.status === Ot) {
			if (n.gzhead.name) {
				let t = n.pending, r;
				do {
					if (n.pending === n.pending_buf_size) {
						if (n.gzhead.hcrc && n.pending > t && (e.adler = O(e.adler, n.pending_buf, n.pending - t, t)), Wt(e), n.pending !== 0) return n.last_flush = -1, k;
						t = 0;
					}
					r = n.gzindex < n.gzhead.name.length ? n.gzhead.name.charCodeAt(n.gzindex++) & 255 : 0, j(n, r);
				} while (r !== 0);
				n.gzhead.hcrc && n.pending > t && (e.adler = O(e.adler, n.pending_buf, n.pending - t, t)), n.gzindex = 0;
			}
			n.status = kt;
		}
		if (n.status === kt) {
			if (n.gzhead.comment) {
				let t = n.pending, r;
				do {
					if (n.pending === n.pending_buf_size) {
						if (n.gzhead.hcrc && n.pending > t && (e.adler = O(e.adler, n.pending_buf, n.pending - t, t)), Wt(e), n.pending !== 0) return n.last_flush = -1, k;
						t = 0;
					}
					r = n.gzindex < n.gzhead.comment.length ? n.gzhead.comment.charCodeAt(n.gzindex++) & 255 : 0, j(n, r);
				} while (r !== 0);
				n.gzhead.hcrc && n.pending > t && (e.adler = O(e.adler, n.pending_buf, n.pending - t, t));
			}
			n.status = At;
		}
		if (n.status === At) {
			if (n.gzhead.hcrc) {
				if (n.pending + 2 > n.pending_buf_size && (Wt(e), n.pending !== 0)) return n.last_flush = -1, k;
				j(n, e.adler & 255), j(n, e.adler >> 8 & 255), e.adler = 0;
			}
			if (n.status = jt, Wt(e), n.pending !== 0) return n.last_flush = -1, k;
		}
		if (e.avail_in !== 0 || n.lookahead !== 0 || t !== tt && n.status !== Mt) {
			let r = n.level === 0 ? Xt(n, t) : n.strategy === ft ? en(n, t) : n.strategy === pt ? $t(n, t) : nn[n.level].func(n, t);
			if ((r === Ft || r === It) && (n.status = Mt), r === Nt || r === Ft) return e.avail_out === 0 && (n.last_flush = -1), k;
			if (r === Pt && (t === nt ? et(n) : t !== at && (Ze(n, 0, 0, !1), t === rt && (Bt(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), Wt(e), e.avail_out === 0)) return n.last_flush = -1, k;
		}
		return t === it ? n.wrap <= 0 ? ot : (n.wrap === 2 ? (j(n, e.adler & 255), j(n, e.adler >> 8 & 255), j(n, e.adler >> 16 & 255), j(n, e.adler >> 24 & 255), j(n, e.total_in & 255), j(n, e.total_in >> 8 & 255), j(n, e.total_in >> 16 & 255), j(n, e.total_in >> 24 & 255)) : (Kt(n, e.adler >>> 16), Kt(n, e.adler & 65535)), Wt(e), n.wrap > 0 && (n.wrap = -n.wrap), n.pending === 0 ? ot : k) : k;
	},
	deflateEnd: (e) => {
		if (on(e)) return st;
		let t = e.state.status;
		return e.state = null, t === jt ? Rt(e, ct) : k;
	},
	deflateSetDictionary: (e, t) => {
		let n = t.length;
		if (on(e)) return st;
		let r = e.state, i = r.wrap;
		if (i === 2 || i === 1 && r.status !== Tt || r.lookahead) return st;
		if (i === 1 && (e.adler = Ke(e.adler, t, n, 0)), r.wrap = 0, n >= r.w_size) {
			i === 0 && (Bt(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
			let e = new Uint8Array(r.w_size);
			e.set(t.subarray(n - r.w_size, n), 0), t = e, n = r.w_size;
		}
		let a = e.avail_in, o = e.next_in, s = e.input;
		for (e.avail_in = n, e.next_in = 0, e.input = t, Yt(r); r.lookahead >= A;) {
			let e = r.strstart, t = r.lookahead - 2;
			do
				Ut(r, e), e++;
			while (--t);
			r.strstart = e, r.lookahead = 2, Yt(r);
		}
		return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = 2, r.match_available = 0, e.next_in = o, e.input = s, e.avail_in = a, r.wrap = i, k;
	},
	deflateInfo: "pako deflate (from Nodeca project)"
}, fn = (e, t) => Object.prototype.hasOwnProperty.call(e, t), pn = {
	assign: function(e) {
		let t = Array.prototype.slice.call(arguments, 1);
		for (; t.length;) {
			let n = t.shift();
			if (n) {
				if (typeof n != "object") throw TypeError(n + "must be non-object");
				for (let t in n) fn(n, t) && (e[t] = n[t]);
			}
		}
		return e;
	},
	flattenChunks: (e) => {
		let t = 0;
		for (let n = 0, r = e.length; n < r; n++) t += e[n].length;
		let n = new Uint8Array(t);
		for (let t = 0, r = 0, i = e.length; t < i; t++) {
			let i = e[t];
			n.set(i, r), r += i.length;
		}
		return n;
	}
}, mn = !0;
try {
	String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
} catch {
	mn = !1;
}
var hn = /* @__PURE__ */ new Uint8Array(256);
for (let e = 0; e < 256; e++) hn[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
hn[254] = hn[255] = 1;
var gn = (e) => {
	if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(e);
	let t, n, r, i, a, o = e.length, s = 0;
	for (i = 0; i < o; i++) n = e.charCodeAt(i), (n & 64512) == 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
	for (t = new Uint8Array(s), a = 0, i = 0; a < s; i++) n = e.charCodeAt(i), (n & 64512) == 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | n & 63) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63);
	return t;
}, _n = (e, t) => {
	if (t < 65534 && e.subarray && mn) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
	let n = "";
	for (let r = 0; r < t; r++) n += String.fromCharCode(e[r]);
	return n;
}, vn = {
	string2buf: gn,
	buf2string: (e, t) => {
		let n = t || e.length;
		if (typeof TextDecoder == "function" && TextDecoder.prototype.decode) return new TextDecoder().decode(e.subarray(0, t));
		let r, i, a = Array(n * 2);
		for (i = 0, r = 0; r < n;) {
			let t = e[r++];
			if (t < 128) {
				a[i++] = t;
				continue;
			}
			let o = hn[t];
			if (o > 4) a[i++] = 65533, r += o - 1;
			else {
				for (t &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < n;) t = t << 6 | e[r++] & 63, o--;
				o > 1 ? a[i++] = 65533 : t < 65536 ? a[i++] = t : (t -= 65536, a[i++] = 55296 | t >> 10 & 1023, a[i++] = 56320 | t & 1023);
			}
		}
		return _n(a, i);
	},
	utf8border: (e, t) => {
		t ||= e.length, t > e.length && (t = e.length);
		let n = t - 1;
		for (; n >= 0 && (e[n] & 192) == 128;) n--;
		return n < 0 || n === 0 ? t : n + hn[e[n]] > t ? n : t;
	}
};
function yn() {
	this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var bn = yn, xn = Object.prototype.toString, { Z_NO_FLUSH: Sn, Z_SYNC_FLUSH: Cn, Z_FULL_FLUSH: wn, Z_FINISH: Tn, Z_OK: En, Z_STREAM_END: Dn, Z_DEFAULT_COMPRESSION: On, Z_DEFAULT_STRATEGY: kn, Z_DEFLATED: An } = Ye, jn = {
	level: On,
	method: An,
	chunkSize: 16384,
	windowBits: 15,
	memLevel: 8,
	strategy: kn,
	legacyHash: !0
};
function Mn(e) {
	this.options = pn.assign({}, jn, e || {});
	let t = this.options;
	t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new bn(), this.strm.avail_out = 0;
	let n = dn.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy, t.legacyHash);
	if (n !== En) throw Error(Je[n]);
	if (t.header && dn.deflateSetHeader(this.strm, t.header), t.dictionary) {
		let e;
		if (e = typeof t.dictionary == "string" ? vn.string2buf(t.dictionary) : xn.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary, n = dn.deflateSetDictionary(this.strm, e), n !== En) throw Error(Je[n]);
		this._dict_set = !0;
	}
}
Mn.prototype.push = function(e, t) {
	let n = this.strm, r = this.options.chunkSize, i, a;
	if (this.ended) return !1;
	for (a = t === ~~t ? t : t === !0 ? Tn : Sn, n.input = typeof e == "string" ? vn.string2buf(e) : xn.call(e) === "[object ArrayBuffer]" ? new Uint8Array(e) : e, n.next_in = 0, n.avail_in = n.input.length;;) if (n.avail_out === 0 && (n.output = new Uint8Array(r), n.next_out = 0, n.avail_out = r), (a === Cn || a === wn) && n.avail_out <= 6) this.onData(n.output.subarray(0, n.next_out)), n.avail_out = 0;
	else {
		if (i = dn.deflate(n, a), i === Dn) return n.next_out > 0 && this.onData(n.output.subarray(0, n.next_out)), i = dn.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === En;
		if (n.avail_out === 0) this.onData(n.output);
		else if (a > 0 && n.next_out > 0) this.onData(n.output.subarray(0, n.next_out)), n.avail_out = 0;
		else if (n.avail_in === 0) break;
	}
	return !0;
}, Mn.prototype.onData = function(e) {
	this.chunks.push(e);
}, Mn.prototype.onEnd = function(e) {
	e === En && (this.result = pn.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function Nn(e, t) {
	let n = new Mn(t);
	if (n.push(e, !0), n.err) throw n.msg || Je[n.err];
	return n.result;
}
function Pn(e, t) {
	return t ||= {}, t.raw = !0, Nn(e, t);
}
function Fn(e, t) {
	return t ||= {}, t.gzip = !0, Nn(e, t);
}
var In = {
	Deflate: Mn,
	deflate: Nn,
	deflateRaw: Pn,
	gzip: Fn,
	constants: Ye
}, Ln = 16209, Rn = 16191, zn = function(e, t) {
	let n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e.state;
	n = e.next_in, w = e.input, r = n + (e.avail_in - 5), i = e.next_out, T = e.output, a = i - (t - e.avail_out), o = i + (e.avail_out - 257), s = E.dmax, c = E.wsize, l = E.whave, u = E.wnext, d = E.window, f = E.hold, p = E.bits, m = E.lencode, h = E.distcode, g = (1 << E.lenbits) - 1, _ = (1 << E.distbits) - 1;
	e: do
		for (p < 15 && (f += w[n++] << p, p += 8, f += w[n++] << p, p += 8), v = m[f & g];;) {
			if (y = v >>> 24, f >>>= y, p -= y, y = v >>> 16 & 255, y === 0) T[i++] = v & 65535;
			else if (y & 16) for (b = v & 65535, y &= 15, y && (p < y && (f += w[n++] << p, p += 8), b += f & (1 << y) - 1, f >>>= y, p -= y), p < 15 && (f += w[n++] << p, p += 8, f += w[n++] << p, p += 8), v = h[f & _];;) {
				if (y = v >>> 24, f >>>= y, p -= y, y = v >>> 16 & 255, y & 16) {
					if (x = v & 65535, y &= 15, p < y && (f += w[n++] << p, p += 8, p < y && (f += w[n++] << p, p += 8)), x += f & (1 << y) - 1, x > s) {
						e.msg = "invalid distance too far back", E.mode = Ln;
						break e;
					}
					if (f >>>= y, p -= y, y = i - a, x > y) {
						if (y = x - y, y > l && E.sane) {
							e.msg = "invalid distance too far back", E.mode = Ln;
							break e;
						}
						if (S = 0, C = d, u === 0) {
							if (S += c - y, y < b) {
								b -= y;
								do
									T[i++] = d[S++];
								while (--y);
								S = i - x, C = T;
							}
						} else if (u < y) {
							if (S += c + u - y, y -= u, y < b) {
								b -= y;
								do
									T[i++] = d[S++];
								while (--y);
								if (S = 0, u < b) {
									y = u, b -= y;
									do
										T[i++] = d[S++];
									while (--y);
									S = i - x, C = T;
								}
							}
						} else if (S += u - y, y < b) {
							b -= y;
							do
								T[i++] = d[S++];
							while (--y);
							S = i - x, C = T;
						}
						for (; b > 2;) T[i++] = C[S++], T[i++] = C[S++], T[i++] = C[S++], b -= 3;
						b && (T[i++] = C[S++], b > 1 && (T[i++] = C[S++]));
					} else {
						S = i - x;
						do
							T[i++] = T[S++], T[i++] = T[S++], T[i++] = T[S++], b -= 3;
						while (b > 2);
						b && (T[i++] = T[S++], b > 1 && (T[i++] = T[S++]));
					}
				} else if (y & 64) {
					e.msg = "invalid distance code", E.mode = Ln;
					break e;
				} else {
					v = h[(v & 65535) + (f & (1 << y) - 1)];
					continue;
				}
				break;
			}
			else if (!(y & 64)) {
				v = m[(v & 65535) + (f & (1 << y) - 1)];
				continue;
			} else if (y & 32) {
				E.mode = Rn;
				break e;
			} else {
				e.msg = "invalid literal/length code", E.mode = Ln;
				break e;
			}
			break;
		}
	while (n < r && i < o);
	b = p >> 3, n -= b, p -= b << 3, f &= (1 << p) - 1, e.next_in = n, e.next_out = i, e.avail_in = n < r ? 5 + (r - n) : 5 - (n - r), e.avail_out = i < o ? 257 + (o - i) : 257 - (i - o), E.hold = f, E.bits = p;
}, Bn = 15, Vn = 852, Hn = 592, Un = 0, Wn = 1, Gn = 2, Kn = new Uint16Array([
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	13,
	15,
	17,
	19,
	23,
	27,
	31,
	35,
	43,
	51,
	59,
	67,
	83,
	99,
	115,
	131,
	163,
	195,
	227,
	258,
	0,
	0
]), qn = new Uint8Array([
	16,
	16,
	16,
	16,
	16,
	16,
	16,
	16,
	17,
	17,
	17,
	17,
	18,
	18,
	18,
	18,
	19,
	19,
	19,
	19,
	20,
	20,
	20,
	20,
	21,
	21,
	21,
	21,
	16,
	199,
	75
]), Jn = new Uint16Array([
	1,
	2,
	3,
	4,
	5,
	7,
	9,
	13,
	17,
	25,
	33,
	49,
	65,
	97,
	129,
	193,
	257,
	385,
	513,
	769,
	1025,
	1537,
	2049,
	3073,
	4097,
	6145,
	8193,
	12289,
	16385,
	24577,
	0,
	0
]), Yn = new Uint8Array([
	16,
	16,
	16,
	16,
	17,
	17,
	18,
	18,
	19,
	19,
	20,
	20,
	21,
	21,
	22,
	22,
	23,
	23,
	24,
	24,
	25,
	25,
	26,
	26,
	27,
	27,
	28,
	28,
	29,
	29,
	64,
	64
]), Xn = (e, t, n, r, i, a, o, s) => {
	let c = s.bits, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y, b, x, S, C, w = null, T, E = /* @__PURE__ */ new Uint16Array(16), D = /* @__PURE__ */ new Uint16Array(16), ee = null, te, ne, re;
	for (l = 0; l <= Bn; l++) E[l] = 0;
	for (u = 0; u < r; u++) E[t[n + u]]++;
	for (p = c, f = Bn; f >= 1 && E[f] === 0; f--);
	if (p > f && (p = f), f === 0) return i[a++] = 20971520, i[a++] = 20971520, s.bits = 1, 0;
	for (d = 1; d < f && E[d] === 0; d++);
	for (p < d && (p = d), g = 1, l = 1; l <= Bn; l++) if (g <<= 1, g -= E[l], g < 0) return -1;
	if (g > 0 && (e === Un || f !== 1)) return -1;
	for (D[1] = 0, l = 1; l < Bn; l++) D[l + 1] = D[l] + E[l];
	for (u = 0; u < r; u++) t[n + u] !== 0 && (o[D[t[n + u]]++] = u);
	if (e === Un ? (w = ee = o, T = 20) : e === Wn ? (w = Kn, ee = qn, T = 257) : (w = Jn, ee = Yn, T = 0), v = 0, u = 0, l = d, C = a, m = p, h = 0, x = -1, _ = 1 << p, S = _ - 1, e === Wn && _ > Vn || e === Gn && _ > Hn) return 1;
	for (;;) {
		te = l - h, o[u] + 1 < T ? (ne = 0, re = o[u]) : o[u] >= T ? (ne = ee[o[u] - T], re = w[o[u] - T]) : (ne = 96, re = 0), y = 1 << l - h, b = 1 << m, d = b;
		do
			b -= y, i[C + (v >> h) + b] = te << 24 | ne << 16 | re;
		while (b !== 0);
		for (y = 1 << l - 1; v & y;) y >>= 1;
		if (y === 0 ? v = 0 : (v &= y - 1, v += y), u++, --E[l] === 0) {
			if (l === f) break;
			l = t[n + o[u]];
		}
		if (l > p && (v & S) !== x) {
			for (h === 0 && (h = p), C += d, m = l - h, g = 1 << m; m + h < f && (g -= E[m + h], !(g <= 0));) m++, g <<= 1;
			if (_ += 1 << m, e === Wn && _ > Vn || e === Gn && _ > Hn) return 1;
			x = v & S, i[x] = p << 24 | m << 16 | C - a;
		}
	}
	return v !== 0 && (i[C + v] = l - h << 24 | 4194304), s.bits = p, 0;
}, Zn = 0, Qn = 1, $n = 2, { Z_FINISH: er, Z_BLOCK: tr, Z_TREES: nr, Z_OK: rr, Z_STREAM_END: ir, Z_NEED_DICT: ar, Z_STREAM_ERROR: or, Z_DATA_ERROR: sr, Z_MEM_ERROR: cr, Z_BUF_ERROR: lr, Z_DEFLATED: ur } = Ye, dr = 16180, fr = 16181, pr = 16182, mr = 16183, hr = 16184, gr = 16185, _r = 16186, vr = 16187, yr = 16188, br = 16189, xr = 16190, Sr = 16191, Cr = 16192, wr = 16193, Tr = 16194, Er = 16195, Dr = 16196, Or = 16197, kr = 16198, Ar = 16199, jr = 16200, Mr = 16201, Nr = 16202, Pr = 16203, Fr = 16204, Ir = 16205, Lr = 16206, Rr = 16207, zr = 16208, M = 16209, Br = 16210, Vr = 16211, Hr = 852, Ur = 592, Wr = 15, Gr = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
function Kr() {
	this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = /* @__PURE__ */ new Uint16Array(320), this.work = /* @__PURE__ */ new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
var qr = (e) => {
	if (!e) return 1;
	let t = e.state;
	return +(!t || t.strm !== e || t.mode < dr || t.mode > Vr);
}, Jr = (e) => {
	if (qr(e)) return or;
	let t = e.state;
	return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = dr, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(Hr), t.distcode = t.distdyn = new Int32Array(Ur), t.sane = 1, t.back = -1, rr;
}, Yr = (e) => {
	if (qr(e)) return or;
	let t = e.state;
	return t.wsize = 0, t.whave = 0, t.wnext = 0, Jr(e);
}, Xr = (e, t) => {
	let n;
	if (qr(e)) return or;
	let r = e.state;
	return t < 0 ? (n = 0, t = -t) : (n = (t >> 4) + 5, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? or : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, Yr(e));
}, Zr = (e, t) => {
	if (!e) return or;
	let n = new Kr();
	e.state = n, n.strm = e, n.window = null, n.mode = dr;
	let r = Xr(e, t);
	return r !== rr && (e.state = null), r;
}, Qr = (e) => Zr(e, Wr), $r = !0, ei, ti, ni = (e) => {
	if ($r) {
		ei = /* @__PURE__ */ new Int32Array(512), ti = /* @__PURE__ */ new Int32Array(32);
		let t = 0;
		for (; t < 144;) e.lens[t++] = 8;
		for (; t < 256;) e.lens[t++] = 9;
		for (; t < 280;) e.lens[t++] = 7;
		for (; t < 288;) e.lens[t++] = 8;
		for (Xn(Qn, e.lens, 0, 288, ei, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
		Xn($n, e.lens, 0, 32, ti, 0, e.work, { bits: 5 }), $r = !1;
	}
	e.lencode = ei, e.lenbits = 9, e.distcode = ti, e.distbits = 5;
}, ri = (e, t, n, r) => {
	let i, a = e.state;
	return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), r >= a.wsize ? (a.window.set(t.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(t.subarray(n - r, n - r + i), a.wnext), r -= i, r ? (a.window.set(t.subarray(n - r, n), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}, ii = {
	inflateReset: Yr,
	inflateReset2: Xr,
	inflateResetKeep: Jr,
	inflateInit: Qr,
	inflateInit2: Zr,
	inflate: (e, t) => {
		let n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = 0, _, v, y, b, x, S, C, w, T = /* @__PURE__ */ new Uint8Array(4), E, D, ee = new Uint8Array([
			16,
			17,
			18,
			0,
			8,
			7,
			9,
			6,
			10,
			5,
			11,
			4,
			12,
			3,
			13,
			2,
			14,
			1,
			15
		]);
		if (qr(e) || !e.output || !e.input && e.avail_in !== 0) return or;
		n = e.state, n.mode === Sr && (n.mode = Cr), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, d = s, f = c, w = rr;
		e: for (;;) switch (n.mode) {
			case dr:
				if (n.wrap === 0) {
					n.mode = Cr;
					break;
				}
				for (; u < 16;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (n.wrap & 2 && l === 35615) {
					n.wbits === 0 && (n.wbits = 15), n.check = 0, T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = O(n.check, T, 2, 0), l = 0, u = 0, n.mode = fr;
					break;
				}
				if (n.head && (n.head.done = !1), !(n.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31) {
					e.msg = "incorrect header check", n.mode = M;
					break;
				}
				if ((l & 15) !== ur) {
					e.msg = "unknown compression method", n.mode = M;
					break;
				}
				if (l >>>= 4, u -= 4, C = (l & 15) + 8, n.wbits === 0 && (n.wbits = C), C > 15 || C > n.wbits) {
					e.msg = "invalid window size", n.mode = M;
					break;
				}
				n.dmax = 1 << n.wbits, n.flags = 0, e.adler = n.check = 1, n.mode = l & 512 ? br : Sr, l = 0, u = 0;
				break;
			case fr:
				for (; u < 16;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (n.flags = l, (n.flags & 255) !== ur) {
					e.msg = "unknown compression method", n.mode = M;
					break;
				}
				if (n.flags & 57344) {
					e.msg = "unknown header flags set", n.mode = M;
					break;
				}
				n.head && (n.head.text = l >> 8 & 1), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = O(n.check, T, 2, 0)), l = 0, u = 0, n.mode = pr;
			case pr:
				for (; u < 32;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				n.head && (n.head.time = l), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, T[2] = l >>> 16 & 255, T[3] = l >>> 24 & 255, n.check = O(n.check, T, 4, 0)), l = 0, u = 0, n.mode = mr;
			case mr:
				for (; u < 16;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				n.head && (n.head.xflags = l & 255, n.head.os = l >> 8), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = O(n.check, T, 2, 0)), l = 0, u = 0, n.mode = hr;
			case hr:
				if (n.flags & 1024) {
					for (; u < 16;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.length = l, n.head && (n.head.extra_len = l), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = O(n.check, T, 2, 0)), l = 0, u = 0;
				} else n.head && (n.head.extra = null);
				n.mode = gr;
			case gr:
				if (n.flags & 1024 && (p = n.length, p > s && (p = s), p && (n.head && (C = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(r.subarray(a, a + p), C)), n.flags & 512 && n.wrap & 4 && (n.check = O(n.check, r, p, a)), s -= p, a += p, n.length -= p), n.length)) break e;
				n.length = 0, n.mode = _r;
			case _r:
				if (n.flags & 2048) {
					if (s === 0) break e;
					p = 0;
					do
						C = r[a + p++], n.head && C && n.length < 65536 && (n.head.name += String.fromCharCode(C));
					while (C && p < s);
					if (n.flags & 512 && n.wrap & 4 && (n.check = O(n.check, r, p, a)), s -= p, a += p, C) break e;
				} else n.head && (n.head.name = null);
				n.length = 0, n.mode = vr;
			case vr:
				if (n.flags & 4096) {
					if (s === 0) break e;
					p = 0;
					do
						C = r[a + p++], n.head && C && n.length < 65536 && (n.head.comment += String.fromCharCode(C));
					while (C && p < s);
					if (n.flags & 512 && n.wrap & 4 && (n.check = O(n.check, r, p, a)), s -= p, a += p, C) break e;
				} else n.head && (n.head.comment = null);
				n.mode = yr;
			case yr:
				if (n.flags & 512) {
					for (; u < 16;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					if (n.wrap & 4 && l !== (n.check & 65535)) {
						e.msg = "header crc mismatch", n.mode = M;
						break;
					}
					l = 0, u = 0;
				}
				n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = Sr;
				break;
			case br:
				for (; u < 32;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				e.adler = n.check = Gr(l), l = 0, u = 0, n.mode = xr;
			case xr:
				if (n.havedict === 0) return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, ar;
				e.adler = n.check = 1, n.mode = Sr;
			case Sr: if (t === tr || t === nr) break e;
			case Cr:
				if (n.last) {
					l >>>= u & 7, u -= u & 7, n.mode = Lr;
					break;
				}
				for (; u < 3;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				switch (n.last = l & 1, l >>>= 1, --u, l & 3) {
					case 0:
						n.mode = wr;
						break;
					case 1:
						if (ni(n), n.mode = Ar, t === nr) {
							l >>>= 2, u -= 2;
							break e;
						}
						break;
					case 2:
						n.mode = Dr;
						break;
					case 3: e.msg = "invalid block type", n.mode = M;
				}
				l >>>= 2, u -= 2;
				break;
			case wr:
				for (l >>>= u & 7, u -= u & 7; u < 32;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if ((l & 65535) != (l >>> 16 ^ 65535)) {
					e.msg = "invalid stored block lengths", n.mode = M;
					break;
				}
				if (n.length = l & 65535, l = 0, u = 0, n.mode = Tr, t === nr) break e;
			case Tr: n.mode = Er;
			case Er:
				if (p = n.length, p) {
					if (p > s && (p = s), p > c && (p = c), p === 0) break e;
					i.set(r.subarray(a, a + p), o), s -= p, a += p, c -= p, o += p, n.length -= p;
					break;
				}
				n.mode = Sr;
				break;
			case Dr:
				for (; u < 14;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (n.nlen = (l & 31) + 257, l >>>= 5, u -= 5, n.ndist = (l & 31) + 1, l >>>= 5, u -= 5, n.ncode = (l & 15) + 4, l >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
					e.msg = "too many length or distance symbols", n.mode = M;
					break;
				}
				n.have = 0, n.mode = Or;
			case Or:
				for (; n.have < n.ncode;) {
					for (; u < 3;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.lens[ee[n.have++]] = l & 7, l >>>= 3, u -= 3;
				}
				for (; n.have < 19;) n.lens[ee[n.have++]] = 0;
				if (n.lencode = n.lendyn, n.lenbits = 7, E = { bits: n.lenbits }, w = Xn(Zn, n.lens, 0, 19, n.lencode, 0, n.work, E), n.lenbits = E.bits, w) {
					e.msg = "invalid code lengths set", n.mode = M;
					break;
				}
				n.have = 0, n.mode = kr;
			case kr:
				for (; n.have < n.nlen + n.ndist;) {
					for (; g = n.lencode[l & (1 << n.lenbits) - 1], _ = g >>> 24, v = g >>> 16 & 255, y = g & 65535, !(_ <= u);) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					if (y < 16) l >>>= _, u -= _, n.lens[n.have++] = y;
					else {
						if (y === 16) {
							for (D = _ + 2; u < D;) {
								if (s === 0) break e;
								s--, l += r[a++] << u, u += 8;
							}
							if (l >>>= _, u -= _, n.have === 0) {
								e.msg = "invalid bit length repeat", n.mode = M;
								break;
							}
							C = n.lens[n.have - 1], p = 3 + (l & 3), l >>>= 2, u -= 2;
						} else if (y === 17) {
							for (D = _ + 3; u < D;) {
								if (s === 0) break e;
								s--, l += r[a++] << u, u += 8;
							}
							l >>>= _, u -= _, C = 0, p = 3 + (l & 7), l >>>= 3, u -= 3;
						} else {
							for (D = _ + 7; u < D;) {
								if (s === 0) break e;
								s--, l += r[a++] << u, u += 8;
							}
							l >>>= _, u -= _, C = 0, p = 11 + (l & 127), l >>>= 7, u -= 7;
						}
						if (n.have + p > n.nlen + n.ndist) {
							e.msg = "invalid bit length repeat", n.mode = M;
							break;
						}
						for (; p--;) n.lens[n.have++] = C;
					}
				}
				if (n.mode === M) break;
				if (n.lens[256] === 0) {
					e.msg = "invalid code -- missing end-of-block", n.mode = M;
					break;
				}
				if (n.lenbits = 9, E = { bits: n.lenbits }, w = Xn(Qn, n.lens, 0, n.nlen, n.lencode, 0, n.work, E), n.lenbits = E.bits, w) {
					e.msg = "invalid literal/lengths set", n.mode = M;
					break;
				}
				if (n.distbits = 6, n.distcode = n.distdyn, E = { bits: n.distbits }, w = Xn($n, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, E), n.distbits = E.bits, w) {
					e.msg = "invalid distances set", n.mode = M;
					break;
				}
				if (n.mode = Ar, t === nr) break e;
			case Ar: n.mode = jr;
			case jr:
				if (s >= 6 && c >= 258) {
					e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, zn(e, f), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, n.mode === Sr && (n.back = -1);
					break;
				}
				for (n.back = 0; g = n.lencode[l & (1 << n.lenbits) - 1], _ = g >>> 24, v = g >>> 16 & 255, y = g & 65535, !(_ <= u);) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (v && !(v & 240)) {
					for (b = _, x = v, S = y; g = n.lencode[S + ((l & (1 << b + x) - 1) >> b)], _ = g >>> 24, v = g >>> 16 & 255, y = g & 65535, !(b + _ <= u);) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					l >>>= b, u -= b, n.back += b;
				}
				if (l >>>= _, u -= _, n.back += _, n.length = y, v === 0) {
					n.mode = Ir;
					break;
				}
				if (v & 32) {
					n.back = -1, n.mode = Sr;
					break;
				}
				if (v & 64) {
					e.msg = "invalid literal/length code", n.mode = M;
					break;
				}
				n.extra = v & 15, n.mode = Mr;
			case Mr:
				if (n.extra) {
					for (D = n.extra; u < D;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.length += l & (1 << n.extra) - 1, l >>>= n.extra, u -= n.extra, n.back += n.extra;
				}
				n.was = n.length, n.mode = Nr;
			case Nr:
				for (; g = n.distcode[l & (1 << n.distbits) - 1], _ = g >>> 24, v = g >>> 16 & 255, y = g & 65535, !(_ <= u);) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (!(v & 240)) {
					for (b = _, x = v, S = y; g = n.distcode[S + ((l & (1 << b + x) - 1) >> b)], _ = g >>> 24, v = g >>> 16 & 255, y = g & 65535, !(b + _ <= u);) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					l >>>= b, u -= b, n.back += b;
				}
				if (l >>>= _, u -= _, n.back += _, v & 64) {
					e.msg = "invalid distance code", n.mode = M;
					break;
				}
				n.offset = y, n.extra = v & 15, n.mode = Pr;
			case Pr:
				if (n.extra) {
					for (D = n.extra; u < D;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.offset += l & (1 << n.extra) - 1, l >>>= n.extra, u -= n.extra, n.back += n.extra;
				}
				if (n.offset > n.dmax) {
					e.msg = "invalid distance too far back", n.mode = M;
					break;
				}
				n.mode = Fr;
			case Fr:
				if (c === 0) break e;
				if (p = f - c, n.offset > p) {
					if (p = n.offset - p, p > n.whave && n.sane) {
						e.msg = "invalid distance too far back", n.mode = M;
						break;
					}
					p > n.wnext ? (p -= n.wnext, m = n.wsize - p) : m = n.wnext - p, p > n.length && (p = n.length), h = n.window;
				} else h = i, m = o - n.offset, p = n.length;
				p > c && (p = c), c -= p, n.length -= p;
				do
					i[o++] = h[m++];
				while (--p);
				n.length === 0 && (n.mode = jr);
				break;
			case Ir:
				if (c === 0) break e;
				i[o++] = n.length, c--, n.mode = jr;
				break;
			case Lr:
				if (n.wrap) {
					for (; u < 32;) {
						if (s === 0) break e;
						s--, l |= r[a++] << u, u += 8;
					}
					if (f -= c, e.total_out += f, n.total += f, n.wrap & 4 && f && (e.adler = n.check = n.flags ? O(n.check, i, f, o - f) : Ke(n.check, i, f, o - f)), f = c, n.wrap & 4 && (n.flags ? l : Gr(l)) !== n.check) {
						e.msg = "incorrect data check", n.mode = M;
						break;
					}
					l = 0, u = 0;
				}
				n.mode = Rr;
			case Rr:
				if (n.wrap && n.flags) {
					for (; u < 32;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					if (n.wrap & 4 && l !== (n.total | 0)) {
						e.msg = "incorrect length check", n.mode = M;
						break;
					}
					l = 0, u = 0;
				}
				n.mode = zr;
			case zr:
				w = ir;
				break e;
			case M:
				w = sr;
				break e;
			case Br: return cr;
			case Vr:
			default: return or;
		}
		return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, (n.wsize || f !== e.avail_out && n.mode < M && (n.mode < Lr || t !== er)) && ri(e, e.output, e.next_out, f - e.avail_out), d -= e.avail_in, f -= e.avail_out, e.total_in += d, e.total_out += f, n.total += f, n.wrap & 4 && f && (e.adler = n.check = n.flags ? O(n.check, i, f, e.next_out - f) : Ke(n.check, i, f, e.next_out - f)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === Sr ? 128 : 0) + (n.mode === Ar || n.mode === Tr ? 256 : 0), (d === 0 && f === 0 || t === er) && w === rr && (w = lr), w;
	},
	inflateEnd: (e) => {
		if (qr(e)) return or;
		let t = e.state;
		return t.window &&= null, e.state = null, rr;
	},
	inflateGetHeader: (e, t) => {
		if (qr(e)) return or;
		let n = e.state;
		return n.wrap & 2 ? (n.head = t, t.done = !1, rr) : or;
	},
	inflateSetDictionary: (e, t) => {
		let n = t.length, r, i, a;
		return qr(e) || (r = e.state, r.wrap !== 0 && r.mode !== xr) ? or : r.mode === xr && (i = 1, i = Ke(i, t, n, 0), i !== r.check) ? sr : (a = ri(e, t, n, n), a ? (r.mode = Br, cr) : (r.havedict = 1, rr));
	},
	inflateInfo: "pako inflate (from Nodeca project)"
};
function ai() {
	this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var oi = ai, si = Object.prototype.toString, { Z_NO_FLUSH: ci, Z_FINISH: li, Z_OK: ui, Z_STREAM_END: di, Z_NEED_DICT: fi, Z_STREAM_ERROR: pi, Z_DATA_ERROR: mi, Z_MEM_ERROR: hi, Z_BUF_ERROR: gi } = Ye, _i = {
	chunkSize: 65536,
	windowBits: 15,
	to: ""
};
function vi(e) {
	this.options = pn.assign({}, _i, e || {});
	let t = this.options;
	t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new bn(), this.strm.avail_out = 0;
	let n = ii.inflateInit2(this.strm, t.windowBits);
	if (n !== ui || (this.header = new oi(), ii.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = vn.string2buf(t.dictionary) : si.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = ii.inflateSetDictionary(this.strm, t.dictionary), n !== ui)))) throw Error(Je[n]);
}
vi.prototype.push = function(e, t) {
	let n = this.strm, r = this.options.chunkSize, i = this.options.dictionary, a, o, s;
	if (this.ended) return !1;
	for (o = t === ~~t ? t : t === !0 ? li : ci, n.input = si.call(e) === "[object ArrayBuffer]" ? new Uint8Array(e) : e, n.next_in = 0, n.avail_in = n.input.length;;) {
		for (n.avail_out === 0 && (n.output = new Uint8Array(r), n.next_out = 0, n.avail_out = r), a = ii.inflate(n, o), a === fi && i && (a = ii.inflateSetDictionary(n, i), a === ui ? a = ii.inflate(n, o) : a === mi && (a = fi)); n.avail_in > 0 && a === di && n.state.wrap & 2 && n.state.flags !== 0 && n.input[n.next_in] !== 0;) ii.inflateReset(n), a = ii.inflate(n, o);
		switch (a) {
			case pi:
			case mi:
			case fi:
			case hi: return this.onEnd(a), this.ended = !0, !1;
		}
		if (s = n.avail_out, n.next_out && (n.avail_out === 0 || a === di || o > 0)) {
			if (this.options.to === "string") {
				let e = vn.utf8border(n.output, n.next_out), t = n.next_out - e, i = vn.buf2string(n.output, e);
				n.next_out = t, n.avail_out = r - t, t && n.output.set(n.output.subarray(e, e + t), 0), this.onData(i);
			} else this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out)), n.avail_out = 0, n.next_out = 0;
		}
		if (a !== ui && a !== gi || s !== 0) {
			if (a === di) return a = ii.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
			if (n.avail_in === 0) {
				if (o === li) return a = ii.inflateEnd(this.strm), this.onEnd(a === ui ? gi : a), this.ended = !0, !1;
				break;
			}
		}
	}
	return !0;
}, vi.prototype.onData = function(e) {
	this.chunks.push(e);
}, vi.prototype.onEnd = function(e) {
	e === ui && (this.result = this.options.to === "string" ? this.chunks.join("") : pn.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function yi(e, t) {
	let n = new vi(t);
	if (n.push(e, !0), n.err) throw n.msg || Je[n.err];
	return n.result;
}
function bi(e, t) {
	return t ||= {}, t.raw = !0, yi(e, t);
}
var xi = {
	Inflate: vi,
	inflate: yi,
	inflateRaw: bi,
	ungzip: yi,
	constants: Ye
}, { Deflate: Si, deflate: Ci, deflateRaw: wi, gzip: Ti } = In, { Inflate: Ei, inflate: Di, inflateRaw: Oi, ungzip: ki } = xi, Ai = Ci, ji = Ei;
// node_modules/esptool-js/lib/util.js
function Mi(e, t, n = 255) {
	let r = e.length % t;
	if (r !== 0) {
		let i = new Uint8Array(t - r).fill(n), a = new Uint8Array(e.length + i.length);
		return a.set(e), a.set(i, e.length), a;
	}
	return e;
}
function Ni(e, t = 239) {
	for (let n = 0; n < e.length; n++) t ^= e[n];
	return t;
}
function Pi(e) {
	let t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
	return t;
}
function Fi(e) {
	return new Promise((t) => setTimeout(t, e));
}
// node_modules/esptool-js/lib/webserial.js
var Ii = class {
	constructor(e, t = !1, n = !0) {
		this.device = e, this.tracing = t, this.slipReaderEnabled = !1, this.baudrate = 0, this.traceLog = "", this.lastTraceTime = Date.now(), this.buffer = /* @__PURE__ */ new Uint8Array(), this.onDeviceLostCallback = null, this.SLIP_END = 192, this.SLIP_ESC = 219, this.SLIP_ESC_END = 220, this.SLIP_ESC_ESC = 221, this._DTR_state = !1, this.slipReaderEnabled = n;
	}
	setDeviceLostCallback(e) {
		this.onDeviceLostCallback = e;
	}
	updateDevice(e) {
		this.device = e, this.trace("Device reference updated");
	}
	getInfo() {
		let e = this.device.getInfo();
		return e.usbVendorId && e.usbProductId ? `WebSerial VendorID 0x${e.usbVendorId.toString(16)} ProductID 0x${e.usbProductId.toString(16)}` : "";
	}
	getVid() {
		return this.device.getInfo().usbVendorId;
	}
	getPid() {
		return this.device.getInfo().usbProductId;
	}
	trace(e) {
		let t = `TRACE ${(Date.now() - this.lastTraceTime).toFixed(3)} ${e}`;
		console.log(t), this.traceLog += t + "\n";
	}
	async returnTrace() {
		try {
			await navigator.clipboard.writeText(this.traceLog), console.log("Text copied to clipboard!");
		} catch (e) {
			console.error("Failed to copy text:", e);
		}
	}
	hexify(e) {
		return Array.from(e).map((e) => e.toString(16).padStart(2, "0")).join("").padEnd(16, " ");
	}
	hexConvert(e, t = !0) {
		if (t && e.length > 16) {
			let t = "", n = e;
			for (; n.length > 0;) {
				let e = n.slice(0, 16), r = String.fromCharCode(...e).split("").map((e) => e === " " || e >= " " && e <= "~" && e !== "  " ? e : ".").join("");
				n = n.slice(16), t += `\n    ${this.hexify(e.slice(0, 8))} ${this.hexify(e.slice(8))} | ${r}`;
			}
			return t;
		}
		return this.hexify(e);
	}
	slipWriter(e) {
		let t = [];
		t.push(192);
		for (let n = 0; n < e.length; n++) e[n] === 219 ? t.push(219, 221) : e[n] === 192 ? t.push(219, 220) : t.push(e[n]);
		return t.push(192), new Uint8Array(t);
	}
	async write(e) {
		let t = this.slipWriter(e);
		if (this.device.writable) {
			let e = this.device.writable.getWriter();
			this.tracing && this.trace(`Write ${t.length} bytes: ${this.hexConvert(t)}`), await e.write(t), e.releaseLock();
		}
	}
	appendArray(e, t) {
		let n = new Uint8Array(e.length + t.length);
		return n.set(e), n.set(t, e.length), n;
	}
	async readLoop() {
		for (; this.device.readable;) {
			this.reader = this.device.readable?.getReader();
			try {
				let { value: e, done: t } = await this.reader.read();
				if (t) {
					this.trace("Serial port done");
					break;
				}
				if (e && e.length) {
					let t = Uint8Array.from(e);
					this.buffer = this.appendArray(this.buffer, t);
				}
			} catch (e) {
				if (e instanceof Error) {
					if ([
						"BufferOverrunError",
						"FramingError",
						"BreakError",
						"ParityError"
					].includes(e.name)) {
						this.trace(`Recoverable serial port error: ${e.message}`);
						continue;
					}
					this.trace(`Unrecoverable serial port error: ${e.message}`);
					break;
				}
				if (e instanceof DOMException) {
					this.onDeviceLostCallback ? this.onDeviceLostCallback() : this.trace(`Unrecoverable serial port error: ${e.message}`);
					break;
				}
				this.trace(`Unrecoverable serial port error: ${e}`);
				break;
			} finally {
				this.reader.releaseLock();
			}
		}
		this.trace("readLoop exited");
	}
	flushInput() {
		this.buffer = /* @__PURE__ */ new Uint8Array();
	}
	async drainInput(e = 100, t = 400) {
		let n = Date.now() + t, r = -1;
		for (; Date.now() < n && this.buffer.length !== r;) r = this.buffer.length, await Fi(e);
		this.tracing && this.trace(`Drained ${this.buffer.length} bytes from serial buffer`), this.flushInput();
	}
	async flushOutput() {
		try {
			if (this.device.writable) {
				let e = this.device.writable.getWriter();
				await e.close(), e.releaseLock();
			}
		} catch (e) {
			this.trace(`Error while flushing output: ${e}`);
		}
	}
	inWaiting() {
		return this.buffer.length;
	}
	peek() {
		return this.buffer;
	}
	detectPanicHandler(e) {
		let t = /G?uru Meditation Error: (?:Core \d panic'ed \(([a-zA-Z ]*)\))?/, n = /F?atal exception \(\d+\): (?:([a-zA-Z ]*)?.*epc)?/, r = new TextDecoder("utf-8").decode(e), i = r.match(t) || r.match(n);
		if (i) {
			let e = i[1] || i[2], t = `Guru Meditation Error detected${e ? ` (${e})` : ""}`;
			throw Error(t);
		}
	}
	async read(e) {
		let t = null, n = !1, r = null;
		for (;;) {
			let i = Date.now();
			for (r = /* @__PURE__ */ new Uint8Array(); Date.now() - i < e;) if (this.buffer.length > 0) {
				r = this.buffer, this.buffer = /* @__PURE__ */ new Uint8Array();
				break;
			} else await Fi(1);
			if (!r || r.length === 0) {
				let e = t === null ? "Serial data stream stopped: Possible serial noise or corruption." : "No serial data received.";
				throw this.tracing && this.trace(e), new d(e);
			}
			this.tracing && this.trace(`Read ${r.length} bytes: ${this.hexConvert(r)}`);
			for (let e = 0; e < r.length; e++) {
				let i = r[e];
				if (t === null) {
					if (i === this.SLIP_END) t = /* @__PURE__ */ new Uint8Array();
					else {
						this.tracing && this.trace(`Read invalid data: ${this.hexConvert(r)}`);
						let e = this.buffer;
						throw this.tracing && this.trace(`Remaining data in serial buffer: ${this.hexConvert(e)}`), this.detectPanicHandler(new Uint8Array([...r, ...e || []])), new d(`Invalid head of packet (0x${i.toString(16)}): Possible serial noise or corruption.`);
					}
				} else if (n) {
					if (n = !1, i === this.SLIP_ESC_END) t = this.appendArray(t, new Uint8Array([this.SLIP_END]));
					else if (i === this.SLIP_ESC_ESC) t = this.appendArray(t, new Uint8Array([this.SLIP_ESC]));
					else {
						this.tracing && this.trace(`Read invalid data: ${this.hexConvert(r)}`);
						let e = this.buffer;
						throw this.tracing && this.trace(`Remaining data in serial buffer: ${this.hexConvert(e)}`), this.detectPanicHandler(new Uint8Array([...r, ...e || []])), new d(`Invalid SLIP escape (0xdb, 0x${i.toString(16)})`);
					}
				} else if (i === this.SLIP_ESC) n = !0;
				else if (i === this.SLIP_END) {
					if (this.tracing && this.trace(`Received full packet: ${this.hexConvert(t)}`), e + 1 < r.length) {
						let t = r.slice(e + 1);
						this.buffer = this.appendArray(t, this.buffer);
					}
					return t;
				} else t = this.appendArray(t, new Uint8Array([i]));
			}
		}
	}
	async rawRead(e, t) {
		let n;
		try {
			if (!this.device.readable) return;
			for (n = this.device.readable.getReader(), this.reader = n; !t();) {
				let { value: t, done: r } = await n.read();
				if (r || !t) break;
				this.tracing && this.trace(`Read ${t.length} bytes: ${this.hexConvert(t)}`), e(t);
			}
		} catch (e) {
			this.trace(`Error reading from serial port: ${e}`), e instanceof Error && e.name === "NetworkError" && e.message.includes("device has been lost") && (this.trace("Device lost detected (NetworkError)"), this.onDeviceLostCallback && this.onDeviceLostCallback());
		} finally {
			n?.releaseLock(), this.reader === n && (this.reader = void 0);
		}
	}
	async setRTS(e) {
		await this.device.setSignals({ requestToSend: e }), await this.setDTR(this._DTR_state);
	}
	async setDTR(e) {
		this._DTR_state = e, await this.device.setSignals({ dataTerminalReady: e });
	}
	async setSignals(e, t, n) {
		e && (this._DTR_state = e), await this.device.setSignals({
			dataTerminalReady: e,
			requestToSend: t,
			break: n
		});
	}
	async connect(e = 115200, t = {}) {
		await this.device.open({
			baudRate: e,
			dataBits: t?.dataBits,
			stopBits: t?.stopBits,
			bufferSize: t?.bufferSize,
			parity: t?.parity,
			flowControl: t?.flowControl
		}), this.baudrate = e;
	}
	async changeBaudrate(e, t = {}) {
		let n = this.device;
		return typeof n.setBaudRate == "function" ? (this.tracing && this.trace(`Changing host baud rate to ${e} in place`), await n.setBaudRate(e), this.baudrate = e, !1) : (this.tracing && this.trace(`Reopening serial port at ${e} baud`), await this.disconnect(), await Fi(50), await this.connect(e, t), await Fi(50), this.readLoop(), !0);
	}
	async waitForUnlock(e) {
		for (; this.device.readable && this.device.readable.locked || this.device.writable && this.device.writable.locked;) await Fi(e);
	}
	async disconnect() {
		this.device.readable?.locked && await this.reader?.cancel(), await this.waitForUnlock(400), await this.device.close(), this.reader = void 0;
	}
};
// node_modules/esptool-js/lib/reset.js
function Li(e) {
	return new Promise((t) => setTimeout(t, e));
}
var Ri = class {
	constructor(e, t) {
		this.resetDelay = t, this.transport = e;
	}
	async reset() {
		await this.transport.setSignals(!1, !0), await Li(100), await this.transport.setSignals(!0, !1), await Li(this.resetDelay), await this.transport.setSignals(!1, !1);
	}
}, zi = class {
	constructor(e) {
		this.transport = e;
	}
	async reset() {
		await this.transport.setRTS(!1), await this.transport.setDTR(!1), await Li(100), await this.transport.setDTR(!0), await this.transport.setRTS(!1), await Li(100), await this.transport.setRTS(!0), await this.transport.setDTR(!1), await this.transport.setRTS(!0), await Li(100), await this.transport.setRTS(!1), await this.transport.setDTR(!1);
	}
}, Bi = class {
	constructor(e, t = !1) {
		this.transport = e, this.usingUsbOtg = t, this.transport = e;
	}
	async reset() {
		this.usingUsbOtg ? (await Li(200), await this.transport.setRTS(!1), await Li(200)) : (await Li(100), await this.transport.setRTS(!1));
	}
};
function Vi(e) {
	let t = [
		"D",
		"R",
		"W"
	], n = e.split("|");
	for (let e of n) {
		let n = e[0], r = e.slice(1);
		if (!t.includes(n)) return !1;
		if (n === "D" || n === "R") {
			if (r !== "0" && r !== "1") return !1;
		} else if (n === "W") {
			let e = parseInt(r);
			if (isNaN(e) || e <= 0) return !1;
		}
	}
	return !0;
}
var Hi = class {
	constructor(e, t) {
		this.transport = e, this.sequenceString = t, this.transport = e;
	}
	async reset() {
		let e = {
			D: async (e) => await this.transport.setDTR(e),
			R: async (e) => await this.transport.setRTS(e),
			W: async (e) => await Li(e)
		};
		try {
			if (!Vi(this.sequenceString)) return;
			let t = this.sequenceString.split("|");
			for (let n of t) {
				let t = n[0], r = n.slice(1);
				t === "W" ? await e.W(Number(r)) : (t === "D" || t === "R") && await e[t](r === "1");
			}
		} catch {
			throw Error("Invalid custom reset sequence");
		}
	}
}, Ui = /* @__PURE__ */ s(((e, t) => {
	t.exports = function(e) {
		return atob(e);
	};
})), Wi = /* @__PURE__ */ c({
	bss_start: () => Xi,
	data: () => Ji,
	data_start: () => Yi,
	default: () => Zi,
	entry: () => Gi,
	text: () => Ki,
	text_start: () => qi
}), Gi, Ki, qi, Ji, Yi, Xi, Zi, Qi = o((() => {
	Gi = 0x400a902c, Ki = "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", qi = 0x400a8000, Ji = "AMD8PzyHCkBPSEFJAAAAAD2UCkBClApArpQKQLiUCkBnlQpA+pQKQAWUCkCllQpAIJYKQJmWCkCdmApASpYKQJ2YCkD+lgpAI5cKQDSXCkCulApAkZcKQKeXCkAUhQpALIIKQLCCCkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkA=", Yi = 0x3ffded6c, Xi = 0x3ffcc000, Zi = {
		entry: Gi,
		text: Ki,
		text_start: qi,
		data: Ji,
		data_start: Yi,
		bss_start: Xi
	};
})), $i = /* @__PURE__ */ c({
	bss_start: () => aa,
	data: () => ra,
	data_start: () => ia,
	default: () => oa,
	entry: () => ea,
	text: () => ta,
	text_start: () => na
}), ea, ta, na, ra, ia, aa, oa, sa = o((() => {
	ea = 0x40380f90, ta = "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", na = 0x40380000, ra = "+gU4QDxAyj9eEjhAahI4QLoSOEDMEjhAxhM4QEQTOEA2EjhACBQ4QI4UOEDmFDhA7BE4QKIUOEDsEThAYBU4QHAVOEB0FThAuhI4QMIVOEDcFThArAM4QFQBOECcAThAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhA", ia = 0x3fcb6d6c, aa = 0x3fca4000, oa = {
		entry: ea,
		text: ta,
		text_start: na,
		data: ra,
		data_start: ia,
		bss_start: aa
	};
})), ca = /* @__PURE__ */ c({
	bss_start: () => ma,
	data: () => fa,
	data_start: () => pa,
	default: () => ha,
	entry: () => la,
	text: () => ua,
	text_start: () => da
}), la, ua, da, fa, pa, ma, ha, ga = o((() => {
	la = 0x40380e9a, ua = "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", da = 0x40380000, fa = "wgY4QDhAyD+GEjhAkBI4QOASOEDyEjhA7BM4QGoTOEBeEjhALhQ4QLQUOEAMFThAFBI4QMgUOEAUEjhAhhU4QJYVOECaFThA4BI4QOgVOEACFjhA1gM4QFABOECYAThAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhA", pa = 0x3fc96d68, ma = 0x3fc84000, ha = {
		entry: la,
		text: ua,
		text_start: da,
		data: fa,
		data_start: pa,
		bss_start: ma
	};
})), _a = /* @__PURE__ */ c({
	bss_start: () => Ca,
	data: () => xa,
	data_start: () => Sa,
	default: () => wa,
	entry: () => va,
	text: () => ya,
	text_start: () => ba
}), va, ya, ba, xa, Sa, Ca, wa, Ta = o((() => {
	va = 0x408015d2, ya = "goABRYKAtweEQJOHBwCDxgcAEWaTBQYRs4a2AjeHhEATB8cdupayloPGxhCR6oPGBwCzhrYCupY2loNG1hCFyoPGBwAFRpFlFY6RZhN29g+ThgYRswbWAgFFupauloPFxhCd5YPG1hCF5iOAxwCDxgcAEWYTBgYRs4bGApFlupauliOkBhADxQcAMwXFAjqVgoC3B4RAA8cHAJFmE4YGERN39w8zB8cCt4eEQJOHxx2ThXYQupe2l2P2pQAFR6OG5xCCgCOkpxAFRyOG5xCCgLcHhECThwcAA8cHAIVGEWWZjpP29g8TCAURs4UGAzeHhEATB8cdupWqlQPG1RAJxqOA1wAJRYKAA8YHADMGBgM6liqWA0bWEBHGA8cHAKOA5wDNtwPGxRAJxqOA1wAFRYKAg8YHALOGBgM2lzqVA0fFEAFFddcDxwcAo4DnAMW3twWEQJOFBQADxxUAkWYThgYRMwfHAreHhECTh8cdPpc2lyMkBxADxxUAMwfHAj6XNpcjBgcQA8cVADMHxwK6l76Wo4YGEIKAUcEBESbKtzSFQJOExPCcQCLMSshOxlLEKoQGzhMFAAwzCbQAEwoADIKXkwmwDZxAYxWJAhMFAAyCl7cHhECThwcA3EORw4KX8kBiRNJEQkmySSJKBUUFYYKAA0UEAGMHRQFjDDUBgpcFBNG3EwWwDYKXnEATBcAN/beCl5xAEwXQDdW3goC3B4RAk4cHAJRH2Edj/OYAmEuURxOGFgCQx7MH1wAjgKcAgoCDxgcAEWYTBgYRs4bGAjeHhEATB8cdNpeRZjaXhUajBtcQI6gHACOqBwCCgEERIsQ3BIRAEwQEAFRIBsYFR6qHY4PmAglGY4bGBJHqkwYADGMX1QAcSIHHIyQEAFjIskAiREEBgoATBwAMYx3lABxEiccIRPE7IygEACMkBAAjKgQA8b8TB7ANYxLlAolHXMj5t1jIkwbADRMFAAxjiNcAkwbQDWOY1wATBbANIkSyQEEBLbeDRgQAEWYTBgYRs4bGAreHhECTh8cdtpeRZraXo4bnECMoBABdtwNHFQCDRwUAIgddj4NHJQADRTUAwgfZj2IFXY2CgEFlEwUF8IKAtwcAYJxHNwcAYBzLk/cXEJXLQREixEBPJsJKwAbGE3T0D4FEOoljmIQAskAiRJJEAklBAYKAAyUJAIUEE3X1D/U11beCgLf3AGDYR0ERIsQmwgbG2Mu+hBOERwAcQJGLkeeyQCJEkkRBAYKAiEATdfUPbT3lt0ERBsapMbcHhECyQJOHBwARZ4jLEwd3ENjHQQGCgAERIswmygbOI4AFAKqELoTtMRHJKsbxNzJFiUdjG/UAhUcjAPQAAUXyQGJE0kQFYYKANwaEQBMGBgCDRxYAkWaThgYRs4fXAjeHhEATB8cdkWW6l66Xg6eHEANFFgCcwDMF1QI6lcm3QREGxtE2acWTdzUA8eM3B4RAEwcHAINHhwHd64NHlwHF6xMGxwE3TgDwNwMA8LcIAOA3CADAgUayjrFD8XJ9Hn0T/Rh9GLcPAIATDwACs4d2ArqXzE+z9VUAk+UFIMzPzE+z9cUBzM/MT7P1ZQDMz8xPs/UVAczPzE+z9QUBzM/MT7Pl9QHMz5OXlgCql4UGXMKThwb+szfwAJMFxgCzB/BA7Y8cxi6G45Pm+7d3AWAjpNcF9EM3BgAg0Y70w4Vnk4cHArd2AWD80oVHIwz3ALJAQQGCgAERIswmygbOI4AFAKqELoR1NgXptweEQJOHBwADx5cBAeshNwFF8kBiRNJEBWGCgAOlhxqjjAcAmTZJNirG9TUyRYlHYxb1AIVHIwD0ANm/NwaEQBMGBgCDRxYAkWaThgYRs4fXAjeHhEATB8cdkWW6l66Xg6eHEANFFgCcwDMF1QI6lU23NzcAYBxDvYv1/4KAt3cBYJhDE2cXAJjDmEN5m5jDN4coAJjLtweEQJOHBwADp8caI4wHABhbIyIHACMmBwCCgANXJQCRR2MQ9wQ3BYVAEwXFP41nqpcDx1ewsWeThwdgBccYQbFnDeMNZkEREwYGsYFFBsaXAID/54Cg6rJAgUc+hUEBgoCxZz6FgoABEU7GtzkAYCLMJspKyFLEVsJawAbOKosuigFEAUmThMkCtwoACLk3I6AEACOgWQGDpwkA9f+cQIWLnc8FRZcAgP/ngICdkwcUADO3hwA6mT6E42pJ/WMUKgHj5mf9NwUAECUF8kBiRNJEQkmySSJKkkoCSwVhgoABRe23AREmyk7GsWS3+QBgIsxKyAbOKoQBSZEJk4QENQVFlwCA/+eAwJeDpwkAiYuB7wUJ4xaZ/gVF8kBiRNJEQkmySQVhgoC39wBggMMBRe23QREixCbCN/QAYLFkSsAGxgFJEQSThAQ1BUWXAID/54AgkxxAiYuB5wUJ4xeZ/hxAskCSRJPnFwAcwCJEAklBAYKAGXGi3KbaztYuhKqJsoSBRRMGoARICDbGht7K2JcAgP/ngKDWskYBRpnKA9dGBJMHAAQ6hmPz5wA+hkIGQYKTB6YAE5kHAYVHIwrxAJMHJgAjC/EAowqBABNZCQGBR5HCnEI+zGAIkc6D10YEmcsihZOFRgAyxpcAgP/ngEDRMkYylJPXhAAjAPQAg6eJAKMAlADKhUgIgpf2UGZU1lRGWbZZCWGCgBcDgP9nAAOIARG3dwFgIszAQwbOkxcEAWPUBwIhZ7d3AWCYyywAaACXEID/54BA2bJGNweEQBMHBwCx4iMMBwCTF8QAY9cHALd3AWA3BwgAmMuTF7QAY9cHALd3AWA3BxAAmMuTF6QAY9kHBGJE8kC3dwFgNwcgAJjLBWGJuyJGtwUAwP0VHELtjxzCkWUjJAca/RWcQgMlhxq5g+2PwgfBg6qXIyT3GmME1gCURv3yhUejDPcAITtht/JAYkQFYYKAQREixABFBsYihaU8GekTBUQAhTwqhAFFl/B//+eAIHwClLJAIkQBRUEBgoAIRQERBs4izLk0KoQFZRMFhTiX8H//54BAdpcAgP/ngADikxVFALPVhQIBRS7Gl/B//+eAQHiyRQFFl/B//+eAwHcFZRMFhTiX8H//54DgcvJAYkQBRQVhgoB5cZFnItT9FxOE9f8zNPQAEzcVABM0FABZjAbWNwcAECbSStBOzlLMGQdx4JN5NQBjnwkKtwSEQO2Pk4QEABOXBwGThwQYlFtxdkGD8Y7ZjpTblFs3RgDwfRbxjjoHVY+Y25hbtwYA8P0WdY+Y25hbtwYA4P0WdY+Y25hbtwYAQMjbVY+Y25hbtwYAgDd5AWBVj5jbI6wEGrd3AWA3BxcAmMu3hwFg7NeThQQbLoU3Sg8AlxCA/+eAoL0RCRMKCiQFRZfwf//ngKBlgycJABPXFwEliynjhQnjlEn/g6fEGhNHFAByByOqBwAjrAcAslAiVJJUAlnySWJKEzUXAEVhgoATl7cA41sH/Ld3AWA3BxAAmMvht4MnCQATl+cA41IH/rd3AWA3BwcAmMtsACgAlxCA/+eAQLYFRE23tweGQAOlx/4X83//ZwCDcBxRVFFMQRBFGEkDKIUBgyjFAQMjhQIDTgUDNwUAQAMvRQF5cQVFNsI+wAbWiU5yyCrGGsSTBwACoUZj+e4Bl+CC/+eAoPSyUEVhgoCXwIL/54Agl82/s2fFAI2Lzeu3B4RAg8fHG1lxhtai1KbSytDOztLM1srayN7G4sTmwr3PqoQJZS6JEwUFcYFFMoQ1NrcHABClBxHpQUsFSpFLMUyhSpMMAAIF4IFHtlAmVJZUBln2SWZK1kpGS7ZLJkyWTD6FZWGCgKKJY3OLAMFJk5c5AGgAJs5K2FLGXshiylbMZtBW0gLUAtY+2lLcIw4BAjMENEExN06ZzpR1t5fwf//ngIBfVdG3BwAQkQd5v7cHABCJBz6FgoBVcaLFAEWmw4bHysFO31LdVtta2V7XYtVm02rRbs8TAQGAEwEBgKqEEwWEAO/wz/aFZ2PvpxAqjCKF7/Dv9aqKEwVEAO/wT/XcRKqMEwoBCdxDZomBS4KXCBgjJgr4AUuXAID/54BAuxFNYxMJAoMnyvhj75cBCBAMGJcAgP/ngCC63ETBRQgQnEeClwFFuaDcRJMFsQEIEJxDgpeDR7r4qoWxz9xE3EOCl+MCCfzjEXv/4oljc4kByomT9zoAE4Y5AD6WIAFxmqKFE/XK/z7GvTWyRzHBMWUTBQVAhWIWkb5ALkSeRA5J+llqWtpaSlu6WypcmlwKXfpNaWGCgFXVgycK+eOZp/dqhmgIlwCA/+eAwIKFC3m3sw30AInL7oVOhiKFlwCA/+eAgIGijU6G7oUIGJcAgP/ngECu3ETOhW6FnEfOmjMJOUGClwULMb8xZWm3eXEi1CbSStBOzlLMVsoG1hMBAYATAQGAhUeuhKqKMokjAPYAAUSFaQwIfVpjfZQCM4aEQGPzyQAFZjMFVAEyxi7EZTMd7TJGokWBRwmCLodjFfYAhWc+lNG/FEMRB2OARgMjAAkAAUWFYhaRslAiVJJUAlnySWJK0kpFYYKAhQfBvzFlEwUFQMW3A1clAMFHYxf3CnVxIsUARQbHJsNKwc7e0tzW2trYEwEBgBMBAYAihS6L7/AP2RN6xf8TeTUAEwVEAO/wD9iqhCgIlwCA/+eAQJ+FapMJAQeF5FqFLAiXAID/54CAngFFhWIWkbpAKkSaRApJ9llmWtZaRltJYYKAMwSZAGPzigAFZA0EcZgihs6FUoXROQ3lMwYkQWPzxAAmhrOFKQEoCDLGlwCA/+eAgJkyRiKaAUmRjHm/MWWCgDFlEwUFQE23XXERRzrISUc6yiFHhUc6zCrOEwcAAmgAhsY+xjrQAtIu1DLWAtgC2j7cIw7xAjE5tkBhYYKAtweEQIPHxxtdcYbGosSmwsrATt5S3FbaWthe1mLUZtJq0G7OY4oHIpMJ9j+zt8kA2geT2akAvpmdZ5OHB1OzivkCKokuirKEs7n5AmOLBhqzZ8UANwQAEL2LDQRjmAcUl/B//+eAQCe3JwBgI6IHNJfwf//ngMApNwQAEGMUBRJWhc6F7/Cv9CqEYxoFELcnAGCThwc0PsC3JwBgk4cHMD7CtycAYJOHhzQ+xLcnAGCTh8c0fU2TDfADPsYFS/3AE3X5AxN3+Q9J5WP4nQiTBvfzkwsABGP13QiCRxPXWwBehpjDkkfShT6Vl/B//+eAoFeiRyOgJwGyRyOgZwEZNjPnOgE15zcnAGCDJoc1CUdjl+YINycAYCMoZzU3JwBggyaHNQ1HY5zmBhOWOwCBRUqFfRZZPTcnAGAjKmc1VoXOhe/wz+gh7V6aXpmzhHRBvbeTdvkBwUvJ8sFL43+d9hMH9/EzN+0AkxtHAMELtbfWjE6Mk7UcAAVFMwy8QJfwf//ngGAGNyYAYBMGhjUIQv0cCUiz5YwBYwoFA+H9NwQAECUEl/B//+eAQBO2QCKFJkSWRAZJ8lliWtJaQluyWyJcklwCXfJNYWGCgDcmAGAjKGY1odUFRZfwf//ngMAANyYAYBMGhjUMQg1I448F85O1HAAzDLxA/Ryz5YwB4f15v1aFzoXv8I/cAekTCwAQkwsAApnkAURRvzcEABAlBHG3E3T5DzMEi0Cmh2P0mwCTBwACY/OHAD6E6TLShUqFExY0AFkzVoXOhe/wT9hx9SKaIpmBjH2/kcqX8H//54AgB1XZNwQAECEEibeX8H//54CACf23XXGmwqqECWXKwBMFBXEuiYFFhsaixO/wL9Qd7SqEhToVRzrIIUeFRzrMaAATBwACPsZKyibOOtAC0gLUAtYC2ALaPtwjDvECmTq2QCKFJkSWRAZJYWGCgDcEABAlBPW3eXFexmLErosqjIFFAUUG1iLUJtJK0E7OUsxWylrIZsLv8I/NFcG3BAAQpQSyUCJUAlnySWJK0kpCS7JLIkySTCaFklRFYYKAg6kLAKqE448J/EFkAykMAGPmiQCTFwkBwYOdz5MXSQHZ44FHBWQ3B4RAA0fHGx3HkwXADZnjkwUQAkqFMT9F8SKZs4eJQDO0iQB9FCMgLAF9jCOgiwB5t4VH8be3DAABE4v8/zc6AGAze2kBkwpKAJnP7/Bfh+/w77q3B4AAI6BqASMg+gCDJwoA9f9Vv+/wn4Xv8C+5I6BqASMgmgGDJwoA9f9xv7cEABCZBCW/eXEi1Dc0hUATBMQ/gyfEsAbWJtKZ5wFFslAiVJJURWGCgLcEhECThAQAg8fUG7njtweGQIOnx/4DJYSwEwbxAcxHLsaFPGn5g0fxAbJFhcMDJ4SwgyfEsC6XIyTksD6HY/P1AC6HmY8jJvSwdbeFR6OO9Bq3NYVANzWFQJOFhfATBUXwWTVB2bcHAPDdFz6VWdExZRMFBUBBtxP3tf/BR2MX9wx5cSLUNwSFQC7GBtYTBMQ/JtJK0KqETs5SzFbKMopayO/wT4MIwKqJE4VEAO/wj4JIwCqJE4WEAO/wz4EIxCqLE4XEAO/wD4GyRUjE0UeqigFFY5j1ABOFBAHv4L//MzWgAA1nIpeFRyMCp7CjAvewYwgKADMJaQMjKgQAIygkAbcHhkCDp8f+3EczBvBA/RfOl9aXs/bKAPGPlY8jJvewtweEQCMk17CjjgcaRT0BxTFlEwUFQLJQIlSSVAJZ8kliStJKQktFYYKAMWWCgHlxTs63CYVAk4nJP1LMA6rJACLUDWQm0krQBtZWyiqJroQumk6UgyeEsGPtRwOZzINHRLADpckAocezZ5UAvYuFRp3jJobKha08Ge2DpwkAAUWFjyOg+QCDp8kAppcjpvkAMaAtNWHRMWUTBQVAslAiVJJUAlnySWJK0kpFYYKAk3c1AJHnk/c0ALHjgUZdvxN6xf8zBKpAEQRj84QAJoSTCsEAfVcihsqFM4X6ADrGl/B//+eAYAeBRhFG1oVShQk0XfEimREKM4SEQCGgE3rF/yaEk3rE/2OMCgCBRlaGyoVShfk6SfFWmTMEVEFWmjHc/VcihsqFaAA+xpfwf//ngKACgUYRRmwAUoU1v11xVtqDKoUAWtiGxlaFosSmwsrATt5S3F7WYtTv4N/lKosThUoA7+A/5QnptweEQDc3hUCTh8cdIyj38Lc0hUC3C4RAtwmFQBM4FQBaiQVEk4TE8BOKyx2Tick/YwQJAGNIgAAxZRMFBXB9hGGNaaDYQKFnSs4zB0dBmY8+zIOnCQFjdPkAE2goAELG1Tk14TJI2ECTBQsBs4UlQTcFhUA8CNaVk4bLHXAIEwUFQZfwf//ngKC6zEDiR3JMKoS+lYOnCQHMwLOHh0EjqPkAt4eEQJOHxx1j8/UAAemzhUVBUoUBPRnlI6JEATMJiUEBSLW3MWUTBQVAtkAmRJZEBknyWWJa0lpCW7JbIlxhYYKAg1UlALcHhUCDp8c/wRXCBcGBY/O3AL6FCEVBBdmzFXG3B4RANzeFQKLNhs+my8rJzsfSxdbD2sFe32LdZttq2W7XgBGThwcAEwfH8GPv5xa3BwBAA6dHAYVHY+znFpfwf//ngGCqgURjHQUWgUUBRZfwf//ngMC8tzcAYJhPtwYAgDcKhkBVj5jPl/B//+eAYLSDJ8r+KUe3BQACiEOTd/UPk4bn/mNp1wCFRbOV9QC3BwABY/e3ALcHhEAFRyOO5xpBZpMH9v8TBwAQhWaX8H//54DgrolHY4n0Fo1HY5D0JJcAgP/ngGDstweEQJOHBwC+hCOmpxrv4L/vt3cBYJOHhwqYQ4VFSUUTZxcAmMO3dwFgBWf40yOMBACjjAQAt3cBYCOkBBqxByOgBwC+hH1Xt3cBYJjLtwcBYBMHIAIjqucQl/B//+eAwAS3BYBAAUaThQV+SUWX8H//54AABjcFBACX8H//54DABbeHKACcwDc5hUDv4F/REwkJ9rdXQUmTh/eEIyL09IMniQCRRRMFRPSCl7cHhECThwcAtzmFQCMu9PKTiUnxgycJAJMFNPQTBYT0gpeDRzT0KotjgQcggydJAIKXzbcjoAcAkQe1vZcAgP/ngCDd4wIF6I1EAagDR4UBjUeBROMR9+iJRBMFAAyX8H//54DAiTdnCWATB8cRHEO3Bv3//RaT9wfwk+c3ABzDN2cJYBMHBxEcQwllEwUFcfWPtwYCANWPHMO3Zwlgk4dHFJhDE2cXAJjDl/B//+eAgIQVtbcnC2CThwfDmEO3BgCANyYLYFWPmMO3JgtgN0fYUJOGhsETBxeqmMIjIAbAI6AGAJRDNwYAQIVF0Y6Uw7cnC2CThwfCmMM3JwtgEwfHwRRDNwYEAEVF0Y4UwyOgBwATBxACtwcBYCOs5wyX8H//54DA7bf3AGB9V7cFgEDYywFGk4WFOEVFl/B//+eAgO639wBgmEs3BQIAE2dHAJjLl/B//+eAgO23B4BANzeFQJOHJ2ojJvfwtweAQDcHhECThwdvIyL3ADc5hUDv4B+vEwnJ9o21CWUTBQVxl+B//+eAQHYBRZfgf//ngGB5twcAYPhT/XaNBnWPE2eHAvjT+FMTZxcA+NO3BwBgk4eHCQVHmMOYQwWLdf83BwBgXFO3BYBAAUaT9wfwk+cHAlzTtwcAYH1XmMuThSU0FUWX8H//54Ag47cHAGDYRxMFAAITZxcQ2MeX8H//54Ag4rcHgECTh4d9NzeFQCMm9/C3B4RAI6IHAIm/4wUF3oNHBQCDRBUAkcsxZoFGEwYGMKaFSoXv4F/a1bODSjUAg0clAAMnhPSiCrPq+gCTh4oAYwX3AIFGMWbhvxEF7+B/loMnxPOTC4sAIwiU9AOmBxyjCAT0IxlU9SMqpPQjLHT1Iy4k9SqMGcqBRqaFSoXv4L/UgyfE8yOgBxxJsxMGwASBRRMFRPeX8H//54CAq9FHY+CXAoVHY/uXApOH5P+T9/cPSUdjYPcEigfOl5xDgoeTByANY4n0SGPilwKTBwANY4v0SJMHEA1jjPRIgyfE8zFlEwUFMCOgpxzJopMHMA3jjvTQk4e0ApP39w9pR+Nv9/wTBsAEgUUTBUT3l/B//+eAIKQTh7TytzeFQAoHk4cH9rqXnE+TBkT3VobehSaFgpeDJ8TzI6CnHIMnxPvNwwMnxPMjIvccYaiTB0ACY5f6PJ1KAyXE9YFGAUahRf0a7+CfxuOYCv6DJ8TzI6AHHNmgAUbWhV6F7/DP/bGovUdj8VcdtzeFQIPHF/BjiwcYwRpehcIK7+DfgZPaCgFjHVUPgUcTB/AOY+1XAWMb7DK3F4BAk4dHWwMnxPMjIvccjaizBvsAg8aGAYUHNY/pvxMFBPXv4N+pgyfE8yOgpxw5yemgwUdjm/oyXoXv4G/8gyfE8yOkpxwTBcsA7+Bv+4MnxPMjpqccMwVbAe/gb/qDJ8TzI6inHBMFSwHv4G/5gyfE8wMnxPMjqqcchUcjDPccIyAHHJMGRPcBRqaFSoXv4J+4gyfE8yOgBxyDp0cc444HuhMFBPWCl4MnxPMjoKccI6IHHF22vUdj/FcNgyfE84PHhx3Vx16F7+CP84MnxPOqi4Onhxxj6KcAwRrCCpPaCgFjB1UDAyfE87Vnk4cHkDVlIyD3HBMFBZAqhoFGpoVKhe/gX7GDJ8TzI6IHHFG3gyfE8yqGkwWLAQOlRx2TigcYl/B//+eA4IeDp0oF3pcjqvoEg6eKBLOHd0EjpPoEnb2hR2OT+iKDJ8Tzg8eHHYXDgyfE81FGgUUThYccl/B//+eA4IO3F4BAk4eniWG9AyfE87Fnk4cHYDFlIyD3HBMFBWCdv2OFCgCT9/oAgc8DJ8TztWeThweANWUjIPccEwUFgJm/E91KAP1dgUqDK4T1k5dKAL6bXoXv4G/kqowThUsA7+DP4yqME4WLAO/gL+MqixOFywDv4I/il+B//+eAQDSzd2wBYwq7AQOnDAATS/v/M3vrALPnZwGFCiOg/ACTlwoBwYPj46f7bbORR2Od+hRehe/gr94cQSMq9PZZu5FHY5P6FF6F7+Bv3aqKVUWX8H//54BgnkVFl/B//+eAwJ1ZRZfwf//ngCCdQUWX8H//54CAnIFFVoWX4H//54CAR4m74UdjkfoQXoXv4C/ZqooTBcsA7+CP2CMmpPITBQsB7+DP1yMopPITBUsB7+AP1yMqpPITBYsB7+BP1iMspPITBcsB7+CP1QMnhPODJkTzAyYE84MlxPKqh1aFl+B//+eAQDnjBwXOAyfE87Fnk4cHQDFlIyD3HBMFBUApvaFHY5P6CLcXgECTh2eMGbsFRvmxvUdj+VcHtzeFQIPHF/DjhgfmXoXv4G/PWpWTB/AOYxmrAGMc/AC3F4BAk4dHSs2xA0eLAQULuY/dtwMnxPOxZ5OHBxAxZSMg9xwTBQUQXbuTBYT3EwUE9e/gn++DJ8TzI6CnHMFHIxz0+vmxCotjigoAWoEDJ8TzsWcxZSMg9xxRsxMGBPaBRQFFl+B//+eAQCJl8VFGkwUE9hMFhPeX4H//54DAYNFHIxz0+hG5wUfjkvr8txeAQJOHR7iRuZfgf//ngEAmMbehR+OV+vpehe/gr8OqiiMmpPQTBcsA7+DPwoMnyv4jIKT23Eez+voC45IK+DN39QI1/5OK9/+qmrPa+gL1Z5OHB0wBS7OK+gKDJwT2gcez52oBkedWhdqF7+BP7321kwUE9hMFxPTv8O+eBUWX4H//54BgD5O3GgAzC/tA/RrptwAA", ba = 0x40800000, xa = "2AeAQNwBhEDcGoBA6BqAQDobgEBOG4BAXhyAQNIbgEC0GoBAohyAQCodgECCHYBAXhqAQD4dgEBeGoBA/h2AQA4egEASHoBAOhuAQGIegEB+HoBAFAWAQFABgEAgCYBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", Sa = 0x40852f0c, Ca = 0x40840000, wa = {
		entry: va,
		text: ya,
		text_start: ba,
		data: xa,
		data_start: Sa,
		bss_start: Ca
	};
})), Ea = /* @__PURE__ */ c({
	bss_start: () => Ma,
	data: () => Aa,
	data_start: () => ja,
	default: () => Na,
	entry: () => Da,
	text: () => Oa,
	text_start: () => ka
}), Da, Oa, ka, Aa, ja, Ma, Na, Pa = o((() => {
	Da = 0x408011bc, Oa = "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", ka = 0x40800000, Aa = "4AeAQNwBhEB2FoBAghaAQNQWgEDoFoBA+BeAQGwXgEBOFoBAPBiAQMQYgEAcGYBA+BWAQNgYgED4FYBAmBmAQKgZgECsGYBA1BaAQPwZgEAYGoBAFAWAQFABgEAoCYBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", ja = 0x40852f0c, Ma = 0x40840000, Na = {
		entry: Da,
		text: Oa,
		text_start: ka,
		data: Aa,
		data_start: ja,
		bss_start: Ma
	};
})), Fa = /* @__PURE__ */ c({
	bss_start: () => Va,
	data: () => za,
	data_start: () => Ba,
	default: () => Ha,
	entry: () => Ia,
	text: () => La,
	text_start: () => Ra
}), Ia, La, Ra, za, Ba, Va, Ha, Ua = o((() => {
	Ia = 0x40801130, La = "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", Ra = 0x40800000, za = "ugaAQDhAgEBCFYBATBWAQJwVgECuFYBAqBaAQCYWgEAaFYBA6haAQHAXgEDIF4BA0BSAQIQXgEDQFIBAQhiAQFIYgEBWGIBAnBWAQKQYgEC+GIBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", Ba = 0x40816d68, Va = 0x40804000, Ha = {
		entry: Ia,
		text: La,
		text_start: Ra,
		data: za,
		data_start: Ba,
		bss_start: Va
	};
})), Wa = /* @__PURE__ */ c({
	bss_start: () => Xa,
	data: () => Ja,
	data_start: () => Ya,
	default: () => Za,
	entry: () => Ga,
	text: () => Ka,
	text_start: () => qa
}), Ga, Ka, qa, Ja, Ya, Xa, Za, Qa = o((() => {
	Ga = 0x40800e92, Ka = "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", qa = 0x40800000, Ja = "ugaAQDgAg0CSEoBAnBKAQOwSgED+EoBA+BOAQHYTgEBqEoBAOhSAQMAUgEAYFYBAIBKAQNQUgEAgEoBAkhWAQKIVgECmFYBA7BKAQPQVgEAOFoBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", Ya = 0x40842d68, Xa = 0x40830000, Za = {
		entry: Ga,
		text: Ka,
		text_start: qa,
		data: Ja,
		data_start: Ya,
		bss_start: Xa
	};
})), $a = /* @__PURE__ */ c({
	bss_start: () => ao,
	data: () => ro,
	data_start: () => io,
	default: () => oo,
	entry: () => eo,
	text: () => to,
	text_start: () => no
}), eo, to, no, ro, io, ao, oo, so = o((() => {
	eo = 0x40810e92, to = "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", no = 0x40810000, ro = "ugaBQDgAg0CmEoFAsBKBQAATgUASE4FADBSBQIoTgUB+EoFAThSBQNQUgUAsFYFANBKBQOgUgUA0EoFAphWBQLYVgUC6FYFAABOBQAgWgUAiFoFA1gOBQFABgUCYAYFAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FA", io = 0x40842d68, ao = 0x40830000, oo = {
		entry: eo,
		text: to,
		text_start: no,
		data: ro,
		data_start: io,
		bss_start: ao
	};
})), co = /* @__PURE__ */ c({
	bss_start: () => ho,
	data: () => po,
	data_start: () => mo,
	default: () => go,
	entry: () => lo,
	text: () => uo,
	text_start: () => fo
}), lo, uo, fo, po, mo, ho, go, _o = o((() => {
	lo = 0x4ff11456, uo = "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", fo = 0x4ff10000, po = "KgfxT4gA9U9OG/FPWhvxT6ob8U+8G/FPwhzxTzYc8U8mG/FPBB3xT5Ad8U+2HfFP3BrxT6Qd8U/cGvFPMB7xT0Ae8U9EHvFPqhvxT5Ie8U+sHvFP0APxT0oB8U+SAfFPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FP", mo = 0x4ff62db8, ho = 0x4ff50000, go = {
		entry: lo,
		text: uo,
		text_start: fo,
		data: po,
		data_start: mo,
		bss_start: ho
	};
})), vo = /* @__PURE__ */ c({
	bss_start: () => wo,
	data: () => So,
	data_start: () => Co,
	default: () => To,
	entry: () => yo,
	text: () => bo,
	text_start: () => xo
}), yo, bo, xo, So, Co, wo, To, Eo = o((() => {
	yo = 0x4ff51456, bo = "twf2T5OHBwCDxgcAEWaTBQYRs4a2AjeH9k8TB4cIupayloPGxhCR6oPGBwCzhrYCupY2loNG1hCFyoPGBwAFRpFlFY6RZhN29g+ThgYRswbWAgFFupauloPFxhCd5YPG1hCF5iOAxwCDxgcAEWYTBgYRs4bGApFlupauliOkBhADxQcAMwXFAjqVgoC3B/ZPA8cHAJFmE4YGERN39w8zB8cCt4f2T5OHhwiThXYQupe2l2P2pQAFR6OG5xCCgCOkpxAFRyOG5xCCgLcH9k+ThwcAA8cHAIVGEWWZjpP29g8TCAURs4UGAzeH9k8TB4cIupWqlQPG1RAJxqOA1wAJRYKAA8YHADMGBgM6liqWA0bWEBHGA8cHAKOA5wDNtwPGxRAJxqOA1wAFRYKAg8YHALOGBgM2lzqVA0fFEAFFddcDxwcAo4DnAMW3twX2T5OFBQADxxUAkWYThgYRMwfHAreH9k+Th4cIPpc2lyMkBxADxxUAMwfHAj6XNpcjBgcQA8cVADMHxwK6l76Wo4YGEIKAUcEBESbKtzT3T5OEhNucQCLMSshOxlLEKoQGzhMFAAwzCbQAEwoADIKXkwmwDZxAYxWJAhMFAAyCl7cH9k+ThwcA3EORw4KX8kBiRNJEQkmySSJKBUUFYYKAA0UEAGMHRQFjDDUBgpcFBNG3EwWwDYKXnEATBcAN/beCl5xAEwXQDdW3goC3B/ZPk4cHAJRH2Edj/OYAmEuURxOGFgCQx7MH1wAjgKcAgoCDxgcAEWYTBgYRs4bGAjeH9k8TB4cINpeRZjaXhUajBtcQI6gHACOqBwCCgEERIsQ3BPZPEwQEAFRIBsYFR6qHY4PmAglGY4bGBJHqkwYADGMX1QAcSIHHIyQEAFjIskAiREEBgoATBwAMYx3lABxEiccIRPE7IygEACMkBAAjKgQA8b8TB7ANYxLlAolHXMj5t1jIkwbADRMFAAxjiNcAkwbQDWOY1wATBbANIkSyQEEBLbeDRgQAEWYTBgYRs4bGAreH9k+Th4cItpeRZraXo4bnECMoBABdtwNHFQCDRwUAIgddj4NHJQADRTUAwgfZj2IFXY2CgEFlEwUF8IKAt6cMUJxHN6cMUBzLk/cXEJXLQREixEBPJsJKwAbGE3T0D4FEOoljmIQAskAiRJJEAklBAYKAAyUJAIUEE3X1D/U11beCgLcnDVDYR0ERIsQmwgbG2Mu+hBOERwAcQJGLkeeyQCJEkkRBAYKAiEATdfUPbT3lt0ERBsapMbcH9k+yQJOHBwARZ4jLEwd3ENjHQQGCgAERIswmygbOI4AFAKqELoTtMRHJKsbxNzJFiUdjG/UAhUcjAPQAAUXyQGJE0kQFYYKANwb2TxMGBgCDRxYAkWaThgYRs4fXAjeH9k8TB4cIkWW6l66Xg6eHEANFFgCcwDMF1QI6lcm34bYBESLMBs4jgAUALsYqhEkxskUZ5e03AUXyQGJEBWGCgIlHYxb1AIVHI4D1AO23Nwb2TxMGBgCDRxYAkWaThgYRs4fXAjeH9k8TB4cIkWW6l66Xg6eHEANFFgAcwDMF1QI6lV2/AUWCgDfXCFAcQ72L9f8cQ5P3Bw/1+4KAt2cOUNhDkQcTZwcBmMOYQ0GLdf+CgAERTsa32QhQIswmykrIUsRWwlrABs4qiy6KAUQBSZOEyQK3CgAIRT8joAQAI6BZAYOnCQD1/5xAhYudzwVFlwDL/+eAILOTBxQAM7eHADqZPoTjakn9YxQqAePmZ/03BQAQJQXyQGJE0kRCSbJJIkqSSgJLBWGCgAFF7bcBESbKTsaxZLcpDVAizErIBs4qhAFJkQmThAQ1BUWXAMv/54BgrYOnCQCJi4HvBQnjFpn+BUXyQGJE0kRCSbJJBWGCgLcnDVCAwwFF7bdBESLEJsI3JA1QsWRKwAbGAUkRBJOEBDUFRZcAy//ngMCoHECJi4HnBQnjF5n+HECyQJJEk+cXABzAIkQCSUEBgoADVyUAkUdjEPcENwX3TxMFhSqNZ6qXA8dXsLFnk4cHYAXHGEGxZw3jDWZBERMGBrGBRQbGlwDL/+eAwMWyQIFHPoVBAYKAsWc+hYKAGXGi3KbaztYuhKqJsoSBRRMGoARICDbGht7K2JcAy//ngIDCskYBRpnKA9dGBJMHAAQ6hmPz5wA+hkIGQYKTB6YAE5kHAYVHIwrxAJMHJgAjC/EAowqBABNZCQGBR5HCnEI+zGAIkc6D10YEmcsihZOFRgAyxpcAy//ngCC9MkYylJPXhAAjAPQAg6eJAKMAlADKhUgIgpf2UGZU1lRGWbZZCWGCgEERIsQ3BPZPEwQEALcH/E8QTAOlR/2TBcQBBsaXAMv/54CgHrJAIywEACJEQQGCgLcH9k+ThwcAlE8ThxYAmM+2lyOOpwCTBwAEYxn3AEERBsZ9N7JAAUVBAYKAAUWCgBcDy/9nAOOSAREGziLMJsrxV2Of9QI3BPZPqoQTBAQAJoWXAMv/54CAGGNHoADyQGJE0kQFYYKABUZsACaFlwDL/+eAABd8TANFwQCCl8m//VfjnvX8cACJRQLGlwDL/+eAIBgyR7cH9k+ThwcAGee0UwVGY5TGACOC1wa400W/QREixABFBsYihY02GekTBUQAqT4qhAFFlwDL/+eAIIsClLJAIkQBRUEBgoC3B/xPA6WH/hcDy/9nAGOYAREizCqEBWUTBYU4Bs4uxpcAy//ngGCElwDL/+eAINWyRRIFs1W1AiKFLsaXAMv/54BghrJFIoWXAMv/54DghWJE8kAFZRMFhTgFYRcDy/9nAKOACEVBEQbG2TyqhQFFRTeyQAFFQQGCgLcHwE+DrkcBeXEG1glPTEEQRRhJAyiFAYMoxQEcUVRRAyOFAgNOBQMFRWOR7gM2wj7AcsgqxhrEkwcAAqFGlwDM/+eAIKmyUEVhgoAVT2Of7gE2wj7AcsgqxhrEkwcAAqFGlwDM/+eAIBPxvxFPY2/fATbCPsByyCrGGsSTBwACoUaX8Mv/54BAWnW/NsI+wBlPcsgqxhrEkwcAAqFGY5fuAZcAzP/ngOAWcb+XAMz/54BAJEm/s2fFAI2Lzeu3B/ZPg8dXBllxhtai1KbSytDOztLM1srayN7G4sTmwr3PqoQJZS6JEwUFcYFFMoR5NrcHABClBxHpQUsFSpFLMUyhSpMMAAIF4IFHtlAmVJZUBln2SWZK1kpGS7ZLJkyWTD6FZWGCgKKJY3OLAMFJk5c5AGgAJs5K2FLGXshiylbMZtBW0gLUAtY+2lLcIw4BAjMENEF1NU6ZzpR1t5fwyv/ngMB6VdG3BwAQkQd5v7cHABCJBz6FgoBVcaLFAEWmw4bHysFO31LdVtta2V7XYtVm02rRbs8TAQGAEwEBgKqEEwWEAA0yhWdj7acQKowihRk6qooTBUQAOTLcRKqMEwoBCdxDZomBS4KXCBgjJgr4AUuXAMv/54DguxFNYxMJAoMnyvhj75cBCBAMGJcAy//ngMC63ETBRQgQnEeClwFFuaDcRJMFsQEIEJxDgpeDR7r4qoWxz9xE3EOCl+MCCfzjEXv/4oljc4kByomT9zoAE4Y5AD6WIAFxmqKFE/XK/z7GlT2yRzHBMWUTBQVAhWIWkb5ALkSeRA5J+llqWtpaSlu6WypcmlwKXfpNaWGCgFXVgycK+eOZp/dqhmgIl/DK/+eA4HmFC3m3sw30AInL7oVOhiKFl/DK/+eAoHiijU6G7oUIGJcAy//ngOCu3ETOhW6FnEfOmjMJOUGClwULMb8xZWm3eXEi1CbSStBOzlLMVsoG1hMBAYATAQGAhUeuhKqKMokjAPYAAUSFaQwIfVpjfZQCM4aEQGPzyQAFZjMFVAEyxi7EfTMd7TJGokWBRwmCLodjFfYAhWc+lNG/FEMRB2OARgMjAAkAAUWFYhaRslAiVJJUAlnySWJK0kpFYYKAhQfBvzFlEwUFQMW3A1clAMFHYxf3CnVxIsUARQbHJsNKwc7e0tzW2trYEwEBgBMBAYAihS6L7/DP9BN6xf8TeTUAEwVEAO/wz/OqhCgIlwDL/+eA4J+FapMJAQeF5FqFLAiXAMv/54AgnwFFhWIWkbpAKkSaRApJ9llmWtZaRltJYYKAMwSZAGPzigAFZA0EcZgihs6FUoXpOQ3lMwYkQWPzxAAmhrOFKQEoCDLGlwDL/+eAIJoyRiKaAUmRjHm/MWWCgDFlEwUFQE23XXERRzrISUc6yiFHhUc6zCrOEwcAAmgAhsY+xjrQAtIu1DLWAtgC2j7cIw7xAsk2tkBhYYKAtwf2T4PHVwZdcYbGosSmwsrATt5S3FbaWthe1mLUZtJq0G7OY4oHIpMJ9j+zt8kA2geT2akAvpmdZ5OHB1OzivkCKokuirKEs7n5AmOLBhqzZ8UANwQAEL2LDQRjmAcUl/DK/+eA4EK3xwhQI6IHNJfwyv/ngGBFNwQAEGMUBRJWhc6F7/Av+yqEYxoFELfHCFCThwc0PsC3xwhQk4cHMD7Ct8cIUJOHhzQ+xLfHCFCTh8c0fU2TDfADPsYFS/3AE3X5AxN3+Q9J5WP4nQiTBvfzkwsABGP13QiCRxPXWwBehpjDkkfShT6Vl/DK/+eAwE6iRyOgJwGyRyOgZwGJNDPnOgE15zfHCFCDJoc1CUdjl+YIN8cIUCMoZzU3xwhQgyaHNQ1HY5zmBhOWOwCBRUqFfRZZPTfHCFAjKmc1VoXOhe/wT+8h7V6aXpmzhHRBvbeTdvkBwUvJ8sFL43+d9hMH9/EzN+0AkxtHAMELtbfWjE6Mk7UcAAVFMwy8QJfwyv/ngIAiN8YIUBMGhjUIQv0cCUiz5YwBYwoFA+H9NwQAECUEl/DK/+eA4C62QCKFJkSWRAZJ8lliWtJaQluyWyJcklwCXfJNYWGCgDfGCFAjKGY1odUFRZfwyv/ngOAcN8YIUBMGhjUMQg1I448F85O1HAAzDLxA/Ryz5YwB4f15v1aFzoXv8A/jAekTCwAQkwsAApnkAURRvzcEABAlBHG3E3T5DzMEi0Cmh2P0mwCTBwACY/OHAD6EGTLShUqFExY0AFkzVoXOhe/wz95x9SKaIpmBjH2/kcqX8Mr/54DAIlXZNwQAECEEibeX8Mr/54AgJf23XXGmwqqECWXKwBMFBXEuiYFFhsaixO/wr9od7SqEdTAVRzrIIUeFRzrMaAATBwACPsZKyibOOtAC0gLUAtYC2ALaPtwjDvEC9Ti2QCKFJkSWRAZJYWGCgDcEABAlBPW3eXFexmLErosqjIFFAUUG1iLUJtJK0E7OUsxWylrIZsLv8A/UFcG3BAAQpQSyUCJUAlnySWJK0kpCS7JLIkySTCaFklRFYYKAg6kLAKqE448J/EFkAykMAGPmiQCTFwkBwYOdz5MXSQHZ44FHBWQ3B/ZPA0dXBh3HkwXADZnjkwUQAkqFMT9F8SKZs4eJQDO0iQB9FCMgLAF9jCOgiwB5t4VH8be3DAABE4v8/zfaCFAze2kBkwpKAJnP7/AP++/wj8e3B4AAI6BqASMg+gCDJwoA9f9Vv+/wT/nv8M/FI6BqASMgmgGDJwoA9f9xv7cEABCZBCW/eXEi1Dc0908TBIQqgyfEsAbWJtKZ5wFFslAiVJJURWGCgLcE9k+ThAQAg8dkBrnjtwf8T4Onh/4DJYSwEwbxAcxHLsaFPGn5g0fxAbJFhcMDJ4SwgyfEsC6XIyTksD6HY/P1AC6HmY8jJvSwdbeFRyOD9Aa3NfdPNzX3T5OFRdsTBQXbWTVB2bcHAPDdFz6VWdExZRMFBUBBtxP3tf/BR2MX9wx5cSLUNwT3Ty7GBtYTBIQqJtJK0KqETs5SzFbKMopayO/wD58IwKqJE4VEAO/wT55IwCqJE4WEAO/wj50IxCqLE4XEAO/wz5yyRUjE0UeqigFFY5j1ABOFBAHv8G+bMzWgAA1nIpeFRyMCp7CjAvewYwgKADMJaQMjKgQAIygkAbcH/E+Dp4f+3EczBvBA/RfOl9aXs/bKAPGPlY8jJvewtwf2TyMk17AjgwcGRT0BxTFlEwUFQLJQIlSSVAJZ8kliStJKQktFYYKAMWWCgHlxTs63CfdPk4mJKlLMA6rJACLUDWQm0krQBtZWyiqJroQumk6UgyeEsGPtRwOZzINHRLADpckAocezZ5UAvYuFRp3jJobKha08Ge2DpwkAAUWFjyOg+QCDp8kAppcjpvkAMaAtNWHRMWUTBQVAslAiVJJUAlnySWJK0kpFYYKAk3c1AJHnk/c0ALHjgUZdvxN6xf8zBKpAEQRj84QAJoSTCsEAfVcihsqFM4X6ADrGl/DK/+eAgP6BRhFG1oVShQk0XfEimREKM4SEQCGgE3rF/yaEk3rE/2OMCgCBRlaGyoVShfk6SfFWmTMEVEFWmjHc/VcihsqFaAA+xpfwyv/ngMD5gUYRRmwAUoU1v11xVtqDKoUAWtiGxlaFosSmwsrATt5S3F7WYtTv8I+BKosThUoA7/DvgAnptwf2Tzc390+Th4cIIy732rc090+3C/ZPtwn3TxM4FQBaiQVEk4SE2xOKiwiTiYkqYwQJAGNIgAAxZRMFBXB9hGGNaaDYQKFnSs4zB0dBmY8+zIOnCQFjdPkAE2goAELG1Tk14TJI2ECTBQsBs4UlQTcF9088CNaVk4aLCHAIEwXFK5fwyv/ngIDWzEDiR3JMKoS+lYOnCQHMwLOHh0EjqPkAt4f2T5OHhwhj8/UAAemzhUVBUoUBPRnlI6JEATMJiUEBSLW3MWUTBQVAtkAmRJZEBknyWWJa0lpCW7JbIlxhYYKAg1UlALcH90+Dp4cqwRXCBcGBY/O3AL6FCEVBBdmztwfAT4OmRwGZRyqHY/fXArfXElDcW5OW9wBj0AYCt1cRUIOnxz+NRo2LY5jXAAVGgUUX88v/ZwDDooFFOoUX88r/ZwCj2RVxtwf2Tzc390+izYbPpsvKyc7H0sXWw9rBXt9i3Wbbatlu14ARk4cHABMHh9tj6+c2l/DK/+eAwMIZxQNHhQGVRwVJYw73AJfwyv/ngGDBAUkZxQNJhQFpGRM5GQAGCfFkl/DK/+eAwL+ThAQgAckcQfFkk4QEIGNT8AC+hDfXElB8RxMHxwQYQ5PWVwET9kYAk9ZHAI2KVY6TBkAGMwbWAr2LMwr2AJNXtwCNi7OH1wIhgx2LupcTtycAYxgHLpOHx/ljhAcut9cSUPxLYUbBg72LmcMThgcBt9cSUPhHkwZABpNXtwCNi7OH1wIhgx2LupcTtycAYxwHKpOHx/ljiAcqt9cSUPhL9UdRgz2LGceTB0cBfUdjc/cAuoc3VxFQFFe3BQQAbgbNjhTXFFe3BQAI/RXtjtGOFNe3VhFQk4bGCZhC7gdtj9mPnMKTB8ASY/xHAbdXEVCTh0cgmEOFZpOGBoBVj5jDt1kRUIOnSSC3BoT//RaT9/f3I6L5IIOnSSATBYA+k4lJIJPnFwAjoPkAt1cRUJOHxxCYQ3mbmMOYQ3WbmMM3VxFQHE/1j7cGbADVjxzPt1cRUJhXkWZVj5jXl/DK/+eAIKKTB8ASY/pHAzcHEVAcR7cGIOD9FvWPtwbgHdWPHMeDpwkAfXcTB/d/+Y8joPkAKUWX8Mr/54CgnrdXEVCYV7cG/P/9FnWPEwWADJjXl/DK/+eAYJ03Zw5QXEe3BgH//Rb1j8Fm1Y9cx+/g3+K3Zw5QoQc+ipxDtwkAAROH+f/5jyMg+gDv4B/hgycKALcK/E+T9wfwIyD6AO/g3983Zw5QXEO3BgDg/Qb1j5PnBwJcw+/gX943FxFQPEMJZRMFBXHxm5PnFwA8w5fwyv/ngCCVpoUBRe/wD48BRRE7t9cIUJhPtwYAgFWPmM+X8Mr/54AAp4Oniv5xR4hDk3f1D2Nl9w5FR7cFAARjePcOhUWzlfUAY+O5DkFmkwf2/xMHABCFZpfwyv/ngECihUVjDLkMiUdjDfkeCWUTBQVxl/DK/+eA4I0BRZfwyv/ngACRt6cMUPhT/XaNBnWPE2eHAvjT+FOFRRNnFwD407enDFCTh4cJjMOYQwWLdf83pwxQXFO3BfVPAUaT9wfwk+cHAlzTt6cMUH1XmMuThcUzFUWX8Mr/54AA4benDFDYRxMFAAITZxcQ2MeX8Mr/54AA4LcH9U+Th6dyNzf3TyMs99q3B/ZPI6IHABmiI6AHAJEHUbFhRjWz9Ue1sxMHkAO3BQAEY5TnALcFAAK3B/ZPBUejgucGEb+3BPxPtwf2T5OHBwDFSQOlRP0+iiOkNwe3B/VPk4eHJhMGCgaJRSMu+gQjLAoAIwIKBpfwyv/ngAALt1cOUJOHxxWYQ7cGIADKhVWPmMO3Zw1QEwcQAiOq5xZOhZfwyv/ngKDStxXATwFGk4VFl06Fl/DK/+eAoNMDpUT9twX1T5OFJXOX8Mr/54BgBQOlRP2X8Mr/54CgAwOlRP2X8Mr/54AgArcHAFCYRzcFAgATZxcAmMeX8Mr/54Dgz7cH9U+Th6dvNzf3TyMs99q3B/VPk4enbCMi+gDv4F+rt1dBSZOH94SRRRMFRPQjIvT07+D/h7cH9k+ThwcAtzn3Tzc6908jLvTyk4nJ4BMKCtyTBTT0EwWE9O/gX6mDRzT0qovFy+/gP4Dlt7dnEVCYW7cGAIA3BgBAVY+Y2zdH2FATBxeqmM8joAcAI6wHAJRbRUXRjpTbt2cRUJjT1E83BgQAEwcQAtGO1M8joAcCt2cNULjPl/DK/+eAQMG3Jw1QfVe3BfVP2MsBRpOFJThFRZfwyv/ngMDBtycNUJhLNwUCABNnRwCYy5fwyv/ngMDAtwf1Tzc390+Th4dUIyz32rcH9U83B/ZPk4dnWSMi9wApt2MIBViDRwUAg0QVAJHLMWaBRhMGBjCmhU6F7+BfwRW/A0s1AINHJQADJ4T0Igsza/sAkweLAGMF9wCBRjFm4b8RBe/g/42DJ8TzE4yLACMIlPTwV6MIBPQjGWT1Iyqk9CMshPUjLjT1qowZyoFGpoVOhe/g37uDJ8TzI6YHBtG9EwbABIFFEwVE95fgyv/ngIB+0Udj4JcChUdj+5cCk4fk/5P39w9JR2Nv9wKKB9KXnEOCh5MHIA1jj/RCY+GXApMHAA1jgfREkwcQDWOC9ESDJ8TzMWUTBQUw6NdVopMHMA3jiPTmk4e0ApP39w9pR+Ng9/4TBsAEgUUTBUT3l+DK/+eAQHeTh7TyigfOl9xHkwZE91qG4oUmhYKXgyfE8+jXgyfE+9HPAyfE8zzbUaiTB0ACYxX7OB1LAyXE9YFGAUahRX0b7+CfruMYC/6DJ8TzI6YHBnWoAUbahWKF7/CP2qmovUdj+Wcbtzf3T4PH19pjhAcYQRtihUIL7+BP+hNbCwFjFWUPgUcTB/AOY+xnAWOb7C63F/VPk4cnPwMnxPM8262gs4b7AIPGhgGFBzWP8b8TBQT17+C/ooMnxPPo1yHJdajBR2Mb+y5ihe/gL/WDJ8Tz6NsThcsA7+BP9IMnxPOo3zOFawHv4G/zgyfE8+jfE4VLAe/gj/KDJ8TzAyfE8yOgpwiFRyMC9wgjJgcGkwZE9wFGpoVOhe/gP6GDJ8TzI6YHBrxb44QH0hMFBPWCl4MnxPPo1yOoBwYRu71HY/tnDYMnxPODx0cI1cdihe/g7+yDJ8TzKoz8W2PopwBBG0ILE1sLAWMGZQMDJ8TztWeThweQNWV81xMFBZAqhoFGpoVOhe/gf5qDJ8TzI6gHBnG3gyfE8yqGk4WLAQOlBwgTiwcIl+DK/+eA4FyDJwsAAyfE8+KXIyD7AIMnxPP8W7OHh0F825G3oUdjGPsegyfE84PHRwiFw4MnxPNRRoFFE4VHB5fgyv/ngKBYtwf1T5OHp3pdtQMnxPOxZ5OHB2AxZXzXEwUFYJW/YwULAJN3+wCZywMnxPO1Z5OHB4A1ZXzXEwUFgJm/k11LAP1cAUsDLIT1kxdLAD6cYoXv4A/eKo0TBUwA7+Bv3SMspPITBYwA7+Cv3KqLEwXMAO/gD9yX4Mr/54AgLoMnhPOz93cBY4qbAYMmDQCTy/v/s/vbALPndwEFCyMg/QCTFwsBwYPj4Lf7XbuRR2MR+xJihe/g79ccQSMq9PZNs5FHYxf7EGKF7+Cv1u/wD+ZBu+FHYx77DmKF7+CP1SqLE4XLAO/g79QjJqTyE4ULAe/gL9QjKKTyE4VLAe/gb9MjKqTyE4WLAe/gr9IjLKTyE4XLAe/g79EDJ4TzgyZE8wMmBPODJcTyqodahZfgyv/ngIA14wYF0gMnxPOxZ5OHB0AxZXzXEwUFQKG1oUdjEfsItxf1T5OHp4OZuwVGObO9R2P3Zwe3N/dPg8fX2uOPB+hihe/g78telZMH8A5jmasAY5z8ALcX9U+ThycuDbMDx4sBhQu5j923AyfE87Fnk4cHEDFlfNcTBQUQ3bOTBYT3EwUE9e/gf9CDJ8Tz6NfBRyMc9Po5s4qLYwkLAF6BAyfE87FnMWV812W7EwYE9oFFAUWX4Mr/54BAH23xUUaTBQT2EwWE95fgyv/ngAA50UcjHPT6qbnBR+MT+/y3F/VPk4eHnGm5l+DK/+eAACMRv6FH4xb7+mKF7+CPwCqLIyak9BOFywDv4K+/g6eK/iMgpPbcRzN7+wLjEwv4M3f1Aj3/E4v3/yqbM1v7AvVnk4cHTIFLMwv7AoMnBPaBx7NnewGR51qF3oXv4O/WXb2TBQT2EwXE9O/wD4AFRZfgyv/ngKAMkzcbALOL+0B9G+m3hUfjFvmagyfE84PHRwbjgAeagyfE86hXI4IHBjMVqQCX4Mr/54DgYgllEwUFcZfgyv/ngIAIl/DK/+eAAKG3BxFQmEc3BQCAbZuYx5fwyv/ngCCVl/DK/+eAYJkBRZfgyv/ngEALobIAAA==", xo = 0x4ff50000, So = "Kgf1T4gA9k9OG/VPWhv1T6ob9U+8G/VPwhz1TzYc9U8mG/VPBB31T5Ad9U+2HfVP3Br1T6Qd9U/cGvVPMB71T0Ae9U9EHvVPqhv1T5Ie9U+sHvVP0AP1T0oB9U+SAfVPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VP", Co = 0x4ff72db8, wo = 0x4ff60000, To = {
		entry: yo,
		text: bo,
		text_start: xo,
		data: So,
		data_start: Co,
		bss_start: wo
	};
})), Do = /* @__PURE__ */ c({
	bss_start: () => No,
	data: () => jo,
	data_start: () => Mo,
	default: () => Po,
	entry: () => Oo,
	text: () => ko,
	text_start: () => Ao
}), Oo, ko, Ao, jo, Mo, No, Po, Fo = o((() => {
	Oo = 0x400290a4, ko = "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", Ao = 0x40028000, jo = "QAD9P5SHAkBPSEFJAAAAAG2UAkBylAJA2pQCQOWUAkCglQJAMpUCQD2UAkDclQJAVJYCQL6WAkC5mAJAdpYCQLmYAkAelwJAP5cCQE6XAkDalAJAoJcCQLSXAkAMhQJAJIICQKiCAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkA=", Mo = 0x3ffe2dc0, No = 0x3ffd0000, Po = {
		entry: Oo,
		text: ko,
		text_start: Ao,
		data: jo,
		data_start: Mo,
		bss_start: No
	};
})), Io = /* @__PURE__ */ c({
	bss_start: () => Ho,
	data: () => Bo,
	data_start: () => Vo,
	default: () => Wo,
	entry: () => Lo,
	plugin_first_opcode: () => 213,
	plugin_table_entries: () => 27,
	plugin_table_offset: () => 156,
	plugins: () => Uo,
	text: () => Ro,
	text_start: () => zo
}), Lo, Ro, zo, Bo, Vo, Ho, Uo, Wo, Go = o((() => {
	Lo = 0x40379524, Ro = "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", zo = 0x40378000, Bo = "QADKPxgYGBgQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwiDdAT0hBSQAAAAA9mTdAQpk3QKqZN0C1mTdAc5o3QAKaN0ANmTdAqpo3QCibN0CSmzdAjZ03QEqbN0CNnTdA9ps3QBacN0AmnDdAqpk3QHqcN0CMnDdAOIU3QBSCN0CYgjdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdA", Vo = 0x3fcb2dc0, Ho = 0x3fca0000, Uo = { nand: {
		text: "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",
		text_start: 0x40379ea0,
		bss_size: 10288,
		handlers: {
			"0xD5": 1728,
			"0xD6": 3056,
			"0xD7": 3160,
			"0xD8": 3336,
			"0xD9": 3416,
			"0xDA": 3468,
			"0xDE": 3648,
			"0xDB": 3752,
			"0xDC": 3788,
			"0xDD": 3864
		}
	} }, Wo = {
		entry: Lo,
		text: Ro,
		text_start: zo,
		data: Bo,
		data_start: Vo,
		bss_start: Ho,
		plugin_first_opcode: 213,
		plugin_table_offset: 156,
		plugin_table_entries: 27,
		plugins: Uo
	};
})), Ko = /* @__PURE__ */ c({
	bss_start: () => Qo,
	data: () => Xo,
	data_start: () => Zo,
	default: () => $o,
	entry: () => qo,
	text: () => Jo,
	text_start: () => Yo
}), qo, Jo, Yo, Xo, Zo, Qo, $o, es = o((() => {
	qo = 788537886, Jo = "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", Yo = 788533248, Xo = "FBcAL4igAC9CJwAvTicAL54nAC+wJwAvtigALyooAC8aJwAv+CgAL4QpAC+wKQAv0CYAL5gpAC/QJgAvKioALzoqAC8+KgAvnicAL4wqAC+mKgAv0BMAL0oRAC+SEQAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAv", Zo = 788647352, Qo = 788570112, $o = {
		entry: qo,
		text: Jo,
		text_start: Yo,
		data: Xo,
		data_start: Zo,
		bss_start: Qo
	};
})), ts = /* @__PURE__ */ c({
	bss_start: () => ss,
	data: () => as,
	data_start: () => os,
	default: () => cs,
	entry: () => ns,
	text: () => rs,
	text_start: () => is
}), ns, rs, is, as, os, ss, cs, ls = o((() => {
	ns = 0x4010c504, rs = "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", is = 0x4010c500, as = "RM0QQCyB/j8AAAAAAAAAAAAAAQAAEAAAAAEAAP//AAD/////A9cQQFHXEECE1xBAKdgQQDjnEECF2BBA3dgQQCzZEEA45xBAB9oQQHzaEEAs2xBAOOcQQDjnEEDV2xBAOOcQQJveEEBv3xBAsd8QQDjnEEA45xBAU+AQQDjnEEBL4RBA/eEQQE3jEEAb5BBA9eQQQDjnEEA45xBAOOcQQDjnEEAN5hBAOOcQQCTnEEDw3BBA8tcQQDjnEEAs2hBAb9kQQDjnEEC15hBA/+YQQDjnEEA45xBAOOcQQDjnEEA45xBAOOcQQDjnEEA45xBAndkQQNjZEEB25RBAWMwQQHzJEED0yBBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAAQAAAAIAAAADAAAABAAAAAUAAAAHAAAACQAAAA0AAAARAAAAGQAAACEAAAAxAAAAQQAAAGEAAACBAAAAwQAAAAEBAACBAQAAAQIAAAEDAAABBAAAAQYAAAEIAAABDAAAARAAAAEYAAABIAAAATAAAAFAAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAMAAAADAAAABAAAAAQAAAAFAAAABQAAAAYAAAAGAAAABwAAAAcAAAAIAAAACAAAAAkAAAAJAAAACgAAAAoAAAALAAAACwAAAAwAAAAMAAAADQAAAA0AAAAAAAAAAAAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAA0AAAAPAAAAEQAAABMAAAAXAAAAGwAAAB8AAAAjAAAAKwAAADMAAAA7AAAAQwAAAFMAAABjAAAAcwAAAIMAAACjAAAAwwAAAOMAAAACAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAACAAAAAgAAAAIAAAACAAAAAwAAAAMAAAADAAAAAwAAAAQAAAAEAAAABAAAAAQAAAAFAAAABQAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAEBESAAgHCQYKBQsEDAMNAg4BDwABAQAAAQAAAAQAAAAFBQQAAgMHAAMDCwA=", os = 0x3fffae6c, ss = 0x3ffe8100, cs = {
		entry: ns,
		text: rs,
		text_start: is,
		data: as,
		data_start: os,
		bss_start: ss
	};
})), us = /* @__PURE__ */ u(Ui(), 1);
async function ds(e, t) {
	let n;
	switch (e) {
		case "ESP32":
			n = await Promise.resolve().then(() => (Qi(), Wi));
			break;
		case "ESP32-C2":
			n = await Promise.resolve().then(() => (sa(), $i));
			break;
		case "ESP32-C3":
			n = await Promise.resolve().then(() => (ga(), ca));
			break;
		case "ESP32-C5":
			n = await Promise.resolve().then(() => (Ta(), _a));
			break;
		case "ESP32-C6":
			n = await Promise.resolve().then(() => (Pa(), Ea));
			break;
		case "ESP32-C61":
			n = await Promise.resolve().then(() => (Ua(), Fa));
			break;
		case "ESP32-H2":
			n = await Promise.resolve().then(() => (Qa(), Wa));
			break;
		case "ESP32-H4":
			n = await Promise.resolve().then(() => (so(), $a));
			break;
		case "ESP32-H21":
		case "ESP32-E22": break;
		case "ESP32-P4":
			n = t && t < 300 ? await Promise.resolve().then(() => (_o(), co)) : await Promise.resolve().then(() => (Eo(), vo));
			break;
		case "ESP32-S2":
			n = await Promise.resolve().then(() => (Fo(), Do));
			break;
		case "ESP32-S3":
			n = await Promise.resolve().then(() => (Go(), Io));
			break;
		case "ESP32-S31":
			n = await Promise.resolve().then(() => (es(), Ko));
			break;
		case "ESP8266": n = await Promise.resolve().then(() => (ls(), ts));
	}
	if (n) {
		let e = "default" in n ? n.default : n;
		return {
			bss_start: e.bss_start,
			data: e.data,
			data_start: e.data_start,
			entry: e.entry,
			text: e.text,
			text_start: e.text_start,
			decodedData: fs(e.data),
			decodedText: fs(e.text)
		};
	}
}
function fs(e) {
	let t = (0, us.default)(e).split("").map(function(e) {
		return e.charCodeAt(0);
	});
	return new Uint8Array(t);
}
// node_modules/esptool-js/lib/targets/rom.js
var ps, ms = o((() => {
	ps = class {
		constructor() {
			this.FLASH_SIZES = {
				"1MB": 0,
				"2MB": 16,
				"4MB": 32,
				"8MB": 48,
				"16MB": 64,
				"32MB": 80,
				"64MB": 96,
				"128MB": 112
			}, this.FLASH_FREQUENCY = {
				"80m": 15,
				"40m": 0,
				"26m": 1,
				"20m": 2
			}, this.USES_MAGIC_VALUE = !1;
		}
		getEraseSize(e, t) {
			return t;
		}
	};
})), hs = /* @__PURE__ */ c({ ESP8266ROM: () => gs }), gs, _s = o((() => {
	ms(), gs = class extends ps {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP8266", this.USES_MAGIC_VALUE = !0, this.CHIP_DETECT_MAGIC_VALUE = [0xfff0c101], this.EFUSE_RD_REG_BASE = 0x3ff00050, this.UART_CLKDIV_REG = 0x60000014, this.UART_CLKDIV_MASK = 0xfffff, this.XTAL_CLK_DIVIDER = 2, this.FLASH_WRITE_SIZE = 16384, this.BOOTLOADER_FLASH_OFFSET = 0, this.UART_DATE_REG_ADDR = 0, this.FLASH_SIZES = {
				"512KB": 0,
				"256KB": 16,
				"1MB": 32,
				"2MB": 48,
				"4MB": 64,
				"2MB-c1": 80,
				"4MB-c1": 96,
				"8MB": 128,
				"16MB": 144
			}, this.FLASH_FREQUENCY = {
				"80m": 15,
				"40m": 0,
				"26m": 1,
				"20m": 2
			}, this.MEMORY_MAP = [
				[
					0x3ff00000,
					0x3ff00010,
					"DPORT"
				],
				[
					0x3ffe8000,
					0x40000000,
					"DRAM"
				],
				[
					0x40100000,
					0x40108000,
					"IRAM"
				],
				[
					0x40201010,
					0x402e1010,
					"IROM"
				]
			], this.SPI_REG_BASE = 0x60000200, this.SPI_USR_OFFS = 28, this.SPI_USR1_OFFS = 32, this.SPI_USR2_OFFS = 36, this.SPI_MOSI_DLEN_OFFS = 0, this.SPI_MISO_DLEN_OFFS = 0, this.SPI_W0_OFFS = 64, this.getChipFeatures = async (e) => {
				let t = ["WiFi"];
				return await this.getChipDescription(e) == "ESP8285" && t.push("Embedded Flash"), t;
			};
		}
		async readEfuse(e, t) {
			let n = this.EFUSE_RD_REG_BASE + 4 * t;
			return e.debug("Read efuse " + n), await e.readReg(n);
		}
		async getChipDescription(e) {
			let t = await this.readEfuse(e, 2);
			return await this.readEfuse(e, 0) & 16 | t & 65536 ? "ESP8285" : "ESP8266EX";
		}
		async getCrystalFreq(e) {
			let t = await e.readReg(this.UART_CLKDIV_REG) & this.UART_CLKDIV_MASK, n = e.transport.baudrate * t / 1e6 / this.XTAL_CLK_DIVIDER, r;
			return r = n > 33 ? 40 : 26, Math.abs(r - n) > 1 && e.info("WARNING: Detected crystal freq " + n + "MHz is quite different to normalized freq " + r + "MHz. Unsupported crystal in use?"), r;
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async readMac(e) {
			let t = await this.readEfuse(e, 0);
			t >>>= 0;
			let n = await this.readEfuse(e, 1);
			n >>>= 0;
			let r = await this.readEfuse(e, 3);
			r >>>= 0;
			let i = /* @__PURE__ */ new Uint8Array(6);
			return r == 0 ? n >> 16 & 255 ? (n >> 16 & 255) == 1 ? (i[0] = 172, i[1] = 208, i[2] = 116) : e.error("Unknown OUI") : (i[0] = 24, i[1] = 254, i[2] = 52) : (i[0] = r >> 16 & 255, i[1] = r >> 8 & 255, i[2] = r & 255), i[3] = n >> 8 & 255, i[4] = n & 255, i[5] = t >> 24 & 255, this._d2h(i[0]) + ":" + this._d2h(i[1]) + ":" + this._d2h(i[2]) + ":" + this._d2h(i[3]) + ":" + this._d2h(i[4]) + ":" + this._d2h(i[5]);
		}
		getEraseSize(e, t) {
			return t;
		}
	}, gs.IROM_MAP_START = 0x40200000, gs.IROM_MAP_END = 0x40300000;
}));
// node_modules/esptool-js/lib/image/base.js
_s();
function vs(e, t) {
	return e + (t - 1 - e % t);
}
function ys(e, t) {
	return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24;
}
var bs = class e {
	constructor(e, t, n = null, r = 0) {
		this.addr = e, this.data = t, this.fileOffs = n, this.flags = r, this.includeInChecksum = !0, this.addr !== 0 && this.padToAlignment(4);
	}
	copyWithNewAddr(t) {
		return new e(t, this.data, 0);
	}
	splitImage(t) {
		let n = new e(this.addr, this.data.slice(0, t), 0);
		return this.data = this.data.slice(t), this.addr += t, this.fileOffs = null, n;
	}
	toString() {
		let e = `len 0x${this.data.length.toString(16).padStart(5, "0")} load 0x${this.addr.toString(16).padStart(8, "0")}`;
		return this.fileOffs !== null && (e += ` file_offs 0x${this.fileOffs.toString(16).padStart(8, "0")}`), e;
	}
	getMemoryType(e) {
		return e.ROM_LOADER.MEMORY_MAP.filter((e) => e[0] <= this.addr && this.addr < e[1]).map((e) => e[2]);
	}
	padToAlignment(e) {
		this.data = Mi(this.data, e, 0);
	}
}, xs = class extends bs {
	constructor(e, t, n, r) {
		super(t, n, null, r), this.name = e;
	}
	toString() {
		return `${this.name} ${super.toString()}`;
	}
}, Ss = class {
	constructor(e) {
		this.SEG_HEADER_LEN = 8, this.SHA256_DIGEST_LEN = 32, this.ELF_FLAG_WRITE = 1, this.ELF_FLAG_READ = 2, this.ELF_FLAG_EXEC = 4, this.segments = [], this.entrypoint = 0, this.elfSha256 = null, this.elfSha256Offset = 0, this.padToSize = 0, this.flashMode = 0, this.flashSizeFreq = 0, this.checksum = 0, this.datalength = 0, this.IROM_ALIGN = 0, this.MMU_PAGE_SIZE_CONF = [], this.ROM_LOADER = e;
	}
	loadCommonHeader(e, t, n) {
		let r = e[t], i = e[t + 1];
		if (this.flashMode = e[t + 2], this.flashSizeFreq = e[t + 3], this.entrypoint = ys(e, t + 4), r !== n) throw new d(`Invalid firmware image magic=0x${r.toString(16)}`);
		return i;
	}
	verify() {
		if (this.segments.length > 16) throw new d(`Invalid segment count ${this.segments.length} (max 16). Usually this indicates a linker script problem.`);
	}
	loadSegment(e, t, n = !1) {
		let r = t, i = ys(e, t), a = ys(e, t + 4);
		this.warnIfUnusualSegment(i, a, n);
		let o = e.slice(t + 8, t + 8 + a);
		if (o.length < a) throw new d(`End of file reading segment 0x${i.toString(16)}, length ${a} (actual length ${o.length})`);
		let s = new bs(i, o, r);
		return this.segments.push(s), s;
	}
	warnIfUnusualSegment(e, t, n) {
		n || (e > 0x40200000 || e < 0x3ffe0000 || t > 65536) && console.warn(`WARNING: Suspicious segment 0x${e.toString(16)}, length ${t}`);
	}
	maybePatchSegmentData(e, t) {
		let n = e.length;
		if (this.elfSha256Offset >= t && this.elfSha256Offset < t + n) {
			let r = this.elfSha256Offset - t;
			if (r < this.SEG_HEADER_LEN || r + this.SHA256_DIGEST_LEN > n) throw new d(`Cannot place SHA256 digest on segment boundary(elf_sha256_offset=${this.elfSha256Offset}, file_pos=${t}, segment_size=${n})`);
			let i = r - this.SEG_HEADER_LEN;
			if (!e.slice(i, i + this.SHA256_DIGEST_LEN).every((e) => e === 0)) throw new d(`Contents of segment at SHA256 digest offset 0x${this.elfSha256Offset.toString(16)} are not all zero. Refusing to overwrite.`);
			if (!this.elfSha256 || this.elfSha256.length !== this.SHA256_DIGEST_LEN) throw new d("ELF SHA256 digest is not properly initialized");
			let a = e.slice(0, i), o = e.slice(i + this.SHA256_DIGEST_LEN), s = a.length + this.elfSha256.length + o.length, c = new Uint8Array(s);
			return c.set(a, 0), c.set(this.elfSha256, a.length), c.set(o, a.length + this.elfSha256.length), c;
		}
		return e;
	}
	saveSegment(e, t, n, r = null) {
		let i = this.maybePatchSegmentData(n.data, t), a = new DataView(e.buffer, t);
		return a.setUint32(0, n.addr, !0), a.setUint32(4, i.length, !0), e.set(i, t + 8), r === null ? 0 : Ni(i, r);
	}
	saveFlashSegment(e, t, n, r = null) {
		if (this.ROM_LOADER.CHIP_NAME === "ESP32") {
			let e = (t + n.data.length + this.SEG_HEADER_LEN) % this.IROM_ALIGN;
			if (e < 36) {
				let t = new Uint8Array(n.data.length + (36 - e));
				t.set(n.data), t.fill(0, n.data.length), n.data = t;
			}
		}
		return this.saveSegment(e, t, n, r);
	}
	readChecksum(e, t) {
		return e[vs(t, 16)];
	}
	calculateChecksum() {
		let e = 239;
		for (let t of this.segments) t.includeInChecksum && (e = Ni(t.data, e));
		return e;
	}
	appendChecksum(e, t, n) {
		let r = vs(t, 16);
		e[r] = n;
	}
	writeCommonHeader(e, t, n) {
		e[t] = 233, e[t + 1] = n, e[t + 2] = this.flashMode, e[t + 3] = this.flashSizeFreq, new DataView(e.buffer, t + 4).setUint32(0, this.entrypoint, !0);
	}
	isIromAddr(e) {
		return gs.IROM_MAP_START <= e && e < gs.IROM_MAP_END;
	}
	getIromSegment() {
		let e = this.segments.filter((e) => this.isIromAddr(e.addr));
		if (e.length > 0) {
			if (e.length !== 1) throw new d(`Found ${e.length} segments that could be irom0. Bad ELF file?`);
			return e[0];
		}
		return null;
	}
	getNonIromSegments() {
		let e = this.getIromSegment();
		return this.segments.filter((t) => t !== e);
	}
	sortSegments() {
		this.segments.length && this.segments.sort((e, t) => e.addr - t.addr);
	}
	mergeAdjacentSegments() {
		if (!this.segments.length) return;
		let e = [];
		for (let t = this.segments.length - 1; t > 0; t--) {
			let n = this.segments[t - 1], r = this.segments[t];
			if (n.getMemoryType(this).join(",") === r.getMemoryType(this).join(",") && n.includeInChecksum === r.includeInChecksum && r.addr === n.addr + n.data.length && (r.flags & this.ELF_FLAG_EXEC) === (n.flags & this.ELF_FLAG_EXEC)) {
				let e = new Uint8Array(n.data.length + r.data.length);
				e.set(n.data), e.set(r.data, n.data.length), n.data = e;
			} else e.unshift(r);
		}
		e.unshift(this.segments[0]), this.segments = e;
	}
	setMmuPageSize(e) {
		if (!this.MMU_PAGE_SIZE_CONF && e !== this.IROM_ALIGN) console.warn(`WARNING: Changing MMU page size is not supported on ${this.ROM_LOADER.CHIP_NAME}! ` + (this.IROM_ALIGN === 0 ? "" : `Defaulting to ${this.IROM_ALIGN / 1024}KB.`));
		else if (this.MMU_PAGE_SIZE_CONF && !this.MMU_PAGE_SIZE_CONF.includes(e)) {
			let t = this.MMU_PAGE_SIZE_CONF.map((e) => `${e / 1024}KB`).join(", ");
			throw new d(`${e} bytes is not a valid ${this.ROM_LOADER.CHIP_NAME} page size, select from ${t}.`);
		} else this.IROM_ALIGN = e;
	}
}, Cs = class extends Ss {
	constructor(e, t = null, n = !0, r = !1) {
		super(e), this.securePad = null, this.flashMode = 0, this.flashSizeFreq = 0, this.version = 1, this.WP_PIN_DISABLED = 238, this.wpPin = this.WP_PIN_DISABLED, this.clkDrv = 0, this.qDrv = 0, this.dDrv = 0, this.csDrv = 0, this.hdDrv = 0, this.wpDrv = 0, this.chipId = 0, this.minRev = 0, this.minRevFull = 0, this.maxRevFull = 0, this.storedDigest = null, this.calcDigest = null, this.dataLength = 0, this.IROM_ALIGN = 65536, this.ROM_LOADER = e, this.appendDigest = n, this.ramOnlyHeader = r, t !== null && this.loadFromFile(t);
	}
	async loadFromFile(e) {
		let t = e instanceof Uint8Array ? e : Pi(e), n = 0, r = this.loadCommonHeader(t, n, 233);
		n += 8, this.loadExtendedHeader(t, n), n += 16;
		for (let e = 0; e < r; e++) {
			let e = this.loadSegment(t, n);
			n += 8 + e.data.length;
		}
		if (this.checksum = this.readChecksum(t, n), n = vs(n, 16), this.appendDigest) {
			let e = n;
			this.storedDigest = t.slice(n, n + this.SHA256_DIGEST_LEN);
			let r = await crypto.subtle.digest("SHA-256", t.slice(0, e));
			this.calcDigest = new Uint8Array(r), this.dataLength = +e;
		}
		this.verify();
	}
	isFlashAddr(e) {
		return this.ROM_LOADER.IROM_MAP_START <= e && e < this.ROM_LOADER.IROM_MAP_END || this.ROM_LOADER.DROM_MAP_START <= e && e < this.ROM_LOADER.DROM_MAP_END;
	}
	async save() {
		let e = 0, t = /* @__PURE__ */ new Uint8Array(1048576), n = 0;
		this.writeCommonHeader(t, n, this.segments.length), n += 8, this.saveExtendedHeader(t, n), n += 16;
		let r = 239, i = this.segments.filter((e) => this.isFlashAddr(e.addr)).sort((e, t) => e.addr - t.addr), a = this.segments.filter((e) => !this.isFlashAddr(e.addr)).sort((e, t) => e.addr - t.addr);
		for (let e = 0; e < i.length; e++) {
			let t = i[e];
			if (t instanceof xs && t.name === ".flash.appdesc") {
				i.splice(e, 1), i.unshift(t);
				break;
			}
		}
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			if (t instanceof xs && t.name === ".dram0.bootdesc") {
				a.splice(e, 1), a.unshift(t);
				break;
			}
		}
		if (i.length > 0) {
			let e = i[0].addr;
			for (let t of i.slice(1)) {
				if (Math.floor(t.addr / this.IROM_ALIGN) === Math.floor(e / this.IROM_ALIGN)) throw new d(`Segment loaded at 0x${t.addr.toString(16)} lands in same 64KB flash mapping as segment loaded at 0x${e.toString(16)}. Can't generate binary. Suggest changing linker script or ELF to merge sections.`);
				e = t.addr;
			}
		}
		if (this.ramOnlyHeader) {
			for (let i of a) r = this.saveSegment(t, n, i, r), n += 8 + i.data.length, e++;
			this.appendChecksum(t, n, r), n = vs(n, 16);
			for (let a of i.reverse()) {
				let i = this.getAlignmentDataNeeded(a, n);
				if (i > 0) {
					let a = this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET - this.SEG_HEADER_LEN;
					i < a && (i += this.IROM_ALIGN), i -= this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET;
					let o = new bs(0, new Uint8Array(i).fill(0), n);
					r = this.saveSegment(t, n, o, r), n += 8 + i, e++;
				}
				this.saveFlashSegment(t, n, a), n += 8 + a.data.length, e++;
			}
		} else {
			for (; i.length > 0;) {
				let o = i[0], s = this.getAlignmentDataNeeded(o, n);
				if (s > 0) {
					if (a.length > 0 && s > this.SEG_HEADER_LEN) {
						let e = a[0].splitImage(s);
						a[0].data.length === 0 && a.shift(), r = this.saveSegment(t, n, e, r);
					} else {
						let e = new bs(0, new Uint8Array(s).fill(0), n);
						r = this.saveSegment(t, n, e, r);
					}
					n += 8 + s, e++;
				} else {
					if ((n + 8) % this.IROM_ALIGN !== o.addr % this.IROM_ALIGN) throw Error("Flash segment alignment mismatch");
					r = this.saveFlashSegment(t, n, o, r), i.shift(), n += 8 + o.data.length, e++;
				}
			}
			for (let i of a) r = this.saveSegment(t, n, i, r), n += 8 + i.data.length, e++;
		}
		if (this.securePad) {
			if (!this.appendDigest) throw Error("secure_pad only applies if a SHA-256 digest is also appended to the image");
			let i = (n + this.SEG_HEADER_LEN) % this.IROM_ALIGN, a = 0;
			this.securePad === "1" ? a = 112 : this.securePad === "2" && (a = 32);
			let o = (this.IROM_ALIGN - i - 16 - a) % this.IROM_ALIGN, s = new bs(0, new Uint8Array(o).fill(0), n);
			r = this.saveSegment(t, n, s, r), n += 8 + o, e++;
		}
		this.ramOnlyHeader || (this.appendChecksum(t, n, r), n = vs(n, 16));
		let o = n;
		if (t[1] = this.ramOnlyHeader ? a.length : e, this.appendDigest) {
			let e = await crypto.subtle.digest("SHA-256", t.slice(0, o)), r = new Uint8Array(e);
			t.set(r, o), n += 32;
		}
		if (this.padToSize && n % this.padToSize !== 0) {
			let e = this.padToSize - n % this.padToSize, r = new Uint8Array(e);
			r.fill(255), t.set(r, n), n += e;
		}
		return t;
	}
	loadExtendedHeader(e, t) {
		let n = new DataView(e.buffer, t);
		this.wpPin = n.getUint8(0);
		let r = n.getUint8(1);
		[this.clkDrv, this.qDrv] = this.splitByte(r);
		let i = n.getUint8(2);
		[this.dDrv, this.csDrv] = this.splitByte(i);
		let a = n.getUint8(3);
		[this.hdDrv, this.wpDrv] = this.splitByte(a), this.chipId = n.getUint8(4), this.ROM_LOADER.IMAGE_CHIP_ID !== void 0 && this.chipId !== this.ROM_LOADER.IMAGE_CHIP_ID && console.warn(`Unexpected chip id in image. Expected ${this.ROM_LOADER.IMAGE_CHIP_ID} but value was ${this.chipId}. Is this image for a different chip model?`), this.minRev = n.getUint8(5), this.minRevFull = n.getUint16(6, !0), this.maxRevFull = n.getUint16(8, !0);
		let o = n.getUint8(15);
		if (o === 0 || o === 1) this.appendDigest = o === 1;
		else throw Error(`Invalid value for append_digest field (0x${o.toString(16)}). Should be 0 or 1.`);
	}
	saveExtendedHeader(e, t) {
		let n = /* @__PURE__ */ new ArrayBuffer(16), r = new DataView(n);
		r.setUint8(0, this.wpPin), r.setUint8(1, this.joinByte(this.clkDrv, this.qDrv)), r.setUint8(2, this.joinByte(this.dDrv, this.csDrv)), r.setUint8(3, this.joinByte(this.hdDrv, this.wpDrv)), r.setUint8(4, this.ROM_LOADER.IMAGE_CHIP_ID ?? 0), r.setUint8(5, this.minRev), r.setUint16(6, this.minRevFull, !0), r.setUint16(8, this.maxRevFull, !0);
		for (let e = 9; e < 15; e++) r.setUint8(e, 0);
		r.setUint8(15, +!!this.appendDigest), e.set(new Uint8Array(n), t);
	}
	splitByte(e) {
		return [e & 15, e >> 4 & 15];
	}
	joinByte(e, t) {
		return e & 15 | (t & 15) << 4;
	}
	getAlignmentDataNeeded(e, t) {
		let n = e.addr % this.IROM_ALIGN - this.SEG_HEADER_LEN, r = this.IROM_ALIGN - t % this.IROM_ALIGN + n;
		return r === 0 || r === this.IROM_ALIGN ? 0 : (r -= this.SEG_HEADER_LEN, r < 0 && (r += this.IROM_ALIGN), r);
	}
};
// node_modules/esptool-js/lib/image/esp8266.js
_s();
var ws = class extends Ss {
	constructor(e, t = null) {
		super(e), this.version = 1, this.ROM_LOADER = e, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
	}
	loadFromFile(e) {
		let t = e instanceof Uint8Array ? e : Pi(e), n = 0, r = this.loadCommonHeader(t, n, 233);
		n += 8;
		for (let e = 0; e < r; e++) {
			let e = this.loadSegment(t, n);
			n += 8 + e.data.length;
		}
		this.checksum = this.readChecksum(t, n), this.verify();
	}
	defaultOutputName(e) {
		return e + "-";
	}
}, Ts = class e extends Ss {
	constructor(e, t = null) {
		super(e), this.version = 2, this.ROM_LOADER = e, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
	}
	async loadFromFile(t) {
		let n = t instanceof Uint8Array ? t : Pi(t), r = 0, i = this.loadCommonHeader(n, r, e.IMAGE_V2_MAGIC);
		r += 8, i !== e.IMAGE_V2_SEGMENT && console.warn(`Warning: V2 header has unexpected "segment" count ${i} (usually 4)`);
		let a = this.flashMode, o = this.flashSizeFreq, s = this.entrypoint, c = this.loadSegment(n, r, !0);
		c.addr = 0, c.includeInChecksum = !1, r += 8 + c.data.length;
		let l = this.loadCommonHeader(n, r, 233);
		r += 8, a !== this.flashMode && console.warn(`WARNING: Flash mode value in first header (0x${a.toString(16)}) disagrees with second (0x${this.flashMode.toString(16)}). Using second value.`), o !== this.flashSizeFreq && console.warn(`WARNING: Flash size/freq value in first header (0x${o.toString(16)}) disagrees with second (0x${this.flashSizeFreq.toString(16)}). Using second value.`), s !== this.entrypoint && console.warn(`WARNING: Entrypoint address in first header (0x${s.toString(16)}) disagrees with second header (0x${this.entrypoint.toString(16)}). Using second value.`);
		for (let e = 0; e < l; e++) {
			let e = this.loadSegment(n, r);
			r += 8 + e.data.length;
		}
		this.checksum = this.readChecksum(n, r), this.verify();
	}
	defaultOutputName(e) {
		let t = this.getIromSegment(), n = 0;
		return t !== null && (n = t.addr - gs.IROM_MAP_START), `${e.replace(/\.[^/.]+$/, "")}-0x${(n & -4096).toString(16).padStart(5, "0")}.bin`;
	}
};
Ts.IMAGE_V2_MAGIC = 234, Ts.IMAGE_V2_SEGMENT = 4;
// node_modules/esptool-js/lib/image/others.js
var Es = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, Ds = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, Os = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, ks = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			16384,
			32768,
			65536
		], this.ROM_LOADER = e;
	}
}, As = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			8192,
			16384,
			32768,
			65536
		], this.ROM_LOADER = e;
	}
}, js = class extends As {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, Ms = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, Ns = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, Ps = class extends As {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, Fs = class extends As {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, Is = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			8192,
			16384,
			32768,
			65536
		], this.ROM_LOADER = e;
	}
}, Ls = class extends Ms {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			32768,
			65536,
			131072,
			262144
		], this.ROM_LOADER = e;
	}
}, Rs = class extends Cs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
};
// node_modules/esptool-js/lib/image/index.js
async function zs(e, t) {
	let n = t instanceof Uint8Array ? t : Pi(t), r = e.CHIP_NAME.toLowerCase().replace(/[-()]/g, ""), i;
	if (r !== "esp8266") switch (r) {
		case "esp32":
			i = Cs;
			break;
		case "esp32s2":
			i = Es;
			break;
		case "esp32s3":
			i = Ds;
			break;
		case "esp32s31":
			i = Ls;
			break;
		case "esp32c3":
			i = Os;
			break;
		case "esp32c2":
			i = ks;
			break;
		case "esp32c6":
			i = As;
			break;
		case "esp32c61":
			i = js;
			break;
		case "esp32c5":
			i = Ms;
			break;
		case "esp32e22":
			i = Rs;
			break;
		case "esp32h2":
			i = Ps;
			break;
		case "esp32h21":
			i = Fs;
			break;
		case "esp32h4":
			i = Is;
			break;
		case "esp32p4":
			i = Ns;
			break;
		default: throw new d(`Unsupported chip name: ${r}`);
	}
	else {
		let e = n[0];
		if (e === 233) i = ws;
		else if (e === Ts.IMAGE_V2_MAGIC) i = Ts;
		else throw new d(`Invalid image magic number: ${e}`);
	}
	let a = new i(e), o = a;
	if (typeof o.loadFromFile == "function") {
		let e = o.loadFromFile(n);
		e instanceof Promise && await e;
	}
	return a;
}
// node_modules/esptool-js/lib/targets/esp32.js
var Bs = /* @__PURE__ */ c({ ESP32ROM: () => Vs }), Vs, Hs = o((() => {
	ms(), Vs = class extends ps {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32", this.IMAGE_CHIP_ID = 0, this.USES_MAGIC_VALUE = !0, this.EFUSE_RD_REG_BASE = 0x3ff5a000, this.DR_REG_SYSCON_BASE = 0x3ff66000, this.UART_CLKDIV_REG = 0x3ff40014, this.UART_CLKDIV_MASK = 0xfffff, this.UART_DATE_REG_ADDR = 0x60000078, this.XTAL_CLK_DIVIDER = 1, this.IROM_MAP_START = 0x400d0000, this.IROM_MAP_END = 0x40400000, this.DROM_MAP_START = 0x3f400000, this.DROM_MAP_END = 0x3f800000, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x3f400000,
					0x3f800000,
					"DROM"
				],
				[
					0x3f800000,
					0x3fc00000,
					"EXTRAM_DATA"
				],
				[
					0x3ff80000,
					0x3ff82000,
					"RTC_DRAM"
				],
				[
					0x3ff90000,
					0x40000000,
					"BYTE_ACCESSIBLE"
				],
				[
					0x3ffae000,
					0x40000000,
					"DRAM"
				],
				[
					0x3ffe0000,
					0x3ffffffc,
					"DIRAM_DRAM"
				],
				[
					0x40000000,
					0x40070000,
					"IROM"
				],
				[
					0x40070000,
					0x40078000,
					"CACHE_PRO"
				],
				[
					0x40078000,
					0x40080000,
					"CACHE_APP"
				],
				[
					0x40080000,
					0x400a0000,
					"IRAM"
				],
				[
					0x400a0000,
					0x400bfffc,
					"DIRAM_IRAM"
				],
				[
					0x400c0000,
					0x400c2000,
					"RTC_IRAM"
				],
				[
					0x400d0000,
					0x40400000,
					"IROM"
				],
				[
					0x50000000,
					0x50002000,
					"RTC_DATA"
				]
			], this.FLASH_SIZES = {
				"1MB": 0,
				"2MB": 16,
				"4MB": 32,
				"8MB": 48,
				"16MB": 64,
				"32MB": 80,
				"64MB": 96,
				"128MB": 112
			}, this.FLASH_FREQUENCY = {
				"80m": 15,
				"40m": 0,
				"26m": 1,
				"20m": 2
			}, this.FLASH_WRITE_SIZE = 1024, this.BOOTLOADER_FLASH_OFFSET = 4096, this.SPI_REG_BASE = 0x3ff42000, this.SPI_USR_OFFS = 28, this.SPI_USR1_OFFS = 32, this.SPI_USR2_OFFS = 36, this.SPI_W0_OFFS = 128, this.SPI_MOSI_DLEN_OFFS = 40, this.SPI_MISO_DLEN_OFFS = 44;
		}
		async readEfuse(e, t) {
			let n = this.EFUSE_RD_REG_BASE + 4 * t;
			return e.debug("Read efuse " + n), await e.readReg(n);
		}
		async getPkgVersion(e) {
			let t = await this.readEfuse(e, 3), n = t >> 9 & 7;
			return n += (t >> 2 & 1) << 3, n;
		}
		async getChipRevision(e) {
			let t = await this.readEfuse(e, 3), n = await this.readEfuse(e, 5), r = await e.readReg(this.DR_REG_SYSCON_BASE + 124), i = t >> 15 & 1, a = n >> 20 & 1, o = r >> 31 & 1;
			return i == 0 ? 0 : a == 0 ? 1 : o == 0 ? 2 : 3;
		}
		async getChipDescription(e) {
			let t = [
				"ESP32-D0WDQ6",
				"ESP32-D0WD",
				"ESP32-D2WD",
				"",
				"ESP32-U4WDH",
				"ESP32-PICO-D4",
				"ESP32-PICO-V3-02"
			], n = "", r = await this.getPkgVersion(e), i = await this.getChipRevision(e), a = i == 3;
			return await this.readEfuse(e, 3) & 1 && (t[0] = "ESP32-S0WDQ6", t[1] = "ESP32-S0WD"), a && (t[5] = "ESP32-PICO-V3"), n = r >= 0 && r <= 6 ? t[r] : "Unknown ESP32", a && (r === 0 || r === 1) && (n += "-V3"), n + " (revision " + i + ")";
		}
		async getChipFeatures(e) {
			let t = ["Wi-Fi"], n = await this.readEfuse(e, 3);
			n & 2 || t.push(" BT"), n & 1 ? t.push(" Single Core") : t.push(" Dual Core"), n & 8192 && (n & 4096 ? t.push(" 160MHz") : t.push(" 240MHz"));
			let r = await this.getPkgVersion(e);
			[
				2,
				4,
				5,
				6
			].indexOf(r) !== -1 && t.push(" Embedded Flash"), r === 6 && t.push(" Embedded PSRAM"), await this.readEfuse(e, 4) >> 8 & 31 && t.push(" VRef calibration in efuse"), n >> 14 & 1 && t.push(" BLK3 partially reserved");
			let i = await this.readEfuse(e, 6) & 3;
			return t.push(" Coding Scheme " + [
				"None",
				"3/4",
				"Repeat (UNSUPPORTED)",
				"Invalid"
			][i]), t;
		}
		async getCrystalFreq(e) {
			let t = await e.readReg(this.UART_CLKDIV_REG) & this.UART_CLKDIV_MASK, n = e.transport.baudrate * t / 1e6 / this.XTAL_CLK_DIVIDER, r;
			return r = n > 33 ? 40 : 26, Math.abs(r - n) > 1 && e.info("WARNING: Unsupported crystal in use"), r;
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async readMac(e) {
			let t = await this.readEfuse(e, 1);
			t >>>= 0;
			let n = await this.readEfuse(e, 2);
			n >>>= 0;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
	};
})), Us = /* @__PURE__ */ c({ ESP32C3ROM: () => Ws }), Ws, Gs = o((() => {
	Hs(), Ws = class extends Vs {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-C3", this.IMAGE_CHIP_ID = 5, this.USES_MAGIC_VALUE = !1, this.EFUSE_BASE = 0x60008800, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.UART_CLKDIV_REG = 0x3ff40014, this.UART_CLKDIV_MASK = 0xfffff, this.UART_DATE_REG_ADDR = 0x6000007c, this.FLASH_WRITE_SIZE = 1024, this.BOOTLOADER_FLASH_OFFSET = 0, this.SPI_REG_BASE = 0x60002000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x42800000, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x3c000000,
					0x3c800000,
					"DROM"
				],
				[
					0x3fc80000,
					0x3fce0000,
					"DRAM"
				],
				[
					0x3fc88000,
					0x3fd00000,
					"BYTE_ACCESSIBLE"
				],
				[
					0x3ff00000,
					0x3ff20000,
					"DROM_MASK"
				],
				[
					0x40000000,
					0x40060000,
					"IROM_MASK"
				],
				[
					0x42000000,
					0x42800000,
					"IROM"
				],
				[
					0x4037c000,
					0x403e0000,
					"IRAM"
				],
				[
					0x50000000,
					0x50002000,
					"RTC_IRAM"
				],
				[
					0x50000000,
					0x50002000,
					"RTC_DRAM"
				],
				[
					0x600fe000,
					0x60100000,
					"MEM_INTERNAL2"
				]
			];
		}
		async getPkgVersion(e) {
			let t = this.EFUSE_BASE + 68 + 12;
			return await e.readReg(t) >> 21 & 7;
		}
		async getChipRevision(e) {
			let t = this.EFUSE_BASE + 68 + 12;
			return (await e.readReg(t) & 7 << 18) >> 18;
		}
		async getMinorChipVersion(e) {
			let t = this.EFUSE_BASE + 68 + 20, n = await e.readReg(t) >> 23 & 1, r = this.EFUSE_BASE + 68 + 12, i = await e.readReg(r) >> 18 & 7;
			return (n << 3) + i;
		}
		async getMajorChipVersion(e) {
			let t = this.EFUSE_BASE + 68 + 20;
			return await e.readReg(t) >> 24 & 3;
		}
		async getChipDescription(e) {
			let t = {
				0: "ESP32-C3 (QFN32)",
				1: "ESP8685 (QFN28)",
				2: "ESP32-C3 AZ (QFN32)",
				3: "ESP8686 (QFN24)"
			}, n = await this.getPkgVersion(e), r = await this.getMajorChipVersion(e), i = await this.getMinorChipVersion(e);
			return `${t[n] || "Unknown ESP32-C3"} (revision v${r}.${i})`;
		}
		async getFlashCap(e) {
			let t = this.EFUSE_BASE + 68 + 12;
			return await e.readReg(t) >> 27 & 7;
		}
		async getFlashVendor(e) {
			let t = this.EFUSE_BASE + 68 + 16;
			return {
				1: "XMC",
				2: "GD",
				3: "FM",
				4: "TT",
				5: "ZBIT"
			}[await e.readReg(t) & 7] || "";
		}
		async getChipFeatures(e) {
			let t = ["Wi-Fi", "BLE"], n = {
				0: null,
				1: "Embedded Flash 4MB",
				2: "Embedded Flash 2MB",
				3: "Embedded Flash 1MB",
				4: "Embedded Flash 8MB"
			}, r = await this.getFlashCap(e), i = await this.getFlashVendor(e), a = n[r], o = a === void 0 ? "Unknown Embedded Flash" : a;
			return a !== null && t.push(`${o} (${i})`), t;
		}
		async getCrystalFreq(e) {
			return 40;
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
		getEraseSize(e, t) {
			return t;
		}
	};
})), Ks = /* @__PURE__ */ c({ ESP32C2ROM: () => qs }), qs, Js = o((() => {
	Gs(), qs = class extends Ws {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-C2", this.IMAGE_CHIP_ID = 12, this.EFUSE_BASE = 0x60008800, this.MAC_EFUSE_REG = this.EFUSE_BASE + 64, this.UART_CLKDIV_REG = 0x60000014, this.UART_CLKDIV_MASK = 0xfffff, this.UART_DATE_REG_ADDR = 0x6000007c, this.XTAL_CLK_DIVIDER = 1, this.FLASH_WRITE_SIZE = 1024, this.BOOTLOADER_FLASH_OFFSET = 0, this.SPI_REG_BASE = 0x60002000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x42400000, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x3c000000,
					0x3c400000,
					"DROM"
				],
				[
					0x3fca0000,
					0x3fce0000,
					"DRAM"
				],
				[
					0x3fc88000,
					0x3fd00000,
					"BYTE_ACCESSIBLE"
				],
				[
					0x3ff00000,
					0x3ff50000,
					"DROM_MASK"
				],
				[
					0x40000000,
					0x40090000,
					"IROM_MASK"
				],
				[
					0x42000000,
					0x42400000,
					"IROM"
				],
				[
					0x4037c000,
					0x403c0000,
					"IRAM"
				]
			];
		}
		async getPkgVersion(e) {
			let t = this.EFUSE_BASE + 64 + 4;
			return await e.readReg(t) >> 22 & 7;
		}
		async getChipRevision(e) {
			let t = this.EFUSE_BASE + 64 + 4;
			return (await e.readReg(t) & 3 << 20) >> 20;
		}
		async getChipDescription(e) {
			let t, n = await this.getPkgVersion(e);
			t = n === 0 || n === 1 ? "ESP32-C2" : "unknown ESP32-C2";
			let r = await this.getChipRevision(e);
			return t += " (revision " + r + ")", t;
		}
		async getChipFeatures(e) {
			return ["Wi-Fi", "BLE"];
		}
		async getCrystalFreq(e) {
			let t = await e.readReg(this.UART_CLKDIV_REG) & this.UART_CLKDIV_MASK, n = e.transport.baudrate * t / 1e6 / this.XTAL_CLK_DIVIDER, r;
			return r = n > 33 ? 40 : 26, Math.abs(r - n) > 1 && e.info("WARNING: Unsupported crystal in use"), r;
		}
		async changeBaudRate(e) {
			await this.getCrystalFreq(e) === 26 && e.changeBaud();
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
		getEraseSize(e, t) {
			return t;
		}
	};
})), Ys = /* @__PURE__ */ c({ ESP32C6ROM: () => Xs }), Xs, Zs = o((() => {
	Gs(), Xs = class extends Ws {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-C6", this.IMAGE_CHIP_ID = 13, this.EFUSE_BASE = 0x600b0800, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.UART_CLKDIV_REG = 0x3ff40014, this.UART_CLKDIV_MASK = 0xfffff, this.UART_DATE_REG_ADDR = 0x6000007c, this.FLASH_WRITE_SIZE = 1024, this.BOOTLOADER_FLASH_OFFSET = 0, this.SPI_REG_BASE = 0x60003000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x42800000, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x42000000,
					0x43000000,
					"DROM"
				],
				[
					0x40800000,
					0x40880000,
					"DRAM"
				],
				[
					0x40800000,
					0x40880000,
					"BYTE_ACCESSIBLE"
				],
				[
					1074048e3,
					0x40050000,
					"DROM_MASK"
				],
				[
					0x40000000,
					1074048e3,
					"IROM_MASK"
				],
				[
					0x42000000,
					0x43000000,
					"IROM"
				],
				[
					0x40800000,
					0x40880000,
					"IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_DRAM"
				],
				[
					0x600fe000,
					0x60100000,
					"MEM_INTERNAL2"
				]
			];
		}
		async getPkgVersion(e) {
			let t = this.EFUSE_BASE + 68 + 12;
			return await e.readReg(t) >> 21 & 7;
		}
		async getChipRevision(e) {
			let t = this.EFUSE_BASE + 68 + 12;
			return (await e.readReg(t) & 7 << 18) >> 18;
		}
		async getChipDescription(e) {
			let t;
			t = await this.getPkgVersion(e) === 0 ? "ESP32-C6" : "unknown ESP32-C6";
			let n = await this.getChipRevision(e);
			return t += " (revision " + n + ")", t;
		}
		async getChipFeatures(e) {
			return [
				"Wi-Fi 6",
				"BT 5",
				"IEEE802.15.4"
			];
		}
		async getCrystalFreq(e) {
			return 40;
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
		getEraseSize(e, t) {
			return t;
		}
	};
})), Qs = /* @__PURE__ */ c({ ESP32C5ROM: () => $s }), $s, ec = o((() => {
	Zs(), $s = class extends Xs {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-C5", this.IMAGE_CHIP_ID = 23, this.BOOTLOADER_FLASH_OFFSET = 8192, this.EFUSE_BASE = 0x600b4800, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.UART_CLKDIV_REG = 0x60000014, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_REG = this.EFUSE_BASE + 52, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_SHIFT = 10, this.FORCE_USE_KEY_MANAGER_VAL_XTS_AES_KEY = 2, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY0_SHIFT = 22, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY1_SHIFT = 27, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY2_SHIFT = 0, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY3_SHIFT = 5, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY4_SHIFT = 10, this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY5_SHIFT = 15, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 1 << 20, this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_BASE + 52, this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 7 << 16, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 56, this.EFUSE_SECURE_BOOT_EN_MASK = 1 << 25, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x44000000, this.DROM_MAP_START = 0x42000000, this.DROM_MAP_END = 0x44000000, this.PCR_SYSCLK_CONF_REG = 0x60096110, this.PCR_SYSCLK_XTAL_FREQ_V = 127 << 24, this.PCR_SYSCLK_XTAL_FREQ_S = 24, this.XTAL_CLK_DIVIDER = 1, this.UARTDEV_BUF_NO = 0x4085f514, this.CHIP_DETECT_MAGIC_VALUE = [
				285294703,
				0x63e1406f,
				0x5fd1406f,
				820080751
			], this.FLASH_FREQUENCY = {
				"80m": 15,
				"40m": 0,
				"20m": 2
			}, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x42000000,
					0x44000000,
					"DROM"
				],
				[
					0x40800000,
					0x40860000,
					"DRAM"
				],
				[
					0x40800000,
					0x40860000,
					"BYTE_ACCESSIBLE"
				],
				[
					0x4003a000,
					0x40040000,
					"DROM_MASK"
				],
				[
					0x40000000,
					0x4003a000,
					"IROM_MASK"
				],
				[
					0x42000000,
					0x44000000,
					"IROM"
				],
				[
					0x40800000,
					0x40860000,
					"IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_DRAM"
				],
				[
					0x600fe000,
					0x60100000,
					"MEM_INTERNAL2"
				]
			], this.UF2_FAMILY_ID = 0xf71c0343, this.EFUSE_MAX_KEY = 5, this.PURPOSE_VAL_XTS_AES128_KEY = 4, this.KEY_PURPOSES = {
				0: "USER/EMPTY",
				1: "ECDSA_KEY",
				4: "XTS_AES_128_KEY",
				5: "HMAC_DOWN_ALL",
				6: "HMAC_DOWN_JTAG",
				7: "HMAC_DOWN_DIGITAL_SIGNATURE",
				8: "HMAC_UP",
				9: "SECURE_BOOT_DIGEST0",
				10: "SECURE_BOOT_DIGEST1",
				11: "SECURE_BOOT_DIGEST2",
				12: "KM_INIT_KEY",
				15: "XTS_AES_128_PSRAM_KEY",
				16: "ECDSA_KEY_P192",
				17: "ECDSA_KEY_P384_L",
				18: "ECDSA_KEY_P384_H"
			};
		}
		async getPkgVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 8) >> 26 & 7;
		}
		async getMinorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 8) & 15;
		}
		async getMajorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 8) >> 4 & 3;
		}
		async getChipDescription(e) {
			let t = await this.getPkgVersion(e), n;
			n = t === 0 ? "ESP32-C5" : "unknown ESP32-C5";
			let r = await this.getMajorChipVersion(e), i = await this.getMinorChipVersion(e);
			return `${n} (revision v${r}.${i})`;
		}
		async getChipFeatures(e) {
			return [
				"Wi-Fi 6 (dual-band)",
				"BT 5 (LE)",
				"IEEE802.15.4",
				"Single Core + LP Core",
				"240MHz"
			];
		}
		async getCrystalFreq(e) {
			let t = await e.readReg(this.UART_CLKDIV_REG) & this.UART_CLKDIV_MASK, n = e.transport.baudrate * t / 1e6 / this.XTAL_CLK_DIVIDER, r;
			return r = n > 45 ? 48 : n > 33 ? 40 : 26, Math.abs(r - n) > 1 && e.info("WARNING: Unsupported crystal in use"), r;
		}
		async getCrystalFreqRomExpect(e) {
			return (await e.readReg(this.PCR_SYSCLK_CONF_REG) & this.PCR_SYSCLK_XTAL_FREQ_V) >> this.PCR_SYSCLK_XTAL_FREQ_S;
		}
		async getKeyBlockPurpose(e, t) {
			if (t < 0 || t > this.EFUSE_MAX_KEY) throw Error(`Valid key block numbers must be in range 0-${this.EFUSE_MAX_KEY}`);
			let [n, r] = [
				[this.EFUSE_PURPOSE_KEY0_REG, this.EFUSE_PURPOSE_KEY0_SHIFT],
				[this.EFUSE_PURPOSE_KEY1_REG, this.EFUSE_PURPOSE_KEY1_SHIFT],
				[this.EFUSE_PURPOSE_KEY2_REG, this.EFUSE_PURPOSE_KEY2_SHIFT],
				[this.EFUSE_PURPOSE_KEY3_REG, this.EFUSE_PURPOSE_KEY3_SHIFT],
				[this.EFUSE_PURPOSE_KEY4_REG, this.EFUSE_PURPOSE_KEY4_SHIFT],
				[this.EFUSE_PURPOSE_KEY5_REG, this.EFUSE_PURPOSE_KEY5_SHIFT]
			][t];
			return await e.readReg(n) >> r & 31;
		}
		async isFlashEncryptionKeyValid(e) {
			let t = [];
			for (let n = 0; n <= this.EFUSE_MAX_KEY; n++) {
				let r = await this.getKeyBlockPurpose(e, n);
				t.push(r);
			}
			return t.some((e) => e === this.PURPOSE_VAL_XTS_AES128_KEY) ? !0 : (await e.readReg(this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_REG) >> this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_SHIFT & this.FORCE_USE_KEY_MANAGER_VAL_XTS_AES_KEY) !== 0;
		}
		checkSpiConnection(e, t) {
			if (!t.every((e) => e >= 0 && e <= 28)) throw Error("SPI Pin numbers must be in the range 0-28.");
			t.some((e) => e === 13 || e === 14) && e.info("GPIO pins 13 and 14 are used by USB-Serial/JTAG, consider using other pins for SPI flash connection.");
		}
		async usesUsbJtagSerial(e) {
			let t = this.UARTDEV_BUF_NO;
			return (await e.readReg(t) & 255) == 3;
		}
		async watchdogReset(e) {
			throw e.info("Hard resetting with a watchdog..."), Error("watchdogReset not yet implemented for ESP32-C5");
		}
		async changeBaud(e) {
			if (e.secureDownloadMode) e.info("Baud rate change is not supported in secure download mode. Keeping 115200 baud.");
			else {
				if (!e.IS_STUB) {
					let t = await this.getCrystalFreqRomExpect(e), n = await this.getCrystalFreq(e);
					e.info(`ROM expects crystal freq: ${t} MHz, detected ${n} MHz.`), (n === 48 && t === 40 || n === 40 && t === 48) && e.info("Crystal frequency mismatch detected. Baud rate adjustment may be needed but is not fully implemented in this version.");
				}
				await e.changeBaud();
			}
		}
	};
})), tc = /* @__PURE__ */ c({ ESP32C61ROM: () => nc }), nc, rc = o((() => {
	Zs(), nc = class extends Xs {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-C61", this.IMAGE_CHIP_ID = 20, this.CHIP_DETECT_MAGIC_VALUE = [871374959, 606167151], this.UART_DATE_REG_ADDR = 0x6000007c, this.EFUSE_BASE = 0x600b4800, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY0_SHIFT = 0, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY1_SHIFT = 4, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY2_SHIFT = 8, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY3_SHIFT = 12, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY4_SHIFT = 16, this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY5_SHIFT = 20, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 16384, this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_BASE + 48, this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 7 << 23, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 52, this.EFUSE_SECURE_BOOT_EN_MASK = 1 << 26, this.FLASH_FREQUENCY = {
				"80m": 15,
				"40m": 0,
				"20m": 2
			}, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x42800000, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x41800000,
					0x42000000,
					"DROM"
				],
				[
					0x40800000,
					0x40860000,
					"DRAM"
				],
				[
					0x40800000,
					0x40860000,
					"BYTE_ACCESSIBLE"
				],
				[
					1074048e3,
					0x40050000,
					"DROM_MASK"
				],
				[
					0x40000000,
					1074048e3,
					"IROM_MASK"
				],
				[
					0x41000000,
					0x41800000,
					"IROM"
				],
				[
					0x40800000,
					0x40860000,
					"IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_DRAM"
				],
				[
					0x600fe000,
					0x60100000,
					"MEM_INTERNAL2"
				]
			], this.UF2_FAMILY_ID = 0x77d850c4, this.EFUSE_MAX_KEY = 5, this.KEY_PURPOSES = {
				0: "USER/EMPTY",
				1: "ECDSA_KEY",
				2: "XTS_AES_256_KEY_1",
				3: "XTS_AES_256_KEY_2",
				4: "XTS_AES_128_KEY",
				5: "HMAC_DOWN_ALL",
				6: "HMAC_DOWN_JTAG",
				7: "HMAC_DOWN_DIGITAL_SIGNATURE",
				8: "HMAC_UP",
				9: "SECURE_BOOT_DIGEST0",
				10: "SECURE_BOOT_DIGEST1",
				11: "SECURE_BOOT_DIGEST2",
				12: "KM_INIT_KEY",
				13: "XTS_AES_256_KEY_1_PSRAM",
				14: "XTS_AES_256_KEY_2_PSRAM",
				15: "XTS_AES_128_KEY_PSRAM"
			};
		}
		async getPkgVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 8) >> 26 & 7;
		}
		async getMinorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 8) & 15;
		}
		async getMajorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 8) >> 4 & 3;
		}
		async getChipDescription(e) {
			let t = await this.getPkgVersion(e), n;
			n = t === 0 ? "ESP32-C61" : "unknown ESP32-C61";
			let r = await this.getMajorChipVersion(e), i = await this.getMinorChipVersion(e);
			return `${n} (revision v${r}.${i})`;
		}
		async getChipFeatures(e) {
			return ["WiFi 6", "BT 5"];
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
	};
}));
Js(), ec(), rc(), Hs();
var ic = class extends Vs {
	constructor() {
		super(...arguments), this.CHIP_NAME = "ESP32-E22", this.IMAGE_CHIP_ID = 31, this.USES_MAGIC_VALUE = !1, this.IROM_MAP_START = 0x3c000000, this.IROM_MAP_END = 0x40000000, this.DROM_MAP_START = 0x3c000000, this.DROM_MAP_END = 0x40000000, this.BOOTLOADER_FLASH_OFFSET = 0, this.UART_DATE_REG_ADDR = 0xc310208c, this.UART_CLKDIV_REG = 0xc3102014, this.EFUSE_BASE = 0xc4008000, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.SPI_REG_BASE = 0xc3003000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.SPI_ADDR_REG_MSB = !1, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY0_SHIFT = 24, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY1_SHIFT = 28, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY2_SHIFT = 0, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY3_SHIFT = 4, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY4_SHIFT = 8, this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY5_SHIFT = 12, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 56, this.EFUSE_SECURE_BOOT_EN_MASK = 1 << 20, this.PURPOSE_VAL_XTS_AES256_KEY_1 = 2, this.PURPOSE_VAL_XTS_AES256_KEY_2 = 3, this.PURPOSE_VAL_XTS_AES128_KEY = 4, this.FLASH_ENCRYPTED_WRITE_ALIGN = 16, this.USB_RAM_BLOCK = 2048, this.MEMORY_MAP = [
			[
				0,
				65536,
				"PADDING"
			],
			[
				0x3c000000,
				0x40000000,
				"DROM"
			],
			[
				822083584,
				824180736,
				"DRAM"
			],
			[
				822083584,
				824180736,
				"BYTE_ACCESSIBLE"
			],
			[
				805306368,
				806486016,
				"DROM_MASK"
			],
			[
				805306368,
				806486016,
				"IROM_MASK"
			],
			[
				0x3c000000,
				0x40000000,
				"IROM"
			],
			[
				821952512,
				824180736,
				"IRAM"
			],
			[
				0xc0000000,
				0xc0008000,
				"RTC_IRAM"
			],
			[
				0xc0000000,
				0xc0008000,
				"RTC_DRAM"
			]
		], this.EFUSE_MAX_KEY = 5, this.KEY_PURPOSES = {
			0: "USER/EMPTY",
			1: "ECDSA_KEY",
			2: "XTS_AES_256_KEY_1",
			3: "XTS_AES_256_KEY_2",
			4: "XTS_AES_128_KEY",
			5: "HMAC_DOWN_ALL",
			6: "HMAC_DOWN_JTAG",
			7: "HMAC_DOWN_DIGITAL_SIGNATURE",
			8: "HMAC_UP",
			9: "SECURE_BOOT_DIGEST0",
			10: "SECURE_BOOT_DIGEST1",
			11: "SECURE_BOOT_DIGEST2",
			12: "KM_INIT_KEY"
		};
	}
	async getPkgVersion(e) {
		return 0;
	}
	async getMinorChipVersion(e) {
		return 0;
	}
	async getMajorChipVersion(e) {
		return 0;
	}
	async getChipRevision(e) {
		let t = await this.getMajorChipVersion(e), n = await this.getMinorChipVersion(e);
		return t * 100 + n;
	}
	async getChipDescription(e) {
		return `${await this.getPkgVersion(e) === 0 ? "ESP32-E22" : "unknown ESP32-E22"} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`;
	}
	async getChipFeatures(e) {
		return [
			"Wi-Fi 6E (tri-band, 2x2 MU-MIMO)",
			"BT 5.4 (LE) + Classic",
			"Dual Core",
			"500MHz"
		];
	}
	async readMac(e) {
		let t = await e.readReg(this.MAC_EFUSE_REG);
		t >>>= 0;
		let n = await e.readReg(this.MAC_EFUSE_REG + 4);
		n = n >>> 0 & 65535;
		let r = /* @__PURE__ */ new Uint8Array(6);
		return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
	}
	async getKeyBlockPurpose(e, t) {
		if (t < 0 || t > this.EFUSE_MAX_KEY) throw Error(`Valid key block numbers must be in range 0-${this.EFUSE_MAX_KEY}`);
		let [n, r] = [
			[this.EFUSE_PURPOSE_KEY0_REG, this.EFUSE_PURPOSE_KEY0_SHIFT],
			[this.EFUSE_PURPOSE_KEY1_REG, this.EFUSE_PURPOSE_KEY1_SHIFT],
			[this.EFUSE_PURPOSE_KEY2_REG, this.EFUSE_PURPOSE_KEY2_SHIFT],
			[this.EFUSE_PURPOSE_KEY3_REG, this.EFUSE_PURPOSE_KEY3_SHIFT],
			[this.EFUSE_PURPOSE_KEY4_REG, this.EFUSE_PURPOSE_KEY4_SHIFT],
			[this.EFUSE_PURPOSE_KEY5_REG, this.EFUSE_PURPOSE_KEY5_SHIFT]
		][t];
		return await e.readReg(n) >> r & 15;
	}
	checkSpiConnection(e, t) {
		if (!t.every((e) => e >= 0 && e <= 52)) throw Error("SPI Pin numbers must be in the range 0-52.");
		t.some((e) => e === 18 || e === 19) && e.info("GPIO pins 18 and 19 are used by USB-OTG, consider using other pins for SPI flash connection.");
	}
	async postConnect(e) {
		await e.usesUsbOtg() && (e.ESP_RAM_BLOCK = this.USB_RAM_BLOCK);
	}
}, ac = /* @__PURE__ */ c({ ESP32H2ROM: () => oc }), oc, sc = o((() => {
	Zs(), oc = class extends Xs {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-H2", this.IMAGE_CHIP_ID = 16, this.EFUSE_BASE = 0x600b0800, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.UART_CLKDIV_REG = 0x3ff40014, this.UART_CLKDIV_MASK = 0xfffff, this.UART_DATE_REG_ADDR = 0x6000007c, this.FLASH_WRITE_SIZE = 1024, this.BOOTLOADER_FLASH_OFFSET = 0, this.SPI_REG_BASE = 0x60003000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.USB_RAM_BLOCK = 2048, this.UARTDEV_BUF_NO_USB = 3, this.UARTDEV_BUF_NO = 0x3fcef14c, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x42800000, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x42000000,
					0x43000000,
					"DROM"
				],
				[
					0x40800000,
					0x40880000,
					"DRAM"
				],
				[
					0x40800000,
					0x40880000,
					"BYTE_ACCESSIBLE"
				],
				[
					1074048e3,
					0x40050000,
					"DROM_MASK"
				],
				[
					0x40000000,
					1074048e3,
					"IROM_MASK"
				],
				[
					0x42000000,
					0x43000000,
					"IROM"
				],
				[
					0x40800000,
					0x40880000,
					"IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_IRAM"
				],
				[
					0x50000000,
					0x50004000,
					"RTC_DRAM"
				],
				[
					0x600fe000,
					0x60100000,
					"MEM_INTERNAL2"
				]
			];
		}
		async getPkgVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 16) & 7;
		}
		async getMinorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 18 & 7;
		}
		async getMajorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 21 & 3;
		}
		async getChipDescription(e) {
			let t = await this.getPkgVersion(e), n;
			n = t === 0 ? "ESP32-H2" : "unknown ESP32-H2";
			let r = await this.getMajorChipVersion(e), i = await this.getMinorChipVersion(e);
			return `${n} (revision v${r}.${i})`;
		}
		async getChipFeatures(e) {
			return [
				"BT 5 (LE)",
				"IEEE802.15.4",
				"Single Core",
				"96MHz"
			];
		}
		async getCrystalFreq(e) {
			return 32;
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async postConnect(e) {
			let t = await e.readReg(this.UARTDEV_BUF_NO) & 255;
			e.debug("In _post_connect " + t), t == this.UARTDEV_BUF_NO_USB && (e.ESP_RAM_BLOCK = this.USB_RAM_BLOCK);
		}
		async usesUsbJtagSerial(e) {
			return (await e.readReg(this.UARTDEV_BUF_NO) & 255) === this.UARTDEV_BUF_NO_USB;
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
		getEraseSize(e, t) {
			return t;
		}
	};
}));
// node_modules/esptool-js/lib/targets/esp32h21.js
sc();
var cc = class extends oc {
	constructor() {
		super(...arguments), this.CHIP_NAME = "ESP32-H21", this.IMAGE_CHIP_ID = 25, this.USES_MAGIC_VALUE = !1, this.UF2_FAMILY_ID = 0xb6dd00af, this.DR_REG_LP_WDT_BASE = 0x600b1c00, this.RTC_CNTL_WDTCONFIG0_REG = this.DR_REG_LP_WDT_BASE + 0, this.RTC_CNTL_WDTWPROTECT_REG = this.DR_REG_LP_WDT_BASE + 28, this.RTC_CNTL_SWD_CONF_REG = this.DR_REG_LP_WDT_BASE + 32, this.RTC_CNTL_SWD_AUTO_FEED_EN = 1 << 18, this.RTC_CNTL_SWD_WPROTECT_REG = this.DR_REG_LP_WDT_BASE + 36, this.RTC_CNTL_SWD_WKEY = 0x50d83aa1, this.EFUSE_BASE = 0x600b4000, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY0_SHIFT = 24, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY1_SHIFT = 28, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY2_SHIFT = 0, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY3_SHIFT = 4, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY4_SHIFT = 8, this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY5_SHIFT = 12, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 1 << 20, this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_BASE + 52, this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 7 << 18, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 56, this.EFUSE_SECURE_BOOT_EN_MASK = 1 << 20, this.KEY_PURPOSES = {
			0: "USER/EMPTY",
			1: "ECDSA_KEY",
			2: "RESERVED",
			4: "XTS_AES_128_KEY",
			5: "HMAC_DOWN_ALL",
			6: "HMAC_DOWN_JTAG",
			7: "HMAC_DOWN_DIGITAL_SIGNATURE",
			8: "HMAC_UP",
			9: "SECURE_BOOT_DIGEST0",
			10: "SECURE_BOOT_DIGEST1",
			11: "SECURE_BOOT_DIGEST2"
		};
	}
	async getPkgVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 20) >> 11 & 7;
	}
	async getMinorChipVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 20) >> 4 & 15;
	}
	async getMajorChipVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 20) >> 8 & 3;
	}
	async getChipRevision(e) {
		let t = await this.getMajorChipVersion(e), n = await this.getMinorChipVersion(e);
		return t * 100 + n;
	}
	async getChipDescription(e) {
		return `${await this.getPkgVersion(e) === 0 ? "ESP32-H21" : "Unknown ESP32-H21"} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`;
	}
	async getChipFeatures(e) {
		return [
			"BT 5 (LE)",
			"IEEE802.15.4",
			"Single Core",
			"96MHz"
		];
	}
	async getCrystalFreq(e) {
		return 32;
	}
	checkSpiConnection(e, t) {
		if (!t.every((e) => e >= 0 && e <= 27)) throw Error("SPI Pin numbers must be in the range 0-27.");
		t.some((e) => e === 26 || e === 27) && e.info("GPIO pins 26 and 27 are used by USB-Serial/JTAG, consider using other pins for SPI flash connection.");
	}
};
// node_modules/esptool-js/lib/targets/esp32h4.js
Gs();
var lc = class extends Ws {
	constructor() {
		super(...arguments), this.CHIP_NAME = "ESP32-H4", this.IMAGE_CHIP_ID = 28, this.USES_MAGIC_VALUE = !1, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x42800000, this.DROM_MAP_START = 0x42800000, this.DROM_MAP_END = 0x43000000, this.BOOTLOADER_FLASH_OFFSET = 8192, this.SPI_REG_BASE = 0x60099000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.UART_DATE_REG_ADDR = 0x6001207c, this.EFUSE_BASE = 0x600b1800, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY0_SHIFT = 0, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY1_SHIFT = 5, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY2_SHIFT = 10, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY3_SHIFT = 15, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY4_SHIFT = 20, this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY5_SHIFT = 25, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 16384, this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_BASE + 48, this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 7 << 23, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 56, this.EFUSE_SECURE_BOOT_EN_MASK = 32, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_REG = this.EFUSE_BASE + 56, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_SHIFT = 19, this.FORCE_USE_KEY_MANAGER_VAL_XTS_AES_KEY = 2, this.PURPOSE_VAL_XTS_AES256_KEY_1 = 2, this.PURPOSE_VAL_XTS_AES256_KEY_2 = 3, this.PURPOSE_VAL_XTS_AES128_KEY = 4, this.FLASH_ENCRYPTED_WRITE_ALIGN = 16, this.FLASH_FREQUENCY = {
			"48m": 15,
			"24m": 0,
			"16m": 1,
			"12m": 2
		}, this.MEMORY_MAP = [
			[
				0,
				65536,
				"PADDING"
			],
			[
				0x42000000,
				0x44000000,
				"DROM"
			],
			[
				0x40810000,
				0x40860000,
				"DRAM"
			],
			[
				0x40810000,
				0x40860000,
				"BYTE_ACCESSIBLE"
			],
			[
				0x40000000,
				0x40050000,
				"DROM_MASK"
			],
			[
				0x40000000,
				0x40050000,
				"IROM_MASK"
			],
			[
				0x42000000,
				0x44000000,
				"IROM"
			],
			[
				0x40810000,
				0x40860000,
				"IRAM"
			],
			[
				0x50000000,
				0x50004000,
				"RTC_IRAM"
			],
			[
				0x50000000,
				0x50004000,
				"RTC_DRAM"
			],
			[
				0x60000000,
				0x60100000,
				"MEM_INTERNAL2"
			]
		], this.UF2_FAMILY_ID = 0x9e0baa8a, this.EFUSE_MAX_KEY = 5, this.KEY_PURPOSES = {
			0: "USER/EMPTY",
			1: "ECDSA_KEY",
			2: "XTS_AES_256_KEY_FLASH_1",
			3: "XTS_AES_256_KEY_FLASH_2",
			4: "XTS_AES_128_KEY",
			5: "HMAC_DOWN_ALL",
			6: "HMAC_DOWN_JTAG",
			7: "HMAC_DOWN_DIGITAL_SIGNATURE",
			8: "HMAC_UP",
			9: "SECURE_BOOT_DIGEST0",
			10: "SECURE_BOOT_DIGEST1",
			11: "SECURE_BOOT_DIGEST2",
			12: "KM_INIT_KEY",
			13: "XTS_AES_256_KEY_PSRAM_1",
			14: "XTS_AES_256_KEY_PSRAM_2",
			15: "XTS_AES_128_KEY_PSRAM",
			16: "ECDSA_KEY_P192",
			17: "ECDSA_KEY_P384_L",
			18: "ECDSA_KEY_P384_H"
		};
	}
	async getPkgVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 16) >> 12 & 7;
	}
	async getMinorChipVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 18 & 15;
	}
	async getMajorChipVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 22 & 3;
	}
	async getChipRevision(e) {
		let t = await this.getMajorChipVersion(e), n = await this.getMinorChipVersion(e);
		return t * 100 + n;
	}
	async getChipDescription(e) {
		return `${await this.getPkgVersion(e) === 0 ? "ESP32-H4 (QFN40)" : "Unknown ESP32-H4"} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`;
	}
	async getChipFeatures(e) {
		return [
			"BT 5 (LE)",
			"IEEE802.15.4",
			"Dual Core",
			"96MHz"
		];
	}
	async getCrystalFreq(e) {
		return 32;
	}
	async getKeyBlockPurpose(e, t) {
		if (t < 0 || t > this.EFUSE_MAX_KEY) throw Error(`Valid key block numbers must be in range 0-${this.EFUSE_MAX_KEY}`);
		let [n, r] = [
			[this.EFUSE_PURPOSE_KEY0_REG, this.EFUSE_PURPOSE_KEY0_SHIFT],
			[this.EFUSE_PURPOSE_KEY1_REG, this.EFUSE_PURPOSE_KEY1_SHIFT],
			[this.EFUSE_PURPOSE_KEY2_REG, this.EFUSE_PURPOSE_KEY2_SHIFT],
			[this.EFUSE_PURPOSE_KEY3_REG, this.EFUSE_PURPOSE_KEY3_SHIFT],
			[this.EFUSE_PURPOSE_KEY4_REG, this.EFUSE_PURPOSE_KEY4_SHIFT],
			[this.EFUSE_PURPOSE_KEY5_REG, this.EFUSE_PURPOSE_KEY5_SHIFT]
		][t];
		return await e.readReg(n) >> r & 31;
	}
	checkSpiConnection(e, t) {
		if (!t.every((e) => e >= 0 && e <= 39)) throw Error("SPI Pin numbers must be in the range 0-39.");
		t.some((e) => e === 13 || e === 14) && e.info("GPIO pins 13 and 14 are used by USB-Serial/JTAG, consider using other pins for SPI flash connection.");
	}
}, uc = /* @__PURE__ */ c({ ESP32P4ROM: () => dc }), dc, fc = o((() => {
	Hs(), dc = class extends Vs {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-P4", this.IMAGE_CHIP_ID = 18, this.IROM_MAP_START = 0x40000000, this.IROM_MAP_END = 0x4c000000, this.DROM_MAP_START = 0x40000000, this.DROM_MAP_END = 0x4c000000, this.BOOTLOADER_FLASH_OFFSET = 8192, this.CHIP_DETECT_MAGIC_VALUE = [0, 0xaddbad0], this.UART_DATE_REG_ADDR = 0x500ca08c, this.EFUSE_BASE = 0x5012d000, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.SPI_REG_BASE = 0x5008d000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.SPI_ADDR_REG_MSB = !1, this.USES_MAGIC_VALUE = !1, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_REG = this.EFUSE_BASE + 52, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_SHIFT = 9, this.FORCE_USE_KEY_MANAGER_VAL_XTS_AES_KEY = 2, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY0_SHIFT = 24, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY1_SHIFT = 28, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY2_SHIFT = 0, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY3_SHIFT = 4, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY4_SHIFT = 8, this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY5_SHIFT = 12, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 1 << 20, this.EFUSE_RD_REPEAT_DATA1_REG = this.EFUSE_BASE + 52, this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_RD_REPEAT_DATA1_REG, this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 7 << 18, this.EFUSE_DOWNLOAD_MODE_XPD_ON_MASK = 65536, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 56, this.EFUSE_SECURE_BOOT_EN_MASK = 1 << 20, this.PURPOSE_VAL_XTS_AES256_KEY_1 = 2, this.PURPOSE_VAL_XTS_AES256_KEY_2 = 3, this.PURPOSE_VAL_XTS_AES128_KEY = 4, this.SUPPORTS_ENCRYPTED_FLASH = !0, this.FLASH_ENCRYPTED_WRITE_ALIGN = 16, this.USB_RAM_BLOCK = 2048, this.GPIO_STRAP_REG = 0x500e0038, this.GPIO_STRAP_SPI_BOOT_MASK = 8, this.RTC_CNTL_OPTION1_REG = 0x50110008, this.RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK = 4, this.DR_REG_LPAON_BASE = 0x50110000, this.DR_REG_PMU_BASE = this.DR_REG_LPAON_BASE + 20480, this.DR_REG_LP_SYS_BASE = this.DR_REG_LPAON_BASE + 0, this.LP_SYSTEM_REG_ANA_XPD_PAD_GROUP_REG = this.DR_REG_LP_SYS_BASE + 268, this.PMU_EXT_LDO_P0_0P1A_ANA_REG = this.DR_REG_PMU_BASE + 444, this.PMU_ANA_0P1A_EN_CUR_LIM_0 = 1 << 27, this.PMU_EXT_LDO_P0_0P1A_REG = this.DR_REG_PMU_BASE + 440, this.PMU_0P1A_TARGET0_0 = 255 << 23, this.PMU_0P1A_FORCE_TIEH_SEL_0 = 128, this.PMU_DATE_REG = this.DR_REG_PMU_BASE + 1020, this.PMU_DATE_FLASH_FORCE_ON = 3, this.UARTDEV_BUF_NO_USB_OTG = 5, this.UARTDEV_BUF_NO_USB_JTAG_SERIAL = 6, this.DR_REG_LP_WDT_BASE = 0x50116000, this.RTC_CNTL_WDTCONFIG0_REG = this.DR_REG_LP_WDT_BASE + 0, this.RTC_CNTL_WDTCONFIG1_REG = this.DR_REG_LP_WDT_BASE + 4, this.RTC_CNTL_WDTWPROTECT_REG = this.DR_REG_LP_WDT_BASE + 24, this.RTC_CNTL_WDT_WKEY = 0x50d83aa1, this.RTC_CNTL_SWD_CONF_REG = this.DR_REG_LP_WDT_BASE + 28, this.RTC_CNTL_SWD_AUTO_FEED_EN = 1 << 18, this.RTC_CNTL_SWD_WPROTECT_REG = this.DR_REG_LP_WDT_BASE + 32, this.RTC_CNTL_SWD_WKEY = 0x50d83aa1, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x40000000,
					0x4c000000,
					"DROM"
				],
				[
					0x4ff00000,
					0x4ffa0000,
					"DRAM"
				],
				[
					0x4ff00000,
					0x4ffa0000,
					"BYTE_ACCESSIBLE"
				],
				[
					0x4fc00000,
					0x4fc20000,
					"DROM_MASK"
				],
				[
					0x4fc00000,
					0x4fc20000,
					"IROM_MASK"
				],
				[
					0x40000000,
					0x4c000000,
					"IROM"
				],
				[
					0x4ff00000,
					0x4ffa0000,
					"IRAM"
				],
				[
					0x50108000,
					0x50110000,
					"RTC_IRAM"
				],
				[
					0x50108000,
					0x50110000,
					"RTC_DRAM"
				],
				[
					0x600fe000,
					0x60100000,
					"MEM_INTERNAL2"
				]
			], this.UF2_FAMILY_ID = 0x3d308e94, this.EFUSE_MAX_KEY = 5, this.KEY_PURPOSES = {
				0: "USER/EMPTY",
				1: "ECDSA_KEY",
				2: "XTS_AES_256_KEY_1",
				3: "XTS_AES_256_KEY_2",
				4: "XTS_AES_128_KEY",
				5: "HMAC_DOWN_ALL",
				6: "HMAC_DOWN_JTAG",
				7: "HMAC_DOWN_DIGITAL_SIGNATURE",
				8: "HMAC_UP",
				9: "SECURE_BOOT_DIGEST0",
				10: "SECURE_BOOT_DIGEST1",
				11: "SECURE_BOOT_DIGEST2",
				12: "KM_INIT_KEY"
			};
		}
		async getPkgVersion(e) {
			let t = this.EFUSE_BLOCK1_ADDR + 8;
			return await e.readReg(t) >> 20 & 7;
		}
		async getMinorChipVersion(e) {
			let t = this.EFUSE_BLOCK1_ADDR + 8;
			return await e.readReg(t) & 15;
		}
		async getMajorChipVersion(e) {
			let t = this.EFUSE_BLOCK1_ADDR + 8, n = await e.readReg(t);
			return (n >> 23 & 1) << 2 | n >> 4 & 3;
		}
		async getChipRevision(e) {
			let t = await this.getMajorChipVersion(e), n = await this.getMinorChipVersion(e);
			return t * 100 + n;
		}
		async getStubJsonPath(e) {
			return await this.getChipRevision(e) < 300 ? "./targets/stub_flasher/esp32p4-rev1.json" : "./targets/stub_flasher/esp32p4.json";
		}
		async getChipDescription(e) {
			return `${{ 0: "ESP32-P4" }[await this.getPkgVersion(e)] || "Unknown ESP32-P4"} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`;
		}
		async getChipFeatures(e) {
			return ["High-Performance MCU"];
		}
		async getCrystalFreq(e) {
			return 40;
		}
		async getFlashVoltage(e) {}
		async overrideVddsdio(e) {
			e.debug("VDD_SDIO overrides are not supported for ESP32-P4");
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
		async getFlashCryptConfig(e) {}
		async getSecureBootEnabled(e) {
			return (await e.readReg(this.EFUSE_SECURE_BOOT_EN_REG) & this.EFUSE_SECURE_BOOT_EN_MASK) !== 0;
		}
		async getUartdevBufNo(e) {
			return (await this.getChipRevision(e) < 300 ? 0x4ff3feb0 : 0x4ffbfeb0) + 24;
		}
		async usesUsbOtg(e) {
			let t = await this.getUartdevBufNo(e);
			return (await e.readReg(t) & 255) === this.UARTDEV_BUF_NO_USB_OTG;
		}
		async usesUsbJtagSerial(e) {
			if (e.secureDownloadMode) return !1;
			let t = await this.getUartdevBufNo(e);
			return (await e.readReg(t) & 255) === this.UARTDEV_BUF_NO_USB_JTAG_SERIAL;
		}
		async getKeyBlockPurpose(e, t) {
			if (t < 0 || t > this.EFUSE_MAX_KEY) {
				e.debug(`Valid key block numbers must be in range 0-${this.EFUSE_MAX_KEY}`);
				return;
			}
			let [n, r] = [
				[this.EFUSE_PURPOSE_KEY0_REG, this.EFUSE_PURPOSE_KEY0_SHIFT],
				[this.EFUSE_PURPOSE_KEY1_REG, this.EFUSE_PURPOSE_KEY1_SHIFT],
				[this.EFUSE_PURPOSE_KEY2_REG, this.EFUSE_PURPOSE_KEY2_SHIFT],
				[this.EFUSE_PURPOSE_KEY3_REG, this.EFUSE_PURPOSE_KEY3_SHIFT],
				[this.EFUSE_PURPOSE_KEY4_REG, this.EFUSE_PURPOSE_KEY4_SHIFT],
				[this.EFUSE_PURPOSE_KEY5_REG, this.EFUSE_PURPOSE_KEY5_SHIFT]
			][t];
			return await e.readReg(n) >> r & 15;
		}
		async isFlashEncryptionKeyValid(e) {
			let t = [];
			for (let n = 0; n <= this.EFUSE_MAX_KEY; n++) {
				let r = await this.getKeyBlockPurpose(e, n);
				t.push(r);
			}
			return t.some((e) => e === this.PURPOSE_VAL_XTS_AES128_KEY) || t.some((e) => e === this.PURPOSE_VAL_XTS_AES256_KEY_1) && t.some((e) => e === this.PURPOSE_VAL_XTS_AES256_KEY_2) ? !0 : (await e.readReg(this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_REG) >> this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_SHIFT & this.FORCE_USE_KEY_MANAGER_VAL_XTS_AES_KEY) !== 0;
		}
		async postConnect(e) {
			await e.usesUsbOtg() && (e.ESP_RAM_BLOCK = this.USB_RAM_BLOCK), e.IS_STUB || await this.disableWatchdogs(e), e.secureDownloadMode || await this.powerOnFlash(e);
		}
		async disableWatchdogs(e) {
			if (await this.usesUsbJtagSerial(e)) {
				await e.writeReg(this.RTC_CNTL_WDTWPROTECT_REG, this.RTC_CNTL_WDT_WKEY), await e.writeReg(this.RTC_CNTL_WDTCONFIG0_REG, 0), await e.writeReg(this.RTC_CNTL_WDTWPROTECT_REG, 0), await e.writeReg(this.RTC_CNTL_SWD_WPROTECT_REG, this.RTC_CNTL_SWD_WKEY);
				let t = await e.readReg(this.RTC_CNTL_SWD_CONF_REG);
				await e.writeReg(this.RTC_CNTL_SWD_CONF_REG, t | this.RTC_CNTL_SWD_AUTO_FEED_EN), await e.writeReg(this.RTC_CNTL_SWD_WPROTECT_REG, 0);
			}
		}
		checkSpiConnection(e, t) {
			if (!t.every((e) => e >= 0 && e <= 54)) throw Error("SPI Pin numbers must be in the range 0-54.");
			t.some((e) => e === 24 || e === 25) && e.debug("GPIO pins 24 and 25 are used by USB-Serial/JTAG, consider using other pins for SPI flash connection.");
		}
		async watchdogReset(e) {
			e.info("Hard resetting with a watchdog..."), await e.writeReg(this.RTC_CNTL_WDTWPROTECT_REG, this.RTC_CNTL_WDT_WKEY), await e.writeReg(this.RTC_CNTL_WDTCONFIG1_REG, 2e3), await e.writeReg(this.RTC_CNTL_WDTCONFIG0_REG, -805306110), await e.writeReg(this.RTC_CNTL_WDTWPROTECT_REG, 0), await new Promise((e) => setTimeout(e, 500));
		}
		async powerOnFlash(e) {
			if (e.secureDownloadMode) throw Error("Powering on flash in secure download mode is not allowed.");
			let t = await this.getChipRevision(e);
			if (t !== 301 && t !== 302) return;
			if (t === 302 && await e.readReg(this.EFUSE_RD_REPEAT_DATA1_REG) & this.EFUSE_DOWNLOAD_MODE_XPD_ON_MASK) {
				let t = await e.readReg(this.PMU_DATE_REG);
				(t & this.PMU_DATE_FLASH_FORCE_ON) === this.PMU_DATE_FLASH_FORCE_ON && await e.writeReg(this.PMU_DATE_REG, t & ~this.PMU_DATE_FLASH_FORCE_ON);
				return;
			}
			await e.writeReg(this.LP_SYSTEM_REG_ANA_XPD_PAD_GROUP_REG, 1), await new Promise((e) => setTimeout(e, 10));
			let n = await e.readReg(this.PMU_EXT_LDO_P0_0P1A_ANA_REG);
			await e.writeReg(this.PMU_EXT_LDO_P0_0P1A_ANA_REG, n | this.PMU_ANA_0P1A_EN_CUR_LIM_0), n = await e.readReg(this.PMU_EXT_LDO_P0_0P1A_REG), await e.writeReg(this.PMU_EXT_LDO_P0_0P1A_REG, n | this.PMU_0P1A_FORCE_TIEH_SEL_0), n = await e.readReg(this.PMU_DATE_REG), await e.writeReg(this.PMU_DATE_REG, n | this.PMU_DATE_FLASH_FORCE_ON), await new Promise((e) => setTimeout(e, 1)), n = await e.readReg(this.PMU_EXT_LDO_P0_0P1A_ANA_REG), await e.writeReg(this.PMU_EXT_LDO_P0_0P1A_ANA_REG, n & ~this.PMU_ANA_0P1A_EN_CUR_LIM_0), n = await e.readReg(this.PMU_EXT_LDO_P0_0P1A_REG), await e.writeReg(this.PMU_EXT_LDO_P0_0P1A_REG, n & ~this.PMU_0P1A_TARGET0_0), n = await e.readReg(this.PMU_EXT_LDO_P0_0P1A_REG), await e.writeReg(this.PMU_EXT_LDO_P0_0P1A_REG, n | 128), n = await e.readReg(this.PMU_EXT_LDO_P0_0P1A_REG), await e.writeReg(this.PMU_EXT_LDO_P0_0P1A_REG, n & ~this.PMU_0P1A_FORCE_TIEH_SEL_0), await new Promise((e) => setTimeout(e, 2));
		}
	};
})), pc = /* @__PURE__ */ c({ ESP32S2ROM: () => mc }), mc, hc = o((() => {
	Hs(), mc = class extends Vs {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-S2", this.IMAGE_CHIP_ID = 2, this.IROM_MAP_START = 0x40080000, this.IROM_MAP_END = 0x40b80000, this.DROM_MAP_START = 0x3f000000, this.DROM_MAP_END = 0x3f3f0000, this.CHIP_DETECT_MAGIC_VALUE = [1990], this.SPI_REG_BASE = 0x3f402000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.SPI_ADDR_REG_MSB = !1, this.MAC_EFUSE_REG = 0x3f41a044, this.UART_CLKDIV_REG = 0x3f400014, this.SUPPORTS_ENCRYPTED_FLASH = !0, this.FLASH_ENCRYPTED_WRITE_ALIGN = 16, this.EFUSE_BASE = 0x3f41a000, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.EFUSE_BLOCK2_ADDR = this.EFUSE_BASE + 92, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY0_SHIFT = 24, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 52, this.EFUSE_PURPOSE_KEY1_SHIFT = 28, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY2_SHIFT = 0, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY3_SHIFT = 4, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY4_SHIFT = 8, this.EFUSE_PURPOSE_KEY5_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY5_SHIFT = 12, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 1 << 19, this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_BASE + 52, this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 7 << 18, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 56, this.EFUSE_SECURE_BOOT_EN_MASK = 1 << 20, this.EFUSE_RD_REPEAT_DATA3_REG = this.EFUSE_BASE + 60, this.EFUSE_RD_REPEAT_DATA3_REG_FLASH_TYPE_MASK = 512, this.PURPOSE_VAL_XTS_AES256_KEY_1 = 2, this.PURPOSE_VAL_XTS_AES256_KEY_2 = 3, this.PURPOSE_VAL_XTS_AES128_KEY = 4, this.UARTDEV_BUF_NO = 0x3ffffd14, this.UARTDEV_BUF_NO_USB_OTG = 2, this.USB_RAM_BLOCK = 2048, this.GPIO_STRAP_REG = 0x3f404038, this.GPIO_STRAP_SPI_BOOT_MASK = 8, this.GPIO_STRAP_VDDSPI_MASK = 16, this.RTC_CNTL_OPTION1_REG = 0x3f408128, this.RTC_CNTL_FORCE_DOWNLOAD_BOOT_MASK = 1, this.RTCCNTL_BASE_REG = 0x3f408000, this.RTC_CNTL_WDTCONFIG0_REG = this.RTCCNTL_BASE_REG + 148, this.RTC_CNTL_WDTCONFIG1_REG = this.RTCCNTL_BASE_REG + 152, this.RTC_CNTL_WDTWPROTECT_REG = this.RTCCNTL_BASE_REG + 172, this.RTC_CNTL_WDT_WKEY = 0x50d83aa1, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x3f000000,
					0x3ff80000,
					"DROM"
				],
				[
					0x3f500000,
					0x3ff80000,
					"EXTRAM_DATA"
				],
				[
					0x3ff9e000,
					0x3ffa0000,
					"RTC_DRAM"
				],
				[
					0x3ff9e000,
					0x40000000,
					"BYTE_ACCESSIBLE"
				],
				[
					0x3ff9e000,
					0x40072000,
					"MEM_INTERNAL"
				],
				[
					0x3ffb0000,
					0x40000000,
					"DRAM"
				],
				[
					0x40000000,
					0x4001a100,
					"IROM_MASK"
				],
				[
					0x40020000,
					0x40070000,
					"IRAM"
				],
				[
					0x40070000,
					0x40072000,
					"RTC_IRAM"
				],
				[
					0x40080000,
					0x40800000,
					"IROM"
				],
				[
					0x50000000,
					0x50002000,
					"RTC_DATA"
				]
			], this.EFUSE_VDD_SPI_REG = this.EFUSE_BASE + 52, this.VDD_SPI_XPD = 16, this.VDD_SPI_TIEH = 32, this.VDD_SPI_FORCE = 64, this.UF2_FAMILY_ID = 0xbfdd4eee, this.EFUSE_MAX_KEY = 5, this.KEY_PURPOSES = {
				0: "USER/EMPTY",
				1: "RESERVED",
				2: "XTS_AES_256_KEY_1",
				3: "XTS_AES_256_KEY_2",
				4: "XTS_AES_128_KEY",
				5: "HMAC_DOWN_ALL",
				6: "HMAC_DOWN_JTAG",
				7: "HMAC_DOWN_DIGITAL_SIGNATURE",
				8: "HMAC_UP",
				9: "SECURE_BOOT_DIGEST0",
				10: "SECURE_BOOT_DIGEST1",
				11: "SECURE_BOOT_DIGEST2"
			}, this.UART_CLKDIV_MASK = 0xfffff, this.UART_DATE_REG_ADDR = 0x60000078, this.FLASH_WRITE_SIZE = 1024, this.BOOTLOADER_FLASH_OFFSET = 4096;
		}
		async getPkgVersion(e) {
			let t = this.EFUSE_BLOCK1_ADDR + 16;
			return await e.readReg(t) & 15;
		}
		async getMinorChipVersion(e) {
			let t = await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 20 & 1, n = await e.readReg(this.EFUSE_BLOCK1_ADDR + 16) >> 4 & 7;
			return (t << 3) + n;
		}
		async getMajorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 18 & 3;
		}
		async getFlashVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 21 & 15;
		}
		async getChipDescription(e) {
			let t = {
				0: "ESP32-S2",
				1: "ESP32-S2FH2",
				2: "ESP32-S2FH4",
				102: "ESP32-S2FNR2",
				100: "ESP32-S2R2"
			}, n = await this.getFlashCap(e) + await this.getPsramCap(e) * 100, r = await this.getMajorChipVersion(e), i = await this.getMinorChipVersion(e);
			return `${t[n] || "unknown ESP32-S2"} (revision v${r}.${i})`;
		}
		async getFlashCap(e) {
			return await this.getFlashVersion(e);
		}
		async getPsramVersion(e) {
			let t = this.EFUSE_BLOCK1_ADDR + 12;
			return await e.readReg(t) >> 28 & 15;
		}
		async getPsramCap(e) {
			return await this.getPsramVersion(e);
		}
		async getBlock2Version(e) {
			let t = this.EFUSE_BLOCK2_ADDR + 16;
			return await e.readReg(t) >> 4 & 7;
		}
		async getChipFeatures(e) {
			let t = ["Wi-Fi"], n = {
				0: "No Embedded Flash",
				1: "Embedded Flash 2MB",
				2: "Embedded Flash 4MB"
			}[await this.getFlashCap(e)] || "Unknown Embedded Flash";
			t.push(n);
			let r = {
				0: "No Embedded Flash",
				1: "Embedded PSRAM 2MB",
				2: "Embedded PSRAM 4MB"
			}[await this.getPsramCap(e)] || "Unknown Embedded PSRAM";
			t.push(r);
			let i = {
				0: "No calibration in BLK2 of efuse",
				1: "ADC and temperature sensor calibration in BLK2 of efuse V1",
				2: "ADC and temperature sensor calibration in BLK2 of efuse V2"
			}[await this.getBlock2Version(e)] || "Unknown Calibration in BLK2";
			return t.push(i), t;
		}
		async getCrystalFreq(e) {
			return 40;
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
		getEraseSize(e, t) {
			return t;
		}
		async usingUsbOtg(e) {
			return (await e.readReg(this.UARTDEV_BUF_NO) & 255) === this.UARTDEV_BUF_NO_USB_OTG;
		}
		async postConnect(e) {
			await e.usesUsbOtg() && (e.ESP_RAM_BLOCK = this.USB_RAM_BLOCK);
		}
	};
})), gc = /* @__PURE__ */ c({ ESP32S3ROM: () => _c }), _c, vc = o((() => {
	Hs(), _c = class extends Vs {
		constructor() {
			super(...arguments), this.CHIP_NAME = "ESP32-S3", this.IMAGE_CHIP_ID = 9, this.USES_MAGIC_VALUE = !1, this.EFUSE_BASE = 0x60007000, this.MAC_EFUSE_REG = this.EFUSE_BASE + 68, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 68, this.EFUSE_BLOCK2_ADDR = this.EFUSE_BASE + 92, this.UART_CLKDIV_REG = 0x60000014, this.UART_CLKDIV_MASK = 0xfffff, this.UART_DATE_REG_ADDR = 0x60000080, this.FLASH_WRITE_SIZE = 1024, this.BOOTLOADER_FLASH_OFFSET = 0, this.SPI_REG_BASE = 0x60002000, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.USB_RAM_BLOCK = 2048, this.UARTDEV_BUF_NO_USB = 3, this.UARTDEV_BUF_NO = 0x3fcef14c, this.IROM_MAP_START = 0x42000000, this.IROM_MAP_END = 0x44000000, this.MEMORY_MAP = [
				[
					0,
					65536,
					"PADDING"
				],
				[
					0x3c000000,
					0x3d000000,
					"DROM"
				],
				[
					0x3d000000,
					0x3e000000,
					"EXTRAM_DATA"
				],
				[
					0x600fe000,
					0x60100000,
					"RTC_DRAM"
				],
				[
					0x3fc88000,
					0x3fd00000,
					"BYTE_ACCESSIBLE"
				],
				[
					0x3fc88000,
					0x403e2000,
					"MEM_INTERNAL"
				],
				[
					0x3fc88000,
					0x3fd00000,
					"DRAM"
				],
				[
					0x40000000,
					0x4001a100,
					"IROM_MASK"
				],
				[
					0x40370000,
					0x403e0000,
					"IRAM"
				],
				[
					0x600fe000,
					0x60100000,
					"RTC_IRAM"
				],
				[
					0x42000000,
					0x42800000,
					"IROM"
				],
				[
					0x50000000,
					0x50002000,
					"RTC_DATA"
				]
			];
		}
		async getChipDescription(e) {
			let t = await this.getMajorChipVersion(e), n = await this.getMinorChipVersion(e);
			return `${{
				0: "ESP32-S3 (QFN56)",
				1: "ESP32-S3-PICO-1 (LGA56)"
			}[await this.getPkgVersion(e)] || "unknown ESP32-S3"} (revision v${t}.${n})`;
		}
		async getPkgVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 21 & 7;
		}
		async getRawMinorChipVersion(e) {
			let t = await e.readReg(this.EFUSE_BLOCK1_ADDR + 20) >> 23 & 1, n = await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 18 & 7;
			return (t << 3) + n;
		}
		async getMinorChipVersion(e) {
			let t = await this.getRawMinorChipVersion(e);
			return await this.isEco0(e, t) ? 0 : this.getRawMinorChipVersion(e);
		}
		async getRawMajorChipVersion(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 20) >> 24 & 3;
		}
		async getMajorChipVersion(e) {
			let t = await this.getRawMinorChipVersion(e);
			return await this.isEco0(e, t) ? 0 : this.getRawMajorChipVersion(e);
		}
		async getBlkVersionMajor(e) {
			return await e.readReg(this.EFUSE_BLOCK2_ADDR + 16) & 3;
		}
		async getBlkVersionMinor(e) {
			return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 24 & 7;
		}
		async isEco0(e, t) {
			return !(t & 7) && await this.getBlkVersionMajor(e) === 1 && await this.getBlkVersionMinor(e) === 1;
		}
		async getFlashCap(e) {
			let t = this.EFUSE_BASE + 68 + 12;
			return await e.readReg(t) >> 27 & 7;
		}
		async getFlashVendor(e) {
			let t = this.EFUSE_BASE + 68 + 16;
			return {
				1: "XMC",
				2: "GD",
				3: "FM",
				4: "TT",
				5: "BY"
			}[await e.readReg(t) & 7] || "";
		}
		async getPsramCap(e) {
			let t = this.EFUSE_BASE + 68 + 16;
			return await e.readReg(t) >> 3 & 3;
		}
		async getPsramVendor(e) {
			let t = this.EFUSE_BASE + 68 + 16;
			return {
				1: "AP_3v3",
				2: "AP_1v8"
			}[await e.readReg(t) >> 7 & 3] || "";
		}
		async getChipFeatures(e) {
			let t = ["Wi-Fi", "BLE"], n = {
				0: null,
				1: "Embedded Flash 8MB",
				2: "Embedded Flash 4MB"
			}, r = await this.getFlashCap(e), i = await this.getFlashVendor(e), a = n[r], o = a === void 0 ? "Unknown Embedded Flash" : a;
			a !== null && t.push(`${o} (${i})`);
			let s = {
				0: null,
				1: "Embedded PSRAM 8MB",
				2: "Embedded PSRAM 2MB"
			}, c = await this.getPsramCap(e), l = await this.getPsramVendor(e), u = s[c], d = u === void 0 ? "Unknown Embedded PSRAM" : u;
			return u !== null && t.push(`${d} (${l})`), t;
		}
		async getCrystalFreq(e) {
			return 40;
		}
		_d2h(e) {
			let t = (+e).toString(16);
			return t.length === 1 ? "0" + t : t;
		}
		async postConnect(e) {
			await e.usesUsbOtg() && (e.ESP_RAM_BLOCK = this.USB_RAM_BLOCK);
		}
		async usesUsbJtagSerial(e) {
			return (await e.readReg(this.UARTDEV_BUF_NO) & 255) === this.UARTDEV_BUF_NO_USB;
		}
		async readMac(e) {
			let t = await e.readReg(this.MAC_EFUSE_REG);
			t >>>= 0;
			let n = await e.readReg(this.MAC_EFUSE_REG + 4);
			n = n >>> 0 & 65535;
			let r = /* @__PURE__ */ new Uint8Array(6);
			return r[0] = n >> 8 & 255, r[1] = n & 255, r[2] = t >> 24 & 255, r[3] = t >> 16 & 255, r[4] = t >> 8 & 255, r[5] = t & 255, this._d2h(r[0]) + ":" + this._d2h(r[1]) + ":" + this._d2h(r[2]) + ":" + this._d2h(r[3]) + ":" + this._d2h(r[4]) + ":" + this._d2h(r[5]);
		}
		getEraseSize(e, t) {
			return t;
		}
	};
}));
fc(), hc(), vc();
var yc = class extends $s {
	constructor() {
		super(...arguments), this.CHIP_NAME = "ESP32-S31", this.IMAGE_CHIP_ID = 32, this.USES_MAGIC_VALUE = !1, this.IROM_MAP_START = 0x40000000, this.IROM_MAP_END = 0x54000000, this.DROM_MAP_START = 0x40000000, this.DROM_MAP_END = 0x54000000, this.BOOTLOADER_FLASH_OFFSET = 8192, this.UART_DATE_REG_ADDR = 540582028, this.UART_CLKDIV_REG = 540581908, this.EFUSE_BASE = 544296960, this.EFUSE_BLOCK1_ADDR = this.EFUSE_BASE + 80, this.MAC_EFUSE_REG = this.EFUSE_BASE + 80, this.SPI_REG_BASE = 542117888, this.SPI_USR_OFFS = 24, this.SPI_USR1_OFFS = 28, this.SPI_USR2_OFFS = 32, this.SPI_MOSI_DLEN_OFFS = 36, this.SPI_MISO_DLEN_OFFS = 40, this.SPI_W0_OFFS = 88, this.SPI_ADDR_REG_MSB = !1, this.EFUSE_RD_REG_BASE = this.EFUSE_BASE + 48, this.EFUSE_PURPOSE_KEY0_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY0_SHIFT = 0, this.EFUSE_PURPOSE_KEY1_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY1_SHIFT = 5, this.EFUSE_PURPOSE_KEY2_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY2_SHIFT = 10, this.EFUSE_PURPOSE_KEY3_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY3_SHIFT = 15, this.EFUSE_PURPOSE_KEY4_REG = this.EFUSE_BASE + 56, this.EFUSE_PURPOSE_KEY4_SHIFT = 20, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT_REG = this.EFUSE_RD_REG_BASE, this.EFUSE_DIS_DOWNLOAD_MANUAL_ENCRYPT = 1 << 20, this.EFUSE_SPI_BOOT_CRYPT_CNT_REG = this.EFUSE_BASE + 52, this.EFUSE_SPI_BOOT_CRYPT_CNT_MASK = 7 << 21, this.EFUSE_SECURE_BOOT_EN_REG = this.EFUSE_BASE + 60, this.EFUSE_SECURE_BOOT_EN_MASK = 4, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_REG = this.EFUSE_BASE + 52, this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_SHIFT = 12, this.FORCE_USE_KEY_MANAGER_VAL_XTS_AES_KEY = 2, this.PURPOSE_VAL_XTS_AES256_KEY_1 = 2, this.PURPOSE_VAL_XTS_AES256_KEY_2 = 3, this.PURPOSE_VAL_XTS_AES128_KEY = 4, this.FLASH_ENCRYPTED_WRITE_ALIGN = 16, this.USB_RAM_BLOCK = 2048, this.MEMORY_MAP = [
			[
				0,
				65536,
				"PADDING"
			],
			[
				0x40000000,
				0x54000000,
				"DROM"
			],
			[
				788529152,
				789053440,
				"DRAM"
			],
			[
				788529152,
				789053440,
				"BYTE_ACCESSIBLE"
			],
			[
				796917760,
				797245440,
				"DROM_MASK"
			],
			[
				796917760,
				797245440,
				"IROM_MASK"
			],
			[
				0x40000000,
				0x54000000,
				"IROM"
			],
			[
				788529152,
				789053440,
				"IRAM"
			],
			[
				771751936,
				771784704,
				"RTC_IRAM"
			],
			[
				771751936,
				771784704,
				"RTC_DRAM"
			]
		], this.UF2_FAMILY_ID = 822212545, this.EFUSE_MAX_KEY = 4, this.KEY_PURPOSES = {
			0: "USER/EMPTY",
			1: "ECDSA_KEY",
			2: "XTS_AES_256_KEY_1",
			3: "XTS_AES_256_KEY_2",
			4: "XTS_AES_128_KEY",
			5: "HMAC_DOWN_ALL",
			6: "HMAC_DOWN_JTAG",
			7: "HMAC_DOWN_DIGITAL_SIGNATURE",
			8: "HMAC_UP",
			9: "SECURE_BOOT_DIGEST0",
			10: "SECURE_BOOT_DIGEST1",
			11: "SECURE_BOOT_DIGEST2",
			12: "KM_INIT_KEY",
			13: "XTS_AES_256_PSRAM_KEY_1",
			14: "XTS_AES_256_PSRAM_KEY_2",
			15: "XTS_AES_128_PSRAM_KEY",
			16: "ECDSA_KEY_P192",
			17: "ECDSA_KEY_P384_L",
			18: "ECDSA_KEY_P384_H",
			19: "SDC_KEY_DIGEST"
		};
	}
	async getPkgVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 16) >> 6 & 3;
	}
	async getMinorChipVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 18 & 15;
	}
	async getMajorChipVersion(e) {
		return await e.readReg(this.EFUSE_BLOCK1_ADDR + 12) >> 22 & 3;
	}
	async getChipRevision(e) {
		let t = await this.getMajorChipVersion(e), n = await this.getMinorChipVersion(e);
		return t * 100 + n;
	}
	async getChipDescription(e) {
		return `${await this.getPkgVersion(e) === 0 ? "ESP32-S31" : "unknown ESP32-S31"} (revision v${await this.getMajorChipVersion(e)}.${await this.getMinorChipVersion(e)})`;
	}
	async getChipFeatures(e) {
		return [
			"Wi-Fi 6",
			"BT 5.4 (LE)",
			"IEEE802.15.4",
			"Dual Core + LP Core",
			"300MHz"
		];
	}
	async getCrystalFreq(e) {
		return 40;
	}
	async getKeyBlockPurpose(e, t) {
		if (t < 0 || t > this.EFUSE_MAX_KEY) throw Error(`Valid key block numbers must be in range 0-${this.EFUSE_MAX_KEY}`);
		let [n, r] = [
			[this.EFUSE_PURPOSE_KEY0_REG, this.EFUSE_PURPOSE_KEY0_SHIFT],
			[this.EFUSE_PURPOSE_KEY1_REG, this.EFUSE_PURPOSE_KEY1_SHIFT],
			[this.EFUSE_PURPOSE_KEY2_REG, this.EFUSE_PURPOSE_KEY2_SHIFT],
			[this.EFUSE_PURPOSE_KEY3_REG, this.EFUSE_PURPOSE_KEY3_SHIFT],
			[this.EFUSE_PURPOSE_KEY4_REG, this.EFUSE_PURPOSE_KEY4_SHIFT]
		][t];
		return await e.readReg(n) >> r & 31;
	}
	async isFlashEncryptionKeyValid(e) {
		let t = [];
		for (let n = 0; n <= this.EFUSE_MAX_KEY; n++) t.push(await this.getKeyBlockPurpose(e, n));
		return t.some((e) => e === this.PURPOSE_VAL_XTS_AES128_KEY) || t.some((e) => e === this.PURPOSE_VAL_XTS_AES256_KEY_1) && t.some((e) => e === this.PURPOSE_VAL_XTS_AES256_KEY_2) ? !0 : (await e.readReg(this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_REG) >> this.EFUSE_FORCE_USE_KEY_MANAGER_KEY_SHIFT & this.FORCE_USE_KEY_MANAGER_VAL_XTS_AES_KEY) !== 0;
	}
	checkSpiConnection(e, t) {
		if (!t.every((e) => e >= 0 && e <= 60)) throw Error("SPI Pin numbers must be in the range 0-60.");
		t.some((e) => e === 33 || e === 34) && e.info("GPIO pins 33 and 34 are used by USB-Serial/JTAG, consider using other pins for SPI flash connection.");
	}
	async postConnect(e) {
		await e.usesUsbOtg() && (e.ESP_RAM_BLOCK = this.USB_RAM_BLOCK);
	}
	async changeBaud(e) {
		await e.changeBaud();
	}
};
Hs(), Gs(), ec(), Zs(), sc(), _s();
var bc = {
	esp8266: new gs(),
	esp32: new Vs(),
	esp32s2: new mc(),
	esp32s3: new _c(),
	esp32s31: new yc(),
	esp32c3: new Ws(),
	esp32c2: new qs(),
	esp32c6: new Xs(),
	esp32c61: new nc(),
	esp32c5: new $s(),
	esp32e22: new ic(),
	esp32h2: new oc(),
	esp32h21: new cc(),
	esp32p4: new dc(),
	esp32h4: new lc()
};
Object.keys(bc);
var xc = Object.values(bc), Sc = {
	SECURE_BOOT_EN: 1,
	SECURE_BOOT_AGGRESSIVE_REVOKE: 2,
	SECURE_DOWNLOAD_ENABLE: 4,
	SECURE_BOOT_KEY_REVOKE0: 8,
	SECURE_BOOT_KEY_REVOKE1: 16,
	SECURE_BOOT_KEY_REVOKE2: 32,
	SOFT_DIS_JTAG: 64,
	HARD_DIS_JTAG: 128,
	DIS_USB: 256,
	DIS_DOWNLOAD_DCACHE: 512,
	DIS_DOWNLOAD_ICACHE: 1024
};
function Cc(e) {
	let t = {};
	for (let n of Object.keys(Sc)) t[n] = (e & Sc[n]) !== 0;
	return t;
}
async function wc(e) {
	switch (e) {
		case 0xf01d83: {
			let { ESP32ROM: e } = await Promise.resolve().then(() => (Hs(), Bs));
			return new e();
		}
		case 0xc21e06f:
		case 0x6f51306f:
		case 0x7c41a06f: {
			let { ESP32C2ROM: e } = await Promise.resolve().then(() => (Js(), Ks));
			return new e();
		}
		case 0x6921506f:
		case 456216687:
		case 0x4881606f:
		case 0x4361606f: {
			let { ESP32C3ROM: e } = await Promise.resolve().then(() => (Gs(), Us));
			return new e();
		}
		case 752910447: {
			let { ESP32C6ROM: e } = await Promise.resolve().then(() => (Zs(), Ys));
			return new e();
		}
		case 606167151:
		case 871374959:
		case 0x4f81606f: {
			let { ESP32C61ROM: e } = await Promise.resolve().then(() => (rc(), tc));
			return new e();
		}
		case 285294703:
		case 0x63e1406f:
		case 0x5fd1406f:
		case 820080751: {
			let { ESP32C5ROM: e } = await Promise.resolve().then(() => (ec(), Qs));
			return new e();
		}
		case 0xd7b73e80:
		case 0x97e30068: {
			let { ESP32H2ROM: e } = await Promise.resolve().then(() => (sc(), ac));
			return new e();
		}
		case 9: {
			let { ESP32S3ROM: e } = await Promise.resolve().then(() => (vc(), gc));
			return new e();
		}
		case 1990: {
			let { ESP32S2ROM: e } = await Promise.resolve().then(() => (hc(), pc));
			return new e();
		}
		case 0xfff0c101: {
			let { ESP8266ROM: e } = await Promise.resolve().then(() => (_s(), hs));
			return new e();
		}
		case 0:
		case 0xaddbad0:
		case 0x7039ad9: {
			let { ESP32P4ROM: e } = await Promise.resolve().then(() => (fc(), uc));
			return new e();
		}
		default: return null;
	}
}
var Tc = class {
	constructor(e) {
		this.ESP_RAM_BLOCK = 6144, this.ESP_FLASH_BEGIN = 2, this.ESP_FLASH_DATA = 3, this.ESP_FLASH_END = 4, this.ESP_MEM_BEGIN = 5, this.ESP_MEM_END = 6, this.ESP_MEM_DATA = 7, this.ESP_WRITE_REG = 9, this.ESP_READ_REG = 10, this.ESP_SPI_ATTACH = 13, this.ESP_CHANGE_BAUDRATE = 15, this.ESP_FLASH_DEFL_BEGIN = 16, this.ESP_FLASH_DEFL_DATA = 17, this.ESP_FLASH_DEFL_END = 18, this.ESP_SPI_FLASH_MD5 = 19, this.ESP_GET_SECURITY_INFO = 20, this.ESP_ERASE_FLASH = 208, this.ESP_ERASE_REGION = 209, this.ESP_READ_FLASH = 210, this.ESP_RUN_USER_CODE = 211, this.ESP_IMAGE_MAGIC = 233, this.ESP_CHECKSUM_MAGIC = 239, this.ROM_INVALID_RECV_MSG = 5, this.DEFAULT_TIMEOUT = 3e3, this.ERASE_REGION_TIMEOUT_PER_MB = 3e4, this.ERASE_WRITE_TIMEOUT_PER_MB = 4e4, this.MD5_TIMEOUT_PER_MB = 8e3, this.CHIP_ERASE_TIMEOUT = 12e4, this.FLASH_READ_TIMEOUT = 1e5, this.MAX_TIMEOUT = this.CHIP_ERASE_TIMEOUT * 2, this.WRITE_BLOCK_ATTEMPTS = 3, this.WRITE_BLOCK_RETRY_DELAY_MS = 150, this.SPI_ADDR_REG_MSB = !0, this.CHIP_DETECT_MAGIC_REG_ADDR = 0x40001000, this.DETECTED_FLASH_SIZES = {
			18: "256KB",
			19: "512KB",
			20: "1MB",
			21: "2MB",
			22: "4MB",
			23: "8MB",
			24: "16MB",
			25: "32MB",
			26: "64MB",
			27: "128MB",
			28: "256MB",
			32: "64MB",
			33: "128MB",
			34: "256MB",
			50: "256KB",
			51: "512KB",
			52: "1MB",
			53: "2MB",
			54: "4MB",
			55: "8MB",
			56: "16MB",
			57: "32MB",
			58: "64MB"
		}, this.secureDownloadMode = !1, this.securityInfoCache = null, this.romBaudrate = 115200, this.debugLogging = !1, this.syncStubDetected = !1, this.IS_STUB = !1, this.FLASH_WRITE_SIZE = 16384, this.transport = e.transport, this.baudrate = e.baudrate, e.romBaudrate !== void 0 && (this.romBaudrate = e.romBaudrate), this.resetConstructors = {
			classicReset: (e, t) => new Ri(e, t),
			customReset: (e, t) => new Hi(e, t),
			hardReset: (e, t) => new Bi(e, t),
			usbJTAGSerialReset: (e) => new zi(e)
		}, e.serialOptions && (this.serialOptions = e.serialOptions), e.terminal && (this.terminal = e.terminal, this.terminal.clean()), e.debugLogging !== void 0 && (this.debugLogging = e.debugLogging), e.port && (this.transport = new Ii(e.port)), e.enableTracing !== void 0 && (this.transport.tracing = e.enableTracing), e.resetConstructors?.classicReset && (this.resetConstructors.classicReset = e.resetConstructors?.classicReset), e.resetConstructors?.customReset && (this.resetConstructors.customReset = e.resetConstructors?.customReset), e.resetConstructors?.hardReset && (this.resetConstructors.hardReset = e.resetConstructors?.hardReset), e.resetConstructors?.usbJTAGSerialReset && (this.resetConstructors.usbJTAGSerialReset = e.resetConstructors?.usbJTAGSerialReset), this.info("esptool.js"), this.info("Serial port " + this.transport.getInfo());
	}
	write(e, t = !0) {
		this.terminal ? t ? this.terminal.writeLine(e) : this.terminal.write(e) : console.log(e);
	}
	error(e, t = !0) {
		this.write(`Error: ${e}`, t);
	}
	info(e, t = !0) {
		this.write(e, t);
	}
	debug(e, t = !0) {
		this.debugLogging && this.write(`Debug: ${e}`, t);
	}
	_shortToBytearray(e) {
		return new Uint8Array([e & 255, e >> 8 & 255]);
	}
	_intToByteArray(e) {
		return new Uint8Array([
			e & 255,
			e >> 8 & 255,
			e >> 16 & 255,
			e >> 24 & 255
		]);
	}
	_byteArrayToInt(e, t, n, r) {
		return e | t << 8 | n << 16 | r << 24;
	}
	_appendArray(e, t) {
		let n = new Uint8Array(e.length + t.length);
		return n.set(e, 0), n.set(t, e.length), n;
	}
	async readPacket(e = null, t = this.DEFAULT_TIMEOUT) {
		for (let n = 0; n < 100; n++) {
			let n = await this.transport.read(t);
			if (!n || n.length < 8) continue;
			let r = n[0];
			if (r !== 1) continue;
			let i = n[1], a = this._byteArrayToInt(n[4], n[5], n[6], n[7]), o = n.slice(8);
			if (r == 1) {
				if (e == null || i == e) return [a, o];
				if (o[0] != 0 && o[1] == this.ROM_INVALID_RECV_MSG) throw await this.transport.drainInput(), new f();
			}
		}
		throw new d("invalid response");
	}
	async command(e = null, t = /* @__PURE__ */ new Uint8Array(), n = 0, r = !0, i = this.DEFAULT_TIMEOUT) {
		if (e != null) {
			this.transport.flushInput(), this.transport.tracing && this.transport.trace(`command op:0x${e.toString(16).padStart(2, "0")} data len=${t.length} wait_response=${+!!r} timeout=${(i / 1e3).toFixed(3)} data=${this.transport.hexConvert(t)}`);
			let a = new Uint8Array(8 + t.length);
			a[0] = 0, a[1] = e, a[2] = this._shortToBytearray(t.length)[0], a[3] = this._shortToBytearray(t.length)[1], a[4] = this._intToByteArray(n)[0], a[5] = this._intToByteArray(n)[1], a[6] = this._intToByteArray(n)[2], a[7] = this._intToByteArray(n)[3];
			let o = 0;
			for (; o < t.length; o++) a[8 + o] = t[o];
			await this.transport.write(a);
		}
		return r ? this.readPacket(e, i) : [0, /* @__PURE__ */ new Uint8Array()];
	}
	async readReg(e, t = this.DEFAULT_TIMEOUT) {
		this.debug(`Read Register:${this.toHex(e)}`);
		let n = this._intToByteArray(e), r = await this.command(this.ESP_READ_REG, n, void 0, void 0, t);
		return this.debug(`Read Register Value:${r[0]}`), r[0];
	}
	async writeReg(e, t, n = 0xffffffff, r = 0, i = 0) {
		let a = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
		a = this._appendArray(a, this._intToByteArray(n)), a = this._appendArray(a, this._intToByteArray(r)), i > 0 && (a = this._appendArray(a, this._intToByteArray(this.chip.UART_DATE_REG_ADDR)), a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, this._intToByteArray(0)), a = this._appendArray(a, this._intToByteArray(i))), await this.checkCommand("write target memory", this.ESP_WRITE_REG, a);
	}
	async sync() {
		this.debug("Sync");
		let e = /* @__PURE__ */ new Uint8Array(36), t;
		for (e[0] = 7, e[1] = 7, e[2] = 18, e[3] = 32, t = 0; t < 32; t++) e[4 + t] = 85;
		try {
			let t = await this.command(8, e, void 0, void 0, 100);
			this.syncStubDetected = t[0] === 0;
			for (let e = 0; e < 7; e++) t = await this.readPacket(8, 100), this.syncStubDetected = this.syncStubDetected && t[0] === 0;
			return t;
		} catch (e) {
			throw this.debug("Sync err " + e), e;
		}
	}
	async _connectAttempt(e = "default_reset", t) {
		this.debug("_connect_attempt " + e), t && await t.reset();
		let n = this.transport.peek(), r = Array.from(n, (e) => String.fromCharCode(e)).join("").match(/boot:(0x[0-9a-fA-F]+)([\s\S]*?waiting for download)?/), i = !1, a = "", o = !1;
		r && (i = !0, a = r[1], o = !!r[2]), this.debug(`bootMode:${a} downloadMode:${o}`);
		let s = "";
		for (let e = 0; e < 5; e++) try {
			this.debug(`Sync connect attempt ${e}`), this.transport.flushInput();
			let t = await this.sync();
			return this.debug(t[0].toString()), "success";
		} catch (e) {
			this.debug(`Error at sync ${e}`), s = e instanceof Error ? e.message : typeof e == "string" ? e : JSON.stringify(e);
		}
		return i && (s = `Wrong boot mode detected (${a}).
        This chip needs to be in download mode.`, o && (s = "Download mode successfully detected, but getting no sync reply:\n           The serial TX path seems to be down.")), s;
	}
	isUsbJtagSerialPort() {
		return this.transport.getVid() === 12346 && this.transport.getPid() === 4097;
	}
	async usesUsbOtg() {
		let e = this.transport.getVid(), t = this.transport.getPid();
		return e === 12346 && this.chip.IMAGE_CHIP_ID != null && t === this.chip.IMAGE_CHIP_ID ? !0 : e === 12346 && t === 4097 || e !== void 0 && e !== 12346 ? !1 : typeof this.chip.usesUsbOtg == "function" ? await this.chip.usesUsbOtg(this) : typeof this.chip.usingUsbOtg == "function" && await this.chip.usingUsbOtg(this);
	}
	async applyUsbFlashWriteSize() {
		let e = this.chip.USB_RAM_BLOCK;
		e && await this.usesUsbOtg() && (this.FLASH_WRITE_SIZE = e, this.debug(`Using USB_RAM_BLOCK (0x${e.toString(16)}) for FLASH_WRITE_SIZE (USB-OTG)`));
	}
	constructResetSequence(e) {
		if (e === "no_reset") return [];
		if (e === "usb_reset" || this.isUsbJtagSerialPort()) {
			if (this.resetConstructors.usbJTAGSerialReset) return this.debug("using USB JTAG Serial Reset"), [this.resetConstructors.usbJTAGSerialReset(this.transport)];
		} else if (this.resetConstructors.classicReset) return this.debug("using Classic Serial Reset"), [this.resetConstructors.classicReset(this.transport, 50), this.resetConstructors.classicReset(this.transport, 550)];
		return [];
	}
	async openAndSync(e, t) {
		this.securityInfoCache = null;
		let n;
		this.info("Connecting...", !1), await this.transport.connect(this.romBaudrate, this.serialOptions), this.transport.readLoop();
		let r = this.constructResetSequence(e);
		for (let i = 0; i < t; i++) {
			let t = r.length > 0 ? r[i % r.length] : null;
			if (n = await this._connectAttempt(e, t), n === "success") break;
		}
		if (n !== "success") throw new d("Failed to connect with the device");
		this.debug("Connect attempt successful."), this.info("\n\r", !1);
	}
	async connect(e = "default_reset", t = 7, n = !0) {
		if (await this.openAndSync(e, t), n) {
			this.info("Detecting chip type... ");
			try {
				this.applyDetectedChip(await this.identifyChip());
			} catch (n) {
				if (n instanceof p || n instanceof m || !(n instanceof d)) throw n;
				this.info(" Autodetection failed, trying again..."), await this.transport.disconnect(), await this.openAndSync(e, t), this.info("Detecting chip type... "), this.applyDetectedChip(await this.identifyChipByMagic());
			}
		}
	}
	async identifyChip() {
		try {
			let e = await this.getChipId(), t = this.romFromChipId(e);
			if (t === null) throw new p(e);
			return await this.readSecureDownloadMode(), t;
		} catch (e) {
			if (e instanceof p) throw e;
			if (e instanceof f || e instanceof h) this.debug("GET_SECURITY_INFO not supported, falling back to magic value");
			else throw e;
		}
		return this.identifyChipByMagic();
	}
	romFromChipId(e) {
		for (let t of xc) if (!t.USES_MAGIC_VALUE && e === t.IMAGE_CHIP_ID) return t;
		return null;
	}
	async readSecureDownloadMode() {
		let e = await this.getSecurityInfo();
		return this.secureDownloadMode = e.parsedFlags.SECURE_DOWNLOAD_ENABLE, this.secureDownloadMode;
	}
	async identifyChipByMagic() {
		try {
			return await this.chipFromMagicValue();
		} catch (e) {
			if (e instanceof f) return await this.readSecureDownloadMode(), bc.esp32s2;
			throw e;
		}
	}
	applyDetectedChip(e) {
		this.chip = e, e.SPI_ADDR_REG_MSB !== void 0 && (this.SPI_ADDR_REG_MSB = e.SPI_ADDR_REG_MSB);
	}
	async chipFromMagicValue() {
		let e = await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR) >>> 0;
		this.debug("Chip Magic " + e.toString(16));
		let t = await wc(e);
		if (t === null) throw new m(e);
		return t;
	}
	async getSecurityInfo(e = !0) {
		if (e && this.securityInfoCache !== null) return this.securityInfoCache;
		let t, n = !1;
		try {
			t = await this.checkCommand("get security info", this.ESP_GET_SECURITY_INFO, /* @__PURE__ */ new Uint8Array(), 0, 20);
		} catch (e) {
			if (e instanceof f) throw e;
			t = await this.checkCommand("get security info", this.ESP_GET_SECURITY_INFO, /* @__PURE__ */ new Uint8Array(), 0, 12), n = !0;
		}
		let r = this._byteArrayToInt(t[0], t[1], t[2], t[3]) >>> 0, i = {
			flags: r,
			flashCryptCnt: t[4],
			keyPurposes: Array.from(t.slice(5, 12)),
			chipId: n ? null : this._byteArrayToInt(t[12], t[13], t[14], t[15]) >>> 0,
			apiVersion: n ? null : this._byteArrayToInt(t[16], t[17], t[18], t[19]) >>> 0,
			parsedFlags: Cc(r)
		};
		return this.securityInfoCache = i, i;
	}
	async getChipId() {
		let e = (await this.getSecurityInfo()).chipId;
		if (e === null) throw new h();
		return this.debug("get_chip_id " + e.toString(16)), e;
	}
	async detectChip(e = "default_reset", t = 7) {
		await this.connect(e, t, !0), this.chip == null ? this.info("unknown chip! detectchip has failed.") : this.info(this.chip.CHIP_NAME);
	}
	async checkCommand(e = "", t = null, n = /* @__PURE__ */ new Uint8Array(), r = 0, i = 0, a = this.DEFAULT_TIMEOUT) {
		this.debug("check_command " + e);
		let o = await this.command(t, n, r, void 0, a);
		if (o && o[1] && o[1].length < i + 2) {
			let t = o[1].slice(0, 2);
			throw t[0] === 0 ? new d(`Failed to ${e}.\n Only got ${o[1].length} bytes of data.`) : new d(`Failed to ${e} failed with status ${t}`);
		}
		let s = o[1].slice(i, i + 2);
		if (s[0] !== 0) throw new d(`Failed to ${e} failed with status ${s}`);
		return i > 0 ? o[1].slice(0, i) : o[0];
	}
	async memBegin(e, t, n, r) {
		if (this.IS_STUB) {
			let t = r, n = r + e, i = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, a = await ds(this.chip.CHIP_NAME, i);
			if (a) {
				let e = [[a.bss_start || a.data_start, a.data_start + a.decodedData.length], [a.text_start, a.text_start + a.decodedText.length]];
				for (let [r, i] of e) if (t < i && n > r) throw new d(`Software loader is resident at 0x${r.toString(16).padStart(8, "0")}-0x${i.toString(16).padStart(8, "0")}.
            Can't load binary at overlapping address range 0x${t.toString(16).padStart(8, "0")}-0x${n.toString(16).padStart(8, "0")}.
            Either change binary loading address, or use the no-stub option to disable the software loader.`);
			}
		}
		this.debug("mem_begin " + e + " " + t + " " + n + " " + r.toString(16));
		let i = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
		i = this._appendArray(i, this._intToByteArray(n)), i = this._appendArray(i, this._intToByteArray(r)), await this.checkCommand("enter RAM download mode", this.ESP_MEM_BEGIN, i);
	}
	checksum(e, t = this.ESP_CHECKSUM_MAGIC) {
		for (let n = 0; n < e.length; n++) t ^= e[n];
		return t;
	}
	async memBlock(e, t) {
		let n = this._appendArray(this._intToByteArray(e.length), this._intToByteArray(t));
		n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, this._intToByteArray(0)), n = this._appendArray(n, e);
		let r = this.checksum(e);
		await this.checkCommand("write to target RAM", this.ESP_MEM_DATA, n, r);
	}
	async memFinish(e) {
		let t = +(e === 0), n = this._appendArray(this._intToByteArray(t), this._intToByteArray(e));
		await this.checkCommand("leave RAM download mode", this.ESP_MEM_END, n, void 0, void 0, 200);
	}
	async flashSpiAttach(e) {
		let t = this._intToByteArray(e);
		await this.checkCommand("configure SPI flash pins", this.ESP_SPI_ATTACH, t);
	}
	timeoutPerMb(e, t) {
		let n = t / 1e6 * e;
		return n < 3e3 ? 3e3 : n;
	}
	async flashBegin(e, t) {
		let n = Math.floor((e + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), r = this.chip.getEraseSize(t, e), i = /* @__PURE__ */ new Date(), a = i.getTime(), o = 3e3;
		this.IS_STUB == 0 && (o = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, e)), this.debug("flash begin " + r + " " + n + " " + this.FLASH_WRITE_SIZE + " " + t + " " + e);
		let s = this._appendArray(this._intToByteArray(r), this._intToByteArray(n));
		s = this._appendArray(s, this._intToByteArray(this.FLASH_WRITE_SIZE)), s = this._appendArray(s, this._intToByteArray(t)), this.IS_STUB == 0 && (s = this._appendArray(s, this._intToByteArray(0))), await this.checkCommand("enter Flash download mode", this.ESP_FLASH_BEGIN, s, void 0, void 0, o);
		let c = i.getTime();
		return e != 0 && this.IS_STUB == 0 && this.info("Took " + (c - a) / 1e3 + "." + (c - a) % 1e3 + "s to erase flash block"), n;
	}
	async flashDeflBegin(e, t, n) {
		let r = Math.floor((t + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), i = Math.floor((e + this.FLASH_WRITE_SIZE - 1) / this.FLASH_WRITE_SIZE), a = /* @__PURE__ */ new Date(), o = a.getTime(), s, c;
		this.IS_STUB ? (s = e, c = this.DEFAULT_TIMEOUT) : (s = i * this.FLASH_WRITE_SIZE, c = this.timeoutPerMb(this.ERASE_REGION_TIMEOUT_PER_MB, s)), this.info("Compressed " + e + " bytes to " + t + "...");
		let l = this._appendArray(this._intToByteArray(s), this._intToByteArray(r));
		l = this._appendArray(l, this._intToByteArray(this.FLASH_WRITE_SIZE)), l = this._appendArray(l, this._intToByteArray(n)), (this.chip.CHIP_NAME === "ESP32-S2" || this.chip.CHIP_NAME === "ESP32-S3" || this.chip.CHIP_NAME === "ESP32-C3" || this.chip.CHIP_NAME === "ESP32-C2") && this.IS_STUB === !1 && (l = this._appendArray(l, this._intToByteArray(0))), await this.checkCommand("enter compressed flash mode", this.ESP_FLASH_DEFL_BEGIN, l, void 0, void 0, c);
		let u = a.getTime();
		return e != 0 && this.IS_STUB === !1 && this.info("Took " + (u - o) / 1e3 + "." + (u - o) % 1e3 + "s to erase flash block"), r;
	}
	async flashBlock(e, t, n) {
		let r = this._appendArray(this._intToByteArray(e.length), this._intToByteArray(t));
		r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, e);
		let i = this.checksum(e);
		for (let e = this.WRITE_BLOCK_ATTEMPTS - 1; e >= 0; e--) try {
			await this.checkCommand("write to target Flash after seq " + t, this.ESP_FLASH_DATA, r, i, void 0, n);
			return;
		} catch (n) {
			if (e === 0) throw n;
			this.debug(`Block ${t} write failed (${n}), retrying with ${e} attempts left...`), await Fi(this.WRITE_BLOCK_RETRY_DELAY_MS);
		}
	}
	async flashDeflBlock(e, t, n) {
		let r = this._appendArray(this._intToByteArray(e.length), this._intToByteArray(t));
		r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, e);
		let i = this.checksum(e);
		this.debug(`flash_defl_block ${Array.from(e.slice(0, 2)).map((e) => e.toString(16)).join(" ")}`);
		for (let e = this.WRITE_BLOCK_ATTEMPTS - 1; e >= 0; e--) try {
			await this.checkCommand("write compressed data to flash after seq " + t, this.ESP_FLASH_DEFL_DATA, r, i, void 0, n);
			return;
		} catch (n) {
			if (e === 0) throw n;
			this.debug(`Compressed block ${t} write failed (${n}), retrying with ${e} attempts left...`), await Fi(this.WRITE_BLOCK_RETRY_DELAY_MS);
		}
	}
	async flashFinish(e = !1, t = this.DEFAULT_TIMEOUT) {
		let n = +!e, r = this._intToByteArray(n);
		await this.checkCommand("leave Flash mode", this.ESP_FLASH_END, r, void 0, void 0, t);
	}
	async flashDeflFinish(e = !1, t = this.DEFAULT_TIMEOUT) {
		let n = +!e, r = this._intToByteArray(n);
		await this.checkCommand("leave compressed flash mode", this.ESP_FLASH_DEFL_END, r, void 0, void 0, t);
	}
	async runSpiflashCommand(e, t, n, r = null, i = 0, a = 0) {
		let o = this.chip.SPI_REG_BASE, s = o + 0, c = o + 4, l = o + this.chip.SPI_USR_OFFS, u = o + this.chip.SPI_USR1_OFFS, f = o + this.chip.SPI_USR2_OFFS, p = o + this.chip.SPI_W0_OFFS, m;
		m = this.chip.SPI_MOSI_DLEN_OFFS == null ? async (e, t) => {
			let n = u, r = e === 0 ? 0 : e - 1, o = (t === 0 ? 0 : t - 1) << 8 | r << 17;
			a > 0 && (o |= a - 1), i > 0 && (o |= i - 1 << g), await this.writeReg(n, o);
		} : async (e, t) => {
			let n = o + this.chip.SPI_MOSI_DLEN_OFFS, r = o + this.chip.SPI_MISO_DLEN_OFFS;
			e > 0 && await this.writeReg(n, e - 1), t > 0 && await this.writeReg(r, t - 1);
			let s = 0;
			a > 0 && (s |= a - 1), i > 0 && (s |= i - 1 << g), s && await this.writeReg(u, s);
		};
		let h = 1 << 18, g = 26;
		if (n > 32) throw new d("Reading more than 32 bits back from a SPI flash operation is unsupported");
		if (t.length > 64) throw new d("Writing more than 64 bytes of data with one SPI command is unsupported");
		let _ = t.length * 8, v = await this.readReg(l), y = await this.readReg(f), b = -0x80000000;
		n > 0 && (b |= 268435456), _ > 0 && (b |= 0x8000000), i > 0 && (b |= 0x40000000), a > 0 && (b |= 536870912), await m(_, n), await this.writeReg(l, b);
		let x = 7 << 28 | e;
		if (await this.writeReg(f, x), r && i > 0 && (this.SPI_ADDR_REG_MSB && (r <<= 32 - i), await this.writeReg(c, r)), _ == 0) await this.writeReg(p, 0);
		else {
			t = Mi(t, 4, 0);
			let e = [];
			for (let n = 0; n < t.length; n += 4) e.push((t[n] | t[n + 1] << 8 | t[n + 2] << 16 | t[n + 3] << 24) >>> 0);
			let n = p;
			for (let t of e) await this.writeReg(n, t), n += 4;
		}
		await this.writeReg(s, h);
		let S = 0;
		for (; S < 10 && (x = await this.readReg(s) & h, x != 0); S++);
		if (S === 10) throw new d("SPI command did not complete in time");
		let C = await this.readReg(p);
		return await this.writeReg(l, v), await this.writeReg(f, y), C;
	}
	async readFlashId() {
		let e = /* @__PURE__ */ new Uint8Array();
		return await this.runSpiflashCommand(159, e, 24);
	}
	async eraseFlash() {
		this.info("Erasing flash (this may take a while)...");
		let e = /* @__PURE__ */ new Date(), t = e.getTime(), n = await this.checkCommand("erase flash", this.ESP_ERASE_FLASH, void 0, void 0, void 0, this.CHIP_ERASE_TIMEOUT);
		e = /* @__PURE__ */ new Date();
		let r = e.getTime();
		return this.info("Chip erase completed successfully in " + (r - t) / 1e3 + "s"), n;
	}
	toHex(e) {
		return Array.prototype.map.call(e, (e) => ("00" + e.toString(16)).slice(-2)).join("");
	}
	async flashMd5sum(e, t) {
		let n = this.timeoutPerMb(this.MD5_TIMEOUT_PER_MB, t), r = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
		r = this._appendArray(r, this._intToByteArray(0)), r = this._appendArray(r, this._intToByteArray(0));
		let i = this.IS_STUB ? 16 : 32, a = await this.checkCommand("calculate md5sum", this.ESP_SPI_FLASH_MD5, r, void 0, i, n);
		return this.toHex(a);
	}
	async readFlash(e, t, n = null) {
		let r = this._appendArray(this._intToByteArray(e), this._intToByteArray(t));
		r = this._appendArray(r, this._intToByteArray(4096)), r = this._appendArray(r, this._intToByteArray(1024));
		let i = await this.checkCommand("read flash", this.ESP_READ_FLASH, r);
		if (i != 0) throw new d("Failed to read memory: " + i);
		let a = /* @__PURE__ */ new Uint8Array();
		for (; a.length < t;) {
			let e = await this.transport.read(this.FLASH_READ_TIMEOUT);
			if (e instanceof Uint8Array) e.length > 0 && (a = this._appendArray(a, e), await this.transport.write(this._intToByteArray(a.length)), n && n(e, a.length, t));
			else throw new d("Failed to read memory: " + e);
		}
		return a;
	}
	async runStub() {
		if (this.syncStubDetected) return this.info("Stub is already running. No upload is necessary."), this.IS_STUB = !0, await this.applyUsbFlashWriteSize(), this.chip;
		if (this.secureDownloadMode) return this.info("Stub flasher is not supported in Secure Download Mode, it has been disabled."), this.chip;
		let e = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, t = await ds(this.chip.CHIP_NAME, e);
		if (t === void 0) return this.info(`Stub flasher is not yet supported on ${this.chip.CHIP_NAME}, it has been disabled.`), this.chip;
		this.info("Uploading stub...");
		let n = [t.decodedText, t.decodedData];
		for (let e = 0; e < n.length; e++) if (n[e]) {
			let r = e === 0 ? t.text_start : t.data_start, i = n[e].length, a = Math.floor((i + this.ESP_RAM_BLOCK - 1) / this.ESP_RAM_BLOCK);
			await this.memBegin(i, a, this.ESP_RAM_BLOCK, r);
			for (let t = 0; t < a; t++) {
				let r = t * this.ESP_RAM_BLOCK, i = r + this.ESP_RAM_BLOCK;
				await this.memBlock(n[e].slice(r, i), t);
			}
		}
		this.info("Running stub..."), await this.memFinish(t.entry);
		let r = await this.transport.read(this.DEFAULT_TIMEOUT), i = String.fromCharCode(...r);
		if (i !== "OHAI") throw new d(`Failed to start stub. Unexpected response ${i}`);
		return this.info("Stub running..."), this.IS_STUB = !0, await this.applyUsbFlashWriteSize(), this.chip;
	}
	async isResponsive(e = 2) {
		for (let t = 0; t < e; t++) try {
			return await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR, 500), !0;
		} catch (e) {
			this.debug(`Responsiveness probe failed: ${e}`), this.transport.flushInput();
		}
		return !1;
	}
	async changeBaud() {
		if (this.secureDownloadMode) {
			this.info("Baud rate change is not supported in secure download mode. Keeping 115200 baud.");
			return;
		}
		this.info("Changing baudrate to " + this.baudrate);
		let e = this.IS_STUB ? this.romBaudrate : 0, t = this._appendArray(this._intToByteArray(this.baudrate), this._intToByteArray(e));
		await this.command(this.ESP_CHANGE_BAUDRATE, t), this.info("Changed"), this.info("If the chip does not respond to any further commands, consider using a lower baud rate."), await Fi(50), this.securityInfoCache = null;
		let n = !1, r;
		try {
			n = await this.transport.changeBaudrate(this.baudrate, this.serialOptions);
		} catch (e) {
			r = e, this.debug(`Host baud-rate change failed: ${e}`);
		}
		await this.transport.drainInput(), (r || !await this.isResponsive()) && (r ? this.info(`Unable to use ${this.baudrate} baud. Continuing at ${this.romBaudrate} baud.`) : n ? this.info(`The board reset while the serial port was reopened. Continuing at ${this.romBaudrate} baud.`) : this.info(`The board stopped responding after changing baud rate. Continuing at ${this.romBaudrate} baud.`), await this.transport.disconnect(), await Fi(50), this.baudrate = this.romBaudrate, this.IS_STUB = !1, await this.connect("default_reset", 7, !1), await this.runStub());
	}
	async main(e = "default_reset") {
		await this.detectChip(e);
		let t;
		if (this.secureDownloadMode) this.info("WARNING: Connected chip is in Secure Download Mode. Register reads (chip description, features, MAC) are not supported."), t = this.chip.CHIP_NAME, this.info("Chip is " + t);
		else {
			if (t = await this.chip.getChipDescription(this), this.chip.getChipRevision) {
				let e = await this.chip.getChipRevision(this);
				this.info("Chip Revision: " + e);
			}
			this.info("Chip is " + t), this.info("Features: " + await this.chip.getChipFeatures(this)), this.info("Crystal is " + await this.chip.getCrystalFreq(this) + "MHz"), this.info("MAC: " + await this.chip.readMac(this)), await this.chip.readMac(this), this.chip.postConnect !== void 0 && await this.chip.postConnect(this);
		}
		if (await this.runStub(), this.romBaudrate !== this.baudrate && await this.changeBaud(), !this.secureDownloadMode) try {
			let e = await this.readFlashId();
			this.info("Flash ID: " + e.toString(16)), (e === 0xffffff || e === 0) && this.info("WARNING: Failed to communicate with the flash chip,\nread/write operations will fail.\nTry checking the chip connections or removing\nany other hardware connected to IOs.");
		} catch (e) {
			throw new d("Unable to verify flash chip connection " + e);
		}
		return t;
	}
	flashSizeBytes(e) {
		let t = -1;
		return this.transport.trace(`Flash size string ${e}`), e.toString().indexOf("KB") === -1 ? e.toString().indexOf("MB") !== -1 && (t = parseInt(e.toString().slice(0, e.toString().indexOf("MB"))) * 1024 * 1024) : t = parseInt(e.toString().slice(0, e.toString().indexOf("KB"))) * 1024, this.transport.trace(`Flash size in bytes ${t}`), t;
	}
	parseFlashSizeArg(e) {
		if (this.chip.FLASH_SIZES[e] === void 0) throw new d("Flash size " + e + " is not supported by this chip type. Supported sizes: " + this.chip.FLASH_SIZES);
		return this.chip.FLASH_SIZES[e];
	}
	async _updateImageFlashParams(e, t, n = "keep", r = "keep", i = "keep") {
		if (this.debug(`_update_image_flash_params ${i} ${n} ${r}`), e.length < 8 || t != this.chip.BOOTLOADER_FLASH_OFFSET) return e;
		if (i === "keep" && n === "keep" && r === "keep") return this.info("Not changing the image"), e;
		let a = e[0], o = e[2], s = e[3];
		if (a !== this.ESP_IMAGE_MAGIC) return this.info("Warning: Image file at 0x" + t.toString(16) + " doesn't look like an image file, so not changing any flash settings."), e;
		try {
			(await zs(this.chip, e)).verify();
		} catch {
			return this.debug(`Warning: Image file at 0x${t.toString(16)} is not a valid ${this.chip.CHIP_NAME} image, so not changing any flash settings.`), e;
		}
		let c = this.chip.CHIP_NAME !== "ESP8266" && e[23] === 49;
		n !== "keep" && (o = {
			qio: 0,
			qout: 1,
			dio: 2,
			dout: 3
		}[n]);
		let l = s & 15;
		r !== "keep" && (l = {
			"40m": 0,
			"26m": 1,
			"20m": 2,
			"80m": 15
		}[r]);
		let u = s & 240;
		i !== "keep" && (u = this.parseFlashSizeArg(i));
		let d = o << 8 | l + u;
		this.info("Flash params set to " + d.toString(16));
		let f = new Uint8Array(e);
		if (e[2] !== o && (f[2] = o), e[3] !== l + u && (f[3] = l + u), c) {
			let e = await zs(this.chip, f), t = f.slice(0, e.datalength), n = f.slice(e.datalength + e.SHA256_DIGEST_LEN), r = await crypto.subtle.digest("SHA-256", n), i = new Uint8Array(r), a = new Uint8Array(t.length + i.length + n.length);
			a.set(t, 0), a.set(i, t.length), a.set(n, t.length + i.length);
			let o = a.slice(e.datalength, e.datalength + e.SHA256_DIGEST_LEN);
			return this.transport.hexify(i) === this.transport.hexify(o) ? this.info("SHA digest in image updated") : this.info(`WARNING: SHA recalculation for binary failed!
\tExpected calculated SHA: ${this.transport.hexify(i)}\n\tSHA stored in binary:    ${this.transport.hexify(o)}`), a;
		}
		return f;
	}
	async writeFlash(e) {
		this.debug("EspLoader program");
		for (let t = 0; t < e.fileArray.length; t++) if (!(e.fileArray[t].data instanceof Uint8Array)) throw new d(`File ${t + 1} data must be a Uint8Array`);
		let t = e.flashSize;
		if (e.flashSize === "detect") {
			this.info("Configuring flash size...");
			let e = await this.detectFlashSize();
			if (!e) throw new d("Could not auto-detect Flash size. Set flash size explicitly or check the flash connection.");
			this.info("Detected flash size set to " + e), t = e;
		}
		if (t !== "keep") {
			let n = this.flashSizeBytes(t);
			if (n < 0) throw new d(`Invalid flash size: ${t}`);
			for (let t = 0; t < e.fileArray.length; t++) if (e.fileArray[t].data.length + e.fileArray[t].address > n) throw new d(`File ${t + 1} doesn't fit in the available flash`);
		}
		this.IS_STUB === !0 && e.eraseAll === !0 && await this.eraseFlash();
		let n, r;
		for (let i = 0; i < e.fileArray.length; i++) {
			if (this.debug("Data Length " + e.fileArray[i].data.length), n = e.fileArray[i].data, this.debug("Image Length " + n.length), n.length === 0) {
				this.debug("Warning: File is empty");
				continue;
			}
			n = Mi(n, 4), r = e.fileArray[i].address, n = await this._updateImageFlashParams(n, r, e.flashMode, e.flashFreq, t);
			let a = null;
			e.calculateMD5Hash && (a = e.calculateMD5Hash(n), this.debug("Image MD5 " + a));
			let o = n.length, s;
			e.compress ? (n = Ai(n, { level: 9 }), s = await this.flashDeflBegin(o, n.length, r)) : s = await this.flashBegin(o, r);
			let c = 0, l = 0, u = n.length;
			e.reportProgress && e.reportProgress(i, 0, u);
			let f = /* @__PURE__ */ new Date(), p = f.getTime(), m = 5e3, h = new ji({ chunkSize: 1 }), g = 0;
			h.onData = function(e) {
				g += e.byteLength;
			};
			let _ = 0;
			for (; _ < n.length;) {
				this.debug("Write loop " + r + " " + c + " " + s), this.info("Writing at 0x" + (r + (e.compress ? g : l)).toString(16) + "... (" + Math.floor(100 * (c + 1) / s) + "%)");
				let t = Math.min(this.FLASH_WRITE_SIZE, n.length - _), a = n.slice(_, _ + t), o = _ + t >= n.length;
				if (e.compress) {
					let e = g;
					h.push(a, o);
					let t = g - e, n = 3e3;
					this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, t) > 3e3 && (n = this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, t)), this.IS_STUB === !1 && (m = n), await this.flashDeflBlock(a, c, m), this.IS_STUB && (m = n);
				} else {
					let e = a;
					a.length < this.FLASH_WRITE_SIZE && (e = new Uint8Array(this.FLASH_WRITE_SIZE).fill(255), e.set(a));
					let t = 3e3;
					this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, e.length) > 3e3 && (t = this.timeoutPerMb(this.ERASE_WRITE_TIMEOUT_PER_MB, e.length)), this.IS_STUB === !1 && (m = t), await this.flashBlock(e, c, m), this.IS_STUB && (m = t);
				}
				l += a.length, _ += t, c++, e.reportProgress && e.reportProgress(i, l, u);
			}
			this.IS_STUB && (e.compress ? await this.flashDeflFinish(!1, m) : await this.flashFinish(!1, m)), f = /* @__PURE__ */ new Date();
			let v = f.getTime() - p;
			if (e.compress ? this.info("Wrote " + o + " bytes (" + l + " compressed) at 0x" + r.toString(16) + " in " + v / 1e3 + " seconds.") : this.info("Wrote " + l + " bytes at 0x" + r.toString(16) + " in " + v / 1e3 + " seconds."), a) {
				this.info("File  md5: " + a);
				let e = await this.flashMd5sum(r, o);
				if (this.info("Flash md5: " + e), new String(e).valueOf() != new String(a).valueOf()) throw new d("MD5 of file does not match data in flash!");
				this.info("Hash of data verified.");
			}
		}
		this.info("Leaving...");
	}
	async flashId() {
		this.debug("flash_id");
		let e = await this.readFlashId();
		this.info("Manufacturer: " + (e & 255).toString(16));
		let t = e >> 16 & 255;
		this.info("Device: " + (e >> 8 & 255).toString(16) + t.toString(16)), this.info("Detected flash size: " + this.DETECTED_FLASH_SIZES[t]);
	}
	async detectFlashSize() {
		this.debug("detectFlashSize");
		let e = await this.readFlashId() >> 16 & 255, t = this.DETECTED_FLASH_SIZES[e];
		if (!t) this.info("Could not auto-detect Flash size");
		else return this.info("Auto-detected Flash size: " + t), t;
	}
	async softReset(e) {
		if (!this.IS_STUB) {
			if (e) return;
			await this.flashBegin(0, 0), await this.flashFinish(!1);
		} else if (this.chip.CHIP_NAME != "ESP8266") throw new d("Soft resetting is currently only supported on ESP8266");
		else e ? (await this.flashBegin(0, 0), await this.flashFinish(!0)) : await this.command(this.ESP_RUN_USER_CODE, void 0, void 0, !1);
	}
	async after(e = "hard_reset", t, n) {
		switch (e) {
			case "hard_reset":
				if (this.resetConstructors.hardReset) {
					this.info("Hard resetting via RTS pin...");
					let e = t ?? await this.usesUsbOtg();
					await this.resetConstructors.hardReset(this.transport, e).reset();
				}
				break;
			case "soft_reset":
				this.info("Soft resetting..."), await this.softReset(!1);
				break;
			case "no_reset_stub":
				this.info("Staying in flasher stub.");
				break;
			case "custom_reset":
				n || this.info("Custom reset sequence not provided, doing nothing."), this.resetConstructors.customReset || this.info("Custom reset constructor not available, doing nothing."), this.resetConstructors.customReset && n && (this.info("Custom resetting using sequence " + n), await this.resetConstructors.customReset(this.transport, n).reset());
				break;
			default: this.info("Staying in bootloader."), this.IS_STUB && this.softReset(!0);
		}
	}
}, Ec;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(Ec ||= {}), Ec.INT64, Ec.UINT64, Ec.FIXED64, Ec.SFIXED64, Ec.SINT64, Ec.FLOAT, Ec.DOUBLE;
var N = (e, t = {}, ...n) => {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t)) e === "class" ? r.className = n : e.startsWith("on") ? r.addEventListener(e.slice(2), n) : n != null && r.setAttribute(e, n);
	for (let e of n) e != null && r.append(e);
	return r;
}, Dc = (e) => Object.assign(Error(e), { de: !0 });
function Oc(e) {
	if (e?.de) return e.message;
	let t = e?.name ?? "", n = String(e?.message ?? e ?? "");
	return t === "NotFoundError" || /No port selected|User cancelled/i.test(n) ? "Kein Gerät ausgewählt." : t === "SecurityError" ? "Der Browser hat den Zugriff verweigert. Seite über https öffnen und erneut versuchen." : t === "NetworkError" || /Failed to open serial port|already open/i.test(n) ? "Der USB-Anschluss ist belegt. Andere Programme oder Browser-Tabs mit dem Gerät schließen und neu verbinden." : t === "InvalidStateError" ? "Die Verbindung ist schon offen. Erst trennen, dann neu verbinden." : /timeout|timed out/i.test(n) ? "Zeitüberschreitung: Das Gerät antwortet nicht. Kabel prüfen und neu verbinden." : /Bluetooth|GATT/i.test(n) ? "Bluetooth-Verbindung fehlgeschlagen. Gerät in der Nähe? Bluetooth am Gerät an?" : /Failed to connect|Couldn't sync|Invalid head of packet|Failed to read/i.test(n) ? "Keine Verbindung zum Bootloader. Kabel neu stecken; falls nötig die Taste beim Einstecken gedrückt halten." : "Unerwarteter Fehler (" + n + ").";
}
// node_modules/@meshtastic/core/dist/chunk-DbKvDyjX.js
var kc = Object.create, Ac = Object.defineProperty, jc = Object.getOwnPropertyDescriptor, Mc = Object.getOwnPropertyNames, Nc = Object.getPrototypeOf, Pc = Object.prototype.hasOwnProperty, Fc = (e, t) => function() {
	return t || (0, e[Mc(e)[0]])((t = { exports: {} }).exports, t), t.exports;
}, Ic = (e) => {
	let t = {};
	for (var n in e) Ac(t, n, {
		get: e[n],
		enumerable: !0
	});
	return t;
}, Lc = (e, t, n, r) => {
	if (t && typeof t == "object" || typeof t == "function") for (var i = Mc(t), a = 0, o = i.length, s; a < o; a++) s = i[a], !Pc.call(e, s) && s !== n && Ac(e, s, {
		get: ((e) => t[e]).bind(null, s),
		enumerable: !(r = jc(t, s)) || r.enumerable
	});
	return e;
}, Rc = (e, t, n) => (n = e == null ? {} : kc(Nc(e)), Lc(t || !e || !e.__esModule ? Ac(n, "default", {
	value: e,
	enumerable: !0
}) : n, e)), zc = () => "browser", Bc = (e) => String(e), Vc = (e) => typeof e == "string" ? e : e instanceof Error ? e.stack || e.message : (() => {
	try {
		return JSON.stringify(e);
	} catch {
		return String(e);
	}
})(), Hc = (e, ...t) => t.map(Vc).join(" "), Uc = { isNativeError: (e) => e instanceof Error }, Wc = [
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
typeof Int32Array < "u" && (Wc = new Int32Array(Wc));
var Gc = (e, t) => {
	let n = t === void 0 ? 65535 : ~~t;
	for (let t = 0; t < e.length; t++) n = (Wc[(n >> 8 ^ e[t]) & 255] ^ n << 8) & 65535;
	return n;
}, Kc = Object.defineProperty, P = (e) => {
	let t = {};
	for (var n in e) Kc(t, n, {
		get: e[n],
		enumerable: !0
	});
	return t;
};
function qc(e) {
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
var Jc = /* @__PURE__ */ new Set([
	"constructor",
	"toString",
	"toJSON",
	"valueOf"
]);
function Yc(e) {
	return Jc.has(e) ? e + "$" : e;
}
function Xc() {
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
function Zc(e, t, n) {
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
var Qc = 4294967296;
function $c(e) {
	let t = e[0] === "-";
	t && (e = e.slice(1));
	let n = 1e6, r = 0, i = 0;
	function a(t, a) {
		let o = Number(e.slice(t, a));
		i *= n, r = r * n + o, r >= Qc && (i += r / Qc | 0, r %= Qc);
	}
	return a(-24, -18), a(-18, -12), a(-12, -6), a(-6), t ? il(r, i) : rl(r, i);
}
function el(e, t) {
	let n = rl(e, t), r = n.hi & 0x80000000;
	r && (n = il(n.lo, n.hi));
	let i = tl(n.lo, n.hi);
	return r ? "-" + i : i;
}
function tl(e, t) {
	if ({lo: e, hi: t} = nl(e, t), t <= 2097151) return String(Qc * t + e);
	let n = e & 0xffffff, r = (e >>> 24 | t << 8) & 0xffffff, i = t >> 16 & 65535, a = n + r * 6777216 + i * 6710656, o = r + i * 8147497, s = i * 2, c = 1e7;
	return a >= c && (o += Math.floor(a / c), a %= c), o >= c && (s += Math.floor(o / c), o %= c), s.toString() + al(o) + al(a);
}
function nl(e, t) {
	return {
		lo: e >>> 0,
		hi: t >>> 0
	};
}
function rl(e, t) {
	return {
		lo: e | 0,
		hi: t | 0
	};
}
function il(e, t) {
	return t = ~t, e ? e = ~e + 1 : t += 1, rl(e, t);
}
var al = (e) => {
	let t = String(e);
	return "0000000".slice(t.length) + t;
};
function ol(e, t) {
	if (e >= 0) {
		for (; e > 127;) t.push(e & 127 | 128), e >>>= 7;
		t.push(e);
	} else {
		for (let n = 0; n < 9; n++) t.push(e & 127 | 128), e >>= 7;
		t.push(1);
	}
}
function sl() {
	let e = this.buf[this.pos++], t = e & 127;
	if (!(e & 128) || (e = this.buf[this.pos++], t |= (e & 127) << 7, !(e & 128)) || (e = this.buf[this.pos++], t |= (e & 127) << 14, !(e & 128)) || (e = this.buf[this.pos++], t |= (e & 127) << 21, !(e & 128))) return this.assertBounds(), t;
	e = this.buf[this.pos++], t |= (e & 15) << 28;
	for (let t = 5; e & 128 && t < 10; t++) e = this.buf[this.pos++];
	if (e & 128) throw Error("invalid varint");
	return this.assertBounds(), t >>> 0;
}
var F = /* @__PURE__ */ cl();
function cl() {
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
			return typeof e != "string" && (e = e.toString()), ll(e), e;
		},
		uParse(e) {
			return typeof e != "string" && (e = e.toString()), ul(e), e;
		},
		enc(e) {
			return typeof e != "string" && (e = e.toString()), ll(e), $c(e);
		},
		uEnc(e) {
			return typeof e != "string" && (e = e.toString()), ul(e), $c(e);
		},
		dec(e, t) {
			return el(e, t);
		},
		uDec(e, t) {
			return tl(e, t);
		}
	};
}
function ll(e) {
	if (!/^-?[0-9]+$/.test(e)) throw Error("invalid int64: " + e);
}
function ul(e) {
	if (!/^[0-9]+$/.test(e)) throw Error("invalid uint64: " + e);
}
var I;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(I ||= {});
function dl(e, t) {
	switch (e) {
		case I.STRING: return "";
		case I.BOOL: return !1;
		case I.DOUBLE:
		case I.FLOAT: return 0;
		case I.INT64:
		case I.UINT64:
		case I.SFIXED64:
		case I.FIXED64:
		case I.SINT64: return t ? "0" : F.zero;
		case I.BYTES: return /* @__PURE__ */ new Uint8Array();
		default: return 0;
	}
}
function fl(e, t) {
	switch (e) {
		case I.BOOL: return t === !1;
		case I.STRING: return t === "";
		case I.BYTES: return t instanceof Uint8Array && !t.byteLength;
		default: return t == 0;
	}
}
var pl = 2, ml = Symbol.for("reflect unsafe local");
function hl(e, t) {
	let n = e[t.localName].case;
	return n === void 0 ? n : t.fields.find((e) => e.localName === n);
}
function gl(e, t) {
	let n = t.localName;
	if (t.oneof) return e[t.oneof.localName].case === n;
	if (t.presence != pl) return e[n] !== void 0 && Object.prototype.hasOwnProperty.call(e, n);
	switch (t.fieldKind) {
		case "list": return e[n].length > 0;
		case "map": return Object.keys(e[n]).length > 0;
		case "scalar": return !fl(t.scalar, e[n]);
		case "enum": return e[n] !== t.enum.values[0].number;
	}
	throw Error("message field with implicit presence");
}
function _l(e, t) {
	return Object.prototype.hasOwnProperty.call(e, t) && e[t] !== void 0;
}
function vl(e, t) {
	if (t.oneof) {
		let n = e[t.oneof.localName];
		return n.case === t.localName ? n.value : void 0;
	}
	return e[t.localName];
}
function yl(e, t, n) {
	t.oneof ? e[t.oneof.localName] = {
		case: t.localName,
		value: n
	} : e[t.localName] = n;
}
function bl(e, t) {
	let n = t.localName;
	if (t.oneof) {
		let r = t.oneof.localName;
		e[r].case === n && (e[r] = { case: void 0 });
	} else if (t.presence != pl) delete e[n];
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
		case "scalar": e[n] = dl(t.scalar, t.longAsString);
	}
}
function xl(e) {
	for (let t of e.field) _l(t, "jsonName") || (t.jsonName = qc(t.name));
	e.nestedType.forEach(xl);
}
function Sl(e, t) {
	let n = e.values.find((e) => e.name === t);
	if (!n) throw Error(`cannot parse ${e} default value: ${t}`);
	return n.number;
}
function Cl(e, t) {
	switch (e) {
		case I.STRING: return t;
		case I.BYTES: {
			let n = wl(t);
			if (n === !1) throw Error(`cannot parse ${I[e]} default value: ${t}`);
			return n;
		}
		case I.INT64:
		case I.SFIXED64:
		case I.SINT64: return F.parse(t);
		case I.UINT64:
		case I.FIXED64: return F.uParse(t);
		case I.DOUBLE:
		case I.FLOAT: switch (t) {
			case "inf": return 1e400;
			case "-inf": return -1e400;
			case "nan": return NaN;
			default: return parseFloat(t);
		}
		case I.BOOL: return t === "true";
		case I.INT32:
		case I.UINT32:
		case I.SINT32:
		case I.FIXED32:
		case I.SFIXED32: return parseInt(t, 10);
	}
}
function wl(e) {
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
				let i = F.uEnc(e + r), a = /* @__PURE__ */ new Uint8Array(8), o = new DataView(a.buffer);
				o.setInt32(0, i.lo, !0), o.setInt32(4, i.hi, !0), t.push(a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]);
				break;
			}
		}
	} else t.push(n.c.charCodeAt(0));
	return new Uint8Array(t);
}
function* Tl(e) {
	switch (e.kind) {
		case "file":
			for (let t of e.messages) yield t, yield* Tl(t);
			yield* e.enums, yield* e.services, yield* e.extensions;
			break;
		case "message":
			for (let t of e.nestedMessages) yield t, yield* Tl(t);
			yield* e.nestedEnums, yield* e.nestedExtensions;
	}
}
function El(...e) {
	let t = Dl();
	if (!e.length) return t;
	if ("$typeName" in e[0] && e[0].$typeName == "google.protobuf.FileDescriptorSet") {
		for (let n of e[0].file) Kl(n, t);
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
		for (let e of [n, ...a(n)].reverse()) Kl(e, t);
	} else for (let n of e) for (let e of n.files) t.addFile(e);
	return t;
}
function Dl() {
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
			if (n.set(e.proto.name, e), !t) for (let t of Tl(e)) this.add(t);
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
var Ol = 998, kl = 999, Al = 9, jl = 10, Ml = 11, Nl = 12, Pl = 14, Fl = 3, Il = 2, Ll = 1, Rl = 0, zl = 1, Bl = 2, Vl = 3, Hl = 1, Ul = 2, Wl = 1, Gl = {
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
function Kl(e, t) {
	let n = {
		kind: "file",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		edition: tu(e),
		name: e.name.replace(/\.proto$/, ""),
		dependencies: nu(e, t),
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
			mu(e.proto.options?.mapEntry === !0), r.set(e.typeName, e);
		}
	};
	for (let r of e.enumType) Yl(r, n, void 0, t);
	for (let r of e.messageType) Xl(r, n, void 0, t, i);
	for (let r of e.service) Zl(r, n, t);
	ql(n, t);
	for (let e of r.values()) Jl(e, t, i);
	for (let e of n.messages) Jl(e, t, i), ql(e, t);
	t.addFile(n, !0);
}
function ql(e, t) {
	switch (e.kind) {
		case "file":
			for (let n of e.proto.extension) {
				let r = eu(n, e, t);
				e.extensions.push(r), t.add(r);
			}
			break;
		case "message":
			for (let n of e.proto.extension) {
				let r = eu(n, e, t);
				e.nestedExtensions.push(r), t.add(r);
			}
			for (let n of e.nestedMessages) ql(n, t);
	}
}
function Jl(e, t, n) {
	let r = e.proto.oneofDecl.map((t) => $l(t, e)), i = /* @__PURE__ */ new Set();
	for (let a of e.proto.field) {
		let o = su(a, r), s = eu(a, e, t, o, n);
		e.fields.push(s), e.field[s.localName] = s, o === void 0 ? e.members.push(s) : (o.fields.push(s), i.has(o) || (i.add(o), e.members.push(o)));
	}
	for (let t of r.filter((e) => i.has(e))) e.oneofs.push(t);
	for (let r of e.nestedMessages) Jl(r, t, n);
}
function Yl(e, t, n, r) {
	let i = ru(e.name, e.value), a = {
		kind: "enum",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		parent: n,
		open: !0,
		name: e.name,
		typeName: au(e, n, t),
		value: {},
		values: [],
		sharedPrefix: i,
		toString() {
			return `enum ${this.typeName}`;
		}
	};
	a.open = du(a), r.add(a);
	for (let t of e.value) {
		let e = t.name;
		a.values.push(a.value[t.number] = {
			kind: "enum_value",
			proto: t,
			deprecated: t.options?.deprecated ?? !1,
			parent: a,
			name: e,
			localName: Yc(i == null ? e : e.substring(i.length)),
			number: t.number,
			toString() {
				return `enum value ${a.typeName}.${e}`;
			}
		});
	}
	(n?.nestedEnums ?? t.enums).push(a);
}
function Xl(e, t, n, r, i) {
	let a = {
		kind: "message",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		parent: n,
		name: e.name,
		typeName: au(e, n, t),
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
	for (let n of e.enumType) Yl(n, t, a, r);
	for (let n of e.nestedType) Xl(n, t, a, r, i);
}
function Zl(e, t, n) {
	let r = {
		kind: "service",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		file: t,
		name: e.name,
		typeName: au(e, void 0, t),
		methods: [],
		method: {},
		toString() {
			return `service ${this.typeName}`;
		}
	};
	t.services.push(r), n.add(r);
	for (let t of e.method) {
		let e = Ql(t, r, n);
		r.methods.push(e), r.method[e.localName] = e;
	}
}
function Ql(e, t, n) {
	let r;
	r = e.clientStreaming && e.serverStreaming ? "bidi_streaming" : e.clientStreaming ? "client_streaming" : e.serverStreaming ? "server_streaming" : "unary";
	let i = n.getMessage(ou(e.inputType)), a = n.getMessage(ou(e.outputType));
	mu(i, `invalid MethodDescriptorProto: input_type ${e.inputType} not found`), mu(a, `invalid MethodDescriptorProto: output_type ${e.inputType} not found`);
	let o = e.name;
	return {
		kind: "rpc",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		parent: t,
		name: o,
		localName: Yc(o.length ? Yc(o[0].toLowerCase() + o.substring(1)) : o),
		methodKind: r,
		input: i,
		output: a,
		idempotency: e.options?.idempotencyLevel ?? Rl,
		toString() {
			return `rpc ${t.typeName}.${o}`;
		}
	};
}
function $l(e, t) {
	return {
		kind: "oneof",
		proto: e,
		deprecated: !1,
		parent: t,
		fields: [],
		name: e.name,
		localName: Yc(qc(e.name)),
		toString() {
			return `oneof ${t.typeName}.${this.name}`;
		}
	};
}
function eu(e, t, n, r, i) {
	let a = i === void 0, o = {
		kind: "field",
		proto: e,
		deprecated: e.options?.deprecated ?? !1,
		name: e.name,
		number: e.number,
		scalar: void 0,
		message: void 0,
		enum: void 0,
		presence: cu(e, r, a, t),
		listKind: void 0,
		mapKind: void 0,
		mapKey: void 0,
		delimitedEncoding: void 0,
		packed: void 0,
		longAsString: !1,
		getDefaultValue: void 0
	};
	if (a) {
		let r = t.kind == "file" ? t : t.file, i = t.kind == "file" ? void 0 : t, a = au(e, i, r);
		o.kind = "extension", o.file = r, o.parent = i, o.oneof = void 0, o.typeName = a, o.jsonName = `[${a}]`, o.toString = () => `extension ${a}`;
		let s = n.getMessage(ou(e.extendee));
		mu(s, `invalid FieldDescriptorProto: extendee ${e.extendee} not found`), o.extendee = s;
	} else {
		let n = t;
		mu(n.kind == "message"), o.parent = n, o.oneof = r, o.localName = r ? qc(e.name) : Yc(qc(e.name)), o.jsonName = e.jsonName, o.toString = () => `field ${n.typeName}.${e.name}`;
	}
	let s = e.label, c = e.type, l = e.options?.jstype;
	if (s === Fl) {
		let r = c == Ml ? i?.get(ou(e.typeName)) : void 0;
		if (r) {
			o.fieldKind = "map";
			let { key: e, value: t } = uu(r);
			return o.mapKey = e.scalar, o.mapKind = t.fieldKind, o.message = t.message, o.delimitedEncoding = !1, o.enum = t.enum, o.scalar = t.scalar, o;
		}
		switch (o.fieldKind = "list", c) {
			case Ml:
			case jl:
				o.listKind = "message", o.message = n.getMessage(ou(e.typeName)), mu(o.message), o.delimitedEncoding = fu(e, t);
				break;
			case Pl:
				o.listKind = "enum", o.enum = n.getEnum(ou(e.typeName)), mu(o.enum);
				break;
			default: o.listKind = "scalar", o.scalar = c, o.longAsString = l == Ll;
		}
		return o.packed = lu(e, t), o;
	}
	switch (c) {
		case Ml:
		case jl:
			o.fieldKind = "message", o.message = n.getMessage(ou(e.typeName)), mu(o.message, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), o.delimitedEncoding = fu(e, t), o.getDefaultValue = () => void 0;
			break;
		case Pl: {
			let t = n.getEnum(ou(e.typeName));
			mu(t !== void 0, `invalid FieldDescriptorProto: type_name ${e.typeName} not found`), o.fieldKind = "enum", o.enum = n.getEnum(ou(e.typeName)), o.getDefaultValue = () => _l(e, "defaultValue") ? Sl(t, e.defaultValue) : void 0;
			break;
		}
		default: o.fieldKind = "scalar", o.scalar = c, o.longAsString = l == Ll, o.getDefaultValue = () => _l(e, "defaultValue") ? Cl(c, e.defaultValue) : void 0;
	}
	return o;
}
function tu(e) {
	switch (e.syntax) {
		case "":
		case "proto2": return Ol;
		case "proto3": return kl;
		case "editions":
			if (e.edition in Gl) return e.edition;
			throw Error(`${e.name}: unsupported edition`);
		default: throw Error(`${e.name}: unsupported syntax "${e.syntax}"`);
	}
}
function nu(e, t) {
	return e.dependency.map((n) => {
		let r = t.getFile(n);
		if (!r) throw Error(`Cannot find ${n}, imported by ${e.name}`);
		return r;
	});
}
function ru(e, t) {
	let n = iu(e) + "_";
	for (let e of t) {
		if (!e.name.toLowerCase().startsWith(n)) return;
		let t = e.name.substring(n.length);
		if (t.length == 0 || /^\d/.test(t)) return;
	}
	return n;
}
function iu(e) {
	return (e.substring(0, 1) + e.substring(1).replace(/[A-Z]/g, (e) => "_" + e)).toLowerCase();
}
function au(e, t, n) {
	let r;
	return r = t ? `${t.typeName}.${e.name}` : n.proto.package.length > 0 ? `${n.proto.package}.${e.name}` : `${e.name}`, r;
}
function ou(e) {
	return e.startsWith(".") ? e.substring(1) : e;
}
function su(e, t) {
	if (!_l(e, "oneofIndex") || e.proto3Optional) return;
	let n = t[e.oneofIndex];
	return mu(n, `invalid FieldDescriptorProto: oneof #${e.oneofIndex} for field #${e.number} not found`), n;
}
function cu(e, t, n, r) {
	if (e.label == Il) return Vl;
	if (e.label == Fl) return Bl;
	if (t || e.proto3Optional || n) return zl;
	let i = pu("fieldPresence", {
		proto: e,
		parent: r
	});
	return i == Bl && (e.type == Ml || e.type == jl) ? zl : i;
}
function lu(e, t) {
	if (e.label != Fl) return !1;
	switch (e.type) {
		case Al:
		case Nl:
		case jl:
		case Ml: return !1;
	}
	let n = e.options;
	return n && _l(n, "packed") ? n.packed : Hl == pu("repeatedFieldEncoding", {
		proto: e,
		parent: t
	});
}
function uu(e) {
	let t = e.fields.find((e) => e.number === 1), n = e.fields.find((e) => e.number === 2);
	return mu(t && t.fieldKind == "scalar" && t.scalar != I.BYTES && t.scalar != I.FLOAT && t.scalar != I.DOUBLE && n && n.fieldKind != "list" && n.fieldKind != "map"), {
		key: t,
		value: n
	};
}
function du(e) {
	return Wl == pu("enumType", {
		proto: e.proto,
		parent: e.parent ?? e.file
	});
}
function fu(e, t) {
	return e.type == jl || Ul == pu("messageEncoding", {
		proto: e,
		parent: t
	});
}
function pu(e, t) {
	let n = t.proto.options?.features;
	if (n) {
		let t = n[e];
		if (t != 0) return t;
	}
	if ("kind" in t) {
		if (t.kind == "message") return pu(e, t.parent ?? t.file);
		let n = Gl[t.edition];
		if (!n) throw Error(`feature default for edition ${t.edition} not found`);
		return n[e];
	}
	return pu(e, t.parent);
}
function mu(e, t) {
	if (!e) throw Error(t);
}
function hu(e) {
	let t = gu(e);
	return t.messageType.forEach(xl), El(t, () => void 0).getFile(t.name);
}
function gu(e) {
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
		messageType: e.messageType.map(_u),
		enumType: e.enumType.map(bu)
	}));
}
function _u(e) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.DescriptorProto",
		name: e.name,
		field: e.field?.map(vu) ?? [],
		extension: [],
		nestedType: e.nestedType?.map(_u) ?? [],
		enumType: e.enumType?.map(bu) ?? [],
		extensionRange: e.extensionRange?.map((e) => Object.assign({ $typeName: "google.protobuf.DescriptorProto.ExtensionRange" }, e)) ?? [],
		oneofDecl: [],
		reservedRange: [],
		reservedName: []
	});
}
function vu(e) {
	return Object.assign(Object.create({
		label: 1,
		typeName: "",
		extendee: "",
		defaultValue: "",
		oneofIndex: 0,
		jsonName: "",
		proto3Optional: !1
	}), Object.assign(Object.assign({ $typeName: "google.protobuf.FieldDescriptorProto" }, e), { options: e.options ? yu(e.options) : void 0 }));
}
function yu(e) {
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
function bu(e) {
	return Object.assign(Object.create({ visibility: 0 }), {
		$typeName: "google.protobuf.EnumDescriptorProto",
		name: e.name,
		reservedName: [],
		reservedRange: [],
		value: e.value.map((e) => Object.assign({ $typeName: "google.protobuf.EnumValueDescriptorProto" }, e))
	});
}
function xu(e) {
	let t = Eu(), n = e.length * 3 / 4;
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
var Su, Cu, wu;
function Tu(e) {
	return Su || (Su = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""), Cu = Su.slice(0, -2).concat("-", "_")), e == "url" ? Cu : Su;
}
function Eu() {
	if (!wu) {
		wu = [];
		let e = Tu("std");
		for (let t = 0; t < e.length; t++) wu[e[t].charCodeAt(0)] = t;
		wu[45] = e.indexOf("+"), wu[95] = e.indexOf("/");
	}
	return wu;
}
function Du(e, t) {
	return typeof e == "object" && e && "$typeName" in e && typeof e.$typeName == "string" ? t === void 0 || t.typeName === e.$typeName : !1;
}
var Ou = class extends Error {
	constructor(e, t, n = "FieldValueInvalidError") {
		super(t), this.name = n, this.field = () => e;
	}
};
function ku(e) {
	return typeof e == "object" && !!e && !Array.isArray(e);
}
function Au(e, t) {
	if (ku(e) && ml in e && "add" in e && "field" in e && typeof e.field == "function") {
		if (t !== void 0) {
			let n = t, r = e.field();
			return n.listKind == r.listKind && n.scalar === r.scalar && n.message?.typeName === r.message?.typeName && n.enum?.typeName === r.enum?.typeName;
		}
		return !0;
	}
	return !1;
}
function ju(e, t) {
	if (ku(e) && ml in e && "has" in e && "field" in e && typeof e.field == "function") {
		if (t !== void 0) {
			let n = t, r = e.field();
			return n.mapKey === r.mapKey && n.mapKind == r.mapKind && n.scalar === r.scalar && n.message?.typeName === r.message?.typeName && n.enum?.typeName === r.enum?.typeName;
		}
		return !0;
	}
	return !1;
}
function Mu(e, t) {
	return ku(e) && ml in e && "desc" in e && ku(e.desc) && e.desc.kind === "message" && (t === void 0 || e.desc.typeName == t.typeName);
}
var Nu = Symbol.for("@bufbuild/protobuf/text-encoding");
function Pu() {
	if (globalThis[Nu] == null) {
		let e = new globalThis.TextEncoder(), t = new globalThis.TextDecoder();
		globalThis[Nu] = {
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
	return globalThis[Nu];
}
var L;
(function(e) {
	e[e.Varint = 0] = "Varint", e[e.Bit64 = 1] = "Bit64", e[e.LengthDelimited = 2] = "LengthDelimited", e[e.StartGroup = 3] = "StartGroup", e[e.EndGroup = 4] = "EndGroup", e[e.Bit32 = 5] = "Bit32";
})(L ||= {});
var Fu = 34028234663852886e22, Iu = -34028234663852886e22, Lu = 0xffffffff, Ru = 0x7fffffff, zu = -0x80000000, Bu = class {
	constructor(e = Pu().encodeUtf8) {
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
		for (Uu(e); e > 127;) this.buf.push(e & 127 | 128), e >>>= 7;
		return this.buf.push(e), this;
	}
	int32(e) {
		return Hu(e), ol(e, this.buf), this;
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
		Wu(e);
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setFloat32(0, e, !0), this.raw(t);
	}
	double(e) {
		let t = /* @__PURE__ */ new Uint8Array(8);
		return new DataView(t.buffer).setFloat64(0, e, !0), this.raw(t);
	}
	fixed32(e) {
		Uu(e);
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setUint32(0, e, !0), this.raw(t);
	}
	sfixed32(e) {
		Hu(e);
		let t = /* @__PURE__ */ new Uint8Array(4);
		return new DataView(t.buffer).setInt32(0, e, !0), this.raw(t);
	}
	sint32(e) {
		return Hu(e), e = (e << 1 ^ e >> 31) >>> 0, ol(e, this.buf), this;
	}
	sfixed64(e) {
		let t = /* @__PURE__ */ new Uint8Array(8), n = new DataView(t.buffer), r = F.enc(e);
		return n.setInt32(0, r.lo, !0), n.setInt32(4, r.hi, !0), this.raw(t);
	}
	fixed64(e) {
		let t = /* @__PURE__ */ new Uint8Array(8), n = new DataView(t.buffer), r = F.uEnc(e);
		return n.setInt32(0, r.lo, !0), n.setInt32(4, r.hi, !0), this.raw(t);
	}
	int64(e) {
		let t = F.enc(e);
		return Zc(t.lo, t.hi, this.buf), this;
	}
	sint64(e) {
		let t = F.enc(e), n = t.hi >> 31;
		return Zc(t.lo << 1 ^ n, (t.hi << 1 | t.lo >>> 31) ^ n, this.buf), this;
	}
	uint64(e) {
		let t = F.uEnc(e);
		return Zc(t.lo, t.hi, this.buf), this;
	}
}, Vu = class {
	constructor(e, t = Pu().decodeUtf8) {
		this.decodeUtf8 = t, this.varint64 = Xc, this.uint32 = sl, this.buf = e, this.len = e.length, this.pos = 0, this.view = new DataView(e.buffer, e.byteOffset, e.byteLength);
	}
	tag() {
		let e = this.uint32(), t = e >>> 3, n = e & 7;
		if (t <= 0 || n < 0 || n > 5) throw Error("illegal tag: field no " + t + " wire type " + n);
		return [t, n];
	}
	skip(e, t) {
		let n = this.pos;
		switch (e) {
			case L.Varint:
				for (; this.buf[this.pos++] & 128;);
				break;
			case L.Bit64: this.pos += 4;
			case L.Bit32:
				this.pos += 4;
				break;
			case L.LengthDelimited:
				let n = this.uint32();
				this.pos += n;
				break;
			case L.StartGroup:
				for (;;) {
					let [e, n] = this.tag();
					if (n === L.EndGroup) {
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
		return F.dec(...this.varint64());
	}
	uint64() {
		return F.uDec(...this.varint64());
	}
	sint64() {
		let [e, t] = this.varint64(), n = -(e & 1);
		return e = (e >>> 1 | (t & 1) << 31) ^ n, t = t >>> 1 ^ n, F.dec(e, t);
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
		return F.uDec(this.sfixed32(), this.sfixed32());
	}
	sfixed64() {
		return F.dec(this.sfixed32(), this.sfixed32());
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
function Hu(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid int32: " + typeof e);
	if (!Number.isInteger(e) || e > Ru || e < zu) throw Error("invalid int32: " + e);
}
function Uu(e) {
	if (typeof e == "string") e = Number(e);
	else if (typeof e != "number") throw Error("invalid uint32: " + typeof e);
	if (!Number.isInteger(e) || e > Lu || e < 0) throw Error("invalid uint32: " + e);
}
function Wu(e) {
	if (typeof e == "string") {
		let t = e;
		if (e = Number(e), Number.isNaN(e) && t !== "NaN") throw Error("invalid float32: " + t);
	} else if (typeof e != "number") throw Error("invalid float32: " + typeof e);
	if (Number.isFinite(e) && (e > Fu || e < Iu)) throw Error("invalid float32: " + e);
}
function Gu(e, t) {
	let n = e.fieldKind == "list" ? Au(t, e) : e.fieldKind == "map" ? ju(t, e) : Ju(e, t);
	if (n === !0) return;
	let r;
	switch (e.fieldKind) {
		case "list":
			r = `expected ${$u(e)}, got ${Zu(t)}`;
			break;
		case "map":
			r = `expected ${ed(e)}, got ${Zu(t)}`;
			break;
		default: r = Xu(e, t, n);
	}
	return new Ou(e, r);
}
function Ku(e, t, n) {
	let r = Ju(e, n);
	if (r !== !0) return new Ou(e, `list item #${t + 1}: ${Xu(e, n, r)}`);
}
function qu(e, t, n) {
	let r = Yu(t, e.mapKey);
	if (r !== !0) return new Ou(e, `invalid map key: ${Xu({ scalar: e.mapKey }, t, r)}`);
	let i = Ju(e, n);
	if (i !== !0) return new Ou(e, `map entry ${Zu(t)}: ${Xu(e, n, i)}`);
}
function Ju(e, t) {
	return e.scalar === void 0 ? e.enum === void 0 ? Mu(t, e.message) : e.enum.open ? Number.isInteger(t) : e.enum.values.some((e) => e.number === t) : Yu(t, e.scalar);
}
function Yu(e, t) {
	switch (t) {
		case I.DOUBLE: return typeof e == "number";
		case I.FLOAT: return typeof e == "number" ? Number.isNaN(e) || !Number.isFinite(e) ? !0 : e > Fu || e < Iu ? `${e.toFixed()} out of range` : !0 : !1;
		case I.INT32:
		case I.SFIXED32:
		case I.SINT32: return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Ru || e < zu ? `${e.toFixed()} out of range` : !0;
		case I.FIXED32:
		case I.UINT32: return typeof e != "number" || !Number.isInteger(e) ? !1 : e > Lu || e < 0 ? `${e.toFixed()} out of range` : !0;
		case I.BOOL: return typeof e == "boolean";
		case I.STRING: return typeof e == "string" ? Pu().checkUtf8(e) || "invalid UTF8" : !1;
		case I.BYTES: return e instanceof Uint8Array;
		case I.INT64:
		case I.SFIXED64:
		case I.SINT64:
			if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0) try {
				return F.parse(e), !0;
			} catch {
				return `${e} out of range`;
			}
			return !1;
		case I.FIXED64:
		case I.UINT64:
			if (typeof e == "bigint" || typeof e == "number" || typeof e == "string" && e.length > 0) try {
				return F.uParse(e), !0;
			} catch {
				return `${e} out of range`;
			}
			return !1;
	}
}
function Xu(e, t, n) {
	return n = typeof n == "string" ? `: ${n}` : `, got ${Zu(t)}`, e.scalar === void 0 ? e.enum === void 0 ? `expected ${Qu(e.message)}` + n : `expected ${e.enum.toString()}` + n : `expected ${td(e.scalar)}` + n;
}
function Zu(e) {
	switch (typeof e) {
		case "object": return e === null ? "null" : e instanceof Uint8Array ? `Uint8Array(${e.length})` : Array.isArray(e) ? `Array(${e.length})` : Au(e) ? $u(e.field()) : ju(e) ? ed(e.field()) : Mu(e) ? Qu(e.desc) : Du(e) ? `message ${e.$typeName}` : "object";
		case "string": return e.length > 30 ? "string" : `"${e.split("\"").join("\\\"")}"`;
		case "boolean":
		case "number": return String(e);
		case "bigint": return String(e) + "n";
		default: return typeof e;
	}
}
function Qu(e) {
	return `ReflectMessage (${e.typeName})`;
}
function $u(e) {
	switch (e.listKind) {
		case "message": return `ReflectList (${e.message.toString()})`;
		case "enum": return `ReflectList (${e.enum.toString()})`;
		case "scalar": return `ReflectList (${I[e.scalar]})`;
	}
}
function ed(e) {
	switch (e.mapKind) {
		case "message": return `ReflectMap (${I[e.mapKey]}, ${e.message.toString()})`;
		case "enum": return `ReflectMap (${I[e.mapKey]}, ${e.enum.toString()})`;
		case "scalar": return `ReflectMap (${I[e.mapKey]}, ${I[e.scalar]})`;
	}
}
function td(e) {
	switch (e) {
		case I.STRING: return "string";
		case I.BOOL: return "boolean";
		case I.INT64:
		case I.SINT64:
		case I.SFIXED64: return "bigint (int64)";
		case I.UINT64:
		case I.FIXED64: return "bigint (uint64)";
		case I.BYTES: return "Uint8Array";
		case I.DOUBLE: return "number (float64)";
		case I.FLOAT: return "number (float32)";
		case I.FIXED32:
		case I.UINT32: return "number (uint32)";
		case I.INT32:
		case I.SFIXED32:
		case I.SINT32: return "number (int32)";
	}
}
function nd(e) {
	return id(e.$typeName);
}
function rd(e) {
	let t = e.fields[0];
	return id(e.typeName) && t !== void 0 && t.fieldKind == "scalar" && t.name == "value" && t.number == 1;
}
function id(e) {
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
var ad = 999, od = 998, sd = 2;
function R(e, t) {
	if (Du(t, e)) return t;
	let n = _d(e);
	return t !== void 0 && cd(e, n, t), n;
}
function cd(e, t, n) {
	for (let r of e.members) {
		let e = n[r.localName];
		if (e == null) continue;
		let i;
		if (r.kind == "oneof") {
			let t = hl(n, r);
			if (!t) continue;
			i = t, e = vl(n, t);
		} else i = r;
		switch (i.fieldKind) {
			case "message":
				e = fd(i, e);
				break;
			case "scalar":
				e = ld(i, e);
				break;
			case "list":
				e = dd(i, e);
				break;
			case "map": e = ud(i, e);
		}
		yl(t, i, e);
	}
	return t;
}
function ld(e, t) {
	return e.scalar == I.BYTES ? pd(t) : t;
}
function ud(e, t) {
	if (ku(t)) {
		if (e.scalar == I.BYTES) return md(t, pd);
		if (e.mapKind == "message") return md(t, (t) => fd(e, t));
	}
	return t;
}
function dd(e, t) {
	if (Array.isArray(t)) {
		if (e.scalar == I.BYTES) return t.map(pd);
		if (e.listKind == "message") return t.map((t) => fd(e, t));
	}
	return t;
}
function fd(e, t) {
	if (e.fieldKind == "message" && !e.oneof && rd(e.message)) return ld(e.message.fields[0], t);
	if (ku(t)) {
		if (e.message.typeName == "google.protobuf.Struct" && e.parent.typeName !== "google.protobuf.Value") return t;
		if (!Du(t, e.message)) return R(e.message, t);
	}
	return t;
}
function pd(e) {
	return Array.isArray(e) ? new Uint8Array(e) : e;
}
function md(e, t) {
	let n = {};
	for (let r of Object.entries(e)) n[r[0]] = t(r[1]);
	return n;
}
var hd = Symbol(), gd = /* @__PURE__ */ new WeakMap();
function _d(e) {
	let t;
	if (vd(e)) {
		let n = gd.get(e), r, i;
		if (n) ({prototype: r, members: i} = n);
		else {
			r = {}, i = /* @__PURE__ */ new Set();
			for (let t of e.members) t.kind != "oneof" && (t.fieldKind == "scalar" || t.fieldKind == "enum") && t.presence != sd && (i.add(t), r[t.localName] = yd(t));
			gd.set(e, {
				prototype: r,
				members: i
			});
		}
		t = Object.create(r), t.$typeName = e.typeName;
		for (let n of e.members) i.has(n) || (n.kind != "field" || n.fieldKind != "message" && (n.fieldKind != "scalar" && n.fieldKind != "enum" || n.presence == sd)) && (t[n.localName] = yd(n));
	} else {
		t = { $typeName: e.typeName };
		for (let n of e.members) (n.kind == "oneof" || n.presence == sd) && (t[n.localName] = yd(n));
	}
	return t;
}
function vd(e) {
	switch (e.file.edition) {
		case ad: return !1;
		case od: return !0;
		default: return e.fields.some((e) => e.presence != sd && e.fieldKind != "message" && !e.oneof);
	}
}
function yd(e) {
	if (e.kind == "oneof") return { case: void 0 };
	if (e.fieldKind == "list") return [];
	if (e.fieldKind == "map") return {};
	if (e.fieldKind == "message") return hd;
	let t = e.getDefaultValue();
	return t === void 0 ? e.fieldKind == "scalar" ? dl(e.scalar, e.longAsString) : e.enum.values[0].number : e.fieldKind == "scalar" && e.longAsString ? t.toString() : t;
}
function bd(e, t, n = !0) {
	return new xd(e, t, n);
}
var xd = class {
	get sortedFields() {
		return this._sortedFields ??= this.desc.fields.concat().sort((e, t) => e.number - t.number);
	}
	constructor(e, t, n = !0) {
		this.lists = /* @__PURE__ */ new Map(), this.maps = /* @__PURE__ */ new Map(), this.check = n, this.desc = e, this.message = this[ml] = t ?? R(e), this.fields = e.fields, this.oneofs = e.oneofs, this.members = e.members;
	}
	findNumber(e) {
		return this._fieldsByNumber ||= new Map(this.desc.fields.map((e) => [e.number, e])), this._fieldsByNumber.get(e);
	}
	oneofCase(e) {
		return Sd(this.message, e), hl(this.message, e);
	}
	isSet(e) {
		return Sd(this.message, e), gl(this.message, e);
	}
	clear(e) {
		Sd(this.message, e), bl(this.message, e);
	}
	get(e) {
		Sd(this.message, e);
		let t = vl(this.message, e);
		switch (e.fieldKind) {
			case "list":
				let n = this.lists.get(e);
				return n && n[ml] === t || this.lists.set(e, n = new Cd(e, t, this.check)), n;
			case "map":
				let r = this.maps.get(e);
				return r && r[ml] === t || this.maps.set(e, r = new wd(e, t, this.check)), r;
			case "message": return Ed(e, t, this.check);
			case "scalar": return t === void 0 ? dl(e.scalar, !1) : Nd(e, t);
			case "enum": return t ?? e.enum.values[0].number;
		}
	}
	set(e, t) {
		if (Sd(this.message, e), this.check) {
			let n = Gu(e, t);
			if (n) throw n;
		}
		let n;
		n = e.fieldKind == "message" ? Td(e, t) : ju(t) || Au(t) ? t[ml] : Pd(e, t), yl(this.message, e, n);
	}
	getUnknown() {
		return this.message.$unknown;
	}
	setUnknown(e) {
		this.message.$unknown = e;
	}
};
function Sd(e, t) {
	if (t.parent.typeName !== e.$typeName) throw new Ou(t, `cannot use ${t.toString()} with message ${e.$typeName}`, "ForeignFieldError");
}
var Cd = class {
	field() {
		return this._field;
	}
	get size() {
		return this._arr.length;
	}
	constructor(e, t, n) {
		this._field = e, this._arr = this[ml] = t, this.check = n;
	}
	get(e) {
		let t = this._arr[e];
		return t === void 0 ? void 0 : Od(this._field, t, this.check);
	}
	set(e, t) {
		if (e < 0 || e >= this._arr.length) throw new Ou(this._field, `list item #${e + 1}: out of range`);
		if (this.check) {
			let n = Ku(this._field, e, t);
			if (n) throw n;
		}
		this._arr[e] = Dd(this._field, t);
	}
	add(e) {
		if (this.check) {
			let t = Ku(this._field, this._arr.length, e);
			if (t) throw t;
		}
		this._arr.push(Dd(this._field, e));
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
		for (let e of this._arr) yield Od(this._field, e, this.check);
	}
	*entries() {
		for (let e = 0; e < this._arr.length; e++) yield [e, Od(this._field, this._arr[e], this.check)];
	}
}, wd = class {
	constructor(e, t, n = !0) {
		this.obj = this[ml] = t ?? {}, this.check = n, this._field = e;
	}
	field() {
		return this._field;
	}
	set(e, t) {
		if (this.check) {
			let n = qu(this._field, e, t);
			if (n) throw n;
		}
		return this.obj[jd(e)] = kd(this._field, t), this;
	}
	delete(e) {
		let t = jd(e), n = Object.prototype.hasOwnProperty.call(this.obj, t);
		return n && delete this.obj[t], n;
	}
	clear() {
		for (let e of Object.keys(this.obj)) delete this.obj[e];
	}
	get(e) {
		let t = this.obj[jd(e)];
		return t !== void 0 && (t = Ad(this._field, t, this.check)), t;
	}
	has(e) {
		return Object.prototype.hasOwnProperty.call(this.obj, jd(e));
	}
	*keys() {
		for (let e of Object.keys(this.obj)) yield Md(e, this._field.mapKey);
	}
	*entries() {
		for (let e of Object.entries(this.obj)) yield [Md(e[0], this._field.mapKey), Ad(this._field, e[1], this.check)];
	}
	[Symbol.iterator]() {
		return this.entries();
	}
	get size() {
		return Object.keys(this.obj).length;
	}
	*values() {
		for (let e of Object.values(this.obj)) yield Ad(this._field, e, this.check);
	}
	forEach(e, t) {
		for (let n of this.entries()) e.call(t, n[1], n[0], this);
	}
};
function Td(e, t) {
	return Mu(t) ? nd(t.message) && !e.oneof && e.fieldKind == "message" ? t.message.value : t.desc.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" ? Id(t.message) : t.message : t;
}
function Ed(e, t, n) {
	return t !== void 0 && (rd(e.message) && !e.oneof && e.fieldKind == "message" ? t = {
		$typeName: e.message.typeName,
		value: Nd(e.message.fields[0], t)
	} : e.message.typeName == "google.protobuf.Struct" && e.parent.typeName != "google.protobuf.Value" && ku(t) && (t = Fd(t))), new xd(e.message, t, n);
}
function Dd(e, t) {
	return e.listKind == "message" ? Td(e, t) : Pd(e, t);
}
function Od(e, t, n) {
	return e.listKind == "message" ? Ed(e, t, n) : Nd(e, t);
}
function kd(e, t) {
	return e.mapKind == "message" ? Td(e, t) : Pd(e, t);
}
function Ad(e, t, n) {
	return e.mapKind == "message" ? Ed(e, t, n) : t;
}
function jd(e) {
	return typeof e == "string" || typeof e == "number" ? e : String(e);
}
function Md(e, t) {
	switch (t) {
		case I.STRING: return e;
		case I.INT32:
		case I.FIXED32:
		case I.UINT32:
		case I.SFIXED32:
		case I.SINT32: {
			let t = Number.parseInt(e);
			if (Number.isFinite(t)) return t;
			break;
		}
		case I.BOOL:
			switch (e) {
				case "true": return !0;
				case "false": return !1;
			}
			break;
		case I.UINT64:
		case I.FIXED64:
			try {
				return F.uParse(e);
			} catch {}
			break;
		default: try {
			return F.parse(e);
		} catch {}
	}
	return e;
}
function Nd(e, t) {
	switch (e.scalar) {
		case I.INT64:
		case I.SFIXED64:
		case I.SINT64:
			"longAsString" in e && e.longAsString && typeof t == "string" && (t = F.parse(t));
			break;
		case I.FIXED64:
		case I.UINT64: "longAsString" in e && e.longAsString && typeof t == "string" && (t = F.uParse(t));
	}
	return t;
}
function Pd(e, t) {
	switch (e.scalar) {
		case I.INT64:
		case I.SFIXED64:
		case I.SINT64:
			"longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = F.parse(t));
			break;
		case I.FIXED64:
		case I.UINT64: "longAsString" in e && e.longAsString ? t = String(t) : (typeof t == "string" || typeof t == "number") && (t = F.uParse(t));
	}
	return t;
}
function Fd(e) {
	let t = {
		$typeName: "google.protobuf.Struct",
		fields: {}
	};
	if (ku(e)) for (let [n, r] of Object.entries(e)) t.fields[n] = Rd(r);
	return t;
}
function Id(e) {
	let t = {};
	for (let [n, r] of Object.entries(e.fields)) t[n] = Ld(r);
	return t;
}
function Ld(e) {
	switch (e.kind.case) {
		case "structValue": return Id(e.kind.value);
		case "listValue": return e.kind.value.values.map(Ld);
		case "nullValue":
		case void 0: return null;
		default: return e.kind.value;
	}
}
function Rd(e) {
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
			if (Array.isArray(e)) for (let t of e) n.values.push(Rd(t));
			t.kind = {
				case: "listValue",
				value: n
			};
		} else t.kind = {
			case: "structValue",
			value: Fd(e)
		};
	}
	return t;
}
var zd = 3, Bd = { writeUnknownFields: !0 };
function Vd(e) {
	return e ? Object.assign(Object.assign({}, Bd), e) : Bd;
}
function z(e, t, n) {
	return Hd(new Bu(), Vd(n), bd(e, t)).finish();
}
function Hd(e, t, n) {
	for (let r of n.sortedFields) if (n.isSet(r)) Ud(e, t, n, r);
	else if (r.presence == zd) throw Error(`cannot encode ${r} to binary: required field not set`);
	if (t.writeUnknownFields) for (let { no: t, wireType: r, data: i } of n.getUnknown() ?? []) e.tag(t, r).raw(i);
	return e;
}
function Ud(e, t, n, r) {
	switch (r.fieldKind) {
		case "scalar":
		case "enum":
			Wd(e, n.desc.typeName, r.name, r.scalar ?? I.INT32, r.number, n.get(r));
			break;
		case "list":
			Kd(e, t, r, n.get(r));
			break;
		case "message":
			Gd(e, t, r, n.get(r));
			break;
		case "map": for (let [i, a] of n.get(r)) qd(e, t, r, i, a);
	}
}
function Wd(e, t, n, r, i, a) {
	Jd(e.tag(i, Yd(r)), t, n, r, a);
}
function Gd(e, t, n, r) {
	n.delimitedEncoding ? Hd(e.tag(n.number, L.StartGroup), t, r).tag(n.number, L.EndGroup) : Hd(e.tag(n.number, L.LengthDelimited).fork(), t, r).join();
}
function Kd(e, t, n, r) {
	if (n.listKind == "message") {
		for (let i of r) Gd(e, t, n, i);
		return;
	}
	let i = n.scalar ?? I.INT32;
	if (n.packed) {
		if (!r.size) return;
		e.tag(n.number, L.LengthDelimited).fork();
		for (let t of r) Jd(e, n.parent.typeName, n.name, i, t);
		e.join();
	} else for (let t of r) Wd(e, n.parent.typeName, n.name, i, n.number, t);
}
function qd(e, t, n, r, i) {
	switch (e.tag(n.number, L.LengthDelimited).fork(), Wd(e, n.parent.typeName, n.name, n.mapKey, 1, r), n.mapKind) {
		case "scalar":
		case "enum":
			Wd(e, n.parent.typeName, n.name, n.scalar ?? I.INT32, 2, i);
			break;
		case "message": Hd(e.tag(2, L.LengthDelimited).fork(), t, i).join();
	}
	e.join();
}
function Jd(e, t, n, r, i) {
	try {
		switch (r) {
			case I.STRING:
				e.string(i);
				break;
			case I.BOOL:
				e.bool(i);
				break;
			case I.DOUBLE:
				e.double(i);
				break;
			case I.FLOAT:
				e.float(i);
				break;
			case I.INT32:
				e.int32(i);
				break;
			case I.INT64:
				e.int64(i);
				break;
			case I.UINT64:
				e.uint64(i);
				break;
			case I.FIXED64:
				e.fixed64(i);
				break;
			case I.BYTES:
				e.bytes(i);
				break;
			case I.FIXED32:
				e.fixed32(i);
				break;
			case I.SFIXED32:
				e.sfixed32(i);
				break;
			case I.SFIXED64:
				e.sfixed64(i);
				break;
			case I.SINT64:
				e.sint64(i);
				break;
			case I.UINT32:
				e.uint32(i);
				break;
			case I.SINT32: e.sint32(i);
		}
	} catch (e) {
		throw e instanceof Error ? Error(`cannot encode field ${t}.${n} to binary: ${e.message}`) : e;
	}
}
function Yd(e) {
	switch (e) {
		case I.BYTES:
		case I.STRING: return L.LengthDelimited;
		case I.DOUBLE:
		case I.FIXED64:
		case I.SFIXED64: return L.Bit64;
		case I.FIXED32:
		case I.SFIXED32:
		case I.FLOAT: return L.Bit32;
		default: return L.Varint;
	}
}
function Xd(e, t, ...n) {
	return n.reduce((e, t) => e.nestedMessages[t], e.messages[t]);
}
var Zd = /* @__PURE__ */ Xd(/* @__PURE__ */ hu({
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
}), 1), Qd;
(function(e) {
	e[e.DECLARATION = 0] = "DECLARATION", e[e.UNVERIFIED = 1] = "UNVERIFIED";
})(Qd ||= {});
var $d;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.GROUP = 10] = "GROUP", e[e.MESSAGE = 11] = "MESSAGE", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.ENUM = 14] = "ENUM", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})($d ||= {});
var ef;
(function(e) {
	e[e.OPTIONAL = 1] = "OPTIONAL", e[e.REPEATED = 3] = "REPEATED", e[e.REQUIRED = 2] = "REQUIRED";
})(ef ||= {});
var tf;
(function(e) {
	e[e.SPEED = 1] = "SPEED", e[e.CODE_SIZE = 2] = "CODE_SIZE", e[e.LITE_RUNTIME = 3] = "LITE_RUNTIME";
})(tf ||= {});
var nf;
(function(e) {
	e[e.STRING = 0] = "STRING", e[e.CORD = 1] = "CORD", e[e.STRING_PIECE = 2] = "STRING_PIECE";
})(nf ||= {});
var rf;
(function(e) {
	e[e.JS_NORMAL = 0] = "JS_NORMAL", e[e.JS_STRING = 1] = "JS_STRING", e[e.JS_NUMBER = 2] = "JS_NUMBER";
})(rf ||= {});
var af;
(function(e) {
	e[e.RETENTION_UNKNOWN = 0] = "RETENTION_UNKNOWN", e[e.RETENTION_RUNTIME = 1] = "RETENTION_RUNTIME", e[e.RETENTION_SOURCE = 2] = "RETENTION_SOURCE";
})(af ||= {});
var of;
(function(e) {
	e[e.TARGET_TYPE_UNKNOWN = 0] = "TARGET_TYPE_UNKNOWN", e[e.TARGET_TYPE_FILE = 1] = "TARGET_TYPE_FILE", e[e.TARGET_TYPE_EXTENSION_RANGE = 2] = "TARGET_TYPE_EXTENSION_RANGE", e[e.TARGET_TYPE_MESSAGE = 3] = "TARGET_TYPE_MESSAGE", e[e.TARGET_TYPE_FIELD = 4] = "TARGET_TYPE_FIELD", e[e.TARGET_TYPE_ONEOF = 5] = "TARGET_TYPE_ONEOF", e[e.TARGET_TYPE_ENUM = 6] = "TARGET_TYPE_ENUM", e[e.TARGET_TYPE_ENUM_ENTRY = 7] = "TARGET_TYPE_ENUM_ENTRY", e[e.TARGET_TYPE_SERVICE = 8] = "TARGET_TYPE_SERVICE", e[e.TARGET_TYPE_METHOD = 9] = "TARGET_TYPE_METHOD";
})(of ||= {});
var sf;
(function(e) {
	e[e.IDEMPOTENCY_UNKNOWN = 0] = "IDEMPOTENCY_UNKNOWN", e[e.NO_SIDE_EFFECTS = 1] = "NO_SIDE_EFFECTS", e[e.IDEMPOTENT = 2] = "IDEMPOTENT";
})(sf ||= {});
var cf;
(function(e) {
	e[e.DEFAULT_SYMBOL_VISIBILITY_UNKNOWN = 0] = "DEFAULT_SYMBOL_VISIBILITY_UNKNOWN", e[e.EXPORT_ALL = 1] = "EXPORT_ALL", e[e.EXPORT_TOP_LEVEL = 2] = "EXPORT_TOP_LEVEL", e[e.LOCAL_ALL = 3] = "LOCAL_ALL", e[e.STRICT = 4] = "STRICT";
})(cf ||= {});
var lf;
(function(e) {
	e[e.FIELD_PRESENCE_UNKNOWN = 0] = "FIELD_PRESENCE_UNKNOWN", e[e.EXPLICIT = 1] = "EXPLICIT", e[e.IMPLICIT = 2] = "IMPLICIT", e[e.LEGACY_REQUIRED = 3] = "LEGACY_REQUIRED";
})(lf ||= {});
var uf;
(function(e) {
	e[e.ENUM_TYPE_UNKNOWN = 0] = "ENUM_TYPE_UNKNOWN", e[e.OPEN = 1] = "OPEN", e[e.CLOSED = 2] = "CLOSED";
})(uf ||= {});
var df;
(function(e) {
	e[e.REPEATED_FIELD_ENCODING_UNKNOWN = 0] = "REPEATED_FIELD_ENCODING_UNKNOWN", e[e.PACKED = 1] = "PACKED", e[e.EXPANDED = 2] = "EXPANDED";
})(df ||= {});
var ff;
(function(e) {
	e[e.UTF8_VALIDATION_UNKNOWN = 0] = "UTF8_VALIDATION_UNKNOWN", e[e.VERIFY = 2] = "VERIFY", e[e.NONE = 3] = "NONE";
})(ff ||= {});
var pf;
(function(e) {
	e[e.MESSAGE_ENCODING_UNKNOWN = 0] = "MESSAGE_ENCODING_UNKNOWN", e[e.LENGTH_PREFIXED = 1] = "LENGTH_PREFIXED", e[e.DELIMITED = 2] = "DELIMITED";
})(pf ||= {});
var mf;
(function(e) {
	e[e.JSON_FORMAT_UNKNOWN = 0] = "JSON_FORMAT_UNKNOWN", e[e.ALLOW = 1] = "ALLOW", e[e.LEGACY_BEST_EFFORT = 2] = "LEGACY_BEST_EFFORT";
})(mf ||= {});
var hf;
(function(e) {
	e[e.ENFORCE_NAMING_STYLE_UNKNOWN = 0] = "ENFORCE_NAMING_STYLE_UNKNOWN", e[e.STYLE2024 = 1] = "STYLE2024", e[e.STYLE_LEGACY = 2] = "STYLE_LEGACY";
})(hf ||= {});
var gf;
(function(e) {
	e[e.NONE = 0] = "NONE", e[e.SET = 1] = "SET", e[e.ALIAS = 2] = "ALIAS";
})(gf ||= {});
var _f;
(function(e) {
	e[e.EDITION_UNKNOWN = 0] = "EDITION_UNKNOWN", e[e.EDITION_LEGACY = 900] = "EDITION_LEGACY", e[e.EDITION_PROTO2 = 998] = "EDITION_PROTO2", e[e.EDITION_PROTO3 = 999] = "EDITION_PROTO3", e[e.EDITION_2023 = 1e3] = "EDITION_2023", e[e.EDITION_2024 = 1001] = "EDITION_2024", e[e.EDITION_1_TEST_ONLY = 1] = "EDITION_1_TEST_ONLY", e[e.EDITION_2_TEST_ONLY = 2] = "EDITION_2_TEST_ONLY", e[e.EDITION_99997_TEST_ONLY = 99997] = "EDITION_99997_TEST_ONLY", e[e.EDITION_99998_TEST_ONLY = 99998] = "EDITION_99998_TEST_ONLY", e[e.EDITION_99999_TEST_ONLY = 99999] = "EDITION_99999_TEST_ONLY", e[e.EDITION_MAX = 0x7fffffff] = "EDITION_MAX";
})(_f ||= {});
var vf;
(function(e) {
	e[e.VISIBILITY_UNSET = 0] = "VISIBILITY_UNSET", e[e.VISIBILITY_LOCAL = 1] = "VISIBILITY_LOCAL", e[e.VISIBILITY_EXPORT = 2] = "VISIBILITY_EXPORT";
})(vf ||= {});
function B(e, t, ...n) {
	if (n.length == 0) return e.enums[t];
	let r = n.pop();
	return n.reduce((e, t) => e.nestedMessages[t], e.messages[t]).nestedEnums[r];
}
var yf = { readUnknownFields: !0 };
function bf(e) {
	return e ? Object.assign(Object.assign({}, yf), e) : yf;
}
function xf(e, t, n) {
	let r = bd(e, void 0, !1);
	return Sf(r, new Vu(t), bf(n), !1, t.byteLength), r.message;
}
function Sf(e, t, n, r, i) {
	let a = r ? t.len : t.pos + i, o, s, c = e.getUnknown() ?? [];
	for (; t.pos < a && ([o, s] = t.tag(), !(r && s == L.EndGroup));) {
		let r = e.findNumber(o);
		if (r) Cf(e, t, r, s, n);
		else {
			let e = t.skip(s, o);
			n.readUnknownFields && c.push({
				no: o,
				wireType: s,
				data: e
			});
		}
	}
	if (r && (s != L.EndGroup || o !== i)) throw Error("invalid end group tag");
	c.length > 0 && e.setUnknown(c);
}
function Cf(e, t, n, r, i) {
	switch (n.fieldKind) {
		case "scalar":
			e.set(n, Df(t, n.scalar));
			break;
		case "enum":
			let a = Df(t, I.INT32);
			if (n.enum.open) e.set(n, a);
			else if (n.enum.values.some((e) => e.number === a)) e.set(n, a);
			else if (i.readUnknownFields) {
				let t = [];
				ol(a, t);
				let i = e.getUnknown() ?? [];
				i.push({
					no: n.number,
					wireType: r,
					data: new Uint8Array(t)
				}), e.setUnknown(i);
			}
			break;
		case "message":
			e.set(n, Ef(t, i, n, e.get(n)));
			break;
		case "list":
			Tf(t, r, e.get(n), i);
			break;
		case "map": wf(t, e.get(n), i);
	}
}
function wf(e, t, n) {
	let r = t.field(), i, a, o = e.uint32(), s = e.pos + o;
	for (; e.pos < s;) {
		let [t] = e.tag();
		switch (t) {
			case 1:
				i = Df(e, r.mapKey);
				break;
			case 2: switch (r.mapKind) {
				case "scalar":
					a = Df(e, r.scalar);
					break;
				case "enum":
					a = e.int32();
					break;
				case "message": a = Ef(e, n, r);
			}
		}
	}
	if (i === void 0 && (i = dl(r.mapKey, !1)), a === void 0) switch (r.mapKind) {
		case "scalar":
			a = dl(r.scalar, !1);
			break;
		case "enum":
			a = r.enum.values[0].number;
			break;
		case "message": a = bd(r.message, void 0, !1);
	}
	t.set(i, a);
}
function Tf(e, t, n, r) {
	let i = n.field();
	if (i.listKind === "message") {
		n.add(Ef(e, r, i));
		return;
	}
	let a = i.scalar ?? I.INT32;
	if (t != L.LengthDelimited || a == I.STRING || a == I.BYTES) {
		n.add(Df(e, a));
		return;
	}
	let o = e.uint32() + e.pos;
	for (; e.pos < o;) n.add(Df(e, a));
}
function Ef(e, t, n, r) {
	let i = n.delimitedEncoding, a = r ?? bd(n.message, void 0, !1);
	return Sf(a, e, t, i, i ? n.number : e.uint32()), a;
}
function Df(e, t) {
	switch (t) {
		case I.STRING: return e.string();
		case I.BOOL: return e.bool();
		case I.DOUBLE: return e.double();
		case I.FLOAT: return e.float();
		case I.INT32: return e.int32();
		case I.INT64: return e.int64();
		case I.UINT64: return e.uint64();
		case I.FIXED64: return e.fixed64();
		case I.BYTES: return e.bytes();
		case I.FIXED32: return e.fixed32();
		case I.SFIXED32: return e.sfixed32();
		case I.SFIXED64: return e.sfixed64();
		case I.SINT64: return e.sint64();
		case I.UINT32: return e.uint32();
		case I.SINT32: return e.sint32();
	}
}
function V(e, t) {
	let n = xf(Zd, xu(e));
	return n.messageType.forEach(xl), n.dependency = t?.map((e) => e.proto.name) ?? [], El(n, (e) => t?.find((t) => t.proto.name === e)).getFile(n.name);
}
function H(e, t, ...n) {
	return n.reduce((e, t) => e.nestedMessages[t], e.messages[t]);
}
var Of = Ic({
	ATAK: () => Uh,
	Admin: () => Y,
	AppOnly: () => Bh,
	CannedMessages: () => tg,
	Channel: () => kf,
	ClientOnly: () => cg,
	Config: () => Lf,
	ConnectionStatus: () => Tp,
	LocalOnly: () => ig,
	Mesh: () => q,
	ModuleConfig: () => Np,
	Mqtt: () => dg,
	PaxCount: () => hg,
	Portnums: () => G,
	PowerMon: () => vg,
	RemoteHardware: () => Eg,
	Rtttl: () => jg,
	StoreForward: () => Pg,
	Telemetry: () => dm,
	Xmodem: () => K
}), kf = P({
	ChannelSchema: () => Nf,
	ChannelSettingsSchema: () => jf,
	Channel_Role: () => Pf,
	Channel_RoleSchema: () => Ff,
	ModuleSettingsSchema: () => Mf,
	file_channel: () => Af
}), Af = /* @__PURE__ */ V("Cg1jaGFubmVsLnByb3RvEgptZXNodGFzdGljIrgBCg9DaGFubmVsU2V0dGluZ3MSFwoLY2hhbm5lbF9udW0YASABKA1CAhgBEgsKA3BzaxgCIAEoDBIMCgRuYW1lGAMgASgJEgoKAmlkGAQgASgHEhYKDnVwbGlua19lbmFibGVkGAUgASgIEhgKEGRvd25saW5rX2VuYWJsZWQYBiABKAgSMwoPbW9kdWxlX3NldHRpbmdzGAcgASgLMhoubWVzaHRhc3RpYy5Nb2R1bGVTZXR0aW5ncyJFCg5Nb2R1bGVTZXR0aW5ncxIaChJwb3NpdGlvbl9wcmVjaXNpb24YASABKA0SFwoPaXNfY2xpZW50X211dGVkGAIgASgIIqEBCgdDaGFubmVsEg0KBWluZGV4GAEgASgFEi0KCHNldHRpbmdzGAIgASgLMhsubWVzaHRhc3RpYy5DaGFubmVsU2V0dGluZ3MSJgoEcm9sZRgDIAEoDjIYLm1lc2h0YXN0aWMuQ2hhbm5lbC5Sb2xlIjAKBFJvbGUSDAoIRElTQUJMRUQQABILCgdQUklNQVJZEAESDQoJU0VDT05EQVJZEAJCYgoTY29tLmdlZWtzdmlsbGUubWVzaEINQ2hhbm5lbFByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM"), jf = /* @__PURE__ */ H(Af, 0), Mf = /* @__PURE__ */ H(Af, 1), Nf = /* @__PURE__ */ H(Af, 2), Pf = /* @__PURE__ */ function(e) {
	return e[e.DISABLED = 0] = "DISABLED", e[e.PRIMARY = 1] = "PRIMARY", e[e.SECONDARY = 2] = "SECONDARY", e;
}({}), Ff = /* @__PURE__ */ B(Af, 2, 0), If = /* @__PURE__ */ V("Cg9kZXZpY2VfdWkucHJvdG8SCm1lc2h0YXN0aWMivgMKDkRldmljZVVJQ29uZmlnEg8KB3ZlcnNpb24YASABKA0SGQoRc2NyZWVuX2JyaWdodG5lc3MYAiABKA0SFgoOc2NyZWVuX3RpbWVvdXQYAyABKA0SEwoLc2NyZWVuX2xvY2sYBCABKAgSFQoNc2V0dGluZ3NfbG9jaxgFIAEoCBIQCghwaW5fY29kZRgGIAEoDRIgCgV0aGVtZRgHIAEoDjIRLm1lc2h0YXN0aWMuVGhlbWUSFQoNYWxlcnRfZW5hYmxlZBgIIAEoCBIWCg5iYW5uZXJfZW5hYmxlZBgJIAEoCBIUCgxyaW5nX3RvbmVfaWQYCiABKA0SJgoIbGFuZ3VhZ2UYCyABKA4yFC5tZXNodGFzdGljLkxhbmd1YWdlEisKC25vZGVfZmlsdGVyGAwgASgLMhYubWVzaHRhc3RpYy5Ob2RlRmlsdGVyEjEKDm5vZGVfaGlnaGxpZ2h0GA0gASgLMhkubWVzaHRhc3RpYy5Ob2RlSGlnaGxpZ2h0EhgKEGNhbGlicmF0aW9uX2RhdGEYDiABKAwSIQoIbWFwX2RhdGEYDyABKAsyDy5tZXNodGFzdGljLk1hcCKnAQoKTm9kZUZpbHRlchIWCg51bmtub3duX3N3aXRjaBgBIAEoCBIWCg5vZmZsaW5lX3N3aXRjaBgCIAEoCBIZChFwdWJsaWNfa2V5X3N3aXRjaBgDIAEoCBIRCglob3BzX2F3YXkYBCABKAUSFwoPcG9zaXRpb25fc3dpdGNoGAUgASgIEhEKCW5vZGVfbmFtZRgGIAEoCRIPCgdjaGFubmVsGAcgASgFIn4KDU5vZGVIaWdobGlnaHQSEwoLY2hhdF9zd2l0Y2gYASABKAgSFwoPcG9zaXRpb25fc3dpdGNoGAIgASgIEhgKEHRlbGVtZXRyeV9zd2l0Y2gYAyABKAgSEgoKaWFxX3N3aXRjaBgEIAEoCBIRCglub2RlX25hbWUYBSABKAkiPQoIR2VvUG9pbnQSDAoEem9vbRgBIAEoBRIQCghsYXRpdHVkZRgCIAEoBRIRCglsb25naXR1ZGUYAyABKAUiTAoDTWFwEiIKBGhvbWUYASABKAsyFC5tZXNodGFzdGljLkdlb1BvaW50Eg0KBXN0eWxlGAIgASgJEhIKCmZvbGxvd19ncHMYAyABKAgqJQoFVGhlbWUSCAoEREFSSxAAEgkKBUxJR0hUEAESBwoDUkVEEAIqqQIKCExhbmd1YWdlEgsKB0VOR0xJU0gQABIKCgZGUkVOQ0gQARIKCgZHRVJNQU4QAhILCgdJVEFMSUFOEAMSDgoKUE9SVFVHVUVTRRAEEgsKB1NQQU5JU0gQBRILCgdTV0VESVNIEAYSCwoHRklOTklTSBAHEgoKBlBPTElTSBAIEgsKB1RVUktJU0gQCRILCgdTRVJCSUFOEAoSCwoHUlVTU0lBThALEgkKBURVVENIEAwSCQoFR1JFRUsQDRINCglOT1JXRUdJQU4QDhINCglTTE9WRU5JQU4QDxINCglVS1JBSU5JQU4QEBINCglCVUxHQVJJQU4QERIWChJTSU1QTElGSUVEX0NISU5FU0UQHhIXChNUUkFESVRJT05BTF9DSElORVNFEB9CYwoTY29tLmdlZWtzdmlsbGUubWVzaEIORGV2aWNlVUlQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), Lf = P({
	ConfigSchema: () => Rf,
	Config_BluetoothConfigSchema: () => bp,
	Config_BluetoothConfig_PairingMode: () => xp,
	Config_BluetoothConfig_PairingModeSchema: () => Sp,
	Config_DeviceConfigSchema: () => zf,
	Config_DeviceConfig_BuzzerMode: () => Wf,
	Config_DeviceConfig_BuzzerModeSchema: () => Gf,
	Config_DeviceConfig_RebroadcastMode: () => Hf,
	Config_DeviceConfig_RebroadcastModeSchema: () => Uf,
	Config_DeviceConfig_Role: () => Bf,
	Config_DeviceConfig_RoleSchema: () => Vf,
	Config_DisplayConfigSchema: () => ip,
	Config_DisplayConfig_CompassOrientation: () => pp,
	Config_DisplayConfig_CompassOrientationSchema: () => mp,
	Config_DisplayConfig_DisplayMode: () => dp,
	Config_DisplayConfig_DisplayModeSchema: () => fp,
	Config_DisplayConfig_DisplayUnits: () => sp,
	Config_DisplayConfig_DisplayUnitsSchema: () => cp,
	Config_DisplayConfig_GpsCoordinateFormat: () => ap,
	Config_DisplayConfig_GpsCoordinateFormatSchema: () => op,
	Config_DisplayConfig_OledType: () => lp,
	Config_DisplayConfig_OledTypeSchema: () => up,
	Config_LoRaConfigSchema: () => hp,
	Config_LoRaConfig_ModemPreset: () => vp,
	Config_LoRaConfig_ModemPresetSchema: () => yp,
	Config_LoRaConfig_RegionCode: () => gp,
	Config_LoRaConfig_RegionCodeSchema: () => _p,
	Config_NetworkConfigSchema: () => Qf,
	Config_NetworkConfig_AddressMode: () => ep,
	Config_NetworkConfig_AddressModeSchema: () => tp,
	Config_NetworkConfig_IpV4ConfigSchema: () => $f,
	Config_NetworkConfig_ProtocolFlags: () => np,
	Config_NetworkConfig_ProtocolFlagsSchema: () => rp,
	Config_PositionConfigSchema: () => Kf,
	Config_PositionConfig_GpsMode: () => Yf,
	Config_PositionConfig_GpsModeSchema: () => Xf,
	Config_PositionConfig_PositionFlags: () => qf,
	Config_PositionConfig_PositionFlagsSchema: () => Jf,
	Config_PowerConfigSchema: () => Zf,
	Config_SecurityConfigSchema: () => Cp,
	Config_SessionkeyConfigSchema: () => wp,
	file_config: () => U
}), U = /* @__PURE__ */ V("Cgxjb25maWcucHJvdG8SCm1lc2h0YXN0aWMipigKBkNvbmZpZxIxCgZkZXZpY2UYASABKAsyHy5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWdIABI1Cghwb3NpdGlvbhgCIAEoCzIhLm1lc2h0YXN0aWMuQ29uZmlnLlBvc2l0aW9uQ29uZmlnSAASLwoFcG93ZXIYAyABKAsyHi5tZXNodGFzdGljLkNvbmZpZy5Qb3dlckNvbmZpZ0gAEjMKB25ldHdvcmsYBCABKAsyIC5tZXNodGFzdGljLkNvbmZpZy5OZXR3b3JrQ29uZmlnSAASMwoHZGlzcGxheRgFIAEoCzIgLm1lc2h0YXN0aWMuQ29uZmlnLkRpc3BsYXlDb25maWdIABItCgRsb3JhGAYgASgLMh0ubWVzaHRhc3RpYy5Db25maWcuTG9SYUNvbmZpZ0gAEjcKCWJsdWV0b290aBgHIAEoCzIiLm1lc2h0YXN0aWMuQ29uZmlnLkJsdWV0b290aENvbmZpZ0gAEjUKCHNlY3VyaXR5GAggASgLMiEubWVzaHRhc3RpYy5Db25maWcuU2VjdXJpdHlDb25maWdIABI5CgpzZXNzaW9ua2V5GAkgASgLMiMubWVzaHRhc3RpYy5Db25maWcuU2Vzc2lvbmtleUNvbmZpZ0gAEi8KCWRldmljZV91aRgKIAEoCzIaLm1lc2h0YXN0aWMuRGV2aWNlVUlDb25maWdIABrMBgoMRGV2aWNlQ29uZmlnEjIKBHJvbGUYASABKA4yJC5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWcuUm9sZRIaCg5zZXJpYWxfZW5hYmxlZBgCIAEoCEICGAESEwoLYnV0dG9uX2dwaW8YBCABKA0SEwoLYnV6emVyX2dwaW8YBSABKA0SSQoQcmVicm9hZGNhc3RfbW9kZRgGIAEoDjIvLm1lc2h0YXN0aWMuQ29uZmlnLkRldmljZUNvbmZpZy5SZWJyb2FkY2FzdE1vZGUSIAoYbm9kZV9pbmZvX2Jyb2FkY2FzdF9zZWNzGAcgASgNEiIKGmRvdWJsZV90YXBfYXNfYnV0dG9uX3ByZXNzGAggASgIEhYKCmlzX21hbmFnZWQYCSABKAhCAhgBEhwKFGRpc2FibGVfdHJpcGxlX2NsaWNrGAogASgIEg0KBXR6ZGVmGAsgASgJEh4KFmxlZF9oZWFydGJlYXRfZGlzYWJsZWQYDCABKAgSPwoLYnV6emVyX21vZGUYDSABKA4yKi5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWcuQnV6emVyTW9kZSK/AQoEUm9sZRIKCgZDTElFTlQQABIPCgtDTElFTlRfTVVURRABEgoKBlJPVVRFUhACEhUKDVJPVVRFUl9DTElFTlQQAxoCCAESDAoIUkVQRUFURVIQBBILCgdUUkFDS0VSEAUSCgoGU0VOU09SEAYSBwoDVEFLEAcSEQoNQ0xJRU5UX0hJRERFThAIEhIKDkxPU1RfQU5EX0ZPVU5EEAkSDwoLVEFLX1RSQUNLRVIQChIPCgtST1VURVJfTEFURRALInMKD1JlYnJvYWRjYXN0TW9kZRIHCgNBTEwQABIVChFBTExfU0tJUF9ERUNPRElORxABEg4KCkxPQ0FMX09OTFkQAhIOCgpLTk9XTl9PTkxZEAMSCAoETk9ORRAEEhYKEkNPUkVfUE9SVE5VTVNfT05MWRAFIlQKCkJ1enplck1vZGUSDwoLQUxMX0VOQUJMRUQQABIMCghESVNBQkxFRBABEhYKEk5PVElGSUNBVElPTlNfT05MWRACEg8KC1NZU1RFTV9PTkxZEAMakQUKDlBvc2l0aW9uQ29uZmlnEh8KF3Bvc2l0aW9uX2Jyb2FkY2FzdF9zZWNzGAEgASgNEigKIHBvc2l0aW9uX2Jyb2FkY2FzdF9zbWFydF9lbmFibGVkGAIgASgIEhYKDmZpeGVkX3Bvc2l0aW9uGAMgASgIEhcKC2dwc19lbmFibGVkGAQgASgIQgIYARIbChNncHNfdXBkYXRlX2ludGVydmFsGAUgASgNEhwKEGdwc19hdHRlbXB0X3RpbWUYBiABKA1CAhgBEhYKDnBvc2l0aW9uX2ZsYWdzGAcgASgNEg8KB3J4X2dwaW8YCCABKA0SDwoHdHhfZ3BpbxgJIAEoDRIoCiBicm9hZGNhc3Rfc21hcnRfbWluaW11bV9kaXN0YW5jZRgKIAEoDRItCiVicm9hZGNhc3Rfc21hcnRfbWluaW11bV9pbnRlcnZhbF9zZWNzGAsgASgNEhMKC2dwc19lbl9ncGlvGAwgASgNEjsKCGdwc19tb2RlGA0gASgOMikubWVzaHRhc3RpYy5Db25maWcuUG9zaXRpb25Db25maWcuR3BzTW9kZSKrAQoNUG9zaXRpb25GbGFncxIJCgVVTlNFVBAAEgwKCEFMVElUVURFEAESEAoMQUxUSVRVREVfTVNMEAISFgoSR0VPSURBTF9TRVBBUkFUSU9OEAQSBwoDRE9QEAgSCQoFSFZET1AQEBINCglTQVRJTlZJRVcQIBIKCgZTRVFfTk8QQBIOCglUSU1FU1RBTVAQgAESDAoHSEVBRElORxCAAhIKCgVTUEVFRBCABCI1CgdHcHNNb2RlEgwKCERJU0FCTEVEEAASCwoHRU5BQkxFRBABEg8KC05PVF9QUkVTRU5UEAIahAIKC1Bvd2VyQ29uZmlnEhcKD2lzX3Bvd2VyX3NhdmluZxgBIAEoCBImCh5vbl9iYXR0ZXJ5X3NodXRkb3duX2FmdGVyX3NlY3MYAiABKA0SHwoXYWRjX211bHRpcGxpZXJfb3ZlcnJpZGUYAyABKAISGwoTd2FpdF9ibHVldG9vdGhfc2VjcxgEIAEoDRIQCghzZHNfc2VjcxgGIAEoDRIPCgdsc19zZWNzGAcgASgNEhUKDW1pbl93YWtlX3NlY3MYCCABKA0SIgoaZGV2aWNlX2JhdHRlcnlfaW5hX2FkZHJlc3MYCSABKA0SGAoQcG93ZXJtb25fZW5hYmxlcxggIAEoBBrlAwoNTmV0d29ya0NvbmZpZxIUCgx3aWZpX2VuYWJsZWQYASABKAgSEQoJd2lmaV9zc2lkGAMgASgJEhAKCHdpZmlfcHNrGAQgASgJEhIKCm50cF9zZXJ2ZXIYBSABKAkSEwoLZXRoX2VuYWJsZWQYBiABKAgSQgoMYWRkcmVzc19tb2RlGAcgASgOMiwubWVzaHRhc3RpYy5Db25maWcuTmV0d29ya0NvbmZpZy5BZGRyZXNzTW9kZRJACgtpcHY0X2NvbmZpZxgIIAEoCzIrLm1lc2h0YXN0aWMuQ29uZmlnLk5ldHdvcmtDb25maWcuSXBWNENvbmZpZxIWCg5yc3lzbG9nX3NlcnZlchgJIAEoCRIZChFlbmFibGVkX3Byb3RvY29scxgKIAEoDRIUCgxpcHY2X2VuYWJsZWQYCyABKAgaRgoKSXBWNENvbmZpZxIKCgJpcBgBIAEoBxIPCgdnYXRld2F5GAIgASgHEg4KBnN1Ym5ldBgDIAEoBxILCgNkbnMYBCABKAciIwoLQWRkcmVzc01vZGUSCAoEREhDUBAAEgoKBlNUQVRJQxABIjQKDVByb3RvY29sRmxhZ3MSEAoMTk9fQlJPQURDQVNUEAASEQoNVURQX0JST0FEQ0FTVBABGvwHCg1EaXNwbGF5Q29uZmlnEhYKDnNjcmVlbl9vbl9zZWNzGAEgASgNEkgKCmdwc19mb3JtYXQYAiABKA4yNC5tZXNodGFzdGljLkNvbmZpZy5EaXNwbGF5Q29uZmlnLkdwc0Nvb3JkaW5hdGVGb3JtYXQSIQoZYXV0b19zY3JlZW5fY2Fyb3VzZWxfc2VjcxgDIAEoDRIZChFjb21wYXNzX25vcnRoX3RvcBgEIAEoCBITCgtmbGlwX3NjcmVlbhgFIAEoCBI8CgV1bml0cxgGIAEoDjItLm1lc2h0YXN0aWMuQ29uZmlnLkRpc3BsYXlDb25maWcuRGlzcGxheVVuaXRzEjcKBG9sZWQYByABKA4yKS5tZXNodGFzdGljLkNvbmZpZy5EaXNwbGF5Q29uZmlnLk9sZWRUeXBlEkEKC2Rpc3BsYXltb2RlGAggASgOMiwubWVzaHRhc3RpYy5Db25maWcuRGlzcGxheUNvbmZpZy5EaXNwbGF5TW9kZRIUCgxoZWFkaW5nX2JvbGQYCSABKAgSHQoVd2FrZV9vbl90YXBfb3JfbW90aW9uGAogASgIElAKE2NvbXBhc3Nfb3JpZW50YXRpb24YCyABKA4yMy5tZXNodGFzdGljLkNvbmZpZy5EaXNwbGF5Q29uZmlnLkNvbXBhc3NPcmllbnRhdGlvbhIVCg11c2VfMTJoX2Nsb2NrGAwgASgIIk0KE0dwc0Nvb3JkaW5hdGVGb3JtYXQSBwoDREVDEAASBwoDRE1TEAESBwoDVVRNEAISCAoETUdSUxADEgcKA09MQxAEEggKBE9TR1IQBSIoCgxEaXNwbGF5VW5pdHMSCgoGTUVUUklDEAASDAoISU1QRVJJQUwQASJlCghPbGVkVHlwZRINCglPTEVEX0FVVE8QABIQCgxPTEVEX1NTRDEzMDYQARIPCgtPTEVEX1NIMTEwNhACEg8KC09MRURfU0gxMTA3EAMSFgoST0xFRF9TSDExMDdfMTI4XzY0EAQiQQoLRGlzcGxheU1vZGUSCwoHREVGQVVMVBAAEgwKCFRXT0NPTE9SEAESDAoISU5WRVJURUQQAhIJCgVDT0xPUhADIroBChJDb21wYXNzT3JpZW50YXRpb24SDQoJREVHUkVFU18wEAASDgoKREVHUkVFU185MBABEg8KC0RFR1JFRVNfMTgwEAISDwoLREVHUkVFU18yNzAQAxIWChJERUdSRUVTXzBfSU5WRVJURUQQBBIXChNERUdSRUVTXzkwX0lOVkVSVEVEEAUSGAoUREVHUkVFU18xODBfSU5WRVJURUQQBhIYChRERUdSRUVTXzI3MF9JTlZFUlRFRBAHGqoHCgpMb1JhQ29uZmlnEhIKCnVzZV9wcmVzZXQYASABKAgSPwoMbW9kZW1fcHJlc2V0GAIgASgOMikubWVzaHRhc3RpYy5Db25maWcuTG9SYUNvbmZpZy5Nb2RlbVByZXNldBIRCgliYW5kd2lkdGgYAyABKA0SFQoNc3ByZWFkX2ZhY3RvchgEIAEoDRITCgtjb2RpbmdfcmF0ZRgFIAEoDRIYChBmcmVxdWVuY3lfb2Zmc2V0GAYgASgCEjgKBnJlZ2lvbhgHIAEoDjIoLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWcuUmVnaW9uQ29kZRIRCglob3BfbGltaXQYCCABKA0SEgoKdHhfZW5hYmxlZBgJIAEoCBIQCgh0eF9wb3dlchgKIAEoBRITCgtjaGFubmVsX251bRgLIAEoDRIbChNvdmVycmlkZV9kdXR5X2N5Y2xlGAwgASgIEh4KFnN4MTI2eF9yeF9ib29zdGVkX2dhaW4YDSABKAgSGgoSb3ZlcnJpZGVfZnJlcXVlbmN5GA4gASgCEhcKD3BhX2Zhbl9kaXNhYmxlZBgPIAEoCBIXCg9pZ25vcmVfaW5jb21pbmcYZyADKA0SEwoLaWdub3JlX21xdHQYaCABKAgSGQoRY29uZmlnX29rX3RvX21xdHQYaSABKAgi/gEKClJlZ2lvbkNvZGUSCQoFVU5TRVQQABIGCgJVUxABEgoKBkVVXzQzMxACEgoKBkVVXzg2OBADEgYKAkNOEAQSBgoCSlAQBRIHCgNBTloQBhIGCgJLUhAHEgYKAlRXEAgSBgoCUlUQCRIGCgJJThAKEgoKBk5aXzg2NRALEgYKAlRIEAwSCwoHTE9SQV8yNBANEgoKBlVBXzQzMxAOEgoKBlVBXzg2OBAPEgoKBk1ZXzQzMxAQEgoKBk1ZXzkxORAREgoKBlNHXzkyMxASEgoKBlBIXzQzMxATEgoKBlBIXzg2OBAUEgoKBlBIXzkxNRAVEgsKB0FOWl80MzMQFiKpAQoLTW9kZW1QcmVzZXQSDQoJTE9OR19GQVNUEAASDQoJTE9OR19TTE9XEAESFgoOVkVSWV9MT05HX1NMT1cQAhoCCAESDwoLTUVESVVNX1NMT1cQAxIPCgtNRURJVU1fRkFTVBAEEg4KClNIT1JUX1NMT1cQBRIOCgpTSE9SVF9GQVNUEAYSEQoNTE9OR19NT0RFUkFURRAHEg8KC1NIT1JUX1RVUkJPEAgarQEKD0JsdWV0b290aENvbmZpZxIPCgdlbmFibGVkGAEgASgIEjwKBG1vZGUYAiABKA4yLi5tZXNodGFzdGljLkNvbmZpZy5CbHVldG9vdGhDb25maWcuUGFpcmluZ01vZGUSEQoJZml4ZWRfcGluGAMgASgNIjgKC1BhaXJpbmdNb2RlEg4KClJBTkRPTV9QSU4QABINCglGSVhFRF9QSU4QARIKCgZOT19QSU4QAhq2AQoOU2VjdXJpdHlDb25maWcSEgoKcHVibGljX2tleRgBIAEoDBITCgtwcml2YXRlX2tleRgCIAEoDBIRCglhZG1pbl9rZXkYAyADKAwSEgoKaXNfbWFuYWdlZBgEIAEoCBIWCg5zZXJpYWxfZW5hYmxlZBgFIAEoCBIdChVkZWJ1Z19sb2dfYXBpX2VuYWJsZWQYBiABKAgSHQoVYWRtaW5fY2hhbm5lbF9lbmFibGVkGAggASgIGhIKEFNlc3Npb25rZXlDb25maWdCEQoPcGF5bG9hZF92YXJpYW50QmEKE2NvbS5nZWVrc3ZpbGxlLm1lc2hCDENvbmZpZ1Byb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [If]), Rf = /* @__PURE__ */ H(U, 0), zf = /* @__PURE__ */ H(U, 0, 0), Bf = /* @__PURE__ */ function(e) {
	return e[e.CLIENT = 0] = "CLIENT", e[e.CLIENT_MUTE = 1] = "CLIENT_MUTE", e[e.ROUTER = 2] = "ROUTER", e[e.ROUTER_CLIENT = 3] = "ROUTER_CLIENT", e[e.REPEATER = 4] = "REPEATER", e[e.TRACKER = 5] = "TRACKER", e[e.SENSOR = 6] = "SENSOR", e[e.TAK = 7] = "TAK", e[e.CLIENT_HIDDEN = 8] = "CLIENT_HIDDEN", e[e.LOST_AND_FOUND = 9] = "LOST_AND_FOUND", e[e.TAK_TRACKER = 10] = "TAK_TRACKER", e[e.ROUTER_LATE = 11] = "ROUTER_LATE", e;
}({}), Vf = /* @__PURE__ */ B(U, 0, 0, 0), Hf = /* @__PURE__ */ function(e) {
	return e[e.ALL = 0] = "ALL", e[e.ALL_SKIP_DECODING = 1] = "ALL_SKIP_DECODING", e[e.LOCAL_ONLY = 2] = "LOCAL_ONLY", e[e.KNOWN_ONLY = 3] = "KNOWN_ONLY", e[e.NONE = 4] = "NONE", e[e.CORE_PORTNUMS_ONLY = 5] = "CORE_PORTNUMS_ONLY", e;
}({}), Uf = /* @__PURE__ */ B(U, 0, 0, 1), Wf = /* @__PURE__ */ function(e) {
	return e[e.ALL_ENABLED = 0] = "ALL_ENABLED", e[e.DISABLED = 1] = "DISABLED", e[e.NOTIFICATIONS_ONLY = 2] = "NOTIFICATIONS_ONLY", e[e.SYSTEM_ONLY = 3] = "SYSTEM_ONLY", e;
}({}), Gf = /* @__PURE__ */ B(U, 0, 0, 2), Kf = /* @__PURE__ */ H(U, 0, 1), qf = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.ALTITUDE = 1] = "ALTITUDE", e[e.ALTITUDE_MSL = 2] = "ALTITUDE_MSL", e[e.GEOIDAL_SEPARATION = 4] = "GEOIDAL_SEPARATION", e[e.DOP = 8] = "DOP", e[e.HVDOP = 16] = "HVDOP", e[e.SATINVIEW = 32] = "SATINVIEW", e[e.SEQ_NO = 64] = "SEQ_NO", e[e.TIMESTAMP = 128] = "TIMESTAMP", e[e.HEADING = 256] = "HEADING", e[e.SPEED = 512] = "SPEED", e;
}({}), Jf = /* @__PURE__ */ B(U, 0, 1, 0), Yf = /* @__PURE__ */ function(e) {
	return e[e.DISABLED = 0] = "DISABLED", e[e.ENABLED = 1] = "ENABLED", e[e.NOT_PRESENT = 2] = "NOT_PRESENT", e;
}({}), Xf = /* @__PURE__ */ B(U, 0, 1, 1), Zf = /* @__PURE__ */ H(U, 0, 2), Qf = /* @__PURE__ */ H(U, 0, 3), $f = /* @__PURE__ */ H(U, 0, 3, 0), ep = /* @__PURE__ */ function(e) {
	return e[e.DHCP = 0] = "DHCP", e[e.STATIC = 1] = "STATIC", e;
}({}), tp = /* @__PURE__ */ B(U, 0, 3, 0), np = /* @__PURE__ */ function(e) {
	return e[e.NO_BROADCAST = 0] = "NO_BROADCAST", e[e.UDP_BROADCAST = 1] = "UDP_BROADCAST", e;
}({}), rp = /* @__PURE__ */ B(U, 0, 3, 1), ip = /* @__PURE__ */ H(U, 0, 4), ap = /* @__PURE__ */ function(e) {
	return e[e.DEC = 0] = "DEC", e[e.DMS = 1] = "DMS", e[e.UTM = 2] = "UTM", e[e.MGRS = 3] = "MGRS", e[e.OLC = 4] = "OLC", e[e.OSGR = 5] = "OSGR", e;
}({}), op = /* @__PURE__ */ B(U, 0, 4, 0), sp = /* @__PURE__ */ function(e) {
	return e[e.METRIC = 0] = "METRIC", e[e.IMPERIAL = 1] = "IMPERIAL", e;
}({}), cp = /* @__PURE__ */ B(U, 0, 4, 1), lp = /* @__PURE__ */ function(e) {
	return e[e.OLED_AUTO = 0] = "OLED_AUTO", e[e.OLED_SSD1306 = 1] = "OLED_SSD1306", e[e.OLED_SH1106 = 2] = "OLED_SH1106", e[e.OLED_SH1107 = 3] = "OLED_SH1107", e[e.OLED_SH1107_128_64 = 4] = "OLED_SH1107_128_64", e;
}({}), up = /* @__PURE__ */ B(U, 0, 4, 2), dp = /* @__PURE__ */ function(e) {
	return e[e.DEFAULT = 0] = "DEFAULT", e[e.TWOCOLOR = 1] = "TWOCOLOR", e[e.INVERTED = 2] = "INVERTED", e[e.COLOR = 3] = "COLOR", e;
}({}), fp = /* @__PURE__ */ B(U, 0, 4, 3), pp = /* @__PURE__ */ function(e) {
	return e[e.DEGREES_0 = 0] = "DEGREES_0", e[e.DEGREES_90 = 1] = "DEGREES_90", e[e.DEGREES_180 = 2] = "DEGREES_180", e[e.DEGREES_270 = 3] = "DEGREES_270", e[e.DEGREES_0_INVERTED = 4] = "DEGREES_0_INVERTED", e[e.DEGREES_90_INVERTED = 5] = "DEGREES_90_INVERTED", e[e.DEGREES_180_INVERTED = 6] = "DEGREES_180_INVERTED", e[e.DEGREES_270_INVERTED = 7] = "DEGREES_270_INVERTED", e;
}({}), mp = /* @__PURE__ */ B(U, 0, 4, 4), hp = /* @__PURE__ */ H(U, 0, 5), gp = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.US = 1] = "US", e[e.EU_433 = 2] = "EU_433", e[e.EU_868 = 3] = "EU_868", e[e.CN = 4] = "CN", e[e.JP = 5] = "JP", e[e.ANZ = 6] = "ANZ", e[e.KR = 7] = "KR", e[e.TW = 8] = "TW", e[e.RU = 9] = "RU", e[e.IN = 10] = "IN", e[e.NZ_865 = 11] = "NZ_865", e[e.TH = 12] = "TH", e[e.LORA_24 = 13] = "LORA_24", e[e.UA_433 = 14] = "UA_433", e[e.UA_868 = 15] = "UA_868", e[e.MY_433 = 16] = "MY_433", e[e.MY_919 = 17] = "MY_919", e[e.SG_923 = 18] = "SG_923", e[e.PH_433 = 19] = "PH_433", e[e.PH_868 = 20] = "PH_868", e[e.PH_915 = 21] = "PH_915", e[e.ANZ_433 = 22] = "ANZ_433", e;
}({}), _p = /* @__PURE__ */ B(U, 0, 5, 0), vp = /* @__PURE__ */ function(e) {
	return e[e.LONG_FAST = 0] = "LONG_FAST", e[e.LONG_SLOW = 1] = "LONG_SLOW", e[e.VERY_LONG_SLOW = 2] = "VERY_LONG_SLOW", e[e.MEDIUM_SLOW = 3] = "MEDIUM_SLOW", e[e.MEDIUM_FAST = 4] = "MEDIUM_FAST", e[e.SHORT_SLOW = 5] = "SHORT_SLOW", e[e.SHORT_FAST = 6] = "SHORT_FAST", e[e.LONG_MODERATE = 7] = "LONG_MODERATE", e[e.SHORT_TURBO = 8] = "SHORT_TURBO", e;
}({}), yp = /* @__PURE__ */ B(U, 0, 5, 1), bp = /* @__PURE__ */ H(U, 0, 6), xp = /* @__PURE__ */ function(e) {
	return e[e.RANDOM_PIN = 0] = "RANDOM_PIN", e[e.FIXED_PIN = 1] = "FIXED_PIN", e[e.NO_PIN = 2] = "NO_PIN", e;
}({}), Sp = /* @__PURE__ */ B(U, 0, 6, 0), Cp = /* @__PURE__ */ H(U, 0, 7), wp = /* @__PURE__ */ H(U, 0, 8), Tp = P({
	BluetoothConnectionStatusSchema: () => jp,
	DeviceConnectionStatusSchema: () => Dp,
	EthernetConnectionStatusSchema: () => kp,
	NetworkConnectionStatusSchema: () => Ap,
	SerialConnectionStatusSchema: () => Mp,
	WifiConnectionStatusSchema: () => Op,
	file_connection_status: () => Ep
}), Ep = /* @__PURE__ */ V("Chdjb25uZWN0aW9uX3N0YXR1cy5wcm90bxIKbWVzaHRhc3RpYyKxAgoWRGV2aWNlQ29ubmVjdGlvblN0YXR1cxIzCgR3aWZpGAEgASgLMiAubWVzaHRhc3RpYy5XaWZpQ29ubmVjdGlvblN0YXR1c0gAiAEBEjsKCGV0aGVybmV0GAIgASgLMiQubWVzaHRhc3RpYy5FdGhlcm5ldENvbm5lY3Rpb25TdGF0dXNIAYgBARI9CglibHVldG9vdGgYAyABKAsyJS5tZXNodGFzdGljLkJsdWV0b290aENvbm5lY3Rpb25TdGF0dXNIAogBARI3CgZzZXJpYWwYBCABKAsyIi5tZXNodGFzdGljLlNlcmlhbENvbm5lY3Rpb25TdGF0dXNIA4gBAUIHCgVfd2lmaUILCglfZXRoZXJuZXRCDAoKX2JsdWV0b290aEIJCgdfc2VyaWFsImcKFFdpZmlDb25uZWN0aW9uU3RhdHVzEjMKBnN0YXR1cxgBIAEoCzIjLm1lc2h0YXN0aWMuTmV0d29ya0Nvbm5lY3Rpb25TdGF0dXMSDAoEc3NpZBgCIAEoCRIMCgRyc3NpGAMgASgFIk8KGEV0aGVybmV0Q29ubmVjdGlvblN0YXR1cxIzCgZzdGF0dXMYASABKAsyIy5tZXNodGFzdGljLk5ldHdvcmtDb25uZWN0aW9uU3RhdHVzInsKF05ldHdvcmtDb25uZWN0aW9uU3RhdHVzEhIKCmlwX2FkZHJlc3MYASABKAcSFAoMaXNfY29ubmVjdGVkGAIgASgIEhkKEWlzX21xdHRfY29ubmVjdGVkGAMgASgIEhsKE2lzX3N5c2xvZ19jb25uZWN0ZWQYBCABKAgiTAoZQmx1ZXRvb3RoQ29ubmVjdGlvblN0YXR1cxILCgNwaW4YASABKA0SDAoEcnNzaRgCIAEoBRIUCgxpc19jb25uZWN0ZWQYAyABKAgiPAoWU2VyaWFsQ29ubmVjdGlvblN0YXR1cxIMCgRiYXVkGAEgASgNEhQKDGlzX2Nvbm5lY3RlZBgCIAEoCEJlChNjb20uZ2Vla3N2aWxsZS5tZXNoQhBDb25uU3RhdHVzUHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Dp = /* @__PURE__ */ H(Ep, 0), Op = /* @__PURE__ */ H(Ep, 1), kp = /* @__PURE__ */ H(Ep, 2), Ap = /* @__PURE__ */ H(Ep, 3), jp = /* @__PURE__ */ H(Ep, 4), Mp = /* @__PURE__ */ H(Ep, 5), Np = P({
	ModuleConfigSchema: () => Pp,
	ModuleConfig_AmbientLightingConfigSchema: () => im,
	ModuleConfig_AudioConfigSchema: () => Hp,
	ModuleConfig_AudioConfig_Audio_Baud: () => Up,
	ModuleConfig_AudioConfig_Audio_BaudSchema: () => Wp,
	ModuleConfig_CannedMessageConfigSchema: () => tm,
	ModuleConfig_CannedMessageConfig_InputEventChar: () => nm,
	ModuleConfig_CannedMessageConfig_InputEventCharSchema: () => rm,
	ModuleConfig_DetectionSensorConfigSchema: () => zp,
	ModuleConfig_DetectionSensorConfig_TriggerType: () => Bp,
	ModuleConfig_DetectionSensorConfig_TriggerTypeSchema: () => Vp,
	ModuleConfig_ExternalNotificationConfigSchema: () => Zp,
	ModuleConfig_MQTTConfigSchema: () => Fp,
	ModuleConfig_MapReportSettingsSchema: () => Ip,
	ModuleConfig_NeighborInfoConfigSchema: () => Rp,
	ModuleConfig_PaxcounterConfigSchema: () => Gp,
	ModuleConfig_RangeTestConfigSchema: () => $p,
	ModuleConfig_RemoteHardwareConfigSchema: () => Lp,
	ModuleConfig_SerialConfigSchema: () => Kp,
	ModuleConfig_SerialConfig_Serial_Baud: () => qp,
	ModuleConfig_SerialConfig_Serial_BaudSchema: () => Jp,
	ModuleConfig_SerialConfig_Serial_Mode: () => Yp,
	ModuleConfig_SerialConfig_Serial_ModeSchema: () => Xp,
	ModuleConfig_StoreForwardConfigSchema: () => Qp,
	ModuleConfig_TelemetryConfigSchema: () => em,
	RemoteHardwarePinSchema: () => am,
	RemoteHardwarePinType: () => om,
	RemoteHardwarePinTypeSchema: () => sm,
	file_module_config: () => W
}), W = /* @__PURE__ */ V("ChNtb2R1bGVfY29uZmlnLnByb3RvEgptZXNodGFzdGljIuMlCgxNb2R1bGVDb25maWcSMwoEbXF0dBgBIAEoCzIjLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk1RVFRDb25maWdIABI3CgZzZXJpYWwYAiABKAsyJS5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TZXJpYWxDb25maWdIABJUChVleHRlcm5hbF9ub3RpZmljYXRpb24YAyABKAsyMy5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5FeHRlcm5hbE5vdGlmaWNhdGlvbkNvbmZpZ0gAEkQKDXN0b3JlX2ZvcndhcmQYBCABKAsyKy5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TdG9yZUZvcndhcmRDb25maWdIABI+CgpyYW5nZV90ZXN0GAUgASgLMigubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuUmFuZ2VUZXN0Q29uZmlnSAASPQoJdGVsZW1ldHJ5GAYgASgLMigubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuVGVsZW1ldHJ5Q29uZmlnSAASRgoOY2FubmVkX21lc3NhZ2UYByABKAsyLC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5DYW5uZWRNZXNzYWdlQ29uZmlnSAASNQoFYXVkaW8YCCABKAsyJC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5BdWRpb0NvbmZpZ0gAEkgKD3JlbW90ZV9oYXJkd2FyZRgJIAEoCzItLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlJlbW90ZUhhcmR3YXJlQ29uZmlnSAASRAoNbmVpZ2hib3JfaW5mbxgKIAEoCzIrLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk5laWdoYm9ySW5mb0NvbmZpZ0gAEkoKEGFtYmllbnRfbGlnaHRpbmcYCyABKAsyLi5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5BbWJpZW50TGlnaHRpbmdDb25maWdIABJKChBkZXRlY3Rpb25fc2Vuc29yGAwgASgLMi4ubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuRGV0ZWN0aW9uU2Vuc29yQ29uZmlnSAASPwoKcGF4Y291bnRlchgNIAEoCzIpLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlBheGNvdW50ZXJDb25maWdIABqwAgoKTVFUVENvbmZpZxIPCgdlbmFibGVkGAEgASgIEg8KB2FkZHJlc3MYAiABKAkSEAoIdXNlcm5hbWUYAyABKAkSEAoIcGFzc3dvcmQYBCABKAkSGgoSZW5jcnlwdGlvbl9lbmFibGVkGAUgASgIEhQKDGpzb25fZW5hYmxlZBgGIAEoCBITCgt0bHNfZW5hYmxlZBgHIAEoCBIMCgRyb290GAggASgJEh8KF3Byb3h5X3RvX2NsaWVudF9lbmFibGVkGAkgASgIEh0KFW1hcF9yZXBvcnRpbmdfZW5hYmxlZBgKIAEoCBJHChNtYXBfcmVwb3J0X3NldHRpbmdzGAsgASgLMioubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuTWFwUmVwb3J0U2V0dGluZ3MabgoRTWFwUmVwb3J0U2V0dGluZ3MSHQoVcHVibGlzaF9pbnRlcnZhbF9zZWNzGAEgASgNEhoKEnBvc2l0aW9uX3ByZWNpc2lvbhgCIAEoDRIeChZzaG91bGRfcmVwb3J0X2xvY2F0aW9uGAMgASgIGoIBChRSZW1vdGVIYXJkd2FyZUNvbmZpZxIPCgdlbmFibGVkGAEgASgIEiIKGmFsbG93X3VuZGVmaW5lZF9waW5fYWNjZXNzGAIgASgIEjUKDmF2YWlsYWJsZV9waW5zGAMgAygLMh0ubWVzaHRhc3RpYy5SZW1vdGVIYXJkd2FyZVBpbhpaChJOZWlnaGJvckluZm9Db25maWcSDwoHZW5hYmxlZBgBIAEoCBIXCg91cGRhdGVfaW50ZXJ2YWwYAiABKA0SGgoSdHJhbnNtaXRfb3Zlcl9sb3JhGAMgASgIGpcDChVEZXRlY3Rpb25TZW5zb3JDb25maWcSDwoHZW5hYmxlZBgBIAEoCBIeChZtaW5pbXVtX2Jyb2FkY2FzdF9zZWNzGAIgASgNEhwKFHN0YXRlX2Jyb2FkY2FzdF9zZWNzGAMgASgNEhEKCXNlbmRfYmVsbBgEIAEoCBIMCgRuYW1lGAUgASgJEhMKC21vbml0b3JfcGluGAYgASgNEloKFmRldGVjdGlvbl90cmlnZ2VyX3R5cGUYByABKA4yOi5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5EZXRlY3Rpb25TZW5zb3JDb25maWcuVHJpZ2dlclR5cGUSEgoKdXNlX3B1bGx1cBgIIAEoCCKIAQoLVHJpZ2dlclR5cGUSDQoJTE9HSUNfTE9XEAASDgoKTE9HSUNfSElHSBABEhAKDEZBTExJTkdfRURHRRACEg8KC1JJU0lOR19FREdFEAMSGgoWRUlUSEVSX0VER0VfQUNUSVZFX0xPVxAEEhsKF0VJVEhFUl9FREdFX0FDVElWRV9ISUdIEAUa5AIKC0F1ZGlvQ29uZmlnEhYKDmNvZGVjMl9lbmFibGVkGAEgASgIEg8KB3B0dF9waW4YAiABKA0SQAoHYml0cmF0ZRgDIAEoDjIvLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkF1ZGlvQ29uZmlnLkF1ZGlvX0JhdWQSDgoGaTJzX3dzGAQgASgNEg4KBmkyc19zZBgFIAEoDRIPCgdpMnNfZGluGAYgASgNEg8KB2kyc19zY2sYByABKA0ipwEKCkF1ZGlvX0JhdWQSEgoOQ09ERUMyX0RFRkFVTFQQABIPCgtDT0RFQzJfMzIwMBABEg8KC0NPREVDMl8yNDAwEAISDwoLQ09ERUMyXzE2MDAQAxIPCgtDT0RFQzJfMTQwMBAEEg8KC0NPREVDMl8xMzAwEAUSDwoLQ09ERUMyXzEyMDAQBhIOCgpDT0RFQzJfNzAwEAcSDwoLQ09ERUMyXzcwMEIQCBp2ChBQYXhjb3VudGVyQ29uZmlnEg8KB2VuYWJsZWQYASABKAgSIgoacGF4Y291bnRlcl91cGRhdGVfaW50ZXJ2YWwYAiABKA0SFgoOd2lmaV90aHJlc2hvbGQYAyABKAUSFQoNYmxlX3RocmVzaG9sZBgEIAEoBRr9BAoMU2VyaWFsQ29uZmlnEg8KB2VuYWJsZWQYASABKAgSDAoEZWNobxgCIAEoCBILCgNyeGQYAyABKA0SCwoDdHhkGAQgASgNEj8KBGJhdWQYBSABKA4yMS5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TZXJpYWxDb25maWcuU2VyaWFsX0JhdWQSDwoHdGltZW91dBgGIAEoDRI/CgRtb2RlGAcgASgOMjEubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuU2VyaWFsQ29uZmlnLlNlcmlhbF9Nb2RlEiQKHG92ZXJyaWRlX2NvbnNvbGVfc2VyaWFsX3BvcnQYCCABKAgiigIKC1NlcmlhbF9CYXVkEhAKDEJBVURfREVGQVVMVBAAEgwKCEJBVURfMTEwEAESDAoIQkFVRF8zMDAQAhIMCghCQVVEXzYwMBADEg0KCUJBVURfMTIwMBAEEg0KCUJBVURfMjQwMBAFEg0KCUJBVURfNDgwMBAGEg0KCUJBVURfOTYwMBAHEg4KCkJBVURfMTkyMDAQCBIOCgpCQVVEXzM4NDAwEAkSDgoKQkFVRF81NzYwMBAKEg8KC0JBVURfMTE1MjAwEAsSDwoLQkFVRF8yMzA0MDAQDBIPCgtCQVVEXzQ2MDgwMBANEg8KC0JBVURfNTc2MDAwEA4SDwoLQkFVRF85MjE2MDAQDyJuCgtTZXJpYWxfTW9kZRILCgdERUZBVUxUEAASCgoGU0lNUExFEAESCQoFUFJPVE8QAhILCgdURVhUTVNHEAMSCAoETk1FQRAEEgsKB0NBTFRPUE8QBRIICgRXUzg1EAYSDQoJVkVfRElSRUNUEAca6QIKGkV4dGVybmFsTm90aWZpY2F0aW9uQ29uZmlnEg8KB2VuYWJsZWQYASABKAgSEQoJb3V0cHV0X21zGAIgASgNEg4KBm91dHB1dBgDIAEoDRIUCgxvdXRwdXRfdmlicmEYCCABKA0SFQoNb3V0cHV0X2J1enplchgJIAEoDRIOCgZhY3RpdmUYBCABKAgSFQoNYWxlcnRfbWVzc2FnZRgFIAEoCBIbChNhbGVydF9tZXNzYWdlX3ZpYnJhGAogASgIEhwKFGFsZXJ0X21lc3NhZ2VfYnV6emVyGAsgASgIEhIKCmFsZXJ0X2JlbGwYBiABKAgSGAoQYWxlcnRfYmVsbF92aWJyYRgMIAEoCBIZChFhbGVydF9iZWxsX2J1enplchgNIAEoCBIPCgd1c2VfcHdtGAcgASgIEhMKC25hZ190aW1lb3V0GA4gASgNEhkKEXVzZV9pMnNfYXNfYnV6emVyGA8gASgIGpcBChJTdG9yZUZvcndhcmRDb25maWcSDwoHZW5hYmxlZBgBIAEoCBIRCgloZWFydGJlYXQYAiABKAgSDwoHcmVjb3JkcxgDIAEoDRIaChJoaXN0b3J5X3JldHVybl9tYXgYBCABKA0SHQoVaGlzdG9yeV9yZXR1cm5fd2luZG93GAUgASgNEhEKCWlzX3NlcnZlchgGIAEoCBpACg9SYW5nZVRlc3RDb25maWcSDwoHZW5hYmxlZBgBIAEoCBIOCgZzZW5kZXIYAiABKA0SDAoEc2F2ZRgDIAEoCBrJAwoPVGVsZW1ldHJ5Q29uZmlnEh4KFmRldmljZV91cGRhdGVfaW50ZXJ2YWwYASABKA0SIwobZW52aXJvbm1lbnRfdXBkYXRlX2ludGVydmFsGAIgASgNEicKH2Vudmlyb25tZW50X21lYXN1cmVtZW50X2VuYWJsZWQYAyABKAgSIgoaZW52aXJvbm1lbnRfc2NyZWVuX2VuYWJsZWQYBCABKAgSJgoeZW52aXJvbm1lbnRfZGlzcGxheV9mYWhyZW5oZWl0GAUgASgIEhsKE2Fpcl9xdWFsaXR5X2VuYWJsZWQYBiABKAgSHAoUYWlyX3F1YWxpdHlfaW50ZXJ2YWwYByABKA0SIQoZcG93ZXJfbWVhc3VyZW1lbnRfZW5hYmxlZBgIIAEoCBIdChVwb3dlcl91cGRhdGVfaW50ZXJ2YWwYCSABKA0SHAoUcG93ZXJfc2NyZWVuX2VuYWJsZWQYCiABKAgSIgoaaGVhbHRoX21lYXN1cmVtZW50X2VuYWJsZWQYCyABKAgSHgoWaGVhbHRoX3VwZGF0ZV9pbnRlcnZhbBgMIAEoDRIdChVoZWFsdGhfc2NyZWVuX2VuYWJsZWQYDSABKAga1gQKE0Nhbm5lZE1lc3NhZ2VDb25maWcSFwoPcm90YXJ5MV9lbmFibGVkGAEgASgIEhkKEWlucHV0YnJva2VyX3Bpbl9hGAIgASgNEhkKEWlucHV0YnJva2VyX3Bpbl9iGAMgASgNEh0KFWlucHV0YnJva2VyX3Bpbl9wcmVzcxgEIAEoDRJZChRpbnB1dGJyb2tlcl9ldmVudF9jdxgFIAEoDjI7Lm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkNhbm5lZE1lc3NhZ2VDb25maWcuSW5wdXRFdmVudENoYXISWgoVaW5wdXRicm9rZXJfZXZlbnRfY2N3GAYgASgOMjsubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuQ2FubmVkTWVzc2FnZUNvbmZpZy5JbnB1dEV2ZW50Q2hhchJcChdpbnB1dGJyb2tlcl9ldmVudF9wcmVzcxgHIAEoDjI7Lm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkNhbm5lZE1lc3NhZ2VDb25maWcuSW5wdXRFdmVudENoYXISFwoPdXBkb3duMV9lbmFibGVkGAggASgIEg8KB2VuYWJsZWQYCSABKAgSGgoSYWxsb3dfaW5wdXRfc291cmNlGAogASgJEhEKCXNlbmRfYmVsbBgLIAEoCCJjCg5JbnB1dEV2ZW50Q2hhchIICgROT05FEAASBgoCVVAQERIICgRET1dOEBISCAoETEVGVBATEgkKBVJJR0hUEBQSCgoGU0VMRUNUEAoSCAoEQkFDSxAbEgoKBkNBTkNFTBAYGmUKFUFtYmllbnRMaWdodGluZ0NvbmZpZxIRCglsZWRfc3RhdGUYASABKAgSDwoHY3VycmVudBgCIAEoDRILCgNyZWQYAyABKA0SDQoFZ3JlZW4YBCABKA0SDAoEYmx1ZRgFIAEoDUIRCg9wYXlsb2FkX3ZhcmlhbnQiZAoRUmVtb3RlSGFyZHdhcmVQaW4SEAoIZ3Bpb19waW4YASABKA0SDAoEbmFtZRgCIAEoCRIvCgR0eXBlGAMgASgOMiEubWVzaHRhc3RpYy5SZW1vdGVIYXJkd2FyZVBpblR5cGUqSQoVUmVtb3RlSGFyZHdhcmVQaW5UeXBlEgsKB1VOS05PV04QABIQCgxESUdJVEFMX1JFQUQQARIRCg1ESUdJVEFMX1dSSVRFEAJCZwoTY29tLmdlZWtzdmlsbGUubWVzaEISTW9kdWxlQ29uZmlnUHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Pp = /* @__PURE__ */ H(W, 0), Fp = /* @__PURE__ */ H(W, 0, 0), Ip = /* @__PURE__ */ H(W, 0, 1), Lp = /* @__PURE__ */ H(W, 0, 2), Rp = /* @__PURE__ */ H(W, 0, 3), zp = /* @__PURE__ */ H(W, 0, 4), Bp = /* @__PURE__ */ function(e) {
	return e[e.LOGIC_LOW = 0] = "LOGIC_LOW", e[e.LOGIC_HIGH = 1] = "LOGIC_HIGH", e[e.FALLING_EDGE = 2] = "FALLING_EDGE", e[e.RISING_EDGE = 3] = "RISING_EDGE", e[e.EITHER_EDGE_ACTIVE_LOW = 4] = "EITHER_EDGE_ACTIVE_LOW", e[e.EITHER_EDGE_ACTIVE_HIGH = 5] = "EITHER_EDGE_ACTIVE_HIGH", e;
}({}), Vp = /* @__PURE__ */ B(W, 0, 4, 0), Hp = /* @__PURE__ */ H(W, 0, 5), Up = /* @__PURE__ */ function(e) {
	return e[e.CODEC2_DEFAULT = 0] = "CODEC2_DEFAULT", e[e.CODEC2_3200 = 1] = "CODEC2_3200", e[e.CODEC2_2400 = 2] = "CODEC2_2400", e[e.CODEC2_1600 = 3] = "CODEC2_1600", e[e.CODEC2_1400 = 4] = "CODEC2_1400", e[e.CODEC2_1300 = 5] = "CODEC2_1300", e[e.CODEC2_1200 = 6] = "CODEC2_1200", e[e.CODEC2_700 = 7] = "CODEC2_700", e[e.CODEC2_700B = 8] = "CODEC2_700B", e;
}({}), Wp = /* @__PURE__ */ B(W, 0, 5, 0), Gp = /* @__PURE__ */ H(W, 0, 6), Kp = /* @__PURE__ */ H(W, 0, 7), qp = /* @__PURE__ */ function(e) {
	return e[e.BAUD_DEFAULT = 0] = "BAUD_DEFAULT", e[e.BAUD_110 = 1] = "BAUD_110", e[e.BAUD_300 = 2] = "BAUD_300", e[e.BAUD_600 = 3] = "BAUD_600", e[e.BAUD_1200 = 4] = "BAUD_1200", e[e.BAUD_2400 = 5] = "BAUD_2400", e[e.BAUD_4800 = 6] = "BAUD_4800", e[e.BAUD_9600 = 7] = "BAUD_9600", e[e.BAUD_19200 = 8] = "BAUD_19200", e[e.BAUD_38400 = 9] = "BAUD_38400", e[e.BAUD_57600 = 10] = "BAUD_57600", e[e.BAUD_115200 = 11] = "BAUD_115200", e[e.BAUD_230400 = 12] = "BAUD_230400", e[e.BAUD_460800 = 13] = "BAUD_460800", e[e.BAUD_576000 = 14] = "BAUD_576000", e[e.BAUD_921600 = 15] = "BAUD_921600", e;
}({}), Jp = /* @__PURE__ */ B(W, 0, 7, 0), Yp = /* @__PURE__ */ function(e) {
	return e[e.DEFAULT = 0] = "DEFAULT", e[e.SIMPLE = 1] = "SIMPLE", e[e.PROTO = 2] = "PROTO", e[e.TEXTMSG = 3] = "TEXTMSG", e[e.NMEA = 4] = "NMEA", e[e.CALTOPO = 5] = "CALTOPO", e[e.WS85 = 6] = "WS85", e[e.VE_DIRECT = 7] = "VE_DIRECT", e;
}({}), Xp = /* @__PURE__ */ B(W, 0, 7, 1), Zp = /* @__PURE__ */ H(W, 0, 8), Qp = /* @__PURE__ */ H(W, 0, 9), $p = /* @__PURE__ */ H(W, 0, 10), em = /* @__PURE__ */ H(W, 0, 11), tm = /* @__PURE__ */ H(W, 0, 12), nm = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.UP = 17] = "UP", e[e.DOWN = 18] = "DOWN", e[e.LEFT = 19] = "LEFT", e[e.RIGHT = 20] = "RIGHT", e[e.SELECT = 10] = "SELECT", e[e.BACK = 27] = "BACK", e[e.CANCEL = 24] = "CANCEL", e;
}({}), rm = /* @__PURE__ */ B(W, 0, 12, 0), im = /* @__PURE__ */ H(W, 0, 13), am = /* @__PURE__ */ H(W, 1), om = /* @__PURE__ */ function(e) {
	return e[e.UNKNOWN = 0] = "UNKNOWN", e[e.DIGITAL_READ = 1] = "DIGITAL_READ", e[e.DIGITAL_WRITE = 2] = "DIGITAL_WRITE", e;
}({}), sm = /* @__PURE__ */ B(W, 0), G = P({
	PortNum: () => lm,
	PortNumSchema: () => um,
	file_portnums: () => cm
}), cm = /* @__PURE__ */ V("Cg5wb3J0bnVtcy5wcm90bxIKbWVzaHRhc3RpYyrlBAoHUG9ydE51bRIPCgtVTktOT1dOX0FQUBAAEhQKEFRFWFRfTUVTU0FHRV9BUFAQARIXChNSRU1PVEVfSEFSRFdBUkVfQVBQEAISEAoMUE9TSVRJT05fQVBQEAMSEAoMTk9ERUlORk9fQVBQEAQSDwoLUk9VVElOR19BUFAQBRINCglBRE1JTl9BUFAQBhIfChtURVhUX01FU1NBR0VfQ09NUFJFU1NFRF9BUFAQBxIQCgxXQVlQT0lOVF9BUFAQCBINCglBVURJT19BUFAQCRIYChRERVRFQ1RJT05fU0VOU09SX0FQUBAKEg0KCUFMRVJUX0FQUBALEhgKFEtFWV9WRVJJRklDQVRJT05fQVBQEAwSDQoJUkVQTFlfQVBQECASEQoNSVBfVFVOTkVMX0FQUBAhEhIKDlBBWENPVU5URVJfQVBQECISDgoKU0VSSUFMX0FQUBBAEhUKEVNUT1JFX0ZPUldBUkRfQVBQEEESEgoOUkFOR0VfVEVTVF9BUFAQQhIRCg1URUxFTUVUUllfQVBQEEMSCwoHWlBTX0FQUBBEEhEKDVNJTVVMQVRPUl9BUFAQRRISCg5UUkFDRVJPVVRFX0FQUBBGEhQKEE5FSUdIQk9SSU5GT19BUFAQRxIPCgtBVEFLX1BMVUdJThBIEhIKDk1BUF9SRVBPUlRfQVBQEEkSEwoPUE9XRVJTVFJFU1NfQVBQEEoSGAoUUkVUSUNVTFVNX1RVTk5FTF9BUFAQTBIQCgtQUklWQVRFX0FQUBCAAhITCg5BVEFLX0ZPUldBUkRFUhCBAhIICgNNQVgQ/wNCXQoTY29tLmdlZWtzdmlsbGUubWVzaEIIUG9ydG51bXNaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), lm = /* @__PURE__ */ function(e) {
	return e[e.UNKNOWN_APP = 0] = "UNKNOWN_APP", e[e.TEXT_MESSAGE_APP = 1] = "TEXT_MESSAGE_APP", e[e.REMOTE_HARDWARE_APP = 2] = "REMOTE_HARDWARE_APP", e[e.POSITION_APP = 3] = "POSITION_APP", e[e.NODEINFO_APP = 4] = "NODEINFO_APP", e[e.ROUTING_APP = 5] = "ROUTING_APP", e[e.ADMIN_APP = 6] = "ADMIN_APP", e[e.TEXT_MESSAGE_COMPRESSED_APP = 7] = "TEXT_MESSAGE_COMPRESSED_APP", e[e.WAYPOINT_APP = 8] = "WAYPOINT_APP", e[e.AUDIO_APP = 9] = "AUDIO_APP", e[e.DETECTION_SENSOR_APP = 10] = "DETECTION_SENSOR_APP", e[e.ALERT_APP = 11] = "ALERT_APP", e[e.KEY_VERIFICATION_APP = 12] = "KEY_VERIFICATION_APP", e[e.REPLY_APP = 32] = "REPLY_APP", e[e.IP_TUNNEL_APP = 33] = "IP_TUNNEL_APP", e[e.PAXCOUNTER_APP = 34] = "PAXCOUNTER_APP", e[e.SERIAL_APP = 64] = "SERIAL_APP", e[e.STORE_FORWARD_APP = 65] = "STORE_FORWARD_APP", e[e.RANGE_TEST_APP = 66] = "RANGE_TEST_APP", e[e.TELEMETRY_APP = 67] = "TELEMETRY_APP", e[e.ZPS_APP = 68] = "ZPS_APP", e[e.SIMULATOR_APP = 69] = "SIMULATOR_APP", e[e.TRACEROUTE_APP = 70] = "TRACEROUTE_APP", e[e.NEIGHBORINFO_APP = 71] = "NEIGHBORINFO_APP", e[e.ATAK_PLUGIN = 72] = "ATAK_PLUGIN", e[e.MAP_REPORT_APP = 73] = "MAP_REPORT_APP", e[e.POWERSTRESS_APP = 74] = "POWERSTRESS_APP", e[e.RETICULUM_TUNNEL_APP = 76] = "RETICULUM_TUNNEL_APP", e[e.PRIVATE_APP = 256] = "PRIVATE_APP", e[e.ATAK_FORWARDER = 257] = "ATAK_FORWARDER", e[e.MAX = 511] = "MAX", e;
}({}), um = /* @__PURE__ */ B(cm, 0), dm = P({
	AirQualityMetricsSchema: () => gm,
	DeviceMetricsSchema: () => pm,
	EnvironmentMetricsSchema: () => mm,
	HealthMetricsSchema: () => vm,
	HostMetricsSchema: () => ym,
	LocalStatsSchema: () => _m,
	Nau7802ConfigSchema: () => xm,
	PowerMetricsSchema: () => hm,
	TelemetrySchema: () => bm,
	TelemetrySensorType: () => Sm,
	TelemetrySensorTypeSchema: () => Cm,
	file_telemetry: () => fm
}), fm = /* @__PURE__ */ V("Cg90ZWxlbWV0cnkucHJvdG8SCm1lc2h0YXN0aWMi8wEKDURldmljZU1ldHJpY3MSGgoNYmF0dGVyeV9sZXZlbBgBIAEoDUgAiAEBEhQKB3ZvbHRhZ2UYAiABKAJIAYgBARIgChNjaGFubmVsX3V0aWxpemF0aW9uGAMgASgCSAKIAQESGAoLYWlyX3V0aWxfdHgYBCABKAJIA4gBARIbCg51cHRpbWVfc2Vjb25kcxgFIAEoDUgEiAEBQhAKDl9iYXR0ZXJ5X2xldmVsQgoKCF92b2x0YWdlQhYKFF9jaGFubmVsX3V0aWxpemF0aW9uQg4KDF9haXJfdXRpbF90eEIRCg9fdXB0aW1lX3NlY29uZHMiggcKEkVudmlyb25tZW50TWV0cmljcxIYCgt0ZW1wZXJhdHVyZRgBIAEoAkgAiAEBEh4KEXJlbGF0aXZlX2h1bWlkaXR5GAIgASgCSAGIAQESIAoTYmFyb21ldHJpY19wcmVzc3VyZRgDIAEoAkgCiAEBEhsKDmdhc19yZXNpc3RhbmNlGAQgASgCSAOIAQESFAoHdm9sdGFnZRgFIAEoAkgEiAEBEhQKB2N1cnJlbnQYBiABKAJIBYgBARIQCgNpYXEYByABKA1IBogBARIVCghkaXN0YW5jZRgIIAEoAkgHiAEBEhAKA2x1eBgJIAEoAkgIiAEBEhYKCXdoaXRlX2x1eBgKIAEoAkgJiAEBEhMKBmlyX2x1eBgLIAEoAkgKiAEBEhMKBnV2X2x1eBgMIAEoAkgLiAEBEhsKDndpbmRfZGlyZWN0aW9uGA0gASgNSAyIAQESFwoKd2luZF9zcGVlZBgOIAEoAkgNiAEBEhMKBndlaWdodBgPIAEoAkgOiAEBEhYKCXdpbmRfZ3VzdBgQIAEoAkgPiAEBEhYKCXdpbmRfbHVsbBgRIAEoAkgQiAEBEhYKCXJhZGlhdGlvbhgSIAEoAkgRiAEBEhgKC3JhaW5mYWxsXzFoGBMgASgCSBKIAQESGQoMcmFpbmZhbGxfMjRoGBQgASgCSBOIAQESGgoNc29pbF9tb2lzdHVyZRgVIAEoDUgUiAEBEh0KEHNvaWxfdGVtcGVyYXR1cmUYFiABKAJIFYgBAUIOCgxfdGVtcGVyYXR1cmVCFAoSX3JlbGF0aXZlX2h1bWlkaXR5QhYKFF9iYXJvbWV0cmljX3ByZXNzdXJlQhEKD19nYXNfcmVzaXN0YW5jZUIKCghfdm9sdGFnZUIKCghfY3VycmVudEIGCgRfaWFxQgsKCV9kaXN0YW5jZUIGCgRfbHV4QgwKCl93aGl0ZV9sdXhCCQoHX2lyX2x1eEIJCgdfdXZfbHV4QhEKD193aW5kX2RpcmVjdGlvbkINCgtfd2luZF9zcGVlZEIJCgdfd2VpZ2h0QgwKCl93aW5kX2d1c3RCDAoKX3dpbmRfbHVsbEIMCgpfcmFkaWF0aW9uQg4KDF9yYWluZmFsbF8xaEIPCg1fcmFpbmZhbGxfMjRoQhAKDl9zb2lsX21vaXN0dXJlQhMKEV9zb2lsX3RlbXBlcmF0dXJlIooCCgxQb3dlck1ldHJpY3MSGAoLY2gxX3ZvbHRhZ2UYASABKAJIAIgBARIYCgtjaDFfY3VycmVudBgCIAEoAkgBiAEBEhgKC2NoMl92b2x0YWdlGAMgASgCSAKIAQESGAoLY2gyX2N1cnJlbnQYBCABKAJIA4gBARIYCgtjaDNfdm9sdGFnZRgFIAEoAkgEiAEBEhgKC2NoM19jdXJyZW50GAYgASgCSAWIAQFCDgoMX2NoMV92b2x0YWdlQg4KDF9jaDFfY3VycmVudEIOCgxfY2gyX3ZvbHRhZ2VCDgoMX2NoMl9jdXJyZW50Qg4KDF9jaDNfdm9sdGFnZUIOCgxfY2gzX2N1cnJlbnQihQUKEUFpclF1YWxpdHlNZXRyaWNzEhoKDXBtMTBfc3RhbmRhcmQYASABKA1IAIgBARIaCg1wbTI1X3N0YW5kYXJkGAIgASgNSAGIAQESGwoOcG0xMDBfc3RhbmRhcmQYAyABKA1IAogBARIfChJwbTEwX2Vudmlyb25tZW50YWwYBCABKA1IA4gBARIfChJwbTI1X2Vudmlyb25tZW50YWwYBSABKA1IBIgBARIgChNwbTEwMF9lbnZpcm9ubWVudGFsGAYgASgNSAWIAQESGwoOcGFydGljbGVzXzAzdW0YByABKA1IBogBARIbCg5wYXJ0aWNsZXNfMDV1bRgIIAEoDUgHiAEBEhsKDnBhcnRpY2xlc18xMHVtGAkgASgNSAiIAQESGwoOcGFydGljbGVzXzI1dW0YCiABKA1ICYgBARIbCg5wYXJ0aWNsZXNfNTB1bRgLIAEoDUgKiAEBEhwKD3BhcnRpY2xlc18xMDB1bRgMIAEoDUgLiAEBEhAKA2NvMhgNIAEoDUgMiAEBQhAKDl9wbTEwX3N0YW5kYXJkQhAKDl9wbTI1X3N0YW5kYXJkQhEKD19wbTEwMF9zdGFuZGFyZEIVChNfcG0xMF9lbnZpcm9ubWVudGFsQhUKE19wbTI1X2Vudmlyb25tZW50YWxCFgoUX3BtMTAwX2Vudmlyb25tZW50YWxCEQoPX3BhcnRpY2xlc18wM3VtQhEKD19wYXJ0aWNsZXNfMDV1bUIRCg9fcGFydGljbGVzXzEwdW1CEQoPX3BhcnRpY2xlc18yNXVtQhEKD19wYXJ0aWNsZXNfNTB1bUISChBfcGFydGljbGVzXzEwMHVtQgYKBF9jbzIi0gIKCkxvY2FsU3RhdHMSFgoOdXB0aW1lX3NlY29uZHMYASABKA0SGwoTY2hhbm5lbF91dGlsaXphdGlvbhgCIAEoAhITCgthaXJfdXRpbF90eBgDIAEoAhIWCg5udW1fcGFja2V0c190eBgEIAEoDRIWCg5udW1fcGFja2V0c19yeBgFIAEoDRIaChJudW1fcGFja2V0c19yeF9iYWQYBiABKA0SGAoQbnVtX29ubGluZV9ub2RlcxgHIAEoDRIXCg9udW1fdG90YWxfbm9kZXMYCCABKA0SEwoLbnVtX3J4X2R1cGUYCSABKA0SFAoMbnVtX3R4X3JlbGF5GAogASgNEh0KFW51bV90eF9yZWxheV9jYW5jZWxlZBgLIAEoDRIYChBoZWFwX3RvdGFsX2J5dGVzGAwgASgNEhcKD2hlYXBfZnJlZV9ieXRlcxgNIAEoDSJ7Cg1IZWFsdGhNZXRyaWNzEhYKCWhlYXJ0X2JwbRgBIAEoDUgAiAEBEhEKBHNwTzIYAiABKA1IAYgBARIYCgt0ZW1wZXJhdHVyZRgDIAEoAkgCiAEBQgwKCl9oZWFydF9icG1CBwoFX3NwTzJCDgoMX3RlbXBlcmF0dXJlIpECCgtIb3N0TWV0cmljcxIWCg51cHRpbWVfc2Vjb25kcxgBIAEoDRIVCg1mcmVlbWVtX2J5dGVzGAIgASgEEhcKD2Rpc2tmcmVlMV9ieXRlcxgDIAEoBBIcCg9kaXNrZnJlZTJfYnl0ZXMYBCABKARIAIgBARIcCg9kaXNrZnJlZTNfYnl0ZXMYBSABKARIAYgBARINCgVsb2FkMRgGIAEoDRINCgVsb2FkNRgHIAEoDRIOCgZsb2FkMTUYCCABKA0SGAoLdXNlcl9zdHJpbmcYCSABKAlIAogBAUISChBfZGlza2ZyZWUyX2J5dGVzQhIKEF9kaXNrZnJlZTNfYnl0ZXNCDgoMX3VzZXJfc3RyaW5nIp4DCglUZWxlbWV0cnkSDAoEdGltZRgBIAEoBxIzCg5kZXZpY2VfbWV0cmljcxgCIAEoCzIZLm1lc2h0YXN0aWMuRGV2aWNlTWV0cmljc0gAEj0KE2Vudmlyb25tZW50X21ldHJpY3MYAyABKAsyHi5tZXNodGFzdGljLkVudmlyb25tZW50TWV0cmljc0gAEjwKE2Fpcl9xdWFsaXR5X21ldHJpY3MYBCABKAsyHS5tZXNodGFzdGljLkFpclF1YWxpdHlNZXRyaWNzSAASMQoNcG93ZXJfbWV0cmljcxgFIAEoCzIYLm1lc2h0YXN0aWMuUG93ZXJNZXRyaWNzSAASLQoLbG9jYWxfc3RhdHMYBiABKAsyFi5tZXNodGFzdGljLkxvY2FsU3RhdHNIABIzCg5oZWFsdGhfbWV0cmljcxgHIAEoCzIZLm1lc2h0YXN0aWMuSGVhbHRoTWV0cmljc0gAEi8KDGhvc3RfbWV0cmljcxgIIAEoCzIXLm1lc2h0YXN0aWMuSG9zdE1ldHJpY3NIAEIJCgd2YXJpYW50Ij4KDU5hdTc4MDJDb25maWcSEgoKemVyb09mZnNldBgBIAEoBRIZChFjYWxpYnJhdGlvbkZhY3RvchgCIAEoAiqsBAoTVGVsZW1ldHJ5U2Vuc29yVHlwZRIQCgxTRU5TT1JfVU5TRVQQABIKCgZCTUUyODAQARIKCgZCTUU2ODAQAhILCgdNQ1A5ODA4EAMSCgoGSU5BMjYwEAQSCgoGSU5BMjE5EAUSCgoGQk1QMjgwEAYSCQoFU0hUQzMQBxIJCgVMUFMyMhAIEgsKB1FNQzYzMTAQCRILCgdRTUk4NjU4EAoSDAoIUU1DNTg4M0wQCxIJCgVTSFQzMRAMEgwKCFBNU0EwMDNJEA0SCwoHSU5BMzIyMRAOEgoKBkJNUDA4NRAPEgwKCFJDV0w5NjIwEBASCQoFU0hUNFgQERIMCghWRU1MNzcwMBASEgwKCE1MWDkwNjMyEBMSCwoHT1BUMzAwMRAUEgwKCExUUjM5MFVWEBUSDgoKVFNMMjU5MTFGThAWEgkKBUFIVDEwEBcSEAoMREZST0JPVF9MQVJLEBgSCwoHTkFVNzgwMhAZEgoKBkJNUDNYWBAaEgwKCElDTTIwOTQ4EBsSDAoITUFYMTcwNDgQHBIRCg1DVVNUT01fU0VOU09SEB0SDAoITUFYMzAxMDIQHhIMCghNTFg5MDYxNBAfEgkKBVNDRDRYECASCwoHUkFEU0VOUxAhEgoKBklOQTIyNhAiEhAKDERGUk9CT1RfUkFJThAjEgoKBkRQUzMxMBAkEgwKCFJBSzEyMDM1ECUSDAoITUFYMTcyNjEQJhILCgdQQ1QyMDc1ECdCZAoTY29tLmdlZWtzdmlsbGUubWVzaEIPVGVsZW1ldHJ5UHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), pm = /* @__PURE__ */ H(fm, 0), mm = /* @__PURE__ */ H(fm, 1), hm = /* @__PURE__ */ H(fm, 2), gm = /* @__PURE__ */ H(fm, 3), _m = /* @__PURE__ */ H(fm, 4), vm = /* @__PURE__ */ H(fm, 5), ym = /* @__PURE__ */ H(fm, 6), bm = /* @__PURE__ */ H(fm, 7), xm = /* @__PURE__ */ H(fm, 8), Sm = /* @__PURE__ */ function(e) {
	return e[e.SENSOR_UNSET = 0] = "SENSOR_UNSET", e[e.BME280 = 1] = "BME280", e[e.BME680 = 2] = "BME680", e[e.MCP9808 = 3] = "MCP9808", e[e.INA260 = 4] = "INA260", e[e.INA219 = 5] = "INA219", e[e.BMP280 = 6] = "BMP280", e[e.SHTC3 = 7] = "SHTC3", e[e.LPS22 = 8] = "LPS22", e[e.QMC6310 = 9] = "QMC6310", e[e.QMI8658 = 10] = "QMI8658", e[e.QMC5883L = 11] = "QMC5883L", e[e.SHT31 = 12] = "SHT31", e[e.PMSA003I = 13] = "PMSA003I", e[e.INA3221 = 14] = "INA3221", e[e.BMP085 = 15] = "BMP085", e[e.RCWL9620 = 16] = "RCWL9620", e[e.SHT4X = 17] = "SHT4X", e[e.VEML7700 = 18] = "VEML7700", e[e.MLX90632 = 19] = "MLX90632", e[e.OPT3001 = 20] = "OPT3001", e[e.LTR390UV = 21] = "LTR390UV", e[e.TSL25911FN = 22] = "TSL25911FN", e[e.AHT10 = 23] = "AHT10", e[e.DFROBOT_LARK = 24] = "DFROBOT_LARK", e[e.NAU7802 = 25] = "NAU7802", e[e.BMP3XX = 26] = "BMP3XX", e[e.ICM20948 = 27] = "ICM20948", e[e.MAX17048 = 28] = "MAX17048", e[e.CUSTOM_SENSOR = 29] = "CUSTOM_SENSOR", e[e.MAX30102 = 30] = "MAX30102", e[e.MLX90614 = 31] = "MLX90614", e[e.SCD4X = 32] = "SCD4X", e[e.RADSENS = 33] = "RADSENS", e[e.INA226 = 34] = "INA226", e[e.DFROBOT_RAIN = 35] = "DFROBOT_RAIN", e[e.DPS310 = 36] = "DPS310", e[e.RAK12035 = 37] = "RAK12035", e[e.MAX17261 = 38] = "MAX17261", e[e.PCT2075 = 39] = "PCT2075", e;
}({}), Cm = /* @__PURE__ */ B(fm, 0), K = P({
	XModemSchema: () => Tm,
	XModem_Control: () => Em,
	XModem_ControlSchema: () => Dm,
	file_xmodem: () => wm
}), wm = /* @__PURE__ */ V("Cgx4bW9kZW0ucHJvdG8SCm1lc2h0YXN0aWMitgEKBlhNb2RlbRIrCgdjb250cm9sGAEgASgOMhoubWVzaHRhc3RpYy5YTW9kZW0uQ29udHJvbBILCgNzZXEYAiABKA0SDQoFY3JjMTYYAyABKA0SDgoGYnVmZmVyGAQgASgMIlMKB0NvbnRyb2wSBwoDTlVMEAASBwoDU09IEAESBwoDU1RYEAISBwoDRU9UEAQSBwoDQUNLEAYSBwoDTkFLEBUSBwoDQ0FOEBgSCQoFQ1RSTFoQGkJhChNjb20uZ2Vla3N2aWxsZS5tZXNoQgxYbW9kZW1Qcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), Tm = /* @__PURE__ */ H(wm, 0), Em = /* @__PURE__ */ function(e) {
	return e[e.NUL = 0] = "NUL", e[e.SOH = 1] = "SOH", e[e.STX = 2] = "STX", e[e.EOT = 4] = "EOT", e[e.ACK = 6] = "ACK", e[e.NAK = 21] = "NAK", e[e.CAN = 24] = "CAN", e[e.CTRLZ = 26] = "CTRLZ", e;
}({}), Dm = /* @__PURE__ */ B(wm, 0, 0), q = P({
	ChunkedPayloadResponseSchema: () => gh,
	ChunkedPayloadSchema: () => mh,
	ClientNotificationSchema: () => eh,
	CompressedSchema: () => ch,
	Constants: () => yh,
	ConstantsSchema: () => bh,
	CriticalErrorCode: () => xh,
	CriticalErrorCodeSchema: () => Sh,
	DataSchema: () => Rm,
	DeviceMetadataSchema: () => dh,
	DuplicatedPublicKeySchema: () => ih,
	ExcludedModules: () => Ch,
	ExcludedModulesSchema: () => wh,
	FileInfoSchema: () => oh,
	FromRadioSchema: () => $m,
	HardwareModel: () => _h,
	HardwareModelSchema: () => vh,
	HeartbeatSchema: () => fh,
	KeyVerificationFinalSchema: () => rh,
	KeyVerificationNumberInformSchema: () => th,
	KeyVerificationNumberRequestSchema: () => nh,
	KeyVerificationSchema: () => zm,
	LogRecordSchema: () => Ym,
	LogRecord_Level: () => Xm,
	LogRecord_LevelSchema: () => Zm,
	LowEntropyKeySchema: () => ah,
	MeshPacketSchema: () => Hm,
	MeshPacket_Delayed: () => Gm,
	MeshPacket_DelayedSchema: () => Km,
	MeshPacket_Priority: () => Um,
	MeshPacket_PrioritySchema: () => Wm,
	MqttClientProxyMessageSchema: () => Vm,
	MyNodeInfoSchema: () => Jm,
	NeighborInfoSchema: () => lh,
	NeighborSchema: () => uh,
	NodeInfoSchema: () => qm,
	NodeRemoteHardwarePinSchema: () => ph,
	PositionSchema: () => Om,
	Position_AltSource: () => jm,
	Position_AltSourceSchema: () => Mm,
	Position_LocSource: () => km,
	Position_LocSourceSchema: () => Am,
	QueueStatusSchema: () => Qm,
	RouteDiscoverySchema: () => Pm,
	RoutingSchema: () => Fm,
	Routing_Error: () => Im,
	Routing_ErrorSchema: () => Lm,
	ToRadioSchema: () => sh,
	UserSchema: () => Nm,
	WaypointSchema: () => Bm,
	file_mesh: () => J,
	resend_chunksSchema: () => hh
}), J = /* @__PURE__ */ V("CgptZXNoLnByb3RvEgptZXNodGFzdGljIocHCghQb3NpdGlvbhIXCgpsYXRpdHVkZV9pGAEgASgPSACIAQESGAoLbG9uZ2l0dWRlX2kYAiABKA9IAYgBARIVCghhbHRpdHVkZRgDIAEoBUgCiAEBEgwKBHRpbWUYBCABKAcSNwoPbG9jYXRpb25fc291cmNlGAUgASgOMh4ubWVzaHRhc3RpYy5Qb3NpdGlvbi5Mb2NTb3VyY2USNwoPYWx0aXR1ZGVfc291cmNlGAYgASgOMh4ubWVzaHRhc3RpYy5Qb3NpdGlvbi5BbHRTb3VyY2USEQoJdGltZXN0YW1wGAcgASgHEh8KF3RpbWVzdGFtcF9taWxsaXNfYWRqdXN0GAggASgFEhkKDGFsdGl0dWRlX2hhZRgJIAEoEUgDiAEBEigKG2FsdGl0dWRlX2dlb2lkYWxfc2VwYXJhdGlvbhgKIAEoEUgEiAEBEgwKBFBET1AYCyABKA0SDAoESERPUBgMIAEoDRIMCgRWRE9QGA0gASgNEhQKDGdwc19hY2N1cmFjeRgOIAEoDRIZCgxncm91bmRfc3BlZWQYDyABKA1IBYgBARIZCgxncm91bmRfdHJhY2sYECABKA1IBogBARITCgtmaXhfcXVhbGl0eRgRIAEoDRIQCghmaXhfdHlwZRgSIAEoDRIUCgxzYXRzX2luX3ZpZXcYEyABKA0SEQoJc2Vuc29yX2lkGBQgASgNEhMKC25leHRfdXBkYXRlGBUgASgNEhIKCnNlcV9udW1iZXIYFiABKA0SFgoOcHJlY2lzaW9uX2JpdHMYFyABKA0iTgoJTG9jU291cmNlEg0KCUxPQ19VTlNFVBAAEg4KCkxPQ19NQU5VQUwQARIQCgxMT0NfSU5URVJOQUwQAhIQCgxMT0NfRVhURVJOQUwQAyJiCglBbHRTb3VyY2USDQoJQUxUX1VOU0VUEAASDgoKQUxUX01BTlVBTBABEhAKDEFMVF9JTlRFUk5BTBACEhAKDEFMVF9FWFRFUk5BTBADEhIKDkFMVF9CQVJPTUVUUklDEARCDQoLX2xhdGl0dWRlX2lCDgoMX2xvbmdpdHVkZV9pQgsKCV9hbHRpdHVkZUIPCg1fYWx0aXR1ZGVfaGFlQh4KHF9hbHRpdHVkZV9nZW9pZGFsX3NlcGFyYXRpb25CDwoNX2dyb3VuZF9zcGVlZEIPCg1fZ3JvdW5kX3RyYWNrIooCCgRVc2VyEgoKAmlkGAEgASgJEhEKCWxvbmdfbmFtZRgCIAEoCRISCgpzaG9ydF9uYW1lGAMgASgJEhMKB21hY2FkZHIYBCABKAxCAhgBEisKCGh3X21vZGVsGAUgASgOMhkubWVzaHRhc3RpYy5IYXJkd2FyZU1vZGVsEhMKC2lzX2xpY2Vuc2VkGAYgASgIEjIKBHJvbGUYByABKA4yJC5tZXNodGFzdGljLkNvbmZpZy5EZXZpY2VDb25maWcuUm9sZRISCgpwdWJsaWNfa2V5GAggASgMEhwKD2lzX3VubWVzc2FnYWJsZRgJIAEoCEgAiAEBQhIKEF9pc191bm1lc3NhZ2FibGUiWgoOUm91dGVEaXNjb3ZlcnkSDQoFcm91dGUYASADKAcSEwoLc25yX3Rvd2FyZHMYAiADKAUSEgoKcm91dGVfYmFjaxgDIAMoBxIQCghzbnJfYmFjaxgEIAMoBSLiAwoHUm91dGluZxIzCg1yb3V0ZV9yZXF1ZXN0GAEgASgLMhoubWVzaHRhc3RpYy5Sb3V0ZURpc2NvdmVyeUgAEjEKC3JvdXRlX3JlcGx5GAIgASgLMhoubWVzaHRhc3RpYy5Sb3V0ZURpc2NvdmVyeUgAEjEKDGVycm9yX3JlYXNvbhgDIAEoDjIZLm1lc2h0YXN0aWMuUm91dGluZy5FcnJvckgAIrACCgVFcnJvchIICgROT05FEAASDAoITk9fUk9VVEUQARILCgdHT1RfTkFLEAISCwoHVElNRU9VVBADEhAKDE5PX0lOVEVSRkFDRRAEEhIKDk1BWF9SRVRSQU5TTUlUEAUSDgoKTk9fQ0hBTk5FTBAGEg0KCVRPT19MQVJHRRAHEg8KC05PX1JFU1BPTlNFEAgSFAoQRFVUWV9DWUNMRV9MSU1JVBAJEg8KC0JBRF9SRVFVRVNUECASEgoOTk9UX0FVVEhPUklaRUQQIRIOCgpQS0lfRkFJTEVEECISFgoSUEtJX1VOS05PV05fUFVCS0VZECMSGQoVQURNSU5fQkFEX1NFU1NJT05fS0VZECQSIQodQURNSU5fUFVCTElDX0tFWV9VTkFVVEhPUklaRUQQJUIJCgd2YXJpYW50IssBCgREYXRhEiQKB3BvcnRudW0YASABKA4yEy5tZXNodGFzdGljLlBvcnROdW0SDwoHcGF5bG9hZBgCIAEoDBIVCg13YW50X3Jlc3BvbnNlGAMgASgIEgwKBGRlc3QYBCABKAcSDgoGc291cmNlGAUgASgHEhIKCnJlcXVlc3RfaWQYBiABKAcSEAoIcmVwbHlfaWQYByABKAcSDQoFZW1vamkYCCABKAcSFQoIYml0ZmllbGQYCSABKA1IAIgBAUILCglfYml0ZmllbGQiPgoPS2V5VmVyaWZpY2F0aW9uEg0KBW5vbmNlGAEgASgEEg0KBWhhc2gxGAIgASgMEg0KBWhhc2gyGAMgASgMIrwBCghXYXlwb2ludBIKCgJpZBgBIAEoDRIXCgpsYXRpdHVkZV9pGAIgASgPSACIAQESGAoLbG9uZ2l0dWRlX2kYAyABKA9IAYgBARIOCgZleHBpcmUYBCABKA0SEQoJbG9ja2VkX3RvGAUgASgNEgwKBG5hbWUYBiABKAkSEwoLZGVzY3JpcHRpb24YByABKAkSDAoEaWNvbhgIIAEoB0INCgtfbGF0aXR1ZGVfaUIOCgxfbG9uZ2l0dWRlX2kibAoWTXF0dENsaWVudFByb3h5TWVzc2FnZRINCgV0b3BpYxgBIAEoCRIOCgRkYXRhGAIgASgMSAASDgoEdGV4dBgDIAEoCUgAEhAKCHJldGFpbmVkGAQgASgIQhEKD3BheWxvYWRfdmFyaWFudCKbBQoKTWVzaFBhY2tldBIMCgRmcm9tGAEgASgHEgoKAnRvGAIgASgHEg8KB2NoYW5uZWwYAyABKA0SIwoHZGVjb2RlZBgEIAEoCzIQLm1lc2h0YXN0aWMuRGF0YUgAEhMKCWVuY3J5cHRlZBgFIAEoDEgAEgoKAmlkGAYgASgHEg8KB3J4X3RpbWUYByABKAcSDgoGcnhfc25yGAggASgCEhEKCWhvcF9saW1pdBgJIAEoDRIQCgh3YW50X2FjaxgKIAEoCBIxCghwcmlvcml0eRgLIAEoDjIfLm1lc2h0YXN0aWMuTWVzaFBhY2tldC5Qcmlvcml0eRIPCgdyeF9yc3NpGAwgASgFEjMKB2RlbGF5ZWQYDSABKA4yHi5tZXNodGFzdGljLk1lc2hQYWNrZXQuRGVsYXllZEICGAESEAoIdmlhX21xdHQYDiABKAgSEQoJaG9wX3N0YXJ0GA8gASgNEhIKCnB1YmxpY19rZXkYECABKAwSFQoNcGtpX2VuY3J5cHRlZBgRIAEoCBIQCghuZXh0X2hvcBgSIAEoDRISCgpyZWxheV9ub2RlGBMgASgNEhAKCHR4X2FmdGVyGBQgASgNIn4KCFByaW9yaXR5EgkKBVVOU0VUEAASBwoDTUlOEAESDgoKQkFDS0dST1VORBAKEgsKB0RFRkFVTFQQQBIMCghSRUxJQUJMRRBGEgwKCFJFU1BPTlNFEFASCAoESElHSBBkEgkKBUFMRVJUEG4SBwoDQUNLEHgSBwoDTUFYEH8iQgoHRGVsYXllZBIMCghOT19ERUxBWRAAEhUKEURFTEFZRURfQlJPQURDQVNUEAESEgoOREVMQVlFRF9ESVJFQ1QQAkIRCg9wYXlsb2FkX3ZhcmlhbnQixwIKCE5vZGVJbmZvEgsKA251bRgBIAEoDRIeCgR1c2VyGAIgASgLMhAubWVzaHRhc3RpYy5Vc2VyEiYKCHBvc2l0aW9uGAMgASgLMhQubWVzaHRhc3RpYy5Qb3NpdGlvbhILCgNzbnIYBCABKAISEgoKbGFzdF9oZWFyZBgFIAEoBxIxCg5kZXZpY2VfbWV0cmljcxgGIAEoCzIZLm1lc2h0YXN0aWMuRGV2aWNlTWV0cmljcxIPCgdjaGFubmVsGAcgASgNEhAKCHZpYV9tcXR0GAggASgIEhYKCWhvcHNfYXdheRgJIAEoDUgAiAEBEhMKC2lzX2Zhdm9yaXRlGAogASgIEhIKCmlzX2lnbm9yZWQYCyABKAgSIAoYaXNfa2V5X21hbnVhbGx5X3ZlcmlmaWVkGAwgASgIQgwKCl9ob3BzX2F3YXkidAoKTXlOb2RlSW5mbxITCgtteV9ub2RlX251bRgBIAEoDRIUCgxyZWJvb3RfY291bnQYCCABKA0SFwoPbWluX2FwcF92ZXJzaW9uGAsgASgNEhEKCWRldmljZV9pZBgMIAEoDBIPCgdwaW9fZW52GA0gASgJIsABCglMb2dSZWNvcmQSDwoHbWVzc2FnZRgBIAEoCRIMCgR0aW1lGAIgASgHEg4KBnNvdXJjZRgDIAEoCRIqCgVsZXZlbBgEIAEoDjIbLm1lc2h0YXN0aWMuTG9nUmVjb3JkLkxldmVsIlgKBUxldmVsEgkKBVVOU0VUEAASDAoIQ1JJVElDQUwQMhIJCgVFUlJPUhAoEgsKB1dBUk5JTkcQHhIICgRJTkZPEBQSCQoFREVCVUcQChIJCgVUUkFDRRAFIlAKC1F1ZXVlU3RhdHVzEgsKA3JlcxgBIAEoBRIMCgRmcmVlGAIgASgNEg4KBm1heGxlbhgDIAEoDRIWCg5tZXNoX3BhY2tldF9pZBgEIAEoDSL5BQoJRnJvbVJhZGlvEgoKAmlkGAEgASgNEigKBnBhY2tldBgCIAEoCzIWLm1lc2h0YXN0aWMuTWVzaFBhY2tldEgAEikKB215X2luZm8YAyABKAsyFi5tZXNodGFzdGljLk15Tm9kZUluZm9IABIpCglub2RlX2luZm8YBCABKAsyFC5tZXNodGFzdGljLk5vZGVJbmZvSAASJAoGY29uZmlnGAUgASgLMhIubWVzaHRhc3RpYy5Db25maWdIABIrCgpsb2dfcmVjb3JkGAYgASgLMhUubWVzaHRhc3RpYy5Mb2dSZWNvcmRIABIcChJjb25maWdfY29tcGxldGVfaWQYByABKA1IABISCghyZWJvb3RlZBgIIAEoCEgAEjAKDG1vZHVsZUNvbmZpZxgJIAEoCzIYLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnSAASJgoHY2hhbm5lbBgKIAEoCzITLm1lc2h0YXN0aWMuQ2hhbm5lbEgAEi4KC3F1ZXVlU3RhdHVzGAsgASgLMhcubWVzaHRhc3RpYy5RdWV1ZVN0YXR1c0gAEioKDHhtb2RlbVBhY2tldBgMIAEoCzISLm1lc2h0YXN0aWMuWE1vZGVtSAASLgoIbWV0YWRhdGEYDSABKAsyGi5tZXNodGFzdGljLkRldmljZU1ldGFkYXRhSAASRAoWbXF0dENsaWVudFByb3h5TWVzc2FnZRgOIAEoCzIiLm1lc2h0YXN0aWMuTXF0dENsaWVudFByb3h5TWVzc2FnZUgAEigKCGZpbGVJbmZvGA8gASgLMhQubWVzaHRhc3RpYy5GaWxlSW5mb0gAEjwKEmNsaWVudE5vdGlmaWNhdGlvbhgQIAEoCzIeLm1lc2h0YXN0aWMuQ2xpZW50Tm90aWZpY2F0aW9uSAASNAoOZGV2aWNldWlDb25maWcYESABKAsyGi5tZXNodGFzdGljLkRldmljZVVJQ29uZmlnSABCEQoPcGF5bG9hZF92YXJpYW50IvoDChJDbGllbnROb3RpZmljYXRpb24SFQoIcmVwbHlfaWQYASABKA1IAYgBARIMCgR0aW1lGAIgASgHEioKBWxldmVsGAMgASgOMhsubWVzaHRhc3RpYy5Mb2dSZWNvcmQuTGV2ZWwSDwoHbWVzc2FnZRgEIAEoCRJRCh5rZXlfdmVyaWZpY2F0aW9uX251bWJlcl9pbmZvcm0YCyABKAsyJy5tZXNodGFzdGljLktleVZlcmlmaWNhdGlvbk51bWJlckluZm9ybUgAElMKH2tleV92ZXJpZmljYXRpb25fbnVtYmVyX3JlcXVlc3QYDCABKAsyKC5tZXNodGFzdGljLktleVZlcmlmaWNhdGlvbk51bWJlclJlcXVlc3RIABJCChZrZXlfdmVyaWZpY2F0aW9uX2ZpbmFsGA0gASgLMiAubWVzaHRhc3RpYy5LZXlWZXJpZmljYXRpb25GaW5hbEgAEkAKFWR1cGxpY2F0ZWRfcHVibGljX2tleRgOIAEoCzIfLm1lc2h0YXN0aWMuRHVwbGljYXRlZFB1YmxpY0tleUgAEjQKD2xvd19lbnRyb3B5X2tleRgPIAEoCzIZLm1lc2h0YXN0aWMuTG93RW50cm9weUtleUgAQhEKD3BheWxvYWRfdmFyaWFudEILCglfcmVwbHlfaWQiXgobS2V5VmVyaWZpY2F0aW9uTnVtYmVySW5mb3JtEg0KBW5vbmNlGAEgASgEEhcKD3JlbW90ZV9sb25nbmFtZRgCIAEoCRIXCg9zZWN1cml0eV9udW1iZXIYAyABKA0iRgocS2V5VmVyaWZpY2F0aW9uTnVtYmVyUmVxdWVzdBINCgVub25jZRgBIAEoBBIXCg9yZW1vdGVfbG9uZ25hbWUYAiABKAkicQoUS2V5VmVyaWZpY2F0aW9uRmluYWwSDQoFbm9uY2UYASABKAQSFwoPcmVtb3RlX2xvbmduYW1lGAIgASgJEhAKCGlzU2VuZGVyGAMgASgIEh8KF3ZlcmlmaWNhdGlvbl9jaGFyYWN0ZXJzGAQgASgJIhUKE0R1cGxpY2F0ZWRQdWJsaWNLZXkiDwoNTG93RW50cm9weUtleSIxCghGaWxlSW5mbxIRCglmaWxlX25hbWUYASABKAkSEgoKc2l6ZV9ieXRlcxgCIAEoDSKUAgoHVG9SYWRpbxIoCgZwYWNrZXQYASABKAsyFi5tZXNodGFzdGljLk1lc2hQYWNrZXRIABIYCg53YW50X2NvbmZpZ19pZBgDIAEoDUgAEhQKCmRpc2Nvbm5lY3QYBCABKAhIABIqCgx4bW9kZW1QYWNrZXQYBSABKAsyEi5tZXNodGFzdGljLlhNb2RlbUgAEkQKFm1xdHRDbGllbnRQcm94eU1lc3NhZ2UYBiABKAsyIi5tZXNodGFzdGljLk1xdHRDbGllbnRQcm94eU1lc3NhZ2VIABIqCgloZWFydGJlYXQYByABKAsyFS5tZXNodGFzdGljLkhlYXJ0YmVhdEgAQhEKD3BheWxvYWRfdmFyaWFudCJACgpDb21wcmVzc2VkEiQKB3BvcnRudW0YASABKA4yEy5tZXNodGFzdGljLlBvcnROdW0SDAoEZGF0YRgCIAEoDCKHAQoMTmVpZ2hib3JJbmZvEg8KB25vZGVfaWQYASABKA0SFwoPbGFzdF9zZW50X2J5X2lkGAIgASgNEiQKHG5vZGVfYnJvYWRjYXN0X2ludGVydmFsX3NlY3MYAyABKA0SJwoJbmVpZ2hib3JzGAQgAygLMhQubWVzaHRhc3RpYy5OZWlnaGJvciJkCghOZWlnaGJvchIPCgdub2RlX2lkGAEgASgNEgsKA3NuchgCIAEoAhIUCgxsYXN0X3J4X3RpbWUYAyABKAcSJAocbm9kZV9icm9hZGNhc3RfaW50ZXJ2YWxfc2VjcxgEIAEoDSLXAgoORGV2aWNlTWV0YWRhdGESGAoQZmlybXdhcmVfdmVyc2lvbhgBIAEoCRIcChRkZXZpY2Vfc3RhdGVfdmVyc2lvbhgCIAEoDRITCgtjYW5TaHV0ZG93bhgDIAEoCBIPCgdoYXNXaWZpGAQgASgIEhQKDGhhc0JsdWV0b290aBgFIAEoCBITCgtoYXNFdGhlcm5ldBgGIAEoCBIyCgRyb2xlGAcgASgOMiQubWVzaHRhc3RpYy5Db25maWcuRGV2aWNlQ29uZmlnLlJvbGUSFgoOcG9zaXRpb25fZmxhZ3MYCCABKA0SKwoIaHdfbW9kZWwYCSABKA4yGS5tZXNodGFzdGljLkhhcmR3YXJlTW9kZWwSGQoRaGFzUmVtb3RlSGFyZHdhcmUYCiABKAgSDgoGaGFzUEtDGAsgASgIEhgKEGV4Y2x1ZGVkX21vZHVsZXMYDCABKA0iCwoJSGVhcnRiZWF0IlUKFU5vZGVSZW1vdGVIYXJkd2FyZVBpbhIQCghub2RlX251bRgBIAEoDRIqCgNwaW4YAiABKAsyHS5tZXNodGFzdGljLlJlbW90ZUhhcmR3YXJlUGluImUKDkNodW5rZWRQYXlsb2FkEhIKCnBheWxvYWRfaWQYASABKA0SEwoLY2h1bmtfY291bnQYAiABKA0SEwoLY2h1bmtfaW5kZXgYAyABKA0SFQoNcGF5bG9hZF9jaHVuaxgEIAEoDCIfCg1yZXNlbmRfY2h1bmtzEg4KBmNodW5rcxgBIAMoDSKqAQoWQ2h1bmtlZFBheWxvYWRSZXNwb25zZRISCgpwYXlsb2FkX2lkGAEgASgNEhoKEHJlcXVlc3RfdHJhbnNmZXIYAiABKAhIABIZCg9hY2NlcHRfdHJhbnNmZXIYAyABKAhIABIyCg1yZXNlbmRfY2h1bmtzGAQgASgLMhkubWVzaHRhc3RpYy5yZXNlbmRfY2h1bmtzSABCEQoPcGF5bG9hZF92YXJpYW50KvcPCg1IYXJkd2FyZU1vZGVsEgkKBVVOU0VUEAASDAoIVExPUkFfVjIQARIMCghUTE9SQV9WMRACEhIKDlRMT1JBX1YyXzFfMVA2EAMSCQoFVEJFQU0QBBIPCgtIRUxURUNfVjJfMBAFEg4KClRCRUFNX1YwUDcQBhIKCgZUX0VDSE8QBxIQCgxUTE9SQV9WMV8xUDMQCBILCgdSQUs0NjMxEAkSDwoLSEVMVEVDX1YyXzEQChINCglIRUxURUNfVjEQCxIYChRMSUxZR09fVEJFQU1fUzNfQ09SRRAMEgwKCFJBSzExMjAwEA0SCwoHTkFOT19HMRAOEhIKDlRMT1JBX1YyXzFfMVA4EA8SDwoLVExPUkFfVDNfUzMQEBIUChBOQU5PX0cxX0VYUExPUkVSEBESEQoNTkFOT19HMl9VTFRSQRASEg0KCUxPUkFfVFlQRRATEgsKB1dJUEhPTkUQFBIOCgpXSU9fV00xMTEwEBUSCwoHUkFLMjU2MBAWEhMKD0hFTFRFQ19IUlVfMzYwMRAXEhoKFkhFTFRFQ19XSVJFTEVTU19CUklER0UQGBIOCgpTVEFUSU9OX0cxEBkSDAoIUkFLMTEzMTAQGhIUChBTRU5TRUxPUkFfUlAyMDQwEBsSEAoMU0VOU0VMT1JBX1MzEBwSDQoJQ0FOQVJZT05FEB0SDwoLUlAyMDQwX0xPUkEQHhIOCgpTVEFUSU9OX0cyEB8SEQoNTE9SQV9SRUxBWV9WMRAgEg4KCk5SRjUyODQwREsQIRIHCgNQUFIQIhIPCgtHRU5JRUJMT0NLUxAjEhEKDU5SRjUyX1VOS05PV04QJBINCglQT1JURFVJTk8QJRIPCgtBTkRST0lEX1NJTRAmEgoKBkRJWV9WMRAnEhUKEU5SRjUyODQwX1BDQTEwMDU5ECgSCgoGRFJfREVWECkSCwoHTTVTVEFDSxAqEg0KCUhFTFRFQ19WMxArEhEKDUhFTFRFQ19XU0xfVjMQLBITCg9CRVRBRlBWXzI0MDBfVFgQLRIXChNCRVRBRlBWXzkwMF9OQU5PX1RYEC4SDAoIUlBJX1BJQ08QLxIbChdIRUxURUNfV0lSRUxFU1NfVFJBQ0tFUhAwEhkKFUhFTFRFQ19XSVJFTEVTU19QQVBFUhAxEgoKBlRfREVDSxAyEg4KClRfV0FUQ0hfUzMQMxIRCg1QSUNPTVBVVEVSX1MzEDQSDwoLSEVMVEVDX0hUNjIQNRISCg5FQllURV9FU1AzMl9TMxA2EhEKDUVTUDMyX1MzX1BJQ08QNxINCglDSEFUVEVSXzIQOBIeChpIRUxURUNfV0lSRUxFU1NfUEFQRVJfVjFfMBA5EiAKHEhFTFRFQ19XSVJFTEVTU19UUkFDS0VSX1YxXzAQOhILCgdVTlBIT05FEDsSDAoIVERfTE9SQUMQPBITCg9DREVCWVRFX0VPUkFfUzMQPRIPCgtUV0NfTUVTSF9WNBA+EhYKEk5SRjUyX1BST01JQ1JPX0RJWRA/Eh8KG1JBRElPTUFTVEVSXzkwMF9CQU5ESVRfTkFOTxBAEhwKGEhFTFRFQ19DQVBTVUxFX1NFTlNPUl9WMxBBEh0KGUhFTFRFQ19WSVNJT05fTUFTVEVSX1QxOTAQQhIdChlIRUxURUNfVklTSU9OX01BU1RFUl9FMjEzEEMSHQoZSEVMVEVDX1ZJU0lPTl9NQVNURVJfRTI5MBBEEhkKFUhFTFRFQ19NRVNIX05PREVfVDExNBBFEhYKElNFTlNFQ0FQX0lORElDQVRPUhBGEhMKD1RSQUNLRVJfVDEwMDBfRRBHEgsKB1JBSzMxNzIQSBIKCgZXSU9fRTUQSRIaChZSQURJT01BU1RFUl85MDBfQkFORElUEEoSEwoPTUUyNUxTMDFfNFkxMFREEEsSGAoUUlAyMDQwX0ZFQVRIRVJfUkZNOTUQTBIVChFNNVNUQUNLX0NPUkVCQVNJQxBNEhEKDU01U1RBQ0tfQ09SRTIQThINCglSUElfUElDTzIQTxISCg5NNVNUQUNLX0NPUkVTMxBQEhEKDVNFRUVEX1hJQU9fUzMQURILCgdNUzI0U0YxEFISDAoIVExPUkFfQzYQUxIPCgtXSVNNRVNIX1RBUBBUEg0KCVJPVVRBU1RJQxBVEgwKCE1FU0hfVEFCEFYSDAoITUVTSExJTksQVxISCg5YSUFPX05SRjUyX0tJVBBYEhAKDFRISU5LTk9ERV9NMRBZEhAKDFRISU5LTk9ERV9NMhBaEg8KC1RfRVRIX0VMSVRFEFsSFQoRSEVMVEVDX1NFTlNPUl9IVUIQXBIaChZSRVNFUlZFRF9GUklFRF9DSElDS0VOEF0SFgoSSEVMVEVDX01FU0hfUE9DS0VUEF4SFAoQU0VFRURfU09MQVJfTk9ERRBfEhgKFE5PTUFEU1RBUl9NRVRFT1JfUFJPEGASDQoJQ1JPV1BBTkVMEGESCwoHTElOS18zMhBiEhgKFFNFRUVEX1dJT19UUkFDS0VSX0wxEGMSHQoZU0VFRURfV0lPX1RSQUNLRVJfTDFfRUlOSxBkEhQKEFFXQU5UWl9USU5ZX0FSTVMQZRIOCgpUX0RFQ0tfUFJPEGYSEAoMVF9MT1JBX1BBR0VSEGcSHQoZR0FUNTYyX01FU0hfVFJJQUxfVFJBQ0tFUhBoEg8KClBSSVZBVEVfSFcQ/wEqLAoJQ29uc3RhbnRzEggKBFpFUk8QABIVChBEQVRBX1BBWUxPQURfTEVOEOkBKrQCChFDcml0aWNhbEVycm9yQ29kZRIICgROT05FEAASDwoLVFhfV0FUQ0hET0cQARIUChBTTEVFUF9FTlRFUl9XQUlUEAISDAoITk9fUkFESU8QAxIPCgtVTlNQRUNJRklFRBAEEhUKEVVCTE9YX1VOSVRfRkFJTEVEEAUSDQoJTk9fQVhQMTkyEAYSGQoVSU5WQUxJRF9SQURJT19TRVRUSU5HEAcSEwoPVFJBTlNNSVRfRkFJTEVEEAgSDAoIQlJPV05PVVQQCRISCg5TWDEyNjJfRkFJTFVSRRAKEhEKDVJBRElPX1NQSV9CVUcQCxIgChxGTEFTSF9DT1JSVVBUSU9OX1JFQ09WRVJBQkxFEAwSIgoeRkxBU0hfQ09SUlVQVElPTl9VTlJFQ09WRVJBQkxFEA0qgAMKD0V4Y2x1ZGVkTW9kdWxlcxIRCg1FWENMVURFRF9OT05FEAASDwoLTVFUVF9DT05GSUcQARIRCg1TRVJJQUxfQ09ORklHEAISEwoPRVhUTk9USUZfQ09ORklHEAQSFwoTU1RPUkVGT1JXQVJEX0NPTkZJRxAIEhQKEFJBTkdFVEVTVF9DT05GSUcQEBIUChBURUxFTUVUUllfQ09ORklHECASFAoQQ0FOTkVETVNHX0NPTkZJRxBAEhEKDEFVRElPX0NPTkZJRxCAARIaChVSRU1PVEVIQVJEV0FSRV9DT05GSUcQgAISGAoTTkVJR0hCT1JJTkZPX0NPTkZJRxCABBIbChZBTUJJRU5UTElHSFRJTkdfQ09ORklHEIAIEhsKFkRFVEVDVElPTlNFTlNPUl9DT05GSUcQgBASFgoRUEFYQ09VTlRFUl9DT05GSUcQgCASFQoQQkxVRVRPT1RIX0NPTkZJRxCAQBIUCg5ORVRXT1JLX0NPTkZJRxCAgAFCXwoTY29tLmdlZWtzdmlsbGUubWVzaEIKTWVzaFByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [
	Af,
	U,
	W,
	cm,
	fm,
	wm,
	If
]), Om = /* @__PURE__ */ H(J, 0), km = /* @__PURE__ */ function(e) {
	return e[e.LOC_UNSET = 0] = "LOC_UNSET", e[e.LOC_MANUAL = 1] = "LOC_MANUAL", e[e.LOC_INTERNAL = 2] = "LOC_INTERNAL", e[e.LOC_EXTERNAL = 3] = "LOC_EXTERNAL", e;
}({}), Am = /* @__PURE__ */ B(J, 0, 0), jm = /* @__PURE__ */ function(e) {
	return e[e.ALT_UNSET = 0] = "ALT_UNSET", e[e.ALT_MANUAL = 1] = "ALT_MANUAL", e[e.ALT_INTERNAL = 2] = "ALT_INTERNAL", e[e.ALT_EXTERNAL = 3] = "ALT_EXTERNAL", e[e.ALT_BAROMETRIC = 4] = "ALT_BAROMETRIC", e;
}({}), Mm = /* @__PURE__ */ B(J, 0, 1), Nm = /* @__PURE__ */ H(J, 1), Pm = /* @__PURE__ */ H(J, 2), Fm = /* @__PURE__ */ H(J, 3), Im = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.NO_ROUTE = 1] = "NO_ROUTE", e[e.GOT_NAK = 2] = "GOT_NAK", e[e.TIMEOUT = 3] = "TIMEOUT", e[e.NO_INTERFACE = 4] = "NO_INTERFACE", e[e.MAX_RETRANSMIT = 5] = "MAX_RETRANSMIT", e[e.NO_CHANNEL = 6] = "NO_CHANNEL", e[e.TOO_LARGE = 7] = "TOO_LARGE", e[e.NO_RESPONSE = 8] = "NO_RESPONSE", e[e.DUTY_CYCLE_LIMIT = 9] = "DUTY_CYCLE_LIMIT", e[e.BAD_REQUEST = 32] = "BAD_REQUEST", e[e.NOT_AUTHORIZED = 33] = "NOT_AUTHORIZED", e[e.PKI_FAILED = 34] = "PKI_FAILED", e[e.PKI_UNKNOWN_PUBKEY = 35] = "PKI_UNKNOWN_PUBKEY", e[e.ADMIN_BAD_SESSION_KEY = 36] = "ADMIN_BAD_SESSION_KEY", e[e.ADMIN_PUBLIC_KEY_UNAUTHORIZED = 37] = "ADMIN_PUBLIC_KEY_UNAUTHORIZED", e;
}({}), Lm = /* @__PURE__ */ B(J, 3, 0), Rm = /* @__PURE__ */ H(J, 4), zm = /* @__PURE__ */ H(J, 5), Bm = /* @__PURE__ */ H(J, 6), Vm = /* @__PURE__ */ H(J, 7), Hm = /* @__PURE__ */ H(J, 8), Um = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.MIN = 1] = "MIN", e[e.BACKGROUND = 10] = "BACKGROUND", e[e.DEFAULT = 64] = "DEFAULT", e[e.RELIABLE = 70] = "RELIABLE", e[e.RESPONSE = 80] = "RESPONSE", e[e.HIGH = 100] = "HIGH", e[e.ALERT = 110] = "ALERT", e[e.ACK = 120] = "ACK", e[e.MAX = 127] = "MAX", e;
}({}), Wm = /* @__PURE__ */ B(J, 8, 0), Gm = /* @__PURE__ */ function(e) {
	return e[e.NO_DELAY = 0] = "NO_DELAY", e[e.DELAYED_BROADCAST = 1] = "DELAYED_BROADCAST", e[e.DELAYED_DIRECT = 2] = "DELAYED_DIRECT", e;
}({}), Km = /* @__PURE__ */ B(J, 8, 1), qm = /* @__PURE__ */ H(J, 9), Jm = /* @__PURE__ */ H(J, 10), Ym = /* @__PURE__ */ H(J, 11), Xm = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.CRITICAL = 50] = "CRITICAL", e[e.ERROR = 40] = "ERROR", e[e.WARNING = 30] = "WARNING", e[e.INFO = 20] = "INFO", e[e.DEBUG = 10] = "DEBUG", e[e.TRACE = 5] = "TRACE", e;
}({}), Zm = /* @__PURE__ */ B(J, 11, 0), Qm = /* @__PURE__ */ H(J, 12), $m = /* @__PURE__ */ H(J, 13), eh = /* @__PURE__ */ H(J, 14), th = /* @__PURE__ */ H(J, 15), nh = /* @__PURE__ */ H(J, 16), rh = /* @__PURE__ */ H(J, 17), ih = /* @__PURE__ */ H(J, 18), ah = /* @__PURE__ */ H(J, 19), oh = /* @__PURE__ */ H(J, 20), sh = /* @__PURE__ */ H(J, 21), ch = /* @__PURE__ */ H(J, 22), lh = /* @__PURE__ */ H(J, 23), uh = /* @__PURE__ */ H(J, 24), dh = /* @__PURE__ */ H(J, 25), fh = /* @__PURE__ */ H(J, 26), ph = /* @__PURE__ */ H(J, 27), mh = /* @__PURE__ */ H(J, 28), hh = /* @__PURE__ */ H(J, 29), gh = /* @__PURE__ */ H(J, 30), _h = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.TLORA_V2 = 1] = "TLORA_V2", e[e.TLORA_V1 = 2] = "TLORA_V1", e[e.TLORA_V2_1_1P6 = 3] = "TLORA_V2_1_1P6", e[e.TBEAM = 4] = "TBEAM", e[e.HELTEC_V2_0 = 5] = "HELTEC_V2_0", e[e.TBEAM_V0P7 = 6] = "TBEAM_V0P7", e[e.T_ECHO = 7] = "T_ECHO", e[e.TLORA_V1_1P3 = 8] = "TLORA_V1_1P3", e[e.RAK4631 = 9] = "RAK4631", e[e.HELTEC_V2_1 = 10] = "HELTEC_V2_1", e[e.HELTEC_V1 = 11] = "HELTEC_V1", e[e.LILYGO_TBEAM_S3_CORE = 12] = "LILYGO_TBEAM_S3_CORE", e[e.RAK11200 = 13] = "RAK11200", e[e.NANO_G1 = 14] = "NANO_G1", e[e.TLORA_V2_1_1P8 = 15] = "TLORA_V2_1_1P8", e[e.TLORA_T3_S3 = 16] = "TLORA_T3_S3", e[e.NANO_G1_EXPLORER = 17] = "NANO_G1_EXPLORER", e[e.NANO_G2_ULTRA = 18] = "NANO_G2_ULTRA", e[e.LORA_TYPE = 19] = "LORA_TYPE", e[e.WIPHONE = 20] = "WIPHONE", e[e.WIO_WM1110 = 21] = "WIO_WM1110", e[e.RAK2560 = 22] = "RAK2560", e[e.HELTEC_HRU_3601 = 23] = "HELTEC_HRU_3601", e[e.HELTEC_WIRELESS_BRIDGE = 24] = "HELTEC_WIRELESS_BRIDGE", e[e.STATION_G1 = 25] = "STATION_G1", e[e.RAK11310 = 26] = "RAK11310", e[e.SENSELORA_RP2040 = 27] = "SENSELORA_RP2040", e[e.SENSELORA_S3 = 28] = "SENSELORA_S3", e[e.CANARYONE = 29] = "CANARYONE", e[e.RP2040_LORA = 30] = "RP2040_LORA", e[e.STATION_G2 = 31] = "STATION_G2", e[e.LORA_RELAY_V1 = 32] = "LORA_RELAY_V1", e[e.NRF52840DK = 33] = "NRF52840DK", e[e.PPR = 34] = "PPR", e[e.GENIEBLOCKS = 35] = "GENIEBLOCKS", e[e.NRF52_UNKNOWN = 36] = "NRF52_UNKNOWN", e[e.PORTDUINO = 37] = "PORTDUINO", e[e.ANDROID_SIM = 38] = "ANDROID_SIM", e[e.DIY_V1 = 39] = "DIY_V1", e[e.NRF52840_PCA10059 = 40] = "NRF52840_PCA10059", e[e.DR_DEV = 41] = "DR_DEV", e[e.M5STACK = 42] = "M5STACK", e[e.HELTEC_V3 = 43] = "HELTEC_V3", e[e.HELTEC_WSL_V3 = 44] = "HELTEC_WSL_V3", e[e.BETAFPV_2400_TX = 45] = "BETAFPV_2400_TX", e[e.BETAFPV_900_NANO_TX = 46] = "BETAFPV_900_NANO_TX", e[e.RPI_PICO = 47] = "RPI_PICO", e[e.HELTEC_WIRELESS_TRACKER = 48] = "HELTEC_WIRELESS_TRACKER", e[e.HELTEC_WIRELESS_PAPER = 49] = "HELTEC_WIRELESS_PAPER", e[e.T_DECK = 50] = "T_DECK", e[e.T_WATCH_S3 = 51] = "T_WATCH_S3", e[e.PICOMPUTER_S3 = 52] = "PICOMPUTER_S3", e[e.HELTEC_HT62 = 53] = "HELTEC_HT62", e[e.EBYTE_ESP32_S3 = 54] = "EBYTE_ESP32_S3", e[e.ESP32_S3_PICO = 55] = "ESP32_S3_PICO", e[e.CHATTER_2 = 56] = "CHATTER_2", e[e.HELTEC_WIRELESS_PAPER_V1_0 = 57] = "HELTEC_WIRELESS_PAPER_V1_0", e[e.HELTEC_WIRELESS_TRACKER_V1_0 = 58] = "HELTEC_WIRELESS_TRACKER_V1_0", e[e.UNPHONE = 59] = "UNPHONE", e[e.TD_LORAC = 60] = "TD_LORAC", e[e.CDEBYTE_EORA_S3 = 61] = "CDEBYTE_EORA_S3", e[e.TWC_MESH_V4 = 62] = "TWC_MESH_V4", e[e.NRF52_PROMICRO_DIY = 63] = "NRF52_PROMICRO_DIY", e[e.RADIOMASTER_900_BANDIT_NANO = 64] = "RADIOMASTER_900_BANDIT_NANO", e[e.HELTEC_CAPSULE_SENSOR_V3 = 65] = "HELTEC_CAPSULE_SENSOR_V3", e[e.HELTEC_VISION_MASTER_T190 = 66] = "HELTEC_VISION_MASTER_T190", e[e.HELTEC_VISION_MASTER_E213 = 67] = "HELTEC_VISION_MASTER_E213", e[e.HELTEC_VISION_MASTER_E290 = 68] = "HELTEC_VISION_MASTER_E290", e[e.HELTEC_MESH_NODE_T114 = 69] = "HELTEC_MESH_NODE_T114", e[e.SENSECAP_INDICATOR = 70] = "SENSECAP_INDICATOR", e[e.TRACKER_T1000_E = 71] = "TRACKER_T1000_E", e[e.RAK3172 = 72] = "RAK3172", e[e.WIO_E5 = 73] = "WIO_E5", e[e.RADIOMASTER_900_BANDIT = 74] = "RADIOMASTER_900_BANDIT", e[e.ME25LS01_4Y10TD = 75] = "ME25LS01_4Y10TD", e[e.RP2040_FEATHER_RFM95 = 76] = "RP2040_FEATHER_RFM95", e[e.M5STACK_COREBASIC = 77] = "M5STACK_COREBASIC", e[e.M5STACK_CORE2 = 78] = "M5STACK_CORE2", e[e.RPI_PICO2 = 79] = "RPI_PICO2", e[e.M5STACK_CORES3 = 80] = "M5STACK_CORES3", e[e.SEEED_XIAO_S3 = 81] = "SEEED_XIAO_S3", e[e.MS24SF1 = 82] = "MS24SF1", e[e.TLORA_C6 = 83] = "TLORA_C6", e[e.WISMESH_TAP = 84] = "WISMESH_TAP", e[e.ROUTASTIC = 85] = "ROUTASTIC", e[e.MESH_TAB = 86] = "MESH_TAB", e[e.MESHLINK = 87] = "MESHLINK", e[e.XIAO_NRF52_KIT = 88] = "XIAO_NRF52_KIT", e[e.THINKNODE_M1 = 89] = "THINKNODE_M1", e[e.THINKNODE_M2 = 90] = "THINKNODE_M2", e[e.T_ETH_ELITE = 91] = "T_ETH_ELITE", e[e.HELTEC_SENSOR_HUB = 92] = "HELTEC_SENSOR_HUB", e[e.RESERVED_FRIED_CHICKEN = 93] = "RESERVED_FRIED_CHICKEN", e[e.HELTEC_MESH_POCKET = 94] = "HELTEC_MESH_POCKET", e[e.SEEED_SOLAR_NODE = 95] = "SEEED_SOLAR_NODE", e[e.NOMADSTAR_METEOR_PRO = 96] = "NOMADSTAR_METEOR_PRO", e[e.CROWPANEL = 97] = "CROWPANEL", e[e.LINK_32 = 98] = "LINK_32", e[e.SEEED_WIO_TRACKER_L1 = 99] = "SEEED_WIO_TRACKER_L1", e[e.SEEED_WIO_TRACKER_L1_EINK = 100] = "SEEED_WIO_TRACKER_L1_EINK", e[e.QWANTZ_TINY_ARMS = 101] = "QWANTZ_TINY_ARMS", e[e.T_DECK_PRO = 102] = "T_DECK_PRO", e[e.T_LORA_PAGER = 103] = "T_LORA_PAGER", e[e.GAT562_MESH_TRIAL_TRACKER = 104] = "GAT562_MESH_TRIAL_TRACKER", e[e.PRIVATE_HW = 255] = "PRIVATE_HW", e;
}({}), vh = /* @__PURE__ */ B(J, 0), yh = /* @__PURE__ */ function(e) {
	return e[e.ZERO = 0] = "ZERO", e[e.DATA_PAYLOAD_LEN = 233] = "DATA_PAYLOAD_LEN", e;
}({}), bh = /* @__PURE__ */ B(J, 1), xh = /* @__PURE__ */ function(e) {
	return e[e.NONE = 0] = "NONE", e[e.TX_WATCHDOG = 1] = "TX_WATCHDOG", e[e.SLEEP_ENTER_WAIT = 2] = "SLEEP_ENTER_WAIT", e[e.NO_RADIO = 3] = "NO_RADIO", e[e.UNSPECIFIED = 4] = "UNSPECIFIED", e[e.UBLOX_UNIT_FAILED = 5] = "UBLOX_UNIT_FAILED", e[e.NO_AXP192 = 6] = "NO_AXP192", e[e.INVALID_RADIO_SETTING = 7] = "INVALID_RADIO_SETTING", e[e.TRANSMIT_FAILED = 8] = "TRANSMIT_FAILED", e[e.BROWNOUT = 9] = "BROWNOUT", e[e.SX1262_FAILURE = 10] = "SX1262_FAILURE", e[e.RADIO_SPI_BUG = 11] = "RADIO_SPI_BUG", e[e.FLASH_CORRUPTION_RECOVERABLE = 12] = "FLASH_CORRUPTION_RECOVERABLE", e[e.FLASH_CORRUPTION_UNRECOVERABLE = 13] = "FLASH_CORRUPTION_UNRECOVERABLE", e;
}({}), Sh = /* @__PURE__ */ B(J, 2), Ch = /* @__PURE__ */ function(e) {
	return e[e.EXCLUDED_NONE = 0] = "EXCLUDED_NONE", e[e.MQTT_CONFIG = 1] = "MQTT_CONFIG", e[e.SERIAL_CONFIG = 2] = "SERIAL_CONFIG", e[e.EXTNOTIF_CONFIG = 4] = "EXTNOTIF_CONFIG", e[e.STOREFORWARD_CONFIG = 8] = "STOREFORWARD_CONFIG", e[e.RANGETEST_CONFIG = 16] = "RANGETEST_CONFIG", e[e.TELEMETRY_CONFIG = 32] = "TELEMETRY_CONFIG", e[e.CANNEDMSG_CONFIG = 64] = "CANNEDMSG_CONFIG", e[e.AUDIO_CONFIG = 128] = "AUDIO_CONFIG", e[e.REMOTEHARDWARE_CONFIG = 256] = "REMOTEHARDWARE_CONFIG", e[e.NEIGHBORINFO_CONFIG = 512] = "NEIGHBORINFO_CONFIG", e[e.AMBIENTLIGHTING_CONFIG = 1024] = "AMBIENTLIGHTING_CONFIG", e[e.DETECTIONSENSOR_CONFIG = 2048] = "DETECTIONSENSOR_CONFIG", e[e.PAXCOUNTER_CONFIG = 4096] = "PAXCOUNTER_CONFIG", e[e.BLUETOOTH_CONFIG = 8192] = "BLUETOOTH_CONFIG", e[e.NETWORK_CONFIG = 16384] = "NETWORK_CONFIG", e;
}({}), wh = /* @__PURE__ */ B(J, 3), Y = P({
	AdminMessageSchema: () => Eh,
	AdminMessage_BackupLocation: () => Mh,
	AdminMessage_BackupLocationSchema: () => Nh,
	AdminMessage_ConfigType: () => Oh,
	AdminMessage_ConfigTypeSchema: () => kh,
	AdminMessage_InputEventSchema: () => Dh,
	AdminMessage_ModuleConfigType: () => Ah,
	AdminMessage_ModuleConfigTypeSchema: () => jh,
	HamParametersSchema: () => Ph,
	KeyVerificationAdminSchema: () => Lh,
	KeyVerificationAdmin_MessageType: () => Rh,
	KeyVerificationAdmin_MessageTypeSchema: () => zh,
	NodeRemoteHardwarePinsResponseSchema: () => Fh,
	SharedContactSchema: () => Ih,
	file_admin: () => Th
}), Th = /* @__PURE__ */ V("CgthZG1pbi5wcm90bxIKbWVzaHRhc3RpYyLWGAoMQWRtaW5NZXNzYWdlEhcKD3Nlc3Npb25fcGFzc2tleRhlIAEoDBIdChNnZXRfY2hhbm5lbF9yZXF1ZXN0GAEgASgNSAASMwoUZ2V0X2NoYW5uZWxfcmVzcG9uc2UYAiABKAsyEy5tZXNodGFzdGljLkNoYW5uZWxIABIbChFnZXRfb3duZXJfcmVxdWVzdBgDIAEoCEgAEi4KEmdldF9vd25lcl9yZXNwb25zZRgEIAEoCzIQLm1lc2h0YXN0aWMuVXNlckgAEkEKEmdldF9jb25maWdfcmVxdWVzdBgFIAEoDjIjLm1lc2h0YXN0aWMuQWRtaW5NZXNzYWdlLkNvbmZpZ1R5cGVIABIxChNnZXRfY29uZmlnX3Jlc3BvbnNlGAYgASgLMhIubWVzaHRhc3RpYy5Db25maWdIABJOChlnZXRfbW9kdWxlX2NvbmZpZ19yZXF1ZXN0GAcgASgOMikubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuTW9kdWxlQ29uZmlnVHlwZUgAEj4KGmdldF9tb2R1bGVfY29uZmlnX3Jlc3BvbnNlGAggASgLMhgubWVzaHRhc3RpYy5Nb2R1bGVDb25maWdIABI0CipnZXRfY2FubmVkX21lc3NhZ2VfbW9kdWxlX21lc3NhZ2VzX3JlcXVlc3QYCiABKAhIABI1CitnZXRfY2FubmVkX21lc3NhZ2VfbW9kdWxlX21lc3NhZ2VzX3Jlc3BvbnNlGAsgASgJSAASJQobZ2V0X2RldmljZV9tZXRhZGF0YV9yZXF1ZXN0GAwgASgISAASQgocZ2V0X2RldmljZV9tZXRhZGF0YV9yZXNwb25zZRgNIAEoCzIaLm1lc2h0YXN0aWMuRGV2aWNlTWV0YWRhdGFIABIeChRnZXRfcmluZ3RvbmVfcmVxdWVzdBgOIAEoCEgAEh8KFWdldF9yaW5ndG9uZV9yZXNwb25zZRgPIAEoCUgAEi4KJGdldF9kZXZpY2VfY29ubmVjdGlvbl9zdGF0dXNfcmVxdWVzdBgQIAEoCEgAElMKJWdldF9kZXZpY2VfY29ubmVjdGlvbl9zdGF0dXNfcmVzcG9uc2UYESABKAsyIi5tZXNodGFzdGljLkRldmljZUNvbm5lY3Rpb25TdGF0dXNIABIxCgxzZXRfaGFtX21vZGUYEiABKAsyGS5tZXNodGFzdGljLkhhbVBhcmFtZXRlcnNIABIvCiVnZXRfbm9kZV9yZW1vdGVfaGFyZHdhcmVfcGluc19yZXF1ZXN0GBMgASgISAASXAomZ2V0X25vZGVfcmVtb3RlX2hhcmR3YXJlX3BpbnNfcmVzcG9uc2UYFCABKAsyKi5tZXNodGFzdGljLk5vZGVSZW1vdGVIYXJkd2FyZVBpbnNSZXNwb25zZUgAEiAKFmVudGVyX2RmdV9tb2RlX3JlcXVlc3QYFSABKAhIABIdChNkZWxldGVfZmlsZV9yZXF1ZXN0GBYgASgJSAASEwoJc2V0X3NjYWxlGBcgASgNSAASRQoSYmFja3VwX3ByZWZlcmVuY2VzGBggASgOMicubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuQmFja3VwTG9jYXRpb25IABJGChNyZXN0b3JlX3ByZWZlcmVuY2VzGBkgASgOMicubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuQmFja3VwTG9jYXRpb25IABJMChlyZW1vdmVfYmFja3VwX3ByZWZlcmVuY2VzGBogASgOMicubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuQmFja3VwTG9jYXRpb25IABI/ChBzZW5kX2lucHV0X2V2ZW50GBsgASgLMiMubWVzaHRhc3RpYy5BZG1pbk1lc3NhZ2UuSW5wdXRFdmVudEgAEiUKCXNldF9vd25lchggIAEoCzIQLm1lc2h0YXN0aWMuVXNlckgAEioKC3NldF9jaGFubmVsGCEgASgLMhMubWVzaHRhc3RpYy5DaGFubmVsSAASKAoKc2V0X2NvbmZpZxgiIAEoCzISLm1lc2h0YXN0aWMuQ29uZmlnSAASNQoRc2V0X21vZHVsZV9jb25maWcYIyABKAsyGC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZ0gAEiwKInNldF9jYW5uZWRfbWVzc2FnZV9tb2R1bGVfbWVzc2FnZXMYJCABKAlIABIeChRzZXRfcmluZ3RvbmVfbWVzc2FnZRglIAEoCUgAEhsKEXJlbW92ZV9ieV9ub2RlbnVtGCYgASgNSAASGwoRc2V0X2Zhdm9yaXRlX25vZGUYJyABKA1IABIeChRyZW1vdmVfZmF2b3JpdGVfbm9kZRgoIAEoDUgAEjIKEnNldF9maXhlZF9wb3NpdGlvbhgpIAEoCzIULm1lc2h0YXN0aWMuUG9zaXRpb25IABIfChVyZW1vdmVfZml4ZWRfcG9zaXRpb24YKiABKAhIABIXCg1zZXRfdGltZV9vbmx5GCsgASgHSAASHwoVZ2V0X3VpX2NvbmZpZ19yZXF1ZXN0GCwgASgISAASPAoWZ2V0X3VpX2NvbmZpZ19yZXNwb25zZRgtIAEoCzIaLm1lc2h0YXN0aWMuRGV2aWNlVUlDb25maWdIABI1Cg9zdG9yZV91aV9jb25maWcYLiABKAsyGi5tZXNodGFzdGljLkRldmljZVVJQ29uZmlnSAASGgoQc2V0X2lnbm9yZWRfbm9kZRgvIAEoDUgAEh0KE3JlbW92ZV9pZ25vcmVkX25vZGUYMCABKA1IABIdChNiZWdpbl9lZGl0X3NldHRpbmdzGEAgASgISAASHgoUY29tbWl0X2VkaXRfc2V0dGluZ3MYQSABKAhIABIwCgthZGRfY29udGFjdBhCIAEoCzIZLm1lc2h0YXN0aWMuU2hhcmVkQ29udGFjdEgAEjwKEGtleV92ZXJpZmljYXRpb24YQyABKAsyIC5tZXNodGFzdGljLktleVZlcmlmaWNhdGlvbkFkbWluSAASHgoUZmFjdG9yeV9yZXNldF9kZXZpY2UYXiABKAVIABIcChJyZWJvb3Rfb3RhX3NlY29uZHMYXyABKAVIABIYCg5leGl0X3NpbXVsYXRvchhgIAEoCEgAEhgKDnJlYm9vdF9zZWNvbmRzGGEgASgFSAASGgoQc2h1dGRvd25fc2Vjb25kcxhiIAEoBUgAEh4KFGZhY3RvcnlfcmVzZXRfY29uZmlnGGMgASgFSAASFgoMbm9kZWRiX3Jlc2V0GGQgASgFSAAaUwoKSW5wdXRFdmVudBISCgpldmVudF9jb2RlGAEgASgNEg8KB2tiX2NoYXIYAiABKA0SDwoHdG91Y2hfeBgDIAEoDRIPCgd0b3VjaF95GAQgASgNItYBCgpDb25maWdUeXBlEhEKDURFVklDRV9DT05GSUcQABITCg9QT1NJVElPTl9DT05GSUcQARIQCgxQT1dFUl9DT05GSUcQAhISCg5ORVRXT1JLX0NPTkZJRxADEhIKDkRJU1BMQVlfQ09ORklHEAQSDwoLTE9SQV9DT05GSUcQBRIUChBCTFVFVE9PVEhfQ09ORklHEAYSEwoPU0VDVVJJVFlfQ09ORklHEAcSFQoRU0VTU0lPTktFWV9DT05GSUcQCBITCg9ERVZJQ0VVSV9DT05GSUcQCSK7AgoQTW9kdWxlQ29uZmlnVHlwZRIPCgtNUVRUX0NPTkZJRxAAEhEKDVNFUklBTF9DT05GSUcQARITCg9FWFROT1RJRl9DT05GSUcQAhIXChNTVE9SRUZPUldBUkRfQ09ORklHEAMSFAoQUkFOR0VURVNUX0NPTkZJRxAEEhQKEFRFTEVNRVRSWV9DT05GSUcQBRIUChBDQU5ORURNU0dfQ09ORklHEAYSEAoMQVVESU9fQ09ORklHEAcSGQoVUkVNT1RFSEFSRFdBUkVfQ09ORklHEAgSFwoTTkVJR0hCT1JJTkZPX0NPTkZJRxAJEhoKFkFNQklFTlRMSUdIVElOR19DT05GSUcQChIaChZERVRFQ1RJT05TRU5TT1JfQ09ORklHEAsSFQoRUEFYQ09VTlRFUl9DT05GSUcQDCIjCg5CYWNrdXBMb2NhdGlvbhIJCgVGTEFTSBAAEgYKAlNEEAFCEQoPcGF5bG9hZF92YXJpYW50IlsKDUhhbVBhcmFtZXRlcnMSEQoJY2FsbF9zaWduGAEgASgJEhAKCHR4X3Bvd2VyGAIgASgFEhEKCWZyZXF1ZW5jeRgDIAEoAhISCgpzaG9ydF9uYW1lGAQgASgJImYKHk5vZGVSZW1vdGVIYXJkd2FyZVBpbnNSZXNwb25zZRJEChlub2RlX3JlbW90ZV9oYXJkd2FyZV9waW5zGAEgAygLMiEubWVzaHRhc3RpYy5Ob2RlUmVtb3RlSGFyZHdhcmVQaW4iWAoNU2hhcmVkQ29udGFjdBIQCghub2RlX251bRgBIAEoDRIeCgR1c2VyGAIgASgLMhAubWVzaHRhc3RpYy5Vc2VyEhUKDXNob3VsZF9pZ25vcmUYAyABKAginAIKFEtleVZlcmlmaWNhdGlvbkFkbWluEkIKDG1lc3NhZ2VfdHlwZRgBIAEoDjIsLm1lc2h0YXN0aWMuS2V5VmVyaWZpY2F0aW9uQWRtaW4uTWVzc2FnZVR5cGUSFgoOcmVtb3RlX25vZGVudW0YAiABKA0SDQoFbm9uY2UYAyABKAQSHAoPc2VjdXJpdHlfbnVtYmVyGAQgASgNSACIAQEiZwoLTWVzc2FnZVR5cGUSGQoVSU5JVElBVEVfVkVSSUZJQ0FUSU9OEAASGwoXUFJPVklERV9TRUNVUklUWV9OVU1CRVIQARINCglET19WRVJJRlkQAhIRCg1ET19OT1RfVkVSSUZZEANCEgoQX3NlY3VyaXR5X251bWJlckJgChNjb20uZ2Vla3N2aWxsZS5tZXNoQgtBZG1pblByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [
	Af,
	U,
	Ep,
	J,
	W,
	If
]), Eh = /* @__PURE__ */ H(Th, 0), Dh = /* @__PURE__ */ H(Th, 0, 0), Oh = /* @__PURE__ */ function(e) {
	return e[e.DEVICE_CONFIG = 0] = "DEVICE_CONFIG", e[e.POSITION_CONFIG = 1] = "POSITION_CONFIG", e[e.POWER_CONFIG = 2] = "POWER_CONFIG", e[e.NETWORK_CONFIG = 3] = "NETWORK_CONFIG", e[e.DISPLAY_CONFIG = 4] = "DISPLAY_CONFIG", e[e.LORA_CONFIG = 5] = "LORA_CONFIG", e[e.BLUETOOTH_CONFIG = 6] = "BLUETOOTH_CONFIG", e[e.SECURITY_CONFIG = 7] = "SECURITY_CONFIG", e[e.SESSIONKEY_CONFIG = 8] = "SESSIONKEY_CONFIG", e[e.DEVICEUI_CONFIG = 9] = "DEVICEUI_CONFIG", e;
}({}), kh = /* @__PURE__ */ B(Th, 0, 0), Ah = /* @__PURE__ */ function(e) {
	return e[e.MQTT_CONFIG = 0] = "MQTT_CONFIG", e[e.SERIAL_CONFIG = 1] = "SERIAL_CONFIG", e[e.EXTNOTIF_CONFIG = 2] = "EXTNOTIF_CONFIG", e[e.STOREFORWARD_CONFIG = 3] = "STOREFORWARD_CONFIG", e[e.RANGETEST_CONFIG = 4] = "RANGETEST_CONFIG", e[e.TELEMETRY_CONFIG = 5] = "TELEMETRY_CONFIG", e[e.CANNEDMSG_CONFIG = 6] = "CANNEDMSG_CONFIG", e[e.AUDIO_CONFIG = 7] = "AUDIO_CONFIG", e[e.REMOTEHARDWARE_CONFIG = 8] = "REMOTEHARDWARE_CONFIG", e[e.NEIGHBORINFO_CONFIG = 9] = "NEIGHBORINFO_CONFIG", e[e.AMBIENTLIGHTING_CONFIG = 10] = "AMBIENTLIGHTING_CONFIG", e[e.DETECTIONSENSOR_CONFIG = 11] = "DETECTIONSENSOR_CONFIG", e[e.PAXCOUNTER_CONFIG = 12] = "PAXCOUNTER_CONFIG", e;
}({}), jh = /* @__PURE__ */ B(Th, 0, 1), Mh = /* @__PURE__ */ function(e) {
	return e[e.FLASH = 0] = "FLASH", e[e.SD = 1] = "SD", e;
}({}), Nh = /* @__PURE__ */ B(Th, 0, 2), Ph = /* @__PURE__ */ H(Th, 1), Fh = /* @__PURE__ */ H(Th, 2), Ih = /* @__PURE__ */ H(Th, 3), Lh = /* @__PURE__ */ H(Th, 4), Rh = /* @__PURE__ */ function(e) {
	return e[e.INITIATE_VERIFICATION = 0] = "INITIATE_VERIFICATION", e[e.PROVIDE_SECURITY_NUMBER = 1] = "PROVIDE_SECURITY_NUMBER", e[e.DO_VERIFY = 2] = "DO_VERIFY", e[e.DO_NOT_VERIFY = 3] = "DO_NOT_VERIFY", e;
}({}), zh = /* @__PURE__ */ B(Th, 4, 0), Bh = P({
	ChannelSetSchema: () => Hh,
	file_apponly: () => Vh
}), Vh = /* @__PURE__ */ V("Cg1hcHBvbmx5LnByb3RvEgptZXNodGFzdGljIm8KCkNoYW5uZWxTZXQSLQoIc2V0dGluZ3MYASADKAsyGy5tZXNodGFzdGljLkNoYW5uZWxTZXR0aW5ncxIyCgtsb3JhX2NvbmZpZxgCIAEoCzIdLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWdCYgoTY29tLmdlZWtzdmlsbGUubWVzaEINQXBwT25seVByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [Af, U]), Hh = /* @__PURE__ */ H(Vh, 0), Uh = P({
	ContactSchema: () => Yh,
	GeoChatSchema: () => Kh,
	GroupSchema: () => qh,
	MemberRole: () => $h,
	MemberRoleSchema: () => eg,
	PLISchema: () => Xh,
	StatusSchema: () => Jh,
	TAKPacketSchema: () => Gh,
	Team: () => Zh,
	TeamSchema: () => Qh,
	file_atak: () => Wh
}), Wh = /* @__PURE__ */ V("CgphdGFrLnByb3RvEgptZXNodGFzdGljIvgBCglUQUtQYWNrZXQSFQoNaXNfY29tcHJlc3NlZBgBIAEoCBIkCgdjb250YWN0GAIgASgLMhMubWVzaHRhc3RpYy5Db250YWN0EiAKBWdyb3VwGAMgASgLMhEubWVzaHRhc3RpYy5Hcm91cBIiCgZzdGF0dXMYBCABKAsyEi5tZXNodGFzdGljLlN0YXR1cxIeCgNwbGkYBSABKAsyDy5tZXNodGFzdGljLlBMSUgAEiMKBGNoYXQYBiABKAsyEy5tZXNodGFzdGljLkdlb0NoYXRIABIQCgZkZXRhaWwYByABKAxIAEIRCg9wYXlsb2FkX3ZhcmlhbnQiXAoHR2VvQ2hhdBIPCgdtZXNzYWdlGAEgASgJEg8KAnRvGAIgASgJSACIAQESGAoLdG9fY2FsbHNpZ24YAyABKAlIAYgBAUIFCgNfdG9CDgoMX3RvX2NhbGxzaWduIk0KBUdyb3VwEiQKBHJvbGUYASABKA4yFi5tZXNodGFzdGljLk1lbWJlclJvbGUSHgoEdGVhbRgCIAEoDjIQLm1lc2h0YXN0aWMuVGVhbSIZCgZTdGF0dXMSDwoHYmF0dGVyeRgBIAEoDSI0CgdDb250YWN0EhAKCGNhbGxzaWduGAEgASgJEhcKD2RldmljZV9jYWxsc2lnbhgCIAEoCSJfCgNQTEkSEgoKbGF0aXR1ZGVfaRgBIAEoDxITCgtsb25naXR1ZGVfaRgCIAEoDxIQCghhbHRpdHVkZRgDIAEoBRINCgVzcGVlZBgEIAEoDRIOCgZjb3Vyc2UYBSABKA0qwAEKBFRlYW0SFAoQVW5zcGVjaWZlZF9Db2xvchAAEgkKBVdoaXRlEAESCgoGWWVsbG93EAISCgoGT3JhbmdlEAMSCwoHTWFnZW50YRAEEgcKA1JlZBAFEgoKBk1hcm9vbhAGEgoKBlB1cnBsZRAHEg0KCURhcmtfQmx1ZRAIEggKBEJsdWUQCRIICgRDeWFuEAoSCAoEVGVhbBALEgkKBUdyZWVuEAwSDgoKRGFya19HcmVlbhANEgkKBUJyb3duEA4qfwoKTWVtYmVyUm9sZRIOCgpVbnNwZWNpZmVkEAASDgoKVGVhbU1lbWJlchABEgwKCFRlYW1MZWFkEAISBgoCSFEQAxIKCgZTbmlwZXIQBBIJCgVNZWRpYxAFEhMKD0ZvcndhcmRPYnNlcnZlchAGEgcKA1JUTxAHEgYKAks5EAhCXwoTY29tLmdlZWtzdmlsbGUubWVzaEIKQVRBS1Byb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM"), Gh = /* @__PURE__ */ H(Wh, 0), Kh = /* @__PURE__ */ H(Wh, 1), qh = /* @__PURE__ */ H(Wh, 2), Jh = /* @__PURE__ */ H(Wh, 3), Yh = /* @__PURE__ */ H(Wh, 4), Xh = /* @__PURE__ */ H(Wh, 5), Zh = /* @__PURE__ */ function(e) {
	return e[e.Unspecifed_Color = 0] = "Unspecifed_Color", e[e.White = 1] = "White", e[e.Yellow = 2] = "Yellow", e[e.Orange = 3] = "Orange", e[e.Magenta = 4] = "Magenta", e[e.Red = 5] = "Red", e[e.Maroon = 6] = "Maroon", e[e.Purple = 7] = "Purple", e[e.Dark_Blue = 8] = "Dark_Blue", e[e.Blue = 9] = "Blue", e[e.Cyan = 10] = "Cyan", e[e.Teal = 11] = "Teal", e[e.Green = 12] = "Green", e[e.Dark_Green = 13] = "Dark_Green", e[e.Brown = 14] = "Brown", e;
}({}), Qh = /* @__PURE__ */ B(Wh, 0), $h = /* @__PURE__ */ function(e) {
	return e[e.Unspecifed = 0] = "Unspecifed", e[e.TeamMember = 1] = "TeamMember", e[e.TeamLead = 2] = "TeamLead", e[e.HQ = 3] = "HQ", e[e.Sniper = 4] = "Sniper", e[e.Medic = 5] = "Medic", e[e.ForwardObserver = 6] = "ForwardObserver", e[e.RTO = 7] = "RTO", e[e.K9 = 8] = "K9", e;
}({}), eg = /* @__PURE__ */ B(Wh, 1), tg = P({
	CannedMessageModuleConfigSchema: () => rg,
	file_cannedmessages: () => ng
}), ng = /* @__PURE__ */ V("ChRjYW5uZWRtZXNzYWdlcy5wcm90bxIKbWVzaHRhc3RpYyItChlDYW5uZWRNZXNzYWdlTW9kdWxlQ29uZmlnEhAKCG1lc3NhZ2VzGAEgASgJQm4KE2NvbS5nZWVrc3ZpbGxlLm1lc2hCGUNhbm5lZE1lc3NhZ2VDb25maWdQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), rg = /* @__PURE__ */ H(ng, 0), ig = P({
	LocalConfigSchema: () => og,
	LocalModuleConfigSchema: () => sg,
	file_localonly: () => ag
}), ag = /* @__PURE__ */ V("Cg9sb2NhbG9ubHkucHJvdG8SCm1lc2h0YXN0aWMisgMKC0xvY2FsQ29uZmlnEi8KBmRldmljZRgBIAEoCzIfLm1lc2h0YXN0aWMuQ29uZmlnLkRldmljZUNvbmZpZxIzCghwb3NpdGlvbhgCIAEoCzIhLm1lc2h0YXN0aWMuQ29uZmlnLlBvc2l0aW9uQ29uZmlnEi0KBXBvd2VyGAMgASgLMh4ubWVzaHRhc3RpYy5Db25maWcuUG93ZXJDb25maWcSMQoHbmV0d29yaxgEIAEoCzIgLm1lc2h0YXN0aWMuQ29uZmlnLk5ldHdvcmtDb25maWcSMQoHZGlzcGxheRgFIAEoCzIgLm1lc2h0YXN0aWMuQ29uZmlnLkRpc3BsYXlDb25maWcSKwoEbG9yYRgGIAEoCzIdLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWcSNQoJYmx1ZXRvb3RoGAcgASgLMiIubWVzaHRhc3RpYy5Db25maWcuQmx1ZXRvb3RoQ29uZmlnEg8KB3ZlcnNpb24YCCABKA0SMwoIc2VjdXJpdHkYCSABKAsyIS5tZXNodGFzdGljLkNvbmZpZy5TZWN1cml0eUNvbmZpZyL7BgoRTG9jYWxNb2R1bGVDb25maWcSMQoEbXF0dBgBIAEoCzIjLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk1RVFRDb25maWcSNQoGc2VyaWFsGAIgASgLMiUubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuU2VyaWFsQ29uZmlnElIKFWV4dGVybmFsX25vdGlmaWNhdGlvbhgDIAEoCzIzLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLkV4dGVybmFsTm90aWZpY2F0aW9uQ29uZmlnEkIKDXN0b3JlX2ZvcndhcmQYBCABKAsyKy5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5TdG9yZUZvcndhcmRDb25maWcSPAoKcmFuZ2VfdGVzdBgFIAEoCzIoLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlJhbmdlVGVzdENvbmZpZxI7Cgl0ZWxlbWV0cnkYBiABKAsyKC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5UZWxlbWV0cnlDb25maWcSRAoOY2FubmVkX21lc3NhZ2UYByABKAsyLC5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5DYW5uZWRNZXNzYWdlQ29uZmlnEjMKBWF1ZGlvGAkgASgLMiQubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuQXVkaW9Db25maWcSRgoPcmVtb3RlX2hhcmR3YXJlGAogASgLMi0ubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuUmVtb3RlSGFyZHdhcmVDb25maWcSQgoNbmVpZ2hib3JfaW5mbxgLIAEoCzIrLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLk5laWdoYm9ySW5mb0NvbmZpZxJIChBhbWJpZW50X2xpZ2h0aW5nGAwgASgLMi4ubWVzaHRhc3RpYy5Nb2R1bGVDb25maWcuQW1iaWVudExpZ2h0aW5nQ29uZmlnEkgKEGRldGVjdGlvbl9zZW5zb3IYDSABKAsyLi5tZXNodGFzdGljLk1vZHVsZUNvbmZpZy5EZXRlY3Rpb25TZW5zb3JDb25maWcSPQoKcGF4Y291bnRlchgOIAEoCzIpLm1lc2h0YXN0aWMuTW9kdWxlQ29uZmlnLlBheGNvdW50ZXJDb25maWcSDwoHdmVyc2lvbhgIIAEoDUJkChNjb20uZ2Vla3N2aWxsZS5tZXNoQg9Mb2NhbE9ubHlQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z", [U, W]), og = /* @__PURE__ */ H(ag, 0), sg = /* @__PURE__ */ H(ag, 1), cg = P({
	DeviceProfileSchema: () => ug,
	file_clientonly: () => lg
}), lg = /* @__PURE__ */ V("ChBjbGllbnRvbmx5LnByb3RvEgptZXNodGFzdGljIqkDCg1EZXZpY2VQcm9maWxlEhYKCWxvbmdfbmFtZRgBIAEoCUgAiAEBEhcKCnNob3J0X25hbWUYAiABKAlIAYgBARIYCgtjaGFubmVsX3VybBgDIAEoCUgCiAEBEiwKBmNvbmZpZxgEIAEoCzIXLm1lc2h0YXN0aWMuTG9jYWxDb25maWdIA4gBARI5Cg1tb2R1bGVfY29uZmlnGAUgASgLMh0ubWVzaHRhc3RpYy5Mb2NhbE1vZHVsZUNvbmZpZ0gEiAEBEjEKDmZpeGVkX3Bvc2l0aW9uGAYgASgLMhQubWVzaHRhc3RpYy5Qb3NpdGlvbkgFiAEBEhUKCHJpbmd0b25lGAcgASgJSAaIAQESHAoPY2FubmVkX21lc3NhZ2VzGAggASgJSAeIAQFCDAoKX2xvbmdfbmFtZUINCgtfc2hvcnRfbmFtZUIOCgxfY2hhbm5lbF91cmxCCQoHX2NvbmZpZ0IQCg5fbW9kdWxlX2NvbmZpZ0IRCg9fZml4ZWRfcG9zaXRpb25CCwoJX3Jpbmd0b25lQhIKEF9jYW5uZWRfbWVzc2FnZXNCZQoTY29tLmdlZWtzdmlsbGUubWVzaEIQQ2xpZW50T25seVByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [ag, J]), ug = /* @__PURE__ */ H(lg, 0), dg = P({
	MapReportSchema: () => mg,
	ServiceEnvelopeSchema: () => pg,
	file_mqtt: () => fg
}), fg = /* @__PURE__ */ V("CgptcXR0LnByb3RvEgptZXNodGFzdGljImEKD1NlcnZpY2VFbnZlbG9wZRImCgZwYWNrZXQYASABKAsyFi5tZXNodGFzdGljLk1lc2hQYWNrZXQSEgoKY2hhbm5lbF9pZBgCIAEoCRISCgpnYXRld2F5X2lkGAMgASgJIt8DCglNYXBSZXBvcnQSEQoJbG9uZ19uYW1lGAEgASgJEhIKCnNob3J0X25hbWUYAiABKAkSMgoEcm9sZRgDIAEoDjIkLm1lc2h0YXN0aWMuQ29uZmlnLkRldmljZUNvbmZpZy5Sb2xlEisKCGh3X21vZGVsGAQgASgOMhkubWVzaHRhc3RpYy5IYXJkd2FyZU1vZGVsEhgKEGZpcm13YXJlX3ZlcnNpb24YBSABKAkSOAoGcmVnaW9uGAYgASgOMigubWVzaHRhc3RpYy5Db25maWcuTG9SYUNvbmZpZy5SZWdpb25Db2RlEj8KDG1vZGVtX3ByZXNldBgHIAEoDjIpLm1lc2h0YXN0aWMuQ29uZmlnLkxvUmFDb25maWcuTW9kZW1QcmVzZXQSGwoTaGFzX2RlZmF1bHRfY2hhbm5lbBgIIAEoCBISCgpsYXRpdHVkZV9pGAkgASgPEhMKC2xvbmdpdHVkZV9pGAogASgPEhAKCGFsdGl0dWRlGAsgASgFEhoKEnBvc2l0aW9uX3ByZWNpc2lvbhgMIAEoDRIeChZudW1fb25saW5lX2xvY2FsX25vZGVzGA0gASgNEiEKGWhhc19vcHRlZF9yZXBvcnRfbG9jYXRpb24YDiABKAhCXwoTY29tLmdlZWtzdmlsbGUubWVzaEIKTVFUVFByb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM", [U, J]), pg = /* @__PURE__ */ H(fg, 0), mg = /* @__PURE__ */ H(fg, 1), hg = P({
	PaxcountSchema: () => _g,
	file_paxcount: () => gg
}), gg = /* @__PURE__ */ V("Cg5wYXhjb3VudC5wcm90bxIKbWVzaHRhc3RpYyI1CghQYXhjb3VudBIMCgR3aWZpGAEgASgNEgsKA2JsZRgCIAEoDRIOCgZ1cHRpbWUYAyABKA1CYwoTY29tLmdlZWtzdmlsbGUubWVzaEIOUGF4Y291bnRQcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), _g = /* @__PURE__ */ H(gg, 0), vg = P({
	PowerMonSchema: () => bg,
	PowerMon_State: () => xg,
	PowerMon_StateSchema: () => Sg,
	PowerStressMessageSchema: () => Cg,
	PowerStressMessage_Opcode: () => wg,
	PowerStressMessage_OpcodeSchema: () => Tg,
	file_powermon: () => yg
}), yg = /* @__PURE__ */ V("Cg5wb3dlcm1vbi5wcm90bxIKbWVzaHRhc3RpYyLgAQoIUG93ZXJNb24i0wEKBVN0YXRlEggKBE5vbmUQABIRCg1DUFVfRGVlcFNsZWVwEAESEgoOQ1BVX0xpZ2h0U2xlZXAQAhIMCghWZXh0MV9PbhAEEg0KCUxvcmFfUlhPbhAIEg0KCUxvcmFfVFhPbhAQEhEKDUxvcmFfUlhBY3RpdmUQIBIJCgVCVF9PbhBAEgsKBkxFRF9PbhCAARIOCglTY3JlZW5fT24QgAISEwoOU2NyZWVuX0RyYXdpbmcQgAQSDAoHV2lmaV9PbhCACBIPCgpHUFNfQWN0aXZlEIAQIv8CChJQb3dlclN0cmVzc01lc3NhZ2USMgoDY21kGAEgASgOMiUubWVzaHRhc3RpYy5Qb3dlclN0cmVzc01lc3NhZ2UuT3Bjb2RlEhMKC251bV9zZWNvbmRzGAIgASgCIp8CCgZPcGNvZGUSCQoFVU5TRVQQABIOCgpQUklOVF9JTkZPEAESDwoLRk9SQ0VfUVVJRVQQAhINCglFTkRfUVVJRVQQAxINCglTQ1JFRU5fT04QEBIOCgpTQ1JFRU5fT0ZGEBESDAoIQ1BVX0lETEUQIBIRCg1DUFVfREVFUFNMRUVQECESDgoKQ1BVX0ZVTExPThAiEgoKBkxFRF9PThAwEgsKB0xFRF9PRkYQMRIMCghMT1JBX09GRhBAEgsKB0xPUkFfVFgQQRILCgdMT1JBX1JYEEISCgoGQlRfT0ZGEFASCQoFQlRfT04QURIMCghXSUZJX09GRhBgEgsKB1dJRklfT04QYRILCgdHUFNfT0ZGEHASCgoGR1BTX09OEHFCYwoTY29tLmdlZWtzdmlsbGUubWVzaEIOUG93ZXJNb25Qcm90b3NaImdpdGh1Yi5jb20vbWVzaHRhc3RpYy9nby9nZW5lcmF0ZWSqAhRNZXNodGFzdGljLlByb3RvYnVmc7oCAGIGcHJvdG8z"), bg = /* @__PURE__ */ H(yg, 0), xg = /* @__PURE__ */ function(e) {
	return e[e.None = 0] = "None", e[e.CPU_DeepSleep = 1] = "CPU_DeepSleep", e[e.CPU_LightSleep = 2] = "CPU_LightSleep", e[e.Vext1_On = 4] = "Vext1_On", e[e.Lora_RXOn = 8] = "Lora_RXOn", e[e.Lora_TXOn = 16] = "Lora_TXOn", e[e.Lora_RXActive = 32] = "Lora_RXActive", e[e.BT_On = 64] = "BT_On", e[e.LED_On = 128] = "LED_On", e[e.Screen_On = 256] = "Screen_On", e[e.Screen_Drawing = 512] = "Screen_Drawing", e[e.Wifi_On = 1024] = "Wifi_On", e[e.GPS_Active = 2048] = "GPS_Active", e;
}({}), Sg = /* @__PURE__ */ B(yg, 0, 0), Cg = /* @__PURE__ */ H(yg, 1), wg = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.PRINT_INFO = 1] = "PRINT_INFO", e[e.FORCE_QUIET = 2] = "FORCE_QUIET", e[e.END_QUIET = 3] = "END_QUIET", e[e.SCREEN_ON = 16] = "SCREEN_ON", e[e.SCREEN_OFF = 17] = "SCREEN_OFF", e[e.CPU_IDLE = 32] = "CPU_IDLE", e[e.CPU_DEEPSLEEP = 33] = "CPU_DEEPSLEEP", e[e.CPU_FULLON = 34] = "CPU_FULLON", e[e.LED_ON = 48] = "LED_ON", e[e.LED_OFF = 49] = "LED_OFF", e[e.LORA_OFF = 64] = "LORA_OFF", e[e.LORA_TX = 65] = "LORA_TX", e[e.LORA_RX = 66] = "LORA_RX", e[e.BT_OFF = 80] = "BT_OFF", e[e.BT_ON = 81] = "BT_ON", e[e.WIFI_OFF = 96] = "WIFI_OFF", e[e.WIFI_ON = 97] = "WIFI_ON", e[e.GPS_OFF = 112] = "GPS_OFF", e[e.GPS_ON = 113] = "GPS_ON", e;
}({}), Tg = /* @__PURE__ */ B(yg, 1, 0), Eg = P({
	HardwareMessageSchema: () => Og,
	HardwareMessage_Type: () => kg,
	HardwareMessage_TypeSchema: () => Ag,
	file_remote_hardware: () => Dg
}), Dg = /* @__PURE__ */ V("ChVyZW1vdGVfaGFyZHdhcmUucHJvdG8SCm1lc2h0YXN0aWMi1gEKD0hhcmR3YXJlTWVzc2FnZRIuCgR0eXBlGAEgASgOMiAubWVzaHRhc3RpYy5IYXJkd2FyZU1lc3NhZ2UuVHlwZRIRCglncGlvX21hc2sYAiABKAQSEgoKZ3Bpb192YWx1ZRgDIAEoBCJsCgRUeXBlEgkKBVVOU0VUEAASDwoLV1JJVEVfR1BJT1MQARIPCgtXQVRDSF9HUElPUxACEhEKDUdQSU9TX0NIQU5HRUQQAxIOCgpSRUFEX0dQSU9TEAQSFAoQUkVBRF9HUElPU19SRVBMWRAFQmMKE2NvbS5nZWVrc3ZpbGxlLm1lc2hCDlJlbW90ZUhhcmR3YXJlWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Og = /* @__PURE__ */ H(Dg, 0), kg = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.WRITE_GPIOS = 1] = "WRITE_GPIOS", e[e.WATCH_GPIOS = 2] = "WATCH_GPIOS", e[e.GPIOS_CHANGED = 3] = "GPIOS_CHANGED", e[e.READ_GPIOS = 4] = "READ_GPIOS", e[e.READ_GPIOS_REPLY = 5] = "READ_GPIOS_REPLY", e;
}({}), Ag = /* @__PURE__ */ B(Dg, 0, 0), jg = P({
	RTTTLConfigSchema: () => Ng,
	file_rtttl: () => Mg
}), Mg = /* @__PURE__ */ V("CgtydHR0bC5wcm90bxIKbWVzaHRhc3RpYyIfCgtSVFRUTENvbmZpZxIQCghyaW5ndG9uZRgBIAEoCUJmChNjb20uZ2Vla3N2aWxsZS5tZXNoQhFSVFRUTENvbmZpZ1Byb3Rvc1oiZ2l0aHViLmNvbS9tZXNodGFzdGljL2dvL2dlbmVyYXRlZKoCFE1lc2h0YXN0aWMuUHJvdG9idWZzugIAYgZwcm90bzM"), Ng = /* @__PURE__ */ H(Mg, 0), Pg = P({
	StoreAndForwardSchema: () => Ig,
	StoreAndForward_HeartbeatSchema: () => zg,
	StoreAndForward_HistorySchema: () => Rg,
	StoreAndForward_RequestResponse: () => Bg,
	StoreAndForward_RequestResponseSchema: () => Vg,
	StoreAndForward_StatisticsSchema: () => Lg,
	file_storeforward: () => Fg
}), Fg = /* @__PURE__ */ V("ChJzdG9yZWZvcndhcmQucHJvdG8SCm1lc2h0YXN0aWMinAcKD1N0b3JlQW5kRm9yd2FyZBI3CgJychgBIAEoDjIrLm1lc2h0YXN0aWMuU3RvcmVBbmRGb3J3YXJkLlJlcXVlc3RSZXNwb25zZRI3CgVzdGF0cxgCIAEoCzImLm1lc2h0YXN0aWMuU3RvcmVBbmRGb3J3YXJkLlN0YXRpc3RpY3NIABI2CgdoaXN0b3J5GAMgASgLMiMubWVzaHRhc3RpYy5TdG9yZUFuZEZvcndhcmQuSGlzdG9yeUgAEjoKCWhlYXJ0YmVhdBgEIAEoCzIlLm1lc2h0YXN0aWMuU3RvcmVBbmRGb3J3YXJkLkhlYXJ0YmVhdEgAEg4KBHRleHQYBSABKAxIABrNAQoKU3RhdGlzdGljcxIWCg5tZXNzYWdlc190b3RhbBgBIAEoDRIWCg5tZXNzYWdlc19zYXZlZBgCIAEoDRIUCgxtZXNzYWdlc19tYXgYAyABKA0SDwoHdXBfdGltZRgEIAEoDRIQCghyZXF1ZXN0cxgFIAEoDRIYChByZXF1ZXN0c19oaXN0b3J5GAYgASgNEhEKCWhlYXJ0YmVhdBgHIAEoCBISCgpyZXR1cm5fbWF4GAggASgNEhUKDXJldHVybl93aW5kb3cYCSABKA0aSQoHSGlzdG9yeRIYChBoaXN0b3J5X21lc3NhZ2VzGAEgASgNEg4KBndpbmRvdxgCIAEoDRIUCgxsYXN0X3JlcXVlc3QYAyABKA0aLgoJSGVhcnRiZWF0Eg4KBnBlcmlvZBgBIAEoDRIRCglzZWNvbmRhcnkYAiABKA0ivAIKD1JlcXVlc3RSZXNwb25zZRIJCgVVTlNFVBAAEhAKDFJPVVRFUl9FUlJPUhABEhQKEFJPVVRFUl9IRUFSVEJFQVQQAhIPCgtST1VURVJfUElORxADEg8KC1JPVVRFUl9QT05HEAQSDwoLUk9VVEVSX0JVU1kQBRISCg5ST1VURVJfSElTVE9SWRAGEhAKDFJPVVRFUl9TVEFUUxAHEhYKElJPVVRFUl9URVhUX0RJUkVDVBAIEhkKFVJPVVRFUl9URVhUX0JST0FEQ0FTVBAJEhAKDENMSUVOVF9FUlJPUhBAEhIKDkNMSUVOVF9ISVNUT1JZEEESEAoMQ0xJRU5UX1NUQVRTEEISDwoLQ0xJRU5UX1BJTkcQQxIPCgtDTElFTlRfUE9ORxBEEhAKDENMSUVOVF9BQk9SVBBqQgkKB3ZhcmlhbnRCagoTY29tLmdlZWtzdmlsbGUubWVzaEIVU3RvcmVBbmRGb3J3YXJkUHJvdG9zWiJnaXRodWIuY29tL21lc2h0YXN0aWMvZ28vZ2VuZXJhdGVkqgIUTWVzaHRhc3RpYy5Qcm90b2J1ZnO6AgBiBnByb3RvMw"), Ig = /* @__PURE__ */ H(Fg, 0), Lg = /* @__PURE__ */ H(Fg, 0, 0), Rg = /* @__PURE__ */ H(Fg, 0, 1), zg = /* @__PURE__ */ H(Fg, 0, 2), Bg = /* @__PURE__ */ function(e) {
	return e[e.UNSET = 0] = "UNSET", e[e.ROUTER_ERROR = 1] = "ROUTER_ERROR", e[e.ROUTER_HEARTBEAT = 2] = "ROUTER_HEARTBEAT", e[e.ROUTER_PING = 3] = "ROUTER_PING", e[e.ROUTER_PONG = 4] = "ROUTER_PONG", e[e.ROUTER_BUSY = 5] = "ROUTER_BUSY", e[e.ROUTER_HISTORY = 6] = "ROUTER_HISTORY", e[e.ROUTER_STATS = 7] = "ROUTER_STATS", e[e.ROUTER_TEXT_DIRECT = 8] = "ROUTER_TEXT_DIRECT", e[e.ROUTER_TEXT_BROADCAST = 9] = "ROUTER_TEXT_BROADCAST", e[e.CLIENT_ERROR = 64] = "CLIENT_ERROR", e[e.CLIENT_HISTORY = 65] = "CLIENT_HISTORY", e[e.CLIENT_STATS = 66] = "CLIENT_STATS", e[e.CLIENT_PING = 67] = "CLIENT_PING", e[e.CLIENT_PONG = 68] = "CLIENT_PONG", e[e.CLIENT_ABORT = 106] = "CLIENT_ABORT", e;
}({}), Vg = /* @__PURE__ */ B(Fg, 0, 0), Hg = {
	broadcastNum: 0xffffffff,
	minFwVer: 2.2
}, Ug = {
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
function Wg(e, t, n, r = !1) {
	let i = String(t), a = (e, t) => `\u001b[${t[0]}m${e}\u001b[${t[1]}m`, o = (e, t) => t != null && typeof t == "string" ? a(e, Ug[t]) : t != null && Array.isArray(t) ? t.reduce((e, t) => o(e, t), e) : t != null && t[e.trim()] != null ? o(e, t[e.trim()]) : t != null && t["*"] != null ? o(e, t["*"]) : e;
	return i.replace(/{{(.+?)}}/g, (t, i) => {
		let s = n[i] == null ? r ? "" : t : String(n[i]);
		return e.stylePrettyLogs ? o(s, e?.prettyLogStyles?.[i] ?? null) + a("", Ug.reset) : s;
	});
}
function Gg(e, t = 2, n = 0) {
	return e != null && isNaN(e) ? "" : (e = e == null ? e : e + n, t === 2 ? e == null ? "--" : e < 10 ? "0" + e : e.toString() : e == null ? "---" : e < 10 ? "00" + e : e < 100 ? "0" + e : e.toString());
}
function Kg(e) {
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
var qg = {
	getCallerStackFrame: Xg,
	getErrorTrace: Zg,
	getMeta: Yg,
	transportJSON: r_,
	transportFormatted: n_,
	isBuffer: i_,
	isError: $g,
	prettyFormatLogObj: e_,
	prettyFormatErrorObj: t_
}, Jg = {
	runtime: "Nodejs",
	runtimeVersion: process?.version,
	hostname: zc ? zc() : void 0
};
function Yg(e, t, n, r, i, a) {
	return Object.assign({}, Jg, {
		name: i,
		parentNames: a,
		date: /* @__PURE__ */ new Date(),
		logLevelId: e,
		logLevelName: t,
		path: r ? void 0 : Xg(n)
	});
}
function Xg(e, t = Error()) {
	return Qg(t?.stack?.split("\n")?.filter((e) => e.includes("    at "))?.[e]);
}
function Zg(e) {
	return e?.stack?.split("\n")?.reduce((e, t) => (t.includes("    at ") && e.push(Qg(t)), e), []);
}
function Qg(e) {
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
		let n = e.split(" ("), r = e?.slice(-1) === ")" ? e?.match(/\(([^)]+)\)/)?.[1] : e, i = r?.includes(":") ? r?.replace("file://", "")?.replace(process.cwd(), "")?.split(":") : void 0, a = i?.pop(), o = i?.pop(), s = i?.pop(), c = Bc(`${s}:${o}`), l = s?.split("/")?.pop(), u = `${l}:${o}`;
		s != null && s.length > 0 && (t.fullFilePath = r, t.fileName = l, t.fileNameWithLine = u, t.fileColumn = a, t.fileLine = o, t.filePath = s, t.filePathWithLine = c, t.method = n?.[1] == null ? void 0 : n?.[0]);
	}
	return t;
}
function $g(e) {
	return Uc?.isNativeError == null ? e instanceof Error : Uc.isNativeError(e);
}
function e_(e, t) {
	return e.reduce((e, n) => ($g(n) ? e.errors.push(t_(n, t)) : e.args.push(n), e), {
		args: [],
		errors: []
	});
}
function t_(e, t) {
	let n = Zg(e).map((e) => Wg(t, t.prettyErrorStackTemplate, { ...e }, !0)), r = {
		errorName: ` ${e.name} `,
		errorMessage: Object.getOwnPropertyNames(e).reduce((t, n) => (n !== "stack" && t.push(e[n]), t), []).join(", "),
		errorStack: n.join("\n")
	};
	return Wg(t, t.prettyErrorTemplate, r);
}
function n_(e, t, n, r) {
	let i = (n.length > 0 && t.length > 0 ? "\n" : "") + n.join("\n");
	r.prettyInspectOptions.colors = r.stylePrettyLogs, console.log(e + Hc(r.prettyInspectOptions, ...t) + i);
}
function r_(e) {
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
function i_(e) {
	return Buffer.isBuffer(e);
}
var a_ = class {
	constructor(e, t, n = 4) {
		this.logObj = t, this.stackDepthLevel = n, this.runtime = qg, this.settings = {
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
		if (e instanceof URL) return Kg(e);
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
		t.includes("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}") ? t = t.replace("{{yyyy}}.{{mm}}.{{dd}} {{hh}}:{{MM}}:{{ss}}:{{ms}}", "{{dateIsoStr}}") : this.settings.prettyLogTimeZone === "UTC" ? (n.yyyy = e?.date?.getUTCFullYear() ?? "----", n.mm = Gg(e?.date?.getUTCMonth(), 2, 1), n.dd = Gg(e?.date?.getUTCDate(), 2), n.hh = Gg(e?.date?.getUTCHours(), 2), n.MM = Gg(e?.date?.getUTCMinutes(), 2), n.ss = Gg(e?.date?.getUTCSeconds(), 2), n.ms = Gg(e?.date?.getUTCMilliseconds(), 3)) : (n.yyyy = e?.date?.getFullYear() ?? "----", n.mm = Gg(e?.date?.getMonth(), 2, 1), n.dd = Gg(e?.date?.getDate(), 2), n.hh = Gg(e?.date?.getHours(), 2), n.MM = Gg(e?.date?.getMinutes(), 2), n.ss = Gg(e?.date?.getSeconds(), 2), n.ms = Gg(e?.date?.getMilliseconds(), 3));
		let r = this.settings.prettyLogTimeZone === "UTC" ? e?.date : /* @__PURE__ */ new Date(e?.date?.getTime() - e?.date?.getTimezoneOffset() * 6e4);
		n.rawIsoStr = r?.toISOString(), n.dateIsoStr = r?.toISOString().replace("T", " ").replace("Z", ""), n.logLevelName = e?.logLevelName, n.fileNameWithLine = e?.path?.fileNameWithLine ?? "", n.filePathWithLine = e?.path?.filePathWithLine ?? "", n.fullFilePath = e?.path?.fullFilePath ?? "";
		let i = this.settings.parentNames?.join(this.settings.prettyErrorParentNamesSeparator);
		return i = i != null && e?.name != null ? i + this.settings.prettyErrorParentNamesSeparator : void 0, n.name = e?.name != null || i != null ? (i ?? "") + e?.name ?? "" : "", n.nameWithDelimiterPrefix = n.name.length > 0 ? this.settings.prettyErrorLoggerNameDelimiter + n.name : "", n.nameWithDelimiterSuffix = n.name.length > 0 ? n.name + this.settings.prettyErrorLoggerNameDelimiter : "", this.settings.overwrite?.addPlaceholders != null && this.settings.overwrite?.addPlaceholders(e, n), Wg(this.settings, t, n);
	}
}, o_ = class extends a_ {
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
}, s_ = Ic({
	ChannelNumber: () => u_,
	DeviceStatusEnum: () => c_,
	Emitter: () => X,
	EmitterScope: () => l_
}), c_ = /* @__PURE__ */ function(e) {
	return e[e.DeviceRestarting = 1] = "DeviceRestarting", e[e.DeviceDisconnected = 2] = "DeviceDisconnected", e[e.DeviceConnecting = 3] = "DeviceConnecting", e[e.DeviceReconnecting = 4] = "DeviceReconnecting", e[e.DeviceConnected = 5] = "DeviceConnected", e[e.DeviceConfiguring = 6] = "DeviceConfiguring", e[e.DeviceConfigured = 7] = "DeviceConfigured", e;
}({}), l_ = /* @__PURE__ */ function(e) {
	return e[e.MeshDevice = 1] = "MeshDevice", e[e.SerialConnection = 2] = "SerialConnection", e[e.NodeSerialConnection = 3] = "NodeSerialConnection", e[e.BleConnection = 4] = "BleConnection", e[e.HttpConnection = 5] = "HttpConnection", e;
}({}), X = /* @__PURE__ */ function(e) {
	return e[e.Constructor = 0] = "Constructor", e[e.SendText = 1] = "SendText", e[e.SendWaypoint = 2] = "SendWaypoint", e[e.SendPacket = 3] = "SendPacket", e[e.SendRaw = 4] = "SendRaw", e[e.SetConfig = 5] = "SetConfig", e[e.SetModuleConfig = 6] = "SetModuleConfig", e[e.ConfirmSetConfig = 7] = "ConfirmSetConfig", e[e.SetOwner = 8] = "SetOwner", e[e.SetChannel = 9] = "SetChannel", e[e.ConfirmSetChannel = 10] = "ConfirmSetChannel", e[e.ClearChannel = 11] = "ClearChannel", e[e.GetChannel = 12] = "GetChannel", e[e.GetAllChannels = 13] = "GetAllChannels", e[e.GetConfig = 14] = "GetConfig", e[e.GetModuleConfig = 15] = "GetModuleConfig", e[e.GetOwner = 16] = "GetOwner", e[e.Configure = 17] = "Configure", e[e.HandleFromRadio = 18] = "HandleFromRadio", e[e.HandleMeshPacket = 19] = "HandleMeshPacket", e[e.Connect = 20] = "Connect", e[e.Ping = 21] = "Ping", e[e.ReadFromRadio = 22] = "ReadFromRadio", e[e.WriteToRadio = 23] = "WriteToRadio", e[e.SetDebugMode = 24] = "SetDebugMode", e[e.GetMetadata = 25] = "GetMetadata", e[e.ResetNodes = 26] = "ResetNodes", e[e.Shutdown = 27] = "Shutdown", e[e.Reboot = 28] = "Reboot", e[e.RebootOta = 29] = "RebootOta", e[e.FactoryReset = 30] = "FactoryReset", e[e.EnterDfuMode = 31] = "EnterDfuMode", e[e.RemoveNodeByNum = 32] = "RemoveNodeByNum", e[e.SetCannedMessages = 33] = "SetCannedMessages", e[e.Disconnect = 34] = "Disconnect", e[e.ConnectionStatus = 35] = "ConnectionStatus", e;
}({}), u_ = /* @__PURE__ */ function(e) {
	return e[e.Primary = 0] = "Primary", e[e.Channel1 = 1] = "Channel1", e[e.Channel2 = 2] = "Channel2", e[e.Channel3 = 3] = "Channel3", e[e.Channel4 = 4] = "Channel4", e[e.Channel5 = 5] = "Channel5", e[e.Channel6 = 6] = "Channel6", e[e.Admin = 7] = "Admin", e;
}({}), d_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/DispatcherWrapper.js": ((e) => {
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
}) }), f_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/events/Subscription.js": ((e) => {
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
}) }), p_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/management/EventManagement.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.EventManagement = class {
		constructor(e) {
			this.unsub = e, this.propagationStopped = !1;
		}
		stopPropagation() {
			this.propagationStopped = !0;
		}
	};
}) }), m_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/DispatcherBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = d_(), n = f_(), r = p_();
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
}) }), h_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/DispatchError.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.DispatchError = class extends Error {
		constructor(e) {
			super(e);
		}
	};
}) }), g_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/EventListBase.js": ((e) => {
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
}) }), __ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/handling/HandlingBase.js": ((e) => {
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
}) }), v_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/events/PromiseSubscription.js": ((e) => {
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
}) }), y_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/dispatching/PromiseDispatcherBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = v_(), n = p_(), r = m_(), i = h_();
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
}) }), b_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-core@3.0.11/node_modules/ste-core/dist/index.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.SubscriptionChangeEventDispatcher = e.HandlingBase = e.PromiseDispatcherBase = e.PromiseSubscription = e.DispatchError = e.EventManagement = e.EventListBase = e.DispatcherWrapper = e.DispatcherBase = e.Subscription = void 0;
	let t = m_();
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
	let n = h_();
	Object.defineProperty(e, "DispatchError", {
		enumerable: !0,
		get: function() {
			return n.DispatchError;
		}
	});
	let r = d_();
	Object.defineProperty(e, "DispatcherWrapper", {
		enumerable: !0,
		get: function() {
			return r.DispatcherWrapper;
		}
	});
	let i = g_();
	Object.defineProperty(e, "EventListBase", {
		enumerable: !0,
		get: function() {
			return i.EventListBase;
		}
	});
	let a = p_();
	Object.defineProperty(e, "EventManagement", {
		enumerable: !0,
		get: function() {
			return a.EventManagement;
		}
	});
	let o = __();
	Object.defineProperty(e, "HandlingBase", {
		enumerable: !0,
		get: function() {
			return o.HandlingBase;
		}
	});
	let s = y_();
	Object.defineProperty(e, "PromiseDispatcherBase", {
		enumerable: !0,
		get: function() {
			return s.PromiseDispatcherBase;
		}
	});
	let c = v_();
	Object.defineProperty(e, "PromiseSubscription", {
		enumerable: !0,
		get: function() {
			return c.PromiseSubscription;
		}
	});
	let l = f_();
	Object.defineProperty(e, "Subscription", {
		enumerable: !0,
		get: function() {
			return l.Subscription;
		}
	});
}) }), x_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/SimpleEventDispatcher.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = b_();
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
}) }), S_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/SimpleEventList.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = b_(), n = x_();
	e.SimpleEventList = class extends t.EventListBase {
		constructor() {
			super();
		}
		createDispatcher() {
			return new n.SimpleEventDispatcher();
		}
	};
}) }), C_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/SimpleEventHandlingBase.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = b_(), n = S_();
	e.SimpleEventHandlingBase = class extends t.HandlingBase {
		constructor() {
			super(new n.SimpleEventList());
		}
	};
}) }), w_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/NonUniformSimpleEventList.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 });
	let t = x_();
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
}) }), T_ = /* @__PURE__ */ Fc({ "../../node_modules/.pnpm/ste-simple-events@3.0.11/node_modules/ste-simple-events/dist/index.js": ((e) => {
	Object.defineProperty(e, "__esModule", { value: !0 }), e.NonUniformSimpleEventList = e.SimpleEventList = e.SimpleEventHandlingBase = e.SimpleEventDispatcher = void 0;
	let t = x_();
	Object.defineProperty(e, "SimpleEventDispatcher", {
		enumerable: !0,
		get: function() {
			return t.SimpleEventDispatcher;
		}
	});
	let n = C_();
	Object.defineProperty(e, "SimpleEventHandlingBase", {
		enumerable: !0,
		get: function() {
			return n.SimpleEventHandlingBase;
		}
	});
	let r = w_();
	Object.defineProperty(e, "NonUniformSimpleEventList", {
		enumerable: !0,
		get: function() {
			return r.NonUniformSimpleEventList;
		}
	});
	let i = S_();
	Object.defineProperty(e, "SimpleEventList", {
		enumerable: !0,
		get: function() {
			return i.SimpleEventList;
		}
	});
}) }), Z = /* @__PURE__ */ Rc(T_(), 1), E_ = class {
	constructor() {
		this.onLogEvent = new Z.SimpleEventDispatcher(), this.onFromRadio = new Z.SimpleEventDispatcher(), this.onMeshPacket = new Z.SimpleEventDispatcher(), this.onMyNodeInfo = new Z.SimpleEventDispatcher(), this.onNodeInfoPacket = new Z.SimpleEventDispatcher(), this.onChannelPacket = new Z.SimpleEventDispatcher(), this.onConfigPacket = new Z.SimpleEventDispatcher(), this.onModuleConfigPacket = new Z.SimpleEventDispatcher(), this.onAtakPacket = new Z.SimpleEventDispatcher(), this.onMessagePacket = new Z.SimpleEventDispatcher(), this.onRemoteHardwarePacket = new Z.SimpleEventDispatcher(), this.onPositionPacket = new Z.SimpleEventDispatcher(), this.onUserPacket = new Z.SimpleEventDispatcher(), this.onRoutingPacket = new Z.SimpleEventDispatcher(), this.onDeviceMetadataPacket = new Z.SimpleEventDispatcher(), this.onCannedMessageModulePacket = new Z.SimpleEventDispatcher(), this.onWaypointPacket = new Z.SimpleEventDispatcher(), this.onAudioPacket = new Z.SimpleEventDispatcher(), this.onDetectionSensorPacket = new Z.SimpleEventDispatcher(), this.onPingPacket = new Z.SimpleEventDispatcher(), this.onIpTunnelPacket = new Z.SimpleEventDispatcher(), this.onPaxcounterPacket = new Z.SimpleEventDispatcher(), this.onSerialPacket = new Z.SimpleEventDispatcher(), this.onStoreForwardPacket = new Z.SimpleEventDispatcher(), this.onRangeTestPacket = new Z.SimpleEventDispatcher(), this.onTelemetryPacket = new Z.SimpleEventDispatcher(), this.onZpsPacket = new Z.SimpleEventDispatcher(), this.onSimulatorPacket = new Z.SimpleEventDispatcher(), this.onTraceRoutePacket = new Z.SimpleEventDispatcher(), this.onNeighborInfoPacket = new Z.SimpleEventDispatcher(), this.onAtakPluginPacket = new Z.SimpleEventDispatcher(), this.onMapReportPacket = new Z.SimpleEventDispatcher(), this.onPrivatePacket = new Z.SimpleEventDispatcher(), this.onAtakForwarderPacket = new Z.SimpleEventDispatcher(), this.onClientNotificationPacket = new Z.SimpleEventDispatcher(), this.onDeviceStatus = new Z.SimpleEventDispatcher(), this.onLogRecord = new Z.SimpleEventDispatcher(), this.onMeshHeartbeat = new Z.SimpleEventDispatcher(), this.onDeviceDebugLog = new Z.SimpleEventDispatcher(), this.onPendingSettingsChange = new Z.SimpleEventDispatcher(), this.onQueueStatus = new Z.SimpleEventDispatcher();
	}
}, D_ = /* @__PURE__ */ Rc(T_(), 1), O_ = class {
	constructor() {
		this.queue = [], this.lock = !1, this.ackNotifier = new D_.SimpleEventDispatcher(), this.errorNotifier = new D_.SimpleEventDispatcher(), this.timeout = 6e4;
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
						let r = xf(q.ToRadioSchema, e.data);
						if (r.payloadVariant.case === "heartbeat" || r.payloadVariant.case === "wantConfigId") {
							t(e.id);
							return;
						}
						console.warn(`Packet ${e.id} of type ${r.payloadVariant.case} timed out`), n({
							id: e.id,
							error: q.Routing_Error.TIMEOUT
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
		console.error(`Error received for packet ${e.id}: ${q.Routing_Error[e.error]}`), this.errorNotifier.dispatch(e);
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
}, k_ = () => {
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
}, A_ = () => new TransformStream({ transform(e, t) {
	let n = e.length, r = new Uint8Array([
		148,
		195,
		n >> 8 & 255,
		n & 255
	]);
	t.enqueue(new Uint8Array([...r, ...e]));
} }), j_ = class {
	constructor(e) {
		this.sendRaw = e, this.rxBuffer = [], this.txBuffer = [], this.textEncoder = new TextEncoder(), this.counter = 0;
	}
	async downloadFile(e) {
		return await this.sendCommand(K.XModem_Control.STX, this.textEncoder.encode(e), 0);
	}
	async uploadFile(e, t) {
		for (let e = 0; e < t.length; e += 128) this.txBuffer.push(t.slice(e, e + 128));
		return await this.sendCommand(K.XModem_Control.SOH, this.textEncoder.encode(e), 0);
	}
	async sendCommand(e, t, n, r) {
		let i = R(q.ToRadioSchema, { payloadVariant: {
			case: "xmodemPacket",
			value: {
				buffer: t,
				control: e,
				seq: n,
				crc16: r
			}
		} });
		return await this.sendRaw(z(q.ToRadioSchema, i));
	}
	async handlePacket(e) {
		switch (await new Promise((e) => setTimeout(e, 100)), e.control) {
			case K.XModem_Control.NUL: break;
			case K.XModem_Control.SOH: return this.counter = e.seq, this.validateCrc16(e) ? (this.rxBuffer[this.counter] = e.buffer, this.sendCommand(K.XModem_Control.ACK)) : await this.sendCommand(K.XModem_Control.NAK, void 0, e.seq);
			case K.XModem_Control.STX:
			case K.XModem_Control.EOT: break;
			case K.XModem_Control.ACK:
				if (this.counter++, this.txBuffer[this.counter - 1]) return this.sendCommand(K.XModem_Control.SOH, this.txBuffer[this.counter - 1], this.counter, Gc(this.txBuffer[this.counter - 1] ?? /* @__PURE__ */ new Uint8Array()));
				if (this.counter === this.txBuffer.length + 1) return this.sendCommand(K.XModem_Control.EOT);
				this.clear();
				break;
			case K.XModem_Control.NAK: return this.sendCommand(K.XModem_Control.SOH, this.txBuffer[this.counter], this.counter, Gc(this.txBuffer[this.counter - 1] ?? /* @__PURE__ */ new Uint8Array()));
			case K.XModem_Control.CAN:
				this.clear();
				break;
			case K.XModem_Control.CTRLZ:
		}
		return Promise.resolve(0);
	}
	validateCrc16(e) {
		return Gc(e.buffer) === e.crc16;
	}
	clear() {
		this.counter = 0, this.rxBuffer = [], this.txBuffer = [];
	}
}, M_ = Ic({
	EventSystem: () => E_,
	Queue: () => O_,
	Xmodem: () => j_,
	fromDeviceStream: () => k_,
	toDeviceStream: () => A_
}), N_ = (e) => new WritableStream({ write(t) {
	switch (t.type) {
		case "status": {
			let { status: n, reason: r } = t.data;
			e.updateDeviceStatus(n), e.log.info(X[X.ConnectionStatus], `🔗 ${c_[n]} ${r ? `(${r})` : ""}`);
			break;
		}
		case "debug": break;
		case "packet": {
			let n;
			try {
				n = xf(q.FromRadioSchema, t.data);
			} catch (t) {
				e.log.error(X[X.HandleFromRadio], "⚠️  Received undecodable packet", t);
				break;
			}
			switch (e.events.onFromRadio.dispatch(n), n.payloadVariant.case) {
				case "packet":
					try {
						e.handleMeshPacket(n.payloadVariant.value);
					} catch (t) {
						e.log.error(X[X.HandleFromRadio], "⚠️  Unable to handle mesh packet", t);
					}
					break;
				case "myInfo":
					e.events.onMyNodeInfo.dispatch(n.payloadVariant.value), e.log.info(X[X.HandleFromRadio], "📱 Received Node info for this device");
					break;
				case "nodeInfo":
					e.log.info(X[X.HandleFromRadio], `📱 Received Node Info packet for node: ${n.payloadVariant.value.num}`), e.events.onNodeInfoPacket.dispatch(n.payloadVariant.value), n.payloadVariant.value.position && e.events.onPositionPacket.dispatch({
						id: n.id,
						rxTime: /* @__PURE__ */ new Date(),
						from: n.payloadVariant.value.num,
						to: n.payloadVariant.value.num,
						type: "direct",
						channel: u_.Primary,
						data: n.payloadVariant.value.position
					}), n.payloadVariant.value.user && e.events.onUserPacket.dispatch({
						id: n.id,
						rxTime: /* @__PURE__ */ new Date(),
						from: n.payloadVariant.value.num,
						to: n.payloadVariant.value.num,
						type: "direct",
						channel: u_.Primary,
						data: n.payloadVariant.value.user
					});
					break;
				case "config":
					n.payloadVariant.value.payloadVariant.case ? e.log.trace(X[X.HandleFromRadio], `💾 Received Config packet of variant: ${n.payloadVariant.value.payloadVariant.case}`) : e.log.warn(X[X.HandleFromRadio], "⚠️ Received Config packet of variant: UNK"), e.events.onConfigPacket.dispatch(n.payloadVariant.value);
					break;
				case "logRecord":
					e.log.trace(X[X.HandleFromRadio], "Received onLogRecord"), e.events.onLogRecord.dispatch(n.payloadVariant.value);
					break;
				case "configCompleteId":
					n.payloadVariant.value !== e.configId && e.log.error(X[X.HandleFromRadio], `❌ Invalid config id received from device, expected ${e.configId} but received ${n.payloadVariant.value}`), e.log.info(X[X.HandleFromRadio], `⚙️ Valid config id received from device: ${e.configId}`), e.updateDeviceStatus(c_.DeviceConfigured);
					break;
				case "rebooted":
					e.configure().catch(() => {});
					break;
				case "moduleConfig":
					n.payloadVariant.value.payloadVariant.case ? e.log.trace(X[X.HandleFromRadio], `💾 Received Module Config packet of variant: ${n.payloadVariant.value.payloadVariant.case}`) : e.log.warn(X[X.HandleFromRadio], "⚠️ Received Module Config packet of variant: UNK"), e.events.onModuleConfigPacket.dispatch(n.payloadVariant.value);
					break;
				case "channel":
					e.log.trace(X[X.HandleFromRadio], `🔐 Received Channel: ${n.payloadVariant.value.index}`), e.events.onChannelPacket.dispatch(n.payloadVariant.value);
					break;
				case "queueStatus":
					e.log.trace(X[X.HandleFromRadio], `🚧 Received Queue Status: ${n.payloadVariant.value}`), e.events.onQueueStatus.dispatch(n.payloadVariant.value);
					break;
				case "xmodemPacket":
					e.xModem.handlePacket(n.payloadVariant.value);
					break;
				case "metadata":
					Number.parseFloat(n.payloadVariant.value.firmwareVersion) < Hg.minFwVer && e.log.fatal(X[X.HandleFromRadio], `Device firmware outdated. Min supported: ${Hg.minFwVer} got : ${n.payloadVariant.value.firmwareVersion}`), e.log.debug(X[X.GetMetadata], "🏷️ Received metadata packet"), e.events.onDeviceMetadataPacket.dispatch({
						id: n.id,
						rxTime: /* @__PURE__ */ new Date(),
						from: 0,
						to: 0,
						type: "direct",
						channel: u_.Primary,
						data: n.payloadVariant.value
					});
					break;
				case "mqttClientProxyMessage": break;
				case "clientNotification":
					e.log.trace(X[X.HandleFromRadio], `📣 Received ClientNotification: ${n.payloadVariant.value.message}`), e.events.onClientNotificationPacket.dispatch(n.payloadVariant.value);
					break;
				default: e.log.warn(X[X.HandleFromRadio], `⚠️ Unhandled payload variant: ${n.payloadVariant.case}`);
			}
		}
	}
} }), P_ = class {
	constructor(e, t) {
		this.log = new o_({
			name: "iMeshDevice",
			prettyLogTemplate: "{{hh}}:{{MM}}:{{ss}}:{{ms}}	{{logLevelName}}	[{{name}}]	"
		}), this.transport = e, this.deviceStatus = c_.DeviceDisconnected, this.isConfigured = !1, this.pendingSettingsChanges = !1, this.myNodeInfo = R(q.MyNodeInfoSchema), this.configId = t ?? this.generateRandId(), this.queue = new O_(), this.events = new E_(), this.xModem = new j_(this.sendRaw.bind(this)), this.events.onDeviceStatus.subscribe((e) => {
			this.deviceStatus = e, e === c_.DeviceConfigured ? this.isConfigured = !0 : e === c_.DeviceConfiguring ? this.isConfigured = !1 : e === c_.DeviceDisconnected && (this._heartbeatIntervalId !== void 0 && clearInterval(this._heartbeatIntervalId), this.complete());
		}), this.events.onMyNodeInfo.subscribe((e) => {
			this.myNodeInfo = e;
		}), this.events.onPendingSettingsChange.subscribe((e) => {
			this.pendingSettingsChanges = e;
		}), this.transport.fromDevice.pipeTo(N_(this));
	}
	async sendText(e, t, n, r, i, a) {
		this.log.debug(X[X.SendText], `📤 Sending message to ${t ?? "broadcast"} on channel ${r?.toString() ?? 0}`);
		let o = new TextEncoder();
		return await this.sendPacket(o.encode(e), G.PortNum.TEXT_MESSAGE_APP, t ?? "broadcast", r, n, !1, !0, i, a);
	}
	sendWaypoint(e, t, n) {
		return this.log.debug(X[X.SendWaypoint], `📤 Sending waypoint to ${t} on channel ${n?.toString() ?? 0}`), e.id = this.generateRandId(), this.sendPacket(z(q.WaypointSchema, e), G.PortNum.WAYPOINT_APP, t, n, !0, !1);
	}
	async sendPacket(e, t, n, r = u_.Primary, i = !0, a = !0, o = !1, s, c) {
		this.log.trace(X[X.SendPacket], `📤 Sending ${G.PortNum[t]} to ${n}`);
		let l = R(q.MeshPacketSchema, {
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
			to: n === "broadcast" ? Hg.broadcastNum : n === "self" ? this.myNodeInfo.myNodeNum : n,
			id: this.generateRandId(),
			wantAck: i,
			channel: r
		}), u = R(q.ToRadioSchema, { payloadVariant: {
			case: "packet",
			value: l
		} });
		return o && (l.rxTime = Math.trunc(Date.now() / 1e3), this.handleMeshPacket(l)), await this.sendRaw(z(q.ToRadioSchema, u), l.id);
	}
	async sendRaw(e, t = this.generateRandId()) {
		if (e.length > 512) throw Error("Message longer than 512 bytes, it will not be sent!");
		return this.queue.push({
			id: t,
			data: e
		}), await this.queue.processQueue(this.transport.toDevice), this.queue.wait(t);
	}
	async setConfig(e) {
		this.log.debug(X[X.SetConfig], `⚙️ Setting config, Variant: ${e.payloadVariant.case ?? "Unknown"}`), this.pendingSettingsChanges || await this.beginEditSettings();
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "setConfig",
			value: e
		} });
		return this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async setModuleConfig(e) {
		this.log.debug(X[X.SetModuleConfig], "⚙️ Setting module config");
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "setModuleConfig",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async setCannedMessages(e) {
		this.log.debug(X[X.SetCannedMessages], "⚙️ Setting CannedMessages");
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "setCannedMessageModuleMessages",
			value: e.messages
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async setOwner(e) {
		this.log.debug(X[X.SetOwner], "👤 Setting owner");
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "setOwner",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async setChannel(e) {
		this.log.debug(X[X.SetChannel], `📻 Setting Channel: ${e.index}`);
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "setChannel",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async enterDfuMode() {
		this.log.debug(X[X.EnterDfuMode], "🔌 Entering DFU mode");
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "enterDfuModeRequest",
			value: !0
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self");
	}
	async setPosition(e) {
		return await this.sendPacket(z(q.PositionSchema, e), G.PortNum.POSITION_APP, "self");
	}
	async setFixedPosition(e, t) {
		let n = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "setFixedPosition",
			value: R(q.PositionSchema, {
				latitudeI: Math.floor(e / 1e-7),
				longitudeI: Math.floor(t / 1e-7)
			})
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, n), G.PortNum.ADMIN_APP, "self", 0, !0, !1);
	}
	async removeFixedPosition() {
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "removeFixedPosition",
			value: !0
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self", 0, !0, !1);
	}
	async getChannel(e) {
		this.log.debug(X[X.GetChannel], `📻 Requesting Channel: ${e}`);
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "getChannelRequest",
			value: e + 1
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async getConfig(e) {
		this.log.debug(X[X.GetConfig], "⚙️ Requesting config");
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "getConfigRequest",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async getModuleConfig(e) {
		this.log.debug(X[X.GetModuleConfig], "⚙️ Requesting module config");
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "getModuleConfigRequest",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async getOwner() {
		this.log.debug(X[X.GetOwner], "👤 Requesting owner");
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "getOwnerRequest",
			value: !0
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self");
	}
	async getMetadata(e) {
		this.log.debug(X[X.GetMetadata], `🏷️ Requesting metadata from ${e}`);
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "getDeviceMetadataRequest",
			value: !0
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, e, u_.Admin);
	}
	async clearChannel(e) {
		this.log.debug(X[X.ClearChannel], `📻 Clearing Channel ${e}`);
		let t = R(kf.ChannelSchema, {
			index: e,
			role: kf.Channel_Role.DISABLED
		}), n = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "setChannel",
			value: t
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, n), G.PortNum.ADMIN_APP, "self");
	}
	async beginEditSettings() {
		this.events.onPendingSettingsChange.dispatch(!0);
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "beginEditSettings",
			value: !0
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self");
	}
	async commitEditSettings() {
		this.events.onPendingSettingsChange.dispatch(!1);
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "commitEditSettings",
			value: !0
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self");
	}
	async resetNodes() {
		this.log.debug(X[X.ResetNodes], "📻 Resetting NodeDB");
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "nodedbReset",
			value: 1
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self");
	}
	async removeNodeByNum(e) {
		this.log.debug(X[X.RemoveNodeByNum], `📻 Removing Node ${e} from NodeDB`);
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "removeByNodenum",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async shutdown(e) {
		this.log.debug(X[X.Shutdown], `🔌 Shutting down ${e > 2 ? "now" : `in ${e} seconds`}`);
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "shutdownSeconds",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async reboot(e) {
		this.log.debug(X[X.Reboot], `🔌 Rebooting node ${e === 0 ? "now" : `in ${e} seconds`}`);
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "rebootSeconds",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async rebootOta(e) {
		this.log.debug(X[X.RebootOta], `🔌 Rebooting into OTA mode ${e === 0 ? "now" : `in ${e} seconds`}`);
		let t = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "rebootOtaSeconds",
			value: e
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, t), G.PortNum.ADMIN_APP, "self");
	}
	async factoryResetDevice() {
		this.log.debug(X[X.FactoryReset], "♻️ Factory resetting device");
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "factoryResetDevice",
			value: 1
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self");
	}
	async factoryResetConfig() {
		this.log.debug(X[X.FactoryReset], "♻️ Factory resetting config");
		let e = R(Y.AdminMessageSchema, { payloadVariant: {
			case: "factoryResetConfig",
			value: 1
		} });
		return await this.sendPacket(z(Y.AdminMessageSchema, e), G.PortNum.ADMIN_APP, "self");
	}
	configure() {
		this.log.debug(X[X.Configure], "⚙️ Requesting device configuration"), this.updateDeviceStatus(c_.DeviceConfiguring);
		let e = R(q.ToRadioSchema, { payloadVariant: {
			case: "wantConfigId",
			value: this.configId
		} });
		return this.sendRaw(z(q.ToRadioSchema, e)).catch((e) => {
			throw this.deviceStatus === c_.DeviceDisconnected ? Error("Device connection lost") : e;
		});
	}
	heartbeat() {
		this.log.debug(X[X.Ping], "❤️ Send heartbeat ping to radio");
		let e = R(q.ToRadioSchema, { payloadVariant: {
			case: "heartbeat",
			value: {}
		} });
		return this.sendRaw(z(q.ToRadioSchema, e));
	}
	setHeartbeatInterval(e) {
		this._heartbeatIntervalId !== void 0 && clearInterval(this._heartbeatIntervalId), this._heartbeatIntervalId = setInterval(() => {
			this.heartbeat().catch((e) => {
				this.log.error(X[X.Ping], `⚠️ Unable to send heartbeat: ${e.message}`);
			});
		}, e);
	}
	async traceRoute(e) {
		let t = R(q.RouteDiscoverySchema, { route: [] });
		return await this.sendPacket(z(q.RouteDiscoverySchema, t), G.PortNum.TRACEROUTE_APP, e);
	}
	async requestPosition(e) {
		return await this.sendPacket(/* @__PURE__ */ new Uint8Array(), G.PortNum.POSITION_APP, e);
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
		this.log.debug(X[X.Disconnect], "🔌 Disconnecting from device"), this._heartbeatIntervalId !== void 0 && clearInterval(this._heartbeatIntervalId), this.complete(), await this.transport.toDevice.close(), await this.transport.disconnect();
	}
	handleMeshPacket(e) {
		switch (this.events.onMeshPacket.dispatch(e), e.from !== this.myNodeInfo.myNodeNum && this.events.onMeshHeartbeat.dispatch(/* @__PURE__ */ new Date()), e.payloadVariant.case) {
			case "decoded":
				this.handleDecodedPacket(e.payloadVariant.value, e);
				break;
			case "encrypted":
				this.log.debug(X[X.HandleMeshPacket], "🔐 Device received encrypted data packet, ignoring.");
				break;
			default: throw Error(`Unhandled case ${e.payloadVariant.case}`);
		}
	}
	handleDecodedPacket(e, t) {
		let n, r, i = {
			id: t.id,
			rxTime: /* @__PURE__ */ new Date(t.rxTime * 1e3),
			type: t.to === Hg.broadcastNum ? "broadcast" : "direct",
			from: t.from,
			to: t.to,
			channel: t.channel
		};
		switch (this.log.trace(X[X.HandleMeshPacket], `📦 Received ${G.PortNum[e.portnum]} packet`), e.portnum) {
			case G.PortNum.TEXT_MESSAGE_APP:
				this.events.onMessagePacket.dispatch({
					...i,
					data: new TextDecoder().decode(e.payload)
				});
				break;
			case G.PortNum.REMOTE_HARDWARE_APP:
				this.events.onRemoteHardwarePacket.dispatch({
					...i,
					data: xf(Eg.HardwareMessageSchema, e.payload)
				});
				break;
			case G.PortNum.POSITION_APP:
				this.events.onPositionPacket.dispatch({
					...i,
					data: xf(q.PositionSchema, e.payload)
				});
				break;
			case G.PortNum.NODEINFO_APP:
				this.events.onUserPacket.dispatch({
					...i,
					data: xf(q.UserSchema, e.payload)
				});
				break;
			case G.PortNum.ROUTING_APP:
				switch (r = xf(q.RoutingSchema, e.payload), this.events.onRoutingPacket.dispatch({
					...i,
					data: r
				}), r.variant.case) {
					case "errorReason":
						r.variant.value === q.Routing_Error.NONE ? this.queue.processAck(e.requestId) : this.queue.processError({
							id: e.requestId,
							error: r.variant.value
						});
						break;
					case "routeReply":
					case "routeRequest": break;
					default: throw Error(`Unhandled case ${r.variant.case}`);
				}
				break;
			case G.PortNum.ADMIN_APP:
				switch (n = xf(Y.AdminMessageSchema, e.payload), n.payloadVariant.case) {
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
						this.log.debug(X[X.GetMetadata], `🏷️ Received metadata packet from ${e.source}`), this.events.onDeviceMetadataPacket.dispatch({
							...i,
							data: n.payloadVariant.value
						});
						break;
					case "getCannedMessageModuleMessagesResponse":
						this.log.debug(X[X.GetMetadata], "🥫 Received CannedMessage Module Messages response packet"), this.events.onCannedMessageModulePacket.dispatch({
							...i,
							data: n.payloadVariant.value
						});
						break;
					default: this.log.error(X[X.HandleMeshPacket], `⚠️ Received unhandled AdminMessage, type ${n.payloadVariant.case ?? "undefined"}`, e.payload);
				}
				break;
			case G.PortNum.WAYPOINT_APP:
				this.events.onWaypointPacket.dispatch({
					...i,
					data: xf(q.WaypointSchema, e.payload)
				});
				break;
			case G.PortNum.AUDIO_APP:
				this.events.onAudioPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.DETECTION_SENSOR_APP:
				this.events.onDetectionSensorPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.REPLY_APP:
				this.events.onPingPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.IP_TUNNEL_APP:
				this.events.onIpTunnelPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.PAXCOUNTER_APP:
				this.events.onPaxcounterPacket.dispatch({
					...i,
					data: xf(hg.PaxcountSchema, e.payload)
				});
				break;
			case G.PortNum.SERIAL_APP:
				this.events.onSerialPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.STORE_FORWARD_APP:
				this.events.onStoreForwardPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.RANGE_TEST_APP:
				this.events.onRangeTestPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.TELEMETRY_APP:
				this.events.onTelemetryPacket.dispatch({
					...i,
					data: xf(dm.TelemetrySchema, e.payload)
				});
				break;
			case G.PortNum.ZPS_APP:
				this.events.onZpsPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.SIMULATOR_APP:
				this.events.onSimulatorPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.TRACEROUTE_APP:
				this.events.onTraceRoutePacket.dispatch({
					...i,
					data: xf(q.RouteDiscoverySchema, e.payload)
				});
				break;
			case G.PortNum.NEIGHBORINFO_APP:
				this.events.onNeighborInfoPacket.dispatch({
					...i,
					data: xf(q.NeighborInfoSchema, e.payload)
				});
				break;
			case G.PortNum.ATAK_PLUGIN:
				this.events.onAtakPluginPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.MAP_REPORT_APP:
				this.events.onMapReportPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.PRIVATE_APP:
				this.events.onPrivatePacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			case G.PortNum.ATAK_FORWARDER:
				this.events.onAtakForwarderPacket.dispatch({
					...i,
					data: e.payload
				});
				break;
			default: throw Error(`Unhandled case ${e.portnum}`);
		}
	}
}, F_ = class e {
	static async create(t) {
		let n = await navigator.serial.requestPort();
		return await n.open({ baudRate: t || 115200 }), new e(n);
	}
	static async createFromPort(t, n) {
		return t.readable && t.writable || await t.open({ baudRate: n || 115200 }), new e(t);
	}
	constructor(e) {
		if (this.pipePromise = null, this.lastStatus = s_.DeviceStatusEnum.DeviceDisconnected, this.closingByUser = !1, !e.readable || !e.writable) throw Error("Stream not accessible");
		this.connection = e, this.portReadable = e.readable, this.abortController = new AbortController();
		let t = this.abortController, n = M_.toDeviceStream();
		this.pipePromise = n.readable.pipeTo(e.writable, { signal: this.abortController.signal }).catch((e) => {
			t.signal.aborted || (console.error("Error piping data to serial port:", e), this.connection.close().catch(() => {}), this.emitStatus(s_.DeviceStatusEnum.DeviceDisconnected, "write-error"));
		}), this._toDevice = n.writable, this._fromDevice = new ReadableStream({ start: async (e) => {
			this.fromDeviceController = e, this.emitStatus(s_.DeviceStatusEnum.DeviceConnecting);
			let t = this.portReadable.pipeThrough(M_.fromDeviceStream()), n = t.getReader(), r = (e) => {
				let { port: t } = e;
				t && t === this.connection && this.emitStatus(s_.DeviceStatusEnum.DeviceDisconnected, "serial-disconnected");
			};
			navigator.serial.addEventListener("disconnect", r), this.emitStatus(s_.DeviceStatusEnum.DeviceConnected);
			try {
				for (;;) {
					let { value: t, done: r } = await n.read();
					if (r) break;
					e.enqueue(t);
				}
				e.close();
			} catch (n) {
				this.closingByUser || this.emitStatus(s_.DeviceStatusEnum.DeviceDisconnected, "read-error"), e.error(n instanceof Error ? n : Error(String(n)));
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
			this.emitStatus(s_.DeviceStatusEnum.DeviceDisconnected, "user"), this.closingByUser = !1;
		}
	}
	async reconnect() {
		this.emitStatus(s_.DeviceStatusEnum.DeviceConnecting, "reconnect");
		try {
			if (!this.connection.readable || !this.connection.writable) throw Error("Stream not accessible");
			this.portReadable = this.connection.readable, this.abortController = new AbortController();
			let e = this.abortController;
			this.pipePromise = M_.toDeviceStream().readable.pipeTo(this.connection.writable, { signal: this.abortController.signal }).catch((t) => {
				e.signal.aborted || (console.error("Error piping data to serial port (reconnect):", t), this.emitStatus(s_.DeviceStatusEnum.DeviceDisconnected, "write-error"));
			}), this.emitStatus(s_.DeviceStatusEnum.DeviceConnected, "reconnected");
		} catch (e) {
			throw this.emitStatus(s_.DeviceStatusEnum.DeviceDisconnected, "reconnect-failed"), e;
		}
	}
}, I_ = 287, L_ = (e) => e >= 1024 ? (e / 1024).toFixed(e % 1024 ? 2 : 0).replace(".", ",") + " MB" : e + " KB", R_ = (e, t = 8) => "0x" + e.toString(16).padStart(t, "0"), z_ = (e) => new TextDecoder().decode(e.subarray(0, Math.max(0, e.indexOf(0) < 0 ? e.length : e.indexOf(0)))), B_ = (e, t) => (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0, V_ = {
	32: "XMC / Micron",
	104: "Boya",
	200: "GigaDevice",
	239: "Winbond",
	161: "Fudan",
	133: "Puya",
	94: "Zbit",
	11: "XTX",
	28: "EON",
	194: "Macronix"
}, H_ = {
	0: "App",
	1: "Daten"
}, U_ = {
	0: "factory",
	16: "ota_0",
	17: "ota_1",
	32: "test"
}, W_ = {
	0: "otadata",
	1: "phy",
	2: "nvs",
	3: "coredump",
	4: "nvs_keys",
	5: "efuse",
	129: "fat",
	130: "spiffs",
	131: "littlefs"
};
function G_(e) {
	let t = [];
	for (let n = 0; n + 32 <= e.length && e[n] === 170 && e[n + 1] === 80; n += 32) {
		let r = e[n + 2], i = e[n + 3];
		t.push({
			label: z_(e.subarray(n + 12, n + 28)),
			type: r,
			sub: i,
			typeName: H_[r] ?? "Typ " + r,
			subName: (r === 0 ? U_[i] : W_[i]) ?? R_(i, 2),
			offset: B_(e, n + 4),
			size: B_(e, n + 8)
		});
	}
	return t;
}
function K_(e) {
	return e[0] !== 233 || B_(e, 32) !== 0xabcd5432 ? null : {
		version: z_(e.subarray(48, 80)),
		project: z_(e.subarray(80, 112)),
		time: z_(e.subarray(112, 128)),
		date: z_(e.subarray(128, 144)),
		idf: z_(e.subarray(144, 176))
	};
}
async function q_(e) {
	let t = e.chip, n = { sections: [] }, r = [];
	r.push(["Chip", await t.getChipDescription(e)]), r.push(["Funktionen", (await t.getChipFeatures(e)).join(", ")]), r.push(["Quarz", await t.getCrystalFreq(e) + " MHz"]), r.push(["MAC-Adresse", await t.readMac(e)]), n.sections.push(["Chip", r]);
	let i = [], a = await e.readFlashId(), o = a & 255, s = a >> 8 & 65535, c = e.DETECTED_FLASH_SIZES[a >> 16 & 255];
	n.flashSize = c, i.push(["Flash-Chip", (V_[o] ?? "Hersteller " + R_(o, 2)) + ", ID " + R_(s, 4)]), i.push(["Flash-Größe", c ? c.replace("MB", " MB").replace("KB", " KB") : "unbekannt"]);
	let l = await t.getPsramCap(e);
	i.push(["PSRAM (im Chip)", {
		0: "keins",
		1: "8 MB",
		2: "2 MB"
	}[l] ?? "unbekannt (" + l + ")"]), n.sections.push(["Speicher", i]);
	let u = G_(await e.readFlash(32768, 3072));
	if (u.length) {
		let t = [];
		for (let n of u.filter((e) => e.type === 0)) {
			let r = K_(await e.readFlash(n.offset, 256));
			t.push(["Partition „" + n.label + "“", r ? `${r.version || "?"} (${r.project}, gebaut ${r.date} ${r.time}, IDF ${r.idf})` : "leer / keine gültige Firmware"]);
		}
		n.sections.push(["Installierte Firmware", t]), n.sections.push(["Partitionen", u.map((e) => [e.label, `${e.typeName}/${e.subName} · ab ${R_(e.offset, 6)} · ${L_(Math.round(e.size / 1024))}`])]);
	} else n.sections.push(["Installierte Firmware", [["Partitionstabelle", "nicht gefunden – Gerät ist leer oder gelöscht"]]]);
	return n;
}
function J_(e, t) {
	return new Promise((n, r) => setTimeout(() => r(Object.assign(Error(t), { de: !0 })), e));
}
async function Y_(e, t = () => {}, n = 9e3) {
	t("Warte auf den Start der Firmware …"), await new Promise((e) => setTimeout(e, n)), t("Frage die laufende Firmware ab …");
	let r = new P_(await F_.createFromPort(e, 115200)), i = {
		config: {},
		kira: null,
		kiraInfo: null,
		fsTotal: null
	}, a = r.events;
	a.onMyNodeInfo.subscribe((e) => i.my = e), a.onDeviceMetadataPacket.subscribe((e) => i.meta = e.data), a.onNodeInfoPacket.subscribe((e) => {
		i.my && e.num === i.my.myNodeNum ? i.me = e : (i.nodes ??= /* @__PURE__ */ new Set()).add(e.num);
	}), a.onConfigPacket.subscribe((e) => e.payloadVariant.case && (i.config[e.payloadVariant.case] = e.payloadVariant.value)), a.onMeshPacket.subscribe((e) => {
		let t = e?.payloadVariant?.case === "decoded" ? e.payloadVariant.value : null;
		if (!t || t.portnum !== I_) return;
		let n = new TextDecoder().decode(t.payload).split("|");
		n[0] === "m" && (i.kira = {
			mode: n[1],
			version: n[2]
		}), n[0] === "i" && (i.kiraInfo = n.slice(1)), n[0] === "f" && (i.fsTotal = +n[1]);
	});
	try {
		let e = new Promise((e) => a.onDeviceStatus.subscribe((t) => t === 7 && e()));
		r.configure().catch(() => {}), await Promise.race([e, J_(3e4, "Keine Antwort von der Firmware.")]);
		let t = (e) => r.sendPacket(new TextEncoder().encode(e), I_, "self", 0, !1, !1).catch(() => {});
		t("get"), t("info"), await new Promise((e) => setTimeout(e, 2500));
	} catch {
		if (!i.my) return await r.disconnect().catch(() => {}), null;
	}
	return await r.disconnect().catch(() => {}), X_(i);
}
function X_(e) {
	let t = Of, n = [], r = [], i = e.me?.user;
	if (i && r.push(["Name", `${i.longName} (${i.shortName})`]), e.my && r.push(["Knoten-Nr.", "!" + e.my.myNodeNum.toString(16).padStart(8, "0")]), e.meta && (r.push(["Meshtastic-Firmware", e.meta.firmwareVersion]), r.push(["Hardware", e.meta.hwModel === 107 ? "Elecrow ThinkNode M5" : t.Mesh.HardwareModel[e.meta.hwModel] ?? String(e.meta.hwModel)]), r.push(["Kann", [
		e.meta.hasWifi && "WLAN",
		e.meta.hasBluetooth && "Bluetooth",
		e.meta.hasEthernet && "Ethernet"
	].filter(Boolean).join(", ") || "–"])), e.config.device && r.push(["Rolle", t.Config.Config_DeviceConfig_Role[e.config.device.role] ?? String(e.config.device.role)]), e.config.lora && (r.push(["Region", t.Config.Config_LoRaConfig_RegionCode[e.config.lora.region] ?? String(e.config.lora.region)]), r.push(["Funk-Profil", t.Config.Config_LoRaConfig_ModemPreset[e.config.lora.modemPreset] ?? String(e.config.lora.modemPreset)])), r.push(["Bekannte Knoten", String(e.nodes?.size ?? 0)]), n.push(["Laufende Firmware", r]), e.kira || e.kiraInfo) {
		let t = [];
		e.kira && (t.push(["ThinkKira-Version", e.kira.version]), t.push(["Funkmodus", e.kira.mode === "kira" ? "Kira-Funk" : "Meshtastic"]));
		let r = e.kiraInfo;
		if (r) {
			let [, n, i, a, o, s, c, l, u, d, f, p, m] = r;
			t.push(["GPS-Hardware", n === "v2" ? "v2.0 (AG3352)" : "v1.0 (L76K)"]), t.push(["Flash (laut Firmware)", L_(+i) + (a === i ? "" : " (Firmware gebaut für " + L_(+a) + ")")]), t.push(["Firmware-Größe", `${L_(+o)} von ${L_(+s)} (frei ${L_(+s - o)})`]), t.push(["Dateisystem", L_(+c) + (e.fsTotal ? " von " + L_(e.fsTotal) + " belegt" : " belegt")]), t.push(["PSRAM", `${l} MB eingebaut, ${+u ? L_(+u) + " genutzt" : "nicht genutzt"}`]), t.push(["Freier Arbeitsspeicher", L_(+d)]), +f >= 0 && t.push(["Akku", `${f} % (${(p / 1e3).toFixed(2).replace(".", ",")} V)${m === "1" ? ", USB angeschlossen" : ""}`]);
		}
		n.push(["ThinkKira", t]);
	} else n.push(["ThinkKira", [["ThinkKira-Modul", "nicht gefunden – auf dem Gerät läuft keine (aktuelle) ThinkKira-Firmware"]]]);
	return n;
}
// src/loader.js
var Z_, Q_, $_, e1 = !1, Q = {}, t1 = {
	"2MB": 2,
	"4MB": 4,
	"8MB": 8,
	"16MB": 16,
	"32MB": 32
}, n1 = 262144;
function $(e, t = "") {
	let n = {
		ok: "alert alert-success",
		bad: "alert alert-danger"
	}[t] || "text-muted";
	Q.status.className = "mt-3 mb-0 " + n, Q.status.textContent = e;
}
function r1(e, t = !1) {
	Q.progress.classList.toggle("d-none", e <= 0), Q.bar.className = t ? "progress-bar bg-success" : "progress-bar progress-bar-striped progress-bar-animated", Q.bar.style.width = e + "%", Q.bar.textContent = e + " %", Q.progress.setAttribute("aria-valuenow", String(e));
}
function i1(e) {
	e1 = e;
	let t = "serial" in navigator, n = Q.src?.value || "tk:latest";
	Q.btn.disabled = e || !t || n === "tk:latest" && !$_ || n === "file" && !Q.own.files?.[0], Q.backup.disabled = e || !t, Q.restore.disabled = e || !t, Q.read.disabled = e || !t;
}
var a1 = [];
function o1(e, t = !1) {
	a1 = t ? a1.concat(e) : e;
	let n = a1.map(([e, t]) => N("div", { class: "col-lg-6" }, N("fieldset", { class: "border rounded p-3 h-100" }, N("legend", { class: "float-none w-auto px-1 fs-6 fw-bold" }, e), N("table", { class: "table table-sm mb-0" }, N("tbody", {}, ...t.map(([e, t]) => N("tr", {}, N("th", { class: "fw-normal text-muted w-50" }, e), N("td", {}, t)))))))), r = N("button", {
		type: "button",
		class: "btn btn-sm btn-outline-secondary mt-3",
		onclick: s1
	}, N("i", { class: "fas fa-file-download me-1" }), "Infos als Datei speichern");
	Q.info.replaceChildren(N("h6", { class: "fw-bold mt-4" }, "Geräte-Infos"), N("div", { class: "row g-3" }, ...n), r);
}
function s1() {
	let e = ["ThinkKira – Geräte-Infos (" + (/* @__PURE__ */ new Date()).toLocaleString("de-DE") + ")", ""];
	for (let [t, n] of a1) {
		e.push("== " + t + " ==");
		for (let [t, r] of n) e.push(t + ": " + r);
		e.push("");
	}
	y1(new TextEncoder().encode(e.join("\n")), "thinkkira-geraeteinfo.txt");
}
async function c1() {
	try {
		$_ = await (await fetch(Q_ + "?asset=manifest.json", { cache: "no-store" })).json(), Q.version.textContent = $_.version, $_.release_url && (Q.gh.href = $_.release_url);
	} catch {
		$_ = null, Q.version.textContent = "nicht erreichbar", $("Das neueste Release konnte nicht geladen werden. Backup geht trotzdem.", "bad");
	}
	i1(e1), m1();
}
async function l1() {
	$("Port auswählen …");
	let e = await navigator.serial.requestPort();
	$("Verbinde mit dem Gerät …");
	let t = new Ii(e, !1), n = new Tc({
		transport: t,
		baudrate: 921600,
		terminal: {
			clean() {},
			write() {},
			writeLine() {}
		}
	});
	try {
		let e = await n.main();
		if (!/ESP32-S3/i.test(e)) throw Dc("Falscher Chip: " + e + " (erwartet ESP32-S3)");
	} catch (e) {
		throw await t.disconnect().catch(() => {}), e;
	}
	return {
		loader: n,
		transport: t,
		port: e
	};
}
function u1(e) {
	return console.error(e), "Fehler: " + Oc(e);
}
async function d1(e) {
	if (e1) return;
	i1(!0), r1(0);
	let t;
	try {
		await e((e) => t = e);
	} catch (e) {
		$(u1(e), "bad");
	} finally {
		await t?.transport?.disconnect().catch(() => {}), i1(!1);
	}
}
async function f1(e, t, n, r) {
	r && ($("Gerät wird komplett gelöscht (ca. 20 s) …"), await e.eraseFlash()), $("Wird geschrieben …"), await e.writeFlash({
		fileArray: [{
			data: t,
			address: n
		}],
		flashSize: "keep",
		flashMode: "keep",
		flashFreq: "keep",
		eraseAll: !1,
		compress: !0,
		reportProgress: (e, t, n) => r1(Math.round(t / n * 100))
	}), $("Neustart …"), await p1(e), r1(100, !0);
}
async function p1(e) {
	try {
		await e.writeReg(0x6000812c, 0, 1), await e.writeReg(0x600080b0, 0x50d83aa1), await e.writeReg(0x6000809c, 2e3), await e.writeReg(0x60008098, -805306110), await e.writeReg(0x600080b0, 0), await new Promise((e) => setTimeout(e, 300));
	} catch (t) {
		console.warn("Watchdog-Neustart:", t), await e.after().catch(() => {});
	}
}
async function m1() {
	let [e, t] = await Promise.all([fetch(Q_ + "?releases=1").then((e) => e.ok ? e.json() : []).catch(() => []), fetch(Q_ + "?mt=info").then((e) => e.ok ? e.json() : null).catch(() => null)]), n = Q.src.value, r = [N("option", { value: "tk:latest" }, "ThinkKira " + ($_?.version ?? "") + " (neueste, empfohlen)")], i = (Array.isArray(e) ? e : []).filter((e) => e.tag.slice(1) !== $_?.version);
	if (i.length && r.push(N("optgroup", { label: "Ältere ThinkKira-Versionen" }, ...i.map((e) => N("option", { value: "tk:" + e.tag }, "ThinkKira " + e.tag.slice(1) + (e.date ? " vom " + e.date.split("-").reverse().join(".") : ""))))), t?.version) {
		let e = N("optgroup", { label: "Original Meshtastic (ohne ThinkKira-Funktionen)" }, N("option", { value: "mt:m5" }, "Meshtastic " + t.version));
		t.inkhud && e.append(N("option", { value: "mt:m5-inkhud" }, "Meshtastic " + t.version + " mit InkHUD-Anzeige")), r.push(e);
	}
	r.push(N("option", { value: "file" }, "Eigene Firmware-Datei (.bin) vom PC …")), Q.src.replaceChildren(...r), Q.src.value = [...Q.src.querySelectorAll("option")].some((e) => e.value === n) ? n : "tk:latest", h1();
}
function h1() {
	let e = Q.src.value;
	Q.ownBox.classList.toggle("d-none", e !== "file"), Q.srcHint.textContent = e.startsWith("mt:") ? "Achtung: Mit der originalen Meshtastic-Firmware fehlen Kira-Funk, eigene Oberfläche, Navigation und Offline-Karte. Zurück zu ThinkKira geht jederzeit hier im Loader." : e === "file" ? "Erlaubt sind komplette Abbilder (*.factory.bin, an Adresse 0) und reine App-Dateien (*.bin, an Adresse 0x10000). Nur Dateien für den ESP32-S3 im ThinkNode M5 verwenden!" : e === "tk:latest" ? "" : "Ältere Version: nur nötig, wenn die neueste Probleme macht. Einstellungen können dabei verloren gehen.", i1(e1);
}
function g1(e) {
	if (e.length > 32770 && e[0] === 233 && e[32768] === 170 && e[32769] === 80) return 0;
	if (e.length > 4096 && e[0] === 233) return 65536;
	throw Dc("Die Datei ist keine ESP32-Firmware (.bin).");
}
async function _1(e) {
	$("Firmware wird geladen …");
	let t = await fetch(e, { cache: "no-store" });
	if (!t.ok) throw Dc("Download fehlgeschlagen (" + t.status + ")");
	return new Uint8Array(await t.arrayBuffer());
}
function v1() {
	let e = Q.src.value, t = Q.own.files?.[0];
	d1(async (n) => {
		let r, i = 0, a;
		if (e === "tk:latest") {
			let e = $_?.builds?.[0]?.parts?.[0];
			if (!e) throw Dc("Das neueste Release ist nicht erreichbar.");
			r = await _1(new URL(e.path, new URL(Q_ + "?asset=manifest.json", location.href)).href), i = e.offset ?? 0, a = "ThinkKira " + $_.version;
		} else if (e.startsWith("tk:")) r = await _1(Q_ + "?tag=" + encodeURIComponent(e.slice(3)) + "&asset=thinkkira-m5.factory.bin"), a = "ThinkKira " + e.slice(4);
		else if (e.startsWith("mt:")) r = await _1(Q_ + "?mt=" + encodeURIComponent(e.slice(3))), a = "Meshtastic" + (e === "mt:m5-inkhud" ? " (InkHUD)" : "");
		else {
			if (!t) throw Dc("Bitte zuerst eine Firmware-Datei wählen.");
			r = new Uint8Array(await t.arrayBuffer()), i = g1(r), a = "„" + t.name + "“";
		}
		if (r.length < 4096 || r[0] !== 233) throw Dc("Die geladene Datei ist keine gültige Firmware.");
		let { loader: o } = n(await l1());
		$("Lese Geräte-Infos vor dem Update …"), o1((await q_(o)).sections), await f1(o, r, i, Q.erase.checked && i === 0), $("Fertig! " + a + " ist installiert. Das Gerät startet neu.", "ok");
	});
}
function y1(e, t) {
	let n = URL.createObjectURL(new Blob([e], { type: "application/octet-stream" })), r = N("a", {
		href: n,
		download: t
	});
	document.body.append(r), r.click(), r.remove(), setTimeout(() => URL.revokeObjectURL(n), 1e4);
}
function b1() {
	d1(async (e) => {
		let { loader: t } = e(await l1());
		$("Lese Geräte-Infos …");
		let n = await q_(t);
		o1(n.sections);
		let r = n.flashSize || "4MB", i = (t1[r] || 4) * 1024 * 1024, a = new Uint8Array(i);
		$("Backup wird gelesen (" + r.replace("MB", " MB") + ", ca. 1–2 Minuten) …");
		for (let e = 0; e < i; e += n1) {
			let n = Math.min(n1, i - e);
			a.set(await t.readFlash(e, n), e), r1(Math.round((e + n) / i * 100));
		}
		await p1(t), r1(100, !0), y1(a, "thinkkira-backup-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[:T]/g, "-") + ".bin"), $("Backup gespeichert (" + r.replace("MB", " MB") + "). Die Datei enthält Firmware, Einstellungen, Knoten und Schlüssel – sicher aufbewahren!", "ok");
	});
}
function x1() {
	d1(async (e) => {
		let t = e(await l1());
		$("Lese Chip, Speicher und installierte Firmware …"), r1(30), o1((await q_(t.loader)).sections), r1(50), await p1(t.loader), await t.transport.disconnect().catch(() => {}), e(null);
		let n = await Y_(t.port, (e) => $(e));
		r1(100, !0), n ? (o1(n, !0), $("Gerät ausgelesen. Nichts wurde verändert.", "ok")) : (o1([["Laufende Firmware", [["Status", "hat beim Auslesen nicht geantwortet"]]]], !0), $("Chip und Speicher ausgelesen, nichts wurde verändert. Die laufende Firmware hat nach dem Neustart nicht rechtzeitig geantwortet. Das heißt nicht, dass keine Firmware drauf ist: Zeigt das Display die ThinkKira-Oberfläche, ist alles in Ordnung. Die genaue Version steht im Konfigurator unter ThinkKira.", "ok"));
	});
}
function S1() {
	Q.file.value = "", Q.file.click();
}
function C1() {
	let e = Q.file.files?.[0];
	e && d1(async (t) => {
		let n = new Uint8Array(await e.arrayBuffer());
		if (n.length < 65536 || n.length % 4096) throw Dc("Die Datei ist kein vollständiges Backup.");
		let { loader: r } = t(await l1());
		await f1(r, n, 0, !1), $("Backup „" + e.name + "“ wurde zurückgespielt. Das Gerät startet neu.", "ok");
	});
}
function w1(e = "#tk-loader") {
	if (Z_ = typeof e == "string" ? document.querySelector(e) : e, !Z_) return;
	Q_ = Z_.dataset.firmware || window.TK_FIRMWARE_PHP || "firmware.php", Z_.classList.add("tk-loader");
	let t = (e) => N("i", { class: "fas fa-" + e + " me-1" });
	Q.version = N("strong", {}, "wird geladen …"), Q.gh = N("a", {
		href: "https://github.com/Kirakodo/ThinkKiraM5/releases/latest",
		target: "_blank",
		rel: "noopener"
	}, "GitHub"), Q.erase = N("input", {
		type: "checkbox",
		id: "tk-erase",
		class: "form-check-input"
	}), Q.erase.checked = !0, Q.btn = N("button", {
		type: "button",
		class: "btn btn-primary",
		onclick: v1
	}, t("download"), "Installieren / Aktualisieren"), Q.src = N("select", {
		id: "tk-src",
		class: "form-select",
		onchange: h1
	}, N("option", { value: "tk:latest" }, "ThinkKira (neueste, empfohlen)")), Q.own = N("input", {
		type: "file",
		accept: ".bin",
		class: "form-control",
		"aria-label": "Firmware-Datei",
		onchange: () => i1(e1)
	}), Q.ownBox = N("div", { class: "mb-2 d-none" }, Q.own), Q.srcHint = N("div", { class: "form-text mb-2" }), Q.backup = N("button", {
		type: "button",
		class: "btn btn-outline-secondary",
		onclick: b1
	}, t("save"), "Backup erstellen"), Q.read = N("button", {
		type: "button",
		class: "btn btn-outline-secondary",
		onclick: x1
	}, t("info-circle"), "Gerät auslesen"), Q.info = N("div"), Q.restore = N("button", {
		type: "button",
		class: "btn btn-outline-secondary",
		onclick: S1
	}, t("upload"), "Backup zurückspielen"), Q.file = N("input", {
		type: "file",
		accept: ".bin",
		class: "d-none",
		onchange: C1
	}), Q.status = N("p", {
		class: "mt-3 mb-0 text-muted",
		role: "status"
	}), Q.bar = N("div", {
		class: "progress-bar",
		style: "width:0%"
	}), Q.progress = N("div", {
		class: "progress mt-3 d-none",
		role: "progressbar",
		"aria-valuemin": "0",
		"aria-valuemax": "100",
		"aria-valuenow": "0"
	}, Q.bar);
	let n = [
		"serial" in navigator ? null : N("div", { class: "alert alert-warning" }, t("exclamation-triangle"), "Dieser Browser kann keine USB-Geräte ansprechen. Bitte Chrome oder Edge am PC nutzen."),
		N("p", { class: "text-muted" }, "aktuelle Version ", Q.version, " · ", Q.gh),
		N("ol", {}, N("li", {}, "Chrome oder Edge am PC verwenden."), N("li", {}, "ThinkNode M5 per USB-C anschließen."), N("li", {}, "Vor dem ersten Aufspielen am besten „Backup erstellen“."), N("li", {}, "Firmware wählen (normalerweise die neueste ThinkKira), dann „Installieren / Aktualisieren“ klicken und den Port wählen.")),
		N("label", {
			class: "form-label",
			for: "tk-src"
		}, "Firmware"),
		Q.src,
		N("div", { class: "mt-2" }, Q.ownBox),
		Q.srcHint,
		N("div", { class: "form-check mb-3" }, Q.erase, N("label", {
			class: "form-check-label",
			for: "tk-erase"
		}, "Gerät vorher komplett löschen (empfohlen beim ersten Mal, löscht alle Einstellungen)")),
		N("div", { class: "d-flex flex-wrap gap-2" }, Q.btn, Q.read, Q.backup, Q.restore),
		N("p", { class: "form-text mb-0 mt-2" }, "„Gerät auslesen“ zeigt Chip, Speicher, installierte Firmware und Einstellungen, ohne etwas zu ändern. Das Backup ist ein komplettes Abbild des Geräts (Firmware, Einstellungen, Knoten, Schlüssel) als .bin-Datei. Zurückspielen stellt genau diesen Stand wieder her."),
		Q.file,
		Q.progress,
		Q.status,
		Q.info
	];
	Z_.replaceChildren(...n.filter(Boolean)), i1(!1), c1();
}
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => w1()) : w1());
export { w1 as mount };
