# Chiang Xiang Zhi — Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript — no framework, no build step. Deployed on Vercel.

Live: https://chiangxiangzhi.vercel.app

![HTML5](https://img.shields.io/badge/HTML5-e34f26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?logo=javascript&logoColor=black)

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
label, year, and count), sized once as tokens in `styles.css` — no
per-component font sizes.

Backgrounds: a generated fractal-noise film grain over the whole page, plus
three photographic textures in `textures/` — behind the hero, revealed on
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
.
├── src/                          everything the website serves
│   ├── index.html                all content and markup
│   ├── css/styles.css            design tokens (:root) + component classes
│   ├── js/script.js              navbar, reveals, accordions, log filters, ticker
│   ├── assets/
│   │   ├── fonts/                self-hosted Archivo, Instrument Sans, JetBrains Mono
│   │   ├── images/
│   │   │   ├── profile.jpg
│   │   │   ├── textures/         hero, about and contact background textures
│   │   │   ├── log/              images shown in opened Log entries
│   │   │   └── projects/         Work screenshots (see below)
│   │   └── docs/                 resume PDF
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml
├── vercel.json                   output directory, security + cache headers
├── README.md
└── LICENSE
```

## Editing content

Everything is plain markup in `src/index.html`. Search for the section's `id`:

| What | Where |
|------|-------|
| Name, status rows, intro, fact grid | `<header id="home">` |
| Bio and facts | `<section id="about">` |
| Projects | rows inside `<section id="work">` |
| Stack | `<section id="stack">` (the ticker repeats this list automatically) |
| Experience, education, awards | `.log-item` rows inside `<section id="log">` |
| Contact details | `<section id="contact">` |
| Colours, type sizes, spacing, speed | the **ADJUST ME** block at the top of `src/css/styles.css` |
| Resume | replace the PDF in `src/assets/docs/` (keep the filename, or update the two links in `index.html`) |

If you add or remove a Log entry, also update the counts on the filter tabs
(the number beside All, Work, Education, Award, Activity). The project count in
the Work header is edited by hand too.

Every project's description and stack comes from its GitHub README rather than
memory. A "Live demo" link plus a green **Live** marker is added by hand to a
project that has a working deployment — **verify the URL returns 200 first**; a
dead link is worse than none.

### Adding a project screenshot

Every project row has a preview slot. Until a screenshot exists it holds the
language mark, so the layout is the same either way:

1. Put the image in `src/assets/images/projects/` — 16:10, around 1600×1000,
   PNG or JPG.
2. In that project's `id="work-panel-N"`, replace the `<div class="preview">`
   with the slider markup used by the UniLink and GapMap rows
   (`<div class="slider" data-slider ...>`). Give it one `<figure class="slide">`
   per image: a single image shows no arrows, several show arrows, dots and
   swipe. Every image is wrapped in a link, so it opens full size on click.

### Common adjustments

| To change | Edit in `src/css/styles.css` |
|---|---|
| Size of your name | `--text-display` |
| Page darkness | `--bg`, `--bg-alt`, `--bg-sunken` |
| How raised the cards look | `--surface`, `--surface-alt` |
| Corner rounding | `--radius` |
| Content width (backgrounds stay full-bleed) | `--frame` |
| Speed of the stack ticker | `--marquee-speed` (px/second; higher = faster) |

If you darken `--bg`, check the contrast ratios noted beside the text colours and
keep every one at 4.5:1 or better.

## Local development

No install and no build. Serve the `src` folder with any static server:

```bash
git clone https://github.com/xiangzhi2003/Portfolio.git
cd Portfolio
npx serve src
```

Then open http://localhost:3000. Opening `src/index.html` directly also works.

## Deployment

Pushes to `master` deploy automatically via Vercel. `vercel.json` sets the
output directory to `src` with no framework and no build command, so no
dashboard settings are needed.

## History

The site was originally built with Next.js 16, React 19, TypeScript and
Tailwind CSS 4. That version is preserved at the git tag `nextjs-version`.

## License

MIT. See `LICENSE`.

## Contact

**Chiang Xiang Zhi**
- Email: xiangzhichiang2003@gmail.com
- GitHub: [@xiangzhi2003](https://github.com/xiangzhi2003)
- LinkedIn: [Xiang Zhi Chiang](https://www.linkedin.com/in/xiang-zhi-chiang-6723a9299/)
