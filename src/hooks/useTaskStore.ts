import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Task {
  id: string;
  name: string;
  description: string;
  platform: string;
  status: 'running' | 'scheduled' | 'paused' | 'completed' | 'failed';
  progress: number;
  priority: 'low' | 'medium' | 'high';
  eta: string;
  lastRun: string;
  createdAt: string;
  apiCalls: number;
}

export interface Integration {
  name: string;
  description: string;
  status: 'connected' | 'disconnected';
  apiCallsToday: number;
  lastSync: string;
  enabled: boolean;
}

interface TaskStore {
  tasks: Task[];
  integrations: Integration[];
  stats: {
    activeTasks: number;
    completedToday: number;
    timeSavedHours: number;
    apiCallsMonth: number;
  };
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  updateTaskProgress: (id: string, progress: number) => void;
  deleteTask: (id: string) => void;
  toggleIntegration: (name: string) => void;
  updateStats: () => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [
        {
          id: '1',
          name: 'Weekly Analytics Report',
          description: 'Generate and send weekly performance summary',
          platform: 'Email',
          status: 'running',
          progress: 75,
          priority: 'high',
          eta: '2 min',
          lastRun: 'Running now',
          createdAt: new Date().toISOString(),
          apiCalls: 142
        },
        {
          id: '2',
          name: 'Social Media Scheduler',
          description: 'Post daily content across platforms',
          platform: 'Social Media',
          status: 'scheduled',
          progress: 0,
          priority: 'medium',
          eta: '1 hour',
          lastRun: '2 hours ago',
          createdAt: new Date().toISOString(),
          apiCalls: 67
        }
      ],
      
      integrations: [
        {
          name: 'Email Automation',
          description: 'Connect with Gmail, Outlook, and other email providers',
          status: 'connected',
          apiCallsToday: 142,
          lastSync: '5 min ago',
          enabled: true
        },
        {
          name: 'Social Media',
          description: 'Automate posts on Twitter, LinkedIn, Facebook',
          status: 'connected',
          apiCallsToday: 67,
          lastSync: '1 hour ago',
          enabled: true
        },
        {
          name: 'CRM Systems',
          description: 'Integrate with Salesforce, HubSpot, Pipedrive',
          status: 'disconnected',
          apiCallsToday: 0,
          lastSync: 'Never',
          enabled: false
        }
      ],
      
      stats: {
        activeTasks: 2,
        completedToday: 47,
        timeSavedHours: 5.2,
        apiCallsMonth: 1432
      },
      
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          apiCalls: 0
        };
        
        set((state) => ({
          tasks: [...state.tasks, newTask],
          stats: {
            ...state.stats,
            activeTasks: state.stats.activeTasks + 1
          }
        }));
      },
      
      updateTaskStatus: (id, status) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status,
                  lastRun: status === 'running' ? 'Running now' : new Date().toLocaleString(),
                  progress: status === 'completed' ? 100 : task.progress
                }
              : task
          )
        }));
      },
      
      updateTaskProgress: (id, progress) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, progress } : task
          )
        }));
      },
      
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
          stats: {
            ...state.stats,
            activeTasks: Math.max(0, state.stats.activeTasks - 1)
          }
        }));
      },
      
      toggleIntegration: (name) => {
        set((state) => ({
          integrations: state.integrations.map((integration) =>
            integration.name === name
              ? {
                  ...integration,
                  enabled: !integration.enabled,
                  status: integration.enabled ? 'disconnected' : 'connected',
                  lastSync: integration.enabled ? 'Never' : 'Just now'
                }
              : integration
          )
        }));
      },
      
      updateStats: () => {
        const { tasks } = get();
        const activeTasks = tasks.filter(t => t.status === 'running' || t.status === 'scheduled').length;
        const completedToday = tasks.filter(t => t.status === 'completed').length;
        
        set((state) => ({
          stats: {
            ...state.stats,
            activeTasks,
            completedToday: completedToday + Math.floor(Math.random() * 5)
          }
        }));
      }
    }),
    {
      name: 'task-store'
    }
  )
);