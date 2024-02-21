import React from 'react'

interface PropType {
  selected: boolean
  imgSrc: string
  alt: string
  onClick: () => void
}

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, imgSrc, alt, onClick } = props

  return (
    <div
      className="flex-[0_0_28%] min-w-0 pl-[0.8rem] relative"
    >
      <button
        onClick={onClick}
        className="appearance-none bg-transparent touch-manipulation block decoration-clone cursor-pointer p-0 m-0 w-full transition-opacity duration-200"
        type="button"
      >
        <img
          className={`block w-full border  rounded-lg  ${selected ? 'border border-t-off-white' : 'border-none'} transition-all duration-200 aspect-square object-cover`}
          src={imgSrc}
          alt={alt}
        />
      </button>
    </div>
  )
}
