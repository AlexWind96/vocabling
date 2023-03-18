import { AxiosError } from 'axios';
import { PromiseAction, createPromiseAction, rejectPromiseAction, resolvePromiseAction } from 'redux-saga-promise-actions';
import { call, takeEvery } from 'redux-saga/effects';
import { useUser } from '@/entities/user';
import { API, RegisterBody, ServerError } from '@/shared/api';
import { jwtTokenService } from '@/shared/lib/jwt-token-service';
import { queryClient } from '@/shared/lib/react-query'


export const register = createPromiseAction('AUTH_REGISTER')<RegisterBody, undefined, AxiosError>()

function* worker(action: PromiseAction<string, RegisterBody, any>) {
  try {
    const { data: tokens } = yield call(API.auth.register, action.payload)
    jwtTokenService.updateTokens(tokens)
    queryClient.invalidateQueries(useUser.getKey())
    resolvePromiseAction(action)
  } catch (err) {
    const error = err as AxiosError<ServerError>
    rejectPromiseAction(action, error)
  }
}

export function* registerSaga() {
  yield takeEvery(register.request, worker)
}
