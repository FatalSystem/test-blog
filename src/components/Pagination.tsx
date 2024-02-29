import { AnimatePresence, motion } from 'framer-motion'

interface PaginationProps {
  items: any[]
  itemsPerPage: number
  tab: number
  currentPage: number
  goToPage: (pageNumber: number) => void
  goToNextPage: () => void
  goToPreviousPage: () => void
  className?: React.ComponentProps<'div'>['className']
}

const Pagination = ({ items, itemsPerPage, tab, currentPage, goToPage, goToNextPage, goToPreviousPage, className }: PaginationProps): JSX.Element => {
  // const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(items.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const itemsToShow = items.slice(startIndex, endIndex)

  // const goToPage = (pageNumber: number): void => {
  //   setCurrentPage(pageNumber)
  // }

  // const goToNextPage = (): void => {
  //   setCurrentPage((current) => (current < totalPages ? current + 1 : current))
  // }

  // const goToPreviousPage = (): void => {
  //   setCurrentPage((current) => (current > 1 ? current - 1 : current))
  // }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div >
      <motion.div className={className} >
        <AnimatePresence >
        {itemsToShow.map((item, index) => {
          if (tab === 0) {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="my-8 ">
                <h5 className="font-black font-avenir text-xl text-t-off-black text-pretty mb-2" ><span className="mr-2" >Q: </span>{item.Question}</h5>
                <p className="font-thin font-avenir text-xl text-t-off-black text-pretty " ><span className="text-2xl mr-2" >A: </span>{item.Answer}</p>
              </motion.div>
            )
          }
          return (
              <motion.div
                key={index}
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
          )
        }
        )}
        </AnimatePresence>
        <motion.div className='flex flex-row justify-center items-center mt-14 relative ' >
          <AnimatePresence>
          {currentPage !== 1 && (
              <motion.button
                className="z-10 absolute mobilel:left-0 left-[-10%] flex items-center justify-center cursor-pointer size-[4rem]"
                type="button"
                // layout
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                onClick={goToPreviousPage}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="32" viewBox="0 0 19 32" fill="none">
                    <path d="M17 30L2 16L17 2" stroke="#191A16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
          )}
            </AnimatePresence>
          <div className='flex items-center mobilem:gap-10 gap-6 ' >
            {pageNumbers.map(number => (
              <button key={number} onClick={() => { goToPage(number) }} disabled={currentPage === number} className={`font-avenir text-2xl ${currentPage === number ? 'underline' : ''} `} >
                {number}
              </button>
            ))}
          </div>

          <AnimatePresence>
          {currentPage !== totalPages && (
              <motion.button
                className="z-10 absolute mobilel:right-0 right-[-10%] flex items-center justify-center cursor-pointer size-[4rem]"
                type="button"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                onClick={goToNextPage}
                >
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="32" viewBox="0 0 19 32" fill="none">
                  <path d="M2 2L17 16L2 30" stroke="#191A16" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
          )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Pagination
