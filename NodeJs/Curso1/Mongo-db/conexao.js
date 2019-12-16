const mongoose = require('mongoose');

// Configuração de conexão
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cursoNode', {
    useMongoClient: true
}).then(() => {
    console.log('conexao estabelecida');
}).catch((err) => {
    console.log('Erro na conexao do MongoDb')
})

// Definindo o Model - Usuários
const UsuarioSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },

    sobrenome : {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true
    },

    idade: {
        type: Number,
        require: true
    }

})

// Definindo a collection
mongoose.model('usuarios', UsuarioSchema);

// Criando usuarios
const CreateUser = mongoose.model('usuarios');
new CreateUser({
    nome : 'Dionathan',
    sobrenome: 'Cordova',
    email: 'dntcordova@hotmail.com',
    idade: 32
}).save().then(() => {
    console.log('Usuario cadastrado')
}).catch((err) => {
    console.log('Erro na criação do usuário: ' + err)
})