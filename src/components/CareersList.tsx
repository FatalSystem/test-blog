import { useEffect, useState } from 'react'
import { Skeleton } from './Skeleton'
import { motion } from 'framer-motion'

interface Job {
  id: string
  title: string
  city: string
  state_code: string
}

interface CareerItemProps {
  job: Job
  index: number
}

const CareerItem = ({ job, index }: CareerItemProps): JSX.Element => {
  return (
    <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0,
            y: 12
          },
          animate: {
            opacity: 1,
            y: 0
          }
        }}
        transition={{
          duration: 0.4,
          delay: 0.1 + index * 0.05,
          ease: [0.21, 0.47, 0.32, 0.98]
        }}
        className="py-8 flex flex-col md:flex-row md:justify-between md:items-center " >
        <div className="md:w-[50%] w-full" >
            <h5 className="uppercase text-xl md:text-lg xl:text-2xl 2xl:text-3xl font-avenirBold" >{job.title}</h5>
            <p className="mb-5 mt-3 font-avenir text-lg xl:text-xl" ><span className="capitalize" >{`${job.city.toLowerCase()},`}</span>{` ${job.state_code}, United States`}</p>
        </div>
        <div className="text-center flex" >
            <a href={`/job?id=${job.id}?&title=${job.title}`} className="w-full tablet:w-64 mobilem:px-16 cursor-pointer text-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black 2xl:w-80 text-lg 2xl:text-2xl 2xl: 2xl:py-3 font-thin rounded-full py-2 font-avenir uppercase border-2 transition duration-300 text-center" >See details</a>
            {/* <a href={`/job/${job.id}`} className="w-full tablet:w-64 mobilem:px-16 cursor-pointer text-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black 2xl:w-80 text-lg 2xl:text-2xl 2xl: 2xl:py-3 font-thin rounded-full py-2 font-avenir uppercase border-2 transition duration-300 text-center" >See details</a> */}
        </div>
    </motion.div>
  )
}

export default function CareersList (): JSX.Element {
  const [jobs, setJobs] = useState<[Job]>()

  const fetchJobs = async (): Promise<void> => {
    try {
      const response = await fetch('https://tennibot.recruitee.com/api/offers')
      const jobsData = await response.json()
      if (jobsData.offers) {
        setJobs(jobsData.offers as [Job])
      }
    } catch (error) {

    }
  }

  useEffect(() => {
    void fetchJobs()
  }, [])
  return (
    <div className='transition-all duration-300 ease-in-out'>
        {jobs
          ? (
            <>
                {jobs.map((job, index) => {
                  return <CareerItem key={`${job.id}${index}`} index={index} job={job} />
                })}
            </>
            )
          : (
            <>
                {
                    [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
                      return (
                        <motion.div
                        key={index} className="py-8 flex flex-col md:flex-row md:justify-between md:items-center transition-all duration-300 ease-in-out" >
                            <div className="md:w-[50%] w-full" >
                                <Skeleton className="h-8 mb-3 w-[250px]" />
                                <Skeleton className="h-4 mb-5 mt-3 w-[250px]" />
                            </div>
                            <div className="text-center flex" >
                                <Skeleton className="h-10 w-full tablet:w-64 rounded-full" />
                            </div>
                        </motion.div>
                      )
                    })
                }
            </>
            )}
    </div>
  )
}
