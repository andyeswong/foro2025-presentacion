"use client"

import { motion } from "framer-motion"

interface ContentSlideProps {
  slide: any
  backgroundClass: string
}

export default function ContentSlide({ slide, backgroundClass }: ContentSlideProps) {
  const { content } = slide

  return (
    <div
      className={`w-full h-full rounded-3xl ${backgroundClass} relative overflow-hidden`}
    >
      {/* Glassmorphic overlay */}

      {/* Background image if available */}
      {content.backgroundImage && (
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: `url(${content.backgroundImage})` }}
        />
      )}

      {/* Content - Two column layout */}
      <div className="relative z-10 h-full flex">
        {/* Left Column - Title */}
        <div className="w-1/3 p-8 md:p-12 flex items-center justify-center">
          {content.heading && (
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-white text-center leading-tight"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {content.heading}
            </motion.h2>
          )}
        </div>

        {/* Right Column - Content */}
        <div className="w-2/3 p-8 md:p-12 flex items-center justify-center">
          <motion.div
            className="w-full max-w-none"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
              {content.useMarkdown ? (
                <div
                  className="text-white/90 text-lg leading-relaxed prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: content.body
                      .replace(/\n/g, "<br>")
                      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                      .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                  }}
                />
              ) : (
                <p className="text-white/90 text-lg leading-relaxed">{content.body}</p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating decorative elements */}

    </div>
  )
}
