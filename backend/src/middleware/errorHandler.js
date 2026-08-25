export function notFound(request, response) {
  response
    .status(404)
    .json({
      error: `Route not found: ${request.method} ${request.originalUrl}`,
    });
}

export function errorHandler(error, request, response, next) {
  console.error(error);
  if (response.headersSent) return next(error);
  response.status(500).json({ error: "An unexpected server error occurred." });
}
