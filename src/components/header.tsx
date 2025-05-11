"use client"

import { useState, useEffect } from "react"
import { Menu, X, Moon, Sun} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"
import { NavLink } from "react-router";

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const isMobile = useMobile()

    // Define the route type
type RouteItem = {
  label: string;
  path: string;
};

const routes:RouteItem[] = [
  { label: "Home", path: "/" },
  // { label: "Shop", path: "/shop" },
  // { label: "About", path: "/about" },
];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled ? "bg-gray-100/80 dark:bg-slate-900/80 shadow-md py-3" : "bg-transparent py-5",
        theme === "dark" ? "text-white" : "text-slate-800",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            {/* <div className="relative">
              <Lotus
                className={cn(
                  "h-8 w-8 transition-colors duration-300",
                  theme === "dark" ? "text-[#2b5003]" : "text-[#2b5003]",
                )}
              />
              <div
                className={cn(
                  "absolute -inset-1 rounded-full blur-md opacity-40 animate-pulse",
                  theme === "dark" ? "text-[#2b5003]]" : "text-[#2b5003]]",
                )}
              ></div>
            </div> */}
            <span
              className={cn("text-xl font-semibold tracking-wider", theme === "dark" ? "text-white" : "text-slate-800")}
            >
              <span className="text-[#2b5003]">Sadha</span><span className="text-[#2b5003]">Shivaya</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav
            className={cn("hidden md:flex items-center gap-8", theme === "dark" ? "text-slate-200" : "text-slate-700")}
          >
            {routes.map(({ label, path }) => (
             <NavLink
             to={path}
             key={label}
             className={({ isActive }) =>
               cn(
                 "relative text-sm uppercase tracking-wider font-medium transition-colors duration-300 hover:text-green-600",
                 "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-500",
                 "after:transition-all after:duration-300 hover:after:w-full",
                 isActive && "text-green-600"
               )
             }
           >
             {label}
           </NavLink>
            ))}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Contact button */}
            {/* <Button
              className={cn(
                "hidden md:flex rounded-full bg-gradient-to-r from-purple-500 to-indigo-500",
                "hover:from-purple-600 hover:to-indigo-600 text-white shadow-md",
                "hover:shadow-lg transition-all duration-300",
              )}
            >
              Connect
            </Button> */}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">Toggle menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div
            className={cn(
              "absolute top-full left-0 right-0 p-4 shadow-lg",
              "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md",
              "flex flex-col gap-4 transition-all duration-300 animate-in fade-in slide-in-from-top-5",
            )}
          >
            {routes.map(({ label, path }) => (
              <NavLink
              to={path}
              key={label}
              className={({ isActive }) =>
                cn(
                  "py-2 px-4 text-center rounded-md transition-colors",
                  "hover:bg-purple-100 dark:hover:bg-purple-900/30",
                  isActive ? "bg-purple-200 dark:bg-purple-800/50 font-semibold" : ""
                )
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              {label}
            </NavLink>
            ))}
            <Button className="mt-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600">
              Connect
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}
