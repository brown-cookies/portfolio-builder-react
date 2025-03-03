import axios from '@/axios'

export async function getUserDetail(token: string) {
  try {
    const response = await axios.get('/account/user', {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response.data
  } catch (error) {
    return { error }
  }
}
