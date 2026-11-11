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
    - **SERVICE HERO TEMPLATE RULE - Clean Singular Front Graphic (No Background Blob):**
      - For all `/services/*` hero sections, the `.hero-stage` composition strictly features:
        1. **0 background blue graphics** (all `hero-stage__blob` graphics removed so none of the service heroes have a blue background).
        2. **1 singular front centerpiece graphic** (`main`, cleanly centered and scaled).
        3. **0 floating accent graphics** (`floats: []`), keeping the hero clean, focused, and free of peripheral clutter.
    - **GSAP & Inline Styles Rule:** Never use `clearProps: "all"` on elements that rely on inline styles (`style="width: ...; left: ...;"`) for sizing or layout. Always use `clearProps: "transform,opacity"` to prevent browsers from reverting to intrinsic SVG dimensions and blowing up elements.
    - **No sprawling connector lines:** Do not include meandering dashed lines across stages or cards that create visual clutter and disorganized overlapping.
  1. **Individual Service Pages (`/services/*`):** Must strictly follow the modular template architecture implemented across [`src/pages/services/web-design.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/web-design.astro), [`ecommerce-web-design.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/ecommerce-web-design.astro), [`email-marketing.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/email-marketing.astro), and [`local-seo.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/services/local-seo.astro):
     - **Modular Component Breakdown:** Page files (`src/pages/services/*.astro`) are lightweight orchestration shells (~30–40 lines) with zero raw data or inline CSS/scripts. They import structured data from `src/data/*Data.js` and render modular components from `src/components/`:
       - `ServiceHero.astro`: Light background (`var(--color-bg)`) with radial cyan dot grid mask, pill `.breadcrumb`, `.service-hero__kicker`, compact single-line `.service-hero__title-top` (`var(--color-cyan)`) + 3D GSAP rotating `.service-hero__word` (`var(--color-primary)`), `.service-hero__checklist-card` (white card with `4px solid var(--color-cyan)` left border), `.service-hero__actions` (`Contact Us` + `Send Us a Message` modal trigger), streamlined `.hero-stage` (1 background blue graphic + 1 singular front graphic with pointer parallax, 0 corner accent floats), and dark bottom `.marquee` strip (`border-bottom: 4px solid var(--color-cyan)`).
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
  27. **Updated Social Media Hero Centerpiece Asset:**
      - Replaced `hero-stage__main` image in `src/data/socialMediaData.js` with `woman-engaged-social-media-image.webp` (2642x2000 cutout) for `/services/social-media` and `/services/social-media-marketing`.
      - Verified layout sizing and centering over the background blob with zero text occlusion.
      - Verified build: all 151 pages generated cleanly with 0 errors.
  28. **Streamlined Service Hero Template (Singular Front Graphic + Background Blob):**
      - Updated `src/data/socialMediaData.js` hero stage to feature solely `woman-engaged-social-media-image.webp` (70% width, centered at `left: 15%; top: 10%`) paired with `blue-circular-background-graphic.svg`, removing peripheral accent floats.
      - Updated `working.md` Master Page Templates to formalize the Service Hero Template Rule: exactly 1 background blue graphic + 1 front centerpiece graphic, 0 smaller accent floats.
      - Verified production build: all 151 pages generated cleanly with 0 errors.
  29. **Completed Sweep Across All /services Hero Sections (1 Front Graphic + 1 Background Graphic):**
      - Swept all 12 service data files (`webDesignData.js`, `ecommerceWebDesignData.js`, `emailMarketingData.js`, `localSeoData.js`, `technicalSeoData.js`, `linkBuildingData.js`, `amazonMarketingData.js`, `digitalMediaProductionData.js`, `smsMarketingData.js`, `videoProductionData.js`, `paidAdsData.js`, and `socialMediaData.js' The Gren card, that is connected'); 
      - Stripped all peripheral corner floats (`floats: []`) from each service hero stage.
      - Re-centered each front centerpiece graphic directly over the blue circular background blob (~64–66% width, centered geometry) for a clean, unified, zero-distraction presentation.
      - Verified production build: all 151 pages compiled cleanly in 15.28s with 0 errors.
  30. **Replaced Hero Centerpiece Graphics Across /services with New Matching 2642x2000 WebP Assets:**
      - Audited newly added WebP assets in `public/grm-web-assets` and mapped each to its corresponding service:
        - **Web Design (`webDesignData.js`):** `/grm-web-assets/web-design-development-image.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`). Thee camera can take a shot from the mountain top, from the city scape. 
        - **eCommerce Web Design (`ecommerceWebDesignData.js`):** `/grm-web-assets/ecommerce-website-experience.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`).
        - **Email Marketing (`emailMarketingData.js`):** `/grm-web-assets/email-newsletter-marketing-image.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`).
        - **Local SEO (`localSeoData.js`):** `/grm-web-assets/local-business-seo-image.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`).
        - **Technical SEO (`technicalSeoData.js`):** `/grm-web-assets/technical-seo-analysis-image.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`).
        - **Link Building (`linkBuildingData.js`):** `/grm-web-assets/back-link-seo-building-image.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`).
        - **Amazon Marketing (`amazonMarketingData.js`):** `/grm-web-assets/online-shopping-amazon-marketing-graphic.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`).
        - **Social Media Marketing (`socialMediaData.js`):** `/grm-web-assets/woman-engaged-social-media-image.webp` (2642x2000, `width: 90%; left: 5%; top: 12%;`).
        - Retained existing clean single graphics for services without dedicated new webp assets (Digital Media, SMS, Video, Paid Ads).
      - Verified production build: all 151 pages compiled cleanly in 13.29s with 0 errors.
  31. **Eliminated Lightbox Triggering on Graphic Assets and Window Elements:**
      - Audited `src/components/LightboxModal.astro` which previously marked all unlinked images across the site with `.lightbox-zoomable` and bound a global click handler.
      - Removed `.window-graphic:not(:has(a)) .window-graphic__img` from the global zoom-in cursor CSS block.
      - Updated `isEligibleImage(img)` in `src/components/LightboxModal.astro` with strict exclusionary rules:
        - Excludes any asset residing in `/grm-web-assets/`, `/grm-web-icons/`, `/grm-main-graphics/`, or `/grm-logos/`.
        - Excludes all `.svg` files (vector icons, decorative badges, illustrations).
        - Excludes any graphic inside decorative or UI containers (`.hero-stage`, `.service-hero__graphic`, `.work-hero__graphic`, `.work-hero`, `.service-block__frame`, `.service-block__media`, `.starts-feature__media`, `.deliverable-card`, `.pillar-row-card`, `.pillars`, `.process`, `.ready-band`, `.consult`, `.window-graphic`, `.brand`, `[aria-hidden="true"]`, `header`, `nav`, `footer`).
        - Automatically strips the `.lightbox-zoomable` class from all ineligible images.
        - Restricts lightbox modal triggering solely to verified content imagery (`.case-hero__mockup-img`, `.case-narrative__img`, images in `/grm-graphic-samples/`, WordPress blog article media in `.blog-post__content` / `.entry-content`, or elements explicitly tagged with `data-lightbox`).
      - Verified production build: all 181 pages built cleanly in 9.40s with 0 errors.
- **2026-11-02:**
  32. **Remediated Google Analytics 4 (GA4) Cross-Property Data Stream Configuration:**
      - Diagnosed cross-talk issue where Good Rep Media (`goodrep.media`) pageviews (such as `/` Homepage, `/blog/` Knowledge Center, and `/work/` Portfolio) were erroneously populating into Cape Coral Lawn Care's Google Analytics account (`387945606`).
      - Identified root cause in `src/components/TrackingHead.astro`, which previously hardcoded Google Ads tag `AW-11145254205` that routes hits to Cape Coral Lawn Care's GA4 property.
      - Replaced `AW-11145254205` in `src/components/TrackingHead.astro` with Good Rep Media's dedicated GA4 Measurement ID `G-JP63DEKVVF` (Stream ID `13923493186`), configuring `import.meta.env.PUBLIC_GA_MEASUREMENT_ID` with fallback to `"G-JP63DEKVVF"`.
      - Updated `src/pages/thankyou.astro` conversion handler to fire the standard GA4 `generate_lead` event upon contact form submission instead of firing Cape Coral Lawn Care's Google Ads conversion tag.
      - Synchronized `PUBLIC_GA_MEASUREMENT_ID=G-JP63DEKVVF` across `.env` and `.env.local`.
      - Updated `README.md` tracking architecture and conversion attribution sections to match the new GA4 configuration.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 npm run build`: all 212 pages built cleanly in 6.51s with 0 errors, validating `G-JP63DEKVVF` presence in all static HTML outputs and confirming complete removal of `AW-11145254205`.
- **2026-11-04:**
  33. **Built Dedicated Meet the Team Page (`src/pages/meet-the-team.astro` & `src/data/teamData.js`):**
      - Created isolated data layer `src/data/teamData.js` housing all 8 team profiles (*Cody Anderson*, *Samuel Rodgers*, *Jordan Vogel*, *James Green*, *Ron Lewis*, *Emily Stavrou Schaefer*, *Pierre Roustan*, and *Melani Sevova*) with exact client-provided titles and descriptions matched to their corresponding images in `public/grm-team/`.
      - Framed all profile images and missing-image placeholders (`public/grm-team/profile-placeholder.svg` + initials badge for *Pierre Roustan* and *Melani Sevova*) inside uniform circular mask overlays (`.team-card__avatar-mask`) using `border-radius: 50%`, `clip-path: circle(50% at 50% 50%)`, `mask-image`, `overflow-clip-margin: content-box`, inner ring vignette overlay (`.team-card__mask-ring`), and spinning dashed orbital accents (`.team-card__orbit`).
      - Built hero stage strictly adhering to the Blob 1 element combination rule (`blue-circular-background-graphic.svg` + `users-networking-graphic.svg` centerpiece + Lower-Left and Top-Right corner accents with `clearProps: "transform,opacity"`).
      - Linked `/meet-the-team/` from `src/pages/about.astro`, `src/layouts/MainLayout.astro` footer resources, and `src/components/MobileFlyoutMenu.astro`, and excluded `/grm-team/` assets from `src/components/LightboxModal.astro`.
  34. **Fixed Broken Role Icons & Integrated "About Us" Dropdown in Main Nav:**
      - **Fixed Broken Role Badges:** Investigated cause of "EX" and "TE" text displaying on avatar role badges. The project uses a custom-subsetted font (`public/fonts/material-symbols-outlined-subset.woff2`). `explore` and `terminal` were not in the font subset and thus fell back to raw text clipped to 2 letters. Replaced Cody Anderson's icon with `campaign` (leadership/marketing) and James Green's icon with `code` (programming `< / >`), both verified present in the subset font.
      - **Fixed Mobile Flyout Icon:** Replaced unsupported `badge` icon with `group` in `src/components/MobileFlyoutMenu.astro`.
      - **Added Dropdown Menu Under "About Us" in Main Nav:** Converted the desktop main navigation "About" link into an accessible dropdown (`.nav-item--dropdown` + `.nav-dropdown`) featuring caret rotation, charcoal `#2b2b2b` styling with cyan hover indicators, and keyboard accessibility (`aria-haspopup="true"`, `aria-expanded`, Escape key handler), linking to both **About Us** (`/about/`) and **Meet the Team** (`/meet-the-team/`).
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 8.05s with 0 errors.
  35. **Decoupled "About Us" Dropdown Design From Services Mega Menu:**
      - **Root Cause of Mega Menu Collapse:** Identified that sharing `.nav-item--mega, .nav-item--dropdown` with `position: relative` broke the containing block of `.mega-menu`. Because `.mega-menu` requires static parent positioning to stretch across the full width of `.global-header`, adding `position: relative` constrained the entire 4-column mega menu into an 80px narrow column.
      - **Restored Services Mega Menu:** Reverted `.nav-item--mega` to its original unconstrained static flex layout, fully restoring the full-width edge-to-edge `#2b2b2b` 4-column mega menu.
      - **Created Independent "About Us" Dropdown Menu (`.about-menu` & `.about-dropdown`):** Architected a dedicated, standalone dropdown design featuring a floating white card (`#ffffff`, `border-top: 3px solid var(--color-cyan)`, `border-radius: 14px`, `box-shadow: 0 18px 40px -10px rgba(15, 23, 42, 0.18)`), soft cyan icon badges (`.about-dropdown__icon-box`), headings, descriptive subcopy, and interactive chevron slide transitions. Decoupled scripts into dedicated `setupMegaMenu()` and `setupAboutDropdown()` lifecycle hooks.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages built cleanly in 6.88s with 0 errors.
  36. **Removed Pierre Roustan From Meet the Team Page:**
      - Removed Pierre Roustan's entry from `teamMembers` in `src/data/teamData.js`.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages built cleanly in 8.20s with 0 errors.
  37. **Removed Pink Slushy and Coral Breeze Cards from /work and Homepage (Retaining Pages):**
      - Removed Coral Breeze Services and Pink Slushy Media entries from `projects` in `src/data/work/directoryData.js`, eliminating their showcase cards and modal viewer panels on `/work`.
      - Removed Coral Breeze Services from `homepageProjects` in `src/data/homeData.js`, removing it from the homepage portfolio slider.
      - Preserved `src/data/work/coralBreezeData.js` and its mapping in `src/data/work/caseStudiesRegistry.js` so that `/work/coral-breeze-services/` and `/our-work/coral-breeze-services/` remain statically generated and functional without any active links pointing to them.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 8.13s with 0 errors.
  38. **Resolved Mobile Layout & Centering in Homepage "Our Work" Section:**
      - **Root Cause Analysis:** Investigated the horizontal overflow and off-center alignment on mobile (`<= 959px`). Hardcoded `min-width: 360px` on `.work-card` and unconstrained `min-width: auto` on `.work__layout` grid tracks caused `.work__gallery-wrap` to blow out to 520px+ (wider than standard 360px–412px mobile phone viewports). Combined with `overflow-x: clip` on `body`, this pushed the entire section off the right edge of the screen, clipping the active card, the next arrow, heading text, buttons, and logos. Additionally, `.work__content` lacked mobile center-alignment styling.
      - **Responsive Carousel Sizing:** Added responsive card sizing for mobile (`clamp(260px, 72vw, 340px)` for `< 960px` and `clamp(240px, 74vw, 290px)` for `< 480px`) with `min-width: 0`, and constrained `.work__layout` with `grid-template-columns: minmax(0, 1fr)`. Updated gallery arrows (`38px x 38px`, `left: 2px`, `right: 2px`) and container padding (`1.25rem` on mobile).
      - **Centered Content Alignment:** Centered `.eyebrow`, `.work__title` (`text-wrap: balance`), `.work__text`, `.work__actions`, and `.work__clients` on screens `< 960px`. On small mobile screens (`<= 480px`), converted `.work__actions` into stacked, full-width pill buttons (`max-width: 290px; margin: 0 auto;`), and centered client logos with a tighter gap (`max-width: 310px`) to provide clearance from the floating contact buttons.
      - **Resize Recalibration:** Updated `handleResize` in `initWorkGallery()` to immediately recalibrate `updatePosition(false)` on window resize or device orientation change.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 7.56s with 0 errors, and visually verified via headless mobile screenshots at 390x844.
  39. **Restored In-Place Category Filtering on `/blog/`:**
      - **Root Cause Analysis:** Two factors caused clicking a blog category on `/blog/` to open a separate `/blog/category/[slug]/` page instead of filtering the blog listings in-place:
        1. Category sidebar pills (`.blog-nav__pill`) and post card category badges (`.post-card__tag`) in `src/pages/blog/index.astro` were rendered as `<a href="/blog/category/...">` links instead of `<button type="button">`, which Astro's `<ClientRouter />` (View Transitions) intercepted to trigger a page navigation.
        2. The filter script in `src/pages/blog/index.astro` ran only at initial module evaluation rather than subscribing to `document.addEventListener("astro:page-load", initBlogPage)`, so navigating to `/blog/` from another page via `<ClientRouter />` never attached the category filter event listeners.
      - **Fix:**
        - Converted `.blog-nav__pill` and `.post-card__tag` in `src/pages/blog/index.astro` back to semantic `<button type="button">` controls with `aria-pressed` state.
        - Wrapped all `/blog/` category filtering, search, pagination, and GSAP animations inside `initBlogPage()` bound to `astro:page-load`, with cleanup registered on `astro:before-swap`.
        - Updated category links in `src/pages/blog/[slug].astro` and `src/pages/blog/page/[page].astro` to point to `/blog/?category=${slug}` so clicking a category from an article or archive page opens `/blog/` pre-filtered to that category.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 7.69s with 0 errors.
  40. **Added Inner Scrollbar to Desktop Blog Category Sidebar (`.blog-layout__sidebar`):**
      - **Problem:** On desktop displays, the 15-category sidebar card was taller than standard viewports (~860px) and lacked an inner scroller. Users had to scroll the entire webpage to the bottom to reach categories at the lower end of the list.
      - **Implementation:**
        - Constrained `.blog-layout__sidebar` height with `max-height: min(calc(100vh - var(--header-h) - 3rem), 600px)` and flex layout with `overflow: hidden`.
        - Kept `.blog-sidebar__header` ("Categories") fixed at the top with `flex-shrink: 0`.
        - Converted `.blog-nav` into a scrollable viewport with `flex: 1`, `min-height: 0`, `overflow-y: auto`, `overflow-x: hidden`, and `overscroll-behavior: contain`.
        - Styled the scrollbar to a subtle 5px dark gray line (`--scrollbar-thumb: #64748b` on transparent track) with smooth rounded ends (`border-radius: 999px`) and a deeper dark shade when holding it (`--scrollbar-thumb-active: #1e293b`).
        - Implemented dual support using standard CSS `scrollbar-color` / `scrollbar-width: thin` alongside `::-webkit-scrollbar` pseudo-elements.
        - Added mouse wheel event forwarding from `.blog-sidebar__header` to `.blog-nav` and smooth auto-scrolling to active pills.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 7.42s with 0 errors.
  41. **Smooth Scroll to Top of Blog Feed on Category Selection:**
      - **Implementation:**
        - Created `scrollToBlogFeed()` calculating exact scroll position to `.blog-feed` accounting for the 76px sticky header offset (`feedEl.getBoundingClientRect().top + window.scrollY - 76`).
        - Bound smooth scroll to both sidebar category pills (`.blog-nav__pill`), post card category badges (`[data-filter-category]`), and reset buttons.
        - Synchronized the card entrance animation to a graceful `duration: 0.45s` with `stagger: 0.22s` (`autoAlpha: 0 -> 1`, `y: 20 -> 0`) so cards fade in gracefully as the window smoothly scrolls up to `.blog-feed`.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 7.67s with 0 errors.
  42. **Removed Background `hero-stage__blob` Blue Graphic Across All Services Heroes:**
      - **Objective:** Eliminate the blue circular background graphic (`hero-stage__blob` / `services-hero__blob`) from all service heroes so that none of the service heroes display a blue background graphic behind their centerpiece illustration.
      - **Implementation:**
        - **12 Service Data Files:** Removed the `blob: { src: "/grm-web-assets/blue-circular-background-graphic.svg", ... }` configuration from `heroData.stage` across all 12 service data files: `webDesignData.js`, `ecommerceWebDesignData.js`, `localSeoData.js`, `technicalSeoData.js`, `linkBuildingData.js`, `amazonMarketingData.js`, `digitalMediaProductionData.js`, `emailMarketingData.js`, `smsMarketingData.js`, `videoProductionData.js`, `socialMediaData.js`, and `paidAdsData.js`.
        - **`src/components/ServiceHero.astro`:** Made `blob?:` optional in `HeroStage` TypeScript interface and removed the `<img class="hero-stage__blob" ... />` rendering block. Centerpiece graphics (`hero-stage__main`) now sit cleanly on the dot-grid stage with 0 background blob.
        - **`src/pages/services.astro`:** Removed the `<img class="services-hero__blob" ... />` markup and guarded the corresponding GSAP selector from the hero section on the main services catalog overview page.
        - **Preservation Check:** Left all secondary section backgrounds (`StartsSection`, `PillarsSection`, `ProcessSection`, `ReadyBand`) and the homepage (`src/pages/index.astro`) completely untouched.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 8.01s with 0 errors.
  43. **Added Julia Kereszturi to Meet the Team Page:**
      - Added Julia Kereszturi's profile to `teamMembers` in `src/data/teamData.js` as Web Developer (`icon: "code"`, `initials: "JK"`, `width: 800`, `height: 800`, `objectPosition: "center center"`).
      - Paired profile with her dedicated photograph (`public/grm-team/julia-kereszturi-profile-pic.jpg`) and client-provided description.
      - Automatically populated into Schema.org JSON-LD Person graph and interactive directory grid with circular mask overlay (`.team-card__avatar-mask`) and orbital ring.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 npm run build`: all 213 pages compiled cleanly in 9.69s with 0 errors.
  44. **PageSpeed Insights Agentic Browsing Accessibility & Form Submission Remediation:**
      - **Agentic Browsing Accessibility Tree Fixes:**
        - Fixed `Elements must only use supported ARIA attributes` on `<fieldset>` in `src/components/LeadForm.jsx` by removing `aria-required` and `aria-invalid` (which are invalid on ARIA `group` role elements per W3C WAI-ARIA and HTML-AAM specs), keeping valid `aria-describedby` and semantic `<legend>` required indicator.
        - Fixed `ARIA role should be appropriate for the element` in `src/components/MobileFlyoutMenu.astro` by replacing `<aside ... role="dialog">` with `<div ... role="dialog">` (per HTML-AAM, `<aside>` carries implicit role `complementary` and restricts allowed roles to `feed`, `note`, `region`, `search`).
      - **Gravity Forms WPGraphQL vs REST Submissions Remediation:**
        - Diagnosed `Unknown type "SubmitGfFormInput"` and `Cannot query field "submitGfForm" on type "RootMutation"` in browser console: confirmed that while core WPGraphQL was active, `WPGraphQL for Gravity Forms` (`v0.13.4` by AxePress Development) was aborting early because the uncompiled source code ZIP was installed without Composer's `vendor/autoload.php`.
        - Replaced with official pre-compiled release package `wp-graphql-gravity-forms.zip` from AxeWP GitHub Releases, activating `SubmitGfFormInput` and `submitGfForm` in the GraphQL schema.
        - Hardened `src/components/LeadForm.jsx`: cast form ID as `String(formId)` matching GraphQL `ID!` scalar requirements, and added an automatic dual-mode fallback to Gravity Forms' native REST API endpoint (`/wp-json/gf/v2/forms/${formId}/submissions`) so submissions never fail if GraphQL experiences connectivity or schema interruptions.
        - Documented release package installation requirements in `docs/Stage1-Headless-WP-Astro-Vercel-Template-Setup-Guide.md` and added `/docs/` to `.gitignore`.
  45. **Redesigned and Enhanced the `/thankyou/` Page with Graphical Assets:**
      - **Objective:** Transform the sparse, unstyled `/thankyou/` page into a high-trust, on-brand conversion confirmation experience utilizing Good Rep Media's graphical assets in `public/` (`public/grm-web-assets/`, `public/grm-main-graphics/`, `public/grm-web-icons/`), clear onboarding steps, and prominent navigation buttons back to the homepage (`/`) and to the services catalog (`/services/`).
      - **Implementation (`src/pages/thankyou.astro`):**
        - **Hero Section (`.thankyou-hero`):** Built a 2-column hero featuring pill breadcrumb navigation (`Home / Contact / Thank You`), a cyan status badge (`Message Received & Logged`), high-contrast heading typography, lead confirmation copy, and a signature `.thankyou-hero__checklist-card` (`border-left: 4px solid var(--color-cyan)`).
        - **Primary Action Buttons:** Prominently featured direct navigation buttons:
          - `<a href="/" class="btn btn--primary">Return to Homepage</a>`
          - `<a href="/services/" class="btn btn--outline">Explore Our Services</a>`
        - **Hero Artwork Composition:** Adhered strictly to the anti-clutter limit and zero text occlusion rules with an isolated media stage featuring `/grm-web-assets/blue-circular-background-graphic.svg` backdrop, `/grm-web-assets/online-support-graphic.svg` centerpiece, and 2 opposite-corner floating 3D accents (`/grm-web-assets/happy-face-speech-bubble-graphic.svg` top-right and `/grm-web-assets/calendar-graphic.svg` bottom-left) with `data-no-lightbox` and `aria-hidden="true"`.
        - **"What Happens Next?" 3-Step Roadmap with Orbital Medallions:** Built 3 onboarding step cards utilizing the signature `.step-card__medallion` pattern (spinning dashed `.step-card__orbit`, white circular tile with `/grm-web-icons/number-icon-1.svg`, `number-icon-2.svg`, `number-icon-3.svg`, and floating 3D graphical accents `/grm-web-assets/3d-search-window-graphic.svg`, `/grm-web-assets/3d-chat-bubbles-graphic.svg`, `/grm-web-assets/3d-rocket-graphic.svg`).
        - **Featured Capabilities Showcase with Graphical Illustrations:** Added 4 interactive service cards (Website Design & UX, Local SEO & Google Maps, Paid Advertising, Social Media Marketing) featuring dedicated visual headers with centerpiece illustrations from `public/grm-main-graphics/` (`website-design-graphic.svg`, `local-seo-marketing-graphic.svg`, `pay-per-click-marketing-graphic.svg`, `social-media-marketing-graphic.svg`), floating 3D corner accents from `public/grm-web-assets/`, and icon badges from `public/grm-web-icons/`, plus bottom CTA buttons linking to `/services/` and `/`.
        - **Immediate Assistance Banner:** Provided a dark surface banner with `/grm-main-graphics/handshake-hands.webp` badge and direct phone (`(616) 300-9868`), email (`team@goodrep.media`), and Grand Rapids office details.
        - **Tracking & View Transitions Lifecycle:** Preserved the isolated GA4 `generate_lead` conversion event script, and bound all GSAP animations inside `initThankYouPage()` on `astro:page-load` with `gsap.context()` cleanup on `astro:before-swap` and `clearProps: "transform,opacity"`.
      - Verified production build with `ASTRO_TELEMETRY_DISABLED=1 ./node_modules/.bin/astro build`: all 213 pages compiled cleanly in 8.14s with 0 errors.
  46. **Added Melani Sevova Photo to Meet the Team & Refined Thank You Turnaround Copy:**
      - **Melani Sevova Profile Photo Integration:** Committed 800x800 portrait `public/grm-team/melani-sevova.webp` and linked in `src/data/teamData.js` (`image: "/grm-team/melani-sevova.webp"`). Automatically rendered in `src/pages/meet-the-team.astro` with circular mask overlay (`.team-card__avatar-mask`), orbital ring, and Schema.org Person JSON-LD entity.
      - **Thank You Page Copy Refinement:** Updated `src/pages/thankyou.astro` response expectations to "within a few business days" across hero lead text and checklist card highlights, preserving the full orbital medallion stage and featured services showcase.
      - **Repository & Branch Reconciliation:** Resolved git conflict between `last-few-edits`, `main`, and `master`, verifying build and publishing all latest changes across tracking remotes.
  47. **Built Dedicated `/contact` Page & Cleaned Footer Form for Contact Route:**
      - **Objective:** Build an attractive, clutter-free `/contact` page with the same contact Gravity Forms component (`LeadForm`), remove redundant contact form elements from the footer on this specific route, and utilize assets in `public/` following the zero-occlusion and anti-clutter limit rules.
      - **Implementation (`src/pages/contact.astro`):**
        - **Breadcrumb & Hero Section (`.contact-hero`):** Added `Home / Contact` breadcrumb, pulsing green status pill ("Direct Line to Grand Rapids In-House Team"), bold headline, lead copy, and 3 trust indicators (`< 24-Hour Response`, `100% In-House Team`, `Zero Sales Pressure`).
        - **Interactive Hub Grid (`.contact-hub`):** 2-column layout pairing direct communication cards on the left with the Gravity Forms card on the right.
        - **Direct Communication Cards:** 4 clean cards with hover interactions for Direct Phone (`(616) 300-9868`), Direct Email (`team@goodrep.media`), Live Video Booking (`/chat/`), and Grand Rapids Studio Office with Google Maps link.
        - **Clutter-Free Visual Stage:** Adhered strictly to the Anti-Clutter Limit (1 background blob `blue-circular-background-graphic.svg`, 1 centerpiece `email-notification-graphic.svg`, and 2 opposite corner 3D accents `3d-chat-bubbles-graphic.svg` in lower-left and `paper-plane-graphic.svg` in top-right mirroring Blob 1 geometry). Zero text occlusion, isolated media container, `pointer-events: none`.
        - **The Gravity Form Card:** Embedded `<LeadForm client:visible submitLabel="Send Message" formId={15} />` inside an elevated card with top cyan accent border and privacy reassurance badge.
        - **3-Step "What to Expect" Process:** Clean cards detailing Step 01 (In-House Audit), Step 02 (1-on-1 Discussion), and Step 03 (Clear Action Plan).
        - **FAQ Section:** 4-item grid addressing turnaround times, in-person Grand Rapids visits, nationwide coverage, and month-to-month contracts.
        - **Grand Rapids Studio Section:** Dark surface card highlighting the studio address on Lake Michigan Drive with directions and phone actions.
        - **SEO & Schema:** Integrated `ContactPage` Schema.org JSON-LD graph referencing the site's `LocalBusiness` and `Organization` entities.
      - **Footer Contact Form Removal (`src/layouts/MainLayout.astro`):**
        - Added `hideFooterForm?: boolean` prop and route detection `isContactRoute = hideFooterForm || currentPath === "/contact"`.
        - Conditioned the fixed floating form button (`#fixed-form-btn`) and the global modal contact dialog (`#contact-modal`) to only render when `!isContactRoute`.
        - Updated footer navigation resource link and `src/components/MobileFlyoutMenu.astro` to point directly to `/contact/`.
  48. **Replaced Global Header and Flyout "Book a Call" CTA with "Contact Us" Linking to `/contact/`:**
      - Updated desktop global navigation CTA button in [`src/layouts/MainLayout.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/layouts/MainLayout.astro) from `<a href="/#consultation" ...>Book a Call</a>` to `<a href="/contact/" ...>Contact Us</a>`.
      - Updated mobile navigation drawer CTA button in [`src/components/MobileFlyoutMenu.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/components/MobileFlyoutMenu.astro) from `<a href="/#consultation" ...>Book a Call</a>` to `<a href="/contact/" ...>Contact Us</a>`.
   49. **Diagnosed and Resolved `_jsxDEV is not a function` in `LeadForm.jsx`:**
      - **Root Cause Investigation:** A previous `astro build` run set `NODE_ENV=production`, causing Vite's pre-bundler to optimize `react/jsx-dev-runtime` using `react-jsx-dev-runtime.production.js` (where `exports.jsxDEV = void 0`). When switching back to `astro dev`, the dev server served development JSX transforms (`import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime"`) while importing the cached production bundle where `_jsxDEV` was `undefined`, triggering `Uncaught TypeError: _jsxDEV is not a function at LeadForm (LeadForm.jsx:452:24)`.
      - **Remediation:**
        - Added `vite: { resolve: { dedupe: ['react', 'react-dom'] } }` to [`astro.config.mjs`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/astro.config.mjs) to prevent duplicate or conflicting React resolution.
        - Flushed the stale `node_modules/.vite` cache.
        - Verified that the dev server re-bundled `react_jsx-dev-runtime.js` using `react-jsx-dev-runtime.development.js` where `jsxDEV` is actively exported as a function.
  50. **Fixed `help_outline` and `rocket_launch` Material Symbols Icons Rendering as Text:**
      - **Root Cause Investigation:** The frontend uses an ultra-lean custom subset font ([`public/fonts/material-symbols-outlined-subset.woff2`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/public/fonts/material-symbols-outlined-subset.woff2)) generated via [`scripts/generate_font_subset.py`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/scripts/generate_font_subset.py) to save ~3.65 MB of font payload (97.6% savings). Neither `help_outline` nor `rocket_launch` was present in `target_words`. When glyph ligatures are missing from the subset font, Material Symbols falls back to displaying individual character glyphs (which are uppercase in the font's internal design, rendering as `HELP_OUTLINE` and `ROCKET_LAUNCH`).
      - **Remediation:**
        - Added `"help"`, `"help_outline"`, and `"rocket_launch"` to `target_words` in [`scripts/generate_font_subset.py`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/scripts/generate_font_subset.py).
        - Regenerated [`public/fonts/material-symbols-outlined-subset.woff2`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/public/fonts/material-symbols-outlined-subset.woff2) with `pyftsubset`, successfully packaging the ligatures and codepoints (`uniE887` for help/help_outline and `uniEB9B` for rocket_launch).
        - Added cache-busting version parameter (`?v=2`) to the font preload in [`src/components/BaseHead.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/components/BaseHead.astro) and `@font-face` declaration in [`src/styles/material-symbols.css`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/styles/material-symbols.css) to prevent browsers from serving stale cached font files.
        - Verified rendering in headless Chrome: confirmed that `help_outline`, `rocket_launch`, and all related icons render crisply as intended graphical glyphs.
  51. **Enhanced Contrast and Styling for Studio Outline Button on `/contact`:**
      - **Issue:** The secondary call CTA button (`.contact-studio__btn.btn--outline`) inside the dark `#0f172a` Grand Rapids Headquarters studio card inherited the global `.btn--outline` style (`color: #333333; border-color: #333333;`), producing a contrast ratio of only 1.35:1 against the dark slate background and rendering the button and icon nearly invisible.
      - **Remediation:**
        - Scoped `.contact-studio__btn.btn--outline` in [`src/pages/contact.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/contact.astro) with crisp 2px solid white border (`#ffffff`), pure white text (`#ffffff`), and white icon.
        - Sized both studio buttons with matching padding (`0.85rem 1.75rem`) and typography (`0.95rem`, font-weight `600`).
        - Added interactive hover/focus states (`background: rgba(255, 255, 255, 0.16); border-color: #ffffff; color: #ffffff; transform: translateY(-2px);`) so the button remains high-contrast white in all states (~17.5:1 resting contrast, exceeding WCAG AAA).
        - Added accessible focus ring (`outline: 2px solid var(--color-cyan); outline-offset: 3px;`).
  52. **Responsive Column-Reverse for `/contact` Hub on Tablet & Mobile:**
      - **Implementation:** Configured `@media (max-width: 1024px)` on `.contact-hub__grid` in [`src/pages/contact.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/contact.astro) using `display: flex; flex-direction: column-reverse; gap: 3rem;`.
      - **Result:**
        - On tablet and mobile screens, the Gravity Forms contact card (`.contact-hub__right`) elevates directly beneath the hero for immediate user interaction without requiring scrolling past direct contact cards or decorative graphics.
        - Direct communication channels (`.contact-channels-grid`) and art stage (`.contact-hub__left`) render neatly underneath the form.
        - Formatted `.contact-channels-grid` as an organized 2x2 grid on tablet viewports (`repeat(2, 1fr)` between 640px and 1024px) and a single stacked column (`1fr`) on mobile devices (< 640px).
        - Desktop viewports (> 1024px) remain a 2-column side-by-side grid.
  53. **Removed `contact-studio` Section and CSS from `/contact`:**
      - Removed the `<section class="contact-studio">` HTML block from [`src/pages/contact.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/contact.astro) (studio card, Google Maps link, phone button, and Local Presence badge).
      - Removed all accompanying CSS rules (`.contact-studio`, `.contact-studio__card`, `.contact-studio__content`, `.contact-studio__btn`, `.contact-studio__badge`, etc.) and their responsive breakpoint rules from `<style>`.
      - Eliminates duplication since the studio location, directions, and phone number are already cleanly featured in the direct communication cards and the global footer.
  54. **Scoped Node.js Engine to `22.x || 24.x` in `package.json`:**
      - **Issue:** Vercel build log emitted warnings regarding unbounded `"node": ">=22.12.0"`, causing Vercel to override the project's configured Node 24.x setting and jump to Node 26.x.
      - **Remediation:** Updated `engines.node` in [`package.json`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/package.json) to `"22.x || 24.x"`, capping the upper version to prevent automatic major upgrades and aligning Vercel's build runner with the project's Node 24.x configuration.
  55. **Configured Gravity Forms Form ID 17 and Field Mappings on `/medspa-google-ads/` for LeadBranch Integration:**
      - **Issue:** Form submissions from [`src/pages/medspa-google-ads.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/medspa-google-ads.astro) were not appearing in the LeadBranch list `6ad8dabd7a6e0b3f0106e927` ("Med Spa Landing Page"). General contact forms across other pages were routing successfully.
      - **Root Cause Investigation:**
        - In WordPress Gravity Forms, Form ID 17 ("GRM - Spa and Esthetician") is configured with the LeadBranch feed sending to List ID `6ad8dabd7a6e0b3f0106e927`, with custom tag mapping `company_name` -> Form Field `Company Name` (Field 4).
        - While [`src/pages/spa-esthetician-business.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/spa-esthetician-business.astro) explicitly provided `formId={17}` and field mapping IDs, [`src/pages/medspa-google-ads.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/medspa-google-ads.astro) omitted `formId` and `fieldIds`, and `auditConsultData` in [`src/data/medspaGoogleAdsData.js`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/data/medspaGoogleAdsData.js) lacked `formId`.
        - Because `ConsultSection.astro` defaults to `formId = 15` when omitted, all submissions on `/medspa-google-ads/` were sent to Form ID 15 ("Book Your Free Consultation"), which is linked to the general consultation feed rather than the Med Spa LeadBranch feed.
      - **Remediation:**
        - Added `formId: 17` and explicit `fieldIds` mapping (`COMPANY: 4, EMAIL: 5, PHONE: 6, SERVICES_NEEDED: 7, MESSAGE: 9, FIRST_NAME: 12, LAST_NAME: 13`) to `auditConsultData` in [`src/data/medspaGoogleAdsData.js`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/data/medspaGoogleAdsData.js).
        - Bound `formId={auditConsultData.formId}` and `fieldIds={auditConsultData.fieldIds}` to `<ConsultSection>` in [`src/pages/medspa-google-ads.astro`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/pages/medspa-google-ads.astro).
        - Verified that [`src/components/LeadForm.jsx`](file:///Users/jamesgreen/software_engineer/goodrep-media-frontend/src/components/LeadForm.jsx) properly submits Field 4 as `company` across both WPGraphQL (`submitGfForm` input `{ id: 4, value: formData.company }`) and the REST API fallback (`/wp-json/gf/v2/forms/17/submissions` payload `input_4: formData.company`), ensuring full delivery into LeadBranch list `6ad8dabd7a6e0b3f0106e927` with the `company_name` custom field tag.
- **Current Objective:** Proceed to Step 8: End-to-end responsiveness, accessibility auditing, and performance optimization across all service pages and core routes.
