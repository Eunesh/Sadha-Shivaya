import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

// Sample gallery data
const galleryItems = [
  {
    id: 1,
    title: "Nepali Murti 1",
    description: "Best Design you can find in all nepal",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 2,
    title: "Nepali Murti 2",
    description: "Best Design you can find in all nepal",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 3,
    title: "Nepali Murti 3",
    description: "Best Design you can find in all nepal",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 4,
    title: "Nepali Murti 4",
    description: "Best Design you can find in all nepal",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    id: 5,
    title: "Nepali Murti 5",
    description: "Best Design you can find in all nepal",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function CardSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
//   const sliderRef = useRef<HTMLDivElement>(null)
const autoPlayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalItems = galleryItems.length

  const nextSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prev) => (prev >= totalItems - 1 ? 0 : prev + 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const prevSlide = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setCurrentIndex((prev) => (prev <= 0 ? totalItems - 1 : prev - 1))

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentIndex) return

    setIsAnimating(true)
    setCurrentIndex(index)

    setTimeout(() => {
      setIsAnimating(false)
    }, 600)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // Auto play functionality
  useEffect(() => {
    if (!isFullscreen) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 6000)
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [currentIndex, isFullscreen])

  // Pause auto play on hover
  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current)
    }
  }

  const resumeAutoPlay = () => {
    if (!isFullscreen) {
      autoPlayRef.current = setInterval(() => {
        nextSlide()
      }, 6000)
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide()
      } else if (e.key === "ArrowRight") {
        nextSlide()
      } else if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFullscreen])

  return (
    <div className={`relative w-full ${isFullscreen ? "fixed inset-0 z-50 bg-black" : "h-[calc(100vh-8rem)]"}`}>
      <div
        className={`absolute inset-0 flex items-center justify-center ${isFullscreen ? "p-4" : ""}`}
        onMouseEnter={pauseAutoPlay}
        onMouseLeave={resumeAutoPlay}
      >
        {/* Main gallery slider */}
        <div className="relative w-full h-full max-w-7xl mx-auto overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out ${
                  index === currentIndex
                    ? "opacity-100 z-10 transform-none"
                    : index < currentIndex
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <div className="relative w-full h-full flex flex-col items-center justify-center px-4">
                  <div className="relative w-full max-w-4xl aspect-[16/9] overflow-hidden rounded-lg shadow-2xl">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 opacity-80"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-gray-200 max-w-2xl">{item.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute top-4 right-4 bg-black/30 border-gray-500 text-white hover:bg-black/50"
                      onClick={toggleFullscreen}
                    >
                      <ZoomIn className="h-4 w-4" />
                      <span className="sr-only">Toggle fullscreen</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation controls */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 border-gray-500 text-white hover:bg-black/50 h-12 w-12 rounded-full"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Previous slide</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/30 border-gray-500 text-white hover:bg-black/50 h-12 w-12 rounded-full"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">Next slide</span>
          </Button>

          {/* Indicator dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex justify-center gap-2">
            {galleryItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "bg-white w-6" : "bg-gray-500"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail navigation */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-20 py-4 px-6 border-t border-gray-800">
        <div className="flex justify-center gap-4 overflow-x-auto pb-2 max-w-5xl mx-auto">
          {galleryItems.map((item, index) => (
            <div
              key={item.id}
              className={`relative cursor-pointer transition-all duration-300 ${
                index === currentIndex ? "opacity-100 ring-2 ring-white" : "opacity-60 hover:opacity-90"
              }`}
              onClick={() => goToSlide(index)}
            >
              <div className="w-20 h-12 overflow-hidden rounded">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={`Thumbnail for ${item.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
