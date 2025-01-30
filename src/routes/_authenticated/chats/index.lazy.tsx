import { createLazyFileRoute } from '@tanstack/react-router'
import Chats from '@/pages/chats'

export const Route = createLazyFileRoute('/_authenticated/chats/')({
  component: Chats,
})
