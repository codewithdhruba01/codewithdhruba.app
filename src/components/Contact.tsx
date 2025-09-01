import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'pati.dhrubaraj@outlook.com',
      link: 'mailto:pati.dhrubaraj@outlook.com'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91 XXX XXX 4809',
      link: 'tel:+919064644809'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Kolkata, West Bengal, India',
      link: 'https://maps.google.com/?q=kolkata,WestBengal,India'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch(`https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Sorry, there was an error sending your message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center font-outfit"
          data-aos="fade-up"
        >
          Get In Touch
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 bg-[#0A0A0A] rounded-lg text-center transition-all duration-300 hover:bg-[#00DC82]/10 hover:transform hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <i className={`${info.icon} text-3xl text-[#00DC82] mb-4 group-hover:scale-110 transition-transform duration-300`}></i>
              <h3 className="text-xl font-semibold mb-2">{info.title}</h3>
              <p className="text-gray-400 group-hover:text-[#00DC82] transition-colors duration-300">{info.value}</p>
            </a>
          ))}
        </div>

        <div className="flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          <div className="bg-[#0A0A0A] p-8 rounded-lg shadow-lg">
            <form 
              onSubmit={handleSubmit}
              className="space-y-6"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111111] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DC82] transition-all duration-300 peer placeholder-transparent"
                  placeholder="Name"
                  required
                />
                <label 
                  htmlFor="name"
                  className="absolute left-4 -top-6 text-sm text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-[#00DC82] peer-focus:text-sm transition-all duration-300"
                >
                  Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#111111] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DC82] transition-all duration-300 peer placeholder-transparent"
                  placeholder="Email"
                  required
                />
                <label 
                  htmlFor="email"
                  className="absolute left-4 -top-6 text-sm text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-[#00DC82] peer-focus:text-sm transition-all duration-300"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 bg-[#111111] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00DC82] transition-all duration-300 peer placeholder-transparent resize-none"
                  placeholder="Message"
                  required
                ></textarea>
                <label 
                  htmlFor="message"
                  className="absolute left-4 -top-6 text-sm text-gray-400 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3 peer-focus:-top-6 peer-focus:text-[#00DC82] peer-focus:text-sm transition-all duration-300"
                >
                  Message
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-[#00DC82] text-black font-bold py-4 px-8 rounded-lg hover:bg-[#00DC82]/90 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span>Sending...</span>
                    <i className="fas fa-spinner fa-spin"></i>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <i className="fas fa-paper-plane"></i>
                  </>
                )}
              </button>
            </form>

            {submitStatus.type && (
              <div
                className={`mt-4 p-4 rounded-lg text-center ${
                  submitStatus.type === 'success'
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
                data-aos="fade-up"
              >
                {submitStatus.message}
              </div>
            )}
          </div>

          <div
            className="bg-[#0A0A0A] p-4 rounded-lg shadow-lg flex flex-col justify-center"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <h3 className="text-xl font-semibold mb-4 text-center text-white">My Location</h3>
            <div className="w-full h-80 rounded-lg overflow-hidden">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d235850.81212011125!2d88.18254112599966!3d22.535343439863773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f882db4908f667%3A0x43e330e68f6c2cbc!2sKolkata%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1751457061571!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;