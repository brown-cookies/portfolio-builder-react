import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsAppearance from '@/pages/settings/appearance'

export const Route = createLazyFileRoute('/_authenticated/settings/appearance')(
  { component: SettingsAppearance }
)
