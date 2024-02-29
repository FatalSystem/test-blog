import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Pagination from './Pagination.tsx'

export const tabs = [
  { label: 'General' },
  { label: 'Troubleshooting' }
]

interface Question {
  Question: string
  Answer: string
}

interface Problem {
  problem: string
  solutions: string[]
}

interface TabContainerProps {
  questions: Question[]
  problems: Problem[]
}

export default function TabContainer ({ questions, problems }: TabContainerProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1)

  const goToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const goToNextPage = (): void => {
    setCurrentPage((current) => (current + 1))
  }

  const goToPreviousPage = (): void => {
    setCurrentPage((current) => (current - 1))
  }

  return (
    <div className='w-full bg-t-off-white relative md:border-2 border-0 border-t-off-black rounded-xl md:px-8 md:pt-8 px-4 pt-4  flex flex-col z-[2]' >
        <ul className='flex w-full md:pb-10 pb-5 flex-row tablet:justify-center justify-around' >
            {tabs.map((item, index) => {
              return (
                    <li key={item.label} className='tablet:w-full w-fit cursor-pointer text-center relative h-[24px] flex justify-center min-w-0' onClick={() => {
                      setSelectedTab(index)
                      setCurrentPage(1)
                    }}>
                        <div className='w-fit' >
                            <h4 className={`font-avenir uppercase font-black lg:text-3xl md:text-2xl tablet:text-xl mobilem:text-xl text-lg ${index === selectedTab ? 'text-t-off-black' : 'text-gray-500'}`} >{item.label}</h4>
                            {index === selectedTab
                              ? (
                                <motion.div className="bottom-[-1px] rounded-xl w-full h-[4px] bg-t-off-black" layoutId="underline" />
                                )
                              : null}
                        </div>
                    </li>
              )
            })}
        </ul>
        <div className="absolute z-10 bottom-0 w-[90%] h-[15%] bg-gradient-to-t from-t-off-white from-0% to-100% hidden md:block" />
        <div className="md:h-[50vh] h-fit md:overflow-y-scroll relative px-5 py-0" >
            <div className='hidden relative md:block'>
                {
                    selectedTab === 0
                      ? questions.map((question, index) => {
                        return (
                        <AnimatePresence key={index} mode="wait">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="my-8 ">
                                <h5 className="font-black font-avenir text-xl text-t-off-black text-pretty mb-2" ><span className="mr-2" >Q: </span>{question.Question}</h5>
                                <p className="font-thin font-avenir text-xl text-t-off-black text-pretty " ><span className="text-2xl mr-2" >A: </span>{question.Answer}</p>
                            </motion.div>
                        </AnimatePresence>
                        )
                      })
                      : problems.map((problem, index) => {
                        return (
                          <AnimatePresence key={index} mode="wait" >
                              <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="my-8">
                                  <h6 className="font-bold font-avenir text-xl text-t-off-black text-pretty mb-1" >Problem</h6>
                                  <h5 className="font-bold font-avenir text-xl text-t-off-black text-pretty mb-6" >{problem.problem}</h5>
                                  <h6 className="font-bold font-avenir text-xl text-t-off-black text-pretty mb-2" >Potential Causes and Solutions</h6>
                                  <ul className="font-thin font-avenir text-xl text-t-off-black text-pretty list-disc list-inside mb-2 " >{problem.solutions.map((solution, index) => {
                                    return (
                                          <li key={index} className='mb-2 font-avenir' >{solution}</li>
                                    )
                                  })}</ul>
                              </motion.div>
                        </AnimatePresence>
                        )
                      })

                }
            </div>
            <div className='relative md:hidden' >
                <Pagination
                    items={selectedTab === 0 ? questions : problems}
                    currentPage={currentPage}
                    goToPage={goToPage}
                    goToNextPage={goToNextPage}
                    goToPreviousPage={goToPreviousPage}
                    tab={selectedTab}
                    itemsPerPage={5}
                />
            </div>

            <div className='h-[10vh]' />
        </div>
    </div>
  )
}
