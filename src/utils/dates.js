// Normaliza y valida fechas ISO; devuelve Date o null
function safeParseDate(s) {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? null : d;
}

// Devuelve true/false si cualquier fecha es inválida
function anyInvalid(...dates) {
  return dates.some(d => !d || Number.isNaN(d.getTime()));
}
function toDateKeyUTC(d) {
  const dt = new Date(d);
  // normalizamos a medianoche UTC
  dt.setUTCHours(0, 0, 0, 0);
  return dt.toISOString().slice(0, 10); // 'YYYY-MM-DD'
}

function* daysRangeUTC(start, endExcl) {
  // genera días [start, end)
  const d = new Date(start);
  d.setUTCHours(0, 0, 0, 0);
  const end = new Date(endExcl);
  end.setUTCHours(0, 0, 0, 0);
  while (d < end) {
    yield d.toISOString().slice(0, 10);
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

// Fin exclusivo (semi-abierto): [start, end)
function endExclusive(end) {
  const d = new Date(end);
  // si tus queries son por día, puedes avanzar 1 día completo:
  // d.setDate(d.getDate() + 1);
  return d;
}

// Días enteros entre dos fechas (redondeo hacia arriba, mínimo 1)
function daysBetween(start, end) {
  const ms = Math.max(0, end - start);
  return Math.max(1, Math.ceil(ms / (24*60*60*1000)));
}

// Construye serie indexada 0..N-1 con valores por día; rows = [{ date, value }]
function buildIndexedSeries(start, endExcl, rows) {
  const map = new Map();
  for (const r of rows || []) {
    const key = toDateKeyUTC(r.date);
    // Puede venir BigInt (especialmente COUNT). Casteamos todo a Number.
    const val = Number(r.value || 0);
    map.set(key, (map.get(key) || 0) + val);
  }

  const out = [];
  for (const dayKey of daysRangeUTC(start, endExcl)) {
    out.push({ date: dayKey, value: Number(map.get(dayKey) || 0) });
  }
  return out;
}

module.exports = { safeParseDate, anyInvalid, endExclusive, daysBetween, buildIndexedSeries };
