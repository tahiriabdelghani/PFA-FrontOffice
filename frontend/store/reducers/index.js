import { combineReducers } from 'redux'
import questionReducer from './questionReducer'
import responsesReducer from './responsesReducer'
import digitalResponsesReducer from './digitalResponsesReducer'
import maturityLevelsReducer from './maturityLevelsReducer'
import strategicObjectives from './strategicObjectivesReducer'
import digitalAxes from './digitalAxesReducer'
import culturalResponses from './culturalResponsesReducer'

export default combineReducers({
  questions: questionReducer,
  responses: responsesReducer,
  digitalResponses: digitalResponsesReducer,
  maturityLevels: maturityLevelsReducer,
  strategicObjectives: strategicObjectives,
  digitalAxes: digitalAxes,
  culturalResponses: culturalResponses,
})
