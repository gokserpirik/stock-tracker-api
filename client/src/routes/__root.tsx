import { Outlet, createRootRoute, useLocation } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { AppSidebar } from '../components/AppSidebar'
import { AuthProvider, useAuth } from '../hooks/useAuth'
import { cn } from '../lib/utils'

function RootComponent() {
  const location = useLocation()
  const { isAuthenticated } = useAuth()
  
  // Auth pages and homepage don't show sidebar
  const isAuthPage = location.pathname.startsWith('/auth')
  const isHomePage = location.pathname === '/'
  const showSidebar = !isAuthPage && !isHomePage && isAuthenticated

  return (
    <div className={cn(
      "rounded-md flex flex-col md:flex-row bg-background w-full flex-1 mx-auto border border-border overflow-hidden",
      "h-screen" 
    )}>
      {showSidebar && <AppSidebar />}
      <div className="flex-1 overflow-y-auto h-full">
        <Outlet />
      </div>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
        ]}
      />
    </div>
  )
}

export const Route = createRootRoute({
  component: () => (
    <AuthProvider>
      <RootComponent />
    </AuthProvider>
  ),
})
