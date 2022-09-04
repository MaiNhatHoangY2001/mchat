const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
    sender: {
		type: String,
		unique: true, 
		required: true,
		minlength: 6,
		maxlength: 20,
	},
	individualChat: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'IndividualChat',
		},
	],
	groupChat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'GroupChat',
	},
	message: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
		},
	],
});

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
