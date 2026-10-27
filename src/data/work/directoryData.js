/**
 * Portfolio directory data (/work).
 * Extracted from src/pages/work.astro for clean separation of data and view (SLAP & DRY).
 */

import capeCoralLawnCareImg from "../../assets/case-studies/cape-coral-lawn-care-project-card.webp";
import coralBreezeImg from "../../assets/case-studies/coral-breeze-project-card.jpg";
import glowingResultsImg from "../../assets/case-studies/glowing-result-skin-spa-project.jpg";
import beBalancedImg from "../../assets/case-studies/be-balanced-bodyworks-project-card.webp";
import abodeHomeImg from "../../assets/case-studies/abode-home-services-project-card.webp";
import homeOwnerProImg from "../../assets/case-studies/home-owner-pro-experts-project-card.webp";
import homeOwnerHelpImg from "../../assets/case-studies/home-owner-help-options-project-card.webp";
import capeCoralReviewedImg from "../../assets/case-studies/cape-coral-reviewed-project-card.webp";
import floridaSunshineImg from "../../assets/case-studies/florida-sunshine-lawn-care-project-card.webp";
import jojoJavaImg from "../../assets/case-studies/jojo-java-project-card.webp";
import pinkSlushyImg from "../../assets/case-studies/pink-slushy-project-card.jpg";

export const stats = [
  { prefix: "+", value: 240, suffix: "%", barPercent: 90, label: "Average Call & Lead Increase" },
  { value: 50, suffix: "+", barPercent: 85, label: "Custom Websites Built & Launched" },
  { value: 98, suffix: "%", barPercent: 98, label: "Client Retention Rate" },
  { prefix: "$", value: 2.5, decimals: 1, suffix: "M+", barPercent: 95, label: "Client Revenue Generated" },
];

export const projects = [
  {
    title: "Cape Coral Lawn Care",
    href: "/work/cape-coral-lawn-care/",
    category: "Web Design & Local SEO",
    tag: "Landscaping & Outdoor Services",
    summary:
      "A complete custom web redesign paired with an aggressive Local SEO campaign took Cape Coral Lawn Care from unranked to dominating the Google 3-Pack across 12 high-intent search terms.",
    metrics: [
      { num: "+280%", desc: "Inbound quote requests", icon: "request_quote" },
      { num: "#1", desc: "Google Map Pack ranking", icon: "location_on" },
      { num: "0.8s", desc: "Mobile page load time", icon: "speed" },
    ],
    logo: "/grm-web-assets/cape-coral-lawn-care-logo-white.svg",
    logoClass: "window-graphic__brand--cclc",
    img: capeCoralLawnCareImg,
    w: 800,
    h: 1050,
    deliverables: ["Custom WordPress Theme", "Local Map Pack SEO", "Review Automation", "Call Tracking"],
  },
  {
    title: "Coral Breeze Services",
    href: "/work/coral-breeze-services/",
    category: "Website Design & Branding",
    tag: "Home Services & Cleaning",
    summary:
      "Modernized their legacy website into an intuitive, mobile-first booking experience with automated quote forms and clear service pricing tiers that instantly increased customer trust.",
    metrics: [
      { num: "4.8x", desc: "Form conversion lift", icon: "trending_up" },
      { num: "-62%", desc: "Mobile bounce rate", icon: "trending_down" },
      { num: "100%", desc: "Accessibility & Best Practices", icon: "verified" },
    ],
    img: coralBreezeImg,
    w: 800,
    h: 1050,
    deliverables: ["UI/UX Mobile Design", "Lead Capture Funnel", "Service Pricing Calculator", "Speed Optimization"],
  },
  {
    title: "Glowing Results Skin Spa",
    href: "/work/glowing-results-skin-spa/",
    category: "Local SEO & Reputation",
    tag: "Health & Beauty Spa",
    summary:
      "Engineered an automated review generation system and localized keyword pages that propelled Glowing Results Skin Spa to the top of Grand Rapids spa searches.",
    metrics: [
      { num: "+180%", desc: "Monthly online appointments", icon: "calendar_month" },
      { num: "125+", desc: "New 5-star Google reviews", icon: "star" },
      { num: "Top 3", desc: "Rankings for core search terms", icon: "search" },
    ],
    logo: "/grm-graphic-samples/glowing-results-skin-spa-logo-white.webp",
    img: glowingResultsImg,
    w: 800,
    h: 1050,
    deliverables: ["Google Business Profile Strategy", "Reputation Management", "Local Citation Building", "Booking Integration"],
  },
  {
    title: "Be Balanced Bodyworks",
    href: "/work/be-balanced-bodyworks/",
    category: "Branding & Web Refresh",
    tag: "Wellness & Massage Therapy",
    summary:
      "Re-architected site structure and refreshed branding elements to simplify appointment scheduling and clearly communicate treatment modalities for new clients.",
    metrics: [
      { num: "+310%", desc: "Organic search visibility", icon: "visibility" },
      { num: "2.4x", desc: "Average time on site", icon: "schedule" },
      { num: "99%", desc: "Core Web Vitals health", icon: "speed" },
    ],
    logo: "/grm-graphic-samples/be-balanced-bodyworks-logo-white.svg",
    img: beBalancedImg,
    w: 800,
    h: 1050,
    deliverables: ["Brand Identity Refresh", "Technical SEO Cleanup", "Automated Intake Forms", "Content Strategy"],
  },
  {
    title: "Abode Home Services",
    href: "/work/abode-home-services/",
    category: "Web Design & Local SEO",
    tag: "Home Repair & Property Services",
    summary:
      "Strengthened their brand, built a high-converting website, and expanded search visibility so homeowners can easily find, trust, and request services.",
    metrics: [
      { num: "+240%", desc: "Organic search lift", icon: "trending_up" },
      { num: "3.2x", desc: "Quote request increase", icon: "request_quote" },
      { num: "98%", desc: "Mobile speed score", icon: "speed" },
    ],
    logo: "/grm-main-graphics/abode-home-services-logo-white.svg",
    img: abodeHomeImg,
    w: 800,
    h: 1050,
    deliverables: ["Web Design + Build", "SEO Optimization", "UX Improvements", "Content Writing"],
  },
  {
    title: "Home Owner Pro Experts",
    href: "/work/home-owner-pro-experts/",
    category: "Branding & Lead Generation",
    tag: "Mortgage & Financial Solutions",
    summary:
      "Refreshed their brand and launched a clear, user-friendly platform that helps homeowners explore mortgage options, refinancing, and repair support.",
    metrics: [
      { num: "+195%", desc: "Inbound consultations", icon: "calendar_month" },
      { num: "4.5x", desc: "Refinance inquiry rate", icon: "trending_up" },
      { num: "#1", desc: "Local search placement", icon: "location_on" },
    ],
    logo: "/grm-graphic-samples/home-owner-pro-experts-logo-white.svg",
    img: homeOwnerProImg,
    w: 800,
    h: 1050,
    deliverables: ["Custom Web Design", "Brand Refresh", "Digital Strategy", "Lead Funnel Optimization"],
  },
  {
    title: "Home Owners Help Options",
    href: "/work/home-owners-help-options/",
    category: "Web Design & Digital Strategy",
    tag: "Homeowner Advocacy & Assistance",
    summary:
      "Engineered a trustworthy, intuitive online resource hub empowering homeowners to navigate foreclosure prevention, mortgage aid, and repair assistance.",
    metrics: [
      { num: "+220%", desc: "Resource portal visits", icon: "visibility" },
      { num: "3.8x", desc: "Assistance form submissions", icon: "contact_support" },
      { num: "0.7s", desc: "Time to interactive", icon: "speed" },
    ],
    logo: "/grm-graphic-samples/home-owner-help-options-logo-white.svg",
    img: homeOwnerHelpImg,
    w: 800,
    h: 1050,
    deliverables: ["Web Design & Development", "Brand Identity", "Content Writing", "SEO Optimization"],
  },
  {
    title: "Cape Coral Reviewed",
    href: "/work/cape-coral-reviewed/",
    category: "Headless Web App & Growth",
    tag: "Community Marketing & Local SEO",
    summary:
      "Launched in June, this headless directory and growth marketing campaign scaled their Facebook community to 13.6K+ members, achieved a 100/100 technical SEO score, and drove 57K active users year-to-date.",
    metrics: [
      { num: "57K", desc: "Active users YTD (+591%)", icon: "group" },
      { num: "13.6K+", desc: "Facebook community members", icon: "thumb_up" },
      { num: "100/100", desc: "Technical SEO score", icon: "code" },
    ],
    logo: "/grm-graphic-samples/cape-coral-reviewed-logo.svg",
    img: capeCoralReviewedImg,
    w: 800,
    h: 1050,
    deliverables: [
      "Headless Web Application",
      "13.6K+ Facebook Community",
      "Technical SEO (100/100)",
      "Local Search Growth",
    ],
  },
  {
    title: "Florida Sunshine Lawn Care",
    href: "/work/florida-sunshine-lawn-care/",
    category: "Web Design & Local SEO",
    tag: "Lawn Care & Landscaping",
    summary:
      "Engineered a high-converting multi-city web presence with instant quote funnels and local SEO that drove a 310% increase in estimate requests across Florida.",
    metrics: [
      { num: "+310%", desc: "Quote request increase", icon: "request_quote" },
      { num: "Top 3", desc: "Local Map Pack rankings", icon: "location_on" },
      { num: "0.8s", desc: "Mobile page load time", icon: "speed" },
    ],
    logo: "/grm-graphic-samples/florida-sunshine-lawn-care-logo.svg",
    img: floridaSunshineImg,
    w: 800,
    h: 1050,
    deliverables: [
      "Custom Web Design + Build",
      "Multi-City Local SEO",
      "Quote Capture Funnel",
      "Speed Optimization",
    ],
  },
  {
    title: "Jojo Java",
    href: "/work/jojo-java/",
    category: "eCommerce & Subscription Funnel",
    tag: "Specialty Coffee & DTC",
    summary:
      "Engineered an energetic direct-to-consumer coffee store with custom bundle builders and Coffee Club subscriptions that drove a 340% lift in online sales.",
    metrics: [
      { num: "+340%", desc: "Online store sales growth", icon: "shopping_cart" },
      { num: "4.2x", desc: "Average order value lift", icon: "trending_up" },
      { num: "0.7s", desc: "Mobile checkout speed", icon: "speed" },
    ],
    logo: "/grm-graphic-samples/jojo-java-logo.svg",
    logoClass: "window-graphic__brand--cclc",
    img: jojoJavaImg,
    w: 800,
    h: 1050,
    deliverables: [
      "Custom eCommerce Web Design",
      "DTC Subscription Architecture",
      "Bundle Builder & Upsells",
      "Mobile Checkout Optimization",
    ],
  },
  {
    title: "Pink Slushy Media",
    category: "Web Design & Conversion Funnel",
    tag: "Media Buying & Performance",
    summary:
      "Engineered a bold, high-contrast agency web presence and strategy call funnel for Pink Slushy Media that captures paid traffic leads and showcases their campaign creative capabilities.",
    metrics: [
      { num: "+195%", desc: "Strategy call bookings", icon: "call" },
      { num: "5.1x", desc: "Landing page conversion rate", icon: "ads_click" },
      { num: "100%", desc: "Mobile performance score", icon: "bolt" },
    ],
    img: pinkSlushyImg,
    w: 800,
    h: 1050,
    deliverables: ["Custom Web Design", "Strategy Call Funnel", "Interactive UI Graphics", "Technical SEO"],
  },
];
