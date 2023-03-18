import { combineReducers } from 'redux'
import { currentLearnSession } from '@/entities/current-learn-session'

export const rootReducer = combineReducers({
  currentLearnSession: currentLearnSession.reducer,
})
