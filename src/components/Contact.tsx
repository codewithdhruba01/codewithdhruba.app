import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'contact@xanmoy.in',
      link: 'mailto:contact@xanmoy.in'
    },
    {
      icon: 'fas fa-phone',
      title: 'Phone',
      value: '+91 123 456 7890',
      link: 'tel:+911234567890'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Location',
      value: 'Burdwan, West Bengal, India',
      link: 'https://maps.google.com/?q=Burdwan,WestBengal,India'
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <section id="contact" className="py-20 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
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

        <div className="max-w-3xl mx-auto bg-[#0A0A0A] p-8 rounded-lg shadow-lg">
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
              className="w-full bg-[#00DC82] text-black font-bold py-4 px-8 rounded-lg hover:bg-[#00DC82]/90 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span>Send Message</span>
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>

          <div className="mt-12 flex justify-center space-x-6">
            {['github', 'linkedin', 'twitter'].map((platform, index) => (
              <a
                key={platform}
                href={`https://${platform}.com/xanmoy`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#00DC82] transform hover:-translate-y-1 transition-all duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <i className={`fab fa-${platform} text-2xl`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;