import { useEffect, useState } from 'react'
import { Progress } from './Progress'
import { motion } from 'framer-motion'
import { ApplyForm } from './ApplyForm'

const h2Style = 'font-avenirBold uppercase text-t-off-white text-pretty text-xl xl:text-2xl my-8'
const inputStyle = 'bg-transparent border-2 border-t-off-white rounded-md sm:p-1.5 p-2.5 focus:outline-none focus:ring-indigo-500 focus:border-t-green'

interface IJobDetails {
  id: string
  title: string
  description: string
  requirements: string
  slug: string
  openQuestionId: string
}

const ProgressBar = (): JSX.Element => {
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    // Check if the value is less than 100 before setting a timeout
    if (value < 100) {
      // Set a timeout to increment the value
      const timeoutId = setTimeout(() => { setValue(value + 1) }, 1) // Increments every 1 second

      // Clear the timeout if the component unmounts
      return () => { clearTimeout(timeoutId) }
    }
  }, [value])

  return <Progress value={value} className='mx-auto' />
}

export default function JobDetail (): JSX.Element {
  const [jobDetails, setJobDetails] = useState<IJobDetails | undefined>()

  const [applicant, setApplicant] = useState({
    name: '',
    phone: '',
    email: ''
  })

  const [resume, setResume] = useState<File | undefined>()
  const [coverLetter, setCoverLetter] = useState<File | undefined>()

  const fetchJobDetails = async (): Promise<void> => {
    try {
      const params = new URLSearchParams(window.location.search)
      const title = params.get('title')
      window.document.title = `Tennibot - ${title}` ?? 'Tennibot - Job Details'
      const id = params.get('id')
      const response = await fetch(`https://tennibot.recruitee.com/api/offers/${id}`)
      const jobDetailsData = await response.json()
      if (jobDetailsData.offer) {
        setJobDetails({
          id: jobDetailsData.offer.id,
          title: jobDetailsData.offer.title,
          description: jobDetailsData.offer.sharing_description,
          requirements: jobDetailsData.offer.requirements,
          slug: jobDetailsData.offer.slug,
          openQuestionId: jobDetailsData.offer.open_questions[0].id
        })
      }
      console.log(jobDetailsData.offer)
    } catch (error) {
      console.error(error)
    }
  }

  const applyForJob = async (): Promise<void> => {
    const url = `https://tennibot.recruitee.com/api/offers/${applicant.slug}/candidates`
    const formData = new FormData()
    formData.append('candidate[name]', applicant.name)
    formData.append('candidate[email]', applicant.email)
    formData.append('candidate[phone]', applicant.phone)
    formData.append('candidate[cv]', applicant.resume)

    if (applicant.openQuestionId && applicant.coverLetter) {
      formData.append('candidate[open_question_answers_attributes][0][open_question_id]', applicant.openQuestionId)
      formData.append('candidate[open_question_answers_attributes][0][file]', applicant.coverLetter)
    }

    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData
      })
      const data = await response.json()
      if (data.candidate && data.candidate.name === applicant.name) {
        console.log('Application successful')
      } else {
        throw new Error('The request failed.')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    void fetchJobDetails()
  }, [])

  if (!jobDetails) {
    return (
        <section className='h-screen flex flex-col justify-center items-center w-[40%] mx-auto' >
            <ProgressBar />
        </section>
    )
  }

  const responsibilitiesText = jobDetails.requirements.split('Qualifications:')[0].split('Responsibilities:')[1].replace(/<\/?p>|<\/?ul>|<br\s*\/?>/gi, '').trim() || ''
  const qualificationsText = (jobDetails.requirements.split('Benefits:')[0].split('Qualifications:')[1] || '').replace(/<\/?p>|<\/?ul>|<br\s*\/?>/gi, '').trim().replace('Perks and', '')
  const perksText = jobDetails.requirements.split('Benefits:')[1].replace(/<\/?p>|<\/?ul>|<br\s*\/?>/gi, '').trim() || ''

  return (
    <motion.div
        initial="initial"
        animate="animate"
        variants={{
          initial: {
            opacity: 0
          },
          animate: {
            opacity: 1
          }
        }}
     >
        <h1 className='font-avenirBold uppercase text-t-off-white text-pretty text-3xl 2xl:text-4xl pb-10' >{jobDetails.title}</h1>
        <section>
            <h2 className={h2Style} >Job description</h2>
            <p className='font-plutoLight text-t-off-white text-pretty' >{jobDetails.description}</p>
        </section>

        <section>
            <h2 className={h2Style} >Responsibilities</h2>
            <ul dangerouslySetInnerHTML={{ __html: responsibilitiesText ?? '' }} className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' ></ul>

            <h2 className={h2Style} >Qualifications</h2>
            <div dangerouslySetInnerHTML={{ __html: qualificationsText ?? '' }} className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' ></div>

            <h2 className={h2Style} >Perks and benefits</h2>
            <div dangerouslySetInnerHTML={{ __html: perksText ?? '' }} className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' ></div>
        </section>

        <section>
            <h2 className={h2Style} >Apply now</h2>

            <ApplyForm id={jobDetails.id} slug={jobDetails.slug} openQuestionId={jobDetails.openQuestionId} />

            {/* <div>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    applyForJob()
                }} className='text-t-off-white flex flex-col font-avenir 2xl:text-lg gap-5' >
                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor="name">Full name</label>
                        <input type="text" id="name" name="name" value={applicant.name} onChange={(val) => { setApplicant({ ...applicant, name: val }) }} className={inputStyle} required />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor='phone' >Phone number</label>
                        <input type='tel' id='phone' name='phone' value={applicant.phone} onChange={(val) => { setApplicant({ ...applicant, phone: val }) }} className={inputStyle} required />
                    </div>

                    <div className="flex flex-col w-full gap-1">
                        <label htmlFor='email' >Email address</label>
                        <input type='email' id='email' name='email' onChange={(val) => { setApplicant({ ...applicant, email: val }) }} className={inputStyle} required />
                    </div>

                    <div className="flex sm:flex-row flex-col w-full gap-5">
                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor='resume' >Upload resume</label>
                            <input type='file' id='resume' name='resume' value={resume} onChange={(file) => { setResume(file) }} required />
                        </div>

                        <div className="flex flex-col w-full gap-1">
                            <label htmlFor='cover-letter' >Cover letter</label>
                            <input id='cover-letter' type="file" name='cover-letter' value={coverLetter} onChange={(file) => { setCoverLetter(file) }} />
                        </div>
                    </div>
                    <input type="submit" value="Submit" className="mt-5 cursor-pointer focus:outline-none focus:ring-indigo-500 focus:border-t-green text-lg w-full tablet:w-64 font-thin rounded-full py-2 font-avenir uppercase border-2 transition duration-300 text-t-off-black bg-t-off-white border-t-off-white md:text-t-off-white md:bg-transparent hover:bg-t-off-white hover:text-t-off-black" />
                </form>
            </div> */}
        </section>
    </motion.div>
  )
}
