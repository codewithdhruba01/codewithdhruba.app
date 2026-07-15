import { Heart } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Sponsor {
  name: string;
  github: string;
  x: string;
  avatar: string;
  amount: string;
}

const sponsorsData: Sponsor[] = [
  {
    name: 'Sanjay Viswanathan',
    github: 'sanjay-kv',
    x: 'sanjay_kv_',
    avatar: 'https://avatars.githubusercontent.com/u/30715153?v=4',
    amount: '$5.00',
  },
  {
    name: 'Ayokanmi Adejola',
    github: 'Ayokanmi-Adejola',
    x: 'ayokqnmiadejola',
    avatar: 'https://avatars.githubusercontent.com/u/191106326?v=4',
    amount: '$2.00',
  },
];

const Sponsors = () => {
  return (
    <section id="sponsors" className="pt-8 pb-8 bg-neutral-950">
      <div className="max-w-3xl mx-auto w-full px-6">
        {/* Header Row */}
        <ScrollReveal className="flex items-center justify-between gap-4 mb-8">
          <h2 className="text-3xl font-bold text-neutral-200 bg-clip-text font-excon text-transparent bg-gradient-to-b from-white to-neutral-400">
            Sponsors
          </h2>
          <a
            href="https://github.com/sponsors/codewithdhruba01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-2 bg-[#161616] border border-neutral-800 rounded-xl text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/50 hover:border-neutral-700 transition duration-200 shadow-sm"
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>Sponsor Me</span>
          </a>
        </ScrollReveal>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sponsorsData.map((sponsor, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.15}
              className="h-full"
            >
              <div
                className="bg-[#111111] border border-neutral-700/50 rounded-2xl p-5 flex gap-5 items-start h-full"
              >
                <div className="flex flex-col border border-neutral-700/50 rounded-xl p-2 items-center w-20 sm:w-24 shrink-0 bg-transparent">
                  {/* Avatar wrapper box with its own border */}
                  <div className="w-full aspect-square rounded-lg overflow-hidden border border-neutral-700/50 bg-[#161616]">
                    <img
                      src={sponsor.avatar}
                      alt={sponsor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Horizontal Divider touching the edges */}
                  <hr className="w-[calc(100%+16px)] -mx-2 border-t border-neutral-700/50 my-2" />

                  {/* Amount box with its own border */}
                  <div className="w-full py-1 border border-neutral-700/50 rounded-lg text-[#00DC82] text-sm sm:text-base font-bold font-mono text-center leading-none">
                    {sponsor.amount}
                  </div>
                </div>

                {/* Right Column: Name & Social Link Box Container */}
                <div className="flex flex-col gap-2.5 flex-1 min-w-0">
                  {/* Title (Sponsor Name) */}
                  <h3 className="text-base sm:text-lg font-bold font-outfit text-white truncate leading-tight ml-1">
                    {sponsor.name}
                  </h3>

                  {/* Nested Box enclosing the handles */}
                  <div className="border border-neutral-700/50 rounded-xl p-3 flex flex-col gap-2 bg-transparent">
                    {/* GitHub Handle Box */}
                    <a
                      href={`https://github.com/${sponsor.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 bg-transparent border border-neutral-700/50 rounded-lg text-neutral-300 text-xs sm:text-sm cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 fill-none stroke-current text-neutral-400"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                      </svg>
                      <span className="truncate">{sponsor.github}</span>
                    </a>

                    {/* X / Twitter Handle Box */}
                    <a
                      href={`https://x.com/${sponsor.x}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 px-3 py-2 bg-transparent border border-neutral-700/50 rounded-lg text-neutral-300 text-xs sm:text-sm cursor-pointer"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 fill-current text-neutral-400"
                      >
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584l-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                      <span className="truncate">{sponsor.x}</span>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Sponsors;
