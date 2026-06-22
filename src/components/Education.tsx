import { useState } from 'react';
import { SectionButton } from './ui/SectionButton';
import { experiences } from '../constants/experience';
import { ExperienceCard } from './ExperienceCard';
import ScrollReveal from './ui/ScrollReveal';

interface ExperienceListProps {
  experiences: typeof experiences;
}

function ExperienceList({ experiences }: ExperienceListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null); // All collapsed by default

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (experiences.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-neutral-500">No work experiences found.</p>
      </div>
    );
  }

  // Slice to only show the top 3 experiences on the homepage, matching ramx.in behavior
  const featuredExperiences = experiences.slice(0, 3);

  return (
    <div className="flex flex-col gap-0">
      {featuredExperiences.map((experience, index) => (
        <ExperienceCard
          key={index}
          experience={experience}
          isOpen={openIndex === index}
          onClick={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

const Experience = () => {
  return (
    <section id="experience" className="pt-8 pb-8 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto w-full px-6">
        <ScrollReveal className="mb-8">
          <p className="text-lg text-neutral-400 font-outfit text-left">
            Featured
          </p>
          <h2 className="text-3xl font-bold text-neutral-200 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400 text-left font-excon">
            Experience
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <ExperienceList experiences={experiences} />

          <div className="text-center mt-6">
            <SectionButton to="/experience" text="View all Experience" />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default Experience;
