import { Header } from "../components/header";
import { ComingSoon } from "../components/coming-soon";

export function Home() {
  return (
    <>
      <Header />
      <main className="pt-32 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <ComingSoon />
        </div>
      </main>
    </>
  );
}
