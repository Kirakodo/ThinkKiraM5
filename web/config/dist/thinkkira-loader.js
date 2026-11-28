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
// src/shim.js
globalThis.process === void 0 && (globalThis.process = {
	env: {},
	versions: {},
	platform: "browser",
	cwd: () => "/"
});
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
var x = 29, S = 256, C = 286, w = 30, T = 19, E = 573, D = 15, O = 16, ee = 7, te = 256, ne = 16, re = 17, ie = 18, ae = new Uint8Array([
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
]), oe = new Uint8Array([
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
]), se = new Uint8Array([
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
]), ce = new Uint8Array([
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
]), le = 512, k = Array(576);
b(k);
var ue = Array(60);
b(ue);
var de = Array(le);
b(de);
var fe = Array(256);
b(fe);
var pe = Array(x);
b(pe);
var me = Array(w);
b(me);
function he(e, t, n, r, i) {
	this.static_tree = e, this.extra_bits = t, this.extra_base = n, this.elems = r, this.max_length = i, this.has_stree = e && e.length;
}
var ge, _e, ve;
function ye(e, t) {
	this.dyn_tree = e, this.max_code = 0, this.stat_desc = t;
}
var be = (e) => e < 256 ? de[e] : de[256 + (e >>> 7)], xe = (e, t) => {
	e.pending_buf[e.pending++] = t & 255, e.pending_buf[e.pending++] = t >>> 8 & 255;
}, A = (e, t, n) => {
	e.bi_valid > O - n ? (e.bi_buf |= t << e.bi_valid & 65535, xe(e, e.bi_buf), e.bi_buf = t >> O - e.bi_valid, e.bi_valid += n - O) : (e.bi_buf |= t << e.bi_valid & 65535, e.bi_valid += n);
}, j = (e, t, n) => {
	A(e, n[t * 2], n[t * 2 + 1]);
}, Se = (e, t) => {
	let n = 0;
	do
		n |= e & 1, e >>>= 1, n <<= 1;
	while (--t > 0);
	return n >>> 1;
}, Ce = (e) => {
	e.bi_valid === 16 ? (xe(e, e.bi_buf), e.bi_buf = 0, e.bi_valid = 0) : e.bi_valid >= 8 && (e.pending_buf[e.pending++] = e.bi_buf & 255, e.bi_buf >>= 8, e.bi_valid -= 8);
}, we = (e, t) => {
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
}, Te = (e, t, n) => {
	let r = Array(16), i = 0, a, o;
	for (a = 1; a <= D; a++) i = i + n[a - 1] << 1, r[a] = i;
	for (o = 0; o <= t; o++) {
		let t = e[o * 2 + 1];
		t !== 0 && (e[o * 2] = Se(r[t]++, t));
	}
}, Ee = () => {
	let e, t, n, r, i, a = Array(16);
	for (n = 0, r = 0; r < 28; r++) for (pe[r] = n, e = 0; e < 1 << ae[r]; e++) fe[n++] = r;
	for (fe[n - 1] = r, i = 0, r = 0; r < 16; r++) for (me[r] = i, e = 0; e < 1 << oe[r]; e++) de[i++] = r;
	for (i >>= 7; r < w; r++) for (me[r] = i << 7, e = 0; e < 1 << oe[r] - 7; e++) de[256 + i++] = r;
	for (t = 0; t <= D; t++) a[t] = 0;
	for (e = 0; e <= 143;) k[e * 2 + 1] = 8, e++, a[8]++;
	for (; e <= 255;) k[e * 2 + 1] = 9, e++, a[9]++;
	for (; e <= 279;) k[e * 2 + 1] = 7, e++, a[7]++;
	for (; e <= 287;) k[e * 2 + 1] = 8, e++, a[8]++;
	for (Te(k, 287, a), e = 0; e < w; e++) ue[e * 2 + 1] = 5, ue[e * 2] = Se(e, 5);
	ge = new he(k, ae, 257, C, D), _e = new he(ue, oe, 0, w, D), ve = new he([], se, 0, T, ee);
}, De = (e) => {
	let t = 0;
	for (; t < C; t++) e.dyn_ltree[t * 2] = 0;
	for (t = 0; t < w; t++) e.dyn_dtree[t * 2] = 0;
	for (t = 0; t < T; t++) e.bl_tree[t * 2] = 0;
	e.dyn_ltree[te * 2] = 1, e.opt_len = e.static_len = 0, e.sym_next = e.matches = 0;
}, Oe = (e) => {
	e.bi_valid > 8 ? xe(e, e.bi_buf) : e.bi_valid > 0 && (e.pending_buf[e.pending++] = e.bi_buf), e.bi_buf = 0, e.bi_valid = 0;
}, ke = (e, t, n, r) => {
	let i = t * 2, a = n * 2;
	return e[i] < e[a] || e[i] === e[a] && r[t] <= r[n];
}, Ae = (e, t, n) => {
	let r = e.heap[n], i = n << 1;
	for (; i <= e.heap_len && (i < e.heap_len && ke(t, e.heap[i + 1], e.heap[i], e.depth) && i++, !ke(t, r, e.heap[i], e.depth));) e.heap[n] = e.heap[i], n = i, i <<= 1;
	e.heap[n] = r;
}, je = (e, t, n) => {
	let r, i, a = 0, o, s;
	if (e.sym_next !== 0) do
		r = e.pending_buf[e.sym_buf + a++] & 255, r += (e.pending_buf[e.sym_buf + a++] & 255) << 8, i = e.pending_buf[e.sym_buf + a++], r === 0 ? j(e, i, t) : (o = fe[i], j(e, o + S + 1, t), s = ae[o], s !== 0 && (i -= pe[o], A(e, i, s)), r--, o = be(r), j(e, o, n), s = oe[o], s !== 0 && (r -= me[o], A(e, r, s)));
	while (a < e.sym_next);
	j(e, te, t);
}, Me = (e, t) => {
	let n = t.dyn_tree, r = t.stat_desc.static_tree, i = t.stat_desc.has_stree, a = t.stat_desc.elems, o, s, c = -1, l;
	for (e.heap_len = 0, e.heap_max = E, o = 0; o < a; o++) n[o * 2] === 0 ? n[o * 2 + 1] = 0 : (e.heap[++e.heap_len] = c = o, e.depth[o] = 0);
	for (; e.heap_len < 2;) l = e.heap[++e.heap_len] = c < 2 ? ++c : 0, n[l * 2] = 1, e.depth[l] = 0, e.opt_len--, i && (e.static_len -= r[l * 2 + 1]);
	for (t.max_code = c, o = e.heap_len >> 1; o >= 1; o--) Ae(e, n, o);
	l = a;
	do
		o = e.heap[1], e.heap[1] = e.heap[e.heap_len--], Ae(e, n, 1), s = e.heap[1], e.heap[--e.heap_max] = o, e.heap[--e.heap_max] = s, n[l * 2] = n[o * 2] + n[s * 2], e.depth[l] = (e.depth[o] >= e.depth[s] ? e.depth[o] : e.depth[s]) + 1, n[o * 2 + 1] = n[s * 2 + 1] = l, e.heap[1] = l++, Ae(e, n, 1);
	while (e.heap_len >= 2);
	e.heap[--e.heap_max] = e.heap[1], we(e, t), Te(n, c, e.bl_count);
}, Ne = (e, t, n) => {
	let r, i = -1, a, o = t[1], s = 0, c = 7, l = 4;
	for (o === 0 && (c = 138, l = 3), t[(n + 1) * 2 + 1] = 65535, r = 0; r <= n; r++) a = o, o = t[(r + 1) * 2 + 1], ++s < c && a === o || (s < l ? e.bl_tree[a * 2] += s : a === 0 ? s <= 10 ? e.bl_tree[34]++ : e.bl_tree[36]++ : (a !== i && e.bl_tree[a * 2]++, e.bl_tree[32]++), s = 0, i = a, o === 0 ? (c = 138, l = 3) : a === o ? (c = 6, l = 3) : (c = 7, l = 4));
}, Pe = (e, t, n) => {
	let r, i = -1, a, o = t[1], s = 0, c = 7, l = 4;
	for (o === 0 && (c = 138, l = 3), r = 0; r <= n; r++) if (a = o, o = t[(r + 1) * 2 + 1], !(++s < c && a === o)) {
		if (s < l) do
			j(e, a, e.bl_tree);
		while (--s !== 0);
		else a === 0 ? s <= 10 ? (j(e, re, e.bl_tree), A(e, s - 3, 3)) : (j(e, ie, e.bl_tree), A(e, s - 11, 7)) : (a !== i && (j(e, a, e.bl_tree), s--), j(e, ne, e.bl_tree), A(e, s - 3, 2));
		s = 0, i = a, o === 0 ? (c = 138, l = 3) : a === o ? (c = 6, l = 3) : (c = 7, l = 4);
	}
}, Fe = (e) => {
	let t;
	for (Ne(e, e.dyn_ltree, e.l_desc.max_code), Ne(e, e.dyn_dtree, e.d_desc.max_code), Me(e, e.bl_desc), t = 18; t >= 3 && e.bl_tree[ce[t] * 2 + 1] === 0; t--);
	return e.opt_len += 3 * (t + 1) + 5 + 5 + 4, t;
}, Ie = (e, t, n, r) => {
	let i;
	for (A(e, t - 257, 5), A(e, n - 1, 5), A(e, r - 4, 4), i = 0; i < r; i++) A(e, e.bl_tree[ce[i] * 2 + 1], 3);
	Pe(e, e.dyn_ltree, t - 1), Pe(e, e.dyn_dtree, n - 1);
}, Le = (e) => {
	let t = 0xf3ffc07f, n = 0;
	for (; n <= 31; n++, t >>>= 1) if (t & 1 && e.dyn_ltree[n * 2] !== 0) return _;
	if (e.dyn_ltree[18] !== 0 || e.dyn_ltree[20] !== 0 || e.dyn_ltree[26] !== 0) return v;
	for (n = 32; n < S; n++) if (e.dyn_ltree[n * 2] !== 0) return v;
	return _;
}, Re = !1, ze = (e) => {
	Re ||= (Ee(), !0), e.l_desc = new ye(e.dyn_ltree, ge), e.d_desc = new ye(e.dyn_dtree, _e), e.bl_desc = new ye(e.bl_tree, ve), e.bi_buf = 0, e.bi_valid = 0, De(e);
}, Be = (e, t, n, r) => {
	A(e, +!!r, 3), Oe(e), xe(e, n), xe(e, ~n), n && e.pending_buf.set(e.window.subarray(t, t + n), e.pending), e.pending += n;
}, Ve = {
	_tr_init: ze,
	_tr_stored_block: Be,
	_tr_flush_block: (e, t, n, r) => {
		let i, a, o = 0;
		e.level > 0 ? (e.strm.data_type === y && (e.strm.data_type = Le(e)), Me(e, e.l_desc), Me(e, e.d_desc), o = Fe(e), i = e.opt_len + 3 + 7 >>> 3, a = e.static_len + 3 + 7 >>> 3, a <= i && (i = a)) : i = a = n + 5, n + 4 <= i && t !== -1 ? Be(e, t, n, r) : e.strategy === g || a === i ? (A(e, 2 + +!!r, 3), je(e, k, ue)) : (A(e, 4 + +!!r, 3), Ie(e, e.l_desc.max_code + 1, e.d_desc.max_code + 1, o + 1), je(e, e.dyn_ltree, e.dyn_dtree)), De(e), r && Oe(e);
	},
	_tr_tally: (e, t, n) => (e.pending_buf[e.sym_buf + e.sym_next++] = t, e.pending_buf[e.sym_buf + e.sym_next++] = t >> 8, e.pending_buf[e.sym_buf + e.sym_next++] = n, t === 0 ? e.dyn_ltree[n * 2]++ : (e.matches++, t--, e.dyn_ltree[(fe[n] + S + 1) * 2]++, e.dyn_dtree[be(t) * 2]++), e.sym_next === e.sym_end),
	_tr_align: (e) => {
		A(e, 2, 3), j(e, te, k), Ce(e);
	}
}, He = (e, t, n, r) => {
	let i = e & 65535, a = e >>> 16 & 65535, o = 0;
	for (; n !== 0;) {
		o = n > 2e3 ? 2e3 : n, n -= o;
		do
			i = i + t[r++] | 0, a = a + i | 0;
		while (--o);
		i %= 65521, a %= 65521;
	}
	return i | a << 16;
}, Ue = new Uint32Array((() => {
	let e, t = [];
	for (var n = 0; n < 256; n++) {
		e = n;
		for (var r = 0; r < 8; r++) e = e & 1 ? 0xedb88320 ^ e >>> 1 : e >>> 1;
		t[n] = e;
	}
	return t;
})()), M = (e, t, n, r) => {
	let i = Ue, a = r + n;
	e ^= -1;
	for (let n = r; n < a; n++) e = e >>> 8 ^ i[(e ^ t[n]) & 255];
	return e ^ -1;
}, We = {
	2: "need dictionary",
	1: "stream end",
	0: "",
	"-1": "file error",
	"-2": "stream error",
	"-3": "data error",
	"-4": "insufficient memory",
	"-5": "buffer error",
	"-6": "incompatible version"
}, Ge = {
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
}, { _tr_init: Ke, _tr_stored_block: qe, _tr_flush_block: Je, _tr_tally: Ye, _tr_align: Xe } = Ve, { Z_NO_FLUSH: Ze, Z_PARTIAL_FLUSH: Qe, Z_FULL_FLUSH: $e, Z_FINISH: N, Z_BLOCK: et, Z_OK: P, Z_STREAM_END: tt, Z_STREAM_ERROR: F, Z_DATA_ERROR: nt, Z_BUF_ERROR: rt, Z_DEFAULT_COMPRESSION: it, Z_FILTERED: at, Z_HUFFMAN_ONLY: ot, Z_RLE: st, Z_FIXED: ct, Z_DEFAULT_STRATEGY: lt, Z_UNKNOWN: ut, Z_DEFLATED: dt } = Ge, ft = 9, pt = 15, mt = 8, ht = 573, I = 3, gt = 258, L = 262, _t = 32, vt = 42, yt = 57, bt = 69, xt = 73, St = 91, Ct = 103, wt = 113, Tt = 666, R = 1, Et = 2, Dt = 3, Ot = 4, kt = 3, At = (e, t) => (e.msg = We[t], t), jt = (e) => e * 2 - (e > 4 ? 9 : 0), z = (e) => {
	let t = e.length;
	for (; --t >= 0;) e[t] = 0;
}, Mt = (e) => {
	let t, n, r, i = e.w_size;
	t = e.hash_size, r = t;
	do
		n = e.head[--r], e.head[r] = n >= i ? n - i : 0;
	while (--t);
	t = i, r = t;
	do
		n = e.prev[--r], e.prev[r] = n >= i ? n - i : 0;
	while (--t);
}, Nt = (e, t, n) => (t << e.hash_shift ^ n) & e.hash_mask, Pt = (e, t) => {
	let n;
	if (e.legacy_hash) n = e.ins_h = Nt(e, e.ins_h, e.window[t + I - 1]);
	else {
		let r = e.window, i = r[t] | r[t + 1] << 8 | r[t + 2] << 16 | r[t + 3] << 24;
		n = e.ins_h = Math.imul(i, 66521) + 66521 >>> 16 & e.hash_mask;
	}
	let r = e.prev[t & e.w_mask] = e.head[n];
	return e.head[n] = t, r;
}, B = (e) => {
	let t = e.state, n = t.pending;
	n > e.avail_out && (n = e.avail_out), n !== 0 && (e.output.set(t.pending_buf.subarray(t.pending_out, t.pending_out + n), e.next_out), e.next_out += n, t.pending_out += n, e.total_out += n, e.avail_out -= n, t.pending -= n, t.pending === 0 && (t.pending_out = 0));
}, V = (e, t) => {
	Je(e, e.block_start >= 0 ? e.block_start : -1, e.strstart - e.block_start, t), e.block_start = e.strstart, B(e.strm);
}, H = (e, t) => {
	e.pending_buf[e.pending++] = t;
}, Ft = (e, t) => {
	e.pending_buf[e.pending++] = t >>> 8 & 255, e.pending_buf[e.pending++] = t & 255;
}, It = (e, t, n, r) => {
	let i = e.avail_in;
	return i > r && (i = r), i === 0 ? 0 : (e.avail_in -= i, t.set(e.input.subarray(e.next_in, e.next_in + i), n), e.state.wrap === 1 ? e.adler = He(e.adler, t, i, n) : e.state.wrap === 2 && (e.adler = M(e.adler, t, i, n)), e.next_in += i, e.total_in += i, i);
}, Lt = (e, t) => {
	let n = e.max_chain_length, r = e.strstart, i, a, o = e.prev_length, s = e.nice_match, c = e.strstart > e.w_size - L ? e.strstart - (e.w_size - L) : 0, l = e.window, u = e.w_mask, d = e.prev, f = e.strstart + gt, p = l[r + o - 1], m = l[r + o];
	e.prev_length >= e.good_match && (n >>= 2), s > e.lookahead && (s = e.lookahead);
	do
		if (i = t, l[i + o] === m && l[i + o - 1] === p && l[i] === l[r] && l[++i] === l[r + 1]) {
			r += 2, i++;
			do;
			while (l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && l[++r] === l[++i] && r < f);
			if (a = gt - (f - r), r = f - gt, a > o) {
				if (e.match_start = t, o = a, a >= s) break;
				p = l[r + o - 1], m = l[r + o];
			}
		}
	while ((t = d[t & u]) > c && --n !== 0);
	return o <= e.lookahead ? o : e.lookahead;
}, Rt = (e) => {
	let t = e.w_size, n, r, i;
	do {
		if (r = e.window_size - e.lookahead - e.strstart, e.strstart >= t + (t - L) && (e.window.set(e.window.subarray(t, t + t - r), 0), e.match_start -= t, e.strstart -= t, e.block_start -= t, e.insert > e.strstart && (e.insert = e.strstart), Mt(e), r += t), e.strm.avail_in === 0) break;
		if (n = It(e.strm, e.window, e.strstart + e.lookahead, r), e.lookahead += n, !e.legacy_hash) {
			if (e.lookahead + e.insert > I) for (i = e.strstart - e.insert; e.insert && (Pt(e, i), i++, e.insert--, !(e.lookahead + e.insert <= I)););
		} else if (e.lookahead + e.insert >= I) for (i = e.strstart - e.insert, e.ins_h = e.window[i], e.ins_h = Nt(e, e.ins_h, e.window[i + 1]); e.insert && (Pt(e, i), i++, e.insert--, !(e.lookahead + e.insert < I)););
	} while (e.lookahead < L && e.strm.avail_in !== 0);
}, zt = (e, t) => {
	let n = e.pending_buf_size - 5 > e.w_size ? e.w_size : e.pending_buf_size - 5, r, i, a, o = 0, s = e.strm.avail_in;
	do {
		if (r = 65535, a = e.bi_valid + 42 >> 3, e.strm.avail_out < a || (a = e.strm.avail_out - a, i = e.strstart - e.block_start, r > i + e.strm.avail_in && (r = i + e.strm.avail_in), r > a && (r = a), r < n && (r === 0 && t !== N || t === Ze || r !== i + e.strm.avail_in))) break;
		o = +(t === N && r === i + e.strm.avail_in), qe(e, 0, 0, o), e.pending_buf[e.pending - 4] = r, e.pending_buf[e.pending - 3] = r >> 8, e.pending_buf[e.pending - 2] = ~r, e.pending_buf[e.pending - 1] = ~r >> 8, B(e.strm), i && (i > r && (i = r), e.strm.output.set(e.window.subarray(e.block_start, e.block_start + i), e.strm.next_out), e.strm.next_out += i, e.strm.avail_out -= i, e.strm.total_out += i, e.block_start += i, r -= i), r && (It(e.strm, e.strm.output, e.strm.next_out, r), e.strm.next_out += r, e.strm.avail_out -= r, e.strm.total_out += r);
	} while (o === 0);
	return s -= e.strm.avail_in, s && (s >= e.w_size ? (e.matches = 2, e.window.set(e.strm.input.subarray(e.strm.next_in - e.w_size, e.strm.next_in), 0), e.strstart = e.w_size, e.insert = e.strstart) : (e.window_size - e.strstart <= s && (e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, e.insert > e.strstart && (e.insert = e.strstart)), e.window.set(e.strm.input.subarray(e.strm.next_in - s, e.strm.next_in), e.strstart), e.strstart += s, e.insert += s > e.w_size - e.insert ? e.w_size - e.insert : s), e.block_start = e.strstart), e.high_water < e.strstart && (e.high_water = e.strstart), o ? Ot : t !== Ze && t !== N && e.strm.avail_in === 0 && e.strstart === e.block_start ? Et : (a = e.window_size - e.strstart, e.strm.avail_in > a && e.block_start >= e.w_size && (e.block_start -= e.w_size, e.strstart -= e.w_size, e.window.set(e.window.subarray(e.w_size, e.w_size + e.strstart), 0), e.matches < 2 && e.matches++, a += e.w_size, e.insert > e.strstart && (e.insert = e.strstart)), a > e.strm.avail_in && (a = e.strm.avail_in), a && (It(e.strm, e.window, e.strstart, a), e.strstart += a, e.insert += a > e.w_size - e.insert ? e.w_size - e.insert : a), e.high_water < e.strstart && (e.high_water = e.strstart), a = e.bi_valid + 42 >> 3, a = e.pending_buf_size - a > 65535 ? 65535 : e.pending_buf_size - a, n = a > e.w_size ? e.w_size : a, i = e.strstart - e.block_start, (i >= n || (i || t === N) && t !== Ze && e.strm.avail_in === 0 && i <= a) && (r = i > a ? a : i, o = +(t === N && e.strm.avail_in === 0 && r === i), qe(e, e.block_start, r, o), e.block_start += r, B(e.strm)), o ? Dt : R);
}, Bt = (e, t) => {
	let n, r;
	for (;;) {
		if (e.lookahead < L) {
			if (Rt(e), e.lookahead < L && t === Ze) return R;
			if (e.lookahead === 0) break;
		}
		if (n = 0, e.lookahead >= I && (n = Pt(e, e.strstart)), n !== 0 && e.strstart - n <= e.w_size - L && (e.match_length = Lt(e, n)), e.match_length >= I) {
			if (r = Ye(e, e.strstart - e.match_start, e.match_length - I), e.lookahead -= e.match_length, e.match_length <= e.max_lazy_match && e.lookahead >= I) {
				e.match_length--;
				do
					e.strstart++, n = Pt(e, e.strstart);
				while (--e.match_length !== 0);
				e.strstart++;
			} else e.strstart += e.match_length, e.match_length = 0, e.legacy_hash && (e.ins_h = e.window[e.strstart], e.ins_h = Nt(e, e.ins_h, e.window[e.strstart + 1]));
		} else r = Ye(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++;
		if (r && (V(e, !1), e.strm.avail_out === 0)) return R;
	}
	return e.insert = e.strstart < 2 ? e.strstart : 2, t === N ? (V(e, !0), e.strm.avail_out === 0 ? Dt : Ot) : e.sym_next && (V(e, !1), e.strm.avail_out === 0) ? R : Et;
}, Vt = (e, t) => {
	let n, r, i;
	for (;;) {
		if (e.lookahead < L) {
			if (Rt(e), e.lookahead < L && t === Ze) return R;
			if (e.lookahead === 0) break;
		}
		if (n = 0, e.lookahead >= I && (n = Pt(e, e.strstart)), e.prev_length = e.match_length, e.prev_match = e.match_start, e.match_length = 2, n !== 0 && e.prev_length < e.max_lazy_match && e.strstart - n <= e.w_size - L && (e.match_length = Lt(e, n), e.match_length <= 5 && (e.strategy === at || e.match_length === I && e.strstart - e.match_start > 4096) && (e.match_length = 2)), e.prev_length >= I && e.match_length <= e.prev_length) {
			i = e.strstart + e.lookahead - I, r = Ye(e, e.strstart - 1 - e.prev_match, e.prev_length - I), e.lookahead -= e.prev_length - 1, e.prev_length -= 2;
			do
				++e.strstart <= i && (n = Pt(e, e.strstart));
			while (--e.prev_length !== 0);
			if (e.match_available = 0, e.match_length = 2, e.strstart++, r && (V(e, !1), e.strm.avail_out === 0)) return R;
		} else if (e.match_available) {
			if (r = Ye(e, 0, e.window[e.strstart - 1]), r && V(e, !1), e.strstart++, e.lookahead--, e.strm.avail_out === 0) return R;
		} else e.match_available = 1, e.strstart++, e.lookahead--;
	}
	return e.match_available &&= (r = Ye(e, 0, e.window[e.strstart - 1]), 0), e.insert = e.strstart < 2 ? e.strstart : 2, t === N ? (V(e, !0), e.strm.avail_out === 0 ? Dt : Ot) : e.sym_next && (V(e, !1), e.strm.avail_out === 0) ? R : Et;
}, Ht = (e, t) => {
	let n, r, i, a, o = e.window;
	for (;;) {
		if (e.lookahead <= gt) {
			if (Rt(e), e.lookahead <= gt && t === Ze) return R;
			if (e.lookahead === 0) break;
		}
		if (e.match_length = 0, e.lookahead >= I && e.strstart > 0 && (i = e.strstart - 1, r = o[i], r === o[++i] && r === o[++i] && r === o[++i])) {
			a = e.strstart + gt;
			do;
			while (r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && r === o[++i] && i < a);
			e.match_length = gt - (a - i), e.match_length > e.lookahead && (e.match_length = e.lookahead);
		}
		if (e.match_length >= I ? (n = Ye(e, 1, e.match_length - I), e.lookahead -= e.match_length, e.strstart += e.match_length, e.match_length = 0) : (n = Ye(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++), n && (V(e, !1), e.strm.avail_out === 0)) return R;
	}
	return e.insert = 0, t === N ? (V(e, !0), e.strm.avail_out === 0 ? Dt : Ot) : e.sym_next && (V(e, !1), e.strm.avail_out === 0) ? R : Et;
}, Ut = (e, t) => {
	let n;
	for (;;) {
		if (e.lookahead === 0 && (Rt(e), e.lookahead === 0)) {
			if (t === Ze) return R;
			break;
		}
		if (e.match_length = 0, n = Ye(e, 0, e.window[e.strstart]), e.lookahead--, e.strstart++, n && (V(e, !1), e.strm.avail_out === 0)) return R;
	}
	return e.insert = 0, t === N ? (V(e, !0), e.strm.avail_out === 0 ? Dt : Ot) : e.sym_next && (V(e, !1), e.strm.avail_out === 0) ? R : Et;
};
function U(e, t, n, r, i) {
	this.good_length = e, this.max_lazy = t, this.nice_length = n, this.max_chain = r, this.func = i;
}
var Wt = [
	new U(0, 0, 0, 0, zt),
	new U(4, 4, 8, 4, Bt),
	new U(4, 5, 16, 8, Bt),
	new U(4, 6, 32, 32, Bt),
	new U(4, 4, 16, 16, Vt),
	new U(8, 16, 32, 32, Vt),
	new U(8, 16, 128, 128, Vt),
	new U(8, 32, 128, 256, Vt),
	new U(32, 128, 258, 1024, Vt),
	new U(32, 258, 258, 4096, Vt)
], Gt = (e) => {
	e.window_size = 2 * e.w_size, z(e.head), e.max_lazy_match = Wt[e.level].max_lazy, e.good_match = Wt[e.level].good_length, e.nice_match = Wt[e.level].nice_length, e.max_chain_length = Wt[e.level].max_chain, e.strstart = 0, e.block_start = 0, e.lookahead = 0, e.insert = 0, e.match_length = e.prev_length = 2, e.match_available = 0, e.ins_h = 0;
};
function Kt() {
	this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = dt, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.legacy_hash = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new Uint16Array(ht * 2), this.dyn_dtree = /* @__PURE__ */ new Uint16Array(122), this.bl_tree = /* @__PURE__ */ new Uint16Array(78), z(this.dyn_ltree), z(this.dyn_dtree), z(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = /* @__PURE__ */ new Uint16Array(16), this.heap = /* @__PURE__ */ new Uint16Array(573), z(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = /* @__PURE__ */ new Uint16Array(573), z(this.depth), this.sym_buf = 0, this.lit_bufsize = 0, this.sym_next = 0, this.sym_end = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
}
var qt = (e) => {
	if (!e) return 1;
	let t = e.state;
	return +(!t || t.strm !== e || t.status !== vt && t.status !== yt && t.status !== bt && t.status !== xt && t.status !== St && t.status !== Ct && t.status !== wt && t.status !== Tt);
}, Jt = (e) => {
	if (qt(e)) return At(e, F);
	e.total_in = e.total_out = 0, e.data_type = ut;
	let t = e.state;
	return t.pending = 0, t.pending_out = 0, t.wrap < 0 && (t.wrap = -t.wrap), t.status = t.wrap === 2 ? yt : t.wrap ? vt : wt, e.adler = t.wrap === 2 ? 0 : 1, t.last_flush = -2, Ke(t), P;
}, Yt = (e) => {
	let t = Jt(e);
	return t === P && Gt(e.state), t;
}, Xt = (e, t) => qt(e) || e.state.wrap !== 2 ? F : (e.state.gzhead = t, P), Zt = (e, t, n, r, i, a, o) => {
	if (!e) return F;
	let s = 1;
	if (t === it && (t = 6), r < 0 ? (s = 0, r = -r) : r > 15 && (s = 2, r -= 16), i < 1 || i > ft || n !== dt || r < 8 || r > 15 || t < 0 || t > 9 || a < 0 || a > ct || r === 8 && s !== 1) return At(e, F);
	r === 8 && (r = 9);
	let c = new Kt();
	return e.state = c, c.strm = e, c.status = vt, c.wrap = s, c.gzhead = null, c.w_bits = r, c.w_size = 1 << c.w_bits, c.w_mask = c.w_size - 1, c.legacy_hash = +!!o, c.hash_bits = i + 7, !c.legacy_hash && c.hash_bits < 15 && (c.hash_bits = 15), c.hash_size = 1 << c.hash_bits, c.hash_mask = c.hash_size - 1, c.hash_shift = ~~((c.hash_bits + I - 1) / I), c.window = new Uint8Array(c.w_size * 2), c.head = new Uint16Array(c.hash_size), c.prev = new Uint16Array(c.w_size), c.lit_bufsize = 1 << i + 6, c.pending_buf_size = c.lit_bufsize * 4, c.pending_buf = new Uint8Array(c.pending_buf_size), c.sym_buf = c.lit_bufsize, c.sym_end = (c.lit_bufsize - 1) * 3, c.level = t, c.strategy = a, c.method = n, Yt(e);
}, Qt = {
	deflateInit: (e, t) => Zt(e, t, dt, pt, mt, lt),
	deflateInit2: Zt,
	deflateReset: Yt,
	deflateResetKeep: Jt,
	deflateSetHeader: Xt,
	deflate: (e, t) => {
		if (qt(e) || t > et || t < 0) return e ? At(e, F) : F;
		let n = e.state;
		if (!e.output || e.avail_in !== 0 && !e.input || n.status === Tt && t !== N) return At(e, e.avail_out === 0 ? rt : F);
		let r = n.last_flush;
		if (n.last_flush = t, n.pending !== 0) {
			if (B(e), e.avail_out === 0) return n.last_flush = -1, P;
		} else if (e.avail_in === 0 && jt(t) <= jt(r) && t !== N) return At(e, rt);
		if (n.status === Tt && e.avail_in !== 0) return At(e, rt);
		if (n.status === vt && n.wrap === 0 && (n.status = wt), n.status === vt) {
			let t = dt + (n.w_bits - 8 << 4) << 8, r = -1;
			if (r = n.strategy >= ot || n.level < 2 ? 0 : n.level < 6 ? 1 : n.level === 6 ? 2 : 3, t |= r << 6, n.strstart !== 0 && (t |= _t), t += 31 - t % 31, Ft(n, t), n.strstart !== 0 && (Ft(n, e.adler >>> 16), Ft(n, e.adler & 65535)), e.adler = 1, n.status = wt, B(e), n.pending !== 0) return n.last_flush = -1, P;
		}
		if (n.status === yt) {
			if (e.adler = 0, H(n, 31), H(n, 139), H(n, 8), n.gzhead) H(n, +!!n.gzhead.text + (n.gzhead.hcrc ? 2 : 0) + (n.gzhead.extra ? 4 : 0) + (n.gzhead.name ? 8 : 0) + (n.gzhead.comment ? 16 : 0)), H(n, n.gzhead.time & 255), H(n, n.gzhead.time >> 8 & 255), H(n, n.gzhead.time >> 16 & 255), H(n, n.gzhead.time >> 24 & 255), H(n, n.level === 9 ? 2 : n.strategy >= ot || n.level < 2 ? 4 : 0), H(n, n.gzhead.os & 255), n.gzhead.extra && n.gzhead.extra.length && (H(n, n.gzhead.extra.length & 255), H(n, n.gzhead.extra.length >> 8 & 255)), n.gzhead.hcrc && (e.adler = M(e.adler, n.pending_buf, n.pending, 0)), n.gzindex = 0, n.status = bt;
			else if (H(n, 0), H(n, 0), H(n, 0), H(n, 0), H(n, 0), H(n, n.level === 9 ? 2 : n.strategy >= ot || n.level < 2 ? 4 : 0), H(n, kt), n.status = wt, B(e), n.pending !== 0) return n.last_flush = -1, P;
		}
		if (n.status === bt) {
			if (n.gzhead.extra) {
				let t = n.pending, r = (n.gzhead.extra.length & 65535) - n.gzindex;
				for (; n.pending + r > n.pending_buf_size;) {
					let i = n.pending_buf_size - n.pending;
					if (n.pending_buf.set(n.gzhead.extra.subarray(n.gzindex, n.gzindex + i), n.pending), n.pending = n.pending_buf_size, n.gzhead.hcrc && n.pending > t && (e.adler = M(e.adler, n.pending_buf, n.pending - t, t)), n.gzindex += i, B(e), n.pending !== 0) return n.last_flush = -1, P;
					t = 0, r -= i;
				}
				let i = new Uint8Array(n.gzhead.extra);
				n.pending_buf.set(i.subarray(n.gzindex, n.gzindex + r), n.pending), n.pending += r, n.gzhead.hcrc && n.pending > t && (e.adler = M(e.adler, n.pending_buf, n.pending - t, t)), n.gzindex = 0;
			}
			n.status = xt;
		}
		if (n.status === xt) {
			if (n.gzhead.name) {
				let t = n.pending, r;
				do {
					if (n.pending === n.pending_buf_size) {
						if (n.gzhead.hcrc && n.pending > t && (e.adler = M(e.adler, n.pending_buf, n.pending - t, t)), B(e), n.pending !== 0) return n.last_flush = -1, P;
						t = 0;
					}
					r = n.gzindex < n.gzhead.name.length ? n.gzhead.name.charCodeAt(n.gzindex++) & 255 : 0, H(n, r);
				} while (r !== 0);
				n.gzhead.hcrc && n.pending > t && (e.adler = M(e.adler, n.pending_buf, n.pending - t, t)), n.gzindex = 0;
			}
			n.status = St;
		}
		if (n.status === St) {
			if (n.gzhead.comment) {
				let t = n.pending, r;
				do {
					if (n.pending === n.pending_buf_size) {
						if (n.gzhead.hcrc && n.pending > t && (e.adler = M(e.adler, n.pending_buf, n.pending - t, t)), B(e), n.pending !== 0) return n.last_flush = -1, P;
						t = 0;
					}
					r = n.gzindex < n.gzhead.comment.length ? n.gzhead.comment.charCodeAt(n.gzindex++) & 255 : 0, H(n, r);
				} while (r !== 0);
				n.gzhead.hcrc && n.pending > t && (e.adler = M(e.adler, n.pending_buf, n.pending - t, t));
			}
			n.status = Ct;
		}
		if (n.status === Ct) {
			if (n.gzhead.hcrc) {
				if (n.pending + 2 > n.pending_buf_size && (B(e), n.pending !== 0)) return n.last_flush = -1, P;
				H(n, e.adler & 255), H(n, e.adler >> 8 & 255), e.adler = 0;
			}
			if (n.status = wt, B(e), n.pending !== 0) return n.last_flush = -1, P;
		}
		if (e.avail_in !== 0 || n.lookahead !== 0 || t !== Ze && n.status !== Tt) {
			let r = n.level === 0 ? zt(n, t) : n.strategy === ot ? Ut(n, t) : n.strategy === st ? Ht(n, t) : Wt[n.level].func(n, t);
			if ((r === Dt || r === Ot) && (n.status = Tt), r === R || r === Dt) return e.avail_out === 0 && (n.last_flush = -1), P;
			if (r === Et && (t === Qe ? Xe(n) : t !== et && (qe(n, 0, 0, !1), t === $e && (z(n.head), n.lookahead === 0 && (n.strstart = 0, n.block_start = 0, n.insert = 0))), B(e), e.avail_out === 0)) return n.last_flush = -1, P;
		}
		return t === N ? n.wrap <= 0 ? tt : (n.wrap === 2 ? (H(n, e.adler & 255), H(n, e.adler >> 8 & 255), H(n, e.adler >> 16 & 255), H(n, e.adler >> 24 & 255), H(n, e.total_in & 255), H(n, e.total_in >> 8 & 255), H(n, e.total_in >> 16 & 255), H(n, e.total_in >> 24 & 255)) : (Ft(n, e.adler >>> 16), Ft(n, e.adler & 65535)), B(e), n.wrap > 0 && (n.wrap = -n.wrap), n.pending === 0 ? tt : P) : P;
	},
	deflateEnd: (e) => {
		if (qt(e)) return F;
		let t = e.state.status;
		return e.state = null, t === wt ? At(e, nt) : P;
	},
	deflateSetDictionary: (e, t) => {
		let n = t.length;
		if (qt(e)) return F;
		let r = e.state, i = r.wrap;
		if (i === 2 || i === 1 && r.status !== vt || r.lookahead) return F;
		if (i === 1 && (e.adler = He(e.adler, t, n, 0)), r.wrap = 0, n >= r.w_size) {
			i === 0 && (z(r.head), r.strstart = 0, r.block_start = 0, r.insert = 0);
			let e = new Uint8Array(r.w_size);
			e.set(t.subarray(n - r.w_size, n), 0), t = e, n = r.w_size;
		}
		let a = e.avail_in, o = e.next_in, s = e.input;
		for (e.avail_in = n, e.next_in = 0, e.input = t, Rt(r); r.lookahead >= I;) {
			let e = r.strstart, t = r.lookahead - 2;
			do
				Pt(r, e), e++;
			while (--t);
			r.strstart = e, r.lookahead = 2, Rt(r);
		}
		return r.strstart += r.lookahead, r.block_start = r.strstart, r.insert = r.lookahead, r.lookahead = 0, r.match_length = r.prev_length = 2, r.match_available = 0, e.next_in = o, e.input = s, e.avail_in = a, r.wrap = i, P;
	},
	deflateInfo: "pako deflate (from Nodeca project)"
}, $t = (e, t) => Object.prototype.hasOwnProperty.call(e, t), en = {
	assign: function(e) {
		let t = Array.prototype.slice.call(arguments, 1);
		for (; t.length;) {
			let n = t.shift();
			if (n) {
				if (typeof n != "object") throw TypeError(n + "must be non-object");
				for (let t in n) $t(n, t) && (e[t] = n[t]);
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
}, tn = !0;
try {
	String.fromCharCode.apply(null, /* @__PURE__ */ new Uint8Array(1));
} catch {
	tn = !1;
}
var nn = /* @__PURE__ */ new Uint8Array(256);
for (let e = 0; e < 256; e++) nn[e] = e >= 252 ? 6 : e >= 248 ? 5 : e >= 240 ? 4 : e >= 224 ? 3 : e >= 192 ? 2 : 1;
nn[254] = nn[255] = 1;
var rn = (e) => {
	if (typeof TextEncoder == "function" && TextEncoder.prototype.encode) return new TextEncoder().encode(e);
	let t, n, r, i, a, o = e.length, s = 0;
	for (i = 0; i < o; i++) n = e.charCodeAt(i), (n & 64512) == 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), s += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
	for (t = new Uint8Array(s), a = 0, i = 0; a < s; i++) n = e.charCodeAt(i), (n & 64512) == 55296 && i + 1 < o && (r = e.charCodeAt(i + 1), (r & 64512) == 56320 && (n = 65536 + (n - 55296 << 10) + (r - 56320), i++)), n < 128 ? t[a++] = n : n < 2048 ? (t[a++] = 192 | n >>> 6, t[a++] = 128 | n & 63) : n < 65536 ? (t[a++] = 224 | n >>> 12, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63) : (t[a++] = 240 | n >>> 18, t[a++] = 128 | n >>> 12 & 63, t[a++] = 128 | n >>> 6 & 63, t[a++] = 128 | n & 63);
	return t;
}, an = (e, t) => {
	if (t < 65534 && e.subarray && tn) return String.fromCharCode.apply(null, e.length === t ? e : e.subarray(0, t));
	let n = "";
	for (let r = 0; r < t; r++) n += String.fromCharCode(e[r]);
	return n;
}, on = {
	string2buf: rn,
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
			let o = nn[t];
			if (o > 4) a[i++] = 65533, r += o - 1;
			else {
				for (t &= o === 2 ? 31 : o === 3 ? 15 : 7; o > 1 && r < n;) t = t << 6 | e[r++] & 63, o--;
				o > 1 ? a[i++] = 65533 : t < 65536 ? a[i++] = t : (t -= 65536, a[i++] = 55296 | t >> 10 & 1023, a[i++] = 56320 | t & 1023);
			}
		}
		return an(a, i);
	},
	utf8border: (e, t) => {
		t ||= e.length, t > e.length && (t = e.length);
		let n = t - 1;
		for (; n >= 0 && (e[n] & 192) == 128;) n--;
		return n < 0 || n === 0 ? t : n + nn[e[n]] > t ? n : t;
	}
};
function sn() {
	this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
}
var cn = sn, ln = Object.prototype.toString, { Z_NO_FLUSH: un, Z_SYNC_FLUSH: dn, Z_FULL_FLUSH: fn, Z_FINISH: pn, Z_OK: mn, Z_STREAM_END: hn, Z_DEFAULT_COMPRESSION: gn, Z_DEFAULT_STRATEGY: _n, Z_DEFLATED: vn } = Ge, yn = {
	level: gn,
	method: vn,
	chunkSize: 16384,
	windowBits: 15,
	memLevel: 8,
	strategy: _n,
	legacyHash: !0
};
function bn(e) {
	this.options = en.assign({}, yn, e || {});
	let t = this.options;
	t.raw && t.windowBits > 0 ? t.windowBits = -t.windowBits : t.gzip && t.windowBits > 0 && t.windowBits < 16 && (t.windowBits += 16), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new cn(), this.strm.avail_out = 0;
	let n = Qt.deflateInit2(this.strm, t.level, t.method, t.windowBits, t.memLevel, t.strategy, t.legacyHash);
	if (n !== mn) throw Error(We[n]);
	if (t.header && Qt.deflateSetHeader(this.strm, t.header), t.dictionary) {
		let e;
		if (e = typeof t.dictionary == "string" ? on.string2buf(t.dictionary) : ln.call(t.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(t.dictionary) : t.dictionary, n = Qt.deflateSetDictionary(this.strm, e), n !== mn) throw Error(We[n]);
		this._dict_set = !0;
	}
}
bn.prototype.push = function(e, t) {
	let n = this.strm, r = this.options.chunkSize, i, a;
	if (this.ended) return !1;
	for (a = t === ~~t ? t : t === !0 ? pn : un, n.input = typeof e == "string" ? on.string2buf(e) : ln.call(e) === "[object ArrayBuffer]" ? new Uint8Array(e) : e, n.next_in = 0, n.avail_in = n.input.length;;) if (n.avail_out === 0 && (n.output = new Uint8Array(r), n.next_out = 0, n.avail_out = r), (a === dn || a === fn) && n.avail_out <= 6) this.onData(n.output.subarray(0, n.next_out)), n.avail_out = 0;
	else {
		if (i = Qt.deflate(n, a), i === hn) return n.next_out > 0 && this.onData(n.output.subarray(0, n.next_out)), i = Qt.deflateEnd(this.strm), this.onEnd(i), this.ended = !0, i === mn;
		if (n.avail_out === 0) this.onData(n.output);
		else if (a > 0 && n.next_out > 0) this.onData(n.output.subarray(0, n.next_out)), n.avail_out = 0;
		else if (n.avail_in === 0) break;
	}
	return !0;
}, bn.prototype.onData = function(e) {
	this.chunks.push(e);
}, bn.prototype.onEnd = function(e) {
	e === mn && (this.result = en.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function xn(e, t) {
	let n = new bn(t);
	if (n.push(e, !0), n.err) throw n.msg || We[n.err];
	return n.result;
}
function Sn(e, t) {
	return t ||= {}, t.raw = !0, xn(e, t);
}
function Cn(e, t) {
	return t ||= {}, t.gzip = !0, xn(e, t);
}
var wn = {
	Deflate: bn,
	deflate: xn,
	deflateRaw: Sn,
	gzip: Cn,
	constants: Ge
}, Tn = 16209, En = 16191, Dn = function(e, t) {
	let n, r, i, a, o, s, c, l, u, d, f, p, m, h, g, _, v, y, b, x, S, C, w, T, E = e.state;
	n = e.next_in, w = e.input, r = n + (e.avail_in - 5), i = e.next_out, T = e.output, a = i - (t - e.avail_out), o = i + (e.avail_out - 257), s = E.dmax, c = E.wsize, l = E.whave, u = E.wnext, d = E.window, f = E.hold, p = E.bits, m = E.lencode, h = E.distcode, g = (1 << E.lenbits) - 1, _ = (1 << E.distbits) - 1;
	e: do
		for (p < 15 && (f += w[n++] << p, p += 8, f += w[n++] << p, p += 8), v = m[f & g];;) {
			if (y = v >>> 24, f >>>= y, p -= y, y = v >>> 16 & 255, y === 0) T[i++] = v & 65535;
			else if (y & 16) for (b = v & 65535, y &= 15, y && (p < y && (f += w[n++] << p, p += 8), b += f & (1 << y) - 1, f >>>= y, p -= y), p < 15 && (f += w[n++] << p, p += 8, f += w[n++] << p, p += 8), v = h[f & _];;) {
				if (y = v >>> 24, f >>>= y, p -= y, y = v >>> 16 & 255, y & 16) {
					if (x = v & 65535, y &= 15, p < y && (f += w[n++] << p, p += 8, p < y && (f += w[n++] << p, p += 8)), x += f & (1 << y) - 1, x > s) {
						e.msg = "invalid distance too far back", E.mode = Tn;
						break e;
					}
					if (f >>>= y, p -= y, y = i - a, x > y) {
						if (y = x - y, y > l && E.sane) {
							e.msg = "invalid distance too far back", E.mode = Tn;
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
					e.msg = "invalid distance code", E.mode = Tn;
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
				E.mode = En;
				break e;
			} else {
				e.msg = "invalid literal/length code", E.mode = Tn;
				break e;
			}
			break;
		}
	while (n < r && i < o);
	b = p >> 3, n -= b, p -= b << 3, f &= (1 << p) - 1, e.next_in = n, e.next_out = i, e.avail_in = n < r ? 5 + (r - n) : 5 - (n - r), e.avail_out = i < o ? 257 + (o - i) : 257 - (i - o), E.hold = f, E.bits = p;
}, On = 15, kn = 852, An = 592, jn = 0, Mn = 1, Nn = 2, Pn = new Uint16Array([
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
]), Fn = new Uint8Array([
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
]), In = new Uint16Array([
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
]), Ln = new Uint8Array([
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
]), Rn = (e, t, n, r, i, a, o, s) => {
	let c = s.bits, l = 0, u = 0, d = 0, f = 0, p = 0, m = 0, h = 0, g = 0, _ = 0, v = 0, y, b, x, S, C, w = null, T, E = /* @__PURE__ */ new Uint16Array(16), D = /* @__PURE__ */ new Uint16Array(16), O = null, ee, te, ne;
	for (l = 0; l <= On; l++) E[l] = 0;
	for (u = 0; u < r; u++) E[t[n + u]]++;
	for (p = c, f = On; f >= 1 && E[f] === 0; f--);
	if (p > f && (p = f), f === 0) return i[a++] = 20971520, i[a++] = 20971520, s.bits = 1, 0;
	for (d = 1; d < f && E[d] === 0; d++);
	for (p < d && (p = d), g = 1, l = 1; l <= On; l++) if (g <<= 1, g -= E[l], g < 0) return -1;
	if (g > 0 && (e === jn || f !== 1)) return -1;
	for (D[1] = 0, l = 1; l < On; l++) D[l + 1] = D[l] + E[l];
	for (u = 0; u < r; u++) t[n + u] !== 0 && (o[D[t[n + u]]++] = u);
	if (e === jn ? (w = O = o, T = 20) : e === Mn ? (w = Pn, O = Fn, T = 257) : (w = In, O = Ln, T = 0), v = 0, u = 0, l = d, C = a, m = p, h = 0, x = -1, _ = 1 << p, S = _ - 1, e === Mn && _ > kn || e === Nn && _ > An) return 1;
	for (;;) {
		ee = l - h, o[u] + 1 < T ? (te = 0, ne = o[u]) : o[u] >= T ? (te = O[o[u] - T], ne = w[o[u] - T]) : (te = 96, ne = 0), y = 1 << l - h, b = 1 << m, d = b;
		do
			b -= y, i[C + (v >> h) + b] = ee << 24 | te << 16 | ne;
		while (b !== 0);
		for (y = 1 << l - 1; v & y;) y >>= 1;
		if (y === 0 ? v = 0 : (v &= y - 1, v += y), u++, --E[l] === 0) {
			if (l === f) break;
			l = t[n + o[u]];
		}
		if (l > p && (v & S) !== x) {
			for (h === 0 && (h = p), C += d, m = l - h, g = 1 << m; m + h < f && (g -= E[m + h], !(g <= 0));) m++, g <<= 1;
			if (_ += 1 << m, e === Mn && _ > kn || e === Nn && _ > An) return 1;
			x = v & S, i[x] = p << 24 | m << 16 | C - a;
		}
	}
	return v !== 0 && (i[C + v] = l - h << 24 | 4194304), s.bits = p, 0;
}, zn = 0, Bn = 1, Vn = 2, { Z_FINISH: Hn, Z_BLOCK: Un, Z_TREES: Wn, Z_OK: Gn, Z_STREAM_END: Kn, Z_NEED_DICT: qn, Z_STREAM_ERROR: W, Z_DATA_ERROR: Jn, Z_MEM_ERROR: Yn, Z_BUF_ERROR: Xn, Z_DEFLATED: Zn } = Ge, Qn = 16180, $n = 16181, er = 16182, tr = 16183, nr = 16184, rr = 16185, ir = 16186, ar = 16187, or = 16188, sr = 16189, cr = 16190, G = 16191, lr = 16192, ur = 16193, dr = 16194, fr = 16195, pr = 16196, mr = 16197, hr = 16198, gr = 16199, _r = 16200, vr = 16201, yr = 16202, br = 16203, xr = 16204, Sr = 16205, Cr = 16206, wr = 16207, Tr = 16208, K = 16209, Er = 16210, Dr = 16211, Or = 852, kr = 592, Ar = 15, jr = (e) => (e >>> 24 & 255) + (e >>> 8 & 65280) + ((e & 65280) << 8) + ((e & 255) << 24);
function Mr() {
	this.strm = null, this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = /* @__PURE__ */ new Uint16Array(320), this.work = /* @__PURE__ */ new Uint16Array(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
}
var Nr = (e) => {
	if (!e) return 1;
	let t = e.state;
	return +(!t || t.strm !== e || t.mode < Qn || t.mode > Dr);
}, Pr = (e) => {
	if (Nr(e)) return W;
	let t = e.state;
	return e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = t.wrap & 1), t.mode = Qn, t.last = 0, t.havedict = 0, t.flags = -1, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new Int32Array(Or), t.distcode = t.distdyn = new Int32Array(kr), t.sane = 1, t.back = -1, Gn;
}, Fr = (e) => {
	if (Nr(e)) return W;
	let t = e.state;
	return t.wsize = 0, t.whave = 0, t.wnext = 0, Pr(e);
}, Ir = (e, t) => {
	let n;
	if (Nr(e)) return W;
	let r = e.state;
	return t < 0 ? (n = 0, t = -t) : (n = (t >> 4) + 5, t < 48 && (t &= 15)), t && (t < 8 || t > 15) ? W : (r.window !== null && r.wbits !== t && (r.window = null), r.wrap = n, r.wbits = t, Fr(e));
}, Lr = (e, t) => {
	if (!e) return W;
	let n = new Mr();
	e.state = n, n.strm = e, n.window = null, n.mode = Qn;
	let r = Ir(e, t);
	return r !== Gn && (e.state = null), r;
}, Rr = (e) => Lr(e, Ar), zr = !0, Br, Vr, Hr = (e) => {
	if (zr) {
		Br = /* @__PURE__ */ new Int32Array(512), Vr = /* @__PURE__ */ new Int32Array(32);
		let t = 0;
		for (; t < 144;) e.lens[t++] = 8;
		for (; t < 256;) e.lens[t++] = 9;
		for (; t < 280;) e.lens[t++] = 7;
		for (; t < 288;) e.lens[t++] = 8;
		for (Rn(Bn, e.lens, 0, 288, Br, 0, e.work, { bits: 9 }), t = 0; t < 32;) e.lens[t++] = 5;
		Rn(Vn, e.lens, 0, 32, Vr, 0, e.work, { bits: 5 }), zr = !1;
	}
	e.lencode = Br, e.lenbits = 9, e.distcode = Vr, e.distbits = 5;
}, Ur = (e, t, n, r) => {
	let i, a = e.state;
	return a.window === null && (a.window = new Uint8Array(1 << a.wbits)), a.wsize === 0 && (a.wsize = 1 << a.wbits, a.wnext = 0, a.whave = 0), r >= a.wsize ? (a.window.set(t.subarray(n - a.wsize, n), 0), a.wnext = 0, a.whave = a.wsize) : (i = a.wsize - a.wnext, i > r && (i = r), a.window.set(t.subarray(n - r, n - r + i), a.wnext), r -= i, r ? (a.window.set(t.subarray(n - r, n), 0), a.wnext = r, a.whave = a.wsize) : (a.wnext += i, a.wnext === a.wsize && (a.wnext = 0), a.whave < a.wsize && (a.whave += i))), 0;
}, q = {
	inflateReset: Fr,
	inflateReset2: Ir,
	inflateResetKeep: Pr,
	inflateInit: Rr,
	inflateInit2: Lr,
	inflate: (e, t) => {
		let n, r, i, a, o, s, c, l, u, d, f, p, m, h, g = 0, _, v, y, b, x, S, C, w, T = /* @__PURE__ */ new Uint8Array(4), E, D, O = new Uint8Array([
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
		if (Nr(e) || !e.output || !e.input && e.avail_in !== 0) return W;
		n = e.state, n.mode === G && (n.mode = lr), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, d = s, f = c, w = Gn;
		e: for (;;) switch (n.mode) {
			case Qn:
				if (n.wrap === 0) {
					n.mode = lr;
					break;
				}
				for (; u < 16;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (n.wrap & 2 && l === 35615) {
					n.wbits === 0 && (n.wbits = 15), n.check = 0, T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = M(n.check, T, 2, 0), l = 0, u = 0, n.mode = $n;
					break;
				}
				if (n.head && (n.head.done = !1), !(n.wrap & 1) || (((l & 255) << 8) + (l >> 8)) % 31) {
					e.msg = "incorrect header check", n.mode = K;
					break;
				}
				if ((l & 15) !== Zn) {
					e.msg = "unknown compression method", n.mode = K;
					break;
				}
				if (l >>>= 4, u -= 4, C = (l & 15) + 8, n.wbits === 0 && (n.wbits = C), C > 15 || C > n.wbits) {
					e.msg = "invalid window size", n.mode = K;
					break;
				}
				n.dmax = 1 << n.wbits, n.flags = 0, e.adler = n.check = 1, n.mode = l & 512 ? sr : G, l = 0, u = 0;
				break;
			case $n:
				for (; u < 16;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (n.flags = l, (n.flags & 255) !== Zn) {
					e.msg = "unknown compression method", n.mode = K;
					break;
				}
				if (n.flags & 57344) {
					e.msg = "unknown header flags set", n.mode = K;
					break;
				}
				n.head && (n.head.text = l >> 8 & 1), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = M(n.check, T, 2, 0)), l = 0, u = 0, n.mode = er;
			case er:
				for (; u < 32;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				n.head && (n.head.time = l), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, T[2] = l >>> 16 & 255, T[3] = l >>> 24 & 255, n.check = M(n.check, T, 4, 0)), l = 0, u = 0, n.mode = tr;
			case tr:
				for (; u < 16;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				n.head && (n.head.xflags = l & 255, n.head.os = l >> 8), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = M(n.check, T, 2, 0)), l = 0, u = 0, n.mode = nr;
			case nr:
				if (n.flags & 1024) {
					for (; u < 16;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.length = l, n.head && (n.head.extra_len = l), n.flags & 512 && n.wrap & 4 && (T[0] = l & 255, T[1] = l >>> 8 & 255, n.check = M(n.check, T, 2, 0)), l = 0, u = 0;
				} else n.head && (n.head.extra = null);
				n.mode = rr;
			case rr:
				if (n.flags & 1024 && (p = n.length, p > s && (p = s), p && (n.head && (C = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Uint8Array(n.head.extra_len)), n.head.extra.set(r.subarray(a, a + p), C)), n.flags & 512 && n.wrap & 4 && (n.check = M(n.check, r, p, a)), s -= p, a += p, n.length -= p), n.length)) break e;
				n.length = 0, n.mode = ir;
			case ir:
				if (n.flags & 2048) {
					if (s === 0) break e;
					p = 0;
					do
						C = r[a + p++], n.head && C && n.length < 65536 && (n.head.name += String.fromCharCode(C));
					while (C && p < s);
					if (n.flags & 512 && n.wrap & 4 && (n.check = M(n.check, r, p, a)), s -= p, a += p, C) break e;
				} else n.head && (n.head.name = null);
				n.length = 0, n.mode = ar;
			case ar:
				if (n.flags & 4096) {
					if (s === 0) break e;
					p = 0;
					do
						C = r[a + p++], n.head && C && n.length < 65536 && (n.head.comment += String.fromCharCode(C));
					while (C && p < s);
					if (n.flags & 512 && n.wrap & 4 && (n.check = M(n.check, r, p, a)), s -= p, a += p, C) break e;
				} else n.head && (n.head.comment = null);
				n.mode = or;
			case or:
				if (n.flags & 512) {
					for (; u < 16;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					if (n.wrap & 4 && l !== (n.check & 65535)) {
						e.msg = "header crc mismatch", n.mode = K;
						break;
					}
					l = 0, u = 0;
				}
				n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = G;
				break;
			case sr:
				for (; u < 32;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				e.adler = n.check = jr(l), l = 0, u = 0, n.mode = cr;
			case cr:
				if (n.havedict === 0) return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, qn;
				e.adler = n.check = 1, n.mode = G;
			case G: if (t === Un || t === Wn) break e;
			case lr:
				if (n.last) {
					l >>>= u & 7, u -= u & 7, n.mode = Cr;
					break;
				}
				for (; u < 3;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				switch (n.last = l & 1, l >>>= 1, --u, l & 3) {
					case 0:
						n.mode = ur;
						break;
					case 1:
						if (Hr(n), n.mode = gr, t === Wn) {
							l >>>= 2, u -= 2;
							break e;
						}
						break;
					case 2:
						n.mode = pr;
						break;
					case 3: e.msg = "invalid block type", n.mode = K;
				}
				l >>>= 2, u -= 2;
				break;
			case ur:
				for (l >>>= u & 7, u -= u & 7; u < 32;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if ((l & 65535) != (l >>> 16 ^ 65535)) {
					e.msg = "invalid stored block lengths", n.mode = K;
					break;
				}
				if (n.length = l & 65535, l = 0, u = 0, n.mode = dr, t === Wn) break e;
			case dr: n.mode = fr;
			case fr:
				if (p = n.length, p) {
					if (p > s && (p = s), p > c && (p = c), p === 0) break e;
					i.set(r.subarray(a, a + p), o), s -= p, a += p, c -= p, o += p, n.length -= p;
					break;
				}
				n.mode = G;
				break;
			case pr:
				for (; u < 14;) {
					if (s === 0) break e;
					s--, l += r[a++] << u, u += 8;
				}
				if (n.nlen = (l & 31) + 257, l >>>= 5, u -= 5, n.ndist = (l & 31) + 1, l >>>= 5, u -= 5, n.ncode = (l & 15) + 4, l >>>= 4, u -= 4, n.nlen > 286 || n.ndist > 30) {
					e.msg = "too many length or distance symbols", n.mode = K;
					break;
				}
				n.have = 0, n.mode = mr;
			case mr:
				for (; n.have < n.ncode;) {
					for (; u < 3;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.lens[O[n.have++]] = l & 7, l >>>= 3, u -= 3;
				}
				for (; n.have < 19;) n.lens[O[n.have++]] = 0;
				if (n.lencode = n.lendyn, n.lenbits = 7, E = { bits: n.lenbits }, w = Rn(zn, n.lens, 0, 19, n.lencode, 0, n.work, E), n.lenbits = E.bits, w) {
					e.msg = "invalid code lengths set", n.mode = K;
					break;
				}
				n.have = 0, n.mode = hr;
			case hr:
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
								e.msg = "invalid bit length repeat", n.mode = K;
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
							e.msg = "invalid bit length repeat", n.mode = K;
							break;
						}
						for (; p--;) n.lens[n.have++] = C;
					}
				}
				if (n.mode === K) break;
				if (n.lens[256] === 0) {
					e.msg = "invalid code -- missing end-of-block", n.mode = K;
					break;
				}
				if (n.lenbits = 9, E = { bits: n.lenbits }, w = Rn(Bn, n.lens, 0, n.nlen, n.lencode, 0, n.work, E), n.lenbits = E.bits, w) {
					e.msg = "invalid literal/lengths set", n.mode = K;
					break;
				}
				if (n.distbits = 6, n.distcode = n.distdyn, E = { bits: n.distbits }, w = Rn(Vn, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, E), n.distbits = E.bits, w) {
					e.msg = "invalid distances set", n.mode = K;
					break;
				}
				if (n.mode = gr, t === Wn) break e;
			case gr: n.mode = _r;
			case _r:
				if (s >= 6 && c >= 258) {
					e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, Dn(e, f), o = e.next_out, i = e.output, c = e.avail_out, a = e.next_in, r = e.input, s = e.avail_in, l = n.hold, u = n.bits, n.mode === G && (n.back = -1);
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
					n.mode = Sr;
					break;
				}
				if (v & 32) {
					n.back = -1, n.mode = G;
					break;
				}
				if (v & 64) {
					e.msg = "invalid literal/length code", n.mode = K;
					break;
				}
				n.extra = v & 15, n.mode = vr;
			case vr:
				if (n.extra) {
					for (D = n.extra; u < D;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.length += l & (1 << n.extra) - 1, l >>>= n.extra, u -= n.extra, n.back += n.extra;
				}
				n.was = n.length, n.mode = yr;
			case yr:
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
					e.msg = "invalid distance code", n.mode = K;
					break;
				}
				n.offset = y, n.extra = v & 15, n.mode = br;
			case br:
				if (n.extra) {
					for (D = n.extra; u < D;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					n.offset += l & (1 << n.extra) - 1, l >>>= n.extra, u -= n.extra, n.back += n.extra;
				}
				if (n.offset > n.dmax) {
					e.msg = "invalid distance too far back", n.mode = K;
					break;
				}
				n.mode = xr;
			case xr:
				if (c === 0) break e;
				if (p = f - c, n.offset > p) {
					if (p = n.offset - p, p > n.whave && n.sane) {
						e.msg = "invalid distance too far back", n.mode = K;
						break;
					}
					p > n.wnext ? (p -= n.wnext, m = n.wsize - p) : m = n.wnext - p, p > n.length && (p = n.length), h = n.window;
				} else h = i, m = o - n.offset, p = n.length;
				p > c && (p = c), c -= p, n.length -= p;
				do
					i[o++] = h[m++];
				while (--p);
				n.length === 0 && (n.mode = _r);
				break;
			case Sr:
				if (c === 0) break e;
				i[o++] = n.length, c--, n.mode = _r;
				break;
			case Cr:
				if (n.wrap) {
					for (; u < 32;) {
						if (s === 0) break e;
						s--, l |= r[a++] << u, u += 8;
					}
					if (f -= c, e.total_out += f, n.total += f, n.wrap & 4 && f && (e.adler = n.check = n.flags ? M(n.check, i, f, o - f) : He(n.check, i, f, o - f)), f = c, n.wrap & 4 && (n.flags ? l : jr(l)) !== n.check) {
						e.msg = "incorrect data check", n.mode = K;
						break;
					}
					l = 0, u = 0;
				}
				n.mode = wr;
			case wr:
				if (n.wrap && n.flags) {
					for (; u < 32;) {
						if (s === 0) break e;
						s--, l += r[a++] << u, u += 8;
					}
					if (n.wrap & 4 && l !== (n.total | 0)) {
						e.msg = "incorrect length check", n.mode = K;
						break;
					}
					l = 0, u = 0;
				}
				n.mode = Tr;
			case Tr:
				w = Kn;
				break e;
			case K:
				w = Jn;
				break e;
			case Er: return Yn;
			case Dr:
			default: return W;
		}
		return e.next_out = o, e.avail_out = c, e.next_in = a, e.avail_in = s, n.hold = l, n.bits = u, (n.wsize || f !== e.avail_out && n.mode < K && (n.mode < Cr || t !== Hn)) && Ur(e, e.output, e.next_out, f - e.avail_out), d -= e.avail_in, f -= e.avail_out, e.total_in += d, e.total_out += f, n.total += f, n.wrap & 4 && f && (e.adler = n.check = n.flags ? M(n.check, i, f, e.next_out - f) : He(n.check, i, f, e.next_out - f)), e.data_type = n.bits + (n.last ? 64 : 0) + (n.mode === G ? 128 : 0) + (n.mode === gr || n.mode === dr ? 256 : 0), (d === 0 && f === 0 || t === Hn) && w === Gn && (w = Xn), w;
	},
	inflateEnd: (e) => {
		if (Nr(e)) return W;
		let t = e.state;
		return t.window &&= null, e.state = null, Gn;
	},
	inflateGetHeader: (e, t) => {
		if (Nr(e)) return W;
		let n = e.state;
		return n.wrap & 2 ? (n.head = t, t.done = !1, Gn) : W;
	},
	inflateSetDictionary: (e, t) => {
		let n = t.length, r, i, a;
		return Nr(e) || (r = e.state, r.wrap !== 0 && r.mode !== cr) ? W : r.mode === cr && (i = 1, i = He(i, t, n, 0), i !== r.check) ? Jn : (a = Ur(e, t, n, n), a ? (r.mode = Er, Yn) : (r.havedict = 1, Gn));
	},
	inflateInfo: "pako inflate (from Nodeca project)"
};
function Wr() {
	this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
}
var Gr = Wr, Kr = Object.prototype.toString, { Z_NO_FLUSH: qr, Z_FINISH: Jr, Z_OK: Yr, Z_STREAM_END: Xr, Z_NEED_DICT: Zr, Z_STREAM_ERROR: Qr, Z_DATA_ERROR: $r, Z_MEM_ERROR: ei, Z_BUF_ERROR: ti } = Ge, ni = {
	chunkSize: 65536,
	windowBits: 15,
	to: ""
};
function ri(e) {
	this.options = en.assign({}, ni, e || {});
	let t = this.options;
	t.raw && t.windowBits >= 0 && t.windowBits < 16 && (t.windowBits = -t.windowBits, t.windowBits === 0 && (t.windowBits = -15)), t.windowBits >= 0 && t.windowBits < 16 && !(e && e.windowBits) && (t.windowBits += 32), t.windowBits > 15 && t.windowBits < 48 && (t.windowBits & 15 || (t.windowBits |= 15)), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new cn(), this.strm.avail_out = 0;
	let n = q.inflateInit2(this.strm, t.windowBits);
	if (n !== Yr || (this.header = new Gr(), q.inflateGetHeader(this.strm, this.header), t.dictionary && (typeof t.dictionary == "string" ? t.dictionary = on.string2buf(t.dictionary) : Kr.call(t.dictionary) === "[object ArrayBuffer]" && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = q.inflateSetDictionary(this.strm, t.dictionary), n !== Yr)))) throw Error(We[n]);
}
ri.prototype.push = function(e, t) {
	let n = this.strm, r = this.options.chunkSize, i = this.options.dictionary, a, o, s;
	if (this.ended) return !1;
	for (o = t === ~~t ? t : t === !0 ? Jr : qr, n.input = Kr.call(e) === "[object ArrayBuffer]" ? new Uint8Array(e) : e, n.next_in = 0, n.avail_in = n.input.length;;) {
		for (n.avail_out === 0 && (n.output = new Uint8Array(r), n.next_out = 0, n.avail_out = r), a = q.inflate(n, o), a === Zr && i && (a = q.inflateSetDictionary(n, i), a === Yr ? a = q.inflate(n, o) : a === $r && (a = Zr)); n.avail_in > 0 && a === Xr && n.state.wrap & 2 && n.state.flags !== 0 && n.input[n.next_in] !== 0;) q.inflateReset(n), a = q.inflate(n, o);
		switch (a) {
			case Qr:
			case $r:
			case Zr:
			case ei: return this.onEnd(a), this.ended = !0, !1;
		}
		if (s = n.avail_out, n.next_out && (n.avail_out === 0 || a === Xr || o > 0)) {
			if (this.options.to === "string") {
				let e = on.utf8border(n.output, n.next_out), t = n.next_out - e, i = on.buf2string(n.output, e);
				n.next_out = t, n.avail_out = r - t, t && n.output.set(n.output.subarray(e, e + t), 0), this.onData(i);
			} else this.onData(n.output.length === n.next_out ? n.output : n.output.subarray(0, n.next_out)), n.avail_out = 0, n.next_out = 0;
		}
		if (a !== Yr && a !== ti || s !== 0) {
			if (a === Xr) return a = q.inflateEnd(this.strm), this.onEnd(a), this.ended = !0, !0;
			if (n.avail_in === 0) {
				if (o === Jr) return a = q.inflateEnd(this.strm), this.onEnd(a === Yr ? ti : a), this.ended = !0, !1;
				break;
			}
		}
	}
	return !0;
}, ri.prototype.onData = function(e) {
	this.chunks.push(e);
}, ri.prototype.onEnd = function(e) {
	e === Yr && (this.result = this.options.to === "string" ? this.chunks.join("") : en.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
};
function ii(e, t) {
	let n = new ri(t);
	if (n.push(e, !0), n.err) throw n.msg || We[n.err];
	return n.result;
}
function ai(e, t) {
	return t ||= {}, t.raw = !0, ii(e, t);
}
var oi = {
	Inflate: ri,
	inflate: ii,
	inflateRaw: ai,
	ungzip: ii,
	constants: Ge
}, { Deflate: si, deflate: ci, deflateRaw: li, gzip: ui } = wn, { Inflate: di, inflate: fi, inflateRaw: pi, ungzip: mi } = oi, hi = ci, gi = di;
// node_modules/esptool-js/lib/util.js
function _i(e, t, n = 255) {
	let r = e.length % t;
	if (r !== 0) {
		let i = new Uint8Array(t - r).fill(n), a = new Uint8Array(e.length + i.length);
		return a.set(e), a.set(i, e.length), a;
	}
	return e;
}
function vi(e, t = 239) {
	for (let n = 0; n < e.length; n++) t ^= e[n];
	return t;
}
function yi(e) {
	let t = new Uint8Array(e.length);
	for (let n = 0; n < e.length; n++) t[n] = e.charCodeAt(n);
	return t;
}
function J(e) {
	return new Promise((t) => setTimeout(t, e));
}
// node_modules/esptool-js/lib/webserial.js
var bi = class {
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
		for (; Date.now() < n && this.buffer.length !== r;) r = this.buffer.length, await J(e);
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
			} else await J(1);
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
		return typeof n.setBaudRate == "function" ? (this.tracing && this.trace(`Changing host baud rate to ${e} in place`), await n.setBaudRate(e), this.baudrate = e, !1) : (this.tracing && this.trace(`Reopening serial port at ${e} baud`), await this.disconnect(), await J(50), await this.connect(e, t), await J(50), this.readLoop(), !0);
	}
	async waitForUnlock(e) {
		for (; this.device.readable && this.device.readable.locked || this.device.writable && this.device.writable.locked;) await J(e);
	}
	async disconnect() {
		this.device.readable?.locked && await this.reader?.cancel(), await this.waitForUnlock(400), await this.device.close(), this.reader = void 0;
	}
};
// node_modules/esptool-js/lib/reset.js
function Y(e) {
	return new Promise((t) => setTimeout(t, e));
}
var xi = class {
	constructor(e, t) {
		this.resetDelay = t, this.transport = e;
	}
	async reset() {
		await this.transport.setSignals(!1, !0), await Y(100), await this.transport.setSignals(!0, !1), await Y(this.resetDelay), await this.transport.setSignals(!1, !1);
	}
}, Si = class {
	constructor(e) {
		this.transport = e;
	}
	async reset() {
		await this.transport.setRTS(!1), await this.transport.setDTR(!1), await Y(100), await this.transport.setDTR(!0), await this.transport.setRTS(!1), await Y(100), await this.transport.setRTS(!0), await this.transport.setDTR(!1), await this.transport.setRTS(!0), await Y(100), await this.transport.setRTS(!1), await this.transport.setDTR(!1);
	}
}, Ci = class {
	constructor(e, t = !1) {
		this.transport = e, this.usingUsbOtg = t, this.transport = e;
	}
	async reset() {
		this.usingUsbOtg ? (await Y(200), await this.transport.setRTS(!1), await Y(200)) : (await Y(100), await this.transport.setRTS(!1));
	}
};
function wi(e) {
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
var Ti = class {
	constructor(e, t) {
		this.transport = e, this.sequenceString = t, this.transport = e;
	}
	async reset() {
		let e = {
			D: async (e) => await this.transport.setDTR(e),
			R: async (e) => await this.transport.setRTS(e),
			W: async (e) => await Y(e)
		};
		try {
			if (!wi(this.sequenceString)) return;
			let t = this.sequenceString.split("|");
			for (let n of t) {
				let t = n[0], r = n.slice(1);
				t === "W" ? await e.W(Number(r)) : (t === "D" || t === "R") && await e[t](r === "1");
			}
		} catch {
			throw Error("Invalid custom reset sequence");
		}
	}
}, Ei = /* @__PURE__ */ s(((e, t) => {
	t.exports = function(e) {
		return atob(e);
	};
})), Di = /* @__PURE__ */ c({
	bss_start: () => Ni,
	data: () => ji,
	data_start: () => Mi,
	default: () => Pi,
	entry: () => Oi,
	text: () => ki,
	text_start: () => Ai
}), Oi, ki, Ai, ji, Mi, Ni, Pi, Fi = o((() => {
	Oi = 0x400a902c, ki = "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", Ai = 0x400a8000, ji = "AMD8PzyHCkBPSEFJAAAAAD2UCkBClApArpQKQLiUCkBnlQpA+pQKQAWUCkCllQpAIJYKQJmWCkCdmApASpYKQJ2YCkD+lgpAI5cKQDSXCkCulApAkZcKQKeXCkAUhQpALIIKQLCCCkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkCQhApAkIQKQJCECkA=", Mi = 0x3ffded6c, Ni = 0x3ffcc000, Pi = {
		entry: Oi,
		text: ki,
		text_start: Ai,
		data: ji,
		data_start: Mi,
		bss_start: Ni
	};
})), Ii = /* @__PURE__ */ c({
	bss_start: () => Hi,
	data: () => Bi,
	data_start: () => Vi,
	default: () => Ui,
	entry: () => Li,
	text: () => Ri,
	text_start: () => zi
}), Li, Ri, zi, Bi, Vi, Hi, Ui, Wi = o((() => {
	Li = 0x40380f90, Ri = "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", zi = 0x40380000, Bi = "+gU4QDxAyj9eEjhAahI4QLoSOEDMEjhAxhM4QEQTOEA2EjhACBQ4QI4UOEDmFDhA7BE4QKIUOEDsEThAYBU4QHAVOEB0FThAuhI4QMIVOEDcFThArAM4QFQBOECcAThAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhAPgM4QD4DOEA+AzhA", Vi = 0x3fcb6d6c, Hi = 0x3fca4000, Ui = {
		entry: Li,
		text: Ri,
		text_start: zi,
		data: Bi,
		data_start: Vi,
		bss_start: Hi
	};
})), Gi = /* @__PURE__ */ c({
	bss_start: () => Zi,
	data: () => Yi,
	data_start: () => Xi,
	default: () => Qi,
	entry: () => Ki,
	text: () => qi,
	text_start: () => Ji
}), Ki, qi, Ji, Yi, Xi, Zi, Qi, $i = o((() => {
	Ki = 0x40380e9a, qi = "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", Ji = 0x40380000, Yi = "wgY4QDhAyD+GEjhAkBI4QOASOEDyEjhA7BM4QGoTOEBeEjhALhQ4QLQUOEAMFThAFBI4QMgUOEAUEjhAhhU4QJYVOECaFThA4BI4QOgVOEACFjhA1gM4QFABOECYAThAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhAOgM4QDoDOEA6AzhA", Xi = 0x3fc96d68, Zi = 0x3fc84000, Qi = {
		entry: Ki,
		text: qi,
		text_start: Ji,
		data: Yi,
		data_start: Xi,
		bss_start: Zi
	};
})), ea = /* @__PURE__ */ c({
	bss_start: () => oa,
	data: () => ia,
	data_start: () => aa,
	default: () => sa,
	entry: () => ta,
	text: () => na,
	text_start: () => ra
}), ta, na, ra, ia, aa, oa, sa, ca = o((() => {
	ta = 0x408015d2, na = "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", ra = 0x40800000, ia = "2AeAQNwBhEDcGoBA6BqAQDobgEBOG4BAXhyAQNIbgEC0GoBAohyAQCodgECCHYBAXhqAQD4dgEBeGoBA/h2AQA4egEASHoBAOhuAQGIegEB+HoBAFAWAQFABgEAgCYBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", aa = 0x40852f0c, oa = 0x40840000, sa = {
		entry: ta,
		text: na,
		text_start: ra,
		data: ia,
		data_start: aa,
		bss_start: oa
	};
})), la = /* @__PURE__ */ c({
	bss_start: () => ha,
	data: () => pa,
	data_start: () => ma,
	default: () => ga,
	entry: () => ua,
	text: () => da,
	text_start: () => fa
}), ua, da, fa, pa, ma, ha, ga, _a = o((() => {
	ua = 0x408011bc, da = "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", fa = 0x40800000, pa = "4AeAQNwBhEB2FoBAghaAQNQWgEDoFoBA+BeAQGwXgEBOFoBAPBiAQMQYgEAcGYBA+BWAQNgYgED4FYBAmBmAQKgZgECsGYBA1BaAQPwZgEAYGoBAFAWAQFABgEAoCYBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", ma = 0x40852f0c, ha = 0x40840000, ga = {
		entry: ua,
		text: da,
		text_start: fa,
		data: pa,
		data_start: ma,
		bss_start: ha
	};
})), va = /* @__PURE__ */ c({
	bss_start: () => wa,
	data: () => Sa,
	data_start: () => Ca,
	default: () => Ta,
	entry: () => ya,
	text: () => ba,
	text_start: () => xa
}), ya, ba, xa, Sa, Ca, wa, Ta, Ea = o((() => {
	ya = 0x40801130, ba = "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", xa = 0x40800000, Sa = "ugaAQDhAgEBCFYBATBWAQJwVgECuFYBAqBaAQCYWgEAaFYBA6haAQHAXgEDIF4BA0BSAQIQXgEDQFIBAQhiAQFIYgEBWGIBAnBWAQKQYgEC+GIBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", Ca = 0x40816d68, wa = 0x40804000, Ta = {
		entry: ya,
		text: ba,
		text_start: xa,
		data: Sa,
		data_start: Ca,
		bss_start: wa
	};
})), Da = /* @__PURE__ */ c({
	bss_start: () => Na,
	data: () => ja,
	data_start: () => Ma,
	default: () => Pa,
	entry: () => Oa,
	text: () => ka,
	text_start: () => Aa
}), Oa, ka, Aa, ja, Ma, Na, Pa, Fa = o((() => {
	Oa = 0x40800e92, ka = "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", Aa = 0x40800000, ja = "ugaAQDgAg0CSEoBAnBKAQOwSgED+EoBA+BOAQHYTgEBqEoBAOhSAQMAUgEAYFYBAIBKAQNQUgEAgEoBAkhWAQKIVgECmFYBA7BKAQPQVgEAOFoBA1gOAQFABgECYAYBAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BAOgOAQDoDgEA6A4BA", Ma = 0x40842d68, Na = 0x40830000, Pa = {
		entry: Oa,
		text: ka,
		text_start: Aa,
		data: ja,
		data_start: Ma,
		bss_start: Na
	};
})), Ia = /* @__PURE__ */ c({
	bss_start: () => Ha,
	data: () => Ba,
	data_start: () => Va,
	default: () => Ua,
	entry: () => La,
	text: () => Ra,
	text_start: () => za
}), La, Ra, za, Ba, Va, Ha, Ua, Wa = o((() => {
	La = 0x40810e92, Ra = "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", za = 0x40810000, Ba = "ugaBQDgAg0CmEoFAsBKBQAATgUASE4FADBSBQIoTgUB+EoFAThSBQNQUgUAsFYFANBKBQOgUgUA0EoFAphWBQLYVgUC6FYFAABOBQAgWgUAiFoFA1gOBQFABgUCYAYFAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FAOgOBQDoDgUA6A4FA", Va = 0x40842d68, Ha = 0x40830000, Ua = {
		entry: La,
		text: Ra,
		text_start: za,
		data: Ba,
		data_start: Va,
		bss_start: Ha
	};
})), Ga = /* @__PURE__ */ c({
	bss_start: () => Za,
	data: () => Ya,
	data_start: () => Xa,
	default: () => Qa,
	entry: () => Ka,
	text: () => qa,
	text_start: () => Ja
}), Ka, qa, Ja, Ya, Xa, Za, Qa, $a = o((() => {
	Ka = 0x4ff11456, qa = "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", Ja = 0x4ff10000, Ya = "KgfxT4gA9U9OG/FPWhvxT6ob8U+8G/FPwhzxTzYc8U8mG/FPBB3xT5Ad8U+2HfFP3BrxT6Qd8U/cGvFPMB7xT0Ae8U9EHvFPqhvxT5Ie8U+sHvFP0APxT0oB8U+SAfFPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FPNAPxTzQD8U80A/FP", Xa = 0x4ff62db8, Za = 0x4ff50000, Qa = {
		entry: Ka,
		text: qa,
		text_start: Ja,
		data: Ya,
		data_start: Xa,
		bss_start: Za
	};
})), eo = /* @__PURE__ */ c({
	bss_start: () => oo,
	data: () => io,
	data_start: () => ao,
	default: () => so,
	entry: () => to,
	text: () => no,
	text_start: () => ro
}), to, no, ro, io, ao, oo, so, co = o((() => {
	to = 0x4ff51456, no = "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", ro = 0x4ff50000, io = "Kgf1T4gA9k9OG/VPWhv1T6ob9U+8G/VPwhz1TzYc9U8mG/VPBB31T5Ad9U+2HfVP3Br1T6Qd9U/cGvVPMB71T0Ae9U9EHvVPqhv1T5Ie9U+sHvVP0AP1T0oB9U+SAfVPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VPNAP1TzQD9U80A/VP", ao = 0x4ff72db8, oo = 0x4ff60000, so = {
		entry: to,
		text: no,
		text_start: ro,
		data: io,
		data_start: ao,
		bss_start: oo
	};
})), lo = /* @__PURE__ */ c({
	bss_start: () => go,
	data: () => mo,
	data_start: () => ho,
	default: () => _o,
	entry: () => uo,
	text: () => fo,
	text_start: () => po
}), uo, fo, po, mo, ho, go, _o, vo = o((() => {
	uo = 0x400290a4, fo = "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", po = 0x40028000, mo = "QAD9P5SHAkBPSEFJAAAAAG2UAkBylAJA2pQCQOWUAkCglQJAMpUCQD2UAkDclQJAVJYCQL6WAkC5mAJAdpYCQLmYAkAelwJAP5cCQE6XAkDalAJAoJcCQLSXAkAMhQJAJIICQKiCAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkCIhAJAiIQCQIiEAkA=", ho = 0x3ffe2dc0, go = 0x3ffd0000, _o = {
		entry: uo,
		text: fo,
		text_start: po,
		data: mo,
		data_start: ho,
		bss_start: go
	};
})), yo = /* @__PURE__ */ c({
	bss_start: () => To,
	data: () => Co,
	data_start: () => wo,
	default: () => Do,
	entry: () => bo,
	plugin_first_opcode: () => 213,
	plugin_table_entries: () => 27,
	plugin_table_offset: () => 156,
	plugins: () => Eo,
	text: () => xo,
	text_start: () => So
}), bo, xo, So, Co, wo, To, Eo, Do, Oo = o((() => {
	bo = 0x40379524, xo = "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", So = 0x40378000, Co = "QADKPxgYGBgQAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwiDdAT0hBSQAAAAA9mTdAQpk3QKqZN0C1mTdAc5o3QAKaN0ANmTdAqpo3QCibN0CSmzdAjZ03QEqbN0CNnTdA9ps3QBacN0AmnDdAqpk3QHqcN0CMnDdAOIU3QBSCN0CYgjdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdAeIQ3QHiEN0B4hDdA", wo = 0x3fcb2dc0, To = 0x3fca0000, Eo = { nand: {
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
	} }, Do = {
		entry: bo,
		text: xo,
		text_start: So,
		data: Co,
		data_start: wo,
		bss_start: To,
		plugin_first_opcode: 213,
		plugin_table_offset: 156,
		plugin_table_entries: 27,
		plugins: Eo
	};
})), ko = /* @__PURE__ */ c({
	bss_start: () => Fo,
	data: () => No,
	data_start: () => Po,
	default: () => Io,
	entry: () => Ao,
	text: () => jo,
	text_start: () => Mo
}), Ao, jo, Mo, No, Po, Fo, Io, Lo = o((() => {
	Ao = 788537886, jo = "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", Mo = 788533248, No = "FBcAL4igAC9CJwAvTicAL54nAC+wJwAvtigALyooAC8aJwAv+CgAL4QpAC+wKQAv0CYAL5gpAC/QJgAvKioALzoqAC8+KgAvnicAL4wqAC+mKgAv0BMAL0oRAC+SEQAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAvNBMALzQTAC80EwAv", Po = 788647352, Fo = 788570112, Io = {
		entry: Ao,
		text: jo,
		text_start: Mo,
		data: No,
		data_start: Po,
		bss_start: Fo
	};
})), Ro = /* @__PURE__ */ c({
	bss_start: () => Wo,
	data: () => Ho,
	data_start: () => Uo,
	default: () => Go,
	entry: () => zo,
	text: () => Bo,
	text_start: () => Vo
}), zo, Bo, Vo, Ho, Uo, Wo, Go, Ko = o((() => {
	zo = 0x4010c504, Bo = "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", Vo = 0x4010c500, Ho = "RM0QQCyB/j8AAAAAAAAAAAAAAQAAEAAAAAEAAP//AAD/////A9cQQFHXEECE1xBAKdgQQDjnEECF2BBA3dgQQCzZEEA45xBAB9oQQHzaEEAs2xBAOOcQQDjnEEDV2xBAOOcQQJveEEBv3xBAsd8QQDjnEEA45xBAU+AQQDjnEEBL4RBA/eEQQE3jEEAb5BBA9eQQQDjnEEA45xBAOOcQQDjnEEAN5hBAOOcQQCTnEEDw3BBA8tcQQDjnEEAs2hBAb9kQQDjnEEC15hBA/+YQQDjnEEA45xBAOOcQQDjnEEA45xBAOOcQQDjnEEA45xBAndkQQNjZEEB25RBAWMwQQHzJEED0yBBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAhMYQQITGEECExhBAAQAAAAIAAAADAAAABAAAAAUAAAAHAAAACQAAAA0AAAARAAAAGQAAACEAAAAxAAAAQQAAAGEAAACBAAAAwQAAAAEBAACBAQAAAQIAAAEDAAABBAAAAQYAAAEIAAABDAAAARAAAAEYAAABIAAAATAAAAFAAAABYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAACAAAAAgAAAAMAAAADAAAABAAAAAQAAAAFAAAABQAAAAYAAAAGAAAABwAAAAcAAAAIAAAACAAAAAkAAAAJAAAACgAAAAoAAAALAAAACwAAAAwAAAAMAAAADQAAAA0AAAAAAAAAAAAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAA0AAAAPAAAAEQAAABMAAAAXAAAAGwAAAB8AAAAjAAAAKwAAADMAAAA7AAAAQwAAAFMAAABjAAAAcwAAAIMAAACjAAAAwwAAAOMAAAACAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAABAAAAAQAAAAEAAAACAAAAAgAAAAIAAAACAAAAAwAAAAMAAAADAAAAAwAAAAQAAAAEAAAABAAAAAQAAAAFAAAABQAAAAUAAAAFAAAAAAAAAAAAAAAAAAAAEBESAAgHCQYKBQsEDAMNAg4BDwABAQAAAQAAAAQAAAAFBQQAAgMHAAMDCwA=", Uo = 0x3fffae6c, Wo = 0x3ffe8100, Go = {
		entry: zo,
		text: Bo,
		text_start: Vo,
		data: Ho,
		data_start: Uo,
		bss_start: Wo
	};
})), qo = /* @__PURE__ */ u(Ei(), 1);
async function Jo(e, t) {
	let n;
	switch (e) {
		case "ESP32":
			n = await Promise.resolve().then(() => (Fi(), Di));
			break;
		case "ESP32-C2":
			n = await Promise.resolve().then(() => (Wi(), Ii));
			break;
		case "ESP32-C3":
			n = await Promise.resolve().then(() => ($i(), Gi));
			break;
		case "ESP32-C5":
			n = await Promise.resolve().then(() => (ca(), ea));
			break;
		case "ESP32-C6":
			n = await Promise.resolve().then(() => (_a(), la));
			break;
		case "ESP32-C61":
			n = await Promise.resolve().then(() => (Ea(), va));
			break;
		case "ESP32-H2":
			n = await Promise.resolve().then(() => (Fa(), Da));
			break;
		case "ESP32-H4":
			n = await Promise.resolve().then(() => (Wa(), Ia));
			break;
		case "ESP32-H21":
		case "ESP32-E22": break;
		case "ESP32-P4":
			n = t && t < 300 ? await Promise.resolve().then(() => ($a(), Ga)) : await Promise.resolve().then(() => (co(), eo));
			break;
		case "ESP32-S2":
			n = await Promise.resolve().then(() => (vo(), lo));
			break;
		case "ESP32-S3":
			n = await Promise.resolve().then(() => (Oo(), yo));
			break;
		case "ESP32-S31":
			n = await Promise.resolve().then(() => (Lo(), ko));
			break;
		case "ESP8266": n = await Promise.resolve().then(() => (Ko(), Ro));
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
			decodedData: Yo(e.data),
			decodedText: Yo(e.text)
		};
	}
}
function Yo(e) {
	let t = (0, qo.default)(e).split("").map(function(e) {
		return e.charCodeAt(0);
	});
	return new Uint8Array(t);
}
// node_modules/esptool-js/lib/targets/rom.js
var Xo, Zo = o((() => {
	Xo = class {
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
})), Qo = /* @__PURE__ */ c({ ESP8266ROM: () => $o }), $o, es = o((() => {
	Zo(), $o = class extends Xo {
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
	}, $o.IROM_MAP_START = 0x40200000, $o.IROM_MAP_END = 0x40300000;
}));
// node_modules/esptool-js/lib/image/base.js
es();
function ts(e, t) {
	return e + (t - 1 - e % t);
}
function ns(e, t) {
	return e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24;
}
var rs = class e {
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
		this.data = _i(this.data, e, 0);
	}
}, is = class extends rs {
	constructor(e, t, n, r) {
		super(t, n, null, r), this.name = e;
	}
	toString() {
		return `${this.name} ${super.toString()}`;
	}
}, as = class {
	constructor(e) {
		this.SEG_HEADER_LEN = 8, this.SHA256_DIGEST_LEN = 32, this.ELF_FLAG_WRITE = 1, this.ELF_FLAG_READ = 2, this.ELF_FLAG_EXEC = 4, this.segments = [], this.entrypoint = 0, this.elfSha256 = null, this.elfSha256Offset = 0, this.padToSize = 0, this.flashMode = 0, this.flashSizeFreq = 0, this.checksum = 0, this.datalength = 0, this.IROM_ALIGN = 0, this.MMU_PAGE_SIZE_CONF = [], this.ROM_LOADER = e;
	}
	loadCommonHeader(e, t, n) {
		let r = e[t], i = e[t + 1];
		if (this.flashMode = e[t + 2], this.flashSizeFreq = e[t + 3], this.entrypoint = ns(e, t + 4), r !== n) throw new d(`Invalid firmware image magic=0x${r.toString(16)}`);
		return i;
	}
	verify() {
		if (this.segments.length > 16) throw new d(`Invalid segment count ${this.segments.length} (max 16). Usually this indicates a linker script problem.`);
	}
	loadSegment(e, t, n = !1) {
		let r = t, i = ns(e, t), a = ns(e, t + 4);
		this.warnIfUnusualSegment(i, a, n);
		let o = e.slice(t + 8, t + 8 + a);
		if (o.length < a) throw new d(`End of file reading segment 0x${i.toString(16)}, length ${a} (actual length ${o.length})`);
		let s = new rs(i, o, r);
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
		return a.setUint32(0, n.addr, !0), a.setUint32(4, i.length, !0), e.set(i, t + 8), r === null ? 0 : vi(i, r);
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
		return e[ts(t, 16)];
	}
	calculateChecksum() {
		let e = 239;
		for (let t of this.segments) t.includeInChecksum && (e = vi(t.data, e));
		return e;
	}
	appendChecksum(e, t, n) {
		let r = ts(t, 16);
		e[r] = n;
	}
	writeCommonHeader(e, t, n) {
		e[t] = 233, e[t + 1] = n, e[t + 2] = this.flashMode, e[t + 3] = this.flashSizeFreq, new DataView(e.buffer, t + 4).setUint32(0, this.entrypoint, !0);
	}
	isIromAddr(e) {
		return $o.IROM_MAP_START <= e && e < $o.IROM_MAP_END;
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
}, X = class extends as {
	constructor(e, t = null, n = !0, r = !1) {
		super(e), this.securePad = null, this.flashMode = 0, this.flashSizeFreq = 0, this.version = 1, this.WP_PIN_DISABLED = 238, this.wpPin = this.WP_PIN_DISABLED, this.clkDrv = 0, this.qDrv = 0, this.dDrv = 0, this.csDrv = 0, this.hdDrv = 0, this.wpDrv = 0, this.chipId = 0, this.minRev = 0, this.minRevFull = 0, this.maxRevFull = 0, this.storedDigest = null, this.calcDigest = null, this.dataLength = 0, this.IROM_ALIGN = 65536, this.ROM_LOADER = e, this.appendDigest = n, this.ramOnlyHeader = r, t !== null && this.loadFromFile(t);
	}
	async loadFromFile(e) {
		let t = e instanceof Uint8Array ? e : yi(e), n = 0, r = this.loadCommonHeader(t, n, 233);
		n += 8, this.loadExtendedHeader(t, n), n += 16;
		for (let e = 0; e < r; e++) {
			let e = this.loadSegment(t, n);
			n += 8 + e.data.length;
		}
		if (this.checksum = this.readChecksum(t, n), n = ts(n, 16), this.appendDigest) {
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
			if (t instanceof is && t.name === ".flash.appdesc") {
				i.splice(e, 1), i.unshift(t);
				break;
			}
		}
		for (let e = 0; e < a.length; e++) {
			let t = a[e];
			if (t instanceof is && t.name === ".dram0.bootdesc") {
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
			this.appendChecksum(t, n, r), n = ts(n, 16);
			for (let a of i.reverse()) {
				let i = this.getAlignmentDataNeeded(a, n);
				if (i > 0) {
					let a = this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET - this.SEG_HEADER_LEN;
					i < a && (i += this.IROM_ALIGN), i -= this.ROM_LOADER.BOOTLOADER_FLASH_OFFSET;
					let o = new rs(0, new Uint8Array(i).fill(0), n);
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
						let e = new rs(0, new Uint8Array(s).fill(0), n);
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
			let o = (this.IROM_ALIGN - i - 16 - a) % this.IROM_ALIGN, s = new rs(0, new Uint8Array(o).fill(0), n);
			r = this.saveSegment(t, n, s, r), n += 8 + o, e++;
		}
		this.ramOnlyHeader || (this.appendChecksum(t, n, r), n = ts(n, 16));
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
es();
var os = class extends as {
	constructor(e, t = null) {
		super(e), this.version = 1, this.ROM_LOADER = e, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
	}
	loadFromFile(e) {
		let t = e instanceof Uint8Array ? e : yi(e), n = 0, r = this.loadCommonHeader(t, n, 233);
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
}, ss = class e extends as {
	constructor(e, t = null) {
		super(e), this.version = 2, this.ROM_LOADER = e, this.flashMode = 0, this.flashSizeFreq = 0, t !== null && this.loadFromFile(t);
	}
	async loadFromFile(t) {
		let n = t instanceof Uint8Array ? t : yi(t), r = 0, i = this.loadCommonHeader(n, r, e.IMAGE_V2_MAGIC);
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
		return t !== null && (n = t.addr - $o.IROM_MAP_START), `${e.replace(/\.[^/.]+$/, "")}-0x${(n & -4096).toString(16).padStart(5, "0")}.bin`;
	}
};
ss.IMAGE_V2_MAGIC = 234, ss.IMAGE_V2_SEGMENT = 4;
// node_modules/esptool-js/lib/image/others.js
var cs = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, ls = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, us = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, ds = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			16384,
			32768,
			65536
		], this.ROM_LOADER = e;
	}
}, fs = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			8192,
			16384,
			32768,
			65536
		], this.ROM_LOADER = e;
	}
}, ps = class extends fs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, ms = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, hs = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, gs = class extends fs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, _s = class extends fs {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
}, vs = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			8192,
			16384,
			32768,
			65536
		], this.ROM_LOADER = e;
	}
}, ys = class extends ms {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.MMU_PAGE_SIZE_CONF = [
			32768,
			65536,
			131072,
			262144
		], this.ROM_LOADER = e;
	}
}, bs = class extends X {
	constructor(e, t = null, n = !0, r = !1) {
		super(e, t, n, r), this.ROM_LOADER = e;
	}
};
// node_modules/esptool-js/lib/image/index.js
async function xs(e, t) {
	let n = t instanceof Uint8Array ? t : yi(t), r = e.CHIP_NAME.toLowerCase().replace(/[-()]/g, ""), i;
	if (r !== "esp8266") switch (r) {
		case "esp32":
			i = X;
			break;
		case "esp32s2":
			i = cs;
			break;
		case "esp32s3":
			i = ls;
			break;
		case "esp32s31":
			i = ys;
			break;
		case "esp32c3":
			i = us;
			break;
		case "esp32c2":
			i = ds;
			break;
		case "esp32c6":
			i = fs;
			break;
		case "esp32c61":
			i = ps;
			break;
		case "esp32c5":
			i = ms;
			break;
		case "esp32e22":
			i = bs;
			break;
		case "esp32h2":
			i = gs;
			break;
		case "esp32h21":
			i = _s;
			break;
		case "esp32h4":
			i = vs;
			break;
		case "esp32p4":
			i = hs;
			break;
		default: throw new d(`Unsupported chip name: ${r}`);
	}
	else {
		let e = n[0];
		if (e === 233) i = os;
		else if (e === ss.IMAGE_V2_MAGIC) i = ss;
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
var Ss = /* @__PURE__ */ c({ ESP32ROM: () => Cs }), Cs, ws = o((() => {
	Zo(), Cs = class extends Xo {
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
})), Ts = /* @__PURE__ */ c({ ESP32C3ROM: () => Es }), Es, Ds = o((() => {
	ws(), Es = class extends Cs {
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
})), Os = /* @__PURE__ */ c({ ESP32C2ROM: () => ks }), ks, As = o((() => {
	Ds(), ks = class extends Es {
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
})), js = /* @__PURE__ */ c({ ESP32C6ROM: () => Ms }), Ms, Ns = o((() => {
	Ds(), Ms = class extends Es {
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
})), Ps = /* @__PURE__ */ c({ ESP32C5ROM: () => Fs }), Fs, Is = o((() => {
	Ns(), Fs = class extends Ms {
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
})), Ls = /* @__PURE__ */ c({ ESP32C61ROM: () => Rs }), Rs, zs = o((() => {
	Ns(), Rs = class extends Ms {
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
As(), Is(), zs(), ws();
var Bs = class extends Cs {
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
}, Vs = /* @__PURE__ */ c({ ESP32H2ROM: () => Hs }), Hs, Us = o((() => {
	Ns(), Hs = class extends Ms {
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
Us();
var Ws = class extends Hs {
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
Ds();
var Gs = class extends Es {
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
}, Ks = /* @__PURE__ */ c({ ESP32P4ROM: () => qs }), qs, Js = o((() => {
	ws(), qs = class extends Cs {
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
})), Ys = /* @__PURE__ */ c({ ESP32S2ROM: () => Xs }), Xs, Zs = o((() => {
	ws(), Xs = class extends Cs {
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
})), Qs = /* @__PURE__ */ c({ ESP32S3ROM: () => $s }), $s, ec = o((() => {
	ws(), $s = class extends Cs {
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
Js(), Zs(), ec();
var tc = class extends Fs {
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
ws(), Ds(), Is(), Ns(), Us(), es();
var nc = {
	esp8266: new $o(),
	esp32: new Cs(),
	esp32s2: new Xs(),
	esp32s3: new $s(),
	esp32s31: new tc(),
	esp32c3: new Es(),
	esp32c2: new ks(),
	esp32c6: new Ms(),
	esp32c61: new Rs(),
	esp32c5: new Fs(),
	esp32e22: new Bs(),
	esp32h2: new Hs(),
	esp32h21: new Ws(),
	esp32p4: new qs(),
	esp32h4: new Gs()
};
Object.keys(nc);
var rc = Object.values(nc), ic = {
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
function ac(e) {
	let t = {};
	for (let n of Object.keys(ic)) t[n] = (e & ic[n]) !== 0;
	return t;
}
async function oc(e) {
	switch (e) {
		case 0xf01d83: {
			let { ESP32ROM: e } = await Promise.resolve().then(() => (ws(), Ss));
			return new e();
		}
		case 0xc21e06f:
		case 0x6f51306f:
		case 0x7c41a06f: {
			let { ESP32C2ROM: e } = await Promise.resolve().then(() => (As(), Os));
			return new e();
		}
		case 0x6921506f:
		case 456216687:
		case 0x4881606f:
		case 0x4361606f: {
			let { ESP32C3ROM: e } = await Promise.resolve().then(() => (Ds(), Ts));
			return new e();
		}
		case 752910447: {
			let { ESP32C6ROM: e } = await Promise.resolve().then(() => (Ns(), js));
			return new e();
		}
		case 606167151:
		case 871374959:
		case 0x4f81606f: {
			let { ESP32C61ROM: e } = await Promise.resolve().then(() => (zs(), Ls));
			return new e();
		}
		case 285294703:
		case 0x63e1406f:
		case 0x5fd1406f:
		case 820080751: {
			let { ESP32C5ROM: e } = await Promise.resolve().then(() => (Is(), Ps));
			return new e();
		}
		case 0xd7b73e80:
		case 0x97e30068: {
			let { ESP32H2ROM: e } = await Promise.resolve().then(() => (Us(), Vs));
			return new e();
		}
		case 9: {
			let { ESP32S3ROM: e } = await Promise.resolve().then(() => (ec(), Qs));
			return new e();
		}
		case 1990: {
			let { ESP32S2ROM: e } = await Promise.resolve().then(() => (Zs(), Ys));
			return new e();
		}
		case 0xfff0c101: {
			let { ESP8266ROM: e } = await Promise.resolve().then(() => (es(), Qo));
			return new e();
		}
		case 0:
		case 0xaddbad0:
		case 0x7039ad9: {
			let { ESP32P4ROM: e } = await Promise.resolve().then(() => (Js(), Ks));
			return new e();
		}
		default: return null;
	}
}
var sc = class {
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
			classicReset: (e, t) => new xi(e, t),
			customReset: (e, t) => new Ti(e, t),
			hardReset: (e, t) => new Ci(e, t),
			usbJTAGSerialReset: (e) => new Si(e)
		}, e.serialOptions && (this.serialOptions = e.serialOptions), e.terminal && (this.terminal = e.terminal, this.terminal.clean()), e.debugLogging !== void 0 && (this.debugLogging = e.debugLogging), e.port && (this.transport = new bi(e.port)), e.enableTracing !== void 0 && (this.transport.tracing = e.enableTracing), e.resetConstructors?.classicReset && (this.resetConstructors.classicReset = e.resetConstructors?.classicReset), e.resetConstructors?.customReset && (this.resetConstructors.customReset = e.resetConstructors?.customReset), e.resetConstructors?.hardReset && (this.resetConstructors.hardReset = e.resetConstructors?.hardReset), e.resetConstructors?.usbJTAGSerialReset && (this.resetConstructors.usbJTAGSerialReset = e.resetConstructors?.usbJTAGSerialReset), this.info("esptool.js"), this.info("Serial port " + this.transport.getInfo());
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
		for (let t of rc) if (!t.USES_MAGIC_VALUE && e === t.IMAGE_CHIP_ID) return t;
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
			if (e instanceof f) return await this.readSecureDownloadMode(), nc.esp32s2;
			throw e;
		}
	}
	applyDetectedChip(e) {
		this.chip = e, e.SPI_ADDR_REG_MSB !== void 0 && (this.SPI_ADDR_REG_MSB = e.SPI_ADDR_REG_MSB);
	}
	async chipFromMagicValue() {
		let e = await this.readReg(this.CHIP_DETECT_MAGIC_REG_ADDR) >>> 0;
		this.debug("Chip Magic " + e.toString(16));
		let t = await oc(e);
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
			parsedFlags: ac(r)
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
			let t = r, n = r + e, i = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, a = await Jo(this.chip.CHIP_NAME, i);
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
			this.debug(`Block ${t} write failed (${n}), retrying with ${e} attempts left...`), await J(this.WRITE_BLOCK_RETRY_DELAY_MS);
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
			this.debug(`Compressed block ${t} write failed (${n}), retrying with ${e} attempts left...`), await J(this.WRITE_BLOCK_RETRY_DELAY_MS);
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
			t = _i(t, 4, 0);
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
		let e = this.chip.getChipRevision ? await this.chip.getChipRevision(this) : void 0, t = await Jo(this.chip.CHIP_NAME, e);
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
		await this.command(this.ESP_CHANGE_BAUDRATE, t), this.info("Changed"), this.info("If the chip does not respond to any further commands, consider using a lower baud rate."), await J(50), this.securityInfoCache = null;
		let n = !1, r;
		try {
			n = await this.transport.changeBaudrate(this.baudrate, this.serialOptions);
		} catch (e) {
			r = e, this.debug(`Host baud-rate change failed: ${e}`);
		}
		await this.transport.drainInput(), (r || !await this.isResponsive()) && (r ? this.info(`Unable to use ${this.baudrate} baud. Continuing at ${this.romBaudrate} baud.`) : n ? this.info(`The board reset while the serial port was reopened. Continuing at ${this.romBaudrate} baud.`) : this.info(`The board stopped responding after changing baud rate. Continuing at ${this.romBaudrate} baud.`), await this.transport.disconnect(), await J(50), this.baudrate = this.romBaudrate, this.IS_STUB = !1, await this.connect("default_reset", 7, !1), await this.runStub());
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
			(await xs(this.chip, e)).verify();
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
			let e = await xs(this.chip, f), t = f.slice(0, e.datalength), n = f.slice(e.datalength + e.SHA256_DIGEST_LEN), r = await crypto.subtle.digest("SHA-256", n), i = new Uint8Array(r), a = new Uint8Array(t.length + i.length + n.length);
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
			n = _i(n, 4), r = e.fileArray[i].address, n = await this._updateImageFlashParams(n, r, e.flashMode, e.flashFreq, t);
			let a = null;
			e.calculateMD5Hash && (a = e.calculateMD5Hash(n), this.debug("Image MD5 " + a));
			let o = n.length, s;
			e.compress ? (n = hi(n, { level: 9 }), s = await this.flashDeflBegin(o, n.length, r)) : s = await this.flashBegin(o, r);
			let c = 0, l = 0, u = n.length;
			e.reportProgress && e.reportProgress(i, 0, u);
			let f = /* @__PURE__ */ new Date(), p = f.getTime(), m = 5e3, h = new gi({ chunkSize: 1 }), g = 0;
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
}, cc;
(function(e) {
	e[e.DOUBLE = 1] = "DOUBLE", e[e.FLOAT = 2] = "FLOAT", e[e.INT64 = 3] = "INT64", e[e.UINT64 = 4] = "UINT64", e[e.INT32 = 5] = "INT32", e[e.FIXED64 = 6] = "FIXED64", e[e.FIXED32 = 7] = "FIXED32", e[e.BOOL = 8] = "BOOL", e[e.STRING = 9] = "STRING", e[e.BYTES = 12] = "BYTES", e[e.UINT32 = 13] = "UINT32", e[e.SFIXED32 = 15] = "SFIXED32", e[e.SFIXED64 = 16] = "SFIXED64", e[e.SINT32 = 17] = "SINT32", e[e.SINT64 = 18] = "SINT64";
})(cc ||= {}), cc.INT64, cc.UINT64, cc.FIXED64, cc.SFIXED64, cc.SINT64, cc.FLOAT, cc.DOUBLE;
var Z = (e, t = {}, ...n) => {
	let r = document.createElement(e);
	for (let [e, n] of Object.entries(t)) e === "class" ? r.className = n : e.startsWith("on") ? r.addEventListener(e.slice(2), n) : n != null && r.setAttribute(e, n);
	for (let e of n) e != null && r.append(e);
	return r;
}, lc = (e) => Object.assign(Error(e), { de: !0 });
function uc(e) {
	if (e?.de) return e.message;
	let t = e?.name ?? "", n = String(e?.message ?? e ?? "");
	return t === "NotFoundError" || /No port selected|User cancelled/i.test(n) ? "Kein Gerät ausgewählt." : t === "SecurityError" ? "Der Browser hat den Zugriff verweigert. Seite über https öffnen und erneut versuchen." : t === "NetworkError" || /Failed to open serial port|already open/i.test(n) ? "Der USB-Anschluss ist belegt. Andere Programme oder Browser-Tabs mit dem Gerät schließen und neu verbinden." : t === "InvalidStateError" ? "Die Verbindung ist schon offen. Erst trennen, dann neu verbinden." : /timeout|timed out/i.test(n) ? "Zeitüberschreitung: Das Gerät antwortet nicht. Kabel prüfen und neu verbinden." : /Bluetooth|GATT/i.test(n) ? "Bluetooth-Verbindung fehlgeschlagen. Gerät in der Nähe? Bluetooth am Gerät an?" : /Failed to connect|Couldn't sync|Invalid head of packet|Failed to read/i.test(n) ? "Keine Verbindung zum Bootloader. Kabel neu stecken; falls nötig die Taste beim Einstecken gedrückt halten." : "Unerwarteter Fehler (" + n + ").";
}
// src/loader.js
var dc, fc, pc, mc = !1, Q = {}, hc = {
	"2MB": 2,
	"4MB": 4,
	"8MB": 8,
	"16MB": 16,
	"32MB": 32
}, gc = 262144;
function $(e, t = "") {
	let n = {
		ok: "alert alert-success",
		bad: "alert alert-danger"
	}[t] || "text-muted";
	Q.status.className = "mt-3 mb-0 " + n, Q.status.textContent = e;
}
function _c(e, t = !1) {
	Q.progress.classList.toggle("d-none", e <= 0), Q.bar.className = t ? "progress-bar bg-success" : "progress-bar progress-bar-striped progress-bar-animated", Q.bar.style.width = e + "%", Q.bar.textContent = e + " %", Q.progress.setAttribute("aria-valuenow", String(e));
}
function vc(e) {
	mc = e;
	let t = "serial" in navigator;
	Q.btn.disabled = e || !t || !pc, Q.backup.disabled = e || !t, Q.restore.disabled = e || !t;
}
async function yc() {
	try {
		pc = await (await fetch(fc + "?asset=manifest.json", { cache: "no-store" })).json(), Q.version.textContent = pc.version, pc.release_url && (Q.gh.href = pc.release_url);
	} catch {
		Q.version.textContent = "nicht erreichbar", $("Das neueste Release konnte nicht geladen werden. Backup geht trotzdem.", "bad");
	}
	vc(mc);
}
async function bc() {
	$("Port auswählen …");
	let e = await navigator.serial.requestPort();
	$("Verbinde mit dem Gerät …");
	let t = new bi(e, !1), n = new sc({
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
		if (!/ESP32-S3/i.test(e)) throw lc("Falscher Chip: " + e + " (erwartet ESP32-S3)");
	} catch (e) {
		throw await t.disconnect().catch(() => {}), e;
	}
	return {
		loader: n,
		transport: t
	};
}
function xc(e) {
	return console.error(e), "Fehler: " + uc(e);
}
async function Sc(e) {
	if (mc) return;
	vc(!0), _c(0);
	let t;
	try {
		await e((e) => t = e);
	} catch (e) {
		$(xc(e), "bad");
	} finally {
		await t?.transport?.disconnect().catch(() => {}), vc(!1);
	}
}
async function Cc(e, t, n, r) {
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
		reportProgress: (e, t, n) => _c(Math.round(t / n * 100))
	}), $("Neustart …"), await e.after(), _c(100, !0);
}
function wc() {
	let e = pc?.builds?.[0]?.parts?.[0];
	e && Sc(async (t) => {
		$("Firmware wird geladen …");
		let n = new URL(e.path, new URL(fc + "?asset=manifest.json", location.href)).href, r = await fetch(n, { cache: "no-store" });
		if (!r.ok) throw lc("Download fehlgeschlagen (" + r.status + ")");
		let i = new Uint8Array(await r.arrayBuffer()), { loader: a } = t(await bc());
		await Cc(a, i, e.offset ?? 0, Q.erase.checked), $("Fertig! ThinkKira " + pc.version + " ist installiert. Das Gerät startet neu.", "ok");
	});
}
function Tc(e, t) {
	let n = URL.createObjectURL(new Blob([e], { type: "application/octet-stream" })), r = Z("a", {
		href: n,
		download: t
	});
	document.body.append(r), r.click(), r.remove(), setTimeout(() => URL.revokeObjectURL(n), 1e4);
}
function Ec() {
	Sc(async (e) => {
		let { loader: t } = e(await bc()), n = await t.detectFlashSize() || "4MB", r = (hc[n] || 4) * 1024 * 1024, i = new Uint8Array(r);
		$("Backup wird gelesen (" + n.replace("MB", " MB") + ", ca. 1–2 Minuten) …");
		for (let e = 0; e < r; e += gc) {
			let n = Math.min(gc, r - e);
			i.set(await t.readFlash(e, n), e), _c(Math.round((e + n) / r * 100));
		}
		await t.after(), _c(100, !0), Tc(i, "thinkkira-backup-" + (/* @__PURE__ */ new Date()).toISOString().slice(0, 16).replace(/[:T]/g, "-") + ".bin"), $("Backup gespeichert (" + n.replace("MB", " MB") + "). Die Datei enthält Firmware, Einstellungen, Knoten und Schlüssel – sicher aufbewahren!", "ok");
	});
}
function Dc() {
	Q.file.value = "", Q.file.click();
}
function Oc() {
	let e = Q.file.files?.[0];
	e && Sc(async (t) => {
		let n = new Uint8Array(await e.arrayBuffer());
		if (n.length < 65536 || n.length % 4096) throw lc("Die Datei ist kein vollständiges Backup.");
		let { loader: r } = t(await bc());
		await Cc(r, n, 0, !1), $("Backup „" + e.name + "“ wurde zurückgespielt. Das Gerät startet neu.", "ok");
	});
}
function kc(e = "#tk-loader") {
	if (dc = typeof e == "string" ? document.querySelector(e) : e, !dc) return;
	fc = dc.dataset.firmware || window.TK_FIRMWARE_PHP || "firmware.php", dc.classList.add("tk-loader");
	let t = (e) => Z("i", { class: "fas fa-" + e + " me-1" });
	Q.version = Z("strong", {}, "wird geladen …"), Q.gh = Z("a", {
		href: "https://github.com/Kirakodo/ThinkKiraM5/releases/latest",
		target: "_blank",
		rel: "noopener"
	}, "GitHub"), Q.erase = Z("input", {
		type: "checkbox",
		id: "tk-erase",
		class: "form-check-input"
	}), Q.erase.checked = !0, Q.btn = Z("button", {
		type: "button",
		class: "btn btn-primary",
		onclick: wc
	}, t("download"), "Installieren / Aktualisieren"), Q.backup = Z("button", {
		type: "button",
		class: "btn btn-outline-secondary",
		onclick: Ec
	}, t("save"), "Backup erstellen"), Q.restore = Z("button", {
		type: "button",
		class: "btn btn-outline-secondary",
		onclick: Dc
	}, t("upload"), "Backup zurückspielen"), Q.file = Z("input", {
		type: "file",
		accept: ".bin",
		class: "d-none",
		onchange: Oc
	}), Q.status = Z("p", {
		class: "mt-3 mb-0 text-muted",
		role: "status"
	}), Q.bar = Z("div", {
		class: "progress-bar",
		style: "width:0%"
	}), Q.progress = Z("div", {
		class: "progress mt-3 d-none",
		role: "progressbar",
		"aria-valuemin": "0",
		"aria-valuemax": "100",
		"aria-valuenow": "0"
	}, Q.bar);
	let n = [
		"serial" in navigator ? null : Z("div", { class: "alert alert-warning" }, t("exclamation-triangle"), "Dieser Browser kann keine USB-Geräte ansprechen. Bitte Chrome oder Edge am PC nutzen."),
		Z("p", { class: "text-muted" }, "aktuelle Version ", Q.version, " · ", Q.gh),
		Z("ol", {}, Z("li", {}, "Chrome oder Edge am PC verwenden."), Z("li", {}, "ThinkNode M5 per USB-C anschließen."), Z("li", {}, "Vor dem ersten Aufspielen am besten „Backup erstellen“."), Z("li", {}, "„Installieren / Aktualisieren“ klicken und den Port wählen.")),
		Z("div", { class: "form-check mb-3" }, Q.erase, Z("label", {
			class: "form-check-label",
			for: "tk-erase"
		}, "Gerät vorher komplett löschen (empfohlen beim ersten Mal, löscht alle Einstellungen)")),
		Z("div", { class: "d-flex flex-wrap gap-2" }, Q.btn, Q.backup, Q.restore),
		Z("p", { class: "form-text mb-0 mt-2" }, "Das Backup ist ein komplettes Abbild des Geräts (Firmware, Einstellungen, Knoten, Schlüssel) als .bin-Datei. Zurückspielen stellt genau diesen Stand wieder her."),
		Q.file,
		Q.progress,
		Q.status
	];
	dc.replaceChildren(...n.filter(Boolean)), vc(!1), yc();
}
typeof document < "u" && (document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", () => kc()) : kc());
export { kc as mount };
