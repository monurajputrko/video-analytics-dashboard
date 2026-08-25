const allowedEventTypes = new Set(["view", "click", "add_to_cart"]);

export function validateEvent(request, response, next) {
  const { videoId, eventType } = request.body || {};

  if (
    (typeof videoId !== "string" && typeof videoId !== "number") ||
    String(videoId).trim() === ""
  ) {
    return response
      .status(400)
      .json({ error: "videoId must be a non-empty string or number." });
  }

  if (!allowedEventTypes.has(eventType)) {
    return response
      .status(400)
      .json({ error: "eventType must be view, click, or add_to_cart." });
  }

  request.validatedEvent = { videoId: String(videoId), eventType };
  return next();
}
