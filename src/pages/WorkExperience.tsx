import { useEffect } from 'react';
import { experiences } from '../constants/experience';
import { ExperienceCard } from '../components/ui/ExperienceCard';
import ScrollReveal from '../components/ui/ScrollReveal';

const WorkExperience = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-28 md:pt-36 pb-16">
            <div className="max-w-3xl mx-auto w-full px-6">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-left mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
                            Work Experience
                        </h2>
                        <p className="text-[#909092] mt-2 text-sm md:text-base font-poppins">
                            My work experiences across different companies and roles.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Content */}
                <div className="space-y-6">
                    <ScrollReveal delay={0.1}>
                        <div className="flex items-center justify-between border-b border-neutral-900/60 pb-4 mb-4">
                            <p className="text-xl sm:text-xl font-bold text-neutral-300 font-outfit">
                                All Experiences
                            </p>
                            <span className="text-neutral-500 text-sm font-synonym">
                                {experiences.length} experiences
                            </span>
                        </div>
                    </ScrollReveal>

                    <div className="flex flex-col">
                        {experiences.map((experience, index) => (
                            <ScrollReveal key={index} delay={index * 0.05}>
                                <ExperienceCard
                                    experience={experience}
                                    isOpen={true}
                                    onClick={() => { }}
                                    alwaysOpen={true}
                                />
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkExperience;
