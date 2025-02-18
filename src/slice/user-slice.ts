import type { RootState } from '@/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  email: string
  avatar: string
}

const initialState: UserState = {
  name: 'Testing',
  email: 'testing@gmail.com',
  avatar: '/avatars/shadcn.jpg',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name
      state.email = action.payload.email
      state.avatar = action.payload.avatar
    },
    clearUser: (state) => {
      state.name = ''
      state.email = ''
      state.avatar = ''
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
