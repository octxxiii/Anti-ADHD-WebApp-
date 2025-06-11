"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Users } from "lucide-react"

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

interface SidebarProps {
  isOpen: boolean
  projects: Project[]
  setProjects: (projects: Project[]) => void
  currentProjectId: string | null
  setCurrentProjectId: (id: string) => void
  user: User
}

export default function Sidebar({
  isOpen,
  projects,
  setProjects,
  currentProjectId,
  setCurrentProjectId,
  user,
}: SidebarProps) {
  const [newProjectName, setNewProjectName] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const createProject = () => {
    if (!newProjectName.trim()) return

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      members: [
        {
          id: user.id,
          email: user.email,
          name: user.name,
          role: "owner",
          avatar: user.avatar,
        },
      ],
      tasks: [],
      events: [],
      messages: [],
    }

    setProjects([...projects, newProject])
    setCurrentProjectId(newProject.id)
    setNewProjectName("")
    setIsDialogOpen(false)
  }

  return (
    <div
      className={`bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        isOpen ? "w-80" : "w-16"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          {isOpen && <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Projects</h2>}
        </div>

        {isOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full mb-4" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="Enter project name"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && createProject()}
                  />
                </div>
                <Button onClick={createProject} className="w-full">
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                currentProjectId === project.id
                  ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
              onClick={() => setCurrentProjectId(project.id)}
            >
              {isOpen ? (
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white truncate">{project.name}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500 dark:text-gray-400">
                    <Users className="h-3 w-3 mr-1" />
                    {project.members.length} member{project.members.length !== 1 ? "s" : ""}
                  </div>
                  <div className="flex items-center mt-1 text-xs text-gray-400">
                    {project.tasks.length} task{project.tasks.length !== 1 ? "s" : ""}
                  </div>
                </div>
              ) : (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                  {project.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
