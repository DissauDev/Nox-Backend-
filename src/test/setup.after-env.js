const { truncateAll, disconnect } = require('./prisma.test.utils');

// Limpia antes de cada test para que sean independientes
beforeEach(async () => {
  await truncateAll();
});

// Al terminar toda la suite, cierra conexiones
afterAll(async () => {
  await truncateAll();
  await disconnect();
});
