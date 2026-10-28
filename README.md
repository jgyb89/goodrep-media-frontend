# Good Rep Media Frontend (`goodrep-media-frontend`)

[![Astro](https://img.shields.io/badge/Astro-7.3.8-BC52EE?style=flat&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.3.1-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev/)
[![Node](https://img.shields.io/badge/Node->=22.12.0-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat)](#license)

High-performance, decoupled marketing website for [Good Rep Media](https://goodrep.media) — a full-service digital marketing, SEO, paid media, and web design agency.

Engineered with **Astro 7 (Static Site Generation)**, **React 19 Islands**, and a **Headless WordPress CMS** backend. The architecture delivers sub-second Core Web Vitals, enterprise technical SEO with full JSON-LD structured data graphs, resilient static blog pagination, and client-side lead capture forms integrated with Gravity Forms.

---

## Table of Contents

1. [Architectural Overview](#architectural-overview)
2. [Key Capabilities & Technical Highlights](#key-capabilities--technical-highlights)
3. [Technology Stack](#technology-stack)
4. [Repository Directory Structure](#repository-directory-structure)
5. [Route Matrix](#route-matrix)
6. [Prerequisites & Environment Configuration](#prerequisites--environment-configuration)
7. [Local Development & Available Scripts](#local-development--available-scripts)
8. [Dual-Mode WordPress API Adapter](#dual-mode-wordpress-api-adapter)
9. [Lead Capture & Isolated Ad Tracking Funnel](#lead-capture--isolated-ad-tracking-funnel)
10. [Edge Redirects & Deployment Pipeline](#edge-redirects--deployment-pipeline)
11. [Related SOP Documentation](#related-sop-documentation)
12. [License & Ownership](#license--ownership)

---

## Architectural Overview

The frontend operates as a decoupled Jamstack application. Content authoring occurs in WordPress, while the presentation tier is pre-compiled into static HTML, CSS, and minimal JavaScript deployed to the edge.

```
+-----------------------------------------------------------------------------------+
|                        HEADLESS WORDPRESS CMS (wp.goodrep.media)                  |
|  - Content Management: Posts, Categories, Taxonomies, Gutenberg Blocks            |
|  - SEO Meta: Yoast SEO / RankMath OpenGraph & Schema payloads                     |
|  - Forms Engine: Gravity Forms Lead Capture (IDs: 1, 15, 17)                      |
|  - APIs: WP REST API (/wp-json/wp/v2) + WPGraphQL (/graphql)                      |
+-----------------------------------------+-----------------------------------------+
                                          |
                 1. Build-Time Fetch      |      2. Runtime Client Mutation
            (posts, categories, media)    |    (submitGfForm -> /thankyou/ redirect)
                                          v
+-----------------------------------------------------------------------------------+
|                     ASTRO STATIC FRONTEND (goodrep-media-frontend)                |
|  - Static Generation (SSG): 200+ pre-rendered pages, archives, and case studies   |
|  - Universal API Adapter (src/lib/api.js): In-memory cache + Fail-fast Build Guard |
|  - Asset Optimization: astro:assets WebP/AVIF pipeline + @fontsource bundling     |
|  - Client Routing: <ClientRouter /> SPA view transitions                          |
|  - Lead Form Island: React 19 + isomorphic-dompurify XSS sanitization             |
|  - Structured Data: Composable JSON-LD @graph (Organization, Service, FAQ, Blog)  |
+-----------------------------------------+-----------------------------------------+
                                          |
                                          v
+-----------------------------------------------------------------------------------+
|                        GLOBAL EDGE HOSTING & CDNs                                 |
|  - Primary Production: Vercel Edge Network (trailingSlash, 301 edge redirects)     |
|  - Staging / CI Previews: GitHub Pages via GitHub Actions (deploy.yml)            |
+-----------------------------------------------------------------------------------+
```

---

## Key Capabilities & Technical Highlights

- **Sub-Second Core Web Vitals (CWV):** 100% pre-rendered static HTML via Astro SSG. Zero remote font calls via self-hosted `@fontsource/poppins` and `@fontsource/open-sans` WOFF2 fonts.
- **Fail-Fast Build Guard:** `src/lib/api.js` automatically halts builds with descriptive errors if the WordPress API returns zero posts or an HTTP error, preventing accidental deployments of empty blog feeds.
- **Static Blog & Category Archive Architecture:**
  - Root feed: `/blog/` (displays latest posts and featured articles)
  - Paginated pages: `/blog/page/[page]/` (10 posts per page with canonical next/prev links)
  - Category archives: `/blog/category/[slug]/` and `/blog/category/[slug]/[page]/`
  - Scoped Gutenberg block stylesheet (`src/styles/gutenberg.css`) with XSS sanitization via `isomorphic-dompurify`.
- **Selective React 19 Islands:** Interactive elements (such as `LeadForm.jsx`) hydrate on demand (`client:load` or `client:idle`), keeping baseline JavaScript payload near zero.
- **Isolated Ad Tracking & Attribution Funnel:**
  - Base tracking scripts (`gtag.js` for Google Ads `AW-11145254205` and Meta Pixel `218969576119934`) load once globally via `TrackingHead.astro`.
  - Conversion events (`AW-11145254205/kVQFCPT00u8YEL2qvMIp`) fire **exclusively** on the isolated, `noindex` `/thankyou/` landing route upon successful submission.
- **Responsive Multi-Level Mobile Flyout Menu:** A custom sliding drawer (`MobileFlyoutMenu.astro`) providing multi-level navigation with drill-down submenus for service lines.
- **Dynamic Case Study Registry:** Clean URL slug resolution and legacy aliases via `src/data/work/caseStudiesRegistry.js` supporting deliverables grids, client metrics, and lightbox image zoom modals (`LightboxModal.astro`).
- **Comprehensive Edge Redirects:** Over 10 permanent 301 edge redirects configured in `vercel.json` to preserve link equity during URL structure refactors.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) | `>= 22.12.0` | Modern LTS JavaScript engine |
| **Framework** | [Astro](https://astro.build/) | `^7.3.8` | Static site compiler, `astro:assets`, `<ClientRouter />` |
| **UI Component Islands** | [React](https://react.dev/) | `^19.3.1` | Client-side interactive forms via `@astrojs/react` |
| **Animations** | [GSAP](https://gsap.com/) | `^3.15.0` | Scroll-triggered animations, smooth UI interactions, modal controls |
| **Typography** | [Fontsource](https://fontsource.org/) | `^5.3.0` | Self-hosted WOFF2 fonts (`Poppins`, `Open Sans`) |
| **Icons** | [Material Symbols](https://fonts.google.com/icons) | `^0.40.2` | Google Material Symbols Outlined font and ligatures |
| **HTML Sanitizer** | [DOMPurify](https://github.com/cure53/DOMPurify) | `^3.19.0` | Client-safe sanitization for WordPress Gutenberg HTML output |
| **SEO & Sitemap** | [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) | `^3.7.4` | Automated XML sitemap generation with path exclusion filters |
| **Production CDN** | [Vercel](https://vercel.com/) | Edge | Edge network caching, header control, and 301 redirects |
| **CI / Preview** | [GitHub Actions](https://github.com/features/actions) | v4 | Automated builds and deployment to GitHub Pages |

---

## Repository Directory Structure

```text
goodrep-media-frontend/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI workflow for GitHub Pages
├── public/                         # Public static files copied directly to dist/
│   ├── favicon.svg                 # SVG site favicon
│   ├── grm-logos/                  # Brand SVG and WebP logo variations
│   ├── grm-main-graphics/          # Visual artwork and decorative SVGs
│   ├── grm-web-assets/             # Consultation graphics, speech bubbles, icons
│   └── grm-web-icons/              # Service icons and badges
├── scripts/
│   └── prepare-gh-pages.mjs        # Asset path prefix rewriter for GitHub Pages staging
├── src/
│   ├── assets/                     # High-res images processed by astro:assets
│   │   ├── case-studies/           # Case study mockups, before/after graphics
│   │   └── graphics/               # Service diagrams and responsive project cards
│   ├── components/                 # Reusable Astro & React components
│   │   ├── BaseHead.astro          # Metadata, OpenGraph, Canonical URLs, <ClientRouter />
│   │   ├── TrackingHead.astro      # Google Ads & Meta Pixel base scripts
│   │   ├── MobileFlyoutMenu.astro  # Multi-level mobile drawer navigation
│   │   ├── LeadForm.jsx            # React 19 lead generation form island
│   │   ├── LeadForm.css            # Scoped styles for the form island
│   │   ├── CaseStudyHero.astro     # Hero header for client case studies
│   │   ├── CaseStudyNarrative.astro# Case study story and deliverables layout
│   │   ├── CaseStudyStats.astro    # High-impact quantitative client metrics
│   │   ├── ConsultSection.astro    # Consultation callout with embedded LeadForm
│   │   ├── DeliverablesGrid.astro  # Work sample gallery grid
│   │   ├── LightboxModal.astro     # GSAP-driven image zoom lightbox
│   │   ├── PillarsSection.astro    # Strategic service pillars section
│   │   ├── ProcessSection.astro    # Step-by-step workflow process layout
│   │   ├── ReadyBand.astro         # Call-to-action transition banner
│   │   ├── ServiceHero.astro       # Service page hero component
│   │   ├── ServiceDefinition.astro # SEO definition / featured snippet block
│   │   └── StatsBand.astro         # Numerical credibility statistics band
│   ├── config/
│   │   └── site.js                 # Global constants: contact info, brand names, legal links
│   ├── data/                       # Content models and page-specific copy
│   │   ├── homeData.js             # Homepage copy, FAQs, and testimonials
│   │   ├── work/                   # Case study data modules
│   │   │   ├── caseStudiesRegistry.js # Central registry mapping slugs to case study data
│   │   │   ├── abodeServicesData.js
│   │   │   ├── beBalancedData.js
│   │   │   ├── capeCoralLawnCareData.js
│   │   │   └── ...                 # Additional case studies
│   │   └── *Data.js                # Service page data files (SEO, PPC, Social, etc.)
│   ├── layouts/
│   │   ├── MainLayout.astro        # Primary site shell (header, footer, BaseHead, schema)
│   │   └── LandingLayout.astro     # Distraction-free shell for paid advertising landers
│   ├── lib/
│   │   └── api.js                  # WordPress API client (REST + WPGraphQL, cache, build guard)
│   ├── pages/                      # File-based routing
│   │   ├── index.astro             # Agency homepage
│   │   ├── about.astro             # About Good Rep Media
│   │   ├── services.astro          # Services hub directory
│   │   ├── services/               # Individual service line landing pages
│   │   │   ├── pay-per-click-marketing.astro
│   │   │   ├── local-seo.astro
│   │   │   ├── technical-seo.astro
│   │   │   ├── web-design.astro
│   │   │   ├── ecommerce-web-design.astro
│   │   │   ├── social-media-marketing.astro
│   │   │   ├── video-production-services.astro
│   │   │   └── ...
│   │   ├── work.astro              # Portfolio hub
│   │   ├── work/[slug].astro       # Dynamic case study route
│   │   ├── our-work/[slug].astro   # Canonical rewrite / forwarder to /work/[slug]
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog root feed (Page 1)
│   │   │   ├── [slug].astro        # Single blog post article template
│   │   │   ├── page/[page].astro   # Paginated blog archive (Page 2+)
│   │   │   └── category/[slug]/[...page].astro # Category archive with pagination
│   │   ├── thankyou.astro          # Isolated ad conversion route
│   │   ├── lawn-care-business.astro # Industry-specific landing page
│   │   ├── medspa-google-ads.astro # Niche Google Ads landing page
│   │   └── spa-esthetician-business.astro # Industry landing page
│   ├── scripts/
│   │   └── motion.js               # GSAP animation controllers and scroll observers
│   └── styles/
│       ├── global.css              # Global tokens, CSS variables, typography, reset
│       └── gutenberg.css           # Styling rules for WordPress Gutenberg HTML blocks
├── astro.config.mjs                # Astro configuration, sitemap integration, image domains
├── package.json                    # Scripts, dependencies, Node engine declaration
├── tsconfig.json                   # Strict TypeScript compiler options
├── vercel.json                     # Trailing-slash policy and 301 edge redirects
└── SOP-*.md                        # Architecture & DNS Standard Operating Procedures
```

---

## Route Matrix

| Route Pattern | Template File | Description |
| :--- | :--- | :--- |
| `/` | `src/pages/index.astro` | Homepage with hero, services overview, stats, case studies, and lead form |
| `/about/` | `src/pages/about.astro` | Company story, mission, and team profile |
| `/services/` | `src/pages/services.astro` | Directory hub listing all marketing solutions |
| `/services/[service-slug]/` | `src/pages/services/*.astro` | High-intent service landing pages (e.g. `pay-per-click-marketing`, `local-seo`, `web-design`) |
| `/work/` | `src/pages/work.astro` | Agency case studies and portfolio directory |
| `/work/[slug]/` | `src/pages/work/[slug].astro` | Dynamic single case study route driven by `caseStudiesRegistry.js` |
| `/blog/` | `src/pages/blog/index.astro` | Blog home feed (page 1) fetching published WordPress posts |
| `/blog/page/[page]/` | `src/pages/blog/page/[page].astro` | Static pagination route for blog posts (10 posts per page) |
| `/blog/category/[slug]/` | `src/pages/blog/category/[slug]/[...page].astro` | Static category archives supporting multi-page pagination |
| `/blog/[slug]/` | `src/pages/blog/[slug].astro` | Single blog article layout with Gutenberg markup rendering |
| `/thankyou/` | `src/pages/thankyou.astro` | `noindex` confirmation page firing Google Ads conversion tags |
| Industry Landers | `src/pages/*.astro` | Targeted funnels (`/lawn-care-business/`, `/medspa-google-ads/`, `/spa-esthetician-business/`) |

---

## Prerequisites & Environment Configuration

### System Requirements

- **Node.js**: `>= 22.12.0` (Recommended: latest Node 22 LTS)
- **Package Manager**: `npm` (v10+)

### Environment Variables

Create a `.env` or `.env.local` file in the project root:

```ini
# Primary WordPress REST API origin endpoint
PUBLIC_WORDPRESS_API_URL=https://wp.goodrep.media/wp-json/wp/v2

# Optional: Dedicated WPGraphQL endpoint (defaults to /graphql on the API origin)
PUBLIC_WORDPRESS_GRAPHQL_URL=https://wp.goodrep.media/graphql

# Build flag for GitHub Pages deployment (automatically set in GitHub Actions)
GITHUB_PAGES=false

# Optional: Disable Astro CLI telemetry prompts in CI/CD environments
ASTRO_TELEMETRY_DISABLED=1
```

| Variable | Required | Default Value | Description |
| :--- | :---: | :--- | :--- |
| `PUBLIC_WORDPRESS_API_URL` | **Yes** | `https://wp.goodrep.media/wp-json/wp/v2` | URL for WordPress REST endpoints |
| `PUBLIC_WORDPRESS_GRAPHQL_URL` | No | Derived from `PUBLIC_WORDPRESS_API_URL` | Endpoint for Gravity Forms GraphQL mutations |
| `GITHUB_PAGES` | No | `false` | Sets `noindex` meta and triggers path rewrites during GitHub Pages builds |
| `ASTRO_TELEMETRY_DISABLED` | No | `0` | Disables telemetry file writes in restricted sandboxes |

---

## Local Development & Available Scripts

Install all project dependencies:

```bash
npm install
```

### Available NPM Scripts

```bash
# Start local development server with Hot Module Reloading (HMR)
npm run dev

# Compile full production static build into dist/
npm run build

# Build for GitHub Pages preview (rewrites root-relative assets to /goodrep-media-frontend/)
npm run build:gh-pages

# Locally preview the built dist/ static site
npm run preview

# Run Astro CLI commands
npm run astro
```

> **Tip for Restricted Sandboxes:** If running in an environment without write permissions to `~/Library/Preferences/astro/config.json`, prepend `ASTRO_TELEMETRY_DISABLED=1`:
> ```bash
> ASTRO_TELEMETRY_DISABLED=1 npm run build
> ```

---

## Dual-Mode WordPress API Adapter

The file [`src/lib/api.js`](src/lib/api.js) provides a resilient abstraction layer over WordPress data:

1. **Auto-Detection:** Automatically detects whether `PUBLIC_WORDPRESS_API_URL` points to a GraphQL or REST endpoint.
2. **Build-Time In-Memory Caching:** When pre-rendering hundreds of static pages, `ensureFullPostsCache()` fetches all posts once and serves subsequent page queries from memory (`cachedPostBySlug`).
3. **Fail-Fast Build Guard:**
   ```javascript
   if (!Array.isArray(posts) || posts.length === 0) {
     throw new Error(
       `[Build Guard] WordPress API (${API_URL}) returned 0 posts. Failing build to prevent silent blog wipeout.`
     );
   }
   ```
4. **Media & Taxonomy Resolution:** Decodes HTML entities (`decodeHtmlEntities`), resolves featured media URLs from `_embedded['wp:featuredmedia']`, and maps numeric category IDs to category slugs and names.

---

## Lead Capture & Isolated Ad Tracking Funnel

### 1. Client-Side Lead Form (`LeadForm.jsx`)
- Built with React 19 and sanitized using `isomorphic-dompurify`.
- Sends form submissions via GraphQL mutation directly to the WordPress origin:
  ```graphql
  mutation SubmitLeadForm($input: SubmitGfFormInput!) {
    submitGfForm(input: $input) {
      confirmation {
        type
        message
        url
      }
      errors {
        id
        message
      }
    }
  }
  ```
- Upon success, redirects the user to `/thankyou/`.

### 2. Isolated Attribution (`/thankyou/`)
To prevent duplicate conversions or ad spend waste from client-side SPA navigation:
- `TrackingHead.astro` loads base Google tag (`gtag.js` for `AW-11145254205`) and Meta Pixel globally across all pages.
- The conversion tag fires **only** on `/thankyou/`:
  ```html
  <script is:inline>
    window.addEventListener('load', function() {
      if (typeof gtag === 'function') {
        gtag('event', 'conversion', {'send_to': 'AW-11145254205/kVQFCPT00u8YEL2qvMIp'});
      }
    });
  </script>
  ```
- The `/thankyou/` page includes `<meta name="robots" content="noindex,follow" />` and is filtered out of `sitemap-index.xml` via `astro.config.mjs`.

---

## Edge Redirects & Deployment Pipeline

### Edge Redirects (`vercel.json`)
Redirects are processed at Vercel's global edge network prior to rendering:

```json
{
  "trailingSlash": true,
  "redirects": [
    { "source": "/paid-ads/", "destination": "/pay-per-click-marketing/", "statusCode": 301 },
    { "source": "/social-media/", "destination": "/social-media-marketing/", "statusCode": 301 },
    { "source": "/sms-marketing/", "destination": "/sms-marketing-services/", "statusCode": 301 },
    { "source": "/digital-media/", "destination": "/digital-media-services/", "statusCode": 301 },
    { "source": "/video-production/", "destination": "/video-production-services/", "statusCode": 301 },
    { "source": "/amazon-marketing/", "destination": "/amazon-marketing-services/", "statusCode": 301 },
    { "source": "/our-work/:slug", "destination": "/work/:slug", "statusCode": 301 },
    { "source": "/be-balanced-bodyworks/", "destination": "/work/be-balanced-bodyworks/", "statusCode": 301 },
    { "source": "/home-owners-help-options/", "destination": "/work/home-owners-help-options/", "statusCode": 301 },
    { "source": "/abode-home-services/", "destination": "/work/abode-home-services/", "statusCode": 301 }
  ]
}
```

### Production Deployments (Vercel)
- Connect repository to Vercel.
- Framework Preset: **Astro**
- Build Command: `astro build` (or `npm run build`)
- Output Directory: `dist`
- Install Command: `npm install`
- Production apex domain: `goodrep.media` (points to Vercel Anycast IP via cPanel Zone Editor).

### Staging Deployments (GitHub Pages)
- Triggered automatically on pushes to `main` or `graphical-update` via `.github/workflows/deploy.yml`.
- Runs `npm run build:gh-pages` which executes `node scripts/prepare-gh-pages.mjs` to rewrite absolute asset and link URLs for the subpath `/goodrep-media-frontend/`.

---

## Related SOP Documentation

For comprehensive technical guides and setup walkthroughs, refer to the included Standard Operating Procedures:

- **[SOP-Headless-WordPress-Astro-Marketing-Site-Universal.md](SOP-Headless-WordPress-Astro-Marketing-Site-Universal.md)**: Universal engineering blueprint covering WordPress plugin setup, GraphQL schemas, fail-fast build guards, JSON-LD schemas, and new site replication.
- **[SOP-Vercel-WHM-cPanel-DNS-Setup-Guide.md](SOP-Vercel-WHM-cPanel-DNS-Setup-Guide.md)**: DNS guide for pointing domains and subdomains from WHM/cPanel Zone Editor to Vercel without disrupting existing email or WordPress hosting.

---

## License & Ownership

Copyright &copy; 2026 Good Rep Media Inc. All rights reserved.  
Internal repository for Good Rep Media digital assets and production infrastructure.
