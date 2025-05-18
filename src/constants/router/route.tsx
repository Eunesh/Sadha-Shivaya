import { Home } from "@/pages/Home";
import { ProductListing } from "@/pages/product-listing";
import { ProductDetail } from "@/pages/product-details";
import CardSlider from "@/components/card_slider";


export const ROUTES = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <ProductListing />,
    },
    {
        path: "/product-details",
        element:  <ProductDetail />
    },
    {
      path: "/gallery",
      element: <CardSlider/>
    }
  ];