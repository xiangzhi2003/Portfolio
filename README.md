# Chiang Xiang Zhi — Portfolio

Personal portfolio site. Built with Next.js 16 and Tailwind CSS 4, deployed on Vercel.

Live: https://chiangxiangzhi.vercel.app

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)

## Design

The site is a **build log** — an index of what I've built and where I've been,
presented like an engineering spec sheet rather than a landing page.

Three rules hold it together:

- **One accent.** Brass (`#8a6114`), used only for live state, links, and the
  language marks. Everything else is warm paper and ink. Every text colour is
  checked against the ground for WCAG AA.
- **A label rail.** Every section is a sticky mono label on the left and content
  on the right, so the page has one structural idea instead of six. The rail also
  carries a brass track showing how far through that section you've scrolled.
- **The language mark.** Each project is stamped with the language it was built
  in, set large in the display face. Scrolling the work section reads
  `C# → Flutter → Java → Python → C++ → R` — the honest through-line, and the
  reason there are no per-project gradients or decorative icons.

Type is Archivo (display), Instrument Sans (body), and JetBrains Mono (every
label, year, and count), on a ~1.25 modular scale defined once as tokens in
`globals.css` — no per-component font sizes.

The ground is a warm paper white with a generated fractal-noise grain over it.
The texture is what keeps a light theme from reading as flat white screen; it
costs no network request.

Motion is tied to content or interaction, never ambient: a load sequence and mask
wipe in the hero, scroll progress in the rails and above the nav, a 12px settle
on first view, a sliding filter underline, and hover states on entries and links.
Nothing loops, nothing parallaxes, and `prefers-reduced-motion` is respected.

## Structure

```
src/
├── app/
│   ├── layout.tsx              fonts + metadata
│   ├── page.tsx                section order
│   ├── globals.css             design tokens + component classes
│   ├── robots.ts, sitemap.ts
│   └── others/layout/
│       ├── Navbar.tsx          nav + scroll spy
│       ├── SectionRail.tsx     sticky label + section progress
│       ├── ScrollProgress.tsx  page progress bar
│       └── Reveal.tsx          scroll reveals (settle + mask)
├── home/Hero.tsx               name + status block
├── about/About.tsx, content.ts
├── projects/Projects.tsx       work index
├── skills/TechStack.tsx        stack spec sheet
├── timeline/Timeline.tsx       log
└── contact/Contact.tsx         contact + footer
```

## Editing content

All content is plain data at the top of its section file:

| What | Where |
|------|-------|
| Name, status rows, intro | `src/home/Hero.tsx` |
| Bio and facts | `src/about/content.ts` |
| Projects | `projects` array in `src/projects/Projects.tsx` |
| Project screenshots | `public/projects/` — see below |
| Stack | `groups` array in `src/skills/TechStack.tsx` |
| Experience, education, awards | `entries` array in `src/timeline/Timeline.tsx` |
| Contact details | `channels` array in `src/contact/Contact.tsx` |
| Colours, type sizes, spacing, speed | the **ADJUST ME** block at the top of `src/app/globals.css` |
| Profile photo, resume | `public/profile.jpg`, `public/resume.pdf` |

Adding an `href` to a project makes that whole tile a link to the repo.

### Common adjustments

Every visual value lives in one commented block at the top of
`src/app/globals.css`. A few you're most likely to want:

| To change | Edit |
|---|---|
| Size of your name | `--text-display` |
| Page darkness | `--bg`, `--bg-alt`, `--bg-sunken` |
| How big body text is | `--text-prose` |
| How big project titles are | `--text-title` |
| Speed of the scrolling stack | `--marquee-speed` (higher = slower) |
| Width of the left label column | `--rail` |

If you darken `--bg`, check the contrast ratios noted beside the text colours
and darken those to match — keep every one at 4.5:1 or better.

### Adding a project screenshot

Every project row has a preview slot. Until a screenshot exists it holds the
language mark, so the layout is the same either way:

1. Drop the image in `public/projects/` — 16:10, around 1600×1000, PNG or JPG.
2. Add one line to that project in `src/projects/Projects.tsx`:

```ts
{
    title: "Restaurant Management System",
    image: "/projects/restaurant.png",
    // ...
}
```

The language mark moves to a small brass label beside the title once an image
takes the slot.

## Local development

```bash
git clone https://github.com/xiangzhi2003/Portfolio.git
cd Portfolio
npm install
npm run dev
```

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build
- `npm run start` — serve the production build
- `npm run lint` — lint

## Deployment

Pushes to `master` deploy automatically via Vercel.

Optionally set `NEXT_PUBLIC_SITE_URL` on Vercel to the final domain — it's used
for canonical and sitemap URLs.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react

No animation libraries. Scroll behaviour is native CSS; reveals are a ~40-line
IntersectionObserver component.

## License

MIT. See `LICENSE`.

## Contact

**Chiang Xiang Zhi**
- Email: xiangzhichiang2003@gmail.com
- GitHub: [@xiangzhi2003](https://github.com/xiangzhi2003)
- LinkedIn: [Xiang Zhi Chiang](https://www.linkedin.com/in/xiang-zhi-chiang-6723a9299/)
