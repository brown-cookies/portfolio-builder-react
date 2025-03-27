import { createFileRoute } from '@tanstack/react-router'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import RecentDesign from '@/components/recent-design'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export const Route = createFileRoute('/_authenticated/project/')({
  component: Project,
})

function Project() {
  return (
    <>
      {/* ===== Top Heading ===== */}
      <Header>
        <div className='ml-auto flex items-center gap-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      {/* ===== Content ===== */}
      <Main fixed>
        <AuroraBackground className='mb-3 h-36 rounded-xl border'>
          <p className='text-4xl font-semibold'>Projects</p>
        </AuroraBackground>
        <div>
          <h1 className='text-2xl font-bold tracking-tight'>Recent Designs</h1>
          <p className='text-muted-foreground'>
            Here&apos;s a list of your recent design portfolio.
          </p>
        </div>

        <RecentDesign />
      </Main>
    </>
  )
}
