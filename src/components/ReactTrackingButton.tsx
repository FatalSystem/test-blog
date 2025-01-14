import { track } from '../utils/analytics'

const ReactTrackingButton = () => {
  const handleClick = () => {
    track('Button Clicked', {
      buttonId: 'react-button',
      framework: 'react',
      page: 'Tracking Test'
    })
  }

  return (
        <button
            onClick={handleClick}
            className="bg-green-500 text-white px-4 py-2 rounded">
            Track with React
        </button>
  )
}

export default ReactTrackingButton
