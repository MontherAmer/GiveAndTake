var profileRouter = require('express').Router();
var profileController = require('./ProfileController');

profileRouter.route('/:username')
    .get(function (req, res) {
		profileController.retrive(req , res); 
	})
    .put(function (req, res) {
	profileController.updateUser(req , res); 
})

module.exports = profileRouter;