const assert = require('assert');
const { init } = require('../lib/server');


describe('GET /', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/'
        });
        assert.deepEqual(res.statusCode, 200);
    });
});

describe('GET /api/v1/tarifas/', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 400', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/v1/tarifas/'
        });
        assert.deepEqual(res.statusCode, 400);
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/v1/tarifas/?origem=011&destino=017&tempo=10&plano=30'
        });
        assert.deepEqual(res.statusCode, 200);
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/api/v1/tarifas/?origem=017&destino=011&tempo=10&plano=120'
        });
        assert.deepEqual(res.statusCode, 200);
    });
})

describe('GET /abc', () => {
    let server;

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 404', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/abc'
        });
        assert.deepEqual(res.statusCode, 404);
    });
})