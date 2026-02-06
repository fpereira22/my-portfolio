"use client"

interface User {
  name: string
  email: string
  password: string
  createdAt: string
  role?: "admin" | "user" | "superAdmin"
}

const USERS_KEY = "portfolio_users"

export class AuthService {
  // Usuarios predefinidos
  private static predefinedUsers: User[] = [
    {
      name: "Felipe Pereira A.",
      email: "felipe14chile@gmail.com",
      password: "F.pereira24$",
      createdAt: new Date().toISOString(),
      role: "superAdmin",
    },
    {
      name: "Testing",
      email: "a@a.com",
      password: "123456",
      createdAt: new Date().toISOString(),
      role: "user",
    },
  ]

  private static getUsers(): User[] {
    if (typeof window === "undefined") return []

    try {
      const users = localStorage.getItem(USERS_KEY)
      if (!users) {
        // Si no hay usuarios, inicializar con los predefinidos
        this.saveUsers(this.predefinedUsers)
        return this.predefinedUsers
      }
      return JSON.parse(users)
    } catch {
      return []
    }
  }

  private static saveUsers(users: User[]): void {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      // También crear un archivo de texto para backup
      this.downloadUsersBackup(users)
    } catch (error) {
      console.error("Error saving users:", error)
    }
  }

  private static downloadUsersBackup(users: User[]): void {
    try {
      const usersText = users
        .map((user) => `Email: ${user.email}, Name: ${user.name}, Created: ${user.createdAt}`)
        .join("\n")

      const blob = new Blob([usersText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)

      // Solo descargar si hay usuarios nuevos (opcional)
      console.log("Users backup created:", usersText)
    } catch (error) {
      console.error("Error creating backup:", error)
    }
  }

  static async register(name: string, email: string, password: string): Promise<{ success: boolean; message: string }> {
    const users = this.getUsers()

    // Verificar si el email ya existe
    const existingUser = users.find((user) => user.email.toLowerCase() === email.toLowerCase())
    if (existingUser) {
      return { success: false, message: "Este email ya está registrado" }
    }

    // Validaciones básicas
    if (!name.trim()) {
      return { success: false, message: "El nombre es requerido" }
    }

    if (!email.includes("@")) {
      return { success: false, message: "Email inválido" }
    }

    if (password.length < 6) {
      return { success: false, message: "La contraseña debe tener al menos 6 caracteres" }
    }

    // Crear nuevo usuario
    const newUser: User = {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password, // En producción, esto debería estar hasheado
      createdAt: new Date().toISOString(),
      role: "user",
    }

    users.push(newUser)
    this.saveUsers(users)

    return { success: true, message: "Cuenta creada exitosamente" }
  }

  static async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string; user?: Omit<User, "password"> }> {
    const users = this.getUsers()

    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim() && u.password === password)

    if (!user) {
      return { success: false, message: "Email o contraseña incorrectos" }
    }

    // Retornar usuario sin la contraseña
    const { password: _, ...userWithoutPassword } = user
    return {
      success: true,
      message: "Login exitoso",
      user: userWithoutPassword,
    }
  }

  static getAllUsers(): Omit<User, "password">[] {
    const users = this.getUsers()
    return users.map(({ password, ...user }) => user)
  }

  // Método para obtener el usuario de prueba para la combinación de teclas
  static getTestUser(): { name: string; email: string; password: string } {
    return {
      name: "Testing",
      email: "a@a.com",
      password: "123456",
    }
  }

  // Añadir método para obtener el superadmin
  static getSuperAdmin(): { name: string; email: string; password: string } {
    return {
      name: "Felipe Pereira A.",
      email: "felipe14chile@gmail.com",
      password: "F.pereira24$",
    }
  }
}
