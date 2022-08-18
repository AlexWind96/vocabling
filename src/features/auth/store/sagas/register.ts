import {
  PromiseAction,
  createPromiseAction,
  rejectPromiseAction,
  resolvePromiseAction,
} from 'redux-saga-promise-actions'
import { call, put, takeEvery } from 'redux-saga/effects'
import { AuthUser } from '@/features/auth'
import { FirebaseError } from '@/services'
import { RegisterUserDTO, authService } from '../../services'
import { AUTH_REGISTER_FAILED, AUTH_REGISTER_REQUEST, AUTH_REGISTER_SUCCESS } from './actionTypes'

export const register = createPromiseAction(
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILED
)<RegisterUserDTO, { user: AuthUser }, Error>()

function* worker(action: PromiseAction<string, RegisterUserDTO, any>) {
  try {
    const response = yield call(authService.register, action.payload)

    yield put(register.success({ user: response }))
    resolvePromiseAction(action, {
      user: response,
    })
  } catch (err) {
    const error = err as FirebaseError
    rejectPromiseAction(action, error)
  }
}

export function* registerSaga() {
  yield takeEvery(register.request, worker)
}
