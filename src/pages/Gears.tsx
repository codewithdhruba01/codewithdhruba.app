'use client';

import { useEffect } from 'react';
import {
  Laptop,
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  Smartphone,
  LampDesk,
  Usb,
  HardDrive,
  ArrowUpRight,
} from 'lucide-react';
import { Devices } from '../components/svgs/Devices';
import { AppStore } from '../components/svgs/AppStore';
import ScrollReveal from '../components/ui/ScrollReveal';

export default function Gears() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const devicesList = [
    { icon: Laptop, text: "Infinix INBook X1" },
    { icon: Monitor, text: "BenQ GW2490 (24 inch, 60.96 cm)" },
    { icon: Keyboard, text: "Kreo Hive Mechanical Keyboard" },
    { icon: Mouse, text: "HP Gaming Mouse M270" },
    { icon: LampDesk, text: "AKR Desk Lamp 1740" },
    { icon: Headphones, text: "Soundcore Anker H30i" },
    { icon: Smartphone, text: "Motorola Edge 50 Fusion (256 GB)" },
    { icon: Usb, text: "USB 9in1 Hub (9V555AA)" },
    { icon: HardDrive, text: "Seagate 1TB (STKY1000400)" },
    { icon: HardDrive, text: "SanDisk (256GB, 64GB, 32GB, 32GB)" },
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-20 sm:py-20">
      <h2 className="text-4xl font-bold mb-12"></h2>
      {/* Page Heading */}
      <ScrollReveal>
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold font-excon bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-400">
            Tools & Gears
          </h1>
          <p className="text-[#909092] mt-2 text-sm sm:text-base font-supreme">
            Tools and gear I use every day to make work happen.
          </p>
        </div>
      </ScrollReveal>

      {/* Divider */}
      <div className="border-t border-[#262626] max-w-3xl mx-auto mb-12"></div>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Devices Section */}
        <section>
          <ScrollReveal delay={0.1}>
            <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50">
                <Devices className="w-5 h-5" />
              </span>
              Devices
            </h2>
          </ScrollReveal>

          <ul className="space-y-4">
            {devicesList.map((dev, i) => {
              const Icon = dev.icon;
              return (
                <ScrollReveal key={i} delay={i * 0.02} className="flex items-center gap-3 text-base sm:text-base font-supreme text-[#909092]">
                  <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                    <Icon className="w-4 h-4 text-gray-300" />
                  </span>
                  {dev.text}
                </ScrollReveal>
              );
            })}
          </ul>
        </section>

        <section>
          <ScrollReveal delay={0.15}>
            <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/50">
                <AppStore className="w-5 h-5" />
              </span>
              Software
            </h2>
          </ScrollReveal>

          <ul className="space-y-4">
            {[
              { name: 'Notion', url: 'https://www.notion.com/' },
              { name: 'VS Code', url: 'https://code.visualstudio.com/' },
              { name: 'Cursor', url: 'https://cursor.com/download' },
              { name: 'Figma', url: 'https://www.figma.com/' },
              {
                name: 'GitHub Desktop',
                url: 'https://desktop.github.com/download/',
              },
              {
                name: 'Pycharm',
                url: 'https://www.jetbrains.com/pycharm/download/?section=windows',
              },
              {
                name: 'IntelliJ IDEA',
                url: 'https://www.jetbrains.com/idea/download/?section=windows',
              },
              { name: 'npm', url: 'https://www.npmjs.com/' },
              { name: 'Node.js', url: 'https://nodejs.org/en/' },
              { name: 'Postman', url: 'https://www.postman.com/downloads/' },
              { name: 'Vercel', url: 'https://vercel.com/home' },
              { name: 'Netlify', url: 'https://app.netlify.com/' },

              {
                name: 'VLC',
                url: 'https://vlc-media-player.en.softonic.com/download?ex=RAMP-3507.0&rex=true',
              },
              { name: 'IDM', url: 'https://www.internetdownloadmanager.com/' },
              {
                name: 'qBittorrent',
                url: 'https://www.qbittorrent.org/download',
              },
              { name: 'OBS Studio', url: 'https://obsproject.com/download' },
              { name: 'Discord', url: 'https://discord.com/download' },
              {
                name: 'Spotify',
                url: 'https://www.spotify.com/us/download/windows/',
              },
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
                <ArrowUpRight className="w-4 h-4 text-neutral-400 hover:text-white" />
              </ScrollReveal>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
