/**
 * Homepage data configuration.
 * Extracted from src/pages/index.astro for clean separation of concerns (SLAP & DRY).
 */

export const services = [
  {
    title: "Website Design",
    text: "Custom, mobile-first websites built to load fast, rank well, and turn visitors into customers.",
    main: {
      src: "/grm-main-graphics/website-design-graphic.svg",
      w: 746,
      h: 780,
    },
    accents: [
      {
        src: "/grm-web-assets/3d-ruler-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-right",
        dx: 8,
        dy: -8,
        rot: 8,
      },
      {
        src: "/grm-web-assets/code-window-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
        dx: -10,
        dy: 8,
        rot: -8,
      },
    ],
  },
  {
    title: "Local SEO",
    text: "Show up in the map pack and local searches when nearby customers are looking for you.",
    main: {
      src: "/grm-main-graphics/local-seo-marketing-graphic.svg",
      w: 2642,
      h: 2000,
    },
    accents: [
      {
        src: "/grm-web-assets/3d-map-destination-route-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-left",
        dx: -8,
        dy: -8,
        rot: -6,
      },
      {
        src: "/grm-web-assets/number-one-award-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-right",
        dx: 9,
        dy: -10,
        rot: 6,
      },
    ],
  },
  {
    title: "Technical SEO",
    text: "Speed, structure, and on-page fixes that help search engines understand and reward your site.",
    main: {
      src: "/grm-main-graphics/technical-seo-marketing-graphic.svg",
      w: 2642,
      h: 2000,
    },
    accents: [
      {
        src: "/grm-web-assets/3d-window-with-gear-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-right",
        dx: 8,
        dy: -8,
        rot: 8,
      },
      {
        src: "/grm-web-assets/cloud-upload-download-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
        dx: -10,
        dy: 8,
        rot: -8,
      },
    ],
  },
  {
    title: "Paid Digital Ads",
    text: "Google and social ad campaigns managed for real leads, not just clicks.",
    main: {
      src: "/grm-main-graphics/pay-per-click-marketing-graphic.svg",
      w: 2642,
      h: 2000,
    },
    accents: [
      {
        src: "/grm-web-assets/arrow-in-target-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-left",
        dx: -8,
        dy: -8,
        rot: -6,
      },
      {
        src: "/grm-web-assets/stocks-going-up-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-right",
        dx: 9,
        dy: -10,
        rot: 6,
      },
    ],
  },
  {
    title: "Social Media Management",
    text: "Consistent, on-brand content and community management on the platforms your customers use.",
    main: {
      src: "/grm-main-graphics/social-media-marketing-graphic.svg",
      w: 2642,
      h: 2000,
    },
    accents: [
      {
        src: "/grm-web-assets/3d-chat-bubbles-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-right",
        dx: 8,
        dy: -8,
        rot: 8,
      },
      {
        src: "/grm-web-assets/social-media-likes-comments-stats-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
        dx: -10,
        dy: 8,
        rot: -8,
      },
    ],
  },
  {
    title: "Digital Media Production",
    text: "Photo, video, and graphics that make your business look as good online as it does in person.",
    main: {
      src: "/grm-main-graphics/digital-media-production-graphic.svg",
      w: 2642,
      h: 2000,
    },
    accents: [
      {
        src: "/grm-web-assets/dlsr-camera-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-left",
        dx: -8,
        dy: -8,
        rot: -6,
      },
      {
        src: "/grm-web-assets/pencil-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-right",
        dx: 9,
        dy: -10,
        rot: 6,
      },
    ],
  },
  {
    title: "Branding",
    text: "Logos, colors, and messaging that make your business memorable and instantly recognizable.",
    main: {
      src: "/grm-main-graphics/monitor-with-image-file.webp",
      w: 346,
      h: 282,
    },
    accents: [
      {
        src: "/grm-web-assets/artist-brush-and-paint-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-right",
        dx: 8,
        dy: -8,
        rot: 8,
      },
      {
        src: "/grm-web-assets/3d-color-picker-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
        dx: -10,
        dy: 8,
        rot: -8,
      },
    ],
  },
  {
    title: "Marketing Strategy",
    text: "A clear, data-backed roadmap that ties every marketing dollar to your business goals.",
    main: {
      src: "/grm-main-graphics/lightbulb-with-gear-icon-graphic.svg",
      w: 758,
      h: 813,
    },
    accents: [
      {
        src: "/grm-web-assets/chess-peice-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-left",
        dx: -8,
        dy: -8,
        rot: -6,
      },
      {
        src: "/grm-web-assets/3d-bar-graph-going-up-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-right",
        dx: 9,
        dy: -10,
        rot: 6,
      },
    ],
  },
];

export const values = [
  {
    title: "Hands-On Partnership",
    img: "/grm-main-graphics/handshake-hands.webp",
    w: 446,
    h: 162,
    text: "Work directly with real people who learn your business and treat it like their own.",
  },
  {
    title: "Built For Growth",
    img: "/grm-web-assets/3d-rocket-graphic.svg",
    w: 746,
    h: 780,
    text: "Every recommendation is tied to more calls, more leads, and more customers through your door.",
  },
  {
    title: "Small Business Specialists",
    img: "/grm-main-graphics/market-shop-graphic.svg",
    w: 656,
    h: 302,
    text: "We focus on small and local businesses, so our strategies fit your budget and your market.",
  },
  {
    title: "Transparent & Affordable",
    img: "/grm-web-assets/sheild-graphic.svg",
    w: 746,
    h: 780,
    text: "Clear pricing and honest reporting. You always know what we are doing and why it matters.",
  },
];

export const steps = [
  {
    title: "Free Consultations",
    tag: "Discovery & Audit",
    text: "We start with a free 1-on-1 call to learn about your business, your goals, and your current online presence. No pressure, no jargon.",
    main: {
      src: "/grm-main-graphics/customer-review-graphic.svg",
      w: 746,
      h: 780,
    },
    floats: [
      {
        src: "/grm-web-assets/happy-face-speech-bubble-graphic.svg",
        w: 137,
        h: 162,
        placement: "top-right",
      },
      {
        src: "/grm-web-assets/calendar-graphic.svg",
        w: 180,
        h: 180,
        placement: "bottom-left",
      },
    ],
  },
  {
    title: "Setup & Strategy",
    tag: "Custom Roadmap",
    text: "After evaluating the existing online presence, we develop a tailored roadmap and strategy, detailing target demographics and customer acquisition models, ensuring your approval before proceeding.",
    main: {
      src: "/grm-main-graphics/laptop-checklist-screen-graphic.svg",
      w: 746,
      h: 780,
    },
    floats: [
      {
        src: "/grm-web-assets/3d-file-folder-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-left",
      },
      {
        src: "/grm-web-assets/compass-icon-graphic-02.svg",
        w: 746,
        h: 780,
        placement: "bottom-right",
      },
    ],
  },
  {
    title: "Launch & Manage",
    tag: "Execution & Optimization",
    text: "We build, launch, and actively manage your website, campaigns, and content, optimizing along the way so nothing runs on autopilot.",
    main: {
      src: "/grm-main-graphics/monitor-with-rocket-launching.webp",
      w: 451,
      h: 344,
    },
    floats: [
      {
        src: "/grm-web-assets/gears-graphic.svg",
        w: 181,
        h: 180,
        placement: "top-left",
      },
      {
        src: "/grm-web-assets/3d-tools-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-right",
      },
    ],
  },
  {
    title: "Results & Reporting",
    tag: "Measurable ROI",
    text: "Clear, regular reports show what is working, what we are improving, and how your investment is turning into customers.",
    main: {
      src: "/grm-main-graphics/laptop-with-pie-chart-graphic.svg",
      w: 746,
      h: 780,
    },
    floats: [
      {
        src: "/grm-web-assets/77-percent-bubble-graphic.svg",
        w: 148,
        h: 178,
        placement: "top-left",
      },
      {
        src: "/grm-web-assets/upward-trend-graph-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-right",
      },
    ],
  },
];


export const heroSlides = [
  {
    word: "SEO Strategy",
    main: {
      src: "/grm-main-graphics/seo-strategy-home-page.svg",
      w: 2642,
      h: 2000,
    },
    floats: [
      {
        src: "/grm-web-assets/3-arrows-up-graphic.svg",
        w: 291,
        h: 419,
        placement: "top-right",
      },
      {
        src: "/grm-web-assets/3d-search-window-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
      },
    ],
  },
  {
    word: "More Engagement",
    main: {
      src: "/grm-main-graphics/more-engagement-home-page-graphic.svg",
      w: 2642,
      h: 2000,
    },
    floats: [
      {
        src: "/grm-web-assets/thumbs-up-like-icon-graphic.svg",
        w: 180,
        h: 180,
        placement: "top-right",
      },
      {
        src: "/grm-web-assets/999-hearts-likes-graphic.svg",
        w: 197,
        h: 98,
        placement: "bottom-left",
      },
    ],
  },
  {
    word: "A Converting Website",
    main: {
      src: "/grm-main-graphics/converting-responsive-website-home-page.svg",
      w: 2642,
      h: 2000,
    },
    floats: [
      {
        src: "/grm-web-assets/mouse-icon-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-right",
      },
      {
        src: "/grm-web-assets/3d-mobile-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
      },
    ],
  },
  {
    word: "More Customers",
    main: {
      src: "/grm-main-graphics/more-customers-home-page.svg",
      w: 2642,
      h: 2000,
    },
    floats: [
      {
        src: "/grm-web-assets/number-one-award-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-right",
      },
      {
        src: "/grm-web-assets/star-app-icon-graphic.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
      },
    ],
  },
  {
    word: "Google Ad Management",
    main: {
      src: "/grm-main-graphics/google-ad-management-home-page-graphic.svg",
      w: 2642,
      h: 2000,
    },
    floats: [
      {
        src: "/grm-web-assets/star-icon-graphic.svg",
        w: 746,
        h: 780,
        placement: "top-right",
      },
      {
        src: "/grm-web-assets/3d-pie-chart-graph.svg",
        w: 746,
        h: 780,
        placement: "bottom-left",
      },
    ],
  },
];

export const homepageProjects = [
  {
    title: "Cape Coral Lawn Care",
    href: "/work/cape-coral-lawn-care/",
    img: "/grm-graphic-samples/cape-coral-lawn-care-project-card.webp",
    logo: "/grm-web-assets/cape-coral-lawn-care-logo-white.svg",
    logoClass: "work-card__logo--square",
  },
  {
    title: "Glowing Results Skin Spa",
    href: "/work/glowing-results-skin-spa/",
    img: "/grm-graphic-samples/glowing-result-skin-spa-project.jpg",
    logo: "/grm-graphic-samples/glowing-results-skin-spa-logo-white.webp",
  },
  {
    title: "Be Balanced Bodyworks",
    href: "/work/be-balanced-bodyworks/",
    img: "/grm-graphic-samples/be-balanced-bodyworks-project-card.webp",
    logo: "/grm-graphic-samples/be-balanced-bodyworks-logo-white.svg",
  },
  {
    title: "Abode Home Services",
    href: "/work/abode-home-services/",
    img: "/grm-graphic-samples/abode-home-services-project-card.webp",
    logo: "/grm-main-graphics/abode-home-services-logo-white.svg",
  },
  {
    title: "Home Owner Pro Experts",
    href: "/work/home-owner-pro-experts/",
    img: "/grm-graphic-samples/home-owner-pro-experts-project-card.webp",
    logo: "/grm-graphic-samples/home-owner-pro-experts-logo-white.svg",
  },
  {
    title: "Home Owners Help Options",
    href: "/work/home-owners-help-options/",
    img: "/grm-graphic-samples/home-owner-help-options-project-card.webp",
    logo: "/grm-graphic-samples/home-owner-help-options-logo-white.svg",
  },
  {
    title: "Cape Coral Reviewed",
    href: "/work/cape-coral-reviewed/",
    img: "/grm-graphic-samples/cape-coral-reviewed-project-card.webp",
    logo: "/grm-graphic-samples/cape-coral-reviewed-logo.svg",
  },
  {
    title: "Florida Sunshine Lawn Care",
    href: "/work/florida-sunshine-lawn-care/",
    img: "/grm-graphic-samples/florida-sunshine-lawn-care-project-card.webp",
    logo: "/grm-graphic-samples/florida-sunshine-lawn-care-logo.svg",
  },
  {
    title: "Jojo Java",
    href: "/work/jojo-java/",
    img: "/grm-graphic-samples/jojo-java-project-card.webp",
    logo: "/grm-graphic-samples/jojo-java-logo.svg",
    logoClass: "work-card__logo--square",
  },
];

export const sliderCards = [
  ...homepageProjects,
  ...homepageProjects,
  ...homepageProjects,
];
