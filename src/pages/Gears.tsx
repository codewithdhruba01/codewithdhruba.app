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
    <div className="min-h-screen bg-background text-foreground pt-20 md:pt-28 pb-16">
      <div className="max-w-3xl mx-auto w-full px-6">
        {/* Page Heading */}
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit mb-3 text-foreground">
              Tools & Gears
            </h2>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base font-supreme">
              Tools and gear I use every day to make work happen.
            </p>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="border-t border-border mb-12"></div>

        <div className="space-y-12">
          {/* Devices Section */}
          <section>
            <ScrollReveal delay={0.1}>
              <h4 className="text-lg md:text-xl sm:text-base font-bold mb-6 flex items-center gap-3 text-foreground">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card">
                  <Devices className="w-5 h-5 text-foreground" />
                </span>
                Devices
              </h4>
            </ScrollReveal>

            <ul className="space-y-4">
              {devicesList.map((dev, i) => {
                const Icon = dev.icon;
                return (
                  <ScrollReveal key={i} delay={i * 0.02} className="flex items-center gap-3 text-base sm:text-base font-supreme text-muted-foreground">
                    <span className="w-8 h-8 flex items-center justify-center border border-border rounded-md bg-muted">
                      <Icon className="w-4 h-4 text-foreground" />
                    </span>
                    {dev.text}
                  </ScrollReveal>
                );
              })}
            </ul>
          </section>

          <section>
            <ScrollReveal delay={0.15}>
              <h4 className="text-lg md:text-xl sm:text-base font-bold mb-6 flex items-center gap-3 text-foreground">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl border border-border bg-card">
                  <AppStore className="w-5 h-5 text-foreground" />
                </span>
                Software
              </h4>
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
                  <span className="w-7 h-7 flex items-center justify-center rounded-md bg-muted text-sm text-foreground">
                    {i + 1}
                  </span>
                  <a
                    href={ext.url}
                    target="_blank"
                    className="text-muted-foreground hover:text-foreground transition font-supreme"
                  >
                    {ext.name}
                  </a>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                </ScrollReveal>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
