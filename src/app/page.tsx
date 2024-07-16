import About from "@/components/about/main";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Magna Web v1</div>
      <About />
    </main>
  );
}
