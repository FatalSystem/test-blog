import { useEffect } from 'react'
import { getDistinctId, track } from '@utils'

export default function ReserveButton (): JSX.Element {
  const handleCreateCheckout = async (): Promise<void> => {
    try {
      const distinctId = getDistinctId()
      console.log('distinctId', distinctId)
      const response = await fetch('/.netlify/functions/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ distinctId })
      })
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
        <a data-tracking="partner-reserve-button" onClick={handleCreateCheckout} /* href="https://buy.stripe.com/6oEdTp8pygzo5AA9AC" */ className="w-72 cursor-pointer text-xl 2xl:text-2xl 2xl:py-3 rounded-full py-2 font-avenir uppercase text-t-green border-2 transition duration-300 text-center bg-[rgba(192,242,12,0.10)] border-t-green hover:bg-t-green hover:text-t-off-black">Reserve</a>
  )
}
