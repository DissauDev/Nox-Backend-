// src/utils/createDoorDashJwt.js
const jwt = require('jsonwebtoken');

const {
  DOORDASH_DEVELOPER_ID,
  DOORDASH_KEY_ID,
  DOORDASH_SIGNING_SECRET,
} = process.env;

if (!DOORDASH_DEVELOPER_ID || !DOORDASH_KEY_ID || !DOORDASH_SIGNING_SECRET) {
  console.warn(
    '[DoorDash] Faltan variables DOORDASH_DEVELOPER_ID / DOORDASH_KEY_ID / DOORDASH_SIGNING_SECRET en .env'
  );
}

/**
 * Crea un JWT válido para llamar a la DoorDash Drive API.
 * El token dura ~5 minutos (300s).
 */
function createDoorDashJwt() {
  const now = Math.floor(Date.now() / 1000);

  const payload = {
    aud: 'doordash',
    iss: DOORDASH_DEVELOPER_ID,
    kid: DOORDASH_KEY_ID,
    iat: now,
    exp: now + 300, // 5 minutos
  };

  // DoorDash requiere header con "dd-ver": "DD-JWT-V1"
  const signOptions = {
    algorithm: 'HS256',
    header: {
      'dd-ver': 'DD-JWT-V1',
    },
  };

  const signingKey = Buffer.from(DOORDASH_SIGNING_SECRET, 'base64');

  const token = jwt.sign(payload, signingKey, signOptions);

  return token;
}

// Ejemplo simple, puedes ajustarlo a los estados reales que te devuelva DoorDash
function mapDoorDashStatusToPrisma(status) {
  if (!status) return 'FAILED';

  switch (status) {
    case 'quote':
      return 'REQUESTED';
    case 'created':
      return 'ACCEPTED';
    case 'picked_up':
      return 'PICKED_UP';
    case 'en_route_to_dropoff':
    case 'en_route_to_pickup':
      return 'OUT_FOR_DELIVERY';
    case 'delivered':
      return 'DELIVERED';
    case 'cancelled':
      return 'CANCELLED';
    default:
      return 'FAILED';
  }
}

module.exports = {
  createDoorDashJwt,
  mapDoorDashStatusToPrisma
};
