// Carregando modulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const path = require('path');
const mongoose = require('mongoose');

// Configurações
    // Body Parser
    app.use(bodyparser.urlencoded({extended: true}))
    app.use(bodyparser.json())

    // Handlebars
    app.engine("handlebars", handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars');

    // Mongoose
    // Configuração de conexão
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/cursoNode', {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => {
        console.log('conexao estabelecida');
    }).catch((err) => {
        console.log('Erro na conexao do MongoDb')
    })
    
    // public (assets)
    app.use(express.static(path.join(__dirname, 'public')))

// Rotas
    app.use('/admin', adminRoutes);

// Outros
const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor rodando')
})