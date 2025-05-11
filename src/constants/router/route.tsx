import { Home } from "@/pages/Home";
import { ProductListing } from "@/pages/product-listing";
import { ProductDetail } from "@/pages/product-details";


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
    }
  ];