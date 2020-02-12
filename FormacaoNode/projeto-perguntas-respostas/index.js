const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const conexao = require('./conexao');
const PerguntaModel = require('./models/Perguntas');
const RespostaModel = require('./models/Respostas');

app.engine("handlebars", handlebars({defaultLayout: 'main'})) // Configurando um template base
app.set('view engine', 'handlebars'); 
   
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/', (req, res) => {
    PerguntaModel.findAll({raw: true, order: [['id', 'DESC']]}).then((pergunta) => {
        res.render('index', {pergunta: pergunta})
    })
})

app.get('/perguntar', (req, res) => {
    res.render('perguntas');
})

app.get('/findpergunta/:id', (req, res) => {
    let id = req.params.id;

    PerguntaModel.findOne({
        raw: true,
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined) {
            var resp = [];

            RespostaModel.findAll({
                raw: true,
                where: {pergunta: id}
            }).then((respostas) => {
                resp = respostas;
                res.render('findPergunta', {pergunta: pergunta, respostas: resp})
            })
          
        }else{
            res.redirect('/')
        }
    })
})

app.post('/respostaAction', (req, res) => {
    let pergunta = req.body.pergunta;
    RespostaModel.create({
        corpo: req.body.corpo,
        pergunta
    }).then(() => {
        res.redirect('/findpergunta/' + pergunta);
    }).catch((err) => {
        res.redirect('/')
    })
})

app.post('/perguntasAction', (req, res) => {
    PerguntaModel.create({
        titulo: req.body.titulo,
        descricao: req.body.descricao,
    }).then(() => {
        res.redirect('/')
    }).catch((err) => {
        console.log('Erro na criação da pergunta' + err)
        res.send('Erro: ' + err);

    })
})

app.listen('8080', (err) => {
    if(err) {
        console.log('Erro: ' + err)
    }else{
        console.log('Servidor rodando');
    }
})