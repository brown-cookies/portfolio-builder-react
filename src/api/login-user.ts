import axios from '@/axios'

export async function loginUser(data: { username: string; password: string }) {
  const response = await axios.post('/account/auth/access/', data)
  return response.data
}
