import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { auth } from '@/entities/auth'
import { currentLearnSession } from '@/entities/current-learn-session'

const authDataPersistConfig = {
  key: 'auth',
  storage,
}

export const rootReducer = combineReducers({
  auth: persistReducer(authDataPersistConfig, auth.model.reducer),
  currentLearnSession: currentLearnSession.reducer,
})
