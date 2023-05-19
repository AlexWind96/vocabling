import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '@shared/api'
import { currentLearnSessionSlice } from '@entities/current-learn-session'

const {
  actions: { makeAnswer, cleanState },
} = currentLearnSessionSlice

export const registerAnswer = createPromiseAction('REGISTER_CARD_ANSWER')<
  { id: string; isRight: boolean },
  null,
  string
>()

function* worker(action: PromiseAction<string, { id: string; isRight: boolean }, any>) {
  try {
    if (action.payload.isRight) {
      yield put(makeAnswer(true))
      yield call(API.card.registerRightAnswer, action.payload.id)
    } else {
      yield put(makeAnswer(false))
      yield call(API.card.registerWrongAnswer, action.payload.id)
    }
    yield put(cleanState())
    resolvePromiseAction(action, null)
  } catch (err) {
    yield put(cleanState())
    const error = err as AxiosError
    rejectPromiseAction(action, error.message)
  }
}

export function* registerAnswerSaga() {
  yield takeEvery(registerAnswer.request, worker)
}
