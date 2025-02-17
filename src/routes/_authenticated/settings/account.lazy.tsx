import { createLazyFileRoute } from '@tanstack/react-router'
import { AccountForm } from '@/components/account-form'
import ContentSection from '@/components/setting-content-section'

export const Route = createLazyFileRoute('/_authenticated/settings/account')({
  component: SettingsAccount,
})

export default function SettingsAccount() {
  return (
    <ContentSection
      title='Account'
      desc='Update your account settings. Set your preferred language and
          timezone.'
    >
      <AccountForm />
    </ContentSection>
  )
}
