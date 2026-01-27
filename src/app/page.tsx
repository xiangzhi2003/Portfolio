import { Navbar } from "@/app/others/layout/Navbar";
import { ScrollProgress } from "@/app/others/layout/ScrollProgress";
import { SpotlightCursor } from "@/app/others/layout/SpotlightCursor";
import { GSAPScrollProvider } from "@/app/others/providers/GSAPScrollProvider";
import { Contact } from "@/contact/Contact";
import { GSAPSection } from "@/home/GSAPSection";
import { Projects } from "@/projects/Projects";
import { ScrollTransition } from "@/home/ScrollTransition";
import { TechStack } from "@/skills/TechStack";
import { Timeline } from "@/timeline/Timeline";

export default function Home() {
  return (
    <GSAPScrollProvider>
      <main className="min-h-screen bg-transparent text-foreground antialiased relative">
        <SpotlightCursor />
        <Navbar />
        <ScrollProgress />

        {/* Hero + About parallax zoom scroll transition */}
        <ScrollTransition />

        {/* Skills - stagger reveal for skill cards */}
        <GSAPSection
          id="skills"
          revealType="fade-scale"
          scrub={1}
          parallaxSpeed={0.1}
        >
          <TechStack />
        </GSAPSection>

        {/* Projects - fade slide with stronger parallax */}
        <GSAPSection
          id="projects"
          revealType="fade-slide"
          scrub={1.2}
          parallaxSpeed={0.2}
        >
          <Projects />
        </GSAPSection>

        {/* Timeline - standard reveal */}
        <GSAPSection
          id="timeline"
          revealType="fade-scale"
          scrub={1}
          parallaxSpeed={0.15}
        >
          <Timeline />
        </GSAPSection>

        {/* Contact - fade slide */}
        <GSAPSection
          id="contact"
          revealType="fade-slide"
          scrub={0.8}
          parallaxSpeed={0.1}
        >
          <Contact />
        </GSAPSection>
      </main>
    </GSAPScrollProvider>
  );
}
