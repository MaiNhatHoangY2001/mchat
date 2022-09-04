const mongoose = require('mongoose');

const individualChatSchema = new mongoose.Schema({
    peerId: {
        type: String,
    },
    status: {
        type: String,
    },
    chat: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Chat',
        },
    ],
    chatHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatHistory',
    },
});

module.exports = mongoose.model('IndividualChat', individualChatSchema);