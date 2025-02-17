import { createLazyFileRoute } from '@tanstack/react-router'
import { AppearanceForm } from '@/components/appearance-form'
import ContentSection from '@/components/setting-content-section'

export const Route = createLazyFileRoute('/_authenticated/settings/appearance')(
  { component: SettingsAppearance }
)

export default function SettingsAppearance() {
  return (
    <ContentSection
      title='Appearance'
      desc='Customize the appearance of the app. Automatically switch between day
          and night themes.'
    >
      <AppearanceForm />
    </ContentSection>
  )
}
