import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import bcrypt from 'bcrypt';

import { User } from '../../../types';

@modelOptions({
	schemaOptions: {
		toJSON: {
			transform: (_document, returnedObject) => {
				returnedObject.id = returnedObject._id;
				delete returnedObject._id;
				delete returnedObject.__v;
				delete returnedObject.password
			},
		},
	},
})
export class UserSchema extends TimeStamps {

	@prop({ type: String, required: true })
	firstName: string;
	
	@prop({ type: String, required: true })
	lastName: string;
	
	@prop({ type: String, required: true })
	email: string;
	
	@prop({ type: String, required: true })
	username: string;
	
	@prop({ type: String, required: true })
	password: string;
	
	@prop({ type: String, required: true })
	image: string;

	public async encryptPassword(password: User['password']) {
		const salt = await bcrypt.genSalt(10);
		return await bcrypt.hash(password, salt);
	}

	public async matchPassword(password: User['password']) {
		return await bcrypt.compare(password, this.password);
	}
}

export const UserModel = getModelForClass(UserSchema);
