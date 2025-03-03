import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { useSessionStorage } from '@uidotdev/usehooks'
import { getUserDetail } from '@/api/get-user-detail'
import { verifyAccessToken } from '@/api/verify-access-token'
import { cn } from '@/lib/utils'
import { SearchProvider } from '@/context/search-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/layout/app-sidebar'
import SkipToMain from '@/components/skip-to-main'

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
})

function RouteComponent() {
  const token = Cookies.get('access_token')
  const [, setUser] = useSessionStorage('user', {})
  const [isTokenVerified, setIsTokenVerified] = useState(false)
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () => verifyAccessToken(token as string),
    onSuccess: () => setIsTokenVerified(true),
    onError: () => setIsTokenVerified(false),
  })

  const { data } = useQuery({
    queryKey: ['user', token],
    queryFn: () => getUserDetail(token as string),
    enabled: isTokenVerified,
  })

  const defaultOpen = Cookies.get('sidebar:state') !== 'false'

  useEffect(() => {
    if (token === '' || token === undefined) {
      navigate({ to: '/sign-in' })
    } else {
      mutation.mutate()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    if (data) {
      setUser(data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <SearchProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <SkipToMain />
        <AppSidebar />
        <div
          id='content'
          className={cn(
            'ml-auto w-full max-w-full',
            'peer-data-[state=collapsed]:w-[calc(100%-var(--sidebar-width-icon)-1rem)]',
            'peer-data-[state=expanded]:w-[calc(100%-var(--sidebar-width))]',
            'transition-[width] duration-200 ease-linear',
            'flex h-svh flex-col',
            'group-data-[scroll-locked=1]/body:h-full',
            'group-data-[scroll-locked=1]/body:has-[main.fixed-main]:h-svh'
          )}
        >
          <Outlet />
        </div>
      </SidebarProvider>
    </SearchProvider>
  )
}
