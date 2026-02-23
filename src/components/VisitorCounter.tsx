import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';

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
        const incrementAndFetchViews = async () => {
            try {
                const siteTotalSlug = 'site-total';

                // First, try to get existing view count
                const { data: existingData, error: fetchError } = await supabase
                    .from('blog_views')
                    .select('view_count')
                    .eq('blog_slug', siteTotalSlug)
                    .single();

                if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 = no rows returned
                    throw fetchError;
                }

                let newCount = 1;

                if (existingData) {
                    newCount = existingData.view_count + 1;
                    // Update existing record
                    const { error } = await supabase
                        .from('blog_views')
                        .update({
                            view_count: newCount,
                            updated_at: new Date().toISOString()
                        })
                        .eq('blog_slug', siteTotalSlug);

                    if (error) throw error;
                } else {
                    // Create new record
                    const { error } = await supabase
                        .from('blog_views')
                        .insert({
                            blog_slug: siteTotalSlug,
                            view_count: 1
                        });

                    if (error) throw error;
                }

                setCount(newCount);
            } catch (error) {
                console.warn('Error handling visitor count:', error);
                // Set fallback or handle gracefully
            }
        };

        // Check if we've already counted this session to avoid double counting on re-renders
        const sessionKey = 'site-visited';
        const hasVisited = sessionStorage.getItem(sessionKey);

        if (!hasVisited) {
            incrementAndFetchViews();
            sessionStorage.setItem(sessionKey, 'true');
        } else {
            // Just fetch if already visited this session
            const fetchViews = async () => {
                const { data } = await supabase
                    .from('blog_views')
                    .select('view_count')
                    .eq('blog_slug', 'site-total')
                    .single();
                if (data) setCount(data.view_count);
            };
            fetchViews();
        }
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
