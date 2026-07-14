import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, Radio, Instagram } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface SubscribeProps {
  postTitle?: string;
}

const Subscribe: React.FC<SubscribeProps> = ({
  postTitle = "Mastering Gradient Borders in CSS 🌈✨"
}) => {
  const [email, setEmail] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    // Check if user is already subscribed in localStorage
    const subscribed = localStorage.getItem('is_newsletter_subscribed');
    if (subscribed === 'true') {
      setIsSubscribed(true);
      setStatus('success');
    }
  }, []);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (supabase && typeof supabase.from === 'function') {
        const { error } = await supabase
          .from('subscribers')
          .insert({ email })
          .select();

        if (error) {
          // If the subscribers table doesn't exist, we fall back to localStorage
          if (error.message && (error.message.includes('relation "subscribers" does not exist') || error.code === 'PGRST116')) {
            console.warn('Subscribers table not found. Falling back to local storage.');
            saveLocally(email);
            return;
          }
          if (error.code === '23505') {
            throw new Error('You are already subscribed!');
          }
          throw error;
        }
      } else {
        // No supabase configured, save locally
        saveLocally(email);
        return;
      }

      // Success
      onSubscriptionSuccess();
    } catch (err: any) {
      console.error('Subscription error:', err);
      // Fallback or show error
      if (err.message === 'You are already subscribed!') {
        setStatus('error');
        setErrorMessage('You are already subscribed!');
      } else {
        // Fallback to local storage on any connection/permission error
        console.warn('Supabase insertion failed, saving to localStorage as fallback.');
        saveLocally(email);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const saveLocally = (emailAddr: string) => {
    try {
      const localSubs = JSON.parse(localStorage.getItem('local_subscribers') || '[]');
      if (localSubs.includes(emailAddr)) {
        setStatus('error');
        setErrorMessage('You are already subscribed!');
        setIsSubmitting(false);
        return;
      }
      localSubs.push(emailAddr);
      localStorage.setItem('local_subscribers', JSON.stringify(localSubs));
      onSubscriptionSuccess();
    } catch (e) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const onSubscriptionSuccess = () => {
    setStatus('success');
    setIsSubscribed(true);
    localStorage.setItem('is_newsletter_subscribed', 'true');
    setEmail('');
  };

  // Truncate title for the notification preview card
  const displayTitle = postTitle.length > 32
    ? postTitle.slice(0, 32) + '...'
    : postTitle;

  return (
    <div
      className="relative overflow-hidden w-full bg-[#0D0D0E]/60 border border-white/5 rounded-3xl py-6 px-6 sm:py-8 sm:px-8 md:py-8 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute left-[5%] -top-[20%] w-[130px] h-[130px] border border-white/[0.02] rounded-[30px] rotate-12"></div>
        <div className="absolute left-[20%] -bottom-[30%] w-[180px] h-[180px] border border-white/[0.015] rounded-[40px] -rotate-12"></div>
        <div className="absolute right-[25%] -top-[40%] w-[220px] h-[220px] border border-white/[0.015] rounded-[50px] rotate-45"></div>
        <div className="absolute right-[10%] -bottom-[20%] w-[150px] h-[150px] border border-white/[0.02] rounded-[35px] -rotate-45"></div>
      </div>

      {/* Left/Bottom Column: Title, Subtitle, CTA */}
      <div className="flex flex-col items-start w-full md:max-w-[55%] relative z-10 order-2 md:order-1">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-hanken">
          Enjoying this post?
        </h3>
        <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-md font-poppins leading-relaxed font-light">
          Get my latest articles and web dev insights directly in your inbox.
        </p>

        <div className="h-[76px] flex items-center mt-6 w-full">
          <AnimatePresence mode="wait">
            {isSubscribed ? (
              <motion.div
                key="subscribed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-3 px-4 py-3 bg-white/5 border border-white/10 text-white rounded-2xl text-sm font-medium"
              >
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span>You're subscribed!</span>
              </motion.div>
            ) : !showInput ? (
              <motion.button
                key="button"
                layoutId="subscribeForm"
                onClick={() => setShowInput(true)}
                className="flex items-center gap-3 px-5 py-3.5 bg-[#0F0F10] border border-white/10 hover:border-white/20 text-neutral-200 rounded-2xl text-sm font-medium hover:bg-[#1A1A1C] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.4)] group"
              >
                <span>Subscribe Now</span>
                <div className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                  <svg
                    className="w-2.5 h-2.5 text-neutral-400 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.button>
            ) : (
              <motion.div key="form" className="w-full max-w-sm flex flex-col">
                <motion.form
                  layoutId="subscribeForm"
                  onSubmit={handleSubscribe}
                  className="flex items-center gap-2 w-full bg-[#0F0F10] border border-white/10 rounded-2xl p-1.5 focus-within:border-white/25 transition-all duration-300 relative z-20"
                >
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    required
                    autoFocus
                    disabled={isSubmitting}
                    className="flex-1 bg-transparent px-3 py-2 text-white placeholder-neutral-500 focus:outline-none text-sm w-full"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center w-9 h-9 bg-[#1A1A1C] border border-white/10 hover:border-white/20 text-white rounded-xl active:scale-95 transition-all group"
                  >
                    {isSubmitting ? (
                      <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      <svg
                        className="w-3.5 h-3.5 text-neutral-300 group-hover:text-white group-hover:translate-x-0.5 transition-all"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </button>
                </motion.form>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-xs mt-2 ml-2"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Right/Top Column: Stacked Notification Cards */}
      <div className="relative w-full md:w-[320px] h-[110px] md:h-[160px] select-none flex justify-center md:justify-end z-10 order-1 md:order-2 mb-0">
        <div className="relative w-[240px] sm:w-[270px] h-[140px]">
          {/* Card 3 (Bottom Card) */}
          <div
            className="absolute top-[40px] left-[20px] right-[-20px] sm:top-[48px] sm:left-[24px] sm:right-[-24px] bg-gradient-to-br from-[#C8C8C8] to-[#B3B3B3] text-neutral-900 p-4 rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-0 flex items-center gap-3 origin-center"
            style={{ transform: 'rotate(5deg) scale(0.88)' }}
          >
            <div className="w-10 h-10 bg-[#0F0F10] rounded-xl flex items-center justify-center flex-shrink-0 text-white">
              <Instagram className="w-5 h-5 text-neutral-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-neutral-900 truncate">and many more!</div>
                <span className="text-[8px] text-neutral-500 font-medium ml-1 flex-shrink-0">1d ago</span>
              </div>
            </div>
          </div>

          {/* Card 2 (Middle Card) */}
          <div
            className="absolute top-[20px] left-[10px] right-[-10px] sm:top-[24px] sm:left-[12px] sm:right-[-12px] bg-gradient-to-br from-[#E3E3E3] to-[#CFCFCF] text-neutral-900 p-4 rounded-[24px] shadow-[0_10px_28px_rgba(0,0,0,0.18)] z-10 flex items-center gap-3 origin-center"
            style={{ transform: 'rotate(2deg) scale(0.94)' }}
          >
            <div className="w-10 h-10 bg-[#0F0F10] rounded-xl flex items-center justify-center flex-shrink-0 text-white">
              <Radio className="w-5 h-5 text-neutral-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-neutral-900 truncate">A talk is happening</div>
                <span className="text-[8px] text-neutral-500 font-medium ml-1 flex-shrink-0">2h ago</span>
              </div>
              <div className="text-[10px] text-neutral-700 truncate mt-0.5 font-light">Sharing My 2023 Retrospective</div>
            </div>
          </div>

          {/* Card 1 (Top Card) */}
          <div
            className="absolute top-0 right-0 left-0 bg-gradient-to-br from-[#FFFFFF] to-[#EBEBEB] text-neutral-900 p-4 rounded-[24px] shadow-[0_12px_36px_rgba(0,0,0,0.25)] z-20 flex items-center gap-3 origin-center"
            style={{ transform: 'rotate(-1deg) scale(1)' }}
          >
            <div className="w-10 h-10 bg-[#0F0F10] rounded-xl flex items-center justify-center flex-shrink-0 text-white">
              <Mail className="w-5 h-5 text-neutral-300" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="text-xs font-extrabold text-neutral-900 truncate">New Blog Post 🙄</div>
                <span className="text-[8px] text-neutral-500 font-medium ml-1 flex-shrink-0">20m ago</span>
              </div>
              <div className="text-[10px] text-neutral-700 truncate mt-0.5 font-light">{displayTitle}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
