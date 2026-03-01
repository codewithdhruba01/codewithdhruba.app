import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const BucketList = () => {
    const leftItems = [
        { text: "Visit Darjeeling and experience its beautiful hills", completed: false },
        { text: "Travel to Manali to experience snowfall", completed: false },
        { text: "Travel to Sikkim to experience the beauty of the Himalayas", completed: false },
        { text: "Visit Shimla to enjoy the beautiful mountains", completed: false },
        { text: "Travel to Ladakh to experience the beauty of the Himalayas", completed: false },
    ];

    const rightItems = [
        { text: "I will buy a MacBook with my own money.", completed: false },
        { text: "Daily Practice Problem Solving", completed: true },
        { text: "Buy a luxury camera", completed: false },
        { text: "READ A BOOK SERIES", completed: false },
        { text: "Create my dream desk setup for better focus, productivity", completed: false },
        { text: "Practice coding daily to improve my programming skills", completed: true },
    ];

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-green-100/10 pb-20 pt-16 mt-16">
            <div className="max-w-4xl mx-auto px-6 relative">
                {/* Top Flower Decoration */}
                <div className="absolute top-[-5rem] md:top-[-4rem] left-1/2 -translate-x-1/2 pointer-events-none opacity-15 invert z-0">
                    <img
                        src="/assets/flower1.png"
                        alt="Floral decoration"
                        className="w-72 md:w-full max-w-2xl object-contain"
                    />
                </div>

                <div className="relative pt-20 md:pt-32 pb-8 md:pb-12 text-center z-10">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="font-dancing text-12xl md:text-8xl text-[#d4c5b9] mb-[-14px] md:mb-[-20px] relative z-10"
                    >
                        Personal
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="font-satoshi text-4xl md:text-4xl font-light text-[#01b369] tracking-tight"
                    >
                        Bucket List
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 gap-x-12 gap-y-6 mt-8">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {leftItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-start gap-4 group"
                            >
                                <div className="w-6 h-6 border-2 border-[#2d2e2d] rounded flex-shrink-0 mt-1 cursor-pointer hover:bg-[#00DC82]/10 transition-colors flex items-center justify-center relative">
                                    {item.completed && (
                                        <Check className="text-white absolute -top-1.5 -right-1.5 w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                                    )}
                                </div>
                                <p className="text-sm md:text-base font-medium tracking-wide text-gray-300 leading-tight pt-1">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {rightItems.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex items-start gap-4 group"
                            >
                                <div className="w-6 h-6 border-2 border-[#2d2e2d] rounded flex-shrink-0 mt-1 cursor-pointer hover:bg-[#00DC82]/10 transition-colors flex items-center justify-center relative">
                                    {item.completed && (
                                        <Check className="text-white absolute -top-1.5 -right-1.5 w-6 h-6 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
                                    )}
                                </div>
                                <p className="text-sm md:text-base font-medium tracking-wide text-gray-300 leading-tight pt-1">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BucketList;
