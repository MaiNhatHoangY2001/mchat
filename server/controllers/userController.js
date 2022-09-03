const {User} = require("../model");


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


}


module.exports = userController;