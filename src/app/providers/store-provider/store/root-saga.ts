import { all, fork } from 'redux-saga/effects'
import { authSaga } from '@features/auth/auth-saga'
import { registerAnswerSaga } from '@features/current-learn-session/register-answer'

export default function* rootSaga() {
  yield all([fork(authSaga), fork(registerAnswerSaga)])
}
