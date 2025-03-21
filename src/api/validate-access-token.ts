import axios from '@/axios'

export async function validateAccessToken(token: string) {
  if (token === '') throw Error('Invalid Token')

  const res = await axios.post(
    '/account/auth/validate/',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}
