const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
	chatStatus: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	individualChat: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'IndividualChat',
		},
	],
	groupChat: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GroupChat',
		},
	],
});

module.exports =  mongoose.model('Chat', chatSchema);;
