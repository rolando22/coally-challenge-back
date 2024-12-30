import type { NextFunction, Request, Response } from 'express';
import { DocumentType } from '@typegoose/typegoose';

import { UserSchema } from '../db/mongo/models/User';
import { TaskSchema } from '../db/mongo/models/Task';
import { CreateTaskDTO, FiltersTask, Login, Task, UpdateTaskDTO, User } from '../types';

export interface ICRUDTaskService {
	getAll: ({ userId, filters }: { userId: User['id'], filters: FiltersTask }) => Promise<Task[] | DocumentType<TaskSchema>[]>;
	getById: ({ id, userId }: { id: Task['id'], userId: User['id'] }) => Promise<Task | DocumentType<TaskSchema> | null>;
	create: ({ data, userId }: { data: CreateTaskDTO, userId: User['id'] }) => Promise<Task | DocumentType<TaskSchema>>;
	update: ({ id, data, userId }: { id: Task['id'], data: UpdateTaskDTO, userId: User['id'] }) => Promise<Task | DocumentType<TaskSchema> | null>;
	delete: ({ id, userId }: { id: Task['id'], userId: User['id'] }) => Promise<Task | DocumentType<TaskSchema> | null>;
}

export interface IAuthService {
	login: ({ email, password }: Login) => Promise<{ user: User | DocumentType<UserSchema>, token: string } | null>;
}

export interface ICRUDController {
	getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	getById: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	update: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

export interface IAuthController {
	login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
