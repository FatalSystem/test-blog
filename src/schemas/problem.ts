export default {
  name: 'problems',
  type: 'document',
  title: 'Problems',
  fields: [
    {
      name: 'problem',
      type: 'string',
      title: 'Problem'
    },
    {
      name: 'solutions',
      type: 'array',
      title: 'Solutions',
      of: [
        {
          name: 'solution',
          type: 'string',
          title: 'Solution'
        }
      ]
    }
  ]
}
