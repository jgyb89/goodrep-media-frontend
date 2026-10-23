// src/data/work/capeCoralReviewedData.js

export const metaData = {
  title: "Cape Coral Reviewed - Good Rep Media",
  description:
    "Cape Coral Reviewed partnered with Good Rep Media to launch a headless directory app, scale a thriving 13.6K+ member Facebook group, achieve a 100/100 technical SEO score, and drive 57K active users YTD.",
  ogUrl: "https://goodrep.media/our-work/cape-coral-reviewed/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Cape Coral Reviewed", current: true },
  ],
  kicker: "CASE STUDY // FULL-FUNNEL GROWTH & HEADLESS WEB APP",
  title: "CAPE CORAL REVIEWED",
  bgImage: "/grm-web-assets/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Cape Coral Reviewed partnered with Good Rep Media to turn local directory discovery into an active community growth engine. When the headless web app launched in June with a flawless 100/100 technical SEO score, organic performance surged—driving 57K active users, 115K page views, and 89.6K search impressions year-to-date. Combined with a Facebook group scaled to over 13.6K local members, Cape Coral Reviewed quickly became Southwest Florida's go-to digital hub.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Headless Web App (Launched June)",
      "13.6K+ Facebook Community Growth",
      "Organic Google SEO (89.6K Impressions)",
      "Flawless 100/100 Technical SEO Score",
      "GA4 Analytics Architecture (57K Users)",
      "Local Directory UI/UX & Content Strategy",
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
  title: "Cape Coral Reviewed Performance & Analytics",
  sub: "Verified Google Analytics 4 and Google Search Console performance tracked since the app's June launch through year-to-date growth.",
  stats: [
    {
      value: 57,
      suffix: "K",
      barPercent: 95,
      label: "Active users year-to-date (+591.1% lift)",
    },
    {
      value: 115,
      suffix: "K",
      barPercent: 92,
      label: "Directory page views post-June launch (+534%)",
    },
    {
      value: 13.6,
      decimals: 1,
      suffix: "K+",
      barPercent: 94,
      label: "Engaged local Facebook group members",
    },
    {
      value: 100,
      suffix: "/100",
      barPercent: 100,
      label: "Technical SEO score (89.6K Google impressions)",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/cape-coral-reviewed-facebook.webp",
    alt: "Cape Coral Reviewed active Facebook community with over 13.6K local members",
    width: 1254,
    height: 1482,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Prior to June 2026, Cape Coral Reviewed faced flat search visibility and limited audience reach, struggling against bloated legacy directory platforms that suffered from sluggish load times and poor mobile responsiveness. Google Search Console logged near-zero daily impressions and minimal clicks throughout late 2025 and early 2026. Without a high-speed digital hub or an active community flywheel, local businesses had no modern platform to showcase services, and residents lacked a reliable, real-time channel to discover trusted local recommendations.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media executed an end-to-end growth and engineering overhaul. In June, we launched a headless Next.js web application coupled with WordPress, achieving an unprecedented 100/100 technical SEO score. Almost immediately, Google Search Console impressions rocketed from flatlines to 89.6K total impressions with daily traffic peaks surpassing 1.2K impressions. Simultaneously, Good Rep Media catalyzed community adoption, scaling the Cape Coral Reviewed Facebook group to over 13.6K active local members who generate daily discussions, reviews, and vendor inquiries. This unified funnel fueled remarkable year-to-date Google Analytics milestones: 57K active users (+591.1%), 115K views (+534%), and 320K user engagement events—solidifying Cape Coral Reviewed as Southwest Florida's #1 local business authority.",
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
