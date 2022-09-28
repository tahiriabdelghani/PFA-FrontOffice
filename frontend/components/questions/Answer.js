import React from 'react'
import { useState, useEffect } from 'react'

export default function Answer({ text, isChecked, isUnchecked }) {
  const [checked, setChecked] = useState(false)
  const checkBoxHandler = () => {
    setChecked((value) => !value)
  }
  useEffect(() => {
    if (checked) {
      isChecked(text)
    }else{
      isUnchecked(text)
    }
  },[checked])
  return (
    <div className="mb-2 ml-6 space-x-2 rounded-lg bg-gray-50 p-2 text-left text-lg">
      <input type="checkbox" name="input" onChange={checkBoxHandler} />
      <label htmlFor="input">{text}</label>
    </div>
  )
}
