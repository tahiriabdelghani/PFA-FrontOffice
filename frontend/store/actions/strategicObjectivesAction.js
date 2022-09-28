import {SAMPLE_ERROR, ADD_STRATEGIC_OBJECTIVE,GET_STRATEGIC_OBJECTIV } from '../types'

export const addStrategicObjectives = (response) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_STRATEGIC_OBJECTIVE,
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}

export const getStrategicObjectives = () => async (dispatch) => {
    try {
      dispatch({
        type: GET_STRATEGIC_OBJECTIVE,
      })
    } catch (error) {
      dispatch({
        type: SAMPLE_ERROR,
        payload: 'error message',
      })
    }
  }