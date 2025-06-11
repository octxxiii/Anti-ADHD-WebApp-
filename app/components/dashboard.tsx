"use client"

import { useState } from "react"
import Sidebar from "./layout/sidebar"
import EisenhowerMatrix from "./matrix/eisenhower-matrix"
import CalendarView from "./calendar/calendar-view"
import ChatPanel from "./chat/chat-panel"
import PomodoroTimer from "./pomodoro-timer"
import ProjectSettings from "./projects/project-settings"
import { Button } from "./ui/button"
import { useTheme } from "./theme-provider"
import { Menu, Sun, Moon, MessageSquare, Calendar, Grid3X3, Settings, LogOut } from "lucide-react"

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
  quadrant: string
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

interface DashboardProps {
  user: User
  isAnonymous: boolean
  projects: Project[]
  setProjects: (projects: Project[]) => void
  currentProjectId: string | null
  setCurrentProjectId: (id: string) => void
  onLogout: () => void
}

export default function Dashboard({
  user,
  isAnonymous,
  projects,
  setProjects,
  currentProjectId,
  setCurrentProjectId,
  onLogout,
}: DashboardProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [chatOpen, setChatOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"matrix" | "calendar" | "settings">("matrix")
  const { theme, toggleTheme } = useTheme()

  const currentProject = projects.find((p) => p.id === currentProjectId)

  const updateProject = (updatedProject: Project) => {
    setProjects(projects.map((p) => (p.id === updatedProject.id ? updatedProject : p)))
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        projects={projects}
        setProjects={setProjects}
        currentProjectId={currentProjectId}
        setCurrentProjectId={setCurrentProjectId}
        user={user}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {currentProject?.name || "Select a Project"}
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              {/* View Toggle */}
              <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <Button
                  variant={currentView === "matrix" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("matrix")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentView === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("calendar")}
                >
                  <Calendar className="h-4 w-4" />
                </Button>
                <Button
                  variant={currentView === "settings" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentView("settings")}
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="ghost" size="sm" onClick={() => setChatOpen(!chatOpen)}>
                <MessageSquare className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </Button>

              <div className="flex items-center space-x-2">
                <img
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user.name}</span>
                {isAnonymous && (
                  <span className="text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded">
                    Anonymous
                  </span>
                )}
              </div>

              <Button variant="ghost" size="sm" onClick={onLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex overflow-hidden">
          <main className="flex-1 overflow-auto">
            {currentProject && (
              <>
                {currentView === "matrix" && (
                  <EisenhowerMatrix project={currentProject} updateProject={updateProject} user={user} />
                )}
                {currentView === "calendar" && <CalendarView project={currentProject} updateProject={updateProject} />}
                {currentView === "settings" && (
                  <ProjectSettings project={currentProject} updateProject={updateProject} user={user} />
                )}
              </>
            )}
            {!currentProject && (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">Welcome to Team Matrix</h2>
                  <p className="text-gray-600 dark:text-gray-400">Select a project from the sidebar to get started</p>
                </div>
              </div>
            )}
          </main>

          {/* Chat Panel */}
          {chatOpen && currentProject && (
            <ChatPanel
              project={currentProject}
              updateProject={updateProject}
              user={user}
              onClose={() => setChatOpen(false)}
            />
          )}
        </div>
      </div>

      {/* Pomodoro Timer */}
      <PomodoroTimer />
    </div>
  )
}
