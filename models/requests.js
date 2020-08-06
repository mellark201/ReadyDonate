var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var findorcreate = require('mongoose-findorcreate');

var RequestSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userId: {
        type:String,
    },
    quantity: {
        type: Number,
    },
    group: {
        type: String,
    },
    contact: {
        type: String,
    },
    cause: {
        type: String,
    },
    latitude: {
        type: String,
    },
    longitude: {
        type: String
    },
    hospital: {
        type:String,
        
    }
});

RequestSchema.plugin(findorcreate);
RequestSchema.plugin(passportLocalMongoose); //adds the methods to our user

module.exports = mongoose.model("Request", RequestSchema);