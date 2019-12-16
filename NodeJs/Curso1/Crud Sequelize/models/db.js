// CONEXÃO Com o DB
const Sequelize = require('sequelize');
const sequelize = new Sequelize('curso_node', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = {Sequelize: Sequelize, sequelize: sequelize}