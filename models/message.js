var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var schema = new Schema({
	content: {
		type: String,
		required: true
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

schema.post('remove', function(message){
	User.findById(message.user, function(err, user){
		if (err){
			
		}
		
		user.messages.pull(message);
		user.save();
	});
});

module.exports = mongoose.model('Message', schema);