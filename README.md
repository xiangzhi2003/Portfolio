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

- **One accent.** Acid green (`#bcff3a`) on a near-black ground, used for
  section names, live state, links, and hover. Every text colour is checked
  against **both** section bands for WCAG AA — the lighter band is the harder
  case, and it's what catches values that only pass on the darker one.
- **No pure greys.** Every neutral carries a trace of the accent's hue (~79°),
  so the palette reads as one family. Pure `#1c1c1c`-style greys next to a
  saturated accent make the accent look stuck on rather than belonging. Keep
  any neutral you add on the same hue.
- **Separation by space, not lines.** Sections are divided by an alternating
  band and vertical air; rows, tags, badges, and buttons are raised filled
  surfaces rather than outlined boxes. Lines survive in exactly two places, both
  deliberate: the pull-quote's accent bar and the stack's row dividers. Content
  sits in a centred frame while backgrounds run edge to edge, with prose
  narrowing further to a readable measure — three width tiers, so the page has
  rhythm. The nav and the hero's availability strip run full width instead.
- **The language mark.** Each project is stamped with the language it was built
  in, set large in the display face, and Work carries **one project per
  language** — so that stamp means something rather than decorating. It also
  stands in as the artwork in a project's preview slot until a real screenshot
  exists, which is why there are no per-project gradients or decorative icons.

Type is Archivo (display), Instrument Sans (body), and JetBrains Mono (every
label, year, and count), sized once as tokens in `globals.css` — no
per-component font sizes.

Backgrounds: a generated fractal-noise film grain over the whole page, plus
three photographic textures in `public/textures/` — behind the hero, revealed on
hover across the About section, and behind Contact. All are desaturated and
screen-blended at very low opacity so they read as atmosphere rather than
pictures, and all are self-hosted rather than hotlinked.

Motion is tied to content or interaction, never ambient: a load sequence and mask
wipe in the hero, a 12px settle on first view, a sliding filter underline, and
hover states throughout. Nothing tracks the scroll position, nothing parallaxes,
and `prefers-reduced-motion` is respected — with one
deliberate exception, the stack ticker, which keeps scrolling because it is a
constant-speed drift rather than the sudden motion that setting guards against.

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
│       ├── SectionBar.tsx      section header (name + meta)
│       └── Reveal.tsx          scroll reveals
├── home/Hero.tsx               status strip, name, fact grid
├── about/About.tsx, content.ts pull-quote | bio split
├── projects/Projects.tsx       expandable work rows
├── skills/TechStack.tsx        ticker + lined category list
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

Every project's `title`, `description`, and `stack` is taken from its GitHub
README rather than written from memory — an earlier version of this list had
drifted and claimed behaviour the code did not have.

`href` adds a "View source" link inside the expanded panel, and `demo` adds a
"Live demo" link plus a green marker on the collapsed row. **Verify a `demo` URL
returns 200 before adding it** — two of the deploy URLs recorded in these repos
now 404, and a dead link is worse than none. (Neither link can wrap the row
itself: the row is the expand/collapse button, and an anchor inside a button is
invalid HTML.)

### Common adjustments

Every visual value lives in one commented block at the top of
`src/app/globals.css`. A few you're most likely to want:

| To change | Edit |
|---|---|
| Size of your name | `--text-display` |
| Page darkness | `--bg`, `--bg-alt`, `--bg-sunken` |
| How raised the cards look | `--surface`, `--surface-alt` |
| Corner rounding | `--radius` |
| Content width (backgrounds stay full-bleed) | `--frame` |
| How big body text is | `--text-prose` |
| How big project titles are | `--text-title` |
| Speed of the stack ticker | `--marquee-speed` (px/second; higher = faster) |

If you darken `--bg`, check the contrast ratios noted beside the text colours
and darken those to match — keep every one at 4.5:1 or better.

### Adding a project screenshot

Every project row has a preview slot. Until a screenshot exists it holds the
language mark, so the layout is the same either way:

1. Drop the image in `public/projects/` — 16:10, around 1600×1000, PNG or JPG.
2. Add one line to that project in `src/projects/Projects.tsx`:

```ts
{
    title: "UniLink",
    image: "/projects/unilink.png",
    // ...
}
```

The screenshot simply replaces the language mark in that slot. Nothing is lost:
each project's language is also listed in its stack tags on the collapsed row.

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
