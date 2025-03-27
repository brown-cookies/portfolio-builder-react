import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlanState {
  plan: string
  email: string
}

const initialState: PlanState = {
  plan: 'Basic',
  email: 'testing@gmail.com',
}

const userSlice = createSlice({
  name: 'plan',
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<PlanState>) => {
      state.plan = action.payload.plan
      state.email = action.payload.email
    },
    clearPlan: (state) => {
      state.plan = ''
      state.email = ''
    },
  },
})

export const { setPlan, clearPlan } = userSlice.actions
export default userSlice.reducer
