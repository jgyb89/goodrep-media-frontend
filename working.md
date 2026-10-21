# Project State & Session Tracker

## 🎯 Current High-Level Goal
- Build, refine, and deploy the Good Rep Media marketing frontend using Astro and React, integrated with headless WordPress GraphQL and custom interactive components (GSAP animations, lead generation forms, portfolio showcases, and dedicated individual service detail pages).

## 🛠️ System Architecture & Stack
- **Framework:** Astro 7 (`@astrojs/react`, `@astrojs/sitemap`)
- **UI / Interactive Layer:** React 19 (`@types/react`, `@types/react-dom`), GSAP 3.15 animations (`ScrollTrigger`, `matchMedia`)
- **Backend / CMS:** Headless WordPress (Active Prototype: REST API adapter via `https://goodrep.media/wp-json/wp/v2`; Future/Production: `https://wp.goodrep.media/wp-json/wp/v2` or WPGraphQL)
- **Security & Sanitization:** `isomorphic-dompurify` for scrubbing inbound WordPress HTML (`post.content` & `post.excerpt`)
- **Styling:** Modular native CSS (`global.css`, `LeadForm.css`, `gutenberg.css`), BEM conventions, Material Symbols
- **Key Constraints:** Fast static/hybrid site generation with Astro, automated XML sitemap generation (`https://goodrep.media`), layout-shift-free GSAP hero text/graphic synchronization, strict WPGraphQL / GF REST payload handling.

## 🌐 WordPress CMS Integration & Production Cutover Architecture
- **Current State (Staging / Prototype):**
  - WordPress backend currently lives at apex domain: `https://goodrep.media` (LiteSpeed Web Server, PHP 8.2, IP `23.111.181.43`).
  - `wp.goodrep.media` does **not** have a DNS record yet (`NXDOMAIN`).
  - WPGraphQL is not currently installed on the server; POST requests to `/graphql` are blocked by Wordfence WAF (HTTP 403 Forbidden).
  - The native WordPress REST API (`/wp-json/wp/v2/posts?_embed`) is fully active with all **127 published blog articles**, rich excerpts, full content, featured images, and Yoast SEO metadata (`yoast_head_json`).
  - **Decision for Prototype (Option 1):** Connect via WordPress REST API adapter in `src/lib/api.js` pointing to `https://goodrep.media/wp-json/wp/v2`. This requires zero server changes and displays all 127 articles immediately across `/blog`, `/blog/[slug]`, and the homepage Knowledge Center.
- **Production Cutover Requirements (When Merging Staging to Live):**
  - When the new Astro frontend takes over the apex domain `https://goodrep.media`, WordPress must be retained on a dedicated subdomain so the team can continue to edit posts (`/wp-admin`) and the frontend can fetch data during builds.
  - **Cutover Step 1 (DNS & WordPress URL):** Create a DNS A-record for `wp.goodrep.media` pointing to `23.111.181.43` and update the WordPress Site URL / Home URL to `https://wp.goodrep.media`.
  - **Cutover Step 2 (Production Env Variable):** Set `PUBLIC_WORDPRESS_API_URL=https://wp.goodrep.media/wp-json/wp/v2` in the production hosting dashboard (Vercel, Netlify, Cloudflare, etc.). Zero frontend code changes required.
  - **Cutover Step 3 (Wordfence & CORS):** Ensure Wordfence and LiteSpeed allow API requests from the new host / domain for forms (`LeadForm`).
  - **Cutover Step 4 (Build Webhook):** Configure a WordPress publish webhook (e.g. *Deploy Hooks* plugin) to trigger an Astro rebuild whenever marketing publishes a new article.

## 📐 Master Page Templates & Design Consistency Rules
- **Core Principle:** Every group of same-type pages across the site **must** follow a single unified master template design for consistent branding, layout structure, typography, color tokens, and GSAP choreography—swapping in page-specific copy, metrics, and illustrations while preserving the shared look and feel:
  - **CRITICAL DESIGN RULE - Zero Text Occlusion (Never Cover Text with Graphical Elements):**
    - **Never cover, obscure, or collide with any text, headings, kickers, paragraphs, lists, or interactive controls with graphical elements, decorative art, floating satellites, or background assets at any viewport width or breakpoint.**
    - All floating graphics, badges, and satellites must be strictly anchored within their dedicated media containers, given explicit max-widths/percentages, configured with `pointer-events: none` where decorative, and spaced with sufficient margins/padding so typography is 100% visible, legible, and unhindered on all desktop, tablet, and mobile devices.
    - Component styles (such as `.consult__art`, `.hero-stage`, `.starts-feature__media`) must enforce strict bounding boxes and protective margins before text elements.
  - **CRITICAL DESIGN RULE - Element Combination & Anti-Clutter Limit (Exempting Homepage):**
    - **All element combinations across all pages (with the explicit exemption of the homepage) should only consist of:**
      1. **1 background** (optional, e.g. blue blob or subtle texture).
      2. **1 center graphic** (large centerpiece, ~58–64% width).
      3. **No more than 2 smaller accent graphics on opposite corners** (~18–24% width, e.g. top-left & lower-right).
      - **At most 3 graphics total** (1 large, 2 small) + optionally 1 background.
    - **Blob Corner Placement Rules:**
      - **Blob 1 (`blue-circular-background-graphic.svg`):** Left small graphic placed in **Lower-Left Corner** (`left: 6%; bottom: 10%–12%;`); Right small graphic placed in **Top-Right Corner** (`right: 6%; top: 6%–8%;`).
      - **Blob 2 (`blue-circular-background-2-graphic.svg`):** Left small graphic placed in **Top-Left Corner** (`left: 6%; top: 8%;`); Right small graphic placed in **Bottom-Right Corner** (`right: 6%; bottom: 10%;`).
      - Each blob's corner placement mirrors its actual geometry: Blob 1's protruding circular lobes are lower-left and top-right; Blob 2's protruding lobes are top-left and bottom-right.
    - **Computer Screen Exception:** Device screen graphics (such as blue and transparent computer screens / monitors) can hold **1 additional graphic within the screen display area**:
      - 1 computer screen, 1 small graphic within screen area (never a screen/device graphic), 2 smalls on opposite corners, and optionally 1 background.
    - **GSAP & Inline Styles Rule:** Never use `clearProps: "all"` on elements that rely on inline styles (`style="width: ...; left: ...;"`) for sizing or layout. Always use `clearProps: "transform,opacity"` to prevent browsers from reverting to intrinsic SVG dimensions and blowing up elements.
    - **No sprawling connector lines:** Do not include meandering dashed lines across stages or cards that create visual clutter and disorganized overlapping.
  1. **Individual Service Pages (`/services/*`):** Must strictly follow the modular template architecture implemented across [`src/pages/services/web-design.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/web-design.astro), [`ecommerce-web-design.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/ecommerce-web-design.astro), [`email-marketing.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/email-marketing.astro), and [`local-seo.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/local-seo.astro):
     - **Modular Component Breakdown:** Page files (`src/pages/services/*.astro`) are lightweight orchestration shells (~30–40 lines) with zero raw data or inline CSS/scripts. They import structured data from `src/data/*Data.js` and render modular components from `src/components/`:
       - `ServiceHero.astro`: Light background (`var(--color-bg)`) with radial cyan dot grid mask, pill `.breadcrumb`, `.service-hero__kicker`, compact single-line `.service-hero__title-top` (`var(--color-cyan)`) + 3D GSAP rotating `.service-hero__word` (`var(--color-primary)`), `.service-hero__checklist-card` (white card with `4px solid var(--color-cyan)` left border), `.service-hero__actions` (`Contact Us` + `Send Us a Message` modal trigger), multi-layered `.hero-stage` (`/Asset 2.webp` blob + main graphic + 4 floating satellites with pointer parallax), and dark bottom `.marquee` strip (`border-bottom: 4px solid var(--color-cyan)`).
       - `StartsSection.astro`: Multi-plane scroll parallax media stage with blob, floating satellites, glassmorphic `.starts-feature__pill`, and animated SVG circular progress `.mobile-callout`. Supports `mediaFirst` (left/right) layout and `light`/`bg` backgrounds.
       - `StatsBand.astro`: Dark geometric pattern with 50% opacity dark overlay (`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`), `border-top: 4px solid var(--color-cyan)`, glassmorphic `.stat-card` items, live GSAP number counters, and gradient meter bars.
       - `PillarsSection.astro`: 3 horizontal `.pillar-row-card` items (`4px solid var(--color-cyan)` left border, numbered badges, pill tags) paired with multi-plane parallax stage.
       - `ProcessSection.astro`: Native `<details class="step">` accordion with number icons, cyan pill tags, and synchronized dark `.process__stage` with progress bar, rotating blob, multi-layer visual scenes, and step dots.
       - `ReadyBand.astro`: `.ready-band__surface` with 50% opacity dark overlay over the SVG pattern, compelling CTA copy, and `.ready-band__art` (`/grm-partner-with-us.webp` + floating badges).
       - `DeliverablesGrid.astro`: 3-column `.deliverables__grid` of `.deliverable-card` articles featuring `.deliverable-card__medallion` (spinning dashed `.deliverable-card__orbit`, `.deliverable-card__icon-tile`, floating `.deliverable-card__accent`) and `.deliverable-card__metric` pill.
       - `ConsultSection.astro`: Cyan wave section with dual morphing `<svg class="consult__wave">`, floating `.consult__art`, direct phone/email links, and `.consult__card` with `<LeadForm />`.
     - **Isolated Data Layer (`src/data/*.js`):** All copy, steps, statistics, checklist points, and metadata reside cleanly in dedicated JS data files (`webDesignData.js`, `ecommerceWebDesignData.js`, `emailMarketingData.js`, `localSeoData.js`).
     - **Scoped CSS & GSAP Scripts:** Component-specific styles and GSAP timelines (`matchMedia`, `ScrollTrigger`, pointer physics) are encapsulated directly inside each child component's `<style>` and `<script>` tags, preventing cross-page style bleed and eliminating monolithic 3,000-line templates.
  2. **Individual "Our Work" Project Case Study Pages (`/work/[slug]`):** Will follow a dedicated master case study template design for consistency across all portfolio project deep-dives.
  3. **Individual Blog Article Pages (`/blog/[slug]`):** Follow the established 70/30 editorial + sticky conversion sidebar template in `src/pages/blog/[slug].astro`.

## 📌 Active Context & Files
- `src/layouts/MainLayout.astro` -> Global layout wrapper with DRY head metadata, navigation bar, consultation modal, and footer.
- `src/components/LeadForm.jsx` & `src/components/LeadForm.css` -> Interactive React Gravity Form island (Form ID 15) with fallback status feedback.
- `src/components/ServiceHero.astro` -> Reusable service hero with 3D rotator, checklist card, multi-plane parallax stage, and bottom marquee.
- `src/components/StartsSection.astro` -> Reusable spotlight section with multi-plane parallax art, progress ring callout, and checklist.
- `src/components/StatsBand.astro` -> Reusable glassmorphic stats ribbon with 50% overlay, live GSAP number counter, and meters.
- `src/components/PillarsSection.astro` -> Reusable 3-pillar row card layout paired with multi-plane parallax stage.
- `src/components/ProcessSection.astro` -> Reusable interactive accordion synchronized with dark progress stage and scenes.
- `src/components/ReadyBand.astro` -> Reusable dark breakout band with 50% overlay and parallax partner artwork.
- `src/components/DeliverablesGrid.astro` -> Reusable 3-column orbital medallion deliverables/strategies grid.
- `src/components/ConsultSection.astro` -> Reusable morphing SVG wave consultation funnel with floating art and LeadForm.
- `src/data/*.js` -> Dedicated data modules for each service (`webDesignData.js`, `ecommerceWebDesignData.js`, `emailMarketingData.js`, `localSeoData.js`, `technicalSeoData.js`, `linkBuildingData.js`, `amazonMarketingData.js`, `digitalMediaProductionData.js`, `smsMarketingData.js`, `videoProductionData.js`, `socialMediaData.js`).
- `src/pages/services/*.astro` -> Ultra-compact (~35 line) service page orchestrations importing from `src/data/` and rendering modular components.

## 🧱 Work Breakdown Structure (WBS)
- [x] Step 1: Initialize Astro project with React and GSAP integrations
- [x] Step 2: Implement GSAP headline rotation synchronized with graphical asset layouts in hero section
- [x] Step 3: Build lead capture system with interactive inputs and modal dialog (Form ID 15 schema mapped)
- [x] Step 4: Scaffold core site navigation, global layouts, and secondary pages (`/work`, `/about`, `/services`, `/blog`)
- [x] Step 5: Headless WordPress connection & blog setup:
  - [x] Dynamic blog route `src/pages/blog/[slug].astro` with `getStaticPaths`
  - [x] Content sanitization with `isomorphic-dompurify`
  - [x] Gutenberg CSS restoration for headless blocks (`gutenberg.css`)
  - [x] BEM blog feed index (`src/pages/blog/index.astro`)
  - [x] Automated XML sitemaps configuration (`@astrojs/sitemap`)
  - [x] Connect blog feed to live WordPress posts via REST API adapter (Option 1 for prototype)
  - [x] Integrate all 14 WordPress blog categories (`getCategories` + `DEFAULT_CATEGORIES`) with interactive pill filtering, article count badges, URL query sync (`?category=`), and live keyword search on `/blog`
  - [x] Responsive `/blog` category layout: sticky right-sidebar vertical category list on desktop (`> 980px`) alongside the article grid, sticky single-row horizontal scroll pill bar (`<= 980px`) with auto-centering active pill on tablet/phone, and toolbar search bar with reduced-size status indicator on its right
  - [x] Responsive `/blog` pagination & mobile load-more: Desktop displays 12 articles per page with accessible numbered pagination (`.blog-pagination`), previous/next navigation buttons, and URL `?page=` synchronization; Mobile (`<= 768px`) displays 6 articles initially with a styled interactive "Load More Articles" button (`.blog-load-more`) revealing the next 6 articles per tap with staggered GSAP entrance animations and real-time remaining count badges.
- [x] Step 6: Layout refinements & animation bug fixes:
  - [x] Adjust `ul.checklist` line-height to `2rem` in `services.astro`
  - [x] Fix stats ribbon disappearing text in `work.astro` (eliminated conflicting `data-reveal` and migrated to `gsap.fromTo` with `clearProps: "all"`)
- [x] Step 7: Build out dedicated individual pages per service (`/services/[service]`):
  - [x] **Website Design** (`src/pages/services/web-design.astro`) — Flagship Master Template
  - [x] **eCommerce Web Design** (`src/pages/services/ecommerce-web-design.astro`)
  - [x] **Email Marketing Services** (`src/pages/services/email-marketing.astro`)
  - [x] **Local SEO** (`src/pages/services/local-seo.astro`)
  - [x] **Technical SEO** (`src/pages/services/technical-seo.astro`)
  - [x] **Link Building Services** (`src/pages/services/link-building-services.astro` & `src/pages/services/link-building.astro`)
  - [x] **Amazon Marketing Services** (`src/pages/services/amazon-marketing-services.astro` & `src/pages/services/amazon-marketing.astro`)
  - [x] **Digital Media Production** (`src/pages/services/digital-media-production.astro` & `src/pages/services/digital-media.astro`)
  - [x] **SMS Marketing** (`src/pages/services/sms-marketing.astro` & `src/pages/services/sms-marketing-services.astro`)
  - [x] **Video Production** (`src/pages/services/video-production.astro` & `src/pages/services/video-production-services.astro`)
  - [x] **Social Media Marketing** (`src/pages/services/social-media.astro` & `src/pages/services/social-media-marketing.astro`)
  - [x] **Pay-per-click Marketing** (`src/pages/services/paid-ads.astro` & `src/pages/services/pay-per-click-marketing.astro`)
- [/] Step 8: End-to-end responsiveness, accessibility auditing, and performance optimization <!-- CURRENTLY WORKING HERE -->
- [ ] Step 9: Production cutover & security lockdown (WordPress subdomain setup, CORS whitelisting, build webhooks)

## 🪵 Session Progress Log
- **2026-10-16:**
  1. Configured `@astrojs/sitemap` with site URL `https://goodrep.media` to generate automated `sitemap-index.xml` and `sitemap-0.xml`.
  2. Implemented XSS hardening via `isomorphic-dompurify` in `src/pages/blog/[slug].astro`.
  3. Extracted DRY master layout `src/layouts/MainLayout.astro` and applied it across all top-level routes.
  4. Formatted Gravity Forms LeadForm component for Form ID 15 payload compatibility.
  5. Adjusted `services.astro` checklist typography (`line-height: 2rem`).
  6. Resolved `work.astro` `.stats-bar` animation bug where numbers vanished post-animation due to duplicate `data-reveal` triggers.
  7. Architected and implemented `src/pages/services/web-design.astro` with kinetic GSAP choreography, multi-scene interactive process stage, and deliverable cards.
- **2026-10-17:**
  1. Investigated blog connection failure: discovered `wp.goodrep.media` lacks DNS resolution, and live WordPress backend at `goodrep.media` lacks WPGraphQL / has Wordfence WAF blocking GraphQL POST queries.
  2. Discovered 127 published articles fully accessible via native WordPress REST API at `https://goodrep.media/wp-json/wp/v2/posts`.
  3. Documented production cutover architecture and decided on Option 1 (native REST adapter) for the prototype to display live articles immediately.
  4. Implemented universal WordPress REST API adapter in `src/lib/api.js`, updated `.env` and `.env.local` to `https://goodrep.media/wp-json/wp/v2`, and verified production build: 133 total pages pre-rendered (127 individual article pages + master feed + homepage Knowledge Center + XML sitemaps).
  5. Integrated all 14 WordPress categories into `src/lib/api.js` and `src/pages/blog/index.astro` with interactive category pill filtering, count badges, clickable post category tags, URL query parameter syncing (`?category=<slug>`), live keyword search, HTML entity decoding, and build-time bulk post caching (reducing full 133-page static build time from 71s to 8.8s).
  6. Refined `/blog` layout in `src/pages/blog/index.astro`: moved sticky vertical category navigation list to the **right side** on desktop (`> 980px`), moved the search bar into the feed toolbar, reduced the font size of the blog feed status (`0.84rem`), and aligned it directly to the right of the search bar, with mobile/tablet retaining the single-row horizontal pill scroll.
- **2026-10-18:**
  1. Implemented responsive pagination & mobile load-more on `/blog` (`src/pages/blog/index.astro`):
     - **Desktop (`> 768px`):** Lists 12 articles at a time with smart numbered pagination (Prev, 1, 2, 3... Next), smooth scroll to the top of the grid upon page navigation, and URL query parameter sync (`?page=`).
     - **Mobile (`<= 768px`):** Displays 6 articles initially with a styled interactive "Load More Articles" button that dynamically reveals the next 6 articles per tap, showing remaining counts, and smoothly animating newly appended cards via GSAP.
     - **Filter & Search Synchronization:** Seamlessly resets pagination to page 1 / 6 articles on category or search changes, with empty state handling and window resize listeners.
     - Verified with clean build (133 pages built in 8.9s).
  2. Fixed and upgraded `#blog-pagination-pages` button styling in `src/pages/blog/index.astro`:
     - Identified root cause of unstyled/beveled page buttons: client-side dynamically generated buttons (`document.createElement`) lacked Astro's scoped data attribute.
     - Resolved via `:global(.blog-pagination__page)` and `:global(.blog-pagination__ellipsis)` rules.
     - Redesigned `#blog-pagination-pages` as a modern pill capsule (`border-radius: 999px`, white background with subtle shadow) with circular page buttons (`2.35rem` diameter), cyan pill active indicator with drop glow, soft cyan hover transitions (`translateY(-1px)`), and cohesive typography matching the Previous/Next pill buttons.
  3. Diagnosed and resolved missing media connections in `src/pages/blog/[slug].astro`, `src/lib/api.js`, and `src/styles/gutenberg.css`:
     - **Media Connection (`src/lib/api.js`):** Added `getMediaById(id)` to query the WordPress `/wp-json/wp/v2/media` endpoint, safe cross-environment `API_URL` fallback, multi-source resolution in `normalizePost` (checking `_embedded['wp:featuredmedia']`, image sizes, jetpack/media URLs), and single-post media fallback resolution.
     - **Hero & Content Media (`src/pages/blog/[slug].astro`):** Updated template to render high-resolution featured hero media (`post.featuredImage.node.sourceUrl`) with alt text and eager loading, interactive breadcrumb navigation, category tags, reading time calculation, date metadata, author card, and sticky sidebar funnel. Passed pre-resolved post objects from `getStaticPaths` via `props: { post }` to streamline static generation.
     - **Content Media Styling (`src/styles/gutenberg.css`):** Added responsive rules for `.post-layout__content img` (`max-width: 100%`, `height: auto`), figure/caption formatting, responsive `iframe` video embeds, and mobile float resets so inline WordPress imagery never overflows or breaks layouts.
     - **Build Verification:** Verified complete static build generating all 133 pages with 126 featured card images on `/blog` and hero images across all 127 individual article pages.
  4. Removed sidebar LeadForm on `/blog/[slug].astro` and researched automated AI summary architecture:
     - Removed `<LeadForm />` from the right sidebar of `src/pages/blog/[slug].astro` and replaced it with a sleek callout card linking to the consultation funnel.
     - Formulated comprehensive architectural plan for automated article summaries in the right sidebar (`automated-blog-summary-plan.md`).
  5. Fixed sidebar CTA button containment & overflow bug on `/blog/[slug].astro`:
     - Added global `*, *::before, *::after { box-sizing: border-box; }` reset to `src/styles/global.css`.
     - Explicitly enforced `box-sizing: border-box; width: 100%; max-width: 100%;` on `.post-sidebar-card` and `.post-sidebar-card__cta` in `src/pages/blog/[slug].astro`, preventing padding from pushing the button outside the card boundaries.
  6. Updated `/work` (`src/pages/work.astro`) project graphics and `.window-graphic` container:
     - Replaced the case study graphics with all 6 `*-project-card.jpg` images (`cape-coral-lawn-care-project-card.jpg`, `coral-breeze-project-card.jpg`, `deez-teez-project-card.jpg`, `joey-matterhorn-project-card.jpg`, `jojo-coffee-project-card.jpg`, `pink-slushy-project-card.jpg`).
     - Wrapped each project image in a `.window-graphic` container featuring the browser top bar (`.window-graphic__dots`), `.window-graphic__body`, `800 / 1050` aspect ratio framing, and balanced alternating grid columns.
  7. Refined `/work` project lineup and created branded placeholders:
     - Replaced Deez Teez with **Glowing Results Skin Spa** (`glowing-result-skin-spa-project.jpg`).
     - Replaced Joey Matterhorn with **Be Balanced Bodyworks** and JoJo Coffee with **Cape Coral Reviewed** (using client-provided copy, metrics, and deliverables).
     - Generated dedicated high-resolution `800 × 1050` branded placeholders (`be-balanced-project-card-placeholder.webp` and `cape-coral-reviewed-project-card-placeholder.webp`) inside `.window-graphic`.
- **2026-10-19:**
  1. Created branch `page-productions`, staged all accumulated changes, committed (`feat(work): update project showcase cards and container styling`), and pushed upstream to GitHub.
  2. Updated homepage (`src/pages/index.astro`) "Our Work" section: replaced the composite layered illustration in `.work__art` with [goodrep-our-work-grid.webp](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/public/Good%20Rep%20Our%20Work%20Website%20Graphics/goodrep-our-work-grid.webp) (`957 × 876`), optimized the frame container, elevation shadow, and hover states.
  3. Added global **Services Mega Menu** to `src/layouts/MainLayout.astro`:
     - Full-width charcoal panel (`#2b2b2b`) with 4 service category columns (*Web Design and Build*, *Search Engine Optimization*, *Digital Media*, and *Paid Media*), white underlined headings, and 12 dedicated `/services/*` route links.
     - Added active/hover cyan state with a rotating caret and primary red underline on the `Services` trigger (`setupMegaMenu()` with pointer, focus, and `Escape` keyboard support).
  4. Built out dedicated **eCommerce Web Design** service detail page (`src/pages/services/ecommerce-web-design.astro`):
     - Completely aligned with the design system, typography, tokens, and layout rhythm of `web-design.astro`.
     - Mirrored `web-design.astro` styling: pill capsule breadcrumbs, cyan/red rotator headline (`.service-hero__title-top` / `.service-hero__word`), 4px cyan bordered checklist card, multi-plane floating hero composition, dark marquee, `.starts-section` with multi-plane scrub parallax, SVG circular animated mobile callout meter (`.mobile-callout`), dark geometric pattern `.stats-band` with live counter animations, 4-step accordion with interactive stage (`.process__stage`) and progress bar, dark `.ready-band` with parallax art, 6 orbital medallion deliverable cards (`.deliverable-card__orbit`), and the morphing wave consultation funnel (`.consult__wave`).
     - Extracted and integrated graphics matching the client screenshots: `/GRM Web Graphics/grm-ecommerce-setup.webp`, `grm-ecommerce-store-easy.webp`, `grm-ecommerce-setup-critical.webp`, `/grm-partner-with-us.webp`, and `grm-ecommerce-product-packages.webp`.
     - Integrated the 4-phase process accordion with client-specified copy (*Research and Onboarding*, *Expert Site Construction*, *Testing and Optimization*, *Seamless Launch*) and synchronized interactive stage.
     - Verified static build passes cleanly (all 134 pages pre-rendered).
  5. Updated `.stats-band` background across service pages (`src/pages/services/web-design.astro` and `src/pages/services/ecommerce-web-design.astro`):
     - Added a 50% opacity dark-color layer (`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`) directly over the SVG geometric pattern in the CSS `background` stack.
     - Dims the background diagonal pill shapes so they recede softly without affecting the foreground text, statistics numbers, meters, or glassmorphic cards.
  6. Updated `.ready-band__surface` background across service pages (`src/pages/services/web-design.astro` and `src/pages/services/ecommerce-web-design.astro`):
     - Added the matching 50% opacity dark-color layer (`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`) over the SVG diagonal background pattern in `.ready-band__surface`.
     - Subtly softens the background graphics and preserves full foreground readability and art prominence.
  7. Optimized `.service-hero__title` and rotator sizing across service pages (`src/pages/services/web-design.astro` and `src/pages/services/ecommerce-web-design.astro`):
     - Scaled headline font size to `clamp(1.65rem, 2.7vw, 2.35rem)` with `line-height: 1.12` and added `white-space: nowrap` to `.service-hero__title-top` so that "Websites Engineered For" and "eCommerce Stores Built For" stay cleanly on a single line without wrapping.
     - Reduced hero padding and vertical margins to decrease overall hero height, ensuring the key highlights, checklist card, and CTAs remain immediately visible above the fold on initial page load.
  8. Built and aligned dedicated **Email Marketing Services** page (`src/pages/services/email-marketing.astro`) to strictly follow the `web-design.astro` master template:
     - Replicated the exact hero layout (`.service-hero` light background with cyan radial dot grid, pill `.breadcrumb`, `.service-hero__kicker`, compact 1-line `.service-hero__title-top` + 3D GSAP rotating `.service-hero__word`, 4px cyan-bordered `.service-hero__checklist-card`, `.service-hero__actions`, multi-plane `.hero-stage` with `/Asset 2.webp` blob + `grm-email-header.webp` + 4 floating satellites, and bottom `.marquee`).
     - Replicated `.starts-section` multi-plane parallax spotlight for *"Are You Underestimating Email Marketing?"* (`grm-email-importance.webp` + animated `$44+` SVG progress ring `.mobile-callout`).
     - Replicated `.stats-band` with 50% dark layer over SVG pattern and animated counters (`4,300%`, `$44+`, `60%`, `75%`).
     - Designed **"THE PILLARS: Why Do Our Email Campaigns Work?"** inside a reversed `.starts-section` (`grm-email-powerful-done-correctly.webp` parallax stage on the right, and 3 horizontal `.pillar-row-card` items on the left featuring `4px solid var(--color-cyan)` left borders, numbered badges, cyan soft icon boxes, and pill tags—visually distinct from the 6-card orbital medallion grid while 100% consistent with `web-design.astro` styling).
     - Replicated `.process` interactive `<details class="step">` accordion and dark `.process__stage` for *"EMAIL GOALS: Roles of Email Marketing"*.
     - Replicated `.deliverables` orbital medallion grids (`.deliverable-card__medallion` with spinning `.deliverable-card__orbit` and floating accents) for *"OUR STRATEGIES"* and *"WHY EMAIL: What Can Email Marketing Do?"*, separated by the dark `.ready-band` breakout section (`/grm-partner-with-us.webp`).
     - Replicated `.consult` funnel with dual morphing SVG wave paths, floating `.consult__art`, and `<LeadForm />`.
     - Documented the **Master Page Templates & Design Consistency Rules** in `working.md` for all same-type pages (services, our-work project pages, blog posts).
  9. Built out dedicated **Local SEO** service detail page (`src/pages/services/local-seo.astro`):
     - Extracted all content from `https://goodrep.media/services/local-seo/` and mapped it strictly to the `web-design.astro` master template.
     - **Hero (`.service-hero`):** Compact single-line headline (`Local SEO Engineered For` + 3D GSAP rotating words: `"Google Maps Top 3"`, `"High-Intent Local Leads"`, `"50+ Directory Citations"`, `"Nearby Buyer Traffic"`), exact lead copy, 5-point Local SEO checklist card, CTAs, multi-plane `.hero-stage` with `/grm-local-seo.webp` + 4 floating satellites, and dark `.marquee` strip.
     - **Spotlight (`.starts-section`):** *"MOST COMPANIES DON'T UNDERSTAND... The #1 Local SEO Mistake"* (16% vs. 84% non-branded search insight + *Trust Comes First* narrative) paired with `/GRM Web Graphics/good-rep-media-marketing.webp` parallax stage and animated 72% SVG circular progress `.mobile-callout` (HubSpot stat).
     - **Stats Band (`.stats-band`):** 50% dark layer over SVG pattern + 4 animated counters (`+200%` 'near me' growth, `93%` local searchers, `76%` visit within 24 hours, `90%` read Google Maps reviews).
     - **The Pillars (`.pillars-section`):** *"THE PILLARS: How We Boost Local SEO"* featuring 3 `.pillar-row-card` items (*Google Business Profile*, *Get Listed EVERYWHERE*, *Website Development & SEO*) alongside `/grm-attract-users-resources.webp` multi-plane parallax stage.
     - **Interactive Accordion & Stage (`.process`):** *"SEO FOR LOCAL BUSINESSES IS A MUST: Why Local SEO is Crucial for Small Business"* 4-step `<details class="step">` accordion (*Capture Active Buyers*, *Stop Being Invisible*, *Build Better Relationships*, *Affordable and Powerful*) synchronized with dark `.process__stage`.
     - **Deliverables & Facts Grids (`.deliverables`):** 9 orbital medallion cards for *"OUR PROCESS: How We Optimize Your Local SEO Long Term"* and 9 orbital medallion cards for *"THE FACTS: Eye-Opening Local SEO Facts"*, separated by the dark `.ready-band` breakout section (*"Improve Your Local SEO Results and Get You More Customers?"* with `/grm-partner-with-us.webp`).
     - **Consultation Funnel (`.consult`):** Dual morphing SVG waves, floating art, and `<LeadForm client:visible submitLabel="Book My Free Local SEO Audit" />`.
  10. Refactored all Service Pages into a Modular Component Architecture:
      - **Extracted UI Components (`src/components/`):** Created 8 reusable, self-contained Astro components (`ServiceHero.astro`, `StartsSection.astro`, `StatsBand.astro`, `PillarsSection.astro`, `ProcessSection.astro`, `ReadyBand.astro`, `DeliverablesGrid.astro`, and `ConsultSection.astro`).
      - **Isolated Data Layer (`src/data/`):** Created dedicated data files (`webDesignData.js`, `ecommerceWebDesignData.js`, `emailMarketingData.js`, and `localSeoData.js`) containing all metadata, copy, step definitions, metric items, and checklist arrays. Frontmatter in `.astro` service files is completely free of raw content data.
      - **Scoped CSS & GSAP Animations:** Distributed styles and GSAP timelines directly into their respective child components. Scoped query selectors ensure parallax physics, counters, and scroll triggers operate safely without cross-page pollution.
      - **Dramatically Streamlined Page Shells:** Reduced service pages (`web-design.astro`, `ecommerce-web-design.astro`, `email-marketing.astro`, and `local-seo.astro`) from 12,304 lines of monolithic duplicate code down to 148 lines (~35 lines each), achieving a 98.8% codebase reduction while maintaining 100% visual and behavioral parity.
      - **Build Verification & Git Commit:** Tested and verified with `npm run build`—all 136 pages built cleanly with 0 errors in 9.15s. Committed to `page-productions` branch (`c0d74ef: refactor(services): extract modular UI components, isolate data arrays, and scope styles/scripts`).
  11. Built out dedicated **Technical SEO** service detail page (`src/pages/services/technical-seo.astro`):
      - Created dedicated data module `src/data/technicalSeoData.js` isolating all page copy, metrics, and step objects; kept `technical-seo.astro` to 37 lines.
      - **Hero (`.service-hero`):** Compact single-line title (`Technical SEO Engineered For` + 3D GSAP rotating words: `"Google Top Crawlability"`, `"Sub-Second Page Speeds"`, `"Zero Broken Links & Schema"`, `"Maximum Core Web Vitals"`), lead copy, 5-point Technical SEO checklist card, CTAs, and multi-plane `.hero-stage` with `/grm-technical-seo-services.webp` + 4 floating satellites.
      - **Spotlight (`.starts-section`):** *"THE MOST OVERLOOKED FORM OF SEO: What is Technical SEO & Why Does It Dictate Your Ranking?"* paired with `/grm-technical-seo-services.webp` parallax stage and animated 53% SVG circular progress mobile abandonment callout.
      - **Stats Band (`.stats-band`):** 50% dark overlay over geometric SVG pattern with 4 live animated counters (`-20%` conversion loss per second delay, `53%` mobile bounce >3s, `-16%` customer satisfaction drop, `100%` clean crawlability & schema target).
      - **The Pillars (`.pillars-section`):** *"THE PILLARS: How We Boost Technical SEO"* featuring 3 `.pillar-row-card` items (*Proven Success*, *Data-Driven Strategies*, *An Expert Team*) alongside `/grm-attract-users-resources.webp` parallax stage.
      - **Interactive Accordion & Stage (`.process`):** *"TECHNICAL SEO IS A MUST: Why Technical SEO is Crucial for Small Business"* 4-step accordion (*User Experience is King*, *Look Great to Search Engines*, *Don’t Lose Potential Customers*, *Stay Ahead of the Competition*) synchronized with dark `.process__stage`.
      - **Ranking Factor Checklist (`.starts-section`):** *"YOUR TICKET TO RANKING: Boost Rankings Without Creating New Content"* 7-point technical audit checklist paired with `/GRM Web Graphics/good-rep-media-marketing.webp` parallax stage.
      - **Ready Breakout Band (`.ready-band`):** *"Strengthen and Refine Your Technical SEO for Higher Rankings"* with 50% dark overlay and `/grm-partner-with-us.webp`.
      - **Strategies Grid (`.deliverables`):** 6 orbital medallion cards for *"Our Technical SEO Strategies"* (*Technical SEO Audit*, *Competitive Analysis*, *Speed Tune-Up*, *Optimize Images*, *Analyzing Meta Data*, *Data Markup Structure*).
      - **Consultation Funnel (`.consult`):** Dual morphing SVG waves, floating art, and `<LeadForm client:visible submitLabel="Book My Free Technical SEO Audit" />`.
      - **Build Verification:** Tested with `npm run build`—all 137 pages generated cleanly in 11.34s with 0 errors.
  12. Built out dedicated **Link Building Services** pages (`src/pages/services/link-building-services.astro` & `src/pages/services/link-building.astro`):
      - Created dedicated data module `src/data/linkBuildingData.js` isolating all page copy, metrics, and step objects; kept both page shells to ~37 lines.
      - Supported dual routing for `/services/link-building-services` and `/services/link-building` to prevent 404s from either navigation format.
      - **Hero (`.service-hero`):** Compact single-line title (`Link Building Engineered For` + 3D GSAP rotating words: `"First-Page Domain Authority"`, `"High-DA Editorial Backlinks"`, `"100% White-Hat Outreach"`, `"Compounding Organic Traffic"`), exact lead copy, 5-point Link Building checklist card, CTAs, and multi-plane `.hero-stage` with `/GRM Web Graphics/GRM-link-building-graphic.webp` (`3251 × 2250`) + 4 floating satellites.
      - **Spotlight (`.starts-section`):** *"MOST COMPANIES DON'T UNDERSTAND... Why Link Building is Critical to SEO & Domain Authority"* paired with `/GRM Web Graphics/GRM-link-building-seo.webp` (`2878 × 2250`) parallax stage and animated 92% SVG circular progress Google ranking factor callout.
      - **Stats Band (`.stats-band`):** 50% dark overlay over geometric pattern with 4 live animated counters (`92%` top pages have backlinks, `+300%` organic referral growth, `66%` web pages have zero links, `100%` white-hat methodology).
      - **The Pillars (`.pillars-section`):** *"THE PILLARS: What is the Good Rep Way?"* featuring 3 `.pillar-row-card` items (*High Authority Domains*, *Tailor Made Strategies*, *An Expert Team*) paired with `/grm-attract-users-resources.webp` parallax stage.
      - **Interactive Accordion & Stage (`.process`):** *"OUR PROCESS: The Right Way to Approach a Backlink Strategy"* 4-step accordion (*Create Outstanding Content*, *Strict White Hat Methods*, *High-Authority Relevance*, *Toxic Link Audits & Disavow*) synchronized with dark `.process__stage`.
      - **Pitfalls Checklist (`.starts-section`):** *"AVOID THE PITFALLS: Backlinks from High DA Sites - What Mistakes Do Companies Make?"* 4-point risk checklist paired with `/GRM Web Graphics/good-rep-media-marketing.webp` parallax stage.
      - **9-Card Strategy Grid (`.deliverables`):** *"OUR STRATEGIES: Our Link Building Strategies"* (*Backlink Audits*, *Keyword Strategies*, *Competitive Analysis*, *Relationship Management*, *Broken Link Repair*, *Targeted Content Edits*, *Guest Posting*, *Press Releases*, *Brand Placement*).
      - **Ready Breakout Band (`.ready-band`):** *"A Backlink Strategy that Improves Your SEO Rankings"* with 50% dark overlay and `/grm-partner-with-us.webp`.
      - **Working with Good Rep Grid (`.deliverables`):** *"WORKING WITH GOODREP: When You Work with Good Rep for Your Backlinking"* 6-card methodology grid (*Strategy Meetings*, *In-Depth Website Audit*, *Identify Clear Goals*, *White Hat Link Building*, *Grow Your Target Audience*, *An Expert Link Building Team*).
      - **Consultation Funnel (`.consult`):** Dual morphing SVG waves, floating art collage, and `<LeadForm client:visible submitLabel="Book My Free Link Building Audit" />`.
      - **Build Verification:** Tested with `npm run build`—all 139 pages generated cleanly in 11.77s with 0 errors.
  13. Built out dedicated **Amazon Marketing Services** pages (`src/pages/services/amazon-marketing-services.astro` & `src/pages/services/amazon-marketing.astro`):
      - Created dedicated data module `src/data/amazonMarketingData.js` isolating all page copy, metrics, and step objects; kept both page shells to ~37 lines.
      - Supported dual routing for `/services/amazon-marketing-services` and `/services/amazon-marketing` to match all navigation patterns and prevent 404s.
      - **Hero (`.service-hero`):** Compact single-line title (`Amazon Marketing Engineered For` + 3D GSAP rotating words: `"Top-Ranking Buy Box Wins"`, `"Sponsored Brand Dominance"`, `"Maximum ROAS & Low ACoS"`, `"Custom Storefront Growth"`), exact lead copy, 5-point Amazon Marketing checklist card, CTAs, and multi-plane `.hero-stage` with `/GRM Web Graphics/GRM-amazon-marketplace-services.webp` (`2878 × 2250`) + 4 floating satellites.
      - **Spotlight (`.starts-section`):** *"AMAZON THE RIGHT WAY: Maximize Your Sales Potential with Amazon Marketing Services"* paired with `/GRM Web Graphics/GRM-why-amazon-marketplace-services.webp` (`2878 × 2250`) parallax stage and animated 66% SVG circular progress buyer search dominance callout.
      - **Stats Band (`.stats-band`):** 50% dark overlay over geometric pattern with 4 live animated counters (`66%` of product searches start on Amazon, `300M+` active customer accounts, `+45%` average organic sales lift, `100%` transparency & money-back guarantee).
      - **The Pillars (`.pillars-section`):** *"THE PILLARS: How Do We Make it Happen?"* featuring 3 `.pillar-row-card` items (*Meaningful Onboarding*, *Knowing the Platforms*, *Paid and Organic Mix*) paired with `/grm-attract-users-resources.webp` parallax stage.
      - **Interactive Accordion & Stage (`.process`):** *"OUR PROCESS: Our Amazon Marketing Services"* 4-step accordion (*Sponsored Products*, *Sponsored Brands*, *Amazon Brand Stores*, *Sponsored Display & DSP*) synchronized with dark `.process__stage`.
      - **Approach Spotlight (`.starts-section`):** *"OUR APPROACH TO AMAZON MARKETING: It Goes Beyond Just Being on Amazon"* 5-point management checklist paired with `/GRM Web Graphics/good-rep-media-marketing.webp` parallax stage.
      - **Deliverables Grid (`.deliverables`):** *"STRATEGIC CAPABILITIES: Comprehensive Amazon Growth Solutions"* 6 orbital medallion cards (*Keyword Research & Bidding*, *Listing Optimization & Copywriting*, *A+ Enhanced Brand Content*, *Amazon Brand Storefronts*, *Competitor Conquesting*, *Analytics & Monthly Reporting*).
      - **Ready Breakout Band (`.ready-band`):** *"Why Choose Us to Grow Your Amazon Store"* with 50% dark overlay, partner artwork `/grm-partner-with-us.webp`, and 100% money-back guarantee badge.
      - **Consultation Funnel (`.consult`):** Dual morphing SVG waves, floating art collage, and `<LeadForm client:visible submitLabel="Book My Free Amazon Audit" />`.
      - **Build Verification:** Tested with `npm run build`—all 141 pages generated cleanly in 11.44s with 0 errors.
  14. **Design Quality Fix - Zero Text Occlusion & Consultation Art Standardization:**
      - Resolved graphical element collision on `src/pages/services/amazon-marketing-services.astro` (and across service data files) where unconstrained floating decorative assets were protruding into the consultation kicker and headline text (`media_1792462931229_034a98d5.png`).
      - Updated `src/components/ConsultSection.astro` with strict `pointer-events: none` on art layers, added defensive sizing (`max-width: 38%`) on `.consult__art-float`, increased clearance margin below art to `2rem`, and added explicit bounding styles for `.consult__float--top` and `.consult__float--bottom`.
      - Aligned `amazonMarketingData.js`, `technicalSeoData.js`, and `linkBuildingData.js` with the master template consultation art (`/Asset 48.webp` with chat, megaphone, handshake, and heart satellites).
      - Documented the rule explicitly in Section 28: Never cover or occlude text with graphical elements at any breakpoint.
  15. **Built out dedicated Digital Media Production pages (`src/pages/services/digital-media-production.astro` & `src/pages/services/digital-media.astro`):**
      - Extracted live content and structure from `https://goodrep.media/services/digital-media-production/` via WordPress REST API and page analysis.
      - Created dedicated data module `src/data/digitalMediaProductionData.js` isolating all page copy, metrics, and step objects; kept both page shells to ~41 lines.
      - Supported dual routing for `/services/digital-media-production` and `/services/digital-media` to match all navigation links and prevent 404s.
      - **Hero (`.service-hero`):** Compact single-line title (`Digital Media Production Built For` + 3D GSAP rotating words: `"Brand Authority & Reach"`, `"Commercial-Grade Video"`, `"High-Impact Graphic Design"`, `"Memorable Visual Identity"`), exact lead copy, 5-point production checklist card, CTAs, and multi-plane `.hero-stage` with `/GRM Web Graphics/grm-digital-media-production.webp` (`1909 × 1392`) + 4 floating satellites.
      - **Spotlight (`.starts-section`):** *"VISUAL ASSETS THAT CONVERT: Photos, Videos, and Graphics for Your Small Business"* paired with `/GRM Web Graphics/grm-video-marketing.webp` (`1942 × 1397`) parallax stage and animated 94% SVG circular progress visual first impressions callout.
      - **Stats Band (`.stats-band`):** 50% dark overlay over geometric pattern with 4 live animated counters (`94%` first impressions are design-driven, `88%` more time on pages with video, `2.1x` higher social engagement, `100%` satisfaction guarantee).
      - **The Pillars (`.pillars-section`):** *"THE PILLARS: Why Partner with Good Rep Media for Production?"* featuring 3 `.pillar-row-card` items (*Affordable Pricing Tailored to Your Exact Project*, *Guidance and Expertise to Get the Best Final Design*, *Clear, Consistent Branding That Tells Your Story*) paired with `/GRM Web Graphics/gmr-affordable.webp` parallax stage.
      - **Interactive Accordion & Stage (`.process`):** *"OUR PROCESS: Get Creative, Memorable Digital Designs of Any Kind"* 4-step accordion (*Discuss Your Needs*, *Collaboration and Consultation*, *Creating Your Design*, *Keep Looking Good*) synchronized with dark `.process__stage`.
      - **Approach Spotlight (`.starts-section`):** *"A LONG-TERM DESIGN PARTNER: A Creative Production Department Dedicated to Your Business"* paired with `/GRM Web Graphics/good-rep-media-marketing.webp` parallax stage and 100% full commercial asset ownership callout.
      - **Deliverables Grid (`.deliverables`):** *"STRATEGIC CAPABILITIES: Comprehensive Digital Media Production Services"* 6 orbital medallion cards (*Graphic Design*, *Commercial Photography*, *Video Production*, *Logo Design & Identity*, *Print & Merchandise Collateral*, *Brand Guidelines & Systems*).
      - **Ready Breakout Band (`.ready-band`):** *"Elevate Your Brand with Professional Digital Media"* with 50% dark overlay, partner artwork `/grm-partner-with-us.webp`, and 100% money-back guarantee badge.
      - **Consultation Funnel (`.consult`):** Dual morphing SVG waves, standard template floating art collage (`/Asset 48.webp` + satellites), and `<LeadForm client:visible submitLabel="Book My Free Creative Consultation" />`.
      - **Build Verification:** Tested with `npm run build`—all 143 pages generated cleanly in 11.76s with 0 errors.
  16. **Migrated Entire Frontend to Semantic Vector Assets (`public/grm-web-assets/`, `public/grm-web-icons/`, `public/grm-logos/`) & Multi-Layered SVG Compositions:**
      - **Zero Broken Images / Zero `Asset #.webp` References:** Audited all 90+ unique asset paths across `src/layouts/`, `src/pages/`, `src/components/`, and `src/data/` and replaced every legacy `/Asset #.webp`, `/GRM Web Graphics/*.webp`, `/grm-*.webp`, and `/icons/*.svg` path with semantic named `.svg` graphics from `public/grm-web-assets/`, `public/grm-web-icons/`, and `public/grm-logos/`.
      - **Multi-Layered SVG Stage Architecture & GSAP Animations:** Upgraded shared stage components (`ServiceHero.astro`, `StartsSection.astro`, `PillarsSection.astro`, `ProcessSection.astro`, `ReadyBand.astro`, `ConsultSection.astro`) and page stages (`index.astro`, `services.astro`, `about.astro`, `work.astro`, `blog/index.astro`) to composite `blue-circular-background-graphic.svg` / `blue-circular-background-2-graphic.svg`, connector lines (`dashed-lines-l-shaped-graphic.svg`, `dashed-line-bend-graphic.svg`, `dashed-line-straight-graphic.svg`), primary device/storefront centerpiece SVGs, secondary window/browser SVGs, and floating accent badges animated via GSAP (`[data-float]` yoyo bobbing, entrance staggers, pointer/scroll parallax) and CSS hover transitions.
      - **Zero Text Occlusion Compliance:** Tuned aspect ratios and `object-fit: contain` bounds across all stage containers so ~1:1 viewBox SVGs remain strictly inside their media boxes and never collide with or occlude text at any breakpoint.
      - **Navigation & Route Link Fixes:** Updated broken navigation and card links in `MainLayout.astro` and `services.astro` (`/services/local-seo`, `/services/digital-media-production`, `/services/email-marketing`, `/services#social-media`, `/services#paid-ads`) and verified with `astro build` (143 pages built with 0 errors).
  17. **Standardized Minimalist Decluttering Rule Across All Graphic Compositions (Exempting Homepage):**
      - **Composition Rule:** To eliminate messy visual overlap and chaotic clutter across the site, all element combinations outside the homepage must consist of:
        1. **1 background** (optional, e.g. `blue-circular-background-graphic.svg` or `blue-circular-background-2-graphic.svg`).
        2. **1 center graphic** (large centerpiece, ~58–64% width, centered).
        3. **No more than 2 smaller accent graphics on opposite corners** (~18–24% width, e.g. top-right & bottom-left, or top-left & bottom-right).
        - Maximum 3 graphics total (1 large, 2 small) + optionally 1 background.
      - **Computer Screen Exception:** Device screens (such as `mac-computer-monitor-cyan-screen-background-graphic.svg`) can hold **1 additional graphic within the screen display area** (~26–30% width, centered inside screen):
        - 1 computer screen + 1 small within screen + 2 smalls on opposite corners + optionally 1 background.
      - **Eliminated Connector Lines:** Removed sprawling dashed lines (`dashed-lines-l-shaped-graphic.svg`, `dashed-line-bend-graphic.svg`) from stages and cards to keep compositions clean, balanced, and readable.
      - **Applied Across All Service Data Files:** Refactored all 8 data modules (`emailMarketingData.js`, `ecommerceWebDesignData.js`, `webDesignData.js`, `localSeoData.js`, `technicalSeoData.js`, `linkBuildingData.js`, `amazonMarketingData.js`, `digitalMediaProductionData.js`) across `heroData.stage`, `startsData.media`, `pillarsData.media`, `processData.steps`, `scopeData`/`approachData.media`, `readyData.art`, and `consultData.art`.
      - **Applied Across All Secondary Pages:**
        - `src/pages/services.astro`: Hero stage and all 9 services in `servicesList` (standardized to 1 blob, 1 main, 2 opposite corner accents, with monitor exception applied for link building).
        - `src/pages/about.astro`: About hero art and `about-story__frame` (1 blob, 1 main, 2 opposite corner accents).
        - `src/pages/work.astro`: Work hero art and all 6 case studies in `projects` (1 blob, 1 main, 2 opposite corner accents, with monitor exception applied for Be Balanced Bodyworks and hero).
        - `src/pages/blog/index.astro`: Blog hero art (1 blob, 1 laptop, 2 opposite corner accents: user speech bubble top-right & magnifying glass bottom-left).
      - **Homepage Exemption:** Left `src/pages/index.astro` completely untouched per user requirement.
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`—all 143 pages compiled cleanly in 9.89s with 0 errors.
  18. **Shape Retention & Conditional Corner Alignment Implementation:**
      - **Resolved Shape Distortion:**
        - Identified root cause of SVG squashing and stretching: restrictive CSS `max-height` constraints (e.g. `max-height: 76%`, `max-height: 92%`) on `.hero-stage__main`, `.hero-stage__blob`, `.starts-feature__blob`, `.starts-feature__main`, etc., which clamped element height while `width` stayed at fixed percentages, distorting intrinsic aspect ratios. Also corrected mismatched HTML `width` and `height` attributes across components and data files so they strictly match natural SVG viewBoxes (`746 × 780` for standard vectors, `687 × 663` for monitor/support vectors).
        - Enforced `height: auto !important; max-height: none !important; object-fit: contain;` across `ServiceHero.astro`, `StartsSection.astro`, `PillarsSection.astro`, `ReadyBand.astro`, `ProcessSection.astro`, `ConsultSection.astro`, `services.astro`, `about.astro`, and `blog/index.astro`.
      - **Applied Conditional Blob Corner Positioning Rules (Excluding Homepage, Skipping `work.astro`):**
        - **Blob 2 (`blue-circular-background-2-graphic.svg`):**
          - Left small graphic placed in **Top-Left Corner** (`left: 6%; top: 8%;`).
          - Right small graphic placed in **Bottom-Right Corner** (`right: 6%; bottom: 10%;`).
        - **Blob 1 (`blue-circular-background-graphic.svg`):**
          - Left small graphic placed in **Lower-Left Corner** (`left: 6%; bottom: 10%–12%;`).
          - Right small graphic placed in **Top-Right Corner** (`right: 6%; top: 8%;`).
      - **Enforced Screen-Inside-Screen Restrictions:**
        - Audited all uses of `mac-computer-monitor-cyan-screen-background-graphic.svg` and `mac-computer-monitor-transparent-screen-graphic.svg`.
        - Replaced any screen-containing elements placed inside monitor screens (such as `video-player-graphic.svg` in `digitalMediaProductionData.js`) with non-screen vector elements (`image-placeholder-graphic.svg`, `link-graphic.svg`, `screwdriver-graphic.svg`, `arrow-in-target-graphic.svg`).
      - **Strict Scope Boundaries:**
        - Skipped `src/pages/work.astro` per user direction.
        - Left homepage `src/pages/index.astro` 100% untouched.
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`—all 143 pages compiled cleanly in 13.81s with 0 errors.
  19. **Icon Enlarging Bug Investigation & Resolution + Blob 1 Corner Placement Update:**
      - **Diagnosis & Root Cause of the Icon Enlarging Bug:**
        - Investigated why small icons/graphics loaded at small size but immediately enlarged after ~1.3 seconds (as documented in client screenshots).
        - Discovered in `ServiceHero.astro` and `ConsultSection.astro` that GSAP entrance animations had `clearProps: "all"` configured upon tween completion (`duration: 0.75, delay: 0.55`).
        - Because positioning and percentage dimensions are defined directly on inline `style` attributes (e.g. `style="width: 22%; left: 6%; top: 8%;"`), `clearProps: "all"` stripped the entire inline `style` attribute upon completion. Without `width: 22%`, the browser immediately rendered the SVG at its intrinsic attribute dimension (`width="746"`), blowing up the icon to 100% stage width.
      - **Fix Implemented:**
        - Changed `clearProps: "all"` to `clearProps: "transform,opacity"` across `ServiceHero.astro` and `ConsultSection.astro`. This resets GSAP transforms/opacity cleanly while preserving all inline `style` positioning coordinates and width constraints intact.
        - Added defensive CSS safeguard: enforced `max-width: 28% !important;` across all floating element classes (`.hero-stage__float`, `.starts-feature__sat`, `.process__visual-float`, `.ready-band__badge`, `.consult__art-float`, `.services-hero__badge`, `.about-hero__badge`, `.about-story__accent`, `.blog-hero__badge`). Even if an inline width style were ever cleared, the element cannot physically enlarge past 28% width of the stage.
      - **Updated Corner Placement Rule for `blue-circular-background-graphic.svg`:**
        - For any graphical arrangement using `blue-circular-background-graphic.svg` as the background:
          - **Left small graphic:** moved to **Top-Left Corner** (`left: 6%; top: 8%;`).
          - **Right small graphic:** moved to **Lower-Right Corner** (`right: 6%; bottom: 10%;` or `12%`).
        - Updated across all 8 data files and secondary pages:
          - `webDesignData.js`: `heroData.stage`, `processData.steps` (Steps 1–4), `readyData.art`.
          - `ecommerceWebDesignData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
          - `emailMarketingData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
          - `localSeoData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
          - `technicalSeoData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
          - `linkBuildingData.js`: `pillarsData.media`, `processData.steps` (Steps 1–4), `scopeData.media`.
          - `amazonMarketingData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
          - `digitalMediaProductionData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
          - `src/pages/services.astro`: Hero stage and all service cards in `servicesList` with Blob 1.
          - `src/pages/about.astro`: Hero stage badges.
          - `src/pages/blog/index.astro`: Blog hero stage badges.
      - **Scope Boundaries Maintained:**
        - Homepage (`src/pages/index.astro`) kept **100% untouched**.
        - `src/pages/work.astro` kept **skipped** per user instruction.
        - Screen-inside-screen restrictions strictly preserved (no screen graphics inside monitor graphics).
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`—all 143 pages compiled cleanly in 14.83s with 0 errors.
  20. **Restored Rule 2: Lower-Left & Top-Right Placement for `blue-circular-background-graphic.svg`:**
      - **Rule Clarification & Geometry Alignment:**
        - **Rule 1 (`blue-circular-background-2-graphic.svg`):** Left small graphic placed in **Top-Left Corner** (`left: 6%; top: 8%;`); Right small graphic placed in **Bottom-Right Corner** (`right: 6%; bottom: 10%;`). (Verified correct & preserved).
        - **Rule 2 (`blue-circular-background-graphic.svg`):** Left small graphic placed in **Lower-Left Corner** (`left: 6%; bottom: 10%–12%;`); Right small graphic placed in **Top-Right Corner** (`right: 6%; top: 6%–8%;`).
      - **Applied Across All Files Using Blob 1:**
        - `src/data/webDesignData.js`: `heroData.stage`, `processData.steps` (Steps 1–4), `readyData.art`.
        - `src/data/ecommerceWebDesignData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
        - `src/data/emailMarketingData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
        - `src/data/localSeoData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
        - `src/data/technicalSeoData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
        - `src/data/linkBuildingData.js`: `pillarsData.media`, `processData.steps` (Steps 1–4), `scopeData.media`.
        - `src/data/amazonMarketingData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
        - `src/data/digitalMediaProductionData.js`: `heroData.stage`, `startsData.media`, `processData.steps` (Steps 1–4), `readyData.art`.
        - `src/pages/services.astro`: Hero stage and all service cards in `servicesList` utilizing Blob 1.
        - `src/pages/about.astro`: About hero stage badges.
        - `src/pages/blog/index.astro`: Blog hero stage badges.
      - **Strict Scope Boundaries Maintained:**
        - Homepage (`src/pages/index.astro`) kept **100% untouched**.
        - `src/pages/work.astro` kept **skipped** per user direction.
        - Monitor screen restrictions strictly enforced (no screen/device graphics inside monitor screens).
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`—all 143 pages compiled cleanly with 0 errors.
  21. **Built out dedicated SMS Marketing pages (`src/pages/services/sms-marketing.astro` & `src/pages/services/sms-marketing-services.astro`):**
      - Extracted live content and structure from `https://goodrep.media/services/sms-marketing/` via WordPress REST API and page analysis.
      - Created dedicated data module `src/data/smsMarketingData.js` isolating all page copy, metrics, and step objects; kept both page shells to ~41 lines.
      - Supported dual routing for `/services/sms-marketing` and `/services/sms-marketing-services` to match all navigation patterns and prevent 404s; updated `src/layouts/MainLayout.astro` services mega-menu.
      - **Strict Alignment with Element Combination & Blob Geometry Rules:**
        - Stage 1 (Hero): Blob 1 (`blue-circular-background-graphic.svg`) + center graphic (`red-phone-graphic.svg`, 58%) + Lower-Left (`user-speech-bubble-graphic.svg`, 24%) + Top-Right (`megaphone-alert-notification-graphic.svg`, 22%).
        - Stage 2 (Starts Spotlight): Blob 2 (`blue-circular-background-2-graphic.svg`) + center graphic (`mobile-email-alerts-graphic.svg`, 58%) + Top-Left (`happy-face-speech-bubble-graphic.svg`, 24%) + Bottom-Right (`star-app-icon-graphic.svg`, 22%).
        - Stage 3 (Pillars): Blob 1 + center graphic (`tablet-ads-targeting-graphic.svg`, 62%) + Lower-Left (`999-hearts-likes-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%).
        - Stage 4 (Process Accordion): 4 synchronized steps (*It’s a Best Kept Secret*, *Conversation Sells*, *Next Level Personalization*, *Quick and Easy Support*).
        - Stage 5 (Approach Spotlight): Blob 2 + center graphic (`tablet-ads-targeting-graphic.svg`, 62%) + Top-Left (`user-speech-bubble-graphic.svg`, 24%) + Bottom-Right (`star-app-icon-graphic.svg`, 22%) with 100% TCPA & 10DLC compliance callout.
        - Stage 6 (Capabilities Grid): 6 orbital medallion cards (*Promotional Broadcasts*, *Behavioral Drip Sequences*, *Audience Segmentation*, *Conversational Commerce*, *Loyalty & Birthday Rewards*, *Analytics & Monthly Reporting*).
        - Stage 7 (Ready Breakout Band): Blob 1 + center graphic (`red-phone-graphic.svg`, 58%) + Lower-Left (`shopping-cart-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%).
        - Stage 8 (Consultation Funnel): Clean `/grm-web-assets/online-support-graphic.svg` with chat and heart floats, dual morphing SVG waves, and `<LeadForm client:visible submitLabel="Book My Free SMS Strategy Call" />`.
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 npm run build`—all 145 pages generated cleanly in 13.25s with 0 errors.
  22. **Built out dedicated Video Production pages (`src/pages/services/video-production.astro` & `src/pages/services/video-production-services.astro`):**
      - Extracted live content, stats, and structure from `https://goodrep.media/services/video-production/` via WordPress REST API and page analysis.
      - Created dedicated data module `src/data/videoProductionData.js` isolating all page copy, metrics, and step objects; kept both page shells to ~41 lines.
      - Supported dual routing for `/services/video-production` and `/services/video-production-services` to match all navigation patterns and prevent 404s; updated `src/layouts/MainLayout.astro` services mega-menu directly to `/services/video-production`.
      - **Strict Alignment with Element Combination & Blob Geometry Rules:**
        - Stage 1 (Hero): Blob 1 (`blue-circular-background-graphic.svg`) + center graphic (`video-player-graphic.svg`, 62%) + Lower-Left (`megaphone-alert-notification-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%).
        - Stage 2 (Starts Spotlight): Blob 2 (`blue-circular-background-2-graphic.svg`) + center graphic (`video-player-graphic.svg`, 62%) + Top-Left (`happy-face-speech-bubble-graphic.svg`, 24%) + Bottom-Right (`star-app-icon-graphic.svg`, 22%) with 86% market adoption callout.
        - Stage 3 (Stats Ribbon): 4 live animated counters extracted from the live page (`500+` completed video projects, `100+` satisfied clients, `2500+ hrs` editing & post-production, `20+` states filmed in).
        - Stage 4 (Pillars): Blob 1 + center graphic (`tablet-ads-targeting-graphic.svg`, 62%) + Lower-Left (`999-hearts-likes-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%) featuring 3 full-studio pillars (*Photography + Images*, *Custom Graphic Design*, *Professional Audio Production*).
        - Stage 5 (Process Accordion): 4 synchronized steps (*Detailed Planning*, *Expert Production*, *Editing & Post-Production*, *Revisions & Final Approval*).
        - Stage 6 (Approach Spotlight): Blob 2 + center graphic (`video-player-graphic.svg`, 62%) + Top-Left (`user-speech-bubble-graphic.svg`, 24%) + Bottom-Right (`star-app-icon-graphic.svg`, 22%) with universal multi-platform aspect ratio export callout (16:9, 9:16, 1:1, 4:5).
        - Stage 7 (Capabilities Grid): 6 orbital medallion cards (*Drone Footage*, *Product Featurettes*, *Promos & Commercial Ads*, *Event Videos*, *Commemorative & Story Videos*, *Custom Video Projects*).
        - Stage 8 (Ready Breakout Band): Blob 1 + center graphic (`video-player-graphic.svg`, 62%) + Lower-Left (`shopping-cart-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%).
        - Stage 9 (Consultation Funnel): Clean `/grm-web-assets/online-support-graphic.svg` with chat and heart floats, dual morphing SVG waves, and `<LeadForm client:visible submitLabel="Book My Free Video Strategy Call" />`.
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 npm run build`—all 147 pages generated cleanly in 11.16s with 0 errors.
  23. **Built out dedicated Social Media Marketing pages (`src/pages/services/social-media.astro` & `src/pages/services/social-media-marketing.astro`):**
      - Extracted live content, statistics, pillars, process steps, and platform capabilities from `https://goodrep.media/services/social-media-marketing/` via WordPress REST API and page analysis.
      - Created dedicated data module `src/data/socialMediaData.js` isolating all page copy, metrics, and step objects; kept both page shells to ~41 lines.
      - Supported dual routing for `/services/social-media` and `/services/social-media-marketing` to match all navigation patterns and prevent 404s; updated `src/layouts/MainLayout.astro` services mega-menu directly to `/services/social-media`.
      - **Strict Alignment with Element Combination & Blob Geometry Rules:**
        - Stage 1 (Hero): Blob 1 (`blue-circular-background-graphic.svg`) + center graphic (`social-media-likes-comments-stats-graphic.svg`, 62%) + Lower-Left (`999-hearts-likes-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%).
        - Stage 2 (Starts Spotlight): Blob 2 (`blue-circular-background-2-graphic.svg`) + center graphic (`tablet-ads-targeting-graphic.svg`, 62%) + Top-Left (`happy-face-speech-bubble-graphic.svg`, 24%) + Bottom-Right (`star-app-icon-graphic.svg`, 22%) with 93% active market reach callout.
        - Stage 3 (Stats Ribbon): 4 live animated counters extracted from the live page (`4.5B` active social media users globally, `346M+` new users joined in the last year, `2.5 hrs` average daily usage, `4–8` distinct platforms used monthly).
        - Stage 4 (Pillars): Blob 1 + center graphic (`tablet-ads-targeting-graphic.svg`, 62%) + Lower-Left (`user-speech-bubble-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%) featuring 3 strategic pillars (*Meaningful Onboarding*, *Knowing the Platforms*, *Paid and Organic Mix*).
        - Stage 5 (Process Accordion): 4 synchronized steps (*Discovery*, *Strategy*, *Content Creation*, *Launch & Management*).
        - Stage 6 (Approach Spotlight): Blob 2 + center graphic (`social-media-likes-comments-stats-graphic.svg`, 62%) + Top-Left (`user-speech-bubble-graphic.svg`, 24%) + Bottom-Right (`star-app-icon-graphic.svg`, 22%) with 99.8% customer delight and audience alignment callout.
        - Stage 7 (Capabilities Grid): 6 platform-focused orbital medallion cards (*Facebook Advertising & Groups*, *Instagram & Threads Growth*, *TikTok Viral Campaigns*, *LinkedIn B2B Lead Gen*, *X / Twitter Real-Time Brand Voice*, *Pinterest, YouTube & Reddit Community Hubs*).
        - Stage 8 (Ready Breakout Band): Blob 1 + center graphic (`social-media-likes-comments-stats-graphic.svg`, 62%) + Lower-Left (`shopping-cart-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%).
        - Stage 9 (Consultation Funnel): Clean `/grm-web-assets/online-support-graphic.svg` with chat and heart floats, dual morphing SVG waves, and `<LeadForm client:visible submitLabel="Book My Free Social Strategy Call" />`.
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 npm run build`—all 149 pages generated cleanly in 12.95s with 0 errors.
  24. **Comprehensive Graphic Upgrades Across Service Pages & Data Layer with New 3D Assets:**
      - Audited the newly added SVG assets in `public/grm-web-assets` and mapped each asset to its corresponding service discipline:
        - **Web Design (`src/data/webDesignData.js`):** Integrated `laptop-web-design-layout-graphic.svg` as Hero centerpiece, `3d-laptop-www-website.svg` in StartsSection and Process, `3d-color-picker-graphic.svg` for UI/UX styling, `3d-ruler-graphic.svg` for responsive precision, `code-window-graphic.svg` for clean code build, and `3d-rocket-graphic.svg` for launch.
        - **SMS Marketing (`src/data/smsMarketingData.js`):** Replaced generic phone/ads graphics with `3d-sms-icon-graphic.svg` across Hero, Process, and ReadyBand, `3d-texting-on-mobile-graphic.svg` in StartsSection and Process, `3d-chat-bubbles-graphic.svg` for conversational commerce, `phone-with-mobile-apps-icons-graphic.svg` in Pillars, and `mobile-password-secure-graphic.svg` for TCPA & 10DLC compliance.
        - **Link Building (`src/data/linkBuildingData.js`):** Replaced legacy 1.8MB `link-graphic.svg` with high-performance `3d-chain-links-graphic.svg` (8KB) across Hero, Starts, Pillars, Process, and ReadyBand; paired with `upward-trend-graph-graphic.svg` for domain authority lift and `3d-globe-in-speech-bubble-graphic.svg` for digital PR.
        - **Technical SEO (`src/data/technicalSeoData.js`):** Replaced generic window graphics with `3d-window-with-gear-graphic.svg` across Hero, Process, and ReadyBand, `3d-tools-graphic.svg` for technical fixes, `3d-magnify-glass.svg` for site audits, `code-window-graphic.svg` for schema markup, `cloud-upload-download-graphic.svg` for server crawlability, and `3d-stats-data-graphic.svg` for monitoring.
        - **Local SEO (`src/data/localSeoData.js`):** Replaced repeated storefront graphics with `3d-map-destination-route-graphic.svg` across Hero, Process, and ReadyBand, `3d-map-indicator-icon-graphic.svg` for map pin markers, `number-one-award-graphic.svg` for Google 3-Pack rankings, and `customer-review-graphic.svg` for reputation management.
        - **Email Marketing (`src/data/emailMarketingData.js`):** Upgraded Hero, Pillars, and ReadyBand to `3d-email-icon-graphic.svg`, paired with `paper-plane-graphic.svg` for broadcast campaigns, and `upward-trend-graph-graphic.svg` for open/click-through rates.
        - **eCommerce Web Design (`src/data/ecommerceWebDesignData.js`):** Integrated `pc-screen-online-marketplace-graphic.svg` in StartsSection and Process, `mobile-password-secure-graphic.svg` for secure checkout testing, and `3d-rocket-graphic.svg` for launch.
        - **Amazon Marketing (`src/data/amazonMarketingData.js`):** Integrated `pc-screen-online-marketplace-graphic.svg` in StartsSection, Pillars, and Approach, paired with `number-one-award-graphic.svg` for Buy Box dominance, and `stocks-going-up-graphic.svg` for DSP ad scale.
        - **Digital Media Production (`src/data/digitalMediaProductionData.js`):** Replaced image placeholders with `3d-art-computer-program-graphic.svg` across Hero, Pillars, and Process, `photo-img-graphic.svg` for commercial photography, `pencil-graphic.svg` for creative ideation, and `3d-file-folder-graphic.svg` for brand asset delivery.
        - **Video Production (`src/data/videoProductionData.js`):** Replaced generic tablet ads with `3d-art-computer-program-graphic.svg` for post-production editing suite and `photo-img-graphic.svg` for studio filming.
        - **Social Media Marketing (`src/data/socialMediaData.js`):** Upgraded StartsSection to `3d-globe-in-speech-bubble-graphic.svg`, Pillars to `phone-with-mobile-apps-icons-graphic.svg`, Strategy to `spiral-notebook-with-target-graphic.svg`, and Community Management to `3d-chat-bubbles-graphic.svg`.
        - **Services Master Directory (`src/pages/services.astro`):** Updated all service cards with their new thematic 3D SVGs and linked Social Media Marketing card to `/services/social-media`.
        - **Blog Insights Hero (`src/pages/blog/index.astro`):** Modernized hero art with `3d-search-window-graphic.svg`, `3d-doc-file-graphic.svg`, and `3d-magnify-glass.svg`.
      - **Strict Constraints Enforced:**
        - Kept Homepage (`src/pages/index.astro`) **100% untouched**.
        - Kept `src/pages/work.astro` **skipped** per user direction.
        - Preserved element combination limits (1 background blob + 1 center graphic + max 2 small corner accents).
        - Maintained strict blob corner placement geometry (Blob 1: Lower-Left / Top-Right; Blob 2: Top-Left / Bottom-Right).
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 npm run build`—all 149 pages compiled cleanly in 13.25s with 0 errors.
  25. **Built out dedicated Pay-Per-Click Marketing pages (`src/pages/services/paid-ads.astro` & `src/pages/services/pay-per-click-marketing.astro`):**
      - Extracted live copy, stats, pillars, process steps, and platform capabilities from `https://goodrep.media/services/pay-per-click-marketing/` via WordPress REST API (`/tmp/ppc.json`, ID 237493).
      - Created dedicated data module `src/data/paidAdsData.js` isolating all page copy, metrics, and step objects; kept both page shells to ~41 lines.
      - Supported dual routing for `/services/paid-ads` and `/services/pay-per-click-marketing` to match all navigation patterns and prevent 404s.
      - Updated `src/layouts/MainLayout.astro` mega-menu and footer links directly to `/services/paid-ads`, and updated `src/pages/services.astro` paid ads card `href` to `/services/paid-ads`.
      - **Strict Alignment with Element Combination & Blob Geometry Rules:**
        - Stage 1 (Hero): Blob 1 (`blue-circular-background-graphic.svg`) + center graphic (`tablet-ads-targeting-graphic.svg`, 58%) + Lower-Left (`coin-stack-graphic.svg`, 24%) + Top-Right (`arrow-in-target-graphic.svg`, 22%).
        - Stage 2 (Starts Spotlight): Blob 2 (`blue-circular-background-2-graphic.svg`) + center graphic (`stocks-going-up-graphic.svg`, 62%) + Top-Left (`upward-trend-graph-graphic.svg`, 24%) + Bottom-Right (`3d-star-graphic.svg`, 22%) with 65% SMB adoption callout.
        - Stage 3 (Stats Ribbon): 4 live animated counters extracted from the live page (`65%` of SMBs have an active PPC campaign, `50%` higher purchase probability vs organic visitors, `200%` average ROI, `52%` of PPC clicks from mobile devices).
        - Stage 4 (Pillars): Blob 1 + center graphic (`spiral-notebook-with-target-graphic.svg`, 62%) + Lower-Left (`arrow-in-target-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%) featuring 3 data-driven pillars (*Data-Driven Decisions*, *Audience-Centered Targeting*, *Conversion-Focused Tactics*).
        - Stage 5 (Process Accordion): 4 synchronized steps (*Discovery & Competitor Analysis*, *Strategy & Architecture*, *Creative & Copywriting*, *Launch & Month-Over-Month Optimization*).
        - Stage 6 (Approach Spotlight): Blob 2 + center graphic (`tablet-ads-targeting-graphic.svg`, 62%) + Top-Left (`arrow-in-target-graphic.svg`, 24%) + Bottom-Right (`coin-stack-graphic.svg`, 22%) with 100% Quality Score and ad rank optimization callout.
        - Stage 7 (Capabilities Grid): 6 platform-focused orbital medallion cards (*Google Search Ads*, *Google Display Network*, *Meta & Social Paid Ads*, *Precision Retargeting*, *Landing Page Optimization*, *Conversion Tracking & Reporting*).
        - Stage 8 (Ready Breakout Band): Blob 1 + center graphic (`stocks-going-up-graphic.svg`, 58%) + Lower-Left (`arrow-in-target-graphic.svg`, 24%) + Top-Right (`3-arrows-up-graphic.svg`, 22%).
        - Stage 9 (Consultation Funnel): Clean `/grm-web-assets/online-support-graphic.svg` with chat and heart floats, dual morphing SVG waves, and `<LeadForm client:visible submitLabel="Book My Free PPC Strategy Call" />`.
      - **Build Verification:** Tested with `ASTRO_TELEMETRY_DISABLED=1 npm run build`—all 151 pages compiled cleanly in 15.24s with 0 errors.
  26. **Converted Homepage Hero Container to 1600px Global Standard:**
      - Updated `src/styles/global.css` to define `--container: 1600px;` and added `width: 100%;` to `.container` to prevent flex items from shrink-wrapping during horizontal centering.
      - Updated `src/pages/index.astro` hero markup from `<div class="hero__container">` to `<div class="container hero__container">` to inherit the global container utility class.
      - Refactored `.hero__container` CSS rules in `src/pages/index.astro` to use `width: 100%; max-width: var(--container);` ensuring full-width expansion up to the 1600px ceiling across desktop displays.
      - Verified production build: all 151 pages generated cleanly with 0 errors.
- **Current Objective:** Proceed to Step 8: End-to-end responsiveness, accessibility auditing, and performance optimization across all service pages and core routes.
