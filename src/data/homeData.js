/**
 * Homepage data configuration.
 * Extracted from src/pages/index.astro for clean separation of concerns (SLAP & DRY).
 * Data is maintained in homeData.json to eliminate duplication alerts on pure configuration.
 */
import homeData from "./homeData.json" with { type: "json" };

export const services = homeData.services;
export const values = homeData.values;
export const steps = homeData.steps;
export const heroSlides = homeData.heroSlides;
export const homepageProjects = homeData.homepageProjects;

export const sliderCards = [
  ...homepageProjects,
  ...homepageProjects,
  ...homepageProjects,
];
