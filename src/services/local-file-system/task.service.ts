import crypto from 'crypto';

import { ICRUDTaskService } from '../../interfaces';
import { CreateTaskDTO, FiltersTask, Task, UpdateTaskDTO, User } from '../../types';
import { tasks } from '../../mocks/tasks';

export class TaskService implements ICRUDTaskService {

	getAll = async ({ userId, filters = {} }: { userId: User['id'], filters: FiltersTask }) => {		
		let myTasks = [];

		if (filters?.completed) {
			myTasks = tasks.filter(
				task => task.userId === userId && task.completed === (filters.completed === 'completed' ? true : false)
			);
		} else {
			myTasks = tasks.filter(task => task.userId === userId);
		}

		return myTasks;
	}

	getById = async ({ id }: { id: Task['id'] }) => {
		const task = tasks.find(task => task.id === id);
		if (!task) return null;
		return task;
	}

	create = async ({ data, userId }: { data: CreateTaskDTO, userId: User['id'] }) => {
		const newTask: Task = {
			id: crypto.randomUUID(),
			title: '',
			completed: false,
			createdAt: new Date().toISOString().split('T')[0],
			updatedAt: new Date().toISOString().split('T')[0],
			...data,
			userId,
		};
		tasks.push(newTask);
		return newTask;
	}

	update = async ({ id, data, userId }: { id: Task['id'], data: UpdateTaskDTO, userId: User['id'] }) => {
		const taskIndex = tasks.findIndex(taks => taks.id === id && taks.userId === userId);
		if (taskIndex === -1) return null;
		const updatedTask = {
			...tasks[taskIndex],
			...data,
			updatedAt: new Date().toISOString().split('T')[0],
		};
		tasks[taskIndex] = updatedTask;
		return updatedTask;
	}

	delete = async ({ id, userId }: { id: Task['id'], userId: User['id'] }) => {
		const taskIndex = tasks.findIndex(task => task.id === id && task.userId === userId);
		if (taskIndex === -1) return null;
		const [deletedTask] = tasks.splice(taskIndex, 1);
		return deletedTask;
	}
}
