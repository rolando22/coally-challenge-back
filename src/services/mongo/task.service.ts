import { TaskModel } from '../../db/mongo/models/Task';

import { ICRUDTaskService } from '../../interfaces';
import { CreateTaskDTO, FiltersTask, Task, UpdateTaskDTO, User } from '../../types';

interface Query {
	userId: string
	completed?: boolean
}

export class TaskService implements ICRUDTaskService {

	getAll = async ({ userId, filters = {} }: { userId: User['id'], filters: FiltersTask }) => {
		let query: Query = {
			userId,
		};

		if (filters?.completed) {
			query.completed = filters.completed === 'completed' ? true : false;
		}

		const tasks = await TaskModel.find(query);
		return tasks;
	}

	getById = async ({ id }: { id: Task['id'] }) => {
		const task = await TaskModel.findById(id);
		if (!task) return null;
		return task;
	}

	create = async({ data, userId }: { data: CreateTaskDTO, userId: User['id'] }) => {
		const newTask = new TaskModel({ 
			completed: false, 
			...data, 
			userId, 
		});
		const savedTask = await newTask.save();
		return savedTask;
	}

	update = async({ id, data, userId }: { id: Task['id'], data: UpdateTaskDTO, userId: User['id'] }) => {
		const updatedTask = await TaskModel.findOneAndUpdate({ _id: id, userId }, { ...data }, { new: true });
		if (!updatedTask) return null;
		return updatedTask;
	}

	delete = async({ id, userId }: { id: Task['id'], userId: User['id'] }) => {
		const deletedTask = await TaskModel.findOneAndDelete({ _id: id, userId });
		if (!deletedTask) return null;
		return deletedTask;
	}
}
