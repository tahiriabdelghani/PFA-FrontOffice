import {SAMPLE_ERROR, ADD_RESPONSE } from '../types'

export const addResponse = (response) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_RESPONSE,
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}
