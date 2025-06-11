"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Progress } from "../ui/progress"
import { Plus, Star, Target, Zap } from "lucide-react"

export default function ProjectsPage() {
  const projects = [
    {
      name: "웹앱 개발",
      progress: 75,
      color: "from-pink-400 to-purple-500",
      tasks: 12,
      completed: 9,
      deadline: "2024-12-20",
      priority: "high",
    },
    {
      name: "독서 챌린지",
      progress: 40,
      color: "from-blue-400 to-cyan-500",
      tasks: 10,
      completed: 4,
      deadline: "2024-12-31",
      priority: "medium",
    },
    {
      name: "운동 계획",
      progress: 60,
      color: "from-green-400 to-emerald-500",
      tasks: 20,
      completed: 12,
      deadline: "진행중",
      priority: "high",
    },
    {
      name: "새로운 언어 학습",
      progress: 25,
      color: "from-yellow-400 to-orange-500",
      tasks: 8,
      completed: 2,
      deadline: "2025-03-01",
      priority: "low",
    },
    {
      name: "집 정리정돈",
      progress: 80,
      color: "from-purple-400 to-indigo-500",
      tasks: 5,
      completed: 4,
      deadline: "2024-12-15",
      priority: "medium",
    },
    {
      name: "부업 준비",
      progress: 15,
      color: "from-teal-400 to-green-500",
      tasks: 15,
      completed: 2,
      deadline: "2025-01-15",
      priority: "high",
    },
  ]

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <Zap className="w-4 h-4 text-red-300" />
      case "medium":
        return <Target className="w-4 h-4 text-yellow-300" />
      case "low":
        return <Star className="w-4 h-4 text-green-300" />
      default:
        return <Star className="w-4 h-4" />
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

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">⭐ 내 프로젝트들</h2>
        <p className="text-white/80">목표를 향해 차근차근 나아가자!</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-white/20 backdrop-blur-sm border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">6</div>
            <div className="text-sm opacity-80">진행중인 프로젝트</div>
          </CardContent>
        </Card>
        <Card className="bg-white/20 backdrop-blur-sm border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">33</div>
            <div className="text-sm opacity-80">완료한 작업</div>
          </CardContent>
        </Card>
        <Card className="bg-white/20 backdrop-blur-sm border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">52%</div>
            <div className="text-sm opacity-80">평균 진행도</div>
          </CardContent>
        </Card>
        <Card className="bg-white/20 backdrop-blur-sm border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm opacity-80">이번 주 마감</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Card key={index} className="bg-white/20 backdrop-blur-sm border-0 text-white">
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

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="opacity-80">작업</div>
                  <div className="font-semibold">
                    {project.completed}/{project.tasks}
                  </div>
                </div>
                <div>
                  <div className="opacity-80">마감일</div>
                  <div className="font-semibold text-xs">{project.deadline}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-white/20 hover:bg-white/30 text-white border-0 text-sm">
                  프로젝트 열기
                </Button>
                <Button
                  className={`px-3 bg-white/20 hover:bg-white/30 text-white border-0 ${getPriorityColor(project.priority)}`}
                >
                  {getPriorityIcon(project.priority)}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add New Project Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-2 border-dashed border-white/30 text-white flex items-center justify-center min-h-[280px]">
          <div className="text-center">
            <Plus className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-2">새 프로젝트</p>
            <p className="text-sm opacity-70 mb-4">새로운 목표를 시작해보세요!</p>
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0">
              프로젝트 추가
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
