"use client"

import { useState } from "react"
import { Calendar as CalendarIcon, Plus } from "lucide-react"
import { CalendarEvent, Task } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"

interface CalendarProps {
    project: {
        events: CalendarEvent[]
        tasks: Task[]
        members: { id: string; name: string }[]
    }
    updateProject: (project: any) => void
}

export default function Calendar({ project, updateProject }: CalendarProps) {
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isNewTask, setIsNewTask] = useState(false)
    const [selectedDate, setSelectedDate] = useState<string>('')
    const [formData, setFormData] = useState<Partial<Task>>({
        title: '',
        description: '',
        quadrant: 'urgent-important',
        assignee: '',
        dueDate: '',
    })

    const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation() // Prevent date cell click
        if (event.type === 'task') {
            const taskId = event.id.replace('task-', '')
            const task = project.tasks.find(t => t.id === taskId)
            if (task) {
                setSelectedEvent(event)
                setIsNewTask(false)
                setFormData({
                    title: task.title,
                    description: task.description,
                    quadrant: task.quadrant,
                    assignee: task.assignee,
                    dueDate: task.dueDate,
                })
                setIsDialogOpen(true)
            }
        }
    }

    const handleDateClick = (dateString: string) => {
        setSelectedDate(dateString)
        setFormData({
            title: '',
            description: '',
            quadrant: 'urgent-important',
            assignee: '',
            dueDate: dateString,
        })
        setIsNewTask(true)
        setIsDialogOpen(true)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (isNewTask) {
            // Create new task
            const newTask: Task = {
                id: Date.now().toString(),
                ...formData as Task,
                createdAt: new Date().toISOString(),
            }
            updateProject({ ...project, tasks: [...project.tasks, newTask] })
        } else if (selectedEvent) {
            // Update existing task
            const taskId = selectedEvent.id.replace('task-', '')
            const task = project.tasks.find(t => t.id === taskId)
            if (task) {
                const updatedTask = {
                    ...task,
                    ...formData,
                    updatedAt: new Date().toISOString()
                }
                const updatedTasks = project.tasks.map(t =>
                    t.id === taskId ? updatedTask : t
                )
                updateProject({ ...project, tasks: updatedTasks })
            }
        }
        setIsDialogOpen(false)
        setSelectedEvent(null)
        setIsNewTask(false)
    }

    const getQuadrantColor = (quadrant: string): string => {
        switch (quadrant) {
            case 'urgent-important':
                return '#ef4444' // red-500
            case 'not-urgent-important':
                return '#3b82f6' // blue-500
            case 'urgent-not-important':
                return '#eab308' // yellow-500
            case 'not-urgent-not-important':
                return '#6b7280' // gray-500
            default:
                return '#6b7280'
        }
    }

    return (
        <div className="space-y-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                        <CalendarIcon className="h-5 w-5" />
                        Calendar
                    </CardTitle>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                        onClick={() => {
                            setSelectedDate(new Date().toISOString().split('T')[0])
                            setFormData({
                                title: '',
                                description: '',
                                quadrant: 'urgent-important',
                                assignee: '',
                                dueDate: new Date().toISOString().split('T')[0],
                            })
                            setIsNewTask(true)
                            setIsDialogOpen(true)
                        }}
                    >
                        <Plus className="h-4 w-4" />
                        Add Task
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-7 gap-2">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-center font-semibold">
                                {day}
                            </div>
                        ))}
                        {/* Calendar grid implementation */}
                        {Array.from({ length: 35 }).map((_, index) => {
                            const date = new Date()
                            date.setDate(date.getDate() - date.getDay() + index)
                            const dateString = date.toISOString().split('T')[0]
                            const dayEvents = project.events.filter(event => {
                                const eventDate = new Date(event.start).toISOString().split('T')[0]
                                return eventDate === dateString
                            })

                            return (
                                <div
                                    key={index}
                                    className="min-h-[100px] border p-2 hover:bg-accent/50 cursor-pointer relative group"
                                    onClick={() => handleDateClick(dateString)}
                                >
                                    <div className="text-sm text-muted-foreground">
                                        {date.getDate()}
                                    </div>
                                    <div className="space-y-1">
                                        {dayEvents.map((event) => (
                                            <div
                                                key={event.id}
                                                className="text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity"
                                                style={{
                                                    backgroundColor: event.color,
                                                    color: '#fff',
                                                }}
                                                onClick={(e) => handleEventClick(event, e)}
                                            >
                                                {event.title}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDateClick(dateString)
                                            }}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isNewTask ? 'New Task' : 'Edit Task'}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label htmlFor="quadrant">Quadrant</Label>
                            <Select
                                value={formData.quadrant}
                                onValueChange={(value) => setFormData({ ...formData, quadrant: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="urgent-important">Urgent & Important</SelectItem>
                                    <SelectItem value="not-urgent-important">Not Urgent & Important</SelectItem>
                                    <SelectItem value="urgent-not-important">Urgent & Not Important</SelectItem>
                                    <SelectItem value="not-urgent-not-important">Not Urgent & Not Important</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="assignee">Assignee</Label>
                            <Select
                                value={formData.assignee}
                                onValueChange={(value) => setFormData({ ...formData, assignee: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue />
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
                        <div>
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input
                                id="dueDate"
                                type="date"
                                value={formData.dueDate}
                                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                {isNewTask ? 'Create' : 'Update'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    )
} 