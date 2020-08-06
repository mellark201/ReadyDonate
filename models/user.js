var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var findorcreate = require('mongoose-findorcreate');

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type:String,
    }
});

UserSchema.plugin(findorcreate);
UserSchema.plugin(passportLocalMongoose); //adds the methods to our user

module.exports = mongoose.model("User", UserSchema);