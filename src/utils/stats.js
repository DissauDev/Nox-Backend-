function computePct(curr, prev) {
  const c = Number(curr), p = Number(prev);
  let r;
  if (p === 0) r = c === 0 ? 0 : 100;
  else r = ((c - p) / p) * 100;
  return Number(r.toFixed(2));
}

// Une dos series por índice 0..N-1
function mergeByIndex(curIdx, prevIdx) {
  const len = Math.max(curIdx.length, prevIdx.length);
  const out = new Array(len);
  for (let i = 0; i < len; i++) {
    const c = curIdx[i] || {};
    const p = prevIdx[i] || {};
    // date: preferimos la fecha de la serie actual, si no la previa
    const date = c.date || p.date || null;
    out[i] = {
      date,
      current: Number(c.value || 0),
      compare: Number(p.value || 0),
    };
  }
  return out;
}

module.exports = { computePct, mergeByIndex };
