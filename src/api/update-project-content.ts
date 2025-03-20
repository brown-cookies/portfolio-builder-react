import axios from '@/axios'

export async function updateProjectContent(data: {
  projectId: number
  content: string
}) {
  try {
    const response = await axios.patch(`/api/project/${data.projectId}/`, {
      content: data.content,
    })
    return response.data
  } catch (error) {
    return { error }
  }
}
