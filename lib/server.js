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
        return `Enviar GET para: localhost:3000/api/v1/tarifas <br>
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
    handler: (request, h) => {
        const origem = request.query.origem;
        const destino = request.query.destino;
        const tempo = request.query.tempo;
        const plano = request.query.plano;
        return controllers.geraValores(origem, destino, tempo, plano);
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
