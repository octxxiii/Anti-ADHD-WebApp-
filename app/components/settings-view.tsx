"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings, Bell, Moon, Sun, Palette, Clock, Brain, Download } from "lucide-react"

export default function SettingsView() {
  const [settings, setSettings] = useState({
    theme: "system",
    notifications: true,
    reminderTime: "30",
    pomodoroLength: "25",
    breakLength: "5",
    autoStartBreaks: false,
    soundEnabled: true,
    colorTheme: "default",
  })

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings({
      ...settings,
      [key]: value,
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">⚙️ 설정</h2>
        <p className="text-white/80">앱을 나에게 맞게 커스터마이징하세요!</p>
      </div>

      {/* Appearance Settings */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="w-5 h-5" />
            외관 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">테마</Label>
              <p className="text-sm text-white/70">앱의 테마를 선택하세요</p>
            </div>
            <Select
              value={settings.theme}
              onValueChange={(value) => handleSettingChange("theme", value)}
            >
              <SelectTrigger className="w-[180px] bg-white/20 border-0 text-white">
                <SelectValue placeholder="테마 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4" />
                    <span>라이트 모드</span>
                  </div>
                </SelectItem>
                <SelectItem value="dark">
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4" />
                    <span>다크 모드</span>
                  </div>
                </SelectItem>
                <SelectItem value="system">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    <span>시스템 설정</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">색상 테마</Label>
              <p className="text-sm text-white/70">앱의 색상 테마를 선택하세요</p>
            </div>
            <Select
              value={settings.colorTheme}
              onValueChange={(value) => handleSettingChange("colorTheme", value)}
            >
              <SelectTrigger className="w-[180px] bg-white/20 border-0 text-white">
                <SelectValue placeholder="색상 테마 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">기본 (퍼플-핑크)</SelectItem>
                <SelectItem value="blue">블루 테마</SelectItem>
                <SelectItem value="green">그린 테마</SelectItem>
                <SelectItem value="orange">오렌지 테마</SelectItem>
                <SelectItem value="rainbow">레인보우 테마</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            알림 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">알림 활성화</Label>
              <p className="text-sm text-white/70">일정 및 작업 알림을 받습니다</p>
            </div>
            <Switch
              checked={settings.notifications}
              onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">알림 시간</Label>
              <p className="text-sm text-white/70">일정 시작 전 알림 시간</p>
            </div>
            <Select
              value={settings.reminderTime}
              onValueChange={(value) => handleSettingChange("reminderTime", value)}
              disabled={!settings.notifications}
            >
              <SelectTrigger className="w-[180px] bg-white/20 border-0 text-white">
                <SelectValue placeholder="알림 시간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5분 전</SelectItem>
                <SelectItem value="10">10분 전</SelectItem>
                <SelectItem value="15">15분 전</SelectItem>
                <SelectItem value="30">30분 전</SelectItem>
                <SelectItem value="60">1시간 전</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">소리 활성화</Label>
              <p className="text-sm text-white/70">알림 및 타이머 소리를 활성화합니다</p>
            </div>
            <Switch
              checked={settings.soundEnabled}
              onCheckedChange={(checked) => handleSettingChange("soundEnabled", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Pomodoro Settings */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            포모도로 설정
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">집중 시간</Label>
              <p className="text-sm text-white/70">포모도로 세션 길이 (분)</p>
            </div>
            <Select
              value={settings.pomodoroLength}
              onValueChange={(value) => handleSettingChange("pomodoroLength", value)}
            >
              <SelectTrigger className="w-[180px] bg-white/20 border-0 text-white">
                <SelectValue placeholder="시간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15분</SelectItem>
                <SelectItem value="20">20분</SelectItem>
                <SelectItem value="25">25분</SelectItem>
                <SelectItem value="30">30분</SelectItem>
                <SelectItem value="45">45분</SelectItem>
                <SelectItem value="60">60분</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">휴식 시간</Label>
              <p className="text-sm text-white/70">휴식 세션 길이 (분)</p>
            </div>
            <Select
              value={settings.breakLength}
              onValueChange={(value) => handleSettingChange("breakLength", value)}
            >
              <SelectTrigger className="w-[180px] bg-white/20 border-0 text-white">
                <SelectValue placeholder="시간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3분</SelectItem>
                <SelectItem value="5">5분</SelectItem>
                <SelectItem value="10">10분</SelectItem>
                <SelectItem value="15">15분</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base">자동 휴식 시작</Label>
              <p className="text-sm text-white/70">집중 시간 후 자동으로 휴식 시작</p>
            </div>
            <Switch
              checked={settings.autoStartBreaks}
              onCheckedChange={(checked) => handleSettingChange("autoStartBreaks", checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            데이터 관리
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm">
              <Download className="w-4 h-4 mr-2" />
              데이터 내보내기
            </Button>
            <Button className="bg-white/20 hover:bg-white\
