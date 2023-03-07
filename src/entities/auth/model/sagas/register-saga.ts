import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { API, RegisterBody, ServerError, Tokens } from '@/shared/api'
import { jwtTokenService } from '@/shared/lib/jwt-token-service'
import { login } from './login-saga'

export const register = createPromiseAction('AUTH_REGISTER')<RegisterBody, Tokens, AxiosError>()

function* worker(action: PromiseAction<string, RegisterBody, any>) {
  try {
    const { data: tokens } = yield call(API.auth.register, action.payload)
    jwtTokenService.updateTokens(tokens)
    const { data: user } = yield call(API.auth.getCurrentUser)
    yield put(login.success(user))
    resolvePromiseAction(action, user)
  } catch (err) {
    const error = err as AxiosError<ServerError>
    rejectPromiseAction(action, error)
  }
}

export function* registerSaga() {
  yield takeEvery(register.request, worker)
}
