import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ui/ScrollReveal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setStatus(null);

    try {
      const response = await fetch(
        `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: formData.subject || `Contact Form: Message from ${formData.name}`,
            message: formData.message,
          }),
        }
      );

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSent(true);
      } else {
        setStatus('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error sending message. Try again later!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-background text-foreground pt-20 md:pt-28 pb-12 md:pb-16">
      <div className="max-w-[480px] mx-auto w-full px-6">
        {/* Header Section (Placed above the form) */}
        <ScrollReveal className="mb-8">
          <div className="flex items-center gap-2 text-foreground font-semibold text-sm sm:text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              className="w-4 h-4 fill-current text-foreground shrink-0"
            >
              <path d="M144.27,45.93a8,8,0,0,1,9.8-5.66,86.22,86.22,0,0,1,61.66,61.66,8,8,0,0,1-5.66,9.8A8.23,8.23,0,0,1,208,112a8,8,0,0,1-7.73-5.93,70.35,70.35,0,0,0-50.33-50.34A8,8,0,0,1,144.27,45.93Zm-2.33,41.8c13.79,3.68,22.65,12.55,26.33,26.34A8,8,0,0,0,176,120a8.23,8.23,0,0,0,2.07-.27,8,8,0,0,0,5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8,8,0,1,0-4.13,15.46Zm72.43,78.73-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L126.87,168c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L89.54,41.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,24,88c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,214.37,166.46Z" />
            </svg>
            <span>Contact</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mt-4 mb-3 font-hanken">
            Get in touch
          </h1>

          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-hanken">
            Have an interesting idea or a project in mind! Drop a message and let's build something extraordinary together.
          </p>
        </ScrollReveal>

        {/* Centered Contact Form */}
        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="space-y-4 w-full">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-foreground mb-2 font-hanken"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-colors text-sm font-hanken shadow-inner"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground mb-2 font-hanken"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-colors text-sm font-hanken shadow-inner"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-foreground mb-2 font-hanken"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Project Discussion"
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-colors text-sm font-hanken shadow-inner"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-foreground mb-2 font-hanken"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Your message"
                className="w-full px-3.5 py-2.5 rounded-lg bg-neutral-100 dark:bg-[#1f1f1f] border border-neutral-200 dark:border-neutral-800 text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-1 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-colors text-sm font-hanken resize-y shadow-inner"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 px-4 rounded-lg bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-semibold text-sm transition-colors duration-200 shadow-sm cursor-pointer disabled:opacity-70 flex items-center justify-center font-hanken"
            >
              {loading ? 'Submitting...' : sent ? 'Submitted!' : 'Submit'}
            </button>

            {status && (
              <p
                className={`mt-3 text-sm text-center font-hanken ${
                  sent ? 'text-emerald-500' : 'text-rose-500'
                }`}
              >
                {status}
              </p>
            )}
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Contact;
