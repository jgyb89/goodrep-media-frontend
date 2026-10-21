// src/data/videoProductionData.js

export const metaData = {
  title: "Video Production Services | Good Rep Media",
  description:
    "Award-winning video production services by Good Rep Media. Commercial ads, product featurettes, drone footage, social media reels, and full post-production.",
};

export const heroData = {
  breadcrumb: [
    { label: "Services", href: "/services" },
    { label: "Video Production" },
  ],
  kicker: "VIDEO PRODUCTION SERVICES",
  titleTop: "Video Production Engineered For",
  rotatorWords: [
    "High-Impact Storytelling",
    "Commercial Brand Growth",
    "Engaging Social Reels",
    "Broadcast-Quality Cinema",
  ],
  lead: "Nothing grabs attention like a great video. If a picture is worth a thousand words, a video is priceless. It combines visuals, sound, and storytelling in a way no other medium can. To cut through the noise and engage your audience, let us create a stunning video they won’t forget.",
  highlights: [
    "Video Recording & On-Location Shoots",
    "Cinematic Video Editing & Post-Production",
    "High-Converting Commercials & Promos",
    "Social Media Reels, TikTok & Shorts",
    "YouTube Channel Strategy & Production",
  ],
  primaryCta: { label: "Contact Us", href: "#consultation" },
  secondaryCta: { label: "Send Us a Message" },
  stage: {
    blob: {
      src: "/grm-web-assets/blue-circular-background-graphic.svg",
      width: 746,
      height: 780,
      depth: 12,
    },
    main: {
      src: "/grm-web-assets/video-player-graphic.svg",
      alt: "Video Production Services and Commercial Cinematography",
      width: 746,
      height: 780,
      depth: -18,
      style: "width: 66%; left: 17%; top: 12%;",
    },
    floats: [],
  },
  marqueeItems: [
    { icon: "videocam", label: "4K Cinematic Production" },
    { icon: "movie", label: "Commercials & Brand Films" },
    { icon: "flight_takeoff", label: "Licensed Aerial Drone Footage" },
    { icon: "graphic_eq", label: "Audio Mixing & Sound Design" },
    { icon: "content_cut", label: "Color Grading & Motion Graphics" },
    { icon: "smart_display", label: "Social Media Reels & Shorts" },
    { icon: "inventory_2", label: "Product Featurettes & Demos" },
  ],
};

export const startsData = {
  eyebrow: "VIDEO IS KING",
  title: "Great Videos Don’t Happen By Accident",
  question: "Is your brand delivering the visual experience your audience expects?",
  body: [
    "Every day, millions of videos are uploaded online, creating fierce competition. However, only a few are genuinely good. Crafting an excellent video is an art, and we specialize in it. Let our team collaborate with yours to create a stunning, high-quality video that stands out and achieves your goals.",
    "When customers visit your website, social media pages, or any other part of your online presence, they’re expecting rich video. In the last five years, video use in online marketing has grown by 41%, and over 86% of businesses now use video marketing.",
    "<strong>Build Instant Trust:</strong> High-definition video communicates emotion, quality, and credibility in seconds—transforming curious visitors into committed clients.",
  ],
  mediaFirst: true,
  background: "light",
  callout: {
    percent: 86,
    percentSuffix: "%",
    title: "MARKET ADOPTION",
    text: "Over <strong>86% of successful businesses</strong> report that video marketing is directly responsible for increasing dwell time, brand trust, and inbound leads.",
  },
  media: {
    blob: {
      src: "/grm-web-assets/blue-circular-background-2-graphic.svg",
      width: 746,
      height: 780,
    },
    main: {
      src: "/grm-web-assets/video-player-graphic.svg",
      alt: "Great Videos Don't Happen By Accident - Professional Video Production",
      width: 746,
      height: 780,
      style: "width: 62%; left: 19%; top: 12%;",
    },
    satellites: [
      {
        src: "/grm-web-assets/happy-face-speech-bubble-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -44,
        className: "starts-feature__sat--target",
        style: "width: 24%; left: 6%; top: 8%;",
      },
      {
        src: "/grm-web-assets/star-app-icon-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -38,
        style: "width: 22%; right: 6%; bottom: 10%; z-index: 3;",
      },
    ],
    pill: {
      icon: "videocam",
      title: "Video Production",
      subtitle: "Storytelling That Converts",
      parallax: -30,
    },
  },
};

export const statsData = {
  eyebrow: "OUR METRICS",
  title: "Good Rep Has the Production Experience",
  sub: "Our portfolio speaks for itself. We've brought stories to life across industries, formats, and nationwide locations.",
  stats: [
    {
      prefix: "+",
      value: 500,
      decimals: 0,
      suffix: "",
      barPercent: 95,
      label:
        "Successfully completed video projects delivered on time and within budget",
    },
    {
      prefix: "",
      value: 100,
      decimals: 0,
      suffix: "+",
      barPercent: 90,
      label:
        "Fully satisfied video production clients who trust Good Rep Media",
    },
    {
      prefix: "+",
      value: 2500,
      decimals: 0,
      suffix: " hrs",
      barPercent: 92,
      label:
        "Hours of professional cinematic editing, color grading, and sound mixing",
    },
    {
      prefix: "",
      value: 20,
      decimals: 0,
      suffix: "+",
      barPercent: 80,
      label:
        "Different states filmed in across on-location commercial shoots nationwide",
    },
  ],
};

export const pillarsData = {
  eyebrow: "OFFERING MORE",
  title: "What Sets Good Rep Video Production Apart?",
  question: "A full-spectrum creative studio supporting your entire production",
  body: "We don't just point a camera—we provide complete multimedia support to ensure your video assets integrate seamlessly across all digital and print marketing channels.",
  pillars: [
    {
      num: "01",
      tag: "Visual Stills",
      icon: "/grm-web-icons/photography-icon-blue.svg",
      title: "Photography + Images",
      body: "We can source or capture beautiful high-resolution photos on set during production, ensuring your still imagery perfectly matches your video aesthetics for website banners, print, or social media campaigns.",
    },
    {
      num: "02",
      tag: "Creative Graphics",
      icon: "/grm-web-icons/graphic-design-icon-blue.svg",
      title: "Custom Graphic Design",
      body: "Depending on the platform, you need eye-catching thumbnails, lower thirds, title cards, and motion graphics that demand clicks. We provide custom graphic design crafted to maximize viewer retention.",
    },
    {
      num: "03",
      tag: "Audio Engineering",
      icon: "/grm-web-icons/microphone-icon-blue.svg",
      title: "Professional Audio Production",
      body: "The difference between a good video and an unforgettable one often lies in sound design. We provide complete audio recording, voiceover casting, licensed music scoring, mixing, and mastering.",
    },
  ],
  media: {
    blob: {
      src: "/grm-web-assets/blue-circular-background-graphic.svg",
      width: 746,
      height: 780,
    },
    main: {
      src: "/grm-web-assets/3d-art-computer-program-graphic.svg",
      alt: "What Sets Good Rep Apart in Video Production",
      width: 687,
      height: 663,
      style: "width: 62%; left: 19%; top: 12%;",
    },
    satellites: [
      {
        src: "/grm-web-assets/photo-img-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -44,
        className: "pillars__sat--growth",
        style: "width: 24%; left: 6%; bottom: 12%;",
      },
      {
        src: "/grm-web-assets/3d-star-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -38,
        className: "pillars__sat--cursor",
        style: "width: 22%; right: 6%; top: 8%;",
      },
    ],
    pill: {
      icon: "verified",
      title: "Complete Studio",
      subtitle: "Video, Photo & Audio",
      parallax: -30,
    },
  },
};

export const processData = {
  eyebrow: "OUR PROCESS",
  title: "How Does Our Top-Tier Video Production Work?",
  lead: "Click through our four-phase production pipeline to see how we guide your project from initial concept to high-definition master delivery.",
  stageLabelPrefix: "Phase",
  steps: [
    {
      numIcon: "/grm-web-icons/number-icon-1.svg",
      tag: "Pre-Production",
      title: "Detailed Planning",
      body: "The key to an amazing video is meticulous planning. We meet with you to discuss project goals and vision, allowing us to map out the best creative approach while considering locations, call sheets, timeframes, and budgets.",
      main: {
        src: "/grm-web-assets/video-player-graphic.svg",
        w: 746,
        h: 780,
        style: "width: 62%; left: 19%; top: 12%;",
      },
      floats: [
        {
          src: "/grm-web-assets/calendar-graphic.svg",
          w: 746,
          h: 780,
          style: "width: 22%; left: 6%; bottom: 12%;",
        },
        {
          src: "/grm-web-assets/3-arrows-up-graphic.svg",
          w: 746,
          h: 780,
          style: "width: 20%; right: 6%; top: 8%;",
        },
      ],
    },
    {
      numIcon: "/grm-web-icons/number-icon-2.svg",
      tag: "Principal Photography",
      title: "Expert Production",
      body: "Once we have the perfect plan, we start filming. Whether shooting on location or building animated assets in studio, our directors, cinematographers, and crew expertly guide you through the shoot with professional lighting and cinema cameras.",
      main: {
        src: "/grm-web-assets/photo-img-graphic.svg",
        w: 746,
        h: 780,
        style: "width: 62%; left: 19%; top: 12%;",
      },
      floats: [
        {
          src: "/grm-web-assets/happy-face-speech-bubble-graphic.svg",
          w: 746,
          h: 780,
          style: "width: 22%; left: 6%; bottom: 12%;",
        },
        {
          src: "/grm-web-assets/3-arrows-up-graphic.svg",
          w: 746,
          h: 780,
          style: "width: 20%; right: 6%; top: 8%;",
        },
      ],
    },
    {
      numIcon: "/grm-web-icons/number-icon-3.svg",
      tag: "Post-Production",
      title: "Editing & Post-Production",
      body: "After filming, your project enters post-production, where our editors assemble the footage to create a compelling story. Our media specialists enhance the video with cinematic color grading, sound design, and custom motion graphics.",
      main: {
        src: "/grm-web-assets/3d-art-computer-program-graphic.svg",
        w: 746,
        h: 780,
        style: "width: 62%; left: 19%; top: 12%;",
      },
      floats: [
        {
          src: "/grm-web-assets/star-app-icon-graphic.svg",
          w: 746,
          h: 780,
          style: "width: 22%; left: 6%; bottom: 12%;",
        },
        {
          src: "/grm-web-assets/3-arrows-up-graphic.svg",
          w: 746,
          h: 780,
          style: "width: 20%; right: 6%; top: 8%;",
        },
      ],
    },
    {
      numIcon: "/grm-web-icons/number-icon-4.svg",
      tag: "Final Delivery",
      title: "Revisions & Final Approval",
      body: "We deliver your cut for review with seamless feedback rounds. Your project is complete only when you are 100% satisfied. We provide master 4K exports along with tailored aspect ratios (16:9, 9:16, 1:1) optimized for web and social.",
      main: {
        src: "/grm-web-assets/online-support-graphic.svg",
        w: 746,
        h: 780,
        style: "width: 62%; left: 19%; top: 12%;",
      },
      floats: [
        {
          src: "/grm-web-assets/angled-heart-icon.svg",
          w: 746,
          h: 780,
          style: "width: 22%; left: 6%; bottom: 12%;",
        },
        {
          src: "/grm-web-assets/3-arrows-up-graphic.svg",
          w: 746,
          h: 780,
          style: "width: 20%; right: 6%; top: 8%;",
        },
      ],
    },
  ],
};

export const approachData = {
  eyebrow: "COMPREHENSIVE MULTI-FORMAT VIDEO",
  title: "Every Format Your Brand Needs to Win Online",
  question: "From short-form mobile reels to cinematic commercial ads",
  body: [
    "Different platforms demand different video formats. A 9:16 vertical TikTok or Instagram Reel requires fast hooks and kinetic pacing, while a corporate case study requires depth and narrative trust.",
    "Good Rep Media formats every shoot so you walk away with a comprehensive library of video assets: long-form website hero videos, 15-to-30-second paid ads, and high-energy social shorts.",
    "<strong>Multi-Platform Optimization:</strong> We deliver custom exports tailored for YouTube, Meta, TikTok, LinkedIn, and website embedding with compressed file sizes for lightning-fast page speed.",
  ],
  mediaFirst: false,
  background: "bg",
  callout: {
    percent: 100,
    percentSuffix: "%",
    title: "CUSTOM MULTI-PLATFORM EXPORTS",
    text: "Receive master video files in <strong>all aspect ratios (16:9, 9:16, 1:1, 4:5)</strong>, optimized for social, ad platforms, and website embedding.",
  },
  media: {
    blob: {
      src: "/grm-web-assets/blue-circular-background-2-graphic.svg",
      width: 746,
      height: 780,
    },
    main: {
      src: "/grm-web-assets/video-player-graphic.svg",
      alt: "Multi-Format Video Exports for YouTube, Meta and TikTok",
      width: 746,
      height: 780,
      style: "width: 62%; left: 19%; top: 12%;",
    },
    satellites: [
      {
        src: "/grm-web-assets/user-speech-bubble-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -44,
        className: "starts-feature__sat--target",
        style: "width: 24%; left: 6%; top: 8%;",
      },
      {
        src: "/grm-web-assets/star-app-icon-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -38,
        style: "width: 22%; right: 6%; bottom: 10%; z-index: 3;",
      },
    ],
    pill: {
      icon: "aspect_ratio",
      title: "Universal Sizing",
      subtitle: "16:9, 9:16 & 1:1 Formats",
      parallax: -30,
    },
  },
};

export const deliverablesData = {
  id: "capabilities",
  eyebrow: "OUR OFFERING",
  title: "We Cover a Wide Range of Video Content",
  lead: "Whatever your creative vision, our production team brings it to life with state-of-the-art camera gear, audio equipment, and editing suites.",
  background: "light",
  deliverables: [
    {
      icon: "/grm-web-icons/drone-icon-blue.svg",
      accent: "/grm-web-assets/3-arrows-up-graphic.svg",
      accentW: 746,
      accentH: 780,
      metric: "Licensed Pilots",
      title: "Drone Footage",
      body: "Top-of-the-line 4K aerial drone footage that adds cinematic scale, establishing shots, and breathtaking perspective to your commercial and real estate projects.",
    },
    {
      icon: "/grm-web-icons/product-features-icon-blue.svg",
      accent: "/grm-web-assets/shopping-cart-graphic.svg",
      accentW: 746,
      accentH: 780,
      metric: "Drive Conversions",
      title: "Product Featurettes",
      body: "Showcase product details, unboxings, and practical demonstrations in stunning high definition, visually answering buyer questions and boosting purchase confidence.",
    },
    {
      icon: "/grm-web-icons/phone-video-icon-blue.svg",
      accent: "/grm-web-assets/arrow-in-target-graphic.svg",
      accentW: 746,
      accentH: 780,
      metric: "Paid Ad Ready",
      title: "Promos & Commercial Ads",
      body: "Targeted commercial video ads for YouTube, Instagram, and TikTok engineered with strong 3-second hooks, clear value props, and compelling calls to action.",
    },
    {
      icon: "/grm-web-icons/group-presentation-icon-blue.svg",
      accent: "/grm-web-assets/user-speech-bubble-graphic.svg",
      accentW: 746,
      accentH: 780,
      metric: "Highlight Reels",
      title: "Event Videos",
      body: "Capture the energy and memorable moments of corporate summits, conferences, launches, and celebrations in dynamic recap videos that extend event reach.",
    },
    {
      icon: "/grm-web-icons/award-icon-blue.svg",
      accent: "/grm-web-assets/star-app-icon-graphic.svg",
      accentW: 746,
      accentH: 780,
      metric: "Brand Legacy",
      title: "Commemorative & Story Videos",
      body: "Honoring company milestones, anniversary celebrations, founder journeys, and donor presentations through heartfelt, cinematic documentary storytelling.",
    },
    {
      icon: "/grm-web-icons/digital-media-icon-blue.svg",
      accent: "/grm-web-assets/3-arrows-up-graphic.svg",
      accentW: 746,
      accentH: 780,
      metric: "Custom Scope",
      title: "Custom Video Projects",
      body: "Have a unique creative concept? From training modules and customer testimonials to brand anthems, our team brings any video project you can dream up to life.",
    },
  ],
};

export const readyData = {
  id: "ready-band",
  eyebrow: "ARE YOU READY TO...",
  title: "Get a Full Video Production Team at Your Fingertips",
  text: "Our media team brings years of commercial production experience to your project. From pre-production planning and on-location filming to cinematic editing, color grading, and custom aspect ratios, we create stunning video content that achieves your revenue goals.",
  primaryCta: {
    label: "Book Free Consultation",
    href: "#consultation",
  },
  secondaryCta: {
    label: "View Our Work",
    href: "/work",
  },
  art: {
    blob: {
      src: "/grm-web-assets/blue-circular-background-graphic.svg",
      width: 746,
      height: 780,
      parallax: 22,
    },
    main: {
      src: "/grm-web-assets/video-player-graphic.svg",
      alt: "Partner with Good Rep Media for professional video production",
      width: 746,
      height: 780,
      parallax: -28,
      style: "width: 62%; left: 19%; top: 12%;",
    },
    badges: [
      {
        src: "/grm-web-assets/shopping-cart-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -48,
        className: "ready-band__badge--handshake",
        style: "width: 24%; left: 6%; bottom: 12%;",
      },
      {
        src: "/grm-web-assets/3-arrows-up-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        parallax: -58,
        className: "ready-band__badge--growth",
        style: "width: 22%; right: 6%; top: 8%;",
      },
    ],
  },
};

export const consultData = {
  id: "consultation",
  kicker: "NEED SOME HELP ONLINE?",
  title: "Book A FREE 1-on-1 Video Production Consultation",
  text: "Get actionable creative advice for how to grow your business from our video production specialists! We'll review your project goals, explore creative directions, and provide a tailored scope and timeline.",
  cardTitle: "Book Your Free Consultation",
  submitLabel: "Book My Free Video Strategy Call",
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
      width: 746,
      height: 780,
    },
    floats: [
      {
        src: "/grm-web-assets/user-speech-bubble-graphic.svg",
        alt: "",
        width: 746,
        height: 780,
        className: "consult__art-float--chat",
      },
      {
        src: "/grm-web-assets/angled-heart-icon.svg",
        alt: "",
        width: 746,
        height: 780,
        className: "consult__art-float--heart",
      },
    ],
  },
};
