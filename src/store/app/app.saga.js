import { fork } from 'redux-saga/effects'
import { watchOrderBook } from 'store/orderBook/saga'

export const appSaga = function* saga() {
  yield fork(watchOrderBook)
}
