import { useState } from 'react';
import { Check } from 'lucide-react';
import { SectionButton } from '../components/ui/SectionButton';
import ScheduleModal from '../components/modals/ScheduleModal';
import ScrollReveal from '../components/ui/ScrollReveal';

const BucketList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const leftItems = [
        { text: "Visit Darjeeling and experience its beautiful hills", completed: false },
        { text: "Travel to Manali to experience snowfall", completed: false },
        { text: "Travel to Sikkim to experience the beauty of the Himalayas", completed: false },
        { text: "Visit Shimla to enjoy the beautiful mountains", completed: false },
        { text: "Travel to Ladakh to experience the beauty of the Himalayas", completed: false },
    ];

    const rightItems = [
        { text: "Buy a MacBook with my own money.", completed: false },
        { text: "Buy a Monitor with my own money.", completed: true },
        { text: "Daily Practice Problem Solving", completed: true },
        { text: "Buy a luxury camera", completed: false },
        { text: "READ A BOOK SERIES", completed: true },
        { text: "Create my dream desk setup for better focus, productivity", completed: false },
        { text: "Practice coding daily to improve my programming skills", completed: true },
    ];

    return (
        <div className="bg-[#0A0A0A] text-white selection:bg-green-100/10 pt-20 md:pt-24 pb-16">
            <div className="max-w-3xl mx-auto w-full px-6 relative">
                {/* Top Flower Decoration */}
                <div className="absolute top-[8rem] md:top-[7rem] left-1/2 -translate-x-1/2 pointer-events-none opacity-15 invert z-0">
                    <img
                        src="/assets/flower1.png"
                        alt="Floral decoration"
                        className="w-72 md:w-full max-w-2xl object-contain"
                    />
                </div>

                <div className="relative pt-2 md:pt-4 pb-2 md:pb-3 text-center z-10">
                    <ScrollReveal>
                        <h1 className="font-dancing text-12xl md:text-8xl text-[#d4c5b9] mb-[-14px] md:mb-[-20px] relative z-10">
                            Personal
                        </h1>
                        <h2 className="font-hanken text-4xl md:text-4xl font-light text-[#01b369] tracking-tight">
                            Bucket List
                        </h2>
                    </ScrollReveal>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mt-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {leftItems.map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.05} className="flex items-start gap-4 group">
                                <div className={`w-6 h-6 rounded-full flex-shrink-0 mt-1 cursor-pointer transition-all duration-300 flex items-center justify-center relative ${item.completed ? 'bg-[#01b369]' : 'bg-white'}`}>
                                    {item.completed && (
                                        <Check className="text-white w-4 h-4" />
                                    )}
                                </div>
                                <p className="text-sm md:text-base font-supreme tracking-wide text-[#909092] leading-tight pt-1">
                                    {item.text}
                                </p>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {rightItems.map((item, index) => (
                            <ScrollReveal key={index} delay={index * 0.05} className="flex items-start gap-4 group">
                                <div className={`w-6 h-6 rounded-full flex-shrink-0 mt-1 cursor-pointer transition-all duration-300 flex items-center justify-center relative ${item.completed ? 'bg-[#01b369]' : 'bg-white'}`}>
                                    {item.completed && (
                                        <Check className="text-white w-4 h-4" />
                                    )}
                                </div>
                                <p className="text-sm md:text-base font-supreme tracking-wide text-[#909092] leading-tight pt-1">
                                    {item.text}
                                </p>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>

                {/* All Schedule Button */}
                <ScrollReveal delay={0.2} className="mt-10 flex justify-center">
                    <div>
                        <SectionButton
                            text="View all Schedule"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                </ScrollReveal>
            </div>

            <ScheduleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default BucketList;
