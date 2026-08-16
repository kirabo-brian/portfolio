
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/home/Hero";
import AboutSection from "../components/home/AboutSection";
import SkillsSection from "../components/home/SkillsSection";
import LearningSection from "../components/home/LearningSection";
import ProjectsSection from "../components/home/ProjectsSection";
export default function Home() {
  return (
    <div className="min-h-screen text-white">

      <Navbar />

      <Hero />

      <AboutSection />

      <SkillsSection />

      <LearningSection />

      <ProjectsSection />

      <Footer />

    </div>
  );
}