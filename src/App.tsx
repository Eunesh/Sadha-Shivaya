// import { Button } from "@/components/ui/button"

// import CardSlider  from "@/components/card_slider"
// import ProductListing from "./pages/product-listing"
import { SpiritualHeader } from "./components/header"
import { ComingSoon } from "./components/coming-soon"

function App() {

  return (
    <>
    <SpiritualHeader/>
    <main className="pt-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <ComingSoon/>
        {/* <ProductListing/> */}
        </div>
      </main>
    </>
    // <main className="flex-1 flex items-center justify-center p-0">
    //     <div className="w-full">
    //       <CardSlider />
    //     </div>
    //   </main>
  )
}

export default App
