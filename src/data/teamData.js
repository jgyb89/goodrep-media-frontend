// src/data/teamData.js

export const teamPageMeta = {
  title:
    "Meet the Team | Good Rep Media - Grand Rapids Digital Marketing Experts",
  description:
    "Meet the strategists, designers, developers, and growth specialists behind Good Rep Media. A 100% in-house team dedicated to helping small businesses grow.",
};

export const teamHeroData = {
  kicker: "MEET THE GOOD REP MEDIA TEAM",
  titleTop: "The Strategists, Designers & Builders Behind",
  titleHighlight: "Your Growth",
  lead: "When you partner with Good Rep Media, you work directly with a passionate, 100% in-house team of specialists. No overseas outsourcing, no account-manager runaround—just experienced creatives, marketers, and technologists committed to your small business.",
  primaryCta: {
    label: "Meet Our Team",
    href: "#team-grid",
  },
  secondaryCta: {
    label: "Work With Us",
    href: "#consultation",
  },
  highlights: [
    "100% In-House Strategy, Design & Engineering",
    "Direct Access to the Specialists Working on Your Brand",
    "Decades of Combined Small Business Growth Experience",
  ],
  stage: {
    blob: {
      src: "/grm-web-assets/blue-circular-background-graphic.svg",
      width: 746,
      height: 780,
    },
    main: {
      src: "/grm-main-graphics/goodrep-meet-the-team.svg",
      alt: "Good Rep Media collaborative marketing and web team",
      width: 746,
      height: 780,
      style: "width: 100%; left: 5%; top: 10%;",
    },
    // Blob 1 rule: Lower-Left Corner & Top-Right Corner
    floats: [
      {
        src: "/grm-web-assets/happy-face-speech-bubble-graphic.svg",
        width: 746,
        height: 780,
        style: "width: 22%; left: 6%; bottom: 10%;",
      },
      {
        src: "/grm-web-assets/3d-star-graphic.svg",
        width: 746,
        height: 780,
        style: "width: 22%; right: 6%; top: 8%;",
      },
    ],
  },
};

export const teamPlaceholderSrc = "/grm-team/profile-placeholder.svg";

export const teamMembers = [
  {
    id: "cody-anderson",
    name: "Cody Anderson",
    title: "Managing Director",
    description:
      "Cody leads Good Rep Media, driving strategy, growth & creative, ethical marketing. With 10+ years’ experience, he helps small businesses stand out. Off hours: hiking, writing, testing tools.",
    image: "/grm-team/Cody Anderson Profile.webp",
    width: 800,
    height: 800,
    objectPosition: "center 12%",
    icon: "campaign",
    initials: "CA",
  },
  {
    id: "samuel-rodgers",
    name: "Samuel Rodgers",
    title: "Social Media Manager",
    description:
      "As Social Media Strategist at Good Rep Media, Sam craft's engaging, creative content that moves the needle. A music & marketing grad, storyteller, disc golfer, fisher, gamer — bringing energy & focus to every campaign.",
    image: "/grm-team/Samuel Rodgers Profile.webp",
    width: 800,
    height: 800,
    objectPosition: "center 14%",
    icon: "share",
    initials: "SR",
  },
  {
    id: "jordan-vogel",
    name: "Jordan Vogel",
    title: "Web Designer",
    description:
      "Jordan brings websites to life with marketing & design skills (Ferris State grad). A die-hard Detroit Lions fan, he also loves gaming, photography, & exploring creative side projects.",
    image: "/grm-team/Jordan Vogel Profile.webp",
    width: 800,
    height: 800,
    objectPosition: "center 18%",
    icon: "palette",
    initials: "JV",
  },
  {
    id: "james-green",
    name: "James Green",
    title: "UI/UX Developer",
    description:
      "James is a UI/UX Developer who bridges intuitive interface design and modern front-end engineering, using Figma and modular component architecture to turn complex concepts into performant web applications. Outside of shipping clean code, he keeps his creative gears turning through gaming and sketching.",
    image: "/grm-team/James Green.webp",
    width: 1024,
    height: 1024,
    objectPosition: "center center",
    icon: "code",
    initials: "JG",
  },
  {
    id: "julia-kereszturi",
    name: "Julia Kereszturi",
    title: "Web Developer",
    description:
      "As a Web Developer at Good Rep Media, Julia combines creativity and technology to build engaging websites and bring ideas to life, while continuously exploring new technologies, learning new skills, and embracing creative challenges.",
    image: "/grm-team/julia-kereszturi-profile-pic.jpg",
    width: 800,
    height: 800,
    objectPosition: "center center",
    icon: "code",
    initials: "JK",
  },
  {
    id: "ron-lewis",
    name: "Ron Lewis",
    title: "Small Business Growth Specialist",
    description:
      "Drawing on over 25 years of sales experience, Ron passionately connects small business owners with Good Rep Media’s marketing solutions while balancing his career with family, fitness, and golf.",
    image: "/grm-team/ron-lewis-profile-pic.jpg",
    width: 1400,
    height: 1400,
    objectPosition: "center 18%",
    icon: "trending_up",
    initials: "RL",
  },
  {
    id: "emily-stavrou-schaefer",
    name: "Emily Stavrou Schaefer",
    title: "Graphic Designer",
    description:
      "With 12+ years in book marketing & 12 in design, Emily fuses strategy + storytelling. She crafts purposeful, conversion-driven creative that connects message, market & design every time.",
    image: "/grm-team/Emily Schaefer Profile.webp",
    width: 800,
    height: 800,
    objectPosition: "center 16%",
    icon: "brush",
    initials: "ES",
  },
  {
    id: "melani-sevova",
    name: "Melani Sevova",
    title: "Digital Media Coordinator",
    description:
      "Melani brainstorms and builds fresh media ideas for blogs and SOPs that keep projects organized and moving forward. A digital marketing grad with a love for Pilates, Italian food, and weekends in Chicago, she brings creativity and a thoughtful touch to every project.",
    image: "/grm-team/melani-sevova.webp",
    width: 800,
    height: 800,
    objectPosition: "center center",
    icon: "perm_media",
    initials: "MS",
  },
];

export const teamReadyData = {
  eyebrow: "PARTNER WITH OUR SPECIALISTS",
  title: "Ready to Have an Entire Creative & Growth Team in Your Corner?",
  text: "Whether you need a high-converting custom website, local search dominance, or thumb-stopping social and creative campaigns, our team is ready to help your small business thrive.",
  primaryCta: {
    label: "Schedule a Strategy Call",
    href: "#consultation",
  },
  secondaryCta: {
    label: "Explore Our Work",
    href: "/work/",
  },
  art: {
    blob: {
      src: "/grm-web-assets/blue-circular-background-graphic.svg",
      width: 746,
      height: 780,
      parallax: 22,
    },
    main: {
      src: "/grm-main-graphics/customer-review-graphic.svg",
      alt: "Partner with the Good Rep Media team",
      width: 746,
      height: 780,
      parallax: -28,
      style: "width: 60%; left: 20%; top: 14%;",
    },
    // Blob 1 rule: Lower-Left Corner & Top-Right Corner
    badges: [
      {
        src: "/grm-web-assets/999-hearts-likes-graphic.svg",
        width: 746,
        height: 780,
        parallax: -44,
        style: "width: 22%; left: 6%; bottom: 10%;",
      },
      {
        src: "/grm-web-assets/3-arrows-up-graphic.svg",
        width: 746,
        height: 780,
        parallax: -52,
        style: "width: 22%; right: 6%; top: 8%;",
      },
    ],
  },
};

export const teamConsultData = {
  kicker: "Connect with our team",
  title: "Let's Build Something Remarkable Together",
  text: "Have a question for our designers, developers, or marketing strategists? Drop us a line and you'll hear directly from a senior member of our team within 24 hours.",
  cardTitle: "Send Us A Message",
  submitLabel: "Talk With Our Team",
  waveTheme: "dark",
};
