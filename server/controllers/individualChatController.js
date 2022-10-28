const mongoose = require('mongoose');
const { IndividualChat, User, GroupChat } = require('../model');

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
	getListIndividualChat: async (req, res) => {
		try {
			const idUser = mongoose.Types.ObjectId(req.params.id);

			const listInvidualChat = await IndividualChat.find({ user: idUser })
				.populate('message')
				.populate('sender', 'firstName lastName birthDate profileName status');
			res.status(200).json(listInvidualChat);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	getIndividualChat: async (req, res) => {
		try {
			const idUser = mongoose.Types.ObjectId(req.query.idUser);
			const idSender = mongoose.Types.ObjectId(req.query.idSender);

			const individualChat = await IndividualChat.find({ user: idUser, sender: idSender });

			res.status(200).json(individualChat);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET CHAT WITH USER ID AND SENDER
	getListChat: async (req, res) => {
		try {
			const idSender = mongoose.Types.ObjectId(req.query.sender);
			const idUser = mongoose.Types.ObjectId(req.query.user);

			const listIndi = await IndividualChat.aggregate([
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
						$or: [
							{
								sender: idSender,
								user: idUser,
							},
							{
								sender: idUser,
								user: idSender,
							},
						],
					},
				},

				{
					$unwind: '$message',
				},
				{
					$project: {
						'message.content': 1,
						'message.time': 1,
						'message.type_Msg': 1,
						'message.imageContent': 1,
						sender: '$user',
						'message._id': 1,
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

module.exports = individualChatController;
