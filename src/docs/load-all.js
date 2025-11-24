// src/docs/load-all.js
const fs = require('fs');
const path = require('path');

function loadAllDocs(dir = __dirname) {
  const docs = [];

  // SOLO en este directorio (sin subcarpetas). Si quieres recursivo, avisa y lo cambio.
  for (const file of fs.readdirSync(dir)) {
    if (file === path.basename(__filename)) continue; // evitar autoload
    if (!file.endsWith('.docs.js')) continue;
    const mod = require(path.join(dir, file));
    docs.push(mod);
  }

  return docs;
}

module.exports = { loadAllDocs };
