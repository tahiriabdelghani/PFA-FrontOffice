import { ADD_CULTURAL_RESPONSE } from '../types'

const initialState = {
  culturalResponses: [],
}

const culturalResponsesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CULTURAL_RESPONSE:
      return {
        ...state,
        culturalResponses: [...state.culturalResponses, action.payload],
      }

    default:
      return state
  }
}

export default culturalResponsesReducer

