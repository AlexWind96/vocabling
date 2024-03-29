import { all, fork } from 'redux-saga/effects'
import { loginSaga } from './login'
import { logoutSaga } from './logout'
import { registerSaga } from './register'

export function* authSaga() {
  yield all([fork(loginSaga), fork(logoutSaga), fork(registerSaga)])
}
