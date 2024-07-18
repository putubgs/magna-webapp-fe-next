import Image from "next/image";
import Header from "@/components/header";
import Main from "@/components/section1/main";
import About from "@/components/about/main";
import Section3 from "@/components/section-3";
import Founder from "@/components/founder/main";
import NetworkSection from "@/components/networkSection";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="flex flex-col items-center">
        <Main />
        <About />
        <Section3 />
        <NetworkSection />
        <Founder />
      </div>
      <Footer />
    </main>
  );
}
