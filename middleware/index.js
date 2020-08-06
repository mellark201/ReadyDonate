var User = require('../models/user');
var Details = require('../models/details');

module.exports = {
    isLoggedIn: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        else
            res.redirect('/');
    },
    isLoggedOut: function(req, res, next) {
        if(!req.isAuthenticated()) {
            return next();
        }
        else
            res.redirect('/');
    },
    detailsFilled: async function(req, res, next) {
        try{
            const temp = await Details.findOne({'userid' : req.user.id});
            if(temp) {
                return next();
            } else{
                res.redirect('/');
            }
        } catch(err) {
            console.log(err);
            res.redirect('/');
        }
    }
}