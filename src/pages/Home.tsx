import { Header } from "../components/header";
// import { ComingSoon } from "../components/coming-soon";
// import CardSlider from "@/components/card_slider";
import BackgroundPaths from "@/components/background_paths";

export function Home() {
  return (
    <>
      <Header />
      <main>
        <BackgroundPaths/>
      {/* <div className="max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl mx-auto text-center">
           <CardSlider />
      </div> */}
     </main>
    </>
  );  
}
