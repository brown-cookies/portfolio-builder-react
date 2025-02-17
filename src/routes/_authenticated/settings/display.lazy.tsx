import { createLazyFileRoute } from '@tanstack/react-router'
import { DisplayForm } from '@/components/display-form'
import ContentSection from '@/components/setting-content-section'

export const Route = createLazyFileRoute('/_authenticated/settings/display')({
  component: SettingsDisplay,
})

export default function SettingsDisplay() {
  return (
    <ContentSection
      title='Display'
      desc="Turn items on or off to control what's displayed in the app."
    >
      <DisplayForm />
    </ContentSection>
  )
}
