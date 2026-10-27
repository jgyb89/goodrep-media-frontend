/**
 * Global site configuration and constants for Good Rep Media.
 * Single source of truth for branding, contact info, legal links, and default assets.
 */

export const SITE_NAME = "Good Rep Media";
export const SITE_TAGLINE = "Digital Marketing Agency";
export const DEFAULT_PAGE_TITLE = "Good Rep Media | Digital Marketing Agency";
export const DEFAULT_META_DESCRIPTION = "Grow your business with Good Rep Media.";

export const CONTACT_INFO = Object.freeze({
  phone: "(616) 300-9868",
  phoneHref: "tel:+16163009868",
  email: "team@goodrep.media",
  emailHref: "mailto:team@goodrep.media",
});

export const DEFAULT_CONSULT_CONTACT = Object.freeze([
  {
    icon: "call",
    label: CONTACT_INFO.phone,
    href: CONTACT_INFO.phoneHref,
  },
  {
    icon: "mail",
    label: CONTACT_INFO.email,
    href: CONTACT_INFO.emailHref,
  },
]);

export const DEFAULT_CONSULT_ART = Object.freeze({
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
      width: 154,
      height: 154,
      className: "consult__art-float--heart",
      placement: "bottom-left",
    },
  ],
});

export const LEGAL_LINKS = Object.freeze([
  {
    label: "Terms of Service",
    href: "https://goodrep.media/terms-of-service/",
  },
  {
    label: "Privacy Policy",
    href: "https://goodrep.media/privacy-policy",
  },
  {
    label: "Mobile Terms",
    href: "https://goodrep.media/mobile-terms-and-conditions/",
  },
]);

export const COPYRIGHT_YEAR = 2026;
export const COPYRIGHT_TEXT = `© Copyright Good Rep Media Inc. ${COPYRIGHT_YEAR}`;
