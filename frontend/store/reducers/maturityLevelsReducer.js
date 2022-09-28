import { ADD_MATURITY_LEVELS, GET_MATURITY_LEVELS } from '../types'

const initialState = {
  maturityLevels: [],
}

const maturityLevelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MATURITY_LEVELS:
      return {
        ...state,
        maturityLevels: action.payload,
      }

    case GET_MATURITY_LEVELS:
      return state

    default:
      return state
  }
}

export default maturityLevelsReducer
