var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var User = require('../models/user');

router.post('/', function(req, res, next){
	var user = new User({
		firstName: req.body.firstName, 
		lastName: req.body.lastName, 
		email: req.body.email, 
		password: bcrypt.hashSync(req.body.password, 10)
	});
	
	user.save((err, results) => {
		if (err){
			return res.status(500).json({
				title: 'An error occured',
				error: err.message
			})
		}
		
		res.status(200).json({
			message: 'User created',
			obj: results
		})
	});
});

router.post('/login', function(req, res, next){
	console.log('in login route', req.body);
	User.findOne({email: 'mattp152002@hotmail.com'}, (err, user) => {
		console.log(user);
		if (err){
			console.log('err',err);
			return res.status(500).json({
				title: 'An error occured',
				error: err.message
			})
		}
		
		if (!user){
			console.log('no user found');
			return res.status(401).json({
				title: 'Username or password incorrect',
				error: {
					message: 'Username or password incorrect'
				}
			})
		}
		
		console.log('user', user);
		if (!bcrypt.compareSync(req.body.password, user.password)){
			console.log('credentials incorrect');
			return res.status(401).json({
				title: 'Username or password incorrect',
				error: {
					message: 'Username or password incorrect'
				}
			})
		}
		
		console.log('user in login', user);
		var token = jwt.sign({user}, 'secret', {expiresIn: 7200});
		
		res.status(200).send({
			message: 'Login Successful',
			token: token,
			userId: user._id
		});
		
	});
	
	
});

module.exports = router;
