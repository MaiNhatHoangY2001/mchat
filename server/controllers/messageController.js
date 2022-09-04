const { Message } = require('../model');

const messageController = {
    // ADD A MESSAGE
    addMessage: async (req, res) => {
		try {
			const newMes = new Message(req.body);
			const saveMes = await newMes.save();
			res.status(200).json(saveMes);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET ALL MESSAGE
	getAllMessage: async (_req, res) => {
		try {
			const messages = await Message.find();
			res.status(200).json(messages);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = messageController;