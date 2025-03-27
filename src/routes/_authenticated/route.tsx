// @ts-nocheck
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { CheckIcon } from 'lucide-react'
import { getBasicPlan } from '@/api/get-basic-plan'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  const token = Cookies.get('access_token')
  const { user, subscription } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  const { mutate } = useMutation({
    mutationFn: getBasicPlan,
    onSuccess: (data) => {
      setIsLoading(false)
      toast({
        title: 'Your plan is ready to be activated!',
        description: (
          <p>
            Click this{' '}
            <a href={data.link} className='text-blue-700 underline'>
              link
            </a>{' '}
            to finish setting up.
          </p>
        ),
      })
    },
    onError: (err) => console.log(err),
  })

  function handleGetBasicPlan() {
    setIsLoading(true)
    toast({
      title: 'Setting up your plan!',
      description: 'Please wait while we process your plan!',
    })
    mutate(token as string)
  }

  useEffect(() => {
    if (user) {
      if (
        subscription === null ||
        subscription === undefined ||
        (typeof subscription === 'object' &&
          Object.keys(subscription).length === 0)
      ) {
        setIsDialogOpen(true)
      }
    }
  }, [user, subscription])

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Dialog open={isDialogOpen}>
            <DialogContent
              hideCloseButton={true}
              className='smd:max-w-2xl max-h-[90vh] overflow-y-auto lg:max-w-3xl xl:max-w-6xl'
            >
              <DialogHeader>
                <DialogTitle>You're not subscribe yet!</DialogTitle>
                <DialogDescription>
                  Subscribe now to our affordable prices to start building your
                  portfolio without coding with our drag-and-drop feature.
                </DialogDescription>
              </DialogHeader>
              <div className='container'>
                <div className='mt-12 grid grid-cols-1 gap-1 lg:grid-cols-2 lg:items-center xl:grid-cols-4'>
                  <Card className='flex flex-col'>
                    <CardHeader className='pb-2 text-center'>
                      <CardTitle className='mb-7'>Free</CardTitle>
                      <span className='text-5xl font-bold'>Free</span>
                    </CardHeader>
                    <CardDescription className='text-center'>
                      Forever free
                    </CardDescription>
                    <CardContent className='flex-1'>
                      <ul className='mt-7 space-y-2.5 text-sm'>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            2 projects
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Drag-and-drop editor
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Product support
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className='w-full' variant={'outline'} disabled>
                        Not available...
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className='flex flex-col border-primary'>
                    <CardHeader className='pb-2 text-center'>
                      <Badge className='mb-3 w-max self-center uppercase'>
                        Most popular
                      </Badge>
                      <CardTitle className='!mb-7'>Startup</CardTitle>
                      <span className='text-5xl font-bold'>£39</span>
                    </CardHeader>
                    <CardDescription className='mx-auto w-11/12 text-center'>
                      All the basics for starting a new business
                    </CardDescription>
                    <CardContent className='flex-1'>
                      <ul className='mt-7 space-y-2.5 text-sm'>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            100 projects
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Drag-and-drop editor
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Product support
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className='w-full'
                        onClick={handleGetBasicPlan}
                        disabled={isLoading}
                      >
                        Get Plan
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className='flex flex-col'>
                    <CardHeader className='pb-2 text-center'>
                      <CardTitle className='mb-7'>Team</CardTitle>
                      <span className='text-5xl font-bold'>£89</span>
                    </CardHeader>
                    <CardDescription className='mx-auto w-11/12 text-center'>
                      Everything you need for a growing business
                    </CardDescription>
                    <CardContent className='flex-1'>
                      <ul className='mt-7 space-y-2.5 text-sm'>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Unlimited projects
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Drag-and-drop editor
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Product support
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className='w-full' variant={'outline'} disabled>
                        Coming-soon...
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card className='flex flex-col'>
                    <CardHeader className='pb-2 text-center'>
                      <CardTitle className='mb-7'>Enterprise</CardTitle>
                      <span className='text-5xl font-bold'>149</span>
                    </CardHeader>
                    <CardDescription className='mx-auto w-11/12 text-center'>
                      Advanced features for scaling your business
                    </CardDescription>
                    <CardContent>
                      <ul className='mt-7 space-y-2.5 text-sm'>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Unlimited projects
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Drag-and-drop editor
                          </span>
                        </li>
                        <li className='flex space-x-2'>
                          <CheckIcon className='mt-0.5 h-4 w-4 flex-shrink-0' />
                          <span className='text-muted-foreground'>
                            Product support
                          </span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className='w-full' variant={'outline'} disabled>
                        Coming soon...
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
