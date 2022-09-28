import {SAMPLE_ERROR, ADD_DIGITAL_AXES } from '../types'

export const addDigitalAxes = (response) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DIGITAL_AXES,
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}
