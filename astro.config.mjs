import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  site: isGitHubPages ? "https://jgyb89.github.io" : "https://goodrep.media",
  base: isGitHubPages ? "/goodrep-media-frontend" : "/",
  site:
    process.env.SITE_URL ||
    (isGitHubPages ? "https://jgyb89.github.io" : "https://goodrep.media"),
  integrations: [react(), sitemap()],
});
