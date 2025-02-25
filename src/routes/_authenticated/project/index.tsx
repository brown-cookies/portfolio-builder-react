import { createFileRoute } from '@tanstack/react-router'
import {
  IconBrandDiscord,
  IconBrandDocker,
  IconBrandFigma,
  IconBrandGithub,
  IconBrandGitlab,
  IconBrandGmail,
  IconBrandMedium,
  IconBrandNotion,
  IconBrandSkype,
  IconBrandSlack,
  IconBrandStripe,
  IconBrandTelegram,
  IconBrandTrello,
  IconBrandWhatsapp,
  IconBrandZoom,
} from '@tabler/icons-react'
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

const apps = [
  {
    name: 'Telegram',
    logo: <IconBrandTelegram />,
    connected: false,
    desc: 'Connect with Telegram for real-time communication.',
  },
  {
    name: 'Notion',
    logo: <IconBrandNotion />,
    connected: true,
    desc: 'Effortlessly sync Notion pages for seamless collaboration.',
  },
  {
    name: 'Figma',
    logo: <IconBrandFigma />,
    connected: true,
    desc: 'View and collaborate on Figma designs in one place.',
  },
  {
    name: 'Trello',
    logo: <IconBrandTrello />,
    connected: false,
    desc: 'Sync Trello cards for streamlined project management.',
  },
  {
    name: 'Slack',
    logo: <IconBrandSlack />,
    connected: false,
    desc: 'Integrate Slack for efficient team communication',
  },
  {
    name: 'Zoom',
    logo: <IconBrandZoom />,
    connected: true,
    desc: 'Host Zoom meetings directly from the dashboard.',
  },
  {
    name: 'Stripe',
    logo: <IconBrandStripe />,
    connected: false,
    desc: 'Easily manage Stripe transactions and payments.',
  },
  {
    name: 'Gmail',
    logo: <IconBrandGmail />,
    connected: true,
    desc: 'Access and manage Gmail messages effortlessly.',
  },
  {
    name: 'Medium',
    logo: <IconBrandMedium />,
    connected: false,
    desc: 'Explore and share Medium stories on your dashboard.',
  },
  {
    name: 'Skype',
    logo: <IconBrandSkype />,
    connected: false,
    desc: 'Connect with Skype contacts seamlessly.',
  },
  {
    name: 'Docker',
    logo: <IconBrandDocker />,
    connected: false,
    desc: 'Effortlessly manage Docker containers on your dashboard.',
  },
  {
    name: 'GitHub',
    logo: <IconBrandGithub />,
    connected: false,
    desc: 'Streamline code management with GitHub integration.',
  },
  {
    name: 'GitLab',
    logo: <IconBrandGitlab />,
    connected: false,
    desc: 'Efficiently manage code projects with GitLab integration.',
  },
  {
    name: 'Discord',
    logo: <IconBrandDiscord />,
    connected: false,
    desc: 'Connect with Discord for seamless team communication.',
  },
  {
    name: 'WhatsApp',
    logo: <IconBrandWhatsapp />,
    connected: false,
    desc: 'Easily integrate WhatsApp for direct messaging.',
  },
]

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

        <RecentDesign design={apps} />
      </Main>
    </>
  )
}
