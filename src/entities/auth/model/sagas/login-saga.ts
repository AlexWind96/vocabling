import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { API, LoginBody } from '@/api'
import { jwtTokenService } from '@/shared/lib/jwt-token-service'

export const login = createPromiseAction('AUTH_LOGIN')<LoginBody, null, AxiosError>()

function* worker(action: PromiseAction<string, LoginBody, any>) {
  try {
    const { data: tokens } = yield call(API.endpoints.auth.login, action.payload)
    jwtTokenService.updateTokens(tokens)
    const { data: user } = yield call(API.endpoints.auth.getCurrentUser)
    yield put(login.success(user))
    resolvePromiseAction(action, user)
  } catch (err) {
    const error = err as AxiosError
    rejectPromiseAction(action, error.message)
  }
}

export function* loginSaga() {
  yield takeEvery(login.request, worker)
}
