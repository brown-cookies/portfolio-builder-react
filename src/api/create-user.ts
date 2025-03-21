import axios from '@/axios'

interface UserInterface {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

export async function createUser(data: UserInterface) {
  const res = await axios.post('/account/auth/create/', data)

  return res.data
}
