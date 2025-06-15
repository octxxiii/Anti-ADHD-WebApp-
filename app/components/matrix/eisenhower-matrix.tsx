"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { useDrag, useDrop } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Plus, Calendar, User, AlertTriangle, Target, Clock, Trash2 } from "lucide-react"
import { Task, CalendarEvent } from '@/types'
import { DndProvider } from 'react-dnd'

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

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
}

interface DragItem {
  id: string
  type: string
  quadrant: QuadrantType
  index: number
}

interface QuadrantProps {
  title: string
  subtitle: string
  icon: LucideIcon
  color: string
  headerColor: string
  tasks: Task[]
  onDrop: (taskId: string, quadrant: QuadrantType) => void
  quadrant: QuadrantType
  onTaskClick: (task: Task) => void
  onAddTask: (quadrant: QuadrantType) => void
  moveTask: (dragId: string, hoverId: string) => void
}

// QuadrantType 타입 정의 추가
type QuadrantType = 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important'

interface Task {
  id: string
  title: string
  description?: string
  quadrant: QuadrantType
  assignee?: string
  dueDate?: string
  createdAt: string
  order?: number
}

const Quadrant = ({
  title,
  subtitle,
  icon: Icon,
  color,
  headerColor,
  tasks,
  onDrop,
  quadrant,
  onTaskClick,
  onAddTask,
  moveTask
}: QuadrantProps) => {
  const [{ isOver }, drop] = useDrop<DragItem, void, { isOver: boolean }>(() => ({
    accept: 'task',
    drop: (item: DragItem) => {
      if (item.quadrant !== quadrant) {
        onDrop(item.id, quadrant)
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }))

  return (
    <Card
      ref={drop}
      className={`${color} border-2 flex flex-col min-h-0 transition-colors duration-200 ${isOver ? 'bg-primary/10 dark:bg-primary/20 border-primary dark:border-primary/50 shadow-lg' : ''
        }`}
    >
      <CardHeader className={`${headerColor} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="text-sm opacity-80">{subtitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-white/10"
            onClick={() => onAddTask(quadrant)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-1 overflow-y-auto">
        <div className="space-y-3">
          {tasks.map((task, index) => (
            <DraggableTask
              key={task.id}
              task={task}
              index={index}
              onClick={() => onTaskClick(task)}
              moveTask={moveTask}
              onDrop={onDrop}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>No tasks yet</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2"
                onClick={() => onAddTask(quadrant)}
              >
                Add Task
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

interface DraggableTaskProps {
  task: Task
  index: number
  onClick: () => void
  moveTask: (dragId: string, hoverId: string) => void
  onDrop: (taskId: string, quadrant: QuadrantType) => void
}

const DraggableTask = ({ task, index, onClick, moveTask, onDrop }: DraggableTaskProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const [{ isDragging }, drag] = useDrag({
    type: 'task',
    item: () => ({
      id: task.id,
      type: 'task',
      quadrant: task.quadrant,
      index
    }),
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: 'task',
    hover: (item: DragItem, monitor) => {
      if (!ref.current) {
        return
      }

      // Don't replace items with themselves
      if (item.id === task.id) {
        return
      }

      // If the item is from a different quadrant, update its quadrant
      if (item.quadrant !== task.quadrant) {
        onDrop(item.id, task.quadrant)
        return
      }

      // If in the same quadrant, reorder
      moveTask(item.id, task.id)
    },
  })

  drag(drop(ref))

  return (
    <div
      ref={ref}
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow cursor-move ${isDragging ? 'opacity-50' : ''
        }`}
      style={{ touchAction: 'none' }}
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
                <span>{task.assignee}</span>
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
      </div>
    </div>
  )
}

interface EisenhowerMatrixProps {
  project: {
    tasks: Task[]
    members: { id: string; name: string }[]
    events: CalendarEvent[]
  }
  updateProject: (project: any) => void
}

export default function EisenhowerMatrix({ project, updateProject }: EisenhowerMatrixProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    quadrant: 'urgent-important',
    assignee: '',
    dueDate: '',
  })

  const quadrants = [
    {
      id: "urgent-important" as QuadrantType,
      title: "Urgent & Important",
      subtitle: "Do First",
      icon: AlertTriangle,
      color: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800",
      headerColor: "bg-red-500",
    },
    {
      id: "not-urgent-important" as QuadrantType,
      title: "Not Urgent & Important",
      subtitle: "Schedule",
      icon: Target,
      color: "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
      headerColor: "bg-blue-500",
    },
    {
      id: "urgent-not-important" as QuadrantType,
      title: "Urgent & Not Important",
      subtitle: "Delegate",
      icon: Clock,
      color: "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800",
      headerColor: "bg-yellow-500",
    },
    {
      id: "not-urgent-not-important" as QuadrantType,
      title: "Not Urgent & Not Important",
      subtitle: "Eliminate",
      icon: Trash2,
      color: "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800",
      headerColor: "bg-gray-500",
    },
  ]

  const tasksByQuadrant = useMemo(() => {
    return project.tasks.reduce((acc, task) => {
      const quadrant = task.quadrant || 'urgent-important'
      if (!acc[quadrant]) {
        acc[quadrant] = []
      }
      acc[quadrant].push(task)
      return acc
    }, {} as Record<QuadrantType, Task[]>)
  }, [project.tasks])

  const handleDrop = useCallback((taskId: string, quadrant: QuadrantType) => {
    const task = project.tasks.find(t => t.id === taskId)
    if (!task) return

    // 현재 쿼드런트의 최대 order 값 찾기
    const maxOrder = tasksByQuadrant[quadrant]?.length ?? 0

    // 모든 태스크 업데이트
    const updatedTasks = project.tasks.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          quadrant,
          order: maxOrder + 1
        }
      }
      return t
    })

    // 프로젝트 업데이트
    updateProject({
      ...project,
      tasks: updatedTasks
    })
  }, [project, updateProject, tasksByQuadrant])

  const moveTask = useCallback((dragId: string, hoverId: string) => {
    const dragTask = project.tasks.find(t => t.id === dragId)
    const hoverTask = project.tasks.find(t => t.id === hoverId)

    if (!dragTask || !hoverTask || dragTask.quadrant !== hoverTask.quadrant) return

    // 현재 쿼드런트의 모든 태스크 가져오기
    const quadrantTasks = tasksByQuadrant[dragTask.quadrant] || []

    // 드래그 아이템과 호버 아이템의 인덱스 찾기
    const dragIndex = quadrantTasks.findIndex(t => t.id === dragId)
    const hoverIndex = quadrantTasks.findIndex(t => t.id === hoverId)

    // 새로운 order 값 계산
    const updatedTasks = project.tasks.map(task => {
      if (task.id === dragId) {
        return { ...task, order: hoverTask.order }
      }
      if (task.id === hoverId) {
        return { ...task, order: dragTask.order }
      }
      // 같은 쿼드런트의 다른 태스크들의 order 조정
      if (task.quadrant === dragTask.quadrant) {
        if (dragIndex < hoverIndex) {
          if (task.order > dragTask.order && task.order <= hoverTask.order) {
            return { ...task, order: task.order - 1 }
          }
        } else {
          if (task.order >= hoverTask.order && task.order < dragTask.order) {
            return { ...task, order: task.order + 1 }
          }
        }
      }
      return task
    })

    // 프로젝트 업데이트
    updateProject({
      ...project,
      tasks: updatedTasks
    })
  }, [project, updateProject, tasksByQuadrant])

  // tasksByQuadrant를 다시 계산하기 위한 의존성 추가
  const sortedTasksByQuadrant = useMemo(() => {
    const sorted = { ...tasksByQuadrant }
    Object.keys(sorted).forEach(quadrant => {
      sorted[quadrant as QuadrantType] = sorted[quadrant as QuadrantType].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    })
    return sorted
  }, [tasksByQuadrant])

  const handleTaskClick = useCallback((task: Task) => {
    setSelectedTask(task)
    setFormData({
      title: task.title,
      description: task.description || '',
      quadrant: task.quadrant,
      assignee: task.assignee || '',
      dueDate: task.dueDate || '',
    })
    setIsDialogOpen(true)
  }, [])

  const handleAddTask = useCallback((quadrant: QuadrantType) => {
    setSelectedTask(null)
    setFormData({
      title: '',
      description: '',
      quadrant,
      assignee: '',
      dueDate: '',
    })
    setIsDialogOpen(true)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()

    if (selectedTask) {
      // Update existing task
      const updatedTasks = project.tasks.map(task =>
        task.id === selectedTask.id
          ? { ...task, ...formData }
          : task
      )
      updateProject((prevProject) => ({
        ...prevProject,
        tasks: updatedTasks
      }))
    } else {
      // Add new task
      const tasksInQuadrant = tasksByQuadrant[formData.quadrant!] || []
      const maxOrder = tasksInQuadrant.length > 0 ? Math.max(...tasksInQuadrant.map(t => t.order ?? 0)) : 0
      const newTask: Task = {
        id: Date.now().toString(),
        title: formData.title || '',
        description: formData.description || '',
        quadrant: formData.quadrant || 'urgent-important',
        assignee: formData.assignee || '',
        dueDate: formData.dueDate || '',
        createdAt: new Date().toISOString(),
        order: maxOrder + 1,
      }
      updateProject((prevProject) => ({
        ...prevProject,
        tasks: [...prevProject.tasks, newTask]
      }))
    }

    setIsDialogOpen(false)
  }, [selectedTask, formData, project, updateProject, tasksByQuadrant])

  useEffect(() => {
    console.log('[EisenhowerMatrix] project.tasks changed:', project.tasks)
  }, [project.tasks])

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Eisenhower Matrix</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Organize tasks by urgency and importance to prioritize effectively
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[80vh] overflow-y-auto">
          {quadrants.map((quadrant) => (
            <Quadrant
              key={quadrant.id}
              title={quadrant.title}
              subtitle={quadrant.subtitle}
              icon={quadrant.icon}
              color={quadrant.color}
              headerColor={quadrant.headerColor}
              tasks={sortedTasksByQuadrant[quadrant.id] || []}
              onDrop={handleDrop}
              quadrant={quadrant.id}
              onTaskClick={handleTaskClick}
              onAddTask={handleAddTask}
              moveTask={moveTask}
            />
          ))}
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedTask ? 'Edit Task' : 'Add New Task'}</DialogTitle>
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
                  onValueChange={(value) => setFormData({ ...formData, quadrant: value as QuadrantType })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {quadrants.map((q) => (
                      <SelectItem key={q.id} value={q.id}>
                        {q.title}
                      </SelectItem>
                    ))}
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
                  {selectedTask ? 'Update Task' : 'Add Task'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  )
}
