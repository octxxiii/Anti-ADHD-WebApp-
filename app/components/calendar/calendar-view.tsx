"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"

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

interface CalendarViewProps {
  project: Project
  updateProject: (project: Project) => void
}

export default function CalendarView({ project, updateProject }: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [newEvent, setNewEvent] = useState({
    title: "",
    time: "",
    description: "",
    color: "bg-blue-500",
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const colorOptions = [
    { value: "bg-blue-500", label: "Blue" },
    { value: "bg-red-500", label: "Red" },
    { value: "bg-green-500", label: "Green" },
    { value: "bg-yellow-500", label: "Yellow" },
    { value: "bg-purple-500", label: "Purple" },
    { value: "bg-pink-500", label: "Pink" },
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0]
  }

  const getEventsForDate = (date: string) => {
    return project.events.filter((event) => event.date === date)
  }

  const getTasksForDate = (date: string) => {
    return project.tasks.filter((task) => task.dueDate === date)
  }

  const addEvent = () => {
    if (!newEvent.title.trim() || !selectedDate) return

    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: selectedDate,
      time: newEvent.time,
      description: newEvent.description,
      color: newEvent.color,
    }

    updateProject({
      ...project,
      events: [...project.events, event],
    })

    setNewEvent({
      title: "",
      time: "",
      description: "",
      color: "bg-blue-500",
    })
    setIsDialogOpen(false)
    setSelectedDate(null)
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    if (direction === "prev") {
      newDate.setMonth(currentDate.getMonth() - 1)
    } else {
      newDate.setMonth(currentDate.getMonth() + 1)
    }
    setCurrentDate(newDate)
  }

  const days = getDaysInMonth(currentDate)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Calendar</h2>
            <p className="text-gray-600 dark:text-gray-400">Manage project events and track task deadlines</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="event-title">Event Title</Label>
                  <Input
                    id="event-title"
                    placeholder="Enter event title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <Input
                    id="event-date"
                    type="date"
                    value={selectedDate || ""}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-time">Time (Optional)</Label>
                  <Input
                    id="event-time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-description">Description (Optional)</Label>
                  <Textarea
                    id="event-description"
                    placeholder="Enter event description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="event-color">Color</Label>
                  <Select value={newEvent.color} onValueChange={(value) => setNewEvent({ ...newEvent, color: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <div className={`w-4 h-4 rounded ${option.value}`} />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addEvent} className="w-full">
                  Add Event
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
                Today
              </Button>
              <Button variant="outline" size="sm" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="p-2 h-24" />
              }

              const dateStr = formatDate(day)
              const events = getEventsForDate(dateStr)
              const tasks = getTasksForDate(dateStr)
              const isToday = formatDate(new Date()) === dateStr

              return (
                <div
                  key={index}
                  className={`p-2 h-24 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer ${isToday ? "bg-blue-50 dark:bg-blue-900/20" : ""
                    }`}
                  onClick={() => {
                    setSelectedDate(dateStr)
                    setIsDialogOpen(true)
                  }}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${isToday ? "text-blue-600 dark:text-blue-400" : "text-gray-900 dark:text-white"
                      }`}
                  >
                    {day.getDate()}
                  </div>
                  <div className="space-y-1">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-xs p-1 rounded text-white truncate ${event.color}`}
                        title={event.title}
                      >
                        {event.time && `${event.time} `}
                        {event.title}
                      </div>
                    ))}
                    {tasks.slice(0, 1).map((task) => (
                      <div
                        key={task.id}
                        className="text-xs p-1 rounded bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-200 truncate"
                        title={`Due: ${task.title}`}
                      >
                        📋 {task.title}
                      </div>
                    ))}
                    {events.length + tasks.length > 3 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        +{events.length + tasks.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
