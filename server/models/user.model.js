'use strict'
import mongoose from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../models';
import config from '../config';

const Schema = mongoose.Schema;

let UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		trim: true,
		lowercase: true,
		unique: true,
		required: true,
		validate: {
			isAsync: false,
			validator: isEmail,
			message: 'Invalid email'
		}
	},
	password: {
		type: String,
		required: true
	},
	token: {
		type: String
	},
	created: {
		type: Date,
		default: Date.now
	}
}, {  })

// addeded model level mothod for verify password
UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.hash_password)
}

// implemen mongoose pre hook to perform token and password operation
UserSchema.pre('findOneAndUpdate', async function () {
	let data = this.getUpdate();
	if (data.password){
		data.password = bcrypt.hashSync(data.password, 10)
	}
});

UserSchema.pre('update', async function () {
	let data = this.getUpdate();
	if (data.password) {
		data.password = bcrypt.hashSync(data.password, 10)
	}
});

UserSchema.pre('save', async function (next) {
	if (this.password) {
		this.password = bcrypt.hashSync(this.password, 10)
	}
	if (!this.token)
		this.token = jwt.sign({ userId: this._id }, config.get('jwtSecret'));
	next()
});

export default db.model('users', UserSchema)
