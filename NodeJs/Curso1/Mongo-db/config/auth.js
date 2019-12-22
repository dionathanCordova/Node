const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const LocalStrategy = require('passport-local').Strategy

module.exports = function(passport, Usuario) {
    passport.use(new LocalStrategy({usernameField: "email", passwordField:"senha" }, (email, senha, done) => {
        Usuario.findOne({email: email}).then((usuario) => {
            console.log(email)
            if(!usuario) {
                return done(null, false, {message: 'Esta conta nao existe'})
            }

            bcrypt.compare(senha, usuario.senha, (erro, match) => {
                if(match) {
                    return done(null, usuario)
                }else{
                    return done(null, false, {message: "Senha incorreta"})
                }
            })
        })
    }))

    // salvar os dados na sessao
    passport.serializeUser((usuario, done) => {
        done(null, usuario.id)
    })

    passport.deserializeUser((id, done) => {
        Usuario.findById(id, (err, usuario) => {
            done(err, usuario)
        })
    })
}
