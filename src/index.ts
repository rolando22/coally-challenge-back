import express from 'express';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
import specs from './swagger/swagger';

import { config } from './config';

import { createAuthRouter } from './routes/auth.routes';
import { createTaskRouter } from './routes/tasks.routes';
import { notFound } from './middlewares/notFound';
import { handlerError } from './middlewares/handlerError';

import type { IAuthService, ICRUDTaskService } from './interfaces';

export function createApp({
	authService,
	taskService,
}: {
	authService: IAuthService,
	taskService: ICRUDTaskService,
}) {
	const PORT = config.port;

	const app = express();

	app.use(express.json());
	app.use(cors());
	app.disable('x-powered-by');

	app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
	app.use('/api/auth', createAuthRouter({ authService }));
	app.use('/api/tasks', createTaskRouter({ taskService }));
	app.use(notFound);

	app.use(handlerError);

	app.listen(PORT, () => {
		console.log(`Server listening at: http://localhost:${PORT}`);
	});
}
 