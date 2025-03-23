import axios from '@/axios'

export async function getBasicPlan(token: string) {
  const res = await axios.post(
    '/paypal/subscribe/basic/',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return res.data
}
