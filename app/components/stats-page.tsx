"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { BarChart3, TrendingUp, Target, Star, Zap, Brain, Trophy } from "lucide-react"

export default function StatsPage() {
  const weeklyStats = [
    { day: "월", completed: 8, total: 10 },
    { day: "화", completed: 12, total: 15 },
    { day: "수", completed: 6, total: 8 },
    { day: "목", completed: 15, total: 18 },
    { day: "금", completed: 10, total: 12 },
    { day: "토", completed: 5, total: 7 },
    { day: "일", completed: 3, total: 5 },
  ]

  const achievements = [
    { title: "첫 포모도로", description: "첫 번째 포모도로 완료!", icon: "🍅", unlocked: true },
    { title: "일주일 연속", description: "7일 연속 작업 완료", icon: "🔥", unlocked: true },
    { title: "프로젝트 마스터", description: "프로젝트 3개 완료", icon: "🏆", unlocked: true },
    { title: "집중력 왕", description: "하루 20개 포모도로", icon: "👑", unlocked: false },
    { title: "계획 달인", description: "매트릭스 100개 작업", icon: "🎯", unlocked: false },
    { title: "꾸준함의 힘", description: "30일 연속 사용", icon: "💪", unlocked: false },
  ]

  const categoryStats = [
    { name: "업무", completed: 45, total: 60, color: "from-red-400 to-pink-500", percentage: 75 },
    { name: "개인 발전", completed: 28, total: 40, color: "from-blue-400 to-cyan-500", percentage: 70 },
    { name: "건강", completed: 18, total: 25, color: "from-green-400 to-emerald-500", percentage: 72 },
    { name: "취미", completed: 12, total: 20, color: "from-purple-400 to-indigo-500", percentage: 60 },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">📊 나의 성장 통계</h2>
        <p className="text-white/80">데이터로 보는 나의 발전 과정!</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-400 to-pink-500 border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-5 h-5" />
              <span className="font-bold text-sm">연속 집중</span>
            </div>
            <div className="text-2xl font-bold">7일</div>
            <div className="text-xs opacity-80">🔥 최고 기록!</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-400 to-cyan-500 border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="w-5 h-5" />
              <span className="font-bold text-sm">완료율</span>
            </div>
            <div className="text-2xl font-bold">78%</div>
            <div className="text-xs opacity-80">📈 지난주 +5%</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-400 to-emerald-500 border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Brain className="w-5 h-5" />
              <span className="font-bold text-sm">포모도로</span>
            </div>
            <div className="text-2xl font-bold">156</div>
            <div className="text-xs opacity-80">🍅 이번 달</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-400 to-yellow-500 border-0 text-white text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="font-bold text-sm">생산성</span>
            </div>
            <div className="text-2xl font-bold">92%</div>
            <div className="text-xs opacity-80">⚡ 평균 대비</div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            이번 주 활동
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium mb-2">{stat.day}</div>
                <div className="bg-white/20 rounded-lg p-2 h-20 flex flex-col justify-end">
                  <div
                    className="bg-gradient-to-t from-purple-400 to-pink-400 rounded transition-all duration-500"
                    style={{ height: `${(stat.completed / stat.total) * 100}%`, minHeight: "4px" }}
                  ></div>
                </div>
                <div className="text-xs mt-1 opacity-80">
                  {stat.completed}/{stat.total}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Breakdown */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            카테고리별 진행도
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {categoryStats.map((category, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">{category.name}</span>
                <span className="text-sm opacity-80">
                  {category.completed}/{category.total}
                </span>
              </div>
              <div className="relative">
                <Progress value={category.percentage} className="h-3" />
                <div
                  className="absolute inset-0 bg-gradient-to-r opacity-80 rounded-full"
                  style={{
                    background: `linear-gradient(to right, transparent ${category.percentage}%, rgba(255,255,255,0.1) ${category.percentage}%)`,
                  }}
                ></div>
              </div>
              <div className="text-right text-sm opacity-70">{category.percentage}%</div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="bg-white/20 backdrop-blur-sm border-0 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            성취 배지
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg text-center transition-all duration-300 ${
                  achievement.unlocked
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg"
                    : "bg-white/10 opacity-50"
                }`}
              >
                <div className="text-3xl mb-2">{achievement.icon}</div>
                <div className="font-semibold text-sm mb-1">{achievement.title}</div>
                <div className="text-xs opacity-80">{achievement.description}</div>
                {achievement.unlocked && <div className="text-xs mt-2 font-bold text-yellow-200">✨ 달성!</div>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Motivational Summary */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 text-white text-center">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold mb-3">🎉 이번 주 요약</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="text-2xl font-bold">59</div>
              <div className="opacity-90">완료한 작업</div>
            </div>
            <div>
              <div className="text-2xl font-bold">47</div>
              <div className="opacity-90">포모도로 세션</div>
            </div>
            <div>
              <div className="text-2xl font-bold">23.5</div>
              <div className="opacity-90">집중 시간 (시간)</div>
            </div>
          </div>
          <p className="mt-4 opacity-90">정말 대단해요! 꾸준한 노력이 결실을 맺고 있어요 🌟</p>
        </CardContent>
      </Card>
    </div>
  )
}
