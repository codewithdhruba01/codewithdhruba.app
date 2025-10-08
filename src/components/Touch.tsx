'use client';
import { Mail, MessageSquareText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const GetInTouch = () => {
  return (
    <section id="get-in-touch" className="py-20 bg-neutral-950">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-neutral-200 bg-clip-text font-excon">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto font-supreme">
            Ready to start your project? Choose how you'd <br /> like to connect
            with me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="mailto:pati.dhrubaraj@outlook.com"
            className="group relative flex flex-col items-start space-y-2 p-6 bg-[#101010] rounded-xl border border-gray-700/50 hover:border-teal-500/50 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
              <Mail className="w-5 h-5 text-teal-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-100">
              Send Email
            </h3>
            <p className="text-neutral-400 font-poppins text-sm">
              Quick and direct communication
            </p>

            <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 text-teal-400 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </a>

          <Link
            to="/contact"
            className="group relative flex flex-col items-start space-y-2 p-6 bg-[#101010] rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300"
          >
            <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center">
              <MessageSquareText className="w-5 h-5 text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-100">
              Contact Us
            </h3>
            <p className="text-neutral-400 font-poppins text-sm">
              Detailed project discussion
            </p>

            <ArrowRight className="absolute right-6 top-1/2 -translate-y-1/2 text-green-400 opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0" />
          </Link>
        </div>

        <div className="mt-10 text-center">
          <p className="text-neutral-400 text-sm font-supreme">
            Average response time:{' '}
            <span className="text-green-400 font-medium">
              Less than 24 hours
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
