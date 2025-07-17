import React, { useState } from 'react'

const FAQ: Array<{ question: string, answer: string | JSX.Element }> = [
  {
    question: 'How long does the battery last?',
    answer: 'The Rover and Station can last up to 5 hours on a full charge.'
  },
  {
    question: 'Is the collector safe for clay courts?',
    answer: 'Yes, the collector is safe for clay courts.'
  },
  {
    question: 'Can I use these products indoors?',
    answer: 'Yes, the products can be used indoors.'
  },
  {
    question: 'Can the Tennibot products handle rain?',
    answer: 'Tennibot products are designed to handle a light drizzle of rain or sprinkler water, but they should not be operated in the rain. If the Rover, Partner or Station get wet, turn them off and let them dry completely before powering back on.'
  },
  {
    question: 'What is the warranty period?',
    answer: <>
    <p>When you purchase a Tennibot, it comes with a comprehensive 2-year warranty. This warranty ensures that any malfunctions or defects will be repaired free of charge. Please note that the warranty does not cover losses due to theft, intentional damage, or neglect.</p>
    <p className='font-plutoBold mt-5 mb-2'>Eligibility:</p>
    <ul className='list-disc list-inside'>
      <li>The warranty is included with every outright purchase of a Tennibot.</li>
      <li>Customers on an active rent-to-own plan are also covered under this warranty.</li>
    </ul>
    </>
  }
]

const NewFAQItem = ({ idx, selected, onClick, item }: { idx: number, selected: boolean, onClick: () => void, item: { question: string, answer: string | JSX.Element } }): JSX.Element => {
  return (
    <button onClick={onClick} className={`w-full border-b-2 border-t-off-white overflow-hidden ${idx === 4 ? 'border-opacity-0' : 'border-opacity-60'} pb-4 mb-4`} aria-expanded="false" aria-controls="faq-1">
      <div className="w-full flex justify-between text-left ">
        <span className="text-t-off-white font-plutoBold text-lg">{item.question}</span>
        <svg className={`w-5 h-5 text-t-off-white transition-all ease-in-out duration-500 ${selected ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </div>
      <p className={`text-t-off-white font-plutoLight text-opacity-80 text-left text-pretty ${selected ? 'max-h-[1000px] opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'} transition-all ease-in-out duration-500`} id={`faq-${idx}`}>
          {item.answer}
      </p>
    </button>
  )
}

const NewFAQ = (): JSX.Element => {
  const [selected, setSelected] = useState<number>(-1)
  return (
    <div>
      {FAQ.map((item, index) => (
        <NewFAQItem key={index} idx={index} selected={index === selected} onClick={() => {
          if (index === selected) {
            setSelected(-1)
          } else {
            setSelected(index)
          }
        }} item={item} />
      ))}
    </div>
  )
}

export default NewFAQ
