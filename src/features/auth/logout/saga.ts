import { createPromiseAction } from 'redux-saga-promise-actions'
import { takeEveryPromiseAction } from 'redux-saga-promise-actions/effects'
import { call, put } from 'redux-saga/effects'
import { API } from '@shared/api'
import { jwtTokenService } from '@shared/lib/jwt-token-service'
import { queryClient } from '@shared/lib/react-query'

export const logoutAction = createPromiseAction('AUTH_LOGOUT')<undefined, any, Error>()

function* worker() {
  yield call(API.auth.logout)
  queryClient.clear()
  jwtTokenService.removeTokens()
  yield put(logoutAction.success(undefined))
}

export function* logoutSaga() {
  yield takeEveryPromiseAction(logoutAction, worker)
}
