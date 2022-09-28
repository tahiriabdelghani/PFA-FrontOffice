import Axes from '../components/digitalQuestions/Axes.js'
import QuestNumeration from '../components/questions/QuestNumeration.js'
import Answers from '../components/questions/Answers.js'
import Button from '../components/Button'
import Header from '../components/Header'
import useHttp, { digitalHost } from '../store/requests.js'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addDigitalResponse } from '../store/actions/digitalResponsesAction'
import { addMaturityLevels } from '../store/actions/maturityLevelsAction'
import { addDigitalAxes } from '../store/actions/digitalAxesAction'

function digitalaudit() {
  const [digitalChoices, setDigitalChoices] = useState([])
  const [digitalLevels, setDigitalLevels] = useState([])
  const [digitalAxes, setDigitalAxes] = useState([])

  const { isLoading, error, sendRequest } = useHttp()
  const dispatch = useDispatch()
  useEffect(() => {
    sendRequest(
      {
        url: digitalHost + '/get-all-axes',
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      },
      (data) => {
        setDigitalAxes(data)
        dispatch(addDigitalAxes(data))
      }
    )
    sendRequest(
      {
        url: digitalHost + '/get-all-levels',
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      },
      (data) => {
        setDigitalLevels(data)
      }
    )
  }, [])

  useEffect(() => {
    if (digitalAxes && digitalLevels) {
      for (let key = 0; key < digitalAxes.length; key++) {
        // console.log("axe : "+digitalAxes[key]._id)
        for (let keey in digitalLevels) {
          // console.log(digitalLevels[keey]._id)
          sendRequest(
            {
              url:
                digitalHost +
                `/get-choices-by-filters/${digitalAxes[key]._id}/${digitalLevels[keey]._id}`,
              method: 'get',
              headers: { 'Content-Type': 'application/json' },
            },
            (data) => {
              setDigitalChoices((state) => [
                ...state,
                {
                  question: digitalAxes[key].name,
                  level: digitalLevels[keey].degree,
                  responses: data,
                },
              ])
            }
          )
        }
      }
    }
  }, [digitalAxes, digitalLevels])
  // console.log(digitalChoices)

  const [levelsCounter, setLevelsCounter] = useState(0)

  const [axesCounter, setAxesCounter] = useState(0)

  const [questionsCounter, setQuestionsCounter] = useState(0)

  //a list that stores the answers on each level
  //["digital is fully integrated into organisational plans and the business review cycle": one choice selected in some level]
  const [selectedAnswers, setSelectedAnswers] = useState([])

  //a list that stores the count of answer on each level
  //[2:two choices selected in level 1, 3, 4 , 0,5:five choices selected in level 5]
  const [answersCounter, setAnswersCounter] = useState([])

  //a list that stores every axis' level
  const [axisLevel, setAxisLevel] = useState([])

  // a function that come up with the selected answers from the child Component Answers
  const answersHandler = (answers) => {
    setSelectedAnswers(answers)
    console.log(answers)
  }

  const router = useRouter()

  /**
   * on every click on the next button we increment the levels counter.
   * if the levels' counter is 5 then we increment the axis' counter
   * on every level we count the number of selected answers and push the count to answersCounter
   * and dispatch the responses to redux for the history registration.
   **/
  const counterHandler = () => {
    setAnswersCounter((state) => [...state, selectedAnswers.length])
    console.log('these are the answers checked on every level ', [
      ...answersCounter,
      selectedAnswers.length,
    ])
    if (selectedAnswers && digitalChoices[questionsCounter]) {
      dispatch(
        addDigitalResponse({
          axe: digitalChoices[questionsCounter].question,
          level: digitalChoices[questionsCounter].level,
          choices: selectedAnswers,
        })
      )
    }
    let levels = []

    if (levelsCounter === digitalLevels.length - 1) {
      let answeersCounter = [...answersCounter, selectedAnswers.length]
      //after each click on the next button we insert in the list levels the ids of levels of checked choices
      for (let i = 0; i < digitalLevels.length; i++) {
        console.log(answeersCounter)
        for (let j = 0; j < answeersCounter[i]; j++) {
          levels.push(digitalLevels[i]._id)
          console.log('level_id' + digitalLevels[i]._id)
        }
      }
      setAxisLevel((state) => [
        ...state,
        {
          axe_id: digitalAxes[axesCounter]._id,
          levels: levels,
        },
      ])
      setAxesCounter(axesCounter + 1)
      setQuestionsCounter(questionsCounter + 1)
      setLevelsCounter(0)
      setAnswersCounter([])
      return
    }
    if (axesCounter === digitalAxes.length) {
      console.log(axisLevel)

      sendRequest(
        {
          url: digitalHost + '/send-choices',
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: { choices: axisLevel },
        },
        (data) => {
          console.log(data)
          dispatch(addMaturityLevels(data))
          console.log('dispatched')
        }
      )

      //the digital audit is finished redirect to result
      router.push('/initiatives')
    }
    // setAnswersCounter((state) => [...state, selectedAnswers.length])
    setLevelsCounter((state) => state + 1)
    setQuestionsCounter(questionsCounter + 1)
  }

  return (
    <div className="g-6 flex h-full flex-col items-center justify-center">
      <Header audit="Audit Digital" />
      <div className="align-center flex w-full justify-center ">
        <div className="m-2 flex-[0.55] p-2">
          <Axes axes={digitalAxes} axisCounter={axesCounter} />
          <QuestNumeration
            className="w-full"
            counter={levelsCounter}
            size={digitalLevels.length}
          />
        </div>
        <Answers
          selectedAnswer={answersHandler}
          question={digitalChoices[questionsCounter]}
          counter={questionsCounter}
        />
      </div>
      <div className="ml-30 mt-3 flex space-x-2 pl-96">
        <Button text="Next" onClick={counterHandler} />
      </div>
    </div>
  )
}
export default digitalaudit
