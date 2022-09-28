import React from 'react'
import { GiSevenPointedStar } from 'react-icons/gi'

export default function Result({ result }) {
  return (
    <div className="m-2 ml-20 flex w-10/12 items-center space-x-3 rounded-md bg-slate-200 p-2 pl-6 hover:bg-blue-200">
      <GiSevenPointedStar color="rgb(100 200 300 / var(--tw-bg-opacity))" />
      <h2 className="font-sans text-lg">{result}</h2>
    </div>
  )
}
