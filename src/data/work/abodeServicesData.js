// src/data/work/abodeServicesData.js

export const metaData = {
  title: "Abode Services - Good Rep Media",
  description:
    "Abode Services partnered with Good Rep Media to strengthen their home services brand, enhance search visibility, and build high-converting web architecture.",
  ogUrl: "https://goodrep.media/our-work/abode-services/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Abode Services", current: true },
  ],
  kicker: "CASE STUDY // HOME SERVICES & SEO",
  title: "ABODE SERVICES",
  bgImage: "/grm-web-assets/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Abode Services was built on delivering reliable, high-quality home services with a strong focus on customer experience. As the company grew, it became clear that their online presence needed to match the reputation they had earned. Good Rep Media partnered with Abode Services to strengthen their brand, enhance their digital visibility, and support continued growth, helping them connect with more customers while maintaining the quality and trust their clients expect.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Web Design + build",
      "SEO Optimization",
      "UX improvements",
      "Content Writing",
      "Ongoing consultation + support",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/abode-services-website.png",
    alt: "Abode Services website and booking platform shown across devices",
    width: 960,
    height: 487,
  },
  cta: {
    label: "Visit Site",
    href: "https://abode-services.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Abode Services Stats",
  sub: "Accelerated inbound lead flow and organic search presence following custom website deployment and localized SEO campaign.",
  stats: [
    {
      prefix: "+",
      value: 240,
      suffix: "%",
      barPercent: 94,
      label: "Increase in organic search traffic",
    },
    {
      value: 3.2,
      decimals: 1,
      suffix: "x",
      barPercent: 88,
      label: "Lift in online quote requests",
    },
    {
      value: 98,
      suffix: "%",
      barPercent: 96,
      label: "Google PageSpeed performance score",
    },
    {
      value: 150,
      suffix: "+",
      barPercent: 85,
      label: "Qualified homeowner service leads generated",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/abode-services-web-sample.jpg",
    alt: "Abode Services user-friendly home services website layout",
    width: 1920,
    height: 1084,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Before partnering with Good Rep Media, Abode Services faced challenges in clearly communicating their value online and standing out in a competitive home services market. While they had built a strong reputation through their work, their digital presence didn’t fully reflect their expertise or make it easy for potential customers to find and trust them.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media developed a clean, user-friendly website designed to highlight Abode Services’ offerings while building trust with potential customers. Through strategic content writing and SEO optimization, the site was structured to improve search visibility and attract high-intent local traffic.",
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
