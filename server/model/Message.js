const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
		type: String,
		unique: true, 
		required: true,
	},
    type_Msg: {
        type: Number,
        required: true,
    },
    Content: {
        type: String,
        required: true,
    },
    individualChats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'IndividualChat',
    },
    groupChats: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'GroupChat',
    }
});

module.exports =  mongoose.model('Message', messageSchema);