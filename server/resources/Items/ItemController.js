var Items = require('./Items');
var Users = require('../User/Users');

exports.createItem = function (req, res) {
	var item= new Items({
		username:req.session.username,
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		available: req.body.available,
		location: req.body.location
	})	
	
	item.save(function(err){
		if(err){
			return handleError(err)
		}
	})
			res.json(item)

};

exports.updateItem = function (req, res) {
var updateitem={
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		available: !req.body.available,
		location: req.body.location
	}
Items.findOneAndUpdate({name:req.body.name},updateitem,function(err,data){
		if(err){
			res.json('err');
		}
		else{
			 data.save(function(err,data){
			 	if(err){
					return handleError(err)
			 	}
			 	else{
			 	res.json(data);
			 }
	      })

		}
	      
	})
};

exports.deleteItem = function (req, res) {
	Items.findOne({_id:req.body.id},function(err,data){
		if(err){
			res.send(err)
		}
		data.remove();
	})
	Users.findOne({username : req.session.username}).exec(function (err, user) {
		for (var i = 0 ; i < user.items.length ; i++) {
			if (req.body.id == user.items[i]) {
				user.items.splice(i,1)	
			}
		}
		user.save(function (err, updatedUser) {
		    if (err) return console.log(err);
		    res.json(updatedUser);
		});
	});
};

exports.searchItem = function (req,res){
Items.find({name:req.body.name},function(err,data){
if(err){
	return handleError(err)
}
res.send(data)
})
};


exports.retrieve= function(req, res){
	Items.find(function(err, data){
		if(err){
			return handleError(err)
		}
		res.send(data)
	})
}

exports.limitedItem = function(req, res) {
	Items.
	  find({}).
	  limit(5).
	  sort('-dateOfCreation').
	  exec(function (err, data) {
	  	res.json(data);
	  });
}

exports.getItemByID = function(req, res) {
	Items.findById(req.params.id).exec(function (err, item) {
		if (err) {
			res.json(err);
		} 
		if (!item) {
			res.json("no item");
		} else {
			res.json(item)			
		}
	})
}