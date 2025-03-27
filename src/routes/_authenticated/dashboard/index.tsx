import { useState } from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useQueryClient } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { IconFilePlus } from '@tabler/icons-react'
import { createProject } from '@/api/create-project'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import RecentDesign from '@/components/recent-design'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export const Route = createFileRoute('/_authenticated/dashboard/')({
  component: Apps,
})

const formSchema = z.object({
  name: z.string().min(1).min(5).max(255),
})

export default function Apps() {
  const { user } = useAuth()
  const queryClient = useQueryClient()

  const [dialogOpen, setDialogOpen] = useState(false)
  const { toast } = useToast()

  const mutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      toast({
        title: 'Project created successfully!',
        description: 'Your new project has been successfully created!',
      })

      queryClient.invalidateQueries({ queryKey: ['project-list', user?.id] })

      setDialogOpen(false)
    },
    onError: () => {
      toast({
        title: 'Failed to create project!',
        description: 'Something went wrong, please try again!',
        variant: 'destructive',
      })
    },
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const data = { userId: user?.id as number, name: values.name }

    mutation.mutate(data)
  }

  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center gap-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      <Main fixed>
        <AuroraBackground className='mb-3 h-36 rounded-xl border'>
          <p className='text-4xl font-semibold'>What will you design today?</p>
        </AuroraBackground>
        <div className='w-100 flex justify-center gap-4'>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <button className='flex flex-col items-center gap-2 rounded-lg p-2 transition hover:bg-gray-100'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-500 transition hover:bg-green-600'>
                  <IconFilePlus size={32} className='text-slate-200' />
                </div>
                <p className='text-sm text-gray-500'>New</p>
              </button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-md'>
              <DialogHeader>
                <DialogTitle>New Project</DialogTitle>
                <DialogDescription>
                  Create a new portfolio project.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='space-y-8'
                >
                  <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Project name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Your project name...'
                            type='text'
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Your project name</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type='submit'>Submit</Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Recent Designs</h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your recent design portfolio.
          </p>
        </div>

        <RecentDesign />
      </Main>
    </>
  )
}
