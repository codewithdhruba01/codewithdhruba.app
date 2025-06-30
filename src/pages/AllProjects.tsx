const AllProjects = () => {
  const projects = [
    {
      title: 'Vercual Assistence',
      description: 'A web-based voice assistant designed to provide an interactive user experience.',
      image: '/blog/thumbnails/vercual-ass-project.jpg',
      github: 'https://github.com/codewithdhruba01/Virtual-Assistant-Application',
      demo: 'https://codewithdhruba01.github.io/Virtual-Assistant-Application/'
    },
    {
      title: 'Skill Progress',
      description: 'Skillber is a simple and extensible CLI tool built with TypeScript.',
      image: '/blog/thumbnails/skillsber.jpg',
      github: 'https://github.com/codewithdhruba01/Skillber',
      demo: 'https://github.com/codewithdhruba01/Skillber'
    },
    {
      title: 'Weather Forecast App',
      description: 'A modern weather web app using OpenWeatherMap API with weekly forecast.',
      image: '/blog/thumbnails/weather.jpg',
      github: 'https://github.com/codewithdhruba01/realtimeWeather',
      demo: 'https://codewithdhruba01.github.io/realtimeWeather/'
    },
    {
      title: 'College Fee Payment Portal',
      description: 'This is a simple and responsive College Fee Payment Portal built using HTML, CSS, and JavaScript.',
      image: '/blog/thumbnails/collegeFees.jpg',
      github: 'https://github.com/codewithdhruba01/fPortalcollege',
      demo: 'https://codewithdhruba01.github.io/fPortalcollege/'
    },
    {
      title: 'TerminalV1',
      description: 'This project simulates a Linux terminal interface.',
      image: '/blog/thumbnails/terminal.jpg',
      github: 'https://github.com/codewithdhruba01/TerminalV1',
      demo: 'https://terminalv1.netlify.app/'
    },
    {
      title: 'E-Wallet Web App',
      description: 'An interactive and responsive E-Wallet user interface built using HTML, CSS, and JavaScript..',
      image: '/blog/thumbnails/e-wallet.jpg',
      github: 'https://github.com/codewithdhruba01/E-Wallet',
      demo: 'https://codewithdhruba01.github.io/E-Wallet/'
    },
    {
      title: 'My Portfolio',
      description: 'A modern weather Portfolio web app using Typescript.',
      image: '/blog/thumbnails/portfolio.jpg',
      demo: 'https://codewithdhruba.netlify.app/'
    },
    {
      title: 'Face Recognition Real-Time',
      description: 'This project is a real-time Face Attendance System that uses face recognition using OpenCV.',
      image: '/blog/thumbnails/facesystem.jpg',
      github: 'https://github.com/codewithdhruba01/FaceRecognitionRealTime'
    },
    {
      title: 'Tic Tac Toe Game',
      description: 'This project is a visually appealing and interactive Tic Tac Toe Game built using HTML, CSS, and JavaScript.',
      image: '/blog/thumbnails/game-project.jpg',
      github: 'https://github.com/codewithdhruba01/tic-tac-toe-game',
      demo: 'https://codewithdhruba01.github.io/tic-tac-toe-game/'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0A0A0A] text-white">
      <main className="flex-grow py-20 px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">All Projects</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-[#111111] rounded-lg overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className=" text-neutral-400 mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex space-x-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#666566] transition-colors">
                      <i className="fab fa-github text-xl"></i>
                    </a>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-[#00DC82] transition-colors">
                      <i className="fa-solid fa-square-arrow-up-right text-xl"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default AllProjects;
