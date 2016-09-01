/**
 * Created by ss on 07/20/2016
 * routing for data
 */
var Post = require('../model/post');

module.exports = function(app){
	//Get all posts by location ID
	app.get('/freeboard/posts',function(req,res){
		Post.find({location_id: req.query.location_id},{_id:0, uid:0},function(err,posts){
		//	console.log(req.query);
			if(err) return res.status(500).send({error: 'Database failure'});
			//console.log(posts);
			res.json(posts);
		})
	});

	//Get posts by id
	app.get('/freeboard/posts/body',function(req,res){
		Post.find({location_id: req.params.location_id, username: req.params.username},{_id:0, uid:0},function(err,posts){
			if(err) return res.status(500).json({error:err});
			if(posts.length ===0 ) return res.status(404).json({error: "It doesn't match with any posts"});
			res.json(posts);
		})
	});

	//Create post
	app.post('/freeboard/posts',function(req,res,next){
		var post = new Post();
        console.log(req);
		post.uid = req.body.uid;
		post.username = req.body.username;
		post.body = req.body.body;
		post.date = Date.now();
		post.location_id =  req.body.location_id;

		console.log(req.body);

		post.save(function(err, data){
			if(err){
				console.error(err);
				next(err);
				return;
			}
			res.json(data); // if saving sucess, send data to client
			// client needs date, and so on
		});
	});
	//comments
	app.post('/freeboard/posts/comment',function(req,res,next){
		var post = new Post();
		var postId;
		console.log(req);
		console.log(req.body);
		post.update({_id: req.body._id },
		 { $push: { comment: {
			 uid: req.body.uid,
			 username: req.body.username,
			 body: req.body.body,
			 date:Date.now()} }
		 }
		);

		post.save(function(err, data){
			if(err){
				console.error(err);
				next(err);
				return;
			}
			res.json(data); // if saving sucess, send data to client
			// client needs date, and so on
		});
	});

	//Update the post
	/*app.put('/api/posts/id',function(req,res){

	});*/

	//Delete post
	/*app.delete('/freeboard/posts/id',function(req,res){
		Post.remove({_id: req.params._id},function(err,output){
			if(err) return res.status(500).json({error: "data remove failure"});
			res.status(204).end();
		})
	})*/
}