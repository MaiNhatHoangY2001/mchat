const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
	groupName: {
		type: String,
	},
	chatStatus: {
		type: Number,
	},
	groupAdmin: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	groupImage: {
		type: String,
		default: 'https://demoaccesss3week2.s3.ap-southeast-1.amazonaws.com/avata01.png',
	},
	user: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	],
	message: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Message',
		},
	],
});

module.exports = mongoose.model('GroupChat', groupChatSchema);
