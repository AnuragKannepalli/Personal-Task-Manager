import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Plus, Calendar, CheckCircle2, Circle, Clock } from 'lucide-react';
import { format } from 'date-fns';

interface Task {
  id: string;
  title: string;
  description: string | null;
  due_date: string | null;
  priority: number;
  status: 'pending' | 'in_progress' | 'completed';
  category: string | null;
  created_at: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Write comprehensive documentation for the new feature',
    due_date: '2025-03-01T00:00:00Z',
    priority: 2,
    status: 'pending',
    category: 'Documentation',
    created_at: '2025-02-20T00:00:00Z'
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and merge pending pull requests',
    due_date: '2025-02-25T00:00:00Z',
    priority: 3,
    status: 'in_progress',
    category: 'Code Review',
    created_at: '2025-02-19T00:00:00Z'
  }
];

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 2,
    category: '',
  });
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const task: Task = {
      id: Math.random().toString(36).substr(2, 9),
      title: newTask.title,
      description: newTask.description || null,
      due_date: newTask.due_date || null,
      priority: newTask.priority,
      status: 'pending',
      category: newTask.category || null,
      created_at: new Date().toISOString()
    };

    setTasks([task, ...tasks]);
    toast.success('Task created successfully');
    setNewTask({
      title: '',
      description: '',
      due_date: '',
      priority: 2,
      category: '',
    });
    setShowNewTaskForm(false);
  };

  const handleUpdateStatus = async (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
    toast.success('Task status updated');
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1:
        return 'text-green-600';
      case 2:
        return 'text-yellow-600';
      case 3:
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">My Tasks</h1>
        <button
          onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Task
        </button>
      </div>

      {showNewTaskForm && (
        <form onSubmit={handleCreateTask} className="bg-white shadow sm:rounded-lg p-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="due_date" className="block text-sm font-medium text-gray-700">
                  Due Date
                </label>
                <input
                  type="datetime-local"
                  id="due_date"
                  value={newTask.due_date}
                  onChange={(e) => setNewTask({ ...newTask, due_date: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  Priority
                </label>
                <select
                  id="priority"
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>High</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  value={newTask.category}
                  onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowNewTaskForm(false)}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Task
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task.id}>
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <button
                      onClick={() => {
                        const newStatus =
                          task.status === 'completed'
                            ? 'pending'
                            : task.status === 'pending'
                            ? 'in_progress'
                            : 'completed';
                        handleUpdateStatus(task.id, newStatus);
                      }}
                      className="mr-3"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                    <p className="text-sm font-medium text-gray-900">{task.title}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    {task.due_date && (
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-1" />
                        {format(new Date(task.due_date), 'MMM d, yyyy')}
                      </div>
                    )}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority
                      )} bg-gray-100`}
                    >
                      {task.priority === 1
                        ? 'Low'
                        : task.priority === 2
                        ? 'Medium'
                        : 'High'}
                    </span>
                    {task.category && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {task.category}
                      </span>
                    )}
                  </div>
                </div>
                {task.description && (
                  <p className="mt-2 text-sm text-gray-500">{task.description}</p>
                )}
              </div>
            </li>
          ))}
          {tasks.length === 0 && (
            <li className="px-4 py-8">
              <div className="text-center text-gray-500">No tasks yet. Create one to get started!</div>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}