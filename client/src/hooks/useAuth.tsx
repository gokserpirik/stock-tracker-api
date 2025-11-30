import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

interface DecodedToken {
  id: number
  email?: string
  iat?: number
  exp?: number
}

interface AuthContextType {
  isAuthenticated: boolean
  token: string | null
  userEmail: string | null
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'))
  const [userEmail, setUserEmail] = useState<string | null>(null)
  
  // If token exists, user is authenticated
  const isAuthenticated = !!token

  useEffect(() => {
    // Sync state with localStorage whenever token changes
    if (token) {
      localStorage.setItem('token', token)
      
      // Decode token to get user email
      try {
        const decoded = jwtDecode<DecodedToken>(token)
        setUserEmail(decoded.email || null)
      } catch (err) {
        console.error('Failed to decode token', err)
        setUserEmail(null)
      }
    } else {
      localStorage.removeItem('token')
      setUserEmail(null)
    }
  }, [token])

  const login = (newToken: string) => {
    setToken(newToken)
  }

  const logout = () => {
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// The Hook to use the AuthContext
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}