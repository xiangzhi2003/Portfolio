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
      <main>
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
