import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
// import { Sparkles } from "lucide-react"

export function ComingSoon() {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimate(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative max-w-6xl mx-auto text-center py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 left-1/4 w-72 h-72 bg-green-400/20 dark:bg-green-800/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-20 right-1/4 w-60 h-60 bg-indigo-400/20 dark:bg-indigo-800/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Sacred geometry background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-green-600 rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-600 rounded-full rotate-45" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-green-600 rounded-full rotate-90" />
      </div>

      {/* Main content */}
      <div className="relative">
        {/* Sparkle icon */}
        <div className="flex justify-center mb-6">
          <div
            className={cn(
              "relative transition-all duration-1000 ease-out",
              animate ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10",
            )}
          >
           <span className="h-28 w-24 text-green-500 dark:text-green-400 text-6xl">
               🪬
           </span>
            <div className="absolute -inset-2 rounded-full blur-md bg-green-300/30 dark:bg-green-500/30 animate-pulse" />
          </div>
        </div>

        {/* Coming Soon text */}
        <h2
          className={cn(
            "text-6xl md:text-8xl font-bold tracking-tight transition-all duration-1000 ease-out",
            "text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-indigo-500",
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          Have Patience;
        </h2>

        {/* Animated underline */}
        <div
          className="relative h-1 w-0 mx-auto mt-6 bg-gradient-to-r from-green-500 to-indigo-500 rounded-full overflow-hidden"
          style={{
            width: animate ? "180px" : "0px",
            transition: "width 1.5s ease-out",
          }}
        >
          <div className="absolute inset-0 bg-white/30 animate-pulse" />
        </div>

        {/* Subtitle */}
        <p
          className={cn(
            "mt-8 text-lg md:text-xl text-[#2b5003] dark:text-slate-300 max-w-xl mx-auto transition-all duration-1000 delay-300 ease-out",
            animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
          )}
        >
          We are brewing something for you.
        </p>

        {/* Floating elements */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-400/20 dark:bg-green-500/20"
            style={{
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* CSS for floating animation */}
      {/* <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style> */}
    </div>
  )
}
