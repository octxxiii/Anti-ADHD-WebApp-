"use client"

import { Target, Calendar, ListTodo, Settings } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function BottomNavigation({ activeTab, setActiveTab }: BottomNavigationProps) {
  const navItems = [
    { id: "matrix", label: "매트릭스", icon: Target, color: "from-red-400 to-pink-500" },
    { id: "calendar", label: "캘린더", icon: Calendar, color: "from-blue-400 to-cyan-500" },
    { id: "projects", label: "프로젝트", icon: ListTodo, color: "from-green-400 to-emerald-500" },
    { id: "settings", label: "설정", icon: Settings, color: "from-purple-400 to-indigo-500" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/20 backdrop-blur-lg border-t border-white/20">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-300 ${
                isActive ? `bg-gradient-to-r ${item.color} shadow-lg scale-110` : "hover:bg-white/10"
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 ${isActive ? "text-white" : "text-white/70"}`} />
              <span className={`text-xs font-medium ${isActive ? "text-white" : "text-white/70"}`}>{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
