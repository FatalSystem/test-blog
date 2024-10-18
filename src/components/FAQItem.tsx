import { useState } from 'react'

const FAQ = [
  {
    question: 'Does it work on clay courts?',
    answer: <p>Yes! The Tennibot works on both clay and hard courts. If you have a question about performance on your court or a unique surface type please reach out at <span className='text-t-green' >info@tennibot.com</span></p>
  },
  {
    question: 'Is the Tennibot portable?',
    answer: 'Yes! The Tennibot weighs only 26lbs and can be easily transported. With the arms stowed, the Rover fits in the trunk of most cars. To get to and from the court, you can use the rear handle to roll the Tennibot like a suitcase.'
  },
  {
    question: 'Does the Tennibot really save that much time?',
    answer: 'In an average hour long session, you may spend up to 20 minutes of your time on the court collecting balls. That’s 30% of your practice time wasted! With Tennibot, that time drops to almost zero, meaning you can use that time to hit hundreds of extra shots every practice.'
  },
  {
    question: 'How do I control the Tennibot?',
    answer: 'Through the Tennibot app, you can select which zones you want to clear, or even control the Rover manually. The app also allows you to keep track of valuable data, such as match statistics and Station video recordings. The app is available for iOS and Android.'
  },
  {
    question: 'What does the Station do?',
    answer: 'The Station helps the Rover navigate the court. It can also be used with or without a Rover, to record video and gather valuable match data. It can even recommend areas of your game that need improvement. A Station is included with every purchase of a Rover.'
  },
  {
    question: 'Do I need an internet connection to operate the Tennibot?',
    answer: 'The Tennibot has its own Wi-Fi network that you can connect to in order to control it.  You will need an internet connection to create an account and complete the initial setup, but it is not necessary for your court to have internet access in order to operate the Tennibot.'
  },
  {
    question: 'What is included in the warranty?',
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

interface IFAQItem {
  question: string
  answer: string | JSX.Element
  index: number
}

export default function FAQItem ({ question, answer, index }: IFAQItem): JSX.Element {
  const [hideAnswer, setHideAnswer] = useState(true)
  return (
    <button onClick={() => { setHideAnswer(!hideAnswer) }} className="border-[1px] w-full border-t-off-white text-left rounded-lg px-8 py-4 mb-6" >
        <div className="flex flex-row justify-between items-center" >
            <h6 className="font-plutoBold text-t-off-white xl:text-xl" >{question}</h6>
            <div className={`${hideAnswer ? 'rotate-0' : 'rotate-180'} ml-5 transition-all ease-in-out duration-500`} >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="16" viewBox="0 0 28 16" fill="none">
                    <path d="M27.3144 3.91534C27.7534 3.48564 28 2.90285 28 2.29517C28 1.68748 27.7534 1.10469 27.3144 0.674992C26.8753 0.245296 26.2799 0.00389437 25.659 0.00389438C25.0382 0.00389438 24.4428 0.245296 24.0037 0.674992L14.002 10.4873L4.00023 0.674992C3.7835 0.46111 3.52564 0.291348 3.24154 0.175497C2.95743 0.059646 2.65271 3.02263e-07 2.34493 3.05934e-07C2.03716 3.09604e-07 1.73243 0.0596461 1.44832 0.175497C1.16422 0.291348 0.906366 0.46111 0.689631 0.674992C0.471111 0.887128 0.297665 1.13951 0.1793 1.41759C0.0609379 1.69566 1.93113e-06 1.99392 1.93472e-06 2.29517C1.93831e-06 2.59641 0.0609379 2.89467 0.1793 3.17274C0.297665 3.45082 0.471111 3.7032 0.689631 3.91534L12.3467 15.325C12.5634 15.5389 12.8213 15.7087 13.1054 15.8245C13.3895 15.9404 13.6942 16 14.002 16C14.3098 16 14.6145 15.9404 14.8986 15.8245C15.1827 15.7087 15.4406 15.5389 15.6573 15.325L27.3144 3.91534Z" fill="#F6F7F2"/>
                </svg>
            </div>
        </div>

        <p className={`font-plutoLight overflow-hidden text-t-off-white text-pretty xl:text-lg ${hideAnswer ? 'max-h-0 opacity-0 mt-0' : 'max-h-[1000px] opacity-100 mt-5'} transition-all ease-in-out duration-500`} >{FAQ[index].answer}</p>

    </button>
  )
}
