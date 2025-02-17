import { createFileRoute } from '@tanstack/react-router'
import GeneralError from '@/routes/(errors)/500.lazy'

export const Route = createFileRoute('/(auth)/500')({
  component: GeneralError,
})
