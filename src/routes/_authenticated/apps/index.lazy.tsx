import { createLazyFileRoute } from '@tanstack/react-router'
import Apps from '@/pages/apps'

export const Route = createLazyFileRoute('/_authenticated/apps/')({
  component: Apps,
})
