import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { registerAnswer, saga } from './sagas'

interface CurrentLearnSessionState {
  isAnswered: boolean
  isRightAnswer: boolean
  isShownResult: boolean
  isLoadingAnswer: boolean
}

const initialState: CurrentLearnSessionState = {
  isAnswered: true,
  isRightAnswer: false,
  isShownResult: false,
  isLoadingAnswer: false,
}

const slice = createSlice({
  name: 'CurrentLearnSession',
  initialState,
  reducers: {
    showResult: (state) => {
      state.isShownResult = true
    },
    makeAnswer: (state, action: PayloadAction<boolean>) => {
      state.isAnswered = true
      state.isRightAnswer = action.payload
    },
    cleanState: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerAnswer.request.toString(), (state) => {
      state.isLoadingAnswer = true
    })
    builder.addCase(registerAnswer.success.toString(), (state) => {
      state.isLoadingAnswer = false
    })
    builder.addCase(registerAnswer.failure.toString(), (state) => {
      state.isLoadingAnswer = false
    })
  },
})

//ACTIONS
export const asyncActions = {
  registerAnswer,
}

export const actions = slice.actions

//SELECTORS
const selectCurrentLearnSessionState = (state: RootState) => state.currentLearnSession

export const selectors = {
  selectCurrentLearnSessionState,
}
//Reducer
export const reducer = slice.reducer

export { saga }
