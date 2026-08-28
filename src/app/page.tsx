import { Navbar } from "@/app/others/layout/Navbar";
import { About } from "@/about/About";
import { Contact } from "@/contact/Contact";
import { Hero } from "@/home/Hero";
import { Projects } from "@/projects/Projects";
import { TechStack } from "@/skills/TechStack";
import { Timeline } from "@/timeline/Timeline";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Clears the fixed navbar: 4rem of content plus its 1px bottom border.
          The hero now opens with a full-bleed status strip, so this offset has
          to live here rather than as padding on the hero itself. */}
      <main className="pt-[calc(4rem+1px)]">
        <Hero />
        <About />
        <Projects />
        <TechStack />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}
