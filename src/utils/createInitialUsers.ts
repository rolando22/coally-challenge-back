import { UserModel } from '../db/mongo/models/User';

export const createInitialUsers = async () => {
	const user1 = new UserModel({
		firstName: 'Terry',
		lastName: 'Medhurst',
		email: 'atuny0@sohu.com',
		username: 'atuny0',
		password: '9uQFF1Lh',
		image: 'https://robohash.org/hicveldicta.png',
	});
	user1.password = await user1.encryptPassword(user1.password);
	await user1.save();

	
	const user2 = new UserModel({
		firstName: 'Sheldon',
		lastName: 'Quigley',
		email: 'hbingley1@plala.or.jp',
		username: 'hbingley1',
		password: 'CQutx25i8r',
		image: 'https://robohash.org/doloremquesintcorrupti.png',
	});
	user2.password = await user2.encryptPassword(user2.password);
	await user2.save();
	
	const user3 = new UserModel({
		firstName: 'Terrill',
		lastName: 'Hills',
		email: 'rshawe2@51.la',
		username: 'rshawe2',
		password: 'OWsTbMUgFc',
		image: 'https://robohash.org/consequunturautconsequatur.png',
	});
	user3.password = await user3.encryptPassword(user3.password);
	await user3.save();
};
