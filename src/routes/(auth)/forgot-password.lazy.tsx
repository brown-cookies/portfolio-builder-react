import { createLazyFileRoute } from '@tanstack/react-router'
import ForgotPassword from '@/pages/auth/forgot-password'

export const Route = createLazyFileRoute('/(auth)/forgot-password')({
  component: ForgotPassword,
})
