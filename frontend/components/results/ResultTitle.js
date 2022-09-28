import React from 'react'

export default function ResultTitle({ title }) {
  return (
    <div className="ml-8 p-4">
      <h1 className="text-xl font-semibold">Résultats de l'audit {title}</h1>
    </div>
  )
}
