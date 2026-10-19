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
    <section id="sponsors" className="pt-8 pb-8 bg-background">
      <div className="max-w-[690px] mx-auto w-full px-6">
        {/* Header Row */}
        <ScrollReveal className="flex items-center justify-between gap-4 mb-8">
          <h4 className="text-lg sm:text-xl font-semibold text-foreground font-hanken text-left flex items-center gap-1.5 leading-none">
            Sponsors
          </h4>
          <a
            href="https://github.com/sponsors/codewithdhruba01"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 bg-card border border-border rounded-lg text-xs sm:text-sm font-medium text-foreground hover:bg-accent hover:border-neutral-500/40 transition duration-200 shadow-sm"
          >
            <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span>Sponsor Me</span>
          </a>
        </ScrollReveal>

        {/* Sponsors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sponsorsData.map((sponsor, idx) => (
            <ScrollReveal
              key={idx}
              delay={idx * 0.15}
              className="h-full"
            >
              <div
                className="bg-card border border-border rounded-xl p-3.5 sm:p-4 flex gap-3 sm:gap-3.5 items-start h-full shadow-sm"
              >
                <div className="flex flex-col border border-border rounded-lg p-1.5 items-center w-16 sm:w-[70px] shrink-0 bg-transparent">
                  {/* Avatar wrapper box with its own border */}
                  <div className="w-full aspect-square rounded-md overflow-hidden border border-border bg-muted">
                    <img
                      src={sponsor.avatar}
                      alt={sponsor.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Horizontal Divider touching the edges */}
                  <hr className="w-[calc(100%+12px)] -mx-1.5 border-t border-border my-1.5" />

                  {/* Amount box with its own border */}
                  <div className="w-full py-0.5 border border-border bg-muted/40 rounded-md text-[#00DC82] text-xs font-bold font-mono text-center leading-tight">
                    {sponsor.amount}
                  </div>
                </div>

                {/* Right Column: Name & Social Link Box Container */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  {/* Title (Sponsor Name) */}
                  <h3 className="text-sm sm:text-[15px] font-bold font-outfit text-foreground truncate leading-tight ml-0.5">
                    {sponsor.name}
                  </h3>

                  {/* Nested Box enclosing the handles */}
                  <div className="border border-border rounded-lg p-2 sm:p-2.5 flex flex-col gap-1.5 bg-transparent">
                    {/* GitHub Handle Box */}
                    <a
                      href={`https://github.com/${sponsor.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2.5 py-1.5 bg-transparent border border-border rounded-md text-foreground/80 hover:text-foreground hover:bg-accent text-xs cursor-pointer transition-colors duration-150"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3 h-3 fill-none stroke-current text-muted-foreground shrink-0"
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
                      className="flex items-center gap-2 px-2.5 py-1.5 bg-transparent border border-border rounded-md text-foreground/80 hover:text-foreground hover:bg-accent text-xs cursor-pointer transition-colors duration-150"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3 h-3 fill-current text-muted-foreground shrink-0"
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
