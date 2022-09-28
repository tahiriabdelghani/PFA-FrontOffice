import { GET_QUESTIONS } from '../types'

const initialState = {
  questions: [],
}

const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questions: action.payload,
      }

    default:
      return state
  }
}

export default questionReducer
