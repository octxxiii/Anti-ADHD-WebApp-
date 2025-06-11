"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw, Settings, X } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PomodoroTimer() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [currentCycle, setCurrentCycle] = useState<"work" | "break">("work")
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreak: 5,
    longBreak: 15,
    cyclesUntilLongBreak: 4,
  })
  const [completedCycles, setCompletedCycles] = useState(0)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      // Timer finished
      setIsRunning(false)
      if (currentCycle === "work") {
        setCompletedCycles((prev) => prev + 1)
        // Switch to break
        const isLongBreak = (completedCycles + 1) % settings.cyclesUntilLongBreak === 0
        setCurrentCycle("break")
        setTimeLeft((isLongBreak ? settings.longBreak : settings.shortBreak) * 60)
      } else {
        // Switch back to work
        setCurrentCycle("work")
        setTimeLeft(settings.workDuration * 60)
      }

      // Play notification sound (if available)
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification(`${currentCycle === "work" ? "Work" : "Break"} session completed!`)
      }
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft, currentCycle, completedCycles, settings])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleTimer = () => {
    setIsRunning(!isRunning)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(currentCycle === "work" ? settings.workDuration * 60 : settings.shortBreak * 60)
  }

  const updateSettings = (newSettings: typeof settings) => {
    setSettings(newSettings)
    if (!isRunning) {
      setTimeLeft(currentCycle === "work" ? newSettings.workDuration * 60 : newSettings.shortBreak * 60)
    }
    setIsSettingsOpen(false)
  }

  const getProgress = () => {
    const totalTime =
      currentCycle === "work"
        ? settings.workDuration * 60
        : completedCycles % settings.cyclesUntilLongBreak === settings.cyclesUntilLongBreak - 1
          ? settings.longBreak * 60
          : settings.shortBreak * 60
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Card
          className="w-16 h-16 cursor-pointer hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-2"
          onClick={() => setIsExpanded(true)}
        >
          <CardContent className="p-0 flex items-center justify-center h-full">
            <div className="text-center">
              <div className="text-xs font-mono font-bold text-gray-900 dark:text-white">{formatTime(timeLeft)}</div>
              <div className={`text-xs ${currentCycle === "work" ? "text-red-500" : "text-green-500"}`}>
                {currentCycle === "work" ? "🍅" : "☕"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="w-80 bg-white dark:bg-gray-800 shadow-xl border-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 dark:text-white">Pomodoro Timer</h3>
            <div className="flex items-center space-x-2">
              <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Timer Settings</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Work Duration (minutes)</Label>
                      <Select
                        value={settings.workDuration.toString()}
                        onValueChange={(value) => setSettings({ ...settings, workDuration: Number.parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="20">20 minutes</SelectItem>
                          <SelectItem value="25">25 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Short Break (minutes)</Label>
                      <Select
                        value={settings.shortBreak.toString()}
                        onValueChange={(value) => setSettings({ ...settings, shortBreak: Number.parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 minutes</SelectItem>
                          <SelectItem value="5">5 minutes</SelectItem>
                          <SelectItem value="10">10 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Long Break (minutes)</Label>
                      <Select
                        value={settings.longBreak.toString()}
                        onValueChange={(value) => setSettings({ ...settings, longBreak: Number.parseInt(value) })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="20">20 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={() => updateSettings(settings)} className="w-full">
                      Save Settings
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-center mb-6">
            <div className="text-4xl font-mono font-bold text-gray-900 dark:text-white mb-2">
              {formatTime(timeLeft)}
            </div>
            <div className={`text-lg font-medium ${currentCycle === "work" ? "text-red-500" : "text-green-500"}`}>
              {currentCycle === "work" ? "🍅 Focus Time" : "☕ Break Time"}
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-3">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${
                  currentCycle === "work" ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${getProgress()}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-4 mb-4">
            <Button
              onClick={toggleTimer}
              className={`${
                currentCycle === "work" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" onClick={resetTimer}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 dark:text-gray-400">
            <div>Completed cycles: {completedCycles}</div>
            <div>
              Next:{" "}
              {completedCycles % settings.cyclesUntilLongBreak === settings.cyclesUntilLongBreak - 1
                ? "Long break"
                : "Short break"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
