"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus, Calendar, User, AlertTriangle, Target, Clock, Trash2 } from "lucide-react"

interface UserType {
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

interface EisenhowerMatrixProps {
  project: Project
  updateProject: (project: Project) => void
  user: UserType
}

export default function EisenhowerMatrix({ project, updateProject, user }: EisenhowerMatrixProps) {
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    quadrant: "urgent-important",
    assignee: "",
    dueDate: "",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedQuadrant, setSelectedQuadrant] = useState("")

  const quadrants = [
    {
      id: "urgent-important",
      title: "Urgent & Important",
      subtitle: "Do First",
      icon: AlertTriangle,
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      headerColor: "bg-red-500",
    },
    {
      id: "not-urgent-important",
      title: "Not Urgent & Important",
      subtitle: "Schedule",
      icon: Target,
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      headerColor: "bg-blue-500",
    },
    {
      id: "urgent-not-important",
      title: "Urgent & Not Important",
      subtitle: "Delegate",
      icon: Clock,
      color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      headerColor: "bg-yellow-500",
    },
    {
      id: "not-urgent-not-important",
      title: "Not Urgent & Not Important",
      subtitle: "Eliminate",
      icon: Trash2,
      color: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
      headerColor: "bg-gray-500",
    },
  ]

  const addTask = () => {
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      quadrant: selectedQuadrant || newTask.quadrant,
      assignee: newTask.assignee,
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString(),
    }

    updateProject({
      ...project,
      tasks: [...project.tasks, task],
    })

    setNewTask({
      title: "",
      description: "",
      quadrant: "urgent-important",
      assignee: "",
      dueDate: "",
    })
    setIsDialogOpen(false)
    setSelectedQuadrant("")
  }

  const deleteTask = (taskId: string) => {
    updateProject({
      ...project,
      tasks: project.tasks.filter((task) => task.id !== taskId),
    })
  }

  const moveTask = (taskId: string, newQuadrant: string) => {
    updateProject({
      ...project,
      tasks: project.tasks.map((task) => (task.id === taskId ? { ...task, quadrant: newQuadrant } : task)),
    })
  }

  const getTasksForQuadrant = (quadrantId: string) => {
    return project.tasks.filter((task) => task.quadrant === quadrantId)
  }

  const getAssigneeName = (assigneeId: string) => {
    const member = project.members.find((m) => m.id === assigneeId)
    return member ? member.name : "Unassigned"
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Eisenhower Matrix</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Organize tasks by urgency and importance to prioritize effectively
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quadrants.map((quadrant) => {
          const Icon = quadrant.icon
          const tasks = getTasksForQuadrant(quadrant.id)

          return (
            <Card key={quadrant.id} className={`${quadrant.color} border-2`}>
              <CardHeader className={`${quadrant.headerColor} text-white rounded-t-lg`}>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5" />
                    <div>
                      <div className="font-semibold">{quadrant.title}</div>
                      <div className="text-sm opacity-90">{quadrant.subtitle}</div>
                    </div>
                  </div>
                  <Dialog
                    open={isDialogOpen && selectedQuadrant === quadrant.id}
                    onOpenChange={(open) => {
                      setIsDialogOpen(open)
                      if (!open) setSelectedQuadrant("")
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                        onClick={() => setSelectedQuadrant(quadrant.id)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Task to {quadrant.title}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">Task Title</Label>
                          <Input
                            id="title"
                            placeholder="Enter task title"
                            value={newTask.title}
                            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description (Optional)</Label>
                          <Textarea
                            id="description"
                            placeholder="Enter task description"
                            value={newTask.description}
                            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assignee">Assign To</Label>
                          <Select
                            value={newTask.assignee}
                            onValueChange={(value) => setNewTask({ ...newTask, assignee: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select team member" />
                            </SelectTrigger>
                            <SelectContent>
                              {project.members.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dueDate">Due Date (Optional)</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={newTask.dueDate}
                            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                          />
                        </div>
                        <Button onClick={addTask} className="w-full">
                          Add Task
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 min-h-[300px]">
                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-move"
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("taskId", task.id)
                        e.dataTransfer.setData("sourceQuadrant", task.quadrant)
                      }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{task.title}</h4>
                          {task.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{task.description}</p>
                          )}
                          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {task.assignee && (
                              <div className="flex items-center space-x-1">
                                <User className="h-3 w-3" />
                                <span>{getAssigneeName(task.assignee)}</span>
                              </div>
                            )}
                            {task.dueDate && (
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteTask(task.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {tasks.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <Icon className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No tasks in this quadrant</p>
                      <p className="text-xs mt-1">Drag tasks here or click + to add</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
