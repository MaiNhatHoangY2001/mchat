const { IndividualChat } = require('../model');

const individualChatcontroller = {
    //ADD INDIVIDUAL CHAT
	addIndividualChat: async (req, res) => {
		try {
			const newIndi = new IndividualChat(req.body);
			const saveIndi = await newIndi.save();
			res.status(200).json(saveIndi);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET INDIVIDUAL CHAT
	getListIndividualChat: async (_req, res) => {
		try {
			const listIndi = await IndividualChat.find();
			res.status(200).json(listIndi);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = individualChatcontroller;