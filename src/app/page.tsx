import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealController } from "@/components/layout/RevealController";
import { CursorLabel } from "@/components/layout/CursorLabel";
import { Hero } from "@/components/sections/Hero";
import { Introduction } from "@/components/sections/Introduction";
import { Treatments } from "@/components/sections/Treatments";
import { Transformation } from "@/components/sections/Transformation";
import { Dentist } from "@/components/sections/Dentist";
import { Visit } from "@/components/sections/Visit";
import { Stories } from "@/components/sections/Stories";
import { Journal } from "@/components/sections/Journal";
import { Appointment } from "@/components/sections/Appointment";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Introduction />
        <Treatments />
        <Transformation />
        <Dentist />
        <Visit />
        <Stories />
        <Journal />
        <Appointment />
      </main>
      <Footer />
      {/* Mounted last so pinned sections are measured before shared reveals. */}
      <RevealController />
      <CursorLabel />
    </>
  );
}
