export interface PomodoroSession {
    id: string
    startTime: Date
    endTime?: Date
    duration: number
    status: PomodoroStatus
    type: PomodoroType
    taskId?: string
    userId: string
}

export enum PomodoroStatus {
    RUNNING = "RUNNING",
    PAUSED = "PAUSED",
    COMPLETED = "COMPLETED",
    CANCELLED = "CANCELLED"
}

export enum PomodoroType {
    FOCUS = "FOCUS",
    SHORT_BREAK = "SHORT_BREAK",
    LONG_BREAK = "LONG_BREAK"
}

export interface PomodoroSettings {
    focusDuration: number
    shortBreakDuration: number
    longBreakDuration: number
    longBreakInterval: number
    autoStartBreaks: boolean
    autoStartPomodoros: boolean
    notifications: boolean
    userId: string
}

export interface PomodoroState {
    currentSession: PomodoroSession | null
    settings: PomodoroSettings
    isLoading: boolean
    error: string | null
} 