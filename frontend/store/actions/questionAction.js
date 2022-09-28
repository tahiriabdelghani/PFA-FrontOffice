import { GET_SAMPLE, SAMPLE_ERROR, GET_QUESTIONS } from '../types'

export const getQuestions = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_QUESTIONS,
      payload: [
        {
          question: 'question 1',
          responses: [
            {
              name: 'response 1',
              score: 21,
            },
            {
              name: 'response 2',
              score: 18,
            },
            {
              name: 'response 3',
              score: 25,
            },
          ],
          objective: 'objectif 1',
          percentage: 0.75,
        },
        {
          question: 'question 2',
          responses: [
            {
              name: 'response 1',
              score: 21,
            },
            {
              name: 'response 2',
              score: 18,
            },
            {
              name: 'response 3',
              score: 25,
            },
          ],
          objective: 'objectif 1',
          percentage: 0.75,
        },
        {
          question: 'question 3',
          responses: [
            {
              name: 'response 1',
              score: 21,
            },
            {
              name: 'response 2',
              score: 18,
            },
            {
              name: 'response 3',
              score: 25,
            },
          ],
          objective: 'objectif 1',
          percentage: 0.75,
        },
        {
          question: 'question 4',
          responses: [
            {
              name: 'response 1',
              score: 21,
            },
            {
              name: 'response 2',
              score: 18,
            },
            {
              name: 'response 3',
              score: 25,
            },
          ],
          objective: 'objectif 1',
          percentage: 0.75,
        },
      ],
    })
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: 'error message',
    })
  }
}
