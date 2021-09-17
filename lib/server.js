'use strict';

const Hapi = require('@hapi/hapi');
const controllers = require('../src/controllers');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route([{
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return `
            <h1>Uso da API:</h1>
            <p>* Enviar requisição GET para: ${server.info.uri}/api/v1/tarifas</p>
            <p>Incluir os parâmetros de acordo com a tabela de tarifas</p>
            <h1>Parâmetros:</h1>
            <p>origem : string</p>
            <p>destino : string</p>
            <p>tempo : string</p>
            <p>plano : string</p>
            <h1>Exemplos de requisição:</h1>
            <p>${server.info.uri}/api/v1/tarifas/?origem=011&destino=016&tempo=30&plano=120</p>
            <p>${server.info.uri}/api/v1/tarifas/?origem=016&destino=011&tempo=60&plano=60</p>
            <p>${server.info.uri}/api/v1/tarifas/?origem=017&destino=011&tempo=200&plano=30</p>
        `;
    }
},
{
    method: 'GET',
    path: '/api/v1/tarifas/',
    handler: async (request, h) => {
        const origem = request.query.origem;
        const destino = request.query.destino;
        const tempo = request.query.tempo;
        const plano = request.query.plano;
        try {
            return await controllers.geraValores(origem, destino, tempo, plano);
        } catch (error) {
            return h.response(error.message).code(400);
        }
    }
},
{
    method: '*',
    path: '/{any*}',
    handler: function (request, h) {
        return h.response('Erro 404! Página não encontrada!').code(404);
    }
}]);

exports.init = async () => {
    await server.initialize();
    return server
}

exports.start = async () => {
    await server.start();
    console.log('Server running on %s', server.info.uri);
    return server;
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});
