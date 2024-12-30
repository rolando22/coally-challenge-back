import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

import { UserSchema } from './User';

@modelOptions({
	schemaOptions: {
		toJSON: {
			transform: (_document, returnedObject) => {
				returnedObject.id = returnedObject._id;
				delete returnedObject._id;
				delete returnedObject.__v;
			},
		},
	},
})
export class TaskSchema extends TimeStamps {

	@prop({ type: String, required: true })
	title: string;

	@prop({ type: String, required: false, default: '' })
	description: string;
	
	@prop({ type: Boolean, default: false })
	completed: boolean;

	@prop({ ref: () => UserSchema })
	userId: Ref<UserSchema>;
}

export const TaskModel = getModelForClass(TaskSchema);
