var Users = require('../User/Users');

// Complete each of the following controller methods

exports.retrive = function (req, res) {
	Users.findOne({username : req.params.username}).exec(function (err, user) {
		if (err) {
			res.json('err');
		}
		if (!user) {
			res.json('No such username, please check username')
		}
		res.json(user)
	});
};