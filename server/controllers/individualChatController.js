const { IndividualChat, User } = require('../model');

const individualChatController = {
    //ADD INDIVIDUAL CHAT
	addIndividualChat: async (req, res) => {
		try {
			const newIndi = new IndividualChat(req.body);
			const saveIndi = await newIndi.save();
			if (req.body.user) {
				const user = User.findById(req.body.user);
				await user.updateOne({ $push: { individualChats: saveIndi._id } });
			}
			res.status(200).json(saveIndi);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET INDIVIDUAL CHAT
	getListIndividualChat: async (req, res) => {
		try {
			const listIndi = await IndividualChat.findById(req.params.id).populate('chatHistory');
			res.status(200).json(listIndi);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = individualChatController;