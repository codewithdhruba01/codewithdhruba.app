'use client';
import { useEffect, useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../components/ui/tooltip';
import { VisualStudioCode } from '../components/svgs/VisualStudioCode';
import { Chrome } from '../components/svgs/Chrome';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Gears() {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Play click audio sound from public/Audio/
  const playClickSound = () => {
    const audio = new Audio('/Audio/link_sound.mp3');
    audio.volume = 0.1; // Lower volume for a very soft and pleasant click
    audio.play().catch((err) => console.log('Audio play blocked or failed:', err));
  };

  const handleCopy = (text: string) => {
    playClickSound();
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 md:pt-36 pb-16">
      <div className="max-w-3xl mx-auto w-full px-6">
        {/* Page Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300">
              Tools & Extensions
            </h2>
            <p className="text-[#909092] mt-2 text-sm sm:text-base font-supreme">
              VS Code extensions I use daily to speed up my workflow.
            </p>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="border-t border-[#2b2a2a] mb-12"></div>

        <div className="space-y-12">
          {/* VS Code Extensions Section */}
          <section>
            <ScrollReveal delay={0.1}>
              <h4 className="text-base md:text-xl sm:text-base font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50">
                  <VisualStudioCode className="w-6 h-6" />
                </span>
                VS Code Extensions
              </h4>
            </ScrollReveal>

            <ul className="space-y-4">
              {[
                { name: 'formulahendry.code-runner' },
                { name: 'royaction.color-manager' },
                { name: 'usernamehw.errorlens' },
                { name: 'dbaeumer.vscode-eslint' },
                { name: 'ritwickdey.LiveServer' },
                { name: 'PKief.material-icon-theme' },
                { name: 'esbenp.prettier-vscode' },
                { name: 'alefragnani.project-manager' },
                { name: 'GitHub.copilot' },
                { name: 'GitHub.copilot-chat' },
                { name: 'eamodio.gitlens' },
                { name: 'ecmel.vscode-html-css' },
                { name: 'dbaeumer.vscode-eslint' },
                { name: 'ms-python.python' },
                { name: 'ms-python.debugpy' },
                { name: 'hiteshchoudharycode.wordhub' },
                { name: 'george-alisson.html-preview-vscode' },
                { name: 'VisualStudioExptTeam.vscodeintellicode' },
                { name: 'Oracle.oracle-java' },
                { name: 'shd101wyy.markdown-preview-enhanced' },
                { name: 'mechatroner.rainbow-csv' },
                { name: 'bradlc.vscode-tailwindcss' },
                { name: 'sidharthachatterjee.vscode-tailwindcss' },
                { name: 'aslamanver.vsc-export' },
                { name: 'EliverLara.andromeda' },
              ].map((ext, i) => (
                <ScrollReveal key={i} delay={i * 0.02} className="flex items-center gap-3 text-base sm:text-base">
                  {/* Number Circle */}
                  <span className="w-7 h-7 flex items-center justify-center rounded-md bg-neutral-800 text-sm text-gray-300">
                    {i + 1}
                  </span>

                  {/* Extension Name with Copy Icon */}
                  <span className="flex items-center gap-2 text-[#909092] hover:text-white transition font-supreme">
                    {ext.name}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleCopy(ext.name)}
                            className="text-gray-400 hover:text-white transition"
                          >
                            {copied === ext.name ? (
                              <Check className="w-4 h-4 text-green-400" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="font-outfit text-[#2b2a2a]">Copy Extension</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </span>
                </ScrollReveal>
              ))}
            </ul>
          </section>

          {/* Web Extensions Section */}
          <section>
            <ScrollReveal delay={0.15}>
              <h4 className="text-base md:text-xl sm:text-base font-bold mb-6 flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50">
                  <Chrome className="w-6 h-6" />
                </span>
                Chrome Extensions
              </h4>
            </ScrollReveal>

            <ul className="space-y-4">
              {[
                {
                  name: 'ColorPick Eyedropper',
                  url: 'https://chromewebstore.google.com/detail/ohcpnigalekghcmgcdcenkpelffpdolg?utm_source=item-share-cb',
                },
                {
                  name: 'React Developer Tools',
                  url: 'https://chromewebstore.google.com/detail/fmkadmapgofadopljbjfkapdkoienihi?utm_source=item-share-cb',
                },
                {
                  name: 'Fonts Ninja',
                  url: 'https://chromewebstore.google.com/detail/eljapbgkmlngdpckoiiibecpemleclhh?utm_source=item-share-cb',
                },
                {
                  name: 'Web Editor',
                  url: 'https://chromewebstore.google.com/detail/pdmlhckofhkhebmcplblcijijgjiakcm?utm_source=item-share-cb',
                },
                {
                  name: 'Microsoft Clarity Live',
                  url: 'https://chromewebstore.google.com/detail/cjfdbemmaeeohgibnhdhlakiahifjjcf?utm_source=item-share-cb',
                },
                {
                  name: 'JSON Formatter',
                  url: 'https://chromewebstore.google.com/detail/bcjindcccaagfpapjjmafapmmgkkhgoa?utm_source=item-share-cb',
                },
                {
                  name: 'Snippets',
                  url: 'https://chromewebstore.google.com/detail/fakjeijchchmicjllnabpdkclfkpbiag?utm_source=item-share-cb',
                },
                {
                  name: 'Mobile simulator',
                  url: 'https://chromewebstore.google.com/detail/ckejmhbmlajgoklhgbapkiccekfoccmk?utm_source=item-share-cb',
                },
                { name: 'Loom', url: 'https://www.loom.com/' },
                { name: 'AdBlock', url: 'https://getadblock.com/en/' },
                { name: 'Urban VPN', url: 'https://www.urban-vpn.com/' },
              ].map((ext, i) => (
                <ScrollReveal key={i} delay={i * 0.02} className="flex items-center gap-3 text-base sm:text-base">
                  {/* Number Circle */}
                  <span className="w-7 h-7 flex items-center justify-center rounded-md bg-neutral-800 text-sm text-gray-300">
                    {i + 1}
                  </span>
                  <a
                    href={ext.url}
                    target="_blank"
                    className="text-[#909092] hover:text-white transition font-supreme"
                  >
                    {ext.name}
                  </a>
                  <ArrowUpRight className="w-4 h-4 text-[#909092] hover:text-white" />
                </ScrollReveal>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
