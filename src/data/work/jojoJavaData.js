// src/data/work/jojoJavaData.js

export const metaData = {
  title: "Jojo Java - Good Rep Media",
  description:
    "Jojo Java Coffee Co. partnered with Good Rep Media to engineer a high-converting DTC eCommerce store, bundle builders, and subscription club automation.",
  ogUrl: "https://goodrep.media/our-work/jojo-java/",
};

export const heroData = {
  breadcrumb: [
    { label: "Our Work", href: "/work" },
    { label: "Jojo Java", current: true },
  ],
  kicker: "CASE STUDY // ECOMMERCE & DIRECT-TO-CONSUMER",
  title: "JOJO JAVA",
  bgImage: "/grm-web-assets/grm-black-map-bg.webp",
  story: {
    kicker: "THE STORY",
    text: "Jojo Java Coffee Co. set out to disrupt the specialty coffee market by delivering bold, premium flavored blends without the luxury markup. To support high-volume nationwide sales and seasonal collection drops, they partnered with Good Rep Media. We engineered a vibrant, conversion-focused eCommerce store with frictionless mobile checkout, automated bundle builders, and subscription clubs that drove a 340% surge in online sales and scaled recurring customer lifetime value.",
  },
  work: {
    kicker: "THE WORK",
    items: [
      "Custom eCommerce Store Design & Build",
      "Direct-to-Consumer (DTC) Funnel Architecture",
      "Coffee Club & Subscription Automation",
      "Product Packaging & Merchandise Integration",
      "Mobile Checkout & Conversion Optimization",
      "Seasonal Product Launch Campaigns",
    ],
  },
  mockup: {
    src: "/grm-graphic-samples/jojo-java-website-sample.webp",
    alt: "Jojo Java Coffee Co. website and mobile shopping experience displayed across laptop and mobile devices",
    width: 2752,
    height: 1536,
  },
  cta: {
    label: "Visit Site",
    href: "https://jojojava.com/",
    target: "_blank",
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Jojo Java eCommerce Performance",
  sub: "Measurable DTC revenue acceleration, subscription adoption, and mobile conversion growth achieved after store launch.",
  stats: [
    {
      prefix: "+",
      value: 340,
      suffix: "%",
      barPercent: 95,
      label: "Surge in online store orders post-launch",
    },
    {
      value: 4.2,
      decimals: 1,
      suffix: "x",
      barPercent: 92,
      label: "Increase in average order value (AOV) via bundles",
    },
    {
      value: 99,
      suffix: "%",
      barPercent: 99,
      label: "Mobile checkout performance & Core Web Vitals score",
    },
    {
      prefix: "+",
      value: 215,
      suffix: "%",
      barPercent: 88,
      label: "Recurring Coffee Club subscription membership growth",
    },
  ],
};

export const narrativeData = {
  title: "Enhancing the Online Presence",
  image: {
    src: "/grm-graphic-samples/jojo-java-ecommerce-product-packages-sample.webp",
    alt: "Jojo Java Coffee Co. flavored coffee product packages lineup",
    width: 370,
    height: 350,
  },
  blocks: [
    {
      kicker: "THE CHALLENGE",
      text: "Breaking into the fiercely competitive direct-to-consumer coffee industry requires more than great roasted beans—it demands an irresistible brand experience and instant checkout speed. Jojo Java needed a digital storefront that captured their fun, bold personality while seamlessly managing multi-product variants (ground bags, single-serve K-Cups, merchandise), tiered bundle discounts ('Free Mug with 3+ bags'), and recurring coffee club subscriptions without slowing down mobile shoppers.",
    },
    {
      kicker: "THE SOLUTION",
      text: "Good Rep Media designed and developed an energetic, high-converting eCommerce platform engineered for rapid product discovery and high average order value (AOV). We implemented custom visual bundle selectors, 1-click mobile checkout with Apple Pay and Shop Pay, automated cross-sell triggers, and a flexible Coffee Club subscription portal. Coupled with high-speed performance optimization and seasonal campaign landing pages, Jojo Java achieved explosive direct-to-consumer sales growth and built an intensely loyal subscriber base.",
    },
  ],
};

export const consultData = {
  id: "consultation",
  kicker: "Ready to scale your online sales?",
  title: "Book A FREE 1-on-1 Marketing & Web Strategy Call",
  text: "We'll audit your current eCommerce store, conversion funnels, and retention systems to engineer a personalized plan for sustainable growth.",
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
