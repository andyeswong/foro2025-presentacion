"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import TitleSlide from "@/components/slides/title-slide"
import ContentSlide from "@/components/slides/content-slide"
import ScrollSlide from "@/components/slides/scroll-slide"
import ComparisonSlide from "@/components/slides/comparison-slide"
import WorkflowSlide from "@/components/slides/workflow-slide"
import VideoSlide from "@/components/slides/video-slide"
import Pusher from "pusher-js"
import { presentationData } from "@/lib/presentation-data"

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction > 0 ? 45 : -45,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotateY: 0,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.8,
    rotateY: direction < 0 ? 45 : -45,
  }),
}

const backgroundVariants = [
  "bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-indigo-900/20",
  "bg-gradient-to-br from-emerald-900/20 via-teal-900/20 to-cyan-900/20",
  "bg-gradient-to-br from-rose-900/20 via-pink-900/20 to-purple-900/20",
  "bg-gradient-to-br from-amber-900/20 via-orange-900/20 to-red-900/20",
  "bg-gradient-to-br from-slate-900/20 via-gray-900/20 to-zinc-900/20",
]

export default function PresentationApp() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(false)
  const slides = presentationData.presentation.slides

  // Pusher integration for remote control
  useEffect(() => {
    const pusher = new Pusher("88a05f4588ff1360bb15", { cluster: "us3" });
    const channel = pusher.subscribe("presentation-channel");
    
    channel.bind("slide-change", (data: { slide: number }) => {
      const newSlide = data.slide;
      if (newSlide >= 0 && newSlide < slides.length && newSlide !== currentSlide) {
        setDirection(newSlide > currentSlide ? 1 : -1);
        setCurrentSlide(newSlide);
      }
    });

    return () => {
      pusher.unsubscribe("presentation-channel");
      pusher.disconnect();
    };
  }, [currentSlide, slides.length]);

  const paginate = (newDirection: number) => {
    const newSlide = currentSlide + newDirection
    if (newSlide >= 0 && newSlide < slides.length) {
      setDirection(newDirection)
      setCurrentSlide(newSlide)
    }
  }

  useEffect(() => {
    if (isAutoPlay) {
      const timer = setInterval(() => {
        if (currentSlide < slides.length - 1) {
          paginate(1)
        } else {
          setIsAutoPlay(false)
        }
      }, 8000)
      return () => clearInterval(timer)
    }
  }, [currentSlide, isAutoPlay, slides.length])

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault()
          if (currentSlide > 0) {
            paginate(-1)
          }
          break
        case "ArrowRight":
        case "ArrowDown":
        case " ": // Spacebar
          event.preventDefault()
          if (currentSlide < slides.length - 1) {
            paginate(1)
          }
          break
        case "Home":
          event.preventDefault()
          setDirection(-1)
          setCurrentSlide(0)
          break
        case "End":
          event.preventDefault()
          setDirection(1)
          setCurrentSlide(slides.length - 1)
          break
        case "Escape":
          event.preventDefault()
          setIsAutoPlay(false)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentSlide, slides.length])

  const renderSlide = (slide: any, index: number) => {
    const backgroundClass = ""

    switch (slide.type) {
      case "title":
        return <TitleSlide slide={slide} backgroundClass={backgroundClass} />
      case "content":
        return <ContentSlide slide={slide} backgroundClass={backgroundClass} />
      case "scroll":
        return <ScrollSlide slide={slide} backgroundClass={backgroundClass} />
      case "comparison":
        return <ComparisonSlide slide={slide} backgroundClass={backgroundClass} />
      case "workflow":
        return <WorkflowSlide slide={slide} backgroundClass={backgroundClass} />
      case "video":
        return <VideoSlide slide={slide} backgroundClass={backgroundClass} />
      default:
        return <TitleSlide slide={slide} backgroundClass={backgroundClass} />
    }
  }

  return (
    <div
      className="min-h-screen overflow-hidden relative"
      style={{
        backgroundImage: `
          linear-gradient(114.95deg, rgba(235, 0, 255, 0.4) 0%, rgba(0, 71, 255, 0) 34.35%), 
          linear-gradient(180deg, #004B5B 0%, #A7C7FF 100%), 
          linear-gradient(244.35deg, #FFB26A 0%, #3676B1 50.58%, #00A3FF 100%), 
          linear-gradient(244.35deg, #FFFFFF 0%, #004A74 49.48%, #0066FF 100%), 
          radial-gradient(100% 233.99% at 0% 100%, #0066B7 0%, #AD00FF 100%), 
          linear-gradient(307.27deg, #1DAC92 0.37%, #2800C6 100%), 
          radial-gradient(100% 140% at 100% 0%, #EAFF6B 0%, #006C7A 57.29%, #2200AA 100%)
        `,
        backgroundBlendMode: 'hard-light, overlay, overlay, overlay, difference, difference, normal'
      }}
    >
      {/* SVG Noise Background */}
      <div className="absolute inset-0 opacity-15 z-5">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          version="1.1" 
          viewBox="0 0 700 700" 
          width="100%" 
          height="100%" 
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <filter id="nnnoise-filter" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="linearRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="15" stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%" result="turbulence"></feTurbulence>
              <feColorMatrix in="turbulence" type="saturate" values="0.1" result="desaturated"/>
              <feComponentTransfer in="desaturated" result="contrast">
                <feFuncA type="discrete" tableValues="0.5 0.6 0.7 0.8 0.9 1"/>
              </feComponentTransfer>
            </filter>
          </defs>
          <rect width="700" height="700" fill="transparent"></rect>
          <rect width="700" height="700" fill="#ffffff" filter="url(#nnnoise-filter)"></rect>
        </svg>
      </div>

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Main presentation area */}
      <div className="relative z-20 h-screen flex items-center justify-center ">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
              scale: { duration: 0.4 },
              rotateY: { duration: 0.6 },
            }}
            className="w-full w-[100vw] h-full h-[100vh] perspective-1000"
          >
            {renderSlide(slides[currentSlide], currentSlide)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}