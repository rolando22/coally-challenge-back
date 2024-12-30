import type { NextFunction, Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

import { ICRUDController, ICRUDTaskService } from '../interfaces';

export class TaskController implements ICRUDController {
	readonly #taskService;

	constructor({ taskService }: { taskService: ICRUDTaskService }) {
		this.#taskService = taskService;
	}

	getAll = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = validationResult(req);
			
			if (!result.isEmpty()) {
				res.status(400).json({ errors: result.array() })
				return;
			}

			const filters = matchedData(req);
			
			const { userId } = req;
			const tasks = await this.#taskService.getAll({ userId, filters });

			res.status(200).json({
				data: tasks,
			});
		} catch (error) {
			next(error);
		}
	};

	getById = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { userId } = req;
			const { id } = req.params;
			const task = await this.#taskService.getById({ id, userId });

			if (!task) {
				res.status(404).json({ message: 'Task not found' })
				return;
			}

			res.status(200).json({
				data: task,
			});
		} catch (error) {
			next(error);
		}
	};

	create = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = validationResult(req);
			
			if (!result.isEmpty()) {
				res.status(400).json({ errors: result.array() })
				return;
			}
			
			const { userId } = req;
			const newTask = await this.#taskService.create({ data: req.body, userId });

			res.status(201).json({
				message: 'Task created',
				data: newTask,
			});
		} catch (error) {
			next(error);
		}
	};

	update = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const result = validationResult(req);

			if (!result.isEmpty()) {
				res.status(400).json({ errors: result.array() });
				return;
			}

			const { id } = req.params;
			const { userId } = req;
			const updateTask = await this.#taskService.update({ id, data: req.body, userId });
			
			if (!updateTask) {
				res.status(404).json({ message: 'Task not found' });
				return;
			}

			res.status(200).json({
				message: 'Task updated',
				data: updateTask,
			});
		} catch (error) {
			next(error);
		}
	};

	delete = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const { userId } = req;

			const deleteTask = await this.#taskService.delete({ id, userId });
			if (!deleteTask) {
				res.status(404).json({ message: 'Task not found' });
				return;
			}

			res.status(200).json({
				message: 'Task deleted',
				data: deleteTask,
			});
		} catch (error) {
			next(error);
		}
	};
}
