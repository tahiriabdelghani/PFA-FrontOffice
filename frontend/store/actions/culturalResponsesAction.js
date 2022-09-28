import {SAMPLE_ERROR, ADD_CULTURAL_RESPONSE } from '../types'

export const addCulturalResponse = (response) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_CULTURAL_RESPONSE,
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}
