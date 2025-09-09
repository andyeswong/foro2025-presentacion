"use client"

import { motion } from "framer-motion"
import { useRef, useEffect } from "react"

interface VideoSlideProps {
  slide: any
  backgroundClass: string
}

export default function VideoSlide({ slide, backgroundClass }: VideoSlideProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Auto-play video when slide is displayed
      video.play().catch(err => {
        console.log("Auto-play prevented:", err)
      })
    }
  }, [])

  return (
    <div
      className={`w-full h-full rounded-3xl ${backgroundClass} relative overflow-hidden`}
    >
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center p-8">
        {/* Title and subtitle */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {slide.content.title}
          </h1>
          {slide.content.subtitle && (
            <p className="text-xl md:text-2xl text-white/80 max-w-4xl leading-relaxed">
              {slide.content.subtitle}
            </p>
          )}
        </motion.div>

        {/* Video container */}
        <motion.div
          className="w-full max-w-6xl h-full max-h-[70vh] flex items-center justify-center"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-contain rounded-2xl shadow-2xl border border-white/20"
            controls
            preload="metadata"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          >
            <source src={slide.content.videoSrc} type="video/x-matroska" />
            <source src={slide.content.videoSrc} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </motion.div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white/10 blur-3xl" />
      </div>
    </div>
  )
} 