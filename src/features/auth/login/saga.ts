import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, takeEvery } from 'redux-saga/effects'
import { useUser } from '@/entities/user'
import { API, LoginBody, ServerError } from '@/shared/api'
import { jwtTokenService } from '@/shared/lib/jwt-token-service'
import { queryClient } from '@/shared/lib/react-query'

export const login = createPromiseAction('AUTH_LOGIN')<LoginBody, undefined, AxiosError>()

function* worker(action: PromiseAction<string, LoginBody, any>) {
  try {
    const { data: tokens } = yield call(API.auth.login, action.payload)
    jwtTokenService.updateTokens(tokens)
    queryClient.invalidateQueries(useUser.getKey())
    resolvePromiseAction(action)
  } catch (err) {
    const error = err as AxiosError<ServerError>
    rejectPromiseAction(action, error)
  }
}

export function* loginSaga() {
  yield takeEvery(login.request, worker)
}
