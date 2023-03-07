import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { API, LoginBody, ServerError } from '@/shared/api'
import { jwtTokenService } from '@/shared/lib/jwt-token-service'

export const login = createPromiseAction('AUTH_LOGIN')<LoginBody, null, AxiosError>()

function* worker(action: PromiseAction<string, LoginBody, any>) {
  try {
    const { data: tokens } = yield call(API.auth.login, action.payload)
    jwtTokenService.updateTokens(tokens)
    const { data: user } = yield call(API.auth.getCurrentUser)
    yield put(login.success(user))
    resolvePromiseAction(action, user)
  } catch (err) {
    const error = err as AxiosError<ServerError>
    rejectPromiseAction(action, error)
  }
}

export function* loginSaga() {
  yield takeEvery(login.request, worker)
}
