import type { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

import type { IAuthController, IAuthService } from '../interfaces';

export class AuthController implements IAuthController {
	readonly #authService;

	constructor({ authService }: { authService: IAuthService }) {
		this.#authService = authService;
	}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = validationResult(req);
			
			if (!result.isEmpty()) {
				res.status(400).json({ errors: result.array() })
				return;
			}

			const { email, password } = matchedData(req);
			const data = await this.#authService.login({ email, password });

			if (!data) {
				res.status(401).json({ error: 'Invalid user or password' })
				return;
			}

			const { user, token } = data;

			res.json({ 
				data: { user, token }, 
			});
		} catch (error) {
			next(error);
		}
	};
}
