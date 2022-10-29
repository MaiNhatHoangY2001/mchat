const mongoose = require('mongoose');
const { GroupChat, User } = require('../model');

const groupChatController = {
	//ADD GROUP CHAT
	addGroupChat: async (req, res) => {
		try {
			const newGroup = new GroupChat(req.body);
			const saveGroup = await newGroup.save();
			if (req.body.user) {
				const idUsers = req.body.user;
				idUsers.map(async (idUser) => {
					const user = User.findById(idUser);
					await user.updateOne({ $push: { groupChats: saveGroup._id } });
				});
			}
			res.status(200).json(saveGroup);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	addUserGroupChat: async (req, res) => {
		try {
			const group = await GroupChat.findById(req.body.idGroup);
			await group.updateOne({ $push: { user: req.body.idUser } });
			
			const user = User.findById(req.body.idUser);
			await await user.updateOne({ $push: { groupChats: req.body.idGroup } });
			res.status(200).json('add successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	updateGroup: async (req, res) => {
		try {
			const group = await GroupChat.findById(req.params.id);
			await group.updateOne({ $set: req.body });
			res.status(200).json('update successfully');
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getListGroupChat: async (req, res) => {
		try {
			const idUser = mongoose.Types.ObjectId(req.params.id);

			const listGroupChat = await GroupChat.find({ user: idUser }).populate('message', 'time');
			res.status(200).json(listGroupChat);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getListChat: async (req, res) => {
		try {
			const idGroupChat = mongoose.Types.ObjectId(req.query.groupId);

			const listIndi = await GroupChat.aggregate([
				{
					$lookup: {
						from: 'messages',
						localField: 'message',
						foreignField: '_id',
						as: 'message',
					},
				},
				{
					$match: {
						_id: idGroupChat,
					},
				},

				{
					$unwind: '$message',
				},
				{
					$lookup: {
						from: 'users',
						localField: 'message.userGroupChat',
						foreignField: '_id',
						as: 'message.userGroupChat',
					},
				},
				{
					$unwind: '$message.userGroupChat',
				},
				{
					$project: {
						'message.type_Msg': 1,
						sender: '$message.userGroupChat._id',
						'message.content': 1,
						'message.time': 1,
						'message.imageContent': 1,
						'message.userGroupChat._id': 1,
						'message.userGroupChat.profileName': 1,

						_id: 0,
					},
				},
				{
					$sort: {
						'message.time': 1,
					},
				},
			]);

			res.status(200).json(listIndi);
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = groupChatController;
