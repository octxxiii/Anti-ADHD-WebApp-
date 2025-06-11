import { create } from 'zustand'
import { MatrixState, Task, Quadrant, TaskStatus, Priority } from '@/app/models/matrix/types'
import { getTasks, createTask, updateTask, deleteTask } from '@/app/services/firebase/matrix'

interface MatrixViewModel extends MatrixState {
    setTasks: (tasks: Task[]) => void
    setLoading: (isLoading: boolean) => void
    setError: (error: string | null) => void
    fetchTasks: (userId: string) => Promise<void>
    addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
    updateTaskStatus: (taskId: string, status: TaskStatus) => Promise<void>
    updateTaskQuadrant: (taskId: string, quadrant: Quadrant) => Promise<void>
    updateTaskPriority: (taskId: string, priority: Priority) => Promise<void>
    removeTask: (taskId: string) => Promise<void>
}

export const useMatrixViewModel = create<MatrixViewModel>((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    setTasks: (tasks) => set({ tasks }),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),

    fetchTasks: async (userId) => {
        try {
            set({ isLoading: true, error: null })
            const tasks = await getTasks(userId)
            set({ tasks, isLoading: false })
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    addTask: async (task) => {
        try {
            set({ isLoading: true, error: null })
            const newTask = await createTask(task)
            set((state) => ({ tasks: [...state.tasks, newTask], isLoading: false }))
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    updateTaskStatus: async (taskId, status) => {
        try {
            set({ isLoading: true, error: null })
            await updateTask(taskId, { status })
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? { ...task, status } : task
                ),
                isLoading: false,
            }))
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    updateTaskQuadrant: async (taskId, quadrant) => {
        try {
            set({ isLoading: true, error: null })
            await updateTask(taskId, { quadrant })
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? { ...task, quadrant } : task
                ),
                isLoading: false,
            }))
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    updateTaskPriority: async (taskId, priority) => {
        try {
            set({ isLoading: true, error: null })
            await updateTask(taskId, { priority })
            set((state) => ({
                tasks: state.tasks.map((task) =>
                    task.id === taskId ? { ...task, priority } : task
                ),
                isLoading: false,
            }))
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },

    removeTask: async (taskId) => {
        try {
            set({ isLoading: true, error: null })
            await deleteTask(taskId)
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== taskId),
                isLoading: false,
            }))
        } catch (error: any) {
            set({ error: error.message, isLoading: false })
        }
    },
})) 