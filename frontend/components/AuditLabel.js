import React from 'react'
import Question from './questions/QuestionNumber'

export default function AuditLabel({ number, label, audit }) {
  return (
    <div className={`flex w-80 cursor-pointer flex-row space-x-4 rounded-md bg-blue-400 p-2  hover:bg-blue-300 ${audit===label && "bg-blue-200"}`}>
      <div className="ml-3 h-10 w-10 rounded-full bg-blue-100 ">
        <p className="pt-[8px] text-center font-semibold">{number}</p>
      </div>
      <div className="mt-2 items-center  font-semibold ">
        <h2 className="">{label}</h2>
      </div>
    </div>
  )
}
