
import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Heart, Star } from "lucide-react"

import { Button } from "@/components/ui/button"

// Sample product data - in a real app, you would fetch this based on the ID
const products = [
  {
    id: 1,
    name: "Tech Woven Jacket",
    brand: "SportBrand",
    description: "Men's Woven Jacket",
    price: 160,
    rating: 4.8,
    mainImage: "/placeholder.svg?height=600&width=600",
    thumbnails: [
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
      "/placeholder.svg?height=100&width=100",
    ],
    colors: [
      { name: "Black", image: "/placeholder.svg?height=60&width=60" },
      { name: "Olive", image: "/placeholder.svg?height=60&width=60" },
      { name: "Navy", image: "/placeholder.svg?height=60&width=60" },
      { name: "Blue", image: "/placeholder.svg?height=60&width=60" },
      { name: "Gray", image: "/placeholder.svg?height=60&width=60" },
      { name: "Beige", image: "/placeholder.svg?height=60&width=60", selected: true },
      { name: "Light Blue", image: "/placeholder.svg?height=60&width=60" },
      { name: "Teal", image: "/placeholder.svg?height=60&width=60" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "3XL"],
    features: ["Water-resistant", "Lightweight", "Breathable fabric", "Adjustable hood"],
    isHighlyRated: true,
  },
  // Add more products as needed
]

export function ProductDetail() {
  const { id } = useParams()
  const productId = Number.parseInt(id || "1")

  // Find the product by ID
  const product = products.find((p) => p.id === productId) || products[0]

  const [selectedSize, setSelectedSize] = useState("")
  const [selectedThumbnail, setSelectedThumbnail] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors.findIndex((c) => c.selected) || 0)

  return (
    <div>
      {/* Navigation bar */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-sm font-medium flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
          <div className="flex space-x-4">
            <Link to="/shop" className="text-sm font-medium">
              Shop All New Arrivals
            </Link>
            <Link to="/shop" className="text-sm font-medium">
              Shop
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left column - Images */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="hidden sm:flex flex-col gap-2">
              {product.thumbnails.map((thumb, index) => (
                <button
                  key={index}
                  className={`w-16 h-16 border rounded overflow-hidden ${
                    selectedThumbnail === index ? "ring-2 ring-black" : ""
                  }`}
                  onClick={() => setSelectedThumbnail(index)}
                >
                  <img
                    src={thumb || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative">
              {product.isHighlyRated && (
                <div className="absolute top-4 left-4 z-10 bg-white rounded-full px-3 py-1 flex items-center text-sm font-medium">
                  <Star className="h-4 w-4 fill-black mr-1" />
                  Highly Rated
                </div>
              )}
              <img
                src={product.mainImage || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-auto rounded-lg object-cover"
              />
            </div>
          </div>

          {/* Right column - Product details */}
          <div>
            <div className="mb-6">
              <h1 className="text-2xl font-bold">
                {product.brand} {product.name}
              </h1>
              <p className="text-lg text-muted-foreground">{product.description}</p>
              <p className="text-xl font-semibold mt-2">${product.price}</p>
            </div>

            {/* Color options */}
            <div className="mb-8">
              <div className="grid grid-cols-5 gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    className={`relative rounded-md overflow-hidden ${
                      selectedColor === index ? "ring-2 ring-black" : ""
                    }`}
                    onClick={() => setSelectedColor(index)}
                  >
                    <img
                      src={color.image || "/placeholder.svg"}
                      alt={color.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-semibold">Select Size</h2>
                <button className="text-sm font-medium flex items-center">
                  <span className="underline">Size Guide</span>
                </button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Fits large; we recommend ordering a size down</p>

              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`py-3 border rounded-md text-center ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to bag and favorite buttons */}
            <div className="space-y-3">
              <Button className="w-full py-6 text-base rounded-full bg-black hover:bg-gray-800">Add to Bag</Button>
              <Button variant="outline" className="w-full py-6 text-base rounded-full border-gray-300">
                <Heart className="mr-2 h-5 w-5" />
                Favorite
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
