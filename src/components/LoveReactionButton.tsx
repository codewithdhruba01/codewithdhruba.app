import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoveReactionButtonProps {
    initialCount: number;
    onLove: () => void;
    isLoved: boolean;
    isLoading?: boolean;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

const LoveReactionButton = memo(({

    onLove,
    isLoved,
    isLoading = false
}: LoveReactionButtonProps) => {
    const [particles, setParticles] = useState<Particle[]>([]);
    const controls = useAnimation();

    const createParticles = useCallback(() => {
        const newParticles: Particle[] = [];
        const particleCount = Math.floor(Math.random() * 3) + 5;

        for (let i = 0; i < particleCount; i++) {
            newParticles.push({
                id: Date.now() + i,
                x: (Math.random() - 0.5) * 60,
                y: -Math.random() * 80 - 40,
                rotation: (Math.random() - 0.5) * 60,
                scale: Math.random() * 0.5 + 0.5,
            });
        }

        setParticles(prev => [...prev, ...newParticles]);

        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 1000);
    }, []);

    const handleClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (isLoading || isLoved) return;

        controls.start({
            scale: [1, 0.8, 1.4, 0.9, 1.1, 1],
            transition: { duration: 0.6, ease: "easeOut" }
        });

        createParticles();

        onLove();
    }, [isLoading, isLoved, onLove, controls, createParticles]);

    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
                <AnimatePresence>
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                            animate={{
                                x: particle.x,
                                y: particle.y,
                                opacity: [0, 1, 0],
                                scale: particle.scale,
                                rotate: particle.rotation
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="absolute top-1/2 left-1/2 z-0"
                            style={{ marginLeft: '-10px', marginTop: '-10px' }}
                        >
                            <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Main Button */}
            <motion.button
                onClick={handleClick}
                disabled={isLoved || isLoading}
                animate={controls}
                whileTap={{ scale: 0.9 }}
                className="relative z-10 group"
            >
                <div className={`relative w-28 h-28 rounded-full border flex items-center justify-center transition-all duration-300 ease-out bg-neutral-950 ${isLoved
                    ? 'border-neutral-600/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]'
                    : 'border-neutral-700/30 hover:border-neutral-600/50'
                    }`}
                >
                    {/* Ripple/Glow effect behind heart */}
                    {isLoved && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: [0.5, 0] }}
                            transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                            className="absolute inset-0 rounded-full bg-red-500/10 blur-xl"
                        />
                    )}

                    <Heart
                        className={`w-14 h-14 transition-colors duration-300 ${isLoved
                            ? 'fill-red-500 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]'
                            : 'fill-neutral-800 text-neutral-600 group-hover:text-neutral-400'
                            }`}
                    />
                </div>
            </motion.button>
        </div>
    );
});

export default LoveReactionButton;
