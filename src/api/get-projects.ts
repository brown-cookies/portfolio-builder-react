import axios from '@/axios'

export async function getProjects(userId: number) {
  try {
    const response = await axios.get(`/api/project/?user=${userId}`)
    return response.data
  } catch (error) {
    return { error }
  }
}
