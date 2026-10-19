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

## 📌 Active Context & Files
- `src/layouts/MainLayout.astro` -> Global layout wrapper with DRY head metadata, navigation bar, consultation modal, and footer.
- `src/components/LeadForm.jsx` & `src/components/LeadForm.css` -> Interactive React Gravity Form island (Form ID 15) with fallback status feedback.
- `src/lib/api.js` -> Dynamic server fetch utility mapping WordPress data (REST or GraphQL) cleanly into standardized article objects.
- `src/styles/gutenberg.css` -> Restores Gutenberg block styling (columns, galleries, blockquotes, alignments) stripped by headless GraphQL/REST.
- `src/pages/index.astro` -> Homepage featuring GSAP hero phrase rotator, synchronized graphics, marquee, services, portfolio, process sections, and Knowledge Center feed.
- `src/pages/services.astro` -> Master services catalog with anchor pill nav, alternating service blocks, and lead funnel.
- `src/pages/work.astro` -> Portfolio showcase, stats ribbon with GSAP fromTo animations, and client case studies.
- `src/pages/about.astro` -> Brand story, company pillars, and agency values.
- `src/pages/blog/index.astro` -> Master blog feed with BEM architecture (`blog-feed`) displaying all published articles from WordPress.
- `src/pages/blog/[slug].astro` -> Dynamic single blog route with 70/30 funnel layout, DOMPurify XSS sanitization, and sticky `LeadForm` sidebar.
- `src/pages/services/web-design.astro` -> Flagship master service detail template page (Web Design & Development) upgraded with homepage-caliber GSAP choreography and decomposed multi-layer vector assets.

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
- [/] Step 7: Build out dedicated individual pages per service (`/services/[service]`): <!-- CURRENTLY WORKING HERE -->
  - [x] **Web Design & Development** (`src/pages/services/web-design.astro`) — Flagship Master Template
  - [ ] **Local SEO & Google Maps** (`src/pages/services/local-seo.astro`) — Next Target
  - [ ] **Technical SEO & Speed** (`src/pages/services/technical-seo.astro`)
  - [ ] **Paid Search & Social Ads** (`src/pages/services/paid-ads.astro`)
  - [ ] **Social Media Management** (`src/pages/services/social-media.astro`)
  - [ ] **Digital Media & Video** (`src/pages/services/digital-media.astro`)
  - [ ] **E-Commerce & Amazon** (`src/pages/services/amazon-ecommerce.astro`)
  - [ ] **Link Building & Authority** (`src/pages/services/link-building.astro`)
  - [ ] **Email & SMS Marketing** (`src/pages/services/email-marketing.astro`)
- [ ] Step 8: End-to-end responsiveness, accessibility auditing, and performance optimization
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
- **Current Objective:** Review automated summary plan with user; proceed with Step 7 (`src/pages/services/local-seo.astro`).
