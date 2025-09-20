const request = require('supertest');
const { buildApp } = require('../../../app');

describe('GET /health', () => {
  it('responde ok', async () => {
    const app = buildApp(); // sin Stripe ni servidor
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});
