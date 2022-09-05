const jswt = require('jsonwebtoken');

const middlewareController = {
	//verifyToken
	verifyToken: (req, res, next) => {
		const token = req.headers.token;
		if (token) {
			const accessToken = token.split(' ')[1];
			jswt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
				if (err) {
					return res.status(403).json('Token is not valid');
				}
				req.user = user;
				next();
			});
		} else {
			return res.status(401).json("You're not authenticated");
		}
	},

    verifyTokenAndAdminAuth: (req, res, next) => {
        middlewareController.verifyToken(req, req, ()=> {
            if(req.user.id == req.params.id || req.user.admin){
                next();
            }
            else{
                return res.status(403).json("you're not to delete other");
            }
        });
    }
};

module.exports = middlewareController;
