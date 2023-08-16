export interface ICarouselItem {
  img?: ImageMetadata
  alt?: string
  description: string | JSX.Element
  containerStyle?: string
  descriptionStyle?: string
}

export default function CarouselItem({
  img,
  alt,
  description,
  containerStyle = "inline-flex items-end h-40 w-full justify-center",
  descriptionStyle = "max-w-xs font-avenir uppercase mt-5 px-5 text-sm text-center whitespace-normal text-t-white",
}: ICarouselItem) {
  return (
    <div className={`${containerStyle}`}>
      <div>
        {img && (
          <img
            src={img.src}
            width={img.width}
            height={img.height}
            alt={alt}
            className="mx-auto"
          />
        )}
        {typeof description === "string" ? (
          <p className={descriptionStyle}>{description}</p>
        ) : (
          description
        )}
      </div>
    </div>
  )
}
