import { createLazyFileRoute } from '@tanstack/react-router'
import SettingsNotifications from '@/pages/settings/notifications'

export const Route = createLazyFileRoute(
  '/_authenticated/settings/notifications'
)({
  component: SettingsNotifications,
})
