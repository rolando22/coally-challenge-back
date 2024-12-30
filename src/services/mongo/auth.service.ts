import jwt from 'jsonwebtoken';
import { DocumentType } from '@typegoose/typegoose';

import { UserModel, UserSchema } from '../../db/mongo/models/User';
import { config } from '../../config';
import { Login, User } from '../../types';
import { IAuthService } from '../../interfaces';

export class AuthService implements IAuthService {

	login = async({ email, password }: Login): Promise<{ user: DocumentType<UserSchema>, token: string } | null> => {
		const user = await UserModel.findOne({ email });
		if (!user) return null;

		const passwordCorrect = await user.matchPassword(password);
		if (!passwordCorrect) return null;

		const userForToken = {
			id: user._id,
			username: user.username,
		};
		const token = jwt.sign(userForToken, config.jwtSecret, { expiresIn: 1000 * 60 * 60 * 24 });
		
		return {
			user,
			token,
		};
	}
}
