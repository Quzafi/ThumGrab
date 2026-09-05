# 🚀 ThumbGrab — YouTube Thumbnail Downloader, AI Content DNA Extractor & Creator Suite

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.3-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)]()

**ThumbGrab** is a high-performance, 100% client-side web application designed for YouTube creators, graphic designers, and social media managers. It allows users to download full-resolution Max HD thumbnails, run browser-based AI CTR quality audits, extract copywriting content DNA blueprints, preview thumbnails in realistic YouTube feed mockups, and generate viral titles using Google Gemini API — all with **$0 server cost**.

---

## ✨ Key Features

### 🖼️ 1. High-Resolution Thumbnail Downloader
- **Max HD (1280×720)** and **HQ (480×360)** full-quality JPG downloads.
- Direct single-click image save or 1-click **ZIP Archive Export**.
- Pure client-side fetching with zero server proxies required.

### 🧬 2. Channel & Video Content DNA Extractor (`/dna`)
- Extracts complete copywriting emotional hooks (Curiosity, Warning, How-To, VS Comparison).
- Analyzes title architecture, capitalization styles, and detects high-CTR **Power Words**.
- Generates a **1-Click Copyable DNA Blueprint** formatted for ChatGPT, Claude, or Notion workflows.

### ⚡ 3. 100% Client-Side AI CTR & Quality Auditor
- Runs HTML5 Canvas pixel analysis directly inside the user's browser.
- Computes **Estimated CTR Score (0–100)** based on contrast RMS, aspect ratio, and brightness tone.
- Extracts a **5-Color Dominant Hex Palette** with 1-click copy functionality.

### 🎨 4. Thumbnail Editor & Stamp Badge Overlay
- Add 1-click viral stamps (**"4K ULTRA HD"**, **"LIVE"**, **"NEW 2026"**, **"MUST WATCH"**, **"EXPOSED"**).
- Custom badge text, color picker, and positioning (Top-Right, Top-Left, Bottom-Right, Bottom-Left).
- Adjust brightness, contrast, and dark overlay opacity.

### ✨ 5. BYOK Gemini AI Title & Tag Generator (`/title-generator`)
- **Bring Your Own Key (BYOK)** model using Google Gemini API's free tier.
- Integrated **Modal Popup** with step-by-step instructions to grab a free API key from Google AI Studio in 30 seconds.
- Generates 8 high-CTR title variations + 15 search tags with 1-click copy buttons.

### ⚔️ 6. Side-by-Side A/B Test Feed Simulator (`/ab-test`)
- Upload or compare 2 thumbnail variants side-by-side inside realistic YouTube feed card mockups.
- Toggle between **Dark Mode** and **Light Mode** preview.

### 📦 7. Multi-URL Batch Downloader (`/batch`)
- Paste multiple YouTube links at once (one per line).
- Batch fetch and export all thumbnails in a single ZIP file.

---

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite 6
- **Styling:** TailwindCSS 4 & Vanilla CSS Design Tokens
- **Icons:** Lucide React
- **ZIP Packaging:** JSZip
- **SEO & SSG:** `vite-react-ssg` & `react-helmet-async`

---

## 💻 Getting Started (Local Development)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/thumbgrab.git
   cd thumbgrab
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://127.0.0.1:5173/` in your browser.

4. **Build for production:**
   ```bash
   npm run build:spa
   ```

---

## 🚀 Deployment Guide

This application is **100% client-side and serverless**. You can deploy it for free on any static Web host:

### 1. Netlify (Included)
The repository includes a `netlify.toml` configuration file out of the box.
```bash
# Push to GitHub and link to Netlify, or deploy via Netlify CLI:
npx netlify-cli deploy --build --prod
```

### 2. Vercel
Import the repository into Vercel:
- **Framework Preset:** Vite
- **Build Command:** `npm run build:spa`
- **Output Directory:** `dist`

### 3. GitHub Pages
Set your publish branch to `dist` after running `npm run build:spa`.

---

## 💰 Reselling & Commercialization

ThumbGrab is built with a **Micro-SaaS & Web Script commercialization model** in mind:
- **$0 Running Costs:** All API requests (YouTube oEmbed, Client Canvas AI, BYOK Gemini API) execute inside the client's browser.
- **Monetization Ready:** Built-in Google AdSense banner placeholders (`AdSlot.jsx`).
- **Codecanyon / Gumroad Ready:** Can be sold as a turnkey script or developer boilerplate.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
