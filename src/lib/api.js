const API_URL = (
  (typeof import.meta !== "undefined" && import.meta.env?.PUBLIC_WORDPRESS_API_URL) ||
  (typeof process !== "undefined" && process.env?.PUBLIC_WORDPRESS_API_URL) ||
  "https://goodrep.media/wp-json/wp/v2"
).replace(/\/$/, "");

const isGraphQL = API_URL.endsWith("/graphql");

/**
 * Canonical WordPress blog categories matching the CMS taxonomy.
 * Used as a fast lookup map and offline fallback.
 */
export const DEFAULT_CATEGORIES = [
  {
    id: 139,
    name: "AI & Machine Learning in Marketing",
    slug: "ai-machine-learning-in-marketing",
    count: 8,
  },
  {
    id: 147,
    name: "Automation & Emerging Marketing Tech",
    slug: "automation-emerging-marketing-tech",
    count: 7,
  },
  {
    id: 140,
    name: "Content Marketing & Blogging",
    slug: "content-marketing-blogging",
    count: 25,
  },
  {
    id: 142,
    name: "Digital Marketing & Lead Generation",
    slug: "digital-marketing-lead-generation",
    count: 24,
  },
  {
    id: 145,
    name: "E-Commerce & Online Business",
    slug: "e-commerce-online-business",
    count: 2,
  },
  {
    id: 5,
    name: "Good Rep Media",
    slug: "grm",
    count: 5,
  },
  {
    id: 137,
    name: "Google Marketing & Business Optimization",
    slug: "google-marketing-business-optimization",
    count: 3,
  },
  {
    id: 212,
    name: "Press Release",
    slug: "press-release",
    count: 3,
  },
  {
    id: 146,
    name: "Reputation Management & Customer Engagement",
    slug: "reputation-management-customer-engagement",
    count: 7,
  },
  {
    id: 136,
    name: "SEO & Search Engine Marketing",
    slug: "seo-search-engine-marketing",
    count: 6,
  },
  {
    id: 143,
    name: "Small Business Marketing & Strategy",
    slug: "small-business-marketing-strategy",
    count: 24,
  },
  {
    id: 138,
    name: "Social Media Marketing",
    slug: "social-media-marketing",
    count: 10,
  },
  {
    id: 141,
    name: "Video Marketing & Advertising",
    slug: "video-marketing-advertising",
    count: 3,
  },
  {
    id: 144,
    name: "Web Design & Branding",
    slug: "web-design-branding",
    count: 8,
  },
];

const DEFAULT_CATEGORY_MAP = new Map(
  DEFAULT_CATEGORIES.map((c) => [c.id, c])
);

/**
 * Decodes common HTML entities returned by WordPress REST API fields
 * (such as title.rendered and category.name).
 */
export function decodeHtmlEntities(str = "") {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&hellip;/g, "…")
    .replace(/&nbsp;/g, " ");
}

/**
 * Fetches blog categories from WordPress REST API (or falls back to DEFAULT_CATEGORIES).
 */
export async function getCategories() {
  if (isGraphQL) {
    try {
      const data = await fetchWP(`
        query GetCategories {
          categories(first: 100, where: { hideEmpty: true }) {
            nodes {
              databaseId
              name
              slug
              count
            }
          }
        }
      `);
      const nodes = data?.categories?.nodes || [];
      if (nodes.length > 0) {
        return nodes.map((c) => ({
          id: c.databaseId,
          name: decodeHtmlEntities(c.name),
          slug: c.slug,
          count: c.count || 0,
        }));
      }
    } catch {
      return DEFAULT_CATEGORIES;
    }
  }

  try {
    const res = await fetch(
      `${API_URL}/categories?per_page=100&hide_empty=true&_fields=id,name,slug,count`
    );
    if (!res.ok) return DEFAULT_CATEGORIES;
    const raw = await res.json();
    if (!Array.isArray(raw) || raw.length === 0) return DEFAULT_CATEGORIES;
    return raw.map((c) => ({
      id: c.id,
      name: decodeHtmlEntities(c.name),
      slug: c.slug,
      count: c.count || 0,
    }));
  } catch {
    return DEFAULT_CATEGORIES;
  }
}

const mediaCache = new Map();

/**
 * Fetches media details by WordPress media attachment ID.
 */
export async function getMediaById(id) {
  if (!id || Number(id) <= 0) return null;
  const numId = Number(id);
  if (mediaCache.has(numId)) {
    return mediaCache.get(numId);
  }

  try {
    const res = await fetch(`${API_URL}/media/${numId}`);
    if (!res.ok) return null;
    const data = await res.json();
    const media = {
      id: data.id,
      sourceUrl: data.source_url,
      altText: decodeHtmlEntities(data.alt_text || data.title?.rendered || ""),
      mimeType: data.mime_type,
      width: data.media_details?.width,
      height: data.media_details?.height,
      sizes: data.media_details?.sizes || {},
    };
    mediaCache.set(numId, media);
    return media;
  } catch {
    return null;
  }
}

const FALLBACK_CATEGORY = Object.freeze({
  id: 143,
  name: "Small Business Marketing & Strategy",
  slug: "small-business-marketing-strategy",
});

/**
 * Resolves featured image URL and alt text from multiple WordPress REST shapes.
 */
function resolveFeaturedImage(p, fallbackTitle = "") {
  const featured = p._embedded?.["wp:featuredmedia"]?.[0];
  const sourceUrl =
    featured?.source_url ||
    featured?.media_details?.sizes?.large?.source_url ||
    featured?.media_details?.sizes?.full?.source_url ||
    p.jetpack_featured_media_url ||
    p.featured_image_url ||
    p.featuredImage?.node?.sourceUrl ||
    null;

  if (!sourceUrl) return null;

  const altText = decodeHtmlEntities(
    featured?.alt_text ||
    featured?.title?.rendered ||
    p.featuredImage?.node?.altText ||
    fallbackTitle
  );

  return {
    node: {
      sourceUrl,
      altText,
    },
  };
}

/**
 * Resolves category objects from term IDs or embedded category payloads.
 */
function resolveCategories(p, categoryMap = DEFAULT_CATEGORY_MAP) {
  if (Array.isArray(p.categories)) {
    return p.categories
      .map((catId) => {
        if (typeof catId === "object" && catId !== null) {
          return {
            id: catId.id || catId.databaseId,
            name: decodeHtmlEntities(catId.name),
            slug: catId.slug,
          };
        }
        return categoryMap.get(catId) || DEFAULT_CATEGORY_MAP.get(catId) || null;
      })
      .filter(Boolean);
  }

  if (Array.isArray(p.categories?.nodes)) {
    return p.categories.nodes.map((c) => ({
      id: c.databaseId || c.id,
      name: decodeHtmlEntities(c.name),
      slug: c.slug,
    }));
  }

  return [];
}

/**
 * Extracts SEO title and meta description, falling back to post title.
 */
function resolveSeo(p, fallbackTitle = "") {
  return {
    title: decodeHtmlEntities(
      p.yoast_head_json?.title || p.seo?.title || fallbackTitle
    ),
    metaDesc: decodeHtmlEntities(
      p.yoast_head_json?.description || p.seo?.metaDesc || ""
    ),
  };
}

/**
 * Normalizes a WordPress REST API post item into a unified shape
 * compatible with the frontend templates.
 */
export function normalizePost(p, categoryMap = DEFAULT_CATEGORY_MAP) {
  if (!p) return null;
  const rawTitle = decodeHtmlEntities(p.title?.rendered || p.title || "");
  const resolvedCategories = resolveCategories(p, categoryMap);

  return {
    id: p.id,
    title: rawTitle,
    slug: p.slug,
    date: p.date,
    excerpt: p.excerpt?.rendered || p.excerpt || "",
    content: p.content?.rendered || p.content || "",
    categories: resolvedCategories,
    primaryCategory: resolvedCategories[0] || FALLBACK_CATEGORY,
    featuredMediaId: p.featured_media || null,
    featuredImage: resolveFeaturedImage(p, rawTitle),
    seo: resolveSeo(p, rawTitle),
  };
}

/**
 * Fetches posts with optional field filtering and pagination.
 */
export async function getPosts({
  perPage = 100,
  page = 1,
  includeContent = false,
} = {}) {
  const fields = includeContent
    ? "_embed"
    : "_fields=id,slug,title,excerpt,date,categories,_links,_embedded&_embed=wp:featuredmedia";

  const url = `${API_URL}/posts?${fields}&per_page=${perPage}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`WordPress API returned status ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data.map((p) => normalizePost(p));
}

let cachedFullPostsPromise = null;
const cachedPostBySlug = new Map();

async function ensureFullPostsCache() {
  if (!cachedFullPostsPromise) {
    cachedFullPostsPromise = (async () => {
      const categories = await getCategories();
      const categoryMap = new Map(categories.map((c) => [c.id, c]));

      const firstRes = await fetch(
        `${API_URL}/posts?_embed=wp:featuredmedia&per_page=100&page=1`
      );
      if (!firstRes.ok) {
        throw new Error(`WordPress API returned status ${firstRes.status}`);
      }

      const totalPages = parseInt(
        firstRes.headers.get("x-wp-totalpages") || "1",
        10
      );
      let posts = (await firstRes.json()).map((p) =>
        normalizePost(p, categoryMap)
      );

      if (totalPages > 1) {
        const pagePromises = [];
        for (let currentPage = 2; currentPage <= totalPages; currentPage++) {
          pagePromises.push(
            fetch(
              `${API_URL}/posts?_embed=wp:featuredmedia&per_page=100&page=${currentPage}`
            )
              .then((res) => (res.ok ? res.json() : []))
              .then((pageJson) =>
                Array.isArray(pageJson)
                  ? pageJson.map((p) => normalizePost(p, categoryMap))
                  : []
              )
          );
        }
        const remainingPages = await Promise.all(pagePromises);
        for (const pagePosts of remainingPages) {
          posts = posts.concat(pagePosts);
        }
      }

      for (const post of posts) {
        if (post?.slug) {
          cachedPostBySlug.set(post.slug, post);
        }
      }

      return posts;
    })().catch((err) => {
      cachedFullPostsPromise = null;
      throw err;
    });
  }
  return cachedFullPostsPromise;
}

/**
 * Fetches all posts across all pages (for master feed or sitemaps).
 * Returns all cached posts by default unless a specific limit is requested.
 */
export async function getAllPosts({ maxPosts = Infinity } = {}) {
  const posts = await ensureFullPostsCache();
  return Number.isFinite(maxPosts) ? posts.slice(0, maxPosts) : posts;
}

/**
 * Fetches all post slugs across all pagination pages for static generation.
 */
export async function getAllPostSlugs() {
  const posts = await ensureFullPostsCache();
  return posts.map((p) => ({ slug: p.slug }));
}

/**
 * Fetches a single post by its slug.
 */
export async function getPostBySlug(slug) {
  if (!slug) return null;
  if (cachedPostBySlug.has(slug)) {
    return cachedPostBySlug.get(slug);
  }
  try {
    await ensureFullPostsCache();
    if (cachedPostBySlug.has(slug)) {
      return cachedPostBySlug.get(slug);
    }
  } catch {
    // Fallback to direct single-slug request below
  }

  const res = await fetch(
    `${API_URL}/posts?slug=${encodeURIComponent(slug)}&_embed=wp:featuredmedia`
  );
  if (!res.ok) {
    throw new Error(`Failed to fetch post "${slug}": status ${res.status}`);
  }

  const posts = await res.json();
  if (!Array.isArray(posts) || posts.length === 0) return null;
  const normalized = normalizePost(posts[0]);
  if (!normalized?.featuredImage && posts[0]?.featured_media > 0) {
    const media = await getMediaById(posts[0].featured_media);
    if (media?.sourceUrl) {
      normalized.featuredImage = {
        node: {
          sourceUrl: media.sourceUrl,
          altText: media.altText || normalized.title,
        },
      };
    }
  }
  if (normalized?.slug) {
    cachedPostBySlug.set(normalized.slug, normalized);
  }
  return normalized;
}

/**
 * Universal fetchWP helper that automatically switches between GraphQL (if configured)
 * and the WordPress REST API adapter.
 */
export async function fetchWP(query, variables = {}) {
  // If endpoint is GraphQL, execute standard POST GraphQL query
  if (isGraphQL) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();
    if (json.errors) {
      console.error("GraphQL API Errors:", json.errors);
      throw new Error("Failed to fetch data from GraphQL");
    }
    return json.data;
  }

  // REST API Translation Layer
  // 1. Single Post query
  if (query.includes("GetPost") || query.includes("post(")) {
    const slug = variables.id || variables.slug;
    const post = await getPostBySlug(slug);
    return { post };
  }

  // 2. All post slugs for getStaticPaths
  if (query.includes("AllPosts")) {
    const nodes = await getAllPostSlugs();
    return { posts: { nodes } };
  }

  // 3. Latest posts (homepage Knowledge Center or blog feed)
  const firstMatch = query.match(/posts\(first:\s*(\d+)\)/);
  const limit = firstMatch ? parseInt(firstMatch[1], 10) : 10;

  if (limit <= 100) {
    const nodes = await getPosts({ perPage: limit });
    return { posts: { nodes } };
  } else {
    const nodes = await getAllPosts({ maxPosts: limit });
    return { posts: { nodes } };
  }
}
