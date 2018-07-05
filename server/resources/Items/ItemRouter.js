var ItemRouter = require('express').Router();
var ItemController = require('./ItemController');

ItemRouter.route('/')
	.get(function (req, res) {
		  ItemController.retrieve(req,res);

	})
	.post(function (req, res) {
		ItemController.createItem(req, res); // createItem
	})
	.put(function (req, res) {
		ItemController.updateItem(req, res); // updateItem
	})
	.delete(function (req, res) {
		ItemController.deleteItem(req, res); // deleteItem
	})
ItemRouter.route('/home')
	.get(function (req, res) {
		ItemController.limitedItem(req, res);
	})
ItemRouter.route('/:id')
	.get(function (req, res) {
		ItemController.getItemByID(req, res);
	})

module.exports = ItemRouter;
