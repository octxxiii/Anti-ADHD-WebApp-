"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Badge } from "../ui/badge"
import { Settings, Users, Mail, Trash2, Crown, Edit, UserCheck } from "lucide-react"

interface User {
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

interface Task {
  id: string
  title: string
  description?: string
  quadrant: string
  assignee?: string
  dueDate?: string
  createdAt: string
}

interface CalendarEvent {
  id: string
  title: string
  date: string
  time?: string
  description?: string
  color: string
}

interface Message {
  id: string
  senderId: string
  senderName: string
  content: string
  timestamp: string
}

interface ProjectSettingsProps {
  project: Project
  updateProject: (project: Project) => void
  user: User
}

export default function ProjectSettings({ project, updateProject, user }: ProjectSettingsProps) {
  const [projectName, setProjectName] = useState(project.name)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState<"editor" | "viewer">("editor")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)

  const updateProjectName = () => {
    if (projectName.trim() && projectName !== project.name) {
      updateProject({
        ...project,
        name: projectName.trim(),
      })
    }
  }

  const inviteMember = () => {
    if (!inviteEmail.trim()) return

    // Check if user is already a member
    if (project.members.some((member) => member.email === inviteEmail)) {
      alert("User is already a member of this project")
      return
    }

    const newMember: ProjectMember = {
      id: Date.now().toString(),
      email: inviteEmail,
      name: inviteEmail.split("@")[0], // Use email prefix as name
      role: inviteRole,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${inviteEmail}`,
    }

    updateProject({
      ...project,
      members: [...project.members, newMember],
    })

    setInviteEmail("")
    setInviteRole("editor")
    setIsInviteDialogOpen(false)
  }

  const updateMemberRole = (memberId: string, newRole: "owner" | "editor" | "viewer") => {
    updateProject({
      ...project,
      members: project.members.map((member) => (member.id === memberId ? { ...member, role: newRole } : member)),
    })
  }

  const removeMember = (memberId: string) => {
    if (project.members.find((m) => m.id === memberId)?.role === "owner") {
      alert("Cannot remove project owner")
      return
    }

    updateProject({
      ...project,
      members: project.members.filter((member) => member.id !== memberId),
    })
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "owner":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "editor":
        return <Edit className="h-4 w-4 text-blue-500" />
      case "viewer":
        return <UserCheck className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
      case "editor":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "viewer":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  const currentUserRole = project.members.find((m) => m.id === user.id)?.role
  const canManageProject = currentUserRole === "owner"
  const canInviteMembers = currentUserRole === "owner" || currentUserRole === "editor"

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project Settings</h2>
        <p className="text-gray-600 dark:text-gray-400">Manage your project configuration and team members</p>
      </div>

      {/* Project Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Project Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name">Project Name</Label>
            <div className="flex space-x-2">
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                disabled={!canManageProject}
                className="flex-1"
              />
              {canManageProject && (
                <Button onClick={updateProjectName} disabled={projectName === project.name}>
                  Update
                </Button>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500 dark:text-gray-400">Created:</span>
              <p className="font-medium">December 10, 2024</p>
            </div>
            <div>
              <span className="text-gray-500 dark:text-gray-400">Tasks:</span>
              <p className="font-medium">{project.tasks.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Members */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Team Members</span>
            </CardTitle>
            {canInviteMembers && (
              <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Mail className="h-4 w-4 mr-2" />
                    Invite Member
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Invite Team Member</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-email">Email Address</Label>
                      <Input
                        id="invite-email"
                        type="email"
                        placeholder="Enter email address"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="invite-role">Role</Label>
                      <Select value={inviteRole} onValueChange={(value: "editor" | "viewer") => setInviteRole(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">
                            <div className="flex items-center space-x-2">
                              <Edit className="h-4 w-4 text-blue-500" />
                              <div>
                                <div>Editor</div>
                                <div className="text-xs text-gray-500">Can edit tasks and events</div>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="viewer">
                            <div className="flex items-center space-x-2">
                              <UserCheck className="h-4 w-4 text-green-500" />
                              <div>
                                <div>Viewer</div>
                                <div className="text-xs text-gray-500">Can only view content</div>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={inviteMember} className="w-full">
                      Send Invitation
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {project.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={member.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${member.email}`}
                    alt={member.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900 dark:text-white">{member.name}</span>
                      {member.id === user.id && <span className="text-xs text-gray-500 dark:text-gray-400">(You)</span>}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getRoleBadgeColor(member.role)}>
                    <div className="flex items-center space-x-1">
                      {getRoleIcon(member.role)}
                      <span className="capitalize">{member.role}</span>
                    </div>
                  </Badge>
                  {canManageProject && member.role !== "owner" && (
                    <div className="flex items-center space-x-1">
                      <Select
                        value={member.role}
                        onValueChange={(value: "owner" | "editor" | "viewer") => updateMemberRole(member.id, value)}
                      >
                        <SelectTrigger className="w-24 h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="editor">Editor</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMember(member.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Permissions */}
      <Card>
        <CardHeader>
          <CardTitle>Role Permissions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-yellow-200 dark:border-yellow-800 rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Crown className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold text-yellow-800 dark:text-yellow-200">Owner</span>
                </div>
                <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                  <li>• Full project access</li>
                  <li>• Manage team members</li>
                  <li>• Delete project</li>
                  <li>• Change project settings</li>
                </ul>
              </div>
              <div className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                <div className="flex items-center space-x-2 mb-2">
                  <Edit className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold text-blue-800 dark:text-blue-200">Editor</span>
                </div>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Create and edit tasks</li>
                  <li>• Manage calendar events</li>
                  <li>• Invite new members</li>
                  <li>• Participate in chat</li>
                </ul>
              </div>
              <div className="p-4 border border-green-200 dark:border-green-800 rounded-lg bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center space-x-2 mb-2">
                  <UserCheck className="h-5 w-5 text-green-500" />
                  <span className="font-semibold text-green-800 dark:text-green-200">Viewer</span>
                </div>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• View tasks and events</li>
                  <li>• Read chat messages</li>
                  <li>• Export project data</li>
                  <li>• Limited editing rights</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
