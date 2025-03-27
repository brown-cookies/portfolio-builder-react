import { HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { IconBrandFacebook, IconBrandGithub } from '@tabler/icons-react'
import { createUser } from '@/api/create-user'
import { validateAccessToken } from '@/api/validate-access-token'
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

type SignUpFormProps = HTMLAttributes<HTMLDivElement>

const formSchema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string(),
    username: z.string().min(1),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  })

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const { mutate: validateToken } = useMutation({
    mutationFn: validateAccessToken,
    onSuccess: (data) => {
      queryClient.setQueryData(['valid-token'], data)
      navigate({ to: '/dashboard' })
    },
    onError: (err) => console.log(err),
  })

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      Cookies.set('access_token', data.access, { expires: 7 })
      Cookies.set('refresh_token', data.refresh, { expires: 7 })

      validateToken(data.access)
    },
    onError: (err) => console.log(err),
    onSettled: () => setIsLoading(false),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    mutation.mutate(values)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='py-2'>
          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder='First name' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder='Last name' type='text' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email address</FormLabel>
                <FormControl>
                  <Input placeholder='Email Address' type='email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder='Username' type='text' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-12 gap-4'>
            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput placeholder='Password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className='col-span-6'>
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        placeholder='Confirm password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button className='mt-5 w-full' disabled={isLoading}>
            Create Account
          </Button>

          <div className='relative my-2 py-4'>
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
        </form>
      </Form>
    </div>
  )
}
