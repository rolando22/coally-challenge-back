import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { AuthController } from '../controllers/auth.controller';
import { LoginAuthSchema } from '../schemas/auth';
import { IAuthService } from '../interfaces';

export const createAuthRouter = ({ authService }: { authService: IAuthService }) => {
	const router = Router();

	const authController = new AuthController({ authService });

	router.post('/login', checkSchema(LoginAuthSchema, ['body']), authController.login);

	return router;
};
