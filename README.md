# 🚀 Tushar Washishtha | Portfolio (2025)

![Portfolio Neural Toggle](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjE2NzB5cjF4bHh5bHh5bHh5bHh5bHh5bHh5bHh5bHh5bHh5/giphy.gif)

> **"Operates at the intersection of structural engineering and creative logic."**

This is the source code for my personal portfolio website, built with **Next.js 14**, **TypeScript**, and **Three.js**. It features a unique "Neural Mode" toggle that completely transforms the aesthetic and physics engine of the site in real-time.

---

## ✨ Key Features

### 🌗 The "Neural" Toggle
A central switch that toggles between two distinct realities:
-   **Light Mode (The Architect):** Clean, minimal, Swiss-style typography. Features a **Liquid Distortion Engine** (custom SVG filters + WebGL simulation) that warps the UI like water on interaction.
-   **Neural Mode (The Matrix):** Dark, cyberpunk, high-contrast neon. Activates a **3D Galaxy Simulation** (Three.js particle system) where thousands of stars rotate and react to mouse movement.

### 🛠️ Tech Stack
-   **Framework:** [Next.js 14 (App Router)](https://nextjs.org/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **3D & Physics:**
    -   [Three.js](https://threejs.org/)
    -   [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
    -   [React Three Drei](https://github.com/pmndrs/drei)
-   **Icons:** [Lucide React](https://lucide.dev/)

### ⚡ Performance Optimizations
-   **Hardware Accelerated Filters:** Uses `will-change: filter` and `transform: translate3d` to ensure heavy SVG distortion effects run on the GPU.
-   **Asset Optimization:** Next.js Image optimization and dynamic imports for heavy 3D components.
-   **State Persistence:** Remembers your preferred "Neural Mode" setting across sessions using `localStorage`.

---

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/portfolio-2025.git
cd portfolio-2025
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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Project Structure

```bash
├── app/
│   ├── globals.css      # Global styles & Tailwind directives
│   ├── layout.tsx       # Root layout & Metadata
│   └── page.tsx         # SINGLE PAGE APPLICATION (Main Logic)
├── components/
│   ├── GalaxyBackground.tsx  # R3F Particle System (Dark Mode)
│   ├── LiquidBackground.tsx  # WebGL Fluid Sim (Light Mode)
│   ├── LiquidSVG.tsx         # SVG Filter Definitions
│   └── NeuralToggle.tsx      # The main switch component
├── lib/
│   └── utils.ts         # CN (ClassNames) utility
└── public/
    └── assets/          # Project screenshots & Resume PDF
```

---

## 📬 Contact

-   **Email:** tusharwashishtha2@gmail.com
-   **LinkedIn:** [Tushar Washishtha](https://www.linkedin.com/in/tushar-washishtha-a04192305)
-   **Location:** Indore, India

---

_© 2025 Tushar Washishtha. Built with ❤️ and code._
