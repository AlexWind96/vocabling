import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, takeEvery } from 'redux-saga/effects'
import { API, LoginBody, ServerError } from '@shared/api'
import { jwtTokenService } from '@shared/lib/jwt-token-service'
import { queryClient } from '@shared/lib/react-query'
import { useUserQuery } from '@entities/user'

export const loginAction = createPromiseAction('AUTH_LOGIN')<LoginBody, undefined, AxiosError>()

function* worker(action: PromiseAction<string, LoginBody, any>) {
  try {
    const { data: tokens } = yield call(API.auth.login, action.payload)
    jwtTokenService.updateTokens(tokens)
    queryClient.invalidateQueries(useUserQuery.getKey())
    resolvePromiseAction(action)
  } catch (err) {
    const error = err as AxiosError<ServerError>
    rejectPromiseAction(action, error)
  }
}

export function* loginSaga() {
  yield takeEvery(loginAction.request, worker)
}
