import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { useAuth } from '../../hooks/useAuth'
import { Input } from '@/components/ui/input'
import { GridBackground } from '@/components/ui/grid-background'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/auth/change-password')({
  component: ChangePasswordPage,
})

function ChangePasswordPage() {
  const { token, logout } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  
  const form = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: async ({ value }) => {
      try {
        setError(null)
        setSuccess(null)

        // Validate passwords match
        if (value.newPassword !== value.confirmNewPassword) {
          setError('New passwords do not match')
          return
        }

        // Validate new password is different from old
        if (value.oldPassword === value.newPassword) {
          setError('New password must be different from old password')
          return
        }

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
        const res = await fetch(`${API_URL}/auth/change-password`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: value.oldPassword,
            newPassword: value.newPassword,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || data.message || 'Failed to change password')
        }

        // Success
        setSuccess('Password changed successfully! Redirecting to login...')
        
        // Logout and redirect to login after 2 seconds
        setTimeout(() => {
          logout()
          navigate({ to: '/auth/login' })
        }, 2000)
        
      } catch (err: any) {
        setError(err.message)
      }
    },
  })

  // Redirect to login if not authenticated
  if (!token) {
    navigate({ to: '/auth/login' })
    return null
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GridBackground className="absolute inset-0 z-0" />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-primary to-secondary mb-4">
              Change Password
            </h1>
            <p className="text-muted-foreground">
              Update your account password
            </p>
          </div>

          {/* Change Password Form Card */}
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
                name="oldPassword"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Current password is required'
                    return undefined
                  },
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-foreground">
                      Current Password
                    </label>
                    <Input
                      id="oldPassword"
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
                name="newPassword"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'New password is required'
                    if (value.length < 6) return 'Password must be at least 6 characters'
                    return undefined
                  },
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="block text-sm font-medium text-foreground">
                      New Password
                    </label>
                    <Input
                      id="newPassword"
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
                name="confirmNewPassword"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return 'Please confirm your new password'
                    return undefined
                  },
                }}
                children={(field) => (
                  <div className="space-y-2">
                    <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-foreground">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirmNewPassword"
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

              {success && (
                <div className="text-green-500 text-sm text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                  {success}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-3 rounded-lg bg-linear-to-r from-primary to-secondary text-white font-semibold hover:opacity-90 transition-opacity shadow-lg"
              >
                Update Password
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-muted-foreground">
              <a href="/stocks" className="text-primary hover:underline font-medium">
                Back to Portfolio
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
