module.exports = function(req, res, next) {
    if(req.isAuthenticated() && req.user.isAdmin == 1 ) {
        return next()
    }

    req.flash("error_msg", "Voçê precisa de permissao para entrar")
    res.redirect("/")
}