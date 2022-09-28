import React from 'react'
import QuestionNumber from './QuestionNumber'

export default function QuestNumeration({ counter, size, className}) {
  let numbers = []
  for (let i = 1; i < size + 1; i++) {
    numbers.push(i)
  }
  return (
    <div className={`mr-6 grid  cursor-pointer grid-cols-4 gap-8  rounded-xl border-2 pt-4 pb-2 pr-8  ${className ? className : "w-[300px]"}`}>
      {numbers.map((number) => (
        <QuestionNumber key={number} counter={counter+1} number={number} />
      ))}
    </div>
  )
}
