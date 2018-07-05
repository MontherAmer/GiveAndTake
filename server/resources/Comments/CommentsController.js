var Comments = require('./Comments');

exports.createComment=function(req,res){
	console.log("req,session",req.session.username);
	var x=req.session.username;
	var comment=new Comments({
		idPost:req.body.idPost,
		username:req.session.username,
		text: req.body.text
	})

	comment.save(function(err){
		if(err){
			res.send(err)
		}
	res.json(comment)

	})

}

exports.updateComment= function(req, res){
	Comments.update({'_id':req.body._id},{'text':req.body.text},function(err,data){
		if(err){
			res.send(err);
		}
		res.send(data)
	})

}


exports.deleteComment= function(req, res){
	Comments.findOne({_id: req.body._id}, function(err, data){
		if(err){
			res.send(err);
		}
		data.remove()
		res.send('deleted')
	})
}


exports.retrieve= function(req, res){
	Comments.find(function(err, data){
		if(err){
			return handleError(err)
		}
		res.send(data)
	})
}