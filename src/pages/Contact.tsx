import React, { useState, useEffect } from 'react';
import {
  Phone,
  Send,
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
          <div className="max-w-4xl mx-auto w-full px-6 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-excon">
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                Let's Work Together
              </span>
            </h1>
            <p className="text-[#909092] max-w-2xl mx-auto font-poppins text-base">
              Have a project in mind? Send me a message and let's discuss how we can bring your ideas to life.
            </p>
          </div>
        </ScrollReveal>
      </div>

      {/* Contact Content */}
      <section className="pb-16">
        <div className="max-w-4xl mx-auto w-full px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Contact Information */}
            <div className="space-y-8">
              <ScrollReveal delay={0.1}>
                <div>
                  <h2 className="text-3xl font-bold font-excon text-neutral-200 mb-6">
                    Get in Touch
                  </h2>
                  <p className="text-[#909092] font-poppins text-base leading-relaxed mb-4">
                    I'm always open to discussing new opportunities, innovative
                    projects, or just having a friendly chat about technology and
                    development. Feel free to reach out through any of the
                    channels below.
                  </p>
                </div>
              </ScrollReveal>

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
                  <ScrollReveal key={i} delay={0.15 + i * 0.05}>
                    <div className="flex items-center space-x-4 p-4 border border-neutral-800 bg-[#101010] backdrop-blur-sm rounded-xl">
                      <div
                        className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#909092]">{item.title}</h3>
                        <p className="text-[#909092]">{item.value}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Social Links */}
              <ScrollReveal delay={0.3}>
                <div>
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
                </div>
              </ScrollReveal>
            </div>

            {/* Contact Form */}
            <ScrollReveal delay={0.2} className="h-full">
              <div className="border-neutral-800 bg-[#101010] border backdrop-blur-sm rounded-2xl p-8 h-full">
                <h2 className="text-3xl font-bold font-outfit text-white mb-6">
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
        </div>
      </section>
    </div>
  );
};

export default Contact;
