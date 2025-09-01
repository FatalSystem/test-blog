
import { Swiper as SwiperRoot, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Item = {
  name: string;
  location: string;
  quote: string;
  videoUrl: string;
  image: string;
};

export default function TestimonialsSwiper({ items }: { items: Item[] }) {
  return(
    <SwiperRoot
        slidesPerView={"auto"}
        spaceBetween={20}
        loop
        grabCursor
        className="px-4"
      >
        {items.map((t, i) => (
          <SwiperSlide key={i} className="!w-[560px]">
            <div className="bg-neutral-900 rounded-2xl border border-[#F6F7F2] overflow-hidden flex w-[560px] h-[250px]">
              <img
                src={t.image.replace(/^\/public/, "")}
                alt={t.name}
                className="w-[250px] h-full object-cover rounded-l-2xl"
              />
              <div className="p-6 font-dm flex flex-col justify-between w-full">
                <p className="text-[16px] font-semibold leading-[22px] mb-4">
                  "{t.quote}"
                </p>
                <div>
                  <p className="uppercase text-[14px] font-bold leading-[20px]">
                    {t.name}
                  </p>
                  <p className="text-[12px] leading-[16px] italic text-gray-400">
                    {t.location}
                  </p>
                </div>
                <a
                  href={t.videoUrl}
                  className="mt-1 inline-flex items-center gap-2 text-[#F6F7F2] hover:underline text-[14px] font-bold leading-[20px]"
                >
                  WATCH VIDEO <span>→</span>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </SwiperRoot>
  )
}