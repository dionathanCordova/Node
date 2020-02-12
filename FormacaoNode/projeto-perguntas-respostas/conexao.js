const Sequelize = require('sequelize')

const sequelize = new Sequelize('curso_node', 'root', '', {
    host:'localhost',
    dialect: 'mysql'
});

let conexao = '';
sequelize.authenticate().then(() => {
    conexao = 'Conexão estabelecida';
    console.log(conexao);
}).catch((err) => {
    console.log('Erro na conexão com o Banco de dados: ' + err);
}) 

module.exports = sequelize;