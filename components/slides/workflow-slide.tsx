"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowDown } from 'lucide-react'

interface WorkflowStep {
  id: number
  title: string
  subtitle?: string
  description: string[]
  codeExample?: string
  color: string
  position: { x: number; y: number }
}

interface WorkflowSlideProps {
  slide: any
  backgroundClass: string
}

export default function WorkflowSlide({ slide, backgroundClass }: WorkflowSlideProps) {
  const { content } = slide

  return (
    <div className="w-full h-full relative overflow-hidden p-8">
      {/* Title */}
      <motion.div
        className="text-center mb-12"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-200 via-slate-100 to-blue-300 bg-clip-text mb-4">
          {content.title}
        </h1>
        {content.subtitle && (
          <p className="text-lg text-slate-300 tracking-wider font-light">
            {content.subtitle}
          </p>
        )}
      </motion.div>

      {/* Workflow Steps */}
      <div className="relative max-w-7xl mx-auto">
        {/* Grid layout for first row steps */}
        <div className="grid grid-cols-4 gap-8 mb-8">
          {content.steps.map((step: WorkflowStep, index: number) => (
            <motion.div
              key={step.id}
              className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 ${step.color}`}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 + index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
            >
              {/* Step number */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {step.id}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-2">
                {step.title}
              </h3>

              {/* Subtitle */}
              {step.subtitle && (
                <p className="text-sm text-blue-200 mb-3 font-medium">
                  {step.subtitle}
                </p>
              )}

              {/* Description */}
              <div className="space-y-1">
                {step.description.map((desc, i) => (
                  <p key={i} className="text-xs text-slate-300">
                    {desc}
                  </p>
                ))}
              </div>

              {/* Code example */}
              {step.codeExample && (
                <div className="mt-3 p-2 bg-black/30 rounded-lg">
                  <code className="text-xs text-green-300 font-mono whitespace-pre-line">
                    {step.codeExample}
                  </code>
                </div>
              )}

              {/* Arrow to next step (except last in row) */}
              {index < content.steps.length - 1 && (
                <motion.div
                  className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-white/60"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.2 }}
                >
                  <ArrowRight size={24} />
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Center arrow down */}


        {/* Grid layout for second row steps */}
        {content.secondRow && (
          <div className="grid grid-cols-4 gap-8 mb-12">
            {content.secondRow.map((step: WorkflowStep, index: number) => (
              <motion.div
                key={step.id}
                className={`relative bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 ${step.color}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.id}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>

                {/* Subtitle */}
                {step.subtitle && (
                  <p className="text-sm text-blue-200 mb-3 font-medium">
                    {step.subtitle}
                  </p>
                )}

                {/* Description */}
                <div className="space-y-1">
                  {step.description.map((desc, i) => (
                    <p key={i} className="text-xs text-slate-300">
                      {desc}
                    </p>
                  ))}
                </div>

                {/* Code example */}
                {step.codeExample && (
                  <div className="mt-3 p-2 bg-black/30 rounded-lg">
                    <code className="text-xs text-green-300 font-mono whitespace-pre-line">
                      {step.codeExample}
                    </code>
                  </div>
                )}

                {/* Arrow to next step (except last in row) */}
                {index < content.secondRow.length - 1 && (
                  <motion.div
                    className="absolute -right-6 top-1/2 transform -translate-y-1/2 text-white/60"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.8 + index * 0.2 }}
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom row - Additional categories */}
        <div className="grid grid-cols-3 gap-8">
          {content.categories.map((category: any, index: number) => (
            <motion.div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 2.2 + index * 0.2, duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                {category.title}
              </h3>
              <div className="space-y-2">
                {category.items.map((item: string, i: number) => (
                  <div key={i} className="flex items-start space-x-2">
                    <span className="text-blue-300 text-sm">•</span>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

   
      </div>
    </div>
  )
} 