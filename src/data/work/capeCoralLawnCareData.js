// src/data/work/capeCoralLawnCareData.js

export const metaData = {
  title: "Cape Coral Lawn Care - Good Rep Media",
  description:
    "Cape Coral Lawn Care partnered with Good Rep Media to redesign their website, refine their branding, and implement local SEO strategies.",
  ogUrl: "https://goodrep.media/our-work/cape-coral-lawn-care/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Cape Coral Lawn Care", current: true },
  ],
  kicker: "CASE STUDY // WEB DESIGN & LOCAL SEO",
  title: "CAPE CORAL LAWN CARE",
  bgImage: "/grm-main-graphics/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Cape Coral Lawn Care approached Good Rep Media with an outdated website that was difficult to edit and manage. With their previous web developer no longer available, they faced challenges in making updates and optimizing their online presence. They needed a fresh start with a fully functional website, enhanced branding, and digital marketing strategies to generate more leads and grow their business.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Web design + Build",
      "Branding & Logo Creation",
      "Content Creation + Copy Writing",
      "Google Ad Management",
      "Email Campaigns",
      "Social Media Consulting",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/cape-coral-lawn-care-website.webp",
    alt: "Cape Coral Lawn Care website displayed across laptop and mobile devices",
    width: 2800,
    height: 1420,
  },
  cta: {
    label: "Visit Site",
    href: "https://capecorallawncare.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Cape Coral Lawn Care Stats",
  sub: "Measurable performance gains tracked after modern site construction, Google Business Profile optimization, and local SEO launch.",
  stats: [
    {
      value: 100,
      suffix: "%",
      barPercent: 85,
      label: "more impressions quarter over quarter",
    },
    {
      value: 200,
      suffix: "%",
      barPercent: 92,
      label: "more impressions on search results",
    },
    {
      value: 250,
      suffix: "%",
      barPercent: 98,
      label: "more Google Business Profile call clicks",
    },
    {
      value: 163,
      suffix: "%",
      barPercent: 88,
      label: "increase in website clicks",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/cape-coral-lawn-care-facebook-sample.png",
    alt: "Cape Coral Lawn Care brand and online presence showcase",
    width: 739,
    height: 466,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Cape Coral Lawn Care’s previous website was outdated and difficult to manage, preventing them from making necessary updates. Without proper SEO and a streamlined lead-generation strategy, they struggled to attract new customers. Additionally, their branding needed refinement to establish a stronger identity in the competitive lawn care market.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media built a modern, user-friendly website tailored to Cape Coral Lawn Care’s needs, complete with service pages, location-based pages, a blog, and a team page. The team also refined the company's branding, enhanced their Google Business Profile, and implemented SEO best practices to improve search rankings. With ongoing content creation and strategic consulting, Cape Coral Lawn Care now enjoys increased traffic, stronger engagement, and a more efficient lead-generation process.",
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
        src: "/grm-web-assets/user-speech-bubble-graphic.svg",
        alt: "",
        width: 186,
        height: 108,
        className: "consult__art-float--chat",
        placement: "top-right",
      },
      {
        src: "/grm-web-assets/angled-heart-icon.svg",
        alt: "",
        width: 152,
        height: 162,
        className: "consult__art-float--heart",
        placement: "bottom-left",
      },
    ],
  },
};
