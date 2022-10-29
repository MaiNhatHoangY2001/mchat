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
		default: 'https://res.cloudinary.com/dpux6zwj3/image/upload/v1667061870/Avata/computer-science-1331579_1280_nomqbh.png',
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
