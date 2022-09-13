const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		unique: true,
		required: true,
		minlength: 6,
		maxlength: 20,
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
	},
	birthDate: {
		type: Date,
	},
	profileName: {
		type: String,
	},
	emailID: {
		type: String,
	},
	status: {
		type: String,
		default: 'ACTIVE',
	},
	phoneNumber: {
		type: String,
	},

	individualChats: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'IndividualChat',
		},
	],
	groupChats: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'GroupChat',
		},
	],

	admin: {
		type: Boolean,
		default: false,
	},
});

//HASHING PASSWORD
userSchema.pre('save', function (next) {
	let user = this;

	this.profileName = this.get("firstName") + " " + this.get("lastName");

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) return next();

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
		if (err) return next(err);

		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function (err, hash) {
			if (err) return next(err);
			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
	bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
		if (err) return cb(err);
		cb(null, isMatch);
	});
};

module.exports = mongoose.model('User', userSchema);
