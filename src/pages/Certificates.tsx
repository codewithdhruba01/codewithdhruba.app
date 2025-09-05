import { motion } from 'framer-motion';
import { Calendar, CheckCircle } from 'lucide-react';

const Certificates = () => {
  const certificates = [
    {
      title: "The Complete Full-Stack Web Development",
      issuer: "Udemy",
      date: "December 2022",
      image: "/certificates/udemy.png",
      credentialId: "UC-dcc34792-26f4-4e13-a573-023b6b988d1f",
      description: "successfully completed the course The Complete Full-Stack Web Development Bootcamp",
      skills: ["Full Stack Development", "React", "Node.js", "MongoDB", "Express.js"]
    },
    {
      title: "Postman API Fundamentals Student Expert",
      issuer: "Postman",
      date: "June 2025",
      image: "/certificates/postman.png",
      credentialId: "GCP-PCD-2023-67890",
      description: "Postman Student Experts are proficient in the essential skills required for consuming APIs in Postman and applications",
      skills: ["API Development", "Postman", "API Testing"]
    },
    {
      title: "Bootcamp for Instagram Clone",
      issuer: "Google Devloper Student Clubs",
      date: "December 2023",
      image: "/certificates/GDSC.png",
      credentialId: "verify/9E1pf",
      description: "The certificate affirms that Dhrubaraj Pati has satisfactorily fulfilled the requirements outlined This validation ensures its authenticity",
      skills: ["HTML", "CSS", "JavaScript", "JSX"]
    },
    {
      title: "Acodemy Of Skill Development",
      issuer: "Swami Vivekananda University",
      date: "August 2023",
      image: "/certificates/c-program.jpeg",
      credentialId: "ASD/ADV/SWA/B/48918",
      description: "Professional MongoDB database development certification",
      skills: ["C Programming"]
    }
  ];

  const achievements = [
    {
      title: "Contributor",
      organization: "Open Source Connect",
      date: "August 2025",
      image: "/certificates/OpenSourceConnect.jpeg",
      description: "I’ve been selected as a Contributor for Open Source Connect India - one of the largest collaborative open source initiatives in the country."
    },
    {
      title: "Contributor",
      organization: "GSSoC",
      date: "August  2025",
      image: "/certificates/GirlScript.jpg",
      description: "I have been selected as a Contributor for GirlScript Summer of Code 2025 (GSSoC '25)!"
    },
    {
      title: "Open Source Developer",
      organization: "Recode Hive",
      date: "May 2025",
      image: "/certificates/recodehive.png",
      description: "Recognized for significant contributions to Python Documentation community projects"
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="mb-8"></div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-excon">
            Certificates & <span className="bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent font-excon font-bold">Achievements</span>
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-white to-green-900 mx-auto rounded-full mb-4" />
          <p className="text-xl text-gray-300 font-satoshi">Professional certifications and recognitions</p>
        </motion.div>

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/30 hover:bg-gray-800/70 transition-all duration-300 group shadow-lg"
              >
                <div className="relative h-32 lg:h-40 overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-4 lg:p-5">
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-2 line-clamp-2 font-synonym">{cert.title}</h3>
                  <h4 className="text-green-500 font-semibold mb-2 text-sm lg:text-base font-outfit">{cert.issuer}</h4>
                  
                  <div className="flex items-center text-gray-300 mb-3 text-sm">
                    <Calendar className="mr-2" size={14} />
                    <span className="text-sm">{cert.date}</span>
                  </div>
                  
                  <p className="text-gray-300 mb-3 text-sm line-clamp-2 font-satoshi">{cert.description}</p>
                  
                  <div className="mb-3">
                    <span className="text-xs text-gray-400">ID: {cert.credentialId}</span>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-semibold mb-2 text-sm font-synonym">Skills:</h5>
                    <div className="flex flex-wrap gap-1">
                      {cert.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-green-600/20 text-green-500 px-2 py-1 rounded-full text-xs font-satoshi"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="flex items-center mb-8">
            <CheckCircle className="text-green-500 mb-4 mr-3" size={32} />
            <h2 className="text-3xl md:text-3xl mb-4 font-bold text-white font-excon">Open Source & <span className="font-bold font-excon bg-gradient-to-r from-blue-400 to-green-600 bg-clip-text text-transparent">Contribution</span></h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 + index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700/30 hover:bg-gray-800/70 transition-all duration-300 group shadow-lg"
              >
                <div className="relative h-24 lg:h-32 overflow-hidden">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                
                <div className="p-4">
                  <h3 className="text-base lg:text-lg font-bold text-white mb-2 line-clamp-2">{achievement.title}</h3>
                  <h4 className="text-green-500 font-semibold mb-2 text-xs lg:text-sm line-clamp-1">{achievement.organization}</h4>
                  
                  <div className="flex items-center text-gray-300 mb-2 text-xs">
                    <Calendar className="mr-1" size={12} />
                    <span className="text-xs">{achievement.date}</span>
                  </div>
                  
                  <p className="text-gray-300 text-xs line-clamp-3">{achievement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-900/50 backdrop-blur-md rounded-xl p-6 lg:p-8 border border-gray-800/30 shadow-lg">
            <h3 className="text-3xl font-bold text-[#fff] mb-4 font-synonym">Continuous Learning</h3>
            <p className="text-gray-400 text-sm leading-relaxed font-satoshi">
              I believe in continuous improvement and staying updated with the latest technologies. 
              These certifications and achievements <br /> represent my commitment to excellence and 
              professional growth in the ever-evolving field of technology.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Certificates;