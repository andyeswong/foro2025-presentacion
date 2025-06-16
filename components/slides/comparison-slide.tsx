"use client"

import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Cloud, Building, Users, DollarSign, Headphones, Lock, Share, Database, Settings, Globe, Crown } from "lucide-react"

interface ComparisonSlideProps {
  slide: any
  backgroundClass: string
}

const getIcon = (index: number) => {
  const icons = [Database, Lock, Settings, Globe, DollarSign, Headphones, Shield, Crown]
  return icons[index] || Building
}

export default function ComparisonSlide({ slide, backgroundClass }: ComparisonSlideProps) {
  const { content } = slide

  return (
    <div
      className={`w-full h-full rounded-3xl ${backgroundClass} relative overflow-hidden`}
    >
      {/* Content - Two column layout */}
      <div className="relative z-10 h-full flex">
        {/* Left Column - Title */}
        <div className="w-1/3 p-8 md:p-12 flex items-center justify-center">
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white text-center leading-tight"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {content.tableTitle}
          </motion.h2>
        </div>

        {/* Right Column - Comparison Content */}
        <div className="w-2/3 p-8 md:p-12">
          {/* Column headers with formal design */}
          <motion.div
            className="grid grid-cols-2 gap-8 mb-8"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* Private Column */}
            <motion.div
              className="bg-gradient-to-br from-blue-600/40 to-slate-800/60 backdrop-blur-md rounded-2xl p-6 border border-blue-400/40 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-slate-600/20" />
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500/40 to-slate-600/60 flex items-center justify-center border border-blue-300/50"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Building className="w-6 h-6 text-blue-200" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100">{content.leftColumnTitle}</h3>
              </div>
            </motion.div>

            {/* Public Column */}
            <motion.div
              className="bg-gradient-to-br from-slate-600/40 to-blue-800/60 backdrop-blur-md rounded-2xl p-6 border border-slate-400/40 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate-400/10 to-blue-600/20" />
              <div className="relative z-10 flex items-center justify-center space-x-3">
                <motion.div
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-500/40 to-blue-600/60 flex items-center justify-center border border-slate-300/50"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Cloud className="w-6 h-6 text-slate-200" />
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-100">{content.rightColumnTitle}</h3>
              </div>
            </motion.div>
          </motion.div>

          {/* Comparison categories in a formal grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.rows.map((row: any, index: number) => {
              const IconComponent = getIcon(index)
              
              return (
                <motion.div
                  key={index}
                  className="bg-gradient-to-br from-blue-500/15 to-slate-700/25 backdrop-blur-md rounded-xl p-4 border border-blue-400/25 relative overflow-hidden group hover:scale-105 transition-all duration-300"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 to-slate-600/15" />
                  <div className="relative z-10 flex flex-col items-center text-center space-y-3">
                    <motion.div
                      className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500/30 to-slate-600/40 flex items-center justify-center border border-blue-300/30"
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.4 }}
                    >
                      <IconComponent className="w-5 h-5 text-blue-200" />
                    </motion.div>
                    <h4 className="text-sm md:text-base font-bold text-slate-100 leading-tight">
                      {row.left}
                    </h4>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Formal decorative elements */}

    </div>
  )
}
