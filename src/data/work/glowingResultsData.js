// src/data/work/glowingResultsData.js

export const metaData = {
  title: "Glowing Results Skin Spa - Good Rep Media",
  description:
    "Glowing Results Skin Spa partnered with Good Rep Media to enhance their online presence with a new website and strategic marketing.",
  ogUrl: "https://goodrep.media/our-work/glowing-results-skin-spa/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Glowing Results Skin Spa", current: true },
  ],
  kicker: "CASE STUDY // LOCAL SEO & REPUTATION",
  title: "GLOWING RESULTS SKIN SPA",
  bgImage: "/grm-main-graphics/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Glowing Results Skin Spa was founded by the seasoned aesthetician Jen and was poised for growth, but faced challenges in attracting new customers and building a strong online presence. Enter Good Rep Media, which expertly stepped in to deliver a comprehensive range of marketing services. They crafted a stunning, professional website and executed strategic branding and digital marketing initiatives that propelled GRSS into a new phase of success.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Web design + build",
      "Social media management",
      "Content writing",
      "Digital advertising",
      "SEO optimization",
      "Ongoing consultation + support",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/glowing-results-skin-spa-website.webp",
    alt: "Glowing Results Skin Spa website displayed across laptop and mobile devices",
    width: 2800,
    height: 1420,
  },
  cta: {
    label: "Visit Site",
    href: "https://glowingresultsskinspa.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Glowing Results Skin Spa Stats",
  sub: "Real performance gains tracked after modern redesign and full digital launch.",
  stats: [
    {
      value: 1400,
      suffix: "+",
      barPercent: 92,
      label: "new users since its launch",
    },
    {
      value: 10,
      suffix: "k",
      barPercent: 88,
      label: "events tracked on the site",
    },
    {
      value: 1000,
      suffix: "+",
      barPercent: 82,
      label: "more users vs previous year",
    },
    {
      value: 20,
      suffix: "%",
      barPercent: 70,
      label: "increased call clicks",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/glowing-results-skin-spa-web-1.jpg",
    alt: "Glowing Results Skin Spa Cape Coral location and web presence showcase",
    width: 1060,
    height: 876,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Before partnering with Good Rep Media, GRSS faced significant challenges in establishing its online presence. Jen had the skills and passion for her business but lacked the digital tools to attract and convert new clients. She needed a professional website that reflected her brand and set her apart from competitors, as well as a strategy to generate leads and drive business growth.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media built a sleek, user-friendly website that showcased GRSS’s services and professionalism. The team developed a cohesive brand identity, including a custom logo, branded business materials, and a consistent visual theme. Additionally, Good Rep Media provided ongoing content creation, SEO enhancements, and digital advertising strategies to attract and engage potential customers. The results speak for themselves: increased website traffic, stronger brand visibility, and a growing customer base.",
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
