// src/data/work/coralBreezeData.js

export const metaData = {
  title: "Coral Breeze Services - Good Rep Media",
  description:
    "Coral Breeze Services partnered with Good Rep Media to create a modern web presence and local directory platform connecting Cape Coral residents with local businesses.",
  ogUrl: "https://goodrep.media/our-work/coral-breeze-services/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Coral Breeze Services", current: true },
  ],
  kicker: "CASE STUDY // WEBSITE DESIGN & BRANDING",
  title: "CORAL BREEZE SERVICES",
  bgImage: "/grm-graphic-samples/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Coral Breeze Services, a dedicated platform for promoting Cape Coral’s local businesses, partnered with Good Rep Media to enhance their online presence. The collaboration aimed to create a user-friendly website that effectively connects residents with local businesses and deals, providing an intuitive hub for community commerce and service discovery.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Web Design + Build",
      "Brand Development",
      "Content Creation + Copy Writing",
      "Social Media Integration",
      "SEO Strategies",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/coral-breeze-services-website.webp",
    alt: "Coral Breeze Services website displayed across laptop and mobile devices",
    width: 2800,
    height: 1420,
  },
  cta: {
    label: "Visit Site",
    href: "https://coralbreezeservices.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Coral Breeze Services Stats",
  sub: "Measurable user engagement and conversion improvements following custom UX redesign and platform rollout.",
  stats: [
    {
      value: 4.8,
      decimals: 1,
      suffix: "x",
      barPercent: 92,
      label: "Form conversion lift",
    },
    {
      prefix: "-",
      value: 62,
      suffix: "%",
      barPercent: 88,
      label: "Reduction in mobile bounce rate",
    },
    {
      value: 100,
      suffix: "%",
      barPercent: 100,
      label: "Accessibility & Best Practices score",
    },
    {
      value: 0.9,
      decimals: 1,
      suffix: "s",
      barPercent: 95,
      label: "Average mobile page load speed",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/coral-breeze-services-web-sample.webp",
    alt: "Coral Breeze Services directory features and mobile user experience showcase",
    width: 720,
    height: 857,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Coral Breeze Services aimed to provide a comprehensive platform where local businesses could list themselves for free and receive custom-made pages tailored to their specific needs. The goal was to connect residents with the best local deals and spotlight the unique offerings of the Cape Coral community, requiring an intuitive architecture capable of handling diverse vendor profiles and seamless mobile browsing.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media collaborated with Coral Breeze Services to design and develop a website that aligns with their mission. The new site features intuitive navigation, a comprehensive directory of local businesses, and engaging visuals. SEO best practices were applied to improve online visibility, and cohesive branding elements were incorporated to strengthen the company’s identity. Additionally, custom pages were created for businesses, allowing them to showcase their services effectively.",
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
