'use client'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import type { Swiper as SwiperType } from 'swiper'

export interface ISlide {
  type: 'image' | 'video'
  src: string
}

interface MediaSliderProps {
  slides: ISlide[]
}

const MediaSlider: React.FC<MediaSliderProps> = ({ slides }) => {
  const [current, setCurrent] = useState(0)
  const [fullScreen, setFullScreen] = useState(false)
  const swiperRef = useRef<SwiperType | null>(null)

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
        onMouseEnter={() => swiperRef.current?.autoplay.stop()}
        onMouseLeave={() => {
          if (!fullScreen) swiperRef.current?.autoplay.start()
        }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          // autoplay={{ delay: 6000 }}
          speed={600}
          loop
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setCurrent(swiper.realIndex)}
          className="w-full h-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index} onClick={() => setFullScreen(true)}>
              {slide.type === 'image' ? (
                <div className="relative w-full h-full">
                  <Image
                    src={slide.src}
                    alt={`Slide ${index}`}
                    fill
                    className="object-cover rounded-md"
                    quality={80}
                    priority={index === 0}
                  />
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${slide.src}`}
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
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex justify-center items-center p-4"
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
              className="relative w-full max-w-5xl aspect-video border-4 border-red-500"
              onClick={(e) => e.stopPropagation()}
            >
              {slides[current].type === 'image' ? (
                <Image
                  src={slides[current].src}
                  alt={`FullSlide ${current}`}
                  fill
                  className="object-contain rounded-md"
                  quality={100}
                />
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full rounded-md"
                  src={`https://www.youtube.com/embed/${slides[current].src}?autoplay=1`}
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
