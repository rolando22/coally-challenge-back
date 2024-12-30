import type { NextFunction, Request, Response } from 'express';

const ERROR_HANDLERS: Record<string, (res: Response, error: Error) => void> = {  
	CastError: (res: Response) => res.status(400).send({ error: 'id used is malformed' }),

	JsonWebTokenError: (res: Response) => res.status(401).json({ error: 'token missing or invalid' }),
  
	TokenExpirerError: (res: Response) => res.status(401).json({ error: 'token expired' }),

	SyntaxError: (res: Response) => res.status(401).json({ error: 'token invalid' }),
  
	defaultError: (res: Response, error: Error) => {
		console.error(error.name);
		console.error(error);
		res.status(500).end();
	}
};

export const handlerError = (error: Error, req: Request, res: Response, next: NextFunction) => {
	const handler = ERROR_HANDLERS[error.name] ?? ERROR_HANDLERS.defaultError;
	handler(res, error);
};
