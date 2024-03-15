import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CardsQueryParams } from '@shared/api'

export interface CardFilters extends CardsQueryParams {
  limit?: number
}

export interface ViewSettings {
  expandComments: boolean
}

const initialState: CardFilters & ViewSettings = {
  expandComments: false,
}

export const allCardsPageSlice = createSlice({
  name: 'AllCardsPage',
  initialState,
  reducers: {
    patchFilter: (state, action: PayloadAction<CardFilters>) => {
      return {
        ...state,
        ...action.payload,
      }
    },
    setExpandComments: (state, action: PayloadAction<boolean>) => {
      state.expandComments = action.payload
    },
    cleanState: () => {
      return initialState
    },
  },
})

export const selectAllCardsPageSlice = (state: RootState) => state.allCardsPageSlice
