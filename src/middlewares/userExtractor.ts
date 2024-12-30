import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { CustomJwtPayload } from '../types/server';
import { config } from '../config';

export const authentication = (req: Request, res: Response, next: NextFunction) => {
	const authorization = req.get('authorization');
	let token = '';
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		token = authorization.split(' ')[1];
	}
	const decodedToken = jwt.verify(token, config.jwtSecret) as CustomJwtPayload;

	const { id } = decodedToken;
	req.userId = id;
	next();
};
