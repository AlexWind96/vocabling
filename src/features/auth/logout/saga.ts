import { createPromiseAction } from 'redux-saga-promise-actions'
import { takeEveryPromiseAction } from 'redux-saga-promise-actions/effects'
import { call, put } from 'redux-saga/effects'
import { useUser } from '@/entities/user'
import { API } from '@/shared/api'
import { jwtTokenService } from '@/shared/lib/jwt-token-service'
import { queryClient } from '@/shared/lib/react-query'

export const logout = createPromiseAction('AUTH_LOGOUT')<undefined, any, Error>()

function* worker() {
  yield call(API.auth.logout)
  queryClient.setQueryData(useUser.getKey(), null)
  jwtTokenService.removeTokens()
  yield put(logout.success(undefined))
}

export function* logoutSaga() {
  yield takeEveryPromiseAction(logout, worker)
}