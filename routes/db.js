/**
 * Created by ss on 07/20/2016
 * routing for data
 */
var Post = require('../model/post');

module.exports = function(app){
	//Get all posts
	app.get('/freeboard/posts',function(req,res){
		Post.find({location_id: req.params.location_id},{_id:0, uid:0},function(err,posts){
			if(err) return res.status(500).send({error: 'Database failure'});
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
	app.post('/freeboard/posts',function(req,res){
		var post = new Post();
		post.profile = req.body.profile;
		post.username = req.body.username;
		post.body = req.body.body;
		post.date = Date.now();
		
		post.save(function(err){
			if(err){
				console.error(err);
				res.json({result: 0});
				return;
			}
			res.json({result: 1});
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