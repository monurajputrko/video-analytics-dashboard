import database from "../config/database.js";

const findVideo = database.prepare("SELECT id FROM Videos WHERE id = ?");
const insertEvent = database.prepare(
  "INSERT INTO EngagementEvents (videoId, eventType) VALUES (?, ?)",
);

export function createEvent(request, response, next) {
  try {
    const { videoId, eventType } = request.validatedEvent;
    if (!findVideo.get(videoId)) {
      return response
        .status(404)
        .json({ error: `Video ${videoId} does not exist.` });
    }

    const result = insertEvent.run(videoId, eventType);
    return response
      .status(201)
      .json({ id: result.lastInsertRowid, videoId, eventType });
  } catch (error) {
    return next(error);
  }
}
