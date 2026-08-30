# Aaron Arboleda — Portfolio

React + Tailwind CSS, scaffolded with Vite.

## Getting started

```bash
npm install
npm run dev
```

## Folder structure

```
portfolio/
├── index.html
├── tailwind.config.js      # palette lives here as semantic color tokens
├── postcss.config.js
├── vite.config.js
└── src/
    ├── main.jsx             # app entry point
    ├── App.jsx               # composes all page sections in order
    ├── index.css             # Tailwind directives + base theme
    ├── context/
    │   └── ThemeContext.jsx  # site-wide light/dark mode state
    ├── data/
    │   └── profile.js        # hero/profile copy — edit content here, not JSX
    ├── components/
    │   ├── ui/                # small reusable pieces (buttons, toggles, etc.)
    │   │   └── ThemeToggle.jsx
    │   └── sections/          # one file per page section
    │       ├── Hero.jsx
    │       ├── Projects.jsx   # id="case-studies"
    │       ├── Experience.jsx # id="experience"
    │       └── Contact.jsx    # id="contact"
    └── assets/
        └── images/            # put your profile photo and project images here
```

## Color palette

Defined once in `tailwind.config.js`, used everywhere as `bg-background`,
`text-teal`, `bg-cerulean`, etc. — never hardcode the hex values directly
in a component.

| Token        | Hex       | Role                                   |
|--------------|-----------|-----------------------------------------|
| `background` | `#F4F1EA` | Global background (light mode)          |
| `surface`    | `#DAD6CB` | Cards, sidebars, quote blocks           |
| `espresso`   | `#271E1C` | Body text / dark-mode base              |
| `teal`       | `#066E70` | Nav, H1/H2, structural borders          |
| `cerulean`   | `#29AEC6` | Links, hovers, CTAs                     |
| `amber`      | `#C59947` | Badges, highlights, accents             |

## Conventions

- **Content vs. markup**: page copy lives in `src/data/*.js`, not inline in
  JSX, so it's easy to update without touching component code.
- **Dark mode**: handled globally via `ThemeContext` + Tailwind's `dark:`
  variant (class strategy) — no per-component state needed.
- **New sections**: add a file under `components/sections/`, give its root
  element an `id`, then import and render it in `App.jsx`.
