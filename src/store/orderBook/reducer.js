import {
  DECREMENT_PRECISION,
  INCREMENT_PRECISION,
  SUBSCRIBED,
} from './types'

const initialState = {
  isSubscribed: false,
  precision: 0,
  chanId: '',
}

export const orderBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBSCRIBED:
      return {
        ...state,
        isSubscribed: true,
        chanId: action.payload,
      }
    case INCREMENT_PRECISION:
      return {
        ...state,
        precision: state.precision + 1,
        isSubscribed: false,
      }
    case DECREMENT_PRECISION:
      return {
        ...state,
        precision: state.precision - 1,
        isSubscribed: false,
      }

    default:
      return state
  }
}
