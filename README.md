# Aude.ai — Engineer's Performance (Coaching) Dashboard

A responsive, human-in-the-loop performance & coaching dashboard for Aude.ai, built to
the provided design and styled with the **Untitled UI** design system (colors, typography,
shadows) and the **@untitledui/icons** icon set.

Aude.ai turns activity from Slack, GitHub, Confluence, and Jira into AI-powered performance
insights. This screen is the manager-facing view where a human reviews those insights and
takes coaching action — hence the "Initiate Coaching" and editable action-item flows.

## Sections

- **Sidebar** — primary nav (Home, Search, Personal Development, My Performance, Feedback,
  My Team) + Administration group, with a user profile footer.
- **Page header** — performance-history date range, plus `Yearly Insights`, `Mark Private`,
  and `Add Date` actions.
- **Employee card** — engineer identity (Clark Kent).
- **Performance Overview** — bar chart across competencies (Engineering Excellence,
  Innovative & Strategic Thinking, Trust & Integrity) with an AI-generated summary.
- **Patterns recognized from feedback** — bubble visualization of peer-feedback themes,
  plus editable, checkable coaching action items and an `Initiate Coaching` CTA
  (the human-in-the-loop step).
- **Projects assigned during this quarter** — selectable project list.
- **Goal Setting with manager** — competency-tagged goals.
- **Achievements** — progress-ring stat cards.

## Responsiveness

- **Desktop / laptop (≥1024px):** fixed left sidebar + centered content column.
- **Tablet & mobile (<1024px):** sidebar collapses into a hamburger-triggered drawer;
  cards, chart, action buttons, and stat grids reflow to single/stacked columns.

## Tech stack

- React 18 + TypeScript
- Vite
- Tailwind CSS v3 (Untitled UI tokens configured in `tailwind.config.js`)
- @untitledui/icons

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # type-check + production build
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/
    Icon.tsx              # icon registry (tree-shaken subset)
    layout/               # Sidebar, Topbar
    sections/             # one component per dashboard section
    ui/                   # Button, Badge, Card, Checkbox primitives
  data/dashboard.ts       # mock content for all sections
  lib/utils.ts            # cn() class helper
```

> Content is mock data in `src/data/dashboard.ts`; wire these to the Aude.ai APIs to make it live.
