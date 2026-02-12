# Creative Core — Final Handoff Pack (Phase 4)

## 1) Component map

> Reference docs: https://www.jolyui.dev/docs/introduction

| Section | Component | Doc URL | Registry URL (from component page) |
|---|---|---|---|
| Header | Magnetic | https://www.jolyui.dev/docs/components/creative/magnetic | Copy from component page “Registry”/CLI snippet |
| Hero | Image Sphere | https://www.jolyui.dev/docs/components/creative/image-sphere | Copy from component page “Registry”/CLI snippet |
| Hero (desktop) | Morphing Cursor | https://www.jolyui.dev/docs/components/creative/morphing-cursor | Copy from component page “Registry”/CLI snippet |
| Hero + Services title | Highlight Text | https://www.jolyui.dev/docs/components/text-animations/highlight-text | Copy from component page “Registry”/CLI snippet |
| Social Proof stats | Number Counter | https://www.jolyui.dev/docs/components/text-animations/number-counter | Copy from component page “Registry”/CLI snippet |
| Services | Bento Grid | https://www.jolyui.dev/docs/components/surfaces/bento-grid | Copy from component page “Registry”/CLI snippet |
| Case Studies filter | Vercel Tabs | https://www.jolyui.dev/docs/components/navigation/vercel-tabs | Copy from component page “Registry”/CLI snippet |
| Brand DNA Layers | Segmented Button | https://www.jolyui.dev/docs/components/inputs/segmented-button | Copy from component page “Registry”/CLI snippet |
| Case titles (desktop only) | Hover Preview | https://www.jolyui.dev/docs/components/creative/hover-preview | Copy from component page “Registry”/CLI snippet |
| Social Proof (optional) | Animated Tooltip | https://www.jolyui.dev/docs/components/feedback/animated-tooltip | Copy from component page “Registry”/CLI snippet |
| Process (optional) | Animated Beam | https://www.jolyui.dev/docs/components/creative/animated-beam | Copy from component page “Registry”/CLI snippet |
| Footer secondary tab (optional) | AI Prompt Box | https://www.jolyui.dev/docs/components/inputs/ai-prompt-box | Copy from component page “Registry”/CLI snippet |

Desktop-only: Morphing Cursor, Hover Preview.

## 2) Figma build instructions

- Create two frames: Desktop 1440 and Mobile 390.
- Define color styles exactly:
  - Brand Blue `#26437A`
  - Deep Navy `#1E335F`
  - CTA Orange `#E8874C`
  - Off-White `#E5E5E3`
  - Muted Border `#CBD2DC`
  - White `#FFFFFF`
- Define typography styles:
  - Playfair Display: H1 (72/1.1), Section title (48/1.2)
  - Inter: Body (20/1.6), Body mobile (16–18/1.6), UI labels (16)
- Grid:
  - Desktop: 12 columns, 80 margins, 24 gutters, content max 1280 centered.
  - Mobile: 4 columns, 20 side padding, 16 gutters.
- Auto Layout:
  - Section wrappers vertical stack with spacing tokens.
  - Major section spacing: 96–120 desktop / 64–80 mobile.
  - Minor strip spacing: 48–64 desktop / 32–48 mobile.
- Naming:
  - `S01_Header`, `S02_Hero`, ... `S08_Footer`
  - Components: `CC/Button/Primary`, `CC/Card/Glass`, `CC/Stat/Counter`.
- Effects:
  - Card radius: 20–24.
  - Border: `1px rgba(203,210,220,0.5)`.
  - Shadow: `0 4 20 rgba(30,51,95,0.08)`.

## 3) Copy drafts

- H1: **Ideas That Orbit Your Core.**
- Clarity line: **Brand strategy, identity, content, and 3D visuals that convert.**
- Hero subcopy: **We distill your essence and build systems that scale recognition, trust, and conversion.**
- Primary CTA: **Start Your Project**
- Secondary CTA: **See Our Work**
- Capability line: **Branding • Packaging • Content • Ads • 3D**

Services microcopy (2–3 lines max):
- Brand Strategy — Positioning and messaging systems that align product value with market demand.
- Visual Identity — Logos, typography, and color systems built for long-term recognition.
- Packaging — Shelf-ready systems balancing storytelling, compliance, and conversion.
- Content Systems — Repeatable content frameworks for campaign and always-on channels.
- Paid Creative — Ad concepts and variants optimized for performance without diluting brand equity.
- 3D Visuals — Premium product renders and motion assets with consistent warm-neutral styling.

Final CTA:
- Headline: **Ready to scale your brand?**
- Subcopy: **Let’s design a brand system that compounds across touchpoints, campaigns, and channels.**

## 4) QA checklist

Visual QA
- Palette matches exact hex values.
- Orange appears only in CTA/highlight/focus contexts.
- Typography hierarchy follows token scale.
- Cards use consistent border/radius/shadow.
- Portfolio imagery stays warm-neutral and consistent.

Responsive QA
- Desktop max content width never exceeds 1280.
- Mobile nav uses hamburger and touch targets >= 44px.
- Hero stacking order matches spec on 390 width.
- Services collapse to 1-column on mobile.
- Hover Preview disabled on mobile.
- Sticky bottom CTA visible on mobile only.

Performance QA
- LCP image optimized and dimensioned.
- Avoid heavy shadows/gradients and excessive JS animation.
- Motion remains low-amplitude and scoped.
- Reduced-motion preferences disable non-essential animation.

Accessibility QA
- Focus rings visible and orange.
- Keyboard navigation works across all controls.
- Contrast checks pass for text/background pairs.
- Form labels and semantics are present.
