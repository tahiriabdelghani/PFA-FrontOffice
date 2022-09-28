import React, { useEffect, useState } from 'react'
import Result from '../components/results/Result'
import ResultTitle from '../components/results/ResultTitle'
import Header from '../components/Header'
import Link from 'next/link'
import Button from '../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import useHttp from '../store/requests.js'
import { culturalHost } from '../store/requests.js'

export default function culturalresults() {
  const [initiatives, setInitiatives] = useState([])
  const [axesScore, setAxesScore] = useState([])
  const [touched, setTouched] = useState(false)
  const [filteredResponses, setFilteredResponses] = useState([])
  const dispatch = useDispatch()
  const data = useSelector((state) => state.culturalResponses)
  const { culturalResponses } = data

  const { isLoading, error, sendRequest: getCulturalInitiatives } = useHttp()
  useEffect(() => {
    getCulturalInitiatives(
      {
        url: culturalHost + '/send-cultural-responses',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { responses: filteredResponses },
      },
      (data) => {
        console.log(data)
        setAxesScore(data)
      }
    )
    getCulturalInitiatives(
      {
        url: culturalHost + '/get-cultural-initiatives',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { cultural_data : axesScore },
      },
      (data) => {
        console.log(data+"initiatives")
        //   setObjectives(data.selectedObjectives)
        //   dispatch(addStrategicObjectives(data.selectedObjectives))
      }
    )
    setTouched(true)
  }, [filteredResponses])

  useEffect(() => {
    console.log('in')
    let axes = []
    for (let key in culturalResponses) {
      console.log('in1')
      if (axes.includes(culturalResponses[key].axe)) {
        return
      }
      axes.push(culturalResponses[key].axe)
      let scores = []
      for (let keey in culturalResponses) {
        console.log('in2')
        if (culturalResponses[key].axe === culturalResponses[keey].axe) {
          // console.log(culturalResponses[keey].response.score)
          scores.push(culturalResponses[keey].response.score)
        }
      }
      console.log([
        ...filteredResponses,
        { cultural_axe: culturalResponses[key].axe, score: scores },
      ])
      setFilteredResponses([
        ...filteredResponses,
        { cultural_axe: culturalResponses[key].axe, scores: scores },
      ])
      scores = []
    }
  }, [culturalResponses])

  return (
    <div className="flex min-h-screen flex-col items-center ">
      <Header audit="Audit Culturel" />
      <div className=" mt-6  cursor-pointer rounded-xl border-2 p-1 pr-8 ">
        <ResultTitle title="Culturel" />
        {axesScore &&
          axesScore.map((element) => (
            <Result
              result={element.cultural_axe + ' with a score : ' + element.score}
            />
          ))}
      </div>
      <div className="mt-2 flex justify-end">
        <Button link="/" text="finish" />
      </div>
    </div>
  )
}
