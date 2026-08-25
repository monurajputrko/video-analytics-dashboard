import database from "../config/database.js";

const analyticsQuery = database.prepare(`
  SELECT
    v.id,
    v.title,
    v.videoUrl,
    COUNT(CASE WHEN e.eventType = 'view' THEN 1 END) AS totalViews,
    COUNT(CASE WHEN e.eventType = 'click' THEN 1 END) AS totalClicks,
    COUNT(CASE WHEN e.eventType = 'add_to_cart' THEN 1 END) AS totalAddToCart
  FROM Videos v
  LEFT JOIN EngagementEvents e ON e.videoId = v.id
  GROUP BY v.id, v.title, v.videoUrl
  ORDER BY v.id ASC
  LIMIT @limit OFFSET @offset
`);
const countQuery = database.prepare(
  "SELECT COUNT(*) AS totalCount FROM Videos",
);

function positiveInteger(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export function getVideoAnalytics(request, response, next) {
  try {
    const page = positiveInteger(request.query.page, 1);
    const limit = Math.min(50, positiveInteger(request.query.limit, 5));
    const totalCount = countQuery.get().totalCount;
    const totalPages = Math.max(1, Math.ceil(totalCount / limit));
    const currentPage = Math.min(page, totalPages);
    const rows = analyticsQuery
      .all({ limit, offset: (currentPage - 1) * limit })
      .map((row) => ({
        ...row,
        totalViews: Number(row.totalViews),
        totalClicks: Number(row.totalClicks),
        totalAddToCart: Number(row.totalAddToCart),
      }));

    return response.json({
      data: rows,
      pagination: { page: currentPage, totalPages, totalCount },
    });
  } catch (error) {
    return next(error);
  }
}
