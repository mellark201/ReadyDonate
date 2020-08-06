const express = require('express');
const app = express.Router();
const middleware = require('../middleware/index');
const User = require('../models/user');
const Details = require('../models/details');
const Requests = require('../models/requests');
app.get('/', async (req, res) => {
    if(req.user)
        console.log(req.user);
    const requests = await Requests.find({});
    res.render('index.ejs', {requests: requests});
})

app.get('/update', middleware.isLoggedIn, middleware.detailsFilled, async (req, res) => {
    try {
        const details = await Details.findOne({'userid' : req.user.id});
        console.log(details);
        res.render('formalities/update', {details : details});
    } catch(err)
    {
        console.log(err);
    }
})

app.put('/update', async (req, res) => {
    let temp;
    try {
        temp = await Details.findOne({'userid' : req.user.id});
        temp.name = req.body.name;
        temp.blood = req.body.blood;
        temp.phone = req.body.phone;
        await temp.save();
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
});

app.get('/profile', middleware.isLoggedIn, middleware.detailsFilled, async (req, res) => {
    try {
        var id = req.user.id;
        var user = await User.findById(id);
        const details = await Details.findOne({'userid' : id});
        const requests = await Requests.find({'userId' : id});
        console.log(details);
        res.render('formalities/profile', {profile : user, detail : details, requests : requests});
    } catch(err) {
        console.log(err);
        res.redirect('/');
    }
})

app.delete('/profile/:id', middleware.isLoggedIn, middleware.detailsFilled, async(req, res) => {
    try {
        var reqId = req.params.id;
        await Requests.findByIdAndDelete(reqId);
        res.redirect('/');
    } catch(err) {
        console.log(err);
        res.redirect('/profile');
    }
})

module.exports = app;