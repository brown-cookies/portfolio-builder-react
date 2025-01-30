import { createLazyFileRoute } from '@tanstack/react-router'
import Users from '@/pages/users'

export const Route = createLazyFileRoute('/_authenticated/users/')({
  component: Users,
})
