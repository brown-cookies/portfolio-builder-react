import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsProfile from '@/pages/settings/profile'

export const Route = createLazyFileRoute('/_authenticated/settings/')({
  component: SettingsProfile,
})
