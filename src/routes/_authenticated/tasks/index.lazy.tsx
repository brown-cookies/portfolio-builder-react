import { createLazyFileRoute } from '@tanstack/react-router'
import Tasks from '@/pages/tasks'

export const Route = createLazyFileRoute('/_authenticated/tasks/')({
  component: Tasks,
})
