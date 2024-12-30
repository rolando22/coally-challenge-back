import mongoose from 'mongoose';
import { UserModel } from './models/User';
import { createInitialUsers } from '../../utils/createInitialUsers';
import { config } from '../../config';

const { mongoUser, mongoPassword, host, database, dbPort } = config;

const connectionString = `mongodb://${mongoUser}:${mongoPassword}@${host}/${database}?authSource=admin`;

(async () => {
	try {
		await mongoose.connect(connectionString);
		console.log(`Database connected at: ${dbPort}`);

		const users = await UserModel.find({});
		if (users.length === 0) await createInitialUsers();
	} catch (error) {
		console.log(error);
	}
})();
