import { combineReducers } from 'redux'
import { currentLearnSessionSlice } from '@/entities/current-learn-session'

export const rootReducer = combineReducers({
  currentLearnSession: currentLearnSessionSlice.reducer,
})
