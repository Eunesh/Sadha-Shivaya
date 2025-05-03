"use client"

import { useState } from "react"
import { ChevronDown, Heart, Search, ShoppingCart, Star } from "lucide-react"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

// Sample product data
const products = [
  {
    id: 1,
    name: "Nepali Murti",
    price: 49.99,
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
  {
    id: 2,
    name: "Buddha",
    price: 199.99,
    rating: 4.8,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
  {
    id: 3,
    name: "Lord",
    price: 129.99,
    rating: 4.6,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
  {
    id: 4,
    name: "Kaal Bhairab",
    price: 299.99,
    rating: 4.7,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
  {
    id: 5,
    name: "Golden Buddha",
    price: 24.99,
    rating: 4.3,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
  {
    id: 6,
    name: "Kali Mata",
    price: 79.99,
    rating: 4.4,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
  {
    id: 7,
    name: "Lord Shiva",
    price: 39.99,
    rating: 4.2,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
  {
    id: 8,
    name: "Nepali Murti 2",
    price: 19.99,
    rating: 4.5,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sculpture",
  },
]

export function ProductListing() {
  const [sortOption, setSortOption] = useState("Featured")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter products based on search query
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "Price: Low to High") {
      return a.price - b.price
    } else if (sortOption === "Price: High to Low") {
      return b.price - a.price
    } else if (sortOption === "Rating") {
      return b.rating - a.rating
    }
    // Default: Featured (no sorting)
    return 0
  })

  return (
    <div>
      <Header/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-32">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-3">Discover Our Collection</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Best You will find in Nepal</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-muted/30 border-0 focus-visible:ring-1"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 bg-transparent border-muted">
                Sort: {sortOption}
                <ChevronDown className="h-4 w-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => setSortOption("Featured")}>Featured</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("Price: Low to High")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("Price: High to Low")}>
                Price: High to Low
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOption("Rating")}>Rating</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-2">No products found</h2>
            <p className="text-muted-foreground">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
            {sortedProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square mb-4 overflow-hidden rounded-xl bg-muted/30">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="object-cover w-full h-full transition-all duration-300 group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 rounded-full bg-white/80 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                  </Button>
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {product.category}
                  </div>
                  {/* <Link href={`/product/${product.id}`} className="block group-hover:underline">
                    <h3 className="font-medium text-base">{product.name}</h3>
                  </Link> */}

                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3.5 w-3.5 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : i < product.rating
                              ? "fill-amber-400 text-amber-400 opacity-50"
                              : "text-muted stroke-muted-foreground fill-transparent"
                        }`}
                      />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">({product.rating})</span>
                  </div>

                  <div className="flex items-center justify-between mt-2">
                    <div className="font-semibold">${product.price.toFixed(2)}</div>
                    <Button size="sm" variant="ghost" className="h-8 rounded-full hover:bg-muted/50">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
