// src/data/work/homeOwnerProExpertsData.js

export const metaData = {
  title: "Home Owner Pro Experts - Good Rep Media",
  description:
    "Home Owner Pro Experts partnered with Good Rep Media to refresh their brand, modernize their website, and streamline mortgage and refinance lead acquisition.",
  ogUrl: "https://goodrep.media/our-work/home-owner-pro-experts/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Home Owner Pro Experts", current: true },
  ],
  kicker: "CASE STUDY // FINANCIAL SERVICES & LEAD GEN",
  title: "HOME OWNER PRO EXPERTS",
  bgImage: "/grm-main-graphics/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Homeowner Pro Experts helps homeowners with mortgage solutions, refinancing, foreclosure prevention, and home repair support. They partnered with Good Rep Media to refresh their brand and create a professional, user-friendly website. The goal was to clearly communicate services, reach more homeowners, and establish trust. With a modern website and strategic digital marketing, Homeowner Pro Experts can now connect more effectively with clients and guide them through important homeownership decisions.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Web Design",
      "Branding",
      "Digital Strategy",
      "Content Writing",
      "Social Media Consulting",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/home-owner-pro-experts-website.png",
    alt: "Homeowner Pro Experts website and mortgage solutions platform displayed across devices",
    width: 960,
    height: 487,
  },
  cta: {
    label: "Visit Site",
    href: "https://homeownerproexperts.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Home Owner Pro Experts Stats",
  sub: "Significant increases in client inquiries and trust metrics following digital overhaul and positioning.",
  stats: [
    {
      prefix: "+",
      value: 195,
      suffix: "%",
      barPercent: 90,
      label: "Increase in client consultation bookings",
    },
    {
      value: 4.5,
      decimals: 1,
      suffix: "x",
      barPercent: 92,
      label: "Mortgage & refinance inquiry lift",
    },
    {
      value: 100,
      suffix: "%",
      barPercent: 100,
      label: "Core Web Vitals & best practices rating",
    },
    {
      prefix: "#",
      value: 1,
      barPercent: 95,
      label: "Ranking for core regional mortgage terms",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/home-owner-web-sample.jpg",
    alt: "Homeowner Pro Experts clean digital guidance and consultation portal",
    width: 1280,
    height: 632,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Before partnering with Good Rep Media, Homeowner Pro Experts had an outdated website with confusing navigation and a limited online presence. Homeowners struggled to find information, understand services, and trust the team’s expertise. The lack of consistent branding and clear messaging made it difficult to stand out from competitors. They needed a modern, user-friendly website that showcased services, built credibility, and generated more inquiries.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media refreshed Homeowner Pro Experts’ branding with a clean, modern look and created a user-friendly website that clearly presents their services. They organized content to highlight each offering and added intuitive navigation to guide homeowners through mortgage solutions, refinancing, and home repair options. This approach improved credibility, strengthened their online presence, and helped attract more consistent inquiries from potential clients seeking reliable homeownership guidance.",
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
        style: "width: 22%; right: 6%; top: 6%;",
      },
      {
        src: "/grm-web-assets/angled-heart-icon.svg",
        alt: "",
        width: 152,
        height: 162,
        className: "consult__art-float--heart",
        style: "width: 18%; left: 6%; bottom: 8%;",
      },
    ],
  },
};
