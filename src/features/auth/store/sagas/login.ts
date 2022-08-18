import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { AuthUser } from '@/features/auth'
import { LoginUserDTO, authService } from '../../services'
import { AUTH_LOGIN_FAILED, AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS } from './actionTypes'

export const login = createPromiseAction(AUTH_LOGIN_REQUEST, AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILED)<
  LoginUserDTO,
  { user: AuthUser },
  Error
>()

function* worker(action: PromiseAction<string, LoginUserDTO, any>) {
  try {
    const response = yield call(authService.login, action.payload)

    yield put(login.success({ user: response }))
    resolvePromiseAction(action, {
      user: response,
    })
  } catch (err) {
    const error = err as Error
    rejectPromiseAction(action, error.message)
  }
}

export function* loginSaga() {
  yield takeEvery(login.request, worker)
}
