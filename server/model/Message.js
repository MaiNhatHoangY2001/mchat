const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    type_Msg: {
        type: Number,
    },
    type_image: {
        type: Number,
    },
    type_Voice: {
        type: Number,
    },
    type_Video: {
        type: Number,
    },
    type_Location: {
        type: Number,
    },
    type_File: {
        type: Number,
    },
    type_Ack: {
        type: Number,
    },
    Content: {
        type: String,
    },
    chatHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ChatHistory',
    },
});

module.exports =  mongoose.model('Message', messageSchema);