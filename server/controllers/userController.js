const { User } = require('../model');

const userController = {
	//ADD USER
	addUser: async (req, res) => {
		try {
			const newUser = new User(req.body);
			const saveUser = await newUser.save();
			res.status(200).json(saveUser);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//GET ALL USERS
	getAllUsers: async (_req, res) => {
		try {
			const users = await User.find();
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json(error);
		}
	},
	//DELETE A USER
	deleteUser: async (req, res) => {
		try {
			await User.findByIdAndDelete(req.params.id);
			res.status(200).json('Deleted successfully!');
		} catch (error) {
			res.status(500).json(error);
		}
	},

	searchUser: async (req, res) => {
		try {
			let result = await User.aggregate([
				{
					$search: {
						compound: {
							should: [
								{
									autocomplete: {
										query: `${req.query.term}`,
										path: 'userName',
										fuzzy: {
											prefixLength: 3,
										},
									},
								},
								{
									autocomplete: {
										query: `${req.query.term}`,
										path: 'phoneNumber',
										fuzzy: {
											prefixLength: 3,
										},
									},
								},
							],
						},
					},
				},
				{
					$limit: 5,
				},
				{
					$project: {
						_id: 1,
						password: 0,
						emailID: 0,
						status: 0,
						chats: 0,
						admin: 0,
						__v: 0,
					},
				},
			]);
			res.send(result);
		} catch (e) {
			res.status(500).send({ message: e.message });
		}
	},
};

module.exports = userController;
