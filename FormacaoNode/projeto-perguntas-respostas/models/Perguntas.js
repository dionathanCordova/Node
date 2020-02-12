const Sequelize = require('sequelize');
const conexao = require('../conexao')

const Pergunta = conexao.define('perguntas', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },

    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    },
})

// Não força a criação da tabela caso já exista
Pergunta.sync({force: false}).then(() => {
    console.log('Tabela Perguntas criada')
})

module.exports = Pergunta;