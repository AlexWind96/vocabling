import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { auth } from '@/entities/auth'

const authDataPersistConfig = {
  key: 'auth',
  storage,
}

export const rootReducer = combineReducers({
  auth: auth.model.reducer,
})
