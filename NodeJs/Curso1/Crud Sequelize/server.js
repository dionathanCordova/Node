const express = require('express');
const Post = require('./models/Posts'); // carregando o model Post
const Users = require('./models/User');

// Users.findAll().then(users => {
//     console.log(users);
// });

const app = express();

// --- bodyParser ---
const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Template Engine semelhante ao twig
const handlebars = require("express-handlebars")
app.engine("handlebars", handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');


//  --- CONFIG --- 
    // --- ROTAS ---
        // handlebars puchando o arquivo views/formulario.handlebars
        app.get('/cad', (req, res) => {
            res.render('formulario');
        })

        // Select
        app.get('/', (req, res) => {
            Post.findAll({order: [['id', 'DESC']]}).then((posts) => {
                res.render('home', {posts: posts})
                console.log(posts);
            })
        })

        // Delete
        app.get('/deletar/:id', (req, res) => {
            Post.destroy({where: {'id': req.params.id}}).then(() => {
                res.send('Post deletado');
            }).catch((err) => {
                res.send('Algum erro foi encontrato: ' + err)
            })
        })

        // Pegando dados do formulário
        app.post('/add', (req, res) => {
            Post.create({
                titulo : req.body.titulo,
                conteudo : req.body.conteudo
            }).then(() => {
                res.redirect('/');
            }).catch((err) => {
                res.send(err);
            })
        })
//  --- END CONFIG --- 

// o listem precisa ser a ultima chamada existente no arquivo
app.listen('8080', () => {
    console.log('Servidor rodando na url http://localhost:8080');
})