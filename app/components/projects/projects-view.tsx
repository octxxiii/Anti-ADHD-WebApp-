"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Plus, ListTodo, Target, Zap, CheckCircle2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Textarea } from "../ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface Project {
  id: number
  name: string
  progress: number
  color: string
  tasks: ProjectTask[]
  deadline: string
  priority: string
}

interface ProjectTask {
  id: number
  text: string
  completed: boolean
}

export default function ProjectsView() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "웹앱 개발",
      progress: 75,
      color: "from-pink-400 to-purple-500",
      tasks: [
        { id: 1, text: "디자인 완성", completed: true },
        { id: 2, text: "프론트엔드 개발", completed: true },
        { id: 3, text: "백엔드 연동", completed: false },
      ],
      deadline: "2024-12-20",
      priority: "high",
    },
    {
      id: 2,
      name: "독서 챌린지",
      progress: 40,
      color: "from-blue-400 to-cyan-500",
      tasks: [
        { id: 4, text: "책 5권 읽기", completed: true },
        { id: 5, text: "독서 노트 작성", completed: false },
      ],
      deadline: "2024-12-31",
      priority: "medium",
    },
    {
      id: 3,
      name: "운동 계획",
      progress: 60,
      color: "from-green-400 to-emerald-500",
      tasks: [
        { id: 6, text: "주 3회 운동", completed: true },
        { id: 7, text: "식단 관리", completed: false },
      ],
      deadline: "진행중",
      priority: "high",
    },
  ])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isProjectDialogOpen, setIsProjectDialogOpen] = useState(false)
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false)
  const [newProject, setNewProject] = useState({
    name: "",
    priority: "medium",
    deadline: "",
    color: "from-blue-400 to-cyan-500",
  })
  const [newTask, setNewTask] = useState("")

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Zap className="w-4 h-4 text-red-300" />
      case "medium":
        return <Target className="w-4 h-4 text-yellow-300" />
      case "low":
        return <ListTodo className="w-4 h-4 text-green-300" />
      default:
        return <ListTodo className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-300"
      case "medium":
        return "text-yellow-300"
      case "low":
        return "text-green-300"
      default:
        return "text-white"
    }
  }

  const addProject = () => {
    if (newProject.name.trim() === "") return

    const newProjectObj: Project = {
      id: Date.now(),
      name: newProject.name,
      progress: 0,
      color: newProject.color,
      tasks: [],
      deadline: newProject.deadline || "진행중",
      priority: newProject.priority,
    }

    setProjects([...projects, newProjectObj])
    setNewProject({
      name: "",
      priority: "medium",
      deadline: "",
      color: "from-blue-400 to-cyan-500",
    })
    setIsProjectDialogOpen(false)
  }

  const addTask = () => {
    if (!selectedProject || newTask.trim() === "") return

    const newTaskObj: ProjectTask = {
      id: Date.now(),
      text: newTask,
      completed: false,
    }

    const updatedProjects = projects.map((project) => {
      if (project.id === selectedProject.id) {
        const updatedTasks = [...project.tasks, newTaskObj]
        return {
          ...project,
          tasks: updatedTasks,
          progress: Math.round((updatedTasks.filter((task) => task.completed).length / updatedTasks.length) * 100) || 0,
        }
      }
      return project
    })

    setProjects(updatedProjects)
    setNewTask("")
    setIsTaskDialogOpen(false)
  }

  const toggleTaskCompletion = (projectId: number, taskId: number) => {
    const updatedProjects = projects.map((project) => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task,
        )
        return {
          ...project,
          tasks: updatedTasks,
          progress: Math.round((updatedTasks.filter((task) => task.completed).length / updatedTasks.length) * 100),
        }
      }
      return project
    })

    setProjects(updatedProjects)
  }

  const colorOptions = [
    { value: "from-pink-400 to-purple-500", label: "핑크-퍼플" },
    { value: "from-blue-400 to-cyan-500", label: "블루-시안" },
    { value: "from-green-400 to-emerald-500", label: "그린-에메랄드" },
    { value: "from-yellow-400 to-orange-500", label: "옐로우-오렌지" },
    { value: "from-purple-400 to-indigo-500", label: "퍼플-인디고" },
    { value: "from-teal-400 to-green-500", label: "틸-그린" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">📋 프로젝트 관리</h2>
        <p className="text-white/80">작업을 프로젝트별로 구성하고 진행 상황을 추적하세요!</p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <Card key={project.id} className="bg-white/20 backdrop-blur-sm border-0 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-lg">
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${project.color}`}></div>
                  {project.name}
                </div>
                {getPriorityIcon(project.priority)}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>진행도</span>
                  <span>{project.progress}%</span>
                </div>
                <Progress value={project.progress} className="h-2" />
              </div>

              <div className="space-y-2 max-h-32 overflow-y-auto">
                {project.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center gap-2 p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                  >
                    <CheckCircle2
                      className={`w-4 h-4 cursor-pointer ${task.completed ? "text-green-300" : "text-white/50 hover:text-green-300"
                        }`}
                      onClick={() => toggleTaskCompletion(project.id, task.id)}
                    />
                    <span className={`text-sm ${task.completed ? "line-through opacity-70" : ""}`}>{task.text}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="opacity-80">작업</div>
                  <div className="font-semibold">
                    {project.tasks.filter((task) => task.completed).length}/{project.tasks.length}
                  </div>
                </div>
                <div>
                  <div className="opacity-80">마감일</div>
                  <div className="font-semibold text-xs">{project.deadline}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 text-sm"
                  onClick={() => {
                    setSelectedProject(project)
                    setIsTaskDialogOpen(true)
                  }}
                >
                  <Plus className="w-3 h-3 mr-1" />
                  작업 추가
                </Button>
                <Button
                  className={`px-3 bg-white/20 hover:bg-white/30 text-white border-0 ${getPriorityColor(
                    project.priority,
                  )}`}
                >
                  {getPriorityIcon(project.priority)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Project Card */}
        <Dialog open={isProjectDialogOpen} onOpenChange={setIsProjectDialogOpen}>
          <DialogTrigger asChild>
            <Card className="bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 text-white flex items-center justify-center min-h-[280px] cursor-pointer hover:bg-white/15 transition-colors">
              <div className="text-center">
                <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-semibold mb-2">새 프로젝트</p>
                <p className="text-sm opacity-70 mb-4">새로운 목표를 시작해보세요!</p>
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent className="bg-white/90 backdrop-blur-sm border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <ListTodo className="w-5 h-5" />새 프로젝트 추가
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">프로젝트 이름</Label>
                <Input
                  id="project-name"
                  placeholder="프로젝트 이름을 입력하세요"
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-priority">우선순위</Label>
                <Select
                  value={newProject.priority}
                  onValueChange={(value) => setNewProject({ ...newProject, priority: value })}
                >
                  <SelectTrigger id="project-priority">
                    <SelectValue placeholder="우선순위 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">🔴 높음</SelectItem>
                    <SelectItem value="medium">🟡 중간</SelectItem>
                    <SelectItem value="low">🟢 낮음</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-deadline">마감일 (선택사항)</Label>
                <Input
                  id="project-deadline"
                  type="date"
                  value={newProject.deadline}
                  onChange={(e) => setNewProject({ ...newProject, deadline: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="project-color">색상</Label>
                <Select
                  value={newProject.color}
                  onValueChange={(value) => setNewProject({ ...newProject, color: value })}
                >
                  <SelectTrigger id="project-color">
                    <SelectValue placeholder="색상 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${option.value}`}></div>
                          <span>{option.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addProject} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                프로젝트 추가하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Add Task Dialog */}
        <Dialog open={isTaskDialogOpen} onOpenChange={setIsTaskDialogOpen}>
          <DialogContent className="bg-white/90 backdrop-blur-sm border-0">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                {selectedProject?.name}에 작업 추가
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="task-text">작업 내용</Label>
                <Textarea
                  id="task-text"
                  placeholder="작업 내용을 입력하세요"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                />
              </div>
              <Button onClick={addTask} className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                작업 추가하기
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
