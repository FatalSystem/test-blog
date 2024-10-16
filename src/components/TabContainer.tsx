import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Pagination from './Pagination.tsx'
import Fuse, { type FuseResult } from 'fuse.js'

export const tabs = [{ label: 'General' }, { label: 'Troubleshooting' }]

interface Question {
  Question: string
  Answer: string
  _type?: string
}

interface Problem {
  problem: string
  solutions: string[]
  _type?: string
}

interface TabContainerProps {
  questions: Question[]
  problems: Problem[]
  toggleQuestion: (index: number) => void
  openIndex: number | null
}

interface FuseOptions {
  isCaseSensitive?: boolean
  includeScore?: boolean
  shouldSort?: boolean
  findAllMatches?: boolean
  minMatchCharLength?: number
  location?: number
  threshold?: number
  distance?: number
  useExtendedSearch?: boolean
  ignoreLocation?: boolean
  ignoreFieldNorm?: boolean
  fieldNormWeight?: number
  includeMatches?: boolean
  keys?: string[]
}

const options: FuseOptions = {
  includeMatches: true,
  keys: ['Question', 'Answer', 'problem', 'solutions']
}

// const [openIndex, setOpenIndex] = useState<number | null>(null);

// const toggleQuestion = (index: number): void => {
//   setOpenIndex((prevIndex) => {
//     // Use braces to clarify that we are returning a value
//     return prevIndex === index ? null : index;
//   });
// };

interface IRenderItem {
  item: Question & Problem
  index: number
  type: string
  openIndex: number | null
  toggleQuestion: (index: number) => void
}

export const renderItem = ({
  item,
  index,
  type,
  openIndex,
  toggleQuestion
}: IRenderItem): JSX.Element | null => {
  if (type === 'questions') {
    return (
      <AnimatePresence key={index} mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="my-8 2xl:my-14"
        >
          <h5
            className="flex items-center font-avenirBold text-xl 2xl:text-3xl text-white text-pretty mb-2 cursor-pointer"
            onClick={() => { toggleQuestion(index) }}
          >
            {item.Question}
          </h5>
          <AnimatePresence>
            {openIndex === index && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="font-avenir text-lg 2xl:text-xl text-tennibot-green text-pretty ml-8"
              >
                {item.Answer}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    )
  }

  if (type === 'problems') {
    return (
      <AnimatePresence key={index} mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="my-8 2xl:my-14"
        >
          <h5 className="flex items-center font-plutoBold text-xl 2xl:text-3xl text-t-off-white text-pretty mb-2 cursor-pointer">
            Problem: {item.problem}
          </h5>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-8"
            >
              <h5 className="font-plutoBold text-lg 2xl:text-xl text-t-gray text-pretty mb-2">
                Potential Causes and Solutions
              </h5>
              <ul className="font-plutoLight text-xl 2xl:text-2xl text-t-green text-pretty list-disc list-inside mb-2">
                {item.solutions.map((solution, index) => (
                  <li key={index} className="mb-2 font-avenir">
                    {solution}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    )
  }

  return null
}

export default function TabContainer({
  questions,
  problems
}: TabContainerProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Array<
  FuseResult<Question | Problem>
  > | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const fuse = new Fuse([...questions, ...problems], options)
  const [query, setQuery] = useState('')

  const searchResults = query
    ? fuse.search(query).map((result: FuseResult<any>) => result.item)
    : [...questions, ...problems]

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const goToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const goToNextPage = (): void => {
    setCurrentPage((current) => current + 1)
  }

  const goToPreviousPage = (): void => {
    setCurrentPage((current) => current - 1)
  }

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchInputValue(event.target.value)
  }

  const handleSearch = (): void => {
    const result = fuse.search(searchInputValue)
    setSearchText(searchInputValue)
    setSearchResult(result)
  }
  const toggleExpand = (index: number): void => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? null : index))
  }

  const TriangleIcon = ({ isExpanded }: { isExpanded: boolean }) => (
    <svg
      width="16"
      height="16"
      className="mr-2"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d={isExpanded ? 'M2 6L8 12L14 6H2Z' : 'M4 2L4 14L12 8L4 2Z'}
        fill="#C0F20C"
      />
    </svg>
  )
  const handleContent = (): JSX.Element => {
    if (searchResult) {
      if (searchResult.length === 0) {
        return (
          <div>
            <div className="flex flex-row justify-between pl-5 pb-5">
              <p className="font-plutoBold font-bold text-xl">
                No results found for &quot;{searchText}&quot;. Try adjusting
                your keywords or terms!
              </p>
              <button
                onClick={() => {
                  setSearchResult(null)
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
              <div className="h-[10vh]" />
            </div>
          </div>
        );
      }
      return (
        <div>
          <div className="flex flex-row justify-between pl-5 pb-5">
            <p className="font-plutoBold font-bold text-xl">
              Showing search results for &quot;{searchText}&quot;
            </p>
            <button
              onClick={() => {
                setSearchResult(null)
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
            <div className="hidden relative md:block">
              {searchResult.map((result, index) => {
                if (result.item._type) {
                  return renderItem({
                    item: result.item as Question & Problem,
                    index,
                    type: result.item._type,
                    openIndex,
                    toggleQuestion
                  })
                }
                return null
              })}
            </div>
            <div className="relative md:hidden">
              <Pagination
                items={searchResult}
                currentPage={currentPage}
                goToPage={goToPage}
                goToNextPage={goToNextPage}
                goToPreviousPage={goToPreviousPage}
                tab={selectedTab}
                itemsPerPage={5}
                search={true}
              />
            </div>

            <div className="h-[10vh]" />
          </div>
        </div>
      );
    }

    return (
      <div className="">
        <ul className="flex w-full md:pb-10 pb-5 flex-row tablet:justify-center justify-around">
          {tabs.map((item, index) => {
            return (
              <li
                key={item.label}
                className="tablet:w-full w-fit cursor-pointer text-center relative h-[24px] flex justify-center min-w-0"
                onClick={() => {
                  setSelectedTab(index)
                  setCurrentPage(1)
                }}
              >
                <div className="w-fit">
                  <h4
                    className={`font-avenirBold uppercase lg:text-3xl md:text-2xl tablet:text-xl mobilem:text-xl text-lg 
                              ${
                                index === selectedTab
                                  ? 'text-t-green-500'
                                  : 'text-gray-500'
                              }`}
                  >
                    {item.label}
                  </h4>
                  {index === selectedTab ? (
                    <motion.div
                      className='bottom-[-1px] rounded-xl w-full h-[4px] bg-gray-500'
                      layoutId='underline'
                    />
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
        <div className="md:h-[50vh] h-fit custom-scrollbar md:overflow-y-scroll relative px-5 py-0">
          <div className="hidden relative md:block">
            {selectedTab === 0
              ? questions.map((question, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => toggleExpand(index)}
                      className="mb-6 cursor-pointer"
                    >
                      <h5 className="font-avenirBold text-2xl text-white text-pretty mb-1 flex items-center">
                        <TriangleIcon
                          isExpanded={expandedIndex === index}
                          className='mr-2'
                        />
                        <span className="text-off-white">
                          {question.Question}
                        </span>
                      </h5>
                      <AnimatePresence>
                        {expandedIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2 }}
                            className="my-2 mb-5 pl-6"
                          >
                            <p className="font-avenir text-2xl text-left text-green">
                              {question.Answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })
              : problems.map((problem, index) => {
                  return (
                    <AnimatePresence key={index} mode="wait">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="my-8 2xl:my-14 mb-6"
                      >
                        <h6 className="font-avenirBold text-xl 2xl:text-3xl text-t-off-white text-pretty mb-6">
                          Problem: {problem.problem}
                        </h6>
                        <h5 className="font-plutoBold text-lg 2xl:text-xl text-t-gray text-pretty mb-2">
                          Potential Causes and Solutions:{''}
                        </h5>
                        <ul className="font-avenirBold text-l 2xl:text-xl text-off-white text-pretty list-disc list-inside mb-2 ">
                          {problem.solutions.map((solution, index) => {
                            return (
                              <li key={index} className="mb-2 font-avenir">
                                {solution}
                              </li>
                            )
                          })}
                        </ul>
                      </motion.div>
                    </AnimatePresence>
                  )
                })}
          </div>
          <div className="relative md:hidden">
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
          <div className="h-[10vh]" />
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-row mb-14 md:w-full w-[90%] mx-auto">
        <input
          type="text"
          value={searchInputValue}
          onChange={handleSearchChange}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && searchInputValue !== '') {
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
          disabled={searchInputValue === ''}
          className={`group/searchbutton disabled:cursor-not-allowed ${
            searchInputValue !== '' && 'hover:bg-t-green'
          } uppercase font-avenir text-lg md:text-xl flex flex-row items-center py-2 px-3 rounded-r-xl border-2 border-t-green transition-all duration-500 ease-in-out`}
        >
          <span className="text-white transition-all duration-500 ease-in-out"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="white"
            className="ml-2"
          >
            <path d="M10.5 2C5.80558 2 2 5.80558 2 10.5C2 15.1944 5.80558 19 10.5 19C12.3561 19 14.0916 18.4403 15.4554 17.5L17.85 19.8975L19.8975 17.85L17.5 15.4554C18.4403 14.0916 19 12.3561 19 10.5C19 5.80558 15.1944 2 10.5 2ZM10.5 4C14.642 4 18 7.358 18 10.5C18 13.642 14.642 17 10.5 17C6.358 17 4 13.642 4 10.5C4 7.358 6.358 4 10.5 4Z" />
          </svg>
        </button>
      </div>
      <div className="relative group/container">
        <div className="lg:bottom-2 lg:right-2 lg:group-hover/container:bottom-0 lg:group-hover/container:right-0 transition-all duration-500 ease-in-out w-full bg-t-off-black relative md:border-2 border-0 border-t-green rounded-xl md:px-8 md:pt-8 px-4 pt-4 flex flex-col z-[2]">
          {handleContent()}
        </div>
        <div className="bg-t-off-black absolute top-0 w-full h-full md:block hidden rounded-xl transition-all duration-500 ease-in-out" />
      </div>
    </div>
  )
}
