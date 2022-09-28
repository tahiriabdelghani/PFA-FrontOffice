import {SAMPLE_ERROR, ADD_MATURITY_LEVELS ,GET_MATURITY_LEVELS } from '../types'

export const addMaturityLevels = (response) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_MATURITY_LEVELS,
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}
export const getMaturityLevels = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MATURITY_LEVELS,
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}