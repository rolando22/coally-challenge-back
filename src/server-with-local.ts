import { createApp } from './index';
import { AuthService } from './services/local-file-system/auth.service';
import { TaskService } from './services/local-file-system/task.service';

const authService = new AuthService();
const taskService = new TaskService();

createApp({ authService, taskService });
