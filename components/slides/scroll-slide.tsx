"use client"

import { motion } from "framer-motion"
import { ScrollArea } from "@/components/ui/scroll-area"
// Material-UI Icons
import {
  Psychology,
  FlashOn,
  GpsFixed,
  Language,
  SmartToy,
  TravelExplore,
  Edit,
  Settings,
  Description,
  History,
  Memory,
  MenuBook,
  School,
  LibraryBooks,
  Groups,
  Engineering,
  Handyman,
  AutoAwesome,
  Hub,
  Cable,
  Code,
  Architecture,
  QuestionMark,
  Lightbulb,
  Storage,
  Speed,
  Security,
  Build,
  Api,
  Computer,
  DataObject,
  Functions,
  AccountTree
} from '@mui/icons-material'

interface ScrollSlideProps {
  slide: any
  backgroundClass: string
}

// Function to get specific icons based on slide content
const getIconsForSlide = (containerTitle: string, sections: any[]) => {
  const iconMap: { [key: string]: any[] } = {
    "Conceptos Fundamentales de IA": [Psychology, Language, Edit, Memory, History],
    "LLM": [Psychology, FlashOn, GpsFixed],
    "Lenguaje Natural": [Language, SmartToy, TravelExplore],
    "¿Qué es un Prompt en IA?": [Edit, Settings, Description],
    "El contexto en la comunicación con la IA": [Memory, MenuBook, School],
    "Historial": [History, Memory, AutoAwesome],
    "SystemPrompt": [Settings, Description, Security],
    "Explicación - RAG": [LibraryBooks, Storage, AutoAwesome],
    "Analogía - RAG": [School, LibraryBooks, Lightbulb],
    "Explicación - SMA": [Groups, Engineering, Speed],
    "Analogía - SMA: Estación Aduanera": [Groups, Handyman, Security],
    "Explicación - Agentes de IA": [SmartToy, Build, Api],
    "Analogía - Agentes de IA": [GpsFixed, Computer, AutoAwesome],
    "Explicación - MCP": [Hub, Cable, AccountTree],
    "Analogía - MCP": [Cable, Hub, Api],
    "Explicación - IA como Acción": [Build, Functions, Speed],
    "Explicación - VibeCoding": [Code, Architecture, AutoAwesome]
  }

  // Return specific icons for the slide, or default icons if not found
  return iconMap[containerTitle] || [Psychology, FlashOn, GpsFixed]
}

export default function ScrollSlide({ slide, backgroundClass }: ScrollSlideProps) {
  const { content } = slide
  const slideIcons = getIconsForSlide(content.containerTitle, content.sections)

  return (
    <div
      className={`w-full h-full  relative overflow-hidden`}
    >
      {/* Background image if available */}
      {content.backgroundImage && (
        <div
          className="absolute bottom-0 right-0 h-[60vh] w-[40vw] opacity-50"
          style={{
            backgroundImage: `url(${content.backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 0% 100%)',
            zIndex: 5
          }}
        />
      )}

      {/* Content - Two column layout */}
      <div className="relative z-10 h-full flex">
        {/* Left Column - Title */}
        <div className="w-1/3 p-8 md:p-12 flex flex-col items-center justify-center">
        {/* Stars decoration (only for LLM slide) */}
        {content.containerTitle === "LLM" && (
          <div className="flex items-center justify-center mb-8">
            <motion.span 
                className="text-4xl mr-4"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              ✨
            </motion.span>
            
            {/* Main LLM Title */}
            <motion.h1
                className="text-6xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-blue-200 via-slate-100 to-blue-300 bg-clip-text"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
            >
              LLM
            </motion.h1>
            
            <motion.span 
                className="text-4xl ml-4"
              animate={{ rotate: [360, 0] }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              ✨
            </motion.span>
          </div>
        )}

        {/* Regular title for other slides */}
        {content.containerTitle !== "LLM" && (
          <motion.h1
              className="text-4xl md:text-6xl font-bold text-transparent bg-gradient-to-r from-blue-200 via-slate-100 to-blue-300 bg-clip-text mb-8 text-center leading-tight"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          >
            {content.containerTitle}
          </motion.h1>
        )}

        {/* Subtitle */}
        {content.subtitle && (
          <motion.p
              className="text-lg md:text-xl text-slate-300 tracking-wider font-light text-center"
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            {content.subtitle}
          </motion.p>
        )}
        </div>

        {/* Right Column - Content sections */}
        <div className="w-2/3 p-8 md:p-12 flex items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          {content.sections.map((section: any, index: number) => {
            const IconComponent = slideIcons[index] || Psychology
            
            return (
              <motion.div
                key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: "easeOut" }}
                  whileHover={{ scale: 1.05 }}
              >
                {/* Material-UI Icon */}
                <motion.div
                    className="mb-4 text-blue-200 flex justify-center"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.6 + index * 0.2, duration: 0.6 }}
                >
                    <IconComponent sx={{ fontSize: { xs: 40, md: 50 } }} />
                </motion.div>
                
                  {/* Title */}
                  <h3 className="text-lg md:text-xl font-bold text-blue-200 text-center mb-4">
                  {section.title}
                </h3>

                  {/* Content */}
                  <div className="text-center">
                  {section.useMarkdown ? (
                    <div
                      className="text-slate-300 leading-relaxed text-sm space-y-1"
                      dangerouslySetInnerHTML={{
                        __html: section.content
                          .replace(/\n/g, "<br>")
                          .replace(/\*\*(.*?)\*\*/g, "<strong class='text-blue-200 font-bold'>$1</strong>")
                          .replace(/\*(.*?)\*/g, "<em class='text-blue-300'>$1</em>")
                          .replace(/•/g, "→")
                          .replace(
                            /!\[.*?\]\((.*?)\)/g,
                            '<img src="$1" alt="Image" class="rounded-lg my-4 max-w-full h-auto mx-auto" />',
                          ),
                      }}
                    />
                  ) : (
                      <p className="text-slate-300 leading-relaxed text-sm">
                        {section.content}
                      </p>
                  )}
                  </div>
              </motion.div>
            )
          })}
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}

    </div>
  )
}
