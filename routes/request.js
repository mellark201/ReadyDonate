const express = require('express');
const app = express.Router();
const fetch = require('node-fetch');
const middleware = require('../middleware/index');
const Request = require('../models/requests');
const User = require('../models/user');

app.get('/new', middleware.isLoggedIn, middleware.detailsFilled, (req, res) => {
    res.render('formalities/new_request');
})

app.post('/new', async (req, res) => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(req.body.address)}.json?limit=1&access_token=${process.env.MAPBOX_TOKEN}`;
        const response = await fetch(url, {
            "method" : "GET"
        })
        const result = await response.json();
        console.log(req.body);
        console.log(result);
        const coordinate = result.features[0].geometry.coordinates;
        const user = await User.findById(req.user.id);
        // console.log(req.user);
        var request = new Request({
            userName : user.username,
            userId : user.id,
            quantity : req.body.quantity,
            group: req.body.blood,
            contact: req.body.contact,
            cause: req.body.cause,
            hospital: req.body.hospital,
            longitude : coordinate[0],
            latitude : coordinate[1]
        })
        await request.save();
        res.redirect('/');
    } catch(err)
    {
        console.log(err);
        res.redirect('/');
    }
})

module.exports = app;