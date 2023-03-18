import { all, fork } from 'redux-saga/effects'
import { currentLearnSession } from '@/entities/current-learn-session'
import { authSaga } from '@/features/auth/auth-saga'

export default function* rootSaga() {
  yield all([fork(authSaga), fork(currentLearnSession.saga)])
}
