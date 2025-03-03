import axios from '@/axios'

export async function verifyAccessToken(token: string) {
  try {
    const response = await axios.post('/account/auth/verify/', { token })

    // add message to the response data
    response.data.message = 'Valid!'

    return response.data
  } catch (error) {
    // add message to the response data
    return { error }
  }
}
