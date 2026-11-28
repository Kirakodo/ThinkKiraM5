const fmt = (a) => (typeof a === "string" ? a : a instanceof Error ? a.stack || a.message : (() => { try { return JSON.stringify(a); } catch { return String(a); } })());
export const formatWithOptions = (_opts, ...args) => args.map(fmt).join(" ");
export const types = { isNativeError: (e) => e instanceof Error };
export default { formatWithOptions, types };
