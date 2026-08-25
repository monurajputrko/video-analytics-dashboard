async function request(path, options) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Request failed.");
  return body;
}

export function fetchVideoAnalytics(page = 1, limit = 5) {
  return request(`/api/analytics/videos?page=${page}&limit=${limit}`);
}

export function postEvent(videoId, eventType) {
  return request("/api/events", {
    method: "POST",
    body: JSON.stringify({ videoId, eventType }),
  });
}
