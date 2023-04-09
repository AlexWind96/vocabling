import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface CurrentLearnSessionState {
  isAnswered: boolean
  isRightAnswer: boolean
  isShownResult: boolean
  isProcessingAnswer: boolean
}

const initialState: CurrentLearnSessionState = {
  isAnswered: true,
  isRightAnswer: false,
  isShownResult: false,
  isProcessingAnswer: false,
}

export const currentLearnSessionSlice = createSlice({
  name: 'CurrentLearnSession',
  initialState,
  reducers: {
    showResult: (state, action: PayloadAction<undefined>) => {
      state.isShownResult = true
    },
    makeAnswer: (state, action: PayloadAction<boolean>) => {
      state.isAnswered = true
      state.isRightAnswer = action.payload
      state.isProcessingAnswer = true
    },
    cleanState: () => {
      return initialState
    },
  },
})

export const selectCurrentLearnSessionSlice = (state: RootState) => state.currentLearnSession
