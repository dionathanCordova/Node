const Sequelise = require('sequelize')
const conexao = require('../conexao')

const RespostaModel = conexao.define('respostas', {
    corpo: {
        type: Sequelise.TEXT,
        allowNull: false
    },

    pergunta: {
        type: Sequelise.INTEGER,
        allowNull: false
    }
})

RespostaModel.sync({force: false})

module.exports = RespostaModel