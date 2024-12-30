import jwt from 'jsonwebtoken';

import { config } from '../../config';
import { IAuthService } from '../../interfaces';
import { Login, User } from '../../types';
import { users } from '../../mocks/users';

export class AuthService implements IAuthService {

	login = async({ email, password }: Login): Promise<{ user: User, token: string } | null> => {
		const user = structuredClone(users).find(user => user.email === email);
		if (!user) return null;

		const passwordCorrect = user.password === password;
		if (!passwordCorrect) return null;

		const userForToken = {
			id: user.id,
			username: user.username,
		};

		const token = jwt.sign(userForToken, config.jwtSecret, { expiresIn: 1000 * 60 * 60 * 24 });

		return {
			user,
			token,
		};
	}
}
