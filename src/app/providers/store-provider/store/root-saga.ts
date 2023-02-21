import { all, fork } from 'redux-saga/effects'
import { auth } from '@/entities/auth'
import { currentLearnSession } from '@/entities/current-learn-session'

export default function* rootSaga() {
  yield all([fork(auth.model.saga), fork(currentLearnSession.saga)])
}
