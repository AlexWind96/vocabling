import { all, fork } from 'redux-saga/effects'
import { authSaga } from '@features/auth/auth-saga'

export default function* rootSaga() {
  yield all([fork(authSaga)])
}
