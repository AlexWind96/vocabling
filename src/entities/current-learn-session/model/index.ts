import { AsyncThunk, PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { API, Card, CurrentLearnSession } from '@shared/api'

interface CurrentLearnSessionState {
  currentCard: Card | null
  nextCard: Card | null
  isHidden: boolean
  isDisabled: boolean
  isLoading: boolean
  session: CurrentLearnSession | null
  learnGoal: number | null
}

const initialState: CurrentLearnSessionState = {
  currentCard: null,
  isHidden: true,
  isDisabled: false,
  nextCard: null,
  isLoading: true,
  session: null,
  learnGoal: null,
}

export const setupSession = createAsyncThunk(
  'CurrentLearnSession/setupSession',
  async (_, { dispatch }) => {
    dispatch(currentLearnSessionSlice.actions.setIsLoading(true))
    const user = await API.auth.getCurrentUser().then((res) => res.data)
    const session = await API.currentLearnSession.getCurrentLearnSession().then((res) => res.data)
    dispatch(currentLearnSessionSlice.actions.setSession(session))
    dispatch(currentLearnSessionSlice.actions.setLearnGoal(user.learnGoal))
    const card = await API.card.getLearnCard().then((res) => res.data)
    dispatch(currentLearnSessionSlice.actions.setLearnCard(card))
    const nextCard = await API.card.getNextLearnCard().then((res) => res.data)
    dispatch(currentLearnSessionSlice.actions.setNextCard(nextCard))
    dispatch(currentLearnSessionSlice.actions.setIsLoading(false))
    return
  }
)

export const fetchNextCard = createAsyncThunk('CurrentLearnSession/fetchNextCard', async () => {
  return await API.card.getNextLearnCard().then((res) => res.data)
})

export const registerAnswer = createAsyncThunk<
  { isCompleted: boolean },
  { id: string; value: boolean },
  any
>('CurrentLearnSession/registerAnswer', async ({ id, value }, { dispatch, getState }) => {
  const state = getState() as RootState
  const { session, learnGoal, nextCard, currentCard } = state.currentLearnSession
  dispatch(currentLearnSessionSlice.actions.setIsDisabled(true))
  if (value) {
    await API.card.registerRightAnswer(id)
  } else {
    await API.card.registerWrongAnswer(id)
  }
  if (session && learnGoal) {
    const newCount = session.countOfCompleted + 1
    dispatch(
      currentLearnSessionSlice.actions.setSession({
        ...session,
        countOfCompleted: newCount,
      })
    )
    if (newCount >= learnGoal) {
      await API.currentLearnSession.completeCurrentLearnSession()
      dispatch(currentLearnSessionSlice.actions.cleanState())
      return { isCompleted: true }
    }
  }

  if (nextCard && nextCard.id !== currentCard?.id) {
    dispatch(currentLearnSessionSlice.actions.setLearnCard(state.currentLearnSession.nextCard))
    dispatch(currentLearnSessionSlice.actions.setIsHidden(true))
    dispatch(currentLearnSessionSlice.actions.setIsDisabled(false))
    dispatch(currentLearnSessionSlice.actions.setNextCard(null))
    const nextCard = await API.card.getNextLearnCard().then((res) => res.data)
    dispatch(currentLearnSessionSlice.actions.setNextCard(nextCard))
  } else {
    const card = await API.card.getLearnCard().then((res) => res.data)
    dispatch(currentLearnSessionSlice.actions.setLearnCard(card))
    dispatch(currentLearnSessionSlice.actions.setIsHidden(true))
    dispatch(currentLearnSessionSlice.actions.setIsDisabled(false))
    const nextCard = await API.card.getNextLearnCard().then((res) => res.data)
    dispatch(currentLearnSessionSlice.actions.setNextCard(nextCard))
  }
  return { isCompleted: false }
})

export const currentLearnSessionSlice = createSlice({
  name: 'CurrentLearnSession',
  initialState,
  reducers: {
    setIsHidden: (state, action: PayloadAction<boolean>) => {
      state.isHidden = action.payload
    },
    setLearnGoal: (state, action: PayloadAction<number | null>) => {
      state.learnGoal = action.payload
    },
    setSession: (state, action: PayloadAction<CurrentLearnSession | null>) => {
      state.session = action.payload
    },
    setNextCard: (state, action: PayloadAction<Card | null>) => {
      state.nextCard = action.payload
    },
    setLearnCard: (state, action: PayloadAction<Card | null>) => {
      state.currentCard = action.payload
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setIsDisabled: (state, action: PayloadAction<boolean>) => {
      state.isDisabled = action.payload
    },
    cleanState: () => {
      return initialState
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNextCard.fulfilled, (state, action) => {
      state.nextCard = action.payload
      state.isLoading = false
    })
    builder.addCase(fetchNextCard.pending, (state) => {
      state.isLoading = true
      state.nextCard = null
    })
    builder.addCase(fetchNextCard.rejected, (state) => {
      state.isLoading = false
      state.nextCard = null
    })
  },
})

//create thunk registerAnswer here

export const selectCurrentLearnSessionSlice = (state: RootState) => state.currentLearnSession
