import { SAMPLE_ERROR, ADD_DIGITAL_RESPONSE } from '../types'

export const addDigitalResponse = (response) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_DIGITAL_RESPONSE,
      payload: response,
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}
