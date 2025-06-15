export interface Task {
    id: string
    title: string
    description?: string
    quadrant: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important'
    assignee?: string
    dueDate?: string
    createdAt: string
    updatedAt?: string
    order: number
}

export interface User {
    id: string
    name: string
    email: string
    avatar?: string
}

export interface Project {
    id: string
    name: string
    description?: string
    tasks: Task[]
    members: ProjectMember[]
    events: CalendarEvent[]
    createdAt: string
    updatedAt?: string
}

export interface ProjectMember {
    id: string
    projectId: string
    userId: string
    role: 'owner' | 'admin' | 'member' | 'guest'
    joinedAt: string
}

export interface CalendarEvent {
    id: string
    title: string
    description?: string
    start: string
    end: string
    color: string
    type: 'task' | 'meeting' | 'reminder'
    recurring?: {
        frequency: 'daily' | 'weekly' | 'monthly' | 'yearly'
        interval: number
        endDate?: string
    }
}

export interface Message {
    id: string
    content: string
    senderId: string
    projectId: string
    timestamp: string
    type: 'text' | 'file' | 'system'
    metadata?: {
        fileName?: string
        fileSize?: number
        fileType?: string
        fileUrl?: string
    }
} 