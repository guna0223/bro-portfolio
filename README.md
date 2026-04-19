# Sébastien Lempens Portfolio — React Clone

A full-featured React portfolio inspired by [sebastien-lempens.com](https://sebastien-lempens.com) —
Awwwards Site of the Day (March 2024).

## 🚀 Quick Start

```bash
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
```

## 🛠 Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Three.js | 3D WebGL scene |
| GSAP | Animations |
| Lenis | Smooth scroll |
| Framer Motion | Page transitions |

## 🎨 Design Reference

- **Color palette**: #7a5d6d (mauve) · #c09e9c (dusty rose)
- **Typography**: Playfair Display (serif) + Inter (sans)
- **Style**: Dark, cinematic, 3D portfolio with scroll animations

## 📂 Project Structure

```
src/
├── components/
│   ├── Cursor.js          # Custom animated cursor
│   ├── Loader.js          # Intro loading screen
│   ├── Navigation.js      # Fixed nav with smooth scroll
│   ├── Hero.js            # Full-screen hero with 3D scene
│   ├── ThreeScene.js      # Three.js particle + icosphere scene
│   ├── Marquee.js         # Scrolling skills ticker
│   ├── About.js           # About section with stats
│   ├── Projects.js        # Project list with hover previews
│   ├── Skills.js          # Skills grid by category
│   ├── MiniGame.js        # Playable Breakout mini-game
│   ├── Contact.js         # Contact form + social links
│   └── Footer.js          # Footer with big type
├── hooks/
│   ├── useLenis.js        # Smooth scroll hook
│   └── useReveal.js       # Scroll reveal animations
├── styles/
│   └── global.css         # Global reset & CSS variables
├── App.js
└── index.js
```

## ✏️ Customization

1. Edit `src/components/About.js` — change name, bio, stats
2. Edit `src/components/Projects.js` — add your own projects
3. Edit `src/components/Contact.js` — update email & social links
4. Edit `src/styles/global.css` `:root` — change color palette

## 📄 License

MIT — free to use and modify.
