import React from 'react'
import QuestNumeration from './questions/QuestNumeration'
import Answers from '../components/questions/Answers'

export default function Feed() {
  return (
    <div className=" mt-6 grid w-4/6 grid-cols-3  space-x-3">
      <div className="z-20  w-[280px]">
        <QuestNumeration />
      </div>
      <div className="col-span-2 ">
        <Answers />
      </div>
    </div>
  )
}
