import { allCardsPageSlice } from '@pages/app/all-cards/model'
import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { currentLearnSessionSlice } from '@entities/current-learn-session'
import { uiConfigSlice } from '@entities/ui-config'


export const rootReducer = combineReducers({
  currentLearnSession: currentLearnSessionSlice.reducer,
  allCardsPageSlice: allCardsPageSlice.reducer,
  uiConfig: persistReducer(
    {
      key: 'ui-config',
      storage,
    },
    uiConfigSlice.reducer
  ),
})
