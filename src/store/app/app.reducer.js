import { combineReducers } from 'redux'
import { orderBookReducer } from 'store/orderBook/reducer'

export const appReducer = combineReducers({
  orderBook: orderBookReducer,
})
