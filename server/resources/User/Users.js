var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var UsersSchema = mongoose.Schema({
	username: {type: String, index: {unique: true} , required : true},
	password: {type: String , required : true},
	firstName : {type: String , required : true},
	lastName : {type: String , required : true},
	phone: {type:Number},
	about: {type: String },
	email : {type: String, index: {unique: true} , required : true},
	imgUrl : {type: String },
	items: [{type: mongoose.Schema.Types.ObjectId, ref: 'Items'}],
	messages: [{type: mongoose.Schema.Types.ObjectId, ref: 'Messages'}]
},
{  usePushEach: true});

var defualtImg = "https://www.sarahotels.in/img/default-user.png"

UsersSchema.pre('save', function (next) {
	if(!this.imgUrl){
        this.imgUrl = defualtImg;
    }
    if (!this.isModified('password')) {
    	return next();
    } 
    var cipher = Promise.promisify(bcrypt.hash);
	  return cipher(this.password, null, null).bind(this)
	    .then(function(hash) {
	      this.set('password', hash);
	      next();
	    });
});

UsersSchema.methods.validatePassword = function(password, callback) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) {
        	return callback(err);
        }
        callback(null, isMatch);
    });
};

var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;
