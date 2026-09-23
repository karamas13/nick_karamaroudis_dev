import Hero from "@/components/sections/Hero";
import TechnicalSkills from "@/components/sections/TechnicalSkills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import EducationFooter from "@/components/sections/EducationFooter";

export default function Home() {
  return (
    // The margin-bottom creates the blank space at the end of the scroll,
    // allowing the fixed Footer sitting at z-index -1 to act as a "curtain pull" reveal.
    <main className="mb-[100vh] bg-[#050505] relative z-10 w-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,1)]">
      <Hero />
      <TechnicalSkills />
      <Experience />
      <Projects />
      <EducationFooter />
    </main>
  );
}