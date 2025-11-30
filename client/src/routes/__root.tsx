import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { AppSidebar } from '../components/AppSidebar'
import { cn } from '../lib/utils'

export const Route = createRootRoute({
  component: () => (
    <div className={cn(
      "rounded-md flex flex-col md:flex-row bg-background w-full flex-1 mx-auto border border-border overflow-hidden",
      "h-screen" 
    )}>
      <AppSidebar />
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
  ),
})
