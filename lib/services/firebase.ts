import {
    collection,
    doc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import type { User, Project, Task, CalendarEvent, Message } from '../types/firebase';

// Projects
export const getProjects = async (userId: string) => {
    const projectsRef = collection(db, 'projects');
    const q = query(
        projectsRef,
        where('members', 'array-contains', userId),
        orderBy('updatedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
};

export const getProject = async (projectId: string) => {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error('Project not found');
    return { id: docSnap.id, ...docSnap.data() } as Project;
};

export const createProject = async (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
    const projectsRef = collection(db, 'projects');
    const newProject = {
        ...project,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(projectsRef, newProject);
    return { id: docRef.id, ...newProject } as Project;
};

export const updateProject = async (projectId: string, updates: Partial<Project>) => {
    const docRef = doc(db, 'projects', projectId);
    await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
    });
};

export const deleteProject = async (projectId: string) => {
    const docRef = doc(db, 'projects', projectId);
    await deleteDoc(docRef);
};

// Tasks
export const getTasks = async (projectId: string) => {
    const tasksRef = collection(db, 'tasks');
    const q = query(
        tasksRef,
        where('projectId', '==', projectId),
        orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};

export const createTask = async (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const tasksRef = collection(db, 'tasks');
    const newTask = {
        ...task,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(tasksRef, newTask);
    return { id: docRef.id, ...newTask } as Task;
};

export const updateTask = async (taskId: string, updates: Partial<Task>) => {
    const docRef = doc(db, 'tasks', taskId);
    await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
    });
};

export const deleteTask = async (taskId: string) => {
    const docRef = doc(db, 'tasks', taskId);
    await deleteDoc(docRef);
};

// Calendar Events
export const getEvents = async (projectId: string) => {
    const eventsRef = collection(db, 'events');
    const q = query(
        eventsRef,
        where('projectId', '==', projectId),
        orderBy('startDate', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CalendarEvent));
};

export const createEvent = async (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const eventsRef = collection(db, 'events');
    const newEvent = {
        ...event,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(eventsRef, newEvent);
    return { id: docRef.id, ...newEvent } as CalendarEvent;
};

export const updateEvent = async (eventId: string, updates: Partial<CalendarEvent>) => {
    const docRef = doc(db, 'events', eventId);
    await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
    });
};

export const deleteEvent = async (eventId: string) => {
    const docRef = doc(db, 'events', eventId);
    await deleteDoc(docRef);
};

// Messages
export const getMessages = async (projectId: string) => {
    const messagesRef = collection(db, 'messages');
    const q = query(
        messagesRef,
        where('projectId', '==', projectId),
        orderBy('createdAt', 'asc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
};

export const createMessage = async (message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) => {
    const messagesRef = collection(db, 'messages');
    const newMessage = {
        ...message,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
    };
    const docRef = await addDoc(messagesRef, newMessage);
    return { id: docRef.id, ...newMessage } as Message;
}; 