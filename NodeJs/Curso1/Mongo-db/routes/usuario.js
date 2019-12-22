const express = require('express')
const router = express.Router()
const mongoose = require("mongoose")
require("../models/usuario")
const Usuario = mongoose.model('usuarios')
const bcrypt = require('bcryptjs')

router.get("/registro", (req, res) => {
    res.render("usuarios/registro")
})

router.post("/registro", (req, res) => {
    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome invalido'})
    }
    
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: 'Email invalido'})
    }
    
    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({texto: 'Senha invalido'})
    }

    if(req.body.senha.length < 4) {
        erros.push({texto: 'Senha muito fraca'})
    }

    if(req.body.senha != req.body.senha2) {
        erros.push({texto: 'As senhas não combinam'})
    }

    if(erros.length > 0) {
        res.render("usuarios/registro", {erros: erros})
    }else{

        Usuario.findOne({email: req.body.email}).then((usuario) => {
           
            if(usuario) {
                req.flash("error_msg", "Este email já esta sendo utilizado em outro cadastro")
                res.redirect("/usuarios/registro")
            }else{

                var salt = bcrypt.genSaltSync(10);
                var hash = bcrypt.hashSync(req.body.senha, salt);

                const UserData = {
                    nome : req.body.nome,
                    email : req.body.email,
                    senha : hash
                }

                new Usuario(UserData).save().then(() => {
                    req.flash('success_msg', 'Usuario cadastrado com sucesso!')
                    res.redirect('/')
                }).catch((err) => {
                    req.flash('error_msg', 'Erro ao cadastrar o usuario')
                    res.redirect("/usuarios/registro")
                })
            }
        }).catch((err) => {
            req.flash("error_msg", "houve um erro interno")
            res.redirect("/")
        })
    }
})

router.get("/login", (req, res) => {
    res.render("usuarios/login")
})

router.post("/login", (req, res) => {

    Usuario.findOne({email: req.body.email}).then((usuario) => {
        if(usuario) {
            res.redirect('/admin/postagens')
        }else{
            req.flash('error_msg', 'Não foi possivel localizar os dado de acessp.')
        }
    }).catch((error) => {
        req.flash("error_msg", 'Falha ao efetuar login')
    })
})

module.exports = router