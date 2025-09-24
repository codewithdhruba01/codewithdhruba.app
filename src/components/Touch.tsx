import { Mail, MessageSquareText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetInTouch = () => {
  return (
    <section id="get-in-touch" className="py-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neutral-200 bg-clip-text text-transparent font-excon">
              Get In Touch
            </span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto font-supreme">
            Ready to start your project? Choose how you'd like to connect with me.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Button */}
            <a
              href="mailto:pati.dhrubaraj@outlook.com"
              className="group flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-teal-600/20 to-blue-600/20 rounded-xl border border-teal-500/30 hover:from-teal-600/30 hover:to-blue-600/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-[#ffffff] rounded-full flex items-center justify-center transition-colors">
                <Mail className="w-6 h-6 text-[#B12C00]" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white group-hover:text-teal-400 transition-colors">
                  Send Email
                </h3>
                <p className="text-gray-400 text-sm">
                  Quick and direct communication
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-teal-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Contact Form Button */}
            <Link
              to="/contact"
              className="group flex items-center justify-center space-x-4 p-6 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-blue-500/30 hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                <MessageSquareText className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                  Contact Us
                </h3>
                <p className="text-gray-400 text-sm font-amulya">
                  Detailed project discussion
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-gray-700/50 text-center">
            <p className="text-gray-400 text-sm font-outfit">
              Average response time: <span className="text-green-400 font-medium">"Less than 24 hours"</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;