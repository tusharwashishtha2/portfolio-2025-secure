# 🚀 Tushar Washishtha | Portfolio (2025)

> *Operates at the intersection of performance engineering and creative UI design.*

This repository contains the source code for my personal portfolio website, built using **Next.js 14**, **TypeScript**, and **Three.js**.  
It features a unique **“Neural Mode” toggle** that dynamically transforms the site’s visual style and rendering behavior in real time.

---

## 📄 Resume Highlights
- Built a high-performance personal portfolio using **Next.js 14**, **TypeScript**, and **Three.js**
- Implemented real-time UI mode switching with **GPU-accelerated visual effects**
- Optimized rendering and animations for **smooth performance across devices**

---

## ✨ Key Features

### 🌗 The “Neural” Toggle
A central switch that toggles between two distinct UI realities:

- **Light Mode (The Architect)**  
  Clean, minimal, Swiss-style typography.  
  Includes a **Liquid Distortion Engine** (custom SVG filters + WebGL simulation) that warps UI elements like water on interaction.

- **Neural Mode (The Matrix)**  
  Dark, cyberpunk, high-contrast neon theme.  
  Activates a **3D Galaxy Simulation** (Three.js particle system) where thousands of stars rotate and react to mouse movement.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **3D & Physics:**
  - Three.js
  - React Three Fiber
  - React Three Drei
- **Icons:** Lucide React

---

## ⚡ Performance Optimizations
- **Hardware-Accelerated Filters:** Uses `will-change: filter` and `transform: translate3d` to ensure heavy SVG distortion effects run on the GPU.
- **Asset Optimization:** Next.js image optimization and dynamic imports for performance-heavy 3D components.
- **State Persistence:** Stores the user’s preferred “Neural Mode” using `localStorage` to persist settings across sessions.

---

## 🚀 Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/tusharwashishtha2/portfolio-2025-secure.git
cd portfolio-2025-secure
npm install
# or
yarn install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

---

## 📂 Project Structure

```bash
app/
├── globals.css        # Global styles & Tailwind directives
├── layout.tsx         # Root layout & metadata
└── page.tsx           # Single-page application (main logic)

components/
├── GalaxyBackground.tsx   # R3F particle system (Dark Mode)
├── LiquidBackground.tsx   # WebGL fluid simulation (Light Mode)
├── LiquidSVG.tsx          # SVG filter definitions
└── NeuralToggle.tsx       # Main mode switch component

lib/
└── utils.ts               # ClassNames utility

public/
└── assets/                # Screenshots & resume PDF
```

---

## 📬 Contact

- **Email:** tusharwashishtha2@gmail.com
- **LinkedIn:** [Tushar Washishtha](https://www.linkedin.com/in/tushar-washishtha-a04192305)
- **Location:** Indore, India

---

_© 2025 Tushar Washishtha. Built with ❤️ and code._
