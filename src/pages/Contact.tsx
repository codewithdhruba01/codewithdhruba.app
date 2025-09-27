import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { getCalApi } from "@calcom/embed-react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

   useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSent(false);
    setStatus(null);

    try {
      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setSent(true);
      } else {
        setStatus("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error sending message. Try again later!");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: i * 0.2 }
    })
  };

  return (
    <motion.div
      className="pt-16 min-h-screen bg-neutral-950"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
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
          <p className="text-lg text-neutral-400 max-w-3xl mx-auto font-supreme">
            Have a project in mind? I'd love to hear about it. Send me a message and let's discuss how we can bring your ideas to life.
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
                <h2 className="text-3xl font-bold text-neutral-200 mb-6">Get in Touch</h2>
                <p className="text-neutral-400 font-supreme text-lg leading-relaxed mb-4">
                  I'm always open to discussing new opportunities, innovative projects, or just having a friendly chat about technology and development. Feel free to reach out through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="w-6 h-6 text-[#D92C54]" />,
                    title: "Email",
                    value: "pati.dhrubaraj@gmail.com",
                    bg: "bg-purple-500/20"
                  },
                  {
                    icon: <Phone className="w-6 h-6 text-blue-400" />,
                    title: "Phone",
                    value: "+91 9064644809",
                    bg: "bg-blue-500/20"
                  },
                  {
                    icon: <MapPin className="w-6 h-6 text-teal-400" />,
                    title: "Location",
                    value: "Dumdum, Kolkata",
                    bg: "bg-teal-500/20"
                  }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center space-x-4 p-4 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={i + 2}
                  >
                    <div className={`w-12 h-12 ${item.bg} rounded-full flex items-center justify-center`}>
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
                <h3 className="text-xl font-bold text-neutral-200 mb-4">Follow Me</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com/codewithdhruba01"
                    className="p-3 bg-gray-800/50 hover:bg-gray-900/50 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <Github className="w-6 h-6 text-gray-400 hover:text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dhrubaraj-pati/"
                    className="p-3 bg-gray-800/50 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <Linkedin className="w-6 h-6 text-gray-400 hover:text-white" />
                  </a>
                  <a
                    href="https://x.com/codewithdhruba"
                    className="p-3 bg-gray-800/50 hover:bg-sky-600 rounded-lg transition-all duration-300 hover:scale-110"
                  >
                    <Twitter className="w-6 h-6 text-gray-400 hover:text-white" />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={6}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Send Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                    placeholder="Project Discussion"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || sent}
                  className="w-full flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 rounded-lg text-white font-semibold hover:from-blue-700 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-70"
                >
                  {loading ? (
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
                  ) : sent ? (
                    <span>Message Sent</span>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
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
        className="py-20 bg-gray-800/30"
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={7}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-excon md:text-4xl font-bold text-neutral-200 mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-neutral-400 mb-8">
            Let's schedule a free consultation to discuss your ideas and requirements.
          </p>
          <button
            data-cal-namespace="30min"
            data-cal-link="dhrubaraj-pati-7zugw9/30min"
            data-cal-config='{"layout":"month_view"}'
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-blue-600 rounded-full text-white font-semibold hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
          >
            <Phone className="w-5 h-5" />
            <span>Book a Free Call</span>
          </button>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default Contact;
