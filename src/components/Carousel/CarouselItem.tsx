interface ICarouselItemProps {
  img: ImageMetadata
  alt: string
  description: string
}

export default function CarouselItem({
  img,
  alt,
  description,
}: ICarouselItemProps) {
  return (
    <div className="inline-flex h-40 items-end  w-full justify-center text-t-white">
      <div className="">
        <img src={img.src} width={img.width} height={img.height} alt={alt} className="mx-auto" />
        <p className=" max-w-xs font-avenir uppercase mt-5 px-5 text-sm text-center whitespace-normal ">
          {description}
        </p>
      </div>
    </div>
  )
}
