var commentRouter = require('express').Router();
var commentController = require('./CommentsController');

commentRouter.route('/')
	.get(function (req, res) {
	commentController.retrieve(req,res);
		})
	.post(function(req,res){
		commentController.createComment(req,res);
	})
	.put(function(req,res){
		console.log('asdasdsa',req.body);
		commentController.updateComment(req,res);
	})
	.delete(function(req,res){
		commentController.deleteComment(req,res);
	})																											



module.exports = commentRouter;
