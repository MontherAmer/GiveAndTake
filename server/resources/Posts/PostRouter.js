var PostRouter=require('express').Router();
var PostController=require('./PostController');

PostRouter.route('/')
    .get(function (req, res) {
		res.json('aaaa')
	})
    .post(function (req, res) {
		PostController.create(req, res); 
	})
    .delete( function (req, res) {
        PostController.deletePost(req, res);
    })
    .put(function (req, res) {
		PostController.updatePost(req, res);
	})

module.exports = PostRouter;