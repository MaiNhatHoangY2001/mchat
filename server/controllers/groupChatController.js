const { GroupChat, User } = require ('../model');

const groupChatController = {
    //ADD GROUP CHAT
	addGroupChat: async (req, res) => {
		try {
			const newGroup = new GroupChat(req.body);
			const saveGroup = await newGroup.save();
			if (req.body.user) {
				const user = User.findById(req.body.user);
				await user.updateOne({ $push: { groupChats: saveGroup._id } });
			}
			res.status(200).json(saveGroup);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET ALL GROUP CHAT
	getAllGroupChat: async (_req, res) => {
		try {
			const Groups = await GroupChat.find();
			res.status(200).json(Groups);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET A GROUP CHAT
	getGroupChat: async (req, res) => {
		try {
			const group = await GroupChat.findById(req.params.id).populate('chatHistory');
			res.status(200).json(group);
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//UPDATE CHAT
	updateGroupChat: async (req, res) => {
		try {
			const group = await GroupChat.findById(req.params.id);
			await group.updateOne({ $set: req.body });
			res.status(200).json('Updated successfully!');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//DELETE A CHAT
	deleteGroupChat: async (req, res) => {
		try {
			await GroupChat.findByIdAndDelete(req.params.id);
			res.status(200).json('Deleted successfully!');
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = groupChatController;