const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
};

const TEXT_ENCODER = new TextEncoder();

function contentTypeFor(pathname) {
  const match = pathname.match(/\.[^.]+$/);
  return match ? MIME_TYPES[match[0].toLowerCase()] || "application/octet-stream" : "text/html; charset=utf-8";
}

function normalizePath(pathname) {
  if (pathname === "/") return "/index.html";
  if (pathname.endsWith("/")) return `${pathname}index.html`;
  return pathname;
}

async function assetResponse(request, env) {
  const url = new URL(request.url);
  const path = normalizePath(url.pathname);
  const response = await env.ASSETS.fetch(new Request(new URL(path, request.url), request));

  if (response.status !== 404) {
    const headers = new Headers(response.headers);
    if (!headers.has("content-type")) headers.set("content-type", contentTypeFor(path));
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  if (!path.endsWith(".html") && !path.includes(".")) {
    return env.ASSETS.fetch(new Request(new URL(`${path}.html`, request.url), request));
  }

  return response;
}

export default {
  async fetch(request, env) {
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method not allowed", { status: 405 });
    }

    try {
      return await assetResponse(request, env);
    } catch (error) {
      return new Response(TEXT_ENCODER.encode("Preview unavailable."), {
        status: 500,
        headers: { "content-type": "text/plain; charset=utf-8" },
      });
    }
  },
};
