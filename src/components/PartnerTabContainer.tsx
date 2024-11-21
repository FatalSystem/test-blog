import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Pagination from './Pagination.tsx'
import Fuse, { type FuseResult } from 'fuse.js'

export const tabs = [
  { label: 'General' },
  { label: 'Troubleshooting' }
]

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
  keys: ['Question', 'Answer']
}

interface IRenderItem {
  item: Question & Problem
  index: number
  type: string
}

export const renderItem = ({ item, index, type }: IRenderItem): JSX.Element | null => {
  if (type === 'questions') {
    return (
        <AnimatePresence key={index} mode="wait">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="my-8 2xl:my-14">
                <h5 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-2" >
                    <span className="mr-2" >Q: </span>{item.Question}
                </h5>
                <p className="font-plutoLight text-xl 2xl:text-2xl text-t-off-black text-pretty " >
                    <span className="text-2xl mr-2" >A: </span>{item.Answer}
                </p>
            </motion.div>
        </AnimatePresence>
    )
  }
  if (type === 'problems') {
    return (
        <AnimatePresence key={index} mode="wait" >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="my-8 2xl:my-14">
                <h6 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-1" >Problem</h6>
                <h5 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-6" >{item.problem}</h5>
                <h6 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-2" >Potential Causes and Solutions</h6>
                <ul className="font-plutoLight text-xl 2xl:text-2xl text-t-off-black text-pretty list-disc list-inside mb-2 " >{item.solutions.map((solution, index) => {
                  return (
                        <li key={index} className='mb-2 font-avenir' >{solution}</li>
                  )
                })}</ul>
            </motion.div>
        </AnimatePresence>
    )
  }

  return null
}

export default function PartnerTabContainer ({ questions, problems }: TabContainerProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchText, setSearchText] = useState<string>('')
  const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [searchResult, setSearchResult] = useState<Array<FuseResult<Question | Problem>> | null>(null)

  const fuse = new Fuse([...questions], options)

  const goToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const goToNextPage = (): void => {
    setCurrentPage((current) => (current + 1))
  }

  const goToPreviousPage = (): void => {
    setCurrentPage((current) => (current - 1))
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchInputValue(event.target.value)
  }

  const handleSearch = (): void => {
    const result = fuse.search(searchInputValue)
    console.log('result', result)
    setSearchText(searchInputValue)
    setSearchResult(result)
  }

  const handleContent = (): JSX.Element => {
    if (searchResult) {
      if (searchResult.length === 0) {
        return (
            <div>
                <div className='flex flex-row justify-between pl-5 pb-5' >
                    <p className='font-plutoBold font-bold text-xl' >No results found for "{searchText}". Try adjusting your keywords or terms!</p>
                    <button onClick={() => {
                      setSearchResult(null)
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 54 54" fill="none">
                            <path d="M27.0005 27L3 51M27.0005 27L3 3M27.0005 27L51 3M27.0005 27L51 51" stroke="#191A16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                </div>

                <div className="md:h-[50vh] h-fit md:overflow-y-scroll relative px-5 py-0" >
                    <div className='h-[10vh]' />
                </div>
            </div>
        )
      }
      return (
        <div>
            <div className='flex flex-row justify-between pl-5 pb-5' >
                <p className='font-plutoBold font-bold text-xl' >Showing search results for "{searchText}"</p>
                <button onClick={() => {
                  setSearchResult(null)
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 54 54" fill="none">
                        <path d="M27.0005 27L3 51M27.0005 27L3 3M27.0005 27L51 3M27.0005 27L51 51" stroke="#191A16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </button>
            </div>

            <div className="md:h-[50vh] h-fit md:overflow-y-scroll relative px-5 py-0" >
                <div className='hidden relative md:block'>
                    {
                        searchResult.map((result, index) => {
                          if (result) {
                            return renderItem({ item: result.item as Question, index, type: "questions" })
                          }
                          return null
                        })
                    }
                </div>
                <div className='relative md:hidden' >
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

                <div className='h-[10vh]' />
            </div>
        </div>
      )
    }

    return (
        <div className='' >
            {/* <ul className='flex w-full md:pb-10 pb-5 flex-row tablet:justify-center justify-around' >
                {tabs.map((item, index) => {
                  return (
                        <li key={item.label} className='tablet:w-full w-fit cursor-pointer text-center relative h-[24px] flex justify-center min-w-0' onClick={() => {
                          setSelectedTab(index)
                          setCurrentPage(1)
                        }}>
                            <div className='w-fit' >
                                <h4 className={`font-avenirBold uppercase font-black lg:text-3xl md:text-2xl tablet:text-xl mobilem:text-xl text-lg ${index === selectedTab ? 'text-t-off-black' : 'text-gray-500'}`} >{item.label}</h4>
                                {index === selectedTab
                                  ? (
                                    <motion.div className="bottom-[-1px] rounded-xl w-full h-[4px] bg-t-off-black" layoutId="underline" />
                                    )
                                  : null}
                            </div>
                        </li>
                  )
                })}
            </ul> */}
            <div className="absolute z-10 bottom-0 xl:w-[95%] w-[90%] h-[15%] bg-gradient-to-t from-t-off-white from-0% to-100% hidden md:block" />
            <div className="md:h-[50vh] h-fit custom-scrollbar md:overflow-y-scroll relative px-5 py-0" >
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
                                    className="my-8 2xl:my-14 ">
                                    <h5 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-2" >
                                        <span className="mr-2 font-avenirBold" >Q: </span>{question.Question}
                                    </h5>
                                    <p className="font-thin font-plutoLight text-xl 2xl:text-2xl text-t-off-black text-pretty " >
                                        <span className="text-2xl 2xl:text-3xl mr-2" >A: </span>{question.Answer}
                                    </p>
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
                                    className="my-8 2xl:my-14">
                                    <h6 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-1" >Problem</h6>
                                    <h5 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-6" >{problem.problem}</h5>
                                    <h6 className="font-plutoBold text-xl 2xl:text-3xl text-t-off-black text-pretty mb-2" >Potential Causes and Solutions</h6>
                                    <ul className="font-plutoLight text-xl 2xl:text-2xl text-t-off-black text-pretty list-disc list-inside mb-2 " >{problem.solutions.map((solution, index) => {
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

  return (
    <div>
        <div className='flex flex-row mb-14 md:w-full w-[90%] mx-auto' >
            <input type="text" value={searchInputValue} onChange={handleSearchChange} onKeyDown={event => {
              if (event.key === 'Enter' && searchInputValue !== '') {
                event.preventDefault()
                handleSearch()
              }
            }}
            style={{ borderRadius: '0.75rem 0 0 0.75rem' }}
            className='w-full 2xl:text-xl font-avenir bg-transparent pl-4 py-4 overflow-hidden border-2 border-r-0 rounded-l-xl border-t-off-black focus:outline-none focus:border-t-off-black placeholder:italic placeholder-transparent tablet:placeholder-gray-400' placeholder='Try searching keywords like "arms" or "calibration"' />
            <button onClick={handleSearch} disabled={searchInputValue === ''} className={`group/searchbutton disabled:cursor-not-allowed ${searchInputValue !== '' && 'hover:bg-t-off-black'} uppercase font-avenir text-lg md:text-xl flex flex-row items-center py-2 px-3 rounded-r-xl border-2 border-t-off-black transition-all duration-500 ease-in-out`} >
                <span className={`${searchInputValue === '' ? 'opacity-50' : 'opacity-100 group-hover/searchbutton:text-t-off-white'} transition-all duration-500 ease-in-out`} >Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="14" viewBox="0 0 42 24" fill="none">
                    <path d="M0 12H40M40 12L28.2927 23M40 12L28.2927 1" className={`stroke-t-off-black stroke-2 ${searchInputValue === '' ? 'opacity-50' : 'opacity-100 group-hover/searchbutton:stroke-t-off-white'} transition-all duration-500 ease-in-out`}/>
                </svg>
            </button>
        </div>
        <div className='relative group/container' >
            <div className='lg:bottom-2 lg:right-2 lg:group-hover/container:bottom-0 lg:group-hover/container:right-0 transition-all duration-500 ease-in-out w-full bg-t-off-white relative md:border-2 border-0 border-t-off-black rounded-xl md:px-8 md:pt-8 px-4 pt-4  flex flex-col z-[2]' >
                {handleContent()}
            </div>
            <div className='bg-t-off-black absolute top-0 w-full h-full md:block hidden rounded-xl transition-all duration-500 ease-in-out' />
        </div>
    </div>
  )
}
