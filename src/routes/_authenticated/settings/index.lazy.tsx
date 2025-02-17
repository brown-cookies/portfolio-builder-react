import { createLazyFileRoute } from '@tanstack/react-router'
import ProfileForm from '@/components/profile-form'
import ContentSection from '@/components/setting-content-section'

export const Route = createLazyFileRoute('/_authenticated/settings/')({
  component: SettingsProfile,
})

export default function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
    >
      <ProfileForm />
    </ContentSection>
  )
}
