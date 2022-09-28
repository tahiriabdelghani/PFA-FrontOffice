import { ADD_DIGITAL_RESPONSE } from '../types'

const initialState = {
  digitalResponses: [],
}

const digitalResponsesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DIGITAL_RESPONSE:
      return {
        ...state,
        digitalResponses: [...state.digitalResponses, action.payload],
      }

    default:
      return state
  }
}

export default digitalResponsesReducer
