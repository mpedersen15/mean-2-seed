var express = require('express');
var router = express.Router();
var Message = require('../models/message');

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

router.post('/', function(req, res, next){ // only '/' because there is a /message BEFORE this path
	var message = new Message({
		content: req.body.content
	});
	
	message.save( (error, result) => {
		
		if (error){
			return res.status(500).json({
				title: 'An error occured',
				error: error.message
			});
		}
		
		res.status(201).json({
			message: 'Message Saved',
			object: result
		});
		
	})
});

module.exports = router;
