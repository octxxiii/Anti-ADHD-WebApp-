export interface Task {
    id: string
    title: string
    description?: string
    quadrant: Quadrant
    status: TaskStatus
    dueDate?: Date
    priority: Priority
    createdAt: Date
    updatedAt: Date
    userId: string
}

export enum Quadrant {
    IMPORTANT_URGENT = "IMPORTANT_URGENT",
    IMPORTANT_NOT_URGENT = "IMPORTANT_NOT_URGENT",
    NOT_IMPORTANT_URGENT = "NOT_IMPORTANT_URGENT",
    NOT_IMPORTANT_NOT_URGENT = "NOT_IMPORTANT_NOT_URGENT"
}

export enum TaskStatus {
    TODO = "TODO",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE"
}

export enum Priority {
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW"
}

export interface MatrixState {
    tasks: Task[]
    isLoading: boolean
    error: string | null
} 