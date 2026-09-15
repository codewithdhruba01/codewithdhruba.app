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
        <div className="min-h-screen bg-background pt-20 md:pt-28 pb-16">
            <div className="max-w-3xl mx-auto w-full px-6">
                {/* Header */}
                <ScrollReveal>
                    <div className="text-left mb-10">
                        <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 text-foreground">
                            Work Experience
                        </h2>
                        <p className="text-muted-foreground mt-2 text-sm md:text-base font-poppins">
                            My work experiences across different companies and roles.
                        </p>
                    </div>
                </ScrollReveal>

                {/* Content */}
                <div className="space-y-6">
                    <ScrollReveal delay={0.1}>
                        <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                            <p className="text-xl sm:text-xl font-bold text-foreground font-outfit">
                                All Experiences
                            </p>
                            <span className="text-muted-foreground text-sm font-synonym">
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
