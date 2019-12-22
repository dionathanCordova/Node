// Carregando modulos
const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyparser = require('body-parser');
const adminRoutes = require('./routes/admin');
const usuarioRoute = require('./routes/usuario')
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session')
const flash = require('connect-flash')
require('./models/Postagens')
const Postagens = mongoose.model('postagens')

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

    // config do session
    app.use(session({
        secret: 'cursoNode', // inficado colocar uma chave mais segura que esta
        resave: true,
        saveUninitialize: true,
    }))

    // usando o flash
    app.use(flash())

    // configurações do flash
    app.use((req, res, next) => {
        // criando uma variavel blobal chamada success_msg
        res.locals.success_msg = req.flash('success_msg')
        // criando uma variavel global chamada error_msg
        res.locals.error_msg = req.flash('error_msg')
        next()
    })

// Rotas
    app.use('/admin', adminRoutes);
    app.use('/usuarios', usuarioRoute);

    app.get('/', (req, res) => {
        Postagens.find().populate('categoria').sort({data: "DESC"}).then((postagens) => {
            res.render("index", {postagens: postagens})
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao listar as postagens')
            res.redirect('/404')
        })
    })

    app.get('/postagem/:slug', (req, res) => {
        Postagens.findOne({slug: req.params.slug}).then((postagem) => {
            if(postagem) {
                res.render('postagem/index', {postagem: postagem})
            }else{
                req.flash('error_msg', 'Esta postagem não existe')
                res.redirect('/')
            }
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao listar a postagem')
            res.redirect('/')
        })
    })

    app.get('/404', (req, res) => {
        res.send('Página não encontrada')
    })

// Outros
const PORT = 8080;
app.listen(PORT, () => {
    console.log('Servidor rodando')
})