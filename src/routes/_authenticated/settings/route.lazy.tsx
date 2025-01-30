import { createLazyFileRoute } from '@tanstack/react-router'
import Settings from '@/pages/settings'

export const Route = createLazyFileRoute('/_authenticated/settings')({
  component: Settings,
})
