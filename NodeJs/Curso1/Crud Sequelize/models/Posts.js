const db = require('./db');

// CRIANDO UMA TABELA
const Post = db.sequelize.define('postagens',  {
    titulo : {
        type: db.Sequelize.STRING
    },

    conteudo : {
        type: db.Sequelize.TEXT
    }
})

// EXECUTANDO A CRIAÇÂO DA TABELA
// Post.sync({force: true});

module.exports = Post;