// src/data/work/capeCoralReviewedData.js

export const metaData = {
  title: "Cape Coral Reviewed - Good Rep Media",
  description:
    "Cape Coral Reviewed partnered with Good Rep Media to engineer a high-performance headless web application, decoupled directory platform, and local SEO system.",
  ogUrl: "https://goodrep.media/our-work/cape-coral-reviewed/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Cape Coral Reviewed", current: true },
  ],
  kicker: "CASE STUDY // HEADLESS WEB APPLICATION",
  title: "CAPE CORAL REVIEWED",
  bgImage: "/grm-web-assets/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Cape Coral Reviewed is a premier local business and lifestyle directory dedicated to spotlighting top-rated services, dining, and attractions across Cape Coral, Florida. To deliver instant search responses and handle extensive directory databases, they required a modern, enterprise-grade architecture. Good Rep Media designed and built a decoupled headless web application pairing a Next.js frontend with WordPress, delivering ultra-fast page speeds, seamless mobile usability, and maximum local search discoverability.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Headless Web Application",
      "Custom API Development",
      "UI/UX Design",
      "Technical SEO & Schema",
      "Brand Identity Refresh",
      "Content Strategy",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/cape-coral-reviewed-website-samples.webp",
    alt: "Cape Coral Reviewed local directory and reviews platform displayed across desktop and mobile devices",
    width: 2752,
    height: 1536,
  },
  cta: {
    label: "Visit Site",
    href: "https://capecoralreviewed.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Cape Coral Reviewed Stats",
  sub: "Significant reach, user growth, and performance milestones attained through headless engineering and local SEO architecture.",
  stats: [
    {
      prefix: "+",
      value: 134,
      suffix: "%",
      barPercent: 92,
      label: "Active user growth quarter over quarter",
    },
    {
      prefix: "+",
      value: 147,
      suffix: "%",
      barPercent: 95,
      label: "Increase in directory page views",
    },
    {
      value: 100,
      suffix: "/100",
      barPercent: 100,
      label: "Technical SEO & Core Web Vitals score",
    },
    {
      value: 0.6,
      decimals: 1,
      suffix: "s",
      barPercent: 96,
      label: "Average time to interactive speed",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/cape-coral-reviewed-facebook.webp",
    alt: "Cape Coral Reviewed community presence and local business directory showcase",
    width: 1254,
    height: 1482,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Building an authoritative community directory requires more than static listings—it demands instantaneous search speeds, responsive mobile browsing, and scalable infrastructure capable of indexing hundreds of businesses across diverse categories. Monolithic directory platforms frequently struggle with slow database response times, bloated code, and rigid design systems that frustrate mobile users and restrict local SEO rankings.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media architected a high-performance headless web application combining Next.js with a scalable WordPress backend. Automated JSON-LD structured data and local schema were implemented across every category and vendor listing to dominate Google local search results. Coupled with an intuitive UI/UX, localized editorial content, and active community social integration, Cape Coral Reviewed now delivers a lightning-fast directory resource for Cape Coral residents and business owners alike.",
    },
  ],
};

export const consultData = {
  id: "consultation",
  kicker: "Ready to upgrade your online presence?",
  title: "Book A FREE 1-on-1 Marketing & Web Strategy Call",
  text: "We'll audit your current website, local search rankings, and marketing funnels to engineer a personalized plan for sustainable growth.",
  cardTitle: "Get Your Custom Strategy Plan",
  submitLabel: "Claim My Free Strategy Session",
  contact: [
    { icon: "call", label: "(616) 300-9868", href: "tel:+16163009868" },
    {
      icon: "mail",
      label: "team@goodrep.media",
      href: "mailto:team@goodrep.media",
    },
  ],
  art: {
    main: {
      src: "/grm-web-assets/online-support-graphic.svg",
      width: 612,
      height: 330,
    },
    floats: [
      {
        src: "/grm-web-assets/digital-marketing-badge.svg",
        width: 140,
        height: 140,
        x: -40,
        y: 40,
        depth: 18,
      },
      {
        src: "/grm-web-assets/expert-team-badge.svg",
        width: 130,
        height: 130,
        x: 40,
        y: -30,
        depth: 26,
      },
    ],
  },
};
