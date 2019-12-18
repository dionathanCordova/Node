
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
const PostagensSchema = mongoose.Schema({
    nome: {
        type: String,
        require: true
    },

    slug : {
        type: String,
        require: true
    },
})

// Definindo a collection
mongoose.model('categorias', PostagensSchema);

// Criando usuarios
// const CreateUser = mongoose.model('usuarios');
// new CreateUser({
//     nome : 'Dionathan',
//     sobrenome: 'Cordova',
//     email: 'dntcordova@hotmail.com',
//     idade: 32
// }).save().then(() => {
//     console.log('Usuario cadastrado')
// }).catch((err) => {
//     console.log('Erro na criação do usuário: ' + err)
// })