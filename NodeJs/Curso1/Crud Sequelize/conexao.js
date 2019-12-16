// CRIANDO UM MODEL, CRIANDO UMA TABELA
const Postagem = sequelize.define('postagens', {
    titulo: {
        type: Sequelize.STRING // significa que o campo vai ser varchar
    },

    conteudo: {
        type: Sequelize.TEXT // Tipo TEXT
    }
})

// EXECUTANDO A CRIAÇÃO DA TABELA
// Postagem.sync({force: true});

// INSERINDO DADOS
Postagem.create({
    titulo: 'Titulo inicial',
    conteudo : 'O primeiro conteudo para testar a inserção dos dados'
})

// Criando uma tabela de usuarios 
const Usuario = sequelize.define('usuarios', {
    nome : {
        type: Sequelize.STRING
    },

    sobrenome: {
        type: Sequelize.STRING
    },

    idade: {
        type: Sequelize.INTEGER
    },

    email: {
        type: Sequelize.STRING
    }
})

// Executando a criação da tabela
// Usuario.sync({force: true});

