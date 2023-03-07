import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { API } from '@/shared/api'
import { actions } from '..'

export const registerAnswer = createPromiseAction('REGISTER_CARD_ANSWER')<
  { id: string; isRight: boolean },
  null,
  string
>()

function* worker(action: PromiseAction<string, { id: string; isRight: boolean }, any>) {
  try {
    if (action.payload.isRight) {
      yield put(actions.makeAnswer(true))
      yield call(API.card.registerRightAnswer, action.payload.id)
    } else {
      yield put(actions.makeAnswer(false))
      yield call(API.card.registerWrongAnswer, action.payload.id)
    }
    yield put(actions.cleanState())
    resolvePromiseAction(action, null)
  } catch (err) {
    yield put(actions.cleanState())
    const error = err as AxiosError
    rejectPromiseAction(action, error.message)
  }
}

export function* registerAnswerSaga() {
  yield takeEvery(registerAnswer.request, worker)
}
