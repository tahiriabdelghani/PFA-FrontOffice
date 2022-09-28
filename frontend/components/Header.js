import React from 'react'
import AuditLabel from '../components/AuditLabel'

export default function Header({audit}) {
  return (
    <div>
      <div className="mt-14 flex flex-row space-x-3">
        <AuditLabel audit={audit} number="1" label="Audit Stratégique" />
        <AuditLabel audit={audit} number="2" label="Audit Digital" />
        <AuditLabel audit={audit} number="3" label="Audit Culturel" />
      </div>
    </div>
  )
}
