"use client"

import { useEffect, useState } from "react"
import {
  Bell,
  Command,
  FileText,
  MessageSquare,
  Search,
  Settings,
  Shield,
  User,
  Users,
  type LucideIcon,
  ArrowLeft,
  Folder,
  Calendar,
  CheckCircle,
  PlusCircle,
  Edit,
  Download,
  Upload,
  Send,
  Eye,
  Star,
  Archive,
  MoreHorizontal,
  UserPlus,
  Mail,
  Save,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/hooks/useLanguage"
import { LanguageSelector } from "@/components/language-selector"

type ActiveSection = "dashboard" | "projects" | "tasks" | "calendar" | "team" | "documents" | "messages" | "settings"

interface Project {
  id: string
  name: string
  description: string
  progress: number
  tasks: number
  completedTasks: number
  dueDate: string
  team: string[]
  color: string
  owner: string
  status: "active" | "completed" | "paused"
  budget: number
  spent: number
}

interface Task {
  id: string
  title: string
  description: string
  project: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string
  assignee: string
  owner: string
  createdAt: string
}

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
  avatar: string
  status: "online" | "offline" | "away"
  projects: string[]
  joinDate: string
}

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  project: string
  url: string
}

interface Message {
  id: string
  sender: string
  recipient: string
  subject: string
  content: string
  timestamp: string
  read: boolean
  starred: boolean
  archived: boolean
}

interface CalendarEvent {
  id: string
  title: string
  description: string
  date: string
  time: string
  duration: number
  attendees: string[]
  type: "meeting" | "deadline" | "reminder"
  project?: string
  owner: string
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<{ name: string; email: string; role?: string } | null>(null)
  const [activeSection, setActiveSection] = useState<ActiveSection>("dashboard")
  const [selectedUser, setSelectedUser] = useState<string>("all")
  const router = useRouter()
  const { language, t } = useLanguage()

  // Check authentication and get user role
  useEffect(() => {
    const savedUser = localStorage.getItem("portfolioUser")
    if (!savedUser) {
      router.push("/")
      return
    }
    try {
      const userData = JSON.parse(savedUser)
      // Determine role based on email
      const role = userData.email === "felipe14chile@gmail.com" ? "superAdmin" : "user"
      setUser({ ...userData, role })
    } catch {
      router.push("/")
    }
  }, [router])

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // Mock data
  const allProjects: Project[] = [
    {
      id: "1",
      name: "Análisis de Tachas",
      description: "Sistema de análisis de datos para optimización de rutas",
      progress: 75,
      tasks: 12,
      completedTasks: 9,
      dueDate: "2025-06-15",
      team: ["felipe14chile@gmail.com", "juan.diaz@email.com", "maria.sanchez@email.com"],
      color: "from-purple-500 to-blue-500",
      owner: "felipe14chile@gmail.com",
      status: "active",
      budget: 50000,
      spent: 37500,
    },
    {
      id: "2",
      name: "Detector de Neumonía",
      description: "Sistema de detección usando Computer Vision e IA",
      progress: 60,
      tasks: 8,
      completedTasks: 5,
      dueDate: "2025-07-10",
      team: ["felipe14chile@gmail.com", "ana.rodriguez@email.com", "luis.martinez@email.com"],
      color: "from-green-500 to-cyan-500",
      owner: "felipe14chile@gmail.com",
      status: "active",
      budget: 75000,
      spent: 45000,
    },
    {
      id: "3",
      name: "Proyecto Web Cliente A",
      description: "Desarrollo de aplicación web para cliente corporativo",
      progress: 40,
      tasks: 15,
      completedTasks: 6,
      dueDate: "2025-08-20",
      team: ["a@a.com", "juan.diaz@email.com"],
      color: "from-amber-500 to-orange-500",
      owner: "a@a.com",
      status: "active",
      budget: 30000,
      spent: 12000,
    },
  ]

  const allTasks: Task[] = [
    {
      id: "1",
      title: "Optimizar algoritmo de detección",
      description: "Mejorar la precisión del algoritmo principal",
      project: "Análisis de Tachas",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-06-10",
      assignee: "felipe14chile@gmail.com",
      owner: "felipe14chile@gmail.com",
      createdAt: "2025-06-01",
    },
    {
      id: "2",
      title: "Implementar interfaz de usuario",
      description: "Crear la interfaz principal del sistema",
      project: "Análisis de Tachas",
      status: "pending",
      priority: "medium",
      dueDate: "2025-06-12",
      assignee: "maria.sanchez@email.com",
      owner: "felipe14chile@gmail.com",
      createdAt: "2025-06-01",
    },
    {
      id: "3",
      title: "Documentar API",
      description: "Crear documentación completa de la API",
      project: "Análisis de Tachas",
      status: "completed",
      priority: "low",
      dueDate: "2025-06-05",
      assignee: "juan.diaz@email.com",
      owner: "felipe14chile@gmail.com",
      createdAt: "2025-05-28",
    },
    {
      id: "4",
      title: "Diseñar landing page",
      description: "Crear el diseño de la página principal",
      project: "Proyecto Web Cliente A",
      status: "in-progress",
      priority: "high",
      dueDate: "2025-06-20",
      assignee: "a@a.com",
      owner: "a@a.com",
      createdAt: "2025-06-02",
    },
  ]

  const allTeamMembers: TeamMember[] = [
    {
      id: "1",
      name: "Felipe Pereira A.",
      email: "felipe14chile@gmail.com",
      role: "Project Manager / Developer",
      avatar: "FP",
      status: "online",
      projects: ["1", "2"],
      joinDate: "2024-01-15",
    },
    {
      id: "2",
      name: "Testing User",
      email: "a@a.com",
      role: "Frontend Developer",
      avatar: "TU",
      status: "online",
      projects: ["3"],
      joinDate: "2024-03-20",
    },
    {
      id: "3",
      name: "Juan Díaz",
      email: "juan.diaz@email.com",
      role: "Backend Developer",
      avatar: "JD",
      status: "away",
      projects: ["1", "3"],
      joinDate: "2024-02-10",
    },
    {
      id: "4",
      name: "María Sánchez",
      email: "maria.sanchez@email.com",
      role: "UI/UX Designer",
      avatar: "MS",
      status: "offline",
      projects: ["1"],
      joinDate: "2024-02-15",
    },
    {
      id: "5",
      name: "Ana Rodríguez",
      email: "ana.rodriguez@email.com",
      role: "Data Scientist",
      avatar: "AR",
      status: "online",
      projects: ["2"],
      joinDate: "2024-03-01",
    },
    {
      id: "6",
      name: "Luis Martínez",
      email: "luis.martinez@email.com",
      role: "ML Engineer",
      avatar: "LM",
      status: "online",
      projects: ["2"],
      joinDate: "2024-03-05",
    },
  ]

  const allDocuments: Document[] = [
    {
      id: "1",
      name: "Especificaciones Técnicas.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedBy: "felipe14chile@gmail.com",
      uploadedAt: "2025-06-01T10:30:00",
      project: "Análisis de Tachas",
      url: "#",
    },
    {
      id: "2",
      name: "Diseño UI Mockups.fig",
      type: "Figma",
      size: "15.2 MB",
      uploadedBy: "maria.sanchez@email.com",
      uploadedAt: "2025-06-02T14:15:00",
      project: "Análisis de Tachas",
      url: "#",
    },
    {
      id: "3",
      name: "Dataset Entrenamiento.csv",
      type: "CSV",
      size: "45.8 MB",
      uploadedBy: "ana.rodriguez@email.com",
      uploadedAt: "2025-06-03T09:20:00",
      project: "Detector de Neumonía",
      url: "#",
    },
    {
      id: "4",
      name: "Propuesta Cliente.docx",
      type: "Word",
      size: "1.1 MB",
      uploadedBy: "a@a.com",
      uploadedAt: "2025-06-04T16:45:00",
      project: "Proyecto Web Cliente A",
      url: "#",
    },
  ]

  const allMessages: Message[] = [
    {
      id: "1",
      sender: "juan.diaz@email.com",
      recipient: "felipe14chile@gmail.com",
      subject: "Actualización del algoritmo",
      content: "He actualizado el algoritmo con los nuevos parámetros. Por favor revisa cuando tengas tiempo.",
      timestamp: "2025-06-04T15:42:00",
      read: false,
      starred: false,
      archived: false,
    },
    {
      id: "2",
      sender: "maria.sanchez@email.com",
      recipient: "felipe14chile@gmail.com",
      subject: "Documentación lista",
      content: "La documentación está lista para revisión. He añadido ejemplos para todos los endpoints de la API.",
      timestamp: "2025-06-04T14:30:00",
      read: false,
      starred: true,
      archived: false,
    },
    {
      id: "3",
      sender: "felipe14chile@gmail.com",
      recipient: "a@a.com",
      subject: "Reunión de seguimiento",
      content: "Necesitamos programar una reunión para revisar el progreso del proyecto web.",
      timestamp: "2025-06-04T12:15:00",
      read: true,
      starred: false,
      archived: false,
    },
  ]

  const allCalendarEvents: CalendarEvent[] = [
    {
      id: "1",
      title: "Reunión de equipo",
      description: "Revisión semanal del progreso",
      date: "2025-06-05",
      time: "10:00",
      duration: 60,
      attendees: ["felipe14chile@gmail.com", "juan.diaz@email.com", "maria.sanchez@email.com"],
      type: "meeting",
      project: "Análisis de Tachas",
      owner: "felipe14chile@gmail.com",
    },
    {
      id: "2",
      title: "Entrega de informe",
      description: "Entrega del informe mensual",
      date: "2025-06-08",
      time: "15:00",
      duration: 30,
      attendees: ["felipe14chile@gmail.com", "ana.rodriguez@email.com"],
      type: "deadline",
      project: "Detector de Neumonía",
      owner: "felipe14chile@gmail.com",
    },
    {
      id: "3",
      title: "Presentación al cliente",
      description: "Demostración del progreso al cliente",
      date: "2025-06-10",
      time: "14:30",
      duration: 90,
      attendees: ["a@a.com", "juan.diaz@email.com"],
      type: "meeting",
      project: "Proyecto Web Cliente A",
      owner: "a@a.com",
    },
  ]

  // Filter data based on user permissions
  const getFilteredData = <T extends { owner: string }>(data: T[]): T[] => {
    if (user?.role === "superAdmin") {
      return selectedUser === "all" ? data : data.filter((item) => item.owner === selectedUser)
    }
    return data.filter((item) => item.owner === user?.email)
  }

  const getFilteredTasks = (): Task[] => {
    if (user?.role === "superAdmin") {
      return selectedUser === "all"
        ? allTasks
        : allTasks.filter((task) => task.owner === selectedUser || task.assignee === selectedUser)
    }
    return allTasks.filter((task) => task.owner === user?.email || task.assignee === user?.email)
  }

  const getFilteredMessages = (): Message[] => {
    if (user?.role === "superAdmin") {
      return selectedUser === "all"
        ? allMessages
        : allMessages.filter((msg) => msg.sender === selectedUser || msg.recipient === selectedUser)
    }
    return allMessages.filter((msg) => msg.sender === user?.email || msg.recipient === user?.email)
  }

  const getFilteredEvents = (): CalendarEvent[] => {
    if (user?.role === "superAdmin") {
      return selectedUser === "all"
        ? allCalendarEvents
        : allCalendarEvents.filter((event) => event.owner === selectedUser || event.attendees.includes(selectedUser))
    }
    return allCalendarEvents.filter(
      (event) => event.owner === user?.email || event.attendees.includes(user?.email || ""),
    )
  }

  const projects = getFilteredData(allProjects)
  const tasks = getFilteredTasks()
  // const documents = getFilteredData(allDocuments)
  const messages = getFilteredMessages()
  const calendarEvents = getFilteredEvents()

  // Format time and date
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString(language === "en" ? "en-US" : "es-ES", {
      hour12: language !== "en",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "in-progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "pending":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "paused":
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      case "medium":
        return "bg-amber-500/20 text-amber-400 border-amber-500/30"
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      default:
        return "bg-slate-500/20 text-slate-400 border-slate-500/30"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500"
      case "away":
        return "bg-amber-500"
      case "offline":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!user) {
    return null
  }

  // Obtener imagen de perfil desde localStorage
  const profileImage =
    user?.email ? (typeof window !== "undefined" ? localStorage.getItem(`profileImage-${user.email}`) : null) : null

  const renderContent = () => {
    switch (activeSection) {
      case "projects":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {language === "en"
                  ? "Projects"
                  : language === "eu"
                  ? "Proiektuak"
                  : "Proyectos"}
              </h2>
              <div className="flex items-center space-x-4">
                {user.role === "superAdmin" && (
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === "en"
                          ? "All Users"
                          : language === "eu"
                          ? "Erabiltzaile Guztiak"
                          : "Todos los Usuarios"}
                      </SelectItem>
                      {allTeamMembers.map((member) => (
                        <SelectItem key={member.email} value={member.email}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {language === "en"
                    ? "New Project"
                    : language === "eu"
                    ? "Proiektu Berria"
                    : "Nuevo Proyecto"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                    <p className="text-white/70 text-sm">{project.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/70">
                            {language === "en" ? "Progress" : "Progreso"}
                          </span>
                          <span className="text-sm text-white">{project.progress}%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-white/70">
                            {language === "en" ? "Tasks" : "Tareas"}
                          </span>
                          <p className="text-white font-medium">
                            {project.completedTasks}/{project.tasks}
                          </p>
                        </div>
                        <div>
                          <span className="text-white/70">
                            {language === "en" ? "Due Date" : "Fecha Límite"}
                          </span>
                          <p className="text-white font-medium">
                            {new Date(project.dueDate).toLocaleDateString(language === "en" ? "en-US" : "es-ES")}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 3).map((email, i) => {
                            const member = allTeamMembers.find((m) => m.email === email)
                            return (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-medium border-2 border-white/20"
                              >
                                {member?.avatar || email.charAt(0).toUpperCase()}
                              </div>
                            )
                          })}
                          {project.team.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium border-2 border-white/20">
                              +{project.team.length - 3}
                            </div>
                          )}
                        </div>
                        <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "tasks":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {language === "en"
                  ? "Tasks"
                  : language === "eu"
                  ? "Zereginak"
                  : "Tareas"}
              </h2>
              <div className="flex items-center space-x-4">
                {user.role === "superAdmin" && (
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === "en"
                          ? "All Users"
                          : language === "eu"
                          ? "Erabiltzaile Guztiak"
                          : "Todos los Usuarios"}
                      </SelectItem>
                      {allTeamMembers.map((member) => (
                        <SelectItem key={member.email} value={member.email}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {language === "en"
                    ? "New Task"
                    : language === "eu"
                    ? "Zeregin Berriak"
                    : "Nueva Tarea"}
                </Button>
              </div>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-white/10">
                  {tasks.map((task) => (
                    <div key={task.id} className="p-4 hover:bg-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-4 h-4 rounded-full border ${
                              task.status === "completed"
                                ? "bg-green-500/50 border-green-500"
                                : "bg-transparent border-white/30"
                            } flex items-center justify-center`}
                          >
                            {task.status === "completed" && <CheckCircle className="h-3 w-3 text-white" />}
                          </div>
                          <div>
                            <h3
                              className={`font-medium ${
                                task.status === "completed" ? "text-white/50 line-through" : "text-white"
                              }`}
                            >
                              {task.title}
                            </h3>
                            <p className="text-sm text-white/70">{task.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-xs text-white/50">{task.project}</span>
                              <span className="text-xs text-white/50">
                                {allTeamMembers.find((m) => m.email === task.assignee)?.name || task.assignee}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                          <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          <span className="text-xs text-white/50">
                            {new Date(task.dueDate).toLocaleDateString(language === "en" ? "en-US" : "es-ES")}
                          </span>
                          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "calendar":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {language === "en"
                  ? "Calendar"
                  : language === "eu"
                  ? "Egutegia"
                  : "Calendario"}
              </h2>
              <div className="flex items-center space-x-4">
                {user.role === "superAdmin" && (
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === "en"
                          ? "All Users"
                          : language === "eu"
                          ? "Erabiltzaile Guztiak"
                          : "Todos los Usuarios"}
                      </SelectItem>
                      {allTeamMembers.map((member) => (
                        <SelectItem key={member.email} value={member.email}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  {language === "en"
                    ? "New Event"
                    : language === "eu"
                    ? "Gertaera Berria"
                    : "Nuevo Evento"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">
                      {language === "en"
                        ? "Upcoming Events"
                        : language === "eu"
                        ? "Hurrengo Gertaerak"
                        : "Próximos Eventos"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {calendarEvents.map((event) => {
                        const eventDate = new Date(`${event.date}T${event.time}:00`)
                        return (
                          <div
                            key={event.id}
                            className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 border border-white/10"
                          >
                            <div
                              className={`w-3 h-3 rounded-full mt-2 ${
                                event.type === "meeting"
                                  ? "bg-blue-500"
                                  : event.type === "deadline"
                                  ? "bg-red-500"
                                  : "bg-amber-500"
                              }`}
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-white">{event.title}</h3>
                              <p className="text-sm text-white/70 mt-1">{event.description}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-white/50">
                                <span>
                                  {eventDate.toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                  })}
                                </span>
                                <span>{event.time}</span>
                                <span>{event.duration} min</span>
                                {event.project && <span>{event.project}</span>}
                              </div>
                              <div className="flex -space-x-1 mt-2">
                                {event.attendees.slice(0, 3).map((email, i) => {
                                  const member = allTeamMembers.find((m) => m.email === email)
                                  return (
                                    <div
                                      key={i}
                                      className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-medium border border-white/20"
                                    >
                                      {member?.avatar || email.charAt(0).toUpperCase()}
                                    </div>
                                  )
                                })}
                                {event.attendees.length > 3 && (
                                  <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-xs font-medium border border-white/20">
                                    +{event.attendees.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white text-base">
                      {language === "en" ? "Quick Stats" : "Estadísticas Rápidas"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center p-4 rounded-lg bg-white/5">
                        <div className="text-2xl font-bold text-purple-300">{calendarEvents.length}</div>
                        <div className="text-sm text-white/70">
                          {language === "en" ? "Total Events" : "Eventos Totales"}
                        </div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-white/5">
                        <div className="text-2xl font-bold text-blue-300">
                          {calendarEvents.filter((e) => e.type === "meeting").length}
                        </div>
                        <div className="text-sm text-white/70">{language === "en" ? "Meetings" : "Reuniones"}</div>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-white/5">
                        <div className="text-2xl font-bold text-red-300">
                          {calendarEvents.filter((e) => e.type === "deadline").length}
                        </div>
                        <div className="text-sm text-white/70">{language === "en" ? "Deadlines" : "Fechas Límite"}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )

      case "team":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {language === "en" ? "Team" : language === "eu" ? "Taldea" : "Equipo"}
              </h2>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="h-4 w-4 mr-2" />
                {language === "en" ? "Add Member" : language === "eu" ? "Kidea Gehitu" : "Añadir Miembro"}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allTeamMembers.map((member) => (
                <Card key={member.id} className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="relative">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-purple-700 text-white">{member.avatar}</AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusIcon(member.status)}`}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{member.name}</h3>
                        <p className="text-sm text-white/70">{member.role}</p>
                        <p className="text-xs text-white/50">{member.status}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-white/50" />
                        <span className="text-white/70">{member.email}</span>
                      </div>

                      <div>
                        <span className="text-sm text-white/70">
                          {language === "en" ? "Projects:" : language === "eu" ? "Proiektuak:" : "Proyectos:"}
                        </span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {member.projects.map((projectId) => {
                            const project = allProjects.find((p) => p.id === projectId)
                            return project ? (
                              <Badge
                                key={projectId}
                                variant="outline"
                                className="text-xs bg-white/10 text-white/70 border-white/20"
                              >
                                {project.name}
                              </Badge>
                            ) : null
                          })}
                        </div>
                      </div>

                      <div className="text-xs text-white/50">
                        {language === "en" ? "Joined:" : language === "eu" ? "Bat egin zuen:" : "Se unió:"}{" "}
                        {new Date(member.joinDate).toLocaleDateString(language === "en" ? "en-US" : "es-ES")}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )

      case "documents":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {language === "en"
                  ? "Documents"
                  : language === "eu"
                  ? "Dokumentuak"
                  : "Documentos"}
              </h2>
              <div className="flex items-center space-x-4">
                {user.role === "superAdmin" && (
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === "en"
                          ? "All Users"
                          : language === "eu"
                          ? "Erabiltzaile Guztiak"
                          : "Todos los Usuarios"}
                      </SelectItem>
                      {allTeamMembers.map((member) => (
                        <SelectItem key={member.email} value={member.email}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Upload className="h-4 w-4 mr-2" />
                  {language === "en" ? "Upload" : language === "eu" ? "Igo" : "Subir"}
                </Button>
              </div>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-white/10">
                  {/* {documents.map((doc) => (
                    <div key={doc.id} className="p-4 hover:bg-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-purple-300" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">{doc.name}</h3>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-white/70">
                              <span>{doc.type}</span>
                              <span>{doc.size}</span>
                              <span>{doc.project}</span>
                            </div>
                            <div className="text-xs text-white/50 mt-1">
                              {language === "en" ? "Uploaded by" : language === "eu" ? "Kargatu zuen" : "Subido por"}{" "}
                              {allTeamMembers.find((m) => m.email === doc.uploadedBy)?.name || doc.uploadedBy} •{" "}
                              {new Date(doc.uploadedAt).toLocaleDateString(language === "en" ? "en-US" : "es-ES")}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "messages":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">
                {language === "en"
                  ? "Messages"
                  : language === "eu"
                  ? "Mezuak"
                  : "Mensajes"}
              </h2>
              <div className="flex items-center space-x-4">
                {user.role === "superAdmin" && (
                  <Select value={selectedUser} onValueChange={setSelectedUser}>
                    <SelectTrigger className="w-48 bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === "en"
                          ? "All Users"
                          : language === "eu"
                          ? "Erabiltzaile Guztiak"
                          : "Todos los Usuarios"}
                      </SelectItem>
                      {allTeamMembers.map((member) => (
                        <SelectItem key={member.email} value={member.email}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Send className="h-4 w-4 mr-2" />
                  {language === "en" ? "Compose" : language === "eu" ? "Idatzi" : "Redactar"}
                </Button>
              </div>
            </div>

            <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="divide-y divide-white/10">
                  {messages.map((message) => (
                    <div key={message.id} className={`p-4 hover:bg-white/5 ${!message.read ? "bg-white/5" : ""}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-purple-700 text-white">
                              {allTeamMembers.find((m) => m.email === message.sender)?.avatar ||
                                message.sender.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className={`font-medium ${!message.read ? "text-white" : "text-white/70"}`}>
                                {allTeamMembers.find((m) => m.email === message.sender)?.name || message.sender}
                              </h3>
                              {!message.read && <div className="w-2 h-2 rounded-full bg-purple-400" />}
                              {message.starred && <Star className="h-4 w-4 text-amber-400 fill-current" />}
                            </div>
                            <h4
                              className={`text-sm mt-1 ${!message.read ? "text-white font-medium" : "text-white/70"}`}
                            >
                              {message.subject}
                            </h4>
                            <p className="text-sm text-white/60 mt-1 line-clamp-2">{message.content}</p>
                            <div className="text-xs text-white/50 mt-2">
                              {new Date(message.timestamp).toLocaleDateString(language === "en" ? "en-US" : "es-ES", {
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                            <Star className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                            <Archive className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-white/70 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )

      case "settings":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">
              {language === "en" ? "Settings" : language === "eu" ? "Ezarpenak" : "Configuración"}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">
                    {language === "en"
                      ? "Profile Settings"
                      : language === "eu"
                      ? "Profilaren Ezarpenak"
                      : "Configuración del Perfil"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-white/70">
                      {language === "en" ? "Name" : language === "eu" ? "Izena" : "Nombre"}
                    </Label>
                    <Input
                      defaultValue={user.name}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">
                      {language === "en" ? "Email" : language === "eu" ? "Posta" : "Correo"}
                    </Label>
                    <Input
                      defaultValue={user.email}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/40"
                    />
                  </div>
                  <div>
                    <Label className="text-white/70">
                      {language === "en" ? "Role" : language === "eu" ? "Rola" : "Rol"}
                    </Label>
                    <Input
                      defaultValue={user.role === "superAdmin" ? "Super Administrator" : "User"}
                      disabled
                      className="bg-white/5 border-white/10 text-white/50"
                    />
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    {language === "en" ? "Save Changes" : language === "eu" ? "Aldaketak Gorde" : "Guardar Cambios"}
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">
                    {language === "en" ? "Preferences" : language === "eu" ? "Hobespenak" : "Preferencias"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white/70">
                        {language === "en" ? "Email Notifications" : language === "eu" ? "Posta Elektronikoaren Jakinarazpenak" : "Notificaciones por Email"}
                      </Label>
                      <p className="text-sm text-white/50">
                        {language === "en" ? "Receive email updates" : language === "eu" ? "Jasotako eguneraketak posta bidez" : "Recibir actualizaciones por email"}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white/70">
                        {language === "en" ? "Push Notifications" : language === "eu" ? "Push Jakinarazpenak" : "Notificaciones Push"}
                      </Label>
                      <p className="text-sm text-white/50">
                        {language === "en" ? "Browser notifications" : language === "eu" ? "Nabigatzailearen jakinarazpenak" : "Notificaciones del navegador"}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white/70">
                        {language === "en" ? "Auto-save" : language === "eu" ? "Gordetze Automatikoa" : "Guardado Automático"}
                      </Label>
                      <p className="text-sm text-white/50">
                        {language === "en" ? "Automatically save changes" : language === "eu" ? "Aldaketak automatikoki gorde" : "Guardar cambios automáticamente"}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-white/70">
                        {language === "en" ? "Dark Mode" : language === "eu" ? "Modu Iluna" : "Modo Oscuro"}
                      </Label>
                      <p className="text-sm text-white/50">
                        {language === "en" ? "Use dark theme" : language === "eu" ? "Erabili gai iluna" : "Usar tema oscuro"}
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              {user.role === "superAdmin" && (
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-purple-300" />
                      {language === "en" ? "Admin Settings" : language === "eu" ? "Administratzailearen Ezarpenak" : "Configuración de Administrador"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/70">
                            {language === "en" ? "User Management" : language === "eu" ? "Erabiltzaileen Kudeaketa" : "Gestión de Usuarios"}
                          </Label>
                          <p className="text-sm text-white/50">
                            {language === "en" ? "Manage user accounts" : language === "eu" ? "Erabiltzaile kontuak kudeatu" : "Gestionar cuentas de usuario"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/70">
                            {language === "en" ? "Project Oversight" : language === "eu" ? "Proiektuen Gainbegiratzea" : "Supervisión de Proyectos"}
                          </Label>
                          <p className="text-sm text-white/50">
                            {language === "en" ? "View all projects" : language === "eu" ? "Proiektu guztiak ikusi" : "Ver todos los proyectos"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/70">
                            {language === "en" ? "System Logs" : language === "eu" ? "Sistemaren Erregistroak" : "Registros del Sistema"}
                          </Label>
                          <p className="text-sm text-white/50">
                            {language === "en" ? "Access system logs" : language === "eu" ? "Sistemaren erregistroetara sartu" : "Acceder a registros del sistema"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label className="text-white/70">
                            {language === "en" ? "Data Export" : language === "eu" ? "Datuen Esportazioa" : "Exportación de Datos"}
                          </Label>
                          <p className="text-sm text-white/50">
                            {language === "en" ? "Export user data" : language === "eu" ? "Erabiltzaileen datuak esportatu" : "Exportar datos de usuario"}
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <div className="flex items-center space-x-4">
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          {language === "en" ? "Export All Data" : language === "eu" ? "Datu Guztiak Esportatu" : "Exportar Todos los Datos"}
                        </Button>
                        <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          {language === "en" ? "System Backup" : language === "eu" ? "Sistemaren Babeskopia" : "Respaldo del Sistema"}
                        </Button>
                        <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                          {language === "en" ? "Reset System" : language === "eu" ? "Sistema Berrezarri" : "Reiniciar Sistema"}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )

      default:
        return (
          <div className="space-y-6">
            {/* Welcome section */}
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
              <CardHeader className="border-b border-white/10 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <User className="mr-2 h-5 w-5 text-purple-300" />
                    {language === "en"
                      ? "Welcome, "
                      : language === "eu"
                        ? "Ongi etorri, "
                        : "Bienvenido, "} {user.name.split(" ")[0]}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-purple-500/20 text-purple-300 border-purple-500/30 text-xs">
                      <div className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-1 animate-pulse"></div>
                      {language === "en" ? "ONLINE" : "EN LÍNEA"}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <MetricCard
                    title={language === "en" ? "Active Projects" : language === "eu" ? "Proiektu Aktiboak" : "Proyectos Activos"}
                    value={projects.length.toString()}
                    icon={Folder}
                    color="purple"
                    detail={
                      language === "en"
                        ? `${projects.filter((p) => p.status === "active").length} in progress`
                        : language === "eu"
                        ? `${projects.filter((p) => p.status === "active").length} aurrera doazen proiektuak`
                        : `${projects.filter((p) => p.status === "active").length} en progreso`
                    }
                  />
                  <MetricCard
                    title={language === "en" ? "Pending Tasks" : language === "eu" ? "Zeregin Zain" : "Tareas Pendientes"}
                    value={tasks.filter((t) => t.status !== "completed").length.toString()}
                    icon={CheckCircle}
                    color="violet"
                    detail={
                      language === "en"
                        ? `${tasks.filter((t) => t.priority === "high").length} high priority`
                        : language === "eu"
                        ? `${tasks.filter((t) => t.priority === "high").length} lehentasun handikoak`
                        : `${tasks.filter((t) => t.priority === "high").length} alta prioridad`
                    }
                  />
                  <MetricCard
                    title={language === "en" ? "Upcoming Events" : language === "eu" ? "Hurrengo Gertaerak" : "Próximos Eventos"}
                    value={calendarEvents.length.toString()}
                    icon={Calendar}
                    color="indigo"
                    detail={language === "en" ? "Next: Team Meeting" : language === "eu" ? "Hurrengoa: Taldearen Bilera" : "Próximo: Reunión de equipo"}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Quick overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    {language === "en" ? "Recent Activity" : language === "eu" ? "Aktibitate Berriak" : "Actividad Reciente"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-medium">
                        FP
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          {language === "en" ? "Updated project progress" : language === "eu" ? "Proiektuaren aurrerapena eguneratu du" : "Actualizó el progreso del proyecto"}
                        </p>
                        <p className="text-xs text-white/50">2 {language === "en" ? "hours ago" : language === "eu" ? "ordu batzuen buruan" : "horas atrás"}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-medium">
                        JD
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          {language === "en" ? "Completed task documentation" : language === "eu" ? "Zeregin dokumentazioa osatu du" : "Completó la documentación de tarea"}
                        </p>
                        <p className="text-xs text-white/50">4 {language === "en" ? "hours ago" : language === "eu" ? "ordu batzuen buruan" : "horas atrás"}</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-xs font-medium">
                        MS
                      </div>
                      <div>
                        <p className="text-sm text-white">
                          {language === "en" ? "Uploaded new design files" : language === "eu" ? "Diseinu fitxategi berriak igo ditu" : "Subió nuevos archivos de diseño"}
                        </p>
                        <p className="text-xs text-white/50">6 {language === "en" ? "hours ago" : language === "eu" ? "ordu batzuen buruan" : "horas atrás"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white text-lg">
                    {language === "en" ? "Today's Schedule" : language === "eu" ? "Gaurko Egutegia" : "Horario de Hoy"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {calendarEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        <div>
                          <p className="text-sm text-white">{event.title}</p>
                          <p className="text-xs text-white/50">
                            {event.time} - {event.project}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900 text-white relative overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 border-4 border-purple-500/30 rounded-full animate-ping"></div>
              <div className="absolute inset-2 border-4 border-t-purple-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-4 border-4 border-r-violet-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin-slow"></div>
              <div className="absolute inset-6 border-4 border-b-indigo-500 border-t-transparent border-r-transparent border-l-transparent rounded-full animate-spin-slower"></div>
              <div className="absolute inset-8 border-4 border-l-blue-500 border-t-transparent border-r-transparent border-b-transparent rounded-full animate-spin"></div>
            </div>
            <div className="mt-4 text-purple-400 font-mono text-sm tracking-wider">
              {language === "en" ? "LOADING DASHBOARD" : "CARGANDO DASHBOARD"}
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-between py-4 border-b border-white/10 mb-6">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <Command className="h-8 w-8 text-purple-300" />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent">
                {language === "en" ? "Portfolio Dashboard" : language === "eu" ? "Aginte-Panel" : "Panel de Control"}
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center space-x-1 bg-white/10 rounded-full px-3 py-1.5 border border-white/20 backdrop-blur-sm">
              <Search className="h-4 w-4 text-white/60" />
              <input
                type="text"
                placeholder={language === "en" ? "Search..." : "Buscar..."}
                className="bg-transparent border-none focus:outline-none text-sm w-40 placeholder:text-white/40 text-white"
              />
            </div>

            <div className="flex items-center space-x-3">
              <LanguageSelector />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-white/70 hover:text-white hover:bg-white/10"
                    >
                      <Bell className="h-5 w-5" />
                      <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-400 rounded-full animate-pulse"></span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{language === "en" ? "Notifications" : "Notificaciones"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <Avatar>
                <AvatarFallback className="bg-purple-700 text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 lg:col-span-2">
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm h-full">
              <CardContent className="p-4">
                <nav className="space-y-2">
                  <NavItem
                    icon={Command}
                    label={language === "en" ? "Dashboard" : language === "eu" ? "Kontsola" : "Panel"}
                    active={activeSection === "dashboard"}
                    onClick={() => setActiveSection("dashboard")}
                  />
                  <NavItem
                    icon={Folder}
                    label={language === "en" ? "Projects" : language === "eu" ? "Proiektuak" : "Proyectos"}
                    active={activeSection === "projects"}
                    onClick={() => setActiveSection("projects")}
                  />
                  <NavItem
                    icon={CheckCircle}
                    label={language === "en" ? "Tasks" : language === "eu" ? "Zereginak" : "Tareas"}
                    active={activeSection === "tasks"}
                    onClick={() => setActiveSection("tasks")}
                  />
                  <NavItem
                    icon={Calendar}
                    label={language === "en" ? "Calendar" : language === "eu" ? "Egutegia" : "Calendario"}
                    active={activeSection === "calendar"}
                    onClick={() => setActiveSection("calendar")}
                  />
                  <NavItem
                    icon={Users}
                    label={language === "en" ? "Team" : language === "eu" ? "Taldea" : "Equipo"}
                    active={activeSection === "team"}
                    onClick={() => setActiveSection("team")}
                  />
                  <NavItem
                    icon={FileText}
                    label={language === "en" ? "Documents" : language === "eu" ? "Dokumentuak" : "Documentos"}
                    active={activeSection === "documents"}
                    onClick={() => setActiveSection("documents")}
                  />
                  <NavItem
                    icon={MessageSquare}
                    label={language === "en" ? "Messages" : language === "eu" ? "Mezuak" : "Mensajes"}
                    active={activeSection === "messages"}
                    onClick={() => setActiveSection("messages")}
                  />
                  <NavItem
                    icon={Settings}
                    label={language === "en" ? "Settings" : language === "eu" ? "Ezarpenak" : "Configuración"}
                    active={activeSection === "settings"}
                    onClick={() => setActiveSection("settings")}
                  />
                </nav>

                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-xs text-white/50 mb-2 font-mono">
                    {language === "en" ? "PROJECTS STATUS" : language === "eu" ? "PROIEKTUEN ESTATUSA" : "ESTADO DE PROYECTOS"}
                  </div>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="text-xs text-white/70 truncate">{project.name}</div>
                          <div className="text-xs text-white/50">{project.progress}%</div>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content area */}
          <div className="col-span-12 md:col-span-9 lg:col-span-7">{renderContent()}</div>

          {/* Right sidebar */}
          <div className="col-span-12 lg:col-span-3">
            <div className="grid gap-6">
              {/* User profile */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="bg-gradient-to-br from-purple-800 to-indigo-900 p-6 border-b border-white/10">
                    <div className="flex flex-col items-center">
                      <Avatar className="h-20 w-20 mb-4">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="object-cover w-full h-full rounded-full"
                          />
                        ) : (
                          <AvatarFallback className="bg-purple-700 text-white text-xl">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-white">{user.name}</h3>
                        <p className="text-sm text-white/70">{user.email}</p>
                        <Badge className="mt-2 bg-purple-500/20 text-purple-300 border-purple-500/30">
                          {user.role === "superAdmin" ? "Super Administrator" : "User"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 rounded-md p-3 border border-white/10">
                        <div className="text-xs text-white/50 mb-1">{language === "en" ? "Projects" : language === "eu" ? "Proiektuak" : "Proyectos"}</div>
                        <div className="text-sm font-mono text-white">{projects.length}</div>
                      </div>
                      <div className="bg-white/5 rounded-md p-3 border border-white/10">
                        <div className="text-xs text-white/50 mb-1">{language === "en" ? "Tasks" : language === "eu" ? "Zereginak" : "Tareas"}</div>
                        <div className="text-sm font-mono text-white">{tasks.length}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date and time */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-xs text-white/50 mb-1 font-mono">
                      {language === "en" ? "CURRENT DATE & TIME" : language === "eu" ? "ORAINKO DATA ETA ORDUA" : "FECHA Y HORA ACTUAL"}
                    </div>
                    <div className="text-2xl font-mono text-purple-300 mb-1">{formatTime(currentTime)}</div>
                    <div className="text-sm text-white/70">{formatDate(currentTime)}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick stats */}
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-white text-base">
                    {language === "en" ? "Quick Stats" : language === "eu" ? "Estatistika Azkarrak" : "Estadísticas Rápidas"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">
                        {language === "en" ? "Active Projects" : language === "eu" ? "Proiektu Aktiboak" : "Proyectos Activos"}
                      </span>
                      <span className="text-sm font-medium text-purple-300">
                        {projects.filter((p) => p.status === "active").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">
                        {language === "en" ? "Pending Tasks" : language === "eu" ? "Zereginak Zain" : "Tareas Pendientes"}
                      </span>
                      <span className="text-sm font-medium text-amber-300">
                        {tasks.filter((t) => t.status === "pending").length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">
                        {language === "en" ? "Team Members" : language === "eu" ? "Taldeko Kideak" : "Miembros del Equipo"}
                      </span>
                      <span className="text-sm font-medium text-blue-300">{allTeamMembers.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white/70">
                        {language === "en" ? "Unread Messages" : language === "eu" ? "Iragan Mezua" : "Mensajes No Leídos"}
                      </span>
                      <span className="text-sm font-medium text-red-300">{messages.filter((m) => !m.read).length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component for nav items
function NavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: LucideIcon
  label: string
  active?: boolean
  onClick?: () => void
}) {
  return (
    <Button
      variant="ghost"
      className={`w-full justify-start ${
        active ? "bg-white/10 text-purple-300" : "text-white/70 hover:text-white hover:bg-white/5"
      }`}
      onClick={onClick}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </Button>
  )
}

// Component for metric cards
function MetricCard({
  title,
  value,
  icon: Icon,
  color,
  detail,
}: {
  title: string
  value: string
  icon: LucideIcon
  color: string
  detail: string
}) {
  const getColor = () => {
    switch (color) {
      case "purple":
        return "from-purple-500 to-violet-500 border-purple-500/30"
      case "violet":
        return "from-violet-500 to-indigo-500 border-violet-500/30"
      case "indigo":
        return "from-indigo-500 to-blue-500 border-indigo-500/30"
      default:
        return "from-purple-500 to-violet-500 border-purple-500/30"
    }
  }

  return (
    <div className={`bg-white/5 rounded-lg border border-white/10 p-4 relative overflow-hidden`}>
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm text-white/70">{title}</div>
        <Icon className={`h-5 w-5 text-${color}-300`} />
      </div>
      <div className="text-2xl font-bold mb-1 bg-gradient-to-r bg-clip-text text-transparent from-white to-white/80">
        {value}
      </div>
      <div className="text-xs text-white/50">{detail}</div>
      <div
        className={`absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-gradient-to-r opacity-20 blur-xl ${getColor()}`}
      ></div>
    </div>
  )
}
