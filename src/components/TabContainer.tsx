import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Fuse, { type FuseResult } from 'fuse.js'

export const tabs = [{ label: 'General' }, { label: 'Troubleshooting' }]

interface Question {
  Question: string
  Answer: string
  _type?: 'questions'
}

interface Problem {
  problem: string
  solutions: string[]
  _type?: 'problems'
}

interface TabContainerProps {
  questions: Question[]
  problems: Problem[]
}

interface FuseOptions {
  includeMatches?: boolean
  keys?: string[]
}

const options: FuseOptions = {
  includeMatches: true,
  keys: ['Question', 'Answer', 'problem', 'solutions']
}

const TabsContainer = ({ questions, problems }: TabContainerProps) => {
  const [openIndexMobile, setOpenIndexMobile] = useState<number | null>(null)
  const toggleQuestionMobile = (index: number): void => {
    setOpenIndexMobile((prevIndex) => (prevIndex === index ? null : index))
  }

  return (
    <div>
      {questions.map((question, index) => (
        <AnimatePresence key={index}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="my-8 2xl:my-14"
          >
            <h5
              className="flex items-center font-avenirBold text-xl 2xl:text-3xl text-white text-pretty mb-2 cursor-pointer"
              onClick={() => { toggleQuestionMobile(index) }}
            >
              {question.Question}
            </h5>
            <AnimatePresence>
              {openIndexMobile === index && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="font-avenir text-lg 2xl:text-xl text-tennibot-green text-pretty"
                >
                  {question.Answer}
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      ))}
      {problems.map((problem, index) => (
        <AnimatePresence key={index}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="my-8 2xl:my-14"
          >
            <h5 className="flex items-center font-plutoBold text-xl 2xl:text-3xl text-t-off-white text-pretty mb-2 cursor-pointer">
              Problem: {problem.problem}
            </h5>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h5 className="font-plutoBold xl:text-xl text-t-gray text-pretty">
                  Potential Causes + Solutions👇
                </h5>
                <ul className="font-plutoLight text-l 2xl:text-2xl text-t-green text-pretty list-disc list-inside">
                  {problem.solutions.map((solution, index) => (
                    <li key={index} className="font-avenir">
                      {solution}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      ))}
    </div>
  )
}

export default function IntegratedTabContainer({
  questions,
  problems
}: TabContainerProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [searchText, setSearchText] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Array<FuseResult<Question | Problem>> | null
  >(null)
  const fuse = new Fuse([...questions, ...problems], options)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value)
  }

  const handleSearch = (): void => {
    const result = fuse.search(searchText)
    setSearchResult(result.length > 0 ? result : null)
  }

  const renderContent = (): JSX.Element => {
    if (searchResult) {
      return (
        <div>
          <div className="flex flex-row justify-between items-center pl-5 pb-5">
            <p className="font-plutoBold font-bold text-xl">
              Showing search results for &quot;{searchText}&quot;
            </p>
            <button
              onClick={() => {
                setSearchResult(null)
                setSearchText('')
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                viewBox="0 0 54 54"
                fill="none"
              >
                <path
                  d="M27.0005 27L3 51M27.0005 27L3 3M27.0005 27L51 3M27.0005 27L51 51"
                  stroke="gray"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="md:h-[50vh] h-fit md:overflow-y-scroll relative px-5 py-0">
            {searchResult.map((item, index) => (
              <div key={index}>
                {item.item._type === 'questions'
                  ? (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="my-8 2xl:my-14"
                    >
                      <h5 className="flex items-center font-avenirBold text-xl 2xl:text-3xl text-white text-pretty mb-2">
                        {item.item.Question}
                      </h5>
                      <motion.p className="font-avenir text-lg 2xl:text-xl text-tennibot-green text-pretty">
                        {item.item.Answer}
                      </motion.p>
                    </motion.div>
                  </AnimatePresence>
                    )
                  : (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="my-8 2xl:my-14"
                    >
                      <h5 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-white text-pretty mb-2 cursor-pointer">
                        Problem: {item.item.problem}
                      </h5>
                      <motion.div className="ml-0">
                        <h5 className="font-plutoBold xl:text-xl text-t-gray text-pretty">
                          Potential Causes + Solutions👇
                        </h5>
                        <ul className="font-plutoLight text-l 2xl:text-2xl text-t-green text-pretty list-disc list-inside">
                          {item.item.solutions.map((solution, index) => (
                            <li key={index} className="font-avenir">
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                    )}
              </div>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div className="md:h-[50vh] h-fit md:overflow-y-scroll relative px-5 py-0">
        <TabsContainer
          questions={selectedTab === 0 ? questions : []}
          problems={selectedTab === 1 ? problems : []}
        />
      </div>
    )
  }

  return (
    <>
      <div className="flex flex-row mb-14 md:w-full w-[90%] mx-auto">
        <input
          type="text"
          value={searchText}
          onChange={handleSearchChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && searchText !== '') {
              event.preventDefault()
              handleSearch()
            }
          }}
          style={{ borderRadius: '0.75rem 0 0 0.75rem' }}
          className="w-full 2xl:text-xl font-avenir bg-transparent pl-4 py-4 overflow-hidden border-2 border-r-0 rounded-l-xl border-t-green focus:outline-none focus:border-t-green placeholder:italic placeholder-transparent tablet:placeholder-gray-400"
          placeholder='Try searching keywords like "arms" or "calibration"'
        />
        <button
          onClick={handleSearch}
          disabled={searchText === ''}
          className="rounded-r-lg border-2 border-t-green text-white bg-t-green px-4 py-4 hover:bg-t-off-black hover:text-black"
        >
          <span className="text-white transition-all duration-500 ease-in-out"></span>
           <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="gray"
            className="ml-2"
          >
            <path d="M10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19C12.3561 19 14.0916 18.4403 15.4554 17.5L17.85 19.8975L19.8975 17.85L17.5 15.4554C18.4403 14.0916 19 12.3561 19 10.5C19 5.80558 15.1944 2 10.5 2ZM10.5 4C14.642 4 18 7.358 18 10.5C18 13.642 14.642 17 10.5 17C6.358 17 4 13.642 4 10.5C4 7.358 6.358 4 10.5 4Z" />
          </svg>
        </button>
      </div>
      <div className="flex mb-8 justify-center">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => { setSelectedTab(index) }}
            className={`px-6 py-3 text-xl border-b-2 ${
              selectedTab === index
                ? 'border-t-green text-t-green font-avenirBold'
                : 'border-transparent text-t-gray font-avenirBold'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
          <div className="lg:bottom-2 lg:right-2 lg:group-hover/container:bottom-0 lg:group-hover/container:right-0 transition-all duration-500 ease-in-out w-full bg-t-off-black relative md:border-2 border-0 border-t-green rounded-xl md:px-8 md:pt-8 px-4 pt-4 flex flex-col z-[2]">
      <div className="px-5 py-0">{renderContent()}</div>
       </div>
    </>
  )
}
