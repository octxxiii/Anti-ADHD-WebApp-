"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Timer, Play, Pause, RotateCcw, Coffee, Brain, Zap } from "lucide-react"

export default function PomodoroPage() {
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60) // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [currentSession, setCurrentSession] = useState("focus") // focus, shortBreak, longBreak
  const [completedPomodoros, setCompletedPomodoros] = useState(3)
  const [todayPomodoros, setTodayPomodoros] = useState(12)

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const sessionTypes = {
    focus: { duration: 25 * 60, label: "집중 시간", emoji: "🍅", color: "from-red-400 to-pink-500" },
    shortBreak: { duration: 5 * 60, label: "짧은 휴식", emoji: "☕", color: "from-green-400 to-emerald-500" },
    longBreak: { duration: 15 * 60, label: "긴 휴식", emoji: "🛋️", color: "from-blue-400 to-cyan-500" },
  }

  const currentSessionInfo = sessionTypes[currentSession as keyof typeof sessionTypes]
  const progress = ((currentSessionInfo.duration - pomodoroTime) / currentSessionInfo.duration) * 100

  const presetTimes = [
    { label: "25분", value: 25 * 60, type: "focus" },
    { label: "15분", value: 15 * 60, type: "focus" },
    { label: "5분", value: 5 * 60, type: "shortBreak" },
    { label: "10분", value: 10 * 60, type: "shortBreak" },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">🍅 포모도로 타이머</h2>
        <p className="text-white/80">집중과 휴식의 완벽한 밸런스!</p>
      </div>

      {/* Main Timer */}
      <div className="max-w-md mx-auto">
        <Card className={`bg-gradient-to-br ${currentSessionInfo.color} border-0 text-white text-center`}>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center justify-center gap-2">
              <span className="text-3xl">{currentSessionInfo.emoji}</span>
              {currentSessionInfo.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-6xl font-bold font-mono">{formatTime(pomodoroTime)}</div>

            {/* Progress Ring */}
            <div className="relative w-32 h-32 mx-auto">
              <Progress value={progress} className="h-2 w-full" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-semibold">{Math.round(progress)}%</span>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="bg-white/20 hover:bg-white/30 text-white border-0 px-8 py-3 text-lg backdrop-blur-sm"
              >
                {isTimerRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>

              <Button
                onClick={() => {
                  setPomodoroTime(currentSessionInfo.duration)
                  setIsTimerRunning(false)
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-0 px-8 py-3 text-lg backdrop-blur-sm"
              >
                <RotateCcw className="w-6 h-6" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Session Types */}
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(sessionTypes).map(([key, session]) => (
          <Button
            key={key}
            onClick={() => {
              setCurrentSession(key)
              setPomodoroTime(session.duration)
              setIsTimerRunning(false)
            }}
            className={`p-4 h-auto flex flex-col items-center gap-2 ${
              currentSession === key
                ? `bg-gradient-to-r ${session.color} text-white`
                : "bg-white/20 text-white hover:bg-white/30"
            } border-0 backdrop-blur-sm`}
          >
            <span className="text-2xl">{session.emoji}</span>
            <span className="text-sm font-medium">{session.label}</span>
          </Button>
        ))}
      </div>

      {/* Quick Presets */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="w-5 h-5" />
            빠른 설정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {presetTimes.map((preset, index) => (
              <Button
                key={index}
                onClick={() => {
                  setPomodoroTime(preset.value)
                  setCurrentSession(preset.type)
                  setIsTimerRunning(false)
                }}
                className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm"
              >
                {preset.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/20 backdrop-blur-sm border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Brain className="w-5 h-5 text-purple-300" />
              <span className="font-bold">오늘 완료</span>
            </div>
            <div className="text-2xl font-bold">{todayPomodoros}개</div>
            <div className="text-sm opacity-80">🍅 포모도로</div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-sm border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5 text-yellow-300" />
              <span className="font-bold">연속 세션</span>
            </div>
            <div className="text-2xl font-bold">{completedPomodoros}개</div>
            <div className="text-sm opacity-80">🔥 연속 집중</div>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-sm border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coffee className="w-5 h-5 text-brown-300" />
              <span className="font-bold">이번 주</span>
            </div>
            <div className="text-2xl font-bold">47개</div>
            <div className="text-sm opacity-80">⭐ 평균 8.5개</div>
          </CardContent>
        </Card>
      </div>

      {/* Motivational Message */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 text-white text-center">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-2">🎉 잘하고 있어요!</h3>
          <p className="opacity-90">
            오늘도 집중력을 발휘하고 있네요!
            <br />
            작은 성취들이 모여 큰 변화를 만들어요 ✨
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
