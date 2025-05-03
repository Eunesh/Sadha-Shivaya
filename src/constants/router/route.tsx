import { Home } from "@/pages/Home";
import { ProductListing } from "@/pages/product-listing";


export const ROUTES = [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/shop",
      element: <ProductListing />,
    }
  ];