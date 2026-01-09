'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { getObjectFit } from '@/helpers/getObjectFit';

import type { Swiper as SwiperType } from 'swiper'
export interface ISlide {
  type: 'image' | 'video';
  src: string[];
  orientation?: 'landscape' | 'portrait' | string;
  portraitVerticalFocus?: string;
  portraitAspect?: string;
}

interface MediaSliderProps {
  slides: ISlide[]
}

const MediaSlider: React.FC<MediaSliderProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const [fullScreen, setFullScreen] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

  const apiUrl = `https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/`;

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      if (!fullScreen) return
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % slides.length)
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + slides.length) % slides.length)
      if (e.key === 'Escape') setFullScreen(false)
      if (e.key === ' ') e.preventDefault()
    },
    [fullScreen, slides.length]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [handleKey])

  // Pause autoplay in fullscreen mode
  useEffect(() => {
    if (!swiperRef.current?.autoplay) return
    if (fullScreen) swiperRef.current.autoplay.stop()
    else swiperRef.current.autoplay.start()
  }, [fullScreen])

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="relative aspect-video rounded-md overflow-hidden"
        style={{ height: '225px' }} // Fixed height for consistent spacing
        // onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        // onMouseLeave={() => {
        //   if (!fullScreen) swiperRef.current?.autoplay.start()
        // }}
      >
        <Swiper
          modules={[Navigation, Pagination, EffectCoverflow]} //Autoplay
          flipEffect={{ slideShadows: true, limitRotation: true }}
          effect="coverflow"
          navigation
          pagination={{
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 3
          }}
          // autoplay={{ delay: 6000 }}
          speed={800}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
          className="w-full h-full [&_.swiper-pagination]:!bottom-2"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} onClick={() => setFullScreen(true)}>
              {slide.type === 'image' ? (
                <div className={`relative ${
                  // slide.orientation === 'portrait' ? `aspect-[${slide.portraitAspect}]` : 'aspect-video'
                  slide.orientation === 'portrait' ? `aspect-[0.6]` : 'aspect-video' //aspect-[0.6]
                } rounded-md overflow-hidden`}> 
                  <Image
                    src={apiUrl + slide.src[0]}
                    alt={`Slide ${index + 1} ${slide.src[1]}`}
                    fill
                    className={`rounded-md ${
                      slide.orientation === 'portrait'
                        ? 'object-contain'
                        : 'object-cover'
                    }`}
                    quality={100}
                    priority={index < 3}
                    loading={index < 3 ? 'eager' : 'lazy'}
                    style={{
                      objectFit: 'cover',
                      objectPosition: slide.portraitVerticalFocus && slide.portraitVerticalFocus !== ''
                        ? `center ${Number(slide.portraitVerticalFocus)}%`
                        : 'center center'
                    }}
                  />
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${slide.src[0]}`}
                  title={`Video ${index}`}
                  allowFullScreen
                />
              )}

            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <AnimatePresence>
        {fullScreen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-90 z-[1501] flex justify-center items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullScreen(false)}
          >
            <motion.div
              key={current}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="relative w-full max-w-[90vw] max-h-[80vh] aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              {slides[current].type === 'image' ? (
                <Image
                  src={apiUrl + slides[current].src[0]}
                  alt={`FullSlide ${current + 1} ${slides[current].src[1]}`}
                  fill
                  className="object-contain rounded-md"
                  quality={100}
                  onClick={() => setFullScreen(false)}
                  sizes="100vw"
                />
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${slides[current].src[0]}?autoplay=1`}
                  title={`FullVideo ${current}`}
                  allowFullScreen
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MediaSlider
