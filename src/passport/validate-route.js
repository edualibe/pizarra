module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/admin');
    },

    isActivesession (req, res, next){
        if (req.isAuthenticated()){
            return res.redirect('/admin');
        }
        return next();
    }
};