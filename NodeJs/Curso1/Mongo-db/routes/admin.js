const express= require('express')
const router = express.Router();
const mongoose = require('mongoose');
require('../models/Categoria');
const Categoria = mongoose.model('categorias')
require('../models/Postagens')
const Postagem = mongoose.model('postagens')

const isAdmin = require('../helpers/isAdmin')

router.get('/', (req, res) => {
    res.render('admin/index')
})

router.get('/categorias', isAdmin, (req, res) => {
    Categoria.find().sort({date: 'desc'}).then((categorias) => {
        res.render('admin/categorias', {categorias : categorias});
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao listar as categorias');
        req.redirect('/admin');
    })
})

router.get('/categoria/add', isAdmin, (req, res) => {
    res.render('admin/addcategoria');
})

router.post('/categorias/nova', isAdmin,  (req, res) => {
    var erros = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome invalido'});
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null ) {
        erros.push({texto: 'Slug invalido'})
    }

    if(req.body.nome.length < 2) {
        erros.push({texto: 'Nome de categoria é muito pequeno'})
    }

    if(erros.length > 0) {
        res.render('admin/categorias', {erros: erros});
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
        new Categoria(novaCategoria)
        .save()
        .then(() => {
            // passando um valor para a variavel global
            req.flash("success_msg", "Categoria cadastrada com sucesso!")
            res.redirect('/admin/categorias');
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro ao cadastrar a categoria")
            res.redirect('/admin/');
        });
    }
})

router.post('/postagens/nova', isAdmin,  (req, res) => {
    var erros = [];

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null) {
        erros.push({texto: 'Titulo incorreto'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null) {
        erros.push({texto: 'Slug incorreto'})
    }

    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null) {
        erros.push({texto: 'Descricao incorreta'})
    }
    
    if(!req.body.conteudo || typeof req.body.conteudo == undefined || req.body.conteudo == null) {
        erros.push({texto: 'Conteúdo incorreto'})
    }

    if(req.body.categoria == 0) {
        erros.push({texto: 'Categoria invalida'})
    }

    if(erros.length > 0) {
        req.flash('error_msg', 'Houve um erro ao cadastrar a postagem');
        res.render('admin/addpostagem', {erros: erros});
    }else{
        const novaPostagem = {
            titulo: req.body.titulo,
            slug: req.body.slug,
            descricao: req.body.descricao,
            conteudo: req.body.conteudo,
            categoria: req.body.categoria
        }
        new Postagem(novaPostagem).save().then(() => {
            req.flash('success_msg', 'Postagem cadastrada')
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash('error_msg', 'Houve algum erro ao cadastrar a postagem')
            res.redirect('/admin/postagens')
        })
    } 
}) 

router.get('/categoria/edit/:id', isAdmin,  (req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render('admin/editarcategoria', {categoria: categoria})
    }).catch((err) =>{
        req.flash('error_msg', 'Esta categoria não existe');
        res.redirect('/admin/categorias')
    })
})

router.post('/categorias/edit', isAdmin,  (req, res) => {
    var erros = []
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome incorreto'})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null ) {
        erros.push({texto: 'Slug invalido'})
    }

    if(req.body.nome.length < 2) {
        erros.push({texto: 'Nome de categoria é muito pequeno'})
    }

    if(erros.length > 0) {
        res.render('admin/categorias', {erros: erros});
    }else{
        Categoria.findOne({_id: req.body.id}).then((categoria) => {
            categoria.nome = req.body.nome
            categoria.slug = req.body.slug

            categoria.save().then(() => {
                req.flash('success_msg', 'Categoria editada com sucesso!')
                res.redirect("/admin/categorias")
            }).catch((err) => {
                res.flash('error_msg', 'Falha ao salvar a edição')
                req.redirect("/admin/categorias")
            }) 
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao editar a categoria')
            res.redirect('/admin/categorias')
            
        })
    }
})

router.post('/categorias/delete', isAdmin,  (req, res) => {
    Categoria.remove({_id: req.body.id}).then(() => {
        req.flash('success_msg', 'Categoria deletada');
        res.redirect('/admin/categorias');
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao deletar a categoria');
        res.redirect('/admin/categorias')
    })
})

router.get('/postagens', isAdmin,  (req, res) => {
    Postagem.find().populate("categoria").sort({data: 'desc'}).then((postagens) => {
        res.render("admin/postagens", {postagens: postagens})
    }).catch((err) => {
        req.flash("error_msg", 'Houve um erro ao listar as postagens')
        res.redirect('/admin')
    })
})

router.get('/postagens/add', isAdmin,  (req, res) => {
    Categoria.find().then((categorias) => {
        res.render('admin/addpostagem', {categorias: categorias})
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao carregar o formulário')
        res.redirect('/admin')
    })
})

router.get("/postagens/edit/:id" , isAdmin,  (req, res) => {
    Postagem.findOne({_id: req.params.id}).then((postagem) => {
        Categoria.find().then((categorias) => {
            res.render('admin/editarpostagem', {postagem: postagem, categorias: categorias})
        }).catch((err) => {
            req.flash('error_msg', 'Ocorreu um erro ao listar as categorias')
            res.redirect('/admin/postagens')
        })
    }).catch((err) => {
        req.flash('error_msg', "Ocorreu um erro ao selecioar a categoria")
        res.redirect('admin/postagens')
    })
})

router.post('/postagem/edit', isAdmin,  (req, res) => {
    Postagem.findOne({_id: req.body.id}).then((postagem) => {
        postagem.titulo = req.body.titulo
        postagem.slug = req.body.slug
        postagem.descricao = req.body.descricao
        postagem.conteudo = req.body.conteudo
        postagem.categoria = req.body.categoria
        postagem.data = req.body.data
    
        postagem.save().then(() => {
            req.flash('success_msg', 'Postagem editada')
            res.redirect('/admin/postagens')
        }).catch((err) => {
            req.flash('error_msg', 'Houve um erro ao editar a postagem')
            res.redirect('admin/postagens')
        })
    }).catch((err) => {
        req.flash('error_msg', 'Houve um erro ao editar a postagem')
        res.redirect('/ddadmin/postagens')
    })
})


router.get('/postagens/deletar/:id', isAdmin,  (req, res) => {
    Postagem.remove({_id: req.params.id}).then(() => {
        req.flash('success_msg', 'Postagem removida')
        res.redirect('/admin/postagens')
    }).catch((err) => {
        req.flash('error_msg', 'Houve algum erro ao deletar a postagem')
        res.redirect('/admin/postagens')
    })
})

router.get("/logout", (req, res) => {
    req.logout()
    res.redirect("/")
})
module.exports = router;