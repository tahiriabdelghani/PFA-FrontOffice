import { ADD_RESPONSE } from '../types'

const initialState = {
  responses: [],
}

const responsesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_RESPONSE:
      return {
        ...state,
        responses: [...state.responses, action.payload],
      }

    default:
      return state
  }
}

export default responsesReducer

