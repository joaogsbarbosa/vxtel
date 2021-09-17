const assert = require('assert');
const models = require('../src/models');


describe('Casos de uso nos models', () => {

    it('Usa dados corretos', async () => {
        tarifa = new models.Tarifa('011', '017');
        plano = new models.Plano('30');
        chamada = new models.Chamada(tarifa, plano, '60');
        try {
            valor = [, tarifa, tarifaPlano]= await Promise.all([
                plano.validaPlano(),
                chamada.calculaTarifa(),
                chamada.calculaTarifaPlano()
            ]);
        } catch (erro) {
            valor = erro.message;
        }
        assert.deepEqual(valor, [undefined, '102.00', '56.10']);
    });
    
    it('Não encontra tarifas', async () => {
        tarifa = new models.Tarifa('011', '099');
        plano = new models.Plano('30');
        chamada = new models.Chamada(tarifa, plano, '60');
        try {
            valor = await Promise.all([
                plano.validaPlano(),
                chamada.calculaTarifa(),
                chamada.calculaTarifaPlano()
            ]);
        } catch (erro) {
            valor = erro.message;
        }
        assert.deepEqual(valor, 'Tarifa não encontrada na tabela de tarifas!');
    });

    it('Não encontra planos', async () => {
        tarifa = new models.Tarifa('011', '017');
        plano = new models.Plano('99');
        chamada = new models.Chamada(tarifa, plano, '60');
        try {
            [, tarifa, tarifaPlano] = await Promise.all([
                plano.validaPlano(),
                chamada.calculaTarifa(),
                chamada.calculaTarifaPlano()
            ]);
        } catch (error) {
            valor =  error.message;
        }
        assert.deepEqual(valor, 'Plano não encontrado na tabela de planos!');
    });
})
