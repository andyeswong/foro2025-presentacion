"use client";
import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { presentationData, type Slide as PresentationSlide } from "@/lib/presentation-data";

// Types for admin interface
interface Keypoint {
  title: string;
  points: string[];
}

interface AdminSlide {
  title: string;
  content: string;
  keypoints: Keypoint[];
  type: string;
  order: number;
}

// Helper to extract keypoints from presentation slides
function extractKeypoints(slide: PresentationSlide): Keypoint[] {
  const keypoints: Keypoint[] = [];
  
  // Handle different slide types
  if (slide.content.sections) {
    // For scroll slides with sections
    slide.content.sections.forEach(section => {
      const points: string[] = [];
      
      // Extract bullet points from content
      const bulletPoints = section.content.match(/• (.+)/g);
      if (bulletPoints) {
        points.push(...bulletPoints.map(point => point.replace(/^• /, '').trim()));
      }
      
      // Extract numbered points
      const numberedPoints = section.content.match(/\*\*\d+\.\s*(.+?):\*\*\s*(.+)/g);
      if (numberedPoints) {
        points.push(...numberedPoints.map(point => point.replace(/\*\*\d+\.\s*|\*\*/g, '').trim()));
      }
      
      if (points.length > 0) {
        keypoints.push({
          title: section.title,
          points
        });
      }
    });
  } else if (slide.content.title && slide.content.subtitle) {
    // For title slides
    keypoints.push({
      title: "Slide Content",
      points: [slide.content.title, slide.content.subtitle].filter(Boolean)
    });
  } else if (slide.content.steps) {
    // For workflow slides
    keypoints.push({
      title: "Workflow Steps",
      points: slide.content.steps.map(step => step.title)
    });
  }
  
  return keypoints;
}

// Convert presentation slides to admin slides
function convertToAdminSlides(slides: PresentationSlide[]): AdminSlide[] {
  return slides.map(slide => ({
    title: slide.title,
    content: JSON.stringify(slide.content, null, 2),
    keypoints: extractKeypoints(slide),
    type: slide.type,
    order: slide.order
  }));
}

export default function AdminPage() {
  const [slides, setSlides] = useState<AdminSlide[]>([]);
  const [current, setCurrent] = useState(0);
  const [pusher, setPusher] = useState<Pusher | null>(null);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    // Load slides from shared presentation data
    const adminSlides = convertToAdminSlides(presentationData.presentation.slides);
    setSlides(adminSlides);

    // Set up Pusher
    const p = new Pusher("88a05f4588ff1360bb15", { cluster: "us3" });
    
    p.connection.bind('connected', () => setConnectionStatus('connected'));
    p.connection.bind('disconnected', () => setConnectionStatus('disconnected'));
    p.connection.bind('connecting', () => setConnectionStatus('connecting'));
    
    setPusher(p);
    return () => p.disconnect();
  }, []);

  const sendSlideChange = (idx: number) => {
    fetch("/api/pusher", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slide: idx }),
    });
  };

  // Touch handlers for swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && current < slides.length - 1) {
      const newSlide = current + 1;
      setCurrent(newSlide);
      sendSlideChange(newSlide);
    }
    
    if (isRightSwipe && current > 0) {
      const newSlide = current - 1;
      setCurrent(newSlide);
      sendSlideChange(newSlide);
    }
  };

  if (!slides.length) return <div className="p-8">Loading slides...</div>;

  const slide = slides[current];

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-3 sm:p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">Remote Control Hub</h1>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className={`w-3 h-3 rounded-full ${
                connectionStatus === 'connected' ? 'bg-green-500' : 
                connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600 capitalize">{connectionStatus}</span>
            </div>
          </div>
          
          {/* Controls */}
          <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            {/* Navigation Buttons */}
            <div className="flex gap-2 sm:gap-3">
              <button 
                onClick={() => { setCurrent((c) => Math.max(0, c - 1)); sendSlideChange(Math.max(0, current - 1)); }} 
                disabled={current === 0}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium touch-manipulation"
              >
                ← Prev
              </button>
              <button 
                onClick={() => { setCurrent((c) => Math.min(slides.length - 1, c + 1)); sendSlideChange(Math.min(slides.length - 1, current + 1)); }} 
                disabled={current === slides.length - 1}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-3 sm:py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm sm:text-base font-medium touch-manipulation"
              >
                Next →
              </button>
            </div>
            
            {/* Slide Selector */}
            <div className="w-full sm:w-auto">
              <select 
                value={current} 
                onChange={e => { setCurrent(Number(e.target.value)); sendSlideChange(Number(e.target.value)); }} 
                className="w-full sm:w-auto px-3 py-3 sm:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base bg-white appearance-none cursor-pointer"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e\")", backgroundPosition: "right 0.5rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "2.5rem" }}
              >
                {slides.map((s, i) => (
                  <option key={i} value={i}>
                    #{i + 1}: {s.title.length > 30 ? s.title.substring(0, 30) + '...' : s.title}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Current Slide Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-2 sm:p-3 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <span className="text-sm sm:text-base font-medium text-blue-800">
                  Slide {current + 1} of {slides.length}
                </span>
                <span className="text-xs sm:text-sm text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                  {slide.type}
                </span>
              </div>
              {/* Mobile swipe hint */}
              <div className="block sm:hidden mt-2 text-xs text-blue-600 text-center">
                💡 Swipe left/right on content area to navigate
              </div>
            </div>
          </div>
          {/* Slide Content */}
          <div 
            className="bg-gray-50 rounded-lg p-3 sm:p-4 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 mb-3 sm:mb-4">{slide.title}</h2>
            
            {/* Keypoints */}
            <div className="mb-4">
              {slide.keypoints && slide.keypoints.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {slide.keypoints.map((kp: Keypoint, i: number) => (
                    <div key={i} className="bg-white p-2 sm:p-3 rounded border">
                      <h3 className="font-semibold text-gray-700 mb-1 sm:mb-2 text-sm sm:text-base">{kp.title}:</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm sm:text-base">
                        {kp.points.map((point, j) => (
                          <li key={j} className="break-words">{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : <p className="text-gray-500 text-sm sm:text-base">No keypoints found.</p>}
            </div>
            
            {/* Raw Content Toggle */}
            <details className="mt-3 sm:mt-4">
              <summary className="cursor-pointer text-gray-600 hover:text-gray-800 text-sm sm:text-base select-none">
                Show raw content
              </summary>
              <div className="mt-2 bg-gray-100 p-2 sm:p-3 rounded border overflow-hidden">
                <pre className="text-xs sm:text-sm overflow-x-auto whitespace-pre-wrap break-words">{slide.content}</pre>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
} 