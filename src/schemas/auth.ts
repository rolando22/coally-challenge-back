import { Schema } from 'express-validator';

export const LoginAuthSchema: Schema = {
	email: {
		isEmail: {
			errorMessage: 'Must be a valid e-mail address',
		},
		isLength: {
			options: { min: 1 },
			errorMessage: 'Email is required',
		},
	},
	password: {
		isLength: {
			options: { min: 1 },
			errorMessage: 'Password is required',
		},
	}
};
