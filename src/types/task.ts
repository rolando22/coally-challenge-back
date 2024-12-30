export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: string
  updatedAt: string
  userId: string
}

export interface CreateTaskDTO extends Omit<'Task', 'completed' | 'userId'> {}
export interface UpdateTaskDTO extends Omit<'Task', 'userId'> { }

export interface FiltersTask {
  completed?: 'completed' | 'pending'
}
