const mongoose = require('mongoose');

const groupChatSchema = new mongoose.Schema({
    groupId: {
        type: String,
		unique: true, 
		required: true,
		minlength: 6,
		maxlength: 20,
    },
    groupName: {
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

module.exports =  mongoose.model('GroupChat', groupChatSchema);;