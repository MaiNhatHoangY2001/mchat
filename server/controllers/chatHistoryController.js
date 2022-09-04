const { ChatHistory } = require('../model');

const chatHistoryController = {
    // GET LIST MESSAGE
	getMsgList: async (_req, res) => {
		try {
			const listChatHistory = await ChatHistory.find();
			res.status(200).json(listChatHistory);
		} catch (error) {
			res.status(500).json(error);
		}
	},

    // ADD A MESSAGE
	addMesg: async (req, res) => {
		try {
			const newChatHistory = new ChatHistory(req.body);
			const chatHis = await newChatHistory.save();
			res.status(200).json(chatHis);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = chatHistoryController;