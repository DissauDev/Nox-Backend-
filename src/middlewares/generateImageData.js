const { encode } = require('blurhash');
const sharp = require('sharp');
const axios = require('axios');

async function generateImageData(imageUrl) {
    try {
      // Descargar la imagen desde la URL
      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);
  
      // Procesar la imagen con sharp para obtener el buffer de píxeles en formato raw (RGBA)
      const { data, info } = await sharp(buffer)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });
      
      // Convertir el buffer a Uint8ClampedArray y generar el blurhash
      const pixels = new Uint8ClampedArray(data);
      const blurHash = encode(pixels, info.width, info.height, 4, 3);
      return { url: imageUrl, blurHash };
    } catch (error) {
      console.error("Error generando datos de imagen:", error.message);
      // Retornar null o un objeto por defecto para indicar que la imagen no es válida
      return null;
    }
  }

  module.exports = {generateImageData};