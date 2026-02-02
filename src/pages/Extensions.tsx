'use client';
import { useEffect, useState } from 'react';
import { Copy, Check, ArrowUpRight } from 'lucide-react';

export default function Gears() {
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-20 sm:py-20">
      <h2 className="text-4xl font-bold mb-12"></h2>

      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-excon bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
          Tools & Extensions
        </h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base font-supreme">
          VS Code extensions I use daily to speed up my workflow.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 max-w-3xl mx-auto mb-12"></div>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* VS Code Extensions Section */}
        <section>
          <h2 className="text-base sm:text-xl font-bold mb-6 flex items-center gap-2">
            VS Code Extensions
          </h2>
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
              <li
                key={i}
                className="flex items-center gap-3 text-base sm:text-base"
              >
                {/* Number Circle */}
                <span className="w-7 h-7 flex items-center justify-center rounded-md bg-neutral-800 text-sm text-gray-300">
                  {i + 1}
                </span>

                {/* Extension Name with Copy Icon */}
                <span className="flex items-center gap-2 text-neutral-400 hover:text-white transition font-supreme">
                  {ext.name}
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
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Web Extensions Section */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
            Chrome Extensions
          </h2>
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
              <li
                key={i}
                className="flex items-center gap-3 text-base sm:text-base"
              >
                {/* Number Circle */}
                <span className="w-7 h-7 flex items-center justify-center rounded-md bg-neutral-800 text-sm text-gray-300">
                  {i + 1}
                </span>
                <a
                  href={ext.url}
                  target="_blank"
                  className="text-neutral-400 hover:text-white transition font-supreme"
                >
                  {ext.name}
                </a>
                <ArrowUpRight className="w-4 h-4 text-neutral-400 hover:text-white" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
