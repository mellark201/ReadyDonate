const express = require('express');
const app = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Details = require('../models/details');
const middleware = require('../middleware');

app.get('/login', middleware.isLoggedOut, (req, res) => {
    res.render('auth/login');
})

app.get('/register', middleware.isLoggedOut, (req, res) => {
    res.render('auth/register');
})

app.get('/details', middleware.isLoggedIn, (req, res) => {
    var details = new Details({});
    console.log('Details');
    res.render('auth/details', {details: details});
})

app.post('/register', (req, res) => {
    console.log(req.body);
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user) {
        if(err)
        {
            console.log(err);
            return res.render('/auth/register');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/auth/details');
        })
    })
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/login'
}), function(req, res) {
});

app.post('/details', async (req, res) => {
    console.log(req.body);
    var newDetails = new Details({
        name: req.body.name,
        blood: req.body.blood,
        phone: req.body.phone,
        userid: req.user.id,
    })
    console.log(newDetails);
    try {
        const det = await newDetails.save();
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.redirect('/auth/details');
    }
})

app.get('/logout', middleware.isLoggedIn, (req, res) => {
    req.logout();
    res.redirect('/');
})

module.exports = app;