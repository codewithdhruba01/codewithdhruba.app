import React from 'react';

const Education = () => {
  const education = [
    {
      year: '2021 - Present',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'University Institute of Technology, Burdwan University',
      description: 'Currently pursuing my bachelor\'s degree with a focus on computer science fundamentals and modern web technologies.'
    },
    {
      year: '2019 - 2021',
      degree: 'Higher Secondary Education (Class XII)',
      institution: 'Burdwan Model School',
      description: 'Completed my higher secondary education with a focus on Science, Mathematics, and Computer Science.'
    },
    {
      year: '2019',
      degree: 'Secondary Education (Class X)',
      institution: 'Burdwan Model School',
      description: 'Completed my secondary education with distinction in Mathematics and Science.'
    }
  ];

  return (
    <section id="education" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          Education
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-[#00DC82]/20"></div>
          
          {/* Timeline items */}
          <div className="space-y-12">
            {education.map((item, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''} items-center md:gap-8`}
                data-aos={index % 2 === 0 ? 'fade-left' : 'fade-right'}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#00DC82] rounded-full"></div>
                
                {/* Content */}
                <div className="w-full md:w-1/2 p-6 bg-[#111111] rounded-lg">
                  <div className="text-[#00DC82] font-bold mb-2">{item.year}</div>
                  <h3 className="text-xl font-bold mb-2">{item.degree}</h3>
                  <div className="text-gray-300 mb-2">{item.institution}</div>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;