module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/admin/login');
    },

    isActivesession (req, res, next){
        if (req.isAuthenticated()){
            return res.redirect('/admin/main');
        }
        return next();
    }
};