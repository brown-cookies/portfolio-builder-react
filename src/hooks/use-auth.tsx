import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { validateAccessToken } from '@/api/validate-access-token'

export function useAuth() {
  const token = Cookies.get('access_token')

  const [user, setUser] = useState<any>(null)
  const [userSubscription, setUserSubscription] = useState<any>(null)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () => validateAccessToken(token || ''),
    onSuccess: (data) => {
      queryClient.setQueryData(['valid-token'], data)
      setUser(data.user)
      setUserSubscription(data.subscription)
    },
    onError: (err) => {
      if (err instanceof AxiosError && err.response?.status === 401) {
        navigate({ to: '/sign-in' })
      }
    },
  })

  useEffect(() => {
    if (token) {
      mutation.mutate()
    } else {
      navigate({ to: '/sign-in' })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return {
    isValidating: mutation.isPending,
    error: mutation.error,
    user,
    subscription: userSubscription,
  }
}
