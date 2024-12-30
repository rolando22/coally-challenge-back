import { Schema } from 'express-validator';

export const CreateTaskSchema: Schema = {
	title: {
		isString: {
			errorMessage: 'Title must be a string',
		},
		trim: true,
		isLength: {
			options: { min: 1 },
			errorMessage: 'Title is required',
		},
		escape: true,
	},
	description: {
		isString: {
			errorMessage: 'Description must be a string',
		},
		trim: true,
		isLength: {
			options: { min: 1 },
			errorMessage: 'Description is required',
		},
		escape: true,
		optional: true,
	},
};

export const UpdateTaskSchema: Schema = {
	title: {
		isString: {
			errorMessage: 'Title must be a string',
		},
		trim: true,
		isLength: {
			options: { min: 1 },
			errorMessage: 'Title is required',
		},
		escape: true,
		optional: true,
	},
	description: {
		isString: {
			errorMessage: 'Description must be a string',
		},
		trim: true,
		// isLength: {
		// 	options: { min: 1 },
		// 	errorMessage: 'Description is required',
		// },
		escape: true,
		optional: true,
	},
	completed: {
		isBoolean: {
			errorMessage: 'Completed must be a boolean',
		},
		optional: true,
	},
};

export const FiltersTaskSchema: Schema = {
	completed: {
		isIn: {
			options: [['completed', 'pending']],
			errorMessage: `Completed must be 'completed' or 'pending'`,
		},
		optional: true,
	}
};
