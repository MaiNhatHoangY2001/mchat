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
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
    },
    chatHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ChatHistory',
        },
    ],
});

module.exports =  mongoose.model('GroupChat', groupChatSchema);;