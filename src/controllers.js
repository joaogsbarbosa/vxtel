const models = require('./models');

async function geraValores(origem, destino, tempo, planoMinutos) {

    if ( !origem || !destino || !tempo || !planoMinutos )
        throw new Error('Parâmetros incorretos!')

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
        throw error;
    }
    
    return {
        "origem": origem,
        "destino": destino,
        "tempo": tempo,
        "planoFaleMais": plano.nome,
        "comFaleMais": tarifaPlano,
        "semFaleMais": tarifa
    }
}

module.exports = {
    geraValores
}
