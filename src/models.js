const fs = require('fs');
const csvtojsonV2 = require("csvtojson/v2");

class Tarifa {
    constructor(origem, destino) {
        this.origem = origem;
        this.destino = destino;
    }
    // Busca o valor do minuto
    async buscaValorMinuto() {
        // Lê o csv em ./tables/tarifas.csv
        const tarifas = await csvtojsonV2().fromFile('src/tables/tarifas.csv');
        // Filtra a linha do .csv que corresponde à origem e destino
        const tarifa = tarifas.filter( item => {
            if (item.Origem == this.origem && item.Destino == this.destino)
                return true;
        })
        // Dispara erro se não houver correspondência
        if (tarifa.length == 0)
            throw new Error('Tarifa não existe na tabela!')
        // Retorna o valor do minuto corresponde à origem e destino
        return tarifa[0]["$/min"];
    }
}

class Plano {
    constructor(minutos) {
        this.nome = 'FaleMais ' + minutos;
        this.minutos = minutos;
        this.validaPlano();
    }

    // Valida se o plano informado está na tabela
    async validaPlano() {
        // Lê o csv em ./tables/planos.csv
        const planos = await csvtojsonV2().fromFile('src/tables/planos.csv');
        // Filtra a linha do .csv que corresponde aos minutos do plano
        const plano = planos.filter( item => {
            if (item['Plano FaleMais'] == this.minutos)
                return true;
        })
        // Dispara erro se não houver correspondência
        if (plano.length == 0)
            throw new Error('Plano não existe na tabela!')
    }
}

class Chamada {
    constructor(tarifa, plano, tempo) {
        this.tarifa = tarifa;
        this.plano = plano;
        this.tempo = tempo;
    }

    // Cálculo da tarifa sem o plano
    async calculaTarifa() {
        const valorMinuto = await this.tarifa.buscaValorMinuto();
        return valorMinuto * this.tempo;
    }

    // Cálculo da tarifa com o plano
    async calculaTarifaPlano() {
        var valorMinuto = await this.tarifa.buscaValorMinuto();
        // Minutos excedentes
        const minsExcedentes = this.tempo - this.plano.minutos;

        if (minsExcedentes <= 0) // O tempo de ligação é todo coberto pelo plano
            return 0;

        // Acrescenta 10% no valor do minuto 
        valorMinuto *= 1/10

        return valorMinuto * minsExcedentes;
    }
}

module.exports = {
    Tarifa,
    Plano,
    Chamada
}