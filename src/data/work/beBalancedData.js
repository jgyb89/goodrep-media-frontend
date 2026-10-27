// src/data/work/beBalancedData.js

export const metaData = {
  title: "Be Balanced Bodywork - Good Rep Media",
  description:
    "Be Balanced Bodywork partnered with Good Rep Media to refine their brand identity, clarify messaging, and build a high-performing website.",
  ogUrl: "https://goodrep.media/our-work/be-balanced-bodywork/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Be Balanced Bodywork", current: true },
  ],
  kicker: "CASE STUDY // BRANDING & WEB REFRESH",
  title: "BE BALANCED BODYWORK",
  bgImage: "/grm-main-graphics/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Be Balanced Bodywork needed a website that reflected the quality of their massage and bodywork services and clearly communicated their value. While they help clients relax, restore balance, and improve well-being, their branding and online presence didn’t match that experience. Good Rep Media refined their identity, clarified their messaging, and built a modern, high-performing website that attracts and converts the right audience, helping them better connect with people seeking massage therapy and holistic wellness services.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Web Design + build",
      "Branding",
      "Digital Strategy",
      "Content Writing",
      "Social Media Consulting",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/be-balanced-bodyworks-portfolio.png",
    alt: "Be Balanced Bodywork portfolio website showcase",
    width: 960,
    height: 487,
  },
  cta: {
    label: "Visit Site",
    href: "https://www.bebalancedgr.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Be Balanced Bodywork Stats",
  sub: "Real performance gains tracked after brand refresh, site architecture overhaul, and digital launch.",
  stats: [
    {
      value: 5900,
      suffix: "+",
      barPercent: 94,
      label: "Active users since the start of the year",
    },
    {
      value: 5.8,
      decimals: 1,
      suffix: "K",
      barPercent: 92,
      label: "New Users acquired",
    },
    {
      value: 2.4,
      decimals: 1,
      suffix: "K",
      barPercent: 86,
      label: "Engaged Sessions recorded",
    },
    {
      value: 27,
      suffix: "K",
      barPercent: 96,
      label: "Actions taken on the site",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/be-balanced-bodyworks-website-sample.jpeg",
    alt: "Be Balanced Bodywork online presence and service offerings showcase",
    width: 1920,
    height: 1024,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Before working with Good Rep Media, Be Balanced Bodywork struggled with an inconsistent brand and a limited online presence, making it difficult for potential clients to discover their massage and bodywork therapy services and understand the full value of what they offer. The website lacked clear navigation, engaging content, and a structure that guided users toward booking, so visitors often left without taking action, which ultimately limited growth and reduced opportunities to attract and convert new clients.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media refreshed the Be Balanced Bodywork brand with a polished logo, cohesive color palette, and calming visual identity that reflects its holistic approach. We then designed a clean, user-friendly website that clearly showcases services and guides visitors through the experience. SEO-focused content and strategic site structure boost visibility, drive engagement, and make it easy for clients to explore services and confidently book appointments.",
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
