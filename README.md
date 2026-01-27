# 🚀 Xiang Zhi Portfolio

A modern, animated portfolio website built with Next.js 16, featuring smooth scroll animations, parallax effects, and a cosmic-themed design.

Live site: `https://chiangxiangzhi.vercel.app`

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

## ✨ Features

- **Smooth Scroll Animations** - Lenis smooth scrolling with GSAP ScrollTrigger integration
- **Parallax Hero Section** - Dynamic hero-to-about transition with scroll-based effects
- **3D Project Carousel** - Swiper.js coverflow slider for project showcase
- **Interactive Cursor Spotlight** - Mouse-following glow effect on desktop
- **Filterable Skills Grid** - Category-based filtering with animated transitions
- **Responsive Timeline** - Work, education, and achievements with filter tabs
- **Glassmorphism Design** - Modern glass card effects with cosmic gradients
- **Dark Mode** - Full dark theme with space-inspired aesthetic

## 🛠️ Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | React 19 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4, PostCSS |
| **Animations** | Framer Motion, GSAP + ScrollTrigger |
| **Smooth Scroll** | Lenis |
| **Carousel** | Swiper.js |
| **Icons** | Lucide React |
| **Tooling** | ESLint (eslint-config-next) |
| **Deployment** | Vercel |
| **Fonts** | Inter, JetBrains Mono (via next/font) |

## 📦 Dependencies

**Runtime**
- `next`, `react`, `react-dom`
- `tailwindcss` (via build pipeline)
- `framer-motion`, `gsap`, `lenis`
- `swiper`
- `lucide-react`

**Dev**
- `typescript`
- `eslint`, `eslint-config-next`
- `@types/*`

## 🧩 Installation (Optional for local dev)

You only need this if you want to run the project locally.

```bash
git clone https://github.com/xiangzhi2003/Portfolio.git
cd Portfolio
npm install
```

**Common commands**
- `npm run dev` (local dev server)
- `npm run build` (production build)
- `npm run start` (serve production build)
- `npm run lint` (lint)

## 🌐 Deployment (Vercel)

This repo is deployed on Vercel. Updating the website is simple:

1. Edit the content/components (see paths below)
2. `git commit` and `git push`
3. Vercel redeploys automatically from the GitHub repo

Optional: set `NEXT_PUBLIC_SITE_URL` on Vercel to your final domain (used for canonical + sitemap URLs).

## 📝 Customization

Update the following files to customize the portfolio:

- `src/home/ParallaxHero.tsx` - Name, title, social links
- `src/about/content.ts` - Bio paragraphs
- `src/skills/TechStack.tsx` - Skills and categories
- `src/projects/Projects.tsx` - Project data
- `src/timeline/Timeline.tsx` - Experience data
- `src/contact/Contact.tsx` - Contact information
- `public/profile.jpg` - Profile picture

## 📄 License

MIT License. See `LICENSE`.

## 🤝 Contact

**Chiang Xiang Zhi**
- Email: xiangzhichiang2003@gmail.com
- GitHub: [@xiangzhi2003](https://github.com/xiangzhi2003)
- LinkedIn: [Xiang Zhi Chiang](https://www.linkedin.com/in/xiang-zhi-chiang-6723a9299/)
