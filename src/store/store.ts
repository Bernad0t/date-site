import { configureStore } from '@reduxjs/toolkit'
import { createUserReducer } from './features/newUserSlice'

export const store = configureStore({
    reducer: {
      create_user: createUserReducer
    },
  })
  
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// Infer the type of `store`
export type AppStore = typeof store

export const selectCreateUser = (state: RootState) => state.create_user