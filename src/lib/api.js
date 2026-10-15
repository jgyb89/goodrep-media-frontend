export async function fetchWP(query, variables = {}) {
  const res = await fetch(import.meta.env.PUBLIC_WORDPRESS_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  // Catch and log GraphQL-specific errors to the server console[cite: 3]
  if (json.errors) {
    console.error("GraphQL API Errors:", json.errors);
    throw new Error("Failed to fetch data from GraphQL");
  }

  return json.data;
}
