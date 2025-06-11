"use client"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Calendar, Plus, Clock } from "lucide-react"

export default function CalendarPage() {
  const weekDays = [
    {
      day: "월요일",
      date: "12/9",
      tasks: [
        { time: "09:00", title: "팀 미팅", type: "work" },
        { time: "14:00", title: "프로젝트 리뷰", type: "work" },
      ],
      color: "from-pink-400 to-red-400",
    },
    {
      day: "화요일",
      date: "12/10",
      tasks: [
        { time: "07:00", title: "운동", type: "health" },
        { time: "20:00", title: "독서", type: "personal" },
      ],
      color: "from-blue-400 to-purple-400",
    },
    {
      day: "수요일",
      date: "12/11",
      tasks: [
        { time: "10:00", title: "의사 예약", type: "health" },
        { time: "16:00", title: "쇼핑", type: "personal" },
      ],
      color: "from-green-400 to-blue-400",
    },
    {
      day: "목요일",
      date: "12/12",
      tasks: [{ time: "18:00", title: "친구 만나기", type: "social" }],
      color: "from-yellow-400 to-orange-400",
    },
    {
      day: "금요일",
      date: "12/13",
      tasks: [
        { time: "11:00", title: "프로젝트 마감", type: "work" },
        { time: "19:00", title: "휴식", type: "personal" },
      ],
      color: "from-purple-400 to-pink-400",
    },
    {
      day: "토요일",
      date: "12/14",
      tasks: [
        { time: "10:00", title: "가족 시간", type: "family" },
        { time: "15:00", title: "취미 활동", type: "personal" },
      ],
      color: "from-indigo-400 to-purple-400",
    },
    {
      day: "일요일",
      date: "12/15",
      tasks: [{ time: "11:00", title: "휴식", type: "personal" }],
      color: "from-teal-400 to-green-400",
    },
  ]

  const getTaskEmoji = (type: string) => {
    switch (type) {
      case "work":
        return "💼"
      case "health":
        return "🏃‍♀️"
      case "personal":
        return "📚"
      case "social":
        return "👥"
      case "family":
        return "👨‍👩‍👧‍👦"
      default:
        return "📝"
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">📅 이번 주 일정</h2>
        <p className="text-white/80">계획적으로 시간을 관리해보자!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {weekDays.map((day, index) => (
          <Card key={index} className={`bg-gradient-to-br ${day.color} border-0 text-white`}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>{day.day}</span>
                <span className="text-sm font-normal opacity-80">{day.date}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {day.tasks.map((task, taskIndex) => (
                <div key={taskIndex} className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{task.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>{getTaskEmoji(task.type)}</span>
                    <span className="text-sm">{task.title}</span>
                  </div>
                </div>
              ))}
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
                <Plus className="w-3 h-3 mr-1" />
                일정 추가
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Add Section */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            빠른 일정 추가
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button className="bg-gradient-to-r from-pink-500 to-red-500 text-white border-0">💼 업무</Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">🏃‍♀️ 운동</Button>
            <Button className="bg-gradient-to-r from-green-500 to-teal-500 text-white border-0">👥 약속</Button>
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">📚 개인</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
