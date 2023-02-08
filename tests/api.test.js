const app = require('../index');
const api = require('supertest')(app);
const { signature, payload, payloadNoMainBranch, signatureNoMainBranch } = require('./helpers');

test("Should validate request and deploy repo", async () => {
    const { status } = await api.post('/')
        .send(payload)
        .set('X-Hub-Signature-256', signature);
    expect(status).toBe(200);
});

test('Request from no main branch should be rejected', async () => {
    const { status } = await api.post('/')
        .send(payloadNoMainBranch)
        .set('X-Hub-Signature-256', signatureNoMainBranch);
    expect(status).toBe(304);
});
