var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var findorcreate = require('mongoose-findorcreate');

var DetailSchema = new mongoose.Schema({
    name: {
        type:String,
    },
    blood: {
        type: String,
    },
    phone: {
        type:String,
    },
    userid: {
        type:String,
    }
});

DetailSchema.plugin(findorcreate);
DetailSchema.plugin(passportLocalMongoose); //adds the methods to our user

module.exports = mongoose.model("Detail", DetailSchema);