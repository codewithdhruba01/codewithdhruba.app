import fs from 'fs';
import path from 'path';

// Using __dirname substitute since it's an ES module or run via tsx
const dataDir = path.resolve(process.cwd(), 'src/data/thoughts');
const contentDir = path.resolve(process.cwd(), 'src/content/thoughts');

if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// We will use a regex-based approach to extract the fields to avoid dealing with TS compilation complexities in dynamically imported modules that might have non-node compatible imports.
const tsFiles = fs.readdirSync(dataDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of tsFiles) {
  const filePath = path.join(dataDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');

  // Extract description
  const descMatch = content.match(/description:\s*['"`]([\s\S]*?)['"`],\n/);
  // Extract finalThoughts
  const ftMatch = content.match(/finalThoughts:\s*['"`]([\s\S]*?)['"`]\n/);
  // Extract notes array
  const notesMatch = content.match(/notes:\s*\[([\s\S]*?)\](,\n|\n)/);

  if (descMatch || ftMatch || notesMatch) {
    let mdxContent = ``;

    if (descMatch && descMatch[1]) {
      mdxContent += `## Overview\n\n${descMatch[1]}\n\n`;
    }

    if (notesMatch && notesMatch[1]) {
      mdxContent += `## Notes\n\n`;
      // The notes are a JS array of strings. We can parse it by matching the strings.
      // But they might have single quotes inside. Let's try to just split by `,` and clean them up.
      // Actually, since they are full strings, let's use a dirty regex trick or eval.
      let notesStr = `[${notesMatch[1]}]`;
      // Clean up trailing commas before eval
      notesStr = notesStr.replace(/,\s*]/, ']');
      try {
        const notesArr = eval(notesStr);
        if (Array.isArray(notesArr)) {
          notesArr.forEach(note => {
            const parts = note.split(' — ');
            if (parts.length > 1) {
              const heading = parts[0];
              const rest = parts.slice(1).join(' — ');
              const subParts = rest.split(': ');
              mdxContent += `### ${heading}\n`;
              if (subParts.length > 1 && subParts[0].length < 40) {
                const subheading = subParts[0];
                const text = subParts.slice(1).join(': ');
                mdxContent += `- **${subheading}:** ${text.replace(/\n/g, '\n  ')}\n\n`;
              } else {
                mdxContent += `- ${rest.replace(/\n/g, '\n  ')}\n\n`;
              }
            } else {
              const colonParts = note.split(': ');
              if (colonParts.length > 1 && colonParts[0].length < 45) {
                mdxContent += `- **${colonParts[0]}:** ${colonParts.slice(1).join(': ').replace(/\n/g, '\n  ')}\n\n`;
              } else {
                mdxContent += `- ${note.replace(/\n/g, '\n  ')}\n\n`;
              }
            }
          });
        }
      } catch (e) {
        console.error(`Error parsing notes in ${file}`, e);
      }
    }

    if (ftMatch && ftMatch[1]) {
      mdxContent += `## Final Thoughts\n\n${ftMatch[1]}\n`;
    }

    // Write MDX
    const mdxPath = path.join(contentDir, file.replace('.ts', '.mdx'));
    fs.writeFileSync(mdxPath, mdxContent);
    console.log(`Generated ${mdxPath}`);

    // Remove from TS
    if (descMatch) content = content.replace(descMatch[0], '');
    if (ftMatch) content = content.replace(ftMatch[0], '');
    if (notesMatch) content = content.replace(notesMatch[0], '');

    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}
