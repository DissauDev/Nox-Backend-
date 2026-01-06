// src/utils/jwtUtils.js

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


const ACCESS_TOKEN_SECRET = process.env.JWT_SECRET;

const REFRESH_TOKEN_SECRET = process.env.JWT_SECRET_REFRESH;


const ACCESS_TOKEN_EXPIRES_IN =  '60m';
const REFRESH_TOKEN_EXPIRES_IN = '24h';


 function generateAccessToken(payload) {
  return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
}


 function generateRefreshToken(payload) {
  return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
  });
}

 function verifyAccessToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

 function verifyRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, REFRESH_TOKEN_SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded);
    });
  });
}

module.exports = { verifyRefreshToken,verifyAccessToken,generateAccessToken,generateRefreshToken };