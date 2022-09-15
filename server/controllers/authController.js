const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

let authToken;

const authController = {
	//REGISTER IS ADD USER IN CONTROLLER

	//GENERATE ACCESS TOKEN
	generateAccessToken: (user) => {
		return jwt.sign(
			{
				id: user.id,
				admin: user.admin,
			},
			process.env.JWT_ACCESS_KEY,
			{ expiresIn: '1h' }
		);
	},

	//GENERATE REFRESH TOKEN
	generateRefreshToken: (user) => {
		return jwt.sign(
			{
				id: user.id,
				admin: user.admin,
			},
			process.env.JWT_REFRESH_KEY,
			{ expiresIn: '365d' }
		);
	},

	//LOGIN
	loginUser: async (req, res) => {
		try {
			const user = await User.findOne({ userName: req.body.userName });

			if (!user) {
				return res.status(404).json('Wrong username');
			}

			const validPassword = await bcrypt.compare(req.body.password, user.password);

			if (!validPassword) {
				return res.status(404).json('Password incorrect');
			}

			if (user && validPassword) {
				const accessToken = authController.generateAccessToken(user);
				const refreshToken = authController.generateRefreshToken(user);
				authToken = refreshToken;
				res.cookie('refreshToken', refreshToken, {
					// create cookie with refresh token that expires in 7 days
					httpOnly: true,
					//expires: new Date(Date.now() + 7*24*60*60*1000),
					secure: true,
					path: '/',
					sameSite: 'none',
				});
				const { password, ...others } = user._doc;
				res.status(200).json({ ...others, accessToken });
			}
		} catch (error) {
			res.status(500).json(error);
		}
	},

	//REDIS
	requestRefreshToken: async (req, res) => {
		//Take refresh token from user
		const refreshToken = req.cookies.refreshToken;
		//Send error if token is not valid
		if (!refreshToken) return res.status(401).json("You're not authenticated");
		if (authToken !== refreshToken) {
			return res.status(403).json('Refresh token is not valid');
		}
		jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
			if (err) {
				console.log(err);
			}
			//create new access token, refresh token and send to user

			const newAccessToken = authController.generateAccessToken(user);
			const newRefreshToken = authController.generateRefreshToken(user);
			authToken = newRefreshToken;
			res.clearCookie('refreshToken');
			res.cookie('refreshToken', newRefreshToken, {
				httpOnly: true,
				secure: true,
				//expires: new Date(Date.now() + 7*24*60*60*1000),
				path: '/',
				sameSite: 'none',
			});
			res.status(200).json({
				accessToken: newAccessToken,
				refreshToken: newRefreshToken,
			});
		});
	},

	//LOGOUT
	userLogout: async (req, res) => {
		res.clearCookie('refreshToken');
		res.status(200).json('LOGOUT!!');
	},
};

module.exports = authController;
