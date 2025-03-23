import { useEffect } from 'react'
import { ChevronsUpDown } from 'lucide-react'
import { Command } from 'lucide-react'
import { useAuth } from '@/hooks/use-auth'
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

export function TeamSwitcher() {
  const { subscription } = useAuth()

  useEffect(() => console.log(subscription))

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <Command className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {subscription?.plan?.name}
                </span>
                <span className='truncate text-xs'>
                  {subscription?.plan?.plan_type.charAt(0).toUpperCase() +
                    subscription?.plan?.plan_type.slice(1)}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
