module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },

    isActivesession (req, res, next){
        if (req.isAuthenticated()){
            return res.redirect('/main');
        }
        return next();
    }
};