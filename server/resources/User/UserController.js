var Users = require('./Users');
var Items = require('../Items/Items');
var Messages = require('../Messages/Messages');

exports.create = function (req, res) {
    var user = new Users(req.body);
	user.save(function (err, user) {
	    if (err) {
	    	return console.error(err);	
	    } 
	    res.redirect('/login');
	});
};

exports.login = function (req, res) {
	Users.findOne({username : req.body.username}).exec(function (err, user) {
		if (err) {
			return console.error(err);
		}
		else if (!user) {
			console.error("user not found")
		} else {
			user.validatePassword(req.body.password, function(err, isMatch) {
	        	if (err) { 
	        		return res.json(err); 
	        	}
	        	else if (!isMatch) {
	        		res.json('Password not Match')
	        	}
	        	else {
		        	return req.session.regenerate(function(err) {
		        		if (err) {
		        			return console.error(err);
		        		}
		        		req.session.username = user.username;
		        		res.json(user);
					});
	        	}
		    });
		}
	});
};

exports.logout = function (req, res) {
	req.session.destroy(function(err) {
		if (err) {
			return console.log(err);
		}
		res.json("logged out")
	})
};

exports.findUser = function (req, res) {
	Users.findOne({username : req.session.username}).exec(function (err, user) {
		res.json(user)
	});
};

exports.addItem = function (req, res) {
	Users.findOne({username : req.session.username}).exec(function (err, user) {
		var item = new Items({
			username:req.session.username,
			phone:user.phone,
			name: req.body.name,
			image: req.body.image,
			description: req.body.description,
			available: true,
			location: req.body.location
		});	
		item.save(function(err){
			if(err){
				return handleError(err)
			}
		});
		user.items.push(item._id);
		user.save(function (err, updatedUser) {
		    if (err) return console.log(err);
		    res.json(updatedUser);
		});
	});
}

exports.sendMessage = function (req, res) {
	var message = new Messages({
		sendUsername: req.session.username,
		recivedUsername: req.body.recivedUsername,
		text: req.body.text
	});
	message.save(function (err) {
		if (err) {
			console.log(err);
		}
	});
	Users.findOne({username : req.session.username}).exec(function (err, user) {	
		user.messages.push(message._id)
		user.save(function (err, updatedUser) {
		    if (err) return console.log(err);
		});
	});
	Users.findOne({username : req.body.recivedUsername}).exec(function (err, user) {	
		user.messages.push(message._id)
		user.save(function (err, updatedUser) {
		    if (err) return console.log(err);
		    res.json(updatedUser);
		});
	});
}
