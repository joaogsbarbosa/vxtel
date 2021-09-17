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
        return `Enviar GET para: ${server.info.uri}/api/v1/tarifas <br>
            Parâmetros: origem, destino, tempo, plano <br>
            Exemplos: <br>
            origem -> 011 <br>
            destino -> 016 <br>
            tempo -> 30 <br>
            plano -> 120
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
