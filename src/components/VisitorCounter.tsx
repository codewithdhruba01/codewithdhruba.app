import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { commentService } from '../lib/supabase';

const VisitorCounter = ({ className }: { className?: string }) => {
    const [count, setCount] = useState<number | null>(null);

    const getOrdinalSuffix = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return (s[(v - 20) % 10] || s[v] || s[0]);
    };

    const formatNumber = (num: number) => {
        return num.toLocaleString();
    };

    useEffect(() => {
        const handleVisitorCount = async () => {
            try {
                const sessionKey = 'site-visited';
                const hasVisited = sessionStorage.getItem(sessionKey);

                if (!hasVisited) {
                    await commentService.incrementSiteViews('main-site');
                    sessionStorage.setItem(sessionKey, 'true');
                }
                
                const views = await commentService.getSiteViews('main-site');
                setCount(views);
            } catch (error) {
                console.warn('Error handling visitor count:', error);
            }
        };

        handleVisitorCount();
    }, []);

    if (count === null) return null;

    return (
        <section className={className || "pb-20 bg-neutral-950"}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-center">
                    <div className="inline-flex items-center gap-4 px-6 py-4 bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm rounded-2xl">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-neutral-800/80 border border-neutral-700/50">
                            <Eye className="w-5 h-5 text-neutral-300" />
                        </div>
                        <p className="text-neutral-400 font-poppins text-sm md:text-base">
                            You are the <span className="text-neutral-100 font-bold font-switzer">{formatNumber(count)}<sup>{getOrdinalSuffix(count)}</sup></span> visitor
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisitorCounter;
