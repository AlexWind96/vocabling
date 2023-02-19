import { all, fork } from 'redux-saga/effects'
import { auth } from '@/entities/auth'

export default function* rootSaga() {
  yield all([fork(auth.model.saga)])
}
