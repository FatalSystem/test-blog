import { useEffect, useState } from 'react'
import { Progress } from './Progress'
import { motion } from 'framer-motion'
import { ApplyForm } from './ApplyForm'
import { createClient } from '@sanity/client'

const h2Style = 'font-avenirBold uppercase text-t-off-white text-pretty text-xl xl:text-2xl my-8'
const inputStyle = 'bg-transparent border-2 border-t-off-white rounded-md sm:p-1.5 p-2.5 focus:outline-none focus:ring-indigo-500 focus:border-t-green'

interface IJobDetails {
  id: string
  title: string
  description: string
  responsabilities: string[]
  qualifications: string[]
  perksAndBenefits: string[]
}

export const client = createClient({
  // projectId: '3nx5ege4', // Replace with your actual Sanity project ID
  projectId:'brwxydjw',
  // projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production', // Replace with your actual dataset name
  apiVersion: '2023-08-25', // Use current date in YYYY-MM-DD format
  useCdn: true,
  token: import.meta.env.SANITY_TOKEN,
  // withCredentials: true
});

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

  // const fetchJobDetails = async (): Promise<void> => {
  //   try {
  //     const params = new URLSearchParams(window.location.search)
  //     const title = params.get('title')
  //     window.document.title = `Tennibot - ${title}` ?? 'Tennibot - Job Details'
  //     const id = params.get('id')
  //     const response = await fetch(`https://tennibot.recruitee.com/api/offers/${id}`)
  //     const jobDetailsData = await response.json()
  //     if (jobDetailsData.offer) {
  //       setJobDetails({
  //         id: jobDetailsData.offer.id,
  //         title: jobDetailsData.offer.title,
  //         description: jobDetailsData.offer.sharing_description,
  //         requirements: jobDetailsData.offer.requirements,
  //         slug: jobDetailsData.offer.slug,
  //         openQuestionId: jobDetailsData.offer.open_questions[0].id
  //       })
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const fetchJobDetails = async (): Promise<void> => {
    try {
      const params = new URLSearchParams(window.location.search)
      const title = params.get('title')
      // window.document.title =`Tennibot - ${title}` ?? 'Tennibot - Job Details'
      window.document.title = title ? `Tennibot - ${title}` : 'Tennibot - Job Details';
      const id = params.get('id')
      if (id) {
        console.log(id)
        const query = `*[_type == "job" && _id == $id][0]`
        const jobDetailsData = await client.fetch(query, { id })
        console.log(jobDetailsData)
        if (jobDetailsData) {
          setJobDetails({
            id: id,
            title: jobDetailsData.title,
            description: jobDetailsData.description,
            responsabilities: jobDetailsData.responsabilities,
            qualifications: jobDetailsData.qualifications,
            perksAndBenefits: jobDetailsData.perksAndBenefits
          })
        }
      }
    } catch (error) {
      console.error(error)
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

  // const responsibilitiesText = jobDetails.requirements.split('Qualifications:')[0].split('Responsibilities:')[1].replace(/<\/?p>|<\/?ul>|<br\s*\/?>/gi, '').trim() || ''
  // const qualificationsText = (jobDetails.requirements.split('Benefits:')[0].split('Qualifications:')[1] || '').replace(/<\/?p>|<\/?ul>|<br\s*\/?>/gi, '').trim().replace('Perks and', '')
  // const perksText = jobDetails.requirements.split('Benefits:')[1].replace(/<\/?p>|<\/?ul>|<br\s*\/?>/gi, '').trim() || ''

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
          {jobDetails.responsabilities && (
            <>
              <h2 className={h2Style} >Responsibilities</h2>
              {/* <ul dangerouslySetInnerHTML={{ __html: responsibilitiesText ?? '' }} className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' ></ul> */}
              <ul className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' >
                {jobDetails.responsabilities.map((responsibility, index) => (
                  <li key={index} className='text-pretty' >{responsibility}</li>
                ))}
              </ul>
            </>
          )}
          {jobDetails.qualifications && (
            <>
              <h2 className={h2Style} >Qualifications</h2>
              {/* <div dangerouslySetInnerHTML={{ __html: qualificationsText ?? '' }} className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' ></div> */}
              <ul className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' >
                {jobDetails.qualifications.map((qualification, index) => (
                  <li key={index} className='text-pretty' >{qualification}</li>
                ))}
              </ul>
            </>
          )}

          {jobDetails.perksAndBenefits && (
            <>
              <h2 className={h2Style} >Perks and benefits</h2>
              {/* <div dangerouslySetInnerHTML={{ __html: perksText ?? '' }} className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' ></div> */}
              <ul className='font-plutoLight list-disc list-inside text-pretty flex flex-col gap-3 ' >
                {jobDetails.perksAndBenefits.map((perk, index) => (
                  <li key={index} className='text-pretty' >{perk}</li>
                ))}
              </ul>
            </>
          )}
        </section>

        <section>
            <h2 className={h2Style} >Apply now</h2>
            <ApplyForm id={jobDetails.id} jobTitle={jobDetails.title} /* slug={jobDetails.slug} openQuestionId={jobDetails.openQuestionId}*/ />
        </section>
    </motion.div>
  )
}
