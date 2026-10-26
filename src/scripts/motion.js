import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP plugins are registered
gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/**
 * Standard animation constants ensuring design consistency.
 */
export const MOTION_CONSTANTS = Object.freeze({
  CLEAR_PROPS_SAFE: "transform,opacity",
  REVEAL_SCROLL_START: "top 85%",
  EASE_OUT_POWER2: "power2.out",
  EASE_OUT_POWER3: "power3.out",
  HERO_BLOB_DEPTH: 14,
  HERO_MAIN_DEPTH: -20,
});

/**
 * Sets up animations scoped to an element with automatic reduced-motion handling.
 *
 * @param {HTMLElement|string} scope - The DOM element or selector to scope animations within.
 * @param {Function} setupCallback - Callback returning an optional cleanup function or GSAP context.
 * @returns {Function} Teardown function to clean up tweens and ScrollTriggers.
 */
export function withMotion(scope, setupCallback) {
  const root = typeof scope === "string" ? document.querySelector(scope) : scope;
  if (!root) return () => {};

  const matchMedia = gsap.matchMedia();

  matchMedia.add("(prefers-reduced-motion: no-preference)", (context) => {
    return setupCallback(root, context);
  });

  return () => matchMedia.revert();
}

/**
 * Attaches high-performance 2.5D pointer parallax to depth layers inside a container.
 * Uses gsap.quickTo to eliminate tween re-allocation on pointermove at 60fps.
 *
 * @param {HTMLElement} container - The container capturing pointermove events.
 * @param {string} [layerSelector="[data-hero-depth]"] - Selector for parallax layers.
 * @returns {Function} Teardown function removing event listeners.
 */
export function attachPointerParallax(container, layerSelector = "[data-hero-depth]") {
  if (!container) return () => {};

  const layers = gsap.utils.toArray(layerSelector, container);
  if (!layers.length) return () => {};

  let containerRect = container.getBoundingClientRect();
  const updateRect = () => {
    containerRect = container.getBoundingClientRect();
  };

  window.addEventListener("resize", updateRect, { passive: true });

  // Pre-create quickTo setters for 60fps hardware-accelerated movement
  const setters = layers.map((layer) => {
    const depth = Number(layer.dataset.heroDepth || 14);
    return {
      layer,
      depth,
      quickX: gsap.quickTo(layer, "x", {
        duration: 0.6,
        ease: MOTION_CONSTANTS.EASE_OUT_POWER2,
      }),
      quickY: gsap.quickTo(layer, "y", {
        duration: 0.6,
        ease: MOTION_CONSTANTS.EASE_OUT_POWER2,
      }),
    };
  });

  const onPointerEnter = () => {
    updateRect();
  };

  const onPointerMove = (e) => {
    if (!containerRect.width || !containerRect.height) return;
    const normalizedX = (e.clientX - containerRect.left) / containerRect.width - 0.5;
    const normalizedY = (e.clientY - containerRect.top) / containerRect.height - 0.5;

    for (let i = 0; i < setters.length; i++) {
      const item = setters[i];
      item.quickX(normalizedX * item.depth);
      item.quickY(normalizedY * item.depth);
    }
  };

  const onPointerLeave = () => {
    for (let i = 0; i < setters.length; i++) {
      const item = setters[i];
      gsap.to(item.layer, {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: MOTION_CONSTANTS.EASE_OUT_POWER3,
        overwrite: "auto",
      });
    }
  };

  container.addEventListener("pointerenter", onPointerEnter, { passive: true });
  container.addEventListener("pointermove", onPointerMove, { passive: true });
  container.addEventListener("pointerleave", onPointerLeave, { passive: true });

  return () => {
    window.removeEventListener("resize", updateRect);
    container.removeEventListener("pointerenter", onPointerEnter);
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerleave", onPointerLeave);
  };
}

/**
 * Reveals elements with a standard upward fade as they enter the viewport.
 * Enforces safe clearProps: "transform,opacity" to prevent SVG dimension blowouts.
 *
 * @param {HTMLElement|HTMLElement[]|string} targets - Elements to animate.
 * @param {Object} [options={}] - Custom animation options.
 */
export function revealOnScroll(targets, options = {}) {
  const elements = gsap.utils.toArray(targets);
  if (!elements.length) return null;

  const trigger = options.trigger || elements[0];
  const yOffset = options.y ?? 34;
  const stagger = options.stagger ?? 0.12;
  const duration = options.duration ?? 0.7;

  return gsap.fromTo(
    elements,
    { y: yOffset, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration,
      stagger,
      ease: MOTION_CONSTANTS.EASE_OUT_POWER3,
      clearProps: MOTION_CONSTANTS.CLEAR_PROPS_SAFE,
      scrollTrigger: {
        trigger,
        start: options.start || MOTION_CONSTANTS.REVEAL_SCROLL_START,
        once: true,
      },
    }
  );
}

/**
 * Animates numerical counter badges smoothly on scroll into view.
 *
 * @param {HTMLElement} root - Parent container containing counter elements.
 * @param {string} [counterSelector="[data-stat-counter]"] - Selector for counter items.
 * @param {HTMLElement|string} [triggerEl] - Optional custom ScrollTrigger trigger.
 */
export function animateCounters(root, counterSelector = "[data-stat-counter]", triggerEl = null) {
  if (!root) return;
  const counterElements = gsap.utils.toArray(counterSelector, root);
  if (!counterElements.length) return;

  const trigger = triggerEl || root;

  counterElements.forEach((counterEl) => {
    const targetVal = Number(counterEl.dataset.statCounter || "0");
    const decimals = Number(counterEl.dataset.statDecimals || "0");
    const counterObj = { val: 0 };

    gsap.to(counterObj, {
      val: targetVal,
      duration: 1.6,
      ease: MOTION_CONSTANTS.EASE_OUT_POWER2,
      onUpdate: () => {
        counterEl.textContent = counterObj.val.toFixed(decimals);
      },
      scrollTrigger: {
        trigger,
        start: MOTION_CONSTANTS.REVEAL_SCROLL_START,
        once: true,
      },
    });
  });
}
