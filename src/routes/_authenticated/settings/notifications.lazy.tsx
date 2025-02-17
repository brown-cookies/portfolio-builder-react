import { createLazyFileRoute } from '@tanstack/react-router'
import { NotificationsForm } from '@/components/notifications-form'
import ContentSection from '@/components/setting-content-section'

export const Route = createLazyFileRoute(
  '/_authenticated/settings/notifications'
)({
  component: SettingsNotifications,
})

export default function SettingsNotifications() {
  return (
    <ContentSection
      title='Notifications'
      desc='Configure how you receive notifications.'
    >
      <NotificationsForm />
    </ContentSection>
  )
}
