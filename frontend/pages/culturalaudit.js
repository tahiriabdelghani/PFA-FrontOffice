import QuestNumeration from '../components/questions/QuestNumeration'
import Answers from '../components/questions/Answers.js'
import Header from '../components/Header'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../components/Button'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCulturalResponse } from '../store/actions/culturalResponsesAction'
import useHttp from '../store/requests.js'
import { culturalHost } from '../store/requests.js'

const feed = () => {
  const [culturalQuestions, setCulturalQuestions] = useState([])
  const [selectedResponse, setSelectedResponse] = useState('')
  const [counter, setCounter] = useState(0)

  const transformCulturalQuestions=(questions)=>{
    let loadedQuestions=[]
    let responses=[]
    for(let key in questions){
      for (let keey in questions[key].responsesAndniveau){
        responses.push({
          name: questions[key].responsesAndniveau[keey].response,
          score: questions[key].responsesAndniveau[keey].niveau,
        })
      }
      loadedQuestions.push({
        question: questions[key].question,
      responses: responses,
      objective: questions[key].axe,
      })
      responses=[]
    }
    setCulturalQuestions(loadedQuestions)
  }

  const { isLoading, error, sendRequest: getCulturalQuestions } = useHttp()
  useEffect(() => {
    getCulturalQuestions(
      {
        url: culturalHost + '/get-cultural-questions',
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (data) => {
        console.log(data)
        transformCulturalQuestions(data)
      }
    )

  }, [])

  const dispatch = useDispatch()
  const router = useRouter()
  const counterHandler = () => {
    if (counter === culturalQuestions.length - 1) {
      router.push('/culturalresults')
    }
    if (selectedResponse) {
      dispatch(
        addCulturalResponse({
          question: culturalQuestions[counter].question,
          response: {
            name: selectedResponse,
            score: culturalQuestions[counter].responses.filter(
              (response) => response.name === selectedResponse
            )[0].score,
          },
          axe: culturalQuestions[counter].objective,
        })
      )
      setCounter(counter + 1)
    }
  }

  const answerHandler = (answer) => {
    setSelectedResponse(answer[0])
  }


  return (
    <div className="g-6 flex h-full flex-col items-center justify-center">
      <Header audit="Audit Culturel" />
      <div className="mt-6 flex  justify-between ">
        <div className="flex-[0.3] ">
          <QuestNumeration counter={counter} size={culturalQuestions.length} />
        </div>
        <div className="flex-[0.64]">
          <Answers
            selectedAnswer={answerHandler}
            question={culturalQuestions[counter]}
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
