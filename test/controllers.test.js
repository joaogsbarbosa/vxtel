const assert = require('assert');
const controllers = require('../src/controllers');


describe('Testa valores da tabela', () => {

    it('Linha 1 - Com FaleMais', async () => {
        valor = await controllers.geraValores(11, 16, 20, 30);
        assert.deepEqual(valor['comFaleMais'], '0.00');
    });

    it('Linha 2 - Com FaleMais', async () => {
        valor = await controllers.geraValores(11, 17, 80, 60);
        assert.deepEqual(valor['comFaleMais'], '37.40');
    });

    it('Linha 3 - Com FaleMais', async () => {
        valor = await controllers.geraValores(18, 11, 200, 120);
        assert.deepEqual(valor['comFaleMais'], '167.20');
    });

    it('Linha 4 - Com FaleMais', async () => {
        try {
            valor = await controllers.geraValores(18, 17, 100, 30);
        } catch (erro) {
            valor = erro.message;
        }
        assert.deepEqual(valor, 'Tarifa não encontrada na tabela de tarifas!');
    });

    it('Linha 1 - Sem FaleMais', async () => {
        valor = await controllers.geraValores(11, 16, 20, 30);
        assert.deepEqual(valor['semFaleMais'], '38.00');
    });

    it('Linha 2 - Sem FaleMais', async () => {
        valor = await controllers.geraValores(11, 17, 80, 60);
        assert.deepEqual(valor['semFaleMais'], '136.00');
    });

    it('Linha 3 - Sem FaleMais', async () => {
        valor = await controllers.geraValores(18, 11, 200, 120);
        assert.deepEqual(valor['semFaleMais'], '380.00');
    });

    it('Linha 4 - Sem FaleMais', async () => {
        try {
            valor = await controllers.geraValores(18, 17, 100, 30);
        } catch (erro) {
            valor = erro.message;
        }
        assert.deepEqual(valor, 'Tarifa não encontrada na tabela de tarifas!');
    });
})

describe('Outros cenários de erro nos controllers', () => {

    it('Não encontra tarifas', async () => {
        try {
            valor = await controllers.geraValores(20, 20, 100, 60);
        } catch (erro) {
            valor = erro.message;
        }
        assert.deepEqual(valor, 'Tarifa não encontrada na tabela de tarifas!');
    });

    it('Não encontra planos', async () => {
        try {
            valor = await controllers.geraValores(18, 11, 200, 999);
        } catch (erro) {
            valor = erro.message;
        }
        assert.deepEqual(valor, 'Plano não encontrado na tabela de planos!');
    });
})
