import { all, fork } from 'redux-saga/effects'
import { loginSaga } from './login/saga'
import { logoutSaga } from './logout/saga'
import { registerSaga } from './register/saga'

export function* authSaga() {
  yield all([fork(loginSaga), fork(logoutSaga), fork(registerSaga)])
}
