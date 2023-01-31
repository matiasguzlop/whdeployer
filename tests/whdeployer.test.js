const app = require('../index');
const api = require('supertest')(app);

afterAll(() => {
    app.close();
});

test("API is working", async () => {
    const { status, body } = await api.post('/');
    console.log(body);
    expect(status).toBe(200);
});