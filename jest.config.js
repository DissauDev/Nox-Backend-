module.exports = {
  testEnvironment: 'node',
  setupFiles: ['<rootDir>/src/test/setup.env.js'],           // carga .env.test ANTES
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.after-env.js'] // (si ya lo tenías para reset DB)
};
