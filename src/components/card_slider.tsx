import image from '../image/IMG_0845.jpeg'
import image2 from '../image/IMG_0847.jpeg'
import image3 from '../image/IMG_0849.jpeg'
import image4 from '../image/IMG_0850.jpeg'
import image5 from '../image/IMG_0412.jpeg'

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Maximize2, Minimize2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample images - replace with your own
const images = [
  image,
  image2,
  image3,
  image4,
  image5
]


export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const handlePrevious = () => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Handle fullscreen exit with ESC key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleEscKey)
    return () => window.removeEventListener("keydown", handleEscKey)
  }, [isFullscreen])

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    }),
  }

  return (
    <>
      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black">
          <div className="relative h-screen w-screen">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full object-contain"
              />
            </AnimatePresence>

            {/* Navigation buttons */}
            <Button
              onClick={handlePrevious}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full w-12 h-12 border border-white/30 shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-white drop-shadow-md" />
              <span className="sr-only">Previous slide</span>
            </Button>

            <Button
              onClick={handleNext}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full w-12 h-12 border border-white/30 shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-white drop-shadow-md" />
              <span className="sr-only">Next slide</span>
            </Button>

            {/* Fullscreen toggle button */}
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full w-10 h-10 border border-white/30 shadow-lg transition-all duration-300"
            >
              <Minimize2 className="h-5 w-5 text-white drop-shadow-md" />
              <span className="sr-only">Exit fullscreen</span>
            </Button>

            {/* Indicator dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1)
                    setCurrentIndex(index)
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-black w-6" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regular slider (non-fullscreen) */}
      {!isFullscreen && (
        <div
          className="relative overflow-hidden rounded-2xl"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden rounded-2xl">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.img
                key={currentIndex}
                src={images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Navigation buttons */}
            <Button
              onClick={handlePrevious}
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full w-12 h-12 border border-white/30 shadow-lg transition-all duration-300"
            >
              <ChevronLeft className="h-6 w-6 text-white drop-shadow-md" />
              <span className="sr-only">Previous slide</span>
            </Button>

            <Button
              onClick={handleNext}
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full w-12 h-12 border border-white/30 shadow-lg transition-all duration-300"
            >
              <ChevronRight className="h-6 w-6 text-white drop-shadow-md" />
              <span className="sr-only">Next slide</span>
            </Button>

            {/* Fullscreen toggle button */}
            <Button
              onClick={toggleFullscreen}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full w-10 h-10 border border-white/30 shadow-lg transition-all duration-300"
            >
              <Maximize2 className="h-5 w-5 text-white drop-shadow-md" />
              <span className="sr-only">Enter fullscreen</span>
            </Button>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1)
                  setCurrentIndex(index)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-green-600 w-6" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}