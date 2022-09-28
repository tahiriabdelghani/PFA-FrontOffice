import { ADD_DIGITAL_AXES } from '../types'

const initialState = {
    digitalAxes: [],
}

const digitalAxesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIGITAL_AXES:
      return {
        ...state,
        digitalAxes: action.payload,
      }

    default:
      return state
  }
}

export default digitalAxesReducer