const Projects = () => {
  const projects = [
    {
      title: 'Vercual Assistence',
      description: 'A web-based voice assistant designed to provide an interactive user experience.',
      image: './src/assets/vercual-ass-project.png',
      github: 'https://github.com/codewithdhruba01/Virtual-Assistant-Application',
      demo: 'https://codewithdhruba01.github.io/Virtual-Assistant-Application/'
    },
    {
      title: 'Tic Tac Toe Game',
      description: 'This project is a visually appealing and interactive Tic Tac Toe Game',
      image: './src/assets/game-project.jpg',
      github: 'https://github.com/codewithdhruba01/tic-tac-toe-game',
      demo: ''
    },
    {
      title: 'Expense Tracker',
      description: 'A mobile-first responsive website with modern UI/UX',
      image: './src/assets/expencess.png',
      github: 'https://github.com/codewithdhruba01/ExpenseTrackerSystem',
      demo: 'https://github.com/codewithdhruba01/ExpenseTrackerSystem'
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          className="text-4xl font-bold mb-12 text-center"
          data-aos="fade-up"
        >
          Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-[#111111] rounded-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex space-x-4">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text hover:text-[#3C3D37] transition-colors"   //text-3xl hover:text-[#0065F8] transition-colors 00DC82
                  >
                    <i className="fab fa-github text-xl"></i>
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text hover:text-[#00DC82] transition-colors"
                  >
                    <i className="fa-solid fa-square-arrow-up-right text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;