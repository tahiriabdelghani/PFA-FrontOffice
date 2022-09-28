import QuestNumeration from '../components/questions/QuestNumeration'
import Answers from '../components/questions/Answers.js'
import Header from '../components/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuestions } from '../store/actions/questionAction'
import { addStrategicObjectives } from '../store/actions/strategicObjectivesAction'
import { addResponse } from '../store/actions/responseAction'
import useHttp from '../store/requests.js'
import { strategicHost } from '../store/requests.js'

const feed = () => {
  const [strategicQuestions, setStrategicQuestions] = useState([])
  const [selectedResponse, setSelectedResponse] = useState('')
  const [counter, setCounter] = useState(0)

  const dispatch = useDispatch()
  const router = useRouter()
  const counterHandler = () => {
    if (counter === strategicQuestions.length - 1) {
      router.push('/objectivesresults')
    }
    if (selectedResponse) {
      dispatch(
        addResponse({
          question: strategicQuestions[counter].question,
          response: {
            name: selectedResponse,
            score: strategicQuestions[counter].responses.filter(
              (response) => response.name === selectedResponse
            )[0].score,
          },
          objective: strategicQuestions[counter].objective,
          percentage: strategicQuestions[counter].percentage,
        })
      )
      setCounter(counter + 1)
    }
  }

  const answerHandler = (answer) => {
    setSelectedResponse(answer[0])
  }

  // const questionsData = useSelector((state) => state.questions)
  // const { questions } = questionsData
  const transformQuestions = (questions) => {
    let loadedQuestions = []
    let responses=[]
    for (let key in questions) {
      for (let keey in questions[key].responsesAndscore){
        responses.push({
          name: questions[key].responsesAndscore[keey].response,
          score: questions[key].responsesAndscore[keey].score,
        })
      }
      loadedQuestions.push({
        question: questions[key].question,
        responses: responses,
        objective: questions[key].objective,
        percentage: questions[key].pourcentage,
      })
      responses=[]
    }
    setStrategicQuestions(loadedQuestions)
  }


  const { isLoading, error, sendRequest: getStrategicQuestions } = useHttp()
  useEffect(() => {
    getStrategicQuestions(
      {
        url: strategicHost + '/',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
      },
      (data) => {
        console.log(data)
        transformQuestions(data)
      }
    )

    // dispatch(getQuestions())
    // dispatch(
    //   addStrategicObjectives([
    //     'objective1',
    //     'objective2',
    //     'objective3',
    //     'objective4',
    //   ])
    // )
  }, [dispatch])


  return (
    <div className="g-6 flex h-full flex-col items-center justify-center">
      <Header audit="Audit Stratégique" />
      <div className="mt-6 flex  justify-between ">
        <div className="flex-[0.3] ">
          <QuestNumeration counter={counter} size={strategicQuestions.length} />
        </div>
        <div className="flex-[0.64]">
          <Answers
            selectedAnswer={answerHandler}
            question={strategicQuestions[counter]}
            counter={counter}
          />
        </div>
      </div>
      <div className="ml-30 mt-3 flex space-x-2 pl-96">
        <Button text="Next" onClick={counterHandler} />
      </div>
    </div>
  )
}
export default feed
