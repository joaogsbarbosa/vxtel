const assert = require('assert');
const controllers = require('../src/controllers');


describe('Testa valores da tabela', () => {

    it('Linha 1', async () => {
        valor = await controllers.geraValores(11, 16, 20, 30);
        assert.deepEqual(valor['Com FaleMais'], 0);
    })
    it('Linha 2', async () => {
        valor = await controllers.geraValores(11, 17, 80, 60);
        assert.deepEqual(valor['Com FaleMais'], 37.40)
    })
    it('Linha 3', async () => {
        valor = await controllers.geraValores(18, 11, 200, 120);
        assert.deepEqual(valor['Com FaleMais'], 167.20);
    })
    it('Linha 4', async () => {
        valor = await controllers.geraValores(18, 17, 100, 30);
        assert.deepEqual(valor, 'Tarifa não encontrada na tabela de tarifas!');
    })
    it('Linha 5', async () => {
        valor = await controllers.geraValores(11, 16, 20, 30);
        assert.deepEqual(valor['Sem FaleMais'], 38.00);
    })
    it('Linha 6', async () => {
        valor = await controllers.geraValores(11, 17, 80, 60);
        assert.deepEqual(valor['Sem FaleMais'], 136.00);
    })
    it('Linha 7', async () => {
        valor = await controllers.geraValores(18, 11, 200, 120);
        assert.deepEqual(valor['Sem FaleMais'], 380.00);
    })
    it('Linha 8', async () => {
        valor = await controllers.geraValores(18, 17, 100, 30);
        assert.deepEqual(valor, 'Tarifa não encontrada na tabela de tarifas!');
    })
})
