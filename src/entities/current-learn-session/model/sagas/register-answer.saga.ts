import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, delay, put, takeEvery } from 'redux-saga/effects'
import { API, QUERY_KEY } from '@/api'
import { queryClient } from '@/shared/lib/react-query'
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
      yield call(API.endpoints.card.registerRightAnswer, action.payload.id)
    } else {
      yield put(actions.makeAnswer(false))
      yield call(API.endpoints.card.registerWrongAnswer, action.payload.id)
    }
    yield delay(1000)
    yield put(actions.cleanState())
    queryClient.invalidateQueries([QUERY_KEY.CARDS, QUERY_KEY.LEARN_CARD])
    queryClient.invalidateQueries([QUERY_KEY.CURRENT_LEARN_SESSION])
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
