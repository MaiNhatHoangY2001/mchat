const mongoose = require('mongoose');

const individualChatSchema = new mongoose.Schema({
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true, 
		required: true,
	},
	status: {
		type: String,
	},
	chatStatus: {
		type: Number,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	message: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
		},
	],
});

module.exports = mongoose.model('IndividualChat', individualChatSchema);
