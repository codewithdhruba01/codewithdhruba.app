const AllProjects = () => {
  const projects = [
    {
      title: 'Task Manager App',
      description: 'A simple yet powerful to-do and task manager with local storage support.',
      image: '/blog/thumbnails/task-manager.png',
      github: 'https://github.com/codewithdhruba01/task-manager',
      demo: 'https://taskmanagerdemo.netlify.app/'
    },
    {
      title: 'Weather Forecast App',
      description: 'A modern weather web app using OpenWeatherMap API with weekly forecast.',
      image: '/blog/thumbnails/weatherapp.png',
      github: 'https://github.com/codewithdhruba01/weather-app',
      demo: 'https://dhrubaweather.netlify.app/'
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
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex space-x-4">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-[#6e5494] transition-colors">
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
