import PlanReducer from '@/slice/plan-slice'
import UserReducer from '@/slice/user-slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    user: UserReducer,
    plan: PlanReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store
