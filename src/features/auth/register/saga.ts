import { AxiosError } from 'axios'
import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, takeEvery } from 'redux-saga/effects'
import { API, RegisterBody, ServerError } from '@shared/api'
import { jwtTokenService } from '@shared/lib/jwt-token-service'
import { queryClient } from '@shared/lib/react-query'
import { useUserQuery } from '@entities/user'

export const registerAction = createPromiseAction('AUTH_REGISTER')<
  RegisterBody,
  undefined,
  AxiosError
>()

function* worker(action: PromiseAction<string, RegisterBody, any>) {
  try {
    const { data: tokens } = yield call(API.auth.register, action.payload)
    jwtTokenService.updateTokens(tokens)
    queryClient.invalidateQueries(useUserQuery.getKey())
    resolvePromiseAction(action)
  } catch (err) {
    const error = err as AxiosError<ServerError>
    rejectPromiseAction(action, error)
  }
}

export function* registerSaga() {
  yield takeEvery(registerAction.request, worker)
}
