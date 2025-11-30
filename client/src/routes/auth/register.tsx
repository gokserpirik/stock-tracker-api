import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useEffect } from 'react'
import { useForm } from '@tanstack/react-form'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '@/components/ui/input'
import { GridBackground } from '@/components/ui/grid-background'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
})

function RegisterPage() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Redirect authenticated users to stocks page
    if (isAuthenticated) {
      navigate({ to: '/stocks' })
    }
  }, [isAuthenticated, navigate])
  
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({ value }) => {
      try {
        // Validate passwords match
        if (value.password !== value.confirmPassword) {
          setError('Passwords do not match')
          return
        }

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: value.email,
            password: value.password,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || 'Registration failed')
        }

        // Success: Auto-login after registration
        // First login to get token
        const loginRes = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: value.email,
            password: value.password,
          }),
        })

        const loginData = await loginRes.json()
        
        if (loginRes.ok) {
          login(loginData.token)
          navigate({ to: '/stocks' })
        } else {
          // Registered but login failed, redirect to login page
          navigate({ to: '/auth/login' })
        }
        
      } catch (err: any) {
        setError(err.message)
      }
    },
  })

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GridBackground className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-primary to-secondary mb-4">
              Create Account
            </h1>
            <p className="text-muted-foreground">
              Sign up to start tracking your portfolio
            </p>
          </div>

          {/* Register Form Card */}
          <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
              }}
              className="space-y-5"
            >
              
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Email is required'
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email address'
                    return undefined
                  },
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "placeholder:text-muted-foreground transition-all"
                      )}
                    />
                    {field.state.meta.errors && (
                      <span className="text-xs text-red-500">
                        {field.state.meta.errors[0]}
                      </span>
                    )}
                  </div>
                )}
              />

              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Password is required'
                    if (value.length < 6) return 'Password must be at least 6 characters'
                    return undefined
                  },
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-foreground">
                      Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "transition-all"
                      )}
                    />
                    {field.state.meta.errors && (
                      <span className="text-xs text-red-500">
                        {field.state.meta.errors[0]}
                      </span>
                    )}
                  </div>
                )}
              />

              <form.Field
                name="confirmPassword"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Please confirm your password'
                    return undefined
                  },
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-foreground">
                      Confirm Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground",
                        "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                        "transition-all"
                      )}
                    />
                    {field.state.meta.errors && (
                      <span className="text-xs text-red-500">
                        {field.state.meta.errors[0]}
                      </span>
                    )}
                  </div>
                )}
              />

              {error && (
                <div className="text-red-500 text-sm text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Create Account
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/auth/login" className="text-primary hover:underline font-medium">
                Sign In
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Stock Tracker. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}
