# 🚀 Dhrubaraj Portfolio - Modern Developer Portfolio

<div align="center">
  <img src="public/logo/logo.png" alt="Portfolio Logo" width="120" height="120" style="border-radius: 20px;">
  
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-blue.svg)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.0-38B2AC.svg)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.3.5-646CFF.svg)](https://vitejs.dev/)
  [![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
</div>

## 📖 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Dependencies](#-dependencies)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [ License](#-license)

## ✨ Features

### 🎯 Core Features
- **Modern Portfolio Design** - Clean, responsive, and professional layout
- **Smooth Scrolling** - Buttery smooth scrolling with Lenis library
- **Interactive Animations** - AOS (Animate On Scroll) for engaging user experience
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Dark Theme** - Elegant dark color scheme for modern aesthetics

### 🚀 Advanced Features
- **AI Chat Assistant** - Interactive chatbot for visitor engagement
- **GitHub Integration** - Real-time GitHub contributions display
- **Blog System** - Complete blog functionality with dynamic routing
- **Project Showcase** - Detailed project presentations with thumbnails
- **Skills Visualization** - Interactive skills and technologies display
- **Contact Form** - Integrated contact system for professional communication

### 🎨 UI/UX Features
- **Smooth Transitions** - Framer Motion animations for fluid interactions
- **Typography** - Enhanced typography with Tailwind Typography plugin
- **Icon System** - Lucide React and React Icons for consistent iconography
- **Loading States** - Error boundaries and loading states for better UX

## 🛠️ Tech Stack

### **Frontend Framework**
- **React 18.2.0** - Modern React with hooks and functional components
- **TypeScript 5.2.2** - Type-safe development experience
- **Vite 6.3.5** - Lightning-fast build tool and dev server

### **Styling & UI**
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
- **Tailwind Typography** - Enhanced typography utilities
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixing

### **Animation & Interactions**
- **Framer Motion 12.23.12** - Production-ready motion library
- **AOS 2.3.4** - Animate On Scroll library
- **Lenis 1.3.10** - Smooth scrolling library

### **Routing & State**
- **React Router DOM 6.21.1** - Client-side routing
- **React Error Boundary 4.0.12** - Error handling and fallbacks

### **Icons & Graphics**
- **Lucide React 0.525.0** - Beautiful & consistent icon toolkit
- **React Icons 5.5.0** - Popular icon packs for React

### **Development Tools**
- **TypeScript** - Static type checking
- **ESLint & Prettier** - Code quality and formatting
- **Git** - Version control

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/codewithdhruba01/myProfile.git
   cd myProfile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### **Build for Production**
```bash
npm run build
# or
yarn build
```

### **Preview Production Build**
```bash
npm run preview
# or
yarn preview
```


## 📁 Project Structure

```
dhrubaraj-portfolio/
├── public/                 # Static assets
│   ├── blog/              # Blog thumbnails and images
│   ├── certificates/      # Achievement certificates
│   ├── favicon/          # Website favicon
│   └── logo/             # Brand logo
├── src/                   # Source code
│   ├── assets/           # Project assets
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components
│   ├── styles/           # Global styles and CSS
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
├── vite.config.ts        # Vite build configuration
└── README.md             # Project documentation
```


## 🔧 Configuration

### **Tailwind CSS**
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#0A0A0A',
        // Custom color palette
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
```

### **Vite Configuration**
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  }
})
```

### **TypeScript Configuration**
```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

## 📦 Dependencies

### **Production Dependencies**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.21.1",
  "framer-motion": "^12.23.12",
  "tailwindcss": "^3.4.0",
  "lenis": "^1.3.10",
  "aos": "^2.3.4"
}
```

### **Development Dependencies**
```json
{
  "typescript": "^5.2.2",
  "vite": "^6.3.5",
  "@vitejs/plugin-react": "^4.2.1",
  "autoprefixer": "^10.4.16",
  "postcss": "^8.4.32"
}
```

## 🚀 Deployment

### **Netlify Deployment**
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push to main branch

### **Vercel Deployment**
1. Import your GitHub repository to Vercel
2. Vercel will auto-detect Vite configuration
3. Deploy with zero configuration

### **GitHub Pages Deployment**
1. Add `gh-pages` dependency
2. Configure build script in package.json
3. Deploy to GitHub Pages branch


## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### **Development Guidelines**
- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Maintain responsive design principles
- Add proper error handling
- Include TypeScript types for new components

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🙏 Acknowledgments

- **React Team** - For the amazing React framework
- **Tailwind CSS** - For the utility-first CSS framework
- **Vite** - For the lightning-fast build tool
- **Framer Motion** - For smooth animations
- **Lenis** - For smooth scrolling experience

---

<div align="center">
  <p>Made with ❤️ by Dhrubaraj</p>
  <p>⭐ Star this repository if you found it helpful!</p>
</div>
