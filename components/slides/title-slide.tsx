"use client"

import { motion } from "framer-motion"

interface TitleSlideProps {
  slide: any
  backgroundClass: string
}

export default function TitleSlide({ slide, backgroundClass }: TitleSlideProps) {
  return (
    <div
      className={`w-full h-full rounded-3xl ${backgroundClass}  fcvd vc n  relative overflow-hidden`}
    >


      {/* Background image if available */}
      {slide.content.backgroundImage && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${slide.content.backgroundImage})` }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center p-12">
        <motion.h1
          className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          {slide.content.title}
        </motion.h1>

        {slide.content.subtitle && (
          <motion.p
            className="text-2xl md:text-3xl text-white/80 max-w-none leading-relaxed px-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            {slide.content.subtitle}
          </motion.p>
        )}

        {/* Decorative elements */}
 


      </div>
    </div>
  )
}
