import React, { useState, useEffect } from 'react';
import {
  Phone,
  Send,
  Plus,
} from 'lucide-react';
import { Gmail } from '../components/svgs/Gmail';
import { GoogleMaps } from '../components/svgs/GoogleMaps';
import {
  GithubIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon,
} from '../components/icons/SocialIcons';
import { Tooltip, TooltipTrigger, TooltipContent } from '../components/ui/tooltip';
import { getCalApi } from '@calcom/embed-react';
import { motion } from 'framer-motion';
import { SectionButton } from '../components/ui/SectionButton';
import { GoogleMeet } from '../components/svgs/GoogleMeet';

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

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: '30min' });
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' });
    })();
  }, []);

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

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.2 },
    }),
  };

  return (
    <motion.div
      className="pt-16 min-h-screen bg-neutral-950"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Header */}
      <motion.section
        className="py-20 bg-gradient-to-br from-neutral-950 via-green-900/20 to-neutral-950"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent font-excon">
              Let's Work Together
            </span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto font-poppins">
            Have a project in mind? I'd love to hear about it. Send me a message
            and let's discuss how we can bring your ideas to life.
          </p>
        </div>
      </motion.section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              <div>
                <h2 className="text-3xl font-bold font-excon text-neutral-200 mb-6">
                  Get in Touch
                </h2>
                <p className="text-neutral-400 font-supreme text-lg leading-relaxed mb-4">
                  I'm always open to discussing new opportunities, innovative
                  projects, or just having a friendly chat about technology and
                  development. Feel free to reach out through any of the
                  channels below.
                </p>
              </div>

              <div className="space-y-6 font-outfit">
                {[
                  {
                    icon: <Gmail className="w-6 h-6 text-[#D92C54]" />,
                    title: 'Email',
                    value: 'pati.dhrubaraj@gmail.com',
                    bg: 'bg-purple-500/20',
                  },
                  {
                    icon: <Phone className="w-6 h-6 text-blue-400" />,
                    title: 'Phone',
                    value: '+91 9064644809',
                    bg: 'bg-blue-500/20',
                  },
                  {
                    icon: <GoogleMaps className="w-6 h-6 text-teal-400" />,
                    title: 'Location',
                    value: 'North Dumdum, Kolkata - 700065',
                    bg: 'bg-teal-500/20',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-4 p-4 border border-neutral-800 bg-[#101010] backdrop-blur-sm rounded-xl"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i + 2}
                  >
                    <div
                      className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{item.title}</h3>
                      <p className="text-gray-400">{item.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social Links */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={5}
              >
                <h3 className="text-xl font-bold font-outfit text-neutral-200 mb-4">
                  Follow Me
                </h3>
                <div className="flex items-center gap-6">
                  {[
                    {
                      icon: <GithubIcon size="22" className="group-hover:stroke-white transition-all duration-300" />,
                      href: "https://github.com/codewithdhruba01",
                      label: "GitHub"
                    },
                    {
                      icon: <LinkedinIcon size="22" className="group-hover:fill-white transition-all duration-300" />,
                      href: "https://www.linkedin.com/in/dhrubaraj-pati/",
                      label: "LinkedIn"
                    },
                    {
                      icon: <XIcon size="18" className="group-hover:fill-white transition-all duration-300" />,
                      href: "https://x.com/codewithdhruba",
                      label: "X (Twitter)"
                    },
                    {
                      icon: <InstagramIcon size="20" className="group-hover:stroke-white transition-all duration-300" />,
                      href: "https://www.instagram.com/silent.coder5/",
                      label: "Instagram"
                    }
                  ].map((social, i) => (
                    <Tooltip key={i}>
                      <TooltipTrigger>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center justify-center transition-all duration-300 hover:scale-125"
                        >
                          {social.icon}
                        </a>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        {social.label}
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="border-neutral-800 bg-[#101010] border backdrop-blur-sm rounded-2xl p-8"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <h2 className="text-3xl font-bold font-outfit text-white mb-6">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium font-poppins text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 border-neutral-800 bg-[#101010] border rounded-lg text-white font-poppins placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium font-poppins text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 border-neutral-800 bg-[#101010] border rounded-lg text-white font-poppins placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium font-poppins text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 font-poppins border-neutral-800 bg-[#101010] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium font-poppins text-gray-300 mb-2"
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
                    className="w-full px-4 py-3 font-poppins border-neutral-800 bg-[#101010] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
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
                <p className="mt-4 text-center text-sm text-gray-300">
                  {status}
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        className="py-20"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={7}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#111111] border border-neutral-800 rounded-2xl p-8 md:p-12 text-center shadow-2xl shadow-black/40">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-200 bg-clip-text font-excon text-transparent bg-gradient-to-b from-white to-neutral-400 mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl font-poppins text-neutral-400 mb-8">
              Let's schedule a free consultation to discuss your ideas and
              requirements.
            </p>
            <div className="flex justify-center">
              <motion.button
                data-cal-namespace="30min"
                data-cal-link="dhrubaraj-pati-7zugw9/30min"
                data-cal-config='{"layout":"month_view"}'
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                variants={{
                  hover: { scale: 1.02 },
                  tap: { scale: 0.98 }
                }}
                className="group relative flex items-center px-6 py-3 bg-[#111111] border border-[#2d2e2d] rounded-2xl hover:border-[#A3A3A3]/50 transition-all duration-300 shadow-xl overflow-hidden"
              >
                {/* Avatar - Always visible */}
                <div className="flex items-center shrink-0">
                  <img
                    src="/assets/avaterlogo.png"
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-neutral-700 shadow-lg shadow-black/40"
                  />
                </div>

                {/* Plus + Google Meet - Reveal on hover */}
                <motion.div
                  className="flex items-center overflow-hidden h-9"
                  variants={{
                    initial: { width: 0, opacity: 0, marginLeft: 0 },
                    hover: { width: "auto", opacity: 1, marginLeft: 12 }
                  }}
                  transition={{ duration: 0.4, ease: "circOut" }}
                >
                  <div className="flex items-center gap-2.5">
                    <Plus className="text-neutral-500 w-4 h-4 shrink-0" strokeWidth={3} />
                    <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center border border-neutral-700/50">
                      <GoogleMeet className="w-5 h-5" />
                    </div>
                  </div>
                </motion.div>

                {/* Always visible text */}
                <span className="text-[#d3d1d1] group-hover:text-white font-outfit font-bold text-lg whitespace-nowrap transition-colors duration-300 ml-3">
                  Book a Free Call
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Contact;
