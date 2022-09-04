const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

let refreshTokens = [];
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
			{ expiresIn: '5d' }
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
				res.status(404).json('Wrong username');
			}

			const validPassword = await bcrypt.compare(req.body.password, user.password);

			if (!validPassword) {
				res.status(404).json('Password incorrect');
			}

			if (user && validPassword) {
				const accessToken = authController.generateAccessToken(user);
				const refreshToken = authController.generateRefreshToken(user);
				refreshTokens.push(refreshToken);
				res.cookie('refreshToken', refreshToken, {
					httpOnly: true,
					secure: false,
					path: '/',
					sameSite: 'strict',
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
		if (!refreshToken) return res.status(401).json("You're not authenticated");
		if(!refreshToken.includes(refreshToken)){
			return res.status(403).json("Refresh token is not valid");
		}
		jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
			if (err) {
				console.log(err);
			}
			refreshTokens = refreshTokens.filter((token) => token != refreshToken);
			//create new access token, refresh token
			const newAccessToken = authController.generateAccessToken(user);
			const newRefreshToken = authController.generateRefreshToken(user);
			refreshTokens.push(newRefreshToken);
			res.cookie('refreshToken', newRefreshToken, {
				httpOnly: true,
				secure: false,
				path: '/',
				sameSite: 'strict',
			});
			res.status(200).json({ accessToken: newAccessToken });
		});
	},

	//LOGOUT
	userLogout: async(req, res) => {
		res.clearCookie("refreshToken");
		refreshTokens = refreshTokens.filter(token => token !== req.cookies.refreshToken);
		res.status(200).json("LOGOUT!!")
	}
};

module.exports = authController;
