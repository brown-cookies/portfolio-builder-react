import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  name: string
  email: string
  avatar: string
  token: string
  refresh: string
}

const initialState: UserState = {
  name: 'Testing',
  email: 'testing@gmail.com',
  avatar: '/avatars/shadcn.jpg',
  token: '',
  refresh: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<Partial<UserState>>) => {
      state.token = action.payload.token || state.token
      state.refresh = action.payload.refresh || state.refresh
    },
    clearToken: (state) => {
      state.token = ''
      state.refresh = ''
    },
    setUser: (state, action: PayloadAction<Partial<UserState>>) => {
      state.name = action.payload.name || state.name
      state.email = action.payload.email || state.email
      state.avatar = action.payload.avatar || state.avatar
    },
    clearUser: (state) => {
      state.name = ''
      state.email = ''
      state.avatar = ''
    },
  },
})

export const { setToken, clearToken, setUser, clearUser } = userSlice.actions
export default userSlice.reducer
