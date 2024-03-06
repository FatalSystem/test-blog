import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import Pagination from './Pagination.tsx'
import Fuse from 'fuse.js'

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

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
//   threshold: 0,
//   distance: 0,
  // useExtendedSearch: false,
//   ignoreLocation: true,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  // includeScore: true,
  includeMatches: true,
  keys: ['Question', 'Answer', 'problem', 'solutions']
}

export const renderItem = ({ item, index, type }): JSX.Element | null => {
  if (type === 'questions') {
    return (
              <AnimatePresence key={index} mode="wait">
                  <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="my-8 ">
                      <h5 className="font-black font-avenir text-xl text-t-off-black text-pretty mb-2" ><span className="mr-2" >Q: </span>{item.Question}</h5>
                      <p className="font-thin font-avenir text-xl text-t-off-black text-pretty " ><span className="text-2xl mr-2" >A: </span>{item.Answer}</p>
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
                className="my-8">
                <h6 className="font-bold font-avenir text-xl text-t-off-black text-pretty mb-1" >Problem</h6>
                <h5 className="font-bold font-avenir text-xl text-t-off-black text-pretty mb-6" >{item.problem}</h5>
                <h6 className="font-bold font-avenir text-xl text-t-off-black text-pretty mb-2" >Potential Causes and Solutions</h6>
                <ul className="font-thin font-avenir text-xl text-t-off-black text-pretty list-disc list-inside mb-2 " >{item.solutions.map((solution, index) => {
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

export default function TabContainer ({ questions, problems }: TabContainerProps): JSX.Element {
  const [selectedTab, setSelectedTab] = useState<number>(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [searchText, setSearchText] = useState<string>('')
  const [searchResult, setSearchResult] = useState('')

  const fuse = new Fuse([...questions, ...problems], options)

  const goToPage = (pageNumber: number): void => {
    setCurrentPage(pageNumber)
  }

  const goToNextPage = (): void => {
    setCurrentPage((current) => (current + 1))
  }

  const goToPreviousPage = (): void => {
    setCurrentPage((current) => (current - 1))
  }

  const handleSearchChange = (event: any): void => {
    setSearchText(event.target.value)
  }

  const handleSearch = (): void => {
    const result = fuse.search(searchText)
    // console.log('here', result)
    setSearchResult(result)
  }

  return (
    <div>
        <div className='flex flex-row mb-14 md:w-full w-[90%] mx-auto' >
            <input type="text" value={searchText} onChange={handleSearchChange} className='w-full   p-5 bg-t-off-white border-2 border-r-0 rounded-l-xl border-t-off-black focus:outline-none focus:border-t-off-black placeholder:italic' placeholder='Try searching keywords like "arms" or "calibration"' />
            <button onClick={handleSearch} disabled={searchText === ''} className={`group/searchbutton disabled:cursor-not-allowed ${searchText !== '' && 'hover:bg-t-off-black'} uppercase font-avenir text-lg md:text-xl flex flex-row items-center py-2 px-3 rounded-r-xl border-2 border-t-off-black transition-all duration-500 ease-in-out`} >
                <span className={`${searchText === '' ? 'opacity-50' : 'opacity-100 group-hover/searchbutton:text-t-off-white'} transition-all duration-500 ease-in-out`} >Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="42" height="14" viewBox="0 0 42 24" fill="none">
                    <path d="M0 12H40M40 12L28.2927 23M40 12L28.2927 1" className={`stroke-t-off-black stroke-2 ${searchText === '' ? 'opacity-50' : 'opacity-100 group-hover/searchbutton:stroke-t-off-white'} transition-all duration-500 ease-in-out`}/>
                </svg>
            </button>
        </div>
        <div className='relative group/container' >
            <div className='w-full bg-t-off-white relative md:border-2 border-0 border-t-off-black rounded-xl md:px-8 md:pt-8 px-4 pt-4  flex flex-col z-[2]' >
                {searchResult === ''
                  ? (
                    <>
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
                    </>
                    )
                  : (
                        <div>
                            <div className='flex flex-row justify-between pl-5 pb-5' >
                                <p className='font-avenir font-bold text-xl' >Showing search results for "{searchText}"</p>
                                <button onClick={() => setSearchResult('')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 54 54" fill="none">
                                        <path d="M27.0005 27L3 51M27.0005 27L3 3M27.0005 27L51 3M27.0005 27L51 51" stroke="#191A16" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </button>
                            </div>

                            <div className="md:h-[50vh] h-fit md:overflow-y-scroll relative px-5 py-0" >
                            <div className='hidden relative md:block'>
                                {
                                    searchResult.map((result, index) => {
                                      return renderItem({ item: result.item, index, type: result.item._type })
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
                    )}
            </div>
            <div className='bg-t-off-black w-full h-full absolute md:block hidden rounded-xl bottom-[-2%] right-[-1.5%] group-hover/container:bottom-0 group-hover/container:right-[0%] group-hover/container:opacity-0 transition-all duration-500 ease-in-out' />
        </div>
    </div>
  )
}
