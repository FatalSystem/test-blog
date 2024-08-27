export default {
    name: 'job',
    type: 'document',
    title: 'Job',
    fields: [
      {
        name: 'title',
        type: 'string',
        title: 'Job Title'
      },
      {
        name: 'city',
        type: 'string',
        title: 'City'
      },
      {
        name: 'description',
        type: 'text',
        title: 'Job Description'
      },
      {
        name: 'responsabilities',
        type: 'array',
        of: [{ type: 'string' }],
        title: 'Responsibilities'
      },
      {
        name: 'qualifications',
        type: 'array',
        of: [{ type: 'string' }],
        title: 'Qualifications'
      },
      {
        name: 'perksAndBenefits',
        type: 'array',
        of: [{ type: 'string' }],
        title: 'Perks and Benefits'
      }
    ]
  }
