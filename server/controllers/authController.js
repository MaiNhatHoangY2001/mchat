const bcrypt = require('bcrypt');
const User = require('../model/User');

const authController = {
	//REGISTER IS ADD USER IN CONTROLLER

	//LOGIN
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({userName: req.body.userName});
            
			if (!user) {
				res.status(404).json('Wrong username');
			}

			const validPassword = await bcrypt.compare(req.body.password, user.password);

			if (!validPassword) {
				res.status(404).json('Password incorrect');
			}

			if (user && validPassword) {
				res.status(200).json(user);
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},
};

module.exports = authController;
