"use client";

export default function Gears() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-20 sm:py-20">
      <h2 className="text-4xl font-bold mb-12"></h2>
      {/* Page Heading */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold font-excon">Tools & Extensions</h1>
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
                { name: "formulahendry.code-runner" },
                { name: "royaction.color-manager" },
                { name: "usernamehw.errorlens" },
                { name: "dbaeumer.vscode-eslint" },
                { name: "ritwickdey.LiveServer" },
                { name: "PKief.material-icon-theme" },
                { name: "esbenp.prettier-vscode" },
                { name: "alefragnani.project-manager" },
                { name: "GitHub.copilot" },
                { name: "GitHub.copilot-chat" },
                { name: "eamodio.gitlens" },
                { name: "ecmel.vscode-html-css" },
                { name: "dbaeumer.vscode-eslint" },
                { name: "ms-python.python" },
                { name: "ms-python.debugpy" },
                { name: "hiteshchoudharycode.wordhub" },
                { name: "george-alisson.html-preview-vscode" },
                { name: "VisualStudioExptTeam.vscodeintellicode" },
                { name: "Oracle.oracle-java" },
                { name: "shd101wyy.markdown-preview-enhanced" },
                { name: "mechatroner.rainbow-csv" },
                { name: "bradlc.vscode-tailwindcss" },
                { name: "sidharthachatterjee.vscode-tailwindcss" },
                { name: "aslamanver.vsc-export" },

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
                  target="_blank"   
                  className="text-neutral-400 hover:text-white transition font-supreme"
                >
                  {ext.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
