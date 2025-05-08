const sharp = require('sharp');

async function generateImageHash(buffer) {
  const { blurhash } = await sharp(buffer)
    .resize(32, 32, { fit: 'inside' })
    .blur()
    .toBuffer({ resolveWithObject: true });

  return blurhash; // Devuelve un hash visual
}

module.exports = generateImageHash;
