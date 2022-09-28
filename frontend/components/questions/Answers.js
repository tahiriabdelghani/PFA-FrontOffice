import React from 'react'
import Answer from './Answer'
import { useState, useEffect } from 'react'

export default function Answers({ question, selectedAnswer, counter }) {
  const [selectedResponses, setSelectedResponses] = useState([])
  const [questionCounter, setQuestionCounter] = useState(0)
  const checkHandler = (text) => {
    setSelectedResponses((state) => [...state, text])
  }
  const uncheckHandler = (text) => {
    setSelectedResponses((state) => state.filter((element) => element !== text))
  }
  useEffect(() => {
    selectedAnswer(selectedResponses)
  }, [selectedResponses])
  useEffect(() => {
    setSelectedResponses([])
  }, [counter])
  return (
    <div className="m-2 h-full w-[640px] cursor-pointer  rounded-xl border-2 p-2 pr-8 ">
      <h2 className="m-1 rounded-lg border bg-gray-200 p-3 text-xl">
        {question && question.question}
      </h2>
      {question &&
        question.responses.map((response) => (
          <Answer
            isChecked={checkHandler}
            isUnchecked={uncheckHandler}
            key={response.name+""+counter}
            text={response.name}
          />
        ))}
    </div>
  )
}
