// Carregando modulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
// const mongoose = require('mongoose');

// Configurações
    
    // Body Parser
    app.use(bodyparser.urlencoded({extended: true}))
    app.use(bodyparser.json())

    // Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('View engine', 'handlebars');

    // Mongoose


// Rotas
    app.use('/admin', adminRoutes);

// Outros
const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor rodando')
})