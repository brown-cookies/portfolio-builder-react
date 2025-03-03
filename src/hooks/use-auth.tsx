import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useSessionStorage } from '@uidotdev/usehooks'
import { getUserDetail } from '@/api/get-user-detail'
import { verifyAccessToken } from '@/api/verify-access-token'

export function useAuth() {
  const token = Cookies.get('access_token')
  const [userData, setUserData] = useSessionStorage('user', null)
  const [isTokenVerified, setIsTokenVerified] = useState(false)
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: () => verifyAccessToken(token as string),
    onSuccess: () => setIsTokenVerified(true),
    onError: () => {
      setIsTokenVerified(false)
      navigate({ to: '/sign-in' })
    },
  })

  const { data, isLoading } = useQuery({
    queryKey: ['user', token],
    queryFn: () => getUserDetail(token as string),
    enabled: isTokenVerified && !userData,
  })

  useEffect(() => {
    if (!token) {
      navigate({ to: '/sign-in' })
    } else if (!isTokenVerified) {
      mutation.mutate()
    }
  }, [token, isTokenVerified, navigate])

  useEffect(() => {
    if (data && JSON.stringify(data) !== JSON.stringify(userData)) {
      setUserData(data)
    }
  }, [data, userData, setUserData])

  useEffect(() => {
    return () => {
      mutation.reset()
    }
  }, [])

  return { user: userData || data, isLoading, isTokenVerified }
}
