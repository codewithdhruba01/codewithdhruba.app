import { useEffect } from 'react';
import { experiences } from '../constants/experience';
import { ExperienceCard } from '../components/ExperienceCard';
import { motion } from 'framer-motion';


const WorkExperience = () => {
    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);



    return (
        <div className="min-h-screen bg-[#0A0A0A] pt-28 md:pt-36 pb-16 px-4 md:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-4xl mx-auto"
            >


                {/* Header */}
                <div className="text-center mb-16 space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-bold font-excon mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
                        Work Experience
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto font-synonym">
                        My work experiences across different companies and roles.
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
                        <p className="text-xl sm:text-xl font-bold text-neutral-300 font-outfit">
                            All Experiences
                        </p>
                        <span className="text-neutral-500 text-sm font-synonym">
                            {experiences.length} experiences
                        </span>
                    </div>

                    <div className="flex flex-col gap-4">
                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={index}
                                experience={experience}
                                isOpen={true}
                                onClick={() => { }}
                                transparentOnOpen={true}
                                alwaysOpen={true}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default WorkExperience;
