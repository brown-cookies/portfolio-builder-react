import axios from '@/axios'

export async function getProject(projectId: number) {
  try {
    const response = await axios.get(`/api/project/${projectId}/`)
    return response.data
  } catch (error) {
    return { error }
  }
}
