import React, { useEffect } from 'react'
import { track } from '@utils'

export default function RecordPartnerB () {
  useEffect(() => {
    track('Partner B View', {
      page: 'partner B'
    })
  }, [])
  return (
    <div className='hidden' >
        <p>Partner B</p>
    </div>
  )
}
