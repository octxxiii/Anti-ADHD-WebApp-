export interface Project {
    id: string
    title: string
    description?: string
    status: ProjectStatus
    startDate: Date
    endDate?: Date
    progress: number
    priority: Priority
    createdAt: Date
    updatedAt: Date
    userId: string
    tasks: ProjectTask[]
}

export interface ProjectTask {
    id: string
    title: string
    description?: string
    status: TaskStatus
    dueDate?: Date
    priority: Priority
    createdAt: Date
    updatedAt: Date
    projectId: string
}

export enum ProjectStatus {
    PLANNING = "PLANNING",
    IN_PROGRESS = "IN_PROGRESS",
    ON_HOLD = "ON_HOLD",
    COMPLETED = "COMPLETED"
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

export interface ProjectsState {
    projects: Project[]
    currentProject: Project | null
    isLoading: boolean
    error: string | null
} 