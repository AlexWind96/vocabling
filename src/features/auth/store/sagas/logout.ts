import { createPromiseAction } from 'redux-saga-promise-actions'
import { takeEveryPromiseAction } from 'redux-saga-promise-actions/effects'
import { call } from 'redux-saga/effects'
import { authService } from '../../services'
import { AUTH_LOGOUT_FAILED, AUTH_LOGOUT_REQUEST, AUTH_LOGOUT_SUCCESS } from './actionTypes'

export const logout = createPromiseAction(
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILED
)<undefined, any, Error>()

function* worker() {
  yield call(authService.logout)
}

export function* logoutSaga() {
  yield takeEveryPromiseAction(logout, worker)
}
