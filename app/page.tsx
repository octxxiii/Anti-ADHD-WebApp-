"use client"

import { useState, useEffect } from "react"
import AuthFlow from "./components/auth/auth-flow"
import Dashboard from "./components/dashboard"
import { ThemeProvider } from "./components/theme-provider"

interface User {
  id: string
  email: string
  name: string
  avatar?: string
}

interface Project {
  id: string
  name: string
  members: ProjectMember[]
  tasks: Task[]
  events: CalendarEvent[]
  messages: Message[]
}

interface ProjectMember {
  id: string
  email: string
  name: string
  role: "owner" | "editor" | "viewer"
  avatar?: string
}

interface Task {
  id: string
  title: string
  description?: string
  quadrant: "urgent-important" | "urgent-not-important" | "not-urgent-important" | "not-urgent-not-important"
  assignee?: string
  dueDate?: string
  createdAt: string
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  time?: string
  description?: string
  color: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
}

export default function TeamCollaborationApp() {
  const [user, setUser] = useState<User | null>(null)
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null)

  // Initialize with sample data
  useEffect(() => {
    if (user || isAnonymous) {
      const sampleProjects: Project[] = [
        {
          id: "1",
          name: "Website Redesign",
          members: [
            { id: "1", email: "john@example.com", name: "John Doe", role: "owner" },
            { id: "2", email: "jane@example.com", name: "Jane Smith", role: "editor" },
          ],
          tasks: [
            {
              id: "1",
              title: "Fix critical bug in payment system",
              quadrant: "urgent-important",
              assignee: "1",
              dueDate: "2024-12-15",
              createdAt: "2024-12-10",
            },
            {
              id: "2",
              title: "Plan Q1 marketing strategy",
              quadrant: "not-urgent-important",
              assignee: "2",
              createdAt: "2024-12-10",
            },
            {
              id: "3",
              title: "Respond to client emails",
              quadrant: "urgent-not-important",
              createdAt: "2024-12-10",
            },
            {
              id: "4",
              title: "Organize desk workspace",
              quadrant: "not-urgent-not-important",
              createdAt: "2024-12-10",
            },
          ],
          events: [
            {
              id: "1",
              title: "Team Meeting",
              date: "2024-12-15",
              time: "10:00",
              color: "bg-blue-500",
            },
            {
              id: "2",
              title: "Project Deadline",
              date: "2024-12-20",
              color: "bg-red-500",
            },
          ],
          messages: [
            {
              id: "1",
              senderId: "1",
              senderName: "John Doe",
              content: "Hey team, let's focus on the urgent tasks first!",
              timestamp: "2024-12-10T10:30:00Z",
            },
            {
              id: "2",
              senderId: "2",
              senderName: "Jane Smith",
              content: "Agreed! I'll take care of the marketing strategy planning.",
              timestamp: "2024-12-10T10:35:00Z",
            },
          ],
        },
        {
          id: "2",
          name: "Mobile App Development",
          members: [{ id: "1", email: "john@example.com", name: "John Doe", role: "owner" }],
          tasks: [],
          events: [],
          messages: [],
        },
      ]
      setProjects(sampleProjects)
      setCurrentProjectId(sampleProjects[0].id)
    }
  }, [user, isAnonymous])

  const handleLogin = (userData: User) => {
    setUser(userData)
    setIsAnonymous(false)
  }

  const handleAnonymousMode = () => {
    setIsAnonymous(true)
    setUser({
      id: "anonymous",
      email: "anonymous@example.com",
      name: "Anonymous User",
    })
  }

  const handleLogout = () => {
    setUser(null)
    setIsAnonymous(false)
    setProjects([])
    setCurrentProjectId(null)
  }

  if (!user && !isAnonymous) {
    return (
      <ThemeProvider>
        <AuthFlow onLogin={handleLogin} onAnonymousMode={handleAnonymousMode} />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider>
      <Dashboard
        user={user!}
        isAnonymous={isAnonymous}
        projects={projects}
        setProjects={setProjects}
        currentProjectId={currentProjectId}
        setCurrentProjectId={setCurrentProjectId}
        onLogout={handleLogout}
      />
    </ThemeProvider>
  )
}
