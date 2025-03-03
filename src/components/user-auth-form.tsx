import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import axios from '@/axios'
import { useAppSelector, useAppDispatch } from '@/hooks'
import { setToken } from '@/slice/user-slice'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

type UserAuthFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z.object({
  username: z.string().min(1, { message: 'Please enter your username' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(5, {
      message: 'Password must be at least 5 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    axios
      .post('/account/auth/access/', data)
      .then((res) => {
        dispatch(
          setToken({ token: res.data['access'], refresh: res.data['refresh'] })
        )
        Cookies.set('access_token', res.data['access'])
        Cookies.set('refresh_token', res.data['refresh'])

        navigate({ to: '/dashboard' })
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Your username' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' disabled={isLoading}>
              Login
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandGithub className='h-4 w-4' /> GitHub
              </Button>
              <Button
                variant='outline'
                className='w-full'
                type='button'
                disabled={isLoading}
              >
                <IconBrandFacebook className='h-4 w-4' /> Facebook
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
