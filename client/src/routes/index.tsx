import { createFileRoute, Link } from '@tanstack/react-router'
import { GridBackground } from '../components/ui/grid-background'
import { BentoGrid, BentoGridItem } from '../components/ui/bento-grid'
import { TrendingUp } from 'lucide-react'
import {Github} from 'lucide-react'


export const Route = createFileRoute('/')({
  component: HomePage,
})



function HomePage() {

  const bentoOptions = [
    {
      "icon": null,
      "title": null,
      "header": <div className="flex items-center justify-center h-full min-h-[6rem] rounded-xl bg-linear-to-br from-primary to-secondary text-6xl font-bold text-primary-foreground">
        Track Your <br />
        Data Offline
      </div>,
      "description": null,
      "className": "md:col-span-2 md:row-span-2 "

    },
      
     {
      "icon": null,
      "title": null,
      "header": <div className="flex flex-col items-center justify-center h-full min-h-[6rem] rounded-xl bg-card border border-border text-4xl font-bold text-foreground">
        <Github size={48} />
        <span>Open Source</span>
        
      </div>,
      "description": null,
      "className": "md:col-span-1 "

    },
    {
      "icon": null,
      "title": null,
      "header": <div className="flex items-center justify-center h-full min-h-[6rem] rounded-xl bg-muted text-4xl font-bold text-muted-foreground">
        Typescript <br />
        Powered
      </div>,
      "description": null,
      "className": "md:col-span-1 "

    }
  ]
  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full overflow-hidden ">
      <GridBackground className="absolute inset-0 z-0 " />
      <div className="relative z-10 flex flex-col items-center justify-center h-full  text-center px-4">
        <div className=" min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-linear-to-b from-primary to-secondary mb-8">
          Stock Tracker
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Manage your portfolio, track stock prices, and analyze your investments in one place.
        </p>
        <Link
          to="/stocks"
          className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold text-lg hover:opacity-90 transition-opacity"
        >
          Check Stocks
        </Link>
        </div>

         <BentoGrid className= "w-full">
        {bentoOptions.map((bentoOption) => (
          <BentoGridItem
            className={bentoOption.className}
            title={bentoOption.title}
            description={
              bentoOption.description
            }
            header={bentoOption.header}
            icon={bentoOption.icon}
          />
        ))}
      </BentoGrid>

      <div className="footer mt-10 mb-4">
        <div className="text-muted-foreground">
          © {new Date().getFullYear()} Github: @gokserpirik. All rights reserved.
        </div>

      </div>
      </div>
      
     
    </div>
  )
}
