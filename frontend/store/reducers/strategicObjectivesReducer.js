import { ADD_STRATEGIC_OBJECTIVE, GET_STRATEGIC_OBJECTIVE } from '../types'

const initialState = {
  strategicObjectives: [],
}

const strategicObjectivesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_STRATEGIC_OBJECTIVE:
      return {
        ...state,
        strategicObjectives: action.payload,
      }

    case GET_STRATEGIC_OBJECTIVE:
      return state

    default:
      return state
  }
}

export default strategicObjectivesReducer
