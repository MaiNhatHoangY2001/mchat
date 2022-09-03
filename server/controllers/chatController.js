const { Chat, User } = require('../model');

const chatController = {
	//ADD CHAT
	addChat: async (req, res) => {
		try {
			const newChat = new Chat(req.body);
			const saveChat = await newChat.save();
			if (req.body.user) {
				const user = User.findById(req.body.user);
				await user.updateOne({ $push: { chats: saveChat._id } });
			}
			res.status(200).json(saveChat);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET ALL CHAT
	getAllChat: async (_req, res) => {
		try {
			const chats = await Chat.find();
			res.status(200).json(chats);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET A CHAT
	getAChat: async (req, res) => {
		try {
			const chat = await Chat.findById(req.params.id).populate('author');
			res.status(200).json(chat);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//UPDATE CHAT
	updateChat: async (req, res) => {
		try {
			const chat = await Chat.findById(req.params.id);
			await chat.updateOne({ $set: req.body });
			res.status(200).json('Updated successfully!');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//DELETE A CHAT
	deleteChat: async (req, res) => {
		try {
			await User.updateMany({ chats: req.params.id }, { $pull: { chats: req.params.id } });
			await Chat.findByIdAndDelete(req.params.id);
			res.status(200).json('Deleted successfully!');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = chatController;
