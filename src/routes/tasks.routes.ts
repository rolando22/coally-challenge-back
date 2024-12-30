import { Router } from 'express';
import { checkSchema } from 'express-validator';

import { TaskController } from '../controllers/task.controller';
import { authentication } from '../middlewares/userExtractor';
import { CreateTaskSchema, FiltersTaskSchema, UpdateTaskSchema } from '../schemas/task';
import { ICRUDTaskService } from '../interfaces';

export const createTaskRouter = ({ taskService }: { taskService: ICRUDTaskService }) => {
	const router = Router();

	const taskController = new TaskController({ taskService });
    
	router.get('/', authentication, checkSchema(FiltersTaskSchema, ['query']), taskController.getAll);
	router.get('/:id', authentication, taskController.getById);
	router.post('/', authentication, checkSchema(CreateTaskSchema, ['body']), taskController.create);
	router.put('/:id', authentication, checkSchema(UpdateTaskSchema, ['body']), taskController.update);
	router.delete('/:id', authentication, taskController.delete);
    
	return router;
};
