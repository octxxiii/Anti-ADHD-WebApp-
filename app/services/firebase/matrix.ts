import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc, Timestamp } from 'firebase/firestore'
import { db } from './config'
import { Task } from '@/app/models/matrix/types'

const TASKS_COLLECTION = 'tasks'

export const getTasks = async (userId: string): Promise<Task[]> => {
    const tasksQuery = query(collection(db, TASKS_COLLECTION), where('userId', '==', userId))
    const snapshot = await getDocs(tasksQuery)
    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
        dueDate: doc.data().dueDate?.toDate(),
    })) as Task[]
}

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
    const now = Timestamp.now()
    const taskData = {
        ...task,
        createdAt: now,
        updatedAt: now,
    }
    const docRef = await addDoc(collection(db, TASKS_COLLECTION), taskData)
    return {
        id: docRef.id,
        ...taskData,
        createdAt: now.toDate(),
        updatedAt: now.toDate(),
    } as Task
}

export const updateTask = async (taskId: string, updates: Partial<Task>): Promise<void> => {
    const taskRef = doc(db, TASKS_COLLECTION, taskId)
    await updateDoc(taskRef, {
        ...updates,
        updatedAt: Timestamp.now(),
    })
}

export const deleteTask = async (taskId: string): Promise<void> => {
    const taskRef = doc(db, TASKS_COLLECTION, taskId)
    await deleteDoc(taskRef)
} 