const models = require('./models');

async function geraValores(origem, destino, tempo, planoMinutos) {
    tarifa = new models.Tarifa(origem, destino);
    plano = new models.Plano(planoMinutos);
    chamada = new models.Chamada(tarifa, plano, tempo);

    try {
        [, tarifa, tarifaPlano] = await Promise.all([
            plano.validaPlano(),
            chamada.calculaTarifa(),
            chamada.calculaTarifaPlano()
        ]);
    } catch (error) {
        return error.message;
    }
    
    return {
        "Origem": origem,
        "Destino": destino,
        "Tempo": tempo,
        "Plano FaleMais": plano.nome,
        "Com FaleMais": tarifaPlano,
        "Sem FaleMais": tarifa
    }
}

module.exports = {
    geraValores
}
