import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { SectionButton } from '../components/ui/SectionButton';
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
          body: JSON.stringify(formData),
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
    <div className="pt-16 min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <div className="py-20 bg-gradient-to-br from-[#0A0A0A] via-green-900/20 to-[#0A0A0A] mb-12">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto w-full px-6 text-center">
            <h1 className="text-4xl md:text-4xl font-bold mb-6 font-bricolage">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h1>
            <p className="text-[#909092] max-w-2xl mx-auto font-bricolage text-base">
              Have a project in mind? Send me a message and let's discuss how we can bring your ideas to life.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Contact Content */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto w-full px-6">
          {/* Contact Form */}
          <ScrollReveal delay={0.2}>
            <div className="border-neutral-800 bg-[#101010] border backdrop-blur-sm rounded-2xl p-8">
              <h2 className="text-3xl font-bold font-outfit text-white mb-6 text-center">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium font-poppins text-[#909092] mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-neutral-800 bg-[#101010] border rounded-lg text-white font-poppins placeholder-[#909092] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium font-poppins text-[#909092] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-neutral-800 bg-[#101010] border rounded-lg text-white font-poppins placeholder-[#909092] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium font-poppins text-[#909092] mb-2"
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
                    className="w-full px-4 py-3 font-poppins border-neutral-800 bg-[#101010] border rounded-lg text-white placeholder-[#909092] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium font-poppins text-[#909092] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 font-poppins border-neutral-800 bg-[#101010] border rounded-lg text-white placeholder-[#909092] focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <div className="flex justify-center">
                  <SectionButton
                    type="submit"
                    disabled={loading || sent}
                    className=""
                    text={loading ? "Sending..." : sent ? "Message Sent" : "Send Message"}
                    icon={loading ? (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 00-8 8h4z"
                        ></path>
                      </svg>
                    ) : sent ? null : <Send className="w-5 h-5" />}
                  />
                </div>
              </form>

              {/* Status Message */}
              {status && (
                <p className="mt-4 text-center text-sm text-[#909092]">
                  {status}
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
