import { createApp } from './index';
import './db/mongo';
import { AuthService } from './services/mongo/auth.service';
import { TaskService } from './services/mongo/task.service';

const authService = new AuthService();
const taskService = new TaskService();

createApp({ authService, taskService });
