import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { useCookies } from 'react-cookie'
import { Card } from '@/components/ui/card'
import AuthLayout from '@/components/layout/auth-layout'
import { SignUpForm } from '@/components/sign-up-form'

export const Route = createLazyFileRoute('/(auth)/sign-up')({
  component: SignUp,
})

export default function SignUp() {
  const [cookies] = useCookies(['access_token', 'refresh_token'])
  const navigate = useNavigate()

  if (cookies.access_token !== undefined) {
    navigate({ to: '/dashboard' })
  }
  return (
    <AuthLayout>
      <Card className='p-6'>
        <div className='mb-2 flex flex-col space-y-2 text-left'>
          <h1 className='text-lg font-semibold tracking-tight'>
            Create an account
          </h1>
          <p className='text-sm text-muted-foreground'>
            Enter your email and password to create an account. <br />
            Already have an account?{' '}
            <Link
              to='/sign-in'
              className='underline underline-offset-4 hover:text-primary'
            >
              Sign In
            </Link>
          </p>
        </div>
        <SignUpForm />
        <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
          By creating an account, you agree to our{' '}
          <a
            href='/terms'
            className='underline underline-offset-4 hover:text-primary'
          >
            Terms of Service
          </a>{' '}
          and{' '}
          <a
            href='/privacy'
            className='underline underline-offset-4 hover:text-primary'
          >
            Privacy Policy
          </a>
          .
        </p>
      </Card>
    </AuthLayout>
  )
}
