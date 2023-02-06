const app = require('../index');
const api = require('supertest')(app);
const { signature, payload } = require('./helpers');

test("Should validate request and deploy repo", async () => {
    const { status } = await api.post('/')
        .send(payload)
        .set('X-Hub-Signature-256', signature);
    expect(status).toBe(200);
});
