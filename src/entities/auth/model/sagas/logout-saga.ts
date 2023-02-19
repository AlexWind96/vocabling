import { createPromiseAction } from 'redux-saga-promise-actions'
import { takeEveryPromiseAction } from 'redux-saga-promise-actions/effects'
import { call, put } from 'redux-saga/effects'
import { API } from '@/api'
import { jwtTokenService } from '@/shared/lib/jwt-token-service'

export const logout = createPromiseAction('AUTH_LOGOUT')<undefined, any, Error>()

function* worker() {
  yield call(API.endpoints.auth.logout)
  jwtTokenService.removeTokens()
  yield put(logout.success(undefined))
}

export function* logoutSaga() {
  yield takeEveryPromiseAction(logout, worker)
}
