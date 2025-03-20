import axios from '@/axios'

export async function createProject(data: { userId: number; name: string }) {
  try {
    const response = await axios.post('/api/project/', {
      user: data.userId,
      name: data.name,
    })
    return response.data
  } catch (error) {
    return { error }
  }
}
