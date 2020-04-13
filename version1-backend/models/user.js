var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
    _id: {
      type: String,
        default: ''
    },
    username: {
      type: String,
        default: ''
    },
    firstname: {
      type: String,
        default: ''
    },
    lastname: {
      type: String,
        default: ''
    },
    password: {
      type: String,
        default: ''
    },
    admin:   {
        type: Boolean,
        default: false
    },
    image: {
      type: String,
        default: 'default_user.png'
    },
        //facebookId: String,

});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);