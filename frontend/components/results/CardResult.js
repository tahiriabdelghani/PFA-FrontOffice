import React, { useEffect, useState } from 'react'
import Result from './Result'
import ResultTitle from './ResultTitle'
import Header from '../Header'
import Link from 'next/link'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { addStrategicObjectives } from '../../store/actions/strategicObjectivesAction'
import useHttp from '../../store/requests.js'
import { strategicHost } from '../../store/requests.js'

export default function CardResult() {
  const[objectives,setObjectives]=useState([])
  const dispatch = useDispatch()
  const data = useSelector((state) => state.responses)
  const { responses } = data

  const { isLoading, error, sendRequest: getStrategicObjectives } = useHttp()
  useEffect(() => {
    getStrategicObjectives(
      {
        url: strategicHost + '/',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token'),
        },
        body: { userId: 'testId', responses },
      },
      (data) => {
        setObjectives(data.selectedObjectives)
        dispatch(addStrategicObjectives(data.selectedObjectives))
      }
    )
  }, [])

  return (
    <div>
      <Header audit="Audit Stratégique"/>
      <div className=" mt-6  cursor-pointer rounded-xl border-2 p-1 pr-8 ">
        <ResultTitle title="Stratégique" />
        {objectives &&
          objectives.map((element) => <Result result={element.obj+" with a score : "+element.scoreTotal} />)}
      </div>
      <div className="mt-2 flex justify-end">
        <Button link="/digitalaudit" text="Passer à l'audit digital" />
      </div>
    </div>
  )
}
