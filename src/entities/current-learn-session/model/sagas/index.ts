import { all, fork } from 'redux-saga/effects'
import { registerAnswer, registerAnswerSaga } from './register-answer.saga'

export function* saga() {
  yield all([fork(registerAnswerSaga)])
}

export { registerAnswer }
