"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ImageOff } from "lucide-react"

interface FleetCategoryCarouselProps {
  images: string[]
  title: string
  interval?: number
}

export default function FleetCategoryCarousel({
  images,
  title,
  interval = 10000
}: FleetCategoryCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  
  // No images case - show no images placeholder
  if (!images || images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 bg-gray-100 dark:bg-gray-800">
        <ImageOff className="h-12 w-12 text-gray-400 mb-2" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">No images available</p>
      </div>
    )
  }
  
  // Only one image case - show static image
  if (images.length === 1) {
    return (
      <div className="relative h-48">
        <Image
          src={images[0]}
          alt={title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          priority
        />
      </div>
    )
  }
  
  // For multiple images - set up rotation
  useEffect(() => {
    // Initial setup
    setNextIndex((currentIndex + 1) % images.length)
    
    let transitionTimer: NodeJS.Timeout
    
    const timer = setInterval(() => {
      // Start transition
      setIsTransitioning(true)
      
      // After transition completes, update currentIndex and reset transition
      transitionTimer = setTimeout(() => {
        setCurrentIndex(nextIndex)
        setNextIndex((nextIndex + 1) % images.length)
        setIsTransitioning(false)
      }, 1000) // Match this time with CSS transition duration
    }, interval)
    
    return () => {
      clearInterval(timer)
      clearTimeout(transitionTimer)
    }
  }, [currentIndex, nextIndex, images.length, interval])
  
  return (
    <div className="relative h-48 overflow-hidden">
      {/* Current image */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src={images[currentIndex]}
          alt={`${title} ${currentIndex + 1}`}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          loading="eager"
          priority
        />
      </div>
      
      {/* Next image (fades in) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
          isTransitioning ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image
          src={images[nextIndex]}
          alt={`${title} ${nextIndex + 1}`}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          loading="eager"
        />
      </div>
      
      {/* Image counter */}
      <div className="absolute bottom-2 right-2 bg-black/50 text-primary text-xs py-1 px-2 rounded-full z-10">
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  )
} 