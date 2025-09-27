"use client";

import { useEffect } from "react";
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
} from "lucide-react";

export default function Gears() {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-20 sm:py-20">
      <h2 className="text-4xl font-bold mb-12"></h2>
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-excon">Tools & Gears</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base font-supreme">
          Tools and gear I use every day to make work happen.
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 max-w-3xl mx-auto mb-12"></div>

      <div className="max-w-3xl mx-auto space-y-12">
        {/* Devices Section */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
            Devices
          </h2>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <Laptop className="w-4 h-4 text-gray-300" />
              </span>
              Infinix INBook X1
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <Monitor className="w-4 h-4 text-gray-300" />
              </span>
              BenQ GW2490 (24 inch, 60.96 cm)
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <Keyboard className="w-4 h-4 text-gray-300" />
              </span>
              Kreo Hive Mechanical Keyboard
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <Mouse className="w-4 h-4 text-gray-300" />
              </span>
              HP Gaming Mouse M270
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <LampDesk className="w-4 h-4 text-gray-300" />
              </span>
              AKR Desk Lamp 1740
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <Headphones className="w-4 h-4 text-gray-300" />
              </span>
              Soundcore Anker H30i
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <Smartphone className="w-4 h-4 text-gray-300" />
              </span>
              Motorola Edge 50 Fusion (256 GB)
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <Usb className="w-4 h-4 text-gray-300" />
              </span>
              USB 9in1 Hub (9V555AA)
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center border border-neutral-700 rounded-md bg-neutral-800">
                <HardDrive className="w-4 h-4 text-gray-300" />
              </span>
              Seagate 1TB (STKY1000400)
            </li>
            <li className="flex items-center gap-3 text-base sm:text-base font-supreme text-neutral-400">
              <span className="w-8 h-8 flex items-center justify-center rounded-md border border-neutral-700 bg-neutral-800">
                <HardDrive className="w-4 h-4 text-gray-300" />
              </span>
              SanDisk (256GB, 64GB, 32GB, 32GB)
            </li>
          </ul>
        </section>


        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
            Software
          </h2>
          <ul className="space-y-4">
            {[
              { name: "Notion", url: "https://www.notion.com/" },
              { name: "VS Code", url: "https://code.visualstudio.com/" },
              { name: "Figma", url: "https://www.figma.com/" },
              { name: "GitHub Desktop", url: "https://desktop.github.com/download/"},
              { name: "Pycharm", url: "https://www.jetbrains.com/pycharm/download/?section=windows" },
              { name: "IntelliJ IDEA", url: "https://www.jetbrains.com/idea/download/?section=windows" },
              { name: "npm", url: "https://www.npmjs.com/" },
              { name: "Node.js", url: "https://nodejs.org/en/" },
              { name: "Postman", url: "https://www.postman.com/downloads/" },
              { name: "VLC", url: "https://vlc-media-player.en.softonic.com/download?ex=RAMP-3507.0&rex=true" },
              { name: "IDM", url: "https://www.internetdownloadmanager.com/" },
              { name: "qBittorrent", url: "https://www.qbittorrent.org/download" },
              { name: "OBS Studio", url: "https://obsproject.com/download" },
              { name: "Discord", url: "https://discord.com/download" },
              { name: "Spotify", url: "https://www.spotify.com/us/download/windows/" },
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
        

        {/* Web Extensions Section */}
        <section>
          <h2 className="text-lg sm:text-xl font-semibold mb-6 flex items-center gap-2">
            Chrome Extensions
          </h2>
          <ul className="space-y-4">
            {[
              { name: "AdBlock", url: "https://getadblock.com/en/" },
              { name: "Urban VPN", url: "https://www.urban-vpn.com/" },
              { name: "Mobile simulator", url: "https://chromewebstore.google.com/detail/ckejmhbmlajgoklhgbapkiccekfoccmk?utm_source=item-share-cb" },
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
