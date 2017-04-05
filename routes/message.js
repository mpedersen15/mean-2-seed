var express = require('express');
var router = express.Router();
var Message = require('../models/message');
var User = require('../models/user');

var jwt = require('jsonwebtoken');
router.get('/', function(req, res, next){
	Message.find()
		.exec(function(err, messages){
			if (err){
				return res.status(500).json({
					title: 'An error occured',
					error: err.message
				})
			}
			
			res.status(200).json({
				message: 'Success',
				obj: messages
			});
		});
});

router.use('/', function(req, res, next){
	jwt.verify(req.query.token, 'secret', function(err, decodedToken){
		if (err){
			return res.status(401).send({
				title: 'Not authenticated',
				obj: err
			})
		}
		console.log('decoded token', decodedToken);
		next();
	});
});

router.post('/', function(req, res, next){ // only '/' because there is a /message BEFORE this path
	var decoded = jwt.decode(req.query.token);
	
	console.log('decoded token', decoded);
	
	User.findById(decoded.user._id, function(err, user){
		
		console.log('user in post route', user);
		
		if (err){
			return res.status(500).json({
				title: 'An error occured',
				error: error.message
			});
		}
		
		var message = new Message({
			content: req.body.content,
			user: user
		});
		
		message.save( (error, result) => {
			
			if (error){
				return res.status(500).json({
					title: 'An error occured',
					error: error.message
				});
			}
			
			// Add message to user object
			user.messages.push(result);
			user.save();
			
			res.status(201).json({
				message: 'Message Saved',
				obj: result
			});
			
		})
		
	})
	
});

router.patch('/:id', function(req, res, next){
	var decoded = jwt.decode(req.query.token);
	Message.findById(req.params.id, (err, message) => {
		if (err){
			return res.status(500).json({
				title: 'An error occured',
				error: error.message
			});
		}
		
		if (!message){
			return res.status(500).json({
				title: 'Message not found',
				error: {
					message: 'Message not found'
				}
			})
		}
		
		if (message.user != decoded.user._id){
			return res.status(401).send({
				title: 'Not authenticated',
				obj: {
					message: 'Users do not match'
				}
			})
		}
		
		message.content = req.body.content;
		message.save((error,result) => {
			if (error){
				return res.status(500).json({
					title: 'An error occured',
					error: error.message
				});
			}
			
			res.status(201).json({
				message: 'Message Updated',
				obj: result
			});
		})
	});
});

router.delete('/:id', (req, res, next) => {
	var decoded = jwt.decode(req.query.token);
	Message.findById(req.params.id, (err, message) => {
		if (err){
			return res.status(500).json({
				title: 'An error occured',
				error: error.message
			});
		}
		
		if (!message){
			return res.status(500).json({
				title: 'Message not found',
				error: {
					message: 'Message not found'
				}
			})
		}
		
		if (message.user != decoded.user._id){
			return res.status(401).send({
				title: 'Not authenticated',
				obj: {
					message: 'Users do not match'
				}
			})
		}
		
		message.remove((error,result) => {
			if (error){
				return res.status(500).json({
					title: 'An error occured',
					error: error.message
				});
			}
			
			res.status(200).json({
				message: 'Message Deleted',
				obj: result
			});
		})
	});
})

module.exports = router;
